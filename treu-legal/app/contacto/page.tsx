import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { ContactForm } from '@/components/ContactForm';
import { Icon } from '@/components/Icon';
import { JsonLd } from '@/components/JsonLd';
import { TrackedLink } from '@/components/TrackedLink';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { contact, firm, session, whatsappUrl } from '@/content/facts';
import { getPage } from '@/content/pages';

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
      <PageHeader
        title="Contacto"
        lead="Complete el formulario de solicitud de sesión. Recibirá respuesta en menos de 24 horas hábiles."
        trail={trail}
      />

      <div className="shell py-section">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* Canales directos, visibles sin scroll en móvil. */}
          <div>
            <div aria-hidden="true" className="h-px w-12 bg-blue" />
            <h2 className="mt-5 text-step-3">Canales directos</h2>
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

            <div className="mt-8 border border-line bg-paper p-5">
              <p className="text-step--1 leading-relaxed text-slate">
                Si lo que necesita es una sesión de trabajo con el Principal Counsel, la{' '}
                <TrackedLink
                  href={session.path}
                  event="cta_click"
                  location="contacto_nota"
                  className="font-medium text-blue underline underline-offset-2"
                >
                  {session.name}
                </TrackedLink>{' '}
                dura {session.duration} y su honorario es {session.price.toLowerCase()}, acreditable al
                proyecto.
              </p>
            </div>
          </div>

          <div id="formulario" className="scroll-mt-24 border border-line bg-white p-6 sm:p-8">
            <h2 className="text-step-3">Solicitud de sesión</h2>
            <p className="mt-2 text-step--1 text-slate">
              Los campos marcados como obligatorios son necesarios para atender la solicitud.
            </p>
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
