import type { Metadata } from 'next'
import Link from 'next/link'
import { siteRoutes } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="bg-[#F8F5EF] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 text-center shadow-2xl shadow-[#07111F]/8 ring-1 ring-[#0B1F3A]/8 sm:p-12">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-[#B8941F]">404</p>
        <h1 className="mt-4 text-4xl font-black text-[#0B1F3A] sm:text-5xl">Page not found</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#1F2933]/68 sm:text-base">
          Halaman yang dicari tidak tersedia. Silakan kembali ke halaman utama atau buka product portfolio.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={siteRoutes.home} className="rounded-full bg-[#0B1F3A] px-5 py-3 text-sm font-black text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#102A46]">
            Back to Home
          </Link>
          <Link href={siteRoutes.products} className="rounded-full bg-[#D4AF37] px-5 py-3 text-sm font-black text-[#07111F] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E0C878]">
            View Products
          </Link>
        </div>
      </div>
    </section>
  )
}
