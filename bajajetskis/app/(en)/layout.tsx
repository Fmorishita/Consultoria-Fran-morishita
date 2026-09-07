import type { Metadata, Viewport } from 'next'
import '../globals.css'
import { RootHtml } from '../RootHtml'
import { metaDePagina } from '../metadata'
import { SITE_URL } from '@/lib/routes'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...metaDePagina('en', 'home'),
  applicationName: 'Baja Jetskis',
  authors: [{ name: 'Baja Jetskis' }],
  keywords: [
    'used jet ski Baja California',
    'personal watercraft for sale Ensenada',
    'rebuilt jet ski Mexico',
    'buy jet ski Rosarito',
  ],
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#0B1D33',
  width: 'device-width',
  initialScale: 1,
}

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootHtml lang="en">{children}</RootHtml>
}
