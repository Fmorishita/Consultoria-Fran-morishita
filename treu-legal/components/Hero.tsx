import { TrackedLink } from './TrackedLink';
import { Icon } from './Icon';
import { TopoLines } from './PlanMark';
import { session, whatsappUrl } from '@/content/facts';
import { ui } from '@/content/microcopy';

/**
 * Hero de la home. Único momento audaz del sitio.
 *
 * La composición es un plano: a la izquierda, el panel de marca con la
 * retícula de construcción y las cotas; a la derecha, el exoesqueleto de
 * hormigón de un edificio: la estructura que lo sostiene en pie. Es la
 * metáfora literal de «arquitectura jurídica empresarial», que es lo que vende
 * el despacho. Antes había un viñedo, que no decía nada del negocio.
 *
 * Separar el texto de la fotografía en paneles garantiza el contraste AA sin
 * tener que apagar la imagen hasta hacerla invisible.
 */
export function Hero({ tagline, proposition }: { tagline: string; proposition: string }) {
  return (
    <section className="relative isolate bg-blue-deep text-white">
      <div className="lg:grid lg:grid-cols-[1.15fr_1fr]">
        {/* Panel de marca */}
        <div className="relative isolate overflow-hidden">
          <div aria-hidden="true" className="plan-grid absolute inset-0 -z-10 opacity-60" />
          <TopoLines className="absolute -left-10 top-0 -z-10 h-full w-72 text-white/[0.07]" />

          <div className="shell relative py-14 sm:py-16 lg:ml-auto lg:mr-0 lg:max-w-[42rem] lg:py-24 lg:pr-12">
            <h1 className="text-step-5 font-semibold uppercase tracking-[0.05em]">{tagline}</h1>
            <p className="mt-6 max-w-prose text-step-1 leading-relaxed text-white/85">{proposition}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <TrackedLink
                href={session.path}
                event="cta_click"
                location="hero"
                className="btn bg-white text-blue-deep hover:bg-white/90"
              >
                Agendar {session.name}
              </TrackedLink>
              <TrackedLink
                href={whatsappUrl}
                event="whatsapp_click"
                location="hero"
                external
                className="btn border border-white/40 text-white hover:border-white hover:bg-white/10"
              >
                <Icon name="messageCircle" className="h-4 w-4" />
                {ui.writeWhatsapp}
              </TrackedLink>
            </div>

            {/* Los datos que responden las dudas que frenan el clic, como cotas. */}
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/20 pt-6 sm:grid-cols-4">
              {session.keyFacts.map((f) => (
                <div key={f.label}>
                  <dt className="text-[0.6875rem] uppercase tracking-[0.12em] text-white/60">{f.label}</dt>
                  <dd className="mt-1 text-step--1 font-medium leading-snug text-white">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Panel fotográfico. Es el LCP: se carga con prioridad. */}
        <div className="relative h-44 overflow-hidden sm:h-56 lg:h-auto">
          <picture>
            <source
              type="image/avif"
              srcSet="/img/hero-estructura-640.avif 640w, /img/hero-estructura-1024.avif 1024w, /img/hero-estructura-1600.avif 1600w"
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
            <img
              src="/img/hero-estructura-1024.webp"
              srcSet="/img/hero-estructura-640.webp 640w, /img/hero-estructura-1024.webp 1024w, /img/hero-estructura-1600.webp 1600w"
              sizes="(min-width: 1024px) 46vw, 100vw"
              alt="Estructura de hormigón que forma el esqueleto exterior de un edificio, con sus tirantes cruzados recortados contra el cielo."
              width={1600}
              height={2400}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </picture>
          {/* La retícula continúa sobre la fotografía: une los dos paneles. */}
          <div aria-hidden="true" className="plan-grid absolute inset-0 opacity-70 mix-blend-multiply" />
          {/* Velo de marca muy leve, para que la foto no compita con el texto. */}
          <div aria-hidden="true" className="absolute inset-0 bg-blue-deep/25" />
        </div>
      </div>
    </section>
  );
}
