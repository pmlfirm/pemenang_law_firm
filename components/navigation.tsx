'use client'

import BrandLogo from './brand-logo'
import LanguageSwitcher from './language-switcher'
import { siteRoutes } from '@/lib/site-data'

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 overflow-x-clip border-b border-white/10 bg-[#07111F]/94 text-white shadow-lg shadow-black/10 backdrop-blur-xl">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3 sm:gap-6">
          <BrandLogo priority href={siteRoutes.home} imageClassName="h-8 w-8 sm:h-11 sm:w-11" />

          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  )
}
