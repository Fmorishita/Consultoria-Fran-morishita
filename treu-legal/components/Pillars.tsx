/**
 * Los cuatro pilares de "¿Por qué Treu Legal & Business?".
 *
 * Sin tarjetas y sin iconos. Eran cuatro cajas blancas con borde de 1 px y un
 * icono de línea cada una —incluido un escudo para "prevención de riesgos",
 * que es el cliché exacto—. Aquí son cuatro enunciados grandes separados por
 * un filete vertical: se leen como una declaración, que es lo que son, y no
 * como una rejilla de funcionalidades.
 */
export function Pillars({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-12 grid gap-y-8 text-center aparece-escalonado sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-0">
      {items.map((pillar, i) => (
        <li
          key={pillar}
          className={`lg:px-8 ${i === 0 ? 'lg:pl-0' : 'lg:border-l lg:border-line'} ${
            i === items.length - 1 ? 'lg:pr-0' : ''
          }`}
        >
          <p className="text-step-1 font-medium leading-snug text-ink">{pillar}</p>
        </li>
      ))}
    </ul>
  );
}
