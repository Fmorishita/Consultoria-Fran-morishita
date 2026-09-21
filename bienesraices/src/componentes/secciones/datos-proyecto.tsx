import { ChipPendiente } from "@/componentes/ui/chip-pendiente";
import { formatoMoneda, formatoSuperficie } from "@/lib/formato";
import { t, type Idioma } from "@/lib/i18n";
import { numero, queFalta } from "@/lib/pendiente";
import type { Proyecto } from "@contenido/esquemas";
import { UI } from "@contenido/ui";

/** Ficha de datos duros. Lo que no está autorizado, no se publica. */
export function DatosProyecto({ proyecto, idioma }: { proyecto: Proyecto; idioma: Idioma }) {
  const { inventario } = proyecto;
  const superficieMin = numero(inventario.superficieMin);
  const superficieMax = numero(inventario.superficieMax);
  const precio = proyecto.autorizado ? numero(inventario.precioDesde) : undefined;

  const superficie =
    superficieMin && superficieMax
      ? `${formatoSuperficie(superficieMin, idioma)} a ${formatoSuperficie(superficieMax, idioma)}`
      : superficieMin
        ? `${t(UI.etiquetas.desde, idioma)} ${formatoSuperficie(superficieMin, idioma)}`
        : undefined;

  return (
    <dl className="grid gap-8 border-t border-borde pt-8 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <dt className="antetitulo">{t(UI.secciones.inventario, idioma)}</dt>
        <dd className="titular titular-sm mt-3">{t(inventario.etiqueta, idioma)}</dd>
      </div>
      <div>
        <dt className="antetitulo">{t(UI.etiquetas.superficie, idioma)}</dt>
        <dd className="titular titular-sm mt-3">
          {superficie ?? <ChipPendiente>{queFalta(inventario.superficieMin)}</ChipPendiente>}
        </dd>
      </div>
      <div>
        <dt className="antetitulo">{t(UI.etiquetas.desde, idioma)}</dt>
        <dd className="titular titular-sm mt-3 text-acento-suave">
          {precio ? (
            formatoMoneda(precio, inventario.moneda, idioma)
          ) : (
            <ChipPendiente>{queFalta(inventario.precioDesde) ?? "precio pendiente de autorización"}</ChipPendiente>
          )}
        </dd>
      </div>
      <div>
        <dt className="antetitulo">{t(UI.etiquetas.estado, idioma)}</dt>
        <dd className="titular titular-sm mt-3">{t(UI.estados[proyecto.estado], idioma)}</dd>
      </div>
    </dl>
  );
}
