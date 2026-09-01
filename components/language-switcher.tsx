'use client'

import type { ReactNode } from 'react'
import { useLanguage } from '@/lib/language'

type LanguageSwitcherProps = {
  mobile?: boolean
}

function FlagFrame({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-5 w-7 overflow-hidden rounded-[0.4rem] border border-black/10 shadow-sm ring-1 ring-white/20">
      {children}
    </span>
  )
}

function EnglandFlag() {
  return (
    <FlagFrame>
      <svg viewBox="0 0 28 20" className="h-full w-full" aria-hidden="true" focusable="false">
        <rect width="28" height="20" fill="#ffffff" />
        <rect x="11" width="6" height="20" fill="#C8102E" />
        <rect y="7" width="28" height="6" fill="#C8102E" />
      </svg>
    </FlagFrame>
  )
}

function IndonesiaFlag() {
  return (
    <FlagFrame>
      <svg viewBox="0 0 28 20" className="h-full w-full" aria-hidden="true" focusable="false">
        <rect width="28" height="10" fill="#CE1126" />
        <rect y="10" width="28" height="10" fill="#ffffff" />
      </svg>
    </FlagFrame>
  )
}

export default function LanguageSwitcher({ mobile = false }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage()

  const baseClass = mobile
    ? 'flex items-center rounded-xl border border-white/12 bg-white/6 p-1'
    : 'flex items-center rounded-full border border-white/12 bg-white/6 p-0.5 shadow-sm shadow-black/10'

  const optionClass = (active: boolean) =>
    `${mobile ? 'min-h-8 rounded-lg px-2 py-1 text-xs' : 'rounded-full px-2 py-1 text-[11px]'} inline-flex items-center gap-1.5 font-bold transition-all duration-200 ${
      active
        ? 'bg-white text-[#07111F] shadow-sm'
        : 'text-white/72 hover:bg-white/8 hover:text-white'
    }`

  return (
    <div className={baseClass} aria-label="Language switcher">
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={optionClass(language === 'en')}
        aria-pressed={language === 'en'}
        aria-label="Switch language to English"
      >
        <EnglandFlag />
        <span>EN</span>
      </button>
      <button
        type="button"
        onClick={() => setLanguage('id')}
        className={optionClass(language === 'id')}
        aria-pressed={language === 'id'}
        aria-label="Switch language to Indonesian"
      >
        <IndonesiaFlag />
        <span>ID</span>
      </button>
    </div>
  )
}
