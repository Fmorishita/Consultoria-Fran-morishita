import Link from 'next/link';
import { Icon } from './Icon';
import { contact, session, whatsappUrl } from '@/content/facts';
import { ui } from '@/content/microcopy';
import { TrackedLink } from './TrackedLink';

/**
 * Cierre de conversión. Único CTA principal del sitio, siempre acompañado de
 * los cuatro datos reales que responden las dudas que frenan el clic.
 */
export function SessionCta({ location, className = '' }: { location: string; className?: string }) {
  return (
    <section className={`bg-blue-deep text-white ${className}`}>
      <div className="shell py-section">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-16">
          <div>
            <div aria-hidden="true" className="h-px w-12 bg-white/50" />
            <h2 className="mt-5 text-step-4">{session.name}</h2>
            <p className="mx-auto mt-4 max-w-prose text-step-1 leading-relaxed text-white/80">
              Sesión de trabajo de 60 minutos con el Principal Counsel del despacho para analizar la
              situación jurídica de su empresa con criterio aplicado a su realidad operativa específica.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <TrackedLink
                href={session.path}
                event="cta_click"
                location={location}
                className="btn bg-white text-blue-deep hover:bg-white/90"
              >
                Agendar {session.name}
              </TrackedLink>
              <TrackedLink
                href={whatsappUrl}
                event="whatsapp_click"
                location={location}
                external
                className="btn border border-white/35 text-white hover:border-white hover:bg-white/10"
              >
                <Icon name="messageCircle" className="h-4 w-4" />
                {ui.writeWhatsapp}
              </TrackedLink>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-step--1 text-white/70">
              <TrackedLink
                href={contact.phoneHref}
                event="tel_click"
                location={location}
                external
                className="inline-flex min-h-[44px] items-center gap-2 hover:text-white"
              >
                <Icon name="phone" className="h-4 w-4" />
                {contact.phoneDisplay}
              </TrackedLink>
              <TrackedLink
                href={`mailto:${contact.email}`}
                event="email_click"
                location={location}
                external
                className="inline-flex min-h-[44px] items-center gap-2 hover:text-white"
              >
                <Icon name="mail" className="h-4 w-4" />
                {contact.email}
              </TrackedLink>
            </div>
          </div>

          {/* Los cuatro datos clave, presentados como cotas de un plano. */}
          <dl className="divide-y divide-white/15 border-y border-white/15">
            {session.keyFacts.map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-6 py-4">
                <dt className="text-step--1 text-white/60">{f.label}</dt>
                <dd className="text-right text-step-0 font-medium text-white">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
