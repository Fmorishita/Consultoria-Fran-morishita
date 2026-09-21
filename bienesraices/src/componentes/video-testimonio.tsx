"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";

export type PropsVideoTestimonio = {
  video: string;
  poster?: string;
  nombre: string;
  cargo: string;
  empresa?: string;
  etiquetaReproducir: string;
  altPoster: string;
  prioridad?: boolean;
};

/**
 * Nunca monta el player en el primer render: primero el thumbnail,
 * el video (o el iframe del embed) se carga al hacer clic.
 */
export function VideoTestimonio({
  video,
  poster,
  nombre,
  cargo,
  empresa,
  etiquetaReproducir,
  altPoster,
  prioridad = false,
}: PropsVideoTestimonio) {
  const [activo, setActivo] = useState(false);
  const esArchivo = /\.(mp4|webm|mov)(\?|$)/i.test(video);

  return (
    <figure className="w-full">
      <div className="relative aspect-video w-full overflow-hidden rounded-xs border border-borde bg-superficie">
        {!activo ? (
          <button
            type="button"
            onClick={() => setActivo(true)}
            className="group absolute inset-0 h-full w-full cursor-pointer"
            aria-label={etiquetaReproducir}
          >
            {poster ? (
              <Image
                src={poster}
                alt={altPoster}
                fill
                sizes="(max-width: 768px) 100vw, 760px"
                priority={prioridad}
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            ) : (
              <span className="absolute inset-0 bg-superficie-alta" />
            )}
            <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/15" />
            <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-acento text-acento-contraste transition-transform duration-300 group-hover:scale-110 md:size-20">
              <Play aria-hidden className="size-7 translate-x-[2px] md:size-9" fill="currentColor" />
            </span>
          </button>
        ) : esArchivo ? (
          <video
            src={video}
            poster={poster}
            controls
            autoPlay
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
        ) : (
          <iframe
            src={`${video}${video.includes("?") ? "&" : "?"}autoplay=1`}
            title={`${nombre}, ${cargo}`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="h-full w-full"
          />
        )}
      </div>
      <figcaption className="mt-5">
        <p className="titular titular-sm">{nombre}</p>
        <p className="mt-1 text-sm text-texto-suave">{[cargo, empresa].filter(Boolean).join(" · ")}</p>
      </figcaption>
    </figure>
  );
}
