import { ImageResponse } from "next/og";
import { normalizaIdioma, t } from "@/lib/i18n";
import { INICIO } from "@contenido/paginas/inicio";
import { SITIO } from "@contenido/sitio";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Fran Morishita · Bienes raíces";

export default async function OgInicio({ params }: { params: Promise<{ locale: string }> }) {
  const idioma = normalizaIdioma((await params).locale);

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
          <div style={{ fontSize: 88, lineHeight: 1.02, letterSpacing: -2, whiteSpace: "pre-line" }}>
            {t(INICIO.hero.titulo, idioma)}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 120, height: 6, background: "#d8542b" }} />
          <div style={{ fontSize: 26, color: "#a99c8c" }}>{t(SITIO.rol, idioma)}</div>
        </div>
      </div>
    ),
    size,
  );
}
