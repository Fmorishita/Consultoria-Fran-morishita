import Link from 'next/link'
import { UnitCard } from './UnitCard'
import { SectionHead } from './SectionHead'
import { Reveal } from './Reveal'
import { WhatsAppLink } from './WhatsAppLink'
import { ArrowIcon, WhatsAppIcon } from './icons'
import { t, type Lang } from '@/content/copy'
import { r } from '@/lib/routes'
import { unidadesDestacadas } from '@/data/inventario'

export function FeaturedUnits({ lang }: { lang: Lang }) {
  const c = t(lang)
  const unidades = unidadesDestacadas(4)

  return (
    <section id="inventario" className="bg-parchment py-20 md:py-28">
      <div className="shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHead
            eyebrow={c.destacadas.eyebrow}
            titulo={c.destacadas.titulo}
            parrafo={c.destacadas.parrafo}
          />
          <Link
            href={r(lang).inventario}
            className="btn btn-ghost shrink-0 self-start md:self-auto"
          >
            {c.destacadas.verTodo}
            <ArrowIcon />
          </Link>
        </div>

        {unidades.length === 0 ? (
          <div className="mt-12 border border-navy/15 bg-white p-10 text-center">
            <p className="text-body-lg text-ink">{c.destacadas.vacio}</p>
            <WhatsAppLink ctx={{ seccion: 'sin-stock', lang }} className="btn btn-primary mt-6">
              <WhatsAppIcon className="h-4 w-4" />
              {c.destacadas.vacioCta}
            </WhatsAppLink>
          </div>
        ) : (
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {unidades.map((u, i) => (
              <Reveal as="li" key={u.slug} delay={i * 70}>
                <UnitCard unidad={u} lang={lang} />
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
