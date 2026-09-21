# Fran Morishita · Bienes Raíces

Sitio de captación para venta de propiedades y dirección comercial inmobiliaria.
El brief completo está en `BRIEF.md`; esto es el resumen operativo.

## El único trabajo del sitio

Convertir tráfico pagado en **conversaciones de WhatsApp calificadas** y, en segundo
plano, en **llamadas de descubrimiento con desarrolladores**. Si un elemento no acerca
al visitante a uno de esos dos botones, no va.

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
  proyectos/        Un archivo por proyecto + `_plantilla.ts` + `index.ts`
  casos/            Un archivo por caso de portafolio
  paginas/          Copy de cada página
src/app/[locale]/   Rutas (es | en). El layout raíz vive aquí.
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

## Comandos

```bash
npm run dev          # desarrollo
npm run verificar    # typecheck + lint + build (correr antes de decir "listo")
npm run pendientes   # regenera PENDIENTES.md
```

## Variables de entorno

Ver `.env.example`. En preview se activa `NEXT_PUBLIC_MOSTRAR_PENDIENTES=1` para
ver los chips ámbar de datos faltantes; en producción va vacío.
