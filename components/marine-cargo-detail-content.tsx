'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, PackageCheck, ShieldCheck, Check, X, Info } from 'lucide-react'
import { pickLanguage, useLanguage } from '@/lib/language'
import { siteRoutes, productIds } from '@/lib/site-data'
import { WhatsappContactButton } from '@/components/whatsapp-contact'

const cargoRisks = [
  { no: 1, en: 'Fire or Explosion', id: 'Kebakaran atau Peledakan', iccA: true, iccB: true, iccC: true },
  { no: 2, en: 'Vessel stranding, grounding, sinking or capsizing', id: 'Kapal Kandas, terdampar, tenggelam atau terbalik', iccA: true, iccB: true, iccC: true },
  { no: 3, en: 'Land vehicle collision, overturning or derailment', id: 'Alat angkut darat tabrakan, terbalik atau keluar rel', iccA: true, iccB: true, iccC: true },
  { no: 4, en: 'Vessel collision or contact with objects other than water', id: 'Tabrakan kapal atau benturan kapal dengan benda-benda lain kecuali air', iccA: true, iccB: true, iccC: true },
  { no: 5, en: 'Discharge of cargo at a port of distress', id: 'Pembongkaran barang di pelabuhan darurat', iccA: true, iccB: true, iccC: true },
  { no: 6, en: 'Earthquake, volcanic eruption or lightning', id: 'Gempa bumi, letusan gunung berapi atau sambaran petir', iccA: true, iccB: true, iccC: false },
  { no: 7, en: 'General average sacrifice', id: 'Pengorbanan kerugian umum (general average/sacrifice)', iccA: true, iccB: true, iccC: true },
  { no: 8, en: 'Jettison (cargo thrown overboard)', id: 'Jettison (pembuangan kargo keluar dari kapal laut)', iccA: true, iccB: true, iccC: false },
  { no: 9, en: 'Cargo washed overboard', id: 'Barang tersapu ombak ke laut (washing over board)', iccA: true, iccB: true, iccC: false },
  { no: 10, en: 'Entry of sea, lake or river water into vessel, hold, container or storage', id: 'Masuknya air laut, air danau atau air sungai ke dalam kapal, palka kapal, kontainer atau tempat penyimpanan', iccA: true, iccB: false, iccC: false },
  { no: 11, en: 'Total loss per package from being dropped or falling overboard during loading/unloading (sling lost)', id: 'Kerugian total per kolo karena terlempar atau jatuh ke laut selama pemuatan atau pembongkaran barang ke atau dari kapal (sling lost)', iccA: true, iccB: true, iccC: false },
  { no: 12, en: 'General Average contribution', id: 'General Average contribution – kontribusi kerugian GA', iccA: true, iccB: true, iccC: true },
  { no: 13, en: 'Both to blame collision contribution', id: 'Both to blame collision : kontribusi tubrukan kapal vs kapal', iccA: true, iccB: true, iccC: true },
  { no: 14, en: 'Flood, typhoon, landslide, land movement, tsunami', id: 'Banjir, angin topan, tanah longsor, pergerakan tanah, tsunami', iccA: true, iccB: false, iccC: false },
  { no: 15, en: 'Theft, robbery and pilferage', id: 'Pencurian, perampokan dan bajing loncat', iccA: true, iccB: false, iccC: false },
  { no: 16, en: 'Dropping, forklift damage, other loading/unloading risks', id: 'Terjatuh, tersodok forklift, risiko bongkar muat lainnya', iccA: true, iccB: false, iccC: false },
  { no: 17, en: 'Other accidental damage not mentioned above', id: 'Kerusakan akibat kecelakaan lainnya (Accidental damage) yang tidak disebut diatas', iccA: true, iccB: false, iccC: false },
]

const clauseTypes = [
  {
    code: 'ICC "A"',
    fullName: 'Institute Cargo Clause A',
    en: 'All Risks — The most comprehensive coverage, covering all risks except those expressly excluded in the policy.',
    id: 'All Risks — Jaminan paling lengkap, mencakup semua risiko kecuali yang dikecualikan secara tegas dalam polis.',
    color: 'bg-emerald-500',
    textColor: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    coverageEn: '17 of 17 risks covered',
    coverageId: '17 dari 17 risiko dijamin',
  },
  {
    code: 'ICC "B"',
    fullName: 'Institute Cargo Clause B',
    en: 'Named Perils (Broad) — Coverage based on specifically named risks, medium scope.',
    id: 'Named Perils (Broad) — Jaminan berdasarkan risiko yang disebutkan secara spesifik, cakupan menengah.',
    color: 'bg-amber-500',
    textColor: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    coverageEn: '12 of 17 risks covered',
    coverageId: '12 dari 17 risiko dijamin',
  },
  {
    code: 'ICC "C"',
    fullName: 'Institute Cargo Clause C',
    en: 'Named Perils (Basic) — The most basic coverage, only covering major risks.',
    id: 'Named Perils (Basic) — Jaminan paling dasar, hanya mencakup risiko-risiko utama saja.',
    color: 'bg-rose-500',
    textColor: 'text-rose-700',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    coverageEn: '7 of 17 risks covered',
    coverageId: '7 dari 17 risiko dijamin',
  },
]

export default function MarineCargoDetailContent() {
  const { language } = useLanguage()

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#07111F] px-4 py-14 text-white sm:px-6 sm:py-18 lg:px-8 lg:py-20">
        <Image
          src="/photos/product-marine-cargo.webp"
          alt="Marine Cargo Insurance - cargo protection"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover opacity-40"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,17,31,0.97)_0%,rgba(7,17,31,0.88)_52%,rgba(7,17,31,0.68)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-[#F6F8FB] to-transparent" />

        <div className="mx-auto max-w-7xl">
          <Link
            href={`${siteRoutes.products}/${productIds.marine}`}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-bold text-white/78 backdrop-blur transition-colors hover:bg-white/14 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {pickLanguage(language, { en: 'Back to Marine Insurances', id: 'Kembali ke Marine Insurances' })}
          </Link>

          <div className="max-w-4xl">
            <p className="section-kicker text-white/75 before:bg-[#D4AF37]">Marine Cargo Insurance</p>
            <h1 className="mt-4 text-balance text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Marine Cargo Insurance
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/72 sm:text-base">
              {pickLanguage(language, {
                en: 'Protects the cargo being transported against damage or loss during transit by sea, air, or land. It covers various perils, including damage caused by accidents, theft, fire, and natural disasters.',
                id: 'Melindungi kargo yang diangkut terhadap kerusakan atau kehilangan selama transit melalui laut, udara, atau darat. Polis ini mencakup berbagai risiko, termasuk kerusakan akibat kecelakaan, pencurian, kebakaran, dan bencana alam.',
              })}
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="bg-[#F6F8FB] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            {/* Text Content */}
            <div>
              <p className="section-kicker">
                {pickLanguage(language, { en: 'Overview', id: 'Ringkasan' })}
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-[#0B1F3A] sm:text-4xl">
                {pickLanguage(language, {
                  en: 'What is Marine Cargo Insurance?',
                  id: 'Apa itu Marine Cargo Insurance?',
                })}
              </h2>
              <p className="mt-5 text-sm leading-7 text-[#1F2933]/70 sm:text-[15px]">
                {pickLanguage(language, {
                  en: 'Insurance that covers losses from damage or loss of goods during transit by land, air, or sea.',
                  id: 'Asuransi yang memberikan jaminan kerugian atas kehilangan atau kerusakan barang pada saat transit melalui darat, udara maupun laut.',
                })}
              </p>

              <div className="mt-6 rounded-2xl border border-[#0B1F3A]/8 bg-white p-5 shadow-md">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-[#07111F]">
                    <Info className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0B1F3A]">
                      {pickLanguage(language, {
                        en: 'Differences in Cargo Insurance Coverage:',
                        id: 'Perbedaan Jaminan Asuransi Pengangkutan Barang:',
                      })}
                    </h3>
                    <ol className="mt-3 space-y-2">
                      {clauseTypes.map((clause, index) => (
                        <li key={clause.code} className="flex items-center gap-3 text-sm text-[#1F2933]/75">
                          <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${clause.color} text-[11px] font-bold text-white`}>
                            {index + 1}
                          </span>
                          {clause.fullName}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="grid gap-4">
              <div className="relative overflow-hidden rounded-[2rem] border border-[#0B1F3A]/8 shadow-xl shadow-[#07111F]/7">
                <div className="relative aspect-[16/10]">
                  <Image
                    src="/photos/product-marine-cargo.webp"
                    alt="Kapal kargo membawa kontainer untuk Marine Cargo Insurance"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ICC Explanation */}
      <section className="bg-white px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-4xl">
            <p className="section-kicker">
              {pickLanguage(language, { en: 'Understanding ICC', id: 'Memahami ICC' })}
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-[#0B1F3A] sm:text-4xl">
              {pickLanguage(language, {
                en: 'Differences Between ICC "A", "B" and "C"',
                id: 'Perbedaan Jaminan Institute Cargo Clauses "A", "B" dan "C"',
              })}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#1F2933]/68 sm:text-[15px]">
              {pickLanguage(language, {
                en: 'Cargo insurance policies generally come in 3 types of coverage, commonly referred to as ICC "A", ICC "B" and ICC "C". ICC stands for Institute Cargo Clauses, which is the title of the clause/condition that governs the limits and conditions applied in a cargo shipping insurance policy.',
                id: 'Jenis Jaminan Polis Asuransi Angkutan, umumnya ada 3 jenis model Jaminan, yang biasa disebut ICC "A", ICC "B" dan ICC "C". ICC sendiri adalah singkatan dari Institute Cargo Clauses, dimana ini merupakan Judul sebuah Klausula/Kondisi yang mengatur batasan jaminan dan kondisi yang diterapkan didalam sebuah polis Asuransi pengiriman Barang.',
              })}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {clauseTypes.map((clause, index) => (
              <div
                key={clause.code}
                className={`overflow-hidden rounded-[1.5rem] border ${clause.borderColor} ${clause.bgColor} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${clause.color} text-sm font-black text-white`}>
                    {clause.code.split('"')[1]}
                  </span>
                  <span className={`rounded-full ${clause.bgColor} px-3 py-1 text-[11px] font-bold ${clause.textColor} ring-1 ring-current/15`}>
                    {pickLanguage(language, { en: clause.coverageEn, id: clause.coverageId })}
                  </span>
                </div>
                <h3 className={`text-base font-black ${clause.textColor}`}>{clause.fullName}</h3>
                <p className="mt-2 text-sm leading-6 text-[#1F2933]/70">
                  {pickLanguage(language, { en: clause.en, id: clause.id })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-[#F6F8FB] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="section-kicker">
              {pickLanguage(language, { en: 'Coverage Comparison', id: 'Perbandingan Jaminan' })}
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-[#0B1F3A] sm:text-4xl">
              {pickLanguage(language, {
                en: 'Differences Between ICC A, ICC B and ICC C',
                id: 'Perbedaan Jaminan ICC A, ICC B dan ICC C',
              })}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#1F2933]/68 sm:text-[15px]">
              {pickLanguage(language, {
                en: 'Let us simply understand the differences between ICC A, ICC B and ICC C.',
                id: 'Maka, mari kita secara sederhana memahami apa saja perbedaan ICC A, ICC B dan ICC C.',
              })}
            </p>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-[#0B1F3A]/8 bg-white shadow-xl shadow-[#07111F]/5">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b-2 border-[#0B1F3A]/10 bg-[#0B1F3A]">
                    <th className="w-12 px-4 py-4 text-center text-sm font-bold text-white">No.</th>
                    <th className="px-5 py-4 text-left text-sm font-bold text-white">
                      {pickLanguage(language, { en: 'Risk / Coverage', id: 'Risiko / Jaminan' })}
                    </th>
                    <th className="px-4 py-4 text-center">
                      <span className="inline-block rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-bold text-emerald-300">ICC &quot;A&quot;</span>
                    </th>
                    <th className="px-4 py-4 text-center">
                      <span className="inline-block rounded-full bg-amber-500/20 px-3 py-1 text-sm font-bold text-amber-300">ICC &quot;B&quot;</span>
                    </th>
                    <th className="px-4 py-4 text-center">
                      <span className="inline-block rounded-full bg-rose-500/20 px-3 py-1 text-sm font-bold text-rose-300">ICC &quot;C&quot;</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cargoRisks.map((row, index) => (
                    <tr
                      key={row.no}
                      className={`border-b border-[#0B1F3A]/6 transition-colors hover:bg-[#F8F5EF]/50 ${index % 2 === 0 ? 'bg-white' : 'bg-[#FDFCF9]'}`}
                    >
                      <td className="px-4 py-3.5 text-center text-xs font-bold text-[#0B1F3A]/40">{row.no}.</td>
                      <td className="px-5 py-3.5 text-sm text-[#0B1F3A]/80">
                        {pickLanguage(language, { en: row.en, id: row.id })}
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        {row.iccA ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                              <Check className="h-3.5 w-3.5" />
                            </span>
                            <span className="hidden sm:inline">{pickLanguage(language, { en: 'covered', id: 'dijamin' })}</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-500">
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-100">
                              <X className="h-3.5 w-3.5" />
                            </span>
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        {row.iccB ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                              <Check className="h-3.5 w-3.5" />
                            </span>
                            <span className="hidden sm:inline">{pickLanguage(language, { en: 'covered', id: 'dijamin' })}</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-500">
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-100">
                              <X className="h-3.5 w-3.5" />
                            </span>
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        {row.iccC ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                              <Check className="h-3.5 w-3.5" />
                            </span>
                            <span className="hidden sm:inline">{pickLanguage(language, { en: 'covered', id: 'dijamin' })}</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-500">
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-100">
                              <X className="h-3.5 w-3.5" />
                            </span>
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
              <span className="text-xs font-bold text-[#0B1F3A]/50">{pickLanguage(language, { en: 'Legend:', id: 'Keterangan:' })}</span>
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
                  en: 'Discuss your Marine Cargo Insurance needs',
                  id: 'Diskusikan kebutuhan Marine Cargo Insurance Anda',
                })}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/64">
                {pickLanguage(language, {
                  en: 'Contact our Marine Cargo team for professional consultation.',
                  id: 'Hubungi tim Marine Cargo kami untuk konsultasi profesional.',
                })}
              </p>
            </div>
            <div className="grid gap-3">
              <WhatsappContactButton contactId="marine-cargo" className="border-white/15 bg-white/8 text-white hover:bg-white/14" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
