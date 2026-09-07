import { t, type Lang } from '@/content/copy'
import { CheckIcon } from './icons'

export function TrustBar({ lang }: { lang: Lang }) {
  const c = t(lang)
  return (
    <section className="border-y border-navy/10 bg-white" aria-label={c.confianza.items[0].titulo}>
      <ul className="shell grid grid-cols-1 divide-y divide-navy/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {c.confianza.items.map((item) => (
          <li key={item.titulo} className="flex items-start gap-3 px-0 py-6 lg:px-6 lg:first:pl-0 lg:last:pr-0">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border border-gold text-navy">
              <CheckIcon className="h-3.5 w-3.5" />
            </span>
            <span>
              <span className="block text-h3 font-bold tracking-[0.1em] text-navy uppercase">
                {item.titulo}
              </span>
              <span className="mt-1 block text-sm text-ink/80">{item.detalle}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
