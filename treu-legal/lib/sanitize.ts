/**
 * Saneamiento del HTML que llega de WordPress.
 *
 * Se aplica una lista blanca: sólo las etiquetas y atributos que el contenido
 * editorial necesita. Todo lo demás se descarta, incluidos scripts, iframes,
 * estilos en línea y manejadores de eventos.
 */
const ALLOWED_TAGS = new Set([
  'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'sub', 'sup',
  'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li', 'blockquote', 'cite', 'q',
  'a', 'img', 'figure', 'figcaption',
  'table', 'thead', 'tbody', 'tr', 'th', 'td', 'caption',
  'hr', 'code', 'pre', 'span', 'div',
]);

const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(['href', 'title']),
  img: new Set(['src', 'alt', 'width', 'height']),
  th: new Set(['colspan', 'rowspan', 'scope']),
  td: new Set(['colspan', 'rowspan']),
};

const VOID_TAGS = new Set(['br', 'img', 'hr']);

/** Bloques completos que se eliminan con su contenido. */
const STRIP_BLOCKS = /<(script|style|noscript|iframe|object|embed|form|svg)\b[\s\S]*?<\/\1>/gi;

export function sanitizeWordPressHtml(html: string): string {
  let out = String(html)
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(STRIP_BLOCKS, '')
    // Etiquetas de apertura sueltas de elementos prohibidos.
    .replace(/<\/?(script|style|noscript|iframe|object|embed|form|svg)\b[^>]*>/gi, '');

  out = out.replace(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g, (_m, slash: string, rawTag: string, attrs: string) => {
    const tag = rawTag.toLowerCase();
    if (!ALLOWED_TAGS.has(tag)) return '';
    if (slash) return `</${tag}>`;

    const allowed = ALLOWED_ATTRS[tag];
    let kept = '';
    if (allowed) {
      for (const m of attrs.matchAll(/([a-zA-Z-]+)\s*=\s*"([^"]*)"/g)) {
        const name = m[1].toLowerCase();
        const value = m[2];
        if (!allowed.has(name)) continue;
        // Sólo esquemas seguros en enlaces e imágenes.
        if ((name === 'href' || name === 'src') && /^\s*(javascript|data|vbscript):/i.test(value)) continue;
        kept += ` ${name}="${value.replace(/"/g, '&quot;')}"`;
      }
      // Los enlaces externos se abren con seguridad.
      if (tag === 'a' && /href="https?:\/\//i.test(kept) && !kept.includes('treulegal.solutions')) {
        kept += ' target="_blank" rel="noopener noreferrer"';
      }
      if (tag === 'img') kept += ' loading="lazy" decoding="async"';
    }
    return VOID_TAGS.has(tag) ? `<${tag}${kept} />` : `<${tag}${kept}>`;
  });

  return out.trim();
}

/** Índice de contenidos a partir de los H2 del artículo. */
export function extractHeadings(html: string): { id: string; text: string }[] {
  const out: { id: string; text: string }[] = [];
  for (const m of html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)) {
    const text = m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (text) out.push({ id: slugifyHeading(text), text });
  }
  return out;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

/** Añade los id a los H2 para que el índice pueda enlazarlos. */
export function addHeadingIds(html: string): string {
  return html.replace(/<h2\b([^>]*)>([\s\S]*?)<\/h2>/gi, (_m, attrs: string, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (!text) return `<h2${attrs}>${inner}</h2>`;
    return `<h2${attrs} id="${slugifyHeading(text)}">${inner}</h2>`;
  });
}
