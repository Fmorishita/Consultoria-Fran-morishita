/**
 * ⚠️ CONTENIDO DE EJEMPLO — TODO ESTE ARCHIVO SE REEMPLAZA ANTES DE PUBLICAR.
 *
 * Aquí vive, en un solo lugar, todo lo que es andamio para ver el sitio armado:
 * testimonios inventados, el nombre del mecánico y las cifras de trayectoria.
 * Nada de esto debe salir a producción tal cual.
 *
 * Checklist antes de lanzar:
 *   1. TESTIMONIOS      → levantar los reales por WhatsApp a clientes anteriores.
 *   2. TALLER.mecanico  → nombre real, años de oficio y certificaciones.
 *   3. TRAYECTORIA      → números reales del negocio (unidades entregadas, años).
 *   4. Fotografías      → ver /public/assets/inventario/LEEME.md
 *
 * Mientras `MODO_PLACEHOLDER` esté en true, el sitio marca visiblemente los
 * testimonios de ejemplo para que nadie los confunda con reales. Al poner los
 * verdaderos, cambia la bandera a false y el aviso desaparece solo.
 */

export const MODO_PLACEHOLDER = true

export type Testimonio = {
  nombre: string
  ciudad: string
  unidad: string
  /** El miedo que traía antes de comprar. Es lo que hace útil al testimonio. */
  miedo: { es: string; en: string }
  cita: { es: string; en: string }
  fecha: { es: string; en: string }
}

/* PLACEHOLDER — reemplazar con testimonios reales antes de publicar */
export const TESTIMONIOS: Testimonio[] = [
  {
    nombre: 'Ricardo Alcántara',
    ciudad: 'Tijuana',
    unidad: 'Yamaha VX Cruiser HO 2019',
    miedo: {
      es: 'Que los papeles no estuvieran bien',
      en: 'That the paperwork would not hold up',
    },
    cita: {
      es: 'Llevaba cuatro años rentando en Rosarito y ya había perdido la cuenta de lo que iba gastando. Lo que me frenaba era la matrícula: en Marketplace todos te dicen "sí tiene papeles" y ninguno te los enseña. Aquí me pusieron la carpeta en la mesa antes de que yo la pidiera. Eso cerró la venta.',
      en: 'I rented in Rosarito for four years and lost count of what I had spent. What held me back was the registration: on Marketplace everyone says "yes, it has papers" and nobody shows them to you. Here they put the folder on the table before I asked. That closed the sale.',
    },
    fecha: { es: 'Compró en abril', en: 'Bought in April' },
  },
  {
    nombre: 'Familia Espinoza',
    ciudad: 'Mexicali',
    unidad: 'Dos Yamaha VX Cruiser HO 2019',
    miedo: {
      es: 'Terminar pagando el mantenimiento de dos motos',
      en: 'Ending up paying maintenance on two skis',
    },
    cita: {
      es: 'Compramos las dos en marzo para tener el verano completo en San Felipe. Mi miedo era el mantenimiento: una cosa es comprarlas y otra es tenerlas funcionando en agosto. Nos entregaron la lista de lo que le cambiaron a cada una y el teléfono del mecánico. En julio se nos calentó una y al día siguiente ya estaba resuelto.',
      en: 'We bought both in March so we would have the whole San Felipe summer. My fear was maintenance: buying them is one thing, keeping them running in August is another. They handed us the list of what was replaced on each one and the mechanic’s phone number. In July one overheated and it was fixed the next day.',
    },
    fecha: { es: 'Compró en marzo', en: 'Bought in March' },
  },
  {
    nombre: 'Miguel Ángel Terán',
    ciudad: 'Ensenada',
    unidad: 'Yamaha FX Cruiser SVHO 2017',
    miedo: {
      es: 'Que el supercargador viniera sin servicio',
      en: 'That the supercharger had never been serviced',
    },
    cita: {
      es: 'Ya tenía una Spark y quería algo más serio. Yo sé qué preguntar: horas de motor, compresión y si al supercargador le hicieron servicio. Es la primera vez que alguien me contesta las tres cosas sin titubear y con papel en la mano. Le di la mía a cuenta y la diferencia me salió más barata que en Tijuana.',
      en: 'I already had a Spark and wanted something more serious. I know what to ask: engine hours, compression, and whether the supercharger was serviced. It is the first time someone answered all three without hesitating and with paperwork in hand. I traded mine in and the difference came out cheaper than in Tijuana.',
    },
    fecha: { es: 'Compró en mayo', en: 'Bought in May' },
  },
  {
    nombre: 'Karen Villaseñor',
    ciudad: 'Rosarito',
    unidad: 'Sea-Doo GTI SE 130 2018',
    miedo: {
      es: 'Comprarle a un particular y que desapareciera',
      en: 'Buying from a private seller who then vanishes',
    },
    cita: {
      es: 'Estuve a punto de comprarle a un señor de Facebook que solo contestaba de noche. Al final preferí pagar un poco más y saber dónde está el taller. A las tres semanas le salió una fuga chica en una manguera; la llevé un martes y me la entregaron el miércoles sin cobrarme.',
      en: 'I almost bought from a guy on Facebook who only replied at night. In the end I preferred to pay a little more and know where the shop is. Three weeks later a hose developed a small leak; I dropped it off on Tuesday and picked it up Wednesday at no charge.',
    },
    fecha: { es: 'Compró en junio', en: 'Bought in June' },
  },
]

/* PLACEHOLDER — datos del taller pendientes de confirmar con el negocio */
export const TALLER = {
  mecanico: {
    /* PLACEHOLDER — nombre real del mecánico */
    nombre: 'Víctor Morishita',
    anosDeOficio: 18,
    /* PLACEHOLDER — confirmar certificaciones reales */
    especialidad: {
      es: 'motores Rotax y Yamaha de 4 tiempos, con y sin supercargador',
      en: 'Rotax and Yamaha 4-stroke engines, supercharged and naturally aspirated',
    },
  },
  /* PLACEHOLDER — cifras reales del negocio */
  trayectoria: {
    anosEnEnsenada: 12,
    unidadesEntregadas: 140,
    unidadesEnTallerAlMes: 4,
  },
} as const

/* PLACEHOLDER — sustituir por fotografías reales del taller y del inventario.
   Ver /public/assets/inventario/LEEME.md para el estándar fotográfico. */
export const FOTOS_PLACEHOLDER = {
  hero: '/assets/hero-unidad-reconstruida.jpg',
  proceso: [
    '/assets/taller/01-llegada.jpg',
    '/assets/taller/02-desarme.jpg',
    '/assets/taller/03-reparacion.jpg',
    '/assets/taller/04-entrega.jpg',
  ],
  mecanico: '/assets/taller/mecanico.jpg',
  estero: '/assets/taller/estero-ensenada.jpg',
} as const
