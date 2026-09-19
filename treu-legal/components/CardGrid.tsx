import Link from 'next/link';
import { Icon } from './Icon';
import { SectionImage } from './SectionImage';

type Card = {
  slug: string;
  name: string;
  blurb: string;
  icon: string;
  image?: string;
};

/**
 * Rejilla de áreas de práctica y de Legal Products.
 *
 * Las áreas llevan la imagen que treulegal.solutions publica hoy en cada una:
 * el sitio actual es visual en esta sección, y dejarla en texto con un icono
 * era lo que la volvía anónima. Los Legal Products no tienen imagen en el
 * sitio actual, así que conservan la ficha de sólo texto con su icono; no se
 * les inventa una.
 */
export function CardGrid({
  items,
  basePath,
  columns = 3,
  headingLevel = 3,
}: {
  items: readonly Card[];
  basePath: string;
  columns?: 2 | 3;
  /** 2 cuando las tarjetas son el primer nivel bajo el H1 de la página. */
  headingLevel?: 2 | 3;
}) {
  const Heading = `h${headingLevel}` as 'h2' | 'h3';
  const cols = columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3';
  const sizes =
    columns === 2 ? '(min-width: 640px) 50vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw';

  return (
    <ul className={`mt-12 grid gap-px border border-line bg-line ${cols}`}>
      {items.map((item) => (
        <li key={item.slug} className="bg-white">
          <Link
            href={`${basePath}${item.slug}/`}
            className="group flex h-full flex-col transition-colors hover:bg-paper focus-visible:bg-paper"
          >
            {item.image && (
              <div className="overflow-hidden bg-ink">
                <SectionImage
                  name={item.image}
                  sizes={sizes}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-plan group-hover:scale-[1.04]"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
              {!item.image && <Icon name={item.icon} className="h-6 w-6 text-blue" />}
              <Heading className="text-step-2 leading-tight text-ink group-hover:text-blue">
                {item.name}
              </Heading>
              <p className="text-step--1 leading-relaxed text-slate">{item.blurb}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
