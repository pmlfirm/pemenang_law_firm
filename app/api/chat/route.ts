import { NextRequest, NextResponse } from 'next/server'
import {
  buildAiSystemInstructions,
  resolveLocalAssistantReply,
  resolveOfflineAssistantReply,
  type AiChatMessage,
} from '@/lib/ai-assistant'
import { aiAssistantConfig, siteRoutes } from '@/lib/site-data'
import type { AppLanguage } from '@/lib/language-types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const requestLog = new Map<string, { short: number[]; daily: number[] }>()

function readPositiveInteger(value: string | undefined, fallback: number) {
  const parsed = Number.parseInt(value ?? '', 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

const maxAiRequestsPerShortWindow = readPositiveInteger(
  process.env.AI_LIMIT_PER_10_MINUTES,
  aiAssistantConfig.defaultLimitPerShortWindow,
)
const maxAiRequestsPerDay = readPositiveInteger(
  process.env.AI_LIMIT_PER_DAY,
  aiAssistantConfig.defaultLimitPerDay,
)

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for')
  return forwardedFor?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
}

function parseVisitorId(value: unknown) {
  if (typeof value !== 'string') return 'anonymous'

  const normalized = value.trim().slice(0, aiAssistantConfig.maxVisitorIdLength)
  return /^[a-zA-Z0-9_-]+$/.test(normalized) ? normalized : 'anonymous'
}

function isRateLimited(key: string) {
  if (requestLog.size > 5_000) requestLog.clear()

  const now = Date.now()
  const existing = requestLog.get(key) ?? { short: [], daily: [] }
  const short = existing.short.filter(
    (timestamp) => now - timestamp < aiAssistantConfig.shortWindowMs,
  )
  const daily = existing.daily.filter(
    (timestamp) => now - timestamp < aiAssistantConfig.dailyWindowMs,
  )

  if (short.length >= maxAiRequestsPerShortWindow || daily.length >= maxAiRequestsPerDay) {
    requestLog.set(key, { short, daily })
    return true
  }

  short.push(now)
  daily.push(now)
  requestLog.set(key, { short, daily })
  return false
}

function parseMessages(value: unknown): AiChatMessage[] | null {
  if (!Array.isArray(value) || value.length === 0) return null

  const messages = value.slice(-aiAssistantConfig.maxMessages).map((message) => {
    if (!message || typeof message !== 'object') return null

    const role = 'role' in message ? message.role : null
    const content = 'content' in message ? message.content : null

    if (
      (role !== 'user' && role !== 'assistant') ||
      typeof content !== 'string' ||
      content.trim().length === 0 ||
      content.length > aiAssistantConfig.maxMessageLength
    ) {
      return null
    }

    return {
      role,
      content: content.trim(),
    } satisfies AiChatMessage
  })

  if (messages.some((message) => message === null)) return null

  const validMessages = messages as AiChatMessage[]
  if (validMessages.at(-1)?.role !== 'user') return null

  return validMessages
}

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>
    }
    finishReason?: string
  }>
  promptFeedback?: {
    blockReason?: string
  }
  error?: {
    code?: number
    message?: string
    status?: string
  }
}

function readGeminiReply(data: GeminiResponse) {
  return data.candidates
    ?.flatMap((candidate) => candidate.content?.parts ?? [])
    .map((part) => part.text?.trim())
    .filter((text): text is string => Boolean(text))
    .join('\n')
    .trim()
}

function toGeminiContents(messages: AiChatMessage[]) {
  const firstUserIndex = messages.findIndex((message) => message.role === 'user')
  const conversation = firstUserIndex >= 0 ? messages.slice(firstUserIndex) : messages

  return conversation.map((message) => ({
    role: message.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: message.content }],
  }))
}

function shouldOfferContactPicker(reply: string) {
  const normalized = reply.toLowerCase()
  return [
    'contact us',
    'get in touch',
    'whatsapp',
    'hubungi tim',
    'kontak tim',
    'pilih kontak',
    'tim claim',
  ].some((phrase) => normalized.includes(phrase))
}

function friendlyResponse(reply: string, source: 'local' | 'gemini' | 'fallback') {
  const handoff = source === 'fallback' || shouldOfferContactPicker(reply)

  return NextResponse.json(
    {
      reply,
      source,
      handoff,
      handoffHref: handoff ? siteRoutes.contact : undefined,
    },
    { status: 200, headers: { 'Cache-Control': 'no-store' } },
  )
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { messages?: unknown; visitorId?: unknown; language?: AppLanguage }
    const messages = parseMessages(body.messages)

    if (!messages) {
      return NextResponse.json(
        { error: 'Format pesan tidak valid.' },
        { status: 400, headers: { 'Cache-Control': 'no-store' } },
      )
    }

    const requestOrigin = request.nextUrl.origin
    const language: AppLanguage = body.language === 'id' ? 'id' : 'en'
    const latestQuestion = messages.at(-1)?.content ?? ''
    const localReply = resolveLocalAssistantReply(latestQuestion, requestOrigin, language)

    // Local answers don't consume Gemini quota.
    if (localReply) {
      return friendlyResponse(localReply, 'local')
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY

    if (!apiKey) {
      return friendlyResponse(resolveOfflineAssistantReply(latestQuestion, requestOrigin, language), 'fallback')
    }

    const visitorId = parseVisitorId(body.visitorId)
    const rateLimitKey = `${getClientIp(request)}:${visitorId}`

    if (isRateLimited(rateLimitKey)) {
      return friendlyResponse(resolveOfflineAssistantReply(latestQuestion, requestOrigin, language), 'fallback')
    }

    const model = process.env.GEMINI_MODEL || aiAssistantConfig.defaultModel
    const endpoint = `${aiAssistantConfig.geminiEndpoint}/${encodeURIComponent(model)}:generateContent`

    const geminiResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: buildAiSystemInstructions(requestOrigin, language) }],
        },
        contents: toGeminiContents(messages),
        generationConfig: {
          temperature: aiAssistantConfig.temperature,
          topP: aiAssistantConfig.topP,
          maxOutputTokens: aiAssistantConfig.maxOutputTokens,
        },
      }),
      signal: AbortSignal.timeout(aiAssistantConfig.requestTimeoutMs),
    })

    const data = (await geminiResponse.json()) as GeminiResponse

    if (!geminiResponse.ok) {
      console.error(
        'Gemini API error:',
        data.error?.status || geminiResponse.status,
        data.error?.message || geminiResponse.statusText,
      )
      return friendlyResponse(resolveOfflineAssistantReply(latestQuestion, requestOrigin, language), 'fallback')
    }

    const reply = readGeminiReply(data)

    if (!reply) {
      console.error(
        'Gemini API returned no text:',
        data.promptFeedback?.blockReason || data.candidates?.[0]?.finishReason || 'unknown',
      )
      return friendlyResponse(resolveOfflineAssistantReply(latestQuestion, requestOrigin, language), 'fallback')
    }

    return friendlyResponse(reply, 'gemini')
  } catch (error) {
    console.error('AI chat route error:', error)
    return friendlyResponse(resolveOfflineAssistantReply('', request.nextUrl.origin, 'en'), 'fallback')
  }
}
