import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Boton } from "@/componentes/ui/boton";
import { Revelar } from "@/componentes/ui/revelar";
import { Seccion } from "@/componentes/ui/seccion";
import { formatoMoneda, formatoSuperficie } from "@/lib/formato";
import { t, type Idioma } from "@/lib/i18n";
import { icono } from "@/lib/iconos";
import { rutas } from "@/lib/navegacion";
import { numero } from "@/lib/pendiente";
import type { Proyecto } from "@contenido/esquemas";
import { INICIO } from "@contenido/paginas/inicio";
import { UI } from "@contenido/ui";

/**
 * El desarrollo que encabeza el sitio, en registro de ficha editorial:
 * nombre grande, argumento corto, lo que incluye el fraccionamiento y una
 * sola salida hacia la ficha completa.
 */
export function PropiedadDestacada({ proyecto, idioma }: { proyecto: Proyecto; idioma: Idioma }) {
  const r = rutas(idioma);
  const precio = numero(proyecto.inventario.precioDesde);
  const superficieMin = numero(proyecto.inventario.superficieMin);
  const superficieMax = numero(proyecto.inventario.superficieMax);
  const galeria = proyecto.galeria.slice(0, 2);

  const datos = [
    { etiqueta: t(UI.etiquetas.tipo, idioma), valor: t(proyecto.inventario.etiqueta, idioma) },
    {
      etiqueta: t(UI.etiquetas.superficie, idioma),
      valor:
        superficieMin && superficieMax
          ? `${superficieMin} ${t(UI.etiquetas.rango, idioma)} ${formatoSuperficie(superficieMax, idioma)}`
          : superficieMin
            ? formatoSuperficie(superficieMin, idioma)
            : undefined,
    },
    {
      etiqueta: t(UI.etiquetas.desde, idioma),
      valor: precio
        ? formatoMoneda(precio, proyecto.inventario.moneda, idioma)
        : t(UI.etiquetas.consultarPrecio, idioma),
    },
  ].filter((dato): dato is { etiqueta: string; valor: string } => Boolean(dato.valor));

  return (
    <Seccion>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <Revelar className="lg:pt-6">
          <p className="antetitulo mb-6">{t(INICIO.destacado.antetitulo, idioma)}</p>
          <h2 className="titular titular-lg">{t(INICIO.destacado.titulo, idioma)}</h2>
          <p className="mt-3 text-sm text-texto-suave">{proyecto.ubicacion.direccion}</p>
          <p className="cuerpo mt-7 max-w-md">{t(INICIO.destacado.texto, idioma)}</p>

          <dl className="mt-10 divide-y divide-borde border-y border-borde">
            {datos.map((dato) => (
              <div key={dato.etiqueta} className="flex items-baseline justify-between gap-6 py-4">
                <dt className="etiqueta-dato">{dato.etiqueta}</dt>
                <dd className="titular titular-sm text-right">{dato.valor}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <Boton asChild tamano="lg">
              <Link href={r.propiedad(proyecto.slug)}>
                {t(UI.cta.conocerDesarrollo, idioma)}
                <ArrowUpRight aria-hidden className="size-[1.1em]" />
              </Link>
            </Boton>
          </div>
        </Revelar>

        <div className="flex flex-col gap-6">
          {galeria.length > 0 ? (
            <Revelar retraso={80} className="grid gap-4 sm:grid-cols-2">
              {galeria.map((imagen, indice) => (
                <div
                  key={imagen.src}
                  className={`relative overflow-hidden border border-borde bg-superficie ${
                    indice === 0 ? "aspect-4/5 sm:col-span-1" : "aspect-4/5"
                  }`}
                >
                  <Image
                    src={imagen.src}
                    alt={t(imagen.alt, idioma)}
                    fill
                    sizes="(max-width: 640px) 100vw, 320px"
                    className="object-cover"
                  />
                </div>
              ))}
            </Revelar>
          ) : null}

          {proyecto.amenidades.length > 0 ? (
            <Revelar retraso={140} className="border-t border-borde pt-8">
              <p className="etiqueta-dato">{t(UI.secciones.amenidades, idioma)}</p>
              <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {proyecto.amenidades.map((amenidad) => {
                  const Icono = icono(amenidad.icono);
                  return (
                    <li key={amenidad.texto.es} className="flex items-start gap-3 text-sm leading-relaxed text-texto-suave">
                      <Icono aria-hidden className="mt-0.5 size-4 flex-none text-acento" strokeWidth={1.5} />
                      {t(amenidad.texto, idioma)}
                    </li>
                  );
                })}
              </ul>
            </Revelar>
          ) : null}
        </div>
      </div>
    </Seccion>
  );
}
