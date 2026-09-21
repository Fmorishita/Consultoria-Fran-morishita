import { ImageResponse } from "next/og";
import { normalizaIdioma, t } from "@/lib/i18n";
import { proyectoPorSlug } from "@contenido/proyectos";
import { SITIO } from "@contenido/sitio";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Fran Morishita · Bienes raíces";

/** OG dinámica por proyecto: sin fotos, la tipografía carga el peso. */
export default async function OgProyecto({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const idioma = normalizaIdioma(locale);
  const proyecto = proyectoPorSlug(slug);
  const titulo = proyecto ? proyecto.nombre : SITIO.nombre;
  const subtitulo = proyecto ? t(proyecto.hero.subtitulo, idioma) : t(SITIO.rol, idioma);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0f0c0a",
          color: "#f5eee4",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: "#a99c8c", textTransform: "uppercase" }}>
          {SITIO.nombre}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, lineHeight: 1, letterSpacing: -2 }}>{titulo}</div>
          <div style={{ display: "flex", fontSize: 34, color: "#a99c8c", marginTop: 24 }}>{subtitulo}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 120, height: 6, background: "#d8542b" }} />
          <div style={{ fontSize: 26, color: "#a99c8c" }}>{proyecto?.ciudad ?? "Ensenada, Baja California"}</div>
        </div>
      </div>
    ),
    size,
  );
}
