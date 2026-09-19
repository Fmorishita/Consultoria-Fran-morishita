'use client';

import { useState } from 'react';
import { Icon } from './Icon';
import { ui } from '@/content/microcopy';

/** Compartir por LinkedIn, WhatsApp o copiar el enlace. */
export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const share = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  };

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-step--1 text-slate">{ui.share}</span>
      <a
        href={share.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-11 w-11 items-center justify-center border border-line text-ink transition-colors hover:border-blue hover:text-blue"
      >
        <span className="sr-only">Compartir en LinkedIn</span>
        <Icon name="linkedin" className="h-4 w-4" />
      </a>
      <a
        href={share.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-11 w-11 items-center justify-center border border-line text-ink transition-colors hover:border-blue hover:text-blue"
      >
        <span className="sr-only">Compartir por WhatsApp</span>
        <Icon name="messageCircle" className="h-4 w-4" />
      </a>
      <button
        type="button"
        onClick={copy}
        className="flex min-h-[44px] items-center gap-2 border border-line px-3 text-step--1 text-ink transition-colors hover:border-blue hover:text-blue"
      >
        <Icon name={copied ? 'check' : 'link'} className="h-4 w-4" />
        {copied ? ui.linkCopied : ui.copyLink}
      </button>
    </div>
  );
}
