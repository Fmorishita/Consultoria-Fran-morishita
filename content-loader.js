/* ============================================================
   FRAN MORISHITA — Cargador de contenido
   Lee el contenido publicado en Supabase y lo pinta en la página.
   En modo preview (?preview=1) recibe el borrador del panel admin
   por postMessage y se repinta al instante.
   ============================================================ */

(() => {
  const ES_PREVIEW = new URLSearchParams(window.location.search).has("preview");

  const esc = (str) =>
    String(str ?? "").replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );

  /* Iconos disponibles para las tarjetas de servicios */
  const ICONOS = {
    monitor: '<rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 21h8M12 18v3M6 8h6M6 11h9"/>',
    enviar: '<path d="M3 11l18-7-7 18-2.5-7.5L3 11z"/>',
    grafica: '<path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/>',
    ia: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/>',
    equipo: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    global: '<path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M21.2 8A10 10 0 0 0 16 2.8V8h5.2z"/>',
    estrella: '<path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2-6.2 3.2L7 14.2 2 9.3l6.9-1L12 2z"/>',
    escudo: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    rayo: '<path d="M13 2L3 14h7l-1 8 11-13h-7l0-7z"/>',
    corazon: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>',
    dinero: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    calendario: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  };

  const svgIcono = (nombre) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONOS[nombre] || ICONOS.estrella}</svg>`;

  const ESTILOS_NICHO = { azul: "realestate", verde: "b2b", dorado: "ecommerce", rojo: "gastro" };

  /* Convierte un link de YouTube o Vimeo en su URL de inserción (embed).
     Devuelve "" si no reconoce el formato (entonces no se muestra video). */
  function embedDeVideo(url) {
    if (!url) return "";
    url = String(url).trim();
    let m;
    if ((m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/)))
      return `https://www.youtube-nocookie.com/embed/${m[1]}?rel=0`;
    if ((m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)))
      return `https://player.vimeo.com/video/${m[1]}`;
    return "";
  }

  /* Inserta el widget de Calendly. El div SIEMPRE lleva data-url para que el
     auto-init de Calendly no falle al escanearlo. Si la librería ya está
     cargada (p. ej. al cambiar la URL en la vista previa) reinicia el widget. */
  function renderCalendly(url) {
    const cont = document.querySelector("#contactoCalendly");
    if (!cont) return;
    if (!url) {
      cont.dataset.url = "";
      cont.innerHTML = '<div class="contact__cal-ph">Configura tu link de Calendly en el panel de administración.</div>';
      return;
    }
    if (cont.dataset.url === url) return; // ya montado con esta URL
    cont.dataset.url = url;
    cont.innerHTML = `<div class="calendly-inline-widget" data-url="${esc(url)}" style="min-width:320px;height:700px;"></div>`;
    const widget = cont.firstElementChild;

    if (window.Calendly) {
      window.Calendly.initInlineWidget({ url, parentElement: widget });
      return;
    }
    if (!document.getElementById("calendly-widget-js")) {
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(css);
      const s = document.createElement("script");
      s.id = "calendly-widget-js";
      s.src = "https://assets.calendly.com/assets/external/widget.js";
      s.async = true;
      document.head.appendChild(s); // su auto-init monta el widget con data-url
    }
  }

  const tituloHTML = (s) =>
    `${s.titulo || ""}${s.tituloDestacado ? ` <span class="text-gradient">${s.tituloDestacado}</span>` : ""}`;

  /* ---------- Render principal ---------- */
  function renderSite(cfg) {
    window.SITE_CONTENT = cfg;
    const $ = (sel) => document.querySelector(sel);
    const g = cfg.general;

    /* Meta y colores */
    document.title = g.metaTitulo;
    const metaDesc = $('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", g.metaDescripcion);
    const root = document.documentElement.style;
    root.setProperty("--gold", g.colorDorado);
    root.setProperty("--gold-light", g.colorDoradoClaro);
    root.setProperty("--gold-dark", g.colorDoradoOscuro);

    /* Logo (header y footer) */
    document.querySelectorAll(".nav__logo").forEach((el) => {
      el.innerHTML = `${esc(g.logo1)}<span>${esc(g.logo2)}</span>`;
    });

    /* Nav */
    const navCta = $('.nav__links a[href="#contacto"]');
    if (navCta) navCta.textContent = g.botonNav;

    /* Hero */
    $(".hero__badge").innerHTML = `<span class="pulse-dot"></span> ${cfg.hero.badge}`;
    $(".hero__title").innerHTML = tituloHTML(cfg.hero);
    $(".hero__subtitle").innerHTML = cfg.hero.subtitulo;
    $(".hero__cta .btn--gold").innerHTML =
      `${esc(cfg.hero.botonPrimario)} <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    $(".hero__cta .btn--ghost").textContent = cfg.hero.botonSecundario;
    $(".hero__stats").innerHTML = cfg.hero.stats
      .map(
        (s) => `<div class="hero__stat">
          <span class="hero__stat-number">${esc(s.prefijo)}<span class="counter" data-target="${Number(s.numero) || 0}">0</span>${esc(s.sufijo)}</span>
          <span class="hero__stat-label">${esc(s.etiqueta)}</span></div>`
      )
      .join('<div class="hero__stat-divider"></div>');

    /* Marquesina */
    const doble = [...cfg.marquesina.items, ...cfg.marquesina.items];
    $(".marquee__track").innerHTML = doble.map((i) => `<span>${esc(i)}</span><i>◆</i>`).join("");

    /* Encabezados de sección (tag + título + subtítulo) */
    const setHead = (selector, s) => {
      const head = $(selector);
      if (!head) return;
      head.querySelector(".section__tag").textContent = s.tag;
      head.querySelector("h2").innerHTML = tituloHTML(s);
      const p = head.querySelector("p");
      if (p && s.subtitulo !== undefined) p.innerHTML = s.subtitulo;
    };

    /* Problema */
    setHead("#dolor .section__head", cfg.problema);
    $(".pain__grid").innerHTML = cfg.problema.tarjetas
      .map(
        (t) => `<div class="pain__card reveal">
          <div class="pain__icon">${esc(t.icono)}</div>
          <h3>${esc(t.titulo)}</h3><p>${esc(t.texto)}</p></div>`
      )
      .join("");
    $(".pain__bridge p").innerHTML = cfg.problema.puente;
    $(".pain__bridge .btn").textContent = cfg.problema.puenteBoton;

    /* Servicios */
    setHead("#servicios .section__head", cfg.servicios);
    $(".services__grid").innerHTML = cfg.servicios.tarjetas
      .map(
        (t) => `<article class="service reveal">
          <div class="service__icon">${svgIcono(t.icono)}</div>
          <h3>${esc(t.titulo)}</h3><p>${esc(t.texto)}</p></article>`
      )
      .join("");

    /* Método */
    setHead("#metodo .section__head", cfg.metodo);
    $(".method__steps").innerHTML = cfg.metodo.pasos
      .map(
        (p, i) => `<div class="method__step reveal">
          <div class="method__number">${String(i + 1).padStart(2, "0")}</div>
          <div class="method__line"></div>
          <h3>${esc(p.titulo)}</h3><p>${esc(p.texto)}</p></div>`
      )
      .join("");

    /* Nichos */
    setHead("#nichos .section__head", cfg.nichos);
    $(".niches__grid").innerHTML = cfg.nichos.tarjetas
      .map(
        (n) => `<article class="niche reveal">
          <div class="niche__visual niche__visual--${ESTILOS_NICHO[n.estilo] || "realestate"}">${
            n.foto ? `<img src="${esc(n.foto)}" alt="${esc(n.titulo)}" loading="lazy" />` : esc(n.emoji)
          }</div>
          <div class="niche__body"><h3>${esc(n.titulo)}</h3><p>${esc(n.texto)}</p>
          <ul>${n.puntos.map((p) => `<li>${esc(p)}</li>`).join("")}</ul></div></article>`
      )
      .join("");

    /* Sobre Fran */
    const sf = cfg.sobreFran;
    $("#sobre-fran .section__tag").textContent = sf.tag;
    $("#sobre-fran h2").innerHTML = tituloHTML(sf);
    $(".about__photo").innerHTML = sf.foto
      ? `<img src="${esc(sf.foto)}" alt="Fran Morishita" />`
      : `<div class="about__photo-placeholder">${esc(sf.iniciales)}</div>`;
    $(".about__card--1").innerHTML = `<strong>${esc(sf.tarjetaFlotante1Titulo)}</strong><span>${esc(sf.tarjetaFlotante1Texto)}</span>`;
    $(".about__card--2").innerHTML = `<strong>${esc(sf.tarjetaFlotante2Titulo)}</strong><span>${esc(sf.tarjetaFlotante2Texto)}</span>`;
    $("#aboutParrafos").innerHTML = sf.parrafos.map((p) => `<p class="reveal visible">${p}</p>`).join("");
    $(".about__quote").innerHTML = `${esc(sf.cita)} <span>${esc(sf.citaAutor)}</span>`;
    $(".about__content > .btn").textContent = sf.boton;

    /* Comparativa */
    const cmp = cfg.comparativa;
    setHead(".why .section__head", cmp);
    $(".why__col--them").innerHTML =
      `<h3>${esc(cmp.malaTitulo)}</h3><ul>${cmp.malaItems.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
    $(".why__col--us").innerHTML =
      `<h3>${esc(cmp.buenaTitulo)}</h3><ul>${cmp.buenaItems.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;

    /* Testimonios */
    const tst = cfg.testimonios;
    setHead("#testimonios .section__head", tst);
    const videoWrap = $("#testimoniosVideo");
    const embedUrl = embedDeVideo(tst.videoEmbed);
    if (tst.videoArchivo) {
      videoWrap.hidden = false;
      videoWrap.innerHTML = `
        ${tst.videoTitulo ? `<h3 class="testimonials__video-title">${esc(tst.videoTitulo)}</h3>` : ""}
        <div class="testimonials__player">
          <video controls preload="metadata" playsinline ${tst.videoPoster ? `poster="${esc(tst.videoPoster)}"` : ""}>
            <source src="${esc(tst.videoArchivo)}" />
          </video>
        </div>`;
    } else if (embedUrl) {
      videoWrap.hidden = false;
      videoWrap.innerHTML = `
        ${tst.videoTitulo ? `<h3 class="testimonials__video-title">${esc(tst.videoTitulo)}</h3>` : ""}
        <div class="testimonials__player testimonials__player--embed">
          <iframe src="${esc(embedUrl)}" title="${esc(tst.videoTitulo || "Video")}" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen></iframe>
        </div>`;
    } else {
      videoWrap.hidden = true;
      videoWrap.innerHTML = "";
    }
    const grid = $("#testimoniosGrid");
    grid.innerHTML = (tst.tarjetas || [])
      .map(
        (t) => `<article class="testimonial reveal">
          <div class="testimonial__media">${
            t.foto
              ? `<img src="${esc(t.foto)}" alt="${esc(t.nombre)}" loading="lazy" />`
              : `<div class="testimonial__media-ph">${esc((t.nombre || "·").slice(0, 1))}</div>`
          }</div>
          <div class="testimonial__body">
            ${t.texto ? `<p class="testimonial__quote">${esc(t.texto)}</p>` : ""}
            <div class="testimonial__person">
              <strong>${esc(t.nombre)}</strong>
              ${t.rol ? `<span>${esc(t.rol)}</span>` : ""}
            </div>
          </div>
        </article>`
      )
      .join("");

    /* FAQ */
    setHead("#faq .section__head", cfg.faq);
    $(".faq__list").innerHTML = cfg.faq.items
      .map(
        (f) => `<details class="faq__item reveal">
          <summary>${esc(f.pregunta)}</summary><p>${esc(f.respuesta)}</p></details>`
      )
      .join("");

    /* Contacto + Calendly */
    const ct = cfg.contacto;
    $("#contacto .section__tag").textContent = ct.tag;
    $("#contacto h2").innerHTML = tituloHTML(ct);
    $(".contact__copy > p").innerHTML = ct.texto;
    $(".contact__bullets").innerHTML = ct.bullets.map((b) => `<li>${esc(b)}</li>`).join("");
    $(".contact__urgency").innerHTML = ct.urgencia;
    renderCalendly(ct.calendlyUrl);

    /* Footer */
    $(".footer__brand p").textContent = cfg.footer.descripcion;
    $("#footerDerechos").textContent = cfg.footer.derechos;

    /* Visibilidad de secciones (y sus links del nav) */
    const SECCIONES = {
      marquesina: ".marquee", problema: "#dolor", servicios: "#servicios",
      metodo: "#metodo", nichos: "#nichos", sobreFran: "#sobre-fran",
      testimonios: "#testimonios", comparativa: ".why", faq: "#faq",
    };
    for (const [key, sel] of Object.entries(SECCIONES)) {
      const visible = cfg[key].visible !== false;
      const el = $(sel);
      if (el) el.style.display = visible ? "" : "none";
      const id = sel.startsWith("#") ? sel : null;
      if (id) {
        document.querySelectorAll(`.nav__links a[href="${id}"], .footer__col a[href="${id}"]`).forEach((a) => {
          a.style.display = visible ? "" : "none";
        });
      }
    }

    /* Re-inicializar animaciones sobre los elementos recién creados */
    if (window.initDynamic) window.initDynamic();
  }

  /* ---------- Arranque ---------- */
  async function boot() {
    let cfg = DEFAULT_CONTENT;

    if (!ES_PREVIEW) {
      try {
        // Máximo 2.5s de espera: si Supabase no responde, sale el contenido por defecto
        const res = await fetch(
          `${SITE_SUPABASE_URL}/rest/v1/site_config?key=eq.published&select=content`,
          {
            headers: { apikey: SITE_SUPABASE_KEY, Authorization: `Bearer ${SITE_SUPABASE_KEY}` },
            signal: AbortSignal.timeout(2500),
          }
        );
        const rows = await res.json();
        if (Array.isArray(rows) && rows[0]?.content) cfg = mergeContent(DEFAULT_CONTENT, rows[0].content);
      } catch (err) {
        console.warn("Usando contenido por defecto:", err);
      }
    } else {
      /* Modo preview: sin animaciones de aparición para ver todo de inmediato */
      const style = document.createElement("style");
      style.textContent = ".reveal{opacity:1 !important;transform:none !important}";
      document.head.appendChild(style);
      window.addEventListener("message", (e) => {
        if (e.origin !== window.location.origin) return;
        if (e.data?.type === "preview-config") renderSite(mergeContent(DEFAULT_CONTENT, e.data.config));
        if (e.data?.type === "scroll-to") {
          const destino = document.querySelector(e.data.selector);
          if (destino) destino.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
      if (window.parent !== window) window.parent.postMessage({ type: "preview-ready" }, window.location.origin);
    }

    renderSite(cfg);
    document.body.classList.add("contenido-listo");
    if (window.initOnce) window.initOnce();
    else window.__necesitaInit = true; // script.js aún no carga: que se inicialice él
  }

  boot();
})();
