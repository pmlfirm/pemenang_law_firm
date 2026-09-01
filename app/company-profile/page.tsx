import CompanyProfileContent from '@/components/company-profile-content'
import { pageSeo, siteConfig, siteRoutes } from '@/lib/site-data'
import { breadcrumbJsonLd, createPageMetadata, safeJsonLd } from '@/lib/seo'

export const metadata = createPageMetadata(pageSeo.companyProfile)

export default function CompanyProfilePage() {
  const profileJsonLd = [
    breadcrumbJsonLd({ name: 'Company Profile', path: pageSeo.companyProfile.path }),
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: `Company Profile - ${siteConfig.name}`,
      url: `${siteConfig.url}${siteRoutes.companyProfile}`,
      mainEntity: {
        '@type': 'InsuranceAgency',
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        logo: `${siteConfig.url}${siteConfig.assets.logo}`,
      },
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(profileJsonLd) }} />
      <CompanyProfileContent />
    </>
  )
}
