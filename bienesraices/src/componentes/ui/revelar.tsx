"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Fade-up al entrar en viewport. Se desactiva con prefers-reduced-motion (CSS). */
export function Revelar({
  children,
  className,
  retraso = 0,
  como: Como = "div",
}: {
  children: ReactNode;
  className?: string;
  retraso?: number;
  como?: ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;
    if (typeof IntersectionObserver === "undefined") {
      queueMicrotask(() => setVisible(true));
      return;
    }
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            setVisible(true);
            observador.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  return (
    <Como
      ref={ref}
      data-visible={visible ? "true" : "false"}
      style={retraso ? { transitionDelay: `${retraso}ms` } : undefined}
      className={cn("revelar", className)}
    >
      {children}
    </Como>
  );
}
