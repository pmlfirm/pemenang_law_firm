'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, MailCheck, ShieldCheck } from 'lucide-react'

import { pickLanguage, useLanguage } from '@/lib/language'
import { siteMedia, siteRoutes } from '@/lib/site-data'

const companyProfilePoints = {
  en: [
    'Helping clients understand the right insurance category for their risks and assets.',
    'Providing clearer direction before discussing policy details more deeply.',
    'Making the first consultation more focused with product-specific contacts.',
  ],
  id: [
    'Membantu klien memahami kategori asuransi yang tepat untuk risiko dan aset mereka.',
    'Memberikan arahan yang lebih jelas sebelum membahas detail polis lebih dalam.',
    'Membuat konsultasi awal lebih fokus dengan kontak yang spesifik per produk.',
  ],
}

export default function AboutSection() {
  const { language } = useLanguage()
  const points = companyProfilePoints[language]

  return (
    <section id="company-profile" className="bg-[#F8F5EF] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <div className="space-y-6">
          <p className="section-kicker">{pickLanguage(language, { en: 'Company Profile', id: 'Profil Perusahaan' })}</p>

          <div className="space-y-4">
            <h2 className="max-w-2xl text-balance text-2xl font-black tracking-tight text-[#0B1F3A] sm:text-4xl">
              {pickLanguage(language, {
                en: 'A trusted partner for structured insurance consultation.',
                id: 'Mitra tepercaya untuk konsultasi asuransi yang terstruktur.',
              })}
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-[15px]">
              {pickLanguage(language, {
                en: 'Pemenang Mandiri Law Firm helps prospective clients understand insurance needs, choose suitable products, and receive better direction when claim assistance is needed.',
                id: 'Pemenang Mandiri Law Firm membantu calon klien memahami kebutuhan asuransi, memilih produk yang sesuai, dan memperoleh arahan yang lebih baik saat membutuhkan bantuan klaim.',
              })}
            </p>
          </div>

          <div className="grid gap-3">
            {points.map((point) => (
              <div key={point} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#D4AF37]" />
                <p className="text-sm font-medium leading-6 text-[#0B1F3A]/78">{point}</p>
              </div>
            ))}
          </div>

          <Link href={siteRoutes.companyProfile} className="inline-flex rounded-full bg-[#0B1F3A] px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#102A46]">
            {pickLanguage(language, { en: 'Read Company Profile', id: 'Lihat Profil Perusahaan' })}
          </Link>
        </div>

        <div className="overflow-hidden rounded-[1.75rem] border border-[#0B1F3A]/8 bg-white shadow-2xl shadow-[#07111F]/10">
          <div className="relative aspect-[5/4] overflow-hidden bg-[#F5F1E8]">
            <Image
              src={siteMedia.aboutConsulting.url}
              alt={siteMedia.aboutConsulting.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 520px"
              className="object-cover"
            />
          </div>

          <div className="grid gap-4 border-t border-slate-200/80 p-5 sm:grid-cols-2 sm:p-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#D4AF37]" />
              <p className="text-sm leading-6 text-[#1F2933]/70">
                {pickLanguage(language, {
                  en: 'Helping align protection plans with risk exposure and business needs.',
                  id: 'Membantu menyesuaikan rencana perlindungan dengan eksposur risiko dan kebutuhan bisnis.',
                })}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <MailCheck className="mt-1 h-5 w-5 shrink-0 text-[#D4AF37]" />
              <p className="text-sm leading-6 text-[#1F2933]/70">
                {pickLanguage(language, {
                  en: 'Product-specific contacts make the first conversation easier.',
                  id: 'Kontak yang spesifik per produk membuat percakapan awal menjadi lebih mudah.',
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
