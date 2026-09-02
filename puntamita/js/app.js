/* ============================================================
   PUNTA MITA HOMES — Core runtime
   i18n · navegación · animaciones · formato · WhatsApp
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 1. Idioma ---------- */
  var LANG_KEY = 'pmh_lang';

  /* Prioridad: ?lang= en la URL  >  preferencia guardada  >  navegador.
     La URL manda para que una campaña en español no le llegue en inglés
     a alguien que alguna vez cambió el idioma. */
  function detectLang() {
    var url = new URLSearchParams(location.search).get('lang');
    if (url === 'es' || url === 'en') return url;
    try {
      var saved = localStorage.getItem(LANG_KEY);
      if (saved === 'es' || saved === 'en') return saved;
    } catch (e) {}
    var nav = (navigator.language || 'es').toLowerCase();
    return nav.indexOf('es') === 0 ? 'es' : 'en';
  }

  var lang = detectLang();

  /* El HTML se escribe en español; el inglés viaja en data-en / data-en-<attr>.
     Guardamos el español original la primera vez para poder volver. */
  var I18N_ATTRS = ['placeholder', 'aria-label', 'title', 'content', 'alt', 'value'];

  function applyLang(next) {
    lang = next;
    document.documentElement.lang = next;
    document.documentElement.setAttribute('data-lang', next);

    var nodes = document.querySelectorAll('[data-en]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.dataset.es === undefined) el.dataset.es = el.innerHTML;
      el.innerHTML = next === 'en' ? el.dataset.en : el.dataset.es;
    }

    /* Atributos traducibles. Se guarda el original en data-es-<attr>
       en vez de usar dataset, que camelCasea los nombres con guion
       (data-en-aria-label -> enAriaLabel) y se presta a errores. */
    I18N_ATTRS.forEach(function (attr) {
      document.querySelectorAll('[data-en-' + attr + ']').forEach(function (node) {
        var orig = 'data-es-' + attr;
        if (!node.hasAttribute(orig)) node.setAttribute(orig, node.getAttribute(attr) || '');
        node.setAttribute(attr, next === 'en'
          ? node.getAttribute('data-en-' + attr)
          : node.getAttribute(orig));
      });
    });

    // Botón de idioma
    var btns = document.querySelectorAll('[data-lang-toggle]');
    for (var b = 0; b < btns.length; b++) {
      var es = btns[b].querySelector('[data-lang-es]');
      var en = btns[b].querySelector('[data-lang-en]');
      if (es) es.classList.toggle('lang-off', next !== 'es');
      if (en) en.classList.toggle('lang-off', next !== 'en');
      btns[b].setAttribute('aria-label', next === 'es' ? 'Switch to English' : 'Cambiar a español');
    }

    try { localStorage.setItem(LANG_KEY, next); } catch (e) {}
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: next } }));
  }

  window.PMH = window.PMH || {};
  PMH.lang = function () { return lang; };
  PMH.t = function (obj) {
    if (obj === null || obj === undefined) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] !== undefined ? obj[lang] : (obj.es || obj.en || '');
  };

  /* ---------- 2. Formato ---------- */
  PMH.money = function (usd) {
    if (usd === null || usd === undefined || isNaN(usd)) return '';
    if (usd >= 1000000) {
      var m = usd / 1000000;
      var s = m >= 10 ? m.toFixed(1) : m.toFixed(2);
      s = s.replace(/\.?0+$/, '');
      return '$' + s + 'M';
    }
    if (usd >= 1000) return '$' + Math.round(usd / 1000) + 'K';
    return '$' + usd;
  };
  PMH.moneyFull = function (usd) {
    if (usd === null || usd === undefined || isNaN(usd)) return '';
    return '$' + Number(usd).toLocaleString('en-US');
  };
  PMH.num = function (n) {
    if (n === null || n === undefined || n === '' || isNaN(n)) return '';
    return Number(n).toLocaleString(lang === 'en' ? 'en-US' : 'es-MX');
  };

  /* ---------- 3. Catálogos ---------- */
  PMH.zone = function (id) {
    var z = (window.ZONES || []).filter(function (x) { return x.id === id; })[0];
    return z || { id: id, name: id, ph: 'ph-1' };
  };
  PMH.typeLabel = function (id) {
    var t = (window.TYPES || []).filter(function (x) { return x.id === id; })[0];
    return t ? t[lang] : id;
  };
  PMH.statusLabel = function (s) {
    var map = {
      venta:    { es: 'En venta',  en: 'For sale' },
      preventa: { es: 'Preventa',  en: 'Pre-sale' },
      vendida:  { es: 'Vendida',   en: 'Sold' }
    };
    return PMH.t(map[s] || { es: s, en: s });
  };

  /* Placeholder estable por id mientras no hay fotos reales */
  PMH.phClass = function (id) {
    var sum = 0;
    for (var i = 0; i < String(id).length; i++) sum += String(id).charCodeAt(i);
    return 'ph-' + ((sum % 6) + 1);
  };

  /* ---------- 4. WhatsApp ----------
     Con número configurado mandamos el mensaje pre-armado (lead mucho
     más calificado). Sin él caemos al link corto del perfil de
     Instagram, que funciona pero no admite texto previo. */
  PMH.wa = function (message) {
    var num = ((window.SITE && SITE.whatsapp) || '').replace(/\D/g, '');
    if (!num) return (window.SITE && SITE.waLink) || '#';
    var base = 'https://wa.me/' + num;
    return message ? base + '?text=' + encodeURIComponent(message) : base;
  };
  PMH.waDefault = function () {
    return PMH.wa(lang === 'en'
      ? 'Hi ' + SITE.agent + ', I found you through the Punta Mita Homes site and I would like more information.'
      : 'Hola ' + SITE.agent + ', te encontré en el sitio de Punta Mita Homes y quiero más información.');
  };

  /* ---------- 5. UTMs ---------- */
  PMH.utms = function () {
    var q = new URLSearchParams(location.search);
    var out = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'].forEach(function (k) {
      var v = q.get(k);
      if (v) out[k] = v;
    });
    try {
      var stored = JSON.parse(sessionStorage.getItem('pmh_utm') || '{}');
      if (Object.keys(out).length) {
        sessionStorage.setItem('pmh_utm', JSON.stringify(out));
        return out;
      }
      return stored;
    } catch (e) { return out; }
  };

  /* ---------- 6. DOM ready ---------- */
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    applyLang(lang);

    /* Toggle de idioma */
    document.querySelectorAll('[data-lang-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () { applyLang(lang === 'es' ? 'en' : 'es'); });
    });

    /* Enlaces de WhatsApp */
    document.querySelectorAll('[data-wa]').forEach(function (el) {
      el.setAttribute('href', PMH.waDefault());
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    });
    document.querySelectorAll('[data-site-ig]').forEach(function (el) {
      el.setAttribute('href', SITE.instagram);
    });
    document.querySelectorAll('[data-site-email]').forEach(function (el) {
      if (!SITE.email) { el.hidden = true; return; }
      el.setAttribute('href', 'mailto:' + SITE.email);
      if (el.dataset.fill === 'text') el.textContent = SITE.email;
    });
    document.querySelectorAll('[data-agent-ig]').forEach(function (el) {
      el.setAttribute('href', SITE.agentUrl);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    });
    document.querySelectorAll('[data-agent-handle]').forEach(function (el) { el.textContent = SITE.agentHandle; });
    document.querySelectorAll('[data-site-agent]').forEach(function (el) { el.textContent = SITE.agent; });
    document.querySelectorAll('[data-site-handle]').forEach(function (el) { el.textContent = SITE.igHandle; });

    /* Nav sólido al hacer scroll */
    var nav = document.querySelector('.nav');
    var hasHero = !!document.querySelector('[data-transparent-nav]');
    function onScroll() {
      if (!nav) return;
      var solid = !hasHero || window.scrollY > 40;
      nav.classList.toggle('is-solid', solid);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* Drawer móvil */
    var burger = document.querySelector('.burger');
    var drawer = document.querySelector('.drawer');
    if (burger && drawer) {
      burger.addEventListener('click', function () {
        var open = drawer.classList.toggle('is-open');
        burger.classList.toggle('is-open', open);
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.classList.toggle('is-locked', open);
      });
      drawer.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          drawer.classList.remove('is-open');
          burger.classList.remove('is-open');
          document.body.classList.remove('is-locked');
        });
      });
    }

    /* Reveal on scroll */
    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && reveals.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('is-in'); });
    }

    /* Acordeón */
    document.querySelectorAll('.acc-item').forEach(function (item) {
      var q = item.querySelector('.acc-q');
      var a = item.querySelector('.acc-a');
      if (!q || !a) return;
      q.setAttribute('aria-expanded', 'false');
      q.addEventListener('click', function () {
        var open = item.classList.toggle('is-open');
        q.setAttribute('aria-expanded', open ? 'true' : 'false');
        a.style.height = open ? a.firstElementChild.offsetHeight + 'px' : '0px';
      });
    });
    document.addEventListener('langchange', function () {
      document.querySelectorAll('.acc-item.is-open').forEach(function (item) {
        var a = item.querySelector('.acc-a');
        if (a && a.firstElementChild) a.style.height = a.firstElementChild.offsetHeight + 'px';
      });
    });

    /* Barra móvil de CTA: aparece al pasar el hero */
    var bar = document.querySelector('.mobile-bar');
    if (bar) {
      document.body.classList.add('has-mobile-bar');
      var trigger = document.querySelector('[data-bar-after]') || document.querySelector('.hero') || document.querySelector('.subhero');
      function barScroll() {
        var y = trigger ? trigger.offsetTop + trigger.offsetHeight - 120 : 400;
        bar.classList.toggle('is-up', window.scrollY > y);
      }
      barScroll();
      window.addEventListener('scroll', barScroll, { passive: true });
    }

    /* Marcar link activo */
    var here = location.pathname.replace(/\/$/, '').split('/').pop() || 'index';
    document.querySelectorAll('.nav-link[href]').forEach(function (a) {
      var target = a.getAttribute('href').replace(/\/$/, '').split('/').pop().replace('.html', '') || 'index';
      if (target === here.replace('.html', '')) a.classList.add('is-active');
    });

    /* Aviso de configuración pendiente (solo consola) */
    if (!SITE.whatsapp) {
      console.warn('[Punta Mita Homes] SITE.whatsapp está vacío: se usa el link corto de Instagram y los mensajes van SIN los datos del prospecto. Agrega el número en js/data.js.');
    }
    if (!SITE.email) console.warn('[Punta Mita Homes] Falta SITE.email en js/data.js.');
  });
})();
