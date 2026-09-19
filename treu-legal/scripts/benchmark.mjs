/**
 * Benchmark de firmas de referencia. Sirve para medir, no para copiar.
 *
 * Mide con Lighthouse móvil y captura la home, una página de servicio y el
 * contacto de cada firma. Si alguna bloquea el acceso, se sigue con las demás.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { chromium } from 'playwright';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'docs/_benchmark');
const SPKI = process.env.PROXY_CA_SPKI || '';

const FIRMS = [
  { id: 'cooley', country: 'EE.UU.', url: 'https://www.cooley.com' },
  { id: 'wsgr', country: 'EE.UU.', url: 'https://www.wsgr.com' },
  { id: 'fenwick', country: 'EE.UU.', url: 'https://www.fenwick.com' },
  { id: 'vonwobeser', country: 'México', url: 'https://www.vonwobeser.com' },
  { id: 'galicia', country: 'México', url: 'https://www.galicia.com.mx' },
  { id: 'ritch', country: 'México', url: 'https://www.ritch.com.mx' },
  { id: 'creel', country: 'México', url: 'https://www.creel.mx' },
];

fs.mkdirSync(OUT, { recursive: true });

const chromeFlags = ['--headless=new', '--no-sandbox', '--disable-dev-shm-usage', SPKI ? `--ignore-certificate-errors-spki-list=${SPKI}` : '']
  .filter(Boolean)
  .join(' ');

const rows = [];

/* --- Lighthouse móvil de la home de cada firma --- */
for (const firm of FIRMS) {
  const file = path.join(OUT, `${firm.id}.json`);
  const row = { ...firm, perf: null, a11y: null, bp: null, seo: null, lcp: null, bytes: null, requests: null, blocked: false };
  try {
    execFileSync(
      'npx',
      [
        'lighthouse', firm.url, '--quiet', '--output=json', `--output-path=${file}`,
        '--form-factor=mobile', '--screenEmulation.mobile', '--throttling-method=simulate',
        '--only-categories=performance,accessibility,best-practices,seo',
        `--chrome-flags=${chromeFlags}`,
      ],
      { stdio: ['ignore', 'ignore', 'pipe'], env: { ...process.env, CHROME_PATH: '/opt/pw-browsers/chromium' }, timeout: 240000 },
    );
    const r = JSON.parse(fs.readFileSync(file, 'utf8'));
    const cat = (id) => Math.round((r.categories[id]?.score ?? 0) * 100);
    row.perf = cat('performance');
    row.a11y = cat('accessibility');
    row.bp = cat('best-practices');
    row.seo = cat('seo');
    row.lcp = r.audits['largest-contentful-paint']?.numericValue ?? null;
    row.bytes = r.audits['total-byte-weight']?.numericValue ?? null;
    row.requests = r.audits['network-requests']?.details?.items?.length ?? null;
  } catch (e) {
    row.blocked = true;
    row.error = String(e.stderr ?? e).slice(0, 150);
  }
  rows.push(row);
  console.log(
    `${firm.id.padEnd(12)} ${row.blocked ? 'sin acceso' : `perf ${row.perf} a11y ${row.a11y} bp ${row.bp} seo ${row.seo}`}`,
  );
}

/* --- Capturas móviles de la home --- */
const browser = await chromium.launch({
  executablePath: fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined,
  args: ['--no-sandbox', '--ignore-certificate-errors'],
});
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const page = await ctx.newPage();

for (const firm of FIRMS) {
  try {
    await page.goto(firm.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(2500);
    await page.screenshot({ path: path.join(OUT, `${firm.id}-390.png`) });
    const row = rows.find((r) => r.id === firm.id);
    if (row) {
      // Señales objetivas del primer pantallazo.
      row.viewport = await page.evaluate(() => {
        const inFold = (el) => {
          const r = el.getBoundingClientRect();
          return r.top < window.innerHeight && r.bottom > 0 && r.width > 0;
        };
        const links = Array.from(document.querySelectorAll('a,button')).filter(inFold);
        const text = Array.from(document.querySelectorAll('h1,h2,p')).filter(inFold).map((e) => e.textContent?.trim()).filter(Boolean);
        const tel = document.querySelector('a[href^="tel:"]');
        const wa = document.querySelector('a[href*="wa.me"],a[href*="whatsapp"]');
        return {
          h1: document.querySelector('h1')?.textContent?.trim().slice(0, 120) ?? null,
          ctasEnPrimerPantallazo: links.length,
          textoEnPrimerPantallazo: text.slice(0, 3),
          tieneTelefono: Boolean(tel),
          tieneWhatsapp: Boolean(wa),
          idiomas: Array.from(document.querySelectorAll('link[rel="alternate"][hreflang]')).map((l) => l.getAttribute('hreflang')).slice(0, 6),
        };
      });
    }
    console.log(`captura ${firm.id} ok`);
  } catch (e) {
    console.log(`captura ${firm.id} sin acceso: ${String(e).slice(0, 90)}`);
  }
}

await browser.close();
fs.writeFileSync(path.join(OUT, 'resumen.json'), JSON.stringify({ date: new Date().toISOString(), rows }, null, 1));
