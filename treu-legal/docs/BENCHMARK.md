# Benchmark de firmas de referencia

Sirve para **medir, no para copiar**. Las grandes firmas ganan por marca; una
boutique gana por claridad, velocidad, especialización regional y acceso
directo al fundador.

Medido el 18 de septiembre de 2026 con Lighthouse móvil (`--form-factor=mobile`,
throttling simulado) y capturas a 390 px. Reproducible con
`node scripts/benchmark.mjs`; datos crudos en `docs/_benchmark/`.

`creel.mx` bloqueó el acceso automatizado; se continúa con las demás, como
indica el brief.

## Matriz

| Firma | País | Rend. | Acces. | B. prácticas | SEO | LCP | Peso home | Peticiones |
| --- | --- | --: | --: | --: | --: | --: | --: | --: |
| cooley.com | EE.UU. | **14** | 96 | 73 | 100 | 15,9 s | 2 281 KB | 75 |
| wsgr.com | EE.UU. | **40** | 85 | 96 | 75 | 22,4 s | 4 165 KB | 59 |
| fenwick.com | EE.UU. | **42** | 85 | 73 | 92 | 7,2 s | 1 172 KB | 49 |
| vonwobeser.com | México | **83** | 100 | 96 | 100 | 4,2 s | 609 KB | 23 |
| galicia.com.mx | México | **54** | 58 | 92 | 73 | 8,5 s | 10 404 KB | 72 |
| ritch.com.mx | México | **38** | 82 | 96 | 85 | 6,5 s | 1 399 KB | 59 |
| creel.mx | México | — | — | — | — | — | — | sin acceso |
| **treulegal.solutions (actual)** | México | **59** | 93 | 100 | 92 | 21,3 s | 4 775 KB | 58 |
| **Sitio nuevo** | México | **91** | **100** | 96 † | **100** | 3,5 s ‡ | **597 KB** | — |

† Los 96 de buenas prácticas del sitio nuevo se deben únicamente a que, medido
en un servidor local, los scripts de Vercel Analytics (`/_vercel/insights/…`)
responden 404 y Lighthouse los cuenta como errores de consola. En el preview de
Vercel esos scripts existen. La cifra del preview está en
[ENTREGA.md](./ENTREGA.md).

‡ El LCP de 3,5 s es el del modelo simulado de Lighthouse sobre un servidor
local sin CDN ni compresión Brotli. Medido con throttling real (4× CPU y 4G
lento) sobre el mismo build, el LCP es de **784 ms** en móvil y el elemento LCP
es el párrafo de propuesta de valor del hero. Ver [LINEA-BASE.md](./LINEA-BASE.md).

## Dimensiones cualitativas

### Claridad de la propuesta en 5 segundos

Ninguna de las seis firmas accesibles resuelve la prueba en móvil.
`vonwobeser.com`, la mejor puntuada del grupo, abre con un banner de cookies
que ocupa la mitad inferior de la pantalla, una fotografía de rascacielos al
atardecer y un desplegable de «Noticias». En el primer pantallazo no hay H1,
ni propuesta de valor, ni siguiente paso. `cooley.com` y `wsgr.com` abren con
un carrusel de notas de prensa. La estrategia de todas es la misma: se da por
supuesto que quien llega ya sabe quién es la firma.

Es exactamente el hueco que una boutique puede ocupar.

### Visibilidad del siguiente paso

Ninguna publica un siguiente paso concreto ni su precio. La pauta del sector
es «Contact us» en el menú y un formulario genérico al final. Ninguna dice
cuánto dura una primera conversación, con quién es, cuánto cuesta ni en cuánto
tiempo responden.

### Navegación móvil

Todas usan menú hamburguesa con árboles de tres o cuatro niveles (Cooley
tiene 75 peticiones sólo en la home). Von Wobeser es la más contenida, con 23.

### Velocidad

El sector es lento: cinco de seis firmas están por debajo de 55 de rendimiento
y ninguna baja de 4 s de LCP. Galicia sirve 10,4 MB en la home móvil.

### Señales de confianza

Su activo es la marca, los rankings y el tamaño del equipo. Ninguna muestra
credenciales individuales en la home ni acceso directo a un socio.

### Experiencia de contenidos

Todas tienen sección de publicaciones; ninguna con filtros por categoría con
conteo ni búsqueda en el listado. El contenido es institucional (notas de
prensa, alertas regulatorias), no criterio aplicado.

### Bilingüismo

Von Wobeser y Galicia tienen selector ES/EN completo y correcto: es el estándar
del mercado mexicano y la referencia a alcanzar. Las firmas de EE.UU. son
monolingües.

### Accesibilidad

Dispersa: Von Wobeser 100, Cooley 96, Galicia 58. Ninguna alcanza 0 violaciones
de axe.

### Contacto directo

**Ninguna de las seis ofrece WhatsApp.** Sólo tres (Cooley, Von Wobeser, Ritch)
tienen un enlace `tel:` accesible en el primer pantallazo móvil.

## Cómo Treu les gana con su propio contenido

1. **Un siguiente paso concreto, con precio.** La Strategic Legal Session dice
   qué dura, con quién es, cuánto cuesta y que el honorario es acreditable al
   proyecto. Ninguna de las siete firmas publica nada equivalente. Esta
   información sube al hero y acompaña al CTA en todo el sitio.
2. **Respuesta en menos de 24 horas hábiles, publicada.** Un compromiso
   verificable que las grandes firmas no dan.
3. **Acceso directo al fundador.** Lo que en una firma grande es imposible
   —hablar con el Principal Counsel en la primera reunión— aquí es el producto.
4. **Velocidad.** 91–97 de rendimiento y 433–597 KB por página, frente a un
   sector que ronda los 40 y los megabytes (Galicia sirve 10,4 MB; el sitio
   actual de Treu, 4,8 MB). En móvil, con datos móviles y en Baja California,
   esto se nota.
5. **WhatsApp y llamada a un toque.** Canal nativo del empresario mexicano, que
   ninguna firma de la muestra ofrece. En el sitio nuevo están en una barra
   inferior fija.
6. **Especialización regional explícita.** Ensenada, Baja California, el
   corredor México–California, el Valle de Guadalupe, los parques industriales
   de Tijuana y Mexicali. Las firmas nacionales hablan de «México» en abstracto.
7. **Criterio aplicado, no notas de prensa.** 68 artículos del fundador sobre
   casos concretos (sociedad conyugal y acciones, reparto desigual de herencia,
   honorarios pagados con acciones). Con filtros por categoría, búsqueda y
   paginación compartible, algo que no tiene ninguna.
8. **Accesibilidad sin violaciones.** 0 violaciones de axe en las 19 plantillas
   a 390 y 1440 px, y 100 de accesibilidad en Lighthouse. La mejor del grupo
   (Von Wobeser) llega a 100 en Lighthouse pero el resto va de 58 a 96.
