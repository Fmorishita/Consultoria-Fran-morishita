"use client";

import { useSyncExternalStore } from "react";

function suscribirScroll(alCambiar: () => void) {
  window.addEventListener("scroll", alCambiar, { passive: true });
  return () => window.removeEventListener("scroll", alCambiar);
}

/** true cuando la página lleva más de `umbral` px de scroll. */
export function useScrollPasado(umbral: number): boolean {
  return useSyncExternalStore(
    suscribirScroll,
    () => window.scrollY > umbral,
    () => false,
  );
}
