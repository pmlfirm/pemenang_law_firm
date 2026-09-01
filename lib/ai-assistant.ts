import { pmlConfig, pmlCopy } from '@/lib/pml-content'
import { contactById, siteConfig, siteRoutes } from '@/lib/site-data'
import type { AppLanguage } from '@/lib/language-types'

export type AiChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

const officialContact = contactById['pml-law-firm']

function normalizeQuestion(value?: string) {
  return (value || '').toLowerCase().trim()
}

function countWords(value: string) {
  return value.split(/\s+/).filter(Boolean).length
}

function absoluteUrl(origin: string, path: string) {
  return `${origin}${path}`
}

function officialContactLine() {
  return `- ${officialContact.title}: ${officialContact.whatsapp.displayNumber} (WhatsApp)`
}

/* ------------------------------------------------------------------ */
/*  System instructions sent to Gemini                                 */
/* ------------------------------------------------------------------ */

export function buildAiSystemInstructions(origin: string, language: AppLanguage = 'en') {
  const link = (path: string) => absoluteUrl(origin, path)
  const t = pmlCopy.en

  const facts = [
    `Company: ${pmlConfig.name}`,
    `Office address: ${pmlConfig.address.full}`,
    `Phone / WhatsApp: ${officialContact.whatsapp.displayNumber}`,
    `Instagram: ${siteConfig.instagram}`,
  ].join('\n')

  const practiceAreas = t.practiceAreas
    .map((area) => `${area.title}: ${area.description} (${area.points.join(', ')})`)
    .join('\n')

  const pages = [`Home (single-page site): ${link(siteRoutes.home)}`].join('\n')

  const rules =
    language === 'id'
      ? [
          'Jawab dalam Bahasa Indonesia yang sopan dan profesional, kecuali pengguna jelas menulis dalam Bahasa Inggris.',
          'Jawab langsung ke inti pertanyaan. Maksimal sekitar 150 kata.',
          'Gunakan paragraf pendek. Pakai bullet hanya jika benar-benar membantu (maksimal 5 poin).',
          'Jangan pernah mengarang biaya jasa hukum, tarif, atau janji hasil perkara. Jika ditanya biaya, jelaskan bahwa biaya tergantung pada kompleksitas kasus, lalu arahkan ke WhatsApp kantor.',
          'Tutup jawaban dengan kontak WhatsApp resmi beserta nomornya.',
          'Hanya gunakan tautan dari daftar halaman di atas. Jangan membuat URL baru.',
          'Jika pertanyaannya di luar layanan hukum firma ini, katakan dengan sopan bahwa itu di luar cakupan lalu tawarkan bantuan yang relevan.',
          'Jangan mengulang sapaan panjang atau menyebut dirimu sebagai AI di setiap jawaban.',
        ]
      : [
          'Reply in clear, professional English unless the user clearly writes in Indonesian.',
          'Answer the actual question first. Keep it under roughly 150 words.',
          'Use short paragraphs. Use bullets only when they genuinely help (max 5 points).',
          'Never invent legal fees, rates, or promises about case outcomes. If asked about cost, explain that fees depend on case complexity, then point to the office WhatsApp contact.',
          'End with the official WhatsApp contact and its number.',
          'Only use links from the page list above. Never invent URLs.',
          "If a question falls outside this firm's legal services, say so politely and offer what you can help with.",
          'Do not repeat long greetings or announce that you are an AI in every reply.',
        ]

  return [
    `You are the website assistant for ${pmlConfig.name}, a law firm based in ${pmlConfig.address.city}, Indonesia.`,
    `# Company facts\n${facts}`,
    `# Practice areas\n${practiceAreas}`,
    `# Site pages\n${pages}`,
    `# Official WhatsApp contact\n${officialContactLine()}`,
    `# Answering rules\n${rules.map((rule) => `- ${rule}`).join('\n')}`,
  ].join('\n\n')
}

/* ------------------------------------------------------------------ */
/*  Handoff reply used when no AI answer is available                  */
/* ------------------------------------------------------------------ */

function buildContactHandoffReply(language: AppLanguage = 'en') {
  if (language === 'id') {
    return `Untuk tindak lanjut yang lebih akurat, silakan lanjutkan ke WhatsApp ${officialContact.title} di ${officialContact.whatsapp.displayNumber}.`
  }

  return `For more accurate follow-up, please continue via the ${officialContact.title} WhatsApp contact at ${officialContact.whatsapp.displayNumber}.`
}

/* ------------------------------------------------------------------ */
/*  Deterministic answers                                              */
/*                                                                     */
/*  resolveLocalAssistantReply only handles facts and guardrails that   */
/*  must not be paraphrased by a model, and returns null for anything   */
/*  else so the request reaches Gemini.                                 */
/*                                                                     */
/*  resolveOfflineAssistantReply adds the keyword answers and is used   */
/*  only when Gemini is unavailable (missing API key, rate limit,       */
/*  network error, or static hosting without the API route).            */
/* ------------------------------------------------------------------ */

export function resolveLocalAssistantReply(
  question: string,
  requestOrigin: string,
  language: AppLanguage = 'en',
) {
  const q = normalizeQuestion(question)
  const words = countWords(q)
  const answer = (en: string, id: string) => (language === 'id' ? id : en)

  if (!q) return null

  /* --- Greetings (short messages only, so real questions still reach the AI) --- */
  if (words <= 4 && /^(hi|hello|hey|halo|hai|pagi|siang|sore|malam|selamat)\b/.test(q)) {
    return answer(
      'Hello! I can help explain our legal services and direct you to our WhatsApp contact. What would you like to know?',
      'Halo! Saya dapat membantu menjelaskan layanan hukum kami dan mengarahkan Anda ke kontak WhatsApp yang tepat. Apa yang ingin Anda ketahui?',
    )
  }

  /* --- Thanks (short messages only) --- */
  if (words <= 5 && /(terima kasih|makasih|thank you|thanks|thx)/.test(q)) {
    return answer(
      "You're welcome! Feel free to ask if you have any other questions about our legal services.",
      'Sama-sama! Jangan ragu untuk bertanya jika Anda memiliki pertanyaan lain tentang layanan hukum kami.',
    )
  }

  /* --- Fee guardrail: never let a model quote a legal fee --- */
  if (/(harga|biaya|tarif|price|cost|fee|berapa bayar)/.test(q)) {
    return answer(
      `Legal service fees depend on the complexity of your case. Please contact us directly on WhatsApp to discuss:\n${officialContactLine()}`,
      `Biaya jasa hukum tergantung pada kompleksitas kasus Anda. Silakan hubungi kami langsung via WhatsApp untuk berdiskusi:\n${officialContactLine()}`,
    )
  }

  /* --- Official contact --- */
  if (/(contact us|kontak|whatsapp|hubungi|telepon|nomor telepon|phone number)/.test(q)) {
    return answer(
      `Here is our official WhatsApp contact:\n${officialContactLine()}`,
      `Berikut kontak WhatsApp resmi kami:\n${officialContactLine()}`,
    )
  }

  /* --- Office address --- */
  if (/(alamat|address|lokasi kantor|office location|kantor dimana|di mana kantor)/.test(q)) {
    return answer(
      `Office address: ${pmlConfig.address.full}.\n\nContact: ${absoluteUrl(requestOrigin, siteRoutes.home)}`,
      `Alamat kantor: ${pmlConfig.address.full}.\n\nKontak: ${absoluteUrl(requestOrigin, siteRoutes.home)}`,
    )
  }

  /* Everything else goes to the AI. */
  return null
}

export function resolveOfflineAssistantReply(
  question: string,
  requestOrigin: string,
  language: AppLanguage = 'en',
) {
  const deterministic = resolveLocalAssistantReply(question, requestOrigin, language)
  if (deterministic) return deterministic

  const q = normalizeQuestion(question)
  const t = pmlCopy[language]
  const answer = (en: string, id: string) => (language === 'id' ? id : en)

  if (!q) return buildContactHandoffReply(language)

  /* --- Practice areas listing --- */
  if (/(practice area|bidang praktik|layanan|services|apa saja)/.test(q)) {
    return answer(
      `We handle two main practice areas: ${t.practiceAreas.map((a) => a.title).join(' and ')}.\n\n${officialContactLine()}`,
      `Kami menangani dua bidang praktik utama: ${t.practiceAreas.map((a) => a.title).join(' dan ')}.\n\n${officialContactLine()}`,
    )
  }

  /* --- Criminal law --- */
  if (/(pidana|criminal)/.test(q)) {
    const area = t.practiceAreas[0]
    return answer(
      `${area.title}: ${area.description}\n\n${officialContactLine()}`,
      `${area.title}: ${area.description}\n\n${officialContactLine()}`,
    )
  }

  /* --- Civil law --- */
  if (/(perdata|civil|kontrak|contract|sengketa|dispute)/.test(q)) {
    const area = t.practiceAreas[1]
    return answer(
      `${area.title}: ${area.description}\n\n${officialContactLine()}`,
      `${area.title}: ${area.description}\n\n${officialContactLine()}`,
    )
  }

  /* --- About / company profile --- */
  if (/(company|profil|perusahaan|tentang|about|firma|law firm|pengacara)/.test(q)) {
    return answer(
      `${pmlConfig.name}: ${pmlConfig.description.en}\n\nOffice: ${pmlConfig.address.full}\n\n${officialContactLine()}`,
      `${pmlConfig.name}: ${pmlConfig.description.id}\n\nKantor: ${pmlConfig.address.full}\n\n${officialContactLine()}`,
    )
  }

  return answer(
    `Thank you for your question. For accurate legal guidance, please contact us directly on WhatsApp:\n${officialContactLine()}`,
    `Terima kasih atas pertanyaan Anda. Untuk panduan hukum yang akurat, silakan hubungi kami langsung via WhatsApp:\n${officialContactLine()}`,
  )
}
