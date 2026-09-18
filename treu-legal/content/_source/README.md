# content/_source

Contenido extraído de treulegal.solutions. Es la **fuente de verdad** del
sitio: `npm run verify:content` comprueba contra estos archivos que ningún
texto publicado carezca de origen.

| Archivo | Qué es |
| --- | --- |
| `pages/<slug>.json` | Cada página del sitio actual en bloques tipados, con su `source` (URL de origen), sus metadatos y sus imágenes. Lo que consume la aplicación. |
| `index.json` | Índice legible de las 38 páginas: ruta, número de bloques, caracteres e imágenes sin `alt`. |
| `pages.json`, `posts.json`, `categories.json`, `users.json` | Respuestas consolidadas de la REST API de WordPress. |
| `media.json`, `tags.json` | Biblioteca de medios y etiquetas, para trazabilidad. |
| `meta/`, `html/` | Volcados crudos (respuestas paginadas y HTML renderizado). No se versionan porque pesan 21 MB; se regeneran con `npm run extract`. |

Regenerar todo:

```bash
npm run extract
```
