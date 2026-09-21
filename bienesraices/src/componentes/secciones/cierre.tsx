import { CtaWhatsApp } from "@/componentes/cta-whatsapp";
import { Boton } from "@/componentes/ui/boton";
import { Revelar } from "@/componentes/ui/revelar";
import { Seccion } from "@/componentes/ui/seccion";
import { t, type Idioma } from "@/lib/i18n";
import { SITIO } from "@contenido/sitio";
import { UI } from "@contenido/ui";

export function Cierre({
  idioma,
  titulo,
  texto: descripcion,
  contexto,
  mensaje,
  conAgenda = false,
}: {
  idioma: Idioma;
  titulo: string;
  texto: string;
  contexto: string;
  mensaje?: string;
  conAgenda?: boolean;
}) {
  return (
    <Seccion className="border-t border-borde">
      <Revelar className="max-w-3xl">
        <h2 className="titular titular-lg">{titulo}</h2>
        <p className="cuerpo mt-6">{descripcion}</p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <CtaWhatsApp
            numero={SITIO.whatsapp.numero}
            mensaje={mensaje ?? t(SITIO.whatsapp.mensajeGeneral, idioma)}
            etiqueta={t(UI.cta.whatsapp, idioma)}
            contexto={contexto}
            tamano="lg"
          />
          {conAgenda && SITIO.calendario ? (
            <Boton asChild variante="secundario" tamano="lg">
              <a href={SITIO.calendario} target="_blank" rel="noopener noreferrer">
                {t(UI.cta.agendar, idioma)}
              </a>
            </Boton>
          ) : null}
        </div>
      </Revelar>
    </Seccion>
  );
}
