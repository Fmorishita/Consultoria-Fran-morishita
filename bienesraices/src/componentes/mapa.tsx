import Image from "next/image";
import { MapPin } from "lucide-react";
import { Boton } from "@/componentes/ui/boton";

export type PropsMapa = {
  direccion?: string;
  coords?: readonly [number, number];
  imagen?: string;
  etiquetaBoton: string;
  etiquetaDireccion: string;
  alt: string;
};

/**
 * Estático por defecto: ningún SDK de mapas en el primer render.
 * Sin imagen de mapa no se pinta un recuadro vacío, sino la dirección en
 * registro editorial, que es lo que el comprador copia o lleva al coche.
 */
export function Mapa({ direccion, coords, imagen, etiquetaBoton, etiquetaDireccion, alt }: PropsMapa) {
  const consulta = coords ? `${coords[0]},${coords[1]}` : direccion;
  if (!consulta) return null;
  const enlace = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(consulta)}`;

  if (imagen) {
    return (
      <div className="overflow-hidden border border-borde bg-superficie">
        <div className="relative aspect-video w-full bg-superficie-alta">
          <Image src={imagen} alt={alt} fill sizes="(max-width: 768px) 100vw, 600px" className="object-cover" />
        </div>
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          {direccion ? <p className="text-sm text-texto-suave">{direccion}</p> : <span />}
          <Boton asChild variante="secundario" tamano="sm">
            <a href={enlace} target="_blank" rel="noopener noreferrer">
              {etiquetaBoton}
            </a>
          </Boton>
        </div>
      </div>
    );
  }

  return (
    <div className="border-y border-borde py-8">
      <p className="etiqueta-dato flex items-center gap-3">
        <MapPin aria-hidden className="size-4 text-acento" strokeWidth={1.5} />
        {etiquetaDireccion}
      </p>
      {direccion ? <p className="titular titular-sm mt-5 max-w-sm">{direccion}</p> : null}
      <div className="mt-8">
        <Boton asChild variante="secundario">
          <a href={enlace} target="_blank" rel="noopener noreferrer">
            {etiquetaBoton}
          </a>
        </Boton>
      </div>
    </div>
  );
}
