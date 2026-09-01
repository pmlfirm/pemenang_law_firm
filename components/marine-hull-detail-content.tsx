'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Ship, ShieldCheck, AlertTriangle, Check, X, Info } from 'lucide-react'
import { pickLanguage, useLanguage } from '@/lib/language'
import { siteRoutes, productIds } from '@/lib/site-data'
import { WhatsappContactButton } from '@/components/whatsapp-contact'

const hullRisks = [
  { en: 'Fire, explosion', id: 'Kebakaran, ledakan', c280: true, c284: true, c289: true },
  { en: 'Piracy', id: 'Perompakan', c280: true, c284: true, c289: true },
  { en: 'Jettison', id: 'Pembuangan ke laut', c280: true, c284: true, c289: true },
  { en: 'Theft', id: 'Pencurian', c280: true, c284: false, c289: false },
  { en: 'Perils of the sea (e.g. collision)', id: 'Bahaya laut seperti tabrakan', c280: true, c284: true, c289: true },
  { en: 'Nuclear accident', id: 'Kecelakaan Nuklir', c280: true, c284: true, c289: true },
  { en: 'Natural disaster', id: 'Bencana alam', c280: true, c284: true, c289: true },
  { en: 'Loading/unloading accident', id: 'Kecelakaan waktu loading-unloading', c280: true, c284: true, c289: true },
  { en: 'Crew negligence', id: 'Kelalaian awak kapal', c280: true, c284: true, c289: true },
  { en: 'Repairer negligence', id: 'Kelalaian repairers', c280: true, c284: true, c289: true },
  { en: 'Collision with aircraft or other equipment', id: 'Tabrakan dengan pesawat udara atau peralatan lainnya', c280: true, c284: true, c289: true },
  { en: 'Pollution prevention measures', id: 'Tindakan mencegah dampak polusi', c280: true, c284: true, c289: true },
  { en: 'Collision liability', id: 'Tanggung jawab hukum akibat tabrakan kapal', c280: true, c284: true, c289: false },
  { en: 'General average contribution', id: 'Kontribusi general average', c280: true, c284: true, c289: true },
  { en: 'Salvage costs', id: 'Biaya penyelamatan-penyelamatan', c280: true, c284: true, c289: true },
  { en: 'Salvage and salvage charges contribution', id: 'Kontribusi Salvage and Salvage charges', c280: true, c284: true, c289: true },
  { en: 'Bursting of boilers on vessel etc.', id: 'Bursting of boilers pada kapal dll', c280: true, c284: true, c289: true },
]

const clauseTypes = [
  {
    code: 'Clause 280',
    fullName: 'ITC-Hull 1.10.83 Clause 280',
    en: 'Comprehensive / Full Navigational Perils',
    id: 'Comprehensive atau Full Navigational Perils',
    color: 'bg-emerald-500',
    textColor: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
  {
    code: 'Clause 284',
    fullName: 'ITC-Hull 1.10.83 Clause 284',
    en: 'Total Loss + GA and 3/4 Collision Liability',
    id: 'Total Loss + GA and 3/4 Collision Liability',
    color: 'bg-amber-500',
    textColor: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
  {
    code: 'Clause 289',
    fullName: 'ITC-Hull 1.10.83 Clause 289',
    en: 'Total Loss Only',
    id: 'Total Loss Only',
    color: 'bg-rose-500',
    textColor: 'text-rose-700',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
  },
]

export default function MarineHullDetailContent() {
  const { language } = useLanguage()

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#07111F] px-4 py-14 text-white sm:px-6 sm:py-18 lg:px-8 lg:py-20">
        <Image
          src="/photos/product-marine-hull.webp"
          alt="Marine Hull Insurance - vessel protection"
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
            <p className="section-kicker text-white/75 before:bg-[#D4AF37]">Marine Hull Insurance</p>
            <h1 className="mt-4 text-balance text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Marine Hull Insurance
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/72 sm:text-base">
              Covers physical damage or loss to the vessel itself, including the ship's hull, machinery, and equipment. It provides protection against risks like collisions, accidents, and other specified perils.
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
                  en: 'What is Marine Hull Insurance?',
                  id: 'Apa itu Marine Hull Insurance?',
                })}
              </h2>
              <p className="mt-5 text-sm leading-7 text-[#1F2933]/70 sm:text-[15px]">
                {pickLanguage(language, {
                  en: 'Insurance that covers losses and damage to parts of the vessel (including the framework, hull, and engine) due to navigation activities.',
                  id: 'Asuransi yang memberikan jaminan kerugian dan kerusakan pada bagian kapal (termasuk dalam rangka kapal, lambung kapal, dan mesin kapal) akibat aktivitas pelayaran.',
                })}
              </p>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-emerald-800">All Risks (Comprehensive)</h3>
                      <p className="mt-1 text-sm leading-6 text-emerald-700/80">
                        {pickLanguage(language, {
                          en: <>Covers both partial loss (<em>Partial Loss</em>) and total loss (<em>Total Loss</em>)</>,
                          id: <>Menjamin kerusakan sebagian (<em>Partial Loss</em>) dan kerusakan total (<em>Total Loss</em>)</>,
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white">
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-rose-800">Total Loss</h3>
                      <p className="mt-1 text-sm leading-6 text-rose-700/80">
                        {pickLanguage(language, {
                          en: 'Covers total loss only (partial loss is not covered)',
                          id: 'Menjamin kerusakan total saja (tidak menjamin kerusakan sebagian)',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative overflow-hidden rounded-[2rem] border border-[#0B1F3A]/8 shadow-xl shadow-[#07111F]/7">
              <div className="relative aspect-[16/11]">
                <Image
                  src="/photos/product-marine-hull.webp"
                  alt="Kapal laut untuk perlindungan Marine Hull Insurance"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clause Types */}
      <section className="bg-white px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="section-kicker">
              {pickLanguage(language, { en: 'Types of Coverage', id: 'Jenis Jaminan' })}
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-[#0B1F3A] sm:text-4xl">
              {pickLanguage(language, { en: 'Three types of coverage', id: 'Ada tiga jenis jaminan' })}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#1F2933]/68 sm:text-[15px]">
              {pickLanguage(language, {
                en: 'The differences can be seen in the comparison table below.',
                id: 'Perbedaan tersebut dapat dilihat di tabel perbandingan di bawah ini.',
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
                    {index + 1}
                  </span>
                  <span className={`rounded-full ${clause.bgColor} px-3 py-1 text-[11px] font-bold ${clause.textColor} ring-1 ring-current/15`}>
                    {clause.code}
                  </span>
                </div>
                <h3 className={`text-sm font-black ${clause.textColor}`}>{clause.fullName}</h3>
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
              {pickLanguage(language, { en: 'Risk Comparison', id: 'Perbandingan Risiko' })}
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-[#0B1F3A] sm:text-4xl">
              {pickLanguage(language, { en: 'Covered Risk Comparison', id: 'Perbandingan Risiko yang Dijamin' })}
            </h2>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-[#0B1F3A]/8 bg-white shadow-xl shadow-[#07111F]/5">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b-2 border-[#0B1F3A]/10 bg-[#0B1F3A]">
                    <th className="px-5 py-4 text-left text-sm font-bold text-white">
                      {pickLanguage(language, { en: 'Covered Risk', id: 'Risiko yang dijamin' })}
                    </th>
                    {clauseTypes.map((clause) => (
                      <th key={clause.code} className="px-4 py-4 text-center text-sm font-bold text-white">
                        <div>{clause.code}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {hullRisks.map((row, index) => (
                    <tr
                      key={row.id}
                      className={`border-b border-[#0B1F3A]/6 transition-colors hover:bg-[#F8F5EF]/50 ${index % 2 === 0 ? 'bg-white' : 'bg-[#FDFCF9]'}`}
                    >
                      <td className="px-5 py-3.5 text-sm text-[#0B1F3A]/80">{pickLanguage(language, { en: row.en, id: row.id })}</td>
                      <td className="px-4 py-3.5 text-center">
                        {row.c280 ? (
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
                        {row.c284 ? (
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
                        {row.c289 ? (
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
                  en: 'Discuss your Marine Hull Insurance needs',
                  id: 'Diskusikan kebutuhan Marine Hull Insurance Anda',
                })}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/64">
                {pickLanguage(language, {
                  en: 'Contact our Marine Hull team for professional consultation.',
                  id: 'Hubungi tim Marine Hull kami untuk konsultasi profesional.',
                })}
              </p>
            </div>
            <div className="grid gap-3">
              <WhatsappContactButton contactId="marine-hull" className="border-white/15 bg-white/8 text-white hover:bg-white/14" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
