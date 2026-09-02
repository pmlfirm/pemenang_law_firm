'use client'

import Image from 'next/image'
import Link from 'next/link'
import { siteConfig, siteRoutes } from '@/lib/site-data'

type BrandLogoProps = {
  withText?: boolean
  className?: string
  imageClassName?: string
  priority?: boolean
  href?: string
  onClick?: () => void
}

/* Kept in English regardless of language — it's part of the firm's name. */
const subtitle = 'Law Firm & Partners'

export default function BrandLogo({
  withText = true,
  className = '',
  imageClassName = '',
  priority = false,
  href = siteRoutes.home,
  onClick,
}: BrandLogoProps) {
  return (
    <Link
      href={href}
      className={`group flex items-center gap-2.5 sm:gap-3.5 ${className}`}
      onClick={onClick}
      aria-label={`Go to ${siteConfig.shortName} home`}
    >
      <div
        className={`relative shrink-0 transition-transform duration-300 group-hover:scale-105 ${imageClassName || 'h-10 w-10 sm:h-12 sm:w-12'}`}
      >
        <Image
          src={siteConfig.assets.logo}
          alt={siteConfig.defaultOgImage.alt}
          fill
          sizes="(max-width: 640px) 40px, 48px"
          className="object-contain brightness-0 invert drop-shadow-[0_8px_16px_rgba(0,0,0,0.26)]"
          priority={priority}
        />
      </div>

      {withText && (
        <div className="min-w-0 leading-tight">
          <p className="text-xs font-extrabold tracking-wide sm:text-sm lg:text-lg">{siteConfig.shortName}</p>
          <p className="text-[8px] uppercase tracking-[0.16em] text-white/55 sm:text-[10px] sm:tracking-[0.24em]">{subtitle}</p>
        </div>
      )}
    </Link>
  )
}
