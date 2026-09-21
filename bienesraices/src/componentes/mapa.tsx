import Image from "next/image";
import { MapPin } from "lucide-react";
import { Boton } from "@/componentes/ui/boton";

export type PropsMapa = {
  direccion?: string;
  coords?: readonly [number, number];
  imagen?: string;
  etiquetaBoton: string;
  alt: string;
};

/** Estático por defecto: ningún SDK de mapas en el primer render. */
export function Mapa({ direccion, coords, imagen, etiquetaBoton, alt }: PropsMapa) {
  const consulta = coords ? `${coords[0]},${coords[1]}` : direccion;
  if (!consulta) return null;
  const enlace = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(consulta)}`;

  return (
    <div className="overflow-hidden border border-borde bg-superficie">
      <div className="relative aspect-[16/9] w-full bg-superficie-alta">
        {imagen ? (
          <Image src={imagen} alt={alt} fill sizes="(max-width: 768px) 100vw, 600px" className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <MapPin aria-hidden className="size-10 text-acento-suave" />
          </div>
        )}
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
