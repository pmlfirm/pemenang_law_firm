import PmlPageContent from '@/components/pml-page-content'
import { pmlConfig } from '@/lib/pml-content'
import { pageSeo, siteRoutes } from '@/lib/site-data'
import { absoluteUrl, breadcrumbJsonLd, createPageMetadata, safeJsonLd } from '@/lib/seo'

export const metadata = createPageMetadata(pageSeo.pml)

export default function PmlPage() {
  const pmlJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      name: pmlConfig.name,
      alternateName: ['PML', 'Pemenang Mandiri Lawfirm'],
      url: absoluteUrl(siteRoutes.pml),
      logo: absoluteUrl(pmlConfig.logo),
      image: absoluteUrl(pageSeo.pml.image.url),
      description: pageSeo.pml.description,
      telephone: pmlConfig.phone,
      knowsAbout: [
        'Hukum Pidana',
        'Hukum Perdata',
        'Sengketa Kontrak & Utang Piutang',
        'Pendampingan Hukum Klaim Asuransi',
        'Konsultasi Hukum Surabaya',
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: pmlConfig.address.street,
        addressSublocality: 'Sonokwijenan',
        addressLocality: 'Sukomanunggal, Surabaya',
        addressRegion: pmlConfig.address.province,
        postalCode: pmlConfig.address.postalCode,
        addressCountry: 'ID',
      },
      hasMap: pmlConfig.address.mapsUrl,
      areaServed: [
        { '@type': 'City', name: 'Surabaya' },
        { '@type': 'State', name: 'Jawa Timur' },
        { '@type': 'Country', name: 'Indonesia' },
      ],
      availableLanguage: ['Indonesian', 'English'],
    },
    breadcrumbJsonLd({ name: 'PML', path: siteRoutes.pml }),
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(pmlJsonLd) }} />
      <PmlPageContent />
    </>
  )
}
