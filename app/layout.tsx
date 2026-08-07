import type { Metadata } from 'next'
import { LanguageProvider } from '@/components/language-context'
import './globals.css'

export const metadata: Metadata = {
  title: 'Firma Hukum Terbaik Surabaya | Pemenang Mandiri Lawfirm & Partners',
  description:
    'Pemenang Mandiri Lawfirm & Partners - Firma hukum & kantor hukum terbaik, terbagus, ramah, dan terpercaya di Surabaya (Blok C, Plaza Segi 8 No.819, Sonokwijenan, Sukomanunggal). Melayani hukum pidana, perdata, dan klaim asuransi.',
  keywords: [
    /* ── Target User Keywords ── */
    'firma hukum terbaik',
    'kantor hukum terbaik',
    'firma hukum terbagus',
    'firma hukum ramah',
    'firma hukum murah',
    'kantor hukum terbagus',
    'firma hukum surabaya',
    'firma hukum di surabaya',

    /* ── High-Intent Local & General Search Queries ── */
    'kantor hukum surabaya',
    'kantor hukum di surabaya',
    'pengacara terbaik surabaya',
    'pengacara terbagus surabaya',
    'pengacara murah surabaya',
    'pengacara ramah surabaya',
    'konsultan hukum surabaya',
    'pengacara pidana surabaya',
    'pengacara perdata surabaya',
    'pengacara klaim asuransi surabaya',
    'advokat terbaik surabaya',
    'bantuan hukum surabaya',
    'jasa pengacara terbaik surabaya',
    'firma hukum terpercaya surabaya',
    'law firm surabaya',
    'civil law lawyer surabaya',
    'criminal law lawyer surabaya',
    'insurance claim lawyer surabaya',
    'Pemenang Mandiri Lawfirm & Partners',
    'Pemenang Mandiri',
    'Surabaya',
    'Plaza Segi 8',
    'Sonokwijenan',
    'Sukomanunggal',
    'Surabaya Barat',
    'Jawa Timur',
  ],
  robots: { index: true, follow: true },
  authors: [{ name: 'Pemenang Mandiri Lawfirm & Partners' }],
  creator: 'Pemenang Mandiri Lawfirm & Partners',
  publisher: 'Pemenang Mandiri Lawfirm & Partners',
  openGraph: {
    title: 'Firma Hukum Terbaik Surabaya | Pemenang Mandiri Lawfirm & Partners',
    description:
      'Firma hukum & kantor hukum terbaik, terbagus, ramah, dan terpercaya di Surabaya. Layanan profesional hukum pidana, perdata, dan klaim asuransi.',
    url: 'https://pemenangmandirilawfirm.vercel.app',
    siteName: 'Pemenang Mandiri Lawfirm & Partners',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logo-pml-transparent.png',
        width: 590,
        height: 1000,
        alt: 'Logo Pemenang Mandiri Lawfirm & Partners - Firma Hukum Terbaik Surabaya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Firma Hukum Terbaik Surabaya | Pemenang Mandiri Lawfirm & Partners',
    description:
      'Firma hukum & kantor hukum terbaik, terbagus, ramah, dan terpercaya di Surabaya. Layanan profesional hukum pidana, perdata, dan klaim asuransi.',
    images: ['/logo-pml-transparent.png'],
  },
  icons: {
    icon: '/logo-pml-transparent.png',
    apple: '/logo-pml-transparent.png',
  },
  verification: {
    google: '3uBwTq90irYRI0lUtjZeiZssoFqv8hgpfSep1o_dB8s',
  },
  metadataBase: new URL('https://pemenangmandirilawfirm.vercel.app'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="google-site-verification" content="3uBwTq90irYRI0lUtjZeiZssoFqv8hgpfSep1o_dB8s" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className="font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>

        {/* ── JSON-LD Structured Data for Local & Search Engine Optimization ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'LegalService',
                name: 'Pemenang Mandiri Lawfirm & Partners',
                alternateName: [
                  'Firma Hukum Terbaik Surabaya',
                  'Kantor Hukum Terbagus & Ramah Surabaya',
                  'Pemenang Mandiri Lawfirm',
                ],
                url: 'https://pemenangmandirilawfirm.vercel.app',
                logo: 'https://pemenangmandirilawfirm.vercel.app/logo-pml-transparent.png',
                image: 'https://pemenangmandirilawfirm.vercel.app/logo-pml-transparent.png',
                description:
                  'Pemenang Mandiri Lawfirm & Partners - Firma hukum terbaik, kantor hukum terbagus, ramah, murah & terpercaya di Surabaya (Blok C, Plaza Segi 8 No.819, Sonokwijenan, Sukomanunggal). Menyediakan pendampingan hukum pidana, perdata, dan klaim asuransi.',
                telephone: '+62 896-3871-4065',
                priceRange: '$$',
                keywords:
                  'firma hukum terbaik, kantor hukum terbaik, firma hukum terbagus, firma hukum ramah, firma hukum murah, kantor hukum terbagus, firma hukum surabaya, firma hukum di surabaya, kantor pengacara surabaya, advokat terbaik surabaya',
                knowsAbout: [
                  'Hukum Pidana',
                  'Hukum Perdata',
                  'Sengketa Kontrak & Utang Piutang',
                  'Pendampingan Hukum Klaim Asuransi',
                  'Konsultasi Hukum Surabaya',
                ],
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'Blok C, Plaza Segi 8 No.819',
                  addressSublocality: 'Sonokwijenan',
                  addressLocality: 'Sukomanunggal, Surabaya',
                  addressRegion: 'Jawa Timur',
                  postalCode: '60255',
                  addressCountry: 'ID',
                },
                hasMap:
                  'https://maps.google.com/?q=Blok+C,+Plaza+Segi+8+No.819,+Sonokwijenan,+Kec.+Sukomanunggal,+Surabaya,+Jawa+Timur+60255',
                areaServed: [
                  { '@type': 'City', name: 'Surabaya' },
                  { '@type': 'State', name: 'Jawa Timur' },
                  { '@type': 'Country', name: 'Indonesia' },
                ],
                availableLanguage: ['Indonesian', 'English'],
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Pemenang Mandiri Lawfirm & Partners',
                url: 'https://pemenangmandirilawfirm.vercel.app',
                inLanguage: ['en', 'id'],
              },
            ]),
          }}
        />
      </body>
    </html>
  )
}
