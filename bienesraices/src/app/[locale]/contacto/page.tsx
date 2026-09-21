import type { Metadata } from "next";
import { CtaWhatsApp } from "@/componentes/cta-whatsapp";
import { FormularioLead } from "@/componentes/formulario-lead";
import { TitularMultilinea } from "@/componentes/secciones/titular-multilinea";
import { Boton } from "@/componentes/ui/boton";
import { Revelar } from "@/componentes/ui/revelar";
import { Seccion } from "@/componentes/ui/seccion";
import { normalizaIdioma, t } from "@/lib/i18n";
import { rutas } from "@/lib/navegacion";
import { interesesFormulario, textosFormulario } from "@/lib/textos";
import { CONTACTO } from "@contenido/paginas/contacto";
import { SITIO } from "@contenido/sitio";
import { UI } from "@contenido/ui";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const idioma = normalizaIdioma((await params).locale);
  return {
    title: t(CONTACTO.seo.title, idioma),
    description: t(CONTACTO.seo.description, idioma),
    alternates: {
      canonical: rutas(idioma).contacto,
      languages: { es: "/es/contacto", en: "/en/contacto", "x-default": "/es/contacto" },
    },
  };
}

export default async function PaginaContacto({ params }: { params: Promise<{ locale: string }> }) {
  const idioma = normalizaIdioma((await params).locale);
  const r = rutas(idioma);

  return (
    <Seccion className="pt-28 md:pt-36">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Revelar>
          <p className="antetitulo">{t(CONTACTO.antetitulo, idioma)}</p>
          <h1 className="titular titular-lg mt-8">
            <TitularMultilinea texto={t(CONTACTO.titulo, idioma)} />
          </h1>
          <p className="cuerpo mt-8">{t(CONTACTO.texto, idioma)}</p>

          <div className="mt-12 space-y-8">
            <div className="border-t border-borde pt-6">
              <h2 className="titular titular-sm">{t(CONTACTO.opciones[0].titulo, idioma)}</h2>
              <p className="cuerpo mt-2 text-base">{t(CONTACTO.opciones[0].texto, idioma)}</p>
              <div className="mt-5">
                <CtaWhatsApp
                  numero={SITIO.whatsapp.numero}
                  mensaje={t(SITIO.whatsapp.mensajeGeneral, idioma)}
                  etiqueta={t(UI.cta.whatsapp, idioma)}
                  contexto="contacto"
                />
              </div>
            </div>

            {SITIO.calendario ? (
              <div className="border-t border-borde pt-6">
                <h2 className="titular titular-sm">{t(CONTACTO.opciones[1].titulo, idioma)}</h2>
                <p className="cuerpo mt-2 text-base">{t(CONTACTO.opciones[1].texto, idioma)}</p>
                <div className="mt-5">
                  <Boton asChild variante="secundario">
                    <a href={SITIO.calendario} target="_blank" rel="noopener noreferrer">
                      {t(UI.cta.agendar, idioma)}
                    </a>
                  </Boton>
                </div>
              </div>
            ) : null}
          </div>
        </Revelar>

        <Revelar retraso={120} className="border border-borde bg-superficie p-6 md:p-10">
          <h2 className="titular titular-md">{t(CONTACTO.formulario.titulo, idioma)}</h2>
          <p className="cuerpo mt-3 text-base">{t(CONTACTO.formulario.texto, idioma)}</p>
          <div className="mt-8">
            <FormularioLead
              idioma={idioma}
              hrefPrivacidad={r.privacidad}
              intereses={interesesFormulario(idioma)}
              textos={textosFormulario(idioma)}
            />
          </div>
        </Revelar>
      </div>
    </Seccion>
  );
}
