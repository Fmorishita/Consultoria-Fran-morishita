import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/Section';
import { PageBand } from '@/components/PageBand';
import { ContactForm } from '@/components/ContactForm';
import { Icon } from '@/components/Icon';
import { JsonLd } from '@/components/JsonLd';
import { TrackedLink } from '@/components/TrackedLink';
import { breadcrumbSchema, faqSchema, pageMetadata, sessionOfferSchema } from '@/lib/seo';
import { getPage, section, sectionParagraphs, subsections } from '@/content/pages';
import { contact, session, whatsappUrl } from '@/content/facts';
import { ui } from '@/content/microcopy';

const SLUG = 'strategic-legal-session';
const PATH = '/strategic-legal-session/';

export function generateMetadata(): Metadata {
  const page = getPage(SLUG);
  return pageMetadata({
    title: session.name,
    description:
      page?.meta.description ||
      'Sesión de trabajo de 60 minutos con el Principal Counsel del despacho para analizar la situación jurídica de su empresa con criterio aplicado a su realidad operativa específica.',
    path: PATH,
  });
}

export default function Page() {
  const page = getPage(SLUG);
  if (!page) return null;

  const intro = sectionParagraphs(page, 'Claridad jurídica en 60 minutos');
  const profiles = subsections(page, '¿Para quién es esta sesión?');
  const profilesLead = sectionParagraphs(page, '¿Para quién es esta sesión?')[0];
  const notFree = sectionParagraphs(page, 'Esta sesión no es orientación gratuita');
  const withFounder = sectionParagraphs(page, 'La sesión es directamente con el Fundador');
  const founderList = section(page, 'La sesión es directamente con el Fundador').find(
    (b) => b.type === 'list',
  );
  const faqs = subsections(page, 'Lo que suelen preguntar antes de agendar');

  const trail = [
    { name: 'Inicio', path: '/' },
    { name: session.name, path: PATH },
  ];

  return (
    <>
      <PageHeader
        title={session.name}
        lead="Sesión de trabajo de 60 minutos con el Principal Counsel del despacho para analizar la situación jurídica de su empresa con criterio aplicado a su realidad operativa específica."
        trail={trail}
        tone="blue"
      />

      {/* Ficha de datos + acceso inmediato al formulario. En móvil, el
          formulario queda a un toque desde aquí. */}
      <section className="border-b border-line bg-white">
        <div className="shell py-10">
          <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
            <Fact label="Duración" value={session.duration} />
            <Fact label="Formato" value={session.format} note={session.formatNote} />
            <Fact label="Inversión" value={session.price} note={session.priceNote} />
            <Fact label="Con quién" value={session.withWhom} note={session.withWhomRole} />
            <Fact label="Respuesta" value={session.response} />
          </dl>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#formulario" className="btn-primary">
              Agendar {session.name}
            </a>
            <TrackedLink
              href={whatsappUrl}
              event="whatsapp_click"
              location="sesion_ficha"
              external
              className="btn-secondary"
            >
              <Icon name="messageCircle" className="h-4 w-4" />
              {ui.writeWhatsapp}
            </TrackedLink>
            <p className="text-step--1 text-slate">{session.capacityNote}</p>
          </div>
        </div>
      </section>

      {/* La sesión termina en un plan de acción por etapas, que es justo lo que
          se ve aquí. Banda alta: una baja recortaría a las personas. */}
      <PageBand
        name="plan-de-trabajo"
        alt={ui.sessionImageAlt}
        widths={[640, 1024]}
        tall
      />

      <Section eyebrow="La sesión" title="Claridad jurídica en 60 minutos">
        <div className="prose-treu mt-8">
          {intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Section>

      {/* Estructura 15/30/15: secuencia real, por eso va numerada. */}
      <Section
        eyebrow="Estructura"
        title="Qué ocurre en los 60 minutos"
        lead="La sesión tiene una estructura definida. No improvisa. Cada bloque de tiempo tiene un propósito específico."
        tone="paper"
      >
        <ol className="mt-12 grid gap-px border border-line bg-line lg:grid-cols-3">
          {session.structure.map((step) => (
            <li key={step.step} className="bg-white p-6 sm:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <span aria-hidden="true" className="text-step-4 font-semibold leading-none text-blue/30">
                  {step.step}
                </span>
                <span className="text-step--1 font-medium uppercase tracking-[0.1em] text-blue">
                  {step.minutes}
                </span>
              </div>
              <h3 className="mt-5 text-step-2 leading-tight">{step.title}</h3>
              <p className="mt-3 text-step--1 leading-relaxed text-slate">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Perfil" title="¿Para quién es esta sesión?" lead={profilesLead}>
        <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {profiles.map((p) => (
            <li key={p.title} className="bg-white p-6">
              <h3 className="text-step-1 font-semibold leading-snug text-ink">{p.title}</h3>
              {p.body.map((t) => (
                <p key={t} className="mt-3 text-step--1 leading-relaxed text-slate">
                  {t}
                </p>
              ))}
            </li>
          ))}
        </ul>
      </Section>

      {notFree.length > 0 && (
        <Section title="Esta sesión no es orientación gratuita" tone="paper">
          <div className="prose-treu mt-8">
            {notFree.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Section>
      )}

      <Section title="La sesión es directamente con el Fundador del despacho">
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="prose-treu">
            {withFounder.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {founderList?.type === 'list' && (
            <ul className="space-y-4 border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              {founderList.items.map((item) => (
                <li key={item} className="flex gap-3 text-step--1 leading-relaxed text-ink">
                  <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-blue" strokeWidth={2.25} />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Section>

      {/* Formulario. La barra inferior de móvil se oculta al llegar aquí. */}
      <section id="formulario" className="scroll-mt-24 border-y border-line bg-paper">
        <div className="shell py-section">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <div>
              <div aria-hidden="true" className="h-px w-12 bg-blue" />
              <h2 className="mt-5 text-step-4">Agendar {session.name}</h2>
              <p className="mt-4 max-w-prose text-step-1 leading-relaxed text-slate">
                Complete el formulario. Recibirá respuesta en menos de 24 horas hábiles para confirmar
                disponibilidad y coordinar el horario.
              </p>
              <div className="mt-8 space-y-3 border-t border-line pt-6">
                <p className="text-step--1 font-medium text-ink">O contáctenos directamente</p>
                <TrackedLink
                  href={whatsappUrl}
                  event="whatsapp_click"
                  location="sesion_formulario"
                  external
                  className="flex min-h-[44px] items-center gap-2 text-step-0 text-blue"
                >
                  <Icon name="messageCircle" className="h-4 w-4" />
                  WhatsApp {contact.whatsappDisplay}
                </TrackedLink>
                <TrackedLink
                  href={contact.phoneHref}
                  event="tel_click"
                  location="sesion_formulario"
                  external
                  className="flex min-h-[44px] items-center gap-2 text-step-0 text-blue"
                >
                  <Icon name="phone" className="h-4 w-4" />
                  {contact.phoneDisplay}
                </TrackedLink>
                <TrackedLink
                  href={`mailto:${contact.email}`}
                  event="email_click"
                  location="sesion_formulario"
                  external
                  className="flex min-h-[44px] items-center gap-2 text-step-0 text-blue"
                >
                  <Icon name="mail" className="h-4 w-4" />
                  {contact.email}
                </TrackedLink>
              </div>
            </div>
            <div className="bg-white p-6 sm:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {faqs.length > 0 && (
        <Section title="Lo que suelen preguntar antes de agendar">
          <dl className="mt-10 divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <div key={f.title} className="py-6">
                <dt className="text-step-2 font-semibold leading-snug text-ink">{f.title}</dt>
                {f.body.map((t) => (
                  <dd key={t} className="mt-3 max-w-prose font-serif text-step-1 leading-relaxed text-ink/90">
                    {t}
                  </dd>
                ))}
              </div>
            ))}
          </dl>
        </Section>
      )}

      <JsonLd data={breadcrumbSchema(trail)} />
      <JsonLd data={sessionOfferSchema()} />
      {faqs.length > 0 && (
        <JsonLd
          data={faqSchema(faqs.map((f) => ({ question: f.title, answer: f.body.join(' ') })))}
        />
      )}
    </>
  );
}

function Fact({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div>
      <dt className="text-[0.6875rem] uppercase tracking-[0.12em] text-slate">{label}</dt>
      <dd className="mt-1.5 text-step-0 font-medium leading-snug text-ink">{value}</dd>
      {note && <dd className="mt-1 text-step--1 leading-relaxed text-slate">{note}</dd>}
    </div>
  );
}
