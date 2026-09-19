# treulegal.solutions — rediseño

Front-end nuevo para **Treu Legal & Business** (Ensenada, B.C.).
Proyecto independiente: no comparte código con ningún otro sitio.

## Stack

- **Next.js** (App Router) + TypeScript + Tailwind CSS, desplegado en **Vercel**.
- **Supabase** guarda las solicitudes del formulario.
- **WordPress headless** para los Insights: el fundador sigue publicando en
  WordPress y el sitio lee la REST API con ISR (15 min) más un endpoint de
  revalidación on-demand.

## Comandos

```bash
npm run dev              # desarrollo
npm run build            # build de producción
npm run typecheck        # tsc --noEmit
npm run extract          # re-extrae el contenido del sitio actual
npm run verify:content   # comprueba que ningún texto carece de fuente
```

## Regla no negociable

Todo hecho, cifra, nombre, credencial, servicio, precio o plazo del sitio sale
del contenido publicado hoy en treulegal.solutions. El contenido extraído vive
en `content/_source/` y cada bloque conserva su URL de origen. `npm run
verify:content` falla si aparece texto sin fuente.

Las únicas modificaciones permitidas al texto están registradas en
`docs/CAMBIOS-DE-CONTENIDO.md`.

## Documentación

Toda en [`docs/`](./docs): inventario, benchmark, arquitectura de información,
sistema de diseño, redirecciones, créditos de imágenes, pendientes del cliente
y guía de entrega.
