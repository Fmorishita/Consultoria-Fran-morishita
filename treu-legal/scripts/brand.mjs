/**
 * Prepara los activos de marca: recorta el margen sobrante de los PNG
 * originales y genera WebP ligeros en los tamaños que usa el sitio.
 *
 * Originales en assets/raw/brand/ (descargados del sitio actual).
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const RAW = path.join(ROOT, 'assets/raw/brand');
const OUT = path.join(ROOT, 'public/brand');

const JOBS = [
  { src: 'wordmark-azul.png', name: 'wordmark-azul', width: 640 },
  { src: 'reforzador-blanco.png', name: 'wordmark-blanco', width: 640 },
  { src: 'isotipo-azul.png', name: 'isotipo-azul', width: 320 },
  { src: 'isotipo-blanco.png', name: 'isotipo-blanco', width: 320 },
];

fs.mkdirSync(OUT, { recursive: true });
const sizes = {};

for (const job of JOBS) {
  const input = path.join(RAW, job.src);
  if (!fs.existsSync(input)) {
    console.warn('falta', job.src);
    continue;
  }
  const buf = await sharp(input)
    .trim({ threshold: 8 })
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: 92, effort: 6 })
    .toBuffer();
  const meta = await sharp(buf).metadata();
  fs.writeFileSync(path.join(OUT, `${job.name}.webp`), buf);
  sizes[job.name] = { width: meta.width, height: meta.height, bytes: buf.length };
  console.log(`${String((buf.length / 1024).toFixed(1)).padStart(7)} KB  ${job.name}.webp  ${meta.width}x${meta.height}`);
}

// Favicon e icono de aplicación a partir del isotipo azul.
const ico = await sharp(path.join(RAW, 'isotipo-azul.png'))
  .trim({ threshold: 8 })
  .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
  .png()
  .toBuffer();
fs.writeFileSync(path.join(ROOT, 'app/icon.png'), ico);
console.log(`${String((ico.length / 1024).toFixed(1)).padStart(7)} KB  app/icon.png  512x512`);

fs.writeFileSync(path.join(OUT, 'sizes.json'), JSON.stringify(sizes, null, 1));
