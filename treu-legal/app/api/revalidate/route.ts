import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { TAGS } from '@/lib/wordpress';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Revalidación on-demand de los Insights.
 *
 * Protegida con REVALIDATE_SECRET. Está pensada para conectarse a un webhook
 * de publicación de WordPress (ver docs/ENTREGA.md): al publicar un artículo,
 * WordPress llama a esta ruta y el artículo aparece sin esperar los 15 minutos
 * del ISR.
 *
 *   POST /api/revalidate?secret=...&path=/2026/09/17/mi-articulo/
 */
export async function POST(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret') ?? request.headers.get('x-revalidate-secret');
  const expected = process.env.REVALIDATE_SECRET;

  if (!expected) {
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }
  if (secret !== expected) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  // El segundo argumento fija la caducidad inmediata del contenido etiquetado.
  revalidateTag(TAGS.posts, { expire: 0 });
  revalidateTag(TAGS.categories, { expire: 0 });
  revalidatePath('/');
  revalidatePath('/insights');

  const path = url.searchParams.get('path');
  if (path?.startsWith('/')) revalidatePath(path);

  return NextResponse.json({ ok: true, revalidated: [TAGS.posts, TAGS.categories, '/', '/insights', path].filter(Boolean) });
}
