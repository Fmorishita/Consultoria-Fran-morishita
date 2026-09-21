# Fran Morishita · Bienes Raíces

Sitio bilingüe (ES/EN) de captación inmobiliaria: landings de proyecto, portafolio de
dirección comercial y captura de leads con atribución de pauta punta a punta.

- **Stack:** Next.js (App Router) + TypeScript + Tailwind v4 + Supabase, desplegado en Vercel.
- **CTA principal:** WhatsApp con mensaje prellenado y UTMs incrustados.
- **Contenido:** archivos tipados en `content/`. Publicar un proyecto nuevo es crear un archivo.

## Arranque

```bash
npm install
cp .env.example .env.local   # y llenarlo
npm run dev                  # http://localhost:3000 → redirige a /es
```

## Publicar un proyecto nuevo

1. Copia `content/proyectos/_plantilla.ts` como `content/proyectos/<slug>.ts`.
2. Llénalo. Lo que no tengas, márcalo con `pendiente("qué falta")`.
3. Agrégalo a la lista de `content/proyectos/index.ts`.
4. Pon `activo: true` y, cuando tengas la autorización del desarrollador por escrito,
   `autorizado: true`. Hasta entonces el proyecto no se lista ni se indexa.

Las rutas `/es/proyectos/<slug>` y `/en/proyectos/<slug>`, el sitemap, la OG y el
JSON-LD se generan solos.

## Captura de leads y atribución

- Los UTMs (`utm_*`, `fbclid`, `gclid`) se capturan en el primer aterrizaje y se guardan
  en cookie de primera parte (90 días) + `sessionStorage`. Viajan en **cada** lead y en
  **cada** mensaje de WhatsApp.
- El formulario usa un server action que: guarda en Supabase → manda el webhook →
  dispara `Lead` por Conversions API con el mismo `event_id` que el píxel del navegador.
- Si el guardado falla, el usuario **ve éxito igual** y sale una alerta a `ALERT_WEBHOOK_URL`.
- Eventos: `ViewContent` (proyecto), `Lead` (formulario), `Contact` (clic WhatsApp),
  `calculadora_usada` (personalizado).

Crea la tabla con `supabase/leads.sql` (RLS: la llave publicable solo puede insertar).

## Datos pendientes

`PENDIENTES.md` se genera con `npm run pendientes` y lista todo lo que falta por
confirmar. En producción esos datos no se pintan; en preview aparecen como chips ámbar.

## Verificación

```bash
npm run verificar   # typecheck + lint + build
```
