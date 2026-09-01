import type { MetadataRoute } from 'next'
import { mainNavigation, productCategories, siteConfig, siteRoutes, marineSubProductSlugs } from '@/lib/site-data'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(siteConfig.lastUpdated)

  const mainRoutes = mainNavigation.map((item) => {
    const route = item.href === '/' ? '' : item.href

    return {
      url: `${siteConfig.url}${route}`,
      lastModified,
      changeFrequency: item.href === '/' ? ('weekly' as const) : ('monthly' as const),
      priority: item.href === '/' ? 1 : 0.85,
    }
  })

  const productRoutes = productCategories.map((product) => ({
    url: `${siteConfig.url}${product.detailHref}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const marineSubRoutes = Object.values(marineSubProductSlugs).map((slug) => ({
    url: `${siteConfig.url}/products/${slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const pmlRoute = {
    url: `${siteConfig.url}${siteRoutes.pml}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }

  return [...mainRoutes, pmlRoute, ...productRoutes, ...marineSubRoutes]
}
