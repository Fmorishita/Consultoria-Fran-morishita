'use client';

import Link from 'next/link';
import { track, type TreuEvent } from '@/lib/analytics';

/** Enlace que registra su evento de conversión con la ubicación del botón. */
export function TrackedLink({
  href,
  event,
  location,
  external = false,
  className,
  children,
}: {
  href: string;
  event: TreuEvent;
  location: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const onClick = () => track(event, { location });

  if (external) {
    const isHttp = href.startsWith('http');
    return (
      <a
        href={href}
        onClick={onClick}
        className={className}
        {...(isHttp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}
