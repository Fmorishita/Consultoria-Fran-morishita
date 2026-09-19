/**
 * Fotografía de licencia libre (Pexels) para las secciones cuyo texto no queda
 * bien representado por el material que hoy publica el despacho.
 *
 * El cliente pidió expresamente «más que replicar las fotos de la web actual,
 * fotos que reflejen cada texto de mejor forma, más actualizado». Esto no rompe
 * la regla de cero invención del brief: esa regla gobierna los HECHOS —cifras,
 * nombres, servicios, precios—, no la fotografía de contexto, que ya se usaba
 * con licencia libre y queda acreditada una por una en docs/CREDITOS-IMAGENES.
 *
 * Ninguna de estas imágenes afirma nada sobre el despacho: no son sus oficinas,
 * ni su equipo, ni sus clientes. Son contexto del sector.
 *
 * Licencia Pexels: uso comercial permitido, sin atribución obligatoria. Se
 * acredita igualmente.
 */
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const FUENTE = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=2400`;

const MAP = [
  // Hero. Un exoesqueleto de hormigón: la estructura que sostiene el edificio,
  // que es exactamente la metáfora de «arquitectura jurídica empresarial».
  // Sustituye al viñedo, que no decía nada del negocio.
  { name: 'hero-estructura', id: 7915703, widths: [640, 1024, 1600] },
  // Empresas Binacionales. Fila de carga esperando en un cruce fronterizo.
  // Sustituye a un puente genérico que además recortaba mal.
  { name: 'industria-empresas-binacionales', id: 33384789, widths: [640, 1024] },
  // Comercio, Servicios y Manufactura. Línea de producción moderna, en vez de
  // una nave vacía.
  { name: 'industria-comercio-servicios-manufactura', id: 34221997, widths: [640, 1024] },
];

await mkdir('public/img', { recursive: true });
let fallos = 0;

for (const { name, id, widths } of MAP) {
  try {
    const res = await fetch(FUENTE(id));
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const { width, height } = await sharp(buf).metadata();
    for (const w of widths) {
      await sharp(buf).resize({ width: w, withoutEnlargement: true }).avif({ quality: 55 }).toFile(`public/img/${name}-${w}.avif`);
      await sharp(buf).resize({ width: w, withoutEnlargement: true }).webp({ quality: 72 }).toFile(`public/img/${name}-${w}.webp`);
    }
    console.log(`✓ ${name.padEnd(42)} ${width}×${height}  (pexels ${id})`);
  } catch (e) {
    fallos++;
    console.log(`✗ ${name.padEnd(42)} ${e.message}`);
  }
}
process.exit(fallos ? 1 : 0);
