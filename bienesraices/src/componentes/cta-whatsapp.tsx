"use client";

import { useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";
import { Boton, estilosBoton } from "@/componentes/ui/boton";
import { leerAtribucion } from "@/lib/atribucion";
import { useScrollPasado } from "@/lib/hooks";
import { rastrear } from "@/lib/tracking";
import { enlaceWhatsApp } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export type PropsCtaWhatsApp = {
  numero: string;
  mensaje: string;
  etiqueta: string;
  keyword?: string;
  /** Slug del proyecto o de la página, para el evento Contact. */
  contexto?: string;
  variante?: "primario" | "secundario" | "fantasma";
  tamano?: "sm" | "md" | "lg";
  className?: string;
  conIcono?: boolean;
};

/**
 * Cuando carga el JS le escribimos al enlace los UTMs capturados, para que el
 * mensaje llegue con su origen. Sin JS el enlace sigue funcionando sin ellos.
 */
function useEnlaceConAtribucion(numero: string, mensaje: string, keyword?: string) {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;
    nodo.href = enlaceWhatsApp({ numero, mensaje, keyword, atribucion: leerAtribucion() });
  }, [numero, mensaje, keyword]);
  return ref;
}

export function CtaWhatsApp({
  numero,
  mensaje,
  etiqueta,
  keyword,
  contexto,
  variante = "primario",
  tamano = "md",
  className,
  conIcono = true,
}: PropsCtaWhatsApp) {
  const ref = useEnlaceConAtribucion(numero, mensaje, keyword);

  return (
    <Boton asChild variante={variante} tamano={tamano} className={className}>
      <a
        ref={ref}
        href={enlaceWhatsApp({ numero, mensaje, keyword })}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => rastrear("Contact", { content_name: contexto ?? keyword ?? "general", metodo: "whatsapp" })}
      >
        {conIcono ? <MessageCircle aria-hidden className="size-[1.1em]" /> : null}
        {etiqueta}
      </a>
    </Boton>
  );
}

/** Variante flotante para móvil: pequeña, abajo a la derecha, no tapa el texto. */
export function CtaWhatsAppFlotante({ numero, mensaje, etiqueta, keyword, contexto }: PropsCtaWhatsApp) {
  const ref = useEnlaceConAtribucion(numero, mensaje, keyword);
  const visible = useScrollPasado(600);

  return (
    <a
      ref={ref}
      href={enlaceWhatsApp({ numero, mensaje, keyword })}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={etiqueta}
      aria-hidden={!visible}
      onClick={() => rastrear("Contact", { content_name: contexto ?? keyword ?? "general", metodo: "whatsapp_flotante" })}
      className={cn(
        estilosBoton({ variante: "primario", tamano: "sm" }),
        "fixed right-4 z-40 shadow-lg shadow-black/30 transition-all duration-300 md:hidden",
        "bottom-[max(1rem,env(safe-area-inset-bottom))]",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <MessageCircle aria-hidden className="size-[1.1em]" />
      {etiqueta}
    </a>
  );
}
