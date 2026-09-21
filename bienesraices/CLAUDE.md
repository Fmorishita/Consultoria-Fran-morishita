# Fran Morishita · Bienes Raíces

Sitio de captación para venta de propiedades y dirección comercial inmobiliaria.
El brief completo está en `BRIEF.md`; esto es el resumen operativo.

## El único trabajo del sitio

Convertir tráfico pagado en **conversaciones de WhatsApp calificadas sobre propiedades
concretas**, empezando por la destacada. En segundo plano, llamadas de descubrimiento
con desarrolladores. Si un elemento no acerca al visitante a uno de esos dos botones,
no va.

**Arquitectura:** el home es catálogo, no explicación. Va hero, propiedad destacada,
resto del inventario, prueba social (video + cifras), formulario de captura y cierre.
Lo que explica cómo trabaja Fran vive en `/desarrolladores` y `/portafolio`, enlazadas
desde el pie y fuera del nav principal.

## Stack

- Next.js (App Router) + TypeScript estricto · React 19
- Tailwind CSS v4 (tokens en `src/app/globals.css`) + primitivas al estilo shadcn/ui
  (Radix + `cva` + `cn`) en `src/componentes/ui/`
- Supabase para guardar leads (llave publicable + RLS de solo INSERT)
- Deploy en Vercel · sin base de datos para el contenido: vive en archivos versionados

No agregar dependencias fuera de esta lista sin justificarlo antes.

## Estructura

```
content/            Todo el contenido comercial, tipado y validado con Zod
  esquemas.ts       Zod + tipos (Proyecto, Caso, Testimonio, Cifra, Sitio)
  sitio.ts          Datos globales: WhatsApp, dominio, legal, dirección visual
  ui.ts             Microcopy de interfaz (ES/EN)
  proyectos/        Una propiedad por archivo + `_plantilla.ts` + `index.ts`
                    (`destacado: true` = la que encabeza el home)
  casos/            Un archivo por caso de portafolio
  paginas/          Copy de cada página
src/app/[locale]/   Rutas (es | en); el catálogo es /propiedades. El layout raíz vive aquí.
src/componentes/    Componentes; `ui/` son primitivas, `secciones/` bloques de página
src/lib/            i18n, atribución UTM, tracking, CAPI, formato, Supabase
src/acciones/       Server actions (envío de leads)
scripts/            `pendientes.mjs` genera PENDIENTES.md
supabase/leads.sql  Tabla de leads con RLS
```

## Reglas del proyecto

1. **Cero texto de contenido dentro de componentes.** Todo sale de `content/`.
2. **No inventar datos.** Lo que falte se escribe `pendiente("qué falta")`:
   no se pinta en producción y aparece en `PENDIENTES.md`.
3. Un proyecto solo se publica con `activo: true` **y** `autorizado: true`
   (autorización por escrito del desarrollador). Sin eso no se lista ni se indexa.
4. Componentes chicos, de un solo propósito. Si un archivo pasa de ~200 líneas, partirlo.
5. Cero `any`. Nada de llaves en el repo.
6. Publicar un proyecto nuevo = copiar `content/proyectos/_plantilla.ts`, llenarlo y
   agregarlo a `content/proyectos/index.ts`. No se toca ningún componente.

## Reglas de diseño

El repo trae la skill **taste-skill** en `.claude/skills/design-taste-frontend/`
(MIT, de github.com/Leonxlnx/taste-skill). El sitio ya está alineado con ella.
Lo que hay que respetar al tocar la interfaz:

- **Lectura de diseño:** landing de marca personal inmobiliaria para comprador
  binacional y desarrollador, lenguaje editorial contenido. Diales:
  variación 7 / movimiento 4 / densidad 3.
- **Cero em dashes** (`—` y `–`) en cualquier texto visible: titulares, botones,
  copy, `alt`, captions. Se usan comas, puntos, paréntesis o guion simple.
- **Presupuesto de antetítulos:** máximo 1 por cada 3 secciones (el hero cuenta).
  Si una sección necesita nombre, se lo pone el titular, no un rótulo.
- **Hero:** subtexto de 20 palabras máximo, titular de 2 o 3 líneas cortas,
  CTA visible sin scroll, padding superior contenido y una imagen real.
- **Un rótulo por intención de CTA:** todo lo que abre WhatsApp dice lo mismo.
- **Nada de tres tarjetas iguales**, ni dos secciones con la misma familia de
  layout. El home usa siete composiciones distintas.
- **Serif rotada:** Playfair Display (dirección A) y EB Garamond (dirección B).
  Fraunces e Instrument Serif están vetadas por ser el default de los LLM, y la
  sans es Geist, no Inter.
- **Sin listeners de scroll:** IntersectionObserver (`usePasoElUmbral`) o CSS.

## Comandos

```bash
npm run dev          # desarrollo
npm run verificar    # typecheck + lint + build (correr antes de decir "listo")
npm run pendientes   # regenera PENDIENTES.md
```

## Variables de entorno

Ver `.env.example`. En preview se activa `NEXT_PUBLIC_MOSTRAR_PENDIENTES=1` para
ver los chips ámbar de datos faltantes; en producción va vacío.
