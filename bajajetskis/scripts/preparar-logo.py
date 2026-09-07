"""
Recorta el fondo blanco del logotipo original y deja el emblema con
transparencia, sin tocar el blanco interior del anillo (que sí es parte del
diseño). Solo se vuelve transparente el blanco conectado con el borde.

Uso:  python3 scripts/preparar-logo.py <ruta-del-jpg-original>
Salida: public/assets/logo-baja-jetskis.png  y  app/icon.png
"""

import sys
from collections import deque

import numpy as np
from PIL import Image

ORIGEN = sys.argv[1] if len(sys.argv) > 1 else 'logo-original.jpg'
UMBRAL = 238  # arriba de esto se considera fondo blanco

im = Image.open(ORIGEN).convert('RGB')
px = np.asarray(im).astype(np.int16)
alto, ancho, _ = px.shape

es_blanco = (px[:, :, 0] > UMBRAL) & (px[:, :, 1] > UMBRAL) & (px[:, :, 2] > UMBRAL)

# Inundación desde los bordes: solo el fondo exterior se vuelve transparente.
fondo = np.zeros((alto, ancho), dtype=bool)
cola = deque()
for x in range(ancho):
    for y in (0, alto - 1):
        if es_blanco[y, x] and not fondo[y, x]:
            fondo[y, x] = True
            cola.append((y, x))
for y in range(alto):
    for x in (0, ancho - 1):
        if es_blanco[y, x] and not fondo[y, x]:
            fondo[y, x] = True
            cola.append((y, x))

while cola:
    y, x = cola.popleft()
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        ny, nx = y + dy, x + dx
        if 0 <= ny < alto and 0 <= nx < ancho and es_blanco[ny, nx] and not fondo[ny, nx]:
            fondo[ny, nx] = True
            cola.append((ny, nx))

alpha = np.where(fondo, 0, 255).astype(np.uint8)
rgba = np.dstack([np.asarray(im), alpha])

# El recorte se calcula sobre la tinta real (pixeles claramente oscuros), no
# sobre el alfa: así el ruido de compresion del JPEG no infla el encuadre.
tinta = px.min(axis=2) < 200
filas = np.where(tinta.any(axis=1))[0]
cols = np.where(tinta.any(axis=0))[0]
margen = 6
caja = (
    max(int(cols[0]) - margen, 0),
    max(int(filas[0]) - margen, 0),
    min(int(cols[-1]) + 1 + margen, ancho),
    min(int(filas[-1]) + 1 + margen, alto),
)
recortado = Image.fromarray(rgba, 'RGBA').crop(caja)

# Lienzo cuadrado: el emblema es circular y debe conservar su proporción 1:1.
lado = max(recortado.size)
lienzo = Image.new('RGBA', (lado, lado), (0, 0, 0, 0))
lienzo.paste(recortado, ((lado - recortado.width) // 2, (lado - recortado.height) // 2))

lienzo.resize((640, 640), Image.LANCZOS).save('public/assets/logo-baja-jetskis.png')
lienzo.resize((180, 180), Image.LANCZOS).save('public/assets/apple-touch-icon.png')

# Favicon sobre fondo marino: a 32 px el grabado ya no se lee sobre blanco.
icono = Image.new('RGBA', (lado, lado), (11, 29, 51, 255))
icono.alpha_composite(lienzo)
icono.resize((512, 512), Image.LANCZOS).save('app/icon.png')

print('logo listo:', recortado.size, '->', lienzo.size)
