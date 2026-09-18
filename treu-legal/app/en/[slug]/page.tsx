import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/PageHeader';
import { Blocks } from '@/components/Blocks';
import { Icon } from '@/components/Icon';
import { JsonLd } from '@/components/JsonLd';
import { TrackedLink } from '@/components/TrackedLink';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { bodyBlocks, getPage, leadParagraph } from '@/content/pages';
import { enPages } from '@/content/en';
import { contact, session, whatsappUrl } from '@/content/facts';
import { uiEn } from '@/content/microcopy';

type Params = { slug: string };

/**
 * El conjunto de rutas es cerrado: las 5 páginas en inglés.
 * Con `dynamicParams = false`, cualquier otro slug cae en la 404 global de
 * Next.js, que sí aplica el layout raíz. Un `notFound()` lanzado desde una
 * ruta dinámica sirve una carcasa sin `lang`, sin `<main>` y sin `<h1>`.
 */
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return enPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = enPages.find((p) => p.slug === slug);
  if (!entry) return {};
  const page = getPage(entry.source);
  return pageMetadata({
    title: entry.title,
    description: page?.meta.description || (page ? leadParagraph(page) : null) || undefined,
    path: `/en/${slug}/`,
    locale: 'en_US',
    alternateEn: `/en/${slug}/`,
    alternateEs: entry.esEquivalent,
  });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const entry = enPages.find((p) => p.slug === slug);
  if (!entry) notFound();
  const page = getPage(entry.source);
  if (!page) notFound();

  const lead = leadParagraph(page);
  // Frase de cierre literal que la propia página publica en inglés.
  const closing = [...page.blocks]
    .reverse()
    .find((b) => b.type === 'paragraph' && /^schedule\b/i.test(b.text));
  const closingText = closing?.type === 'paragraph' ? closing.text : null;
  const blocks = bodyBlocks(page, entry.title).filter(
    (b) =>
      !(b.type === 'paragraph' && b.text === lead) &&
      !(closingText && b.type === 'paragraph' && b.text === closingText),
  );
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'English', path: '/en/' },
    { name: entry.title, path: `/en/${slug}/` },
  ];

  return (
    <>
      <PageHeader title={entry.title} lead={lead} trail={trail} />

      <div className="shell py-section">
        <Blocks blocks={blocks} />

        {/* Selector de idioma: sólo donde existe equivalente en español. */}
        {entry.esEquivalent && (
          <p className="mt-12 border-t border-line pt-6 text-step--1">
            <Link href={entry.esEquivalent} className="inline-flex items-center gap-2 text-blue">
              <Icon name="arrowLeftRight" className="h-4 w-4" />
              {uiEn.languageEs}
            </Link>
          </p>
        )}
      </div>

      {/* Cierre de conversión. El texto es la frase de cierre que esta misma
          página ya publica en inglés: no se traduce ni se redacta nada nuevo.
          Los datos de la sesión sólo están publicados en español; una versión
          en inglés aprobada por el despacho está en PENDIENTES-CLIENTE. */}
      <section className="bg-blue-deep text-white">
        <div className="shell py-section">
          <div aria-hidden="true" className="h-px w-12 bg-white/50" />
          <h2 className="mt-5 text-step-4">{session.name}</h2>
          {closingText && (
            <p className="mt-4 max-w-prose text-step-1 leading-relaxed text-white/80">{closingText}</p>
          )}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <TrackedLink
              href={session.path}
              event="cta_click"
              location={`en_${slug}`}
              className="btn bg-white text-blue-deep hover:bg-white/90"
            >
              {session.name}
            </TrackedLink>
            <TrackedLink
              href={whatsappUrl}
              event="whatsapp_click"
              location={`en_${slug}`}
              external
              className="btn border border-white/35 text-white hover:border-white hover:bg-white/10"
            >
              <Icon name="messageCircle" className="h-4 w-4" />
              {uiEn.whatsapp}
            </TrackedLink>
            <TrackedLink
              href={contact.phoneHref}
              event="tel_click"
              location={`en_${slug}`}
              external
              className="inline-flex min-h-[44px] items-center gap-2 text-step--1 text-white/75 hover:text-white"
            >
              <Icon name="phone" className="h-4 w-4" />
              {contact.phoneDisplay}
            </TrackedLink>
          </div>
        </div>
      </section>

      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
