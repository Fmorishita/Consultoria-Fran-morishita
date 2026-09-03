/* ============================================================
   PUNTA MITA HOMES — Sistema de movimiento
   ------------------------------------------------------------
   Cuatro gestos, todos lentos y con la misma curva. La idea no es
   "animar": es que el contenido entre como entra una revista bien
   impresa — por bloques, revelándose, sin rebotes.

   Todo se desactiva por completo con prefers-reduced-motion.
   ============================================================ */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches) return;
  if (!('IntersectionObserver' in window)) return;

  var raf = window.requestAnimationFrame;

  /* ---------- 1. Titulares: revelado palabra por palabra ----------
     Las palabras suben desde detrás de su propia caja. El retraso se
     calcula por línea, no por palabra, para que cada renglón entre
     como una unidad y no como una cascada de letras. */
  function splitWords(el) {
    if (el.dataset.split === 'done') return;
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    var texts = [], n;
    while ((n = walker.nextNode())) if (n.textContent.trim()) texts.push(n);

    texts.forEach(function (tn) {
      var frag = document.createDocumentFragment();
      tn.textContent.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
        var w = document.createElement('span'); w.className = 'wd';
        var i = document.createElement('i'); i.textContent = part;
        w.appendChild(i); frag.appendChild(w);
      });
      if (tn.parentNode) tn.parentNode.replaceChild(frag, tn);
    });

    /* Agrupar por línea: las palabras que comparten offsetTop entran juntas */
    var words = el.querySelectorAll('.wd');
    var lines = [], last = null, idx = -1;
    for (var k = 0; k < words.length; k++) {
      var top = words[k].offsetTop;
      if (last === null || Math.abs(top - last) > 4) { idx++; last = top; }
      lines.push(idx);
      words[k].firstChild.style.transitionDelay = (idx * 0.085) + 's';
    }
    el.dataset.split = 'done';
  }

  function unsplit(el) {
    if (el.dataset.split !== 'done') return;
    el.querySelectorAll('.wd').forEach(function (w) {
      w.replaceWith(document.createTextNode(w.textContent));
    });
    el.normalize();
    delete el.dataset.split;
  }

  var HEADINGS = '.display-1, .display-2, .display-3';

  function prepareHeadings() {
    document.querySelectorAll(HEADINGS).forEach(function (h) {
      if (h.closest('[data-no-split]')) return;
      splitWords(h);
      h.classList.add('is-words');
    });
  }

  /* ---------- 2. Imágenes: se descubren, no aparecen ----------
     Un barrido de clip-path de abajo hacia arriba mientras la imagen
     se asienta desde una escala ligeramente mayor. */
  var IMGS = '.figure img, .band-media img, .pcard-media img, .gal-item img, .hero-media img';

  /* ---------- 3. Cifras: conteo ---------- */
  function countUp(el) {
    var raw = el.getAttribute('data-count-from') || el.textContent;
    var m = raw.match(/^([^\d]*)([\d.,]+)(.*)$/s);
    if (!m) return;
    var pre = m[1], target = parseFloat(m[2].replace(/,/g, '')), post = m[3];
    if (!isFinite(target)) return;
    var dec = (m[2].split('.')[1] || '').length;
    var t0 = null, dur = 1400;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + (target * e).toFixed(dec) + post;
      if (p < 1) raf(step);
    }
    el.textContent = pre + (0).toFixed(dec) + post;
    raf(step);
  }

  /* ---------- 4. Paralaje suave en las bandas ---------- */
  var parallax = [];
  function collectParallax() {
    parallax = [].slice.call(document.querySelectorAll('.band-media img'));
    parallax.forEach(function (i) { i.classList.add('has-parallax'); });
  }
  var ticking = false;
  function onScroll() {
    if (ticking || !parallax.length) return;
    ticking = true;
    raf(function () {
      var vh = window.innerHeight;
      parallax.forEach(function (img) {
        var host = img.parentElement;
        var r = host.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        var p = (r.top + r.height / 2 - vh / 2) / vh;   // -1 … 1
        img.style.transform = 'translate3d(0,' + (p * -5).toFixed(2) + '%,0) scale(1.12)';
      });
      ticking = false;
    });
  }

  /* ---------- Observador ---------- */
  function boot() {
    prepareHeadings();
    collectParallax();

    document.querySelectorAll(IMGS).forEach(function (i) { i.classList.add('rv-img'); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        if (e.target.hasAttribute('data-count')) countUp(e.target);
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

    document.querySelectorAll(HEADINGS + ', .rv-img, [data-count]').forEach(function (el) {
      io.observe(el);
    });

    /* Lo que ya está en pantalla al cargar no debe esperar al scroll */
    raf(function () {
      document.querySelectorAll(HEADINGS + ', .rv-img').forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.9) el.classList.add('is-in');
      });
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Al cambiar de idioma el innerHTML se reemplaza: hay que rehacer el corte */
  document.addEventListener('langchange', function () {
    document.querySelectorAll(HEADINGS).forEach(function (h) {
      delete h.dataset.split;
      h.classList.remove('is-words');
    });
    raf(function () {
      prepareHeadings();
      document.querySelectorAll(HEADINGS).forEach(function (h) { h.classList.add('is-in'); });
    });
  });

  /* El contenido pintado por JS (fichas, zonas, testimonios) entra después */
  var reScan = null;
  function rescan() {
    clearTimeout(reScan);
    reScan = setTimeout(function () {
      collectParallax();
      document.querySelectorAll('.pcard-media img, .gal-item img').forEach(function (i) {
        if (!i.classList.contains('rv-img')) { i.classList.add('rv-img'); }
        i.classList.add('is-in');
      });
      onScroll();
    }, 60);
  }
  document.addEventListener('langchange', rescan);

  if (document.readyState !== 'loading') { boot(); rescan(); }
  else document.addEventListener('DOMContentLoaded', function () { boot(); rescan(); });
})();
