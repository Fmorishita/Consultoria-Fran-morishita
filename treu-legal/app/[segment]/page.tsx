import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/PageHeader';
import { Blocks } from '@/components/Blocks';
import { SessionCta } from '@/components/SessionCta';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { bodyBlocks, getPage, leadParagraph } from '@/content/pages';
import { esLandings } from '@/content/site';

/**
 * Páginas de primer nivel: las dos landings SEO en español y los textos
 * legales. Comparten ruta, así que se resuelven aquí.
 *
 * Los textos legales son intocables: sólo cambia su formato, y no llevan CTA
 * de conversión.
 */
const LEGAL = [
  { slug: 'privacidad', title: 'Aviso y Política de privacidad' },
  { slug: 'condiciones-de-uso', title: 'Condiciones de uso' },
] as const;

/**
 * El primer segmento dinámico se llama `segment` porque lo comparte con la
 * ruta de artículos (/AAAA/MM/DD/slug/), donde ese mismo segmento es el año.
 * Next.js exige que el nombre coincida en el mismo nivel.
 */
type Params = { segment: string };

const isLegal = (slug: string) => LEGAL.find((l) => l.slug === slug);
const isLanding = (slug: string) => esLandings.some((l) => l.slug === slug);

export function generateStaticParams(): Params[] {
  return [
    ...esLandings.map((l) => ({ segment: l.slug })),
    ...LEGAL.map((l) => ({ segment: l.slug })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { segment: slug } = await params;
  const page = getPage(slug);
  if (!page) return {};
  const legal = isLegal(slug);
  return pageMetadata({
    title: legal ? legal.title : page.meta.title?.split('|')[0].trim() || page.title,
    description: page.meta.description || leadParagraph(page) || undefined,
    path: `/${slug}/`,
  });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { segment: slug } = await params;
  const legal = isLegal(slug);
  if (!legal && !isLanding(slug)) notFound();

  const page = getPage(slug);
  if (!page) notFound();

  const title = legal ? legal.title : page.title;
  const path = `/${slug}/`;
  const trail = [
    { name: 'Inicio', path: '/' },
    { name: title, path },
  ];

  if (legal) {
    return (
      <>
        <PageHeader title={title} trail={trail} />
        <div className="shell py-section">
          <Blocks blocks={bodyBlocks(page, title)} />
        </div>
        <JsonLd data={breadcrumbSchema(trail)} />
      </>
    );
  }

  const lead = leadParagraph(page);
  const blocks = bodyBlocks(page, title).filter((b) => !(b.type === 'paragraph' && b.text === lead));

  return (
    <>
      <PageHeader title={title} lead={lead} trail={trail} />
      <div className="shell py-section">
        <Blocks blocks={blocks} />
      </div>
      <SessionCta location={`landing_${slug}`} />
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
