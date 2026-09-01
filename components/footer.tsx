'use client'

import { Instagram, MapPin } from 'lucide-react'
import BrandLogo from './brand-logo'
import { pmlConfig } from '@/lib/pml-content'
import { pickLanguage, useLanguage } from '@/lib/language'
import { siteConfig, siteRoutes } from '@/lib/site-data'

export default function Footer() {
  const { language } = useLanguage()
  const currentYear = new Date().getFullYear()

  const labels = {
    followUs: pickLanguage(language, { en: 'Follow Us', id: 'Ikuti Kami' }),
    allRightsReserved: pickLanguage(language, { en: 'All rights reserved.', id: 'Seluruh hak cipta dilindungi.' }),
  }

  return (
    <footer className="overflow-x-clip bg-[#07111F] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 py-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-12">
          <div>
            <div className="mb-2">
              <BrandLogo imageClassName="h-10 w-10 sm:h-12 sm:w-12" href={siteRoutes.home} />
            </div>
            <a
              href={pmlConfig.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex max-w-md items-start gap-2.5 text-sm leading-7 text-white/65 transition-colors hover:text-[#D4AF37]"
            >
              <MapPin className="mt-1.5 h-4 w-4 shrink-0 text-[#D4AF37]" aria-hidden="true" />
              <span>{pmlConfig.address.full}</span>
            </a>
          </div>

          <div className="sm:text-right">
            <h3 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-[#D4AF37]">{labels.followUs}</h3>
            <div className="flex items-center gap-3 sm:justify-end">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow ${siteConfig.shortName} on Instagram`}
                className="group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-transparent text-[#E1306C] shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/18 hover:bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)] hover:text-white"
              >
                <Instagram className="h-4 w-4 transition-transform duration-300 group-hover:scale-105" strokeWidth={2.2} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-5 text-center text-xs leading-6 text-white/45">
          <p>&copy; {currentYear} {siteConfig.name}. {labels.allRightsReserved}</p>
        </div>
      </div>
    </footer>
  )
}
