export const lawFirmConfig = {
  name: 'Pemenang Mandiri Lawfirm & Partners',
  shortName: 'Pemenang Mandiri',
  address: {
    street: 'Blok C, Plaza Segi 8 No.819',
    district: 'Sonokwijenan, Kec. Sukomanunggal',
    city: 'Surabaya',
    province: 'Jawa Timur',
    postalCode: '60255',
    full: 'Blok C, Plaza Segi 8 No.819, Sonokwijenan, Kec. Sukomanunggal, Surabaya, Jawa Timur 60255',
    mapsUrl: 'https://maps.google.com/?q=Blok+C,+Plaza+Segi+8+No.819,+Sonokwijenan,+Kec.+Sukomanunggal,+Surabaya,+Jawa+Timur+60255',
  },
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
