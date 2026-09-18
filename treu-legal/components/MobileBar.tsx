'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Icon } from './Icon';
import { contact, session } from '@/content/facts';
import { ui } from '@/content/microcopy';
import { track } from '@/lib/analytics';

/**
 * Barra inferior fija en móvil: Sesión, WhatsApp y Llamar.
 * Se oculta cuando el formulario está en pantalla para no taparlo.
 */
export function MobileBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const form = document.getElementById('formulario');
    if (!form) return;
    const obs = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { rootMargin: '-20% 0px -20% 0px' },
    );
    obs.observe(form);
    return () => obs.disconnect();
  }, []);

  return (
    <nav
      aria-label="Contacto directo"
      aria-hidden={hidden}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur transition-transform duration-300 ease-plan lg:hidden ${
        hidden ? 'translate-y-full' : 'translate-y-0'
      }`}
      style={{ paddingBottom: 'max(0px, env(safe-area-inset-bottom))' }}
    >
      <div className="grid grid-cols-[1.6fr_1fr_1fr] items-stretch">
        <Link
          href={session.path}
          tabIndex={hidden ? -1 : undefined}
          onClick={() => track('cta_click', { location: 'barra_movil' })}
          className="flex min-h-[56px] items-center justify-center gap-2 bg-blue px-3 text-step--1 font-semibold leading-tight text-white"
        >
          {ui.sessionShort}
        </Link>
        <a
          href={`https://wa.me/${contact.whatsappNumber}`}
          tabIndex={hidden ? -1 : undefined}
          onClick={() => track('whatsapp_click', { location: 'barra_movil' })}
          className="flex min-h-[56px] flex-col items-center justify-center gap-1 border-l border-line text-[0.6875rem] font-medium text-ink"
        >
          <Icon name="messageCircle" className="h-5 w-5 text-blue" />
          {ui.whatsapp}
        </a>
        <a
          href={contact.phoneHref}
          tabIndex={hidden ? -1 : undefined}
          onClick={() => track('tel_click', { location: 'barra_movil' })}
          className="flex min-h-[56px] flex-col items-center justify-center gap-1 border-l border-line text-[0.6875rem] font-medium text-ink"
        >
          <Icon name="phone" className="h-5 w-5 text-blue" />
          {ui.call}
        </a>
      </div>
    </nav>
  );
}
