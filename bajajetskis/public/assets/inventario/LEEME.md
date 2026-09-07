# Fotografía del inventario

Todas las imágenes de esta carpeta son **placeholders generados**, no fotos
reales. Se sustituyen conservando **el mismo nombre de archivo**: el sitio no
necesita ningún cambio de código.

Para regenerarlas: `python3 scripts/generar-placeholders.py`

## Estándar fotográfico (del plan de negocio)

Este es el punto que decide si la marca se ve premium o se ve como Marketplace.
No cuesta dinero, cuesta disciplina:

- **Mismo fondo, mismo ángulo y misma hora del día** para todas las unidades.
- Unidad **limpia y seca**, sin remolque desordenado ni cables a la vista.
- **Mínimo ocho tomas por unidad**: tres cuartos, lateral, asiento, tablero,
  casco, número de serie, compartimento de motor y detalle de lo reemplazado.
- Un **video corto de la unidad encendida**.

## Proporciones

| Uso | Archivo | Proporción | Tamaño mínimo |
|---|---|---|---|
| Tarjeta y galería de unidad | `assets/inventario/*.jpg` | 4:3 | 1600 × 1200 |
| Portada (hero) | `assets/hero-unidad-reconstruida.jpg` | 16:9 | 2400 × 1350 |
| Pasos del taller | `assets/taller/0*.jpg` | 4:3 | 1200 × 900 |
| Retrato del mecánico | `assets/taller/mecanico.jpg` | 4:5 | 1000 × 1250 |
| Punto de entrega | `assets/taller/estero-ensenada.jpg` | 3:4 | 900 × 1200 |
| Open Graph (redes) | `assets/og-baja-jetskis.jpg` | 1.91:1 | 1200 × 630 |

## Al subir las fotos reales

En `data/inventario.ts`, cada foto tiene `placeholder: true`. Ponlo en `false`
cuando la imagen sea la de esa unidad: el aviso de "fotografía de referencia"
desaparece solo en la ficha.
