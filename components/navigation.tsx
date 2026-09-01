'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X } from 'lucide-react'
import BrandLogo from './brand-logo'
import LanguageSwitcher from './language-switcher'
import { pickLanguage, useLanguage } from '@/lib/language'
import { mainNavigation, productCategories, productIds, siteAssets, siteRoutes } from '@/lib/site-data'

const marineProductId = productIds.marine

export default function Navigation() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isProductOpen, setIsProductOpen] = useState(false)
  const [isMarineOpenDesktop, setIsMarineOpenDesktop] = useState(false)
  const [isMarineOpenMobile, setIsMarineOpenMobile] = useState(false)
  const [currentHash, setCurrentHash] = useState('')

  useEffect(() => {
    const syncHash = () => setCurrentHash(window.location.hash)

    syncHash()
    window.addEventListener('hashchange', syncHash)
    window.addEventListener('popstate', syncHash)

    return () => {
      window.removeEventListener('hashchange', syncHash)
      window.removeEventListener('popstate', syncHash)
    }
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setIsProductOpen(false)
    setIsMarineOpenDesktop(false)
    setIsMarineOpenMobile(false)
  }, [pathname])

  const closeMenu = () => {
    setIsOpen(false)
    setIsProductOpen(false)
    setIsMarineOpenDesktop(false)
    setIsMarineOpenMobile(false)
  }

  const labels = useMemo(
    () => ({
      home: pickLanguage(language, { en: 'Home', id: 'Beranda' }),
      products: pickLanguage(language, { en: 'Products', id: 'Produk' }),
      companyProfile: pickLanguage(language, { en: 'Company Profile', id: 'Profil Perusahaan' }),
      ourPartner: pickLanguage(language, { en: 'Our Partner', id: 'Mitra Kami' }),
      contact: pickLanguage(language, { en: 'Contact Us', id: 'Hubungi Kami' }),
      productsToggle: pickLanguage(language, { en: 'Toggle products submenu', id: 'Buka submenu produk' }),
      marineToggle: pickLanguage(language, { en: 'Toggle Marine product submenu', id: 'Buka submenu produk Marine' }),
      navToggle: pickLanguage(language, { en: 'Toggle navigation menu', id: 'Buka menu navigasi' }),
      pml: 'PML',
    }),
    [language],
  )

  const getNavLabel = (href: string) => {
    switch (href) {
      case siteRoutes.home:
        return labels.home
      case siteRoutes.products:
        return labels.products
      case siteRoutes.companyProfile:
        return labels.companyProfile
      case siteRoutes.ourPartner:
        return labels.ourPartner
      case siteRoutes.contact:
        return labels.contact
      default:
        return href
    }
  }

  const isActive = (href: string) => {
    if (href === siteRoutes.home) return pathname === siteRoutes.home && (currentHash === '' || currentHash === '#home')
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const isProductsActive = pathname === siteRoutes.products || pathname.startsWith(`${siteRoutes.products}/`)

  const linkClass = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
      active
        ? 'bg-[#D4AF37]/15 text-[#D4AF37] ring-1 ring-[#D4AF37]/25 shadow-sm shadow-[#D4AF37]/10'
        : 'text-white/78 hover:bg-white/10 hover:text-white'
    }`

  const mobileLinkClass = (active: boolean) =>
    `rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
      active
        ? 'bg-[#D4AF37]/15 text-[#D4AF37] ring-1 ring-[#D4AF37]/20'
        : 'text-white/80 hover:bg-white/10 hover:text-white'
    }`

  return (
    <nav className="sticky top-0 z-50 overflow-x-clip border-b border-white/10 bg-[#07111F]/94 text-white shadow-lg shadow-black/10 backdrop-blur-xl">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-10 xl:gap-14">
          <BrandLogo priority href={siteRoutes.home} imageClassName="h-9 w-9 sm:h-11 sm:w-11" onClick={closeMenu} />

          <div className="ml-auto hidden items-center justify-end gap-1 lg:flex">
            {mainNavigation.map((item) => {
              if (item.href !== siteRoutes.products) {
                return (
                  <Link key={item.href} href={item.href} prefetch={false} className={linkClass(isActive(item.href))}>
                    {getNavLabel(item.href)}
                  </Link>
                )
              }

              return (
                <div key={item.href} className="group relative">
                  <Link
                    href={siteRoutes.products}
                    prefetch={false}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                      isProductsActive
                        ? 'bg-[#D4AF37]/15 text-[#D4AF37] ring-1 ring-[#D4AF37]/25 shadow-sm shadow-[#D4AF37]/10'
                        : 'text-white/78 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {labels.products}
                    <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180" />
                  </Link>

                  <div className="invisible absolute right-0 top-full mt-3 w-80 translate-y-2 rounded-3xl border border-white/10 bg-[#0B1F3A] p-3 opacity-0 shadow-2xl shadow-black/25 ring-1 ring-white/10 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <div className="rounded-2xl bg-white/[0.04] p-2">
                      {productCategories.map((product) => {
                        const isMarine = product.id === marineProductId
                        const active = pathname === product.detailHref

                        if (!isMarine) {
                          return (
                            <Link
                              key={product.id}
                              href={product.detailHref}
                              prefetch={false}
                              className={`mb-1 flex items-center rounded-2xl px-4 py-3 text-sm font-bold transition-colors ${
                                active
                                  ? 'bg-[#D4AF37]/12 text-[#D4AF37]'
                                  : 'text-white/75 hover:bg-white/10 hover:text-[#D4AF37]'
                              }`}
                            >
                              {product.title}
                            </Link>
                          )
                        }

                        return (
                          <div key={product.id} className="mb-1">
                            <div className="flex items-center gap-2">
                              <Link
                                href={product.detailHref}
                                prefetch={false}
                                className={`flex-1 rounded-2xl px-4 py-3 text-sm font-bold transition-colors ${
                                  active
                                    ? 'bg-[#D4AF37]/12 text-[#D4AF37]'
                                    : 'text-white/75 hover:bg-white/10 hover:text-[#D4AF37]'
                                }`}
                              >
                                {product.title}
                              </Link>
                              <button
                                type="button"
                                onClick={() => setIsMarineOpenDesktop((current) => !current)}
                                className="flex h-10 w-10 items-center justify-center rounded-2xl text-[#D4AF37] transition-colors hover:bg-white/10"
                                aria-expanded={isMarineOpenDesktop}
                                aria-label={labels.marineToggle}
                              >
                                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isMarineOpenDesktop ? 'rotate-180' : ''}`} />
                              </button>
                            </div>
                            <div className={`grid overflow-hidden transition-all duration-300 ease-out ${isMarineOpenDesktop ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                              <div className="mt-1 ml-3 border-l border-white/10 pl-3">
                                {product.categoryGroups.map((subProduct) => (
                                  <Link
                                    key={subProduct.id}
                                    href={`${product.detailHref}#${subProduct.id}`}
                                    prefetch={false}
                                    className="block rounded-xl px-3 py-2 text-xs font-semibold text-white/58 transition-colors hover:bg-white/8 hover:text-[#D4AF37]"
                                  >
                                    {subProduct.title}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
            <Link
              href={siteRoutes.pml}
              prefetch={false}
              className={`inline-flex items-center gap-2 rounded-full border border-dashed px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                isActive(siteRoutes.pml)
                  ? 'border-[#D4AF37]/45 bg-[#D4AF37]/15 text-[#D4AF37]'
                  : 'border-white/20 text-white/78 hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/8 hover:text-[#D4AF37]'
              }`}
            >
              <Image
                src={siteAssets.logo}
                alt="PML Logo"
                width={20}
                height={20}
                className="h-5 w-5 shrink-0 object-contain brightness-0 invert opacity-70 transition-opacity duration-300 hover:opacity-100"
              />
              {labels.pml}
            </Link>
            <div className="ml-3">
              <LanguageSwitcher />
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsOpen((current) => !current)
              if (isOpen) {
                setIsProductOpen(false)
                setIsMarineOpenMobile(false)
              }
            }}
            className="flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-full border border-white/15 p-2.5 text-white transition-colors hover:bg-white/10 lg:hidden"
            aria-label={labels.navToggle}
            aria-expanded={isOpen}
          >
            <span className="relative block h-5 w-5">
              <Menu className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${isOpen ? 'rotate-90 scale-75 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
              <X className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${isOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-75 opacity-0'}`} />
            </span>
          </button>
        </div>

        <div className={`grid overflow-hidden border-t border-white/10 transition-all duration-500 ease-out lg:hidden ${isOpen ? 'max-h-[1300px] opacity-100' : 'max-h-0 border-transparent opacity-0'}`}>
          <div className="grid gap-2 py-3">
            {mainNavigation.map((item) => {
              if (item.href !== siteRoutes.products) {
                return (
                  <Link key={item.href} href={item.href} prefetch={false} onClick={closeMenu} className={mobileLinkClass(isActive(item.href))}>
                    {getNavLabel(item.href)}
                  </Link>
                )
              }

              return (
                <div key={item.href} className="transition-all duration-300">
                  <div
                    className={`flex items-center rounded-2xl transition-all duration-300 ${
                      isProductsActive
                        ? 'bg-[#D4AF37]/15 text-[#D4AF37] ring-1 ring-[#D4AF37]/20'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Link href={siteRoutes.products} prefetch={false} onClick={closeMenu} className="flex-1 px-4 py-3 text-sm font-semibold">
                      {labels.products}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setIsProductOpen((current) => !current)}
                      className={`mr-2 rounded-full p-2 transition-colors ${isProductsActive ? 'text-[#D4AF37] hover:bg-[#D4AF37]/10' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                      aria-expanded={isProductOpen}
                      aria-label={labels.productsToggle}
                    >
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isProductOpen ? 'rotate-180' : 'rotate-0'}`} />
                    </button>
                  </div>

                  <div className={`grid overflow-hidden transition-all duration-300 ease-out ${isProductOpen ? 'max-h-[900px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="space-y-1 pt-2">
                      {productCategories.map((product) => {
                        const isMarine = product.id === marineProductId
                        const active = pathname === product.detailHref

                        if (!isMarine) {
                          return (
                            <Link
                              key={product.id}
                              href={product.detailHref}
                              prefetch={false}
                              onClick={closeMenu}
                              className={`flex items-center rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                                active
                                  ? 'bg-[#D4AF37]/12 text-[#D4AF37]'
                                  : 'text-white/72 hover:bg-white/10 hover:text-[#D4AF37]'
                              }`}
                            >
                              {product.title}
                            </Link>
                          )
                        }

                        return (
                          <div key={product.id}>
                            <div className="flex items-center gap-2">
                              <Link
                                href={product.detailHref}
                                prefetch={false}
                                onClick={closeMenu}
                                className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                                  active
                                    ? 'bg-[#D4AF37]/12 text-[#D4AF37]'
                                    : 'text-white/72 hover:bg-white/10 hover:text-[#D4AF37]'
                                }`}
                              >
                                {product.title}
                              </Link>
                              <button
                                type="button"
                                onClick={() => setIsMarineOpenMobile((current) => !current)}
                                className="rounded-full p-2 text-[#D4AF37] transition-colors hover:bg-white/10"
                                aria-expanded={isMarineOpenMobile}
                                aria-label={labels.marineToggle}
                              >
                                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isMarineOpenMobile ? 'rotate-180' : 'rotate-0'}`} />
                              </button>
                            </div>
                            <div className={`grid overflow-hidden transition-all duration-300 ease-out ${isMarineOpenMobile ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                              <div className="mt-1 ml-3 border-l border-white/10 pl-3">
                                {product.categoryGroups.map((subProduct) => (
                                  <Link
                                    key={subProduct.id}
                                    href={`${product.detailHref}#${subProduct.id}`}
                                    prefetch={false}
                                    onClick={closeMenu}
                                    className="block rounded-lg px-3 py-2 text-xs font-semibold text-white/58 transition-colors hover:bg-white/8 hover:text-[#D4AF37]"
                                  >
                                    {subProduct.title}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}

            <Link
              href={siteRoutes.pml}
              prefetch={false}
              onClick={closeMenu}
              className={`inline-flex items-center gap-2.5 rounded-2xl border border-dashed px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                isActive(siteRoutes.pml)
                  ? 'border-[#D4AF37]/45 bg-[#D4AF37]/15 text-[#D4AF37]'
                  : 'border-white/15 text-white/80 hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/8 hover:text-[#D4AF37]'
              }`}
            >
              <Image
                src={siteAssets.logo}
                alt="PML Logo"
                width={20}
                height={20}
                className="h-5 w-5 shrink-0 object-contain brightness-0 invert opacity-70"
              />
              {labels.pml}
            </Link>

            <div className="pt-2">
              <LanguageSwitcher mobile />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
