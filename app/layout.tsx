import type { Metadata, Viewport } from 'next'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import AiChatWidget from '@/components/ai-chat-widget'
import { pageSeo, siteConfig, siteRoutes } from '@/lib/site-data'
import './globals.css'
import { LanguageProvider } from '@/lib/language'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: pageSeo.home.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: siteRoutes.home,
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteRoutes.home,
    siteName: siteConfig.name,
    title: pageSeo.home.title,
    description: siteConfig.description,
    images: [siteConfig.defaultOgImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageSeo.home.title,
    description: siteConfig.description,
    images: [siteConfig.defaultOgImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [{ url: siteConfig.assets.logo, type: 'image/png' }],
    shortcut: siteConfig.assets.logo,
    apple: siteConfig.assets.logo,
  },
  manifest: siteRoutes.manifest,
  verification: {
    google: 'ibYIhKMN61PjgR2Zlp9eIoTQSJkZ-YV5tJFBS7na-Ig',
  },
}

export const viewport: Viewport = {
  themeColor: '#07111F',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={siteConfig.language} className="scroll-smooth bg-background">
      <head>
        <link rel="icon" href="/logo-pml-transparent.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo-pml-transparent.png" />
        <link rel="shortcut icon" href="/logo-pml-transparent.png" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Security: block right-click, DevTools shortcuts, and text selection of source */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){document.addEventListener('contextmenu',function(e){e.preventDefault()});document.addEventListener('keydown',function(e){if(e.key==='F12'||(e.ctrlKey&&e.shiftKey&&['I','J','C'].includes(e.key))||(e.ctrlKey&&e.key==='u')||(e.ctrlKey&&e.key==='U')){e.preventDefault();return false}})})();`,
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col bg-[#07111F] font-sans antialiased text-foreground">
        <LanguageProvider>
          <Navigation />
          {children}
          <Footer />
          <AiChatWidget />
        </LanguageProvider>
      </body>
    </html>
  )
}
