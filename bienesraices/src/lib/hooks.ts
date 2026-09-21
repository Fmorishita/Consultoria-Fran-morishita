"use client";

import { useEffect, useState } from "react";

/**
 * ¿Ya se scrolleó más de `umbral` píxeles?
 * Con IntersectionObserver sobre un centinela, no con un listener de scroll:
 * el listener corre en cada frame y castiga el móvil.
 */
export function usePasoElUmbral(umbral: number): boolean {
  const [pasado, setPasado] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const centinela = document.createElement("div");
    centinela.setAttribute("aria-hidden", "true");
    centinela.style.cssText = `position:absolute;top:${umbral}px;left:0;width:1px;height:1px;pointer-events:none;`;
    document.body.appendChild(centinela);

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) setPasado(!entrada.isIntersecting);
      },
      { threshold: 0 },
    );
    observador.observe(centinela);

    return () => {
      observador.disconnect();
      centinela.remove();
    };
  }, [umbral]);

  return pasado;
}
