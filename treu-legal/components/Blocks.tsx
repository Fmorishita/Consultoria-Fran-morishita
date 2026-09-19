import Image from 'next/image';
import type { Block } from '@/content/pages';

/**
 * Renderiza los bloques extraídos del sitio actual con los estilos de lectura
 * del sistema. El texto nunca se altera aquí: llega ya saneado desde
 * content/pages.ts.
 */
export function Blocks({
  blocks,
  startLevel = 2,
  className = '',
}: {
  blocks: Block[];
  /** Nivel del primer encabezado, para mantener la jerarquía de la página. */
  startLevel?: 2 | 3;
  className?: string;
}) {
  // Reencaja los niveles del origen bajo el H1 de la página sin saltos: un
  // encabezado nunca baja más de un nivel respecto al anterior. Es lo que
  // exige WCAG y lo que comprueba axe (heading-order).
  const levels = normalizeHeadingLevels(blocks, startLevel);

  return (
    <div className={`prose-treu ${className}`}>
      {blocks.map((block, i) => {
        const key = `${block.type}-${i}`;

        if (block.type === 'heading') {
          const Tag = `h${levels.get(i) ?? startLevel}` as 'h2' | 'h3' | 'h4';
          return <Tag key={key}>{block.text}</Tag>;
        }

        if (block.type === 'paragraph') return <p key={key}>{block.text}</p>;

        if (block.type === 'quote')
          return <blockquote key={key}>{block.text}</blockquote>;

        if (block.type === 'list') {
          const Tag = block.ordered ? 'ol' : 'ul';
          return (
            <Tag key={key}>
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </Tag>
          );
        }

        if (block.type === 'image') {
          // Las imágenes decorativas del origen no aportan a la lectura.
          if (!block.alt) return null;
          return (
            <figure key={key} className="my-8">
              <Image
                src={block.src}
                alt={block.alt}
                width={1024}
                height={576}
                sizes="(min-width: 768px) 68ch, 100vw"
                className="h-auto w-full border border-line"
              />
              {block.caption && (
                <figcaption className="mt-2 font-sans text-step--1 text-slate">{block.caption}</figcaption>
              )}
            </figure>
          );
        }

        return null;
      })}
    </div>
  );
}

/**
 * Mapa índice de bloque -> nivel de encabezado a renderizar.
 * Conserva la jerarquía relativa del origen pero sin saltos de nivel.
 */
function normalizeHeadingLevels(blocks: Block[], startLevel: number): Map<number, number> {
  const out = new Map<number, number>();
  /** Pila de niveles de origen ya abiertos. */
  const stack: number[] = [];

  blocks.forEach((block, i) => {
    if (block.type !== 'heading') return;
    while (stack.length && stack[stack.length - 1] >= block.level) stack.pop();
    stack.push(block.level);
    out.set(i, Math.min(startLevel + stack.length - 1, 6));
  });

  return out;
}
