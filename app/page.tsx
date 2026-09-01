import HeroSection from '@/components/hero-section'
import WhyChooseSection from '@/components/why-choose-section'
import AboutSection from '@/components/about-section'
import ServicesSection from '@/components/services-section'
import { pageSeo, productCategories, siteConfig } from '@/lib/site-data'
import { createPageMetadata, organizationJsonLd, safeJsonLd, siteNavigationJsonLd, websiteJsonLd } from '@/lib/seo'

export const metadata = createPageMetadata(pageSeo.home)

export default function Home() {
  const homeJsonLd = [
    organizationJsonLd(),
    websiteJsonLd(),
    siteNavigationJsonLd(),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Pemenang Mandiri Law Firm Product Categories',
      itemListElement: productCategories.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: product.title,
        description: product.description,
        url: `${siteConfig.url}${product.detailHref}`,
      })),
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(homeJsonLd) }}
      />
      <HeroSection />
      <WhyChooseSection />
      <AboutSection />
      <ServicesSection />
    </>
  )
}
