import { TrackedLink } from './TrackedLink';
import { Icon } from './Icon';
import { TopoLines } from './PlanMark';
import { session, whatsappUrl } from '@/content/facts';
import { ui } from '@/content/microcopy';

/**
 * Hero de la home. Único momento audaz del sitio.
 *
 * La composición es un plano: a la izquierda, el panel de marca con la
 * retícula de construcción y las cotas; a la derecha, el Fundador dirigiendo
 * una sesión de trabajo. Se probaron antes un viñedo (no decía nada del
 * negocio) y una estructura de hormigón (era la metáfora correcta, pero el
 * cliente la leyó como fría). Una persona trabajando con un plan delante es lo
 * que transmite el profesionalismo que se vende.
 *
 * El encuadre se fija en el tercio izquierdo porque ahí está él: centrado, el
 * recorte vertical del panel lo dejaba fuera.
 *
 * Separar el texto de la fotografía en paneles garantiza el contraste AA sin
 * tener que apagar la imagen hasta hacerla invisible.
 *
 * Sin la ficha de datos (duración, con quién, honorario, respuesta) que
 * llevaba debajo de los botones: el cliente señaló que no hace falta ahí —
 * esos mismos datos ya están en la franja de confianza justo debajo y en
 * /strategic-legal-session/, así que aquí sólo duplicaban.
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
          </div>
        </div>

        {/* Panel fotográfico. Es el LCP: se carga con prioridad.
            Altura más generosa en móvil: la imagen es 3:2 y a h-44/h-56
            (como iba antes) el recorte vertical era severo y se comía la
            cabeza y la pantalla del plan de trabajo. object-top para que el
            recorte, cuando lo hay, se lleve el margen inferior y no la
            cabeza ni el título de la pantalla. */}
        <div className="relative h-72 overflow-hidden sm:h-80 lg:h-auto">
          <picture>
            <source
              type="image/avif"
              srcSet="/img/plan-de-trabajo-640.avif 640w, /img/plan-de-trabajo-1024.avif 1024w"
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
            <img
              src="/img/plan-de-trabajo-1024.webp"
              srcSet="/img/plan-de-trabajo-640.webp 640w, /img/plan-de-trabajo-1024.webp 1024w"
              sizes="(min-width: 1024px) 46vw, 100vw"
              alt={ui.heroImageAlt}
              width={1536}
              height={1024}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover object-[center_top] lg:object-[42%_center]"
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
