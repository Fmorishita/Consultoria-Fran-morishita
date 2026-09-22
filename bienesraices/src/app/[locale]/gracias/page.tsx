import Link from "next/link";
import type { Metadata } from "next";
import { CtaWhatsApp } from "@/componentes/cta-whatsapp";
import { Boton } from "@/componentes/ui/boton";
import { Seccion } from "@/componentes/ui/seccion";
import { normalizaIdioma, t } from "@/lib/i18n";
import { rutas } from "@/lib/navegacion";
import { GRACIAS, SEO_GRACIAS } from "@contenido/paginas/gracias";
import { esPublicable, proyectoPorSlug } from "@contenido/proyectos";
import { SITIO } from "@contenido/sitio";
import { UI } from "@contenido/ui";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tipo?: string; propiedad?: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const idioma = normalizaIdioma((await params).locale);
  return {
    title: t(SEO_GRACIAS.title, idioma),
    description: t(SEO_GRACIAS.description, idioma),
    robots: { index: false, follow: false },
  };
}

/** Página de conversión: aquí es donde los píxeles ya registraron el evento. */
export default async function PaginaGracias({ params, searchParams }: Props) {
  const idioma = normalizaIdioma((await params).locale);
  const { tipo, propiedad } = await searchParams;
  const variante = tipo && Object.hasOwn(GRACIAS, tipo) ? GRACIAS[tipo] : GRACIAS.default;
  const r = rutas(idioma);
  // Si el lead salió de una ficha, WhatsApp abre con el mensaje de esa propiedad.
  const proyecto = propiedad ? proyectoPorSlug(propiedad) : undefined;
  const whatsappProyecto = proyecto && esPublicable(proyecto) ? proyecto.whatsapp : undefined;

  return (
    <Seccion className="flex min-h-[70svh] items-center pt-28 md:pt-36">
      <div className="max-w-2xl">
        <h1 className="titular titular-lg mt-6">{t(variante.titulo, idioma)}</h1>
        <p className="cuerpo mt-6">{t(variante.texto, idioma)}</p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <CtaWhatsApp
            numero={SITIO.whatsapp.numero}
            mensaje={t(whatsappProyecto?.mensajePrefill ?? SITIO.whatsapp.mensajeGeneral, idioma)}
            keyword={whatsappProyecto?.keyword}
            etiqueta={variante.cta ? t(variante.cta, idioma) : t(UI.cta.whatsapp, idioma)}
            contexto={`gracias-${tipo ?? "default"}`}
            tamano="lg"
          />
          <Boton asChild variante="secundario" tamano="lg">
            <Link href={r.propiedades}>{t(UI.cta.verProyectos, idioma)}</Link>
          </Boton>
        </div>
      </div>
    </Seccion>
  );
}
