# Datos pendientes

> Generado con `npm run pendientes`. No editar a mano.

Hay **14** datos marcados como `[CONFIRMAR: …]` en el contenido.
Mientras lo estén, esa parte **no se pinta en producción**; en los deploys de
preview aparece como un chip ámbar para que sea fácil verlos.

## `content/casos/direccion-comercial-san-pedro.ts`

- [ ] párrafo del reto: cómo vendía el desarrollador antes de trabajar juntos y qué lo frenaba _(línea 23)_

## `content/paginas/privacidad.ts`

- [ ] razón social completa, domicilio fiscal y correo de contacto para el aviso de privacidad _(línea 25)_
- [ ] correo electrónico oficial para solicitudes ARCO _(línea 81)_

## `content/proyectos/alta-tierra.ts`

- [ ] razón social del desarrollador de Alta Tierra para el crédito en la ficha _(línea 26)_

## `content/proyectos/gaia-residencial.ts`

- [ ] razón social del desarrollador de Gaia Residencial para el crédito en la ficha _(línea 18)_
- [ ] fotos o renders autorizados de Gaia Residencial _(línea 23)_
- [ ] superficie de terreno del modelo Terra Plus _(línea 59)_

## `content/proyectos/residencial-diamante.ts`

- [ ] razón social del desarrollador de Residencial Diamante para el crédito en la ficha _(línea 20)_
- [ ] fotos autorizadas de Residencial Diamante (fachada, casa muestra y roof garden) _(línea 25)_
- [ ] superficie de terreno de los modelos Rubí y Zafiro _(línea 61)_
- [ ] lista de precios vigente de Residencial Diamante por modelo, confirmada con el desarrollo _(línea 62)_

## `content/sitio.ts`

- [ ] número de registro estatal como agente inmobiliario en B.C. _(línea 27)_
- [ ] razón social o nombre del responsable para el aviso de privacidad _(línea 28)_
- [ ] domicilio fiscal para el aviso de privacidad _(línea 29)_

## Fuera del contenido

- [ ] La lista de propiedades que ya captaste: por cada una, nombre, zona, tipo, superficie, precio, fotos y a quién representas. Con eso lleno content/proyectos/ y el inventario deja de estar vacío.
- [ ] Autorización por escrito del desarrollador de Alta Tierra para usar marca, fotos y precios. Fran confirmó en chat que el sitio vende el proyecto, así que ya está publicado (`autorizado: true`); falta el respaldo por escrito.
- [ ] Fotos propias de Alta Tierra en alta resolución. Ahora mismo el hero y la galería usan las del sitio oficial (altatierra.mx), enlazadas en remoto.
- [ ] Confirmar el estado del inventario de Alta Tierra: hoy se publica como entrega inmediata porque los lotes están urbanizados.
- [ ] Confirmar vigencia y disponibilidad de la lista de precios de Alta Tierra. La publicada en la ficha es la de la etapa 2.5 que el desarrollo tiene en su sitio (20% de enganche, 12 o 24 pagos sin intereses, apartado de 1,000 USD). Si ya cambió o hay etapa nueva, se actualiza en content/proyectos/alta-tierra.ts.
- [ ] Tiempos reales de Alta Tierra a puntos clave (centro de Ensenada, Valle de Guadalupe, garita) para poder publicarlos sin inventar minutos.
- [ ] Cuáles casos del portafolio puedo nombrar y cuáles van anonimizados.
- [ ] Confirmar que representas Residencial Diamante y Gaia Residencial, y conseguir su autorización por escrito. Las dos fichas se armaron con datos públicos (sitio oficial de Gaia, y fichas de RE/MAX, Century 21 e icasas para Diamante): hay que validarlas con cada desarrollo antes de moverles tráfico.
- [ ] Fotos autorizadas de Residencial Diamante y de Gaia Residencial. Sin ellas las fichas se publican con el nombre en tipografía y sin imagen.
- [ ] Retratos de Diego Talamantes y Omar Maldonado. Mientras no existan, la sección de equipo pinta sus iniciales: no se pone la foto de otra persona de relleno.
- [ ] Testimonios de compradores. Por cada uno hacen falta cuatro cosas y el permiso por escrito: nombre tal como quiere aparecer, ciudad, qué compró y su frase textual. Se agregan en TESTIMONIOS_CLIENTES (content/testimonios.ts) y la sección aparece sola. No se redacta ninguno por nuestra cuenta.
- [ ] Nombre completo, cargo y empresa de Gus Marcos tal como quiere aparecer.
- [ ] Párrafo personal para /sobre-mi: por qué bienes raíces y cómo llegaste a Ensenada.
- [ ] Credenciales, certificaciones y registro como agente inmobiliario en B.C. La sección no existe en el sitio hasta que haya dato: no se publica un bloque vacío.
- [ ] Elegir dirección visual en /styleguide: A (marea nocturna) o B (luz de sal).
- [ ] Dominio definitivo del sitio (hoy apunta al subdominio de Vercel).
- [ ] ID del píxel de Meta, token de la Conversions API e ID de GA4.
- [ ] URL del webhook de leads (n8n / GoHighLevel) y del webhook de alertas.
