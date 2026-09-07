import { SunburstRule } from './icons'

/** Cabecera de páginas interiores. Fondo marino sólido: siempre legible. */
export function PageHeader({
  eyebrow,
  titulo,
  parrafo,
}: {
  eyebrow: string
  titulo: string
  parrafo?: string
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy py-16 md:py-20">
      <div className="engraved-rays absolute inset-x-0 bottom-0 h-40 opacity-20" aria-hidden="true" />
      <div className="shell relative">
        <p className="eyebrow eyebrow-on-dark">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl font-display text-[1.9rem] leading-tight font-bold text-parchment uppercase sm:text-h1 md:text-[2.75rem]">
          {titulo}
        </h1>
        {parrafo && (
          <p className="mt-6 max-w-2xl text-body-lg leading-relaxed text-parchment/80">{parrafo}</p>
        )}
        <SunburstRule className="mt-10 w-44 text-gold/70" />
      </div>
    </section>
  )
}
