import PartnerPageContent from '@/components/partner-page-content'
import { brokerPartners, insurancePartners, pageSeo, siteConfig, siteRoutes } from '@/lib/site-data'
import { breadcrumbJsonLd, createPageMetadata, safeJsonLd } from '@/lib/seo'

export const metadata = createPageMetadata(pageSeo.ourPartner)

export default function OurPartnerPage() {
  const partnerJsonLd = [
    breadcrumbJsonLd({ name: 'Our Partners', path: pageSeo.ourPartner.path }),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `Our Partners - ${siteConfig.name}`,
      url: `${siteConfig.url}${siteRoutes.ourPartner}`,
      description: pageSeo.ourPartner.description,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: [...brokerPartners, ...insurancePartners].map((partner, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: partner.name,
          description: partner.description,
        })),
      },
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(partnerJsonLd) }} />
      <PartnerPageContent />
    </>
  )
}
