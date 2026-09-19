import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/contact-schema';
import { SOLICITUDES_TABLE, getSupabase } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Recepción del formulario.
 *
 * 1. Valida con zod y descarta los envíos que llenaron el honeypot.
 * 2. Guarda la solicitud en Supabase.
 * 3. Notifica por correo si hay proveedor configurado.
 *
 * En preview, CONTACT_TO debe apuntar a una dirección de prueba: nunca al
 * despacho. Si el guardado falla, se responde con error para que la interfaz
 * ofrezca WhatsApp, teléfono y correo sin que el usuario pierda lo escrito.
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    const contentType = request.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) {
      payload = await request.json();
    } else {
      payload = Object.fromEntries(await request.formData());
    }
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_body' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: 'validation',
        fields: Object.fromEntries(
          parsed.error.issues.map((i) => [String(i.path[0] ?? '_'), i.message]),
        ),
      },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Honeypot: si viene relleno, se acepta en silencio sin guardar nada.
  if (data.referencia) return NextResponse.json({ ok: true });

  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: 'storage_unavailable' }, { status: 503 });
  }

  const { error } = await supabase.from(SOLICITUDES_TABLE).insert({
    nombre: data.nombre,
    empresa: data.empresa,
    cargo: data.cargo,
    correo: data.correo,
    telefono: data.telefono,
    asunto: data.asunto,
    descripcion: data.descripcion || null,
    origen: data.origen || null,
    consentimiento: data.consentimiento,
    consentimiento_texto: CONSENT_SNAPSHOT,
    user_agent: request.headers.get('user-agent')?.slice(0, 400) ?? null,
  });

  if (error) {
    console.error('supabase insert failed', error.message);
    return NextResponse.json({ ok: false, error: 'storage_failed' }, { status: 502 });
  }

  await notify(data).catch((e) => console.error('notify failed', e));

  return NextResponse.json({ ok: true });
}

/** Copia del texto de consentimiento aceptado, para el expediente. */
const CONSENT_SNAPSHOT =
  'He leído el Aviso y Política de Privacidad de Treu Legal & Business y consiento el tratamiento de mis datos personales para atender esta solicitud.';

/** Notificación por correo. Opcional: si no hay credenciales, no se envía. */
async function notify(data: {
  nombre: string;
  empresa: string;
  cargo: string;
  correo: string;
  telefono: string;
  asunto: string;
  descripcion: string;
  origen: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!apiKey || !to) return;

  const lines = [
    `Nombre: ${data.nombre}`,
    `Empresa: ${data.empresa}`,
    `Cargo: ${data.cargo}`,
    `Correo: ${data.correo}`,
    `Teléfono: ${data.telefono}`,
    `Área del asunto: ${data.asunto}`,
    data.descripcion ? `Descripción: ${data.descripcion}` : null,
    data.origen ? `Enviado desde: ${data.origen}` : null,
  ].filter(Boolean);

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Solicitudes <onboarding@resend.dev>',
      to: [to],
      reply_to: data.correo,
      subject: `Solicitud de sesión — ${data.empresa}`,
      text: lines.join('\n'),
    }),
  });
}
