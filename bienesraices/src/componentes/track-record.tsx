"use client";

import { useEffect, useRef, useState } from "react";

export type CifraLista = {
  valor?: number;
  prefijo: string;
  sufijo: string;
  etiqueta: string;
  respaldo?: string;
  pendiente?: string;
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

function Cifra({ cifra, activo }: { cifra: CifraLista; activo: boolean }) {
  const valor = useConteo(cifra.valor, activo);
  return (
    <div className="border-t border-borde pt-6">
      <p className="titular text-[clamp(2.5rem,7vw,4rem)] text-acento-suave">
        {cifra.prefijo}
        {cifra.valor === undefined ? "—" : valor}
        {cifra.sufijo}
      </p>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-texto-suave">{cifra.etiqueta}</p>
      {cifra.respaldo ? <p className="mt-2 max-w-xs text-xs text-texto-suave/70">{cifra.respaldo}</p> : null}
    </div>
  );
}

/** Tira de cifras con conteo discreto. Los datos vienen de content/track-record.ts */
export function TrackRecord({ cifras }: { cifras: CifraLista[] }) {
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
    <div ref={ref} className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {cifras.map((cifra, indice) => (
        <Cifra key={indice} cifra={cifra} activo={activo} />
      ))}
    </div>
  );
}
