'use client'

import Link from 'next/link'
import { Instagram, MapPin } from 'lucide-react'
import BrandLogo from './brand-logo'
import { pmlConfig } from '@/lib/pml-content'
import { pickLanguage, useLanguage } from '@/lib/language'
import { mainNavigation, productCategories, siteConfig, siteRoutes } from '@/lib/site-data'

export default function Footer() {
  const { language } = useLanguage()
  const currentYear = new Date().getFullYear()
  const companyNavigation = mainNavigation.filter(
    (item) => item.href !== siteRoutes.home && item.href !== siteRoutes.products,
  )

  const labels = {
    products: pickLanguage(language, { en: 'Products', id: 'Produk' }),
    company: pickLanguage(language, { en: 'Company', id: 'Perusahaan' }),
    followUs: pickLanguage(language, { en: 'Follow Us', id: 'Ikuti Kami' }),
    description: pickLanguage(language, {
      en: 'Structured insurance consultation for marine, property, vehicle, travel, liability, and claim support needs.',
      id: 'Konsultasi asuransi yang terstruktur untuk kebutuhan marine, properti, kendaraan, perjalanan, liability, dan bantuan klaim.',
    }),
    allRightsReserved: pickLanguage(language, { en: 'All rights reserved.', id: 'Seluruh hak cipta dilindungi.' }),
  }

  const getNavLabel = (href: string) => {
    switch (href) {
      case siteRoutes.companyProfile:
        return pickLanguage(language, { en: 'Company Profile', id: 'Profil Perusahaan' })
      case siteRoutes.ourPartner:
        return pickLanguage(language, { en: 'Our Partner', id: 'Mitra Kami' })
      case siteRoutes.contact:
        return pickLanguage(language, { en: 'Get in Touch', id: 'Hubungi Kami' })
      default:
        return href
    }
  }

  return (
    <footer className="overflow-x-clip bg-[#07111F] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.95fr_0.75fr_0.75fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-5">
              <BrandLogo imageClassName="h-10 w-10 sm:h-12 sm:w-12" href={siteRoutes.home} />
            </div>
            <p className="max-w-sm text-sm leading-7 text-white/65">{labels.description}</p>
            <a
              href={pmlConfig.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex max-w-sm items-start gap-2.5 text-sm leading-7 text-white/65 transition-colors hover:text-[#D4AF37]"
            >
              <MapPin className="mt-1.5 h-4 w-4 shrink-0 text-[#D4AF37]" aria-hidden="true" />
              <span>{pmlConfig.address.full}</span>
            </a>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-[#D4AF37]">{labels.products}</h3>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {productCategories.map((product) => (
                <li key={product.detailHref}>
                  <Link
                    href={product.detailHref}
                    prefetch={false}
                    className="text-sm font-semibold text-white/70 transition-colors hover:text-[#D4AF37]"
                  >
                    {product.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-[#D4AF37]">{labels.company}</h3>
            <ul className="space-y-3">
              {companyNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    prefetch={false}
                    className="text-sm font-semibold text-white/70 transition-colors hover:text-[#D4AF37]"
                  >
                    {getNavLabel(item.href)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-[#D4AF37]">{labels.followUs}</h3>
            <div className="flex items-center gap-3">
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

        <div className="border-t border-white/10 py-6 text-center text-xs leading-6 text-white/45 sm:flex sm:items-center sm:justify-between sm:text-left">
          <p>&copy; {currentYear} {siteConfig.name}. {labels.allRightsReserved}</p>
        </div>
      </div>
    </footer>
  )
}
