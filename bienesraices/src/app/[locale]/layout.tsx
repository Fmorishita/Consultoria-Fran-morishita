import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EB_Garamond, Geist, Playfair_Display } from "next/font/google";
import "@/app/globals.css";
import { Analitica } from "@/componentes/analitica";
import { CtaWhatsAppFlotante } from "@/componentes/cta-whatsapp";
import { Encabezado } from "@/componentes/layout/encabezado";
import { PieDePagina } from "@/componentes/layout/pie";
import { IDIOMAS, esIdioma, localeCompleto, t, type Idioma } from "@/lib/i18n";
import { enlacesPie, enlacesPrincipales, rutas } from "@/lib/navegacion";
import { queFalta, texto } from "@/lib/pendiente";
import { permitirIndexacion, urlSitio } from "@/lib/url-sitio";
import { enlaceWhatsApp } from "@/lib/whatsapp";
import { SITIO } from "@contenido/sitio";
import { UI } from "@contenido/ui";

// Serif de titulares por dirección visual, sans única para texto.
// Solo se precarga la serif de la dirección activa (hoy la "a"); la otra
// se declara sin preload y el navegador únicamente la baja en /styleguide.
// Si `direccionVisual` cambia a "b", hay que intercambiar los `preload`.
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--fuente-playfair", display: "swap" });
const garamond = EB_Garamond({ subsets: ["latin"], variable: "--fuente-garamond", display: "swap", preload: false });
const geist = Geist({ subsets: ["latin"], variable: "--fuente-geist", display: "swap" });

export function generateStaticParams() {
  return IDIOMAS.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const idioma: Idioma = esIdioma(locale) ? locale : "es";
  const base = urlSitio();

  return {
    metadataBase: new URL(base),
    title: {
      default: `${SITIO.nombre} · ${t(SITIO.rol, idioma)}`,
      template: `%s · ${SITIO.nombre}`,
    },
    description: t(SITIO.rol, idioma),
    alternates: {
      canonical: `/${idioma}`,
      languages: { es: "/es", en: "/en", "x-default": "/es" },
    },
    openGraph: {
      type: "website",
      locale: localeCompleto(idioma),
      siteName: SITIO.nombre,
      url: `${base}/${idioma}`,
    },
    robots: permitirIndexacion() ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export default async function LayoutIdioma({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!esIdioma(locale)) notFound();
  const idioma: Idioma = locale;
  const r = rutas(idioma);

  const whatsapp = { numero: SITIO.whatsapp.numero, mensaje: t(SITIO.whatsapp.mensajeGeneral, idioma) };

  return (
    <html
      lang={localeCompleto(idioma)}
      data-direccion={SITIO.direccionVisual}
      className={`${playfair.variable} ${garamond.variable} ${geist.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh antialiased">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-acento focus:px-4 focus:py-2 focus:text-acento-contraste"
        >
          {idioma === "es" ? "Saltar al contenido" : "Skip to content"}
        </a>

        <Analitica
          pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID}
          ga4Id={process.env.NEXT_PUBLIC_GA4_ID}
        />

        <Encabezado
          idioma={idioma}
          enlaces={enlacesPrincipales(idioma)}
          marca={{ linea1: "Fran", linea2: "Morishita", giro: t(UI.nav.giro, idioma) }}
          textos={{
            abrirMenu: t(UI.nav.abrirMenu, idioma),
            cerrarMenu: t(UI.nav.cerrarMenu, idioma),
            cambiarIdioma: t(UI.nav.cambiarIdioma, idioma),
            whatsapp: t(UI.cta.whatsappCorto, idioma),
          }}
          whatsapp={whatsapp}
        />

        <main id="contenido" className="pt-18">
          {children}
        </main>

        <PieDePagina
          marca={{ linea1: "Fran", linea2: "Morishita" }}
          rol={t(SITIO.rol, idioma)}
          ciudad={t(SITIO.ciudad, idioma)}
          enlaces={enlacesPie(idioma)}
          contacto={{
            whatsappHref: enlaceWhatsApp({ numero: SITIO.whatsapp.numero, mensaje: whatsapp.mensaje }),
            whatsappTexto: t(UI.cta.whatsapp, idioma),
            calendario: SITIO.calendario,
            calendarioTexto: t(UI.cta.agendar, idioma),
          }}
          legal={{
            privacidadHref: r.privacidad,
            privacidadTexto: t(UI.footer.privacidad, idioma),
            registroTexto: t(UI.footer.registro, idioma),
            registro: texto(SITIO.legal.registroEstatal, idioma),
            registroPendiente: queFalta(SITIO.legal.registroEstatal),
            leyenda: t(SITIO.legal.leyendaProyectos, idioma),
            derechos: t(UI.footer.derechos, idioma),
          }}
          titulos={{ navegacion: t(UI.footer.navegacion, idioma), contacto: t(UI.footer.contacto, idioma) }}
        />

        <CtaWhatsAppFlotante
          numero={SITIO.whatsapp.numero}
          mensaje={whatsapp.mensaje}
          etiqueta={t(UI.cta.whatsappCorto, idioma)}
          contexto="flotante"
        />
      </body>
    </html>
  );
}
