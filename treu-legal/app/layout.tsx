import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { archivo, sourceSerif } from './fonts';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileBar } from '@/components/MobileBar';
import { SITE_URL, organizationSchema, websiteSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { ui } from '@/content/microcopy';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Legal Intelligence for Business | Corporate Lawyer in Mexico',
    template: '%s | Treu Legal & Business',
  },
  description:
    'Arquitectura jurídica empresarial y prevención de contingencias legales para empresas que requieren más que asesoría legal tradicional: necesitan estructura jurídica sólida para operar, crecer y proteger sus intereses',
  applicationName: 'Treu Legal & Business',
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0F4C81',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${archivo.variable} ${sourceSerif.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-blue focus:px-4 focus:py-3 focus:text-white"
        >
          {ui.skipToContent}
        </a>
        <Header />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
        {/* La barra inferior sólo existe en móvil; deja aire para no tapar el footer. */}
        <div aria-hidden="true" className="h-14 lg:hidden" />
        <MobileBar />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
