/**
 * Single source for WhatsApp number handling.
 */

/** Accepts 08..., 62..., or +62 ... and returns digits in 62... form. */
export function normalizeWhatsappNumber(value: string | undefined, fallback: string) {
  const digits = value?.replace(/\D/g, '') ?? ''
  const normalized = digits.startsWith('0') ? `62${digits.slice(1)}` : digits
  return /^\d{8,15}$/.test(normalized) ? normalized : fallback
}

/** Renders 6281331831044 as +62 813-3183-1044. */
export function formatWhatsappNumber(number: string) {
  if (!number.startsWith('62')) return `+${number}`

  const local = number.slice(2)
  if (local.length <= 7) return `+62 ${local}`

  const first = local.slice(0, 3)
  const last = local.slice(-4)
  const middle = local.slice(3, -4)
  return `+62 ${first}${middle ? `-${middle}` : ''}-${last}`
}

export function buildWhatsappHref(number: string, message?: string) {
  const base = `https://wa.me/${number}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
