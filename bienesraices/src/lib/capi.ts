import "server-only";
import { createHash } from "node:crypto";
import type { Atribucion } from "@/lib/atribucion";

const VERSION_API = "v21.0";

export type EventoCapi = {
  evento: "ViewContent" | "Lead" | "Contact";
  eventId: string;
  url: string;
  datos?: Record<string, string | number | undefined>;
  atribucion?: Atribucion;
  ip?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
  email?: string;
  telefono?: string;
};

function hash(valor: string | undefined): string | undefined {
  if (!valor) return undefined;
  const normalizado = valor.trim().toLowerCase().replace(/\s+/g, "");
  if (!normalizado) return undefined;
  return createHash("sha256").update(normalizado).digest("hex");
}

/**
 * Envía el evento server-side compartiendo `event_id` con el píxel del
 * navegador para que Meta deduplique. Si faltan llaves, no hace nada.
 */
export async function enviarEventoCapi(evento: EventoCapi): Promise<boolean> {
  const pixelId = process.env.META_PIXEL_ID ?? process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixelId || !token) return false;

  const telefonoLimpio = evento.telefono?.replace(/\D/g, "");
  const cuerpo = {
    data: [
      {
        event_name: evento.evento,
        event_time: Math.floor(Date.now() / 1000),
        event_id: evento.eventId,
        event_source_url: evento.url,
        action_source: "website",
        user_data: {
          client_ip_address: evento.ip,
          client_user_agent: evento.userAgent,
          fbp: evento.fbp,
          fbc: evento.fbc ?? (evento.atribucion?.fbclid ? `fb.1.${Date.now()}.${evento.atribucion.fbclid}` : undefined),
          em: hash(evento.email),
          ph: hash(telefonoLimpio ? `52${telefonoLimpio.slice(-10)}` : undefined),
        },
        custom_data: {
          ...evento.datos,
          utm_source: evento.atribucion?.utm_source,
          utm_campaign: evento.atribucion?.utm_campaign,
          utm_content: evento.atribucion?.utm_content,
        },
      },
    ],
    ...(process.env.META_TEST_EVENT_CODE ? { test_event_code: process.env.META_TEST_EVENT_CODE } : {}),
  };

  try {
    const respuesta = await fetch(`https://graph.facebook.com/${VERSION_API}/${pixelId}/events?access_token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cuerpo),
    });
    return respuesta.ok;
  } catch {
    return false;
  }
}
