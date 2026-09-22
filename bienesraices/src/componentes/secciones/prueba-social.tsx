import { TrackRecord, type CifraLista } from "@/componentes/track-record";
import { VideoTestimonio } from "@/componentes/video-testimonio";
import { Revelar } from "@/componentes/ui/revelar";
import { Seccion } from "@/componentes/ui/seccion";
import { t, type Idioma } from "@/lib/i18n";
import { INICIO } from "@contenido/paginas/inicio";
import { TESTIMONIO_DESTACADO } from "@contenido/testimonios";
import { UI } from "@contenido/ui";

/**
 * Respaldo en dos piezas: el video de quien ya confió su inventario y las
 * cifras que lo sostienen. El video se pinta con su orientación real.
 */
export function PruebaSocial({ idioma, cifras }: { idioma: Idioma; cifras: CifraLista[] }) {
  const testimonio = TESTIMONIO_DESTACADO;

  return (
    <Seccion className="border-y border-borde bg-superficie">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
        {testimonio?.video ? (
          <Revelar>
            <VideoTestimonio
              video={testimonio.video}
              poster={testimonio.videoPoster}
              nombre={testimonio.nombre}
              cargo={t(testimonio.cargo, idioma)}
              empresa={testimonio.empresa}
              orientacion={testimonio.orientacion}
              etiquetaReproducir={t(UI.cta.reproducir, idioma)}
              altPoster={`${testimonio.nombre}, ${t(testimonio.cargo, idioma)}`}
            />
          </Revelar>
        ) : null}

        <Revelar retraso={90}>
          <p className="antetitulo mb-6">{t(INICIO.prueba.antetitulo, idioma)}</p>
          <h2 className="titular titular-lg">{t(INICIO.prueba.titulo, idioma)}</h2>
          <p className="cuerpo mt-6 max-w-lg">{t(INICIO.prueba.texto, idioma)}</p>
          <div className="mt-12">
            <TrackRecord cifras={cifras} columna />
          </div>
        </Revelar>
      </div>
    </Seccion>
  );
}
