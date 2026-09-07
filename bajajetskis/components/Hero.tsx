import Image from 'next/image'
import Link from 'next/link'
import { WhatsAppLink } from './WhatsAppLink'
import { WhatsAppIcon, ArrowIcon } from './icons'
import { t, type Lang } from '@/content/copy'
import { r } from '@/lib/routes'
import { FOTOS_PLACEHOLDER } from '@/data/placeholder-content'

export function Hero({ lang }: { lang: Lang }) {
  const c = t(lang)

  return (
    <section className="relative isolate overflow-hidden bg-navy">
      {/* PLACEHOLDER — sustituir por la fotografía real de una unidad reconstruida */}
      <Image
        src={FOTOS_PLACEHOLDER.hero}
        alt={c.hero.imagenAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy via-navy/88 to-navy/45 md:to-navy/25"
        aria-hidden="true"
      />
      <div
        className="engraved-rays absolute inset-x-0 bottom-0 h-64 opacity-25 mix-blend-screen"
        aria-hidden="true"
      />

      <div className="shell relative py-20 md:py-32">
        <div className="max-w-2xl">
          <p className="eyebrow eyebrow-on-dark">{c.hero.eyebrow}</p>

          <h1 className="mt-6 font-display text-[1.8rem] leading-[1.14] font-bold text-parchment uppercase sm:text-[2.5rem] md:text-display">
            {c.hero.titulo}
          </h1>

          <p className="mt-6 max-w-xl text-body leading-relaxed text-parchment/85 sm:mt-7 sm:text-body-lg">
            {c.hero.parrafo}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <WhatsAppLink ctx={{ seccion: 'hero', lang }} className="btn btn-gold">
              <WhatsAppIcon />
              {c.hero.ctaWhatsapp}
            </WhatsAppLink>
            <Link href={r(lang).inventario} className="btn btn-ghost-dark">
              {c.hero.ctaPrimario}
              <ArrowIcon />
            </Link>
          </div>

          <p className="mt-6 text-caption tracking-[0.06em] text-parchment/65">{c.hero.microcopy}</p>
        </div>
      </div>
    </section>
  )
}
