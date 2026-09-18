/**
 * Extrae el contenido del sitio actual (treulegal.solutions) a JSON estructurado.
 * Fuente de verdad: WP REST API + HTML renderizado.
 * Salida: content/_source/pages/<slug>.json y content/_source/index.json
 */
import fs from 'node:fs';
import path from 'node:path';
import { toBlocks, mainRegion, blocksToText, norm } from './lib/html.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'content/_source');
const ORIGIN = 'https://treulegal.solutions';

const pages = JSON.parse(fs.readFileSync(path.join(SRC, 'pages.json'), 'utf8'));

// Páginas cuyo contenido visible vive en el page builder, no en content.rendered.
const FROM_HTML = new Set([13, 234, 1907, 2767]);

const fileFor = (p) => {
  const rel = p.link.replace(ORIGIN, '').replace(/^\/|\/$/g, '');
  return (rel === '' ? '__home__' : rel.replace(/\//g, '__')) + '.html';
};

const slugFor = (p) => {
  const rel = p.link.replace(ORIGIN, '').replace(/^\/|\/$/g, '');
  return rel === '' ? 'home' : rel.replace(/\//g, '--');
};

const index = [];
fs.mkdirSync(path.join(SRC, 'pages'), { recursive: true });

for (const p of pages) {
  const routePath = p.link.replace(ORIGIN, '');
  const htmlFile = path.join(SRC, 'html', fileFor(p));
  const rawHtml = fs.existsSync(htmlFile) ? fs.readFileSync(htmlFile, 'utf8') : '';

  let blocks = [];
  let via = 'api';
  if (FROM_HTML.has(p.id) || !p.content?.rendered?.trim()) {
    via = 'html';
    const body = (rawHtml.match(/<body[\s\S]*<\/body>/i) || [''])[0];
    blocks = toBlocks(mainRegion(body));
  } else {
    blocks = toBlocks(p.content.rendered);
  }

  // Metadatos del <head> renderizado.
  const meta = {};
  for (const [key, re] of [
    ['title', /<title>([\s\S]*?)<\/title>/i],
    ['description', /<meta name="description" content="([^"]*)"/i],
    ['ogTitle', /<meta property="og:title" content="([^"]*)"/i],
    ['ogDescription', /<meta property="og:description" content="([^"]*)"/i],
    ['ogImage', /<meta property="og:image" content="([^"]*)"/i],
    ['canonical', /<link rel="canonical" href="([^"]*)"/i],
  ]) {
    const m = rawHtml.match(re);
    if (m) meta[key] = norm(m[1]);
  }

  const headings = blocks.filter((b) => b.type === 'heading').map((b) => `h${b.level}: ${b.text}`);
  const images = blocks.filter((b) => b.type === 'image');
  const record = {
    id: p.id,
    slug: slugFor(p),
    path: routePath,
    source: p.link,
    title: norm(p.title.rendered),
    extractedVia: via,
    meta,
    blocks,
  };
  fs.writeFileSync(path.join(SRC, 'pages', slugFor(p) + '.json'), JSON.stringify(record, null, 1));
  index.push({
    id: p.id, slug: slugFor(p), path: routePath, title: record.title, via,
    blocks: blocks.length, headings: headings.length,
    imagesWithoutAlt: images.filter((i) => !i.alt).length,
    chars: blocksToText(blocks).length,
  });
}

fs.writeFileSync(path.join(SRC, 'index.json'), JSON.stringify(index, null, 1));
console.log(`Extraídas ${index.length} páginas`);
console.table(index.map((i) => ({ path: i.path.slice(0, 48), via: i.via, blocks: i.blocks, chars: i.chars, noAlt: i.imagesWithoutAlt })));
