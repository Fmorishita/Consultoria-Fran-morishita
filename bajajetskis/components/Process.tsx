import Image from 'next/image'
import { SectionHead } from './SectionHead'
import { Reveal } from './Reveal'
import { t, type Lang } from '@/content/copy'
import { FOTOS_PLACEHOLDER } from '@/data/placeholder-content'

export function Process({ lang }: { lang: Lang }) {
  const c = t(lang)

  return (
    <section className="bg-navy py-20 text-parchment md:py-28">
      <div className="shell">
        <SectionHead
          eyebrow={c.proceso.eyebrow}
          titulo={c.proceso.titulo}
          parrafo={c.proceso.parrafo}
          tono="oscuro"
        />

        <ol className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {c.proceso.pasos.map((paso, i) => (
            <Reveal as="li" key={paso.numero} delay={i * 80} className="flex flex-col">
              {/* PLACEHOLDER — sustituir por fotografía real de esta etapa del taller */}
              <div className="relative aspect-4/3 overflow-hidden border border-gold/25 bg-deep">
                <Image
                  src={FOTOS_PLACEHOLDER.proceso[i]}
                  alt={paso.titulo}
                  fill
                  sizes="(min-width: 1024px) 300px, (min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-6 font-display text-2xl font-bold text-gold">{paso.numero}</p>
              <h3 className="mt-2 text-lg font-bold text-parchment">{paso.titulo}</h3>
              <p className="mt-3 text-sm leading-relaxed text-parchment/75">{paso.texto}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
