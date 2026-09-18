import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/PageHeader';
import { PageBand } from '@/components/PageBand';
import { Blocks } from '@/components/Blocks';
import { SessionCta } from '@/components/SessionCta';
import { RelatedLinks } from '@/components/RelatedLinks';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, pageMetadata, serviceSchema } from '@/lib/seo';
import { practiceAreas } from '@/content/site';
import { bodyBlocks, getPage, leadParagraph } from '@/content/pages';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return practiceAreas.map((a) => ({ slug: a.slug }));
}

const area = (slug: string) => practiceAreas.find((a) => a.slug === slug);
const sourceSlug = (slug: string) => `areas-de-practica--${slug}`;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const a = area(slug);
  const page = getPage(sourceSlug(slug));
  if (!a) return {};
  return pageMetadata({
    title: a.name,
    description: page?.meta.description || a.blurb,
    path: `/areas-de-practica/${slug}/`,
  });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const a = area(slug);
  const page = getPage(sourceSlug(slug));
  if (!a || !page) notFound();

  const lead = leadParagraph(page);
  const blocks = bodyBlocks(page, a.name).filter((b) => !(b.type === 'paragraph' && b.text === lead));
  const path = `/areas-de-practica/${slug}/`;
  const trail = [
    { name: 'Inicio', path: '/' },
    { name: 'Áreas de práctica', path: '/areas-de-practica/' },
    { name: a.name, path },
  ];

  return (
    <>
      <PageHeader title={a.name} lead={lead} trail={trail} />
      {/* La fotografía sólo acompaña donde aporta contexto real. */}
      {slug === 'cross-border-advisory' && (
        <PageBand
          name="tijuana-san-diego-iss"
          alt="Fotografía aérea de la conurbación de Tijuana y San Diego, donde se distinguen la retícula urbana de ambas ciudades y la línea de la frontera."
          widths={[640, 1024]}
        />
      )}
      <div className="shell py-section">
        <Blocks blocks={blocks} />
      </div>
      <RelatedLinks slug={slug} />
      <SessionCta location={`area_${slug}`} />
      <JsonLd data={breadcrumbSchema(trail)} />
      <JsonLd data={serviceSchema(a.name, a.blurb, path)} />
    </>
  );
}
