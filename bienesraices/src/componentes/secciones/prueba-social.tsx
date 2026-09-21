import { TrackRecord, type CifraLista } from "@/componentes/track-record";
import { VideoTestimonio } from "@/componentes/video-testimonio";
import { ChipPendiente } from "@/componentes/ui/chip-pendiente";
import { Revelar } from "@/componentes/ui/revelar";
import { EncabezadoSeccion, Seccion } from "@/componentes/ui/seccion";
import { t, type Idioma } from "@/lib/i18n";
import { queFalta, texto } from "@/lib/pendiente";
import { INICIO } from "@contenido/paginas/inicio";
import { TESTIMONIO_DESTACADO } from "@contenido/testimonios";
import { UI } from "@contenido/ui";

/** Video de respaldo y cifras en una sola sección: quién soy, con pruebas. */
export function PruebaSocial({ idioma, cifras }: { idioma: Idioma; cifras: CifraLista[] }) {
  const testimonio = TESTIMONIO_DESTACADO;
  const empresa = texto(testimonio?.empresa, idioma);

  return (
    <Seccion>
      <EncabezadoSeccion titulo={t(INICIO.prueba.titulo, idioma)} texto={t(INICIO.prueba.texto, idioma)} />

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        {testimonio?.video ? (
          <Revelar>
            <VideoTestimonio
              video={testimonio.video}
              poster={testimonio.videoPoster}
              nombre={testimonio.nombre}
              cargo={t(testimonio.cargo, idioma)}
              empresa={empresa}
              etiquetaReproducir={t(UI.cta.reproducir, idioma)}
              altPoster={`${testimonio.nombre}, ${t(testimonio.cargo, idioma)}`}
            />
            <ChipPendiente>{queFalta(testimonio.empresa)}</ChipPendiente>
          </Revelar>
        ) : null}

        <Revelar retraso={90} className="flex items-center">
          <TrackRecord cifras={cifras} columna />
        </Revelar>
      </div>
    </Seccion>
  );
}
