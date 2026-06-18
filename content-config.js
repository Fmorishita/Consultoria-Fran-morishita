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
  "orden": [
    "problema",
    "nichos",
    "metodo",
    "sobreFran",
    "servicios",
    "testimonios",
    "contacto",
    "comparativa",
    "faq"
  ],
  "general": {
    "metaTitulo": "Fran Morishita — Business Consulting que Multiplica tu Facturación",
    "metaDescripcion": "Consulting de growth para dueños y CEOs. +$13 MDD facturados y +10 años escalando negocios de Real Estate, B2B, E-commerce y Gastronomía con marketing digital, IA y sales systems.",
    "logo1": "FRAN",
    "logo2": "MORISHITA",
    "botonNav": "Agenda tu free call",
    "whatsapp": "5216462563006",
    "mensajeWhatsappFloat": "Hola Fran, quiero agendar una sesión de diagnóstico",
    "colorDorado": "#e8b34b",
    "colorDoradoClaro": "#ffd98a",
    "colorDoradoOscuro": "#b8842a"
  },
  "hero": {
    "visible": true,
    "badge": "Business consulting para dueños y CEOs",
    "titulo": "Tu empresa no necesita más likes.<br>Necesita",
    "tituloDestacado": "multiplicar su revenue.",
    "subtitulo": "Estrategias de marketing digital, inteligencia artificial y sales systems que han generado <strong>+$13 MDD en business propios</strong> y <strong>para nuestros clientes</strong>. No teoría: execution profunda, de la mano contigo, con soluciones custom para tu caso.",
    "botonPrimario": "Quiero multiplicar mis ventas",
    "botonSecundario": "Conoce el método",
    "stats": [
      {
        "numero": 5,
        "sufijo": " Millones USD",
        "prefijo": "+$",
        "etiqueta": "facturados en business propios"
      },
      {
        "numero": 10,
        "sufijo": " años",
        "prefijo": "+",
        "etiqueta": "como entrepreneur y consultor"
      },
      {
        "numero": 8,
        "sufijo": " Millones USD",
        "prefijo": "$",
        "etiqueta": "generados para sus clientes"
      }
    ]
  },
  "marquesina": {
    "visible": true,
    "items": [
      "Real Estate",
      "B2B",
      "E-commerce",
      "Gastronomía",
      "Meta Ads",
      "Inteligencia Artificial",
      "CRM",
      "Sales Systems",
      "Scaling",
      "Growth"
    ]
  },
  "problema": {
    "visible": true,
    "tag": "La realidad de tu empresa",
    "titulo": "¿Te suena",
    "tituloDestacado": " familiar?",
    "subtitulo": "La mayoría de las empresas no tienen un problema de producto. <strong> Tienen un problema de sales system</strong>.",
    "tarjetas": [
      {
        "foto": "https://lpdqksuvccsocntditik.supabase.co/storage/v1/object/public/sitio/imagenes/1781512623448-ChatGPT_Image_Jun_15__2026__01_35_59_AM_.jpg",
        "icono": "👍",
        "texto": "Hacen posts bonitos que juntan likes y followers, pero al final del mes no se traducen en clientes nuevos ni en más revenue.",
        "titulo": "Le pagas a 1 persona o agencia que solo te genera likes"
      },
      {
        "foto": "https://lpdqksuvccsocntditik.supabase.co/storage/v1/object/public/sitio/imagenes/1781513166199-ChatGPT_Image_Jun_15__2026__01_45_58_AM.jpg",
        "icono": "📉",
        "texto": "Quemas budget en anuncios sin una estrategia que convierta clicks en clientes que pagan.",
        "titulo": "Inviertes en ads y no ves un ROI claro"
      },
      {
        "foto": "https://lpdqksuvccsocntditik.supabase.co/storage/v1/object/public/sitio/imagenes/1781513522607-ChatGPT_Image_Jun_15__2026__01_51_15_AM.jpg",
        "icono": "🕳️",
        "texto": "Sin CRM ni follow-up sistematizado, cada lead que se enfría es money que dejaste on the table.",
        "titulo": "Tus leads se pierden en el camino"
      },
      {
        "foto": "https://lpdqksuvccsocntditik.supabase.co/storage/v1/object/public/sitio/imagenes/1781513835060-ChatGPT_Image_Jun_15__2026__01_56_57_AM.jpg",
        "icono": "🎲",
        "texto": "Un mes bueno, tres malos. No tienes un sistema predecible que genere demand todos los días.",
        "titulo": "Tus ventas dependen de la suerte"
      },
      {
        "foto": "https://lpdqksuvccsocntditik.supabase.co/storage/v1/object/public/sitio/imagenes/1781514119943-ChatGPT_Image_Jun_15__2026__02_01_31_AM.jpg",
        "icono": "⏳",
        "texto": "Todo pasa por ti. Sin procesos ni automation, crecer significa trabajar más horas, no facturar más.",
        "titulo": "Eres el bottleneck de tu negocio"
      }
    ],
    "puente": "Si te hace sentido alguno de estos puntos, no necesitas otra agency que te venda humo.<br><strong>Necesitas un consultor que ya construyó lo que tú quieres construir.</strong>",
    "puenteBoton": "Hablemos de tu caso"
  },
  "servicios": {
    "visible": true,
    "tag": "Nuestros Servicicios",
    "titulo": "Todo lo que tu empresa necesita<br>para",
    "tituloDestacado": "vender más",
    "subtitulo": "No vendemos solo servicios sueltos. Construimos el combo exacto que tu business necesita para escalar y lograr tus objetivos.",
    "tarjetas": [
      {
        "foto": "https://lpdqksuvccsocntditik.supabase.co/storage/v1/object/public/sitio/imagenes/1781517770399-ChatGPT_Image_Jun_15__2026__03_02_15_AM.jpg",
        "icono": "monitor",
        "texto": "Sites y landing pages diseñadas con un solo goal: convertir visitantes en clientes. Diseño premium, speed y copy persuasivo.",
        "titulo": "Páginas web de alta conversión"
      },
      {
        "foto": "https://lpdqksuvccsocntditik.supabase.co/storage/v1/object/public/sitio/imagenes/1781518462635-ChatGPT_Image_Jun_15__2026__03_14_00_AM.jpg",
        "icono": "enviar",
        "texto": "Campañas en Facebook e Instagram con estrategia de funnel completo: creativos que detienen el scroll y optimización constante del ROI.",
        "titulo": "Meta Ads que sí venden"
      },
      {
        "foto": "https://lpdqksuvccsocntditik.supabase.co/storage/v1/object/public/sitio/imagenes/1781518698070-ChatGPT_Image_Jun_15__2026__03_17_56_AM.jpg",
        "icono": "grafica",
        "texto": "Análisis profundo de tu operación para encontrar las palancas que multiplican revenue: oferta, pricing, funnel, team y procesos.",
        "titulo": "Scaling de negocios"
      },
      {
        "foto": "https://lpdqksuvccsocntditik.supabase.co/storage/v1/object/public/sitio/imagenes/1781518944796-ChatGPT_Image_Jun_15__2026__03_22_04_AM.jpg",
        "icono": "ia",
        "texto": "Agentes de IA que atienden, califican y dan follow-up a tus leads 24/7. Automation que vende mientras tú duermes.",
        "titulo": "Inteligencia artificial aplicada"
      },
      {
        "foto": "https://lpdqksuvccsocntditik.supabase.co/storage/v1/object/public/sitio/imagenes/1781519824268-ChatGPT_Image_Jun_15__2026__03_34_45_AM.jpg",
        "icono": "equipo",
        "texto": "Implementamos el sistema que ordena tu pipeline: cada lead con follow-up, cada vendedor con proceso, cada venta medida.",
        "titulo": "CRM y sales systems"
      },
      {
        "foto": "https://lpdqksuvccsocntditik.supabase.co/storage/v1/object/public/sitio/imagenes/1781519886760-ChatGPT_Image_Jun_15__2026__03_37_55_AM.jpg",
        "icono": "global",
        "texto": "Estrategia 360°: branding, contenido, paid ads y conversión trabajando juntos para construir una máquina de demand constante.",
        "titulo": "Marketing digital integral"
      }
    ]
  },
  "metodo": {
    "visible": true,
    "tag": "El método",
    "titulo": "Análisis profundo. Execution",
    "tituloDestacado": "de la mano contigo.",
    "subtitulo": "Nada de recetas genéricas. Cada business recibe una solución custom para su caso.",
    "pasos": [
      {
        "texto": "Auditamos tu negocio completo: oferta, funnel, números, team y competencia. Encontramos exactamente dónde se está fugando el money.",
        "titulo": "Diagnóstico profundo"
      },
      {
        "texto": "Diseñamos el plan específico para tu caso: qué canales, qué oferta, qué sistema. Con goals claros y métricas que importan.",
        "titulo": "Estrategia custom"
      },
      {
        "texto": "No te dejamos un PDF y nos vamos. Implementamos contigo: campañas, web, CRM, IA y sales process funcionando en tu operación.",
        "titulo": "Execution conjunta"
      },
      {
        "texto": "Medimos, optimizamos y escalamos lo que funciona. El goal no es crecer una vez: es construir una máquina que multiplica.",
        "titulo": "Scaling continuo"
      }
    ]
  },
  "nichos": {
    "visible": true,
    "tag": "Nuestra Especialidad",
    "titulo": "Dominamos los nichos<br>donde",
    "tituloDestacado": "se mueve el money",
    "subtitulo": "Más de 10 años de experiencia concentrados en las industrias de mayor value.",
    "tarjetas": [
      {
        "foto": "https://lpdqksuvccsocntditik.supabase.co/storage/v1/object/public/sitio/imagenes/1781511472456-ChatGPT_Image_Jun_15__2026__01_09_57_AM_.jpg",
        "emoji": "🏢",
        "texto": "Sistemas de captación de buyers e inversionistas calificados para desarrollos, brokers e inmobiliarias. Menos visitas curiosas, más closings.",
        "estilo": "azul",
        "puntos": [
          "Leads calificados con budget real",
          "Follow-up automatizado con IA y CRM",
          "Funnels para preventa y entrega inmediata"
        ],
        "titulo": "Real Estate"
      },
      {
        "foto": "https://lpdqksuvccsocntditik.supabase.co/storage/v1/object/public/sitio/imagenes/1781511485291-ChatGPT_Image_Jun_15__2026__01_09_57_AM_.jpg",
        "emoji": "💼",
        "texto": "Para empresas que le venden a otras empresas: construimos un pipeline predecible de leads calificados y un sales process que cierra deals de alto ticket.",
        "estilo": "verde",
        "puntos": [
          "Lead gen B2B en LinkedIn y outbound",
          "Citas con decision makers, no curiosos",
          "Sales process y follow-up que cierra deals"
        ],
        "titulo": "B2B / Corporativo"
      },
      {
        "foto": "https://lpdqksuvccsocntditik.supabase.co/storage/v1/object/public/sitio/imagenes/1781511511478-ChatGPT_Image_Jun_15__2026__01_09_58_AM_.jpg",
        "emoji": "🛒",
        "texto": "Scaling de tiendas online con paid ads rentable, optimización de conversión y estrategias de recompra que elevan el value de cada cliente.",
        "estilo": "dorado",
        "puntos": [
          "Campañas de Meta Ads con ROAS rentable",
          "Optimización de conversión de la store",
          "Email, automation y recompra"
        ],
        "titulo": "E-commerce"
      },
      {
        "foto": "https://lpdqksuvccsocntditik.supabase.co/storage/v1/object/public/sitio/imagenes/1781511524233-ChatGPT_Image_Jun_15__2026__01_09_58_AM_.jpg",
        "emoji": "🍽️",
        "texto": "Restaurantes y marcas gastronómicas full todos los días: posicionamiento local, campañas que generan tráfico y sistemas de loyalty que hacen volver.",
        "estilo": "rojo",
        "puntos": [
          "Demand constante, no solo los weekends",
          "Branding y posicionamiento que se antoja",
          "Reservas y pedidos sistematizados"
        ],
        "titulo": "Gastronomía"
      }
    ]
  },
  "sobreFran": {
    "visible": true,
    "tag": "Sobre Fran Morishita",
    "titulo": "No es teoría.<br>Es",
    "tituloDestacado": "experiencia comprobada.",
    "foto": "https://lpdqksuvccsocntditik.supabase.co/storage/v1/object/public/sitio/imagenes/1781439320844-ChatGPT_Image_Jun_14__2026__02_37_33_AM.jpg",
    "iniciales": "FM",
    "tarjetaFlotante1Titulo": "+$13 MDD",
    "tarjetaFlotante1Texto": "Facturados",
    "tarjetaFlotante2Titulo": "+10 años",
    "tarjetaFlotante2Texto": "Como entrepreneur y consultor",
    "parrafos": [
      "Fran Morishita ha facturado <strong>más de $13 millones de USD en sus propios business</strong> y <strong>para sus clientes</strong> a lo largo de más de 10 años como entrepreneur y consultor de empresas.",
      "Su approach es distinto al de una agency tradicional: trabaja directo con <strong>dueños y CEOs</strong>, metiéndose a fondo en los números y la operación de cada negocio para construir soluciones custom que multiplican el revenue — no campañas genéricas que se ven bonitas y no venden."
    ],
    "cita": "“Mi trabajo no es ofrecerte marketing bonito, como otros en el mercado. Es construir contigo la máquina a la medida que multiplica tus ventas cada mes.”",
    "citaAutor": "— Fran Morishita",
    "boton": "Trabaja directo con Fran"
  },
  "comparativa": {
    "visible": true,
    "tag": "Lo que nos diferencia",
    "titulo": "Agency tradicional vs",
    "tituloDestacado": "Consultoría de Fran",
    "malaTitulo": "Una agency más",
    "malaItems": [
      "Te atiende un junior con 20 cuentas más, donde tu empresa no es prioridad.",
      "Reportes con métricas de vanidad como likes y reach que no generan ventas.",
      "El mismo template para todos los clientes, sin personalización.",
      "Cobra, entrega el trabajo a medias y se desentiende.",
      "Nunca ha operado y escalado un business propio como el tuyo."
    ],
    "buenaTitulo": "Fran Morishita - Business Consultant",
    "buenaItems": [
      "Trabajas directo con quien facturó +$13 Millones de USD.",
      "Reportes con métricas que importan de verdad como: Ventas, ROI y Áreas de oportunidad.",
      "Solución custom para tu caso específico, no hacemos lo mismo para todos los clientes.",
      "Execution de la mano dentro de tu operación, tomamos en cuenta el feedback semanal para ajustar nuestras estrategias.",
      "+10 años emprendiendo con money propio, tu presupuesto lo manejo como si fuera el mio, si tu inviertes $1 Dólar yo debo multiplicar mínimo el doble para tu rentabilidad."
    ]
  },
  "testimonios": {
    "visible": true,
    "tag": "Testimonios y colaboraciones",
    "titulo": "Resultados reales,<br>",
    "tituloDestacado": "no promesas al aire.",
    "subtitulo": "Empresarios y dueños de negocio que han trabajado de la mano con Fran y con quienes ha colaborado.",
    "videoTitulo": "Testimonio de Gus Marcos sobre Fran Morishita",
    "videoEmbed": "",
    "videoArchivo": "https://lpdqksuvccsocntditik.supabase.co/storage/v1/object/public/sitio/videos/1781439108055-TESTIMONIO_GUS_MARCOS_-_FRAN_MORISHITA.mp4",
    "videoPoster": "https://lpdqksuvccsocntditik.supabase.co/storage/v1/object/public/sitio/imagenes/1781508583168-Screen_Shot_2026-06-15_at_12_29_32_a_m_.jpg",
    "tarjetas": [
      {
        "rol": "Top Empresario · Monterrey, N.L. México",
        "foto": "https://lpdqksuvccsocntditik.supabase.co/storage/v1/object/public/sitio/imagenes/1781439262907-TESTIMONIO_GUS_MARCOS.jpg",
        "texto": "Colaboración y sociedad con “Gus Marcos”, lider referente en Real estate y emprendimiento en México, en estrategias de crecimiento, marketing digital y ventas, que generaron +3,000,000 Millones de USD.",
        "nombre": "Gus Marcos / Business Leader"
      }
    ]
  },
  "faq": {
    "visible": true,
    "tag": "Preguntas frecuentes",
    "titulo": "Lo que todo Dueño y CEO<br> se pregunta antes de empezar",
    "tituloDestacado": "",
    "items": [
      {
        "pregunta": "¿Esto es para mi tipo de business?",
        "respuesta": "Si eres dueño o CEO de un negocio de Real Estate, B2B, E-commerce o Gastronomía, estás en el centro de nuestra especialidad. Si estás en otra industria pero tienes un business operando y quieres escalarlo, agenda una call: el diagnóstico nos dirá si podemos multiplicar tus resultados."
      },
      {
        "pregunta": "¿En qué se diferencia de contratar una agency tradicional?",
        "respuesta": "Una agency ejecuta tácticas sueltas. Aquí trabajas directo con un consultor que ha operado sus propios negocios, que analiza tu empresa completa y construye el sistema que necesita: estrategia, web, ads, CRM, IA y sales process funcionando en conjunto."
      },
      {
        "pregunta": "¿Cuánto cuesta el consulting session?",
        "respuesta": "Cada solución se construye custom, por lo que la inversión depende de tu caso. La primera call de diagnóstico es gratis, te dará claridad sobre el plan y la inversión exacta antes de comprometerte a algo con nosotros."
      },
      {
        "pregunta": "¿Qué tan rápido veré resultados?",
        "respuesta": "Depende del punto de partida de tu negocio. Lo que sí garantizamos es un método: diagnóstico profundo, execution conjunta y optimización constante con métricas de sales reales — no métricas de vanidad."
      },
      {
        "pregunta": "¿Trabajan toda la implementación o solo asesoran?",
        "respuesta": "Ambas. El diferenciador de Fran es la execution de la mano con cada cliente: además de la estrategia, implementamos páginas web, campañas de Meta Ads, CRM, agentes de IA y sales systems dentro de tu operación."
      }
    ]
  },
  "contacto": {
    "visible": true,
    "tag": "Da el primer paso hoy",
    "titulo": "Agenda una sesión de<br>",
    "tituloDestacado": "discovery de 30 min gratis",
    "texto": "Una videollamada de 30 minutos para conocer tu business y ver si podemos trabajar juntos. Sin compromiso y sin venderte nada: solo claridad sobre tu mayor oportunidad de growth.",
    "bullets": [
      "Conocemos tu negocio, tus números y tus goals",
      "Detectamos tu oportunidad de growth más grande",
      "Definimos si somos el team correcto para ti"
    ],
    "urgencia": "⚡ Cupos limitados: Fran toma pocas calls al mes para dar profundidad a cada caso.",
    "calendlyUrl": "https://calendly.com/franmorishita/30min?hide_gdpr_banner=1"
  },
  "footer": {
    "descripcion": "Business consulting para dueños y CEOs que quieren multiplicar su facturación.",
    "derechos": "Todos los derechos reservados."
  }
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
