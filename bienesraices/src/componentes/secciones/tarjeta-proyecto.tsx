import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatoMoneda, formatoSuperficie } from "@/lib/formato";
import { t, type Idioma } from "@/lib/i18n";
import { rutas } from "@/lib/navegacion";
import { numero, texto } from "@/lib/pendiente";
import type { Proyecto } from "@contenido/esquemas";
import { UI } from "@contenido/ui";

export function TarjetaProyecto({ proyecto, idioma }: { proyecto: Proyecto; idioma: Idioma }) {
  const r = rutas(idioma);
  const imagen = texto(proyecto.hero.imagen, idioma);
  const precio = proyecto.autorizado ? numero(proyecto.inventario.precioDesde) : undefined;
  const superficieMin = numero(proyecto.inventario.superficieMin);

  return (
    <Link
      href={r.propiedad(proyecto.slug)}
      className="group flex flex-col border border-borde bg-superficie transition-colors hover:border-acento"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-superficie-alta">
        {imagen ? (
          <Image
            src={imagen}
            alt={t(proyecto.hero.titulo, idioma)}
            fill
            sizes="(max-width: 768px) 100vw, 480px"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-end p-6">
            <span className="titular titular-md text-texto-suave/50">{proyecto.nombre}</span>
          </div>
        )}
        <span className="absolute left-4 top-4 bg-fondo/85 px-3 py-1 text-xs tracking-wide text-texto">
          {t(UI.estados[proyecto.estado], idioma)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="antetitulo">{proyecto.ciudad}</p>
        <h3 className="titular titular-sm mt-3 flex items-center gap-2">
          {proyecto.nombre}
          <ArrowUpRight aria-hidden className="size-4 text-acento transition-transform group-hover:translate-x-1" />
        </h3>
        <p className="mt-2 text-sm text-texto-suave">
          {t(UI.tipos[proyecto.tipo], idioma)}
          {superficieMin ? ` · ${t(UI.etiquetas.desde, idioma)} ${formatoSuperficie(superficieMin, idioma)}` : ""}
        </p>

        <div className="mt-auto pt-6">
          <p className="titular titular-sm text-acento">
            {precio
              ? `${t(UI.etiquetas.desde, idioma)} ${formatoMoneda(precio, proyecto.inventario.moneda, idioma)}`
              : t(UI.etiquetas.consultarPrecio, idioma)}
          </p>
        </div>
      </div>
    </Link>
  );
}
