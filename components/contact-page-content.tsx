'use client'

import Image from 'next/image'
import { Mail } from 'lucide-react'
import { WhatsappContactButton } from '@/components/whatsapp-contact'
import { pickLanguage, useLanguage } from '@/lib/language'
import { contactDirectory } from '@/lib/site-data'

export default function ContactPageContent() {
  const { language } = useLanguage()

  return (
    <>
      <section className="relative isolate overflow-hidden px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
        <Image
          src="/photos/contact-support.webp"
          alt="Professional support team helping clients with insurance consultation"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[72%_28%] brightness-110 saturate-110 sm:object-[72%_24%] lg:object-[70%_30%]"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,17,31,0.84)_0%,rgba(7,17,31,0.72)_45%,rgba(7,17,31,0.40)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t from-[#F3F0EA] to-transparent" />

        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl space-y-5">
            <p className="section-kicker text-white/78 before:bg-[#D4AF37]">
              {pickLanguage(language, { en: 'WhatsApp Directory', id: 'Direktori WhatsApp' })}
            </p>
            <h1 className="text-balance text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {pickLanguage(language, {
                en: 'Choose the right product contact more easily.',
                id: 'Pilih kontak produk yang tepat dengan lebih mudah.',
              })}
            </h1>
            <p className="max-w-2xl text-justify text-sm leading-7 text-white/74 sm:text-[15px] lg:text-base">
              {pickLanguage(language, {
                en: 'Each card connects you directly to the relevant WhatsApp contact, so your first conversation starts with the right team.',
                id: 'Setiap kartu menghubungkan Anda langsung ke kontak WhatsApp yang relevan, sehingga percakapan awal dimulai dengan tim yang tepat.',
              })}
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#F3F0EA] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="absolute left-0 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/3 translate-y-1/3 rounded-full bg-[#0B1F3A]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-9 max-w-4xl">
            <p className="section-kicker">{pickLanguage(language, { en: 'Official Contacts', id: 'Kontak Resmi' })}</p>
            <h2 className="mt-3 text-balance text-2xl font-black tracking-tight text-[#0B1F3A] sm:text-4xl">
              {pickLanguage(language, {
                en: 'Reach the team that matches your product needs.',
                id: 'Hubungi tim yang paling sesuai dengan kebutuhan produk Anda.',
              })}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#0B1F3A]/62">
              {pickLanguage(language, {
                en: 'Images, colors, and WhatsApp contact numbers are managed from one clean source of data.',
                id: 'Gambar, warna, dan nomor kontak WhatsApp dikelola dari satu sumber data yang rapi.',
              })}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {contactDirectory
              .filter((contact) => contact.showOnContactPage)
              .map((contact, index) => (
              <article
                key={contact.id}
                className={`group overflow-hidden rounded-[1.75rem] border shadow-lg shadow-[#0B1F3A]/6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#0B1F3A]/10 ${contact.theme.card}`}
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={contact.image}
                    alt={contact.imageAlt}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                    priority={index < 3}
                    className={`object-cover transition-transform duration-700 group-hover:scale-105 ${contact.imagePosition}`}
                  />
                  <div className={`absolute inset-0 ${contact.theme.mediaOverlay}`} />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white">
                    <div className="min-w-0">
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/68">
                        {contact.category}
                      </p>
                      <h2 className="mt-1 text-2xl font-black tracking-tight">{contact.title}</h2>
                    </div>
                    <span className="shrink-0 rounded-full bg-white/14 px-3 py-1 text-[10px] font-black tracking-[0.16em] ring-1 ring-white/24 backdrop-blur-md">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 p-5">
                  {contact.email && (
                    <a
                      href={`mailto:${contact.email}`}
                      className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-bold text-[#0B1F3A] transition-all duration-300 hover:bg-white ${contact.theme.row}`}
                    >
                      <span className={`flex h-9 w-11 shrink-0 items-center justify-center rounded-xl shadow-lg ${contact.theme.icon}`}>
                        <Mail className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[10px] font-black uppercase tracking-[0.13em] text-[#0B1F3A]/44">
                          Email
                        </span>
                        <span className="mt-0.5 block break-all">{contact.email}</span>
                      </span>
                    </a>
                  )}

                  <WhatsappContactButton contactId={contact.id} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
