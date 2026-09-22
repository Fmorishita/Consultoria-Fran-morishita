# Fran Morishita · Bienes Raíces

Sitio de captación para venta de propiedades y dirección comercial inmobiliaria.
El brief completo está en `BRIEF.md`; esto es el resumen operativo.

## El único trabajo del sitio

Que un comprador de alto patrimonio, de México o de California, llegue a **agendar
una visita a Alta Tierra o a pedir el expediente de la propiedad**. En segundo plano,
que un desarrollador vea una operación comercial seria y quiera entregarle su
inventario a Fran.

**Registro:** inmobiliaria de alto patrimonio, no agencia de marketing. El sitio
habla de tierra, vista, escasez, proceso y acompañamiento. **Nunca** de Meta Ads,
IA, CRM, pauta, leads ni embudos: el comprador no compra herramientas, y el
desarrollador compra ritmo de colocación, no instrumental. Esa jerga solo puede
aparecer en conversaciones privadas, nunca en el sitio.

**Arquitectura del home:** hero partido (problema del comprador + retrato de Fran)
con una franja de tres datos calculados del inventario, dudas del comprador
(sección clara), desarrollo destacado, resto del inventario, la plaza (inversión y
vida en una sola pieza, sección clara), respaldo (video vertical de Gus Marcos +
cifras de comprador), perfiles de comprador con la ficha que les toca, equipo
(sección clara), búsqueda a la medida y cierre. El proceso de compra paso a paso
vive en cada ficha, y el comparativo del portafolio en `/propiedades`. Lo que
explica cómo trabaja Fran con desarrolladores vive en `/desarrolladores` y
`/portafolio`, enlazadas desde el pie.

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

- **Lectura de diseño:** inmobiliaria de alto patrimonio en la costa del Pacífico,
  registro de casa de subastas. Diales: variación 7 / movimiento 4 / densidad 3.
- **Paleta:** tinta de mar profundo y latón (dirección A) o alabastro y latón
  oscuro (dirección B). El latón es el **único** color saturado y se reserva para
  cifras, CTA primario, iconos y filetes. Nada de naranja ni de acentos de SaaS.
- **Cero em dashes** (`—` y `–`) en cualquier texto, incluidos comentarios de CSS.
  Se usan comas, puntos, paréntesis, `·` o guion simple.
- **Presupuesto de antetítulos:** máximo 1 por cada 3 secciones (el hero cuenta).
  Si una sección necesita nombre, se lo pone el titular, no un rótulo.
- **Hero:** subtexto de 20 palabras máximo, titular de 2 o 3 líneas cortas,
  CTA visible sin scroll. En el home el retrato de Fran va como pieza, no de
  fondo; en las fichas, la fotografía del producto a sangre.
- **Secciones claras:** `.seccion-clara` invierte los tokens a alabastro dentro de
  la dirección A. Máximo una de cada tres secciones, nunca dos seguidas.
- **Sin fotografía no hay hueco:** tarjeta o portada sin foto usa `.topografia`
  (lámina de curvas de nivel en latón) con el nombre del desarrollo.
- **Cifras del hero y del comparador:** se calculan del contenido, nunca se
  teclean. Una cifra de volumen para desarrolladores lleva `soloDesarrolladores`.
- **CTA por intención, no por canal.** Cada intención tiene un solo rótulo en todo
  el sitio (agendar visita / solicitar información / pedir lista de precios /
  conocer el desarrollo / escribir por WhatsApp) y nunca se repiten dos veces en
  la misma pantalla. **WhatsApp no va en todos lados:** no hay botón flotante, el
  encabezado lleva agenda, y WhatsApp aparece como salida secundaria en el cierre
  y en `/contacto`.
- **Iconografía:** lucide, `strokeWidth={1.5}`, en color acento. Las claves las
  escribe el contenido (`icono: "vista"`) y se resuelven en `src/lib/iconos.ts`.
  Ningún componente elige un icono por su cuenta.
- **Nada de tres tarjetas iguales**, ni dos secciones con la misma familia de
  layout. El home alterna foto a sangre, ficha partida, rejilla de filetes, lista
  dividida, riel numerado y banda con imagen.
- **Serif:** Cormorant Garamond en ambas direcciones, nunca por debajo de peso 600.
  Fraunces e Instrument Serif están vetadas por ser el default de los LLM, y la
  sans es Geist, no Inter.
- **Video:** se pinta con la orientación real con la que se grabó
  (`orientacion: "vertical"` pinta 9:16). Un vertical dentro de un marco 16:9 se
  ve amateur y tira la percepción de toda la página.
- **Sin listeners de scroll:** IntersectionObserver (`usePasoElUmbral`) o CSS.

## Comandos

```bash
npm run dev          # desarrollo
npm run verificar    # typecheck + lint + build (correr antes de decir "listo")
npm run pendientes   # regenera PENDIENTES.md
```

## Variables de entorno

Ver `.env.example`. `NEXT_PUBLIC_MOSTRAR_PENDIENTES=1` pinta chips ámbar con los
datos que faltan: **solo en local**. En preview y en producción va apagado, porque
los previews se enseñan a clientes y un recuadro amarillo tira la página.
La lista de lo que falta se lee en `PENDIENTES.md`, no en la pantalla.
