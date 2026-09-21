#!/usr/bin/env node
/**
 * Junta todos los marcadores [CONFIRMAR: ...] del contenido y escribe
 * PENDIENTES.md. Así la lista de datos que faltan nunca se desactualiza.
 *
 *   npm run pendientes            → regenera el archivo
 *   npm run pendientes -- --check → falla si quedan pendientes (para CI)
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";

const RAIZ = new URL("..", import.meta.url).pathname;
const CARPETA = join(RAIZ, "content");
// Marcadores escritos con el helper —pendiente("…") / pendienteI18n("…")—
// y también los literales [CONFIRMAR: …] por si alguno se escribe a mano.
const REGEX = /pendiente(?:I18n)?\(\s*"([^"]+)"|\[CONFIRMAR:\s*([^\]]+)\]/g;
const IGNORAR = ["content/esquemas.ts", "content/proyectos/_plantilla.ts"];

// Cosas que no se pueden marcar dentro del contenido (listas vacías,
// autorizaciones, llaves de terceros) pero que también me faltan.
const EXTRA = [
  "La lista de propiedades que ya captaste: por cada una, nombre, zona, tipo, superficie, precio, fotos y a quién representas. Con eso lleno content/proyectos/ y el inventario deja de estar vacío.",
  "Autorización por escrito del desarrollador de Alta Tierra para usar marca, renders y precios (mientras no exista, `autorizado: false` y el proyecto no se publica).",
  "Fotos y renders autorizados de Alta Tierra para el hero y la galería.",
  "Amenidades, tiempos clave a destinos y preguntas frecuentes de Alta Tierra.",
  "Cuáles casos del portafolio puedo nombrar y cuáles van anonimizados.",
  "Nombre completo, cargo y empresa de Gus Marcos tal como quiere aparecer.",
  "Dominio definitivo del sitio (hoy apunta al subdominio de Vercel).",
  "ID del píxel de Meta, token de la Conversions API e ID de GA4.",
  "URL del webhook de leads (n8n / GoHighLevel) y del webhook de alertas.",
];

async function archivos(carpeta) {
  const entradas = await readdir(carpeta, { withFileTypes: true });
  const lista = [];
  for (const entrada of entradas) {
    const ruta = join(carpeta, entrada.name);
    if (entrada.isDirectory()) lista.push(...(await archivos(ruta)));
    else if (entrada.name.endsWith(".ts")) lista.push(ruta);
  }
  return lista.sort();
}

const encontrados = [];
for (const ruta of await archivos(CARPETA)) {
  const archivo = relative(RAIZ, ruta);
  if (IGNORAR.includes(archivo)) continue;
  const contenido = await readFile(ruta, "utf8");
  for (const coincidencia of contenido.matchAll(REGEX)) {
    const linea = contenido.slice(0, coincidencia.index).split("\n").length;
    encontrados.push({ archivo, linea, que: (coincidencia[1] ?? coincidencia[2]).trim() });
  }
}

const unicos = [...new Map(encontrados.map((p) => [`${p.archivo}:${p.que}`, p])).values()];

if (process.argv.includes("--check")) {
  if (unicos.length > 0) {
    console.error(`Faltan ${unicos.length} datos por confirmar:`);
    for (const p of unicos) console.error(` · ${p.que}  (${p.archivo}:${p.linea})`);
    process.exit(1);
  }
  console.log("Sin pendientes.");
  process.exit(0);
}

const porArchivo = new Map();
for (const p of unicos) {
  if (!porArchivo.has(p.archivo)) porArchivo.set(p.archivo, []);
  porArchivo.get(p.archivo).push(p);
}

const md = [
  "# Datos pendientes",
  "",
  "> Generado con `npm run pendientes`. No editar a mano.",
  "",
  `Hay **${unicos.length}** datos marcados como \`[CONFIRMAR: …]\` en el contenido.`,
  "Mientras lo estén, esa parte **no se pinta en producción**; en los deploys de",
  "preview aparece como un chip ámbar para que sea fácil verlos.",
  "",
];

for (const [archivo, lista] of porArchivo) {
  md.push(`## \`${archivo}\``, "");
  for (const p of lista) md.push(`- [ ] ${p.que} _(línea ${p.linea})_`);
  md.push("");
}

md.push("## Fuera del contenido", "");
for (const extra of EXTRA) md.push(`- [ ] ${extra}`);
md.push("");

await writeFile(join(RAIZ, "PENDIENTES.md"), md.join("\n"));
console.log(`PENDIENTES.md actualizado con ${unicos.length} datos.`);
