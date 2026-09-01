'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, PackageCheck, Ship, ShieldCheck } from 'lucide-react'
import { pickLanguage, useLanguage } from '@/lib/language'
import { productEnglishCopy, type ProductId } from '@/lib/product-copy'
import {
  contactById,
  productBySlug,
  productGroupIds,
  productIds,
  marineSubProductSlugs,
  siteRoutes,
  type ContactId,
} from '@/lib/site-data'
import { WhatsappContactButton } from '@/components/whatsapp-contact'

type ProductDetailContentProps = {
  slug: keyof typeof productBySlug
}

function getLocalizedProduct(productId: ProductId, language: 'en' | 'id') {
  const product = productBySlug[productId]
  const english = productEnglishCopy[productId]

  return {
    description: language === 'en' ? english.description : product.description,
    longDescription: language === 'en' ? english.longDescription : product.longDescription,
    keyPoints: language === 'en' ? english.keyPoints : product.keyPoints,
  }
}

export default function ProductDetailContent({ slug }: ProductDetailContentProps) {
  const { language } = useLanguage()
  const product = productBySlug[slug]
  const localized = getLocalizedProduct(product.id as ProductId, language)
  const primaryContactId = product.contactIds[0] as ContactId

  const pageLabels = {
    back: pickLanguage(language, { en: 'Back to Products', id: 'Kembali ke Produk' }),
    overview: pickLanguage(language, { en: 'Product Overview', id: 'Ringkasan Produk' }),
    overviewTitle: pickLanguage(language, {
      en: 'Important information before your consultation.',
      id: 'Informasi penting sebelum konsultasi.',
    }),
    overviewBody: pickLanguage(language, {
      en: 'These points help prepare the initial context so the discussion can be more focused, practical, and easier to follow up.',
      id: 'Poin-poin berikut membantu menyiapkan konteks awal agar diskusi lebih fokus, praktis, dan mudah ditindaklanjuti.',
    }),
    categories: pickLanguage(language, { en: 'Protection Categories', id: 'Kategori Perlindungan' }),
    categoriesTitle: pickLanguage(language, {
      en: 'Choose the protection area that matches your needs.',
      id: 'Pilih area perlindungan yang sesuai dengan kebutuhan Anda.',
    }),
    consultation: pickLanguage(language, { en: 'Consultation', id: 'Konsultasi' }),
    discuss: pickLanguage(language, {
      en: `Discuss your ${product.shortTitle} requirements with the appropriate team.`,
      id: `Diskusikan kebutuhan ${product.shortTitle} Anda dengan tim yang sesuai.`,
    }),
    discussBody: pickLanguage(language, {
      en: 'Share a brief description of your needs and the available initial documents. The relevant product team will help direct the next consultation step.',
      id: 'Sampaikan gambaran kebutuhan dan dokumen awal yang tersedia. Tim produk terkait akan membantu mengarahkan langkah konsultasi berikutnya.',
    }),
  }

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#07111F] px-4 py-14 text-white sm:px-6 sm:py-18 lg:px-8 lg:py-20">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover opacity-45"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,17,31,0.97)_0%,rgba(7,17,31,0.88)_52%,rgba(7,17,31,0.68)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-[#F6F8FB] to-transparent" />

        <div className="mx-auto max-w-7xl">
          <Link
            href={siteRoutes.products}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-bold text-white/78 backdrop-blur transition-colors hover:bg-white/14 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {pageLabels.back}
          </Link>

          <div className="max-w-4xl">
            <p className="section-kicker text-white/75 before:bg-[#D4AF37]">{product.category}</p>
            <h1 className="mt-4 text-balance text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {product.title}
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/72 sm:text-base">
              {localized.longDescription}
            </p>
          </div>
        </div>
      </section>

      {product.id !== productIds.marine && (
        <section className="bg-[#F6F8FB] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-4 lg:grid-cols-[1.45fr_0.8fr]">
              <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-[#0B1F3A]/8 bg-white shadow-xl shadow-[#07111F]/7 sm:min-h-[520px]">
                <Image
                  src={product.gallery[0].src}
                  alt={product.gallery[0].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {product.gallery.slice(1).map((image) => (
                  <div
                    key={image.src}
                    className="relative min-h-[220px] overflow-hidden rounded-[1.65rem] border border-[#0B1F3A]/8 bg-white shadow-lg shadow-[#07111F]/5 lg:min-h-0"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 35vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {product.id !== productIds.marine && (
        <section className="bg-white px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="section-kicker">{pageLabels.overview}</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0B1F3A] sm:text-4xl">
                {pageLabels.overviewTitle}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#1F2933]/68 sm:text-[15px]">
                {pageLabels.overviewBody}
              </p>
            </div>

            <div className="grid gap-3">
              {localized.keyPoints.map((point) => (
                <div
                  key={point}
                  className="flex gap-4 rounded-[1.35rem] border border-[#0B1F3A]/8 bg-[#F8F5EF] p-5 shadow-sm shadow-[#07111F]/4"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-[#07111F]">
                    <Check className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-semibold leading-7 text-[#0B1F3A]/78">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {product.id === productIds.marine ? (
        <MarineProductComparison language={language} />
      ) : (
        <section className="bg-[#F6F8FB] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 max-w-3xl">
              <p className="section-kicker">{pageLabels.categories}</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0B1F3A] sm:text-4xl">
                {pageLabels.categoriesTitle}
              </h2>
            </div>

            <div className={`grid gap-5 ${product.categoryGroups.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
              {product.categoryGroups.map((group, index) => {
                const englishGroups = productEnglishCopy[product.id as ProductId].groups as Record<
                  string,
                  { description: string; highlights: readonly string[] }
                >
                const englishGroup = englishGroups[group.id]
                const description = language === 'en' && englishGroup ? englishGroup.description : group.description
                const highlights = language === 'en' && englishGroup ? englishGroup.highlights : group.highlights

                return (
                  <article
                    key={group.id}
                    id={group.id}
                    className="scroll-mt-28 rounded-[1.75rem] border border-[#0B1F3A]/8 bg-white p-6 shadow-lg shadow-[#07111F]/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7"
                  >
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B1F3A] text-[#D4AF37] shadow-lg shadow-[#07111F]/12">
                        <ShieldCheck className="h-6 w-6" />
                      </span>
                      <span className="rounded-full bg-[#D4AF37]/12 px-3 py-1 text-[11px] font-black text-[#B8941F]">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-[#0B1F3A]">{group.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#1F2933]/68">{description}</p>
                    {highlights.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="rounded-full bg-[#F8F5EF] px-3 py-1.5 text-[11px] font-bold text-[#0B1F3A]/70 ring-1 ring-[#0B1F3A]/8"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {product.id !== productIds.marine && (
        <section className="bg-[#F8F5EF] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#07111F] p-7 text-white shadow-2xl shadow-[#07111F]/16 sm:p-10">
            <div className="grid items-center gap-7 md:grid-cols-[1fr_320px]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37]">{pageLabels.consultation}</p>
                <h2 className="mt-3 text-2xl font-black sm:text-4xl">{pageLabels.discuss}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/64">{pageLabels.discussBody}</p>
              </div>
              <div className="grid gap-3">
                <WhatsappContactButton contactId={primaryContactId} className="border-white/15 bg-white/8 text-white hover:bg-white/14" />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

function MarineProductComparison({ language }: { language: 'en' | 'id' }) {
  const cargo = contactById['marine-cargo']
  const hull = contactById['marine-hull']
  const cargoEnglish = productEnglishCopy[productIds.marine].groups[productGroupIds.marineCargo]
  const hullEnglish = productEnglishCopy[productIds.marine].groups[productGroupIds.marineHull]
  const marineProduct = productBySlug[productIds.marine]
  const cargoIndonesian = marineProduct.categoryGroups.find((group) => group.id === productGroupIds.marineCargo)!
  const hullIndonesian = marineProduct.categoryGroups.find((group) => group.id === productGroupIds.marineHull)!

  const cards = [
    {
      id: productGroupIds.marineCargo,
      title: 'Marine Cargo Insurance',
      eyebrow: pickLanguage(language, { en: 'Goods in Transit', id: 'Barang dalam Perjalanan' }),
      image: cargo.image,
      imageAlt: cargo.imageAlt,
      imagePosition: cargo.imagePosition,
      description: language === 'en' ? cargoEnglish.description : cargoIndonesian.description,
      contactId: cargo.id,
      detailHref: `${siteRoutes.products}/${marineSubProductSlugs.marineCargo}`,
      icon: PackageCheck,
      accent: 'from-cyan-950/90 via-cyan-950/30 to-transparent',
    },
    {
      id: productGroupIds.marineHull,
      title: 'Marine Hull Insurance',
      eyebrow: pickLanguage(language, { en: 'Vessel and Machinery', id: 'Kapal dan Mesin' }),
      image: hull.image,
      imageAlt: hull.imageAlt,
      imagePosition: hull.imagePosition,
      description: language === 'en' ? hullEnglish.description : hullIndonesian.description,
      contactId: hull.id,
      detailHref: `${siteRoutes.products}/${marineSubProductSlugs.marineHull}`,
      icon: Ship,
      accent: 'from-indigo-950/90 via-indigo-950/30 to-transparent',
    },
  ] as const

  return (
    <section className="bg-[#F6F8FB] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 max-w-4xl">
          <p className="section-kicker">
            {pickLanguage(language, { en: 'Marine Protection Categories', id: 'Kategori Perlindungan Marine' })}
          </p>
          <h2 className="mt-3 text-balance text-3xl font-black tracking-tight text-[#0B1F3A] sm:text-4xl">
            {pickLanguage(language, {
              en: 'Marine Cargo and Marine Hull protect different insured interests.',
              id: 'Marine Cargo dan Marine Hull melindungi objek pertanggungan yang berbeda.',
            })}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#1F2933]/68 sm:text-[15px]">
            {pickLanguage(language, {
              en: 'Marine Cargo focuses on the goods being transported, while Marine Hull focuses on the vessel, machinery, and maritime operating interests. Each category has its own dedicated WhatsApp contact.',
              id: 'Marine Cargo berfokus pada barang yang dikirim, sedangkan Marine Hull berfokus pada kapal, mesin, dan kepentingan operasional maritim. Setiap kategori memiliki kontak WhatsApp tersendiri.',
            })}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <article
                key={card.id}
                id={card.id}
                className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-[#0B1F3A]/9 bg-white shadow-xl shadow-[#07111F]/7"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={`object-cover ${card.imagePosition}`}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${card.accent}`} />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/68">{card.eyebrow}</p>
                    <h3 className="mt-1 text-2xl font-black sm:text-3xl">{card.title}</h3>
                  </div>
                </div>

                <div className="space-y-5 p-6 sm:p-7">
                  <p className="text-sm leading-7 text-[#1F2933]/70">{card.description}</p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={card.detailHref}
                      className="inline-flex items-center gap-2 rounded-full bg-[#0B1F3A] px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#07111F]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#12345B]"
                    >
                      {pickLanguage(language, { en: 'View Detail', id: 'Lihat Detail' })}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <WhatsappContactButton contactId={card.contactId} />
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
