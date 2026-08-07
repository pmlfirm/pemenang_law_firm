import type { Metadata } from 'next'
import { LanguageProvider } from '@/components/language-context'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pemenang Mandiri Lawfirm & Partners | Firma Hukum Terpercaya Surabaya',
  description:
    'Pemenang Mandiri Lawfirm & Partners di Blok C, Plaza Segi 8 No.819, Sonokwijenan, Kec. Sukomanunggal, Surabaya menyediakan layanan hukum profesional untuk hukum pidana, perdata, dan pendampingan hukum klaim asuransi.',
  keywords: [
    'law firm',
    'firma hukum',
    'pengacara',
    'civil law',
    'criminal law',
    'insurance claim lawyer',
    'hukum pidana',
    'hukum perdata',
    'klaim asuransi',
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
    title: 'Pemenang Mandiri Lawfirm & Partners',
    description:
      'Professional legal services for criminal, civil matters, and insurance claim legal support in Surabaya.',
    url: 'https://pemenangmandirilawfirm.vercel.app',
    siteName: 'Pemenang Mandiri Lawfirm & Partners',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logo-pml-transparent.png',
        width: 590,
        height: 1000,
        alt: 'Logo Pemenang Mandiri Lawfirm & Partners',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pemenang Mandiri Lawfirm & Partners',
    description:
      'Professional legal services for criminal, civil matters, and insurance claim legal support in Surabaya.',
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

        {/* ── JSON-LD Structured Data for Local SEO ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'LegalService',
                name: 'Pemenang Mandiri Lawfirm & Partners',
                url: 'https://pemenangmandirilawfirm.vercel.app',
                logo: 'https://pemenangmandirilawfirm.vercel.app/logo-pml-transparent.png',
                image: 'https://pemenangmandirilawfirm.vercel.app/logo-pml-transparent.png',
                description:
                  'Pemenang Mandiri Lawfirm & Partners menyediakan layanan hukum profesional untuk hukum pidana, perdata, dan pendampingan hukum terkait klaim asuransi di Surabaya.',
                telephone: '+62 896-3871-4065',
                priceRange: '$$',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'Blok C, Plaza Segi 8 No.819',
                  addressSublocality: 'Sonokwijenan',
                  addressLocality: 'Sukomanunggal, Surabaya',
                  addressRegion: 'Jawa Timur',
                  postalCode: '60255',
                  addressCountry: 'ID',
                },
                hasMap: 'https://maps.google.com/?q=Blok+C,+Plaza+Segi+8+No.819,+Sonokwijenan,+Kec.+Sukomanunggal,+Surabaya,+Jawa+Timur+60255',
                areaServed: [
                  { '@type': 'City', name: 'Surabaya' },
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
