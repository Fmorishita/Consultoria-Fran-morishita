import Link from 'next/link'
import { WhatsAppLink } from './WhatsAppLink'
import { WhatsAppIcon, ArrowIcon, SunburstRule } from './icons'
import { t, type Lang } from '@/content/copy'
import { r } from '@/lib/routes'

export function FinalCta({ lang }: { lang: Lang }) {
  const c = t(lang)

  return (
    <section className="relative isolate overflow-hidden bg-navy py-20 text-center md:py-28">
      <div className="engraved-rays absolute inset-x-0 bottom-0 h-72 opacity-30" aria-hidden="true" />
      <div className="shell relative">
        <SunburstRule className="mx-auto w-52 text-gold" />
        <p className="eyebrow eyebrow-on-dark mt-8 justify-center">{c.ctaFinal.eyebrow}</p>
        <h2 className="mt-5 font-display text-[1.75rem] leading-tight font-bold text-parchment uppercase sm:text-h1">
          {c.ctaFinal.titulo}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-body-lg leading-relaxed text-parchment/85">
          {c.ctaFinal.parrafo}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <WhatsAppLink ctx={{ seccion: 'hero', lang }} className="btn btn-gold w-full sm:w-auto">
            <WhatsAppIcon />
            {c.ctaFinal.cta}
          </WhatsAppLink>
          <Link href={r(lang).inventario} className="btn btn-ghost-dark w-full sm:w-auto">
            {c.ctaFinal.secundario}
            <ArrowIcon />
          </Link>
        </div>
        <p className="mt-7 text-caption tracking-[0.06em] text-parchment/60">{c.ctaFinal.horario}</p>
      </div>
    </section>
  )
}
