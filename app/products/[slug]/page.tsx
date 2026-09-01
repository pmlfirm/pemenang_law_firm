import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductDetailContent from '@/components/product-detail-content'
import MarineHullDetailContent from '@/components/marine-hull-detail-content'
import MarineCargoDetailContent from '@/components/marine-cargo-detail-content'
import PropertyDetailContent from '@/components/property-detail-content'
import MotorVehicleDetailContent from '@/components/motor-vehicle-detail-content'
import {
  productCategories,
  productBySlug,
  productIds,
  siteConfig,
  siteRoutes,
  marineSubProductSlugs,
} from '@/lib/site-data'
import { absoluteUrl, breadcrumbJsonLd, safeJsonLd, serviceJsonLd } from '@/lib/seo'

const allSlugs = [
  ...productCategories.map((p) => p.slug),
  ...Object.values(marineSubProductSlugs),
]

export function generateStaticParams() {
  return allSlugs.map((slug) => ({ slug }))
}

const customMeta: Record<string, { title: string; description: string; image: string; imageAlt: string }> = {
  [marineSubProductSlugs.marineHull]: {
    title: 'Marine Hull Insurance - Vessel & Machinery Protection',
    description:
      'Covers physical damage or loss to the vessel itself, including the ship\'s hull, machinery, and equipment.',
    image: '/photos/product-marine-hull.webp',
    imageAlt: 'Marine Hull Insurance - vessel and machinery protection',
  },
  [marineSubProductSlugs.marineCargo]: {
    title: 'Marine Cargo Insurance - Cargo Transit Protection',
    description:
      'Protects the cargo being transported against damage or loss during transit by sea, air, or land.',
    image: '/photos/product-marine-cargo.webp',
    imageAlt: 'Marine Cargo Insurance - cargo transit protection',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const custom = customMeta[slug]
  if (custom) {
    const href = `/products/${slug}`
    return {
      title: custom.title,
      description: custom.description,
      alternates: { canonical: href },
      openGraph: {
        type: 'website',
        locale: siteConfig.locale,
        siteName: siteConfig.name,
        url: href,
        title: custom.title,
        description: custom.description,
        images: [{ url: custom.image, width: 1600, height: 1000, alt: custom.imageAlt }],
      },
      twitter: {
        card: 'summary_large_image',
        title: custom.title,
        description: custom.description,
        images: [custom.image],
      },
    }
  }

  const product = productCategories.find((item) => item.slug === slug)
  if (!product) return { title: 'Product Not Found' }

  return {
    title: product.seoTitle,
    description: product.seoDescription,
    alternates: { canonical: product.detailHref },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: product.detailHref,
      title: product.seoTitle,
      description: product.seoDescription,
      images: [{ url: product.image, width: 1600, height: 1000, alt: product.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.seoTitle,
      description: product.seoDescription,
      images: [product.image],
    },
  }
}

/** Map product slugs to dedicated detail components */
const dedicatedPages: Record<string, React.ComponentType> = {
  [marineSubProductSlugs.marineHull]: MarineHullDetailContent,
  [marineSubProductSlugs.marineCargo]: MarineCargoDetailContent,
  [productIds.property]: PropertyDetailContent,
  [productIds.vehicle]: MotorVehicleDetailContent,
}

function buildProductJsonLd(slug: string) {
  const custom = customMeta[slug]
  const product = productCategories.find((item) => item.slug === slug)

  const name = custom?.title ?? product?.seoTitle
  const description = custom?.description ?? product?.seoDescription
  if (!name || !description) return null

  const href = `${siteRoutes.products}/${slug}`

  return [
    serviceJsonLd({ name, description, url: href, image: custom?.image ?? product?.image }),
    breadcrumbJsonLd({ name, path: href }),
  ]
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const Dedicated = dedicatedPages[slug]
  const isKnownProduct = Boolean(Dedicated) || slug in productBySlug
  if (!isKnownProduct) notFound()

  const jsonLd = buildProductJsonLd(slug)

  return (
    <>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }} />
      )}
      {Dedicated ? <Dedicated /> : <ProductDetailContent slug={slug as keyof typeof productBySlug} />}
    </>
  )
}
