import { SectionHead } from './SectionHead'
import { Reveal } from './Reveal'
import { t, pick, type Lang } from '@/content/copy'
import { TESTIMONIOS, MODO_PLACEHOLDER } from '@/data/placeholder-content'

export function Testimonials({ lang }: { lang: Lang }) {
  const c = t(lang)

  return (
    <section className="bg-parchment py-20 md:py-28">
      <div className="shell">
        <SectionHead
          eyebrow={c.testimonios.eyebrow}
          titulo={c.testimonios.titulo}
          parrafo={c.testimonios.parrafo}
        />

        {/* PLACEHOLDER — reemplazar con testimonio real antes de publicar.
            El aviso desaparece solo al poner MODO_PLACEHOLDER en false. */}
        {MODO_PLACEHOLDER && (
          <p className="mt-8 inline-block border border-ochre/50 bg-white px-4 py-2 text-caption text-ink">
            <span className="font-bold text-navy uppercase">Placeholder ·</span>{' '}
            {c.testimonios.avisoPlaceholder}
          </p>
        )}

        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {TESTIMONIOS.map((testimonio, i) => (
            <Reveal as="li" key={testimonio.nombre} delay={i * 70}>
              <figure className="card flex h-full flex-col p-7">
                <p className="text-[0.625rem] font-bold tracking-[0.16em] text-ink uppercase">
                  {c.testimonios.etiquetaMiedo}: {pick(testimonio.miedo, lang)}
                </p>
                <blockquote className="mt-4 flex-1 text-body-lg leading-relaxed text-ink italic">
                  “{pick(testimonio.cita, lang)}”
                </blockquote>
                <figcaption className="mt-6 border-t border-navy/10 pt-4">
                  <span className="block text-h3 font-bold tracking-[0.08em] text-navy uppercase">
                    {testimonio.nombre}
                  </span>
                  <span className="mt-1 block text-sm text-ink/70">
                    {testimonio.ciudad} · {testimonio.unidad} · {pick(testimonio.fecha, lang)}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
