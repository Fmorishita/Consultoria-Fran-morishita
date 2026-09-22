import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatoMoneda, formatoSuperficie } from "@/lib/formato";
import { t, type Idioma } from "@/lib/i18n";
import { rutas } from "@/lib/navegacion";
import { numero, texto } from "@/lib/pendiente";
import type { Proyecto } from "@contenido/esquemas";
import { UI } from "@contenido/ui";

/**
 * Tarjeta de inventario. Con fotografía, la foto manda. Sin fotografía, la
 * portada es una lámina topográfica con el nombre del desarrollo, que se lee
 * como portada de folleto y no como un hueco donde faltó la imagen. Debajo,
 * en las dos, los tres datos que un comprador compara primero.
 */
export function TarjetaProyecto({ proyecto, idioma }: { proyecto: Proyecto; idioma: Idioma }) {
  const r = rutas(idioma);
  const imagen = texto(proyecto.hero.imagen, idioma);
  const precio = proyecto.autorizado ? numero(proyecto.inventario.precioDesde) : undefined;
  const superficieMin = numero(proyecto.inventario.superficieMin);
  // La ciudad sale del contenido ("Ensenada, Baja California" -> "Ensenada").
  const lugar = [proyecto.ubicacion.zona, proyecto.ciudad.split(",")[0]].filter(Boolean).join(" · ");

  const datos = [
    { etiqueta: t(UI.etiquetas.tipo, idioma), valor: t(proyecto.inventario.etiqueta, idioma) },
    {
      etiqueta: t(UI.etiquetas.superficie, idioma),
      valor: superficieMin ? `${t(UI.etiquetas.desde, idioma)} ${formatoSuperficie(superficieMin, idioma)}` : undefined,
    },
  ].filter((dato): dato is { etiqueta: string; valor: string } => Boolean(dato.valor));

  return (
    <Link
      href={r.propiedad(proyecto.slug)}
      className="group flex h-full flex-col border border-borde bg-superficie transition-colors hover:border-acento"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden">
        {imagen ? (
          <Image
            src={imagen}
            alt={t(proyecto.hero.titulo, idioma)}
            fill
            sizes="(max-width: 768px) 100vw, 480px"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="topografia flex h-full w-full flex-col justify-end p-6">
            <h3 className="titular text-[clamp(2rem,4vw,2.6rem)] leading-[1.02] text-texto">{proyecto.nombre}</h3>
            <span className="mt-3 text-sm text-texto-suave">{t(proyecto.hero.subtitulo, idioma)}</span>
          </div>
        )}
        <span className="absolute left-4 top-4 border border-borde bg-fondo/90 px-3 py-1 text-xs tracking-wide text-texto">
          {t(UI.estados[proyecto.estado], idioma)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        {/* Sin foto, el nombre ya está en la portada: aquí no se repite. */}
        {imagen ? (
          <>
            <p className="etiqueta-dato">{lugar}</p>
            <h3 className="titular titular-sm mt-3 flex items-center gap-2">
              {proyecto.nombre}
              <ArrowUpRight aria-hidden className="size-4 text-acento transition-transform group-hover:translate-x-1" />
            </h3>
          </>
        ) : (
          <p className="etiqueta-dato flex items-center justify-between gap-3">
            {lugar}
            <ArrowUpRight aria-hidden className="size-4 text-acento transition-transform group-hover:translate-x-1" />
          </p>
        )}

        <dl className="mt-5 space-y-2 border-t border-borde pt-5 text-sm">
          {datos.map((dato) => (
            <div key={dato.etiqueta} className="flex items-baseline justify-between gap-4">
              <dt className="text-texto-suave">{dato.etiqueta}</dt>
              <dd className="text-right text-texto">{dato.valor}</dd>
            </div>
          ))}
        </dl>

        <p className="cifra mt-auto pt-6 text-2xl text-acento">
          {precio
            ? `${t(UI.etiquetas.desde, idioma)} ${formatoMoneda(precio, proyecto.inventario.moneda, idioma)}`
            : t(UI.etiquetas.consultarPrecio, idioma)}
        </p>
      </div>
    </Link>
  );
}
