/**
 * Auditoría del sitio en el navegador. Revisa las dos cosas que no se pueden
 * verificar leyendo el código:
 *
 *   1. Que TODOS los enlaces de WhatsApp lleven el contexto correcto del
 *      producto, bien codificado y con rel="noopener noreferrer".
 *   2. Que el contraste realmente renderizado cumpla WCAG AA.
 *
 * Uso:
 *   npm run build && npx next start -p 3100 &
 *   node scripts/auditar.mjs           (requiere playwright instalado aparte)
 */

import { chromium } from 'playwright'

const BASE = process.env.BASE_URL ?? 'http://localhost:3100'

const PAGINAS = [
  ['/', 'Portada'],
  ['/inventario', 'Inventario'],
  ['/inventario/yamaha-vx-cruiser-ho-2019', 'Ficha con gemela'],
  ['/inventario/sea-doo-gti-se-130-2018', 'Ficha sin remolque'],
  ['/inventario/kawasaki-ultra-310lx-2016', 'Ficha apartada'],
  ['/inventario/sea-doo-spark-trixx-3up-2020', 'Ficha vendida'],
  ['/taller', 'Taller'],
  ['/contacto', 'Contacto'],
  ['/en', 'Home EN'],
  ['/en/inventory', 'Inventory EN'],
  ['/en/inventory/yamaha-fx-cruiser-svho-2017', 'Unit page EN'],
  ['/en/workshop', 'Workshop EN'],
  ['/en/contact', 'Contact EN'],
]

const NUMERO = '526462563006'

function lin(c) {
  const v = c / 255
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
}
function luminancia([r, g, b]) {
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}
function contraste(a, b) {
  const [x, y] = [luminancia(a), luminancia(b)]
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}
function rgb(css) {
  const m = css.match(/rgba?\(([^)]+)\)/)
  if (!m) return null
  const p = m[1].split(',').map((n) => parseFloat(n))
  return { c: [p[0], p[1], p[2]], a: p.length > 3 ? p[3] : 1 }
}
function mezclar(frente, fondo, alfa) {
  return frente.map((c, i) => Math.round(c * alfa + fondo[i] * (1 - alfa)))
}

const navegador = await chromium.launch()
const ctx = await navegador.newContext({ viewport: { width: 1280, height: 900 } })
const page = await ctx.newPage()

let fallos = 0
let enlaces = 0
let textos = 0

for (const [ruta, nombre] of PAGINAS) {
  await page.goto(BASE + ruta, { waitUntil: 'networkidle' })

  // ---- 1. Enlaces de WhatsApp -------------------------------------------
  const wa = await page.$$eval('a[href*="wa.me"]', (nodos) =>
    nodos.map((a) => ({
      href: a.getAttribute('href'),
      target: a.getAttribute('target'),
      rel: a.getAttribute('rel'),
      texto: (a.textContent || '').trim().slice(0, 40),
    })),
  )

  const esFicha = /\/(inventario|inventory)\/[^/]+$/.test(ruta)
  const modelo = esFicha
    ? decodeURIComponent(ruta.split('/').pop().replace(/-\d{4}(-gemela)?$/, '').split('-').slice(1).join(' '))
    : null

  if (wa.length === 0) {
    console.log(`✗ ${nombre}: no hay ningún enlace de WhatsApp`)
    fallos++
  }

  let conContexto = 0
  for (const a of wa) {
    enlaces++
    const url = new URL(a.href)
    const texto = url.searchParams.get('text') ?? ''

    if (!a.href.startsWith(`https://wa.me/${NUMERO}?text=`)) {
      console.log(`✗ ${nombre}: número o formato incorrecto → ${a.href}`)
      fallos++
    }
    if (a.target !== '_blank' || !(a.rel || '').includes('noopener')) {
      console.log(`✗ ${nombre}: enlace sin target/rel seguro → "${a.texto}"`)
      fallos++
    }
    // El texto crudo del href debe estar codificado: sin espacios ni acentos.
    const crudo = a.href.split('?text=')[1] ?? ''
    if (/[ áéíóúñÁÉÍÓÚÑ$—,]/.test(crudo)) {
      console.log(`✗ ${nombre}: texto sin encodeURIComponent → ${crudo.slice(0, 60)}`)
      fallos++
    }
    if (texto.length < 20) {
      console.log(`✗ ${nombre}: mensaje demasiado corto → "${texto}"`)
      fallos++
    }
    if (esFicha && /vi en su sitio|saw it on your site|precio por|quote me|opciones de pago|payment options/i.test(texto)) {
      conContexto++
    }
  }

  if (esFicha && conContexto === 0) {
    console.log(`✗ ${nombre}: ningún enlace lleva el contexto de la unidad`)
    fallos++
  }

  // ---- 2. Contraste de todo el texto visible -----------------------------
  const muestras = await page.evaluate(() => {
    const fondoReal = (el) => {
      let n = el
      while (n && n !== document.documentElement) {
        const bg = getComputedStyle(n).backgroundColor
        const m = bg.match(/rgba?\(([^)]+)\)/)
        if (m) {
          const p = m[1].split(',').map(parseFloat)
          if ((p[3] ?? 1) > 0.85) return bg
        }
        n = n.parentElement
      }
      return 'rgb(255, 255, 255)'
    }
    const out = []
    for (const el of document.querySelectorAll('body *')) {
      const propio = [...el.childNodes].some(
        (n) => n.nodeType === 3 && n.textContent.trim().length > 1,
      )
      if (!propio) continue
      const cs = getComputedStyle(el)
      if (cs.visibility === 'hidden' || cs.display === 'none' || cs.opacity === '0') continue
      const caja = el.getBoundingClientRect()
      if (caja.width < 2 || caja.height < 2) continue
      out.push({
        color: cs.color,
        fondo: fondoReal(el),
        tam: parseFloat(cs.fontSize),
        peso: parseInt(cs.fontWeight, 10) || 400,
        etiqueta: el.tagName.toLowerCase(),
        texto: (el.textContent || '').trim().slice(0, 45),
      })
    }
    return out
  })

  for (const m of muestras) {
    const f = rgb(m.color)
    const b = rgb(m.fondo)
    if (!f || !b) continue
    textos++
    const color = f.a < 1 ? mezclar(f.c, b.c, f.a) : f.c
    const ratio = contraste(color, b.c)
    const grande = m.tam >= 24 || (m.tam >= 18.66 && m.peso >= 700)
    const minimo = grande ? 3 : 4.5
    if (ratio < minimo) {
      console.log(
        `✗ ${nombre}: contraste ${ratio.toFixed(2)}:1 (mín ${minimo}) — <${m.etiqueta}> ${m.tam}px "${m.texto}"`,
      )
      fallos++
    }
  }
}

await navegador.close()

console.log(`\n${enlaces} enlaces de WhatsApp y ${textos} bloques de texto revisados en ${PAGINAS.length} páginas.`)
console.log(fallos === 0 ? '✓ Sin fallos.' : `✗ ${fallos} fallos.`)
process.exit(fallos === 0 ? 0 : 1)
