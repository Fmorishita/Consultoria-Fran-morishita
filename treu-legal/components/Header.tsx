'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { Icon } from './Icon';
import { mainNav } from '@/content/site';
import { contact, session } from '@/content/facts';
import { ui } from '@/content/microcopy';
import { track } from '@/lib/analytics';

export function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Cierra el menú al cambiar de página.
  useEffect(() => {
    setOpenMenu(false);
    setOpenGroup(null);
  }, [pathname]);

  // Bloquea el scroll del fondo y atrapa el foco mientras el menú está abierto.
  useEffect(() => {
    if (!openMenu) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    panelRef.current?.querySelector<HTMLElement>('a[href], button')?.focus();
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openMenu]);

  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Treu Legal & Business, ir al inicio">
          {/* Sin `priority`: el LCP es texto y la fuente debe ir primero. */}
          <Logo className="h-7 w-auto sm:h-8" />
        </Link>

        {/* Navegación de escritorio */}
        <nav aria-label={ui.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setOpenGroup(item.href)}
                onMouseLeave={() => item.children && setOpenGroup(null)}
              >
                {item.children ? (
                  <>
                    <Link
                      href={item.href}
                      aria-expanded={openGroup === item.href}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      onFocus={() => setOpenGroup(item.href)}
                      className={`flex min-h-[44px] items-center gap-1 px-3 text-step--1 font-medium transition-colors ${
                        isActive(item.href) ? 'text-blue' : 'text-ink hover:text-blue'
                      }`}
                    >
                      {item.label}
                      <Icon name="chevronDown" className="h-3.5 w-3.5" strokeWidth={2} />
                    </Link>
                    {openGroup === item.href && (
                      /* Mega menú */
                      <div className="absolute left-1/2 top-full w-[min(34rem,90vw)] -translate-x-1/2 border border-line bg-white p-2 shadow-[0_18px_40px_-24px_rgb(11_27_43/0.35)]">
                        <ul className="grid gap-0.5 sm:grid-cols-2">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block px-3 py-2.5 text-step--1 leading-snug text-ink transition-colors hover:bg-paper hover:text-blue"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={`flex min-h-[44px] items-center px-3 text-step--1 font-medium transition-colors ${
                      isActive(item.href) ? 'text-blue' : 'text-ink hover:text-blue'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Teléfono visible en el header de escritorio */}
          <a
            href={contact.phoneHref}
            onClick={() => track('tel_click', { location: 'header' })}
            className="hidden min-h-[44px] items-center gap-2 px-2 text-step--1 font-medium text-ink transition-colors hover:text-blue xl:flex"
          >
            <Icon name="phone" className="h-4 w-4" />
            {contact.phoneDisplay}
          </a>
          <Link
            href={session.path}
            onClick={() => track('cta_click', { location: 'header' })}
            className="btn-primary hidden text-step--1 sm:inline-flex"
          >
            {ui.session}
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpenMenu((v) => !v)}
            aria-expanded={openMenu}
            aria-controls="menu-movil"
            className="-mr-2 flex h-11 w-11 items-center justify-center text-ink lg:hidden"
          >
            <span className="sr-only">{openMenu ? ui.closeMenu : ui.openMenu}</span>
            <Icon name={openMenu ? 'x' : 'menu'} className="h-6 w-6" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* Línea de avance de lectura. Puramente decorativa —el navegador ya
          tiene su barra de scroll—, así que va oculta a lectores de pantalla.
          Sólo se dibuja donde hay animaciones por scroll en CSS. */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden">
        <div className="barra-progreso h-full w-full origin-left scale-x-0 bg-blue" />
      </div>

      {/* Menú móvil a pantalla completa */}
      {openMenu && (
        <div
          id="menu-movil"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={ui.mainNav}
          /* Alto explícito, no `bottom-0`: el `backdrop-blur` del <header>
             lo convierte en el bloque de referencia de este panel fijo (es
             descendiente suyo), así que `top` y `bottom` se resolvían contra
             los ~64px del header, no contra el viewport, y la altura
             resultante colapsaba a 0. */
          className="fixed inset-x-0 top-16 z-50 h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain bg-white lg:hidden"
        >
          <div className="shell flex min-h-full flex-col py-6">
            <nav aria-label={ui.mainNav}>
              <ul className="divide-y divide-line border-y border-line">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    {item.children ? (
                      <details className="group">
                        <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between py-3 text-step-2 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                          {item.label}
                          <Icon
                            name="chevronDown"
                            className="h-5 w-5 shrink-0 text-blue transition-transform group-open:rotate-180"
                            strokeWidth={1.75}
                          />
                        </summary>
                        <ul className="pb-3">
                          <li>
                            <Link
                              href={item.href}
                              className="flex min-h-[44px] items-center py-1.5 text-step-0 text-blue"
                            >
                              {ui.viewAll}
                            </Link>
                          </li>
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="flex min-h-[44px] items-center py-1.5 text-step-0 leading-snug text-slate"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </details>
                    ) : (
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? 'page' : undefined}
                        className="flex min-h-[56px] items-center py-3 text-step-2 font-semibold text-ink"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Botón principal y contacto directo */}
            <div className="mt-8 space-y-3">
              <Link
                href={session.path}
                onClick={() => track('cta_click', { location: 'menu_movil' })}
                className="btn-primary w-full"
              >
                {ui.session}
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/${contact.whatsappNumber}`}
                  onClick={() => track('whatsapp_click', { location: 'menu_movil' })}
                  className="btn-secondary"
                >
                  <Icon name="messageCircle" className="h-4 w-4" />
                  {ui.whatsapp}
                </a>
                <a
                  href={contact.phoneHref}
                  onClick={() => track('tel_click', { location: 'menu_movil' })}
                  className="btn-secondary"
                >
                  <Icon name="phone" className="h-4 w-4" />
                  {ui.call}
                </a>
              </div>
              <a
                href={`mailto:${contact.email}`}
                onClick={() => track('email_click', { location: 'menu_movil' })}
                className="flex min-h-[44px] items-center gap-2 text-step-0 text-slate"
              >
                <Icon name="mail" className="h-4 w-4 text-blue" />
                {contact.email}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
