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
    metaTitulo: "Fran Morishita — Business Consulting que Multiplica tu Facturación",
    metaDescripcion:
      "Consulting de growth para dueños y CEOs. Más de $100 MDP facturados y +10 años escalando negocios de Real Estate, B2B, E-commerce y Gastronomía con marketing digital, IA y sales systems.",
    logo1: "FRAN",
    logo2: "MORISHITA",
    botonNav: "Agenda tu call",
    whatsapp: "5216462563006",
    mensajeWhatsappFloat: "Hola Fran, quiero agendar una sesión de diagnóstico",
    colorDorado: "#e8b34b",
    colorDoradoClaro: "#ffd98a",
    colorDoradoOscuro: "#b8842a",
  },

  hero: {
    visible: true,
    badge: "Business consulting para dueños y CEOs",
    titulo: "Tu empresa no necesita más likes.<br>Necesita",
    tituloDestacado: "multiplicar su revenue.",
    subtitulo:
      "Estrategias de marketing digital, inteligencia artificial y sales systems que han generado <strong>más de $100 MDP en business propios</strong> y <strong>cientos de millones para clientes</strong>. No teoría: execution profunda, de la mano contigo, con soluciones custom para tu caso.",
    botonPrimario: "Quiero multiplicar mis sales",
    botonSecundario: "Conoce el método",
    stats: [
      { prefijo: "+$", numero: 100, sufijo: " MDP", etiqueta: "facturados en business propios" },
      { prefijo: "+", numero: 10, sufijo: " años", etiqueta: "como entrepreneur y consultor" },
      { prefijo: "$", numero: 100, sufijo: "s MDP", etiqueta: "generados para sus clientes" },
    ],
  },

  marquesina: {
    visible: true,
    items: [
      "Real Estate", "B2B", "E-commerce", "Gastronomía", "Meta Ads",
      "Inteligencia Artificial", "CRM", "Sales Systems", "Scaling", "Growth",
    ],
  },

  problema: {
    visible: true,
    tag: "La realidad",
    titulo: "¿Te suena familiar?",
    tituloDestacado: "",
    subtitulo:
      "La mayoría de las empresas no tienen un problema de producto. Tienen un problema de <strong>sales system</strong>.",
    tarjetas: [
      {
        icono: "👍",
        titulo: "Le pagas a una agency que solo te da likes",
        texto: "Hacen posts bonitos que juntan likes y followers, pero al final del mes no se traducen en clientes nuevos ni en más revenue.",
      },
      {
        icono: "📉",
        titulo: "Inviertes en ads y no ves un ROI claro",
        texto: "Quemas budget en anuncios sin una estrategia que convierta clicks en clientes que pagan.",
      },
      {
        icono: "🕳️",
        titulo: "Tus leads se pierden en el camino",
        texto: "Sin CRM ni follow-up sistematizado, cada lead que se enfría es money que dejaste on the table.",
      },
      {
        icono: "🎲",
        titulo: "Tus ventas dependen de la suerte",
        texto: "Un mes bueno, tres malos. No tienes un sistema predecible que genere demand todos los días.",
      },
      {
        icono: "⏳",
        titulo: "Eres el bottleneck de tu negocio",
        texto: "Todo pasa por ti. Sin procesos ni automation, crecer significa trabajar más horas, no facturar más.",
      },
    ],
    puente:
      "Si te hace sentido alguno de estos puntos, no necesitas otra agency que te venda humo.<br><strong>Necesitas un consultor que ya construyó lo que tú quieres construir.</strong>",
    puenteBoton: "Hablemos de tu caso",
  },

  servicios: {
    visible: true,
    tag: "Services",
    titulo: "Todo lo que tu empresa necesita<br>para",
    tituloDestacado: "vender más",
    subtitulo:
      "No vendemos services sueltos. Construimos el combo exacto que tu business necesita para escalar.",
    tarjetas: [
      {
        icono: "monitor",
        titulo: "Páginas web de alta conversión",
        texto: "Sites y landing pages diseñadas con un solo goal: convertir visitantes en clientes. Diseño premium, speed y copy persuasivo.",
      },
      {
        icono: "enviar",
        titulo: "Meta Ads que sí venden",
        texto: "Campañas en Facebook e Instagram con estrategia de funnel completo: creativos que detienen el scroll y optimización constante del ROI.",
      },
      {
        icono: "grafica",
        titulo: "Scaling de negocios",
        texto: "Análisis profundo de tu operación para encontrar las palancas que multiplican revenue: oferta, pricing, funnel, team y procesos.",
      },
      {
        icono: "ia",
        titulo: "Inteligencia artificial aplicada",
        texto: "Agentes de IA que atienden, califican y dan follow-up a tus leads 24/7. Automation que vende mientras tú duermes.",
      },
      {
        icono: "equipo",
        titulo: "CRM y sales systems",
        texto: "Implementamos el sistema que ordena tu pipeline: cada lead con follow-up, cada vendedor con proceso, cada venta medida.",
      },
      {
        icono: "global",
        titulo: "Marketing digital integral",
        texto: "Estrategia 360°: branding, contenido, paid ads y conversión trabajando juntos para construir una máquina de demand constante.",
      },
    ],
  },

  metodo: {
    visible: true,
    tag: "El método",
    titulo: "Análisis profundo. Execution",
    tituloDestacado: "de la mano contigo.",
    subtitulo:
      "Nada de recetas genéricas. Cada business recibe una solución custom para su caso.",
    pasos: [
      {
        titulo: "Diagnóstico profundo",
        texto: "Auditamos tu negocio completo: oferta, funnel, números, team y competencia. Encontramos exactamente dónde se está fugando el money.",
      },
      {
        titulo: "Estrategia custom",
        texto: "Diseñamos el plan específico para tu caso: qué canales, qué oferta, qué sistema. Con goals claros y métricas que importan.",
      },
      {
        titulo: "Execution conjunta",
        texto: "No te dejamos un PDF y nos vamos. Implementamos contigo: campañas, web, CRM, IA y sales process funcionando en tu operación.",
      },
      {
        titulo: "Scaling continuo",
        texto: "Medimos, optimizamos y escalamos lo que funciona. El goal no es crecer una vez: es construir una máquina que multiplica.",
      },
    ],
  },

  nichos: {
    visible: true,
    tag: "Especialidad",
    titulo: "Dominamos los nichos<br>donde",
    tituloDestacado: "se mueve el money",
    subtitulo: "Más de 10 años de experiencia concentrados en las industrias de mayor value.",
    tarjetas: [
      {
        emoji: "🏢",
        estilo: "azul",
        titulo: "Real Estate",
        texto: "Sistemas de captación de buyers e inversionistas calificados para desarrollos, brokers e inmobiliarias. Menos visitas curiosas, más closings.",
        puntos: [
          "Leads calificados con budget real",
          "Follow-up automatizado con IA y CRM",
          "Funnels para preventa y entrega inmediata",
        ],
      },
      {
        emoji: "💼",
        estilo: "verde",
        titulo: "B2B / Corporativo",
        texto: "Para empresas que le venden a otras empresas: construimos un pipeline predecible de leads calificados y un sales process que cierra deals de alto ticket.",
        puntos: [
          "Lead gen B2B en LinkedIn y outbound",
          "Citas con decision makers, no curiosos",
          "Sales process y follow-up que cierra deals",
        ],
      },
      {
        emoji: "🛒",
        estilo: "dorado",
        titulo: "E-commerce",
        texto: "Scaling de tiendas online con paid ads rentable, optimización de conversión y estrategias de recompra que elevan el value de cada cliente.",
        puntos: [
          "Campañas de Meta Ads con ROAS rentable",
          "Optimización de conversión de la store",
          "Email, automation y recompra",
        ],
      },
      {
        emoji: "🍽️",
        estilo: "rojo",
        titulo: "Gastronomía",
        texto: "Restaurantes y marcas gastronómicas full todos los días: posicionamiento local, campañas que generan tráfico y sistemas de loyalty que hacen volver.",
        puntos: [
          "Demand constante, no solo los weekends",
          "Branding y posicionamiento que se antoja",
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
    tarjetaFlotante2Texto: "como entrepreneur y consultor",
    parrafos: [
      "Fran Morishita ha facturado <strong>más de $100 millones de pesos en sus propios business</strong> y ha generado <strong>cientos de millones de pesos para sus clientes</strong> a lo largo de más de 10 años como entrepreneur y consultor de empresas.",
      "Su approach es distinto al de una agency tradicional: trabaja directo con <strong>dueños y CEOs</strong>, metiéndose a fondo en los números y la operación de cada negocio para construir soluciones custom que multiplican el revenue — no campañas genéricas que se ven bonitas y no venden.",
      "En el camino ha colaborado con experts como <strong>Gus Marcos de Monterrey</strong> y con decenas de empresarios reconocidos, integrando lo último en <strong>inteligencia artificial, CRM y sales systems</strong> a estrategias de marketing que generan resultados medibles.",
    ],
    cita: "“Mi trabajo no es venderte marketing. Es construir contigo la máquina que multiplica tus sales.”",
    citaAutor: "— Fran Morishita",
    boton: "Trabaja directo con Fran",
  },

  comparativa: {
    visible: true,
    tag: "La diferencia",
    titulo: "Agency tradicional vs.",
    tituloDestacado: "Consultoría Morishita",
    malaTitulo: "Una agency más",
    malaItems: [
      "Te atiende un junior con 20 cuentas más",
      "Reportes de likes y reach",
      "El mismo template para todos los clientes",
      "Entrega campañas y se desentiende",
      "Nunca ha operado un business propio",
    ],
    buenaTitulo: "Fran Morishita",
    buenaItems: [
      "Trabajas directo con quien facturó +$100 MDP",
      "Reportes de sales, ROI y facturación",
      "Solución custom para tu caso específico",
      "Execution de la mano, dentro de tu operación",
      "+10 años emprendiendo con money propio",
    ],
  },

  testimonios: {
    visible: true,
    tag: "Testimonios y colaboraciones",
    titulo: "Resultados reales,<br>",
    tituloDestacado: "no promesas.",
    subtitulo:
      "Empresarios y dueños de negocio que han trabajado de la mano con Fran y con quienes ha colaborado.",
    videoTitulo: "Conoce a Fran en 2 minutos",
    videoEmbed: "",
    videoArchivo: "",
    videoPoster: "",
    tarjetas: [
      {
        foto: "",
        nombre: "Gus Marcos",
        rol: "Empresario reconocido · Monterrey",
        texto: "Colaboración con Gustavo “Gus” Marcos, referente del entrepreneurship en México, en estrategias de growth y marketing.",
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
        pregunta: "¿Esto es para mi tipo de business?",
        respuesta: "Si eres dueño o CEO de un negocio de Real Estate, B2B, E-commerce o Gastronomía, estás en el centro de nuestra especialidad. Si estás en otra industria pero tienes un business operando y quieres escalarlo, agenda una call: el diagnóstico nos dirá si podemos multiplicar tus resultados.",
      },
      {
        pregunta: "¿En qué se diferencia de contratar una agency?",
        respuesta: "Una agency ejecuta tácticas sueltas. Aquí trabajas directo con un consultor que ha operado sus propios negocios, que analiza tu empresa completa y construye el sistema que necesita: estrategia, web, ads, CRM, IA y sales process funcionando en conjunto.",
      },
      {
        pregunta: "¿Cuánto cuesta el consulting?",
        respuesta: "Cada solución se construye custom, por lo que la inversión depende de tu caso. La primera call de diagnóstico te dará claridad sobre el plan y la inversión exacta antes de comprometerte a nada.",
      },
      {
        pregunta: "¿Qué tan rápido veré resultados?",
        respuesta: "Depende del punto de partida de tu negocio. Lo que sí garantizamos es un método: diagnóstico profundo, execution conjunta y optimización constante con métricas de sales reales — no métricas de vanidad.",
      },
      {
        pregunta: "¿Trabajan toda la implementación o solo asesoran?",
        respuesta: "Ambas. El diferenciador de Fran es la execution de la mano con cada cliente: además de la estrategia, implementamos páginas web, campañas de Meta Ads, CRM, agentes de IA y sales systems dentro de tu operación.",
      },
    ],
  },

  contacto: {
    visible: true,
    tag: "Da el primer paso",
    titulo: "Agenda una sesión de<br>",
    tituloDestacado: "discovery de 30 min",
    texto:
      "Una videollamada de 30 minutos para conocer tu business y ver si podemos trabajar juntos. Sin compromiso y sin venderte nada: solo claridad sobre tu mayor oportunidad de growth.",
    bullets: [
      "Conocemos tu negocio, tus números y tus goals",
      "Detectamos tu oportunidad de growth más grande",
      "Definimos si somos el team correcto para ti",
    ],
    urgencia:
      "⚡ Cupos limitados: Fran toma pocas calls al mes para dar profundidad a cada caso.",
    // Link de tu evento de Calendly. Las preguntas (nombre, WhatsApp, giro,
    // problema, web/redes) se configuran dentro de Calendly, no aquí.
    calendlyUrl: "https://calendly.com/franmorishita/30min?hide_gdpr_banner=1",
  },

  footer: {
    descripcion: "Business consulting para dueños y CEOs que quieren multiplicar su facturación.",
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
