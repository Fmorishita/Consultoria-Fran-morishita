/* ============================================================
   VIÑEDOS DEL MAR — Interacciones
   Menú móvil, resaltado de nav activo y animaciones de aparición.
   ============================================================ */

// ---------- Menú móvil ----------
const burger = document.getElementById("navBurger");
const navLinks = document.getElementById("navLinks");

burger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  burger.classList.toggle("open", open);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    burger.classList.remove("open");
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
  { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ---------- Resaltar el link de nav activo según la sección visible ----------
const sections = [...document.querySelectorAll("section[id]")];
const anchorMap = { diagnostico: "#diagnostico", sistema: "#sistema", inversion: "#inversion", contacto: "#contacto" };
const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const href = anchorMap[entry.target.id];
      if (!href || !entry.isIntersecting) return;
      navAnchors.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === href));
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);

sections.forEach((s) => { if (anchorMap[s.id]) navObserver.observe(s); });
