/**
 * WordPress como CMS headless para los Insights.
 *
 * El fundador sigue publicando en WordPress exactamente como hoy. El sitio lee
 * posts, categorías, autor y medios por REST API con ISR (revalidación cada
 * 15 minutos) y un endpoint de revalidación on-demand protegido con secreto.
 */
const API = (process.env.WORDPRESS_API_URL || 'https://treulegal.solutions/wp-json/wp/v2').replace(/\/$/, '');

/** Etiquetas de caché para la revalidación on-demand. */
export const TAGS = { posts: 'wp-posts', categories: 'wp-categories' } as const;

export const REVALIDATE_SECONDS = 900;

export type Post = {
  id: number;
  slug: string;
  date: string;
  dateGmt: string;
  modified: string;
  title: string;
  excerpt: string;
  content: string;
  link: string;
  path: string;
  categories: number[];
  featured: { src: string; alt: string; width?: number; height?: number } | null;
  authorId: number;
  readingMinutes: number;
};

export type Category = {
  id: number;
  slug: string;
  name: string;
  count: number;
  description: string;
  parent: number;
  /** Ruta original, que en WordPress incluye la categoría madre. */
  path: string;
};
export type Author = { id: number; name: string; description: string; slug: string };

const decodeEntities = (s: string) =>
  String(s)
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&hellip;/g, '…')
    .replace(/&#8217;|&rsquo;/g, '’')
    .replace(/&#8220;|&ldquo;/g, '“')
    .replace(/&#8221;|&rdquo;/g, '”')
    .replace(/&#8211;|&ndash;/g, '–')
    .replace(/&#8212;|&mdash;/g, '—')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

const plain = (html: string) => decodeEntities(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

async function wp<T>(path: string, tag: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, {
      next: { revalidate: REVALIDATE_SECONDS, tags: [tag] },
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    // Si WordPress no responde, la página se sirve sin la lista de artículos
    // en lugar de romperse.
    return null;
  }
}

/** Ruta original del artículo: /AAAA/MM/DD/slug/ */
export function postPath(post: { date: string; slug: string }): string {
  const d = new Date(post.date);
  const p = (n: number) => String(n).padStart(2, '0');
  return `/${d.getFullYear()}/${p(d.getMonth() + 1)}/${p(d.getDate())}/${post.slug}/`;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapPost(raw: any): Post {
  const media = raw._embedded?.['wp:featuredmedia']?.[0];
  const text = plain(raw.content?.rendered ?? '');
  return {
    id: raw.id,
    slug: raw.slug,
    date: raw.date,
    dateGmt: raw.date_gmt,
    modified: raw.modified,
    title: decodeEntities(raw.title?.rendered ?? ''),
    excerpt: plain(raw.excerpt?.rendered ?? ''),
    content: raw.content?.rendered ?? '',
    link: raw.link,
    path: postPath(raw),
    categories: raw.categories ?? [],
    featured: media?.source_url
      ? {
          src: media.source_url,
          alt: decodeEntities(media.alt_text || raw.title?.rendered || ''),
          width: media.media_details?.width,
          height: media.media_details?.height,
        }
      : null,
    authorId: raw.author,
    // 200 palabras por minuto, redondeado hacia arriba.
    readingMinutes: Math.max(1, Math.round(text.split(/\s+/).length / 200)),
  };
}

export async function getPosts({
  perPage = 12,
  page = 1,
  category,
  search,
}: { perPage?: number; page?: number; category?: number; search?: string } = {}): Promise<{
  posts: Post[];
  total: number;
  totalPages: number;
}> {
  const params = new URLSearchParams({
    per_page: String(perPage),
    page: String(page),
    _embed: 'wp:featuredmedia',
    orderby: 'date',
    order: 'desc',
  });
  if (category) params.set('categories', String(category));
  if (search) params.set('search', search);

  // Se necesitan las cabeceras de total, así que aquí no se usa el helper.
  try {
    const res = await fetch(`${API}/posts?${params}`, {
      next: { revalidate: REVALIDATE_SECONDS, tags: [TAGS.posts] },
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return { posts: [], total: 0, totalPages: 0 };
    const raw = (await res.json()) as any[];
    return {
      posts: raw.map(mapPost),
      total: Number(res.headers.get('x-wp-total') ?? raw.length),
      totalPages: Number(res.headers.get('x-wp-totalpages') ?? 1),
    };
  } catch {
    return { posts: [], total: 0, totalPages: 0 };
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const raw = await wp<any[]>(`/posts?slug=${encodeURIComponent(slug)}&_embed=wp:featuredmedia`, TAGS.posts);
  if (!raw?.length) return null;
  return mapPost(raw[0]);
}

export async function getAllPostSlugs(): Promise<{ slug: string; date: string; modified: string }[]> {
  const raw = await wp<any[]>('/posts?per_page=100&_fields=slug,date,modified&orderby=date&order=desc', TAGS.posts);
  return (raw ?? []).map((p) => ({ slug: p.slug, date: p.date, modified: p.modified }));
}

export async function getCategories(): Promise<Category[]> {
  const raw = await wp<any[]>('/categories?per_page=100&orderby=count&order=desc', TAGS.categories);
  return (raw ?? [])
    .filter((c) => c.count > 0)
    .map((c) => ({
      id: c.id,
      slug: c.slug,
      name: decodeEntities(c.name),
      count: c.count,
      description: plain(c.description ?? ''),
      parent: c.parent ?? 0,
      // Se conserva la ruta jerárquica que WordPress ya publica.
      path: String(c.link ?? '').replace('https://treulegal.solutions', '') || `/category/${c.slug}/`,
    }));
}

/** Segmentos de la ruta de una categoría, sin el prefijo /category/. */
export function categorySegments(category: Category): string[] {
  return category.path.replace(/^\/category\//, '').replace(/\/$/, '').split('/').filter(Boolean);
}

export async function getAuthor(id: number): Promise<Author | null> {
  const raw = await wp<any>(`/users/${id}`, TAGS.posts);
  if (!raw) return null;
  return {
    id: raw.id,
    name: decodeEntities(raw.name ?? ''),
    description: plain(raw.description ?? ''),
    slug: raw.slug,
  };
}

export async function getRelatedPosts(post: Post, limit = 3): Promise<Post[]> {
  if (!post.categories.length) return [];
  const { posts } = await getPosts({ perPage: limit + 1, category: post.categories[0] });
  return posts.filter((p) => p.id !== post.id).slice(0, limit);
}
