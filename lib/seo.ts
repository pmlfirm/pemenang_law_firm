import type { Metadata } from 'next'
import { companyAbout, mainNavigation, pageSeo, siteConfig, siteRoutes } from '@/lib/site-data'

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
    '@type': 'InsuranceAgency',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: [siteConfig.shortName, companyAbout.tradeName],
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.assets.logo),
    image: absoluteUrl(siteConfig.defaultOgImage.url),
    description: siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    foundingDate: '2000-03-09',
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

/** Structured data for a single product / service page. */
export function serviceJsonLd(service: {
  name: string
  description: string
  url: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    name: service.name,
    description: service.description,
    url: absoluteUrl(service.url),
    ...(service.image ? { image: absoluteUrl(service.image) } : {}),
    provider: { '@id': `${siteConfig.url}/#organization` },
    areaServed: { '@type': 'Country', name: 'Indonesia' },
    availableLanguage: ['Indonesian', 'English'],
  }
}

export function breadcrumbJsonLd(currentPage: { name: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteConfig.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: currentPage.name,
        item: absoluteUrl(currentPage.path),
      },
    ],
  }
}

export function siteNavigationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: mainNavigation.map((item, index) => ({
      '@type': 'SiteNavigationElement',
      position: index + 1,
      name: item.label,
      url: absoluteUrl(item.href),
    })),
  }
}
