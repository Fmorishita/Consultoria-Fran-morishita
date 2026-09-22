"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type CifraLista = {
  valor?: number;
  prefijo: string;
  sufijo: string;
  etiqueta: string;
  respaldo?: string;
};

function useConteo(objetivo: number | undefined, activo: boolean): number {
  const [valor, setValor] = useState(objetivo ?? 0);

  useEffect(() => {
    if (objetivo === undefined || !activo) return;
    const reducido =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // El valor inicial ya es el final: con reduced-motion no se anima nada.
    if (reducido) return;
    const duracion = 1100;
    const inicio = performance.now();
    let frame = 0;
    const paso = (ahora: number) => {
      const avance = Math.min((ahora - inicio) / duracion, 1);
      const suave = 1 - Math.pow(1 - avance, 3);
      setValor(Math.round(objetivo * suave));
      if (avance < 1) frame = requestAnimationFrame(paso);
    };
    frame = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(frame);
  }, [objetivo, activo]);

  return valor;
}

function Cifra({
  cifra,
  activo,
  principal,
  columna,
  compacta,
}: {
  cifra: CifraLista;
  activo: boolean;
  principal: boolean;
  columna: boolean;
  /** Tres cifras en una columna angosta: talla menor y sin partir la cifra. */
  compacta: boolean;
}) {
  const valor = useConteo(cifra.valor, activo);
  return (
    <div
      className={cn(
        "border-t border-borde pt-6",
        !columna && (principal ? "sm:col-span-2 lg:col-span-6" : "lg:col-span-3"),
      )}
    >
      <p
        className={cn(
          "cifra text-acento",
          principal && "text-[clamp(3.5rem,12vw,7rem)]",
          !principal && (compacta ? "text-[clamp(2.2rem,3.2vw,2.5rem)] whitespace-nowrap" : "text-[clamp(2.5rem,6vw,3.5rem)]"),
        )}
      >
        {cifra.prefijo}
        {cifra.valor === undefined ? "-" : valor}
        {cifra.sufijo}
      </p>
      <p className={cn("mt-4 text-sm leading-relaxed text-texto-suave", principal && "max-w-sm text-base")}>
        {cifra.etiqueta}
      </p>
      {cifra.respaldo ? <p className="mt-3 text-xs leading-relaxed text-texto-suave/70">{cifra.respaldo}</p> : null}
    </div>
  );
}

/**
 * Composición asimétrica: la cifra que respalda el video manda sobre las otras.
 * En `columna` van en línea, tantas columnas como cifras, para cuando viven
 * junto al video.
 */
export function TrackRecord({ cifras, columna = false }: { cifras: CifraLista[]; columna?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [activo, setActivo] = useState(false);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo || typeof IntersectionObserver === "undefined") {
      queueMicrotask(() => setActivo(true));
      return;
    }
    const observador = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          setActivo(true);
          observador.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "grid gap-10",
        columna
          ? cn("w-full gap-8 sm:gap-x-8", cifras.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2")
          : "sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-12",
      )}
    >
      {cifras.map((cifra, indice) => (
        <Cifra
          key={indice}
          cifra={cifra}
          activo={activo}
          principal={!columna && indice === 0}
          columna={columna}
          compacta={columna && cifras.length >= 3}
        />
      ))}
    </div>
  );
}
