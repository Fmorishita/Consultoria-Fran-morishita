/* ============================================================
   FRAN MORISHITA — Interacciones de la landing page
   El content-loader llama a initOnce() tras el primer render y a
   initDynamic() después de cada repintado (modo preview).
   ============================================================ */

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

// Engancha animaciones a los elementos presentes (se llama tras cada render)
window.initDynamic = () => {
  document.querySelectorAll(".reveal:not([data-anim]), .method__step:not([data-anim])").forEach((el) => {
    el.setAttribute("data-anim", "1");
    revealObserver.observe(el);
  });
  document.querySelectorAll(".counter:not([data-anim])").forEach((el) => {
    el.setAttribute("data-anim", "1");
    counterObserver.observe(el);
  });
};

// ---------- Inicialización única (tras el primer render) ----------
window.initOnce = () => {
  // Navegación: fondo al hacer scroll
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Menú móvil
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

  // Luz que sigue el cursor en las tarjetas de servicio (delegado: sobrevive repintados)
  const servicesGrid = document.querySelector(".services__grid");
  if (servicesGrid) {
    servicesGrid.addEventListener("pointermove", (e) => {
      const card = e.target.closest(".service");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    });
  }

  // El contacto ahora es un widget de Calendly (lo monta content-loader),
  // así que ya no hay formulario propio que manejar aquí.

  // Año dinámico en el footer
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  window.initDynamic();
};

// Si el content-loader terminó antes de que este archivo cargara, inicializar ya.
if (window.__necesitaInit) window.initOnce();
