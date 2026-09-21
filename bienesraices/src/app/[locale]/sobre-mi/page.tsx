import Image from "next/image";
import type { Metadata } from "next";
import { Cierre } from "@/componentes/secciones/cierre";
import { TitularMultilinea } from "@/componentes/secciones/titular-multilinea";
import { ChipPendiente } from "@/componentes/ui/chip-pendiente";
import { Revelar } from "@/componentes/ui/revelar";
import { Seccion } from "@/componentes/ui/seccion";
import { normalizaIdioma, t } from "@/lib/i18n";
import { JsonLd, personaJsonLd } from "@/lib/json-ld";
import { rutas } from "@/lib/navegacion";
import { queFalta, texto } from "@/lib/pendiente";
import { SOBRE_MI } from "@contenido/paginas/sobre-mi";

const FOTO_FRAN =
  "https://lpdqksuvccsocntditik.supabase.co/storage/v1/object/public/sitio/imagenes/1781439320844-ChatGPT_Image_Jun_14__2026__02_37_33_AM.jpg";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const idioma = normalizaIdioma((await params).locale);
  return {
    title: t(SOBRE_MI.seo.title, idioma),
    description: t(SOBRE_MI.seo.description, idioma),
    alternates: {
      canonical: rutas(idioma).sobreMi,
      languages: { es: "/es/sobre-mi", en: "/en/sobre-mi", "x-default": "/es/sobre-mi" },
    },
  };
}

export default async function PaginaSobreMi({ params }: { params: Promise<{ locale: string }> }) {
  const idioma = normalizaIdioma((await params).locale);
  const parrafos = SOBRE_MI.parrafos.map((parrafo) => ({
    listo: texto(parrafo, idioma),
    falta: queFalta(parrafo),
  }));
  const credenciales = SOBRE_MI.credenciales.items.map((item) => ({
    listo: texto(item, idioma),
    falta: queFalta(item),
  }));

  return (
    <>
      <JsonLd datos={personaJsonLd(idioma)} />
      <Seccion className="pt-28 md:pt-36">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <Revelar>
            <p className="antetitulo">{t(SOBRE_MI.antetitulo, idioma)}</p>
            <h1 className="titular titular-lg mt-8">
              <TitularMultilinea texto={t(SOBRE_MI.titulo, idioma)} />
            </h1>
            <div className="mt-10 space-y-6">
              {parrafos.map((parrafo, indice) =>
                parrafo.listo ? (
                  <p key={indice} className="cuerpo text-lg">
                    {parrafo.listo}
                  </p>
                ) : (
                  <ChipPendiente key={indice}>{parrafo.falta}</ChipPendiente>
                ),
              )}
            </div>
          </Revelar>

          <Revelar retraso={120} className="relative aspect-[4/5] w-full overflow-hidden border border-borde">
            <Image
              src={FOTO_FRAN}
              alt="Fran Morishita"
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-cover"
              priority
            />
          </Revelar>
        </div>
      </Seccion>

      <Seccion className="bg-superficie">
        <p className="antetitulo">{t(SOBRE_MI.credenciales.antetitulo, idioma)}</p>
        <ul className="mt-8 divide-y divide-borde border-y border-borde">
          {credenciales.map((credencial, indice) => (
            <li key={indice} className="py-5">
              {credencial.listo ? (
                <span className="text-texto-suave">{credencial.listo}</span>
              ) : (
                <ChipPendiente>{credencial.falta}</ChipPendiente>
              )}
            </li>
          ))}
        </ul>
      </Seccion>

      <Cierre
        idioma={idioma}
        titulo={t(SOBRE_MI.cierre.titulo, idioma)}
        texto={t(SOBRE_MI.cierre.texto, idioma)}
        contexto="sobre-mi-cierre"
        conAgenda
      />
    </>
  );
}
