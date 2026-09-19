import Link from 'next/link';
import { industries } from '@/content/site';
import { SectionImage } from './SectionImage';

/**
 * Industrias en mosaico de dos alturas.
 *
 * La versión anterior alternaba imagen-izquierda / imagen-derecha cuatro veces
 * seguidas. Dos ya cansan; cuatro es el patrón más banal que existe. Aquí las
 * dos primeras van grandes y las dos siguientes a media altura, de modo que la
 * sección tiene un ritmo propio y no repite ni el zigzag ni la rejilla de
 * tarjetas de las áreas.
 *
 * Cada imagen es la que treulegal.solutions publica hoy en esa industria.
 */
export function IndustryRows({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const Heading = `h${headingLevel}` as 'h2' | 'h3';
  return (
    <ul className="mt-12 grid gap-4 sm:grid-cols-2">
      {industries.map((industry, i) => {
        // Las dos primeras mandan; las dos últimas son más bajas.
        const tall = i < 2;
        return (
          <li key={industry.slug}>
            <Link
              href={`/industrias/${industry.slug}/`}
              className={`group relative isolate flex flex-col justify-end overflow-hidden bg-ink p-6 text-white transition-[transform,box-shadow] duration-300 ease-plan hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-28px_rgb(11_27_43/0.55)] focus-visible:-translate-y-0.5 active:translate-y-0 sm:p-8 ${
                tall ? 'min-h-[22rem]' : 'min-h-[16rem]'
              }`}
            >
              <SectionImage
                name={industry.image}
                sizes="(min-width: 640px) 50vw, 100vw"
                className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 ease-plan group-hover:scale-[1.05]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 to-ink/10"
              />
              <Heading className={`${tall ? 'text-step-4' : 'text-step-3'} leading-[1.05]`}>
                {industry.name}
              </Heading>
              <p className="mt-3 max-w-prose text-step--1 leading-relaxed text-white/75">
                {industry.blurb}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
