import { NextResponse } from "next/server";
import { enviarEventoCapi } from "@/lib/capi";
import type { Atribucion } from "@/lib/atribucion";

type Cuerpo = {
  evento?: "ViewContent" | "Lead" | "Contact";
  event_id?: string;
  url?: string;
  datos?: Record<string, string | number | undefined>;
  atribucion?: Atribucion;
};

const PERMITIDOS = new Set(["ViewContent", "Lead", "Contact"]);

/** Mitad servidor del par píxel/CAPI: mismo event_id, Meta deduplica. */
export async function POST(peticion: Request) {
  let cuerpo: Cuerpo;
  try {
    cuerpo = (await peticion.json()) as Cuerpo;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!cuerpo.evento || !PERMITIDOS.has(cuerpo.evento) || !cuerpo.event_id) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const cookies = peticion.headers.get("cookie") ?? "";
  const lee = (nombre: string) => cookies.split("; ").find((c) => c.startsWith(`${nombre}=`))?.split("=")[1];

  const enviado = await enviarEventoCapi({
    evento: cuerpo.evento,
    eventId: cuerpo.event_id,
    url: cuerpo.url ?? peticion.headers.get("referer") ?? "",
    datos: cuerpo.datos,
    atribucion: cuerpo.atribucion,
    ip: (peticion.headers.get("x-forwarded-for") ?? "").split(",")[0]?.trim() || undefined,
    userAgent: peticion.headers.get("user-agent") ?? undefined,
    fbp: lee("_fbp"),
    fbc: lee("_fbc"),
  });

  return NextResponse.json({ ok: enviado });
}
