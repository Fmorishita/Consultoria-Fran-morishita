/* ============================================================
   PUNTA MITA HOMES — Catálogo y ficha de propiedad
   ============================================================ */
(function () {
  'use strict';

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); }
  function t(o) { return PMH.t(o); }

  var L = {
    beds:      { es: 'rec', en: 'bd' },
    baths:     { es: 'baños', en: 'ba' },
    lot:       { es: 'terreno', en: 'lot' },
    from:      { es: 'Desde', en: 'From' },
    demo:      { es: 'Demo', en: 'Demo' },
    photoSoon: { es: 'Fotografía por cargar', en: 'Photography coming' },
    view:      { es: 'Ver ficha', en: 'View details' },
    results:   { es: 'propiedades', en: 'properties' },
    result:    { es: 'propiedad', en: 'property' },
    emptyT:    { es: 'Ninguna propiedad coincide con ese filtro', en: 'No property matches that filter' },
    emptyB:    { es: 'Mucho de lo que se vende en esta zona nunca llega a un portal. Dinos qué buscas y lo rastreamos por ti.', en: 'Much of what sells here never reaches a portal. Tell us what you are after and we will track it down for you.' },
    emptyCta:  { es: 'Buscar por mí', en: 'Find it for me' },
    clear:     { es: 'Limpiar filtros', en: 'Clear filters' },
    all:       { es: 'Todas', en: 'All' },
    anyType:   { es: 'Cualquier tipo', en: 'Any type' },
    anyBeds:   { es: 'Recámaras', en: 'Bedrooms' },
    anyPrice:  { es: 'Cualquier precio', en: 'Any price' },
    sortRec:   { es: 'Recomendadas', en: 'Recommended' },
    sortLow:   { es: 'Precio: menor a mayor', en: 'Price: low to high' },
    sortHigh:  { es: 'Precio: mayor a menor', en: 'Price: high to low' },
    ocean:     { es: 'Vista al mar', en: 'Ocean view' },
    golf:      { es: 'Vista al golf', en: 'Golf view' },
    jungle:    { es: 'Vista a la sierra', en: 'Mountain view' },
    hoaLabel:  { es: 'Mantenimiento', en: 'HOA dues' },
    month:     { es: '/mes', en: '/mo' },
    delivery:  { es: 'Entrega', en: 'Delivery' },
    onRequest: { es: 'Precio bajo solicitud', en: 'Price on request' },
    onRequestS:{ es: 'Bajo solicitud', en: 'On request' },
    units:     { es: 'unidades', en: 'units' },
    remaining: { es: 'disponibles', en: 'available' },
    developer: { es: 'Desarrollador', en: 'Developer' },
    beach:     { es: 'Playa', en: 'Beach' },
    collection:{ es: 'Solicitar la Colección Privada', en: 'Request the Private Collection' }
  };

  var ICON = {
    bed:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M2 16h20"/><path d="M6 10V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/><path d="M12 10V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/></svg>',
    bath: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M6 12V6a2 2 0 0 1 4 0"/><path d="M4 20l-1 2M20 20l1 2"/></svg>',
    area: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M9 3v18"/></svg>',
    lot:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20h18"/><path d="M5 20V9l7-5 7 5v11"/></svg>',
    check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
  };

  /* ---------- Media (foto real o placeholder generado) ---------- */
  function media(p, cls) {
    var photo = p.photos && p.photos.length ? p.photos[0] : null;
    if (photo) {
      return '<img src="' + esc(photo) + '" alt="' + esc(t(p.title)) + '" loading="lazy" decoding="async">';
    }
    return '<div class="ph ' + PMH.phClass(p.id) + '"><span class="ph-mark">' + esc(t(L.photoSoon)) + '</span></div>';
  }

  function badges(p) {
    var out = [];
    if (p.hot)    out.push('<span class="badge badge-hot">' + (PMH.lang() === 'en' ? 'Hot' : 'Destacada') + '</span>');
    if (p.isNew)  out.push('<span class="badge badge-new">' + (PMH.lang() === 'en' ? 'New' : 'Nueva') + '</span>');
    if (p.status === 'preventa') out.push('<span class="badge badge-pre">' + esc(PMH.statusLabel('preventa')) + '</span>');
    if (p.status === 'vendida')  out.push('<span class="badge">' + esc(PMH.statusLabel('vendida')) + '</span>');
    if (p.demo && SITE.demoMode) out.push('<span class="badge">' + esc(t(L.demo)) + '</span>');
    return out.length ? '<div class="badges">' + out.join('') + '</div>' : '';
  }

  function specs(p) {
    var out = [];
    if (p.beds)  out.push('<span class="spec">' + ICON.bed + p.beds + ' ' + esc(t(L.beds)) + '</span>');
    if (p.baths) out.push('<span class="spec">' + ICON.bath + p.baths + ' ' + esc(t(L.baths)) + '</span>');
    if (p.m2)    out.push('<span class="spec">' + ICON.area + PMH.num(p.m2) + ' m²</span>');
    if (!p.m2 && p.lot) out.push('<span class="spec">' + ICON.lot + PMH.num(p.lot) + ' m² ' + esc(t(L.lot)) + '</span>');
    /* Proyectos cuyo desglose por unidad todavía no es público */
    if (!out.length) {
      if (p.units)    out.push('<span class="spec">' + ICON.area + p.units + ' ' + esc(t(L.units)) + '</span>');
      if (p.beach)    out.push('<span class="spec">' + ICON.lot + esc(p.beach) + '</span>');
      if (p.delivery) out.push('<span class="spec">' + ICON.check + esc(t(p.delivery)) + '</span>');
    }
    return '<div class="specs">' + out.join('') + '</div>';
  }

  /* Precio, o "bajo solicitud" en los proyectos de colección privada */
  function priceHtml(p, full) {
    if (p.priceOnRequest || !(p.price && p.price.usd)) {
      return '<span class="pcard-price" style="font-size:1.05rem">' + esc(t(full ? L.onRequest : L.onRequestS)) + '</span>';
    }
    var v = full ? PMH.moneyFull(p.price.usd) : PMH.money(p.price.usd);
    return '<span class="pcard-price mono-num">' + (p.status === 'preventa' ? '<small>' + esc(t(L.from)) + '</small> ' : '') + v + ' <small>USD</small></span>';
  }

  function card(p) {
    var z = PMH.zone(p.zone);
    return '' +
      '<a class="pcard" href="propiedad.html?id=' + encodeURIComponent(p.id) + '">' +
        '<div class="pcard-media">' + media(p) + badges(p) + '</div>' +
        '<div class="pcard-body">' +
          '<span class="pcard-zone">' + esc(z.name) + ' · ' + esc(PMH.typeLabel(p.type)) + '</span>' +
          '<h3 class="pcard-title">' + esc(t(p.title)) + '</h3>' +
          specs(p) +
          '<div class="pcard-foot">' +
            priceHtml(p, false) +
            '<span class="link-u">' + esc(t(L.view)) + '</span>' +
          '</div>' +
        '</div>' +
      '</a>';
  }
  window.PMH.card = card;


  /* ---------- Tarjetas de zona ---------- */
  function zoneCard(z, detailed) {
    var count = (window.PROPERTIES || []).filter(function (p) { return p.zone === z.id && p.status !== 'vendida'; }).length;
    var lang = PMH.lang();
    var hl = (z.highlights && z.highlights[lang]) || [];
    return '' +
      '<a class="pcard" href="propiedades.html?zone=' + encodeURIComponent(z.id) + '">' +
        '<div class="pcard-media" style="aspect-ratio:3/2">' +
          (z.photo
            ? '<img src="' + esc(z.photo) + '" alt="' + esc(z.name) + '" loading="lazy" decoding="async">'
            : '<div class="ph ' + z.ph + '"><span class="ph-mark">' + esc(z.name) + '</span></div>') +
          '<div class="pcard-scrim"><span class="pcard-overtitle">' + esc(z.name) + '</span></div>' +
        '</div>' +
        '<div class="pcard-body">' +
          '<span class="pcard-zone">' + esc(t(z.tagline)) + '</span>' +
          '<p class="small muted">' + esc(t(z.blurb)) + '</p>' +
          (detailed && hl.length ? '<div class="amenities" style="margin-top:4px">' + hl.map(function (h) {
            return '<div class="amenity" style="font-size:.85rem">' + ICON.check + '<span>' + esc(h) + '</span></div>';
          }).join('') + '</div>' : '') +
          '<div class="pcard-foot">' +
            '<span class="small"><b>' + esc(t(z.range)) + '</b></span>' +
            '<span class="link-u">' + count + ' ' + esc(t(count === 1 ? L.result : L.results)) + '</span>' +
          '</div>' +
        '</div>' +
      '</a>';
  }

  function renderZones() {
    document.querySelectorAll('[data-zones]').forEach(function (el) {
      var detailed = el.dataset.zones === 'detailed';
      el.innerHTML = (window.ZONES || []).map(function (z) { return zoneCard(z, detailed); }).join('');
    });
  }


  /* ---------- Testimonios ---------- */
  var TL = {
    demo:   { es: 'Ejemplo', en: 'Sample' },
    note:   { es: 'Testimonios de ejemplo, para mostrar el formato. Se sustituyen por los reales antes de publicar.',
              en: 'Sample testimonials, shown to illustrate the format. They get replaced with real ones before launch.' }
  };

  function testimonialCard(item) {
    var demo = window.TESTIMONIALS_DEMO && item.demo;
    return '' +
      '<figure class="tcard">' +
        (demo ? '<span class="tcard-demo">' + esc(t(TL.demo)) + '</span>' : '') +
        '<svg class="tcard-mark" viewBox="0 0 32 24" aria-hidden="true"><path d="M13 24V13.6C13 6.4 8.9 1.6 1.6 0L0 3.4c4.5 1.2 6.8 4 6.9 8.2H0V24h13zm19 0V13.6C32 6.4 27.9 1.6 20.6 0L19 3.4c4.5 1.2 6.8 4 6.9 8.2H19V24h13z" fill="currentColor"/></svg>' +
        '<blockquote class="tcard-quote">' + esc(t(item.quote)) + '</blockquote>' +
        '<figcaption class="tcard-foot">' +
          '<span class="tcard-avatar" aria-hidden="true">' + esc(item.initials) + '</span>' +
          '<span class="tcard-who">' +
            '<span class="tcard-name">' + esc(item.name) + '</span>' +
            '<span class="tcard-meta">' + esc(t(item.place)) + ' · ' + esc(t(item.context)) + '</span>' +
          '</span>' +
        '</figcaption>' +
      '</figure>';
  }

  function renderTestimonials() {
    document.querySelectorAll('[data-testimonials]').forEach(function (el) {
      var list = window.TESTIMONIALS || [];
      el.innerHTML = list.map(testimonialCard).join('');
    });
    document.querySelectorAll('[data-testimonials-note]').forEach(function (el) {
      el.hidden = !window.TESTIMONIALS_DEMO;
      if (window.TESTIMONIALS_DEMO) el.textContent = t(TL.note);
    });
  }

  /* ---------- Grids simples (home) ---------- */
  function renderGrids() {
    document.querySelectorAll('[data-grid]').forEach(function (el) {
      var list = (window.PROPERTIES || []).slice();
      if (el.dataset.featured === 'true') list = list.filter(function (p) { return p.featured; });
      if (el.dataset.zone) list = list.filter(function (p) { return p.zone === el.dataset.zone; });
      if (el.dataset.exclude) list = list.filter(function (p) { return p.id !== el.dataset.exclude; });
      list = list.filter(function (p) { return p.status !== 'vendida'; });
      var limit = parseInt(el.dataset.limit || '0', 10);
      if (limit) list = list.slice(0, limit);
      el.innerHTML = list.map(card).join('');
    });
  }

  /* ---------- Catálogo con filtros ---------- */
  var PRICE_BANDS = [
    { v: '',        es: 'Cualquier precio', en: 'Any price',       min: 0,       max: Infinity },
    { v: '0-500',   es: 'Hasta $500K',      en: 'Up to $500K',     min: 0,       max: 500000 },
    { v: '500-1m',  es: '$500K – $1M',      en: '$500K – $1M',     min: 500000,  max: 1000000 },
    { v: '1m-3m',   es: '$1M – $3M',        en: '$1M – $3M',       min: 1000000, max: 3000000 },
    { v: '3m+',     es: 'Más de $3M',       en: 'Over $3M',        min: 3000000, max: Infinity }
  ];

  function initCatalog() {
    var root = document.querySelector('[data-catalog]');
    if (!root) return;

    var grid    = root.querySelector('[data-cat-grid]');
    var countEl = root.querySelector('[data-cat-count]');
    var chipsEl = root.querySelector('[data-cat-zones]');
    var typeSel = root.querySelector('[data-cat-type]');
    var bedsSel = root.querySelector('[data-cat-beds]');
    var priceSel= root.querySelector('[data-cat-price]');
    var sortSel = root.querySelector('[data-cat-sort]');

    var q = new URLSearchParams(location.search);
    var state = {
      zone:  q.get('zone')  || '',
      type:  q.get('type')  || '',
      beds:  q.get('beds')  || '',
      price: q.get('price') || '',
      sort:  q.get('sort')  || 'rec'
    };

    function buildControls() {
      var lang = PMH.lang();

      chipsEl.innerHTML = '<button type="button" class="chip' + (state.zone === '' ? ' is-on' : '') + '" data-zone="">' + esc(t(L.all)) + '</button>' +
        (window.ZONES || []).map(function (z) {
          var n = (window.PROPERTIES || []).filter(function (p) { return p.zone === z.id && p.status !== 'vendida'; }).length;
          return '<button type="button" class="chip' + (state.zone === z.id ? ' is-on' : '') + '" data-zone="' + esc(z.id) + '">' + esc(z.name) + ' <span class="n">' + n + '</span></button>';
        }).join('');

      typeSel.innerHTML = '<option value="">' + esc(t(L.anyType)) + '</option>' +
        (window.TYPES || []).map(function (x) {
          return '<option value="' + esc(x.id) + '"' + (state.type === x.id ? ' selected' : '') + '>' + esc(x[lang]) + '</option>';
        }).join('');

      bedsSel.innerHTML = '<option value="">' + esc(t(L.anyBeds)) + '</option>' +
        [1, 2, 3, 4, 5].map(function (n) {
          return '<option value="' + n + '"' + (state.beds === String(n) ? ' selected' : '') + '>' + n + '+ ' + esc(t(L.beds)) + '</option>';
        }).join('');

      priceSel.innerHTML = PRICE_BANDS.map(function (b) {
        return '<option value="' + b.v + '"' + (state.price === b.v ? ' selected' : '') + '>' + esc(b[lang]) + '</option>';
      }).join('');

      sortSel.innerHTML = [
        ['rec',  t(L.sortRec)],
        ['low',  t(L.sortLow)],
        ['high', t(L.sortHigh)]
      ].map(function (o) {
        return '<option value="' + o[0] + '"' + (state.sort === o[0] ? ' selected' : '') + '>' + esc(o[1]) + '</option>';
      }).join('');
    }

    function apply() {
      var list = (window.PROPERTIES || []).filter(function (p) { return p.status !== 'vendida'; });

      if (state.zone)  list = list.filter(function (p) { return p.zone === state.zone; });
      if (state.type)  list = list.filter(function (p) { return p.type === state.type; });
      if (state.beds)  list = list.filter(function (p) { return (p.beds || 0) >= Number(state.beds); });
      if (state.price) {
        var band = PRICE_BANDS.filter(function (b) { return b.v === state.price; })[0];
        if (band) list = list.filter(function (p) {
          if (p.priceOnRequest || !(p.price && p.price.usd)) return false;
          var v = p.price.usd;
          return v >= band.min && v < band.max;
        });
      }

      var pv = function (p) { return (p.price && p.price.usd) || null; };
      if (state.sort === 'low' || state.sort === 'high') {
        var dir = state.sort === 'low' ? 1 : -1;
        list.sort(function (a, b) {
          var av = pv(a), bv = pv(b);
          if (av === null && bv === null) return 0;
          if (av === null) return 1;   // sin precio público, siempre al final
          if (bv === null) return -1;
          return (av - bv) * dir;
        });
      }
      if (state.sort === 'rec')  list.sort(function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });

      grid.innerHTML = list.length
        ? list.map(card).join('')
        : '<div class="empty" style="grid-column:1/-1">' +
            '<h3 class="h3">' + esc(t(L.emptyT)) + '</h3>' +
            '<p class="body-lg" style="max-width:44ch">' + esc(t(L.emptyB)) + '</p>' +
            '<a class="btn btn-primary" href="contacto.html">' + esc(t(L.emptyCta)) + '</a>' +
            '<button type="button" class="link-u" data-clear>' + esc(t(L.clear)) + '</button>' +
          '</div>';

      countEl.innerHTML = '<b>' + list.length + '</b> ' + esc(t(list.length === 1 ? L.result : L.results));

      var clr = grid.querySelector('[data-clear]');
      if (clr) clr.addEventListener('click', function () {
        state = { zone: '', type: '', beds: '', price: '', sort: 'rec' };
        buildControls(); apply(); syncUrl();
      });

      chipsEl.querySelectorAll('.chip').forEach(function (c) {
        c.classList.toggle('is-on', c.dataset.zone === state.zone);
      });
    }

    function syncUrl() {
      var p = new URLSearchParams();
      Object.keys(state).forEach(function (k) { if (state[k] && !(k === 'sort' && state[k] === 'rec')) p.set(k, state[k]); });
      var qs = p.toString();
      history.replaceState(null, '', location.pathname + (qs ? '?' + qs : ''));
    }

    chipsEl.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      state.zone = chip.dataset.zone;
      apply(); syncUrl();
    });
    [[typeSel, 'type'], [bedsSel, 'beds'], [priceSel, 'price'], [sortSel, 'sort']].forEach(function (pair) {
      pair[0].addEventListener('change', function () { state[pair[1]] = pair[0].value; apply(); syncUrl(); });
    });

    document.addEventListener('langchange', function () { buildControls(); apply(); });
    buildControls();
    apply();
  }

  /* ---------- Ficha de propiedad ---------- */
  function initDetail() {
    var root = document.querySelector('[data-detail]');
    if (!root) return;

    var id = new URLSearchParams(location.search).get('id');
    var p = (window.PROPERTIES || []).filter(function (x) { return x.id === id; })[0];

    if (!p) {
      root.innerHTML = '<div class="container section"><div class="empty">' +
        '<h2 class="display-3">' + (PMH.lang() === 'en' ? 'That property is no longer listed' : 'Esa propiedad ya no está publicada') + '</h2>' +
        '<p class="body-lg" style="max-width:46ch">' + esc(t(L.emptyB)) + '</p>' +
        '<a class="btn btn-primary" href="propiedades.html">' + (PMH.lang() === 'en' ? 'See the catalogue' : 'Ver el catálogo') + '</a>' +
        '</div></div>';
      return;
    }

    var z = PMH.zone(p.zone);
    var lang = PMH.lang();
    document.title = t(p.title) + ' · ' + SITE.brand;

    function viewTags() {
      return (p.views || []).map(function (v) { return '<span class="tag">' + esc(t(L[v] || { es: v, en: v })) + '</span>'; }).join('');
    }

    function galleryHtml() {
      var photos = p.photos || [];
      if (!photos.length) {
        return '<div class="gallery"><div class="gallery-item"><div class="ph ' + PMH.phClass(p.id) + '"><span class="ph-mark">' + esc(t(L.photoSoon)) + '</span></div></div></div>';
      }
      return '<div class="gallery">' + photos.slice(0, 5).map(function (src, i) {
        return '<div class="gallery-item"><img src="' + esc(src) + '" alt="' + esc(t(p.title)) + ' — ' + (i + 1) + '" loading="' + (i ? 'lazy' : 'eager') + '" decoding="async"></div>';
      }).join('') + '</div>';
    }

    function facts() {
      var rows = [];
      if (p.beds)     rows.push([lang === 'en' ? 'Bedrooms' : 'Recámaras', p.beds]);
      if (p.baths)    rows.push([lang === 'en' ? 'Bathrooms' : 'Baños', p.baths]);
      if (p.m2)       rows.push([lang === 'en' ? 'Interior' : 'Construcción', PMH.num(p.m2) + ' m²']);
      if (p.terrace)  rows.push([lang === 'en' ? 'Terrace' : 'Terraza', PMH.num(p.terrace) + ' m²']);
      if (p.lot)      rows.push([lang === 'en' ? 'Lot' : 'Terreno', PMH.num(p.lot) + ' m²']);
      if (p.parking)  rows.push([lang === 'en' ? 'Parking' : 'Estacionamiento', p.parking]);
      if (p.units)     rows.push([lang === 'en' ? 'Units' : 'Unidades', p.units + (p.remaining ? ' (' + p.remaining + ' ' + t(L.remaining) + ')' : '')]);
      if (p.beach)     rows.push([t(L.beach), p.beach]);
      if (p.developer) rows.push([t(L.developer), p.developer]);
      if (p.delivery) rows.push([t(L.delivery), t(p.delivery)]);
      else if (p.year) rows.push([lang === 'en' ? 'Year built' : 'Año', p.year]);
      return rows.slice(0, 8).map(function (r) {
        return '<div class="fact"><div class="fact-l">' + esc(r[0]) + '</div><div class="fact-v mono-num">' + esc(r[1]) + '</div></div>';
      }).join('');
    }

    function roiBlock() {
      if (!p.roi) return '';
      var annual = Math.round(p.roi.adr * 365 * (p.roi.occupancy / 100));
      var gross  = p.price && p.price.usd ? (annual / p.price.usd * 100).toFixed(1) : null;
      return '' +
        '<div class="stack stack-16">' +
          '<h3 class="h3">' + (lang === 'en' ? 'Rental potential' : 'Potencial de renta') + '</h3>' +
          '<div class="fact-grid">' +
            '<div class="fact"><div class="fact-l">' + (lang === 'en' ? 'Nightly rate' : 'Tarifa noche') + '</div><div class="fact-v mono-num">$' + PMH.num(p.roi.adr) + '</div></div>' +
            '<div class="fact"><div class="fact-l">' + (lang === 'en' ? 'Occupancy' : 'Ocupación') + '</div><div class="fact-v mono-num">' + p.roi.occupancy + '%</div></div>' +
            '<div class="fact"><div class="fact-l">' + (lang === 'en' ? 'Gross / year' : 'Bruto / año') + '</div><div class="fact-v mono-num">' + PMH.money(annual) + '</div></div>' +
            (gross ? '<div class="fact"><div class="fact-l">' + (lang === 'en' ? 'Gross yield' : 'Rendimiento bruto') + '</div><div class="fact-v mono-num">' + gross + '%</div></div>' : '') +
          '</div>' +
          '<p class="note">' + esc(t(p.roi.note)) + ' ' + (lang === 'en'
            ? 'Gross figures before dues, management and taxes. Not a guarantee of return.'
            : 'Cifras brutas antes de mantenimiento, administración e impuestos. No constituyen una garantía de rendimiento.') + '</p>' +
        '</div>';
    }

    var waMsg = lang === 'en'
      ? 'Hi ' + SITE.agent + ', I would like more information about "' + t(p.title) + '" (' + p.id + ').'
      : 'Hola ' + SITE.agent + ', quiero más información de "' + t(p.title) + '" (' + p.id + ').';

    root.innerHTML = '' +
      '<section class="section-sm" style="padding-top:110px">' +
        '<div class="container">' +
          '<div class="crumbs" style="color:var(--muted)"><a href="index.html">' + (lang === 'en' ? 'Home' : 'Inicio') + '</a> / <a href="propiedades.html">' + (lang === 'en' ? 'Properties' : 'Propiedades') + '</a> / <span>' + esc(z.name) + '</span></div>' +
          '<div class="stack stack-16" style="margin-bottom:28px">' +
            '<span class="eyebrow">' + esc(z.name) + ' · ' + esc(PMH.typeLabel(p.type)) + ' · ' + esc(PMH.statusLabel(p.status)) + '</span>' +
            '<h1 class="display-2">' + esc(t(p.title)) + '</h1>' +
            '<p class="lede" style="max-width:56ch">' + esc(t(p.headline)) + '</p>' +
          '</div>' +
          galleryHtml() +
        '</div>' +
      '</section>' +

      '<section class="section-sm" style="padding-top:0">' +
        '<div class="container">' +
          '<div class="split is-wide" style="align-items:start">' +
            '<div class="stack stack-32">' +
              '<div class="fact-grid">' + facts() + '</div>' +
              '<div class="stack stack-16">' +
                '<h2 class="h3">' + (lang === 'en' ? 'About this property' : 'Sobre esta propiedad') + '</h2>' +
                '<p class="body-lg">' + esc(t(p.description)) + '</p>' +
                '<div class="tag-row">' + viewTags() + '</div>' +
              '</div>' +
              '<div class="stack stack-16">' +
                '<h3 class="h3">' + (lang === 'en' ? 'What it includes' : 'Lo que incluye') + '</h3>' +
                '<div class="amenities">' + (t(p.amenities) || []).map(function (a) {
                  return '<div class="amenity">' + ICON.check + '<span>' + esc(a) + '</span></div>';
                }).join('') + '</div>' +
              '</div>' +
              roiBlock() +
              (p.demo && SITE.demoMode ? '<p class="note" style="border-left:2px solid var(--brass);padding-left:14px">' + (lang === 'en'
                ? 'Demonstration listing. Figures reflect the public Riviera Nayarit market and are not a verified listing. Ask us for live inventory.'
                : 'Ficha de demostración. Las cifras reflejan el mercado público de la Riviera Nayarit y no corresponden a un listado verificado. Pregúntanos por el inventario vigente.') + '</p>' : '') +
            '</div>' +

            '<aside class="sticky-cta">' +
              '<div class="qz" style="padding:26px 24px">' +
                '<div class="stack stack-8" style="margin-bottom:20px">' +
                  (p.priceOnRequest || !(p.price && p.price.usd)
                    ? '<span class="label">' + (lang === 'en' ? 'Private collection' : 'Colección privada') + '</span>' +
                      '<span class="display-3">' + esc(t(L.onRequest)) + '</span>'
                    : '<span class="label">' + (p.status === 'preventa' ? esc(t(L.from)) : (lang === 'en' ? 'Asking price' : 'Precio de lista')) + '</span>' +
                      '<span class="display-3 mono-num">' + PMH.moneyFull(p.price.usd) + ' <span style="font-family:var(--sans);font-size:.9rem;letter-spacing:.1em;color:var(--muted)">USD</span></span>') +
                  (p.hoa ? '<span class="note">' + esc(t(L.hoaLabel)) + ': $' + PMH.num(p.hoa.usd) + ' USD' + esc(t(L.month)) + '</span>' : '') +
                '</div>' +
                '<div class="stack stack-10" style="gap:10px">' +
                  '<a class="btn btn-primary btn-block" href="' + esc(PMH.wa(waMsg)) + '" target="_blank" rel="noopener">' +
                    (lang === 'en' ? 'Ask about this one' : 'Preguntar por esta') +
                  '</a>' +
                  '<a class="btn btn-outline btn-block" href="contacto.html?p=' + encodeURIComponent(p.id) + '">' +
                    (lang === 'en' ? 'Request the full dossier' : 'Pedir el expediente completo') +
                  '</a>' +
                '</div>' +
                '<p class="note" style="margin-top:16px">' + (lang === 'en'
                  ? 'You will get floor plans, dues, title status and comparable sales — not a brochure.'
                  : 'Recibes planos, cuotas, situación de escrituras y comparables de venta — no un folleto.') + '</p>' +
              '</div>' +
            '</aside>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="section bg-bone2 grain">' +
        '<div class="container">' +
          '<div class="section-head"><span class="eyebrow">' + (lang === 'en' ? 'Also available' : 'También disponibles') + '</span>' +
          '<h2 class="display-3">' + (lang === 'en' ? 'Others worth seeing' : 'Otras que vale la pena ver') + '</h2></div>' +
          '<div class="grid grid-3" data-grid data-limit="3" data-exclude="' + esc(p.id) + '"></div>' +
        '</div>' +
      '</section>';

    renderGrids();
  }

  function boot() {
    if (!window.PMH || !window.PROPERTIES) return;
    renderGrids();
    renderZones();
    renderTestimonials();
    initCatalog();
    initDetail();
    document.addEventListener('langchange', function () {
      renderGrids();
      renderZones();
      renderTestimonials();
      if (document.querySelector('[data-detail]')) initDetail();
    });
  }

  if (document.readyState !== 'loading') boot();
  else document.addEventListener('DOMContentLoaded', boot);
})();
