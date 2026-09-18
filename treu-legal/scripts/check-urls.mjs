/**
 * Comprueba que todas las URLs del sitio actual respondan 200 o 301 en el
 * sitio nuevo. La lista se construye del contenido extraído.
 */
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.CHECK_BASE || 'http://127.0.0.1:3100';
const SRC = path.resolve(import.meta.dirname, '../content/_source');

const read = (f) => JSON.parse(fs.readFileSync(path.join(SRC, f), 'utf8'));
const pages = read('pages.json');
const posts = read('posts.json');
const categories = read('categories.json');
const users = read('users.json');

const strip = (link) => link.replace('https://treulegal.solutions', '');

const urls = [
  ...pages.map((p) => strip(p.link)),
  ...posts.map((p) => strip(p.link)),
  ...categories.filter((c) => c.count > 0).map((c) => strip(c.link)),
  ...users.map((u) => strip(u.link)),
  '/feed/',
  '/sitemap.xml',
  '/robots.txt',
  '/en/',
];

const unique = [...new Set(urls)];
const results = { ok: 0, redirect: 0, bad: [] };

for (const url of unique) {
  try {
    const res = await fetch(BASE + url, { redirect: 'manual' });
    if (res.status === 200) results.ok++;
    else if (res.status === 301 || res.status === 308) results.redirect++;
    else results.bad.push(`${res.status} ${url}`);
  } catch (e) {
    results.bad.push(`ERR  ${url}  ${String(e).slice(0, 60)}`);
  }
}

console.log(`URLs comprobadas: ${unique.length}`);
console.log(`  200:      ${results.ok}`);
console.log(`  301/308:  ${results.redirect}`);
console.log(`  fallos:   ${results.bad.length}`);
if (results.bad.length) {
  console.log('\n' + results.bad.slice(0, 40).join('\n'));
  process.exitCode = 1;
}
