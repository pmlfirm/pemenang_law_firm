'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  Check,
  X,
  Shield,
  CloudRain,
  Mountain,
  Users,
  Crosshair,
  UserCheck,
} from 'lucide-react'
import { pickLanguage, useLanguage } from '@/lib/language'
import { siteRoutes } from '@/lib/site-data'
import { WhatsappContactButton } from '@/components/whatsapp-contact'

const vehicleRisks = [
  { en: 'Malicious Acts', id: 'Perbuatan Jahat', comp: true, tlo: true },
  { en: 'Theft', id: 'Pencurian', comp: true, tlo: true },
  { en: 'Collision', id: 'Tabrakan', comp: true, tlo: true },
  { en: 'Fire', id: 'Kebakaran', comp: true, tlo: true },
  { en: 'Riot', id: 'Huru-Hara', comp: true, tlo: true },
  { en: 'Earthquake', id: 'Gempa Bumi', comp: true, tlo: true },
  { en: 'Flood', id: 'Banjir', comp: true, tlo: true },
  { en: 'Landslide', id: 'Tanah Longsor', comp: true, tlo: true },
  { en: 'Typhoon', id: 'Angin Topan', comp: true, tlo: true },
  { en: 'Tsunami', id: 'Tsunami', comp: true, tlo: true },
  { en: 'Personal Accident', id: 'Kecelakaan Diri', comp: true, tlo: true },
  { en: 'Volcanic Eruption', id: 'Letusan Gunung', comp: true, tlo: true },
]

const coverageTypes = [
  {
    title: 'COMPREHENSIVE',
    en: 'Provides compensation for both total loss and partial damage.',
    id: 'Memberikan ganti rugi terhadap kerusakan total dan sebagian.',
    color: 'bg-blue-600',
    icon: ShieldCheck,
    image: '/photos/card-car-comprehensive.webp',
  },
  {
    title: 'TLO (TOTAL LOSS ONLY)',
    en: 'Provides compensation for total loss only, where the repair cost equals or exceeds 75% of the actual vehicle value.',
    id: 'Memberikan ganti rugi terhadap kerusakan total saja atau kerusakan, di mana biaya perbaikan sama dengan atau lebih dari 75% harga kendaraan sebenarnya.',
    color: 'bg-amber-600',
    icon: AlertTriangle,
    image: '/photos/card-car-total-loss.webp',
  },
]

const extendedCoverages = [
  { number: 1, name: 'Third Party Liability', code: 'TPL', icon: Crosshair, image: '/photos/card-car-tpl.webp' },
  { number: 2, name: 'Personal Accident', code: '', icon: UserCheck, image: '/photos/card-car-personal-accident.webp' },
  { number: 3, name: 'Typhoon, Storm, Flood, Hail & Landslide', code: 'TSFHL', icon: CloudRain, image: '/photos/card-car-flood.webp' },
  { number: 4, name: 'Earthquake, Tsunami & Volcanic Eruption', code: 'EQVET', icon: Mountain, image: '/photos/card-car-earthquake.webp' },
  { number: 5, name: 'Strike, Riot, & Civil Commotion', code: 'SRCC', icon: Users, image: '/photos/card-car-riot.webp' },
  { number: 6, name: 'Terrorism & Sabotage', code: '', icon: Shield, image: '/photos/card-car-terrorism.webp' },
]

export default function MotorVehicleDetailContent() {
  const { language } = useLanguage()

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#07111F] px-4 py-14 text-white sm:px-6 sm:py-18 lg:px-8 lg:py-20">
        <Image
          src="/photos/product-vehicle.webp"
          alt="Motor Vehicle Insurance"
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
            <p className="section-kicker text-white/75 before:bg-[#D4AF37]">Vehicle Insurance</p>
            <h1 className="mt-4 text-balance text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Motor Vehicle Insurance
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/72 sm:text-base">
              {pickLanguage(language, {
                en: 'Insurance that protects against losses that may arise in connection with the ownership and use of motor vehicles.',
                id: 'Asuransi yang melindungi dari risiko kerugian yang mungkin timbul sehubungan dengan kepemilikan dan pemakaian kendaraan bermotor.',
              })}
            </p>
          </div>
        </div>
      </section>

      {/* Coverage Types */}
      <section className="bg-[#F6F8FB] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="section-kicker">
              {pickLanguage(language, { en: 'Coverage Types', id: 'Jenis Jaminan' })}
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-[#0B1F3A] sm:text-4xl">
              Comprehensive vs TLO
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#1F2933]/68 sm:text-[15px]">
              {pickLanguage(language, {
                en: 'The covered risks can be seen in the comparison table below.',
                id: 'Risiko yang dijamin dapat dilihat di tabel perbandingan berikut ini.',
              })}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {coverageTypes.map((type) => {
              const Icon = type.icon
              return (
                <div
                  key={type.title}
                  className="group relative isolate overflow-hidden rounded-[1.75rem] border border-white/10 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <Image
                    src={type.image}
                    alt={type.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="-z-20 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#07111F]/92 via-[#07111F]/70 to-[#07111F]/40" />
                  <div className="relative p-6 sm:p-7">
                    <div className="mb-4 flex items-center gap-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${type.color} text-white shadow-lg ring-1 ring-white/20`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-black text-white">{type.title}</h3>
                    </div>
                    <p className="text-sm leading-7 text-white/75">
                      {pickLanguage(language, { en: type.en, id: type.id })}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-white px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="section-kicker">
              {pickLanguage(language, { en: 'Risk Comparison', id: 'Perbandingan Risiko' })}
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-[#0B1F3A] sm:text-4xl">
              {pickLanguage(language, { en: 'Covered Risks', id: 'Risiko yang Dijamin' })}
            </h2>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-[#0B1F3A]/8 bg-white shadow-xl shadow-[#07111F]/5">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-[#0B1F3A]/10 bg-[#0B1F3A]">
                    <th className="px-5 py-4 text-left text-sm font-bold text-white">
                      {pickLanguage(language, { en: 'Covered Risk', id: 'Risiko yang Dijamin' })}
                    </th>
                    <th className="px-4 py-4 text-center">
                      <span className="inline-block rounded-full bg-blue-500/20 px-4 py-1 text-sm font-bold text-blue-300">
                        {pickLanguage(language, { en: 'Comprehensive', id: 'Komprehensif' })}
                      </span>
                    </th>
                    <th className="px-4 py-4 text-center">
                      <span className="inline-block rounded-full bg-amber-500/20 px-4 py-1 text-sm font-bold text-amber-300">TLO</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {vehicleRisks.map((row, index) => (
                    <tr
                      key={row.id}
                      className={`border-b border-[#0B1F3A]/6 transition-colors hover:bg-[#F8F5EF]/50 ${index % 2 === 0 ? 'bg-white' : 'bg-[#FDFCF9]'}`}
                    >
                      <td className="px-5 py-3.5 text-sm text-[#0B1F3A]/80">
                        {pickLanguage(language, { en: row.en, id: row.id })}
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        {row.comp ? (
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                            <Check className="h-4 w-4" />
                          </span>
                        ) : (
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                            <X className="h-4 w-4" />
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        {row.tlo ? (
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                            <Check className="h-4 w-4" />
                          </span>
                        ) : (
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                            <X className="h-4 w-4" />
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-5 border-t border-[#0B1F3A]/8 bg-[#FDFCF9] px-5 py-4">
              <span className="text-xs font-bold text-[#0B1F3A]/50">
                {pickLanguage(language, { en: 'Legend:', id: 'Keterangan:' })}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-[#1F2933]/60">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Check className="h-3 w-3" />
                </span>
                {pickLanguage(language, { en: 'Covered', id: 'Dijamin' })}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-[#1F2933]/60">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                  <X className="h-3 w-3" />
                </span>
                {pickLanguage(language, { en: 'Not Covered', id: 'Tidak Dijamin' })}
              </span>
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
                en: 'The following extended coverages are available:',
                id: 'Perluasan Jaminan adalah sebagai berikut:',
              })}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {extendedCoverages.map((coverage) => {
              const Icon = coverage.icon
              return (
                <div
                  key={coverage.number}
                  className="group relative isolate overflow-hidden rounded-[1.5rem] border border-white/10 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <Image
                    src={coverage.image}
                    alt={coverage.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="-z-20 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#07111F]/92 via-[#07111F]/65 to-[#07111F]/35" />
                  <div className="relative flex items-start gap-4 p-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white shadow-sm ring-1 ring-white/25 backdrop-blur">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white/40">{coverage.number}.</span>
                      <h3 className="text-sm font-bold text-white">
                        <em>{coverage.name}</em>
                      </h3>
                      {coverage.code && (
                        <span className="mt-1 inline-block rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-bold text-white/80 ring-1 ring-white/20 backdrop-blur-sm">
                          {coverage.code}
                        </span>
                      )}
                    </div>
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
                  en: 'Discuss your Motor Vehicle Insurance needs',
                  id: 'Diskusikan kebutuhan Motor Vehicle Insurance Anda',
                })}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/64">
                {pickLanguage(language, {
                  en: 'Contact our Motor Vehicle team for professional consultation.',
                  id: 'Hubungi tim Motor Vehicle kami untuk konsultasi profesional.',
                })}
              </p>
            </div>
            <div className="grid gap-3">
              <WhatsappContactButton contactId="motor-vehicle" className="border-white/15 bg-white/8 text-white hover:bg-white/14" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
