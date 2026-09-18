// Utilidades de conversión HTML -> bloques estructurados.
// Todo el texto que sale de aquí es literal del sitio original.
const NAMED = {
  amp: '&', nbsp: ' ', lt: '<', gt: '>', quot: '"', apos: "'",
  hellip: '…', mdash: '—', ndash: '–', trade: '™',
  laquo: '«', raquo: '»', rsquo: '’', lsquo: '‘',
  ldquo: '“', rdquo: '”', deg: '°', middot: '·',
  aacute: 'á', eacute: 'é', iacute: 'í', oacute: 'ó',
  uacute: 'ú', ntilde: 'ñ', Ntilde: 'Ñ', uuml: 'ü',
};

export function decodeEntities(s) {
  return String(s)
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z][a-z0-9]*);/gi, (m, n) => (NAMED[n] !== undefined ? NAMED[n] : m));
}

const norm = (s) => decodeEntities(s).replace(/ /g, ' ').replace(/\s+/g, ' ').trim();

function inlineText(html) {
  return norm(String(html).replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, ''));
}

/** Quita ruido: scripts, estilos, comentarios, svg, formularios y navegación. */
export function denoise(html) {
  return String(html)
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<form[\s\S]*?<\/form>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '');
}

/** Recorta el HTML al área de contenido principal, fuera de header y footer. */
export function mainRegion(html) {
  let h = html;
  const skip = h.indexOf('wp--skip-link--target');
  if (skip > -1) h = h.slice(h.indexOf('>', skip) + 1);
  for (const marker of ['<footer', 'jp-carousel-loading-overlay']) {
    const i = h.indexOf(marker);
    if (i > 200) h = h.slice(0, i);
  }
  return h;
}

const BLOCK_RE = /<(h1|h2|h3|h4|h5|h6|p|ul|ol|blockquote|figure)\b([^>]*)>([\s\S]*?)<\/\1>|<(img)\b([^>]*?)\/?>/gi;

/**
 * Convierte HTML en una lista de bloques tipados.
 * Tipos: heading (level), paragraph, list (items, ordered), quote, image.
 */
export function toBlocks(html) {
  const clean = denoise(html);
  const out = [];
  const push = (b) => {
    const last = out[out.length - 1];
    if (last && JSON.stringify(last) === JSON.stringify(b)) return;
    out.push(b);
  };

  for (const m of clean.matchAll(BLOCK_RE)) {
    const tag = (m[1] || m[4] || '').toLowerCase();
    const attrs = m[2] || m[5] || '';
    const inner = m[3] || '';

    if (tag === 'img') {
      const src = (attrs.match(/\ssrc="([^"]*)"/) || [])[1] || '';
      const alt = (attrs.match(/\salt="([^"]*)"/) || [])[1];
      if (src && !/^data:/.test(src)) push({ type: 'image', src, alt: alt ? norm(alt) : null });
      continue;
    }
    if (/^h[1-6]$/.test(tag)) {
      const t = inlineText(inner);
      if (t) push({ type: 'heading', level: Number(tag[1]), text: t });
      continue;
    }
    if (tag === 'p' || tag === 'blockquote') {
      const t = inlineText(inner);
      if (t && t.length > 1) push({ type: tag === 'p' ? 'paragraph' : 'quote', text: t });
      continue;
    }
    if (tag === 'ul' || tag === 'ol') {
      const items = [...inner.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)]
        .map((li) => inlineText(li[1]))
        .filter(Boolean);
      if (items.length) push({ type: 'list', ordered: tag === 'ol', items });
      continue;
    }
    if (tag === 'figure') {
      const im = inner.match(/<img\b([^>]*)>/i);
      if (im) {
        const src = (im[1].match(/\ssrc="([^"]*)"/) || [])[1] || '';
        const alt = (im[1].match(/\salt="([^"]*)"/) || [])[1];
        const cap = (inner.match(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/i) || [])[1];
        if (src) push({ type: 'image', src, alt: alt ? norm(alt) : null, caption: cap ? inlineText(cap) : null });
      }
      continue;
    }
  }
  return out;
}

/** Texto plano de una lista de bloques, para verify:content. */
export function blocksToText(blocks) {
  return blocks
    .map((b) => {
      if (b.type === 'heading' || b.type === 'paragraph' || b.type === 'quote') return b.text;
      if (b.type === 'list') return b.items.join('\n');
      if (b.type === 'image') return b.caption || '';
      return '';
    })
    .filter(Boolean)
    .join('\n');
}
export { norm, inlineText };
