# Créditos de imágenes

Toda imagen del sitio es o bien un activo propio de Treu Legal & Business, o
bien fotografía con licencia libre para uso comercial, verificada una a una.

## Activos propios del despacho

Descargados de la biblioteca de medios de treulegal.solutions. Originales en
`assets/raw/brand/`, optimizados con `node scripts/brand.mjs`.

| Archivo | Origen | Uso |
| --- | --- | --- |
| `public/brand/wordmark-azul.webp` | `2026/07/Nuevo-logotipo-reforzador-azul-2-e1785220897758.png` | Header |
| `public/brand/wordmark-blanco.webp` | `2026/03/Nuevo-logotipo-reforzador-blanco.png` | Footer, hero en inglés |
| `public/brand/isotipo-azul.webp` | `2026/07/ISOTIPO-Treu™-Legal-Business-azul-fondo-transparente.png` | Marca de agua, favicon |
| `public/brand/isotipo-blanco.webp` | `2026/07/ISOTIPO-Treu™-Legal-Business-blanco-fondo-transparente.png` | Marca de agua sobre azul |
| `public/img/retrato-la-firma-*.{avif,webp}` | `2026/03/803F1A51-62E7-416F-BDF5-05AD14AC8E9D.png` | Sección de perfil profesional de `/la-firma/`, en la misma posición que hoy |

Nota sobre el retrato: su texto alternativo **no afirma la identidad de la
persona**. La confirmación del despacho está pendiente (punto 1 de
[PENDIENTES-CLIENTE.md](./PENDIENTES-CLIENTE.md)).

Las miniaturas de los 68 artículos siguen sirviéndose desde WordPress y son
propiedad del despacho.

### Logotipos de terceros NO utilizados

La biblioteca de medios contiene logotipos de ANADE, el Colegio de Abogados de
Ensenada, la ICC México y la CNNM, de una versión anterior del sitio. **No se
usan**: no aparecen en el sitio actual y el brief prohíbe logotipos de terceros
porque sugieren afiliación. Ver el punto 7 de los pendientes.

## Fotografía con licencia libre

Originales en `assets/raw/`, procesados con `node scripts/images.mjs`.

### Valle de Guadalupe — hero de la home

| | |
| --- | --- |
| Archivo | `public/img/valle-de-guadalupe-{640,1024,1600}.{avif,webp}` |
| Título original | *Guadalupe valley* |
| Autor | Tomás Castelazo |
| Licencia | **CC BY-SA 3.0** |
| Fuente | Wikimedia Commons — [File:Guadalupe valley.jpg](https://commons.wikimedia.org/wiki/File:Guadalupe_valley.jpg) |
| Uso comercial | Permitido, con atribución y misma licencia para la obra derivada |
| Original | 4118 × 1877 px |
| Por qué | Hileras de viñedo trazadas en líneas paralelas: la retícula del concepto rector ya existe en el paisaje real de Ensenada. |

Atribución requerida: **Tomás Castelazo, CC BY-SA 3.0, vía Wikimedia Commons.**

### Conurbación Tijuana–San Diego — Cross-Border Advisory y Empresas Binacionales

| | |
| --- | --- |
| Archivo | `public/img/tijuana-san-diego-iss-{640,1024}.{avif,webp}` |
| Título original | *ISS-51 Tijuana, Mexico and San Diego, California* |
| Autor | NASA (Estación Espacial Internacional, Expedición 51) |
| Licencia | **Dominio público** (obra de la NASA) |
| Fuente | Wikimedia Commons — [File:ISS-51 Tijuana, Mexico and San Diego, California.jpg](https://commons.wikimedia.org/wiki/File:ISS-51_Tijuana,_Mexico_and_San_Diego,_California.jpg) |
| Uso comercial | Permitido, sin restricciones |
| Original | 4928 × 3280 px |
| Por qué | Se lee la retícula urbana de ambas ciudades y la línea de la frontera. Es un plano real, no un cliché de frontera ni un muro. |

### Imágenes evaluadas y descartadas

Verificadas visualmente antes de decidir:

| Imagen | Licencia | Por qué se descartó |
| --- | --- | --- |
| *Entrada a la ciudad de Ensenada* (Soy leo fotografía) | CC0 | Vista aérea muy ruidosa y con vallas publicitarias de marcas de terceros bien legibles. |
| *Border Wall at Tijuana and San Diego Border* | CC BY-SA 4.0 | Imagen de muro fronterizo: carga política impropia para un despacho corporativo. |
| *Watching the Mogor vineyard* | CC0 | Buena, pero la del Valle de Guadalupe elegida lee mejor como retícula. |

## Tratamiento

Todas las fotografías reciben el mismo tratamiento en
[`scripts/images.mjs`](../scripts/images.mjs): **monocromo frío de bajo
contraste** (escala de grises, contraste reducido, sombras levantadas y un velo
azul muy sutil).

Es una decisión de diseño —la fotografía acompaña, nunca compite con la
retícula y la tipografía— y además reduce el peso de forma drástica al eliminar
el detalle de color: el hero en móvil pesa **23,8 KB** en AVIF.

Formatos: AVIF y WebP, con variantes responsivas, dimensiones explícitas y
texto alternativo descriptivo en español.

## Ilustración propia

Sin licencia de terceros: SVG escrito para este proyecto.

| Elemento | Dónde | Qué es |
| --- | --- | --- |
| Retícula de plano | `.plan-grid` en `app/globals.css` | Dos degradados lineales de 1 px cada 3 rem, al 7 % del azul de marca |
| Curvas topográficas de Baja California | `TopoLines` en `components/PlanMark.tsx` | Cinco trazos que sugieren las curvas de nivel de la península |
| Cotas | `Cota` en `components/PlanMark.tsx` | La línea con remates que mide una distancia en un plano |
| Imagen OG | `app/api/og/route.tsx` | Tipográfica, con la retícula y el wordmark. Sin fotografía |

## Iconos

**Lucide**, licencia **ISC**. Los paths se copian de `lucide-static` a
`components/Icon.tsx` para no cargar una dependencia de iconos en el cliente.
34 iconos.

## Tipografías

| Familia | Licencia | Fuente |
| --- | --- | --- |
| Archivo | SIL Open Font License 1.1 | Omnibus-Type, vía Google Fonts |
| Source Serif 4 | SIL Open Font License 1.1 | Adobe, vía Google Fonts |

Autohospedadas en `app/fonts/`, subconjunto latino.
