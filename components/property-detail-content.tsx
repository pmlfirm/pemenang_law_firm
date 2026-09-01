'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  Flame,
  Zap,
  Bomb,
  PlaneLanding,
  Wind,
  Building2,
  Factory,
  Package,
  Sofa,
  ShieldCheck,
  CloudRain,
  Mountain,
  Users,
} from 'lucide-react'
import { pickLanguage, useLanguage } from '@/lib/language'
import { siteRoutes } from '@/lib/site-data'
import { WhatsappContactButton } from '@/components/whatsapp-contact'

const flexasPerils = [
  { icon: Flame, en: 'Fire', id: 'Kebakaran' },
  { icon: Zap, en: 'Lightning', id: 'Petir' },
  { icon: Bomb, en: 'Explosion', id: 'Ledakan' },
  { icon: PlaneLanding, en: 'Aircraft Impact', id: 'Kejatuhan Pesawat Terbang' },
  { icon: Wind, en: 'Smoke', id: 'Asap' },
]

const insurableAssets = [
  {
    number: '01',
    name: 'Bangunan',
    english: 'Building',
    icon: Building2,
    color: 'bg-blue-500',
    image: '/photos/card-building.webp',
  },
  {
    number: '02',
    name: 'Mesin',
    english: 'Machinery',
    icon: Factory,
    color: 'bg-amber-500',
    image: '/photos/card-machinery.webp',
  },
  {
    number: '03',
    name: 'Barang Dagangan',
    english: 'Stock',
    icon: Package,
    color: 'bg-emerald-500',
    image: '/photos/card-stock.webp',
  },
  {
    number: '04',
    name: 'Isi & Perlengkapan Bangunan',
    english: 'Content',
    icon: Sofa,
    color: 'bg-violet-500',
    image: '/photos/card-content.webp',
  },
]

const extendedCoverages = [
  {
    code: 'TSFWD',
    name: 'Typhoon, Storm, Flood, & Water Damage',
    icon: CloudRain,
    color: 'bg-cyan-500',
    image: '/photos/card-typhoon-flood.webp',
  },
  {
    code: 'EQVET',
    name: 'Earthquake, Tsunami & Volcanic Eruption',
    icon: Mountain,
    color: 'bg-orange-500',
    image: '/photos/card-earthquake-volcano.webp',
  },
  {
    code: 'RSMDCC',
    name: 'Riot, Strike, Malicious Damage & Civil Commotion',
    icon: Users,
    color: 'bg-rose-500',
    image: '/photos/card-riot-commotion.webp',
  },
]

export default function PropertyDetailContent() {
  const { language } = useLanguage()

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#07111F] px-4 py-14 text-white sm:px-6 sm:py-18 lg:px-8 lg:py-20">
        <Image
          src="/photos/product-property.webp"
          alt="FIRE / Property Insurance"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover opacity-40"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,17,31,0.97)_0%,rgba(7,17,31,0.88)_52%,rgba(7,17,31,0.68)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-[#F6F8FB] to-transparent" />

        <div className="mx-auto max-w-7xl">
          <Link
            href={siteRoutes.products}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-bold text-white/78 backdrop-blur transition-colors hover:bg-white/14 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {pickLanguage(language, { en: 'Back to Products', id: 'Kembali ke Produk' })}
          </Link>

          <div className="max-w-4xl">
            <p className="section-kicker text-white/75 before:bg-[#D4AF37]">Property Insurance</p>
            <h1 className="mt-4 text-balance text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              FIRE / Property Insurance
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/72 sm:text-base">
              {pickLanguage(language, {
                en: 'Insurance that covers property against damage or loss caused by fire, lightning, explosion, aircraft impact, and smoke — also known as Fire, Lightning, Explosion, Aircraft Impact, and Smoke (FLEXAS).',
                id: 'Asuransi yang menjamin harta benda terhadap kerusakan atau kerugian yang disebabkan oleh kebakaran, petir, ledakan, kejatuhan pesawat terbang, dan asap — atau dikenal dengan Fire, Lightning, Explosion, Aircraft Impact, dan Smoke (FLEXAS).',
              })}
            </p>
          </div>
        </div>
      </section>

      {/* FLEXAS Overview */}
      <section className="bg-[#F6F8FB] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="section-kicker">
                {pickLanguage(language, { en: 'Basic Coverage', id: 'Jaminan Dasar' })}
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-[#0B1F3A] sm:text-4xl">
                {pickLanguage(language, {
                  en: 'What is FLEXAS?',
                  id: 'Apa itu FLEXAS?',
                })}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#1F2933]/70 sm:text-[15px]">
                {pickLanguage(language, {
                  en: 'Insurance that covers property against damage or loss caused by:',
                  id: 'Asuransi yang menjamin harta benda terhadap kerusakan atau kerugian yang disebabkan oleh:',
                })}
              </p>

              <div className="mt-6 grid gap-3">
                {flexasPerils.map((peril, index) => {
                  const Icon = peril.icon
                  return (
                    <div
                      key={peril.en}
                      className="group flex items-center gap-4 rounded-2xl border border-[#0B1F3A]/6 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/25 hover:shadow-md"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs font-bold text-[#0B1F3A]/40">{index + 1}.</span>
                        <span className="font-bold text-[#0B1F3A]">{pickLanguage(language, { en: peril.en, id: peril.id })}</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-5 rounded-2xl border border-[#D4AF37]/20 bg-[#FBF9F4] p-4">
                <p className="text-sm leading-6 text-[#0B1F3A]/70">
                  {pickLanguage(language, {
                    en: <>Also known as <strong className="text-[#0B1F3A]"><em>Fire, Lightning, Explosion, Aircraft Impact,</em> and <em>Smoke</em></strong> (FLEXAS).</>,
                    id: <>Atau dikenal dengan <strong className="text-[#0B1F3A]"><em>Fire, Lightning, Explosion, Aircraft Impact,</em> dan <em>Smoke</em></strong> (FLEXAS).</>,
                  })}
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative overflow-hidden rounded-[2rem] border border-[#0B1F3A]/8 shadow-xl shadow-[#07111F]/7">
              <div className="relative aspect-[16/11]">
                <Image
                  src="/photos/product-property.webp"
                  alt="Property Insurance - perlindungan harta benda"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurable Assets */}
      <section className="bg-white px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            {/* Assets Grid */}
            <div>
              <p className="section-kicker">
                {pickLanguage(language, { en: 'Insurable Assets', id: 'Harta Benda yang Diasuransikan' })}
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-[#0B1F3A] sm:text-4xl">
                {pickLanguage(language, { en: 'Insurable Assets', id: 'Harta Benda yang bisa di asuransikan' })}
              </h2>

              <div className="mt-6 grid grid-cols-2 gap-4">
                {insurableAssets.map((asset) => {
                  const Icon = asset.icon
                  return (
                    <div
                      key={asset.number}
                      className="group relative isolate overflow-hidden rounded-[1.5rem] border border-white/10 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <Image
                        src={asset.image}
                        alt={asset.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="-z-20 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#07111F]/90 via-[#07111F]/60 to-[#07111F]/30" />
                      <div className="relative p-5">
                        <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl ${asset.color} text-white shadow-md ring-1 ring-white/20`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="mb-1 block text-2xl font-black text-white/25">{asset.number}</span>
                        <h3 className="text-base font-black text-white">{asset.name}</h3>
                        <p className="text-xs italic text-white/60">({asset.english})</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* All Risk Description */}
            <div className="rounded-[1.75rem] border border-[#0B1F3A]/8 bg-[#FDFCF9] p-6 shadow-lg sm:p-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B1F3A] text-[#D4AF37] shadow-lg shadow-[#07111F]/12">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-black text-[#0B1F3A]">Property <em>All Risk</em> Insurance</h3>
              </div>
              <p className="text-sm leading-7 text-[#1F2933]/70">
                {pickLanguage(language, {
                  en: 'Property All Risk Insurance is a policy that provides protection for damage that occurs suddenly and unexpectedly from various risks such as FLEXAS as well as typhoon, storm, flood, landslide, earthquake, strike, riot, civil commotion, malicious acts, and other risks specified in the policy.',
                  id: 'Asuransi Property All Risk merupakan polis asuransi yang memberikan perlindungan atas kerusakan yang terjadi secara tiba-tiba dan tidak terduga akibat dari berbagai macam risiko seperti FLEXAS serta angin topan, badai, banjir, tanah longsor, gempa bumi, pemogokan, huru hara, kerusuhan, perbuatan jahat orang lain dan risiko lainnya yang disebutkan dalam polis.',
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Extended Coverage */}
      <section className="bg-[#F6F8FB] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="section-kicker">
              {pickLanguage(language, { en: 'Extended Coverage', id: 'Perluasan Jaminan' })}
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-[#0B1F3A] sm:text-4xl">
              {pickLanguage(language, { en: 'Extended Coverage', id: 'Perluasan Jaminan' })}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#1F2933]/68 sm:text-[15px]">
              {pickLanguage(language, {
                en: 'In addition to the basic FLEXAS coverage, the policy can be extended to include the following additional risks:',
                id: 'Selain jaminan dasar FLEXAS, polis dapat diperluas untuk mencakup risiko-risiko tambahan berikut:',
              })}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {extendedCoverages.map((coverage, index) => {
              const Icon = coverage.icon
              return (
                <div
                  key={coverage.code}
                  className="group relative isolate overflow-hidden rounded-[1.5rem] border border-white/10 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <Image
                    src={coverage.image}
                    alt={coverage.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="-z-20 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#07111F]/92 via-[#07111F]/65 to-[#07111F]/35" />
                  <div className="relative p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${coverage.color} text-white shadow-md ring-1 ring-white/20`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold text-white/90 ring-1 ring-white/20 backdrop-blur-sm">
                        {coverage.code}
                      </span>
                    </div>
                    <span className="mb-2 block text-xs font-bold text-white/40">{index + 1}.</span>
                    <h3 className="text-base font-black text-white">
                      <em>{coverage.name}</em>
                    </h3>
                    <p className="mt-2 text-sm text-white/55">({coverage.code})</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F8F5EF] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#07111F] p-7 text-white shadow-2xl shadow-[#07111F]/16 sm:p-10">
          <div className="grid items-center gap-7 md:grid-cols-[1fr_320px]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37]">
                {pickLanguage(language, { en: 'Consultation', id: 'Konsultasi' })}
              </p>
              <h2 className="mt-3 text-2xl font-black sm:text-4xl">
                {pickLanguage(language, {
                  en: 'Discuss your Property Insurance needs',
                  id: 'Diskusikan kebutuhan Property Insurance Anda',
                })}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/64">
                {pickLanguage(language, {
                  en: 'Contact our FIRE / Property team for professional consultation.',
                  id: 'Hubungi tim FIRE / Property kami untuk konsultasi profesional.',
                })}
              </p>
            </div>
            <div className="grid gap-3">
              <WhatsappContactButton contactId="fire-property" className="border-white/15 bg-white/8 text-white hover:bg-white/14" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
