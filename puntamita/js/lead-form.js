/* ============================================================
   PUNTA MITA HOMES — Calificador de prospectos
   Formulario multi-paso + scoring + Supabase + WhatsApp
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Definición de pasos ----------
     w = puntos que aporta cada respuesta al score (0-100). */
  var STEPS = [
    {
      key: 'objetivo', type: 'radio',
      q: { es: '¿Qué te trae a la Riviera Nayarit?', en: 'What brings you to Riviera Nayarit?' },
      hint: { es: 'Elige lo que más se parezca a tu plan.', en: 'Pick whichever is closest to your plan.' },
      cols: 1,
      options: [
        { v: 'segunda-casa', w: 15, es: 'Una segunda casa', en: 'A second home', subEs: 'Para usarla algunas semanas al año', subEn: 'To use a few weeks a year' },
        { v: 'inversion',    w: 15, es: 'Inversión con renta', en: 'An income property', subEs: 'Que se pague sola con renta vacacional', subEn: 'That pays for itself with vacation rentals' },
        { v: 'mudarme',      w: 13, es: 'Mudarme o retirarme aquí', en: 'To move or retire here', subEs: 'Vivir la mayor parte del año', subEn: 'Living here most of the year' },
        { v: 'terreno',      w: 12, es: 'Terreno para construir', en: 'Land to build on', subEs: 'Un proyecto a mi medida', subEn: 'A project of my own' },
        { v: 'explorando',   w:  4, es: 'Todavía estoy explorando', en: 'Still exploring', subEs: 'Quiero entender el mercado', subEn: 'I want to understand the market' }
      ]
    },
    {
      key: 'zonas', type: 'multi',
      q: { es: '¿Qué zonas te interesan?', en: 'Which areas interest you?' },
      hint: { es: 'Puedes elegir varias. Si no lo sabes todavía, también está bien.', en: 'Choose as many as you like. Not sure yet is fine too.' },
      cols: 2, optional: true,
      options: 'ZONES'
    },
    {
      key: 'tipo', type: 'multi',
      q: { es: '¿Qué tipo de propiedad buscas?', en: 'What type of property are you after?' },
      cols: 2, optional: true,
      options: 'TYPES'
    },
    {
      key: 'presupuesto', type: 'radio',
      q: { es: '¿En qué rango se mueve tu presupuesto?', en: 'What is your budget range?' },
      hint: { es: 'En dólares. Nos ayuda a mostrarte solo lo que sí aplica.', en: 'In US dollars. It helps us show you only what actually fits.' },
      cols: 2,
      options: [
        { v: 'lt-300k',  w:  8, es: 'Menos de $300,000', en: 'Under $300,000' },
        { v: '300-600k', w: 14, es: '$300,000 – $600,000', en: '$300,000 – $600,000' },
        { v: '600k-1m',  w: 18, es: '$600,000 – $1M', en: '$600,000 – $1M' },
        { v: '1-2m',     w: 22, es: '$1M – $2M', en: '$1M – $2M' },
        { v: '2-5m',     w: 25, es: '$2M – $5M', en: '$2M – $5M' },
        { v: 'gt-5m',    w: 25, es: 'Más de $5M', en: 'Over $5M' },
        { v: 'definir',  w:  6, es: 'Aún por definir', en: 'Still to be defined' }
      ]
    },
    {
      key: 'tiempo', type: 'radio',
      q: { es: '¿Para cuándo quieres tener las llaves?', en: 'When do you want the keys in hand?' },
      hint: { es: 'Sé honesto: cambia por completo lo que te vamos a mostrar.', en: 'Be honest — it completely changes what we show you.' },
      cols: 1,
      options: [
        { v: '0-30',     w: 30, es: 'Estoy listo ahora', en: 'I am ready now', subEs: 'En los próximos 30 días', subEn: 'Within the next 30 days' },
        { v: '1-3m',     w: 24, es: 'En 1 a 3 meses', en: 'In 1 to 3 months' },
        { v: '3-6m',     w: 16, es: 'En 3 a 6 meses', en: 'In 3 to 6 months' },
        { v: '6-12m',    w:  8, es: 'En 6 a 12 meses', en: 'In 6 to 12 months' },
        { v: 'explorar', w:  2, es: 'Sin fecha, estoy investigando', en: 'No date, just researching' }
      ]
    },
    {
      key: 'pago', type: 'radio',
      q: { es: '¿Cómo tienes pensado pagarla?', en: 'How are you planning to pay?' },
      cols: 2,
      options: [
        { v: 'contado',  w: 20, es: 'De contado', en: 'Cash' },
        { v: 'preventa', w: 14, es: 'Plan de pagos en preventa', en: 'Pre-sale payment plan' },
        { v: 'credito',  w: 10, es: 'Crédito o hipoteca', en: 'Financing or mortgage' },
        { v: 'definir',  w:  6, es: 'Todavía no lo decido', en: 'Not decided yet' }
      ]
    },
    {
      key: 'conoce', type: 'radio',
      q: { es: '¿Qué tanto conoces la zona?', en: 'How well do you know the area?' },
      cols: 2,
      options: [
        { v: 'vivo',    w: 10, es: 'Vivo aquí', en: 'I live here' },
        { v: 'varias',  w:  8, es: 'He venido varias veces', en: 'I have visited several times' },
        { v: 'una',     w:  6, es: 'He venido una vez', en: 'I have visited once' },
        { v: 'nunca',   w:  3, es: 'Nunca he venido', en: 'I have never been' }
      ]
    },
    { key: 'contacto', type: 'contact' }
  ];

  var TIER_MIN_A = 70, TIER_MIN_B = 45;

  var COPY = {
    step:      { es: 'Paso', en: 'Step' },
    of:        { es: 'de',   en: 'of' },
    next:      { es: 'Continuar', en: 'Continue' },
    back:      { es: 'Atrás', en: 'Back' },
    send:      { es: 'Ver mis opciones', en: 'See my options' },
    sending:   { es: 'Enviando…', en: 'Sending…' },
    dontKnow:  { es: 'Todavía no lo sé', en: 'Not sure yet' },
    name:      { es: 'Nombre completo', en: 'Full name' },
    namePh:    { es: '¿Cómo te llamas?', en: 'What is your name?' },
    email:     { es: 'Correo electrónico', en: 'Email' },
    emailPh:   { es: 'tu@correo.com', en: 'you@email.com' },
    phone:     { es: 'WhatsApp', en: 'WhatsApp' },
    phonePh:   { es: '+52 322 000 0000', en: '+1 555 000 0000' },
    country:   { es: 'País de residencia', en: 'Country of residence' },
    countryPh: { es: 'México, EE. UU., Canadá…', en: 'Mexico, USA, Canada…' },
    notes:     { es: 'Algo más que debamos saber (opcional)', en: 'Anything else we should know (optional)' },
    notesPh:   { es: 'Fechas de viaje, requisitos especiales, propiedades que ya viste…', en: 'Travel dates, special requirements, properties you have already seen…' },
    lastQ:     { es: '¿A dónde te mandamos tu selección?', en: 'Where do we send your shortlist?' },
    lastHint:  { es: 'Recibirás solo propiedades que encajan con lo que respondiste. Sin listas masivas.', en: 'You will only get properties that match your answers. No mass mailing lists.' },
    privacy:   { es: 'Al enviar aceptas que te contactemos por WhatsApp o correo sobre propiedades. Nunca compartimos tus datos.', en: 'By submitting you agree to be contacted by WhatsApp or email about properties. We never share your data.' },
    errName:   { es: 'Necesitamos tu nombre.', en: 'We need your name.' },
    errEmail:  { es: 'Escribe un correo válido.', en: 'Enter a valid email.' },
    errPhone:  { es: 'Escribe un número con al menos 8 dígitos.', en: 'Enter a number with at least 8 digits.' },
    errPick:   { es: 'Elige una opción para continuar.', en: 'Pick an option to continue.' },
    fail:      { es: 'No se pudo enviar. Escríbenos directo por WhatsApp.', en: 'Could not send. Message us directly on WhatsApp.' }
  };

  function t(o) { return window.PMH ? PMH.t(o) : (o && o.es) || ''; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); }

  var CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
  var ARROW_L = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>';
  var ARROW_R = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

  function resolveOptions(def) {
    if (def === 'ZONES') {
      var z = (window.ZONES || []).map(function (x) {
        return { v: x.id, w: 0, es: x.name, en: x.name, subEs: x.tagline.es, subEn: x.tagline.en };
      });
      z.push({ v: 'no-se', w: 0, es: COPY.dontKnow.es, en: COPY.dontKnow.en });
      return z;
    }
    if (def === 'TYPES') {
      return (window.TYPES || []).map(function (x) { return { v: x.id, w: 0, es: x.es, en: x.en }; });
    }
    return def;
  }

  function Quiz(root) {
    var state = { i: 0, answers: {}, sending: false };
    var propertyId = root.dataset.property || '';

    function optionsFor(step) { return resolveOptions(step.options); }
    function optLabel(o) { return PMH.lang() === 'en' ? o.en : o.es; }
    function optSub(o) { return (PMH.lang() === 'en' ? o.subEn : o.subEs) || ''; }

    function field(name, label, ph, type, ac) {
      var v = state.answers[name] ? esc(state.answers[name]) : '';
      return '<div class="field" data-field="' + name + '">' +
               '<label class="label" for="qz-' + name + '">' + esc(label) + '</label>' +
               '<input class="input" id="qz-' + name + '" name="' + name + '" type="' + type + '" autocomplete="' + ac + '" placeholder="' + esc(ph) + '" value="' + v + '">' +
               '<span class="err"></span>' +
             '</div>';
    }

    function renderStep() {
      var step = STEPS[state.i];
      var total = STEPS.length;
      var pct = Math.round((state.i / total) * 100);
      var body;

      if (step.type === 'contact') {
        body = '' +
          '<h3 class="qz-q">' + esc(t(COPY.lastQ)) + '</h3>' +
          '<p class="qz-hint">' + esc(t(COPY.lastHint)) + '</p>' +
          '<div class="stack stack-16">' +
            field('nombre', t(COPY.name), t(COPY.namePh), 'text', 'name') +
            field('email', t(COPY.email), t(COPY.emailPh), 'email', 'email') +
            field('telefono', t(COPY.phone), t(COPY.phonePh), 'tel', 'tel') +
            field('pais', t(COPY.country), t(COPY.countryPh), 'text', 'country-name') +
            '<div class="field">' +
              '<label class="label" for="qz-notas">' + esc(t(COPY.notes)) + '</label>' +
              '<textarea class="textarea" id="qz-notas" name="notas" placeholder="' + esc(t(COPY.notesPh)) + '">' + esc(state.answers.notas || '') + '</textarea>' +
            '</div>' +
          '</div>' +
          '<p class="note">' + esc(t(COPY.privacy)) + '</p>';
      } else {
        var opts = optionsFor(step);
        var picked = state.answers[step.key];
        var isMulti = step.type === 'multi';
        body = '' +
          '<h3 class="qz-q">' + esc(t(step.q)) + '</h3>' +
          (step.hint ? '<p class="qz-hint">' + esc(t(step.hint)) + '</p>' : '') +
          '<div class="opts ' + (step.cols === 2 ? 'opts-2' : '') + '" role="group">' +
            opts.map(function (o) {
              var on = isMulti ? (picked || []).indexOf(o.v) > -1 : picked === o.v;
              var sub = optSub(o);
              return '<button type="button" class="opt ' + (isMulti ? '' : 'is-radio ') + (on ? 'is-on' : '') + '" data-v="' + esc(o.v) + '" aria-pressed="' + (on ? 'true' : 'false') + '">' +
                       '<span class="opt-box">' + CHECK + '</span>' +
                       '<span class="opt-text"><span class="opt-main">' + esc(optLabel(o)) + '</span>' +
                       (sub ? '<span class="opt-sub">' + esc(sub) + '</span>' : '') + '</span>' +
                     '</button>';
            }).join('') +
          '</div>';
      }

      var isLast = state.i === STEPS.length - 1;

      root.innerHTML = '' +
        '<div class="qz-head">' +
          '<div class="qz-bar"><i style="width:' + pct + '%"></i></div>' +
          '<div class="qz-meta">' +
            '<span>' + esc(t(COPY.step)) + ' ' + (state.i + 1) + ' ' + esc(t(COPY.of)) + ' ' + total + '</span>' +
            '<span>' + pct + '%</span>' +
          '</div>' +
        '</div>' +
        '<div class="qz-body">' +
          '<div class="qz-step is-live">' +
            body +
            '<p class="err" data-step-err>' + esc(t(COPY.errPick)) + '</p>' +
            '<div class="qz-nav">' +
              (state.i > 0 ? '<button type="button" class="qz-back" data-back aria-label="' + esc(t(COPY.back)) + '">' + ARROW_L + '</button>' : '') +
              '<button type="button" class="btn btn-primary" data-next>' + esc(isLast ? t(COPY.send) : t(COPY.next)) + ARROW_R + '</button>' +
            '</div>' +
          '</div>' +
        '</div>';

      bind(step);
    }

    function hideErr() { var e = root.querySelector('[data-step-err]'); if (e) e.style.display = 'none'; }
    function showErr() { var e = root.querySelector('[data-step-err]'); if (e) e.style.display = 'block'; }

    function bind(step) {
      root.querySelectorAll('.opt').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var v = btn.dataset.v;
          if (step.type === 'multi') {
            var arr = state.answers[step.key] || [];
            var k = arr.indexOf(v);
            if (k > -1) arr.splice(k, 1); else arr.push(v);
            state.answers[step.key] = arr;
            var on = arr.indexOf(v) > -1;
            btn.classList.toggle('is-on', on);
            btn.setAttribute('aria-pressed', on ? 'true' : 'false');
            hideErr();
          } else {
            state.answers[step.key] = v;
            root.querySelectorAll('.opt').forEach(function (b) {
              b.classList.toggle('is-on', b === btn);
              b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
            });
            hideErr();
            setTimeout(next, 240); // avance automático en preguntas de una sola opción
          }
        });
      });

      var backBtn = root.querySelector('[data-back]');
      if (backBtn) backBtn.addEventListener('click', function () { state.i = Math.max(0, state.i - 1); renderStep(); });
      root.querySelector('[data-next]').addEventListener('click', next);

      root.querySelectorAll('.input, .textarea').forEach(function (inp) {
        inp.addEventListener('input', function () {
          state.answers[inp.name] = inp.value;
          var f = inp.closest('.field');
          if (f) f.classList.remove('has-err');
        });
      });
    }

    function next() {
      var step = STEPS[state.i];
      if (step.type === 'contact') return submit();
      var a = state.answers[step.key];
      var empty = step.type === 'multi' ? !(a && a.length) : !a;
      if (empty && !step.optional) return showErr();
      state.i = Math.min(STEPS.length - 1, state.i + 1);
      renderStep();
      keepInView();
    }

    function keepInView() {
      var r = root.getBoundingClientRect();
      if (r.top < 70) window.scrollTo({ top: r.top + window.scrollY - 100, behavior: 'smooth' });
    }

    function validateContact() {
      var ok = true;
      function fail(name, msg) {
        var f = root.querySelector('[data-field="' + name + '"]');
        if (f) { f.classList.add('has-err'); f.querySelector('.err').textContent = msg; }
        ok = false;
      }
      var n = (state.answers.nombre || '').trim();
      var e = (state.answers.email || '').trim();
      var p = (state.answers.telefono || '').trim();
      if (n.length < 2) fail('nombre', t(COPY.errName));
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e)) fail('email', t(COPY.errEmail));
      if (p.replace(/\D/g, '').length < 8) fail('telefono', t(COPY.errPhone));
      return ok;
    }

    function score() {
      var s = 0;
      STEPS.forEach(function (step) {
        if (step.type === 'contact') return;
        var opts = optionsFor(step);
        var a = state.answers[step.key];
        if (!a) return;
        var vals = step.type === 'multi' ? a : [a];
        var best = 0;
        vals.forEach(function (v) {
          opts.forEach(function (o) { if (o.v === v && o.w > best) best = o.w; });
        });
        s += best;
      });
      return Math.min(100, s);
    }

    function tier(s) { return s >= TIER_MIN_A ? 'A' : (s >= TIER_MIN_B ? 'B' : 'C'); }

    function labelOf(key) {
      var step = STEPS.filter(function (x) { return x.key === key; })[0];
      if (!step) return '';
      var opts = resolveOptions(step.options);
      var a = state.answers[key];
      if (!a) return '';
      var vals = step.type === 'multi' ? a : [a];
      return vals.map(function (v) {
        var o = opts.filter(function (x) { return x.v === v; })[0];
        return o ? (o.es || o.en) : v;
      }).join(', ');
    }

    function payload(s, tr) {
      var utm = PMH.utms();
      return {
        nombre: state.answers.nombre || '',
        email: state.answers.email || '',
        telefono: state.answers.telefono || '',
        pais: state.answers.pais || '',
        notas: state.answers.notas || '',
        objetivo: labelOf('objetivo'),
        zonas: labelOf('zonas'),
        tipo: labelOf('tipo'),
        presupuesto: labelOf('presupuesto'),
        tiempo: labelOf('tiempo'),
        pago: labelOf('pago'),
        conoce_zona: labelOf('conoce'),
        propiedad: propertyId,
        score: s,
        tier: tr,
        idioma: PMH.lang(),
        origen: location.pathname,
        utm_source: utm.utm_source || '',
        utm_medium: utm.utm_medium || '',
        utm_campaign: utm.utm_campaign || '',
        utm_content: utm.utm_content || '',
        utm_term: utm.utm_term || ''
      };
    }

    function waMessage(d) {
      var en = PMH.lang() === 'en';
      var L = en
        ? ['Hi ' + SITE.agent + ', I just filled out the form on your site.', '', 'Name: ' + d.nombre, 'Goal: ' + d.objetivo, 'Areas: ' + d.zonas, 'Type: ' + d.tipo, 'Budget: ' + d.presupuesto, 'Timeline: ' + d.tiempo, 'Payment: ' + d.pago]
        : ['Hola ' + SITE.agent + ', acabo de llenar el formulario de tu sitio.', '', 'Nombre: ' + d.nombre, 'Objetivo: ' + d.objetivo, 'Zonas: ' + d.zonas, 'Tipo: ' + d.tipo, 'Presupuesto: ' + d.presupuesto, 'Tiempo: ' + d.tiempo, 'Pago: ' + d.pago];
      if (d.propiedad) L.push((en ? 'Property: ' : 'Propiedad: ') + d.propiedad);
      if (d.notas) L.push((en ? 'Notes: ' : 'Notas: ') + d.notas);
      return L.join('\n');
    }

    function save(d) {
      var cfg = SITE.supabase;
      if (!cfg || !cfg.url || !cfg.key) return Promise.resolve({ skipped: true });
      return fetch(cfg.url.replace(/\/$/, '') + '/rest/v1/' + cfg.table, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: cfg.key,
          Authorization: 'Bearer ' + cfg.key,
          Prefer: 'return=minimal'
        },
        body: JSON.stringify(d)
      });
    }

    function submit() {
      if (state.sending) return;
      if (!validateContact()) return;

      state.sending = true;
      var btn = root.querySelector('[data-next]');
      btn.disabled = true;
      btn.innerHTML = esc(t(COPY.sending));

      var s = score(), tr = tier(s);
      var d = payload(s, tr);

      /* Abrimos la pestaña dentro del gesto del usuario para que el
         navegador no la bloquee mientras esperamos a Supabase. */
      var waWin = tr !== 'C' ? window.open('about:blank', '_blank') : null;

      function finish() {
        try { sessionStorage.setItem('pmh_lead', JSON.stringify({ tier: tr, score: s, nombre: d.nombre })); } catch (e) {}
        if (waWin) waWin.location.href = PMH.wa(waMessage(d));
        location.href = 'gracias.html?t=' + tr + '&lang=' + PMH.lang();
      }

      save(d).then(finish).catch(function () {
        /* El lead vale más que el registro: si Supabase falla igual
           lo mandamos a WhatsApp en vez de perderlo. */
        if (waWin) return finish();
        state.sending = false;
        btn.disabled = false;
        btn.innerHTML = esc(t(COPY.send)) + ARROW_R;
        var e = root.querySelector('[data-step-err]');
        if (e) { e.textContent = t(COPY.fail); e.style.display = 'block'; }
      });
    }

    document.addEventListener('langchange', renderStep);
    renderStep();
  }

  function boot() {
    document.querySelectorAll('[data-quiz]').forEach(function (el) { new Quiz(el); });
  }
  if (document.readyState !== 'loading') boot();
  else document.addEventListener('DOMContentLoaded', boot);
})();
