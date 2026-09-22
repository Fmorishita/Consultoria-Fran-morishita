"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { alertar } from "@/lib/alertas";
import { enviarEventoCapi } from "@/lib/capi";
import { supabase, TABLA_LEADS } from "@/lib/supabase";
import { CLAVES_ATRIBUCION, type Atribucion } from "@/lib/atribucion";
import type { EstadoLead } from "@/acciones/estado-lead";

// Este archivo solo puede exportar funciones async ("use server"). El tipo y
// el estado inicial viven en estado-lead.ts.

const esquema = z.object({
  nombre: z.string().trim().min(2).max(120),
  telefono: z
    .string()
    .trim()
    .transform((v) => v.replace(/[^\d+]/g, ""))
    .refine((v) => v.replace(/\D/g, "").length >= 10, "telefono"),
  email: z.string().trim().email().max(160),
  interes: z.string().trim().max(60).default("otro"),
  mensaje: z.string().trim().max(1500).optional(),
  consentimiento: z.literal("on"),
});

/** Rate limit simple por IP. Suficiente para frenar bots de formulario. */
const INTENTOS = new Map<string, number[]>();
const VENTANA_MS = 10 * 60 * 1000;
const MAX_INTENTOS = 4;

function demasiadosIntentos(ip: string): boolean {
  const ahora = Date.now();
  const previos = (INTENTOS.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  previos.push(ahora);
  INTENTOS.set(ip, previos);
  return previos.length > MAX_INTENTOS;
}

function leeAtribucion(crudo: FormDataEntryValue | null): Atribucion {
  if (typeof crudo !== "string" || !crudo) return {};
  try {
    const datos: unknown = JSON.parse(crudo);
    if (typeof datos !== "object" || datos === null) return {};
    const limpia: Atribucion = {};
    for (const clave of CLAVES_ATRIBUCION) {
      const valor = (datos as Record<string, unknown>)[clave];
      if (typeof valor === "string") limpia[clave] = valor.slice(0, 200);
    }
    const primer = (datos as Record<string, unknown>).primer_contacto;
    if (typeof primer === "string") limpia.primer_contacto = primer;
    const landing = (datos as Record<string, unknown>).landing;
    if (typeof landing === "string") limpia.landing = landing;
    return limpia;
  } catch {
    return {};
  }
}

export async function enviarLead(_previo: EstadoLead, datos: FormData): Promise<EstadoLead> {
  // Honeypot: los bots sí lo llenan.
  if ((datos.get("empresa") as string)?.length) return { ok: true, destino: "lead" };

  const cabeceras = await headers();
  const ip = (cabeceras.get("x-forwarded-for") ?? "").split(",")[0]?.trim() || "desconocida";
  if (demasiadosIntentos(ip)) return { ok: false, errores: { general: true } };

  const analisis = esquema.safeParse({
    nombre: datos.get("nombre") ?? "",
    telefono: datos.get("telefono") ?? "",
    email: datos.get("email") ?? "",
    interes: datos.get("interes") ?? "otro",
    mensaje: datos.get("mensaje") ?? undefined,
    consentimiento: datos.get("consentimiento") ?? "",
  });

  if (!analisis.success) {
    const errores: EstadoLead["errores"] = {};
    for (const asunto of analisis.error.issues) {
      const campo = String(asunto.path[0]);
      if (campo === "nombre" || campo === "telefono" || campo === "email" || campo === "consentimiento") {
        errores[campo] = true;
      }
    }
    return { ok: false, errores: Object.keys(errores).length ? errores : { general: true } };
  }

  const lead = analisis.data;
  const atribucion = leeAtribucion(datos.get("atribucion"));
  const proyectoSlug = (datos.get("proyecto_slug") as string) || null;
  const tipo = (datos.get("tipo") as string) || "lead";
  const eventId = (datos.get("event_id") as string) || crypto.randomUUID();
  const idioma = (datos.get("idioma") as string) || "es";

  const registro = {
    nombre: lead.nombre,
    telefono: lead.telefono,
    email: lead.email,
    interes: lead.interes,
    mensaje: lead.mensaje ?? null,
    proyecto_slug: proyectoSlug,
    idioma,
    origen: tipo,
    event_id: eventId,
    utm_source: atribucion.utm_source ?? null,
    utm_medium: atribucion.utm_medium ?? null,
    utm_campaign: atribucion.utm_campaign ?? null,
    utm_content: atribucion.utm_content ?? null,
    utm_term: atribucion.utm_term ?? null,
    fbclid: atribucion.fbclid ?? null,
    gclid: atribucion.gclid ?? null,
    landing: atribucion.landing ?? null,
    primer_contacto: atribucion.primer_contacto ?? null,
  };

  // Nada de lo que sigue puede tirar el envío: si falla, el usuario ve éxito
  // y la alerta sale por otro lado.
  const cliente = supabase();
  if (cliente) {
    const { error } = await cliente.from(TABLA_LEADS).insert(registro);
    if (error) await alertar("No se pudo guardar el lead en Supabase", { error: error.message, registro });
  } else {
    await alertar("Supabase sin configurar: lead solo en logs", registro);
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const respuesta = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...registro, timestamp: new Date().toISOString() }),
      });
      if (!respuesta.ok) await alertar(`Webhook de leads respondió ${respuesta.status}`, registro);
    } catch (error) {
      await alertar("Webhook de leads inalcanzable", { error, registro });
    }
  }

  await enviarEventoCapi({
    evento: "Lead",
    eventId,
    url: cabeceras.get("referer") ?? "",
    datos: { content_name: proyectoSlug ?? tipo, interes: lead.interes },
    atribucion,
    ip: ip === "desconocida" ? undefined : ip,
    userAgent: cabeceras.get("user-agent") ?? undefined,
    email: lead.email,
    telefono: lead.telefono,
  });

  return { ok: true, destino: tipo };
}
