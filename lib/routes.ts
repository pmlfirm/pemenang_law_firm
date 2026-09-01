/**
 * Single source for every internal route.
 * Kept in its own module so both site-data and pml-content can read it
 * without importing each other.
 */
export const siteRoutes = {
  home: '/',
  chatApi: '/api/chat',
  manifest: '/manifest.webmanifest',
  sitemap: '/sitemap.xml',
  robots: '/robots.txt',
} as const
