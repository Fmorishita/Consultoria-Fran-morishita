'use client';

import { track as vercelTrack } from '@vercel/analytics';

/**
 * Eventos de conversión. Vercel Web Analytics no usa cookies, así que no
 * hace falta banner de consentimiento. Si más adelante se añade GA4 o Meta
 * Pixel (que sí usan cookies no esenciales), habrá que implementar consentimiento.
 */
export type TreuEvent =
  | 'cta_click'
  | 'whatsapp_click'
  | 'tel_click'
  | 'email_click'
  | 'form_start'
  | 'form_submit_success'
  | 'form_submit_error';

export function track(event: TreuEvent, props?: Record<string, string | number | boolean>) {
  try {
    vercelTrack(event, props);
  } catch {
    // La analítica nunca debe romper una interacción.
  }
}
