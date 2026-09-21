import Link from "next/link";
import { ChipPendiente } from "@/componentes/ui/chip-pendiente";

export type PropsPie = {
  marca: { linea1: string; linea2: string };
  rol: string;
  ciudad: string;
  enlaces: { href: string; texto: string }[];
  contacto: { whatsappHref: string; whatsappTexto: string; calendario?: string; calendarioTexto: string };
  legal: {
    privacidadHref: string;
    privacidadTexto: string;
    registroTexto: string;
    registro?: string;
    registroPendiente?: string;
    leyenda: string;
    derechos: string;
  };
  titulos: { navegacion: string; contacto: string };
};

export function PieDePagina({ marca, rol, ciudad, enlaces, contacto, legal, titulos }: PropsPie) {
  const anio = new Date().getFullYear();

  return (
    <footer className="border-t border-borde bg-superficie">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="titular text-2xl">
              {marca.linea1} <span className="text-acento-suave">{marca.linea2}</span>
            </p>
            <p className="cuerpo mt-4 max-w-xs text-sm">{rol}</p>
            <p className="mt-2 text-sm text-texto-suave">{ciudad}</p>
          </div>

          <nav aria-label={titulos.navegacion}>
            <p className="antetitulo mb-5">{titulos.navegacion}</p>
            <ul className="space-y-3">
              {enlaces.map((enlace) => (
                <li key={enlace.href}>
                  <Link href={enlace.href} className="text-sm text-texto-suave transition-colors hover:text-texto">
                    {enlace.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="antetitulo mb-5">{titulos.contacto}</p>
            <ul className="space-y-3">
              <li>
                <a
                  href={contacto.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-texto-suave transition-colors hover:text-texto"
                >
                  {contacto.whatsappTexto}
                </a>
              </li>
              {contacto.calendario ? (
                <li>
                  <a
                    href={contacto.calendario}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-texto-suave transition-colors hover:text-texto"
                  >
                    {contacto.calendarioTexto}
                  </a>
                </li>
              ) : null}
              <li>
                <Link href={legal.privacidadHref} className="text-sm text-texto-suave transition-colors hover:text-texto">
                  {legal.privacidadTexto}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-borde pt-8">
          {legal.registro ? (
            <p className="text-xs text-texto-suave">
              {legal.registroTexto}: {legal.registro}
            </p>
          ) : (
            <ChipPendiente>{legal.registroPendiente}</ChipPendiente>
          )}
          <p className="mt-3 max-w-3xl text-xs leading-relaxed text-texto-suave/80">{legal.leyenda}</p>
          <p className="mt-6 text-xs text-texto-suave/70">
            © {anio} {marca.linea1} {marca.linea2}. {legal.derechos}
          </p>
        </div>
      </div>
    </footer>
  );
}
