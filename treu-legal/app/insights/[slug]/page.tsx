import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/PageHeader';
import { Blocks } from '@/components/Blocks';
import { SessionCta } from '@/components/SessionCta';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { bodyBlocks, getPage, leadParagraph } from '@/content/pages';
import { guides } from '@/content/site';

type Params = { slug: string };

/**
 * El conjunto de rutas es cerrado: las 5 guías.
 * Con `dynamicParams = false`, cualquier otro slug cae en la 404 global de
 * Next.js, que sí aplica el layout raíz. Un `notFound()` lanzado desde una
 * ruta dinámica sirve una carcasa sin `lang`, sin `<main>` y sin `<h1>`.
 */
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return guides.map((g) => ({ slug: g.slug }));
}

const source = (slug: string) => `insights--${slug}`;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(source(slug));
  if (!page) return {};
  return pageMetadata({
    title: page.title,
    description: page.meta.description || leadParagraph(page, 20) || undefined,
    path: `/insights/${slug}/`,
  });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = getPage(source(slug));
  if (!page || !guides.some((g) => g.slug === slug)) notFound();

  const lead = leadParagraph(page, 20);
  const blocks = bodyBlocks(page).filter((b) => !(b.type === 'paragraph' && b.text === lead));
  const path = `/insights/${slug}/`;
  const trail = [
    { name: 'Inicio', path: '/' },
    { name: 'Insights', path: '/insights/' },
    { name: page.title, path },
  ];

  return (
    <>
      <PageHeader eyebrow="Guía" title={page.title} lead={lead} trail={trail} />
      <div className="shell py-section">
        <Blocks blocks={blocks} />
      </div>
      <SessionCta location={`guia_${slug}`} />
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
