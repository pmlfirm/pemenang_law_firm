import { pmlConfig } from '@/lib/pml-content'
import {
  companyAbout,
  contactDirectory,
  marineSubProductSlugs,
  productIds,
  siteConfig,
  siteRoutes,
} from '@/lib/site-data'
import type { AppLanguage } from '@/lib/language-types'

export type AiChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

/** Derived from the product catalogue so links can never drift out of sync. */
const productLinks = {
  marine: `${siteRoutes.products}/${productIds.marine}`,
  marineCargo: `${siteRoutes.products}/${marineSubProductSlugs.marineCargo}`,
  marineHull: `${siteRoutes.products}/${marineSubProductSlugs.marineHull}`,
  fireProperty: `${siteRoutes.products}/${productIds.property}`,
  motorVehicle: `${siteRoutes.products}/${productIds.vehicle}`,
  travel: `${siteRoutes.products}/${productIds.travel}`,
  liability: `${siteRoutes.products}/${productIds.liability}`,
  claim: `${siteRoutes.products}/${productIds.claim}`,
} as const

function normalizeQuestion(value?: string) {
  return (value || '').toLowerCase().trim()
}

function countWords(value: string) {
  return value.split(/\s+/).filter(Boolean).length
}

function formatContactLines() {
  return contactDirectory
    .map((contact) => `- ${contact.title}: ${contact.whatsapp.displayNumber} (WhatsApp)`)
    .join('\n')
}

function absoluteUrl(origin: string, path: string) {
  return `${origin}${path}`
}

function findContact(id: string) {
  return contactDirectory.find((item) => item.id === id)
}

/* ------------------------------------------------------------------ */
/*  System instructions sent to Gemini                                 */
/* ------------------------------------------------------------------ */

export function buildAiSystemInstructions(origin: string, language: AppLanguage = 'en') {
  const about = companyAbout
  const link = (path: string) => absoluteUrl(origin, path)

  const facts = [
    `Company: ${siteConfig.name}`,
    `Established: ${about.founded} as ${about.tradeName}, based in ${about.address}`,
    `License Number: ${about.licenseNumber} (registered ${about.licenseDate})`,
    `Trade Registration: ${about.tradeRegistration}. Business Permit: ${about.businessPermit}`,
    `Vision: ${about.vision.en}`,
    `Mission: ${about.mission.en.join(' | ')}`,
    `Instagram: ${siteConfig.instagram}`,
  ].join('\n')

  const products = [
    `Marine Cargo (${link(productLinks.marineCargo)}): ${about.products.marineCargo.en}`,
    `Marine Hull (${link(productLinks.marineHull)}): ${about.products.marineHull.en}`,
    `FIRE / Property (${link(productLinks.fireProperty)}): ${about.products.fireProperty.en}`,
    `Motor Vehicle (${link(productLinks.motorVehicle)}): ${about.products.motorVehicle.en}`,
    `Travel (${link(productLinks.travel)}): ${about.products.travel.en}`,
    `Liability (${link(productLinks.liability)}): ${about.products.liability.en}`,
    `Claim Assistance (${link(productLinks.claim)}): ${about.products.claimAssistance.en}`,
  ].join('\n')

  const lawFirm = [
    `${about.lawFirm.name} is the law firm division of the group and lives on this same website at ${link(about.lawFirm.path)}.`,
    about.lawFirm.description.en,
    `Law firm office: ${about.lawFirm.address}. Phone: ${pmlConfig.phone}.`,
    'It handles criminal law, civil law, and legal support for insurance claim disputes.',
  ].join('\n')

  const pages = [
    `Home: ${link(siteRoutes.home)}`,
    `Products: ${link(siteRoutes.products)}`,
    `Company Profile: ${link(siteRoutes.companyProfile)}`,
    `Our Partner: ${link(siteRoutes.ourPartner)}`,
    `Get in Touch: ${link(siteRoutes.contact)}`,
    `PML law firm: ${link(about.lawFirm.path)}`,
  ].join('\n')

  const rules =
    language === 'id'
      ? [
          'Jawab dalam Bahasa Indonesia yang sopan dan profesional, kecuali pengguna jelas menulis dalam Bahasa Inggris.',
          'Jawab langsung ke inti pertanyaan. Maksimal sekitar 150 kata.',
          'Gunakan paragraf pendek. Pakai bullet hanya jika benar-benar membantu (maksimal 5 poin).',
          'Jangan pernah mengarang premi, tarif, ketentuan polis, diskon, atau janji penerimaan klaim. Jika ditanya harga, jelaskan bahwa premi bergantung pada objek, nilai pertanggungan, dan profil risiko, lalu arahkan ke WhatsApp produk yang relevan.',
          'Tutup jawaban dengan satu kontak WhatsApp yang paling relevan beserta nomornya, bukan seluruh daftar.',
          'Hanya gunakan tautan dari daftar halaman di atas. Jangan membuat URL baru.',
          'Jika pertanyaannya di luar asuransi dan layanan hukum perusahaan ini, katakan dengan sopan bahwa itu di luar cakupan lalu tawarkan bantuan yang relevan.',
          'Jangan mengulang sapaan panjang atau menyebut dirimu sebagai AI di setiap jawaban.',
        ]
      : [
          'Reply in clear, professional English unless the user clearly writes in Indonesian.',
          'Answer the actual question first. Keep it under roughly 150 words.',
          'Use short paragraphs. Use bullets only when they genuinely help (max 5 points).',
          'Never invent premiums, rates, policy wording, discounts, or claim-acceptance promises. If asked about price, explain that premiums depend on the insured object, declared value, and risk profile, then point to the relevant product WhatsApp contact.',
          'End with the single most relevant WhatsApp contact and its number, not the whole list.',
          'Only use links from the page list above. Never invent URLs.',
          'If a question falls outside this company\'s insurance and legal services, say so politely and offer what you can help with.',
          'Do not repeat long greetings or announce that you are an AI in every reply.',
        ]

  return [
    `You are the website assistant for ${siteConfig.name}, an insurance consultant in ${about.address} that also operates the ${about.lawFirm.name} law firm division.`,
    `# Company facts\n${facts}`,
    `# Products consulted\n${products}`,
    `# Law firm division (PML)\n${lawFirm}`,
    `# Site pages\n${pages}`,
    `# Official WhatsApp contacts\n${formatContactLines()}`,
    `# Answering rules\n${rules.map((rule) => `- ${rule}`).join('\n')}`,
  ].join('\n\n')
}

/* ------------------------------------------------------------------ */
/*  Handoff reply used when no AI answer is available                  */
/* ------------------------------------------------------------------ */

function buildContactHandoffReply(question = '', language: AppLanguage = 'en') {
  const q = normalizeQuestion(question)
  let recommended = contactDirectory.find((contact) => q.includes(contact.id.replaceAll('-', ' ')))

  if (!recommended) {
    if (q.includes('cargo')) recommended = findContact('marine-cargo')
    if (q.includes('hull') || q.includes('kapal')) recommended = findContact('marine-hull')
    if (q.includes('kendaraan') || q.includes('vehicle') || q.includes('mobil') || q.includes('motor')) recommended = findContact('motor-vehicle')
    if (q.includes('property') || q.includes('fire') || q.includes('properti') || q.includes('kebakaran')) recommended = findContact('fire-property')
    if (q.includes('travel') || q.includes('perjalanan')) recommended = findContact('travel')
    if (q.includes('liability') || q.includes('tanggung jawab')) recommended = findContact('liability')
    if (q.includes('claim') || q.includes('klaim')) recommended = findContact('claim')
  }

  if (language === 'id') {
    return recommended
      ? `Untuk tindak lanjut yang lebih akurat, silakan lanjutkan ke WhatsApp ${recommended.title} di ${recommended.whatsapp.displayNumber}. Jika Anda mau, Anda juga dapat membuka daftar kontak produk dan memilih tim yang paling sesuai.`
      : `Untuk tindak lanjut yang lebih akurat, silakan lanjutkan melalui daftar kontak WhatsApp produk dan pilih tim yang paling sesuai dengan kebutuhan Anda.`
  }

  return recommended
    ? `For more accurate follow-up, please continue via the ${recommended.title} WhatsApp contact at ${recommended.whatsapp.displayNumber}. You can also open the product contact list and choose the most relevant team.`
    : `For more accurate follow-up, please continue through the product WhatsApp contact list and choose the team that best matches your needs.`
}

/* ------------------------------------------------------------------ */
/*  Deterministic answers                                              */
/*                                                                     */
/*  resolveLocalAssistantReply only handles facts and guardrails that   */
/*  must not be paraphrased by a model, and returns null for anything   */
/*  else so the request reaches Gemini.                                 */
/*                                                                     */
/*  resolveOfflineAssistantReply adds the keyword product answers and   */
/*  is used only when Gemini is unavailable (missing API key, rate      */
/*  limit, network error, or static hosting without the API route).     */
/* ------------------------------------------------------------------ */

export function resolveLocalAssistantReply(
  question: string,
  requestOrigin: string,
  language: AppLanguage = 'en',
) {
  const q = normalizeQuestion(question)
  const about = companyAbout
  const words = countWords(q)
  const answer = (en: string, id: string) => (language === 'id' ? id : en)

  if (!q) return null

  /* --- Greetings (short messages only, so real questions still reach the AI) --- */
  if (words <= 4 && /^(hi|hello|hey|halo|hai|pagi|siang|sore|malam|selamat)\b/.test(q)) {
    return answer(
      'Hello! I can help explain our insurance products, company profile, and direct you to the right WhatsApp contact. What would you like to know?',
      'Halo! Saya dapat membantu menjelaskan produk asuransi, profil perusahaan, dan mengarahkan Anda ke kontak WhatsApp yang tepat. Apa yang ingin Anda ketahui?',
    )
  }

  /* --- Thanks (short messages only) --- */
  if (words <= 5 && /(terima kasih|makasih|thank you|thanks|thx)/.test(q)) {
    return answer(
      "You're welcome! Feel free to ask if you have any other questions about our insurance products or services.",
      'Sama-sama! Jangan ragu untuk bertanya jika Anda memiliki pertanyaan lain tentang produk atau layanan asuransi kami.',
    )
  }

  /* --- Price guardrail: never let a model quote a premium --- */
  if (/(harga|biaya|premi|tarif|price|cost|quote|berapa bayar)/.test(q)) {
    return answer(
      `Insurance premiums and consultation quotes depend on your specific risk profile, asset values, or coverage needs. Please select a product WhatsApp contact to discuss with our team:\n${formatContactLines()}\n\nContact page: ${absoluteUrl(requestOrigin, siteRoutes.contact)}`,
      `Besaran premi dan konsultasi penutupan asuransi disesuaikan dengan nilai objek, jenis risiko, serta kebutuhan perlindungan Anda. Silakan hubungi tim kami via WhatsApp resmi:\n${formatContactLines()}\n\nHalaman kontak: ${absoluteUrl(requestOrigin, siteRoutes.contact)}`,
    )
  }

  /* --- Official contact list --- */
  if (/(contact us|kontak|whatsapp|hubungi|telepon|nomor telepon|phone number)/.test(q)) {
    return answer(
      `Here are the official WhatsApp contacts by product:\n${formatContactLines()}\n\nContact page: ${absoluteUrl(requestOrigin, siteRoutes.contact)}`,
      `Berikut kontak WhatsApp resmi per produk:\n${formatContactLines()}\n\nHalaman kontak: ${absoluteUrl(requestOrigin, siteRoutes.contact)}`,
    )
  }

  /* --- Registration numbers --- */
  if (/(lisensi|license|registrasi|nomor izin|izin usaha|siup)/.test(q)) {
    return answer(
      `License Number: ${about.licenseNumber}\nTrade Registration: ${about.tradeRegistration}\nBusiness Permit: ${about.businessPermit}\n\nRegistered since ${about.licenseDate}.`,
      `Nomor Lisensi: ${about.licenseNumber}\nNomor Daftar Perdagangan: ${about.tradeRegistration}\nNomor Surat Ijin Usaha: ${about.businessPermit}\n\nTerdaftar sejak ${about.licenseDate}.`,
    )
  }

  /* --- Company timeline --- */
  if (/(sejarah|history|didirikan|founded|kapan berdiri|berdiri sejak)/.test(q)) {
    const lang = language === 'id' ? 'id' : 'en'
    const timeline = about.timeline.map((entry) => `• ${entry.date}: ${entry[lang]}`).join('\n')
    return answer(
      `Company History:\n${timeline}\n\nLicense: ${about.licenseNumber}\nTrade Registration: ${about.tradeRegistration}\n\nMore: ${absoluteUrl(requestOrigin, siteRoutes.companyProfile)}`,
      `Sejarah Perusahaan:\n${timeline}\n\nNomor Lisensi: ${about.licenseNumber}\nNomor Daftar Perdagangan: ${about.tradeRegistration}\n\nSelengkapnya: ${absoluteUrl(requestOrigin, siteRoutes.companyProfile)}`,
    )
  }

  /* --- Office address --- */
  if (/(alamat|address|lokasi kantor|office location|kantor dimana|di mana kantor)/.test(q)) {
    return answer(
      `Insurance consultation office: ${about.address}.\nLaw firm office (${about.lawFirm.name}): ${about.lawFirm.address}.\n\nContact page: ${absoluteUrl(requestOrigin, siteRoutes.contact)}`,
      `Kantor konsultasi asuransi: ${about.address}.\nKantor firma hukum (${about.lawFirm.name}): ${about.lawFirm.address}.\n\nHalaman kontak: ${absoluteUrl(requestOrigin, siteRoutes.contact)}`,
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
  const about = companyAbout
  const answer = (en: string, id: string) => (language === 'id' ? id : en)

  const productAnswer = (
    copy: { en: string; id: string },
    contactId: string,
    label: string,
    href: string,
  ) => {
    const contact = findContact(contactId)
    return answer(
      `${copy.en}\n\nFor a direct discussion, please contact ${label} WhatsApp at ${contact?.whatsapp.displayNumber}.\nProduct page: ${absoluteUrl(requestOrigin, href)}`,
      `${copy.id}\n\nUntuk diskusi langsung, silakan hubungi WhatsApp ${label} di ${contact?.whatsapp.displayNumber}.\nHalaman produk: ${absoluteUrl(requestOrigin, href)}`,
    )
  }

  if (!q) return buildContactHandoffReply(question, language)

  /* --- Product listing --- */
  if (/(produk|product|services|layanan)/.test(q)) {
    return answer(
      `We consult on six main categories: Marine Insurance, FIRE / Property Insurance, Motor Vehicle Insurance, Travel Insurance, Liability Insurance, and Claim Assistance. View all: ${absoluteUrl(requestOrigin, siteRoutes.products)}`,
      `Kami mengkonsultasikan enam kategori utama: Marine Insurance, FIRE / Property Insurance, Motor Vehicle Insurance, Travel Insurance, Liability Insurance, dan Claim Assistance. Lihat semua: ${absoluteUrl(requestOrigin, siteRoutes.products)}`,
    )
  }

  /* --- ICC clauses --- */
  if (q.includes('icc') || (q.includes('clause') && q.includes('cargo'))) {
    const contact = findContact('marine-cargo')
    return answer(
      `ICC stands for Institute Cargo Clauses. There are 3 types: ICC "A" (All Risks, most comprehensive), ICC "B" (Named Perils Broad, medium), and ICC "C" (Named Perils Basic, covers major risks only). For detailed comparison, visit: ${absoluteUrl(requestOrigin, productLinks.marineCargo)}\n\nContact: ${contact?.whatsapp.displayNumber}`,
      `ICC singkatan dari Institute Cargo Clauses. Ada 3 jenis: ICC "A" (All Risks, paling lengkap), ICC "B" (Named Perils Broad, menengah), dan ICC "C" (Named Perils Basic, hanya risiko utama). Lihat perbandingan detail: ${absoluteUrl(requestOrigin, productLinks.marineCargo)}\n\nKontak: ${contact?.whatsapp.displayNumber}`,
    )
  }

  if (q.includes('marine cargo') || q.includes('kargo')) {
    return productAnswer(about.products.marineCargo, 'marine-cargo', 'Marine Cargo', productLinks.marineCargo)
  }

  if (q.includes('marine hull') || (q.includes('kapal') && !q.includes('cargo'))) {
    return productAnswer(about.products.marineHull, 'marine-hull', 'Marine Hull', productLinks.marineHull)
  }

  if (/(property|properti|fire|kebakaran|flexas|gedung|bangunan)/.test(q)) {
    return productAnswer(about.products.fireProperty, 'fire-property', 'FIRE / Property', productLinks.fireProperty)
  }

  if (/(kendaraan|vehicle|mobil|motor|comprehensive|tlo)/.test(q)) {
    return productAnswer(about.products.motorVehicle, 'motor-vehicle', 'Motor Vehicle', productLinks.motorVehicle)
  }

  if (/(travel|perjalanan)/.test(q)) {
    return productAnswer(about.products.travel, 'travel', 'Travel Insurance', productLinks.travel)
  }

  if (/(liability|tanggung jawab)/.test(q)) {
    return productAnswer(about.products.liability, 'liability', 'Liability Insurance', productLinks.liability)
  }

  if (/(claim|klaim)/.test(q)) {
    const contact = findContact('claim')
    return answer(
      `${about.products.claimAssistance.en}\n\nTo get started, prepare: policy number, chronology, photos, and supporting documents. Contact Claim Assistance WhatsApp at ${contact?.whatsapp.displayNumber}.\nProduct page: ${absoluteUrl(requestOrigin, productLinks.claim)}`,
      `${about.products.claimAssistance.id}\n\nUntuk memulai, siapkan: nomor polis, kronologi, foto, dan dokumen pendukung. Hubungi WhatsApp Claim Assistance di ${contact?.whatsapp.displayNumber}.\nHalaman produk: ${absoluteUrl(requestOrigin, productLinks.claim)}`,
    )
  }

  /* --- Vision & mission --- */
  if (/(visi|misi|vision|mission)/.test(q)) {
    return answer(
      `Vision: ${about.vision.en}\n\nMission:\n${about.mission.en.map((m, i) => `${i + 1}. ${m}`).join('\n')}\n\nLearn more: ${absoluteUrl(requestOrigin, siteRoutes.companyProfile)}`,
      `Visi: ${about.vision.id}\n\nMisi:\n${about.mission.id.map((m, i) => `${i + 1}. ${m}`).join('\n')}\n\nSelengkapnya: ${absoluteUrl(requestOrigin, siteRoutes.companyProfile)}`,
    )
  }

  /* --- Law firm division --- */
  if (/(pemenang mandiri|law firm|lawfirm|firma hukum|pengacara|hukum|pidana|perdata|pml)/.test(q)) {
    return answer(
      `${about.lawFirm.name}: ${about.lawFirm.description.en}\n\nOffice: ${about.lawFirm.address}\nOpen the page: ${absoluteUrl(requestOrigin, about.lawFirm.path)}`,
      `${about.lawFirm.name}: ${about.lawFirm.description.id}\n\nKantor: ${about.lawFirm.address}\nBuka halaman: ${absoluteUrl(requestOrigin, about.lawFirm.path)}`,
    )
  }

  /* --- Company profile --- */
  if (/(company|profil|perusahaan|tentang|about)/.test(q)) {
    return answer(
      `${siteConfig.name} was established on ${about.founded} in ${about.address} as a trusted insurance consultant. We consult on Marine, Property, Motor Vehicle, Travel, Liability insurance, and Claim Assistance.\n\nCompany Profile: ${absoluteUrl(requestOrigin, siteRoutes.companyProfile)}`,
      `${siteConfig.name} didirikan pada ${about.founded} di ${about.address} sebagai konsultan asuransi terpercaya. Kami mengkonsultasikan Marine, Property, Motor Vehicle, Travel, Liability insurance, dan Claim Assistance.\n\nProfil Perusahaan: ${absoluteUrl(requestOrigin, siteRoutes.companyProfile)}`,
    )
  }

  return answer(
    `Thank you for your question. For accurate product details, policy consultations, and claim guidance, please choose from our official product WhatsApp contacts:\n${formatContactLines()}\n\nProducts: ${absoluteUrl(requestOrigin, siteRoutes.products)}`,
    `Terima kasih atas pertanyaan Anda. Untuk informasi detail produk, konsultasi polis, dan panduan klaim secara akurat, silakan hubungi tim kami melalui WhatsApp produk resmi:\n${formatContactLines()}\n\nProduk: ${absoluteUrl(requestOrigin, siteRoutes.products)}`,
  )
}
