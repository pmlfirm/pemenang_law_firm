'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import BrandLogo from './brand-logo'
import LanguageSwitcher from './language-switcher'
import { pickLanguage, useLanguage } from '@/lib/language'
import { siteRoutes } from '@/lib/site-data'

export default function Navigation() {
  const pathname = usePathname()
  const { language } = useLanguage()

  const labels = useMemo(
    () => ({
      pml: 'PML',
      pmlAria: pickLanguage(language, { en: 'Go to PML law firm page', id: 'Buka halaman firma hukum PML' }),
    }),
    [language],
  )

  const isPmlActive = pathname === siteRoutes.pml || pathname.startsWith(`${siteRoutes.pml}/`)

  return (
    <nav className="sticky top-0 z-50 overflow-x-clip border-b border-white/10 bg-[#07111F]/94 text-white shadow-lg shadow-black/10 backdrop-blur-xl">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3 sm:gap-6">
          <BrandLogo priority href={siteRoutes.home} imageClassName="h-8 w-8 sm:h-11 sm:w-11" />

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href={siteRoutes.pml}
              prefetch={false}
              aria-label={labels.pmlAria}
              className={`rounded-full border px-3.5 py-2 text-xs font-semibold tracking-wide transition-all duration-300 sm:px-5 sm:text-sm ${
                isPmlActive
                  ? 'border-[#D4AF37]/45 bg-[#D4AF37]/15 text-[#D4AF37] shadow-sm shadow-[#D4AF37]/10'
                  : 'border-white/18 text-white/80 hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]'
              }`}
            >
              {labels.pml}
            </Link>

            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  )
}
