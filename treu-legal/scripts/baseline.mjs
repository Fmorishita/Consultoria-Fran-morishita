/**
 * Línea base: Lighthouse móvil del sitio actual (WordPress), para la tabla
 * antes/después de docs/ENTREGA.md. Sólo lectura: no toca producción.
 *
 * Nota de entorno: el proxy de la sesión re-termina TLS, así que Chrome no
 * reconoce su CA. Se le pasan las huellas SPKI de esas CA concretas mediante
 * PROXY_CA_SPKI; no se desactiva la verificación de certificados.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'docs/_lighthouse/base');
const ORIGIN = process.env.BASE_ORIGIN || 'https://treulegal.solutions';
const SPKI = process.env.PROXY_CA_SPKI || '';

const ROUTES = [
  '/',
  '/strategic-legal-session/',
  '/areas-de-practica/corporate-business-law/',
  '/insights/',
];

const chromeFlags = [
  '--headless=new',
  '--no-sandbox',
  '--disable-dev-shm-usage',
  SPKI ? `--ignore-certificate-errors-spki-list=${SPKI}` : '',
]
  .filter(Boolean)
  .join(' ');

fs.mkdirSync(OUT, { recursive: true });
const rows = [];

for (const route of ROUTES) {
  const name = route === '/' ? 'home' : route.replace(/^\/|\/$/g, '').replace(/\//g, '__');
  const file = path.join(OUT, `${name}.json`);
  try {
    execFileSync(
      'npx',
      [
        'lighthouse',
        ORIGIN + route,
        '--quiet',
        '--output=json',
        `--output-path=${file}`,
        '--form-factor=mobile',
        '--screenEmulation.mobile',
        '--throttling-method=simulate',
        '--only-categories=performance,accessibility,best-practices,seo',
        `--chrome-flags=${chromeFlags}`,
      ],
      {
        stdio: ['ignore', 'ignore', 'pipe'],
        env: { ...process.env, CHROME_PATH: '/opt/pw-browsers/chromium' },
        timeout: 300000,
      },
    );
  } catch (e) {
    console.log(`error en ${route}: ${String(e.stderr ?? e).slice(0, 220)}`);
    continue;
  }

  const r = JSON.parse(fs.readFileSync(file, 'utf8'));
  const cat = (id) => Math.round((r.categories[id]?.score ?? 0) * 100);
  const a = (id) => r.audits[id]?.numericValue ?? null;
  rows.push({
    route,
    perf: cat('performance'),
    a11y: cat('accessibility'),
    bp: cat('best-practices'),
    seo: cat('seo'),
    lcp: a('largest-contentful-paint'),
    cls: a('cumulative-layout-shift'),
    tbt: a('total-blocking-time'),
    bytes: a('total-byte-weight'),
    requests: r.audits['network-requests']?.details?.items?.length ?? null,
  });
  console.log(
    `${route.padEnd(46)} perf ${cat('performance')}  a11y ${cat('accessibility')}  bp ${cat('best-practices')}  seo ${cat('seo')}`,
  );
}

fs.writeFileSync(
  path.join(OUT, 'resumen.json'),
  JSON.stringify({ date: new Date().toISOString(), origin: ORIGIN, rows }, null, 1),
);
