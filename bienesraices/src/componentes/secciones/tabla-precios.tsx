import { Revelar } from "@/componentes/ui/revelar";
import { formatoMoneda, formatoNumero } from "@/lib/formato";
import { t, type Idioma } from "@/lib/i18n";
import type { Moneda } from "@/lib/formato";
import type { Proyecto } from "@contenido/esquemas";
import { UI } from "@contenido/ui";

type ListaPrecios = NonNullable<Proyecto["listaPrecios"]>;
type Zona = ListaPrecios["zonas"][number];
type Tipo = Zona["tipos"][number];

function superficie(tipo: Tipo, idioma: Idioma): string {
  const min = formatoNumero(tipo.superficieMin, idioma);
  if (!tipo.superficieMax) return `${min} m²`;
  return `${min} ${t(UI.etiquetas.rango, idioma)} ${formatoNumero(tipo.superficieMax, idioma)} m²`;
}

/**
 * La lista de precios del desarrollo, por zona y categoría de lote.
 *
 * En pantalla ancha va como tabla, que es el documento que el comprador compara
 * renglón por renglón. En móvil la tabla se apila: un precio cortado por scroll
 * horizontal es peor que no publicarlo. El enganche se calcula con el porcentaje
 * del esquema, nunca se teclea a mano.
 */
export function TablaPrecios({
  lista,
  moneda,
  enganchePct,
  idioma,
}: {
  lista: ListaPrecios;
  moneda: Moneda;
  enganchePct?: number;
  idioma: Idioma;
}) {
  const etiquetaEnganche =
    enganchePct !== undefined ? `${t(UI.tabla.enganche, idioma)} ${enganchePct}%` : undefined;
  const enganche = (precio: number) =>
    enganchePct === undefined ? undefined : formatoMoneda((precio * enganchePct) / 100, moneda, idioma);

  return (
    <div className="mt-12 space-y-14">
      {lista.zonas.map((zona, indice) => (
        <Revelar key={zona.nombre.es} retraso={indice * 80}>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="titular titular-sm">{t(zona.nombre, idioma)}</h3>
            <p className="etiqueta-dato">{t(lista.etiqueta, idioma)}</p>
          </div>

          {/* Apilado en móvil */}
          <ul className="mt-6 divide-y divide-borde border-y border-borde sm:hidden">
            {zona.tipos.map((tipo) => (
              <li key={tipo.nombre} className="py-5">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-texto">{tipo.nombre}</p>
                  <p className="cifra text-xl text-acento">{formatoMoneda(tipo.precio, moneda, idioma)}</p>
                </div>
                <div className="mt-2 flex items-baseline justify-between gap-4 text-sm text-texto-suave">
                  <p>{superficie(tipo, idioma)}</p>
                  {etiquetaEnganche ? (
                    <p>
                      {etiquetaEnganche}: {enganche(tipo.precio)}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>

          {/* Tabla a partir de tableta */}
          <table className="mt-6 hidden w-full border-collapse text-left sm:table">
            <thead>
              <tr className="border-y border-borde">
                <th scope="col" className="etiqueta-dato py-4 pr-6 font-medium">
                  {t(UI.tabla.tipo, idioma)}
                </th>
                <th scope="col" className="etiqueta-dato py-4 pr-6 font-medium">
                  {t(UI.tabla.superficie, idioma)}
                </th>
                <th scope="col" className="etiqueta-dato py-4 pr-6 text-right font-medium">
                  {t(UI.tabla.precio, idioma)}
                </th>
                {etiquetaEnganche ? (
                  <th scope="col" className="etiqueta-dato py-4 text-right font-medium">
                    {etiquetaEnganche}
                  </th>
                ) : null}
              </tr>
            </thead>
            <tbody className="divide-y divide-borde">
              {zona.tipos.map((tipo) => (
                <tr key={tipo.nombre}>
                  <th scope="row" className="py-5 pr-6 font-normal text-texto">
                    {tipo.nombre}
                  </th>
                  <td className="py-5 pr-6 text-sm text-texto-suave">{superficie(tipo, idioma)}</td>
                  <td className="cifra py-5 pr-6 text-right text-xl text-acento">
                    {formatoMoneda(tipo.precio, moneda, idioma)}
                  </td>
                  {etiquetaEnganche ? (
                    <td className="py-5 text-right text-sm text-texto-suave">{enganche(tipo.precio)}</td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </Revelar>
      ))}

      <p className="max-w-3xl border-t border-borde pt-6 text-xs leading-relaxed text-texto-suave/80">
        {t(lista.nota, idioma)}
      </p>
    </div>
  );
}
