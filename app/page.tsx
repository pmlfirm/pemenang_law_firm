import HeroSection from '@/components/hero-section'
import PmlPageContent from '@/components/pml-page-content'
import { pageSeo } from '@/lib/site-data'
import { createPageMetadata, organizationJsonLd, safeJsonLd, websiteJsonLd } from '@/lib/seo'

export const metadata = createPageMetadata(pageSeo.home)

export default function Home() {
  const homeJsonLd = [organizationJsonLd(), websiteJsonLd()]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(homeJsonLd) }}
      />
      <HeroSection />
      <PmlPageContent />
    </>
  )
}
