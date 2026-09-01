import type { MetadataRoute } from 'next'
import { siteConfig, siteRoutes } from '@/lib/site-data'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: siteRoutes.home,
    display: 'standalone',
    background_color: '#F8F5EF',
    theme_color: '#07111F',
    icons: [
      {
        src: siteConfig.assets.logo,
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
