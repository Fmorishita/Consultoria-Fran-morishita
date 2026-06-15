/* ============================================================
   FRAN MORISHITA — Configuración compartida de contenido
   Usado por la landing (content-loader.js) y el panel (admin.js)
   ============================================================ */

const SITE_SUPABASE_URL = "https://lpdqksuvccsocntditik.supabase.co";
// Clave publicable: segura en el navegador; RLS limita lo que puede hacer.
const SITE_SUPABASE_KEY = "sb_publishable_q-ncqoltgj0ceLiPu8GD4Q_TJUBtT6W";

/* Contenido por defecto del sitio. Si no hay nada publicado en Supabase
   (o no se puede leer), la página se muestra con estos valores. */
const DEFAULT_CONTENT = {
  general: {
    metaTitulo: "Fran Morishita — Consultoría de Crecimiento | Multiplica tu Facturación",
    metaDescripcion:
      "Consultoría de crecimiento para dueños y CEOs. Más de $100 MDP facturados y +10 años escalando negocios de Real Estate, E-commerce y Gastronomía con marketing digital, IA y sistemas de ventas.",
    logo1: "FRAN",
    logo2: "MORISHITA",
    botonNav: "Agenda tu sesión",
    whatsapp: "5216462563006",
    mensajeWhatsappFloat: "Hola Fran, quiero agendar una sesión de diagnóstico",
    colorDorado: "#e8b34b",
    colorDoradoClaro: "#ffd98a",
    colorDoradoOscuro: "#b8842a",
  },

  hero: {
    visible: true,
    badge: "Consultoría de crecimiento para dueños y CEOs",
    titulo: "Tu empresa no necesita más likes.<br>Necesita",
    tituloDestacado: "multiplicar su facturación.",
    subtitulo:
      "Estrategias de marketing digital, inteligencia artificial y sistemas de ventas que han generado <strong>más de $100 MDP en negocios propios</strong> y <strong>cientos de millones para clientes</strong>. No teoría: ejecución profunda, de la mano contigo, con soluciones construidas para tu caso.",
    botonPrimario: "Quiero multiplicar mis ventas",
    botonSecundario: "Conoce el método",
    stats: [
      { prefijo: "+$", numero: 100, sufijo: " MDP", etiqueta: "facturados en negocios propios" },
      { prefijo: "+", numero: 10, sufijo: " años", etiqueta: "como emprendedor y consultor" },
      { prefijo: "$", numero: 100, sufijo: "s MDP", etiqueta: "generados para sus clientes" },
    ],
  },

  marquesina: {
    visible: true,
    items: [
      "Real Estate", "E-commerce", "Gastronomía", "Meta Ads",
      "Inteligencia Artificial", "CRM", "Sistemas de Ventas", "Escalamiento",
    ],
  },

  problema: {
    visible: true,
    tag: "La realidad",
    titulo: "¿Te suena familiar?",
    tituloDestacado: "",
    subtitulo:
      "La mayoría de las empresas no tienen un problema de producto. Tienen un problema de <strong>sistema de ventas</strong>.",
    tarjetas: [
      {
        icono: "👍",
        titulo: "Le pagas a una agencia que solo te da likes",
        texto: "Hacen publicaciones bonitas que juntan likes y seguidores, pero al final del mes no se traducen en clientes nuevos ni en más facturación.",
      },
      {
        icono: "📉",
        titulo: "Inviertes en publicidad y no ves retorno claro",
        texto: "Quemas presupuesto en anuncios sin una estrategia que convierta clics en clientes que pagan.",
      },
      {
        icono: "🕳️",
        titulo: "Tus leads se pierden en el camino",
        texto: "Sin CRM ni seguimiento sistematizado, cada lead que se enfría es dinero que dejaste sobre la mesa.",
      },
      {
        icono: "🎲",
        titulo: "Tus ventas dependen de la suerte",
        texto: "Un mes bueno, tres malos. No tienes un sistema predecible que genere demanda todos los días.",
      },
      {
        icono: "⏳",
        titulo: "Eres el cuello de botella de tu negocio",
        texto: "Todo pasa por ti. Sin procesos ni automatización, crecer significa trabajar más horas, no facturar más.",
      },
    ],
    puente:
      "Si te hace sentido alguno de estos puntos, no necesitas otra agencia que te venda humo.<br><strong>Necesitas un consultor que ya construyó lo que tú quieres construir.</strong>",
    puenteBoton: "Hablemos de tu caso",
  },

  servicios: {
    visible: true,
    tag: "Servicios",
    titulo: "Todo lo que tu empresa necesita<br>para",
    tituloDestacado: "vender más",
    subtitulo:
      "No vendemos servicios sueltos. Construimos la combinación exacta que tu negocio necesita para escalar.",
    tarjetas: [
      {
        icono: "monitor",
        titulo: "Páginas web de alta conversión",
        texto: "Sitios y landing pages diseñados con un solo objetivo: convertir visitantes en clientes. Diseño premium, velocidad y copy persuasivo.",
      },
      {
        icono: "enviar",
        titulo: "Meta Ads que sí venden",
        texto: "Campañas en Facebook e Instagram con estrategia de embudo completo: creativos que detienen el scroll y optimización constante del retorno.",
      },
      {
        icono: "grafica",
        titulo: "Escalamiento de negocios",
        texto: "Análisis profundo de tu operación para encontrar las palancas que multiplican facturación: oferta, precios, embudo, equipo y procesos.",
      },
      {
        icono: "ia",
        titulo: "Inteligencia artificial aplicada",
        texto: "Agentes de IA que atienden, califican y dan seguimiento a tus leads 24/7. Automatización que vende mientras tú duermes.",
      },
      {
        icono: "equipo",
        titulo: "CRM y sistemas de ventas",
        texto: "Implementamos el sistema que ordena tu pipeline: cada lead con seguimiento, cada vendedor con proceso, cada venta medida.",
      },
      {
        icono: "global",
        titulo: "Marketing digital integral",
        texto: "Estrategia 360°: posicionamiento, contenido, pauta y conversión trabajando juntos para construir una máquina de demanda constante.",
      },
    ],
  },

  metodo: {
    visible: true,
    tag: "El método",
    titulo: "Análisis profundo. Ejecución",
    tituloDestacado: "de la mano contigo.",
    subtitulo:
      "Nada de recetas genéricas. Cada negocio recibe una solución construida a la medida de su caso.",
    pasos: [
      {
        titulo: "Diagnóstico profundo",
        texto: "Auditamos tu negocio completo: oferta, embudo, números, equipo y competencia. Encontramos exactamente dónde se está fugando el dinero.",
      },
      {
        titulo: "Estrategia personalizada",
        texto: "Diseñamos el plan específico para tu caso: qué canales, qué oferta, qué sistema. Con metas claras y métricas que importan.",
      },
      {
        titulo: "Ejecución conjunta",
        texto: "No te dejamos un PDF y nos vamos. Implementamos contigo: campañas, web, CRM, IA y procesos de venta funcionando en tu operación.",
      },
      {
        titulo: "Escalamiento continuo",
        texto: "Medimos, optimizamos y escalamos lo que funciona. El objetivo no es crecer una vez: es construir una máquina que multiplica.",
      },
    ],
  },

  nichos: {
    visible: true,
    tag: "Especialidad",
    titulo: "Dominamos los nichos<br>donde",
    tituloDestacado: "se mueve el dinero",
    subtitulo: "Más de 10 años de experiencia concentrados en tres industrias de alto valor.",
    tarjetas: [
      {
        emoji: "🏢",
        estilo: "azul",
        titulo: "Real Estate",
        texto: "Sistemas de captación de compradores e inversionistas calificados para desarrollos, brokers e inmobiliarias. Menos visitas curiosas, más cierres.",
        puntos: [
          "Leads calificados con presupuesto real",
          "Seguimiento automatizado con IA y CRM",
          "Embudos para preventa y entrega inmediata",
        ],
      },
      {
        emoji: "🛒",
        estilo: "dorado",
        titulo: "E-commerce",
        texto: "Escalamiento de tiendas en línea con pauta rentable, optimización de conversión y estrategias de recompra que elevan el valor de cada cliente.",
        puntos: [
          "Campañas de Meta Ads con ROAS rentable",
          "Optimización de conversión de la tienda",
          "Email, automatización y recompra",
        ],
      },
      {
        emoji: "🍽️",
        estilo: "rojo",
        titulo: "Gastronomía",
        texto: "Restaurantes y marcas gastronómicas llenas todos los días: posicionamiento local, campañas que generan tráfico y sistemas de lealtad que hacen volver.",
        puntos: [
          "Demanda constante, no solo fines de semana",
          "Posicionamiento y marca que se antoja",
          "Reservas y pedidos sistematizados",
        ],
      },
    ],
  },

  sobreFran: {
    visible: true,
    tag: "Sobre Fran",
    titulo: "No es teoría.<br>Es",
    tituloDestacado: "experiencia comprobada.",
    foto: "",
    iniciales: "FM",
    tarjetaFlotante1Titulo: "+$100 MDP",
    tarjetaFlotante1Texto: "facturados personalmente",
    tarjetaFlotante2Titulo: "+10 años",
    tarjetaFlotante2Texto: "emprendiendo y consultando",
    parrafos: [
      "Fran Morishita ha facturado <strong>más de $100 millones de pesos en sus propios negocios</strong> y ha generado <strong>cientos de millones de pesos para sus clientes</strong> a lo largo de más de 10 años como emprendedor y consultor de empresas.",
      "Su enfoque es distinto al de una agencia tradicional: trabaja directamente con <strong>dueños y CEOs</strong>, metiéndose a fondo en los números y la operación de cada negocio para construir soluciones personalizadas que multiplican la facturación — no campañas genéricas que se ven bonitas y no venden.",
      "En el camino ha colaborado con expertos como <strong>Gus Marcos de Monterrey</strong> y con decenas de empresarios reconocidos, integrando lo último en <strong>inteligencia artificial, CRM y sistemas de ventas</strong> a estrategias de marketing que generan resultados medibles.",
    ],
    cita: "“Mi trabajo no es venderte marketing. Es construir contigo la máquina que multiplica tus ventas.”",
    citaAutor: "— Fran Morishita",
    boton: "Trabaja directamente con Fran",
  },

  comparativa: {
    visible: true,
    tag: "La diferencia",
    titulo: "Agencia tradicional vs.",
    tituloDestacado: "Consultoría Morishita",
    malaTitulo: "Una agencia más",
    malaItems: [
      "Te atiende un junior con 20 cuentas más",
      "Reportes de likes y alcance",
      "La misma receta para todos los clientes",
      "Entrega campañas y se desentiende",
      "Nunca ha operado un negocio propio",
    ],
    buenaTitulo: "Fran Morishita",
    buenaItems: [
      "Trabajas directo con quien facturó +$100 MDP",
      "Reportes de ventas, retorno y facturación",
      "Solución construida para tu caso específico",
      "Ejecución de la mano, dentro de tu operación",
      "+10 años emprendiendo con dinero propio",
    ],
  },

  testimonios: {
    visible: true,
    tag: "Testimonios y colaboraciones",
    titulo: "Resultados reales,<br>",
    tituloDestacado: "no promesas.",
    subtitulo:
      "Empresarios y dueños de negocio que han trabajado de la mano con Fran y con quienes ha colaborado.",
    // Video destacado. Pega un link de YouTube/Vimeo (recomendado) o sube un archivo.
    videoTitulo: "Conoce a Fran en 2 minutos",
    videoEmbed: "",
    videoArchivo: "",
    videoPoster: "",
    tarjetas: [
      {
        foto: "",
        nombre: "Gus Marcos",
        rol: "Empresario reconocido · Monterrey",
        texto: "Colaboración con Gustavo “Gus” Marcos, referente del emprendimiento en México, en estrategias de crecimiento y marketing.",
      },
    ],
  },

  faq: {
    visible: true,
    tag: "Preguntas frecuentes",
    titulo: "Lo que todo dueño<br>pregunta antes de empezar",
    tituloDestacado: "",
    items: [
      {
        pregunta: "¿Esto es para mi tipo de negocio?",
        respuesta: "Si eres dueño o CEO de un negocio de Real Estate, E-commerce o Gastronomía, estás en el centro de nuestra especialidad. Si estás en otra industria pero tienes un negocio operando y quieres escalarlo, agenda una sesión: el diagnóstico nos dirá si podemos multiplicar tus resultados.",
      },
      {
        pregunta: "¿En qué se diferencia de contratar una agencia?",
        respuesta: "Una agencia ejecuta tácticas sueltas. Aquí trabajas directamente con un consultor que ha operado sus propios negocios, que analiza tu empresa completa y construye el sistema que necesita: estrategia, web, anuncios, CRM, IA y proceso de ventas funcionando en conjunto.",
      },
      {
        pregunta: "¿Cuánto cuesta la consultoría?",
        respuesta: "Cada solución se construye a la medida, por lo que la inversión depende de tu caso. La primera sesión de diagnóstico te dará claridad sobre el plan y la inversión exacta antes de comprometerte a nada.",
      },
      {
        pregunta: "¿Qué tan rápido veré resultados?",
        respuesta: "Depende del punto de partida de tu negocio. Lo que sí garantizamos es un método: diagnóstico profundo, ejecución conjunta y optimización constante con métricas de ventas reales — no métricas de vanidad.",
      },
      {
        pregunta: "¿Trabajan toda la implementación o solo asesoran?",
        respuesta: "Ambas. El diferenciador de Fran es la ejecución de la mano con cada cliente: además de la estrategia, implementamos páginas web, campañas de Meta Ads, CRM, agentes de IA y sistemas de ventas dentro de tu operación.",
      },
    ],
  },

  contacto: {
    visible: true,
    tag: "Da el primer paso",
    titulo: "Agenda una sesión de<br>",
    tituloDestacado: "descubrimiento de 30 min",
    texto:
      "Una videollamada de 30 minutos para conocer tu negocio y ver si podemos trabajar juntos. Sin compromiso y sin venderte nada: solo claridad sobre tu mayor oportunidad de crecimiento.",
    bullets: [
      "Conocemos tu negocio, tus números y tus objetivos",
      "Detectamos tu oportunidad de crecimiento más grande",
      "Definimos si somos el equipo correcto para ti",
    ],
    urgencia:
      "⚡ Cupos limitados: Fran toma pocas llamadas al mes para dar profundidad a cada caso.",
    // Link de tu evento de Calendly. Las preguntas (nombre, WhatsApp, giro,
    // problema, web/redes) se configuran dentro de Calendly, no aquí.
    calendlyUrl: "https://calendly.com/franmorishita/30min?hide_gdpr_banner=1",
  },

  footer: {
    descripcion: "Consultoría de crecimiento para dueños y CEOs que quieren multiplicar su facturación.",
    derechos: "Todos los derechos reservados.",
  },
};

/* Mezcla lo guardado en Supabase sobre los valores por defecto, para que
   campos nuevos del código no se pierdan si el contenido guardado es viejo. */
function mergeContent(base, extra) {
  if (Array.isArray(base) || Array.isArray(extra)) return extra !== undefined ? extra : base;
  if (typeof base === "object" && base !== null) {
    const out = {};
    for (const key of new Set([...Object.keys(base), ...Object.keys(extra || {})])) {
      const b = base[key];
      const e = extra ? extra[key] : undefined;
      out[key] = e === undefined ? b : typeof b === "object" && b !== null && !Array.isArray(b) ? mergeContent(b, e) : e;
    }
    return out;
  }
  return extra !== undefined ? extra : base;
}
