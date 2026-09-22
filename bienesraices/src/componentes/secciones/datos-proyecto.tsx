import { formatoMoneda, formatoSuperficie } from "@/lib/formato";
import { t, type Idioma } from "@/lib/i18n";
import { numero } from "@/lib/pendiente";
import type { Proyecto } from "@contenido/esquemas";
import { UI } from "@contenido/ui";

/**
 * Ficha de datos duros, en lista de filetes. Mientras el precio no esté
 * confirmado y autorizado se dice "a consultar": nunca se inventa una cifra
 * ni se deja el renglón vacío.
 */
export function DatosProyecto({ proyecto, idioma }: { proyecto: Proyecto; idioma: Idioma }) {
  const { inventario } = proyecto;
  const superficieMin = numero(inventario.superficieMin);
  const superficieMax = numero(inventario.superficieMax);
  const precio = proyecto.autorizado ? numero(inventario.precioDesde) : undefined;

  const superficie =
    superficieMin && superficieMax
      ? `${formatoSuperficie(superficieMin, idioma)} ${t(UI.etiquetas.rango, idioma)} ${formatoSuperficie(superficieMax, idioma)}`
      : superficieMin
        ? `${t(UI.etiquetas.desde, idioma)} ${formatoSuperficie(superficieMin, idioma)}`
        : undefined;

  const filas = [
    { etiqueta: t(UI.secciones.inventario, idioma), valor: t(inventario.etiqueta, idioma) },
    { etiqueta: t(UI.etiquetas.superficie, idioma), valor: superficie },
    { etiqueta: t(UI.etiquetas.estado, idioma), valor: t(UI.estados[proyecto.estado], idioma) },
    {
      etiqueta: t(UI.etiquetas.desde, idioma),
      valor: precio
        ? formatoMoneda(precio, inventario.moneda, idioma)
        : t(UI.etiquetas.consultarPrecio, idioma),
    },
  ].filter((fila): fila is { etiqueta: string; valor: string } => Boolean(fila.valor));

  return (
    <dl className="divide-y divide-borde border-y border-borde">
      {filas.map((fila) => (
        <div key={fila.etiqueta} className="flex items-baseline justify-between gap-6 py-5">
          <dt className="etiqueta-dato">{fila.etiqueta}</dt>
          <dd className="titular titular-sm text-right">{fila.valor}</dd>
        </div>
      ))}
    </dl>
  );
}
