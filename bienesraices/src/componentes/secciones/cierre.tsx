import Image from "next/image";
import { CtaWhatsApp } from "@/componentes/cta-whatsapp";
import { Boton } from "@/componentes/ui/boton";
import { Revelar } from "@/componentes/ui/revelar";
import { t, type Idioma } from "@/lib/i18n";
import { SITIO } from "@contenido/sitio";
import { UI } from "@contenido/ui";

/**
 * Última pantalla: banda a sangre con fotografía y una sola decisión visible,
 * agendar la visita. WhatsApp queda como salida secundaria para quien prefiere
 * escribir en vez de reservar hora.
 */
export function Cierre({
  idioma,
  titulo,
  texto: descripcion,
  contexto,
  mensaje,
  imagen,
  altImagen,
}: {
  idioma: Idioma;
  titulo: string;
  texto: string;
  contexto: string;
  mensaje?: string;
  imagen?: string;
  altImagen?: string;
}) {
  return (
    <section className="relative border-t border-borde">
      {imagen ? (
        <>
          <Image src={imagen} alt={altImagen ?? ""} fill sizes="100vw" className="object-cover" />
          <span aria-hidden className="absolute inset-0 overlay-banda" />
        </>
      ) : null}

      <div className="relative mx-auto w-full max-w-6xl px-5 py-24 md:px-8 md:py-36">
        <Revelar className="max-w-2xl">
          <h2 className="titular titular-lg">{titulo}</h2>
          <p className="cuerpo mt-6 max-w-xl">{descripcion}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            {SITIO.calendario ? (
              <Boton asChild tamano="lg">
                <a href={SITIO.calendario} target="_blank" rel="noopener noreferrer">
                  {t(UI.cta.agendarVisita, idioma)}
                </a>
              </Boton>
            ) : null}
            <CtaWhatsApp
              numero={SITIO.whatsapp.numero}
              mensaje={mensaje ?? t(SITIO.whatsapp.mensajeGeneral, idioma)}
              etiqueta={t(UI.cta.whatsapp, idioma)}
              contexto={contexto}
              variante={SITIO.calendario ? "secundario" : "primario"}
              tamano="lg"
            />
          </div>
        </Revelar>
      </div>
    </section>
  );
}
