/**
 * Redacta credenciales encontradas en el contenido extraído.
 *
 * El sitio actual incrusta un token de Mapbox en el HTML de una de sus
 * páginas. No se versiona: se sustituye por un marcador y se anota en
 * docs/PENDIENTES-CLIENTE.md para que el despacho lo revoque.
 *
 * Idempotente: se puede ejecutar después de cada `npm run extract`.
 */
import fs from 'node:fs';
import path from 'node:path';

const SRC = path.resolve(import.meta.dirname, '../content/_source');

/** Patrones de credencial que nunca deben quedar en el repositorio. */
const PATTERNS = [
  { name: 'Mapbox (secreto)', re: /sk\.[A-Za-z0-9_-]{20,}/g },
  { name: 'Mapbox (público)', re: /pk\.ey[A-Za-z0-9_.-]{20,}/g },
  { name: 'Google API key', re: /AIza[A-Za-z0-9_-]{30,}/g },
];

const PLACEHOLDER = '[[CREDENCIAL-REDACTADA]]';
const report = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.json')) redact(full);
  }
}

function redact(file) {
  const before = fs.readFileSync(file, 'utf8');
  let after = before;
  const found = [];

  for (const { name, re } of PATTERNS) {
    const matches = after.match(re);
    if (!matches?.length) continue;
    found.push({ name, count: matches.length });
    after = after.replace(re, PLACEHOLDER);
  }

  if (!found.length) return;
  fs.writeFileSync(file, after);
  report.push({ file: path.relative(path.join(SRC, '..', '..'), file), found });
}

walk(SRC);

if (!report.length) {
  console.log('Sin credenciales en el contenido extraído.');
} else {
  console.log('Credenciales redactadas:');
  for (const r of report) {
    console.log(`  ${r.file}`);
    for (const f of r.found) console.log(`    ${f.name} x${f.count}`);
  }
}
