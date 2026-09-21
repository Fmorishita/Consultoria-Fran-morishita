import type { Metadata } from "next";
import { normalizaIdioma, t, type Idioma } from "@/lib/i18n";
import { STYLEGUIDE } from "@contenido/paginas/styleguide";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const FICHAS = [
  { nombre: "fondo", variable: "--fondo" },
  { nombre: "superficie", variable: "--superficie" },
  { nombre: "borde", variable: "--borde" },
  { nombre: "texto", variable: "--texto" },
  { nombre: "texto-suave", variable: "--texto-suave" },
  { nombre: "acento", variable: "--acento" },
  { nombre: "acento-suave", variable: "--acento-suave" },
];

function Muestra({ direccion, idioma }: { direccion: "a" | "b"; idioma: Idioma }) {
  const ficha = STYLEGUIDE.direcciones.find((d) => d.clave === direccion);
  if (!ficha) return null;

  return (
    <div data-direccion={direccion} className="border border-borde bg-fondo text-texto">
      <div className="border-b border-borde p-8 md:p-12">
        <p className="antetitulo">{t(STYLEGUIDE.muestra.antetitulo, idioma)}</p>
        <h3 className="titular titular-lg mt-6">{t(STYLEGUIDE.muestra.titular, idioma)}</h3>
        <p className="cuerpo mt-6 max-w-xl">{t(STYLEGUIDE.muestra.cuerpo, idioma)}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <span className="inline-flex h-12 items-center bg-acento px-6 text-[0.95rem] font-medium text-acento-contraste">
            {t(STYLEGUIDE.muestra.boton, idioma)}
          </span>
          <span className="inline-flex h-12 items-center border border-borde px-6 text-[0.95rem] font-medium">
            {t(STYLEGUIDE.muestra.secundario, idioma)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 p-8 sm:grid-cols-4 md:p-12">
        {FICHAS.map((color) => (
          <div key={color.nombre}>
            <div
              className="h-16 w-full border border-borde"
              style={{ backgroundColor: `var(${color.variable})` }}
            />
            <p className="mt-2 text-xs text-texto-suave">{color.nombre}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-borde p-8 md:p-12">
        <p className="titular titular-md">Aa Bb Cc — 0123456789</p>
        <p className="mt-3 text-sm text-texto-suave">{ficha.tipografia}</p>
        <p className="cuerpo mt-6 max-w-2xl text-base">{t(ficha.descripcion, idioma)}</p>
      </div>
    </div>
  );
}

export default async function PaginaStyleguide({ params }: { params: Promise<{ locale: string }> }) {
  const idioma = normalizaIdioma((await params).locale);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-28 md:px-8 md:py-36">
      <h1 className="titular titular-lg">{t(STYLEGUIDE.titulo, idioma)}</h1>
      <p className="cuerpo mt-6 max-w-2xl">{t(STYLEGUIDE.texto, idioma)}</p>

      <div className="mt-16 space-y-16">
        {STYLEGUIDE.direcciones.map((direccion) => (
          <section key={direccion.clave}>
            <h2 className="titular titular-md mb-6">{t(direccion.nombre, idioma)}</h2>
            <Muestra direccion={direccion.clave} idioma={idioma} />
          </section>
        ))}
      </div>
    </div>
  );
}
