/**
 * INVENTARIO — única fuente de verdad del catálogo.
 *
 * Para publicar una unidad nueva no hay que tocar ningún componente: se agrega
 * un objeto a este arreglo y aparece sola en la portada, en /inventario, en su
 * ficha, en el sitemap y en los datos estructurados de Google.
 *
 * ⚠️ PLACEHOLDER — las seis unidades de abajo son de ejemplo, con datos y
 * fotografías de relleno, para ver el sitio armado. Sustitúyelas por el
 * inventario real antes de publicar.
 */

export type Texto = { es: string; en: string }

export type Marca = 'Yamaha' | 'Sea-Doo' | 'Kawasaki'

export type EstadoUnidad = 'disponible' | 'apartada' | 'vendida'

export type Foto = {
  /** Ruta en /public. Al llegar la foto real, se sustituye el archivo con el mismo nombre. */
  src: string
  alt: Texto
  /** Toma del estándar fotográfico: tres cuartos, lateral, asiento, tablero, casco, serie. */
  toma: Texto
  /** true mientras sea imagen de relleno; false cuando sea la foto real de esta unidad. */
  placeholder: boolean
}

export type Unidad = {
  slug: string
  marca: Marca
  modelo: string
  anio: number
  /** Precio de lista en dólares. El ticket del negocio corre de 8,000 a 15,000 USD. */
  precioUSD: number
  /** Horas de motor. El comprador informado pregunta esto antes que nada. */
  horas: number
  plazas: number
  estado: EstadoUnidad
  destacada: boolean
  /** Une dos unidades gemelas que se venden juntas. Mismo valor en las dos. */
  par?: string
  motor: Texto
  potencia: string
  admision: Texto
  tanque: string
  peso: string
  remolque: Texto | null
  garantiaMeses: number
  resumen: Texto
  /** El diferenciador: qué se reemplazó, pieza por pieza. */
  reconstruccion: Texto[]
  papeles: {
    matricula: boolean
    factura: boolean
    verificacionSEMAR: boolean
    nota: Texto
  }
  fotos: Foto[]
  entrega: Texto
}

/** Tipo de cambio de referencia para el precio informativo en pesos. */
export const TIPO_DE_CAMBIO_MXN = 18.5

/** Ensenada, Baja California — el taller y el punto de entrega. */
export const NEGOCIO = {
  nombre: 'Baja Jetskis',
  telefono: '+52 646 256 3006',
  ciudad: 'Ensenada',
  estado: 'Baja California',
  pais: 'México',
  /** ⚠️ PLACEHOLDER — confirmar domicilio exacto del Estero antes de publicar. */
  direccion: 'Zona del Estero, Ensenada, Baja California',
  codigoPostal: '22890',
  lat: 31.8271,
  lng: -116.6116,
  horario: [
    { dias: { es: 'Lunes a viernes', en: 'Monday to Friday' }, horas: '9:00 – 18:00' },
    { dias: { es: 'Sábado', en: 'Saturday' }, horas: '9:00 – 15:00' },
    { dias: { es: 'Domingo', en: 'Sunday' }, horas: { es: 'Con cita', en: 'By appointment' } },
  ],
  instagram: 'https://www.instagram.com/bajajetskis',
  facebook: 'https://www.facebook.com/bajajetskis',
} as const

export const INVENTARIO: Unidad[] = [
  {
    slug: 'yamaha-vx-cruiser-ho-2019',
    marca: 'Yamaha',
    modelo: 'VX Cruiser HO',
    anio: 2019,
    precioUSD: 11800,
    horas: 78,
    plazas: 3,
    estado: 'disponible',
    destacada: true,
    par: 'gemelas-vx-cruiser',
    motor: { es: '1,812 cc, 4 tiempos, 4 cilindros', en: '1,812 cc, 4-stroke, 4-cylinder' },
    potencia: '180 hp',
    admision: { es: 'Aspiración natural (High Output)', en: 'Naturally aspirated (High Output)' },
    tanque: '70 L',
    peso: '377 kg',
    remolque: { es: 'Remolque sencillo incluido, con luces nuevas', en: 'Single trailer included, new lights' },
    garantiaMeses: 6,
    resumen: {
      es: 'La unidad de familia por excelencia: tres plazas, casco RiDE con reversa y un motor que no pide gasolina premium. Entró con 78 horas de motor y salió del taller con bomba de combustible y sistema de enfriamiento nuevos.',
      en: 'The family unit, plain and simple: three seats, RiDE hull with reverse, and an engine that does not ask for premium fuel. It came in with 78 engine hours and left the shop with a new fuel pump and cooling system.',
    },
    reconstruccion: [
      { es: 'Bomba de combustible y filtro reemplazados (originales Yamaha)', en: 'Fuel pump and filter replaced (Yamaha OEM)' },
      { es: 'Intercambiador de calor lavado y probado a presión', en: 'Heat exchanger flushed and pressure tested' },
      { es: 'Sellos de eje y cojinete de bomba de chorro nuevos', en: 'New driveshaft seals and jet pump bearing' },
      { es: 'Batería nueva con garantía de 12 meses', en: 'New battery with a 12-month warranty' },
      { es: 'Bujías, aceite y filtro de aceite de servicio', en: 'Spark plugs, oil and oil filter service' },
      { es: 'Tapicería de asiento reemplazada por marino gris original', en: 'Seat upholstery replaced with OEM grey marine vinyl' },
      { es: 'Compresión verificada en los 4 cilindros: 145–148 psi', en: 'Compression verified on all 4 cylinders: 145–148 psi' },
    ],
    papeles: {
      matricula: true,
      factura: true,
      verificacionSEMAR: true,
      nota: {
        es: 'Certificado de matrícula vigente ante SEMAR y factura de origen a nombre del negocio. El cambio de propietario se hace contigo presente, el día de la entrega.',
        en: 'Current SEMAR registration certificate and original invoice under the business name. The title transfer is done with you present, on delivery day.',
      },
    },
    fotos: [
      { src: '/assets/inventario/yamaha-vx-cruiser-ho-2019-tres-cuartos.jpg', alt: { es: 'Yamaha VX Cruiser HO 2019 en tres cuartos', en: 'Yamaha VX Cruiser HO 2019, three-quarter view' }, toma: { es: 'Tres cuartos', en: 'Three-quarter' }, placeholder: true },
      { src: '/assets/inventario/yamaha-vx-cruiser-ho-2019-lateral.jpg', alt: { es: 'Yamaha VX Cruiser HO 2019 de perfil', en: 'Yamaha VX Cruiser HO 2019, side view' }, toma: { es: 'Lateral', en: 'Side' }, placeholder: true },
      { src: '/assets/inventario/yamaha-vx-cruiser-ho-2019-tablero.jpg', alt: { es: 'Tablero e instrumentos', en: 'Dash and instruments' }, toma: { es: 'Tablero', en: 'Dash' }, placeholder: true },
      { src: '/assets/inventario/yamaha-vx-cruiser-ho-2019-asiento.jpg', alt: { es: 'Asiento de tres plazas', en: 'Three-seat saddle' }, toma: { es: 'Asiento', en: 'Seat' }, placeholder: true },
      { src: '/assets/inventario/yamaha-vx-cruiser-ho-2019-motor.jpg', alt: { es: 'Compartimento de motor después del servicio', en: 'Engine bay after service' }, toma: { es: 'Motor', en: 'Engine bay' }, placeholder: true },
    ],
    entrega: {
      es: 'Entrega en Ensenada con prueba en agua. Llevamos a Rosarito, Tijuana, Mexicali y San Felipe con costo de traslado.',
      en: 'Delivered in Ensenada with an on-water test. We ship to Rosarito, Tijuana, Mexicali and San Felipe for a transport fee.',
    },
  },
  {
    slug: 'yamaha-vx-cruiser-ho-2019-gemela',
    marca: 'Yamaha',
    modelo: 'VX Cruiser HO',
    anio: 2019,
    precioUSD: 11500,
    horas: 92,
    plazas: 3,
    estado: 'disponible',
    destacada: true,
    par: 'gemelas-vx-cruiser',
    motor: { es: '1,812 cc, 4 tiempos, 4 cilindros', en: '1,812 cc, 4-stroke, 4-cylinder' },
    potencia: '180 hp',
    admision: { es: 'Aspiración natural (High Output)', en: 'Naturally aspirated (High Output)' },
    tanque: '70 L',
    peso: '377 kg',
    remolque: { es: 'Se puede entregar con remolque doble junto con su gemela', en: 'Can be delivered on a double trailer together with its twin' },
    garantiaMeses: 6,
    resumen: {
      es: 'La gemela de la anterior: mismo año, mismo color, 92 horas. Las dos entraron del mismo dueño y salieron del mismo taller. Si buscas dos para la familia, este par ya está emparejado y sale mejor precio llevándotelas juntas.',
      en: 'Twin to the one above: same year, same color, 92 hours. Both came from the same owner and left the same shop. If you need two, this pair is already matched and the price improves if you take them together.',
    },
    reconstruccion: [
      { es: 'Bomba de combustible y filtro reemplazados (originales Yamaha)', en: 'Fuel pump and filter replaced (Yamaha OEM)' },
      { es: 'Estator y magneto revisados en banco', en: 'Stator and magneto bench tested' },
      { es: 'Rejilla de admisión y rodete rectificados', en: 'Intake grate and impeller reconditioned' },
      { es: 'Batería nueva con garantía de 12 meses', en: 'New battery with a 12-month warranty' },
      { es: 'Bujías, aceite y filtro de aceite de servicio', en: 'Spark plugs, oil and oil filter service' },
      { es: 'Compresión verificada en los 4 cilindros: 143–147 psi', en: 'Compression verified on all 4 cylinders: 143–147 psi' },
    ],
    papeles: {
      matricula: true,
      factura: true,
      verificacionSEMAR: true,
      nota: {
        es: 'Certificado de matrícula vigente ante SEMAR y factura de origen a nombre del negocio.',
        en: 'Current SEMAR registration certificate and original invoice under the business name.',
      },
    },
    fotos: [
      { src: '/assets/inventario/yamaha-vx-cruiser-ho-2019-gemela-tres-cuartos.jpg', alt: { es: 'Yamaha VX Cruiser HO 2019 gemela en tres cuartos', en: 'Twin Yamaha VX Cruiser HO 2019, three-quarter view' }, toma: { es: 'Tres cuartos', en: 'Three-quarter' }, placeholder: true },
      { src: '/assets/inventario/yamaha-vx-cruiser-ho-2019-gemela-lateral.jpg', alt: { es: 'Perfil de la unidad gemela', en: 'Side view of the twin unit' }, toma: { es: 'Lateral', en: 'Side' }, placeholder: true },
      { src: '/assets/inventario/yamaha-vx-cruiser-ho-2019-gemela-par.jpg', alt: { es: 'Las dos unidades gemelas en el remolque doble', en: 'Both twin units on the double trailer' }, toma: { es: 'El par', en: 'The pair' }, placeholder: true },
      { src: '/assets/inventario/yamaha-vx-cruiser-ho-2019-gemela-tablero.jpg', alt: { es: 'Tablero e instrumentos', en: 'Dash and instruments' }, toma: { es: 'Tablero', en: 'Dash' }, placeholder: true },
      { src: '/assets/inventario/yamaha-vx-cruiser-ho-2019-gemela-serie.jpg', alt: { es: 'Número de serie del casco', en: 'Hull serial number' }, toma: { es: 'Número de serie', en: 'Serial number' }, placeholder: true },
    ],
    entrega: {
      es: 'Entrega en Ensenada con prueba en agua. El par se puede entregar montado en remolque doble.',
      en: 'Delivered in Ensenada with an on-water test. The pair can be delivered on a double trailer.',
    },
  },
  {
    slug: 'sea-doo-gti-se-130-2018',
    marca: 'Sea-Doo',
    modelo: 'GTI SE 130',
    anio: 2018,
    precioUSD: 9400,
    horas: 112,
    plazas: 3,
    estado: 'disponible',
    destacada: true,
    motor: { es: 'Rotax 1503 cc, 4 tiempos, 3 cilindros', en: 'Rotax 1,503 cc, 4-stroke, 3-cylinder' },
    potencia: '130 hp',
    admision: { es: 'Aspiración natural', en: 'Naturally aspirated' },
    tanque: '60 L',
    peso: '354 kg',
    remolque: null,
    garantiaMeses: 6,
    resumen: {
      es: 'La entrada más honesta al catálogo. Casco GTI con sistema iBR de frenado, tres plazas y consumo bajo. Ideal para quien lleva tres veranos rentando y quiere dejar de hacerlo sin gastar catorce mil dólares.',
      en: 'The most honest entry point in the catalog. GTI hull with iBR braking, three seats and low fuel use. Ideal for someone who has been renting for three summers and wants to stop without spending fourteen thousand dollars.',
    },
    reconstruccion: [
      { es: 'Rodete nuevo y desgaste de anillo de bomba corregido', en: 'New impeller and wear ring clearance corrected' },
      { es: 'Módulo iBR revisado y calibrado', en: 'iBR module inspected and recalibrated' },
      { es: 'Mangueras de refrigeración y abrazaderas reemplazadas', en: 'Cooling hoses and clamps replaced' },
      { es: 'Batería nueva con garantía de 12 meses', en: 'New battery with a 12-month warranty' },
      { es: 'Aceite, filtro y bujías de servicio', en: 'Oil, filter and spark plug service' },
      { es: 'Casco pulido y calcomanías reemplazadas', en: 'Hull polished and decals replaced' },
      { es: 'Compresión verificada en los 3 cilindros: 138–141 psi', en: 'Compression verified on all 3 cylinders: 138–141 psi' },
    ],
    papeles: {
      matricula: true,
      factura: true,
      verificacionSEMAR: true,
      nota: {
        es: 'Matrícula vigente ante SEMAR. Unidad de origen nacional, sin pendientes de importación.',
        en: 'Current SEMAR registration. Domestic unit, no import paperwork pending.',
      },
    },
    fotos: [
      { src: '/assets/inventario/sea-doo-gti-se-130-2018-tres-cuartos.jpg', alt: { es: 'Sea-Doo GTI SE 130 2018 en tres cuartos', en: 'Sea-Doo GTI SE 130 2018, three-quarter view' }, toma: { es: 'Tres cuartos', en: 'Three-quarter' }, placeholder: true },
      { src: '/assets/inventario/sea-doo-gti-se-130-2018-lateral.jpg', alt: { es: 'Sea-Doo GTI SE 130 2018 de perfil', en: 'Sea-Doo GTI SE 130 2018, side view' }, toma: { es: 'Lateral', en: 'Side' }, placeholder: true },
      { src: '/assets/inventario/sea-doo-gti-se-130-2018-tablero.jpg', alt: { es: 'Tablero con horómetro', en: 'Dash with hour meter' }, toma: { es: 'Tablero', en: 'Dash' }, placeholder: true },
      { src: '/assets/inventario/sea-doo-gti-se-130-2018-asiento.jpg', alt: { es: 'Asiento y plataforma de abordaje', en: 'Seat and boarding platform' }, toma: { es: 'Asiento', en: 'Seat' }, placeholder: true },
      { src: '/assets/inventario/sea-doo-gti-se-130-2018-bomba.jpg', alt: { es: 'Bomba de chorro y rodete nuevo', en: 'Jet pump and new impeller' }, toma: { es: 'Bomba', en: 'Jet pump' }, placeholder: true },
    ],
    entrega: {
      es: 'Entrega en Ensenada con prueba en agua. Se cotiza traslado a Mexicali y San Felipe.',
      en: 'Delivered in Ensenada with an on-water test. Transport to Mexicali and San Felipe quoted separately.',
    },
  },
  {
    slug: 'yamaha-fx-cruiser-svho-2017',
    marca: 'Yamaha',
    modelo: 'FX Cruiser SVHO',
    anio: 2017,
    precioUSD: 14500,
    horas: 143,
    plazas: 3,
    estado: 'disponible',
    destacada: true,
    motor: { es: '1,812 cc, 4 tiempos, supercargado', en: '1,812 cc, 4-stroke, supercharged' },
    potencia: '250 hp',
    admision: { es: 'Supercargador con intercooler', en: 'Supercharger with intercooler' },
    tanque: '70 L',
    peso: '384 kg',
    remolque: { es: 'Remolque sencillo galvanizado incluido', en: 'Galvanized single trailer included' },
    garantiaMeses: 6,
    resumen: {
      es: 'Para el que ya tuvo una y ahora quiere la buena. Casco NanoXcel2, supercargado, con el servicio del supercargador hecho y documentado — que es exactamente la pregunta que hace quien sabe.',
      en: 'For the buyer who already owned one and now wants the real thing. NanoXcel2 hull, supercharged, with the supercharger service done and documented — which is exactly what an informed buyer asks about.',
    },
    reconstruccion: [
      { es: 'Servicio completo de supercargador: rodamientos, arandelas y sello nuevos', en: 'Full supercharger service: new bearings, washers and seal' },
      { es: 'Intercooler desmontado, lavado y probado a presión', en: 'Intercooler removed, flushed and pressure tested' },
      { es: 'Sistema de escape y campana de escape sin fuga de agua', en: 'Exhaust system and exhaust bellows verified leak-free' },
      { es: 'Acoplamiento de eje (coupler) nuevo', en: 'New driveshaft coupler' },
      { es: 'Batería nueva con garantía de 12 meses', en: 'New battery with a 12-month warranty' },
      { es: 'Aceite sintético, filtro y bujías iridio de servicio', en: 'Synthetic oil, filter and iridium plug service' },
      { es: 'Compresión verificada en los 4 cilindros: 150–152 psi', en: 'Compression verified on all 4 cylinders: 150–152 psi' },
    ],
    papeles: {
      matricula: true,
      factura: true,
      verificacionSEMAR: true,
      nota: {
        es: 'Unidad importada con pedimento, abanderamiento y matrícula al corriente. Toda la carpeta se revisa contigo antes de firmar.',
        en: 'Imported unit with customs entry, flagging and current registration. The full folder is reviewed with you before signing.',
      },
    },
    fotos: [
      { src: '/assets/inventario/yamaha-fx-cruiser-svho-2017-tres-cuartos.jpg', alt: { es: 'Yamaha FX Cruiser SVHO 2017 en tres cuartos', en: 'Yamaha FX Cruiser SVHO 2017, three-quarter view' }, toma: { es: 'Tres cuartos', en: 'Three-quarter' }, placeholder: true },
      { src: '/assets/inventario/yamaha-fx-cruiser-svho-2017-lateral.jpg', alt: { es: 'Yamaha FX Cruiser SVHO 2017 de perfil', en: 'Yamaha FX Cruiser SVHO 2017, side view' }, toma: { es: 'Lateral', en: 'Side' }, placeholder: true },
      { src: '/assets/inventario/yamaha-fx-cruiser-svho-2017-supercargador.jpg', alt: { es: 'Supercargador después del servicio', en: 'Supercharger after service' }, toma: { es: 'Supercargador', en: 'Supercharger' }, placeholder: true },
      { src: '/assets/inventario/yamaha-fx-cruiser-svho-2017-tablero.jpg', alt: { es: 'Tablero Connext', en: 'Connext dash' }, toma: { es: 'Tablero', en: 'Dash' }, placeholder: true },
      { src: '/assets/inventario/yamaha-fx-cruiser-svho-2017-serie.jpg', alt: { es: 'Número de serie del casco', en: 'Hull serial number' }, toma: { es: 'Número de serie', en: 'Serial number' }, placeholder: true },
    ],
    entrega: {
      es: 'Entrega en Ensenada con prueba en agua y capacitación de manejo si es tu primera unidad supercargada.',
      en: 'Delivered in Ensenada with an on-water test and a handling briefing if this is your first supercharged ski.',
    },
  },
  {
    slug: 'kawasaki-ultra-310lx-2016',
    marca: 'Kawasaki',
    modelo: 'Ultra 310LX',
    anio: 2016,
    precioUSD: 13200,
    horas: 165,
    plazas: 3,
    estado: 'apartada',
    destacada: false,
    motor: { es: '1,498 cc, 4 tiempos, supercargado', en: '1,498 cc, 4-stroke, supercharged' },
    potencia: '310 hp',
    admision: { es: 'Supercargador con intercooler', en: 'Supercharger with intercooler' },
    tanque: '78 L',
    peso: '470 kg',
    remolque: null,
    garantiaMeses: 6,
    resumen: {
      es: 'El casco más grande del catálogo y el que mejor aguanta el picado de la tarde en la bahía. Apartada con anticipo, pero si te interesa una igual, avísanos: entran dos o tres al año.',
      en: 'The largest hull in the catalog and the one that handles afternoon chop best. Currently on deposit — if you want one like it, tell us: two or three come through each year.',
    },
    reconstruccion: [
      { es: 'Servicio de supercargador con refacciones originales', en: 'Supercharger service with OEM parts' },
      { es: 'Asiento con suspensión revisado y tapizado', en: 'Suspension seat serviced and reupholstered' },
      { es: 'Sistema de audio Jetsound probado', en: 'Jetsound audio system tested' },
      { es: 'Batería nueva con garantía de 12 meses', en: 'New battery with a 12-month warranty' },
      { es: 'Compresión verificada en los 4 cilindros: 141–145 psi', en: 'Compression verified on all 4 cylinders: 141–145 psi' },
    ],
    papeles: {
      matricula: true,
      factura: true,
      verificacionSEMAR: true,
      nota: {
        es: 'Matrícula vigente ante SEMAR y carpeta de importación completa.',
        en: 'Current SEMAR registration and a complete import folder.',
      },
    },
    fotos: [
      { src: '/assets/inventario/kawasaki-ultra-310lx-2016-tres-cuartos.jpg', alt: { es: 'Kawasaki Ultra 310LX 2016 en tres cuartos', en: 'Kawasaki Ultra 310LX 2016, three-quarter view' }, toma: { es: 'Tres cuartos', en: 'Three-quarter' }, placeholder: true },
      { src: '/assets/inventario/kawasaki-ultra-310lx-2016-lateral.jpg', alt: { es: 'Kawasaki Ultra 310LX 2016 de perfil', en: 'Kawasaki Ultra 310LX 2016, side view' }, toma: { es: 'Lateral', en: 'Side' }, placeholder: true },
      { src: '/assets/inventario/kawasaki-ultra-310lx-2016-asiento.jpg', alt: { es: 'Asiento con suspensión', en: 'Suspension seat' }, toma: { es: 'Asiento', en: 'Seat' }, placeholder: true },
      { src: '/assets/inventario/kawasaki-ultra-310lx-2016-tablero.jpg', alt: { es: 'Tablero e instrumentos', en: 'Dash and instruments' }, toma: { es: 'Tablero', en: 'Dash' }, placeholder: true },
    ],
    entrega: {
      es: 'Entrega en Ensenada con prueba en agua.',
      en: 'Delivered in Ensenada with an on-water test.',
    },
  },
  {
    slug: 'sea-doo-spark-trixx-3up-2020',
    marca: 'Sea-Doo',
    modelo: 'Spark Trixx 3up',
    anio: 2020,
    precioUSD: 8200,
    horas: 64,
    plazas: 3,
    estado: 'vendida',
    destacada: false,
    motor: { es: 'Rotax 900 cc ACE, 4 tiempos, 3 cilindros', en: 'Rotax 900 cc ACE, 4-stroke, 3-cylinder' },
    potencia: '90 hp',
    admision: { es: 'Aspiración natural', en: 'Naturally aspirated' },
    tanque: '30 L',
    peso: '212 kg',
    remolque: null,
    garantiaMeses: 6,
    resumen: {
      es: 'Vendida en marzo a una familia de Mexicali. La dejamos publicada para que veas qué se entregó y a qué precio: aquí no se borra el historial.',
      en: 'Sold in March to a family from Mexicali. We leave it published so you can see what was delivered and at what price: we do not erase the record here.',
    },
    reconstruccion: [
      { es: 'Sistema VTS revisado y calibrado', en: 'VTS system inspected and calibrated' },
      { es: 'Casco Polytec reparado en dos puntos de impacto', en: 'Polytec hull repaired at two impact points' },
      { es: 'Batería nueva con garantía de 12 meses', en: 'New battery with a 12-month warranty' },
      { es: 'Compresión verificada en los 3 cilindros: 132–135 psi', en: 'Compression verified on all 3 cylinders: 132–135 psi' },
    ],
    papeles: {
      matricula: true,
      factura: true,
      verificacionSEMAR: true,
      nota: {
        es: 'Se entregó con matrícula vigente y cambio de propietario firmado el mismo día.',
        en: 'Delivered with current registration and the title transfer signed the same day.',
      },
    },
    fotos: [
      { src: '/assets/inventario/sea-doo-spark-trixx-3up-2020-tres-cuartos.jpg', alt: { es: 'Sea-Doo Spark Trixx 3up 2020 en tres cuartos', en: 'Sea-Doo Spark Trixx 3up 2020, three-quarter view' }, toma: { es: 'Tres cuartos', en: 'Three-quarter' }, placeholder: true },
      { src: '/assets/inventario/sea-doo-spark-trixx-3up-2020-lateral.jpg', alt: { es: 'Sea-Doo Spark Trixx 3up 2020 de perfil', en: 'Sea-Doo Spark Trixx 3up 2020, side view' }, toma: { es: 'Lateral', en: 'Side' }, placeholder: true },
      { src: '/assets/inventario/sea-doo-spark-trixx-3up-2020-entrega.jpg', alt: { es: 'Entrega de la unidad al cliente', en: 'Handover to the customer' }, toma: { es: 'Entrega', en: 'Handover' }, placeholder: true },
    ],
    entrega: {
      es: 'Entregada en Ensenada, trasladada a San Felipe.',
      en: 'Delivered in Ensenada, transported to San Felipe.',
    },
  },
]

/* ---------------------------------------------------------------------------
   Consultas sobre el inventario. Los componentes no filtran a mano.
   --------------------------------------------------------------------------- */

export function unidadesALaVenta(): Unidad[] {
  return INVENTARIO.filter((u) => u.estado !== 'vendida')
}

export function unidadesDestacadas(limite = 4): Unidad[] {
  return unidadesALaVenta()
    .filter((u) => u.destacada)
    .slice(0, limite)
}

export function buscarUnidad(slug: string): Unidad | undefined {
  return INVENTARIO.find((u) => u.slug === slug)
}

export function unidadGemela(unidad: Unidad): Unidad | undefined {
  if (!unidad.par) return undefined
  return INVENTARIO.find((u) => u.par === unidad.par && u.slug !== unidad.slug)
}

export function marcasDisponibles(): Marca[] {
  return Array.from(new Set(unidadesALaVenta().map((u) => u.marca))).sort()
}

export function rangoDePrecios(): { min: number; max: number } {
  const precios = unidadesALaVenta().map((u) => u.precioUSD)
  return { min: Math.min(...precios), max: Math.max(...precios) }
}
