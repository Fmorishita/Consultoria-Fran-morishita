/* ============================================================
   FRAN MORISHITA — Lógica del panel de administración
   Edita el borrador del contenido, lo previsualiza en vivo en un
   iframe y lo publica al sitio. También muestra los leads.
   ============================================================ */

const sb = window.supabase.createClient(SITE_SUPABASE_URL, SITE_SUPABASE_KEY);

/* ---------- Estado ---------- */
let draft = null;       // contenido en edición
let published = null;   // último contenido publicado
let seccionActiva = "hero";
let timerGuardado = null;
let leadsCache = [];

/* ---------- Utilidades ---------- */
const $ = (sel) => document.querySelector(sel);
const clonar = (obj) => JSON.parse(JSON.stringify(obj));

const getPath = (obj, path) =>
  path.split(".").reduce((acc, k) => (acc == null ? undefined : acc[k]), obj);

const setPath = (obj, path, valor) => {
  const partes = path.split(".");
  const ultima = partes.pop();
  const destino = partes.reduce((acc, k) => (acc[k] ??= {}), obj);
  destino[ultima] = valor;
};

const toast = (msg, tipo = "") => {
  const el = document.createElement("div");
  el.className = `toast ${tipo ? "toast--" + tipo : ""}`;
  el.textContent = msg;
  $("#toasts").appendChild(el);
  setTimeout(() => el.remove(), 3500);
};

const escAttr = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/* Redimensiona y comprime una imagen en el navegador antes de subirla.
   Devuelve un Blob JPEG ligero (máx 1600px de lado, calidad 0.85).
   Los SVG se suben tal cual porque no tiene sentido rasterizarlos. */
function optimizarImagen(file) {
  return new Promise((resolve, reject) => {
    if (file.type === "image/svg+xml") return resolve(file);
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const MAX = 1600;
      let { width, height } = img;
      if (width > MAX || height > MAX) {
        const escala = MAX / Math.max(width, height);
        width = Math.round(width * escala);
        height = Math.round(height * escala);
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff"; // fondo blanco para PNG con transparencia
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("No se pudo procesar la imagen"))),
        "image/jpeg",
        0.85
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("No se pudo leer la imagen"));
    };
    img.src = url;
  });
}

/* Sube un blob al bucket público "sitio" usando el token de la sesión.
   Lo hacemos con XHR manual (no con sb.storage.upload) porque el cliente
   de Storage no adjunta bien el token de usuario con las claves publicables,
   y la subida saldría como anónima (error de permisos RLS). XHR además da
   progreso de subida, útil para videos pesados.
   Sin x-upsert: cada archivo tiene nombre único (timestamp), así que nunca
   colisiona y evitamos exigir política de UPDATE en Storage. */
async function subirArchivo(ruta, blob, onProgress) {
  const { data } = await sb.auth.getSession();
  const token = data?.session?.access_token;
  if (!token) throw new Error("jwt: sesión no disponible");
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${SITE_SUPABASE_URL}/storage/v1/object/sitio/${ruta}`);
    xhr.setRequestHeader("apikey", SITE_SUPABASE_KEY);
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.setRequestHeader("Content-Type", blob.type || "application/octet-stream");
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) onProgress(e.loaded / e.total);
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300)
        resolve(`${SITE_SUPABASE_URL}/storage/v1/object/public/sitio/${ruta}`);
      else reject(new Error(`${xhr.status}: ${xhr.responseText}`));
    };
    xhr.onerror = () => reject(new Error("Error de red al subir el archivo"));
    xhr.send(blob);
  });
}

/* ---------- Esquema del editor ---------- */
const T = { texto: "texto", area: "textarea", html: "html", numero: "numero", color: "color", select: "select", imagen: "imagen", video: "video", listaTexto: "lista-texto", parrafos: "parrafos" };

const AYUDA_HTML = "Puedes usar <br> para salto de línea y <strong>texto</strong> para negritas doradas.";

const SCHEMA = [
  {
    id: "general", icono: "🧭", nombre: "General",
    desc: "Marca y datos para buscadores.",
    scroll: "#inicio",
    campos: [
      { path: "general.logo1", etiqueta: "Logo — primera palabra (blanca)", tipo: T.texto },
      { path: "general.logo2", etiqueta: "Logo — segunda palabra (dorada)", tipo: T.texto },
      { path: "general.botonNav", etiqueta: "Botón del menú superior", tipo: T.texto },
      { path: "general.metaTitulo", etiqueta: "Título en Google / pestaña del navegador", tipo: T.texto },
      { path: "general.metaDescripcion", etiqueta: "Descripción en Google", tipo: T.area },
    ],
  },
  {
    id: "diseno", icono: "🎨", nombre: "Diseño",
    desc: "Colores de acento del sitio. El dorado se usa en botones, títulos y detalles.",
    scroll: "#inicio",
    campos: [
      { path: "general.colorDorado", etiqueta: "Color principal (dorado)", tipo: T.color },
      { path: "general.colorDoradoClaro", etiqueta: "Color claro (brillos y degradados)", tipo: T.color },
      { path: "general.colorDoradoOscuro", etiqueta: "Color oscuro (sombras del degradado)", tipo: T.color },
    ],
  },
  {
    id: "hero", icono: "🏠", nombre: "Portada (Hero)",
    desc: "Lo primero que ve cada visitante. El título es tu gancho más importante.",
    scroll: "#inicio",
    campos: [
      { path: "hero.badge", etiqueta: "Insignia superior", tipo: T.texto },
      { path: "hero.titulo", etiqueta: "Título", tipo: T.html, ayuda: AYUDA_HTML },
      { path: "hero.tituloDestacado", etiqueta: "Título — parte dorada (al final)", tipo: T.texto },
      { path: "hero.subtitulo", etiqueta: "Subtítulo", tipo: T.html, ayuda: AYUDA_HTML },
      { path: "hero.botonPrimario", etiqueta: "Botón principal", tipo: T.texto },
      { path: "hero.botonSecundario", etiqueta: "Botón secundario", tipo: T.texto },
    ],
    lista: {
      path: "hero.stats", nombre: "Estadísticas (contadores animados)",
      plantilla: { prefijo: "+", numero: 10, sufijo: "", etiqueta: "Nueva estadística" },
      campos: [
        { sub: "prefijo", etiqueta: "Prefijo (ej. +$)", tipo: T.texto },
        { sub: "numero", etiqueta: "Número (se anima)", tipo: T.numero },
        { sub: "sufijo", etiqueta: "Sufijo (ej. MDP)", tipo: T.texto },
        { sub: "etiqueta", etiqueta: "Texto descriptivo", tipo: T.texto },
      ],
    },
  },
  {
    id: "marquesina", icono: "🎞️", nombre: "Marquesina",
    desc: "La cinta dorada en movimiento con tus especialidades.",
    scroll: ".marquee", visible: "marquesina.visible",
    campos: [
      { path: "marquesina.items", etiqueta: "Palabras de la marquesina", tipo: T.listaTexto, ayuda: "Una por línea." },
    ],
  },
  {
    id: "problema", icono: "⚡", nombre: "El problema",
    desc: "Los dolores con los que tu cliente ideal se identifica.",
    scroll: "#dolor", visible: "problema.visible",
    campos: [
      { path: "problema.tag", etiqueta: "Etiqueta de sección", tipo: T.texto },
      { path: "problema.titulo", etiqueta: "Título", tipo: T.html, ayuda: AYUDA_HTML },
      { path: "problema.tituloDestacado", etiqueta: "Título — parte dorada", tipo: T.texto },
      { path: "problema.subtitulo", etiqueta: "Subtítulo", tipo: T.html },
      { path: "problema.puente", etiqueta: "Texto puente (antes del botón)", tipo: T.html, ayuda: AYUDA_HTML },
      { path: "problema.puenteBoton", etiqueta: "Botón", tipo: T.texto },
    ],
    lista: {
      path: "problema.tarjetas", nombre: "Tarjetas de dolor",
      plantilla: { icono: "💡", titulo: "Nuevo dolor", texto: "Descripción del problema." },
      campos: [
        { sub: "icono", etiqueta: "Emoji", tipo: T.texto },
        { sub: "titulo", etiqueta: "Título", tipo: T.texto },
        { sub: "texto", etiqueta: "Texto", tipo: T.area },
      ],
    },
  },
  {
    id: "servicios", icono: "🛠️", nombre: "Servicios",
    desc: "Tu oferta completa, en tarjetas.",
    scroll: "#servicios", visible: "servicios.visible",
    campos: [
      { path: "servicios.tag", etiqueta: "Etiqueta de sección", tipo: T.texto },
      { path: "servicios.titulo", etiqueta: "Título", tipo: T.html, ayuda: AYUDA_HTML },
      { path: "servicios.tituloDestacado", etiqueta: "Título — parte dorada", tipo: T.texto },
      { path: "servicios.subtitulo", etiqueta: "Subtítulo", tipo: T.area },
    ],
    lista: {
      path: "servicios.tarjetas", nombre: "Tarjetas de servicios",
      plantilla: { icono: "estrella", titulo: "Nuevo servicio", texto: "Descripción del servicio." },
      campos: [
        { sub: "icono", etiqueta: "Icono", tipo: T.select, opciones: ["monitor", "enviar", "grafica", "ia", "equipo", "global", "estrella", "escudo", "rayo", "corazon", "dinero", "calendario"] },
        { sub: "titulo", etiqueta: "Título", tipo: T.texto },
        { sub: "texto", etiqueta: "Texto", tipo: T.area },
      ],
    },
  },
  {
    id: "metodo", icono: "🧩", nombre: "Método",
    desc: "Tus pasos de trabajo. Los números se generan solos (01, 02...).",
    scroll: "#metodo", visible: "metodo.visible",
    campos: [
      { path: "metodo.tag", etiqueta: "Etiqueta de sección", tipo: T.texto },
      { path: "metodo.titulo", etiqueta: "Título", tipo: T.html, ayuda: AYUDA_HTML },
      { path: "metodo.tituloDestacado", etiqueta: "Título — parte dorada", tipo: T.texto },
      { path: "metodo.subtitulo", etiqueta: "Subtítulo", tipo: T.area },
    ],
    lista: {
      path: "metodo.pasos", nombre: "Pasos del método",
      plantilla: { titulo: "Nuevo paso", texto: "Descripción del paso." },
      campos: [
        { sub: "titulo", etiqueta: "Título", tipo: T.texto },
        { sub: "texto", etiqueta: "Texto", tipo: T.area },
      ],
    },
  },
  {
    id: "nichos", icono: "🎯", nombre: "Nichos",
    desc: "Tus industrias de especialidad.",
    scroll: "#nichos", visible: "nichos.visible",
    campos: [
      { path: "nichos.tag", etiqueta: "Etiqueta de sección", tipo: T.texto },
      { path: "nichos.titulo", etiqueta: "Título", tipo: T.html, ayuda: AYUDA_HTML },
      { path: "nichos.tituloDestacado", etiqueta: "Título — parte dorada", tipo: T.texto },
      { path: "nichos.subtitulo", etiqueta: "Subtítulo", tipo: T.area },
    ],
    lista: {
      path: "nichos.tarjetas", nombre: "Tarjetas de nicho",
      plantilla: { emoji: "⭐", foto: "", estilo: "dorado", titulo: "Nuevo nicho", texto: "Descripción.", puntos: ["Beneficio 1", "Beneficio 2"] },
      campos: [
        { sub: "foto", etiqueta: "Imagen del nicho (opcional)", tipo: T.imagen, ayuda: "Si subes una imagen, reemplaza al emoji. Ideal horizontal." },
        { sub: "emoji", etiqueta: "Emoji (si no hay imagen)", tipo: T.texto },
        { sub: "estilo", etiqueta: "Color de fondo", tipo: T.select, opciones: ["azul", "verde", "dorado", "rojo"] },
        { sub: "titulo", etiqueta: "Título", tipo: T.texto },
        { sub: "texto", etiqueta: "Texto", tipo: T.area },
        { sub: "puntos", etiqueta: "Beneficios (uno por línea)", tipo: T.listaTexto },
      ],
    },
  },
  {
    id: "sobreFran", icono: "👤", nombre: "Sobre Fran",
    desc: "Tu historia y credenciales. Aquí va tu foto.",
    scroll: "#sobre-fran", visible: "sobreFran.visible",
    campos: [
      { path: "sobreFran.tag", etiqueta: "Etiqueta de sección", tipo: T.texto },
      { path: "sobreFran.titulo", etiqueta: "Título", tipo: T.html, ayuda: AYUDA_HTML },
      { path: "sobreFran.tituloDestacado", etiqueta: "Título — parte dorada", tipo: T.texto },
      { path: "sobreFran.foto", etiqueta: "Foto de Fran", tipo: T.imagen },
      { path: "sobreFran.iniciales", etiqueta: "Iniciales (si no hay foto)", tipo: T.texto },
      { path: "sobreFran.parrafos", etiqueta: "Párrafos de la biografía", tipo: T.parrafos, ayuda: "Separa cada párrafo con una línea vacía. " + AYUDA_HTML },
      { path: "sobreFran.cita", etiqueta: "Cita destacada", tipo: T.area },
      { path: "sobreFran.citaAutor", etiqueta: "Autor de la cita", tipo: T.texto },
      { path: "sobreFran.boton", etiqueta: "Botón", tipo: T.texto },
      { path: "sobreFran.tarjetaFlotante1Titulo", etiqueta: "Tarjeta flotante 1 — número", tipo: T.texto },
      { path: "sobreFran.tarjetaFlotante1Texto", etiqueta: "Tarjeta flotante 1 — texto", tipo: T.texto },
      { path: "sobreFran.tarjetaFlotante2Titulo", etiqueta: "Tarjeta flotante 2 — número", tipo: T.texto },
      { path: "sobreFran.tarjetaFlotante2Texto", etiqueta: "Tarjeta flotante 2 — texto", tipo: T.texto },
    ],
  },
  {
    id: "testimonios", icono: "⭐", nombre: "Testimonios",
    desc: "Video sobre ti, foto con Gus Marcos y testimonios de clientes.",
    scroll: "#testimonios", visible: "testimonios.visible",
    campos: [
      { path: "testimonios.tag", etiqueta: "Etiqueta de sección", tipo: T.texto },
      { path: "testimonios.titulo", etiqueta: "Título", tipo: T.html, ayuda: AYUDA_HTML },
      { path: "testimonios.tituloDestacado", etiqueta: "Título — parte dorada", tipo: T.texto },
      { path: "testimonios.subtitulo", etiqueta: "Subtítulo", tipo: T.area },
      { path: "testimonios.videoTitulo", etiqueta: "Título del video", tipo: T.texto },
      {
        path: "testimonios.videoEmbed",
        etiqueta: "Link de YouTube o Vimeo (recomendado)",
        tipo: T.texto,
        ayuda: "La forma recomendada: sube tu video a YouTube (puede ser “oculto”) y pega aquí el link. Es gratis, rápido y no consume tu almacenamiento. Si pones un link aquí, tiene prioridad sobre el archivo subido.",
      },
      {
        path: "testimonios.videoArchivo",
        etiqueta: "…o sube el archivo de video (máx 50 MB)",
        tipo: T.video,
        ayuda: "Alternativa si no quieres usar YouTube. Para videos de más de 50 MB usa el link de YouTube de arriba.",
      },
      {
        path: "testimonios.videoPoster",
        etiqueta: "Imagen de portada del video (opcional)",
        tipo: T.imagen,
        ayuda: "Se muestra antes de darle play (solo para video subido como archivo).",
      },
    ],
    lista: {
      path: "testimonios.tarjetas", nombre: "Testimonios y colaboraciones",
      plantilla: { foto: "", nombre: "Nombre del cliente", rol: "Empresa o ciudad", texto: "Lo que dijo sobre trabajar contigo." },
      campos: [
        { sub: "foto", etiqueta: "Foto", tipo: T.imagen },
        { sub: "nombre", etiqueta: "Nombre", tipo: T.texto },
        { sub: "rol", etiqueta: "Rol / empresa / ciudad", tipo: T.texto },
        { sub: "texto", etiqueta: "Testimonio o descripción", tipo: T.area },
      ],
    },
  },
  {
    id: "comparativa", icono: "⚖️", nombre: "Comparativa",
    desc: "Agencia tradicional vs. tu consultoría.",
    scroll: ".why", visible: "comparativa.visible",
    campos: [
      { path: "comparativa.tag", etiqueta: "Etiqueta de sección", tipo: T.texto },
      { path: "comparativa.titulo", etiqueta: "Título", tipo: T.html, ayuda: AYUDA_HTML },
      { path: "comparativa.tituloDestacado", etiqueta: "Título — parte dorada", tipo: T.texto },
      { path: "comparativa.malaTitulo", etiqueta: "Columna izquierda — título", tipo: T.texto },
      { path: "comparativa.malaItems", etiqueta: "Columna izquierda — puntos (✕)", tipo: T.listaTexto, ayuda: "Uno por línea." },
      { path: "comparativa.buenaTitulo", etiqueta: "Columna derecha — título", tipo: T.texto },
      { path: "comparativa.buenaItems", etiqueta: "Columna derecha — puntos (✓)", tipo: T.listaTexto, ayuda: "Uno por línea." },
    ],
  },
  {
    id: "faq", icono: "❓", nombre: "Preguntas (FAQ)",
    desc: "Responde objeciones antes de que detengan al prospecto.",
    scroll: "#faq", visible: "faq.visible",
    campos: [
      { path: "faq.tag", etiqueta: "Etiqueta de sección", tipo: T.texto },
      { path: "faq.titulo", etiqueta: "Título", tipo: T.html, ayuda: AYUDA_HTML },
    ],
    lista: {
      path: "faq.items", nombre: "Preguntas",
      plantilla: { pregunta: "¿Nueva pregunta?", respuesta: "Respuesta." },
      campos: [
        { sub: "pregunta", etiqueta: "Pregunta", tipo: T.texto },
        { sub: "respuesta", etiqueta: "Respuesta", tipo: T.area },
      ],
    },
  },
  {
    id: "contacto", icono: "✉️", nombre: "Contacto / Calendly",
    desc: "Sección final donde el visitante agenda una llamada por Calendly.",
    scroll: "#contacto",
    campos: [
      { path: "contacto.tag", etiqueta: "Etiqueta de sección", tipo: T.texto },
      { path: "contacto.titulo", etiqueta: "Título", tipo: T.html, ayuda: AYUDA_HTML },
      { path: "contacto.tituloDestacado", etiqueta: "Título — parte dorada", tipo: T.texto },
      { path: "contacto.texto", etiqueta: "Texto", tipo: T.html },
      { path: "contacto.bullets", etiqueta: "Beneficios (✓)", tipo: T.listaTexto, ayuda: "Uno por línea." },
      { path: "contacto.urgencia", etiqueta: "Mensaje de urgencia", tipo: T.html },
      {
        path: "contacto.calendlyUrl",
        etiqueta: "Link de tu evento de Calendly",
        tipo: T.texto,
        ayuda: "Ej: https://calendly.com/franmorishita/30min — Las preguntas al lead (nombre, WhatsApp, email, giro, problema, web/redes) se configuran DENTRO de Calendly, en las preguntas del invitado de tu evento. Así no se piden dos veces.",
      },
    ],
  },
  {
    id: "footer", icono: "📄", nombre: "Pie de página",
    desc: "Cierre del sitio.",
    scroll: ".footer",
    campos: [
      { path: "footer.descripcion", etiqueta: "Descripción", tipo: T.area },
      { path: "footer.derechos", etiqueta: "Texto de derechos", tipo: T.texto },
    ],
  },
];

/* ============================================================
   AUTENTICACIÓN
   ============================================================ */
let emailActual = "";
let cerrandoSesion = false;

const esErrorAuth = (error) =>
  !!error &&
  /jwt|JWT|token|expired|401|403|row-level security|Unauthorized|not authenticated|invalid claim/i.test(
    `${error.message || ""} ${error.code || ""} ${error.status || ""}`
  );

/* Garantiza que haya una sesión válida; refresca si está por expirar.
   Devuelve false si la sesión ya no sirve (hay que reconectar). */
async function asegurarSesion() {
  const { data } = await sb.auth.getSession();
  const session = data?.session;
  if (!session) return false;
  if (session.expires_at && session.expires_at * 1000 - Date.now() < 120000) {
    const { data: ref, error } = await sb.auth.refreshSession();
    if (error || !ref?.session) return false;
  }
  return true;
}

$("#loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = $("#loginBtn");
  btn.disabled = true;
  btn.textContent = "Entrando...";
  $("#loginError").hidden = true;
  const { error } = await sb.auth.signInWithPassword({
    email: $("#loginEmail").value.trim(),
    password: $("#loginPass").value,
  });
  btn.disabled = false;
  btn.textContent = "Entrar";
  if (error) {
    $("#loginError").textContent = "Correo o contraseña incorrectos.";
    $("#loginError").hidden = false;
    return;
  }
  iniciarApp();
});

$("#btnSalir")?.addEventListener("click", async () => {
  cerrandoSesion = true;
  await sb.auth.signOut();
  window.location.reload();
});

$("#btnPass")?.addEventListener("click", async () => {
  const nueva = prompt("Nueva contraseña (mínimo 8 caracteres):");
  if (!nueva) return;
  if (nueva.length < 8) return toast("La contraseña debe tener al menos 8 caracteres.", "error");
  const { error } = await sb.auth.updateUser({ password: nueva });
  if (error) return toast("No se pudo cambiar: " + error.message, "error");
  toast("Contraseña actualizada ✓. Tu sesión sigue activa aquí.", "ok");
});

/* ---------- Reconexión cuando la sesión expira ---------- */
function mostrarReconectar() {
  const vista = $("#reconectarView");
  if (!vista.hidden) return; // ya visible
  vista.hidden = false;
  $("#recPass").value = "";
  $("#recPass").focus();
  $("#autosaveInfo").textContent = "⚠ Reconecta para guardar";
}

$("#reconectarForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = $("#recBtn");
  btn.disabled = true;
  btn.textContent = "Reconectando...";
  $("#recError").hidden = true;
  const { error } = await sb.auth.signInWithPassword({
    email: emailActual,
    password: $("#recPass").value,
  });
  btn.disabled = false;
  btn.textContent = "Reconectar y guardar";
  if (error) {
    $("#recError").textContent = "Contraseña incorrecta. Intenta de nuevo.";
    $("#recError").hidden = false;
    return;
  }
  $("#reconectarView").hidden = true;
  toast("Reconectado ✓ Guardando tus cambios…", "ok");
  await guardarBorradorAhora(); // persiste lo que estaba pendiente
});

$("#recSalir")?.addEventListener("click", async () => {
  cerrandoSesion = true;
  await sb.auth.signOut();
  window.location.reload();
});

/* ============================================================
   CARGA Y GUARDADO DE CONTENIDO
   ============================================================ */
async function cargarConfig() {
  const { data, error } = await sb.from("site_config").select("key, content");
  if (error) toast("Error al cargar el contenido: " + error.message, "error");
  const filas = Object.fromEntries((error ? [] : data || []).map((r) => [r.key, r.content]));
  published = filas.published ? mergeContent(DEFAULT_CONTENT, filas.published) : null;
  draft = mergeContent(DEFAULT_CONTENT, filas.draft || filas.published || {});
  actualizarChip();
}

/* Hace el guardado real del borrador, con reintento tras refrescar la
   sesión y, si de plano expiró, pide reconectar sin perder los cambios. */
async function guardarBorradorAhora() {
  if (!draft) return;
  $("#autosaveInfo").textContent = "Guardando…";
  if (!(await asegurarSesion())) {
    mostrarReconectar();
    return;
  }
  let { error } = await sb.from("site_config").upsert({ key: "draft", content: draft });
  if (error && esErrorAuth(error)) {
    await sb.auth.refreshSession();
    ({ error } = await sb.from("site_config").upsert({ key: "draft", content: draft }));
  }
  if (!error) {
    $("#autosaveInfo").textContent = "Borrador guardado ✓";
  } else if (esErrorAuth(error)) {
    mostrarReconectar();
  } else {
    $("#autosaveInfo").textContent = "⚠ No se pudo guardar";
    toast("Error al guardar el borrador: " + error.message, "error");
  }
}

function guardarBorrador() {
  clearTimeout(timerGuardado);
  $("#autosaveInfo").textContent = "Guardando…";
  timerGuardado = setTimeout(guardarBorradorAhora, 700);
}

/* Guarda de inmediato lo pendiente (al salir de un campo o cerrar pestaña). */
function flushGuardado() {
  if (timerGuardado) {
    clearTimeout(timerGuardado);
    timerGuardado = null;
    guardarBorradorAhora();
  }
}
window.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") flushGuardado();
});

function actualizarChip() {
  const chip = $("#statusChip");
  const igual = published && JSON.stringify(draft) === JSON.stringify(published);
  if (igual) {
    chip.textContent = "✓ Todo publicado";
    chip.className = "chip chip--ok";
  } else {
    chip.textContent = "● Cambios sin publicar";
    chip.className = "chip chip--dirty";
  }
}

function alCambiar() {
  enviarPreview();
  guardarBorrador();
  actualizarChip();
}

$("#btnPublicar").addEventListener("click", async () => {
  if (!confirm("¿Publicar los cambios? El sitio en vivo se actualizará al instante.")) return;
  flushGuardado();
  if (!(await asegurarSesion())) return mostrarReconectar();
  let { error } = await sb.from("site_config").upsert({ key: "published", content: draft });
  if (error && esErrorAuth(error)) {
    await sb.auth.refreshSession();
    ({ error } = await sb.from("site_config").upsert({ key: "published", content: draft }));
  }
  if (error) {
    if (esErrorAuth(error)) return mostrarReconectar();
    return toast("Error al publicar: " + error.message, "error");
  }
  published = clonar(draft);
  actualizarChip();
  toast("🚀 Cambios publicados. Tu sitio ya está actualizado.", "ok");
});

$("#btnDescartar").addEventListener("click", async () => {
  if (!confirm("¿Descartar el borrador y volver a la última versión publicada?")) return;
  if (!(await asegurarSesion())) return mostrarReconectar();
  draft = clonar(published || DEFAULT_CONTENT);
  await sb.from("site_config").upsert({ key: "draft", content: draft });
  renderEditor();
  enviarPreview();
  actualizarChip();
  toast("Borrador restaurado a la versión publicada.", "ok");
});

/* ============================================================
   VISTA PREVIA
   ============================================================ */
const frame = () => $("#previewFrame");

function enviarPreview() {
  if (!draft) return;
  frame().contentWindow?.postMessage({ type: "preview-config", config: draft }, window.location.origin);
}

window.addEventListener("message", (e) => {
  if (e.origin !== window.location.origin) return;
  if (e.data?.type === "preview-ready") enviarPreview();
});

$("#btnReload").addEventListener("click", () => {
  frame().src = "/?preview=1";
});

document.querySelectorAll(".devbtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".devbtn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    frame().classList.toggle("movil", btn.dataset.w !== "100%");
  });
});

$("#btnPreviewToggle").addEventListener("click", () => {
  const abierta = $("#previewWrap").classList.toggle("abierta");
  $("#btnPreviewToggle").textContent = abierta ? "✕ Cerrar vista previa" : "👁 Vista previa";
});

function scrollPreviewA(selector) {
  frame().contentWindow?.postMessage({ type: "scroll-to", selector }, window.location.origin);
}

/* ============================================================
   EDITOR
   ============================================================ */
function renderSidebar() {
  const nav = $("#sidebar");
  nav.innerHTML =
    SCHEMA.map(
      (s) => `<button class="sidebar__item ${s.id === seccionActiva ? "active" : ""}" data-id="${s.id}">
        <span>${s.icono}</span> ${s.nombre}</button>`
    ).join("") +
    `<div class="sidebar__sep"></div>
     <button class="sidebar__item ${seccionActiva === "leads" ? "active" : ""}" data-id="leads"><span>📥</span> Leads</button>`;

  nav.querySelectorAll(".sidebar__item").forEach((btn) => {
    btn.addEventListener("click", () => {
      seccionActiva = btn.dataset.id;
      renderSidebar();
      if (seccionActiva === "leads") {
        mostrarLeads();
      } else {
        $("#leadsView").hidden = true;
        $("#editorWrap").style.display = "";
        $("#previewWrap").style.display = "";
        renderEditor();
        const s = SCHEMA.find((x) => x.id === seccionActiva);
        if (s?.scroll) scrollPreviewA(s.scroll);
      }
    });
  });
}

function renderEditor() {
  const s = SCHEMA.find((x) => x.id === seccionActiva);
  if (!s) return;
  const cont = $("#editor");
  cont.innerHTML = `<h2 class="seccion-titulo">${s.icono} ${s.nombre}</h2><p class="seccion-desc">${s.desc}</p>`;

  /* Interruptor de visibilidad de la sección */
  if (s.visible) {
    const visible = getPath(draft, s.visible) !== false;
    const div = document.createElement("div");
    div.className = "visibilidad";
    div.innerHTML = `<span>Sección visible en el sitio</span>
      <label class="switch"><input type="checkbox" ${visible ? "checked" : ""} /><i></i></label>`;
    div.querySelector("input").addEventListener("change", (e) => {
      setPath(draft, s.visible, e.target.checked);
      alCambiar();
    });
    cont.appendChild(div);
  }

  s.campos.forEach((campo) => cont.appendChild(renderCampo(campo)));
  if (s.lista) cont.appendChild(renderLista(s.lista));
}

function renderCampo(campo, contexto = draft, prefijo = "") {
  const path = prefijo ? `${prefijo}.${campo.sub}` : campo.path;
  const valor = getPath(draft, path);
  const div = document.createElement("div");
  div.className = "campo";
  const id = "campo_" + path.replace(/\./g, "_");

  const etiqueta = `<label for="${id}">${campo.etiqueta}</label>`;
  const ayuda = campo.ayuda ? `<span class="ayuda">${campo.ayuda}</span>` : "";

  switch (campo.tipo) {
    case T.texto:
    case T.numero: {
      div.innerHTML = `${etiqueta}<input type="${campo.tipo === T.numero ? "number" : "text"}" id="${id}" value="${escAttr(valor)}" />${ayuda}`;
      div.querySelector("input").addEventListener("input", (e) => {
        setPath(draft, path, campo.tipo === T.numero ? Number(e.target.value) || 0 : e.target.value);
        actualizarTituloItem(e.target);
        alCambiar();
      });
      break;
    }
    case T.area:
    case T.html: {
      div.innerHTML = `${etiqueta}<textarea id="${id}" rows="3">${escAttr(valor)}</textarea>${ayuda}`;
      div.querySelector("textarea").addEventListener("input", (e) => {
        setPath(draft, path, e.target.value);
        alCambiar();
      });
      break;
    }
    case T.parrafos: {
      const texto = Array.isArray(valor) ? valor.join("\n\n") : "";
      div.innerHTML = `${etiqueta}<textarea id="${id}" rows="10">${escAttr(texto)}</textarea>${ayuda}`;
      div.querySelector("textarea").addEventListener("input", (e) => {
        setPath(draft, path, e.target.value.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean));
        alCambiar();
      });
      break;
    }
    case T.listaTexto: {
      const lineas = Array.isArray(valor) ? valor.join("\n") : "";
      div.innerHTML = `${etiqueta}<textarea id="${id}" rows="${Math.max(3, (valor || []).length + 1)}">${escAttr(lineas)}</textarea>${ayuda}`;
      div.querySelector("textarea").addEventListener("input", (e) => {
        setPath(draft, path, e.target.value.split("\n").map((l) => l.trim()).filter(Boolean));
        alCambiar();
      });
      break;
    }
    case T.select: {
      div.innerHTML = `${etiqueta}<select id="${id}">${campo.opciones
        .map((o) => `<option ${o === valor ? "selected" : ""}>${o}</option>`)
        .join("")}</select>${ayuda}`;
      div.querySelector("select").addEventListener("change", (e) => {
        setPath(draft, path, e.target.value);
        alCambiar();
      });
      break;
    }
    case T.color: {
      div.innerHTML = `${etiqueta}<div class="campo--color">
        <input type="color" value="${escAttr(valor)}" />
        <input type="text" id="${id}" value="${escAttr(valor)}" /></div>${ayuda}`;
      const [picker, texto] = div.querySelectorAll("input");
      picker.addEventListener("input", (e) => {
        texto.value = e.target.value;
        setPath(draft, path, e.target.value);
        alCambiar();
      });
      texto.addEventListener("input", (e) => {
        if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) {
          picker.value = e.target.value;
          setPath(draft, path, e.target.value);
          alCambiar();
        }
      });
      break;
    }
    case T.imagen: {
      div.className = "campo campo--imagen";
      const render = () => {
        const url = getPath(draft, path);
        div.innerHTML = `${etiqueta}
          <div class="img-preview">${url ? `<img src="${escAttr(url)}" alt="" />` : "Sin imagen — se muestran las iniciales"}</div>
          <div class="img-acciones">
            <label class="btn btn--ghost btn--small" style="cursor:pointer">📤 Subir imagen<input type="file" accept="image/*" hidden /></label>
            ${url ? '<button type="button" class="btn btn--ghost btn--small btn--peligro">Quitar</button>' : ""}
          </div>
          <span class="subiendo" hidden>Subiendo imagen…</span>${ayuda}`;
        const inputFile = div.querySelector("input[type=file]");
        inputFile.addEventListener("change", async (e) => {
          const file = e.target.files[0];
          if (!file) return;
          if (!file.type.startsWith("image/")) {
            inputFile.value = "";
            return toast("Ese archivo no es una imagen.", "error");
          }
          const aviso = div.querySelector(".subiendo");
          aviso.hidden = false;
          aviso.textContent = "Optimizando imagen…";
          try {
            // 1) Comprimir/redimensionar en el navegador (rápido y evita límites de tamaño)
            const blob = await optimizarImagen(file);
            aviso.textContent = "Subiendo imagen…";
            const ext = blob.type === "image/svg+xml" ? "svg" : "jpg";
            const base = (file.name.replace(/\.[^.]+$/, "") || "imagen").replace(/[^a-zA-Z0-9\-_]/g, "_").slice(0, 40);
            const ruta = `imagenes/${Date.now()}-${base}.${ext}`;
            const publicUrl = await subirArchivo(ruta, blob);
            setPath(draft, path, publicUrl);
            render();
            alCambiar();
            toast("Imagen subida y guardada ✓", "ok");
          } catch (err) {
            const msg = (err && err.message) || "";
            if (esErrorAuth(err)) {
              mostrarReconectar();
            } else if (/exceeded|size|413|too large/i.test(msg)) {
              toast("La imagen es demasiado grande incluso optimizada. Usa uno menos pesado.", "error");
            } else {
              toast("No se pudo subir la imagen: " + (msg || "error desconocido"), "error");
            }
            aviso.hidden = true;
            inputFile.value = "";
          }
        });
        div.querySelector(".btn--peligro")?.addEventListener("click", () => {
          setPath(draft, path, "");
          render();
          alCambiar();
        });
      };
      render();
      break;
    }
    case T.video: {
      div.className = "campo campo--video";
      const MAX_MB = 50;
      const render = () => {
        const url = getPath(draft, path);
        div.innerHTML = `${etiqueta}
          <div class="video-preview">${
            url
              ? `<video src="${escAttr(url)}" controls preload="metadata"></video>`
              : "Sin video subido"
          }</div>
          <div class="img-acciones">
            <label class="btn btn--ghost btn--small" style="cursor:pointer">📤 Subir video<input type="file" accept="video/*" hidden /></label>
            ${url ? '<button type="button" class="btn btn--ghost btn--small btn--peligro">Quitar</button>' : ""}
          </div>
          <div class="progreso" hidden><div class="progreso__barra"></div><span class="progreso__txt"></span></div>${ayuda}`;
        const inputFile = div.querySelector("input[type=file]");
        inputFile.addEventListener("change", async (e) => {
          const file = e.target.files[0];
          if (!file) return;
          if (!file.type.startsWith("video/")) {
            inputFile.value = "";
            return toast("Ese archivo no es un video.", "error");
          }
          if (file.size > MAX_MB * 1024 * 1024) {
            inputFile.value = "";
            return toast(
              `El video pesa ${(file.size / 1024 / 1024).toFixed(0)} MB y el máximo es ${MAX_MB} MB. Para videos más pesados, sube el video a YouTube y pega el link arriba.`,
              "error"
            );
          }
          const prog = div.querySelector(".progreso");
          const barra = div.querySelector(".progreso__barra");
          const txt = div.querySelector(".progreso__txt");
          prog.hidden = false;
          try {
            const ext = (file.name.match(/\.[a-zA-Z0-9]+$/) || [".mp4"])[0];
            const base = (file.name.replace(/\.[^.]+$/, "") || "video").replace(/[^a-zA-Z0-9\-_]/g, "_").slice(0, 40);
            const ruta = `videos/${Date.now()}-${base}${ext}`;
            const publicUrl = await subirArchivo(ruta, file, (p) => {
              barra.style.width = `${Math.round(p * 100)}%`;
              txt.textContent = `${Math.round(p * 100)}%`;
            });
            setPath(draft, path, publicUrl);
            render();
            alCambiar();
            toast("Video subido y guardado ✓", "ok");
          } catch (err) {
            const msg = (err && err.message) || "";
            if (esErrorAuth(err)) {
              mostrarReconectar();
            } else if (/exceeded|413|too large|payload/i.test(msg)) {
              toast(`El video supera el límite de ${MAX_MB} MB. Súbelo a YouTube y pega el link arriba.`, "error");
            } else {
              toast("No se pudo subir el video: " + (msg || "error desconocido"), "error");
            }
            prog.hidden = true;
            inputFile.value = "";
          }
        });
        div.querySelector(".btn--peligro")?.addEventListener("click", () => {
          setPath(draft, path, "");
          render();
          alCambiar();
        });
      };
      render();
      break;
    }
  }
  // Al salir de cualquier campo, guardar de inmediato lo pendiente.
  div.querySelectorAll("input, textarea, select").forEach((el) =>
    el.addEventListener("blur", flushGuardado)
  );
  return div;
}

/* Listas de elementos (tarjetas, pasos, preguntas...) */
function renderLista(def) {
  const wrap = document.createElement("div");

  const render = () => {
    const items = getPath(draft, def.path) || [];
    wrap.innerHTML = `<div class="campo"><label>${def.nombre} <span class="ayuda">(${items.length} elementos)</span></label></div>
      <div class="lista-items"></div>
      <button type="button" class="btn btn--ghost btn--small">＋ Agregar elemento</button>`;
    const cont = wrap.querySelector(".lista-items");

    items.forEach((item, i) => {
      const card = document.createElement("div");
      card.className = "item-card";
      const tituloItem = item.titulo || item.pregunta || item.etiqueta || `Elemento ${i + 1}`;
      card.innerHTML = `
        <div class="item-card__head">
          <strong>${i + 1}. ${escAttr(tituloItem)}</strong>
          <button type="button" class="mini" data-acc="subir" title="Subir">↑</button>
          <button type="button" class="mini" data-acc="bajar" title="Bajar">↓</button>
          <button type="button" class="mini mini--del" data-acc="borrar" title="Eliminar">🗑</button>
        </div>
        <div class="item-card__body"></div>`;

      const body = card.querySelector(".item-card__body");
      def.campos.forEach((c) => body.appendChild(renderCampo(c, draft, `${def.path}.${i}`)));

      card.querySelector(".item-card__head").addEventListener("click", (e) => {
        if (e.target.closest(".mini")) return;
        card.classList.toggle("abierto");
      });

      card.querySelectorAll(".mini").forEach((btn) => {
        btn.addEventListener("click", () => {
          const arr = getPath(draft, def.path);
          const acc = btn.dataset.acc;
          if (acc === "borrar") {
            if (!confirm("¿Eliminar este elemento?")) return;
            arr.splice(i, 1);
          }
          if (acc === "subir" && i > 0) [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
          if (acc === "bajar" && i < arr.length - 1) [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]];
          render();
          alCambiar();
        });
      });

      cont.appendChild(card);
    });

    wrap.querySelector(".btn").addEventListener("click", () => {
      getPath(draft, def.path).push(clonar(def.plantilla));
      render();
      wrap.querySelectorAll(".item-card").forEach((c, idx, all) => {
        if (idx === all.length - 1) c.classList.add("abierto");
      });
      alCambiar();
    });
  };

  render();
  return wrap;
}

/* Actualiza el título de la tarjeta de lista mientras se escribe */
function actualizarTituloItem(input) {
  const card = input.closest(".item-card");
  if (!card) return;
  const id = input.id;
  if (!/_titulo$|_pregunta$|_etiqueta$/.test(id)) return;
  const strong = card.querySelector(".item-card__head strong");
  const num = strong.textContent.split(".")[0];
  strong.textContent = `${num}. ${input.value}`;
}

/* ============================================================
   LEADS
   ============================================================ */
async function cargarLeads() {
  const { data, error } = await sb
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1000);
  if (error) {
    toast("Error al cargar leads: " + error.message, "error");
    return [];
  }
  return data || [];
}

function renderLeads(leads) {
  const body = $("#leadsBody");
  $("#leadsCount").textContent = `${leads.length} lead${leads.length === 1 ? "" : "s"} capturado${leads.length === 1 ? "" : "s"}`;
  if (!leads.length) {
    body.innerHTML = `<tr><td colspan="8" class="vacio">Aún no hay leads. En cuanto alguien llene el formulario aparecerá aquí.</td></tr>`;
    return;
  }
  body.innerHTML = leads
    .map((l) => {
      const fecha = new Date(l.created_at).toLocaleString("es-MX", { dateStyle: "medium", timeStyle: "short" });
      const tel = (l.telefono || "").replace(/\D/g, "");
      const campana = [l.utm_source, l.utm_campaign].filter(Boolean).join(" / ") || "—";
      return `<tr>
        <td>${fecha}</td>
        <td><strong>${escAttr(l.nombre)}</strong></td>
        <td><a href="https://wa.me/${tel}" target="_blank" rel="noopener">${escAttr(l.telefono)}</a></td>
        <td><a href="mailto:${escAttr(l.email)}">${escAttr(l.email)}</a></td>
        <td>${escAttr(l.giro || "—")}</td>
        <td>${escAttr(l.facturacion || "—")}</td>
        <td>${escAttr(l.mensaje || "—")}</td>
        <td>${escAttr(campana)}</td>
      </tr>`;
    })
    .join("");
}

async function mostrarLeads() {
  $("#editorWrap").style.display = "none";
  $("#previewWrap").style.display = "none";
  $("#leadsView").hidden = false;
  leadsCache = await cargarLeads();
  renderLeads(leadsCache);
}

$("#leadsSearch").addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase();
  renderLeads(
    leadsCache.filter((l) =>
      [l.nombre, l.email, l.telefono, l.giro, l.facturacion, l.mensaje, l.utm_source, l.utm_campaign]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    )
  );
});

$("#btnLeadsRefresh").addEventListener("click", async () => {
  leadsCache = await cargarLeads();
  renderLeads(leadsCache);
  toast("Leads actualizados ✓", "ok");
});

$("#btnLeadsCSV").addEventListener("click", () => {
  const cols = ["created_at", "nombre", "telefono", "email", "giro", "facturacion", "mensaje", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "pagina"];
  const filas = [cols.join(",")].concat(
    leadsCache.map((l) => cols.map((c) => `"${String(l[c] ?? "").replace(/"/g, '""')}"`).join(","))
  );
  const blob = new Blob(["﻿" + filas.join("\n")], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
});

/* ============================================================
   ARRANQUE
   ============================================================ */
async function iniciarApp() {
  $("#loginView").style.display = "none";
  $("#reconectarView").hidden = true;
  $("#appView").hidden = false;
  if (window.innerWidth <= 1100) $("#btnPreviewToggle").hidden = false;
  const { data: sd } = await sb.auth.getSession();
  emailActual = sd?.session?.user?.email || emailActual;
  await cargarConfig();
  renderSidebar();
  renderEditor();
  enviarPreview();
}

(async () => {
  const { data } = await sb.auth.getSession();
  if (data?.session) iniciarApp();
  sb.auth.onAuthStateChange((evento) => {
    // Si la sesión cae sola (token no renovable) NO recargamos para no perder
    // el borrador en memoria: mostramos el aviso de reconexión.
    if (evento === "SIGNED_OUT") {
      if (cerrandoSesion) window.location.reload();
      else if (!$("#appView").hidden) mostrarReconectar();
    }
  });
})();
