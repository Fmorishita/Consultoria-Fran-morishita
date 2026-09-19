/**
 * Fotografía aportada directamente por el cliente.
 *
 * Originales en `assets/raw/cliente/`. Se optimizan a AVIF y WebP en dos
 * anchos, igual que el resto.
 *
 * Nota sobre el texto alternativo: estas imágenes NO se describen como
 * clientes, reuniones ni oficinas reales de Treu Legal & Business. El despacho
 * no ha afirmado que lo sean, así que el alt describe únicamente lo que se ve.
 * Es la misma línea que se siguió con el retrato de /la-firma/ hasta que el
 * despacho confirmó la identidad.
 */
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const MAP = [
  { origen: 'assets/raw/cliente/acuerdo.webp', name: 'acuerdo-cliente' },
  { origen: 'assets/raw/cliente/plan-de-trabajo.webp', name: 'plan-de-trabajo' },
];

const WIDTHS = [640, 1024];
await mkdir('public/img', { recursive: true });

let fallos = 0;
for (const { origen, name } of MAP) {
  try {
    const { width, height } = await sharp(origen).metadata();
    for (const w of WIDTHS) {
      await sharp(origen).resize({ width: w, withoutEnlargement: true }).avif({ quality: 55 }).toFile(`public/img/${name}-${w}.avif`);
      await sharp(origen).resize({ width: w, withoutEnlargement: true }).webp({ quality: 72 }).toFile(`public/img/${name}-${w}.webp`);
    }
    console.log(`✓ ${name.padEnd(24)} ${width}×${height}`);
  } catch (e) {
    fallos++;
    console.log(`✗ ${name.padEnd(24)} ${e.message}`);
  }
}
process.exit(fallos ? 1 : 0);
