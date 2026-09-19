import Link from 'next/link';

type Product = {
  slug: string;
  name: string;
  blurb: string;
};

/**
 * Legal Products como índice tipográfico.
 *
 * El sitio actual no publica ninguna imagen en esta sección, así que no se le
 * inventa una. Pero tampoco se repite la rejilla de tarjetas que ya usan las
 * áreas: sin imagen, una ficha con borde de 1 px es sólo una caja alrededor de
 * un texto. Aquí el peso lo lleva el nombre del producto, que es lo que el
 * despacho ha registrado (™), sobre un filete que separa cada fila.
 *
 * La descripción vive en la segunda columna en escritorio y debajo en móvil,
 * así que la columna de nombres se lee sola como un índice.
 */
export function ProductIndex({ items }: { items: readonly Product[] }) {
  return (
    <ul className="mt-12 border-t border-line">
      {items.map((p) => (
        <li key={p.slug} className="border-b border-line">
          <Link
            href={`/legal-products/${p.slug}/`}
            className="group grid gap-x-10 gap-y-2 py-6 transition-colors hover:bg-paper focus-visible:bg-paper lg:grid-cols-[1.1fr_1.4fr] lg:items-baseline lg:py-7"
          >
            <h3 className="text-step-3 leading-tight text-ink transition-colors group-hover:text-blue">
              {p.name}
            </h3>
            <p className="max-w-prose text-step--1 leading-relaxed text-slate">{p.blurb}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
