"""
Genera las imágenes de relleno del sitio con la paleta del manual, para poder
ver el sitio armado sin fotografía real. Cada archivo lleva escrito qué toma
va en su lugar, según el estándar fotográfico del plan de negocio:
tres cuartos, lateral, asiento, tablero, casco y número de serie.

Todas se sustituyen por la foto real conservando el mismo nombre de archivo.

Uso:  python3 scripts/generar-placeholders.py
"""

import math
import os

from PIL import Image, ImageDraw, ImageFont

NAVY = (11, 29, 51)
DEEP = (21, 50, 84)
GOLD = (196, 154, 69)
OCHRE = (140, 123, 101)
PARCHMENT = (244, 238, 223)

SERIF = '/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf'
SANS = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
SANS_BOLD = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'


def fuente(ruta, tam):
    return ImageFont.truetype(ruta, tam)


def centrar(draw, texto, y, font, color, ancho, espaciado=0):
    if espaciado:
        texto = espaciado * ' '.join(list(texto)) if False else ' '.join(list(texto))
    caja = draw.textbbox((0, 0), texto, font=font)
    draw.text(((ancho - (caja[2] - caja[0])) / 2 - caja[0], y), texto, font=font, fill=color)
    return caja[3] - caja[1]


def lienzo(ancho, alto, titulo, subtitulo, etiqueta, minimo=False):
    """Fondo marino con el sol grabado del emblema y el rótulo de la toma."""
    im = Image.new('RGB', (ancho, alto), NAVY)
    d = ImageDraw.Draw(im, 'RGBA')

    # Degradado vertical hacia el azul océano profundo.
    for y in range(alto):
        k = y / alto
        c = tuple(int(NAVY[i] + (DEEP[i] - NAVY[i]) * (k ** 1.4)) for i in range(3))
        d.line([(0, y), (ancho, y)], fill=c)

    # Rayos solares: convergen en el horizonte, como en el emblema.
    cx, cy = ancho / 2, alto * 0.72
    radio = max(ancho, alto) * 1.15
    for i in range(72):
        a0 = math.pi + (i / 72) * math.pi
        a1 = a0 + (math.pi / 72) * 0.42
        d.polygon(
            [
                (cx, cy),
                (cx + radio * math.cos(a0), cy + radio * math.sin(a0)),
                (cx + radio * math.cos(a1), cy + radio * math.sin(a1)),
            ],
            fill=(*GOLD, 26),
        )

    # Horizonte y oleaje.
    d.line([(0, cy), (ancho, cy)], fill=(*GOLD, 90), width=max(1, ancho // 600))
    for i in range(1, 5):
        y = cy + i * (alto * 0.045)
        d.line([(ancho * 0.08, y), (ancho * 0.92, y)], fill=(*GOLD, 40 - i * 6), width=1)

    # Filete doble del anillo perimetral.
    m = int(min(ancho, alto) * 0.045)
    d.rectangle([m, m, ancho - m, alto - m], outline=(*GOLD, 140), width=2)
    d.rectangle([m + 7, m + 7, ancho - m - 7, alto - m - 7], outline=(*GOLD, 70), width=1)

    base = min(ancho, alto)
    if minimo:
        # La portada lleva texto encima: el relleno se queda sin rótulo central
        # para no competir con el titular.
        f_pie = fuente(SANS_BOLD, max(10, int(base * 0.022)))
        pie = f'FOTO PENDIENTE  ·  {etiqueta.upper()}'
        caja = d.textbbox((0, 0), pie, font=f_pie)
        pw, ph = caja[2] - caja[0], caja[3] - caja[1]
        px0 = ancho - pw - base * 0.16
        py0 = alto - ph - base * 0.14
        d.rectangle([px0, py0, px0 + pw + base * 0.06, py0 + ph + base * 0.042], fill=(*GOLD, 220))
        d.text((px0 + base * 0.03 - caja[0], py0 + base * 0.021 - caja[1]), pie, font=f_pie, fill=NAVY)
        return im

    f_marca = fuente(SANS_BOLD, max(11, int(base * 0.028)))
    f_titulo = fuente(SERIF, max(15, int(base * 0.055)))
    f_sub = fuente(SANS, max(11, int(base * 0.030)))
    f_pie = fuente(SANS_BOLD, max(10, int(base * 0.024)))

    y = alto * 0.30
    centrar(d, 'B A J A   J E T S K I S', y, f_marca, GOLD, ancho)
    y += base * 0.075
    for linea in titulo.split('\n'):
        centrar(d, linea, y, f_titulo, PARCHMENT, ancho)
        y += base * 0.078
    if subtitulo:
        y += base * 0.012
        centrar(d, subtitulo, y, f_sub, (210, 200, 180), ancho)

    pie = f'FOTO PENDIENTE  ·  {etiqueta.upper()}'
    caja = d.textbbox((0, 0), pie, font=f_pie)
    pw, ph = caja[2] - caja[0], caja[3] - caja[1]
    px0 = (ancho - pw) / 2 - base * 0.03
    py0 = alto * 0.86 - base * 0.022
    d.rectangle([px0, py0, px0 + pw + base * 0.06, py0 + ph + base * 0.044], fill=(*GOLD, 235))
    d.text(((ancho - pw) / 2 - caja[0], py0 + base * 0.022 - caja[1]), pie, font=f_pie, fill=NAVY)

    return im


def guardar(im, ruta):
    os.makedirs(os.path.dirname(ruta), exist_ok=True)
    im.save(ruta, 'JPEG', quality=82, optimize=True, progressive=True)
    print(f'  {ruta}  {im.width}x{im.height}')


UNIDADES = {
    'yamaha-vx-cruiser-ho-2019': ('Yamaha VX Cruiser HO\n2019', [
        ('tres-cuartos', 'Tres cuartos'), ('lateral', 'Lateral'),
        ('tablero', 'Tablero'), ('asiento', 'Asiento'), ('motor', 'Compartimento de motor'),
    ]),
    'yamaha-vx-cruiser-ho-2019-gemela': ('Yamaha VX Cruiser HO\n2019 · gemela', [
        ('tres-cuartos', 'Tres cuartos'), ('lateral', 'Lateral'),
        ('par', 'Las dos en el remolque'), ('tablero', 'Tablero'), ('serie', 'Número de serie'),
    ]),
    'sea-doo-gti-se-130-2018': ('Sea-Doo GTI SE 130\n2018', [
        ('tres-cuartos', 'Tres cuartos'), ('lateral', 'Lateral'),
        ('tablero', 'Tablero'), ('asiento', 'Asiento'), ('bomba', 'Bomba de chorro'),
    ]),
    'yamaha-fx-cruiser-svho-2017': ('Yamaha FX Cruiser SVHO\n2017', [
        ('tres-cuartos', 'Tres cuartos'), ('lateral', 'Lateral'),
        ('supercargador', 'Supercargador'), ('tablero', 'Tablero'), ('serie', 'Número de serie'),
    ]),
    'kawasaki-ultra-310lx-2016': ('Kawasaki Ultra 310LX\n2016', [
        ('tres-cuartos', 'Tres cuartos'), ('lateral', 'Lateral'),
        ('asiento', 'Asiento'), ('tablero', 'Tablero'),
    ]),
    'sea-doo-spark-trixx-3up-2020': ('Sea-Doo Spark Trixx 3up\n2020', [
        ('tres-cuartos', 'Tres cuartos'), ('lateral', 'Lateral'), ('entrega', 'Entrega'),
    ]),
}

TALLER = [
    ('01-llegada', 'Llegada de la unidad', '1200x900'),
    ('02-desarme', 'Desarme y diagnóstico', '1200x900'),
    ('03-reparacion', 'Reconstrucción', '1200x900'),
    ('04-entrega', 'Papeles y entrega', '1200x900'),
]

if __name__ == '__main__':
    print('Inventario:')
    for slug, (titulo, tomas) in UNIDADES.items():
        for archivo, toma in tomas:
            guardar(lienzo(1600, 1200, titulo, 'Unidad reconstruida en taller', toma),
                    f'public/assets/inventario/{slug}-{archivo}.jpg')

    print('Portada y taller:')
    guardar(lienzo(2400, 1350, '', '', 'Portada · unidad reconstruida', minimo=True),
            'public/assets/hero-unidad-reconstruida.jpg')

    for archivo, toma, _ in TALLER:
        guardar(lienzo(1200, 900, toma, 'Proceso de reconstrucción', toma),
                f'public/assets/taller/{archivo}.jpg')

    guardar(lienzo(1000, 1250, 'El mecánico', 'Retrato en el taller', 'Retrato vertical'),
            'public/assets/taller/mecanico.jpg')
    guardar(lienzo(900, 1200, 'El Estero, Ensenada', 'Punto de entrega', 'Ubicación'),
            'public/assets/taller/estero-ensenada.jpg')
    guardar(lienzo(1200, 630, 'BAJA JETSKIS', 'La única forma de comprar sin miedo', 'Open Graph'),
            'public/assets/og-baja-jetskis.jpg')
