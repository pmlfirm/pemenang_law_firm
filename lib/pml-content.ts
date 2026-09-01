import type { AppLanguage } from '@/lib/language-types'
import { siteRoutes } from '@/lib/routes'

/* ------------------------------------------------------------------ */
/*  PML — Pemenang Mandiri Lawfirm & Partners                          */
/*  Served from this same domain at /pml.                              */
/* ------------------------------------------------------------------ */

export const pmlConfig = {
  name: 'Pemenang Mandiri Lawfirm & Partners',
  shortName: 'Pemenang Mandiri',
  path: siteRoutes.pml,
  logo: '/logo-pml-transparent.png',
  description: {
    en: 'The law firm division handling criminal law, civil law, and legal support for insurance claim disputes.',
    id: 'Divisi firma hukum yang menangani hukum pidana, hukum perdata, dan pendampingan hukum untuk sengketa klaim asuransi.',
  },
  address: {
    street: 'Blok C, Plaza Segi 8 No.819',
    district: 'Sonokwijenan, Kec. Sukomanunggal',
    city: 'Surabaya',
    province: 'Jawa Timur',
    postalCode: '60255',
    full: 'Blok C, Plaza Segi 8 No.819, Sonokwijenan, Kec. Sukomanunggal, Surabaya, Jawa Timur 60255',
    mapsUrl:
      'https://maps.google.com/?q=Blok+C,+Plaza+Segi+8+No.819,+Sonokwijenan,+Kec.+Sukomanunggal,+Surabaya,+Jawa+Timur+60255',
  },
  phone: '+62 896-3871-4065',
  heroImages: [
    '/photos/hero-law-office.png',
    '/photos/hero-consultation.png',
    '/photos/hero-legal-documents.png',
  ],
  contactPortrait: '/photos/contact-portrait.png',
} as const

export type PmlCopy = {
  navSubtitle: string

  heroSlides: {
    kicker: string
    title: string
    description: string
  }[]
  heroCta1: string
  heroCta2: string

  practiceKicker: string
  practiceHeading: string
  practiceSubheading: string
  practiceAreas: {
    title: string
    description: string
    points: string[]
  }[]

  aboutKicker: string
  aboutHeading: string
  aboutP1: string
  aboutP2: string

  contactKicker: string
  contactHeading: string
  contactDescription: string
  contactCta: string
  officeAddressLabel: string
  officeAddressValue: string
  openMapsLabel: string
}

const en: PmlCopy = {
  navSubtitle: 'Law Firm & Partners',

  heroSlides: [
    {
      kicker: 'Trusted Legal Services',
      title: 'Professional legal support with a calm, modern, and reliable approach.',
      description:
        'Pemenang Mandiri Lawfirm & Partners assists individuals and businesses in criminal and civil matters, while also serving as a legal partner for resolving insurance claim-related issues.',
    },
    {
      kicker: 'Expert Criminal & Civil Law',
      title: 'Experienced legal representation for criminal defense and civil disputes.',
      description:
        'Our team provides strategic guidance for investigation, prosecution, court proceedings, contract disputes, debt collection, and broader civil issues with practical direction.',
    },
    {
      kicker: 'Insurance Claim Legal Support',
      title: 'A dedicated legal partner for insurance claim-related issues.',
      description:
        'We support clients with practical legal insight, careful case review, and coordinated follow-up for claim disputes involving legal interpretation and business sensitivity.',
    },
  ],
  heroCta1: 'View Practice Areas',
  heroCta2: 'Contact Us',

  practiceKicker: 'Practice Areas',
  practiceHeading: 'Focused legal services for key matters.',
  practiceSubheading:
    'Our one-page profile keeps the experience simple while clearly presenting the main legal areas handled by the firm.',
  practiceAreas: [
    {
      title: 'Criminal Law (Pidana)',
      description:
        'Legal representation and strategic guidance for investigation, prosecution, and court proceedings with a calm and professional approach.',
      points: ['Criminal defense', 'Legal consultation', 'Case assessment', 'Court representation'],
    },
    {
      title: 'Civil Law (Perdata)',
      description:
        'Support for disputes, contract matters, debt collection, and broader civil issues with practical and effective legal direction.',
      points: ['Contract disputes', 'Debt and collection matters', 'Property disputes', 'Civil litigation support'],
    },
  ],

  aboutKicker: 'About Us',
  aboutHeading: 'A legal partner for insurance claim-related issues.',
  aboutP1:
    'Pemenang Mandiri Lawfirm & Partners is prepared to support clients with practical legal insight, careful case review, and coordinated follow-up. We understand that claim disputes can involve both legal interpretation and business sensitivity.',
  aboutP2:
    'Because of that, the firm can serve as a partner to help resolve legal issues linked to insurance claims—whether through consultation, document review, negotiation support, or further legal action when required.',

  contactKicker: 'Contact',
  contactHeading: "Let's discuss your legal needs.",
  contactDescription:
    'Reach out for an initial discussion regarding criminal law, civil law, or legal issues related to insurance claims.',
  contactCta: 'Chat on WhatsApp',
  officeAddressLabel: 'Office Address',
  officeAddressValue: 'Blok C, Plaza Segi 8 No.819, Sonokwijenan, Sukomanunggal, Surabaya, East Java 60255',
  openMapsLabel: 'Open in Google Maps',
}

const id: PmlCopy = {
  navSubtitle: 'Firma Hukum & Rekan',

  heroSlides: [
    {
      kicker: 'Layanan Hukum Terpercaya',
      title: 'Pendampingan hukum profesional dengan pendekatan yang tenang, modern, dan terpercaya.',
      description:
        'Pemenang Mandiri Lawfirm & Partners membantu individu dan bisnis dalam permasalahan pidana dan perdata, sekaligus menjadi mitra hukum dalam penyelesaian masalah klaim asuransi.',
    },
    {
      kicker: 'Ahli Hukum Pidana & Perdata',
      title: 'Representasi hukum berpengalaman untuk pembelaan pidana dan sengketa perdata.',
      description:
        'Tim kami memberikan arahan strategis untuk penyelidikan, penuntutan, persidangan, sengketa kontrak, penagihan utang, dan masalah perdata lainnya dengan pendekatan praktis.',
    },
    {
      kicker: 'Pendampingan Hukum Klaim Asuransi',
      title: 'Mitra hukum yang berdedikasi untuk permasalahan terkait klaim asuransi.',
      description:
        'Kami mendukung klien dengan wawasan hukum praktis, kajian kasus yang cermat, dan tindak lanjut terkoordinasi untuk sengketa klaim yang melibatkan interpretasi hukum dan sensitivitas bisnis.',
    },
  ],
  heroCta1: 'Lihat Bidang Praktik',
  heroCta2: 'Hubungi Kami',

  practiceKicker: 'Bidang Praktik',
  practiceHeading: 'Layanan hukum terfokus untuk permasalahan utama.',
  practiceSubheading:
    'Profil satu halaman kami menjaga pengalaman tetap sederhana sekaligus menyajikan bidang hukum utama yang ditangani firma secara jelas.',
  practiceAreas: [
    {
      title: 'Hukum Pidana',
      description:
        'Representasi hukum dan arahan strategis untuk penyelidikan, penuntutan, dan persidangan dengan pendekatan yang tenang dan profesional.',
      points: ['Pembelaan pidana', 'Konsultasi hukum', 'Asesmen kasus', 'Representasi pengadilan'],
    },
    {
      title: 'Hukum Perdata',
      description:
        'Pendampingan untuk sengketa, masalah kontrak, penagihan utang, dan masalah perdata lainnya dengan arahan hukum yang praktis dan efektif.',
      points: ['Sengketa kontrak', 'Masalah utang dan penagihan', 'Sengketa properti', 'Dukungan litigasi perdata'],
    },
  ],

  aboutKicker: 'Tentang Kami',
  aboutHeading: 'Mitra hukum untuk permasalahan terkait klaim asuransi.',
  aboutP1:
    'Pemenang Mandiri Lawfirm & Partners siap mendukung klien dengan wawasan hukum praktis, kajian kasus yang cermat, dan tindak lanjut yang terkoordinasi. Kami memahami bahwa sengketa klaim dapat melibatkan interpretasi hukum dan sensitivitas bisnis.',
  aboutP2:
    'Oleh karena itu, firma dapat berperan sebagai mitra untuk membantu menyelesaikan masalah hukum terkait klaim asuransi—baik melalui konsultasi, tinjauan dokumen, dukungan negosiasi, maupun tindakan hukum lebih lanjut bila diperlukan.',

  contactKicker: 'Kontak',
  contactHeading: 'Mari diskusikan kebutuhan hukum Anda.',
  contactDescription:
    'Hubungi kami untuk diskusi awal mengenai hukum pidana, hukum perdata, atau masalah hukum terkait klaim asuransi.',
  contactCta: 'Chat via WhatsApp',
  officeAddressLabel: 'Alamat Kantor',
  officeAddressValue: 'Blok C, Plaza Segi 8 No.819, Sonokwijenan, Kec. Sukomanunggal, Surabaya, Jawa Timur 60255',
  openMapsLabel: 'Buka di Google Maps',
}

export const pmlCopy: Record<AppLanguage, PmlCopy> = { en, id }
