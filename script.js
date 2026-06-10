/* ============================================================
   FRAN MORISHITA — Interacciones de la landing page
   ============================================================ */

// ---------- Navegación: fondo al hacer scroll ----------
const nav = document.getElementById("nav");

const onScroll = () => {
  nav.classList.toggle("scrolled", window.scrollY > 40);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ---------- Menú móvil ----------
const burger = document.getElementById("navBurger");
const navLinks = document.getElementById("navLinks");

burger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  burger.classList.toggle("open", open);
  document.body.style.overflow = open ? "hidden" : "";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    burger.classList.remove("open");
    document.body.style.overflow = "";
  });
});

// ---------- Animaciones de aparición al hacer scroll ----------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".reveal, .method__step").forEach((el) => revealObserver.observe(el));

// ---------- Contadores animados ----------
const animateCounter = (el) => {
  const target = Number(el.dataset.target);
  const duration = 1800;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    // easing out-expo para que frene suave al final
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    el.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

document.querySelectorAll(".counter").forEach((el) => counterObserver.observe(el));

// ---------- Efecto de luz que sigue el cursor en las tarjetas de servicio ----------
document.querySelectorAll(".service").forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  });
});

// ---------- Formulario de leads ----------
// Por defecto envía el lead a WhatsApp con un mensaje pre-armado.
// Para conectar un backend (Formspree, Make, CRM, etc.) reemplaza
// la lógica dentro de submit por un fetch() a tu endpoint.
const WHATSAPP_NUMBER = "521XXXXXXXXXX"; // ← Reemplazar por el número real

const form = document.getElementById("leadForm");
const successMsg = document.getElementById("formSuccess");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let valid = true;
  form.querySelectorAll("[required]").forEach((field) => {
    const empty = !field.value.trim();
    field.classList.toggle("error", empty);
    if (empty) valid = false;
  });

  const email = form.email;
  if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    email.classList.add("error");
    valid = false;
  }

  if (!valid) return;

  const data = new FormData(form);
  const mensaje = [
    "Hola Fran, quiero agendar una sesión de diagnóstico.",
    `Nombre: ${data.get("nombre")}`,
    `WhatsApp: ${data.get("telefono")}`,
    `Email: ${data.get("email")}`,
    `Giro: ${data.get("giro")}`,
    `Facturación mensual: ${data.get("facturacion")}`,
    data.get("mensaje") ? `Reto principal: ${data.get("mensaje")}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`,
    "_blank"
  );

  successMsg.hidden = false;
  form.reset();
});

// Quitar marca de error al escribir
form.querySelectorAll("input, select, textarea").forEach((field) => {
  field.addEventListener("input", () => field.classList.remove("error"));
});

// ---------- Año dinámico en el footer ----------
document.getElementById("year").textContent = new Date().getFullYear();
