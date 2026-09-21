"use client";

import { leerAtribucion } from "@/lib/atribucion";

export type EventoEstandar = "ViewContent" | "Lead" | "Contact";
export type EventoPersonalizado = "calculadora_usada";
export type NombreEvento = EventoEstandar | EventoPersonalizado;

type DatosEvento = Record<string, string | number | undefined>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const ESTANDAR: readonly string[] = ["ViewContent", "Lead", "Contact"];

export function nuevoEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `ev-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Un solo evento por acción: píxel en cliente + CAPI en servidor,
 * compartiendo `event_id` para que Meta lo deduplique.
 */
export function rastrear(nombre: NombreEvento, datos: DatosEvento = {}, eventId = nuevoEventId()): string {
  if (typeof window === "undefined") return eventId;
  const limpios = Object.fromEntries(Object.entries(datos).filter(([, v]) => v !== undefined));

  if (typeof window.fbq === "function") {
    const metodo = ESTANDAR.includes(nombre) ? "track" : "trackCustom";
    window.fbq(metodo, nombre, limpios, { eventID: eventId });
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", nombre, { ...limpios, event_id: eventId });
  }

  if (ESTANDAR.includes(nombre)) {
    void enviarCapi(nombre as EventoEstandar, limpios, eventId);
  }

  return eventId;
}

async function enviarCapi(nombre: EventoEstandar, datos: DatosEvento, eventId: string) {
  try {
    await fetch("/api/capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        evento: nombre,
        event_id: eventId,
        url: window.location.href,
        datos,
        atribucion: leerAtribucion(),
      }),
    });
  } catch {
    /* El píxel de cliente ya salió; no rompemos la navegación por esto. */
  }
}
