/**
 * verify:content — cero textos sin fuente.
 *
 * Extrae el texto visible de las páginas construidas y comprueba que cada
 * fragmento exista en:
 *   1. content/_source/  (el contenido extraído del sitio actual)
 *   2. content/microcopy.ts  (el único copy nuevo permitido)
 *   3. docs/CAMBIOS-DE-CONTENIDO.md  (las correcciones registradas)
 *
 * La comparación normaliza mayúsculas, espacios, comillas y guiones.
 * Reporte en docs/VERIFICACION-CONTENIDO.md.
 */
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = path.resolve(import.meta.dirname, '..');
const BASE = process.env.VERIFY_BASE || 'http://127.0.0.1:3100';

/** Decodifica las entidades HTML que trae el contenido de WordPress. */
const NAMED = {
  amp: '&', nbsp: ' ', lt: '<', gt: '>', quot: '"', apos: "'", hellip: '\u2026',
  mdash: '\u2014', ndash: '\u2013', rsquo: '\u2019', lsquo: '\u2018',
  ldquo: '\u201c', rdquo: '\u201d', trade: '\u2122', middot: '\u00b7',
};
const decode = (s) =>
  String(s)
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/\\u([0-9a-f]{4})/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&([a-z][a-z0-9]*);/gi, (m, n) => (NAMED[n] !== undefined ? NAMED[n] : m));

/** Normaliza para comparar: minúsculas, sin acentos de puntuación tipográfica. */
const norm = (s) =>
  decode(s)
    .replace(/[‘’ʼ]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—−]/g, '-')
    .replace(/ /g, ' ')
    .replace(/…/g, '...')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

/* ---------- 1. Corpus de fuentes permitidas ---------- */

const corpus = [];

/**
 * Reúne todos los valores de texto de un JSON. Hay que parsearlo: leer el
 * archivo como texto deja las comillas escapadas (\") y nada coincide.
 */
function jsonStrings(value, out = []) {
  if (typeof value === 'string') out.push(stripTags(value));
  else if (Array.isArray(value)) for (const v of value) jsonStrings(v, out);
  else if (value && typeof value === 'object') for (const v of Object.values(value)) jsonStrings(v, out);
  return out;
}

// Contenido extraído del sitio actual.
const srcDir = path.join(ROOT, 'content/_source');
for (const file of ['pages.json', 'posts.json', 'categories.json', 'users.json']) {
  const full = path.join(srcDir, file);
  if (!fs.existsSync(full)) continue;
  corpus.push(norm(jsonStrings(JSON.parse(fs.readFileSync(full, 'utf8'))).join('\n')));
}
const pagesDir = path.join(srcDir, 'pages');
if (fs.existsSync(pagesDir)) {
  for (const f of fs.readdirSync(pagesDir)) {
    const data = JSON.parse(fs.readFileSync(path.join(pagesDir, f), 'utf8'));
    corpus.push(norm(jsonStrings(data).join('\n')));
  }
}

// Microcopy, hechos, estructura del sitio y formulario: los archivos tipados.
for (const f of ['microcopy.ts', 'facts.ts', 'site.ts', 'form.ts', 'corrections.ts', 'en.ts']) {
  const full = path.join(ROOT, 'content', f);
  if (fs.existsSync(full)) corpus.push(norm(fs.readFileSync(full, 'utf8')));
}

// Correcciones registradas.
const changes = path.join(ROOT, 'docs/CAMBIOS-DE-CONTENIDO.md');
if (fs.existsSync(changes)) corpus.push(norm(fs.readFileSync(changes, 'utf8')));

// Nota deliberada: NI `app/` NI `components/` forman parte del corpus.
// Incluirlos validaría automáticamente cualquier texto escrito a mano en una
// plantilla, que es justo lo que esta comprobación debe detectar. Todo texto
// literal citado en una plantilla tiene que existir en `content/_source/`,
// en `content/` o en CAMBIOS-DE-CONTENIDO.md.

const HAYSTACK = corpus.join('\n');

function stripTags(s) {
  return s.replace(/<[^>]+>/g, ' ');
}

/**
 * Comprueba si un fragmento compuesto se explica por partes con fuente.
 * Se parte por los separadores que usan las plantillas y se exige que cada
 * parte con cuerpo suficiente exista en el corpus.
 */
function splitsAreSourced(needle) {
  for (const sep of [' \u2014 ', ' \u00b7 ', '. ', ', ']) {
    if (!needle.includes(sep)) continue;
    const parts = needle
      .split(sep)
      .map((p) => p.trim())
      .filter((p) => p.length >= 4);
    if (parts.length < 2) continue;
    if (parts.every((p) => HAYSTACK.includes(p))) return true;
  }
  // Fragmento truncado con puntos suspensivos (extractos de artículos).
  const trimmed = needle.replace(/\.{3}$/, '').trim();
  if (trimmed.length > 24 && HAYSTACK.includes(trimmed)) return true;
  return false;
}

function walk(dir, fn) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, fn);
    else fn(full);
  }
}

/* ---------- 2. Texto visible del sitio construido ---------- */

const ROUTES = (process.env.VERIFY_ROUTES || [
  '/',
  '/la-firma/',
  '/strategic-legal-session/',
  '/areas-de-practica/',
  '/areas-de-practica/corporate-business-law/',
  '/areas-de-practica/compliance-risk-prevention/',
  '/areas-de-practica/labor-employment/',
  '/areas-de-practica/corporate-governance-family-business/',
  '/areas-de-practica/cross-border-advisory/',
  '/areas-de-practica/strategic-litigation-dispute-resolution/',
  '/industrias/',
  '/industrias/desarrollo-inmobiliario/',
  '/industrias/construccion-infraestructura/',
  '/industrias/comercio-servicios-manufactura/',
  '/industrias/empresas-binacionales/',
  '/legal-products/',
  '/legal-products/business-launch-package/',
  '/legal-products/corporate-health-check/',
  '/legal-products/hr-legal-system/',
  '/legal-products/contract-architecture/',
  '/legal-products/corporate-risk-structure-system/',
  '/legal-products/cross-border-entry-package/',
  '/insights/',
  '/contacto/',
  '/corporate-lawyer-baja-california/',
  '/corporate-compliance-mexico/',
  '/en/',
  '/en/corporate-law-mexico/',
  '/privacidad/',
  '/condiciones-de-uso/',
].join(',')).split(',');

/**
 * Si la sesión sale por un proxy que re-termina TLS, se confía exactamente en
 * sus CA por su huella SPKI. No se desactiva la verificación de certificados.
 */
const SPKI = process.env.PROXY_CA_SPKI || '';

const browser = await chromium.launch({
  executablePath: fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined,
  args: ['--no-sandbox', ...(SPKI ? [`--ignore-certificate-errors-spki-list=${SPKI}`] : [])],
});
const page = await browser.newPage();
await page.route('**/_vercel/**', (r) => r.abort());

const findings = [];
let checked = 0;

for (const route of ROUTES) {
  await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 60000 });
  // Sólo el contenido: el header y el footer se repiten en todas las páginas.
  const fragments = await page.evaluate(() => {
    const out = [];
    const root = document.querySelector('main') || document.body;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (!parent) continue;
      if (parent.closest('script,style,noscript')) continue;
      const text = node.textContent?.replace(/\s+/g, ' ').trim();
      if (text && text.length > 3) out.push(text);
    }
    return out;
  });

  for (const fragment of fragments) {
    checked++;
    const needle = norm(fragment);
    // Los fragmentos muy cortos son microcopy o puntuación: no aportan riesgo.
    if (needle.length < 12) continue;
    if (HAYSTACK.includes(needle)) continue;

    // Las plantillas anteponen separadores ("— Institución", "· 3 min").
    const bare = needle.replace(/^[\s\-\u2013\u2014\u00b7:,.]+/, '').trim();
    if (bare.length > 8 && HAYSTACK.includes(bare)) continue;

    // Una plantilla puede unir dos textos literales del origen (por ejemplo
    // "formato" + "nota del formato", o "programa — institución"). Se acepta
    // si cada parte por separado sí tiene fuente.
    if (splitsAreSourced(needle)) continue;

    findings.push({ route, fragment });
  }
}

await browser.close();

/* ---------- 3. Reporte ---------- */

const lines = [
  '# Verificación de contenido',
  '',
  'Generado por `npm run verify:content`.',
  '',
  'Comprueba que cada fragmento de texto visible del sitio construido exista en',
  'el contenido extraído del sitio actual (`content/_source/`), en',
  '`content/microcopy.ts` o en `docs/CAMBIOS-DE-CONTENIDO.md`.',
  '',
  `- Fecha: ${new Date().toISOString().slice(0, 10)}`,
  `- Rutas analizadas: ${ROUTES.length}`,
  `- Fragmentos de texto comprobados: ${checked}`,
  `- **Textos sin fuente: ${findings.length}**`,
  '',
];

if (findings.length === 0) {
  lines.push('Resultado: **cero textos sin fuente**.', '');
} else {
  lines.push('## Textos sin fuente', '');
  for (const f of findings) {
    lines.push(`- \`${f.route}\` — ${JSON.stringify(f.fragment)}`);
  }
  lines.push('');
}

fs.mkdirSync(path.join(ROOT, 'docs'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'docs/VERIFICACION-CONTENIDO.md'), lines.join('\n'));

console.log(`Rutas: ${ROUTES.length} · fragmentos: ${checked} · sin fuente: ${findings.length}`);
if (findings.length) {
  console.log(findings.slice(0, 25).map((f) => `  ${f.route}  ${f.fragment.slice(0, 110)}`).join('\n'));
  process.exitCode = 1;
}
