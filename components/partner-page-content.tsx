'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Building2, ShieldCheck } from 'lucide-react'
import { pickLanguage, useLanguage } from '@/lib/language'
import { brokerPartners, insurancePartners, pageSeo, siteRoutes } from '@/lib/site-data'
import PartnerLogo from '@/components/partner-logo'

const brokerDescriptionsId = [
  'Broker asuransi berlisensi yang menyediakan penempatan, konsultasi, dan dukungan manajemen risiko menyeluruh untuk semua lini asuransi.',
] as const

export default function PartnerPageContent() {
  const { language } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<string>('ALL')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(12)

  useEffect(() => {
    const handleResize = () => {
      // 768px matches Tailwind's md breakpoint
      setItemsPerPage(window.innerWidth < 768 ? 6 : 12)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const filteredPartners = insurancePartners.filter(
    (partner) => activeCategory === 'ALL' || (partner.categories as readonly string[]).includes(activeCategory)
  )
  const totalPages = Math.ceil(filteredPartners.length / itemsPerPage)
  
  // Ensure the page doesn't exceed total pages after resize or category change
  const safeCurrentPage = Math.min(currentPage, Math.max(totalPages, 1))

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages)
    }
  }, [totalPages, currentPage])

  const paginatedPartners = filteredPartners.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage
  )

  const jpsBroker = brokerPartners[0]

  return (
    <>
      <section className="relative isolate overflow-hidden px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
        <Image
          src={pageSeo.ourPartner.image.url}
          alt={pageSeo.ourPartner.image.alt}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[50%_25%] brightness-105 saturate-105"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,17,31,0.91)_0%,rgba(7,17,31,0.78)_48%,rgba(7,17,31,0.48)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t from-[#F6F8FB] to-transparent" />

        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl space-y-5">
            <p className="section-kicker text-white/78 before:bg-[#D4AF37]">
              {pickLanguage(language, { en: 'Our Partners', id: 'Mitra Kami' })}
            </p>
            <h1 className="text-balance text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {pickLanguage(language, {
                en: 'Strong collaboration for broader and more dependable insurance solutions.',
                id: 'Kolaborasi yang kuat untuk solusi asuransi yang lebih luas dan dapat diandalkan.',
              })}
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-white/74 sm:text-[15px] lg:text-base">
              {pickLanguage(language, {
                en: 'Our broker and insurance partner network helps us address protection requirements with greater flexibility, structure, and alignment to each client’s risk profile.',
                id: 'Jaringan broker dan mitra asuransi membantu kami menangani kebutuhan perlindungan secara lebih fleksibel, terstruktur, dan sesuai dengan profil risiko setiap klien.',
              })}
            </p>
            <Link
              href={siteRoutes.contact}
              className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-3 text-sm font-black text-[#07111F] shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E8C960]"
            >
              {pickLanguage(language, { en: 'Discuss Your Requirements', id: 'Diskusikan Kebutuhan Anda' })}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#F6F8FB] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="section-kicker">{pickLanguage(language, { en: 'Broker Partner', id: 'Mitra Broker' })}</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0B1F3A] sm:text-4xl">
                {pickLanguage(language, {
                  en: 'Our licensed broker partner.',
                  id: 'Mitra broker berlisensi kami.',
                })}
              </h2>
            </div>
            <p className="text-sm leading-7 text-[#1F2933]/68 sm:text-[15px]">
              {pickLanguage(language, {
                en: 'Pemenang Mandiri Law Firm partners with a licensed insurance broker to provide comprehensive placement, advisory, and risk management support.',
                id: 'Pemenang Mandiri Law Firm bekerja sama dengan broker asuransi berlisensi untuk menyediakan dukungan penempatan, konsultasi, dan manajemen risiko yang menyeluruh.',
              })}
            </p>
          </div>

          <div className="flex justify-center">
            <article className="group flex w-full max-w-2xl flex-col rounded-[2rem] border border-[#D4AF37]/20 bg-[linear-gradient(145deg,#FFFFFF_0%,#FBF8EE_100%)] p-6 shadow-xl shadow-[#D4AF37]/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-8 md:p-10">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div className="flex h-16 min-w-16 items-center justify-center rounded-2xl bg-white px-3 shadow-md shadow-black/6 border border-[#0B1F3A]/6">
                  <img src="/images/partners/jps-logo.png" alt="JPS Insurance Brokers and Consultants" className="h-12 w-auto object-contain" />
                </div>
                <span className="rounded-full bg-[#D4AF37]/18 px-4 py-1.5 text-xs font-black uppercase tracking-[0.15em] text-[#9A7E15]">
                  BROKER
                </span>
              </div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#9A7E15]">{jpsBroker.category}</p>
              <h3 className="mt-2 text-2xl font-black text-[#0B1F3A] sm:text-3xl">{jpsBroker.name}</h3>
              <p className="mt-4 text-sm leading-8 text-[#1F2933]/70 sm:text-[15px]">
                {language === 'id' ? brokerDescriptionsId[0] : jpsBroker.description}
              </p>
              <div className="mt-8 border-t border-[#D4AF37]/10 pt-6">
                <div className="flex items-center gap-3 text-xs font-bold text-[#9A7E15] sm:text-sm">
                  <ShieldCheck className="h-5 w-5 text-[#D4AF37]" />
                  {pickLanguage(language, { en: 'Licensed broker partner', id: 'Mitra broker berlisensi resmi' })}
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 max-w-3xl">
            <p className="section-kicker">{pickLanguage(language, { en: 'Insurance Partners', id: 'Mitra Asuransi' })}</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0B1F3A] sm:text-4xl">
              {pickLanguage(language, { en: 'Our official insurance partners.', id: 'Mitra asuransi resmi kami.' })}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#1F2933]/68 sm:text-[15px]">
              {pickLanguage(language, {
                en: 'Pemenang Mandiri Law Firm works in close collaboration with 28 leading insurance providers in Indonesia to deliver tailored solutions for assets, vehicles, cargo, and travel risks.',
                id: 'Pemenang Mandiri Law Firm bekerja sama dengan 28 perusahaan asuransi terkemuka di Indonesia untuk menghadirkan solusi perlindungan aset, kendaraan, kargo, dan perjalanan yang disesuaikan.',
              })}
            </p>
          </div>

          {/* Infinite Marquee Carousel */}
          <div className="relative w-full overflow-hidden py-8 bg-[#F6F8FB] border-y border-[#0B1F3A]/8 rounded-[2rem] my-8 shadow-sm">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#F6F8FB] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#F6F8FB] to-transparent z-10 pointer-events-none" />
            
            <div className="animate-marquee-scroll flex gap-6 items-center">
              {[...insurancePartners, ...insurancePartners].map((partner, index) => (
                <div 
                  key={`${partner.id}-marquee-${index}`} 
                  className="flex items-center justify-center min-w-[170px] h-24 bg-white border border-[#0B1F3A]/6 rounded-2xl p-4 shadow-sm hover:border-[#D4AF37] hover:shadow-md transition-all duration-300"
                >
                  <PartnerLogo id={partner.id} name={partner.name} className="h-12 w-auto max-w-[140px] object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="mt-12 mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { id: 'ALL', label: { en: 'All Partners', id: 'Semua Mitra' } },
                { id: 'Marine HULL', label: { en: 'Marine Hull', id: 'Marine Hull' } },
                { id: 'Marine CARGO', label: { en: 'Marine Cargo', id: 'Marine Cargo' } },
                { id: 'KENDARAAN', label: { en: 'Vehicle', id: 'Kendaraan' } },
                { id: 'TRAVEL', label: { en: 'Travel', id: 'Travel' } },
                { id: 'ASURANSI_UMUM', label: { en: 'General Insurance', id: 'Asuransi Umum' } },
              ].map((cat) => {
                const isActive = activeCategory === cat.id
                const filteredCount = cat.id === 'ALL' 
                  ? insurancePartners.length 
                  : insurancePartners.filter(p => (p.categories as readonly string[]).includes(cat.id)).length

                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id)
                      setCurrentPage(1)
                    }}
                    className={`rounded-full px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                      isActive
                        ? 'bg-[#0B1F3A] text-white shadow-md shadow-[#07111F]/16 scale-105'
                        : 'bg-white border border-[#0B1F3A]/8 text-[#0B1F3A]/70 hover:border-[#D4AF37] hover:text-[#0B1F3A]'
                    }`}
                  >
                    {pickLanguage(language, cat.label)} ({filteredCount})
                  </button>
                )
              })}
            </div>
          </div>

          {/* Filtered Grid */}
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 animate-fade-up">
            {paginatedPartners.map((partner) => (
              <div
                key={partner.id}
                className="group flex flex-col items-center justify-center p-5 bg-[#FBF9F4] border border-[#0B1F3A]/8 rounded-2xl shadow-sm hover:bg-white hover:border-[#D4AF37] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex h-12 items-center justify-center">
                  <PartnerLogo id={partner.id} name={partner.name} className="h-9 w-auto max-w-[130px] object-contain" />
                </div>
                <h4 className="mt-3 text-xs font-black text-[#0B1F3A] text-center line-clamp-2 min-h-[2.2rem] flex items-center justify-center">
                  {partner.name}
                </h4>
                <div className="mt-2 flex flex-wrap gap-1 justify-center">
                  {partner.categories.map((cat) => (
                    <span
                      key={cat}
                      className="rounded-full bg-[#D4AF37]/10 px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-[#B8941F]"
                    >
                      {cat === 'ASURANSI_UMUM'
                        ? pickLanguage(language, { en: 'General', id: 'Umum' })
                        : cat}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={safeCurrentPage === 1}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#0B1F3A]/8 bg-white text-sm font-black text-[#0B1F3A] shadow-sm hover:border-[#D4AF37] disabled:opacity-40 disabled:hover:border-[#0B1F3A]/8 disabled:pointer-events-none transition-all duration-300"
              >
                &larr;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                const isCurrent = safeCurrentPage === page
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-xl text-xs font-black transition-all duration-300 ${
                      isCurrent
                        ? 'bg-[#0B1F3A] text-white shadow-md shadow-[#07111F]/10 scale-105'
                        : 'border border-[#0B1F3A]/8 bg-white text-[#0B1F3A]/70 hover:border-[#D4AF37] hover:text-[#0B1F3A]'
                    }`}
                  >
                    {page}
                  </button>
                )
              })}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={safeCurrentPage === totalPages}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#0B1F3A]/8 bg-white text-sm font-black text-[#0B1F3A] shadow-sm hover:border-[#D4AF37] disabled:opacity-40 disabled:hover:border-[#0B1F3A]/8 disabled:pointer-events-none transition-all duration-300"
              >
                &rarr;
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#F8F5EF] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#07111F] p-7 text-white shadow-2xl shadow-[#07111F]/16 sm:p-10">
          <div className="grid items-center gap-6 md:grid-cols-[auto_1fr_auto]">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4AF37] text-[#07111F]">
              <Building2 className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-2xl font-black">
                {pickLanguage(language, { en: 'Need a tailored insurance solution?', id: 'Membutuhkan solusi asuransi yang disesuaikan?' })}
              </h2>
              <p className="mt-2 text-sm leading-7 text-white/64">
                {pickLanguage(language, {
                  en: 'Tell us about your personal or business requirements so the team can direct you to the appropriate product and consultation channel.',
                  id: 'Sampaikan kebutuhan personal atau bisnis Anda agar tim dapat mengarahkan produk dan jalur konsultasi yang sesuai.',
                })}
              </p>
            </div>
            <Link
              href={siteRoutes.contact}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-5 py-3 text-sm font-black text-[#07111F] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E8C960]"
            >
              WhatsApp Contact
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
