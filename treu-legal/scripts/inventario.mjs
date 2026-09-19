/**
 * Genera docs/INVENTARIO.md a partir del contenido extraído.
 * Es la versión legible de content/_source/.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'content/_source');

const index = JSON.parse(fs.readFileSync(path.join(SRC, 'index.json'), 'utf8'));
const posts = JSON.parse(fs.readFileSync(path.join(SRC, 'posts.json'), 'utf8'));
const categories = JSON.parse(fs.readFileSync(path.join(SRC, 'categories.json'), 'utf8'));
const media = JSON.parse(fs.readFileSync(path.join(SRC, 'media.json'), 'utf8'));

const page = (slug) => JSON.parse(fs.readFileSync(path.join(SRC, 'pages', `${slug}.json`), 'utf8'));

const GROUPS = [
  { title: 'Home y conversión', match: (p) => p.path === '/' || p.path === '/strategic-legal-session/' || p.path === '/contacto/' },
  { title: 'La Firma', match: (p) => p.path === '/la-firma/' },
  { title: 'Áreas de práctica', match: (p) => p.path.startsWith('/areas-de-practica/') },
  { title: 'Industrias', match: (p) => p.path.startsWith('/industrias/') },
  { title: 'Legal Products', match: (p) => p.path.startsWith('/legal-products/') },
  { title: 'Insights: hub y guías', match: (p) => p.path.startsWith('/insights') },
  { title: 'Landings SEO en español', match: (p) => ['/corporate-lawyer-baja-california/', '/corporate-compliance-mexico/'].includes(p.path) },
  { title: 'Páginas en inglés', match: (p) => p.path.startsWith('/en/') },
  { title: 'Legales', match: (p) => ['/privacidad/', '/condiciones-de-uso/'].includes(p.path) },
];

const lines = [
  '# Inventario del sitio actual',
  '',
  `Generado por \`node scripts/inventario.mjs\` el ${new Date().toISOString().slice(0, 10)}.`,
  'Fuente: sitemap + REST API de WordPress + HTML renderizado.',
  '',
  '## Resumen',
  '',
  `| | |`,
  `| --- | --- |`,
  `| Páginas | ${index.length} |`,
  `| Artículos | ${posts.length} |`,
  `| Categorías con contenido | ${categories.filter((c) => c.count > 0).length} |`,
  `| Categorías totales | ${categories.length} |`,
  `| Archivos en la biblioteca de medios | ${media.length} |`,
  `| Imágenes sin \`alt\` en el contenido | ${index.reduce((n, p) => n + p.imagesWithoutAlt, 0)} |`,
  '',
  'El contenido estructurado de cada página está en `content/_source/pages/<slug>.json`,',
  'con su `source` (URL de origen), sus metadatos, sus encabezados y sus imágenes.',
  '',
];

for (const group of GROUPS) {
  const rows = index.filter(group.match);
  if (!rows.length) continue;
  lines.push(`## ${group.title}`, '');
  lines.push('| Ruta | Título | Bloques | Caracteres | Img. sin alt | Extraído de |');
  lines.push('| --- | --- | --: | --: | --: | --- |');
  for (const p of rows.sort((a, b) => a.path.localeCompare(b.path))) {
    lines.push(
      `| \`${p.path}\` | ${p.title.replace(/\|/g, '\\|')} | ${p.blocks} | ${p.chars} | ${p.imagesWithoutAlt} | ${p.via === 'html' ? 'HTML renderizado' : 'REST API'} |`,
    );
  }
  lines.push('');
}

/* --- Metadatos y CTAs por página --- */
lines.push('## Metadatos por página', '');
lines.push('| Ruta | `title` | `description` |');
lines.push('| --- | --- | --- |');
for (const p of [...index].sort((a, b) => a.path.localeCompare(b.path))) {
  const full = page(p.slug);
  const clip = (s, n) => (s ? (s.length > n ? s.slice(0, n) + '…' : s).replace(/\|/g, '\\|') : '—');
  lines.push(`| \`${p.path}\` | ${clip(full.meta.title, 70)} | ${clip(full.meta.description, 90)} |`);
}
lines.push('');

/* --- Categorías --- */
lines.push('## Categorías de Insights', '');
lines.push('| Categoría | Ruta | Artículos |');
lines.push('| --- | --- | --: |');
for (const c of categories.filter((x) => x.count > 0).sort((a, b) => b.count - a.count)) {
  lines.push(`| ${c.name} | \`${c.link.replace('https://treulegal.solutions', '')}\` | ${c.count} |`);
}
lines.push('');

/* --- Artículos --- */
lines.push('## Artículos', '', `${posts.length} artículos, del más reciente al más antiguo.`, '');
lines.push('| Fecha | Título | Ruta |');
lines.push('| --- | --- | --- |');
for (const p of posts.sort((a, b) => b.date.localeCompare(a.date))) {
  const title = p.title.rendered
    .replace(/&#8217;|&rsquo;/g, '’')
    .replace(/&amp;/g, '&')
    .replace(/<[^>]+>/g, '')
    .replace(/\|/g, '\\|');
  lines.push(`| ${p.date.slice(0, 10)} | ${title} | \`${p.link.replace('https://treulegal.solutions', '')}\` |`);
}
lines.push('');

/* --- Formularios --- */
lines.push(
  '## Formularios del sitio actual',
  '',
  'La página `/contacto/` contiene **dos formularios distintos** en su código.',
  'El sitio nuevo los unifica en uno, con los campos y la obligatoriedad del',
  'formulario de solicitud de sesión. Ver `content/form.ts`.',
  '',
  '### Formulario 1 — "Solicitud de sesión" (el que se conserva)',
  '',
  '| Campo | Tipo | Obligatorio |',
  '| --- | --- | --- |',
  '| Nombre completo | texto | sí |',
  '| Empresa | texto | sí |',
  '| Cargo | texto | sí |',
  '| Correo electrónico | email | sí |',
  '| Teléfono | tel | sí |',
  '| Área principal del asunto | selector | sí |',
  '| Breve descripción del asunto | área de texto | no |',
  '| Consentimiento de privacidad | casilla | sí |',
  '',
  'Su selector usaba los encabezados de grupo ("1. NEGOCIOS Y CORPORATIVO:")',
  'como opciones seleccionables, con las sangrías hechas a base de espacios.',
  'En el sitio nuevo son `<optgroup>` reales.',
  '',
  '### Formulario 2 — "Contacto" (se retira)',
  '',
  'Campos: Nombre, Empresa, Cargo, Email, Número de teléfono, Asunto (5',
  'opciones agrupadas en una sola línea), Mensaje y consentimiento.',
  '',
  '### Textos conservados',
  '',
  '- Consentimiento: «He leído el Aviso y Política de Privacidad de Treu Legal & Business y consiento el tratamiento de mis datos personales para atender esta solicitud.»',
  '- Mensaje de éxito: «Gracias por tu información, en breve recibirás respuesta de Treu Legal & Business»',
  '',
);

fs.writeFileSync(path.join(ROOT, 'docs/INVENTARIO.md'), lines.join('\n'));
console.log('docs/INVENTARIO.md escrito:', lines.length, 'líneas');
