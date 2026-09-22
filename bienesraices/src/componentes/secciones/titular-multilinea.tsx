import { Fragment } from "react";

/** Los saltos de línea del contenido se respetan tal cual vienen del archivo. */
export function TitularMultilinea({ texto: contenido }: { texto: string }) {
  const lineas = contenido.split("\n");
  return (
    <>
      {lineas.map((linea, indice) => (
        <Fragment key={indice}>
          {linea}
          {indice < lineas.length - 1 ? <br /> : null}
        </Fragment>
      ))}
    </>
  );
}
