/**
 * Descarga las imágenes que treulegal.solutions publica hoy en cada área de
 * práctica y en cada industria, y las deja en public/img/ en AVIF y WebP a dos
 * anchos.
 *
 * La correspondencia imagen→sección NO está inventada: cada URL es la de la
 * imagen que hoy precede a ese encabezado en el sitio actual. Se obtuvo
 * recorriendo content/_source/pages/home.json e industrias.json y emparejando
 * cada bloque `image` con el `heading` inmediatamente posterior, que es como
 * la maqueta actual las asocia.
 *
 * Es idempotente: se puede volver a ejecutar tras `npm run extract` para
 * comprobar que las imágenes de origen siguen siendo las mismas.
 */
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

/** [nombre en public/img/, URL en el sitio actual] */
const MAP = [
  ['area-corporate-business-law', 'https://treulegal.solutions/wp-content/uploads/2026/03/11.png?w=1024'],
  ['area-compliance-risk-prevention', 'https://treulegal.solutions/wp-content/uploads/2026/03/12.png?w=1024'],
  ['area-labor-employment-strategy', 'https://treulegal.solutions/wp-content/uploads/2026/03/13.png?w=1024'],
  [
    'area-corporate-governance-family-business',
    'https://treulegal.solutions/wp-content/uploads/2026/04/Brown-and-White-Modern-Expert-Legal-Services-Presentation-6-1024x576.png',
  ],
  ['area-cross-border-advisory', 'https://treulegal.solutions/wp-content/uploads/2026/03/14.png?w=1024'],
  ['area-strategic-litigation', 'https://treulegal.solutions/wp-content/uploads/2026/03/15.png?w=1024'],
  [
    'industria-desarrollo-inmobiliario',
    'https://treulegal.solutions/wp-content/uploads/2026/03/treu-legal-amp-business-69c28ac1979e2.png',
  ],
  [
    'industria-construccion-infraestructura',
    'https://treulegal.solutions/wp-content/uploads/2026/03/treu-legal-amp-business-69c287b0efae8.png',
  ],
  [
    'industria-comercio-servicios-manufactura',
    'https://treulegal.solutions/wp-content/uploads/2026/04/Brown-and-White-Modern-Expert-Legal-Services-Presentation-8.png',
  ],
  [
    'industria-empresas-binacionales',
    'https://treulegal.solutions/wp-content/uploads/2026/03/treu-legal-amp-business-69c2919e44f46.png',
  ],
];

const WIDTHS = [640, 1024];
await mkdir('public/img', { recursive: true });

let fallos = 0;
for (const [name, url] of MAP) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const { width, height } = await sharp(buf).metadata();
    for (const w of WIDTHS) {
      await sharp(buf).resize({ width: w, withoutEnlargement: true }).avif({ quality: 55 }).toFile(`public/img/${name}-${w}.avif`);
      await sharp(buf).resize({ width: w, withoutEnlargement: true }).webp({ quality: 72 }).toFile(`public/img/${name}-${w}.webp`);
    }
    console.log(`✓ ${name.padEnd(42)} ${width}×${height}`);
  } catch (e) {
    fallos++;
    console.log(`✗ ${name.padEnd(42)} ${e.message}`);
  }
}
process.exit(fallos ? 1 : 0);
