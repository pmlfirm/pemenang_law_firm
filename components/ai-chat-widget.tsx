'use client'

import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent, type KeyboardEvent } from 'react'
import { usePathname } from 'next/navigation'
import {
  Bot,
  ChevronLeft,
  LoaderCircle,
  MessageCircle,
  RotateCcw,
  Send,
  Sparkles,
  X,
} from 'lucide-react'
import { contactById, getContactWhatsappHref, siteRoutes } from '@/lib/site-data'
import { pickLanguage, useLanguage } from '@/lib/language'
import { resolveLocalAssistantReply, resolveOfflineAssistantReply } from '@/lib/ai-assistant'

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  isError?: boolean
  handoff?: boolean
}

type ActivePanel = 'ai' | null

const VISITOR_ID_KEY = 'pemenang-ai-visitor-id'

function createMessageId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

/** Stable per-browser id so the API rate limit is applied per visitor. */
function readVisitorId() {
  try {
    const stored = window.localStorage.getItem(VISITOR_ID_KEY)
    if (stored) return stored

    const created = `v${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`
    window.localStorage.setItem(VISITOR_ID_KEY, created)
    return created
  } catch {
    return 'anon'
  }
}


function MessageText({ content }: { content: string }) {
  const { language } = useLanguage()
  const parts = content.split(/(https?:\/\/[^\s]+)/g)

  const getLinkLabel = (value: string) => {
    try {
      const pathname = new URL(value).pathname

      if (pathname === siteRoutes.products) return pickLanguage(language, { en: 'Open Products page', id: 'Buka halaman Produk' })
      if (pathname.startsWith(`${siteRoutes.products}/`)) return pickLanguage(language, { en: 'Open product details', id: 'Buka detail produk' })
      if (pathname === siteRoutes.companyProfile) return pickLanguage(language, { en: 'Open Company Profile page', id: 'Buka halaman Profil Perusahaan' })
      if (pathname === siteRoutes.contact) return pickLanguage(language, { en: 'Open Get in Touch page', id: 'Buka halaman Hubungi Kami' })
    } catch {
      // Keep generic label.
    }

    return pickLanguage(language, { en: 'Open link', id: 'Buka tautan' })
  }

  return (
    <p className="whitespace-pre-wrap text-sm leading-6">
      {parts.map((part, index) => {
        if (/^https?:\/\//.test(part)) {
          return (
            <a
              key={`${part}-${index}`}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline decoration-current/35 underline-offset-2 hover:decoration-current"
            >
              {getLinkLabel(part)}
            </a>
          )
        }

        return <span key={`${part}-${index}`}>{part}</span>
      })}
    </p>
  )
}

export default function AiChatWidget() {
  const { language } = useLanguage()
  const pathname = usePathname()
  const initialMessage = useMemo<ChatMessage>(
    () => ({
      id: 'welcome',
      role: 'assistant',
      content: pickLanguage(language, {
        en: 'Hello! I can help explain our insurance products and direct you to the right WhatsApp contact. Please tell me what you need.',
        id: 'Halo! Saya dapat membantu menjelaskan produk asuransi kami dan mengarahkan Anda ke kontak WhatsApp yang tepat. Silakan sampaikan kebutuhan Anda.',
      }),
    }),
    [language],
  )

  const suggestions = useMemo(
    () =>
      pickLanguage(language, {
        en: [
          'What products do you offer?',
          'What is the difference between Marine Cargo and Marine Hull?',
          'What should I prepare before submitting a claim?',
        ],
        id: [
          'Produk apa saja yang tersedia?',
          'Apa perbedaan Marine Cargo dan Marine Hull?',
          'Apa yang perlu saya siapkan sebelum mengajukan klaim?',
        ],
      }),
    [language],
  )

  /* Single official WhatsApp destination: PML Law Firm. */
  const waHref = getContactWhatsappHref(contactById['pml-law-firm'], language)

  const [activePanel, setActivePanel] = useState<ActivePanel>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const widgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isMenuOpen) return

    let active = true
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (!active) return
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    const timer = setTimeout(() => {
      if (active) {
        document.addEventListener('click', handleOutsideClick)
        document.addEventListener('touchstart', handleOutsideClick)
      }
    }, 50)

    return () => {
      active = false
      clearTimeout(timer)
      document.removeEventListener('click', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
    }
  }, [isMenuOpen])

  useEffect(() => {
    setMessages([initialMessage])
    setInput('')
  }, [initialMessage])

  useEffect(() => {
    setActivePanel(null)
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (activePanel !== 'ai') return

    const frame = requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    })

    return () => cancelAnimationFrame(frame)
  }, [activePanel, messages, isLoading])

  useEffect(() => {
    if (activePanel !== 'ai') return

    const frame = requestAnimationFrame(() => textareaRef.current?.focus())
    return () => cancelAnimationFrame(frame)
  }, [activePanel])

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setActivePanel(null)
      setIsMenuOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const resetConversation = () => {
    if (isLoading) return
    setMessages([initialMessage])
    setInput('')
  }

  const returnToMenu = () => {
    setActivePanel(null)
    setIsMenuOpen(true)
  }

  const closeWidget = () => {
    setActivePanel(null)
    setIsMenuOpen(false)
  }

  const toggleLauncher = () => {
    if (activePanel || isMenuOpen) {
      closeWidget()
      return
    }

    setIsMenuOpen(true)
  }

  const openPanel = (panel: Exclude<ActivePanel, null>) => {
    setActivePanel(panel)
    setIsMenuOpen(false)
  }

  const sendMessage = async (rawMessage: string) => {
    const content = rawMessage.trim()
    if (!content || isLoading) return

    const userMessage: ChatMessage = {
      id: createMessageId(),
      role: 'user',
      content,
    }

    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setInput('')
    setIsLoading(true)

    try {
      const localReply = resolveLocalAssistantReply(content, window.location.origin, language)

      if (localReply) {
        setMessages((current) => [
          ...current,
          { id: createMessageId(), role: 'assistant', content: localReply },
        ])
      } else {
        /* No local match — try API (works on Vercel, fails gracefully on static hosting) */
        try {
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              visitorId: readVisitorId(),
              language,
              messages: nextMessages
                .filter((m) => !m.isError)
                .slice(-10)
                .map(({ role, content: c }) => ({ role, content: c })),
            }),
          })

          if (!response.ok) {
            throw new Error(`API status ${response.status}`)
          }

          const data = (await response.json()) as { reply?: string; handoff?: boolean }

          if (data.reply) {
            setMessages((current) => [
              ...current,
              { id: createMessageId(), role: 'assistant', content: data.reply!, handoff: Boolean(data.handoff) },
            ])
          } else {
            throw new Error('no-reply')
          }
        } catch {
          /* API unavailable (static hosting) — answer from the offline knowledge base */
          const fallbackReply = resolveOfflineAssistantReply(content, window.location.origin, language)
          setMessages((current) => [
            ...current,
            { id: createMessageId(), role: 'assistant', content: fallbackReply, handoff: true },
          ])
        }
      }
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: createMessageId(),
          role: 'assistant',
          content: pickLanguage(language, {
            en: 'Sorry, something went wrong. Please try again or contact us via WhatsApp.',
            id: 'Maaf, terjadi kendala. Silakan coba lagi atau hubungi kami via WhatsApp.',
          }),
          isError: true,
          handoff: true,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void sendMessage(input)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      void sendMessage(input)
    }
  }

  const hasOpenState = Boolean(activePanel || isMenuOpen)

  return (
    <div ref={widgetRef} className="fixed bottom-4 right-4 z-[999] sm:bottom-7 sm:right-7">
      {activePanel === 'ai' && (
        <div
          role="dialog"
          aria-label={pickLanguage(language, { en: 'Pemenang AI Assistant', id: 'Pemenang AI Assistant' })}
          aria-modal="false"
          className="ai-chat-panel absolute bottom-[4.75rem] right-0 flex max-h-[min(650px,calc(100dvh-7rem))] w-[min(400px,calc(100vw-2rem))] origin-bottom-right flex-col overflow-hidden rounded-[1.75rem] border border-[#0B1F3A]/12 bg-white shadow-2xl shadow-[#07111F]/25 ring-1 ring-white/70 animate-fade-up"
        >
          <div className="relative overflow-hidden bg-[#07111F] px-3 py-4 text-white sm:px-4">
            <div className="absolute -right-10 -top-16 h-36 w-36 rounded-full bg-[#D4AF37]/16 blur-2xl" />
            <div className="relative flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={returnToMenu}
                aria-label={pickLanguage(language, { en: 'Back to assistance options', id: 'Kembali ke pilihan bantuan' })}
                className="rounded-full p-2 text-white/65 transition-colors hover:bg-white/10 hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#4285F4_0%,#A142F4_38%,#EA4335_68%,#FBBC04_100%)] text-white shadow-lg shadow-black/20 sm:h-11 sm:w-11">
                <Bot className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="truncate text-sm font-black">Pemenang AI Assistant</h2>
                  <span className="h-2 w-2 rounded-full bg-[#25D366] shadow-[0_0_0_3px_rgba(37,211,102,0.14)]" />
                </div>
              </div>
              <button
                type="button"
                onClick={resetConversation}
                disabled={isLoading}
                aria-label={pickLanguage(language, { en: 'Start a new conversation', id: 'Mulai percakapan baru' })}
                className="rounded-full p-2 text-white/65 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={closeWidget}
                aria-label={pickLanguage(language, { en: 'Close AI Assistant', id: 'Tutup AI Assistant' })}
                className="rounded-full p-2 text-white/65 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto bg-[#F8F5EF] px-3 py-4 sm:px-4" aria-live="polite">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-[1.25rem] px-4 py-3 shadow-sm ${
                      message.role === 'user'
                        ? 'rounded-br-md bg-[#0B1F3A] text-white'
                        : message.isError
                          ? 'rounded-bl-md border border-red-200 bg-red-50 text-red-900'
                          : 'rounded-bl-md border border-[#0B1F3A]/7 bg-white text-[#1F2933]'
                    }`}
                  >
                    <MessageText content={message.content} />
                    {message.role === 'assistant' && message.handoff && (
                      <a
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-xs font-black text-[#08110d] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#3CE076]"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        {pickLanguage(language, { en: 'Chat on WhatsApp', id: 'Chat via WhatsApp' })}
                      </a>
                    )}
                  </div>
                </div>
              ))}

              {messages.length === 1 && (
                <div className="space-y-2 pt-1">
                  <p className="px-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#0B1F3A]/42">
                    {pickLanguage(language, { en: 'Quick questions', id: 'Pertanyaan cepat' })}
                  </p>
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => void sendMessage(suggestion)}
                      className="block w-full rounded-xl border border-[#0B1F3A]/8 bg-white px-3 py-2.5 text-left text-xs font-bold leading-5 text-[#0B1F3A]/76 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D4AF37]/45 hover:text-[#0B1F3A]"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-[1.25rem] rounded-bl-md border border-[#0B1F3A]/7 bg-white px-4 py-3 text-sm text-[#0B1F3A]/60 shadow-sm">
                    <LoaderCircle className="h-4 w-4 animate-spin text-[#B8941F]" />
                    {pickLanguage(language, { en: 'Preparing a reply…', id: 'Menyiapkan jawaban…' })}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="border-t border-[#0B1F3A]/8 bg-white p-3">
            <form onSubmit={handleSubmit} className="flex items-end gap-2">
              <div className="flex min-h-12 flex-1 items-end rounded-2xl bg-[#F8F5EF] px-3 ring-1 ring-[#0B1F3A]/8 transition-shadow focus-within:ring-[#D4AF37]/55">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                    setInput(event.target.value.slice(0, 1200))
                  }
                  onKeyDown={handleKeyDown}
                  rows={1}
                  maxLength={1200}
                  placeholder={pickLanguage(language, { en: 'Type your question…', id: 'Tulis pertanyaan Anda…' })}
                  disabled={isLoading}
                  className="max-h-28 min-h-12 w-full resize-none bg-transparent py-3 text-sm leading-6 text-[#0B1F3A] outline-none placeholder:text-[#0B1F3A]/38 disabled:cursor-not-allowed"
                />
              </div>
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label={pickLanguage(language, { en: 'Send message', id: 'Kirim pesan' })}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D4AF37] text-[#07111F] shadow-lg shadow-[#D4AF37]/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E8C960] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-45"
              >
                {isLoading ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              </button>
            </form>
          </div>
        </div>
      )}

      <div
        aria-hidden={!isMenuOpen}
        className={`absolute bottom-[4.8rem] right-0 flex flex-col items-end gap-3 transition-all duration-300 ${
          isMenuOpen
            ? 'visible pointer-events-auto translate-y-0 opacity-100'
            : 'invisible pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <button
          type="button"
          onClick={() => openPanel('ai')}
          tabIndex={isMenuOpen ? 0 : -1}
          className="group flex touch-manipulation items-center gap-2.5"
          aria-label={pickLanguage(language, { en: 'Open Pemenang AI Assistant', id: 'Buka Pemenang AI Assistant' })}
        >
          <span className="rounded-full bg-white px-3 py-2 text-xs font-black text-[#0B1F3A] shadow-lg ring-1 ring-[#0B1F3A]/8 transition-transform group-hover:-translate-x-0.5">
            AI Assistant
          </span>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#4285F4_0%,#A142F4_35%,#EA4335_68%,#FBBC04_100%)] text-white shadow-xl ring-2 ring-white transition-transform group-hover:-translate-y-0.5 sm:h-14 sm:w-14">
            <Bot className="h-5 w-5 sm:h-6 sm:w-6" />
          </span>
        </button>

        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeWidget}
          tabIndex={isMenuOpen ? 0 : -1}
          className="group flex touch-manipulation items-center gap-2.5"
          aria-label={pickLanguage(language, { en: 'Chat with PML Law Firm on WhatsApp', id: 'Chat dengan PML Law Firm via WhatsApp' })}
        >
          <span className="rounded-full bg-white px-3 py-2 text-xs font-black text-[#0B1F3A] shadow-lg ring-1 ring-[#0B1F3A]/8 transition-transform group-hover:-translate-x-0.5">
            WhatsApp Contact
          </span>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-[#07111F] shadow-xl ring-2 ring-white transition-transform group-hover:-translate-y-0.5 sm:h-14 sm:w-14">
            <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
          </span>
        </a>
      </div>

      <button
        type="button"
        onClick={toggleLauncher}
        aria-label={hasOpenState ? pickLanguage(language, { en: 'Close help menu', id: 'Tutup menu bantuan' }) : pickLanguage(language, { en: 'Open AI and WhatsApp menu', id: 'Buka menu AI dan WhatsApp' })}
        aria-expanded={hasOpenState}
        className="group relative flex h-15 w-15 touch-manipulation items-center justify-center rounded-full bg-[conic-gradient(from_210deg,#25D366_0deg,#25D366_112deg,#4285F4_168deg,#A142F4_226deg,#EA4335_286deg,#FBBC04_332deg,#25D366_360deg)] p-[3px] shadow-2xl shadow-[#07111F]/28 transition-all duration-300 hover:-translate-y-1 sm:h-17 sm:w-17"
      >
        {!hasOpenState && (
          <span className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366]/28 animate-ping-slow" />
        )}
        <span className="relative flex h-full w-full items-center justify-center rounded-full bg-[#07111F] text-white ring-1 ring-white/20">
          <MessageCircle
            className={`absolute h-6 w-6 -translate-x-1 transition-all duration-300 sm:h-7 sm:w-7 ${
              hasOpenState ? 'rotate-90 scale-75 opacity-0' : 'rotate-0 scale-100 opacity-100'
            }`}
          />
          <Sparkles
            className={`absolute h-4 w-4 translate-x-3 -translate-y-3 text-[#FBBC04] transition-all duration-300 ${
              hasOpenState ? 'scale-75 opacity-0' : 'scale-100 opacity-100'
            }`}
          />
          <X
            className={`absolute h-6 w-6 transition-all duration-300 sm:h-7 sm:w-7 ${
              hasOpenState ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-75 opacity-0'
            }`}
          />
        </span>
      </button>
    </div>
  )
}
