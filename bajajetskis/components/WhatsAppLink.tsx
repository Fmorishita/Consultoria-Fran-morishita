'use client'

import type { ReactNode } from 'react'
import { buildWhatsAppLink, trackWhatsAppClick, type WhatsAppContext } from '@/lib/whatsapp'

type Props = {
  ctx: WhatsAppContext
  className?: string
  children: ReactNode
  'aria-label'?: string
}

/**
 * Todo enlace a WhatsApp del sitio pasa por aquí. Así ninguno se publica sin
 * contexto de producto, sin `rel="noopener noreferrer"` ni sin evento de píxel.
 */
export function WhatsAppLink({ ctx, className, children, ...rest }: Props) {
  return (
    <a
      href={buildWhatsAppLink(ctx)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackWhatsAppClick(ctx)}
      aria-label={rest['aria-label']}
    >
      {children}
    </a>
  )
}
