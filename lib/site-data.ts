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
  productHero: {
    url: '/photos/product-hero-bg-new.webp',
    width: 1916,
    height: 821,
    alt: 'Portofolio produk asuransi Pemenang Konsultan untuk marine, properti, kendaraan, travel, liability, dan claim',
  },
  companyHero: {
    url: '/photos/company-hero-pml.webp',
    width: 1376,
    height: 768,
    alt: 'Lobby resepsionis kantor Pemenang Mandiri Law Firm dengan logo PML emas di dinding',
  },
  contactSupport: {
    url: '/photos/contact-support.webp',
    width: 1448,
    height: 1086,
    alt: 'Tim Pemenang Konsultan membantu konsultasi produk dan koordinasi claim',
  },
  aboutConsulting: {
    url: '/photos/about-consulting.webp',
    width: 1448,
    height: 1086,
    alt: 'Konsultan Pemenang meninjau kebutuhan perlindungan dan dokumen asuransi bersama klien',
  },
  pmlHero: {
    url: '/photos/hero-law-office.png',
    width: 1024,
    height: 1024,
    alt: 'Kantor Pemenang Mandiri Lawfirm & Partners di Surabaya',
  },
} as const

const fallbackWhatsappNumber = normalizeWhatsappNumber(
  process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT,
  '6282245686979',
)

const officialWhatsApp = {
  number: fallbackWhatsappNumber,
  displayNumber: formatWhatsappNumber(fallbackWhatsappNumber),
  href: buildWhatsappHref(fallbackWhatsappNumber),
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
  /** Optional: contacts without a public mailbox simply hide the email row. */
  email?: string
  /** Optional: overrides the generated WhatsApp starter message. */
  message?: { en: string; id: string }
  /** Optional: set false to keep a contact out of the Contact Us card grid. */
  showOnContactPage?: boolean
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
    email: contact.email ?? null,
    showOnContactPage: contact.showOnContactPage ?? true,
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
    id: 'marine-cargo',
    title: 'Marine Cargo',
    category: 'Marine Insurances',
    email: 'pemenang_mcargo@yahoo.com',
    image: '/photos/product-marine-cargo.webp',
    imageAlt: 'Cargo goods and shipping containers for Marine Cargo Insurance',
    imagePosition: 'object-center',
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_MARINE_CARGO,
    whatsappFallback: '6281331831044',
    theme: {
      card: 'border-cyan-900/12 bg-[linear-gradient(145deg,#FFFFFF_0%,#ECFEFF_100%)]',
      mediaOverlay: 'bg-[linear-gradient(180deg,rgba(8,47,73,0.04)_0%,rgba(8,47,73,0.92)_100%)]',
      icon: 'bg-cyan-700 text-white shadow-cyan-950/20',
      row: 'border-cyan-900/10 bg-white/80 hover:border-cyan-700/35',
    },
  }),
  defineContact({
    id: 'marine-hull',
    title: 'Marine Hull',
    category: 'Marine Insurances',
    email: 'pemenang_mchull@yahoo.com',
    image: '/photos/product-marine-hull.webp',
    imageAlt: 'Large cargo vessel for Marine Hull Insurance',
    imagePosition: 'object-center',
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_MARINE_HULL,
    whatsappFallback: '6282231222245',
    theme: {
      card: 'border-indigo-900/12 bg-[linear-gradient(145deg,#FFFFFF_0%,#EEF2FF_100%)]',
      mediaOverlay: 'bg-[linear-gradient(180deg,rgba(30,27,75,0.04)_0%,rgba(30,27,75,0.92)_100%)]',
      icon: 'bg-indigo-700 text-white shadow-indigo-950/20',
      row: 'border-indigo-900/10 bg-white/80 hover:border-indigo-700/35',
    },
  }),
  defineContact({
    id: 'fire-property',
    title: 'FIRE / Property',
    category: 'Property Insurance',
    email: 'pemenang_fire@yahoo.com',
    image: '/photos/product-property.webp',
    imageAlt: 'Commercial property for FIRE and Property Insurance',
    imagePosition: 'object-center',
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_FIRE_PROPERTY,
    whatsappFallback: '6285755786252',
    theme: {
      card: 'border-orange-900/12 bg-[linear-gradient(145deg,#FFFFFF_0%,#FFF7ED_100%)]',
      mediaOverlay: 'bg-[linear-gradient(180deg,rgba(124,45,18,0.03)_0%,rgba(124,45,18,0.92)_100%)]',
      icon: 'bg-orange-700 text-white shadow-orange-950/20',
      row: 'border-orange-900/10 bg-white/80 hover:border-orange-700/35',
    },
  }),
  defineContact({
    id: 'motor-vehicle',
    title: 'Motor Vehicle',
    category: 'Vehicle Insurance',
    email: 'pemenang_car@yahoo.com',
    image: '/photos/product-vehicle.webp',
    imageAlt: 'Vehicle for Motor Vehicle Insurance',
    imagePosition: 'object-center',
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_MOTOR_VEHICLE,
    whatsappFallback: '6281253996580',
    theme: {
      card: 'border-blue-900/12 bg-[linear-gradient(145deg,#FFFFFF_0%,#EFF6FF_100%)]',
      mediaOverlay: 'bg-[linear-gradient(180deg,rgba(23,37,84,0.03)_0%,rgba(23,37,84,0.92)_100%)]',
      icon: 'bg-blue-700 text-white shadow-blue-950/20',
      row: 'border-blue-900/10 bg-white/80 hover:border-blue-700/35',
    },
  }),
  defineContact({
    id: 'travel',
    title: 'Travel Insurance',
    category: 'Travel Protection',
    email: 'pemenang_mcargo@yahoo.com',
    image: '/photos/product-travel.webp',
    imageAlt: 'Airport travel scene for Travel Insurance',
    imagePosition: 'object-center',
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_TRAVEL,
    whatsappFallback: '6282245686979',
    theme: {
      card: 'border-teal-900/12 bg-[linear-gradient(145deg,#FFFFFF_0%,#F0FDFA_100%)]',
      mediaOverlay: 'bg-[linear-gradient(180deg,rgba(19,78,74,0.03)_0%,rgba(19,78,74,0.92)_100%)]',
      icon: 'bg-teal-700 text-white shadow-teal-950/20',
      row: 'border-teal-900/10 bg-white/80 hover:border-teal-700/35',
    },
  }),
  defineContact({
    id: 'liability',
    title: 'Liability Insurance',
    category: 'Liability Protection',
    email: 'pemenang_mcargo@yahoo.com',
    image: '/photos/product-liability.webp',
    imageAlt: 'Professional liability document consultation',
    imagePosition: 'object-center',
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_LIABILITY,
    whatsappFallback: '6282245686979',
    theme: {
      card: 'border-violet-900/12 bg-[linear-gradient(145deg,#FFFFFF_0%,#F5F3FF_100%)]',
      mediaOverlay: 'bg-[linear-gradient(180deg,rgba(76,29,149,0.03)_0%,rgba(76,29,149,0.92)_100%)]',
      icon: 'bg-violet-700 text-white shadow-violet-950/20',
      row: 'border-violet-900/10 bg-white/80 hover:border-violet-700/35',
    },
  }),
  defineContact({
    id: 'claim',
    title: 'Claim Assistance',
    category: 'Claim Support',
    email: 'pemenang_claim@yahoo.co.id',
    image: '/photos/product-claim.webp',
    imageAlt: 'Claim documents and loss evidence review',
    imagePosition: 'object-center',
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_CLAIM,
    whatsappFallback: '6282245686979',
    theme: {
      card: 'border-rose-900/12 bg-[linear-gradient(145deg,#FFFFFF_0%,#FFF1F2_100%)]',
      mediaOverlay: 'bg-[linear-gradient(180deg,rgba(76,5,25,0.03)_0%,rgba(76,5,25,0.92)_100%)]',
      icon: 'bg-rose-700 text-white shadow-rose-950/20',
      row: 'border-rose-900/10 bg-white/80 hover:border-rose-700/35',
    },
  }),
  defineContact({
    id: 'pml-law-firm',
    title: 'PML Law Firm',
    category: 'Legal Services',
    image: '/photos/hero-law-office.png',
    imageAlt: 'Kantor Pemenang Mandiri Lawfirm & Partners untuk pendampingan hukum',
    imagePosition: 'object-center',
    showOnContactPage: false,
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
    'Pemenang Mandiri Law Firm provides structured insurance consultation for Marine, FIRE / Property, Motor Vehicle, Travel, and Liability, plus claim assistance and legal support through its PML law firm division in Surabaya.',
  phone: officialWhatsApp.displayNumber,
  whatsapp: officialWhatsApp.href,
  instagram: 'https://www.instagram.com/pemenangkonsultan',
  email: contactDirectory[0].email,
  address: 'Surabaya, Indonesia',
  addressLocality: 'Surabaya',
  addressCountry: 'ID',
  assets: siteAssets,
  defaultOgImage: siteMedia.companyHero,
  keywords: [
    'Pemenang Mandiri Law Firm',
    'Pemenang Mandiri Lawfirm & Partners',
    'Pemenang Konsultan',
    'firma hukum Surabaya',
    'pengacara klaim asuransi Surabaya',
    'insurance consultant Surabaya',
    'konsultan asuransi Surabaya',
    'Marine Cargo Insurance',
    'Marine Hull Insurance',
    'Fire Property Insurance',
    'Motor Vehicle Insurance',
    'Travel Insurance',
    'Liability Insurance',
    'claim assistance insurance',
    'pendampingan klaim asuransi',
  ],
} as const

/* ------------------------------------------------------------------ */
/*  Company About — single source for chatbot & components            */
/* ------------------------------------------------------------------ */

export const companyAbout = {
  fullName: 'Pemenang Mandiri Law Firm',
  tradeName: 'UD. Pemenang Mandiri Law Firm Asuransi',
  founded: '9 Maret 2000',
  licenseDate: '29 September 2000',
  licenseNumber: '20074 / S-AAU / 2006',
  tradeRegistration: '130157435935',
  businessPermit: '503/902/',
  address: 'Surabaya, Indonesia',

  vision: {
    en: 'To become a trusted insurance consultant / agent that prioritizes quality and provides professional services.',
    id: 'Menjadi konsultan / Agen asuransi yang terpercaya dan mengedepankan kualitas serta memberikan pelayanan yang profesional.',
  },
  mission: {
    en: [
      'Provide maximum service to customers and maintain the trust given by customers.',
      'Develop good cooperation with insurance companies and provide quality insurance consultation to customers.',
      'Handle every insurance-related issue professionally.',
      'Find fast and precise solutions in handling every loss that arises.',
    ],
    id: [
      'Memberikan Pelayanan maksimal kepada para pelanggan dan mempertahankan kepercayaan yang telah diberikan oleh para pelanggan.',
      'Mengembangkan kerjasama yang baik dengan Perusahaan dan memberikan konsultasi asuransi yang berkualitas kepada para pelanggan.',
      'Menangani setiap masalah yang berkaitan dengan asuransi secara profesional.',
      'Mencari solusi dengan cepat dan tepat dalam setiap menangani kerugian yang timbul.',
    ],
  },
  timeline: [
    { date: '9 Maret 2000', en: 'UD. Pemenang Mandiri Law Firm Asuransi was established.', id: 'UD. Pemenang Mandiri Law Firm Asuransi didirikan.' },
    { date: '29 September 2000', en: 'Officially registered as a licensed agent per Indonesian Government Regulations.', id: 'Terdaftar sebagai agen lisensi secara resmi sesuai Peraturan Pemerintah Indonesia.' },
    { date: '2006', en: 'Changed the company name to Pemenang Mandiri Law Firm.', id: 'Mengubah nama perusahaan menjadi Pemenang Mandiri Law Firm.' },
  ],

  lawFirm: {
    name: pmlConfig.name,
    path: pmlConfig.path,
    url: `${siteUrl}${pmlConfig.path}`,
    address: pmlConfig.address.full,
    description: pmlConfig.description,
  },

  products: {
    marineCargo: {
      en: 'Protects cargo during transit by sea, air, or land. Covers ICC "A" (All Risks), ICC "B" (Named Perils Broad), and ICC "C" (Named Perils Basic).',
      id: 'Melindungi kargo selama transit melalui laut, udara, atau darat. Mencakup ICC "A" (All Risks), ICC "B" (Named Perils Broad), dan ICC "C" (Named Perils Basic).',
    },
    marineHull: {
      en: 'Covers physical damage or loss to vessels including hull, machinery, and equipment. Three clauses: Clause 280 (Comprehensive), Clause 284 (TL+GA+3/4 Collision), Clause 289 (Total Loss Only).',
      id: 'Menjamin kerusakan fisik atau kehilangan kapal termasuk lambung, mesin, dan peralatan. Tiga klausul: Clause 280 (Comprehensive), Clause 284 (TL+GA+3/4 Collision), Clause 289 (Total Loss Only).',
    },
    fireProperty: {
      en: 'Insurance covering property against FLEXAS (Fire, Lightning, Explosion, Aircraft Impact, Smoke). Can be extended to All Risk with additional coverage for typhoon, flood, earthquake, riot, etc.',
      id: 'Asuransi yang menjamin harta benda terhadap FLEXAS (Kebakaran, Petir, Ledakan, Kejatuhan Pesawat, Asap). Dapat diperluas menjadi All Risk dengan perluasan jaminan untuk angin topan, banjir, gempa bumi, huru-hara, dll.',
    },
    motorVehicle: {
      en: 'Motor vehicle insurance with two types: Comprehensive (covers total and partial loss) and TLO / Total Loss Only (covers total loss where repair cost >= 75% of vehicle value). Extended coverage includes TPL, Personal Accident, TSFHL, EQVET, SRCC, and Terrorism & Sabotage.',
      id: 'Asuransi kendaraan bermotor dengan dua jenis: Comprehensive (menjamin kerusakan total dan sebagian) dan TLO / Total Loss Only (menjamin kerusakan total saja di mana biaya perbaikan >= 75% harga kendaraan). Perluasan jaminan meliputi TPL, Personal Accident, TSFHL, EQVET, SRCC, dan Terorisme & Sabotase.',
    },
    travel: {
      en: 'Travel insurance covering medical expenses, trip cancellation, baggage loss, and personal accident during travel.',
      id: 'Asuransi perjalanan yang mencakup biaya medis, pembatalan perjalanan, kehilangan bagasi, dan kecelakaan diri selama perjalanan.',
    },
    liability: {
      en: 'Liability insurance covering third-party claims for bodily injury or property damage, including public liability and product liability.',
      id: 'Asuransi tanggung jawab hukum yang mencakup klaim pihak ketiga atas cedera tubuh atau kerusakan properti, termasuk public liability dan product liability.',
    },
    claimAssistance: {
      en: 'Professional claim assistance service helping clients prepare documentation, coordinate with insurers, and achieve fair claim settlements.',
      id: 'Layanan pendampingan klaim profesional yang membantu klien menyiapkan dokumentasi, berkoordinasi dengan perusahaan asuransi, dan mencapai penyelesaian klaim yang adil.',
    },
  },
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
    title: 'Pemenang Mandiri Law Firm | Insurance Consultant & Claim Support',
    description: siteConfig.description,
    path: siteRoutes.home,
    image: siteConfig.defaultOgImage,
  },
  products: {
    title: 'Products - Marine, Property, Motor, Travel, Liability & Claim',
    description:
      'Explore the structured insurance product portfolio of Pemenang Mandiri Law Firm, including Marine, FIRE / Property, Motor Vehicle, Travel, Liability, and Claim Assistance.',
    path: siteRoutes.products,
    image: siteMedia.productHero,
  },
  companyProfile: {
    title: 'Company Profile',
    description:
      'Learn about Pemenang Mandiri Law Firm and its professional approach to insurance consultation, policy guidance, and claim coordination.',
    path: siteRoutes.companyProfile,
    image: siteMedia.companyHero,
  },
  ourPartner: {
    title: 'Our Partner',
    description:
      'Explore the broker and insurance partner network supporting personal, business, marine, property, liability, travel, and claim requirements.',
    path: siteRoutes.ourPartner,
    image: siteMedia.companyHero,
  },
  contact: {
    title: 'Get in Touch',
    description:
      'Choose the appropriate WhatsApp contact for Marine, FIRE / Property, Motor Vehicle, Travel, Liability, or Claim Assistance.',
    path: siteRoutes.contact,
    image: siteMedia.contactSupport,
  },
  pml: {
    title: 'PML - Firma Hukum Surabaya',
    description:
      'Pemenang Mandiri Lawfirm & Partners - firma hukum di Surabaya yang menangani hukum pidana, perdata, dan pendampingan hukum klaim asuransi.',
    path: siteRoutes.pml,
    image: siteMedia.pmlHero,
  },
} as const

export const mainNavigation = [
  { label: 'Home', href: siteRoutes.home },
  { label: 'Products', href: siteRoutes.products },
  { label: 'Company Profile', href: siteRoutes.companyProfile },
  { label: 'Our Partner', href: siteRoutes.ourPartner },
  { label: 'Get in Touch', href: siteRoutes.contact },
] as const


export const productIds = {
  marine: 'marine-insurances',
  property: 'fire-property-insurance',
  vehicle: 'motor-vehicle-insurance',
  travel: 'travel-insurance',
  liability: 'liability-insurance',
  claim: 'claim-assistance',
} as const

export const productGroupIds = {
  marineCargo: 'marine-cargo-insurance',
  marineHull: 'marine-hull-insurance',
  propertyProtection: 'property-protection',
  vehicleProtection: 'vehicle-protection',
  personalTravel: 'personal-travel',
  businessTravel: 'business-travel',
  publicLiability: 'public-liability',
  productLiability: 'product-liability',
  claimPreparation: 'claim-preparation',
  claimCoordination: 'claim-coordination',
} as const

const productOverviewHref = <T extends string>(id: T) =>
  `${siteRoutes.products}#${id}` as const

const productDetailHref = <T extends string>(slug: T) =>
  `${siteRoutes.products}/${slug}` as const

export const marineSubProductSlugs = {
  marineCargo: productGroupIds.marineCargo,
  marineHull: productGroupIds.marineHull,
} as const

function defineProduct<const T extends { id: string; slug: string }>(product: T) {
  return {
    ...product,
    href: productOverviewHref(product.id),
    detailHref: productDetailHref(product.slug),
  } as const
}

export const productCategories = [
  defineProduct({
    id: productIds.marine,
    slug: productIds.marine,
    icon: 'anchor',
    title: 'Marine Insurances',
    shortTitle: 'Marine',
    category: 'Marine Insurance',
    seoTitle: 'Marine Cargo & Marine Hull Insurance Consultation',
    seoDescription:
      'Konsultasi Marine Cargo dan Marine Hull untuk membantu bisnis mengelola risiko pengiriman barang, kapal, mesin, serta operasional maritim di Indonesia.',
    image: '/photos/product-marine.webp',
    imageAlt:
      'Kapal kargo dan terminal peti kemas untuk konsultasi Marine Cargo dan Marine Hull Insurance di Indonesia',
    gallery: [
      {
        src: '/photos/product-marine.webp',
        alt: 'Kapal kargo di terminal peti kemas untuk perlindungan Marine Cargo Insurance',
      },
      {
        src: '/photos/product-hero-bg-new.webp',
        alt: 'Portofolio konsultasi asuransi marine, properti, dan kendaraan Pemenang Konsultan',
      },
      {
        src: '/photos/hero-law.webp',
        alt: 'Konsultan asuransi meninjau polis dan dokumen risiko marine bersama klien',
      },
    ],
    description:
      'Konsultasi perlindungan barang dalam perjalanan, kapal, mesin, dan kepentingan operasional maritim untuk kebutuhan perdagangan, logistik, serta pelayaran.',
    longDescription:
      'Marine Insurances memberikan arahan terstruktur untuk kebutuhan Marine Cargo dan Marine Hull. Konsultasi mencakup identifikasi objek pertanggungan, rute atau wilayah pelayaran, nilai pertanggungan, karakteristik risiko, serta kesiapan dokumen agar penempatan perlindungan lebih tepat dan mudah dipahami.',
    badges: ['Marine Cargo', 'Marine Hull', 'Transit Risk'],
    contactIds: ['marine-cargo', 'marine-hull'],
    keyPoints: [
      'Membedakan kebutuhan perlindungan barang dalam perjalanan dengan perlindungan kapal, mesin, dan kepentingan maritim lainnya.',
      'Menata informasi mengenai jenis barang atau kapal, rute, nilai pertanggungan, jadwal perjalanan, dan dokumen pendukung.',
      'Mendukung kebutuhan perusahaan perdagangan, logistik, pelayaran, pemilik kapal, serta bisnis dengan eksposur transportasi laut.',
    ],
    categoryGroups: [
      {
        id: productGroupIds.marineCargo,
        title: 'Marine Cargo Insurance',
        description:
          'Protects the cargo being transported against damage or loss during transit by sea, air, or land. It covers various perils, including damage caused by accidents, theft, fire, and natural disasters.',
        highlights: [],
        contactId: 'marine-cargo',
      },
      {
        id: productGroupIds.marineHull,
        title: 'Marine Hull Insurance',
        description:
          'Covers physical damage or loss to the vessel itself, including the ship\'s hull, machinery, and equipment. It provides protection against risks like collisions, accidents, and other specified perils.',
        highlights: [],
        contactId: 'marine-hull',
      },
    ],
  }),
  defineProduct({
    id: productIds.property,
    slug: productIds.property,
    icon: 'flame',
    title: 'FIRE / Property Insurance',
    shortTitle: 'FIRE / Property',
    category: 'Property Insurance',
    seoTitle: 'Fire & Property Insurance Consultation for Business Assets',
    seoDescription:
      'Konsultasi Fire and Property Insurance untuk bangunan, gudang, kantor, pabrik, ruko, serta aset usaha dengan penilaian kebutuhan perlindungan yang terstruktur.',
    image: '/photos/product-property.webp',
    imageAlt:
      'Gedung komersial modern untuk konsultasi Fire and Property Insurance bagi aset bisnis di Indonesia',
    gallery: [
      {
        src: '/photos/product-property.webp',
        alt: 'Gedung komersial sebagai objek perlindungan Fire and Property Insurance',
      },
      {
        src: '/photos/company-profile.webp',
        alt: 'Konsultasi profesional untuk identifikasi risiko bangunan dan aset properti bisnis',
      },
      {
        src: '/photos/about-consulting.webp',
        alt: 'Peninjauan dokumen nilai aset dan kebutuhan perlindungan properti bersama konsultan asuransi',
      },
    ],
    description:
      'Konsultasi perlindungan bangunan, isi, dan aset usaha terhadap risiko kebakaran serta risiko properti lain yang relevan dengan kegiatan operasional.',
    longDescription:
      'FIRE / Property Insurance membantu pemilik aset dan pelaku usaha menyusun kebutuhan perlindungan untuk bangunan, isi, mesin, persediaan, serta kepentingan properti lainnya. Konsultasi difokuskan pada karakteristik lokasi, okupasi, konstruksi, nilai aset, sistem proteksi, dan perluasan jaminan yang relevan.',
    badges: ['Building Asset', 'Property Risk', 'Fire Protection'],
    contactIds: ['fire-property'],
    keyPoints: [
      'Relevan untuk rumah, kantor, ruko, toko, gudang, pabrik, bangunan komersial, dan aset usaha lainnya.',
      'Menata data lokasi, fungsi bangunan, konstruksi, nilai bangunan dan isi, proteksi kebakaran, serta dokumen pendukung.',
      'Membantu klien memahami prioritas risiko dan kebutuhan perluasan perlindungan sebelum menentukan program asuransi.',
    ],
    categoryGroups: [
      {
        id: productGroupIds.propertyProtection,
        title: 'Property Protection',
        description:
          'Perlindungan bangunan, isi, mesin, persediaan, dan kepentingan properti lainnya sesuai lokasi, okupasi, nilai aset, sistem proteksi, serta kebutuhan perluasan jaminan.',
        highlights: ['Bangunan & isi', 'Risiko kebakaran', 'Aset komersial'],
        contactId: 'fire-property',
      },
    ],
  }),
  defineProduct({
    id: productIds.vehicle,
    slug: productIds.vehicle,
    icon: 'car',
    title: 'Motor Vehicle Insurance',
    shortTitle: 'Motor Vehicle',
    category: 'Vehicle Insurance',
    seoTitle: 'Motor Vehicle Insurance Consultation for Cars & Fleets',
    seoDescription:
      'Konsultasi Motor Vehicle Insurance untuk kendaraan pribadi, kendaraan operasional, dan armada perusahaan berdasarkan nilai, penggunaan, serta profil risiko.',
    image: '/photos/product-vehicle.webp',
    imageAlt:
      'Mobil modern untuk konsultasi Motor Vehicle Insurance kendaraan pribadi dan armada perusahaan',
    gallery: [
      {
        src: '/photos/product-vehicle.webp',
        alt: 'Kendaraan pribadi untuk konsultasi perlindungan Motor Vehicle Insurance',
      },
      {
        src: '/photos/product-hero-bg-new.webp',
        alt: 'Portofolio perlindungan kendaraan dan general insurance untuk kebutuhan personal serta bisnis',
      },
      {
        src: '/photos/contact-support.webp',
        alt: 'Tim konsultan memberikan dukungan informasi polis dan klaim kendaraan bermotor',
      },
    ],
    description:
      'Konsultasi perlindungan kendaraan pribadi, kendaraan operasional, dan armada perusahaan agar risiko mobilitas dapat dikelola secara lebih terukur.',
    longDescription:
      'Motor Vehicle Insurance memberikan arahan perlindungan untuk kendaraan pribadi maupun operasional perusahaan. Konsultasi mempertimbangkan jenis dan nilai kendaraan, fungsi penggunaan, wilayah operasional, jumlah unit, riwayat risiko, serta kelengkapan dokumen agar pilihan perlindungan sesuai dengan kebutuhan aktual.',
    badges: ['Car Insurance', 'Operational Fleet', 'Vehicle Risk'],
    contactIds: ['motor-vehicle'],
    keyPoints: [
      'Mendukung kebutuhan mobil pribadi, kendaraan usaha, kendaraan operasional, dan armada perusahaan dengan jumlah unit yang beragam.',
      'Menata data kendaraan, tahun pembuatan, nilai pertanggungan, penggunaan, wilayah operasional, dan dokumen kepemilikan.',
      'Membantu klien memahami perbedaan kebutuhan perlindungan berdasarkan profil kendaraan dan eksposur penggunaannya.',
    ],
    categoryGroups: [
      {
        id: productGroupIds.vehicleProtection,
        title: 'Vehicle Protection',
        description:
          'Perlindungan kendaraan pribadi dan operasional yang disusun berdasarkan jenis kendaraan, nilai pertanggungan, pola penggunaan, wilayah operasional, serta profil risiko pemilik atau perusahaan.',
        highlights: ['Kendaraan pribadi', 'Armada operasional', 'Risiko mobilitas'],
        contactId: 'motor-vehicle',
      },
    ],
  }),
  defineProduct({
    id: productIds.travel,
    slug: productIds.travel,
    icon: 'plane',
    title: 'Travel Insurance',
    shortTitle: 'Travel',
    category: 'Travel Protection',
    seoTitle: 'Travel Insurance Consultation for Personal & Business Trips',
    seoDescription:
      'Konsultasi Travel Insurance untuk perjalanan domestik, internasional, keluarga, grup, dan perjalanan bisnis berdasarkan destinasi, durasi, serta aktivitas perjalanan.',
    image: '/photos/product-travel.webp',
    imageAlt:
      'Keluarga Asia membawa koper di bandara untuk konsultasi Travel Insurance perjalanan domestik dan internasional',
    gallery: [
      {
        src: '/photos/product-travel.webp',
        alt: 'Keluarga dengan koper di terminal bandara untuk perlindungan Travel Insurance',
      },
      {
        src: '/photos/contact-support.webp',
        alt: 'Tim layanan membantu kebutuhan informasi dan dukungan perjalanan bagi peserta Travel Insurance',
      },
      {
        src: '/photos/company-profile.webp',
        alt: 'Konsultan meninjau kebutuhan polis Travel Insurance untuk perjalanan personal dan bisnis',
      },
    ],
    description:
      'Konsultasi perlindungan perjalanan domestik maupun internasional untuk individu, keluarga, grup, dan kebutuhan perjalanan bisnis.',
    longDescription:
      'Travel Insurance membantu mempersiapkan perlindungan perjalanan berdasarkan destinasi, durasi, aktivitas, jumlah peserta, frekuensi perjalanan, dan kebutuhan administratif. Konsultasi disusun agar manfaat, batasan perlindungan, serta dokumen yang perlu disiapkan dapat dipahami sejak awal.',
    badges: ['Domestic Trip', 'International Trip', 'Business Travel'],
    contactIds: ['travel'],
    keyPoints: [
      'Memetakan destinasi, durasi, tujuan perjalanan, aktivitas khusus, jumlah peserta, dan frekuensi perjalanan.',
      'Relevan untuk perjalanan individu, keluarga, rombongan, perjalanan dinas, serta mobilitas bisnis berkala.',
      'Membantu menyiapkan informasi peserta dan dokumen perjalanan agar proses konsultasi lebih cepat dan terstruktur.',
    ],
    categoryGroups: [
      {
        id: productGroupIds.personalTravel,
        title: 'Personal & Family Travel',
        description:
          'Perlindungan untuk perjalanan individu atau keluarga, baik domestik maupun internasional, berdasarkan destinasi, durasi, aktivitas, dan kebutuhan setiap peserta.',
        highlights: ['Personal trip', 'Family trip', 'Domestic & international'],
        contactId: 'travel',
      },
      {
        id: productGroupIds.businessTravel,
        title: 'Business & Group Travel',
        description:
          'Perlindungan untuk perjalanan dinas, rombongan, atau mobilitas berkala dengan pengelolaan data peserta dan dokumen yang lebih terstruktur.',
        highlights: ['Business trip', 'Group coverage', 'Recurring travel'],
        contactId: 'travel',
      },
    ],
  }),
  defineProduct({
    id: productIds.liability,
    slug: productIds.liability,
    icon: 'scale',
    title: 'Liability Insurance',
    shortTitle: 'Liability',
    category: 'Liability Protection',
    seoTitle: 'Liability Insurance Consultation for Third-Party Risks',
    seoDescription:
      'Konsultasi Liability Insurance untuk membantu bisnis mengidentifikasi risiko tanggung jawab hukum terhadap pihak ketiga dari aktivitas, produk, layanan, dan lokasi usaha.',
    image: '/photos/product-liability.webp',
    imageAlt:
      'Konsultan menjelaskan dokumen tanggung jawab hukum kepada klien untuk Liability Insurance bisnis',
    gallery: [
      {
        src: '/photos/product-liability.webp',
        alt: 'Konsultasi Liability Insurance dengan peninjauan kontrak dan tanggung jawab hukum pihak ketiga',
      },
      {
        src: '/photos/hero-law.webp',
        alt: 'Pertemuan profesional untuk identifikasi risiko hukum dan kebutuhan perlindungan liability bisnis',
      },
      {
        src: '/photos/about-consulting.webp',
        alt: 'Peninjauan kontrak, ruang lingkup pekerjaan, dan dokumen risiko Liability Insurance',
      },
    ],
    description:
      'Konsultasi perlindungan tanggung jawab hukum terhadap pihak ketiga yang dapat timbul dari aktivitas usaha, produk, layanan, lokasi, atau pelaksanaan pekerjaan.',
    longDescription:
      'Liability Insurance membantu perusahaan mengidentifikasi dan menata eksposur tanggung jawab hukum kepada pihak ketiga. Konsultasi mencakup aktivitas usaha, karakteristik produk atau layanan, ruang lingkup kontrak, lokasi operasional, limit yang dibutuhkan, serta dokumen pendukung untuk memperoleh arahan perlindungan yang lebih relevan.',
    badges: ['Public Liability', 'Product Liability', 'Third-party Risk'],
    contactIds: ['liability'],
    keyPoints: [
      'Mengidentifikasi potensi tuntutan pihak ketiga yang berkaitan dengan cedera, kerusakan properti, produk, layanan, atau aktivitas operasional.',
      'Menata kontrak, ruang lingkup pekerjaan, profil usaha, lokasi, limit, dan informasi risiko sebelum proses konsultasi.',
      'Relevan untuk pemilik usaha, kontraktor, penyedia jasa, pengelola lokasi, distributor, dan produsen.',
    ],
    categoryGroups: [
      {
        id: productGroupIds.publicLiability,
        title: 'Public Liability',
        description:
          'Perlindungan tanggung jawab hukum terhadap pihak ketiga yang dapat timbul dari aktivitas usaha, penggunaan lokasi, penyelenggaraan kegiatan, atau pelaksanaan pekerjaan.',
        highlights: ['Third-party injury', 'Property damage', 'Business activity'],
        contactId: 'liability',
      },
      {
        id: productGroupIds.productLiability,
        title: 'Product Liability',
        description:
          'Perlindungan tanggung jawab hukum yang berkaitan dengan produk yang diproduksi, dipasarkan, didistribusikan, atau digunakan oleh konsumen dan pihak ketiga.',
        highlights: ['Product exposure', 'Consumer risk', 'Distribution activity'],
        contactId: 'liability',
      },
    ],
  }),
  defineProduct({
    id: productIds.claim,
    slug: productIds.claim,
    icon: 'clipboard',
    title: 'Claim Assistance',
    shortTitle: 'Claim',
    category: 'Claim Support',
    seoTitle: 'Insurance Claim Assistance & Document Coordination',
    seoDescription:
      'Pendampingan claim asuransi untuk membantu penyiapan kronologi, bukti kejadian, dokumen polis, komunikasi, dan tindak lanjut administrasi secara terstruktur.',
    image: '/photos/product-claim.webp',
    imageAlt:
      'Konsultan membantu klien meninjau formulir claim dan foto kerusakan kendaraan untuk pendampingan klaim asuransi',
    gallery: [
      {
        src: '/photos/product-claim.webp',
        alt: 'Pendampingan claim asuransi dengan formulir, bukti kejadian, dan foto kerusakan kendaraan',
      },
      {
        src: '/photos/contact-support.webp',
        alt: 'Tim claim support membantu komunikasi dan tindak lanjut proses klaim asuransi',
      },
      {
        src: '/photos/about-consulting.webp',
        alt: 'Konsultan meninjau kronologi, polis, dan dokumen pendukung pengajuan claim asuransi',
      },
    ],
    description:
      'Pendampingan administratif untuk menyiapkan kronologi, bukti kejadian, dokumen polis, komunikasi, dan tindak lanjut selama proses claim.',
    longDescription:
      'Claim Assistance membantu klien menata informasi dan dokumen sejak tahap awal pengajuan hingga proses tindak lanjut. Pendampingan mencakup penyusunan kronologi, pemeriksaan kelengkapan bukti, pencatatan kebutuhan tambahan, serta koordinasi komunikasi dengan tetap mengacu pada ketentuan polis dan keputusan perusahaan asuransi.',
    badges: ['Document Review', 'Claim Coordination', 'Follow-up Support'],
    contactIds: ['claim'],
    keyPoints: [
      'Menata kronologi, nomor polis, formulir, foto kejadian, bukti kerusakan, dan dokumen pendukung sesuai kebutuhan awal.',
      'Membantu mencatat kebutuhan dokumen tambahan dan memantau alur komunikasi agar proses lebih mudah diikuti klien.',
      'Memberikan dukungan administratif secara terstruktur tanpa mengubah ketentuan polis atau kewenangan keputusan penanggung.',
    ],
    categoryGroups: [
      {
        id: productGroupIds.claimPreparation,
        title: 'Claim Preparation',
        description:
          'Pemeriksaan awal kronologi, formulir, dokumen polis, bukti kejadian, foto kerusakan, dan data pendukung agar pengajuan claim lebih lengkap dan terstruktur.',
        highlights: ['Kronologi', 'Dokumen polis', 'Bukti pendukung'],
        contactId: 'claim',
      },
      {
        id: productGroupIds.claimCoordination,
        title: 'Claim Coordination',
        description:
          'Pendampingan komunikasi, pencatatan kebutuhan tambahan, dan tindak lanjut status selama proses administrasi claim sesuai ketentuan yang berlaku.',
        highlights: ['Communication flow', 'Status follow-up', 'Additional documents'],
        contactId: 'claim',
      },
    ],
  }),
] as const

export const productBySlug = Object.fromEntries(
  productCategories.map((product) => [product.slug, product]),
) as Record<(typeof productCategories)[number]['slug'], (typeof productCategories)[number]>

export const brokerPartners = [
  {
    id: 'jps-broker',
    name: 'PT Jaya Proteksindo Sakti Ins Broker',
    logoText: 'JPS',
    category: 'Insurance Broker',
    description: 'A licensed insurance broker providing comprehensive placement, advisory, and risk management support for all insurance lines.',
    hasLogo: true,
  },
] as const

export const insurancePartners = [
  {
    id: 'etiqa',
    name: 'PT Etiqa',
    logoText: 'Etiqa',
    category: 'General Insurance',
    categories: ['Marine HULL'],
    brandColor: '#FFDD00',
    description: 'Mitra asuransi untuk solusi perlindungan Marine Hull.',
  },
  {
    id: 'asei',
    name: 'PT Asuransi ASEI Indonesia',
    logoText: 'ASEI',
    category: 'General Insurance',
    categories: ['Marine HULL'],
    brandColor: '#004F9F',
    description: 'Mitra asuransi untuk solusi perlindungan Marine Hull.',
  },
  {
    id: 'tripa',
    name: 'PT Asuransi Tri Pakarta',
    logoText: 'Tripa',
    category: 'General Insurance',
    categories: ['Marine HULL'],
    brandColor: '#004B87',
    description: 'Mitra asuransi untuk solusi perlindungan Marine Hull.',
  },
  {
    id: 'brins',
    name: 'PT Asuransi Bringin Sejahtera Artamakmur (BRI Insurance)',
    logoText: 'BRINS',
    category: 'General Insurance',
    categories: ['Marine HULL'],
    brandColor: '#00529C',
    description: 'Mitra asuransi untuk solusi perlindungan Marine Hull.',
  },
  {
    id: 'jasaraharja',
    name: 'PT Asuransi Jasaraharja Putera',
    logoText: 'Jasaraharja',
    category: 'General Insurance',
    categories: ['Marine HULL'],
    brandColor: '#008444',
    description: 'Mitra asuransi untuk solusi perlindungan Marine Hull.',
  },
  {
    id: 'astra',
    name: 'PT Asuransi Astra Buana',
    logoText: 'Astra Buana',
    category: 'General Insurance',
    categories: ['Marine HULL', 'Marine CARGO'],
    brandColor: '#005A9C',
    description: 'Mitra asuransi untuk solusi perlindungan Marine Hull dan Cargo.',
  },
  {
    id: 'mag',
    name: 'PT Asuransi Multi Artha Guna Tbk',
    logoText: 'MAG',
    category: 'General Insurance',
    categories: ['Marine CARGO'],
    brandColor: '#009639',
    description: 'Mitra asuransi untuk solusi perlindungan Marine Cargo.',
  },
  {
    id: 'axa',
    name: 'PT Asuransi Axa Indonesia',
    logoText: 'AXA',
    category: 'General Insurance',
    categories: ['Marine CARGO'],
    brandColor: '#00008F',
    description: 'Mitra asuransi untuk solusi perlindungan Marine Cargo.',
  },
  {
    id: 'allianz',
    name: 'PT Asuransi Allianz Utama Indonesia',
    logoText: 'Allianz',
    category: 'General Insurance',
    categories: ['Marine CARGO', 'KENDARAAN', 'TRAVEL'],
    brandColor: '#003781',
    description: 'Mitra asuransi untuk solusi perlindungan Cargo, Kendaraan, dan Travel.',
  },
  {
    id: 'avrist',
    name: 'PT Avrist General Insurance',
    logoText: 'Avrist',
    category: 'General Insurance',
    categories: ['KENDARAAN'],
    brandColor: '#008751',
    description: 'Mitra asuransi untuk solusi perlindungan Kendaraan.',
  },
  {
    id: 'aca',
    name: 'PT Asuransi Central Asia',
    logoText: 'ACA',
    category: 'General Insurance',
    categories: ['KENDARAAN'],
    brandColor: '#0F4C81',
    description: 'Mitra asuransi untuk solusi perlindungan Kendaraan.',
  },
  {
    id: 'mpm',
    name: 'PT Asuransi Mitra Pelindung Mustika',
    logoText: 'MPM',
    category: 'General Insurance',
    categories: ['KENDARAAN'],
    brandColor: '#1E3A8A',
    description: 'Mitra asuransi untuk solusi perlindungan Kendaraan.',
  },
  {
    id: 'chubb',
    name: 'PT Chubb General Insurance Indonesia',
    logoText: 'Chubb',
    category: 'General Insurance',
    categories: ['KENDARAAN', 'TRAVEL'],
    brandColor: '#000000',
    description: 'Mitra asuransi untuk solusi perlindungan Kendaraan dan Travel.',
  },
  {
    id: 'oona',
    name: 'PT Asuransi OONA',
    logoText: 'Oona',
    category: 'General Insurance',
    categories: ['KENDARAAN'],
    brandColor: '#5B21B6',
    description: 'Mitra asuransi untuk solusi perlindungan Kendaraan.',
  },
  {
    id: 'zurich',
    name: 'PT Zurich Insurance Indonesia',
    logoText: 'Zurich',
    category: 'General Insurance',
    categories: ['TRAVEL'],
    brandColor: '#2167AE',
    description: 'Mitra asuransi untuk solusi perlindungan Travel.',
  },
  {
    id: 'binagriya',
    name: 'PT Asuransi Binagriya Upakara',
    logoText: 'Binagriya',
    category: 'General Insurance',
    categories: ['ASURANSI_UMUM'],
    brandColor: '#1E40AF',
    description: 'Mitra asuransi untuk perlindungan asuransi umum.',
  },
  {
    id: 'bintang',
    name: 'PT Asuransi Bintang Tbk',
    logoText: 'Asuransi Bintang',
    category: 'General Insurance',
    categories: ['ASURANSI_UMUM'],
    brandColor: '#D4AF37',
    description: 'Mitra asuransi untuk perlindungan asuransi umum.',
  },
  {
    id: 'dayin',
    name: 'PT Asuransi Dayin Mitra Tbk',
    logoText: 'Dayin Mitra',
    category: 'General Insurance',
    categories: ['ASURANSI_UMUM'],
    brandColor: '#EF4444',
    description: 'Mitra asuransi untuk perlindungan asuransi umum.',
  },
  {
    id: 'harta',
    name: 'PT Asuransi Harta Aman Pratama Tbk',
    logoText: 'Harta Aman Pratama',
    category: 'General Insurance',
    categories: ['ASURANSI_UMUM'],
    brandColor: '#B91C1C',
    description: 'Mitra asuransi untuk perlindungan asuransi umum.',
  },
  {
    id: 'jasa_tania',
    name: 'PT Asuransi Jasa Tania Tbk',
    logoText: 'Jasa Tania',
    category: 'General Insurance',
    categories: ['ASURANSI_UMUM'],
    brandColor: '#10B981',
    description: 'Mitra asuransi untuk perlindungan asuransi umum.',
  },
  {
    id: 'ksk',
    name: 'PT KSK Insurance Indonesia',
    logoText: 'KSK Insurance',
    category: 'General Insurance',
    categories: ['ASURANSI_UMUM'],
    brandColor: '#2563EB',
    description: 'Mitra asuransi untuk perlindungan asuransi umum.',
  },
  {
    id: 'lippo',
    name: 'PT Lippo General Insurance Tbk',
    logoText: 'Lippo Insurance',
    category: 'General Insurance',
    categories: ['ASURANSI_UMUM'],
    brandColor: '#1E3A8A',
    description: 'Mitra asuransi untuk perlindungan asuransi umum.',
  },
  {
    id: 'mega',
    name: 'PT Asuransi Umum Mega',
    logoText: 'Mega Insurance',
    category: 'General Insurance',
    categories: ['ASURANSI_UMUM'],
    brandColor: '#E11D48',
    description: 'Mitra asuransi untuk perlindungan asuransi umum.',
  },
  {
    id: 'mnc',
    name: 'PT MNC Asuransi Indonesia',
    logoText: 'MNC Insurance',
    category: 'General Insurance',
    categories: ['ASURANSI_UMUM'],
    brandColor: '#1E3A8A',
    description: 'Mitra asuransi untuk perlindungan asuransi umum.',
  },
  {
    id: 'jasindo',
    name: 'PT Asuransi Jasa Indonesia (Persero)',
    logoText: 'Jasindo',
    category: 'General Insurance',
    categories: ['ASURANSI_UMUM'],
    brandColor: '#1E3A8A',
    description: 'Mitra asuransi untuk perlindungan asuransi umum.',
  },
  {
    id: 'raksa',
    name: 'PT Asuransi Raksa Pratikara',
    logoText: 'Asuransi Raksa',
    category: 'General Insurance',
    categories: ['ASURANSI_UMUM'],
    brandColor: '#1D4ED8',
    description: 'Mitra asuransi untuk perlindungan asuransi umum.',
  },
  {
    id: 'ramayana',
    name: 'PT Asuransi Ramayana Tbk',
    logoText: 'Asuransi Ramayana',
    category: 'General Insurance',
    categories: ['ASURANSI_UMUM'],
    brandColor: '#07111F',
    description: 'Mitra asuransi untuk perlindungan asuransi umum.',
  },
  {
    id: 'pln',
    name: 'PT Asuransi Perisai Listrik Nasional (PLN Insurance)',
    logoText: 'PLN Insurance',
    category: 'General Insurance',
    categories: ['ASURANSI_UMUM'],
    brandColor: '#F59E0B',
    description: 'Mitra asuransi untuk perlindungan asuransi umum.',
  },
] as const

export const serviceAreas = productCategories.map((product) => product.title)
