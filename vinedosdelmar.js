/* ============================================================
   VIÑEDOS DEL MAR — Página de propuesta para cliente
   ============================================================ */

// ---------- Documentos (orden = orden de lectura recomendado) ----------
const DOCS = [
  {
    archivo: "clientes/vinedosdelmar/01-situacion-actual.pdf",
    titulo: "Diagnóstico Comercial & de Marca",
    subtitulo: "Situación Actual",
    texto:
      "El producto está validado; el sistema para venderlo no existe. Radiografía completa: embudo comercial, presencia digital, arquitectura de marca y benchmark de la competencia.",
  },
  {
    archivo: "clientes/vinedosdelmar/02-plan-maestro-comercial.pdf",
    titulo: "Plan Maestro Comercial",
    subtitulo: "Plan Maestro",
    texto:
      "La matemática de la meta trabajada hacia atrás: de 1 a 10 ventas mensuales en 12 meses — embudo, buyer personas, equipo, CRM y disciplina de cierre.",
  },
  {
    archivo: "clientes/vinedosdelmar/03-plan-marketing-leads.pdf",
    titulo: "Plan de Marketing & Leads",
    subtitulo: "Marketing & Leads",
    texto:
      "El motor de demanda 360°: Meta, Google, YouTube, LinkedIn, radio, PR y eventos — con presupuesto, CPL objetivo y calendario por canal.",
  },
  {
    archivo: "clientes/vinedosdelmar/04-propuesta-integral.pdf",
    titulo: "Propuesta Viñedos del Mar",
    subtitulo: "Propuesta Integral",
    texto:
      "El sistema completo de seis módulos: branding, canales digitales, contenido, paid media, CRM con IA y medición — con timeline de implementación.",
  },
  {
    archivo: "clientes/vinedosdelmar/05-propuesta-economica.pdf",
    titulo: "Propuesta Económica",
    subtitulo: "Inversión",
    texto:
      "La inversión completa: implementación, operación mensual, pauta y medios — resumen anual y condiciones para arrancar.",
  },
];

const WHATSAPP_FRAN = "5216462563006";

// ---------- Candado (protección liviana en el cliente) ----------
// Nota: esto es una barrera de cortesía contra compartir el link por error o
// que un buscador lo indexe — no es seguridad real, ya que el HTML/JS es
// visible en el navegador. El SHA-256 solo evita que la contraseña se lea
// a simple vista en el código fuente.
const PASS_HASH = "6db5b421fa406129d33e03671903df27cdffd1ca48b24d15915504c42ad9760e";
const SESSION_KEY = "vdm_unlocked";

async function sha256(texto) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(texto));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function mostrarContenido() {
  document.getElementById("gate").remove();
  const doc = document.getElementById("doc");
  doc.hidden = false;
  initDoc();
}

document.getElementById("gateForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = document.getElementById("gatePass");
  const error = document.getElementById("gateError");
  const hash = await sha256(input.value.trim());
  if (hash === PASS_HASH) {
    sessionStorage.setItem(SESSION_KEY, "1");
    mostrarContenido();
  } else {
    error.hidden = false;
    input.value = "";
    input.focus();
  }
});

if (sessionStorage.getItem(SESSION_KEY) === "1") {
  mostrarContenido();
}

// ---------- Contenido (se arma solo tras desbloquear) ----------
function initDoc() {
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("waLink").href =
    `https://wa.me/${WHATSAPP_FRAN}?text=${encodeURIComponent(
      "Hola Fran, tengo una pregunta sobre la propuesta de Viñedos del Mar."
    )}`;

  const nav = document.getElementById("docnavInner");
  const wrap = document.getElementById("docsWrap");

  DOCS.forEach((d, i) => {
    const id = `doc-${i + 1}`;
    const num = String(i + 1).padStart(2, "0");

    // Nav
    const a = document.createElement("a");
    a.href = `#${id}`;
    a.innerHTML = `<em>${num}</em> ${d.subtitulo}`;
    nav.appendChild(a);

    // Documento
    const item = document.createElement("article");
    item.className = "docitem reveal";
    item.id = id;
    item.innerHTML = `
      <div class="docitem__head">
        <div>
          <span class="docitem__num">Documento ${num}</span>
          <h2>${d.titulo}</h2>
          <p>${d.texto}</p>
        </div>
        <div class="docitem__actions">
          <a class="btn-open" href="${d.archivo}" target="_blank" rel="noopener">Pantalla completa ↗</a>
          <a class="btn-dl" href="${d.archivo}" download>Descargar ⬇</a>
        </div>
      </div>
      <div class="docitem__viewer">
        <div class="docitem__loading">Cargando documento…</div>
        <iframe src="${d.archivo}#toolbar=1&view=FitH" title="${d.titulo}" loading="lazy"></iframe>
      </div>`;
    wrap.appendChild(item);

    const iframe = item.querySelector("iframe");
    const loading = item.querySelector(".docitem__loading");
    iframe.addEventListener("load", () => (loading.style.display = "none"));
  });

  // Resalta el link activo del nav mientras se hace scroll
  const links = [...nav.querySelectorAll("a")];
  const items = [...wrap.querySelectorAll(".docitem")];
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const idx = items.indexOf(entry.target);
        links.forEach((l) => l.classList.remove("active"));
        if (links[idx]) links[idx].classList.add("active");
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );
  items.forEach((it) => obs.observe(it));

  // Animaciones de aparición
  const reveal = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          reveal.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));
}
