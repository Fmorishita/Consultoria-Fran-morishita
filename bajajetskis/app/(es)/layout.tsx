import type { Metadata, Viewport } from 'next'
import '../globals.css'
import { RootHtml } from '../RootHtml'
import { metaDePagina } from '../metadata'
import { SITE_URL } from '@/lib/routes'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...metaDePagina('es', 'home'),
  applicationName: 'Baja Jetskis',
  authors: [{ name: 'Baja Jetskis' }],
  keywords: [
    'venta de motos acuáticas Ensenada',
    'jetski seminuevo Baja California',
    'comprar moto acuática Tijuana',
    'motos acuáticas Mexicali',
    'jet ski usado Ensenada',
    'moto acuática con papeles en regla',
  ],
  robots: { index: true, follow: true },
  formatDetection: { telephone: true },
}

export const viewport: Viewport = {
  themeColor: '#0B1D33',
  width: 'device-width',
  initialScale: 1,
}

export default function EsLayout({ children }: { children: React.ReactNode }) {
  return <RootHtml lang="es">{children}</RootHtml>
}
