import { pmlConfig } from '@/lib/pml-content'
import { siteRoutes } from '@/lib/routes'
import { buildWhatsappHref, formatWhatsappNumber, normalizeWhatsappNumber } from '@/lib/whatsapp'

export { siteRoutes }

function normalizeSiteUrl(value: string | undefined) {
  const normalized = value?.trim().replace(/\/+$/, '')
  if (!normalized) return null

  const withProtocol = /^https?:\/\//i.test(normalized) ? normalized : `https://${normalized}`

  try {
    return new URL(withProtocol).origin
  } catch {
    return null
  }
}

const siteUrl =
  normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
  normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  'https://www.pemenanglawfirm.com'


export const siteAssets = {
  logo: pmlConfig.logo,
} as const

export const siteMedia = {
  brandLogo: {
    url: siteAssets.logo,
    width: 590,
    height: 1000,
    alt: 'Logo Pemenang Mandiri Law Firm',
  },
  officeHero: {
    url: '/photos/hero-law-office.png',
    width: 1024,
    height: 1024,
    alt: 'Kantor Pemenang Mandiri Lawfirm & Partners di Surabaya',
  },
} as const

type ContactTheme = {
  card: string
  mediaOverlay: string
  icon: string
  row: string
}

type ContactDefinition = {
  id: string
  title: string
  category: string
  /** Optional: overrides the generated WhatsApp starter message. */
  message?: { en: string; id: string }
  image: string
  imageAlt: string
  imagePosition: string
  whatsappNumber?: string
  whatsappFallback: string
  theme: ContactTheme
}

function defineContact<const T extends ContactDefinition>(contact: T) {
  const whatsappNumber = normalizeWhatsappNumber(contact.whatsappNumber, contact.whatsappFallback)

  return {
    ...contact,
    whatsapp: {
      number: whatsappNumber,
      displayNumber: formatWhatsappNumber(whatsappNumber),
      href: buildWhatsappHref(whatsappNumber),
      message: contact.message ?? {
        en: `Hello Pemenang Mandiri Law Firm, I would like to discuss ${contact.title}.`,
        id: `Halo Pemenang Mandiri Law Firm, saya ingin berkonsultasi mengenai ${contact.title}.`,
      },
    },
  } as const
}

export const contactDirectory = [
  defineContact({
    id: 'pml-law-firm',
    title: 'PML Law Firm',
    category: 'Legal Services',
    image: '/photos/hero-law-office.png',
    imageAlt: 'Kantor Pemenang Mandiri Lawfirm & Partners untuk pendampingan hukum',
    imagePosition: 'object-center',
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_LAW_FIRM,
    whatsappFallback: '6289638714065',
    message: {
      en: 'Hello Pemenang Mandiri Lawfirm & Partners, I would like to discuss legal services.',
      id: 'Halo Pemenang Mandiri Lawfirm & Partners, saya ingin mendiskusikan layanan hukum.',
    },
    theme: {
      card: 'border-amber-900/12 bg-[linear-gradient(145deg,#FFFFFF_0%,#FEFCE8_100%)]',
      mediaOverlay: 'bg-[linear-gradient(180deg,rgba(69,26,3,0.03)_0%,rgba(69,26,3,0.92)_100%)]',
      icon: 'bg-amber-700 text-white shadow-amber-950/20',
      row: 'border-amber-900/10 bg-white/80 hover:border-amber-700/35',
    },
  }),
] as const

export type ContactId = (typeof contactDirectory)[number]['id']
export type Contact = (typeof contactDirectory)[number]

export const contactById = Object.fromEntries(
  contactDirectory.map((contact) => [contact.id, contact]),
) as Record<ContactId, Contact>

export function getContactWhatsappHref(contact: Contact, language: 'en' | 'id' = 'en') {
  return `${contact.whatsapp.href}?text=${encodeURIComponent(contact.whatsapp.message[language])}`
}

export const siteConfig = {
  name: 'Pemenang Mandiri Law Firm',
  shortName: 'Pemenang Mandiri',
  url: siteUrl,
  locale: 'en_US',
  language: 'en',
  lastUpdated: '2026-09-01',
  description:
    'Pemenang Mandiri Lawfirm & Partners is a law firm in Surabaya handling criminal law, civil law, and legal dispute representation.',
  phone: contactById['pml-law-firm'].whatsapp.displayNumber,
  whatsapp: contactById['pml-law-firm'].whatsapp.href,
  instagram: 'https://www.instagram.com/pemenangkonsultan',
  address: pmlConfig.address.full,
  addressLocality: 'Surabaya',
  addressCountry: 'ID',
  assets: siteAssets,
  defaultOgImage: siteMedia.officeHero,
  keywords: [
    'Pemenang Mandiri Law Firm',
    'Pemenang Mandiri Lawfirm & Partners',
    'firma hukum Surabaya',
    'pengacara Surabaya',
    'hukum pidana Surabaya',
    'hukum perdata Surabaya',
    'konsultasi hukum Surabaya',
  ],
} as const

export const aiAssistantConfig = {
  defaultModel: 'gemini-2.5-flash-lite',
  shortWindowMs: 10 * 60 * 1000,
  dailyWindowMs: 24 * 60 * 60 * 1000,
  defaultLimitPerShortWindow: 5,
  defaultLimitPerDay: 15,
  maxMessages: 10,
  maxMessageLength: 1_200,
  maxVisitorIdLength: 100,
  requestTimeoutMs: 25_000,
  temperature: 0.3,
  topP: 0.9,
  maxOutputTokens: 900,
  geminiEndpoint: 'https://generativelanguage.googleapis.com/v1beta/models',
} as const


export const pageSeo = {
  home: {
    title: 'Pemenang Mandiri Lawfirm & Partners | Firma Hukum Surabaya',
    description: siteConfig.description,
    path: siteRoutes.home,
    image: siteConfig.defaultOgImage,
  },
} as const
