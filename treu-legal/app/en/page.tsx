import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { Icon } from '@/components/Icon';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { enPages } from '@/content/en';
import { getPage, leadParagraph } from '@/content/pages';
import { session } from '@/content/facts';

const PATH = '/en/';

export function generateMetadata(): Metadata {
  return pageMetadata({
    title: 'Legal Intelligence for Business | Corporate Lawyer in Mexico',
    description: 'Treu Legal & Business, Ensenada, Baja California.',
    path: PATH,
    locale: 'en_US',
    alternateEs: '/',
    alternateEn: PATH,
  });
}

/**
 * Hub en inglés. Se construye únicamente con las páginas en inglés que ya
 * existen en el sitio. No hay texto traducido nuevo.
 */
export default function Page() {
  const items = enPages
    .map((p) => {
      const page = getPage(p.source);
      return page ? { ...p, lead: leadParagraph(page) } : null;
    })
    .filter(Boolean);

  const trail = [
    { name: 'Home', path: '/' },
    { name: 'English', path: PATH },
  ];

  return (
    <>
      {/* El tagline es un nombre propio de marca. No hay entradilla nueva:
          el hub se construye sólo con las páginas en inglés que ya existen. */}
      <PageHeader title="Legal Intelligence for Business" trail={trail} tone="blue" />
      <div className="shell py-section">
        <ul className="divide-y divide-line border-y border-line">
          {items.map((item) => (
            <li key={item!.slug}>
              <Link
                href={`/en/${item!.slug}/`}
                className="group flex items-start gap-4 py-6 transition-colors hover:bg-paper"
              >
                <Icon name="fileText" className="mt-1 h-5 w-5 shrink-0 text-blue" />
                <span>
                  <span className="block text-step-2 leading-snug text-ink group-hover:text-blue">
                    {item!.title}
                  </span>
                  {item!.lead && (
                    <span className="mt-1.5 block max-w-prose text-step--1 leading-relaxed text-slate">
                      {item!.lead}
                    </span>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* La Strategic Legal Session es un nombre propio. Sus datos sólo
            están publicados en español, así que aquí se enlaza a su página en
            lugar de traducir nada. Ver docs/PENDIENTES-CLIENTE.md. */}
        <div className="mt-12 border border-line bg-paper p-6">
          <h2 className="text-step-2">{session.name}</h2>
          <dl className="mt-4 divide-y divide-line border-y border-line">
            {session.keyFacts.map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-6 py-3">
                <dt className="text-step--1 text-slate">{f.label}</dt>
                <dd className="text-right text-step--1 font-medium text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
          <Link href={session.path} className="btn-primary mt-6">
            {session.name}
          </Link>
        </div>
      </div>
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
