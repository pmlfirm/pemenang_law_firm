'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { translations, type Locale, type Translations } from './translations'

interface LanguageContextValue {
  locale: Locale
  t: Translations
  setLocale: (locale: Locale) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    document.documentElement.lang = newLocale
  }, [])

  const value = useMemo<LanguageContextValue>(
    () => ({ locale, t: translations[locale], setLocale }),
    [locale, setLocale],
  )

  return <LanguageContext value={value}>{children}</LanguageContext>
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
