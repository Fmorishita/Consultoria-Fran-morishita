import { SectionHead } from './SectionHead'
import { t, type Lang } from '@/content/copy'

/** Acordeón con <details>: sin JavaScript, accesible con teclado por defecto. */
export function Faq({ lang }: { lang: Lang }) {
  const c = t(lang)

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="shell">
        <SectionHead eyebrow={c.faq.eyebrow} titulo={c.faq.titulo} />

        <div className="mt-12 max-w-3xl border-t border-navy/12">
          {c.faq.preguntas.map((item) => (
            <details key={item.p} className="group border-b border-navy/12">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left marker:hidden">
                <h3 className="text-base font-bold text-navy sm:text-lg">{item.p}</h3>
                <span
                  aria-hidden="true"
                  className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center border border-navy/25 text-navy transition-transform group-open:rotate-45"
                >
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 4v12M4 10h12" strokeLinecap="square" />
                  </svg>
                </span>
              </summary>
              <p className="pb-6 pr-10 text-body leading-relaxed text-ink/85">{item.r}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
