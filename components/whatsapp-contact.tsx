'use client'

import Image from 'next/image'
import { useEffect, useId, useRef, useState, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, MessageCircle, ShieldCheck, X } from 'lucide-react'
import {
  contactById,
  getContactWhatsappHref,
  type Contact,
  type ContactId,
} from '@/lib/site-data'
import { pickLanguage, useLanguage } from '@/lib/language'

type WhatsappConfirmationProps = {
  contact: Contact | null
  onClose: () => void
}

function WhatsappConfirmation({ contact, onClose }: WhatsappConfirmationProps) {
  const { language } = useLanguage()
  const titleId = useId()
  const descriptionId = useId()
  const cancelButtonRef = useRef<HTMLButtonElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!contact) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    cancelButtonRef.current?.focus()

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [contact, onClose])

  if (!isMounted || !contact) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center bg-[#07111F]/70 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      role="presentation"
      onMouseDown={(event: MouseEvent<HTMLDivElement>) => {
        if (event.currentTarget === event.target) onClose()
      }}
    >
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="w-full max-w-md overflow-hidden rounded-[1.75rem] border border-white/60 bg-white shadow-2xl shadow-black/30"
      >
        <div className="relative h-36 overflow-hidden bg-[#07111F] text-white">
          <Image
            src={contact.image}
            alt=""
            fill
            sizes="448px"
            className={`object-cover opacity-52 ${contact.imagePosition}`}
          />
          <div className={`absolute inset-0 ${contact.theme.mediaOverlay}`} />
          <div className="absolute inset-0 flex items-start gap-4 p-5 sm:p-6">
            <div className="flex h-12 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] text-[#07111F] shadow-lg shadow-black/20">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#8FF0AE]">
                {pickLanguage(language, { en: 'WhatsApp confirmation', id: 'Konfirmasi WhatsApp' })}
              </p>
              <h2 id={titleId} className="mt-1 text-lg font-black leading-tight sm:text-xl">
                {pickLanguage(language, {
                  en: `Open ${contact.title} WhatsApp contact?`,
                  id: `Buka kontak WhatsApp ${contact.title}?`,
                })}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={pickLanguage(language, { en: 'Close WhatsApp confirmation', id: 'Tutup konfirmasi WhatsApp' })}
              className="rounded-full bg-black/18 p-2 text-white/75 backdrop-blur-sm transition-colors hover:bg-black/30 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-5 px-5 py-5 sm:px-6 sm:py-6">
          <div className="border-l-4 border-[#25D366] bg-[#25D366]/8 px-4 py-4">
            <p id={descriptionId} className="text-sm leading-6 text-[#334155]">
              {pickLanguage(language, {
                en: 'You are about to open WhatsApp and start a consultation with the selected product team.',
                id: 'Anda akan membuka WhatsApp dan memulai konsultasi dengan tim produk yang dipilih.',
              })}
            </p>
            <div className="mt-3 flex items-center gap-2 text-sm font-black text-[#0B1F3A]">
              <MessageCircle className="h-4 w-4 text-[#1DA851]" />
              <span>{contact.whatsapp.displayNumber}</span>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-[#F8F5EF] px-4 py-3 text-xs leading-5 text-[#0B1F3A]/68">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#B8941F]" />
            {pickLanguage(language, {
              en: 'A starter message is prepared automatically based on the selected product. You can edit it before sending.',
              id: 'Pesan awal disiapkan otomatis berdasarkan produk yang dipilih. Anda tetap dapat mengeditnya sebelum mengirim.',
            })}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              ref={cancelButtonRef}
              type="button"
              onClick={onClose}
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-[#0B1F3A]/12 bg-white px-4 text-sm font-black text-[#0B1F3A] transition-colors hover:bg-[#F8F5EF]"
            >
              {pickLanguage(language, { en: 'Stay here', id: 'Tetap di sini' })}
            </button>
            <a
              href={getContactWhatsappHref(contact, language)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 text-center text-sm font-black text-[#07111F] shadow-lg shadow-[#25D366]/20 transition-all hover:-translate-y-0.5 hover:bg-[#39DD73]"
            >
              {pickLanguage(language, { en: 'Open WhatsApp', id: 'Buka WhatsApp' })}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </div>,
    document.body,
  )
}

type WhatsappContactButtonProps = {
  contactId: ContactId
  className?: string
}

export function WhatsappContactButton({ contactId, className = '' }: WhatsappContactButtonProps) {
  const { language } = useLanguage()
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const contact = contactById[contactId]

  return (
    <>
      <button
        type="button"
        onClick={() => setSelectedContact(contact)}
        aria-label={`WhatsApp ${contact.title} ${contact.whatsapp.displayNumber}`}
        className={`flex w-full items-center gap-3 rounded-2xl border border-[#25D366]/28 bg-[#25D366]/10 px-4 py-3 text-left text-sm font-bold text-[#0B1F3A] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#25D366]/55 hover:bg-[#25D366]/16 ${className}`}
      >
        <span className="flex h-9 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-[#07111F] shadow-sm shadow-[#25D366]/20">
          <MessageCircle className="h-4 w-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[10px] font-black uppercase tracking-[0.14em] text-[#1B8F49]">
            {pickLanguage(language, { en: 'Chat on WhatsApp', id: 'Chat via WhatsApp' })}
          </span>
          <span className="mt-0.5 block break-words font-black">{contact.whatsapp.displayNumber}</span>
        </span>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-[#1DA851]" />
      </button>

      <WhatsappConfirmation contact={selectedContact} onClose={() => setSelectedContact(null)} />
    </>
  )
}
