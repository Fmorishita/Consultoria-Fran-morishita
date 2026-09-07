/**
 * COPY EN ESPAÑOL DE MÉXICO — fuente de verdad del texto del sitio.
 *
 * Tono: directo, de alguien que sabe de motores. Sin lenguaje de agencia.
 * Los encabezados venden solos; los párrafos sostienen. Se habla de dinero
 * sin pena y se contesta la objeción antes de que el visitante la piense.
 */

export const es = {
  meta: {
    lang: 'es',
    siteName: 'Baja Jetskis',
    tagline: 'Motos acuáticas reconstruidas, con papeles en regla · Ensenada, B.C.',
    home: {
      title: 'Baja Jetskis | Venta de motos acuáticas seminuevas en Ensenada',
      description:
        'Motos acuáticas reconstruidas en taller, con matrícula vigente, garantía y respaldo local en Ensenada. Entregamos en Tijuana, Mexicali, Rosarito y San Felipe.',
    },
    inventario: {
      title: 'Inventario disponible | Baja Jetskis Ensenada',
      description:
        'Jetskis seminuevos en Baja California: Yamaha, Sea-Doo y Kawasaki reconstruidos, con horas de motor declaradas, papeles en regla y garantía.',
    },
    taller: {
      title: 'El taller | Cómo reconstruimos cada unidad · Baja Jetskis',
      description:
        'Quien te vende la moto acuática es quien la arregla. Así reconstruimos cada unidad antes de venderla en Ensenada, Baja California.',
    },
    contacto: {
      title: 'Contacto | Baja Jetskis Ensenada',
      description:
        'Estamos en Ensenada, Baja California. Escríbenos por WhatsApp al 646 256 3006 y te contestamos en menos de 15 minutos en horario hábil.',
    },
  },

  nav: {
    inicio: 'Inicio',
    inventario: 'Inventario',
    taller: 'El taller',
    contacto: 'Contacto',
    cta: 'WhatsApp',
    menu: 'Abrir menú',
    cerrar: 'Cerrar menú',
    idioma: 'English',
    saltarAlContenido: 'Saltar al contenido',
  },

  hero: {
    eyebrow: 'Ensenada, Baja California',
    titulo: 'La única forma de comprar una moto acuática en Baja sin miedo.',
    parrafo:
      'Compramos unidades usadas o descompuestas, un mecánico especializado las reconstruye completas y las vendemos con matrícula vigente, garantía por escrito y su teléfono en la carpeta. Ninguna de estas motos salió de un Marketplace.',
    ctaPrimario: 'Ver inventario disponible',
    ctaWhatsapp: 'Preguntar por WhatsApp',
    microcopy: 'Contestamos en menos de 15 minutos en horario hábil.',
    imagenAlt: 'Moto acuática reconstruida en el taller de Baja Jetskis, Ensenada',
    sello: 'Reconstruida, no revendida',
  },

  confianza: {
    items: [
      { titulo: 'Papeles en regla', detalle: 'Matrícula SEMAR vigente' },
      { titulo: 'Garantía por escrito', detalle: '6 meses de respaldo mecánico' },
      { titulo: 'Mecánico especializado', detalle: 'Quien te la vende, la arregla' },
      { titulo: 'Entrega en Baja', detalle: 'Ensenada, Tijuana, Mexicali, San Felipe' },
    ],
  },

  destacadas: {
    eyebrow: 'Inventario',
    titulo: 'Lo que hay hoy en el piso',
    parrafo:
      'Cada unidad se publica con su año, sus horas de motor reales y la lista de lo que se le reemplazó. Si algo no está aquí, es porque todavía está en taller.',
    verTodo: 'Ver todo el inventario',
    vacio: 'Ahorita no hay unidades publicadas. Escríbenos y te avisamos en cuanto entre algo.',
    vacioCta: 'Avísenme cuándo entre algo',
  },

  proceso: {
    eyebrow: 'Cómo trabajamos',
    titulo: 'Cuatro pasos entre una moto descompuesta y la que te llevas',
    parrafo:
      'Este es el trabajo que no ves en un anuncio de Marketplace, y es exactamente por lo que aquí cuesta un poco más.',
    pasos: [
      {
        numero: '01',
        titulo: 'La compramos descompuesta',
        texto:
          'Buscamos unidades con buen casco y mal historial de mantenimiento. Se paga por el casco, no por la promesa: si el número de serie o los papeles no cuadran, no entra al taller.',
      },
      {
        numero: '02',
        titulo: 'Desarme y diagnóstico',
        texto:
          'Compresión cilindro por cilindro, prueba de presión al sistema de enfriamiento, revisión de eje, bomba de chorro y arnés eléctrico. De aquí sale la lista de todo lo que hay que cambiar.',
      },
      {
        numero: '03',
        titulo: 'Reconstrucción con refacción buena',
        texto:
          'Refacción original donde importa: bomba de combustible, sellos, rodamientos de supercargador, rodete. Después va al agua a prueba real, no a la manguera del taller.',
      },
      {
        numero: '04',
        titulo: 'Papeles y entrega',
        texto:
          'Matrícula ante SEMAR, factura y cambio de propietario firmado contigo presente. Te la entregamos en el agua y te enseñamos a cargarla, bajarla y lavarla.',
      },
    ],
  },

  comparativa: {
    eyebrow: 'La comparación honesta',
    titulo: 'En Baja tienes cuatro formas de subirte a una moto acuática',
    parrafo:
      'Tres de ellas ya las conoces. Esta tabla no está armada para que quedemos bien: está armada para que veas dónde se va tu dinero en cada camino.',
    columnas: ['Seguir rentando', 'Facebook Marketplace', 'Distribuidor en Tijuana', 'Baja Jetskis'],
    filas: [
      {
        criterio: 'Lo que pagas de entrada',
        valores: [
          '$1,800 – $2,500 MXN la hora',
          'Lo más barato del mercado',
          'Unidad nueva desde $18,000 USD',
          '$8,000 – $15,000 USD, reconstruida',
        ],
      },
      {
        criterio: 'Papeles',
        valores: [
          'No son tuyos',
          'Casi nunca completos',
          'Completos',
          'Matrícula SEMAR vigente y factura',
        ],
      },
      {
        criterio: 'Quién responde si falla',
        valores: [
          'Nadie: ya la entregaste',
          'El vendedor deja de contestar',
          'Taller a dos horas y media de aquí',
          'El mismo mecánico que la armó',
        ],
      },
      {
        criterio: 'Historial de la unidad',
        valores: [
          'No aplica',
          '"Está en buen estado", y ya',
          'Cero horas',
          'Horas, compresión y lista de refacciones por escrito',
        ],
      },
      {
        criterio: 'Qué tienes a tres años',
        valores: [
          'Nada. Y arriba de $90,000 MXN gastados en tres veranos de fin de semana',
          'Una moto de dudosa procedencia y un mecánico que le buscas tú',
          'Una moto nueva y una deuda',
          'Una moto con historial, papeles y taller conocido',
        ],
      },
    ],
    cierre: {
      titulo: 'La cuenta que casi nadie hace',
      texto:
        'Ocho fines de semana al año, tres horas cada uno, a $2,000 pesos la hora. Son $48,000 pesos por verano. Tres veranos y ya pagaste una moto acuática completa — solo que no tienes ninguna.',
      cta: 'Ya hice la cuenta, muéstrenme qué hay',
    },
  },

  testimonios: {
    eyebrow: 'Quién ya compró',
    titulo: 'Lo que traían atorado antes de decidirse',
    parrafo:
      'Ninguno llegó buscando diversión: eso lo daban por hecho. Todos llegaron con el mismo miedo de que les vendieran basura.',
    avisoPlaceholder:
      'Testimonios de ejemplo mientras se levantan los reales. No son clientes verdaderos.',
    etiquetaMiedo: 'Lo que le preocupaba',
  },

  permuta: {
    eyebrow: 'Recibimos la tuya a cuenta',
    titulo: 'Trae la que tienes y paga la diferencia',
    parrafo:
      'Si ya tienes una moto acuática —aunque esté descompuesta, aunque le falten papeles— la valuamos y te la recibimos a cuenta de la que te vas a llevar. Nosotros la reconstruimos; ese es el negocio.',
    puntos: [
      'Valuamos con fotos por WhatsApp el mismo día',
      'Recibimos unidades que no encienden',
      'Si le faltan papeles, nosotros hacemos el trámite',
      'El avalúo se descuenta directo del precio de la tuya',
    ],
    cta: 'Quiero que valúen la mía',
  },

  faq: {
    eyebrow: 'Preguntas frecuentes',
    titulo: 'Lo que todos preguntan antes de soltar el dinero',
    preguntas: [
      {
        p: '¿Y si sale mala?',
        r: 'Tienes seis meses de garantía por escrito sobre motor y transmisión de chorro, y el taller está en Ensenada. Si algo falla, la traes y se revisa; si es de garantía, no pagas mano de obra ni refacción. Lo que la garantía no cubre —un impacto, arena en la bomba, falta de mantenimiento— también te lo decimos de frente antes de que firmes.',
      },
      {
        p: '¿Por qué cuesta más que en Marketplace?',
        r: 'Porque en Marketplace estás comprando una promesa y aquí estás comprando trabajo hecho. La diferencia de precio suele andar entre $1,500 y $3,000 dólares, que es más o menos lo que cuesta un servicio de supercargador más una bomba de combustible más los trámites de matrícula. Si la unidad de Marketplace necesita cualquiera de esas tres cosas, ya te salió más cara.',
      },
      {
        p: '¿Los papeles sirven para navegar en San Felipe o cruzando a Estados Unidos?',
        r: 'La matrícula ante SEMAR es federal: sirve en todo México, en el Pacífico y en el Mar de Cortés. Para cruzar a Estados Unidos con la unidad en remolque necesitas además el trámite aduanal correspondiente; te explicamos exactamente qué se necesita, aunque ese trámite lo haces tú.',
      },
      {
        p: '¿Cuántas horas de motor son muchas?',
        r: 'En un cuatro tiempos con mantenimiento al corriente, arriba de 300 horas empiezan a pesar. Abajo de 150 es una unidad joven. Pero las horas solas no dicen nada: importa más cómo se guardó y si se lavó con agua dulce. Por eso publicamos también la compresión de cada cilindro.',
      },
      {
        p: '¿Puedo llevar a mi mecánico a revisarla?',
        r: 'Sí, y nos parece bien. Trae a quien quieras, el día que quieras, antes de pagar. Lo único que pedimos es que sea con cita para tenerla lista y seca.',
      },
      {
        p: '¿Se puede apartar o pagar en partes?',
        r: 'Se aparta con un anticipo y la unidad se saca de publicación a tu nombre. No damos financiamiento propio, pero varios clientes han cerrado con crédito de su banco o pagando en dos exhibiciones. Dinos cómo te acomoda y lo vemos.',
      },
      {
        p: '¿Entregan fuera de Ensenada?',
        r: 'Sí. Llevamos a Rosarito, Tijuana, Mexicali y San Felipe con costo de traslado según la distancia. La entrega siempre incluye prueba en agua, aquí o allá.',
      },
      {
        p: '¿Incluye remolque?',
        r: 'Depende de la unidad y viene indicado en cada ficha. Cuando no lo incluye, te conseguimos uno usado en buen estado o te decimos dónde comprarlo sin que te vean la cara.',
      },
    ],
  },

  ctaFinal: {
    eyebrow: 'Siguiente paso',
    titulo: 'Dinos qué buscas y te decimos qué tenemos',
    parrafo:
      'Sin formularios largos ni llamadas de vendedor. Escribes por WhatsApp, te contestamos con fotos, horas de motor y precio. Si no tenemos lo que buscas, te lo decimos igual.',
    cta: 'Escribir por WhatsApp',
    secundario: 'Ver inventario',
    horario: 'Lunes a viernes 9:00 – 18:00 · Sábado 9:00 – 15:00',
  },

  inventario: {
    eyebrow: 'Inventario',
    titulo: 'Unidades disponibles',
    parrafo:
      'Todo lo que está aquí ya salió del taller y tiene papeles listos. Lo que está apartado se queda publicado hasta que se entrega, y lo vendido también: aquí no se borra el historial.',
    filtros: {
      titulo: 'Filtrar',
      marca: 'Marca',
      anio: 'Año',
      precio: 'Precio',
      todas: 'Todas',
      todos: 'Todos',
      limpiar: 'Limpiar filtros',
      resultados: (n: number) =>
        n === 1 ? '1 unidad encontrada' : `${n} unidades encontradas`,
      vacio: 'Ninguna unidad cumple con ese filtro.',
      vacioAyuda:
        'Quita algún filtro o escríbenos: seguido tenemos unidades en taller que todavía no publicamos.',
      vacioCta: 'Preguntar por una unidad específica',
      rangos: [
        { id: 'todos', etiqueta: 'Todos' },
        { id: 'bajo', etiqueta: 'Menos de $10,000 USD' },
        { id: 'medio', etiqueta: '$10,000 – $13,000 USD' },
        { id: 'alto', etiqueta: 'Más de $13,000 USD' },
      ],
    },
  },

  unidad: {
    volver: 'Volver al inventario',
    horas: 'Horas de motor',
    anio: 'Año',
    plazas: 'Plazas',
    motor: 'Motor',
    potencia: 'Potencia',
    admision: 'Admisión',
    tanque: 'Tanque',
    peso: 'Peso en seco',
    remolque: 'Remolque',
    sinRemolque: 'No incluye remolque',
    garantia: 'Garantía',
    meses: (n: number) => `${n} meses por escrito`,
    especificaciones: 'Ficha técnica',
    reconstruccionTitulo: 'Qué se le reemplazó',
    reconstruccionTexto:
      'Esta lista sale de la orden de taller de esta unidad, no de una plantilla. La misma hoja va dentro de la carpeta que te llevas.',
    papelesTitulo: 'Estado de los papeles',
    papelesMatricula: 'Matrícula SEMAR vigente',
    papelesFactura: 'Factura de origen',
    papelesVerificacion: 'Cambio de propietario incluido',
    entregaTitulo: 'Entrega',
    cta: 'Preguntar por esta unidad',
    /** Versión corta para la barra fija de móvil, donde no cabe la larga. */
    ctaSticky: 'Preguntar por WhatsApp',
    ctaPago: 'Ver opciones de pago',
    ctaPar: 'Cotizar el par',
    parTitulo: 'Esta unidad tiene gemela',
    parTexto:
      'Entraron juntas y salieron del mismo taller. Llevándose las dos, el precio del par mejora.',
    verGemela: 'Ver la gemela',
    fotosPlaceholder:
      'Fotografía de referencia. Las tomas reales de esta unidad se publican en cuanto salgan de sesión.',
    galeriaAnterior: 'Foto anterior',
    galeriaSiguiente: 'Foto siguiente',
    otrasUnidades: 'Otras unidades disponibles',
    precioNota: 'Precio en dólares. Se puede pagar en pesos al tipo de cambio del día.',
    aproxMXN: (mxn: string) => `≈ ${mxn} MXN`,
  },

  estados: {
    disponible: 'Disponible',
    apartada: 'Apartada',
    vendida: 'Vendida',
    apartadaNota: 'Tiene anticipo. Si te interesa una igual, avísanos.',
    vendidaNota: 'Ya se entregó. La dejamos publicada como historial.',
  },

  taller: {
    eyebrow: 'El taller',
    titulo: 'Quien te la vende es quien la arregla',
    intro:
      'Esta página existe por una razón: vas a gastar entre ocho y quince mil dólares con gente que apenas conoces. Lo mínimo es que sepas quién le va a meter mano a tu moto.',
    mecanicoTitulo: 'El que la reconstruye',
    mecanicoTexto:
      'Lleva {anos} años reparando motores marinos en Ensenada. Empezó arreglando lo que se descomponía en la renta —que es la escuela más dura que hay, porque una unidad de renta trabaja en un fin de semana lo que una particular en un año— y de ahí se especializó en {especialidad}.',
    mecanicoCita:
      '"Yo no vendo motos. Yo entrego motos que ya arreglé. Es distinto: si te la vendo mal, me la traes a mí."',
    numeros: [
      { valor: '{anosEnEnsenada} años', etiqueta: 'reparando motores marinos en Ensenada' },
      { valor: '{unidadesEntregadas}+', etiqueta: 'unidades entregadas' },
      { valor: '{unidadesEnTallerAlMes}', etiqueta: 'unidades reconstruidas al mes, máximo' },
    ],
    capacidadTitulo: 'Por qué solo hay pocas unidades a la vez',
    capacidadTexto:
      'Porque una moto acuática bien reconstruida toma semanas, no días. Preferimos tener cuatro unidades bien hechas que veinte publicadas y ninguna probada. Si no ves lo que buscas, casi siempre es cuestión de esperar la que va saliendo.',
    garantiaTitulo: 'Qué cubre la garantía, y qué no',
    garantiaCubre: [
      'Motor y sistema de enfriamiento',
      'Bomba de chorro, eje y acoplamiento',
      'Sistema eléctrico y de carga',
      'Refacciones que instalamos nosotros',
    ],
    garantiaNoCubre: [
      'Golpes, varadas y arena en la bomba',
      'Falta de lavado con agua dulce',
      'Modificaciones hechas después de la entrega',
      'Consumibles: bujías, aceite, ánodos',
    ],
    cta: 'Preguntar por el taller y la garantía',
  },

  contacto: {
    eyebrow: 'Contacto',
    titulo: 'Estamos en Ensenada, y aquí seguimos después de la venta',
    parrafo:
      'La forma más rápida de resolverlo es WhatsApp: contestamos en menos de 15 minutos en horario hábil, con fotos y precios. Si prefieres venir, agenda y tenemos la unidad seca y lista.',
    whatsappTitulo: 'WhatsApp',
    whatsappTexto: 'La vía directa. Mándanos qué buscas y de qué ciudad escribes.',
    ubicacionTitulo: 'Dónde estamos',
    horarioTitulo: 'Horario',
    coberturaTitulo: 'A dónde entregamos',
    coberturaTexto:
      'Ensenada sin costo. Rosarito, Tijuana, Mexicali y San Felipe con costo de traslado según distancia. La entrega siempre incluye prueba en agua.',
    mapaTitulo: 'Ver ubicación en el mapa',
    mapaAlt: 'Mapa de la ubicación de Baja Jetskis en Ensenada, Baja California',
    cta: 'Abrir WhatsApp',
  },

  footer: {
    descripcion:
      'Venta de motos acuáticas reconstruidas en Ensenada, Baja California. Papeles en regla, garantía por escrito y taller propio.',
    navTitulo: 'Sitio',
    contactoTitulo: 'Contacto',
    zonaTitulo: 'Cobertura',
    zonas: 'Ensenada · Rosarito · Tijuana · Mexicali · San Felipe',
    derechos: 'Todos los derechos reservados.',
    marcas:
      'Jet Ski® es marca registrada de Kawasaki Heavy Industries. Yamaha® y Sea-Doo® son marcas de sus respectivos titulares. Baja Jetskis no está afiliado a ninguno de estos fabricantes: vende unidades usadas y reconstruidas de forma independiente.',
    creditos: 'Sitio de Baja Jetskis',
  },

  whatsapp: {
    flotante: 'Escribir por WhatsApp',
    aria: 'Abrir conversación de WhatsApp con Baja Jetskis',
  },

  general: {
    usd: 'USD',
    desde: 'Desde',
    hrs: 'hrs',
    error404Titulo: 'Esa página no existe',
    error404Texto:
      'A lo mejor la unidad que buscabas ya se vendió y cambió de dirección. Aquí está lo que hay hoy.',
    error404Cta: 'Ver inventario disponible',
  },
}

/** Toda traducción debe cubrir exactamente estas llaves. */
export type Copy = typeof es

export type RangoPrecioId = 'todos' | 'bajo' | 'medio' | 'alto'
