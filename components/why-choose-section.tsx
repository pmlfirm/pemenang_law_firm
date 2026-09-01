'use client'

import { Award, HeartHandshake, UsersRound, Zap, Briefcase, Handshake, ShieldCheck, type LucideIcon } from 'lucide-react'
import { pickLanguage, useLanguage } from '@/lib/language'

const advantageIconMap: Record<string, LucideIcon> = {
  award: Award,
  heartHandshake: HeartHandshake,
  users: UsersRound,
  zap: Zap,
  briefcase: Briefcase,
  handshake: Handshake,
} as const

const advantages = {
  en: [
    {
      icon: 'award',
      title: 'Expertised & Experienced',
      description: 'We understand the nuances of insurance policies, regulations, and risk assessment. This allows us to provide sound advice and craft customized insurance solutions for our clients.',
    },
    {
      icon: 'heartHandshake',
      title: 'Strong Client Relationships',
      description: 'Building and nurturing strong relationships with our clients is fundamental to our business. We take the time to understand our clients’ needs, preferences, and financial situations.',
    },
    {
      icon: 'users',
      title: 'Skilled & Knowledgeable Team',
      description: 'Our team comprises highly skilled and knowledgeable professionals, ensuring that clients receive accurate information, optimal policy recommendations, and assistance in navigating the complexities of insurance policy processes.',
    },
    {
      icon: 'zap',
      title: 'Efficient Claims Processing',
      description: 'We pride ourselves on expeditious and efficient claims processing. Our team is well-versed in claims procedures and works diligently to ensure smooth and timely settlements for our clients, reducing their stress during challenging times.',
    },
    {
      icon: 'briefcase',
      title: 'Diverse Insurance Product Portfolio',
      description: 'Our diverse range of insurance products allows us to offer a wide spectrum of coverage options tailored to various client requirements. Whether it’s property, vehicles, or marine cargo & hull, we provide solutions to meet the unique needs of individuals, families, and businesses.',
    },
    {
      icon: 'handshake',
      title: 'Customer-focused Approach',
      description: 'Placing our clients at the forefront of everything we do, we maintain a customer-centric approach. We actively listen to their concerns, respond to their queries promptly, and provide personalized service, making them feel valued and understood throughout their insurance journey.',
    },
  ],
  id: [
    {
      icon: 'award',
      title: 'Keahlian & Pengalaman',
      description: 'Kami memahami nuansa polis asuransi, regulasi, dan penilaian risiko. Hal ini memungkinkan kami memberikan saran tepercaya dan menyusun solusi asuransi yang disesuaikan bagi klien kami.',
    },
    {
      icon: 'heartHandshake',
      title: 'Hubungan Klien yang Erat',
      description: 'Membangun dan membina hubungan erat dengan klien kami adalah hal mendasar bagi bisnis kami. Kami meluangkan waktu untuk memahami kebutuhan, preferensi, dan situasi keuangan klien kami.',
    },
    {
      icon: 'users',
      title: 'Tim yang Terampil & Berpengetahuan',
      description: 'Tim kami terdiri dari para profesional yang sangat terampil dan berpengetahuan luas, memastikan klien menerima informasi yang akurat, rekomendasi polis yang optimal, serta bantuan dalam menavigasi kompleksitas proses polis asuransi.',
    },
    {
      icon: 'zap',
      title: 'Proses Klaim yang Efisien',
      description: 'Kami bangga dengan proses klaim yang cepat dan efisien. Tim kami sangat memahami prosedur klaim dan bekerja keras untuk memastikan penyelesaian yang lancar dan tepat waktu bagi klien kami, mengurangi tingkat stres mereka di masa-masa sulit.',
    },
    {
      icon: 'briefcase',
      title: 'Portofolio Produk Asuransi yang Beragam',
      description: 'Keragaman produk asuransi kami memungkinkan kami menawarkan berbagai pilihan perlindungan yang disesuaikan dengan kebutuhan klien. Baik untuk properti, kendaraan, maupun kargo & rangka kapal, kami menyediakan solusi untuk memenuhi kebutuhan unik dari individu, keluarga, hingga pelaku bisnis.',
    },
    {
      icon: 'handshake',
      title: 'Pendekatan Berfokus pada Pelanggan',
      description: 'Menempatkan klien di garis depan dalam segala hal yang kami lakukan, kami menjaga pendekatan yang berpusat pada pelanggan. Kami aktif mendengarkan kekhawatiran mereka, merespons pertanyaan dengan cepat, dan memberikan layanan personal, membuat mereka merasa dihargai dan dipahami di sepanjang perjalanan asuransi mereka.',
    },
  ],
}

export default function WhyChooseSection() {
  const { language } = useLanguage()
  const content = advantages[language]

  return (
    <section id="advantages" className="bg-[#FBF9F4] px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-5xl">
          <p className="section-kicker">{pickLanguage(language, { en: 'Why Choose Us', id: 'Mengapa Memilih Kami' })}</p>
          <h2 className="mt-3 text-balance text-2xl font-black tracking-tight text-[#0B1F3A] sm:text-4xl">
            {pickLanguage(language, {
              en: 'Clear guidance, professional service, and a more comfortable consultation experience.',
              id: 'Arahan yang jelas, layanan profesional, dan pengalaman konsultasi yang lebih nyaman.',
            })}
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.map((advantage, index) => {
            const Icon = advantageIconMap[advantage.icon] ?? ShieldCheck

            return (
              <article
                key={advantage.title}
                className="animate-fade-up group rounded-[1.5rem] border border-[#0B1F3A]/8 bg-white p-5 text-center shadow-lg shadow-[#0B1F3A]/5 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/45 hover:shadow-xl"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F8F4EA] text-[#B8941F] transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-black tracking-tight text-[#0B1F3A]">{advantage.title}</h3>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#1F2933]/66">{advantage.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
