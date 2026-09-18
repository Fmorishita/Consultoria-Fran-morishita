import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/lib/wordpress';
import { ui } from '@/content/microcopy';

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });

/**
 * Tarjeta de Insight. Las miniaturas del sitio (foto de stock con velo azul)
 * son consistentes entre sí: se conservan con recorte y tratamiento uniformes.
 */
export function PostCard({
  post,
  priority = false,
  headingLevel = 3,
}: {
  post: Post;
  priority?: boolean;
  /** 2 cuando las tarjetas son el primer nivel bajo el H1 de la página. */
  headingLevel?: 2 | 3;
}) {
  const Heading = `h${headingLevel}` as 'h2' | 'h3';
  return (
    <article className="group flex h-full flex-col bg-white">
      <Link href={post.path} className="flex h-full flex-col">
        {post.featured && (
          <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-paper">
            <Image
              src={post.featured.src}
              alt={post.featured.alt}
              fill
              sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 100vw"
              priority={priority}
              className="object-cover transition-transform duration-500 ease-plan group-hover:scale-[1.03]"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
          <p className="text-step--1 text-slate">
            <time dateTime={post.date}>{fmtDate(post.date)}</time>
            <span aria-hidden="true"> · </span>
            {post.readingMinutes} {ui.readingTime}
          </p>
          <Heading className="text-step-2 leading-tight text-ink transition-colors group-hover:text-blue">
            {post.title}
          </Heading>
          {post.excerpt && (
            <p className="line-clamp-3 text-step--1 leading-relaxed text-slate">{post.excerpt}</p>
          )}
        </div>
      </Link>
    </article>
  );
}

/** Rejilla de artículos con el mismo trazo fino del resto del sistema. */
export function PostGrid({
  posts,
  priorityFirst = false,
  headingLevel = 3,
}: {
  posts: Post[];
  priorityFirst?: boolean;
  headingLevel?: 2 | 3;
}) {
  return (
    <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => (
        <li key={post.id} className="bg-white">
          <PostCard post={post} priority={priorityFirst && i === 0} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
