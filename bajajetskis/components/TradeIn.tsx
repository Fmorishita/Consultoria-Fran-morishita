import { WhatsAppLink } from './WhatsAppLink'
import { WhatsAppIcon, CheckIcon } from './icons'
import { t, type Lang } from '@/content/copy'

export function TradeIn({ lang }: { lang: Lang }) {
  const c = t(lang)

  return (
    <section className="bg-deep py-20 text-parchment md:py-28">
      <div className="shell grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <p className="eyebrow eyebrow-on-dark">{c.permuta.eyebrow}</p>
          <h2 className="mt-5 font-display text-[1.75rem] leading-tight font-bold text-parchment uppercase sm:text-h1">
            {c.permuta.titulo}
          </h2>
          <p className="mt-5 text-body-lg leading-relaxed text-parchment/85">{c.permuta.parrafo}</p>
          <WhatsAppLink ctx={{ seccion: 'permuta', lang }} className="btn btn-gold mt-8">
            <WhatsAppIcon />
            {c.permuta.cta}
          </WhatsAppLink>
        </div>

        <ul className="space-y-4 border-l border-gold/40 pl-8">
          {c.permuta.puntos.map((punto) => (
            <li key={punto} className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center border border-gold text-gold">
                <CheckIcon className="h-3 w-3" />
              </span>
              <span className="text-body-lg leading-relaxed text-parchment/90">{punto}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
