'use client'

import { MapPin } from 'lucide-react'
import { useLanguage } from './language-context'
import { lawFirmConfig } from './site-data'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-white/8 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-8 text-center text-xs text-white/50 space-y-2">
        <p className="font-semibold text-white/75">{lawFirmConfig.name}</p>
        <div className="inline-flex items-center justify-center gap-1.5 text-white/60">
          <MapPin className="h-3.5 w-3.5 text-[#D4AF37] shrink-0" aria-hidden="true" />
          <span>{t.officeAddressValue}</span>
        </div>
        <p className="pt-2 text-white/40">{t.footerCopyright}</p>
      </div>
    </footer>
  )
}
