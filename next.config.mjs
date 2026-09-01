const isStaticExport = process.env.BUILD_MODE === 'static'
const isDev = process.env.NODE_ENV === 'development'

/* Inline <script> is used for JSON-LD and inline style attributes are used for
   animation delays, so those two need 'unsafe-inline'. Everything else is
   locked to this origin plus Google Fonts. */
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  /* Skipped in dev: React's dev build needs eval() and HMR needs a websocket. */
  ...(isDev ? [] : [{ key: 'Content-Security-Policy', value: contentSecurityPolicy }]),
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Set BUILD_MODE=static in .env to produce a static export for shared hosting (e.g. Niaga Hoster).
     Default (no value / "server") keeps full Next.js server mode for Vercel.
     Static export cannot emit response headers — public/.htaccess covers that case. */
  ...(isStaticExport
    ? { output: 'export', trailingSlash: true, images: { unoptimized: true } }
    : {
        images: { formats: ['image/avif', 'image/webp'], minimumCacheTTL: 31_536_000 },
        async headers() {
          return [{ source: '/:path*', headers: securityHeaders }]
        },
      }),
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
}

export default nextConfig
