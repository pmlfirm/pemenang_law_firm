import type { Metadata } from 'next'
import { LanguageProvider } from '@/components/language-context'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pemenang Mandiri Law Firm & Partners | Firma Hukum Terpercaya',
  description:
    'Pemenang Mandiri Law Firm & Partners menyediakan layanan hukum profesional untuk hukum pidana, perdata, dan pendampingan hukum terkait klaim asuransi.',
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
    'Pemenang Mandiri',
    'Surabaya',
  ],
  robots: { index: true, follow: true },
  authors: [{ name: 'Pemenang Mandiri Law Firm & Partners' }],
  creator: 'Pemenang Mandiri Law Firm & Partners',
  publisher: 'Pemenang Mandiri Law Firm & Partners',
  openGraph: {
    title: 'Pemenang Mandiri Law Firm & Partners',
    description:
      'Professional legal services for criminal and civil matters, and insurance claim legal support.',
    url: 'https://pemenangmandirilawfirm.vercel.app',
    siteName: 'Pemenang Mandiri Law Firm & Partners',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logo-pml-transparent.png',
        width: 590,
        height: 1000,
        alt: 'Logo Pemenang Mandiri Law Firm',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pemenang Mandiri Law Firm & Partners',
    description:
      'Professional legal services for criminal and civil matters, and insurance claim legal support.',
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

        {/* ── JSON-LD Structured Data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'LegalService',
                name: 'Pemenang Mandiri Law Firm & Partners',
                url: 'https://pemenangmandirilawfirm.vercel.app',
                logo: 'https://pemenangmandirilawfirm.vercel.app/logo-pml-transparent.png',
                description:
                  'Professional legal services for criminal and civil matters, and insurance claim legal support.',
                telephone: '+62 896-3871-4065',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Surabaya',
                  addressCountry: 'ID',
                },
                areaServed: { '@type': 'Country', name: 'Indonesia' },
                availableLanguage: ['Indonesian', 'English'],
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Pemenang Mandiri Law Firm & Partners',
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
