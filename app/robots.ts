import type { MetadataRoute } from 'next'
import { siteConfig, siteRoutes } from '@/lib/site-data'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: siteRoutes.home,
      disallow: ['/api/'],
    },
    sitemap: `${siteConfig.url}${siteRoutes.sitemap}`,
  }
}
