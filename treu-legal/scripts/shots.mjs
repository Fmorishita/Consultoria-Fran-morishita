/**
 * Capturas de pantalla de control. Se usan para revisar el diseño contra
 * docs/DISENO.md antes de dar por buena una página.
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.SHOT_BASE || 'http://127.0.0.1:3000';
const OUT = process.env.SHOT_OUT || 'docs/_capturas';
const WIDTHS = (process.env.SHOT_WIDTHS || '390,1440').split(',').map(Number);
const ROUTES = (process.env.SHOT_ROUTES || '/').split(',');
const FULL = process.env.SHOT_FULL !== '0';

fs.mkdirSync(OUT, { recursive: true });
// Usa el Chromium preinstalado del entorno en lugar de descargar otro.
const EXECUTABLE = process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium';
const browser = await chromium.launch({
  executablePath: fs.existsSync(EXECUTABLE) ? EXECUTABLE : undefined,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

for (const width of WIDTHS) {
  const ctx = await browser.newContext({
    viewport: { width, height: width < 700 ? 844 : 900 },
    deviceScaleFactor: 1,
    isMobile: width < 700,
    hasTouch: width < 700,
  });
  const page = await ctx.newPage();
  const errors = [];
  // Fuera de Vercel, /_vercel/insights no existe: ese 404 no es un error del sitio.
  const ignorable = (t) => t.includes('_vercel/') || t.includes('ERR_FAILED');
  page.on('console', (m) => m.type() === 'error' && !ignorable(m.text()) && errors.push(m.text()));
  page.on('pageerror', (e) => !ignorable(String(e)) && errors.push(String(e)));
  await page.route('**/_vercel/**', (r) => r.abort());

  for (const route of ROUTES) {
    const url = BASE + route;
    const res = await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.waitForLoadState('domcontentloaded');
    if (FULL) {
      // Recorre la pagina para disparar la carga diferida antes de capturar.
      await page.evaluate(async () => {
        const step = window.innerHeight * 0.8;
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo(0, 0);
      });
    }
    await page
      .waitForFunction(
        () => Array.from(document.images).every((i) => i.complete && i.naturalWidth > 0),
        null,
        { timeout: 30000 },
      )
      .catch(() => console.log('  aviso: alguna imagen no termino de cargar'));
    await page.waitForTimeout(500);
    const name = (route === '/' ? 'home' : route.replace(/^\/|\/$/g, '').replace(/\//g, '__')) + `-${width}`;
    await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: FULL });
    // Comprueba que no haya scroll horizontal.
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    console.log(
      `${String(res?.status()).padEnd(4)} ${String(width).padEnd(5)} ${route.padEnd(46)} overflowX=${overflow}`,
    );
  }
  if (errors.length) console.log(`  errores de consola @${width}:`, errors.slice(0, 5));
  await ctx.close();
}

await browser.close();
