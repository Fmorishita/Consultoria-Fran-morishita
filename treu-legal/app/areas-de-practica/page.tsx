import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { CardGrid } from '@/components/CardGrid';
import { SessionCta } from '@/components/SessionCta';
import { Blocks } from '@/components/Blocks';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { practiceAreas } from '@/content/site';
import { bodyBlocks, getPage, leadParagraph } from '@/content/pages';

const SLUG = 'areas-de-practica';
const PATH = '/areas-de-practica/';

export function generateMetadata(): Metadata {
  const page = getPage(SLUG);
  return pageMetadata({
    title: page?.meta.title?.split('|')[0].trim() || 'Áreas de Práctica',
    description: page?.meta.description || leadParagraph(page!) || undefined,
    path: PATH,
  });
}

export default function Page() {
  const page = getPage(SLUG);
  if (!page) return null;
  const lead = leadParagraph(page);
  const trail = [{ name: 'Inicio', path: '/' }, { name: 'Áreas de práctica', path: PATH }];

  return (
    <>
      <PageHeader title="Áreas de Práctica" lead={lead} trail={trail} />
      <div className="shell py-section">
        <CardGrid items={practiceAreas} basePath="/areas-de-practica/" headingLevel={2} />
        <ExtraContent page={page} lead={lead} />
      </div>
      <SessionCta location="areas_indice" />
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}

/** El resto del texto de la página índice, sin repetir la entradilla. */
function ExtraContent({
  page,
  lead,
}: {
  page: NonNullable<ReturnType<typeof getPage>>;
  lead: string | null;
}) {
  const rest = bodyBlocks(page, 'Áreas de Práctica').filter(
    (b) => !(b.type === 'paragraph' && b.text === lead),
  );
  // Sólo se muestra si aporta algo más que los nombres de las áreas.
  const meaningful = rest.filter((b) => b.type === 'paragraph' && b.text.length > 120);
  if (!meaningful.length) return null;
  return <Blocks blocks={meaningful} className="mt-16" />;
}
