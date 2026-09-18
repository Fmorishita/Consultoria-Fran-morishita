/**
 * Lighthouse móvil sobre las páginas clave.
 * Objetivo: Rendimiento >= 95; Accesibilidad, Buenas prácticas y SEO = 100.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const BASE = process.env.LH_BASE || 'http://127.0.0.1:3100';
const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'docs/_lighthouse');
const ROUTES = (process.env.LH_ROUTES || '/,/strategic-legal-session/,/areas-de-practica/corporate-business-law/,/insights/').split(',');

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
        BASE + route,
        '--quiet',
        '--output=json',
        `--output-path=${file}`,
        '--form-factor=mobile',
        '--screenEmulation.mobile',
        '--throttling-method=simulate',
        '--only-categories=performance,accessibility,best-practices,seo',
        `--chrome-flags=--headless=new --no-sandbox --disable-dev-shm-usage`,
      ],
      { stdio: ['ignore', 'ignore', 'pipe'], env: { ...process.env, CHROME_PATH: '/opt/pw-browsers/chromium' }, timeout: 180000 },
    );
  } catch (e) {
    console.log(`error en ${route}:`, String(e.stderr ?? e).slice(0, 300));
    continue;
  }

  const report = JSON.parse(fs.readFileSync(file, 'utf8'));
  const cat = (id) => Math.round((report.categories[id]?.score ?? 0) * 100);
  const audit = (id) => report.audits[id]?.numericValue ?? null;

  rows.push({
    route,
    perf: cat('performance'),
    a11y: cat('accessibility'),
    bp: cat('best-practices'),
    seo: cat('seo'),
    lcp: audit('largest-contentful-paint'),
    cls: audit('cumulative-layout-shift'),
    tbt: audit('total-blocking-time'),
    bytes: audit('total-byte-weight'),
  });
}

const fmt = (n, d = 0) => (n === null ? '—' : n.toFixed(d));
console.log('\nruta                                            perf a11y  bp  seo    LCP     CLS    TBT   peso');
for (const r of rows) {
  console.log(
    `${r.route.padEnd(46)} ${String(r.perf).padStart(4)} ${String(r.a11y).padStart(4)} ${String(r.bp).padStart(3)} ${String(r.seo).padStart(4)}` +
      `  ${fmt(r.lcp / 1000, 2).padStart(5)}s ${fmt(r.cls, 3).padStart(6)} ${fmt(r.tbt).padStart(5)}ms ${fmt(r.bytes / 1024).padStart(5)}KB`,
  );
}

fs.writeFileSync(path.join(OUT, 'resumen.json'), JSON.stringify({ date: new Date().toISOString(), base: BASE, rows }, null, 1));
