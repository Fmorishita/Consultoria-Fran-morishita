import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/PageHeader';
import { PageBand } from '@/components/PageBand';
import { Blocks } from '@/components/Blocks';
import { CardGrid } from '@/components/CardGrid';
import { SessionCta } from '@/components/SessionCta';
import { RelatedLinks } from '@/components/RelatedLinks';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, pageMetadata, serviceSchema } from '@/lib/seo';
import { bodyBlocks, getPage, leadParagraph } from '@/content/pages';

type Item = { slug: string; name: string; blurb: string; icon: string };

/**
 * Fotografía de contexto por página, sólo donde aporta. La imagen de la
 * conurbación Tijuana–San Diego acompaña a las páginas transfronterizas.
 * Créditos en docs/CREDITOS-IMAGENES.md.
 */
const PAGE_BANDS: Record<string, { name: string; alt: string; widths: number[] }> = {
  'empresas-binacionales': {
    name: 'tijuana-san-diego-iss',
    alt: 'Fotografía aérea de la conurbación de Tijuana y San Diego, donde se distinguen la retícula urbana de ambas ciudades y la línea de la frontera.',
    widths: [640, 1024],
  },
  'cross-border-advisory': {
    name: 'tijuana-san-diego-iss',
    alt: 'Fotografía aérea de la conurbación de Tijuana y San Diego, donde se distinguen la retícula urbana de ambas ciudades y la línea de la frontera.',
    widths: [640, 1024],
  },
};

type Collection = {
  /** Ruta base, con barras: /industrias/ */
  basePath: string;
  /** Título de la página índice, tal como lo publica el sitio. */
  indexTitle: string;
  /** Slug del JSON de origen de la página índice. */
  indexSource: string;
  /** Prefijo del slug de origen de las páginas de detalle. */
  detailPrefix: string;
  /** Nombre en la ruta de navegación. */
  crumb: string;
  items: readonly Item[];
  columns?: 2 | 3;
};

/** Página índice de una colección (áreas, industrias, productos). */
export function collectionIndex(c: Collection) {
  const metadata = (): Metadata => {
    const page = getPage(c.indexSource);
    return pageMetadata({
      title: c.indexTitle,
      description: page?.meta.description || (page ? leadParagraph(page) : null) || undefined,
      path: c.basePath,
    });
  };

  function Page() {
    const page = getPage(c.indexSource);
    const lead = page ? leadParagraph(page) : null;
    const trail = [
      { name: 'Inicio', path: '/' },
      { name: c.crumb, path: c.basePath },
    ];
    const extra = page
      ? bodyBlocks(page, c.indexTitle).filter(
          (b) => b.type === 'paragraph' && b.text !== lead && b.text.length > 120,
        )
      : [];

    return (
      <>
        <PageHeader title={c.indexTitle} lead={lead} trail={trail} />
        <div className="shell py-section">
          {/* Las tarjetas son el primer nivel bajo el H1 de la página. */}
          <CardGrid items={c.items} basePath={c.basePath} columns={c.columns} headingLevel={2} />
          {extra.length > 0 && <Blocks blocks={extra} className="mt-16" />}
        </div>
        <SessionCta location={`${c.detailPrefix}_indice`} />
        <JsonLd data={breadcrumbSchema(trail)} />
      </>
    );
  }

  return { metadata, Page };
}

/** Página de detalle de una colección. */
export function collectionDetail(c: Collection) {
  const find = (slug: string) => c.items.find((i) => i.slug === slug);
  const source = (slug: string) => `${c.detailPrefix}--${slug}`;

  const generateStaticParams = () => c.items.map((i) => ({ slug: i.slug }));

  const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
    const { slug } = await params;
    const item = find(slug);
    if (!item) return {};
    const page = getPage(source(slug));
    return pageMetadata({
      title: item.name,
      description: page?.meta.description || item.blurb,
      path: `${c.basePath}${slug}/`,
    });
  };

  async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const item = find(slug);
    const page = getPage(source(slug));
    if (!item || !page) notFound();

    const lead = leadParagraph(page);
    const blocks = bodyBlocks(page, item.name).filter(
      (b) => !(b.type === 'paragraph' && b.text === lead),
    );
    const path = `${c.basePath}${slug}/`;
    const trail = [
      { name: 'Inicio', path: '/' },
      { name: c.crumb, path: c.basePath },
      { name: item.name, path },
    ];

    const band = PAGE_BANDS[slug];

    return (
      <>
        <PageHeader title={item.name} lead={lead} trail={trail} />
        {band && <PageBand {...band} />}
        <div className="shell py-section">
          <Blocks blocks={blocks} />
        </div>
        <RelatedLinks slug={slug} />
        <SessionCta location={`${c.detailPrefix}_${slug}`} />
        <JsonLd data={breadcrumbSchema(trail)} />
        <JsonLd data={serviceSchema(item.name, item.blurb, path)} />
      </>
    );
  }

  return { generateStaticParams, generateMetadata, Page };
}
