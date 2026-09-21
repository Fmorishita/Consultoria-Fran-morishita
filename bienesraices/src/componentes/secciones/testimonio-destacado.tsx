import { VideoTestimonio } from "@/componentes/video-testimonio";
import { ChipPendiente } from "@/componentes/ui/chip-pendiente";
import { EncabezadoSeccion, Seccion } from "@/componentes/ui/seccion";
import { Revelar } from "@/componentes/ui/revelar";
import { t, type Idioma } from "@/lib/i18n";
import { queFalta, texto } from "@/lib/pendiente";
import { TESTIMONIO_DESTACADO } from "@contenido/testimonios";
import { INICIO } from "@contenido/paginas/inicio";
import { UI } from "@contenido/ui";

/** El activo más importante del sitio: va arriba, no escondido. */
export function TestimonioDestacado({ idioma }: { idioma: Idioma }) {
  const testimonio = TESTIMONIO_DESTACADO;
  if (!testimonio?.video) return null;

  const empresa = texto(testimonio.empresa, idioma);
  const cita = texto(testimonio.cita, idioma);

  return (
    <Seccion className="bg-superficie">
      <EncabezadoSeccion
        antetitulo={t(INICIO.testimonio.antetitulo, idioma)}
        titulo={t(INICIO.testimonio.titulo, idioma)}
      />
      <Revelar className="mt-12 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-center">
        <VideoTestimonio
          video={testimonio.video}
          poster={testimonio.videoPoster}
          nombre={testimonio.nombre}
          cargo={t(testimonio.cargo, idioma)}
          empresa={empresa}
          etiquetaReproducir={t(UI.cta.reproducir, idioma)}
          altPoster={`${testimonio.nombre} — ${t(testimonio.cargo, idioma)}`}
        />
        <div>
          {cita ? <blockquote className="titular titular-md">“{cita}”</blockquote> : null}
          <ChipPendiente>{queFalta(testimonio.cita)}</ChipPendiente>
          <ChipPendiente>{queFalta(testimonio.empresa)}</ChipPendiente>
        </div>
      </Revelar>
    </Seccion>
  );
}
