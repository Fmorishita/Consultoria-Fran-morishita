import Link from 'next/link';
import { Icon } from './Icon';

type Card = {
  slug: string;
  name: string;
  blurb: string;
  icon: string;
};

/**
 * Rejilla de tarjetas. Sin sombras: el límite lo marca un trazo fino, como en
 * un plano. El icono da significado a cada entrada.
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
  return (
    <ul className={`mt-12 grid gap-px border border-line bg-line ${cols}`}>
      {items.map((item) => (
        <li key={item.slug} className="bg-white">
          <Link
            href={`${basePath}${item.slug}/`}
            className="group flex h-full flex-col gap-3 p-6 transition-colors hover:bg-paper focus-visible:bg-paper sm:p-7"
          >
            <Icon name={item.icon} className="h-6 w-6 text-blue" />
            <Heading className="text-step-2 leading-tight text-ink group-hover:text-blue">
              {item.name}
            </Heading>
            <p className="text-step--1 leading-relaxed text-slate">{item.blurb}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
