'use client'

import Image from 'next/image'
import { BriefcaseBusiness, CircleCheck, ExternalLink, Landmark, MapPin } from 'lucide-react'
import { pmlConfig, pmlCopy } from '@/lib/pml-content'
import { contactById, getContactWhatsappHref } from '@/lib/site-data'
import { useLanguage } from '@/lib/language'

/* ── WhatsApp SVG Icon ── */
function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.502 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0Zm9.334 22.614c-.39 1.1-1.932 2.014-3.172 2.28-.846.18-1.952.324-5.674-1.22-4.762-1.976-7.822-6.81-8.06-7.124-.23-.314-1.924-2.564-1.924-4.89 0-2.326 1.218-3.468 1.65-3.942.39-.428 1.026-.626 1.636-.626.198 0 .376.01.536.018.432.018.648.044.934.724.354.844 1.218 2.972 1.326 3.188.108.216.216.506.072.806-.136.306-.252.486-.468.746-.216.26-.444.58-.638.778-.216.234-.44.486-.19.918.252.432 1.118 1.844 2.402 2.988 1.65 1.474 3.04 1.932 3.472 2.148.432.216.684.18.936-.108.26-.288 1.098-1.278 1.39-1.716.288-.432.58-.36.974-.216.396.144 2.518 1.188 2.95 1.404.432.216.72.324.828.504.108.18.108 1.042-.282 2.134Z" />
    </svg>
  )
}

/* ── Practice area icon mapping ── */
const areaIcons = [Landmark, BriefcaseBusiness]

export default function PmlPageContent() {
  const { language } = useLanguage()
  const t = pmlCopy[language]

  /* Same number and starter message as the PML WhatsApp contact */
  const waHref = getContactWhatsappHref(contactById['pml-law-firm'], language)

  return (
    <div className="pml-shell text-white">
      {/* ═══════════════════════════════════════════
          PRACTICE AREAS
      ═══════════════════════════════════════════ */}
      <section id="pml-practice-areas" className="scroll-mt-20 px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="pml-kicker justify-center">{t.practiceKicker}</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">{t.practiceHeading}</h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/64 sm:text-[15px]">
              {t.practiceSubheading}
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {t.practiceAreas.map((area, idx) => {
              const Icon = areaIcons[idx] ?? Landmark
              return (
                <article key={area.title} className="pml-card rounded-[1.75rem] p-6 sm:p-7">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D4AF37]/16 text-[#D4AF37]">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white">{area.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-white/66">{area.description}</p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {area.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/26 px-4 py-3 text-sm text-white/74"
                      >
                        <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" aria-hidden="true" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ABOUT US
      ═══════════════════════════════════════════ */}
      <section id="pml-about-us" className="scroll-mt-20 px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="pml-card rounded-[1.75rem] p-6 sm:p-7">
            <p className="pml-kicker">{t.aboutKicker}</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">{t.aboutHeading}</h2>
            <p className="mt-5 text-sm leading-7 text-white/68 sm:text-[15px]">{t.aboutP1}</p>
            <p className="mt-4 text-sm leading-7 text-white/68 sm:text-[15px]">{t.aboutP2}</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CONTACT
      ═══════════════════════════════════════════ */}
      <section id="pml-contact" className="scroll-mt-20 px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[#D4AF37]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0.01)_100%)] shadow-2xl shadow-black/20">
          <div className="grid lg:grid-cols-[1fr_0.75fr]">
            {/* Left — Text content */}
            <div className="flex flex-col justify-center px-6 py-10 sm:px-8 sm:py-12">
              <p className="pml-kicker">{t.contactKicker}</p>
              <h2 className="mt-4 text-balance text-3xl font-black tracking-tight text-white sm:text-4xl">
                {t.contactHeading}
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-white/66 sm:text-[15px]">{t.contactDescription}</p>

              {/* Office Address Card */}
              <div className="mt-6 space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm sm:p-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                  <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{t.officeAddressLabel}</span>
                </div>
                <p className="text-sm font-semibold leading-relaxed text-white/90">{pmlConfig.name}</p>
                <p className="text-xs leading-relaxed text-white/70">{t.officeAddressValue}</p>
                <div className="pt-1">
                  <a
                    href={pmlConfig.address.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] hover:underline"
                  >
                    <span>{t.openMapsLabel}</span>
                    <ExternalLink className="h-3 w-3 shrink-0" />
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-[#08110d] shadow-lg shadow-[#25D366]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3CE076]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {t.contactCta}
                </a>
              </div>
            </div>

            {/* Right — Portrait photo */}
            <div className="relative hidden min-h-[320px] lg:block">
              <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0f172a]/60 to-transparent" />
              <Image
                src={pmlConfig.contactPortrait}
                alt={`${pmlConfig.name} — Legal Consultant`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 0px, 380px"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
