'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Anchor, Car, ClipboardCheck, FileText, Flame, Plane, Scale, type LucideIcon } from 'lucide-react'
import { pickLanguage, useLanguage } from '@/lib/language'
import { productEnglishCopy, type ProductId } from '@/lib/product-copy'
import { pageSeo, productCategories, siteRoutes } from '@/lib/site-data'

const productIconMap: Record<string, LucideIcon> = {
  anchor: Anchor,
  flame: Flame,
  car: Car,
  plane: Plane,
  scale: Scale,
  clipboard: ClipboardCheck,
}

export default function ProductsPageContent() {
  const { language } = useLanguage()

  return (
    <>
      <section className="relative isolate overflow-hidden px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
        <Image
          src={pageSeo.products.image.url}
          alt={pageSeo.products.image.alt}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[70%_center] brightness-110 saturate-110 sm:object-center"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,17,31,0.82)_0%,rgba(7,17,31,0.70)_48%,rgba(7,17,31,0.42)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t from-[#F6F8FB] to-transparent" />

        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl space-y-5">
            <p className="section-kicker text-white/78 before:bg-[#D4AF37]">
              {pickLanguage(language, { en: 'Product Portfolio', id: 'Portofolio Produk' })}
            </p>
            <h1 className="text-balance text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {pickLanguage(language, {
                en: 'Structured insurance consultation for Marine, Property, Motor, Travel, Liability, and Claim Assistance.',
                id: 'Konsultasi asuransi yang terstruktur untuk Marine, Property, Motor, Travel, Liability, dan Bantuan Klaim.',
              })}
            </h1>
            <p className="max-w-2xl text-justify text-sm leading-7 text-white/76 sm:text-[15px] lg:text-base">
              {pickLanguage(language, {
                en: 'Choose the category that matches your personal or business requirements. Each product is presented clearly and professionally to make the initial consultation easier to understand.',
                id: 'Pilih kategori yang sesuai dengan kebutuhan personal atau bisnis Anda. Setiap produk disajikan secara jelas dan profesional agar konsultasi awal lebih mudah dipahami.',
              })}
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href={productCategories[0].href}
                className="rounded-full bg-[#D4AF37] px-5 py-3 text-sm font-black text-[#07111F] shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E8C960]"
              >
                {pickLanguage(language, { en: 'Explore Products', id: 'Jelajahi Produk' })}
              </Link>
              <Link
                href={siteRoutes.contact}
                className="rounded-full border border-white/18 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/16"
              >
                WhatsApp Contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F6F8FB] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {productCategories.map((product, index) => {
            const Icon = productIconMap[product.icon] ?? FileText
            const isReversed = index % 2 === 1
            const english = productEnglishCopy[product.id as ProductId]
            const description = language === 'en' ? english.longDescription : product.longDescription
            const englishGroups = english.groups as Record<string, { description: string }>

            return (
              <article
                key={product.id}
                id={product.id}
                className="scroll-mt-28 overflow-hidden rounded-[1.9rem] border border-[#0B1F3A]/10 bg-white shadow-xl shadow-[#07111F]/7"
              >
                <div className="grid gap-0 lg:grid-cols-2">
                  <div className={`relative min-h-[320px] overflow-hidden bg-[#F4EFE3] lg:min-h-full ${isReversed ? 'lg:order-2' : ''}`}>
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className={`flex h-full flex-col p-6 sm:p-8 lg:p-10 ${isReversed ? 'lg:order-1' : ''}`}>
                    <div className="flex items-center gap-4 text-left">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FBF9F4] text-[#B8941F] shadow-sm ring-1 ring-[#0B1F3A]/8">
                        <Icon className="h-6 w-6" />
                      </span>
                      <h2 className="text-2xl font-black tracking-tight text-[#0B1F3A] sm:text-3xl">{product.title}</h2>
                    </div>

                    <p className="mt-4 text-left text-sm leading-7 text-[#1F2933]/72">{description}</p>

                    {product.categoryGroups.length > 0 && (
                      <div className="mt-5 grid gap-3 md:grid-cols-2">
                        {product.categoryGroups.map((subProduct) => (
                          <div
                            key={subProduct.id}
                            id={subProduct.id}
                            className="scroll-mt-28 rounded-[1.15rem] border border-[#0B1F3A]/7 bg-[#FBF9F4] p-4"
                          >
                            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#B8941F] shadow-sm">
                              <FileText className="h-4 w-4" />
                            </div>
                            <h3 className="text-base font-black leading-snug text-[#0B1F3A]">{subProduct.title}</h3>
                            <p className="mt-2 text-left text-xs leading-5 text-[#1F2933]/68">
                              {language === 'en' ? englishGroups[subProduct.id]?.description ?? subProduct.description : subProduct.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-auto pt-5">
                      <Link
                        href={product.detailHref}
                        className="inline-flex items-center rounded-full bg-[#0B1F3A] px-4 py-2 text-xs font-bold text-white shadow-lg shadow-[#07111F]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#12345B]"
                      >
                        {pickLanguage(language, { en: 'View Product Details', id: 'Lihat Detail Produk' })}
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </>
  )
}
