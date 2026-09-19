import Link from 'next/link';
import { industries } from '@/content/site';
import { SectionImage } from './SectionImage';

/**
 * Industrias. Deliberadamente NO es la misma rejilla de tarjetas que áreas y
 * Legal Products: son sólo cuatro y su texto es largo, así que se presentan
 * como filas editoriales anchas que alternan el lado de la imagen.
 *
 * Cada imagen es la que treulegal.solutions publica hoy en esa industria. La
 * versión anterior las presentaba con un icono y ninguna imagen, que es lo que
 * dejaba la sección sin identidad.
 */
export function IndustryRows({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const Heading = `h${headingLevel}` as 'h2' | 'h3';
  return (
    <ul className="mt-12 divide-y divide-line border-y border-line">
      {industries.map((industry, i) => (
        <li key={industry.slug}>
          <Link
            href={`/industrias/${industry.slug}/`}
            className="group grid items-center gap-x-10 gap-y-5 py-8 transition-colors hover:bg-paper lg:grid-cols-2 lg:py-10"
          >
            <div className={`overflow-hidden bg-ink ${i % 2 === 1 ? 'lg:order-last' : ''}`}>
              <SectionImage
                name={industry.image}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="aspect-[16/9] w-full object-cover transition-transform duration-700 ease-plan group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex flex-col gap-4">
              <Heading className="text-step-4 leading-[1.05] text-ink group-hover:text-blue">
                {industry.name}
              </Heading>
              <p className="max-w-prose text-step-0 leading-relaxed text-slate">{industry.blurb}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
