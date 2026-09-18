import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { ContactForm } from '@/components/ContactForm';
import { Icon } from '@/components/Icon';
import { JsonLd } from '@/components/JsonLd';
import { TrackedLink } from '@/components/TrackedLink';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { contact, firm, session, whatsappUrl } from '@/content/facts';
import { getPage } from '@/content/pages';
import { ui } from '@/content/microcopy';

const PATH = '/contacto/';

export function generateMetadata(): Metadata {
  const page = getPage('contacto');
  return pageMetadata({
    title: 'Contacto',
    description:
      page?.meta.description ||
      'Solicitud de sesión con Treu Legal & Business. Respuesta en menos de 24 horas hábiles.',
    path: PATH,
  });
}

export default function Page() {
  const trail = [
    { name: 'Inicio', path: '/' },
    { name: 'Contacto', path: PATH },
  ];

  return (
    <>
      {/* La entradilla es la frase literal de /strategic-legal-session/. */}
      <PageHeader
        title="Contacto"
        lead="Complete el formulario. Recibirá respuesta en menos de 24 horas hábiles para confirmar disponibilidad y coordinar el horario."
        trail={trail}
      />

      <div className="shell py-section">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* Canales directos, visibles sin scroll en móvil. */}
          <div>
            <div aria-hidden="true" className="h-px w-12 bg-blue" />
            <h2 className="mt-5 text-step-3">{ui.directChannels}</h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              <li>
                <TrackedLink
                  href={whatsappUrl}
                  event="whatsapp_click"
                  location="contacto"
                  external
                  className="flex min-h-[56px] items-center gap-3 py-3 text-step-0 text-ink hover:text-blue"
                >
                  <Icon name="messageCircle" className="h-5 w-5 text-blue" />
                  <span>
                    WhatsApp
                    <span className="block text-step--1 text-slate">{contact.whatsappDisplay}</span>
                  </span>
                </TrackedLink>
              </li>
              <li>
                <TrackedLink
                  href={contact.phoneHref}
                  event="tel_click"
                  location="contacto"
                  external
                  className="flex min-h-[56px] items-center gap-3 py-3 text-step-0 text-ink hover:text-blue"
                >
                  <Icon name="phone" className="h-5 w-5 text-blue" />
                  <span>
                    Teléfono
                    <span className="block text-step--1 text-slate">{contact.phoneDisplay}</span>
                  </span>
                </TrackedLink>
              </li>
              <li>
                <TrackedLink
                  href={`mailto:${contact.email}`}
                  event="email_click"
                  location="contacto"
                  external
                  className="flex min-h-[56px] items-center gap-3 py-3 text-step-0 text-ink hover:text-blue"
                >
                  <Icon name="mail" className="h-5 w-5 text-blue" />
                  <span>
                    Correo
                    <span className="block text-step--1 text-slate">{contact.email}</span>
                  </span>
                </TrackedLink>
              </li>
              <li>
                <a
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[56px] items-center gap-3 py-3 text-step-0 text-ink hover:text-blue"
                >
                  <Icon name="mapPin" className="h-5 w-5 text-blue" />
                  <span>
                    Ubicación
                    <span className="block text-step--1 text-slate">
                      {firm.city}, {firm.state}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[56px] items-center gap-3 py-3 text-step-0 text-ink hover:text-blue"
                >
                  <Icon name="linkedin" className="h-5 w-5 text-blue" />
                  LinkedIn
                </a>
              </li>
            </ul>

            {/* Descripción literal de la sesión, tal como la publica su página. */}
            <div className="mt-8 border border-line bg-paper p-5">
              <h3 className="text-step-1 font-semibold">{session.name}</h3>
              <p className="mt-2 text-step--1 leading-relaxed text-slate">
                Sesión de trabajo de 60 minutos con el Principal Counsel del despacho para analizar la
                situación jurídica de su empresa con criterio aplicado a su realidad operativa
                específica.
              </p>
              <TrackedLink
                href={session.path}
                event="cta_click"
                location="contacto_nota"
                className="mt-3 inline-flex min-h-[44px] items-center text-step--1 font-semibold text-blue underline underline-offset-4"
              >
                {ui.viewSessionDetail}
              </TrackedLink>
            </div>
          </div>

          <div id="formulario" className="scroll-mt-24 border border-line bg-white p-6 sm:p-8">
            <h2 className="text-step-3">Solicitud de sesión</h2>
            <p className="mt-2 text-step--1 text-slate">{ui.requiredFieldsNote}</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
