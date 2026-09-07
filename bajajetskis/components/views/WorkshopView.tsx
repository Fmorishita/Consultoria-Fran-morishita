import Image from 'next/image'
import { PageShell } from '../PageShell'
import { PageHeader } from '../PageHeader'
import { Process } from '../Process'
import { FinalCta } from '../FinalCta'
import { WhatsAppLink } from '../WhatsAppLink'
import { WhatsAppIcon, CheckIcon, CrossIcon } from '../icons'
import { t, pick, fill, type Lang } from '@/content/copy'
import { TALLER, FOTOS_PLACEHOLDER } from '@/data/placeholder-content'

export function WorkshopView({ lang }: { lang: Lang }) {
  const c = t(lang)

  return (
    <PageShell lang={lang} pagina="taller">
      <PageHeader eyebrow={c.taller.eyebrow} titulo={c.taller.titulo} parrafo={c.taller.intro} />

      {/* El mecánico. Esta sección es la que convierte la desconfianza en venta. */}
      <section className="bg-parchment py-20 md:py-28">
        <div className="shell grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          {/* PLACEHOLDER — sustituir por el retrato real del mecánico en el taller */}
          <div className="relative aspect-4/5 overflow-hidden border border-navy/12 bg-navy">
            <Image
              src={FOTOS_PLACEHOLDER.mecanico}
              alt={TALLER.mecanico.nombre}
              fill
              sizes="(min-width: 768px) 520px, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="eyebrow">{c.taller.mecanicoTitulo}</p>
            {/* PLACEHOLDER — nombre y trayectoria pendientes de confirmar */}
            <h2 className="mt-5 font-display text-[1.75rem] leading-tight font-bold text-navy uppercase sm:text-h1">
              {TALLER.mecanico.nombre}
            </h2>
            <p className="mt-6 text-body-lg leading-relaxed text-ink">
              {fill(c.taller.mecanicoTexto, {
                anos: TALLER.mecanico.anosDeOficio,
                especialidad: pick(TALLER.mecanico.especialidad, lang),
              })}
            </p>
            <blockquote className="mt-8 border-l-2 border-gold pl-6 text-body-lg leading-relaxed text-navy italic">
              {c.taller.mecanicoCita}
            </blockquote>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-navy/12 pt-6">
              {c.taller.numeros.map((n) => (
                <div key={n.etiqueta}>
                  <dt className="sr-only">{n.etiqueta}</dt>
                  <dd>
                    <span className="block font-display text-2xl font-bold text-navy">
                      {fill(n.valor, { ...TALLER.trayectoria })}
                    </span>
                    <span className="mt-1 block text-caption leading-snug text-ink/70">
                      {n.etiqueta}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <Process lang={lang} />

      <section className="bg-white py-20 md:py-28">
        <div className="shell grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-display text-[1.5rem] leading-tight font-bold text-navy uppercase sm:text-h2">
              {c.taller.capacidadTitulo}
            </h2>
            <p className="mt-5 text-body-lg leading-relaxed text-ink">{c.taller.capacidadTexto}</p>
            <WhatsAppLink ctx={{ seccion: 'taller', lang }} className="btn btn-primary mt-8">
              <WhatsAppIcon className="h-4 w-4" />
              {c.taller.cta}
            </WhatsAppLink>
          </div>

          <div className="border border-navy/15 p-7">
            <h2 className="text-h3 font-bold tracking-[0.14em] text-navy uppercase">
              {c.taller.garantiaTitulo}
            </h2>
            <ul className="mt-6 space-y-3">
              {c.taller.garantiaCubre.map((item) => (
                <li key={item} className="flex items-start gap-3 text-body text-ink">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-gold text-navy">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <ul className="mt-6 space-y-3 border-t border-navy/12 pt-6">
              {c.taller.garantiaNoCubre.map((item) => (
                <li key={item} className="flex items-start gap-3 text-body text-ink/70">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-ochre/60 text-ochre">
                    <CrossIcon className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FinalCta lang={lang} />
    </PageShell>
  )
}
