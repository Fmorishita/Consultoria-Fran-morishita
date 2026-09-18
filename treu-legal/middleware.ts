import { NextResponse, type NextRequest } from 'next/server';

/**
 * Guardián de la forma de las URLs de artículo.
 *
 * La ruta de los artículos es `/AAAA/MM/DD/slug/`, y en Next.js un segmento
 * dinámico no admite patrón. Sin este guardián, cualquier URL de cuatro
 * segmentos (`/a/b/c/d/`) entra en la plantilla de artículo y acaba en un
 * `notFound()` servido bajo demanda, que Next.js entrega como carcasa de error
 * sin el layout raíz.
 *
 * Aquí se rechaza antes de llegar a la plantilla, de modo que esas URLs caen en
 * la 404 global, que sí aplica el layout.
 */
const ARTICLE_PATH = /^\/(\d{4})\/(\d{2})\/(\d{2})\/[^/]+\/?$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.replace(/^\/|\/$/g, '').split('/');

  // Sólo interesan las rutas de cuatro segmentos, que son las que colisionan
  // con la plantilla de artículo.
  if (segments.length !== 4) return NextResponse.next();
  if (ARTICLE_PATH.test(pathname)) {
    // La fecha además debe ser real: /2026/13/40/x/ no lo es.
    const [year, month, day] = segments;
    const date = new Date(`${year}-${month}-${day}T00:00:00Z`);
    const valid =
      !Number.isNaN(date.getTime()) &&
      date.getUTCFullYear() === Number(year) &&
      date.getUTCMonth() + 1 === Number(month) &&
      date.getUTCDate() === Number(day);
    if (valid) return NextResponse.next();
  }

  // Reescribe a una ruta que no existe: Next sirve su 404 global.
  return NextResponse.rewrite(new URL('/_ruta-no-encontrada', request.url), { status: 404 });
}

export const config = {
  // Se excluyen los activos y las rutas internas.
  matcher: ['/((?!api|_next|_vercel|brand|img|fonts|favicon.ico|icon.png|robots.txt|sitemap.xml|feed).*)'],
};
