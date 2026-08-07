'use client'

import { useLanguage } from './language-context'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-white/8 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-white/42">
        {t.footerCopyright}
      </div>
    </footer>
  )
}
