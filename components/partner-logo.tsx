import React from 'react'

interface PartnerLogoProps {
  id: string
  name: string
  className?: string
}

export default function PartnerLogo({ id, name, className = 'h-10 w-auto' }: PartnerLogoProps) {
  // We use clean, pixel-perfect, and modern SVGs matching each company's branding
  switch (id) {
    case 'allianz':
      return (
        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Allianz Logo Icon */}
          <circle cx="30" cy="30" r="24" fill="#003781" />
          <path d="M22 17H25V43H22V17ZM35 17H38V43H35V17ZM28 22H32V38H28V22Z" fill="white" />
          <path d="M22 17C22 17 25.5 13 30 13C34.5 13 38 17 38 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          {/* Allianz Text */}
          <text x="70" y="38" fill="#003781" fontSize="24" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.05em">Allianz</text>
        </svg>
      )

    case 'axa':
      return (
        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* AXA Logo: Blue box with red diagonal accent */}
          <rect x="10" y="10" width="40" height="40" fill="#00008F" />
          <path d="M40 10L50 10L35 50L25 50L40 10Z" fill="#E31B23" />
          {/* AXA Text */}
          <text x="65" y="39" fill="#00008F" fontSize="28" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.08em">AXA</text>
        </svg>
      )

    case 'zurich':
      return (
        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Zurich Logo: Blue circle with stylized Z inside */}
          <circle cx="30" cy="30" r="22" stroke="#2167AE" strokeWidth="5.5" />
          <path d="M20 22H38L24 37.5H38" stroke="#2167AE" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Zurich Text */}
          <text x="70" y="39" fill="#2167AE" fontSize="24" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="0.05em">ZURICH</text>
        </svg>
      )

    case 'chubb':
      return (
        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Chubb Logo: Simple elegant black text inside a colored rect background (typically teal/multicolored, we use clean black typography card) */}
          <rect x="10" y="12" width="180" height="36" fill="#000000" rx="4" />
          <text x="100" y="37" fill="#FFFFFF" fontSize="18" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.22em" textAnchor="middle">CHUBB</text>
        </svg>
      )

    case 'etiqa':
      return (
        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Etiqa Logo: Yellow block with black lowercase text */}
          <rect x="10" y="10" width="180" height="40" fill="#FFDD00" rx="6" />
          <text x="100" y="37" fill="#000000" fontSize="22" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.05em" textAnchor="middle">etiqa</text>
        </svg>
      )

    case 'brins':
      return (
        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* BRI Insurance Logo */}
          <path d="M15 15C15 15 25 10 32 18C39 26 34 38 42 42C50 46 55 35 55 35" stroke="#00529C" strokeWidth="6" strokeLinecap="round" />
          <circle cx="32" cy="18" r="4.5" fill="#FF7A00" />
          <circle cx="42" cy="42" r="4.5" fill="#FF7A00" />
          <text x="70" y="32" fill="#00529C" fontSize="19" fontWeight="900" fontFamily="system-ui, sans-serif">BRI</text>
          <text x="70" y="48" fill="#FF7A00" fontSize="14" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="0.05em">Insurance</text>
        </svg>
      )

    case 'jasaraharja':
      return (
        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Jasa Raharja Putera Logo: Green shield crest */}
          <path d="M15 15H45V30C45 40 30 48 30 48C30 48 15 40 15 30V15Z" fill="#008444" />
          <path d="M30 20L34 28H26L30 20Z" fill="#D4AF37" />
          <circle cx="30" cy="33" r="5" fill="#FFFFFF" />
          <text x="58" y="32" fill="#008444" fontSize="14" fontWeight="900" fontFamily="system-ui, sans-serif">JASA RAHARJA</text>
          <text x="58" y="47" fill="#D4AF37" fontSize="13" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="0.08em">PUTERA</text>
        </svg>
      )

    case 'astra':
      return (
        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Asuransi Astra Logo: Blue text with orange smile graphic */}
          <text x="20" y="34" fill="#005A9C" fontSize="15" fontWeight="400" fontFamily="system-ui, sans-serif" letterSpacing="0.05em">asuransi</text>
          <text x="20" y="49" fill="#005A9C" fontSize="20" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.05em">astra</text>
          <path d="M120 20C130 35 155 35 165 20" stroke="#FF7A00" strokeWidth="6.5" strokeLinecap="round" />
          <circle cx="165" cy="20" r="4.5" fill="#005A9C" />
        </svg>
      )

    case 'asei':
      return (
        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* ASEI Logo: Swoosh elements */}
          <path d="M15 40C30 30 50 42 65 35" stroke="#E31B23" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M20 22C38 28 48 18 60 25" stroke="#004F9F" strokeWidth="4.5" strokeLinecap="round" />
          <text x="75" y="38" fill="#004F9F" fontSize="24" fontWeight="900" fontFamily="system-ui, sans-serif">asei</text>
        </svg>
      )

    case 'tripa':
      return (
        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Tripa Logo: Three curves forming triangle */}
          <path d="M30 12L48 44H12L30 12Z" stroke="#004B87" strokeWidth="4.5" strokeLinejoin="round" fill="none" />
          <circle cx="30" cy="28" r="4.5" fill="#004B87" />
          <text x="65" y="39" fill="#004B87" fontSize="25" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.05em">TRIPA</text>
        </svg>
      )

    case 'mag':
      return (
        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Asuransi MAG: Leaf logo */}
          <path d="M15 28C15 15 30 12 40 20C40 20 30 32 15 28Z" fill="#009639" />
          <path d="M40 20C40 33 25 45 15 28C22 36 34 33 40 20Z" fill="#005F9E" />
          <text x="55" y="39" fill="#005F9E" fontSize="30" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.05em">MAG</text>
        </svg>
      )

    case 'avrist':
      return (
        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Avrist Logo */}
          <path d="M15 18C18 35 38 35 42 18" stroke="#008751" strokeWidth="5.5" strokeLinecap="round" />
          <circle cx="42" cy="18" r="4" fill="#008751" />
          <text x="60" y="38" fill="#008751" fontSize="24" fontWeight="800" fontFamily="system-ui, sans-serif">avrist</text>
        </svg>
      )

    case 'aca':
      return (
        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* ACA: Blue circular crest */}
          <circle cx="30" cy="30" r="18" fill="#0F4C81" />
          <polygon points="30,17 33,23 40,23 35,27 37,33 30,29 23,33 25,27 20,23 27,23" fill="#FFFFFF" />
          <text x="60" y="39" fill="#0F4C81" fontSize="28" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.1em">ACA</text>
        </svg>
      )

    case 'mpm':
      return (
        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* MPM Insurance: Orange/blue double arc */}
          <circle cx="30" cy="30" r="18" stroke="#1E3A8A" strokeWidth="5" fill="none" />
          <path d="M22 14C27 9 40 18 45 30" stroke="#F97316" strokeWidth="5" strokeLinecap="round" fill="none" />
          <text x="60" y="39" fill="#1E3A8A" fontSize="26" fontWeight="900" fontFamily="system-ui, sans-serif">MPM</text>
        </svg>
      )

    case 'oona':
      return (
        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Oona Insurance: purple infinity loop */}
          <path d="M20 30C20 22 28 20 33 30C38 40 46 38 46 30C46 22 38 20 33 30C28 40 20 38 20 30Z" stroke="#5B21B6" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="60" y="39" fill="#5B21B6" fontSize="26" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.05em">oona</text>
        </svg>
      )

    case 'binagriya':
      return (
        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <polygon points="12,38 28,15 44,38" stroke="#1E40AF" strokeWidth="4.5" strokeLinejoin="round" fill="none" />
          <line x1="28" y1="15" x2="28" y2="38" stroke="#DC2626" strokeWidth="4.5" />
          <text x="56" y="38" fill="#1E40AF" fontSize="19" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.02em">BINAGRIYA</text>
        </svg>
      )

    case 'bintang':
      return (
        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Asuransi Bintang: Star symbol */}
          <polygon points="25,12 29,22 39,22 31,28 34,38 25,32 16,38 19,28 11,22 21,22" fill="#D4AF37" />
          <text x="50" y="38" fill="#0B1F3A" fontSize="17" fontWeight="900" fontFamily="system-ui, sans-serif">BINTANG</text>
        </svg>
      )

    case 'dayin':
      return (
        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="30" cy="30" r="16" stroke="#EF4444" strokeWidth="4" fill="none" />
          <polygon points="30,20 38,34 22,34" fill="#3B82F6" />
          <text x="58" y="38" fill="#0B1F3A" fontSize="21" fontWeight="800" fontFamily="system-ui, sans-serif">DAYIN</text>
        </svg>
      )

    case 'harta':
      return (
        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M15 15H45V30C45 38 30 46 30 46C30 46 15 38 15 30V15Z" stroke="#B91C1C" strokeWidth="4.5" fill="none" />
          <line x1="30" y1="15" x2="30" y2="46" stroke="#B91C1C" strokeWidth="4" />
          <text x="55" y="38" fill="#B91C1C" fontSize="23" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.05em">HARTA</text>
        </svg>
      )

    case 'jasa_tania':
      return (
        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="30" cy="30" r="18" fill="#10B981" />
          <circle cx="30" cy="30" r="10" fill="#FFFFFF" />
          <text x="58" y="38" fill="#0B1F3A" fontSize="20" fontWeight="900" fontFamily="system-ui, sans-serif">JASA TANIA</text>
        </svg>
      )

    case 'ksk':
      return (
        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <text x="20" y="38" fill="#2563EB" fontSize="30" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.05em">KSK</text>
          <rect x="90" y="15" width="8" height="30" fill="#F97316" transform="rotate(20 90 15)" />
          <rect x="105" y="12" width="8" height="30" fill="#2563EB" transform="rotate(20 105 12)" />
        </svg>
      )

    case 'lippo':
      return (
        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Lippo Insurance Logo */}
          <rect x="15" y="15" width="30" height="30" fill="#1E3A8A" rx="3" />
          <circle cx="30" cy="30" r="8" fill="#FFFFFF" />
          <text x="58" y="32" fill="#1E3A8A" fontSize="23" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.05em">Lippo</text>
          <text x="58" y="46" fill="#07111F" fontSize="11" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="0.12em">INSURANCE</text>
        </svg>
      )

    case 'mega':
      return (
        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M15 15L30 30L45 15V45H38V28L30 36L22 28V45H15V15Z" fill="#E11D48" />
          <text x="58" y="33" fill="#E11D48" fontSize="19" fontWeight="900" fontFamily="system-ui, sans-serif">MEGA</text>
          <text x="58" y="47" fill="#07111F" fontSize="12" fontWeight="700" fontFamily="system-ui, sans-serif" letterSpacing="0.1em">INSURANCE</text>
        </svg>
      )

    case 'mnc':
      return (
        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <polygon points="12,42 22,15 32,42" fill="#1E3A8A" />
          <polygon points="26,42 36,15 46,42" fill="#F59E0B" />
          <text x="56" y="38" fill="#1E3A8A" fontSize="26" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.05em">MNC</text>
        </svg>
      )

    case 'jasindo':
      return (
        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="30" cy="30" r="18" fill="#1E3A8A" />
          <path d="M22 30H38" stroke="#FBBF24" strokeWidth="5" />
          <text x="58" y="38" fill="#1E3A8A" fontSize="21" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.08em">JASINDO</text>
        </svg>
      )

    case 'raksa':
      return (
        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect x="15" y="15" width="30" height="30" fill="#1D4ED8" rx="2" />
          <text x="25" y="37" fill="#FFFFFF" fontSize="22" fontWeight="900" fontFamily="system-ui, sans-serif">R</text>
          <text x="56" y="38" fill="#1D4ED8" fontSize="23" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.05em">RAKSA</text>
        </svg>
      )

    case 'ramayana':
      return (
        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="30" cy="30" r="18" stroke="#07111F" strokeWidth="4.5" fill="none" />
          <path d="M22 25L30 35L38 25" stroke="#D4AF37" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="58" y="38" fill="#07111F" fontSize="19" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.02em">RAMAYANA</text>
        </svg>
      )

    case 'pln':
      return (
        <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* PLN Insurance */}
          <polygon points="30,12 36,25 28,25 34,42 22,28 30,28" fill="#F59E0B" />
          <text x="54" y="32" fill="#0284C7" fontSize="22" fontWeight="900" fontFamily="system-ui, sans-serif">PLN</text>
          <text x="54" y="46" fill="#F59E0B" fontSize="12" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="0.05em">INSURANCE</text>
        </svg>
      )

    default:
      // Generic fallback showing initials and name in a clean colored avatar card
      const initials = name
        .replace(/^PT\s+/, '')
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase()

      return (
        <div className="flex h-12 w-44 items-center justify-start gap-3 rounded-xl border border-gray-200 bg-white px-3 py-1 shadow-sm">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-xs font-black tracking-wider text-white">
            {initials}
          </div>
          <span className="truncate text-xs font-extrabold text-[#0B1F3A]">{name.replace(/^PT\s+/, '')}</span>
        </div>
      )
  }
}
