/* ============================================================
   PUNTA MITA HOMES — Data layer
   ------------------------------------------------------------
   ESTE ES EL ÚNICO ARCHIVO QUE HAY QUE EDITAR PARA PUBLICAR
   INVENTARIO REAL. Ver README.md → "Cargar propiedades reales".
   ============================================================ */

/* ---------- Configuración del sitio ---------- */
const SITE = {
  agent:      'Jaime Valdés',
  agentHandle:'@soyjaimevaldes',
  agentUrl:   'https://www.instagram.com/soyjaimevaldes',
  agentRole:  { es: 'Agente de bienes raíces · Punta Mita', en: 'Real estate agent · Punta Mita' },
  agentPromise:{ es: 'Ayudo a familias a comprar su segunda casa', en: 'Helping families buy second homes' },
  agentPhoto: 'assets/jaime.jpg',
  agentFollowers: '56 mil',   // @soyjaimevaldes, actualizar de vez en cuando
  agentVerified: true,
  brand:      'Punta Mita Homes',
  brandFull:  'Punta Mita Homes | Luxury Real Estate',
  instagram:  'https://www.instagram.com/puntamita.homes',
  igHandle:   '@puntamita.homes',

  /* Link corto de WhatsApp que ya usa el perfil de Instagram.
     Funciona tal cual, pero NO admite mensaje pre-llenado. */
  waLink:     'https://wa.me/message/JJGD26K2HRM6N1',

  /* ⚠️ PENDIENTE: número en formato internacional, solo dígitos (ej. '523221234567').
     Al llenarlo, el sitio empieza a mandar el mensaje pre-armado con las
     respuestas del calificador — sube muchísimo la calidad del lead. */
  whatsapp:   '',

  email:      '',            // ⚠️ PENDIENTE
  calendly:   '',            // opcional

  siteUrl:    'https://puntamitahomes.vercel.app',

  /* Supabase — captura de leads. Vacío = el formulario cae con gracia
     a solo-WhatsApp sin perder el prospecto. */
  supabase: { url: '', key: '', table: 'leads' },

  /* Ninguna ficha inventada se presenta como real. */
  demoMode: false
};

/* ---------- Zonas reales que cubre Punta Mita Homes ---------- */
const ZONES = [
  {
    id:'punta-de-mita',
    name:'Punta de Mita · Destiladeras',
    tagline:{ es:'Frente al mar abierto', en:'On the open ocean' },
    blurb:{
      es:'Playa Destiladeras es considerada por muchos la mejor playa de toda la Riviera Nayarit: arena suave, mar abierto, atardeceres espectaculares y kilómetros para caminar frente al océano. Aquí están Naya y Nayama.',
      en:'Playa Destiladeras is considered by many the finest beach on the entire Riviera Nayarit: soft sand, open ocean, spectacular sunsets and kilometres to walk along the water. This is where Naya and Nayama sit.'
    },
    highlights:{
      es:['Playa Destiladeras','Residencias frente al mar','45 min del aeropuerto PVR','Entrega inmediata o preventa'],
      en:['Playa Destiladeras','Beachfront residences','45 min from PVR airport','Immediate delivery or pre-sale']
    },
    range:{ es:'Colección privada', en:'Private collection' },
    ph:'ph-2',
    photo:'assets/stock-vegetacion-mar.jpg'
  },
  {
    id:'punta-mita',
    name:'Punta Mita',
    tagline:{ es:'La península privada', en:'The private peninsula' },
    blurb:{
      es:'Península privada con acceso controlado, dos campos de golf Jack Nicklaus Signature y los resorts Four Seasons y St. Regis dentro de la misma comunidad. El código postal más exclusivo del Pacífico mexicano.',
      en:'A gated private peninsula with two Jack Nicklaus Signature golf courses and both Four Seasons and St. Regis inside the same community. The most exclusive address on Mexico’s Pacific coast.'
    },
    highlights:{
      es:['Acceso controlado 24/7','2 campos Jack Nicklaus','Four Seasons y St. Regis','Beach & Golf Clubs privados'],
      en:['24/7 gated access','2 Jack Nicklaus courses','Four Seasons & St. Regis','Private Beach & Golf Clubs']
    },
    range:{ es:'Colección privada', en:'Private collection' },
    ph:'ph-1',
    photo:'assets/stock-villa-pool.jpg'
  },
  {
    id:'nuevo-vallarta',
    name:'Nuevo Vallarta · El Tigre',
    tagline:{ es:'Golf y marina', en:'Golf and marina' },
    blurb:{
      es:'El Tigre, alrededor del campo de golf del mismo nombre, con marina, servicios consolidados y la conexión más rápida al aeropuerto. La entrada más práctica a la Riviera Nayarit para quien viene seguido.',
      en:'El Tigre, built around the golf course of the same name, with a marina, established services and the quickest connection to the airport. The most practical entry point to Riviera Nayarit for frequent visitors.'
    },
    highlights:{
      es:['Campo de golf El Tigre','Marina y servicios','A minutos del aeropuerto','Comunidades cerradas'],
      en:['El Tigre golf course','Marina and services','Minutes from the airport','Gated communities']
    },
    range:{ es:'Colección privada', en:'Private collection' },
    ph:'ph-4',
    photo:'assets/stock-resort-alberca.jpg'
  },
  {
    id:'litibu',
    name:'Litibú',
    tagline:{ es:'Golf y playa abierta', en:'Golf and open beach' },
    blurb:{
      es:'Alrededor del campo Litibú Golf Club, diseño de Greg Norman, y una playa de casi tres kilómetros. La franja con más obra nueva y preventa de la Riviera, con amenidades de resort.',
      en:'Around Litibú Golf Club, a Greg Norman design, and a beach of nearly three kilometres. The stretch with the most new construction and pre-sales on the Riviera, with resort-grade amenities.'
    },
    highlights:{
      es:['Campo Greg Norman','Obra nueva y preventa','Amenidades tipo resort','5 min de Punta de Mita'],
      en:['Greg Norman course','New builds and pre-sales','Resort-grade amenities','5 min from Punta de Mita']
    },
    range:{ es:'Colección privada', en:'Private collection' },
    ph:'ph-6',
    photo:'assets/stock-villa-palmeras.jpg'
  },
  {
    id:'sayulita',
    name:'Sayulita',
    tagline:{ es:'Surf y bohemia', en:'Surf and bohemia' },
    blurb:{
      es:'Pueblo Mágico y capital del surf de la costa, con la ocupación de renta vacacional más alta de la zona. Inventario limitado y demanda internacional durante casi todo el año.',
      en:'A Pueblo Mágico and the coast’s surf capital, with the highest vacation-rental occupancy in the area. Limited inventory and international demand almost year-round.'
    },
    highlights:{
      es:['Ocupación de renta alta','Pueblo Mágico','Inventario limitado','Demanda internacional'],
      en:['High rental occupancy','Pueblo Mágico','Limited inventory','International demand']
    },
    range:{ es:'Colección privada', en:'Private collection' },
    ph:'ph-3',
    photo:'assets/stock-atardecer-palmeras.jpg'
  },
  {
    id:'san-pancho',
    name:'San Pancho',
    tagline:{ es:'El vecino tranquilo', en:'The quiet neighbour' },
    blurb:{
      es:'San Francisco, a cinco minutos de Sayulita: el mismo mar con la mitad del ruido. Comunidad artística y de expatriados consolidada, con menor densidad y playa amplia.',
      en:'San Francisco, five minutes from Sayulita: the same ocean with half the noise. An established arts and expat community, lower density and a wide beach.'
    },
    highlights:{
      es:['Menor densidad','Comunidad de expatriados','Playa amplia','Cinco minutos de Sayulita'],
      en:['Lower density','Established expat community','Wide beach','Five minutes from Sayulita']
    },
    range:{ es:'Colección privada', en:'Private collection' },
    ph:'ph-5',
    photo:'assets/stock-zona-tropical.jpg'
  }
];

/* ---------- Tipos de propiedad ---------- */
const TYPES = [
  { id:'villa',     es:'Villa',       en:'Villa' },
  { id:'condo',     es:'Condominio',  en:'Condo' },
  { id:'penthouse', es:'Penthouse',   en:'Penthouse' },
  { id:'residencia',es:'Residencia',  en:'Residence' },
  { id:'casa',      es:'Casa',        en:'Home' },
  { id:'terreno',   es:'Terreno',     en:'Land' }
];

/* ============================================================
   PROPIEDADES
   ------------------------------------------------------------
   Contenido tomado de las publicaciones reales de
   @puntamita.homes (Instagram). No hay precios inventados:
   los proyectos operan con el modelo "Private Collection",
   así que el precio se entrega bajo solicitud.

   Al recibir de Jaime la lista de precios, recámaras y m²,
   agrega esos campos y quita priceOnRequest.
   ============================================================ */
const PROPERTIES = [
  {
    id:'naya', status:'venta', featured:true, hot:true,
    zone:'punta-de-mita', type:'residencia',
    priceOnRequest:true,
    developer:'One Development',
    beach:'Playa Destiladeras',
    delivery:{ es:'Entrega inmediata', en:'Immediate delivery' },
    units:11, remaining:2,
    title:{ es:'Naya · Residencias frente al mar', en:'Naya · Beachfront residences' },
    headline:{
      es:'Once residencias frente al Pacífico. Quedan dos.',
      en:'Eleven residences facing the Pacific. Two remain.'
    },
    description:{
      es:'Naya forma parte del proyecto residencial más exclusivo de la zona de Punta de Mita, sobre Playa Destiladeras — considerada por muchos la mejor playa de toda la Riviera Nayarit: arena suave, mar abierto, atardeceres espectaculares y kilómetros para caminar frente al océano. El desarrollo completo son solo 11 residencias y 17 departamentos frente al mar, a 45 minutos del aeropuerto de Puerto Vallarta. Está desarrollado por One Development, el mismo grupo detrás de Arboleda en San Pedro Garza García.',
      en:'Naya is part of the most exclusive residential project in the Punta de Mita area, on Playa Destiladeras — considered by many the finest beach on the entire Riviera Nayarit: soft sand, open ocean, spectacular sunsets and kilometres to walk along the water. The full development is only 11 residences and 17 beachfront apartments, 45 minutes from Puerto Vallarta airport. It is developed by One Development, the same group behind Arboleda in San Pedro Garza García.'
    },
    views:['ocean'],
    amenities:{
      es:['Frente a Playa Destiladeras','Alberca de borde infinito sobre el mar','Áreas de descanso y jardines frente al océano','Solo 11 residencias en todo el proyecto','Entrega inmediata','45 minutos del aeropuerto de Puerto Vallarta'],
      en:['On Playa Destiladeras','Infinity-edge pool over the ocean','Lounge areas and gardens facing the water','Only 11 residences in the entire project','Immediate delivery','45 minutes from Puerto Vallarta airport']
    },
    refFrom:1,
    photos:[
      'assets/destiladeras-alberca.jpg',
      'assets/stock-gal-villa-blanca.jpg',
      'assets/stock-gal-estancia.jpg',
      'assets/stock-gal-infinity.jpg'
    ]
  },
  {
    id:'nayama', status:'preventa', featured:true, isNew:true,
    zone:'punta-de-mita', type:'condo',
    priceOnRequest:true,
    developer:'One Development',
    beach:'Playa Destiladeras',
    delivery:{ es:'Preventa', en:'Pre-sale' },
    units:17,
    title:{ es:'Nayama · Departamentos frente al mar', en:'Nayama · Beachfront apartments' },
    headline:{
      es:'Diecisiete departamentos con el Pacífico enfrente.',
      en:'Seventeen apartments with the Pacific in front of them.'
    },
    description:{
      es:'Nayama es el segundo de los dos proyectos frente al mar que One Development levantó sobre Playa Destiladeras, junto a Naya. Diecisiete departamentos frente al océano dentro del mismo conjunto de 11 residencias y 17 departamentos, con esquema de preventa. El mismo grupo desarrolló Arboleda en San Pedro Garza García.',
      en:'Nayama is the second of the two beachfront projects One Development built on Playa Destiladeras, alongside Naya. Seventeen oceanfront apartments within the same 11-residence, 17-apartment ensemble, offered as a pre-sale. The same group developed Arboleda in San Pedro Garza García.'
    },
    views:['ocean'],
    amenities:{
      es:['Frente a Playa Destiladeras','Alberca de borde infinito sobre el mar','Áreas comunes frente al océano','Solo 17 departamentos','Esquema de preventa','45 minutos del aeropuerto de Puerto Vallarta'],
      en:['On Playa Destiladeras','Infinity-edge pool over the ocean','Common areas facing the water','Only 17 apartments','Pre-sale terms','45 minutes from Puerto Vallarta airport']
    },
    refFrom:0,
    photos:[
      'assets/stock-casa-abierta.jpg',
      'assets/stock-arquitectura-agua.jpg',
      'assets/stock-biofilia-mar.jpg',
      'assets/stock-gal-buganvilia.jpg'
    ]
  },
  {
    id:'el-tigre', status:'venta', featured:true, isNew:true,
    zone:'nuevo-vallarta', type:'casa',
    priceOnRequest:true,
    landmark:'Campo de golf El Tigre',
    delivery:{ es:'En construcción', en:'Under construction' },
    title:{ es:'El Tigre · Nuevo Vallarta', en:'El Tigre · Nuevo Vallarta' },
    headline:{
      es:'Golf, marina y la conexión más rápida al aeropuerto.',
      en:'Golf, marina and the quickest link to the airport.'
    },
    description:{
      es:'Listing en El Tigre, la comunidad de Nuevo Vallarta construida alrededor del campo de golf del mismo nombre, con marina y servicios ya consolidados. Es la opción más práctica para quien viene seguido y quiere estar a minutos del aeropuerto sin renunciar a comunidad cerrada y golf. Detalles de unidad, precio y disponibilidad bajo solicitud.',
      en:'A listing in El Tigre, the Nuevo Vallarta community built around the golf course of the same name, with a marina and established services. It is the most practical option for frequent visitors who want to be minutes from the airport without giving up a gated community and golf. Unit details, price and availability on request.'
    },
    views:['golf'],
    amenities:{
      es:['Campo de golf El Tigre','Marina de Nuevo Vallarta','Comunidad cerrada','A minutos del aeropuerto','Servicios consolidados todo el año'],
      en:['El Tigre golf course','Nuevo Vallarta marina','Gated community','Minutes from the airport','Established year-round services']
    },
    refFrom:0,
    photos:[
      'assets/stock-gal-verde.jpg',
      'assets/stock-villa-pool.jpg',
      'assets/stock-resort-alberca.jpg',
      'assets/stock-villa-palmeras.jpg'
    ]
  }
];


/* ============================================================
   TESTIMONIOS
   ------------------------------------------------------------
   ⚠️ Los tres de abajo son EJEMPLOS, escritos para ver cómo se
   integra la sección. NO son clientes reales.

   Mientras TESTIMONIALS_DEMO sea true, cada tarjeta se marca
   visiblemente como ejemplo y la sección lleva una nota. En
   cuanto entren testimonios reales, sustituye el arreglo y pon
   la bandera en false — nada más hay que tocar.
   ============================================================ */
const TESTIMONIALS_DEMO = true;

const TESTIMONIALS = [
  {
    id:'t1', demo:true, initials:'AM',
    name:'Alejandra M.',
    place:{ es:'Monterrey, N.L.', en:'Monterrey, Mexico' },
    context:{ es:'Segunda casa · Playa Destiladeras', en:'Second home · Playa Destiladeras' },
    quote:{
      es:'Llevábamos dos años viendo cosas por internet sin decidirnos. Jaime nos armó una lista de cuatro y en un día las caminamos todas. Nos dijo cuál no nos convenía y por qué — eso fue lo que nos hizo confiar.',
      en:'We spent two years looking online without deciding. Jaime put together a shortlist of four and we walked all of them in a single day. He told us which one was not right for us and why — that is what made us trust him.'
    }
  },
  {
    id:'t2', demo:true, initials:'DR',
    name:'David R.',
    place:{ es:'San Diego, California', en:'San Diego, California' },
    context:{ es:'Inversión con renta · Punta de Mita', en:'Income property · Punta de Mita' },
    quote:{
      es:'Lo que más me sirvió fue el desglose de costos de cierre por escrito antes de dar el anticipo. Nadie me lo había dado así. El fideicomiso salió exactamente en lo que me dijo.',
      en:'What helped most was getting the closing-cost breakdown in writing before I put down the deposit. Nobody had given it to me that way. The bank trust came in at exactly what he quoted.'
    }
  },
  {
    id:'t3', demo:true, initials:'CS',
    name:'Carmen y Sergio',
    place:{ es:'Ciudad de México', en:'Mexico City' },
    context:{ es:'Mudanza definitiva · Punta Mita', en:'Full-time move · Punta Mita' },
    quote:{
      es:'Nos mudamos con dos niños, así que nos importaba la escuela, el médico y los vecinos, no solo la casa. Jaime nos enseñó el pueblo antes que las propiedades. Llevamos tres años aquí.',
      en:'We moved with two kids, so what mattered was the school, the doctor and the neighbours, not just the house. Jaime showed us the town before he showed us any property. We have been here three years.'
    }
  }
];

/* Exponer en window para las páginas que no usan módulos */
window.SITE = SITE;
window.ZONES = ZONES;
window.TYPES = TYPES;
window.PROPERTIES = PROPERTIES;
window.TESTIMONIALS = TESTIMONIALS;
window.TESTIMONIALS_DEMO = TESTIMONIALS_DEMO;
