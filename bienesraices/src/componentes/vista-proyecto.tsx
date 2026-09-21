"use client";

import { useEffect, useRef } from "react";
import { rastrear } from "@/lib/tracking";

/** Dispara ViewContent una vez por vista de proyecto (píxel + CAPI). */
export function VistaProyecto({ slug, nombre }: { slug: string; nombre: string }) {
  const disparado = useRef(false);
  useEffect(() => {
    if (disparado.current) return;
    disparado.current = true;
    rastrear("ViewContent", { content_ids: slug, content_name: nombre, content_type: "product" });
  }, [slug, nombre]);
  return null;
}
