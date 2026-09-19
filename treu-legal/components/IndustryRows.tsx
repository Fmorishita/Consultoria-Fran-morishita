import Link from 'next/link';
import { industries } from '@/content/site';
import { SectionImage } from './SectionImage';

/**
 * Industrias en mosaico de dos por fila.
 *
 * Las cuatro fichas tienen ahora la MISMA altura. Antes las dos de abajo eran
 * más bajas y la imagen apaisada se recortaba por el centro, que es lo que
 * dejaba a «Empresas Binacionales» mal encuadrada mientras «Desarrollo
 * Inmobiliario» se veía bien. Con una sola proporción, todas encuadran igual.
 *
 * El texto va centrado sobre la imagen, como el resto de la página, y el fondo
 * lleva un paralaje muy contenido (`fondo-lento`) que sólo actúa donde el
 * navegador soporta animaciones por scroll y nadie ha pedido menos movimiento.
 */
export function IndustryRows({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const Heading = `h${headingLevel}` as 'h2' | 'h3';
  return (
    <ul className="mt-12 grid gap-4 aparece-escalonado sm:grid-cols-2">
      {industries.map((industry) => (
        <li key={industry.slug}>
          <Link
            href={`/industrias/${industry.slug}/`}
            className="group relative isolate flex min-h-[20rem] flex-col items-center justify-end overflow-hidden bg-ink p-6 text-center text-white transition-[transform,box-shadow] duration-300 ease-plan hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-28px_rgb(11_27_43/0.55)] focus-visible:-translate-y-0.5 active:translate-y-0 sm:p-8 lg:min-h-[24rem]"
          >
            <SectionImage
              name={industry.image}
              sizes="(min-width: 640px) 50vw, 100vw"
              className="fondo-lento absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 ease-plan"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 to-ink/15"
            />
            <Heading className="text-step-4 leading-[1.05]">{industry.name}</Heading>
            <p className="mx-auto mt-3 max-w-prose text-step--1 leading-relaxed text-white/80">
              {industry.blurb}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
