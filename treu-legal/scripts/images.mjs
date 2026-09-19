/**
 * Tubería de imágenes: aplica el tratamiento uniforme de la marca y genera
 * variantes responsivas en AVIF y WebP.
 *
 * Tratamiento: monocromo frío de bajo contraste. Es una decisión de diseño
 * (la fotografía acompaña, nunca compite con la retícula y la tipografía) y
 * además reduce el peso de forma drástica al eliminar el detalle de color.
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const RAW = path.join(ROOT, 'assets/raw');
const OUT = path.join(ROOT, 'public/img');

/** Monocromo frío: gris + un velo azul de marca muy sutil. */
const treat = (pipe) =>
  pipe
    .grayscale()
    .linear(0.92, 10) // baja el contraste y levanta las sombras
    .tint({ r: 226, g: 234, b: 242 });

const JOBS = [
  // El hero usa AVIF en los tres tamaños y WebP sólo hasta 1024: los
  // navegadores sin AVIF son minoría y 1024 les basta.
  { src: 'valle-de-guadalupe.jpg', name: 'valle-de-guadalupe', widths: [640, 1024, 1600], treat: true, webpUpTo: 1024 },
  { src: 'tijuana-san-diego-iss.jpg', name: 'tijuana-san-diego-iss', widths: [640, 1024], treat: true },
  { src: 'retrato-la-firma.png', name: 'retrato-la-firma', widths: [480, 800], treat: false },
];

const FORMATS = [
  ['avif', { quality: 44, effort: 6, chromaSubsampling: '4:2:0' }],
  ['webp', { quality: 70, effort: 6 }],
];

fs.mkdirSync(OUT, { recursive: true });
const manifest = [];

for (const job of JOBS) {
  const input = path.join(RAW, job.src);
  if (!fs.existsSync(input)) {
    console.warn('falta el original:', job.src);
    continue;
  }
  const meta = await sharp(input).metadata();
  for (const width of job.widths) {
    for (const [fmt, opts] of FORMATS) {
      if (fmt === 'webp' && job.webpUpTo && width > job.webpUpTo) continue;
      let pipe = sharp(input).resize({ width, withoutEnlargement: true });
      if (job.treat) pipe = treat(pipe);
      const buf = await pipe.toFormat(fmt, opts).toBuffer();
      const file = `${job.name}-${width}.${fmt}`;
      fs.writeFileSync(path.join(OUT, file), buf);
      manifest.push({ file, bytes: buf.length });
      console.log(`${String((buf.length / 1024).toFixed(1)).padStart(8)} KB  ${file}`);
    }
  }
  manifest.push({ name: job.name, intrinsic: `${meta.width}x${meta.height}` });
}

fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 1));
