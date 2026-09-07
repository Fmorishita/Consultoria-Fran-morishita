import Image from 'next/image'
import Link from 'next/link'
import { WhatsAppLink } from './WhatsAppLink'
import { WhatsAppIcon, ArrowIcon } from './icons'
import { t, pick, type Lang } from '@/content/copy'
import { r } from '@/lib/routes'
import { precioUSD, numero, precioParaMensaje } from '@/lib/format'
import type { Unidad } from '@/data/inventario'

export function EstadoBadge({ unidad, lang }: { unidad: Unidad; lang: Lang }) {
  const c = t(lang)
  if (unidad.estado === 'disponible') return null
  const esVendida = unidad.estado === 'vendida'
  return (
    <span
      className={`absolute top-3 left-3 z-10 px-3 py-1.5 text-[0.625rem] font-bold tracking-[0.16em] uppercase ${
        esVendida ? 'bg-navy text-parchment' : 'bg-gold text-navy'
      }`}
    >
      {esVendida ? c.estados.vendida : c.estados.apartada}
    </span>
  )
}

export function UnitCard({ unidad, lang }: { unidad: Unidad; lang: Lang }) {
  const c = t(lang)
  const titulo = `${unidad.marca} ${unidad.modelo}`
  const href = r(lang).unidad(unidad.slug)
  const vendida = unidad.estado === 'vendida'
  const ctx = {
    marca: unidad.marca,
    modelo: unidad.modelo,
    anio: unidad.anio,
    precio: precioParaMensaje(unidad.precioUSD),
    seccion: 'catalogo' as const,
    lang,
  }

  return (
    <article className="card group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-plate">
      <Link href={href} className="relative block aspect-4/3 overflow-hidden bg-navy">
        <EstadoBadge unidad={unidad} lang={lang} />
        <Image
          src={unidad.fotos[0].src}
          alt={pick(unidad.fotos[0].alt, lang)}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className={`object-cover transition-transform duration-500 group-hover:scale-[1.03] ${
            vendida ? 'opacity-60 grayscale' : ''
          }`}
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[0.625rem] font-bold tracking-[0.18em] text-ink uppercase">
          {unidad.marca} · {unidad.anio}
        </p>
        <h3 className="mt-2 text-lg leading-snug font-bold text-navy">
          <Link href={href} className="hover:text-deep">
            {unidad.modelo}
          </Link>
        </h3>

        <dl className="mt-4 grid grid-cols-3 gap-2 border-y border-navy/10 py-3 text-center">
          <div>
            <dt className="text-[0.625rem] tracking-[0.1em] text-ink/60 uppercase">{c.unidad.horas}</dt>
            <dd className="mt-0.5 text-sm font-bold text-navy">{numero(unidad.horas, lang)}</dd>
          </div>
          <div className="border-x border-navy/10">
            <dt className="text-[0.625rem] tracking-[0.1em] text-ink/60 uppercase">{c.unidad.potencia}</dt>
            <dd className="mt-0.5 text-sm font-bold text-navy">{unidad.potencia}</dd>
          </div>
          <div>
            <dt className="text-[0.625rem] tracking-[0.1em] text-ink/60 uppercase">{c.unidad.plazas}</dt>
            <dd className="mt-0.5 text-sm font-bold text-navy">{unidad.plazas}</dd>
          </div>
        </dl>

        <p className="mt-4 font-display text-2xl font-bold text-navy">
          {precioUSD(unidad.precioUSD, lang)}
        </p>

        <div className="mt-5 flex flex-col gap-2 pt-1">
          {vendida ? (
            <span className="text-sm text-ink/70">{c.estados.vendidaNota}</span>
          ) : (
            <WhatsAppLink ctx={ctx} className="btn btn-primary w-full !min-h-12">
              <WhatsAppIcon className="h-4 w-4" />
              {c.unidad.cta}
            </WhatsAppLink>
          )}
          <Link
            href={href}
            className="inline-flex items-center gap-2 self-start text-sm font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-deep"
          >
            {titulo} — {c.unidad.especificaciones}
            <ArrowIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}
