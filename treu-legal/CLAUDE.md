# Treu Legal & Business — reglas del proyecto

Brief maestro: `docs/BRIEF.md`. Leerlo antes de cualquier cambio de contenido.

## Reglas no negociables

1. **Cero invención.** Todo hecho, cifra, nombre, credencial, servicio, precio,
   plazo, ubicación o afirmación sale del sitio actual (treulegal.solutions).
   Si no está en el sitio, no existe. Prohibido agregar testimonios, reseñas,
   estadísticas, logos de clientes, casos de éxito, premios, año de fundación,
   garantías, "consulta gratuita", conteos de clientes o urgencia artificial.
2. **Con el texto se puede** reordenar, jerarquizar, dividir párrafos, convertir
   listas en componentes, pasar MAYÚSCULAS sostenidas a formato normal y
   corregir erratas evidentes. Cada corrección se registra en
   `docs/CAMBIOS-DE-CONTENIDO.md`. Para un extracto corto se usa un fragmento
   literal, nunca una paráfrasis.
3. **Copy nuevo:** sólo microcopy neutro de interfaz, y siempre en
   `content/microcopy.ts`. Trato de usted. Las mejoras de redacción que se
   propongan van a `docs/PROPUESTAS-COPY.md`, no al sitio.
4. **Nombres propios tal cual:** Treu Legal & Business, Legal Intelligence for
   Business, Strategic Legal Session, Corporate Health Check™, HR Legal
   System™, Contract Architecture™, Corporate Risk & Structure System (CRSS)™,
   Business Launch Package, Cross-Border Entry Package.
5. **Lo que falta no se simula.** Nada de placeholders visibles. Las carencias
   se anotan en `docs/PENDIENTES-CLIENTE.md`.
6. **Sin logos de terceros** (universidades, instituciones, empresas). Las
   credenciales se muestran como texto.
7. **Textos legales intactos** (Aviso de Privacidad, Condiciones de uso): sólo
   cambia su formato.
8. **Producción es de sólo lectura.** No se toca el dominio, el DNS ni el
   WordPress actual. Sólo se despliegan previews.

## Decisión técnica

- Next.js (App Router) + TypeScript + Tailwind, en Vercel. Server Components
  por defecto; JavaScript de cliente sólo para menú móvil, formulario y filtros.
- WordPress headless para Insights vía REST API con ISR (~15 min) y
  `/api/revalidate` protegido con `REVALIDATE_SECRET`.
- Páginas institucionales: contenido estructurado y tipado en `content/`,
  extraído del sitio actual; cada página conserva su `source`.
- Formulario: Route Handler + zod + honeypot. Las solicitudes se guardan en
  **Supabase**; la notificación por correo es opcional.
- URLs: se conservan todas las rutas existentes. Cualquier cambio va con 301 y
  queda registrado en `docs/REDIRECCIONES.md`.
- Analítica: Vercel Web Analytics + Speed Insights (sin cookies). Eventos:
  `cta_click`, `whatsapp_click`, `tel_click`, `email_click`, `form_start`,
  `form_submit_success`, `form_submit_error`.

## Comandos

```bash
npm run dev
npm run build
npm run typecheck
npm run extract            # re-extrae el contenido del sitio actual
npm run verify:content     # cero textos sin fuente
node scripts/images.mjs    # regenera las variantes de imagen
node scripts/brand.mjs     # regenera los activos de marca
node scripts/shots.mjs     # capturas de control
```

## Objetivos de calidad

- Lighthouse móvil: Rendimiento ≥ 95; Accesibilidad, Buenas prácticas y SEO 100.
- LCP ≤ 2.0 s, CLS ≤ 0.05, TBT ≤ 150 ms.
- 0 violaciones de axe; contraste AA en todo el sitio.
- Un H1 por página. Sin scroll horizontal entre 320 y 1440 px.
- CTA principal visible sin scroll en 360×640 y a dos toques desde cualquier página.
