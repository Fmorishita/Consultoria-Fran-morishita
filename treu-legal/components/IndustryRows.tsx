import Link from 'next/link';
import { Icon } from './Icon';
import { industries } from '@/content/site';

/**
 * Industrias. Deliberadamente NO es la misma rejilla de tarjetas que áreas y
 * Legal Products: son sólo cuatro y su texto es largo, así que se presentan
 * como filas editoriales anchas. Rompe la monotonía de tres rejillas iguales
 * seguidas.
 */
export function IndustryRows({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const Heading = `h${headingLevel}` as 'h2' | 'h3';
  return (
    <ul className="mt-12 divide-y divide-line border-y border-line">
      {industries.map((industry) => (
        <li key={industry.slug}>
          <Link
            href={`/industrias/${industry.slug}/`}
            className="group grid gap-x-8 gap-y-3 py-7 transition-colors hover:bg-paper sm:grid-cols-[auto_1fr] sm:py-8 lg:grid-cols-[auto_1.1fr_1.4fr] lg:items-baseline"
          >
            <Icon name={industry.icon} className="h-7 w-7 shrink-0 text-blue" />
            <Heading className="text-step-3 leading-tight text-ink group-hover:text-blue">
              {industry.name}
            </Heading>
            <p className="max-w-prose text-step-0 leading-relaxed text-slate sm:col-start-2 lg:col-start-3">
              {industry.blurb}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
