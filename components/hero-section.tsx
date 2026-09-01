'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Shield } from 'lucide-react'

import { pickLanguage, useLanguage } from '@/lib/language'
import { siteRoutes } from '@/lib/site-data'

export default function HeroSection() {
  const { language } = useLanguage()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => setIsVideoLoaded(true)
    video.addEventListener('canplaythrough', handleCanPlay)

    // Fallback: if video is already loaded (cached)
    if (video.readyState >= 3) {
      setIsVideoLoaded(true)
    }

    return () => video.removeEventListener('canplaythrough', handleCanPlay)
  }, [])

  return (
    <section
      id="home"
      className="relative isolate min-h-[calc(100dvh-4rem)] overflow-hidden bg-[#07111F]"
    >
      {/* ── Video Background ── */}
      <div className="absolute inset-0 -z-30">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/photos/hero-law.webp"
          className={`h-full w-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Poster fallback while video loads */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ backgroundImage: "url('/photos/hero-law.webp')" }}
        />
      </div>

      {/* ── Dark Overlay Gradients ── */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(7,17,31,0.92)_0%,rgba(7,17,31,0.78)_40%,rgba(7,17,31,0.45)_70%,rgba(7,17,31,0.25)_100%)]" />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(7,17,31,0.3)_0%,rgba(7,17,31,0.1)_50%,rgba(7,17,31,0.6)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#07111F] to-transparent" />

      {/* ── Subtle Grain / Noise Overlay ── */}
      <div className="absolute inset-0 -z-10 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />

      {/* ── Content ── */}
      <div className="flex min-h-[calc(100dvh-4rem)] items-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-2xl animate-fade-up space-y-5 py-14 sm:space-y-6 lg:py-20">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold tracking-[0.04em] text-white/80 shadow-lg shadow-black/10 backdrop-blur-sm sm:text-sm">
              <Shield className="h-4 w-4 text-[#D4AF37]" />
              {pickLanguage(language, {
                en: 'Trusted Insurance Consulting Partner',
                id: 'Partner Konsultasi Asuransi Terpercaya',
              })}
            </div>

            {/* Main Heading */}
            <h1 className="hero-heading text-balance text-[2.5rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.5rem] xl:text-6xl">
              {pickLanguage(language, {
                en: 'Your Trusted Insurance Solution',
                id: 'Solusi Asuransi Terpercaya Anda',
              })}
            </h1>

            {/* Description */}
            <p className="max-w-xl text-pretty text-base leading-7 text-white/75 sm:text-[17px] sm:leading-8 lg:text-lg lg:leading-8">
              {pickLanguage(language, {
                en: 'Pemenang Mandiri Law Firm helps you choose the best insurance with a personal and professional approach.',
                id: 'Pemenang Mandiri Law Firm membantu Anda memilih asuransi terbaik dengan pendekatan yang personal dan profesional.',
              })}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:gap-4">
              <Link
                href={siteRoutes.products}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#D4AF37] px-6 py-3.5 text-sm font-bold text-[#07111F] shadow-lg shadow-[#D4AF37]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E0C878] hover:shadow-xl hover:shadow-[#D4AF37]/30 sm:px-7 sm:text-[15px]"
              >
                {pickLanguage(language, { en: 'View Products', id: 'Lihat Produk' })}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={siteRoutes.contact}
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/8 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/14 sm:px-7 sm:text-[15px]"
              >
                {pickLanguage(language, { en: 'Contact Us', id: 'Hubungi Kami' })}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Decorative Bottom Accent Line ── */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
    </section>
  )
}
