'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Eye,
  Target,
  Heart,
  Users,
  Lightbulb,
  ShieldCheck,
  Zap,
  Calendar,
  Award,
  Building2,
  BookOpen,
  type LucideIcon,
} from 'lucide-react'
import { pickLanguage, useLanguage } from '@/lib/language'
import { pageSeo, serviceAreas, siteMedia, siteRoutes } from '@/lib/site-data'

export default function CompanyProfileContent() {
  const { language } = useLanguage()

  const missionItems = [
    {
      icon: Heart,
      text: 'Memberikan Pelayanan maksimal kepada para pelanggan dan mempertahankan kepercayaan yang telah diberikan oleh para pelanggan',
    },
    {
      icon: Users,
      text: 'Mengembangkan kerjasama yang baik dengan Perusahaan',
    },
    {
      icon: Lightbulb,
      text: 'Memberikan konsultasi asuransi yang berkualitas kepada para pelanggan',
    },
    {
      icon: ShieldCheck,
      text: 'Menangani setiap masalah yang berkaitan dengan asuransi secara profesional',
    },
    {
      icon: Zap,
      text: 'Mencari solusi dengan cepat dan tepat dalam setiap menangani kerugian yang timbul',
    },
  ]

  const historyMilestones = [
    {
      date: '9 Maret 2000',
      icon: Building2,
      title: 'Pendirian Perusahaan',
      description: 'UD. Pemenang Mandiri Law Firm Asuransi didirikan',
    },
    {
      date: '29 September 2000',
      icon: Award,
      title: 'Registrasi Resmi',
      description:
        'Terdaftar sebagai agen lisensi secara resmi sesuai Peraturan Pemerintah Indonesia',
      details: [
        { label: 'Nomor Lisensi', value: '20074 / S-AAU / 2006' },
        { label: 'Nomor Daftar Perdagangan (Kecil)', value: '130157435935' },
        { label: 'Nomor Surat Ijin Usaha', value: '503/902/436.4 12/2006' },
      ],
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
        <Image
          src={pageSeo.companyProfile.image.url}
          alt={pageSeo.companyProfile.image.alt}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[68%_25%] brightness-110 saturate-105 sm:object-[50%_25%]"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,17,31,0.84)_0%,rgba(7,17,31,0.72)_46%,rgba(7,17,31,0.42)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t from-[#F8F5EF] to-transparent" />

        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl space-y-5">
            <p className="section-kicker text-white/78 before:bg-[#D4AF37]">
              {pickLanguage(language, { en: 'Company Profile', id: 'Profil Perusahaan' })}
            </p>
            <h1 className="text-balance text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {pickLanguage(language, {
                en: 'Professional insurance consultation delivered with clarity, care, and a dependable standard.',
                id: 'Konsultasi asuransi profesional dengan standar yang jelas, penuh perhatian, dan dapat diandalkan.',
              })}
            </h1>
            <p className="max-w-2xl text-justify text-sm leading-7 text-white/74 sm:text-[15px] lg:text-base">
              {pickLanguage(language, {
                en: 'Pemenang Mandiri Law Firm supports clients in selecting relevant protection, understanding policy information, and preparing a clearer and more organized claim process.',
                id: 'Pemenang Mandiri Law Firm membantu klien memilih perlindungan yang relevan, memahami informasi polis, dan menyiapkan proses klaim yang lebih jelas serta tertata.',
              })}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href={siteRoutes.products}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-5 py-3 text-sm font-bold text-[#07111F] shadow-lg shadow-[#D4AF37]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E0C878]"
              >
                {pickLanguage(language, { en: 'View Products', id: 'Lihat Produk' })}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={siteRoutes.contact}
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/8 px-5 py-3 text-sm font-bold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/14"
              >
                WhatsApp Contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-[#F8F5EF] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="section-kicker">
              {pickLanguage(language, { en: 'Vision & Mission', id: 'Visi & Misi' })}
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-[#0B1F3A] sm:text-4xl">
              {pickLanguage(language, {
                en: 'Our guiding principles that drive every decision.',
                id: 'Prinsip utama yang mendasari setiap langkah kami.',
              })}
            </h2>
          </div>

          {/* Vision Card */}
          <div className="mb-6 overflow-hidden rounded-[1.75rem] border border-[#D4AF37]/20 bg-gradient-to-br from-[#0B1F3A] to-[#132D52] p-6 shadow-xl shadow-[#0B1F3A]/12 sm:p-8">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#D4AF37]/15 text-[#D4AF37] ring-1 ring-[#D4AF37]/25">
                <Eye className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white sm:text-2xl">
                  {pickLanguage(language, { en: 'Vision', id: 'Visi' })}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-white/75 sm:text-base">
                  Menjadi konsultan / Agen asuransi yang terpercaya dan mengedepankan kualitas serta memberikan pelayanan yang profesional.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div className="overflow-hidden rounded-[1.75rem] border border-[#0B1F3A]/8 bg-white p-6 shadow-lg shadow-[#0B1F3A]/5 sm:p-8">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F8F4EA] text-[#B8941F] ring-1 ring-[#D4AF37]/15">
                <Target className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-black text-[#0B1F3A] sm:text-2xl">
                {pickLanguage(language, { en: 'Mission', id: 'Misi' })}
              </h3>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {missionItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <div
                    key={index}
                    className="group flex gap-4 rounded-2xl border border-[#0B1F3A]/6 bg-[#FDFCF9] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/25 hover:shadow-md hover:shadow-[#D4AF37]/8"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F8F4EA] text-[#B8941F] transition-colors duration-300 group-hover:bg-[#D4AF37]/15">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#D4AF37]">
                        {pickLanguage(language, { en: 'Mission', id: 'Misi' })} {index + 1}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-[#1F2933]/75">
                        {item.text}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Company History Timeline */}
      <section className="bg-white px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="section-kicker">
              {pickLanguage(language, { en: 'Our History', id: 'Sejarah Kami' })}
            </p>
            <h2 className="mt-3 text-2xl font-black leading-tight text-[#0B1F3A] sm:text-4xl">
              {pickLanguage(language, {
                en: 'The milestones that shaped our journey.',
                id: 'Tonggak penting dalam perjalanan kami.',
              })}
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/40 to-transparent sm:left-8 md:block" />

            <div className="grid gap-6">
              {historyMilestones.map((milestone, index) => {
                const Icon = milestone.icon
                return (
                  <div key={index} className="relative flex gap-5 sm:gap-7 md:pl-0">
                    {/* Timeline dot */}
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-[#D4AF37]/30 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-[#07111F] shadow-lg shadow-[#D4AF37]/20 sm:h-16 sm:w-16">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>

                    <div className="flex-1 rounded-[1.5rem] border border-[#0B1F3A]/8 bg-[#FDFCF9] p-5 shadow-md shadow-[#0B1F3A]/4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:p-6">
                      <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#D4AF37]/10 px-3 py-1 text-xs font-bold text-[#8B6914]">
                        <Calendar className="h-3.5 w-3.5" />
                        {milestone.date}
                      </div>
                      <h3 className="text-lg font-black text-[#0B1F3A] sm:text-xl">
                        {milestone.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[#1F2933]/70 sm:text-[15px]">
                        {milestone.description}
                      </p>

                      {milestone.details && (
                        <div className="mt-4 space-y-2 rounded-xl border border-[#0B1F3A]/6 bg-white p-4">
                          {milestone.details.map((detail, i) => (
                            <div key={i} className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                              <span className="text-xs font-bold text-[#0B1F3A]/50 sm:min-w-[220px]">
                                {detail.label}:
                              </span>
                              <span className="text-sm font-semibold text-[#0B1F3A]">
                                {detail.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="bg-[#F8F5EF] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[1.75rem] border border-[#0B1F3A]/8 bg-[#FBF9F4] p-8 shadow-lg shadow-[#07111F]/5 sm:p-10">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="section-kicker">{pickLanguage(language, { en: 'Service Areas', id: 'Area Layanan' })}</p>
              <h2 className="mt-3 text-2xl font-black text-[#0B1F3A] sm:text-4xl">
                {pickLanguage(language, {
                  en: 'Our principal products and support areas.',
                  id: 'Produk dan area dukungan utama kami.',
                })}
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {serviceAreas.map((area) => (
                <div key={area} className="rounded-2xl border border-[#0B1F3A]/8 bg-white px-5 py-4 text-sm font-semibold text-[#0B1F3A]">
                  {area}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-[#F8F5EF] px-4 pb-14 sm:px-6 sm:pb-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[1.75rem] border border-[#0B1F3A]/8 bg-white shadow-lg shadow-[#0B1F3A]/5">
            <div className="grid lg:grid-cols-[1fr_1fr] lg:items-center">
              {/* Image side */}
              <div className="relative aspect-[16/11] bg-[#F5F1E8] lg:aspect-auto lg:h-full">
                <Image
                  src={siteMedia.aboutConsulting.url}
                  alt={siteMedia.aboutConsulting.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0B1F3A]/5" />
              </div>

              {/* Content side */}
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F8F4EA] text-[#B8941F]">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <p className="section-kicker !mb-0">Overview</p>
                </div>
                <h2 className="text-2xl font-black text-[#0B1F3A] sm:text-3xl">
                  {pickLanguage(language, {
                    en: 'Growing with Trusted Professionalism',
                    id: 'Bertumbuh dengan Profesionalisme Terpercaya',
                  })}
                </h2>
                <p className="mt-4 text-justify text-sm leading-7 text-[#1F2933]/70 sm:text-[15px]">
                  Sebagai perusahaan yang sedang berkembang, kami didukung oleh personel yang berpengalaman dan reputasi yang teruji, maka kami dapat memberikan pelayanan yang memenuhi standart yang dapat di andalkan. Di dalam proses berkembang kami berusaha secara bertahap untuk meningkatkan profesionalisme kerja dibidang konsultan asuransi kerugian, guna untuk menunjang pertumbuhan dunia asuransi yang sehat dan profesional di Indonesia.
                </p>
                <div className="mt-6">
                  <Link
                    href={siteRoutes.contact}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-5 py-3 text-sm font-bold text-[#07111F] shadow-lg shadow-[#D4AF37]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E0C878]"
                  >
                    {pickLanguage(language, { en: 'Contact Us', id: 'Hubungi Kami' })}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
