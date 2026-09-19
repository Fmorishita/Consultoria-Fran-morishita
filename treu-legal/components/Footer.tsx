import Link from 'next/link';
import { Logo } from './Logo';
import { Icon } from './Icon';
import { practiceAreas, industries, legalProducts } from '@/content/site';
import { contact, firm, session } from '@/content/facts';

/**
 * Footer completo y útil. Reproduce la estructura del footer actual
 * (La Firma / Práctica / Contacto / Legal) con el árbol real del sitio.
 * Se retira "Colaboración Profesional": su enlace responde 404.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-blue-deep text-white/80">
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo variant="blanco" className="h-9 w-auto" />
          <p className="mt-4 max-w-xs text-step--1 leading-relaxed text-white/70">{firm.tagline}</p>
          <p className="mt-4 text-step--1 text-white/70">
            {firm.city}, {firm.state}
          </p>
          <a
            href={contact.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex min-h-[44px] items-center gap-2 text-step--1 text-white underline decoration-white/30 underline-offset-2 hover:decoration-white"
          >
            <Icon name="mapPin" className="h-4 w-4" />
            Ver en Google Maps
          </a>
        </div>

        <FooterColumn title="La Firma">
          <FooterLink href="/la-firma/">La Firma</FooterLink>
          <FooterLink href={session.path}>Strategic Legal Session</FooterLink>
          <FooterLink href="/insights/">Insights</FooterLink>
        </FooterColumn>

        <FooterColumn title="Práctica">
          <FooterLink href="/areas-de-practica/">Áreas de práctica</FooterLink>
          {practiceAreas.slice(0, 3).map((a) => (
            <FooterLink key={a.slug} href={`/areas-de-practica/${a.slug}/`} muted>
              {a.name}
            </FooterLink>
          ))}
          <FooterLink href="/industrias/">Industrias</FooterLink>
          <FooterLink href="/legal-products/">Legal Products</FooterLink>
        </FooterColumn>

        <FooterColumn title="Contacto">
          <FooterLink href="/contacto/">Contacto</FooterLink>
          <li>
            <a
              href={`mailto:${contact.email}`}
              className="flex min-h-[44px] items-center text-step--1 text-white/80 transition-colors hover:text-white"
            >
              {contact.email}
            </a>
          </li>
          <li>
            <a
              href={contact.phoneHref}
              className="flex min-h-[44px] items-center text-step--1 text-white/80 transition-colors hover:text-white"
            >
              {contact.phoneDisplay}
            </a>
          </li>
          <li>
            <a
              href={`https://wa.me/${contact.whatsappNumber}`}
              className="flex min-h-[44px] items-center text-step--1 text-white/80 transition-colors hover:text-white"
            >
              WhatsApp {contact.whatsappDisplay}
            </a>
          </li>
          <li>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 text-step--1 text-white/80 transition-colors hover:text-white"
            >
              <Icon name="linkedin" className="h-4 w-4" />
              LinkedIn
            </a>
          </li>
        </FooterColumn>
      </div>

      <div className="border-t border-white/15">
        <div className="shell flex flex-col gap-3 py-6 text-step--1 text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Treu Legal & Business. Todos los derechos reservados.</p>
          <ul className="flex flex-wrap items-center gap-x-6">
            <FooterLink href="/privacidad/" small>
              Aviso de Privacidad
            </FooterLink>
            <FooterLink href="/condiciones-de-uso/" small>
              Condiciones de uso
            </FooterLink>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-step--1 font-semibold uppercase tracking-[0.14em] text-white">{title}</h2>
      <ul className="mt-3 space-y-0.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  muted = false,
  small = false,
}: {
  href: string;
  children: React.ReactNode;
  muted?: boolean;
  small?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        className={`flex min-h-[44px] items-center text-step--1 leading-snug transition-colors hover:text-white ${
          muted ? 'text-white/60' : 'text-white/80'
        } ${small ? 'min-h-0 py-1' : ''}`}
      >
        {children}
      </Link>
    </li>
  );
}
