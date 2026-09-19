import Link from 'next/link';
import { SectionImage } from './SectionImage';

type Area = {
  slug: string;
  name: string;
  blurb: string;
  image?: string;
};

/**
 * Áreas de práctica en mosaico asimétrico.
 *
 * NO es una rejilla de tres columnas iguales: ese patrón, repetido en cuatro
 * secciones de la home, era lo que hacía que la página se leyera como una
 * plantilla. Aquí la primera área ocupa el doble de ancho y las demás van a
 * ritmo distinto, así que la vista tiene un punto de entrada en vez de seis
 * tarjetas equivalentes.
 *
 * El texto se apoya sobre la imagen con un degradado, no debajo en una ficha
 * blanca: el borde de 1 px alrededor de todo era el otro tic de plantilla.
 */
/**
 * Anchos por posición, en una rejilla de 3 columnas y 6 áreas.
 *
 * Suman 9 exactamente (2+1 / 1+2 / 2+1), así que las tres filas quedan llenas:
 * una rejilla que deja huecos al final delata que la composición no se planeó.
 * Además el ancho alterna de lado en cada fila, que es lo que le da ritmo.
 */
const SPANS = [2, 1, 1, 2, 2, 1] as const;

export function AreaMosaic({ items }: { items: readonly Area[] }) {
  return (
    <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((area, i) => {
        const wide = (SPANS[i] ?? 1) === 2;
        return (
          <li key={area.slug} className={wide ? 'lg:col-span-2' : ''}>
            <Link
              href={`/areas-de-practica/${area.slug}/`}
              className="group relative isolate flex h-full min-h-[15rem] flex-col justify-end overflow-hidden bg-ink p-6 text-white transition-[transform,box-shadow] duration-300 ease-plan hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-28px_rgb(11_27_43/0.55)] focus-visible:-translate-y-0.5 active:translate-y-0 sm:p-7"
            >
              {area.image && (
                <SectionImage
                  name={area.image}
                  sizes={wide ? '(min-width: 1024px) 66vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
                  className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 ease-plan group-hover:scale-[1.05]"
                />
              )}
              {/* Degradado propio, no un velo plano: sin él el texto blanco se
                  pierde sobre las zonas claras de la fotografía. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/75 to-ink/10"
              />
              <h3 className={`${wide ? 'text-step-3' : 'text-step-2'} leading-tight`}>{area.name}</h3>
              <p className="mt-2 max-w-prose text-step--1 leading-relaxed text-white/75">{area.blurb}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
