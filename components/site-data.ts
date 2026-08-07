export const lawFirmConfig = {
  name: 'Pemenang Mandiri Law Firm & Partners',
  shortName: 'Pemenang Mandiri',
  whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP_LAW_FIRM ?? '6289638714065').replace(/\D/g, ''),
  pemenangKonsultanUrl: process.env.NEXT_PUBLIC_PEMENANG_KONSULTAN_URL || 'https://pemenangkonsultan.com',
  heroImages: [
    '/photos/hero-law-office.png',
    '/photos/hero-consultation.png',
    '/photos/hero-legal-documents.png',
  ],
  contactPortrait: '/photos/contact-portrait.png',
} as const

export function buildWhatsappHref(message: string): string {
  return `https://wa.me/${lawFirmConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
}
