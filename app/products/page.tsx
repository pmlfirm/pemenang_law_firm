import ProductsPageContent from '@/components/products-page-content'
import { pageSeo, productCategories, siteConfig, siteRoutes } from '@/lib/site-data'
import { breadcrumbJsonLd, createPageMetadata, safeJsonLd } from '@/lib/seo'

export const metadata = createPageMetadata(pageSeo.products)

export default function ProductsPage() {
  const productJsonLd = [
    breadcrumbJsonLd({ name: 'Products', path: pageSeo.products.path }),
    {
      '@context': 'https://schema.org',
      '@type': 'OfferCatalog',
      name: 'Pemenang Mandiri Law Firm Insurance Product Portfolio',
      url: `${siteConfig.url}${siteRoutes.products}`,
      itemListElement: productCategories.map((product) => ({
        '@type': 'OfferCatalog',
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
        dangerouslySetInnerHTML={{ __html: safeJsonLd(productJsonLd) }}
      />
      <ProductsPageContent />
    </>
  )
}
