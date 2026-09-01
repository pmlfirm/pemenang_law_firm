'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Anchor, ArrowRight, Car, ClipboardCheck, Flame, Plane, Scale, ShieldCheck, type LucideIcon } from 'lucide-react'
import { pickLanguage, useLanguage } from '@/lib/language'
import { productCategories, siteRoutes } from '@/lib/site-data'

const productIconMap: Record<string, LucideIcon> = {
  anchor: Anchor,
  flame: Flame,
  car: Car,
  plane: Plane,
  scale: Scale,
  clipboard: ClipboardCheck,
} as const

export default function ServicesSection() {
  const { language } = useLanguage()

  return (
    <section id="products" className="bg-[#F6F8FB] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="section-kicker justify-center">{pickLanguage(language, { en: 'Our Products', id: 'Produk Kami' })}</p>
          <h2 className="mt-3 text-balance text-2xl font-black tracking-tight text-[#0B1F3A] sm:text-4xl">
            {pickLanguage(language, {
              en: 'Six product categories presented in a clean and easy-to-navigate format.',
              id: 'Enam kategori produk yang ditampilkan dalam format yang rapi dan mudah dijelajahi.',
            })}
          </h2>
          <p className="mt-4 text-justify text-sm leading-7 text-slate-600 sm:text-[15px]">
            {pickLanguage(language, {
              en: 'The homepage presents all categories from a single data source. Full details for Marine, FIRE / Property, Motor Vehicle, Travel, Liability, and Claim Assistance are available on the Products page.',
              id: 'Halaman utama menampilkan seluruh kategori dari satu sumber data. Detail lengkap untuk Marine, FIRE / Property, Motor Vehicle, Travel, Liability, dan Bantuan Klaim tersedia di halaman Produk.',
            })}
          </p>
        </div>

        <div className="grid items-stretch gap-5 lg:grid-cols-3">
          {productCategories.map((product, index) => {
            const Icon = productIconMap[product.icon] ?? ShieldCheck
            return (
              <article
                key={product.title}
                className="animate-fade-up group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#0B1F3A]/8 bg-white shadow-lg shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F3EFE5]">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/92 text-[#0B1F3A] shadow-md">
                    <Icon className="h-5 w-5 text-[#B8941F]" />
                  </div>
                  <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-black text-[#0B1F3A]/72 shadow-sm">0{index + 1}</span>
                </div>

                <div className="flex flex-1 flex-col space-y-5 p-5">
                  <div>
                    <h3 className="text-xl font-black text-[#0B1F3A]">{product.title}</h3>
                    <p className="mt-3 min-h-[84px] text-justify text-sm leading-6 text-slate-600">{product.description}</p>
                  </div>

                  <div className="mt-auto pt-1">
                    <Link
                      href={product.detailHref}
                      className="inline-flex items-center gap-2 text-sm font-black text-[#0B1F3A] transition-colors duration-300 hover:text-[#B8941F]"
                    >
                      {pickLanguage(language, { en: 'Learn More', id: 'Pelajari Lebih Lanjut' })}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-8 rounded-[1.75rem] border border-[#0B1F3A]/8 bg-white p-6 shadow-lg shadow-[#07111F]/5 sm:p-8">
          <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#B8941F] ring-1 ring-[#0B1F3A]/8">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#0B1F3A]">{pickLanguage(language, { en: 'Need claim assistance?', id: 'Butuh bantuan klaim?' })}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-[#1F2933]/68">
                  {pickLanguage(language, {
                    en: 'Prepare the policy number, chronology, photos, or supporting documents, then contact the claim team for more practical guidance.',
                    id: 'Siapkan nomor polis, kronologi, foto, atau dokumen pendukung, lalu hubungi tim klaim untuk arahan yang lebih praktis.',
                  })}
                </p>
              </div>
            </div>
            <Link
              href={siteRoutes.contact}
              className="rounded-full bg-[#0B1F3A] px-6 py-3 text-center text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#102A46]"
            >
              {pickLanguage(language, { en: 'Chat with Claim Team', id: 'Chat dengan Tim Klaim' })}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
