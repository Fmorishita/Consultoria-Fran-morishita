import type { Metadata } from "next";
import { ChipPendiente } from "@/componentes/ui/chip-pendiente";
import { Seccion } from "@/componentes/ui/seccion";
import { normalizaIdioma, t } from "@/lib/i18n";
import { rutas } from "@/lib/navegacion";
import { queFalta, texto } from "@/lib/pendiente";
import { PRIVACIDAD } from "@contenido/paginas/privacidad";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const idioma = normalizaIdioma((await params).locale);
  return {
    title: t(PRIVACIDAD.seo.title, idioma),
    description: t(PRIVACIDAD.seo.description, idioma),
    alternates: {
      canonical: rutas(idioma).privacidad,
      languages: {
        es: "/es/aviso-de-privacidad",
        en: "/en/aviso-de-privacidad",
        "x-default": "/es/aviso-de-privacidad",
      },
    },
  };
}

export default async function PaginaPrivacidad({ params }: { params: Promise<{ locale: string }> }) {
  const idioma = normalizaIdioma((await params).locale);

  return (
    <Seccion className="pt-28 md:pt-36">
      <div className="max-w-3xl">
        <p className="antetitulo">{t(PRIVACIDAD.antetitulo, idioma)}</p>
        <h1 className="titular titular-lg mt-6">{t(PRIVACIDAD.titulo, idioma)}</h1>
        <p className="mt-4 text-sm text-texto-suave">
          {t(PRIVACIDAD.actualizacion, idioma)}: {PRIVACIDAD.fecha}
        </p>

        <div className="mt-14 space-y-12">
          {PRIVACIDAD.bloques.map((bloque) => (
            <section key={bloque.titulo.es}>
              <h2 className="titular titular-sm">{t(bloque.titulo, idioma)}</h2>
              <div className="mt-4 space-y-4">
                {bloque.parrafos.map((parrafo, indice) => {
                  const listo = texto(parrafo, idioma);
                  return listo ? (
                    <p key={indice} className="cuerpo text-base">
                      {listo}
                    </p>
                  ) : (
                    <ChipPendiente key={indice}>{queFalta(parrafo)}</ChipPendiente>
                  );
                })}
              </div>
              {bloque.lista ? (
                <ul className="mt-5 space-y-3">
                  {bloque.lista.map((item) => (
                    <li key={item.es} className="flex gap-3 text-texto-suave">
                      <span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-acento" />
                      <span>{t(item, idioma)}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </Seccion>
  );
}
