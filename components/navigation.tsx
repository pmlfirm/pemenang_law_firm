'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { lawFirmConfig } from './site-data'
import { useLanguage } from './language-context'
import type { Locale } from './translations'

/* ── Inline flag SVGs ── */
function FlagEN() {
  return (
    <span className="inline-flex h-5 w-7 overflow-hidden rounded-[0.4rem] border border-black/10 shadow-sm ring-1 ring-white/20">
      <svg viewBox="0 0 28 20" className="h-full w-full" aria-hidden="true" focusable="false">
        <rect width="28" height="20" fill="#ffffff" />
        <rect x="11" width="6" height="20" fill="#C8102E" />
        <rect y="7" width="28" height="6" fill="#C8102E" />
      </svg>
    </span>
  )
}

function FlagID() {
  return (
    <span className="inline-flex h-5 w-7 overflow-hidden rounded-[0.4rem] border border-black/10 shadow-sm ring-1 ring-white/20">
      <svg viewBox="0 0 28 20" className="h-full w-full" aria-hidden="true" focusable="false">
        <rect width="28" height="10" fill="#CE1126" />
        <rect y="10" width="28" height="10" fill="#ffffff" />
      </svg>
    </span>
  )
}

/* ── Language Switcher component ── */
function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, setLocale, t } = useLanguage()

  const options: { key: Locale; label: string; Flag: typeof FlagEN; ariaLabel: string }[] = [
    { key: 'en', label: 'EN', Flag: FlagEN, ariaLabel: t.switchToEn },
    { key: 'id', label: 'ID', Flag: FlagID, ariaLabel: t.switchToId },
  ]

  return (
    <div className={`flex items-center rounded-full border border-white/12 bg-white/6 p-0.5 shadow-sm shadow-black/10 ${className}`} aria-label="Language switcher">
      {options.map(({ key, label, Flag, ariaLabel }) => (
        <button
          key={key}
          type="button"
          className={`rounded-full px-2 py-1 text-[11px] inline-flex items-center gap-1.5 font-bold transition-all duration-200 ${
            locale === key
              ? 'bg-white text-[#07111F] shadow-sm'
              : 'text-white/72 hover:bg-white/8 hover:text-white'
          }`}
          aria-pressed={locale === key}
          aria-label={ariaLabel}
          onClick={() => setLocale(key)}
        >
          <Flag />
          <span>{label}</span>
        </button>
      ))}
    </div>
  )
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <nav className="sticky top-0 z-50 border-b border-white/8 bg-black/88 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-2 sm:px-6 lg:px-8">
        {/* ── Logo (Left) ── */}
        <Link href="#home" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
          <Image src="/logo-pml-transparent.png" alt="PML logo" width={44} height={44} className="h-12 w-auto object-contain brightness-0 invert drop-shadow-[0_0_12px_rgba(212,175,55,0.35)] transition-transform duration-300 group-hover:scale-105" priority />
          <div className="leading-tight min-w-fit">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-white sm:text-base">Pemenang Mandiri</p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37]">{t.navSubtitle}</p>
          </div>
        </Link>

        {/* ── Desktop nav items ── */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={lawFirmConfig.pemenangKonsultanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/45 bg-[#D4AF37]/10 px-4 py-2 text-sm font-bold text-[#F4D778] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D4AF37]/16"
          >
            <Image src="/logo-pemenang-crown.jpg" alt="Pemenang Konsultan" width={20} height={20} className="h-5 w-5 shrink-0 rounded-full object-cover" />
            Pemenang Konsultan
          </a>
          <LanguageSwitcher />
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          className="rounded-full border border-white/10 p-2 text-white lg:hidden"
          onClick={() => setIsOpen((c) => !c)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <div className={`overflow-hidden border-t border-white/8 lg:hidden ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'} transition-all duration-300`}>
        <div className="space-y-2 px-4 py-3 sm:px-6">
          <a
            href={lawFirmConfig.pemenangKonsultanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-2 text-sm font-bold text-[#F4D778]"
            onClick={() => setIsOpen(false)}
          >
            <Image src="/logo-pemenang-crown.jpg" alt="Pemenang Konsultan" width={20} height={20} className="h-5 w-5 shrink-0 rounded-full object-cover" />
            Pemenang Konsultan
          </a>
          <LanguageSwitcher className="justify-center" />
        </div>
      </div>
    </nav>
  )
}
