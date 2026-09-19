/**
 * Cargador del contenido institucional extraído del sitio actual.
 *
 * Lee content/_source/pages/*.json (generado por scripts/extract.mjs) y lo
 * entrega saneado: sin residuos de plantilla, con las erratas corregidas y
 * sin MAYÚSCULAS sostenidas. El texto nunca se parafrasea.
 */
import fs from 'node:fs';
import path from 'node:path';
import { applyCorrections, blockedImageHosts, blockedText, unshout } from './corrections';

export type Block =
  | { type: 'heading'; level: number; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'image'; src: string; alt: string | null; caption?: string | null };

export type SourcePage = {
  id: number;
  slug: string;
  path: string;
  source: string;
  title: string;
  extractedVia: string;
  meta: {
    title?: string;
    description?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    canonical?: string;
  };
  blocks: Block[];
};

const DIR = path.join(process.cwd(), 'content/_source/pages');
const cache = new Map<string, SourcePage | null>();

/** Bloques de relleno de SEO (listas de palabras clave) que no son contenido. */
const KEYWORD_STUFFING = /^(corporate|business|labor|employment|construction|doing business|regulatory|compliance)\b[\w\s]*\b(mexico|méxico|companies)\b$/i;

function sanitize(blocks: Block[]): Block[] {
  const out: Block[] = [];
  for (const raw of blocks) {
    const b = { ...raw } as Block;

    if (b.type === 'image') {
      if (blockedImageHosts.some((h) => b.src.includes(h))) continue;
      out.push(b);
      continue;
    }

    if (b.type === 'list') {
      const items = b.items.map((i) => applyCorrections(i)).filter((i) => !blockedText.some((t) => i.includes(t)));
      if (!items.length) continue;
      out.push({ ...b, items });
      continue;
    }

    const text = applyCorrections(b.text);
    if (!text || blockedText.some((t) => text.includes(t))) continue;
    // El "365" suelto al final de la home no es contenido del despacho.
    if (/^\d{1,4}$/.test(text)) continue;
    if (KEYWORD_STUFFING.test(text)) continue;

    if (b.type === 'heading') {
      out.push({ ...b, text: unshout(text) });
      continue;
    }
    out.push({ ...b, text });
  }

  // Colapsa encabezados consecutivos vacíos de contenido.
  return out.filter((b, i) => {
    if (b.type !== 'heading') return true;
    const next = out[i + 1];
    return !(next && next.type === 'heading' && next.text === b.text);
  });
}

export function getPage(slug: string): SourcePage | null {
  if (cache.has(slug)) return cache.get(slug) ?? null;
  const file = path.join(DIR, `${slug}.json`);
  if (!fs.existsSync(file)) {
    cache.set(slug, null);
    return null;
  }
  const raw = JSON.parse(fs.readFileSync(file, 'utf8')) as SourcePage;
  const page: SourcePage = { ...raw, blocks: sanitize(raw.blocks) };
  cache.set(slug, page);
  return page;
}

export function listPages(): SourcePage[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => getPage(f.replace(/\.json$/, '')))
    .filter((p): p is SourcePage => Boolean(p));
}

/** Descarta el primer encabezado si repite el título (evita H1 duplicado). */
export function bodyBlocks(page: SourcePage, title?: string): Block[] {
  const blocks = [...page.blocks];
  const norm = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();
  while (blocks.length) {
    const first = blocks[0];
    if (first.type === 'heading' && (norm(first.text) === norm(title ?? page.title) || first.level === 1)) {
      blocks.shift();
      continue;
    }
    break;
  }
  return blocks;
}

/** Primer párrafo con cuerpo suficiente: sirve de entradilla literal. */
export function leadParagraph(page: SourcePage, minLength = 60): string | null {
  const p = page.blocks.find((b) => b.type === 'paragraph' && b.text.length >= minLength);
  return p && p.type === 'paragraph' ? p.text : null;
}

/** Normaliza para comparar encabezados. */
const key = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

/**
 * Devuelve los bloques que siguen a un encabezado, hasta el siguiente
 * encabezado del mismo nivel o superior. Permite maquetar una página a medida
 * conservando el texto literal del origen.
 */
export function section(page: SourcePage, heading: string): Block[] {
  const target = key(heading);
  const start = page.blocks.findIndex((b) => b.type === 'heading' && key(b.text).includes(target));
  if (start < 0) return [];
  const level = (page.blocks[start] as { level: number }).level;
  const out: Block[] = [];
  for (let i = start + 1; i < page.blocks.length; i++) {
    const b = page.blocks[i];
    if (b.type === 'heading' && b.level <= level) break;
    out.push(b);
  }
  return out;
}

/** Pares encabezado + párrafos, útil para perfiles y preguntas frecuentes. */
export function subsections(
  page: SourcePage,
  heading: string,
  level = 3,
): { title: string; body: string[] }[] {
  const blocks = section(page, heading);
  const out: { title: string; body: string[] }[] = [];
  for (const b of blocks) {
    if (b.type === 'heading' && b.level === level) {
      out.push({ title: b.text, body: [] });
    } else if (b.type === 'paragraph' && out.length) {
      out[out.length - 1].body.push(b.text);
    } else if (b.type === 'list' && out.length) {
      out[out.length - 1].body.push(...b.items);
    }
  }
  return out.filter((s) => s.body.length > 0);
}

/** Párrafos de una sección, sin sus subtítulos. */
export function sectionParagraphs(page: SourcePage, heading: string, maxLevel = 2): string[] {
  const blocks = section(page, heading);
  const out: string[] = [];
  for (const b of blocks) {
    if (b.type === 'heading' && b.level > maxLevel) break;
    if (b.type === 'paragraph') out.push(b.text);
  }
  return out;
}
