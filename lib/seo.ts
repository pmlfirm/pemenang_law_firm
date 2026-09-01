import type { Metadata } from 'next'
import { pageSeo, siteConfig, siteRoutes } from '@/lib/site-data'

type SeoImage = {
  url: string
  width: number
  height: number
  alt: string
}

type PageSeo = (typeof pageSeo)[keyof typeof pageSeo]

export function absoluteUrl(path: string = siteRoutes.home) {
  if (path.startsWith('http')) return path
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`
}

export function createPageMetadata(page: PageSeo): Metadata {
  const image: SeoImage = page.image ?? siteConfig.defaultOgImage

  return {
    metadataBase: new URL(siteConfig.url),
    title: page.title,
    description: page.description,
    keywords: [...siteConfig.keywords],
    alternates: {
      canonical: page.path,
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      url: page.path,
      siteName: siteConfig.name,
      title: page.title,
      description: page.description,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [image.url],
    },
  }
}

export function safeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: [siteConfig.shortName, 'PML', 'Pemenang Mandiri Lawfirm & Partners'],
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.assets.logo),
    image: absoluteUrl(siteConfig.defaultOgImage.url),
    description: siteConfig.description,
    telephone: siteConfig.phone,
    sameAs: [siteConfig.instagram],
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.addressLocality,
      addressRegion: 'Jawa Timur',
      addressCountry: siteConfig.addressCountry,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia',
    },
    knowsAbout: [...siteConfig.keywords],
    availableLanguage: ['Indonesian', 'English'],
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: ['id', 'en'],
    publisher: { '@id': `${siteConfig.url}/#organization` },
  }
}
