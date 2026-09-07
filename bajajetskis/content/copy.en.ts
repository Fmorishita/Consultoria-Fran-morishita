/**
 * ENGLISH COPY — written for the coastal expat buyer (Rosarito / Ensenada,
 * 45–65, comparing against San Diego). Same voice as the Spanish: direct,
 * mechanically literate, no agency language. Not a literal translation.
 */

import type { Copy } from './copy.es'

export const en: Copy = {
  meta: {
    lang: 'en',
    siteName: 'Baja Jetskis',
    tagline: 'Rebuilt personal watercraft, properly registered · Ensenada, B.C.',
    home: {
      title: 'Baja Jetskis | Rebuilt personal watercraft for sale in Ensenada',
      description:
        'Shop-rebuilt jet skis in Baja California with current SEMAR registration, a written warranty and a local mechanic. We deliver in Ensenada, Rosarito, Tijuana, Mexicali and San Felipe.',
    },
    inventario: {
      title: 'Available inventory | Baja Jetskis Ensenada',
      description:
        'Used Yamaha, Sea-Doo and Kawasaki personal watercraft rebuilt in Baja California, with declared engine hours, clean paperwork and a warranty.',
    },
    taller: {
      title: 'The shop | How every unit gets rebuilt · Baja Jetskis',
      description:
        'The person who sells you the ski is the person who fixes it. Here is how each unit is rebuilt before it goes on sale in Ensenada, Baja California.',
    },
    contacto: {
      title: 'Contact | Baja Jetskis Ensenada',
      description:
        'We are in Ensenada, Baja California. Message us on WhatsApp at +52 646 256 3006 — we answer in under 15 minutes during business hours.',
    },
  },

  nav: {
    inicio: 'Home',
    inventario: 'Inventory',
    taller: 'The shop',
    contacto: 'Contact',
    cta: 'WhatsApp',
    menu: 'Open menu',
    cerrar: 'Close menu',
    idioma: 'Español',
    saltarAlContenido: 'Skip to content',
  },

  hero: {
    eyebrow: 'Ensenada, Baja California',
    titulo: 'The only way to buy a personal watercraft in Baja without the fear.',
    parrafo:
      'We buy used or broken units, a specialized mechanic rebuilds them completely, and we sell them with current registration, a written warranty and his phone number in the folder. None of these skis came off a Marketplace listing.',
    ctaPrimario: 'See available inventory',
    ctaWhatsapp: 'Ask on WhatsApp',
    microcopy: 'We answer in under 15 minutes during business hours.',
    imagenAlt: 'Rebuilt personal watercraft at the Baja Jetskis shop in Ensenada',
    sello: 'Rebuilt, not flipped',
  },

  confianza: {
    items: [
      { titulo: 'Clean paperwork', detalle: 'Current SEMAR registration' },
      { titulo: 'Written warranty', detalle: '6 months of mechanical backing' },
      { titulo: 'Specialized mechanic', detalle: 'Whoever sells it, fixes it' },
      { titulo: 'Delivery across Baja', detalle: 'Ensenada, Tijuana, Mexicali, San Felipe' },
    ],
  },

  destacadas: {
    eyebrow: 'Inventory',
    titulo: 'What is on the floor today',
    parrafo:
      'Every unit is listed with its year, its real engine hours and the list of what was replaced. If something is not here, it is still in the shop.',
    verTodo: 'See the full inventory',
    vacio: 'No units are listed right now. Message us and we will tell you as soon as one comes in.',
    vacioCta: 'Tell me when something comes in',
  },

  proceso: {
    eyebrow: 'How we work',
    titulo: 'Four steps between a broken ski and the one you take home',
    parrafo:
      'This is the work you never see behind a Marketplace listing, and it is exactly why a unit costs a little more here.',
    pasos: [
      {
        numero: '01',
        titulo: 'We buy it broken',
        texto:
          'We look for units with a good hull and a bad maintenance history. We pay for the hull, not for the promise: if the serial number or the paperwork does not add up, it never enters the shop.',
      },
      {
        numero: '02',
        titulo: 'Teardown and diagnosis',
        texto:
          'Compression on every cylinder, a pressure test on the cooling system, and an inspection of the driveshaft, jet pump and wiring harness. That is where the replacement list comes from.',
      },
      {
        numero: '03',
        titulo: 'Rebuilt with real parts',
        texto:
          'OEM parts where it matters: fuel pump, seals, supercharger bearings, impeller. Then it goes into open water for a real test, not onto a garden hose.',
      },
      {
        numero: '04',
        titulo: 'Paperwork and handover',
        texto:
          'SEMAR registration, original invoice and the title transfer signed with you present. We hand it over on the water and show you how to load, launch and rinse it.',
      },
    ],
  },

  comparativa: {
    eyebrow: 'The honest comparison',
    titulo: 'In Baja you have four ways to get on a personal watercraft',
    parrafo:
      'You already know three of them. This table is not built to make us look good — it is built so you can see where your money goes on each path.',
    columnas: ['Keep renting', 'Facebook Marketplace', 'Tijuana dealership', 'Baja Jetskis'],
    filas: [
      {
        criterio: 'What you pay up front',
        valores: [
          'MX$1,800 – $2,500 per hour',
          'The cheapest number on the market',
          'New unit from US$18,000',
          'US$8,000 – $15,000, rebuilt',
        ],
      },
      {
        criterio: 'Paperwork',
        valores: [
          'Not yours',
          'Almost never complete',
          'Complete',
          'Current SEMAR registration and invoice',
        ],
      },
      {
        criterio: 'Who answers when it fails',
        valores: [
          'Nobody — you already handed it back',
          'The seller stops replying',
          'A shop two and a half hours away',
          'The same mechanic who built it',
        ],
      },
      {
        criterio: 'Unit history',
        valores: [
          'Not applicable',
          '"It runs great", and that is it',
          'Zero hours',
          'Hours, compression and parts list in writing',
        ],
      },
      {
        criterio: 'What you own after three years',
        valores: [
          'Nothing. And over MX$90,000 spent across three weekend summers',
          'A ski of unclear origin and a mechanic you have to find yourself',
          'A new ski and a loan',
          'A ski with history, paperwork and a shop you know',
        ],
      },
    ],
    cierre: {
      titulo: 'The math almost nobody does',
      texto:
        'Eight weekends a year, three hours each, at MX$2,000 an hour. That is MX$48,000 per summer. Three summers and you have paid for a whole personal watercraft — except you do not own one.',
      cta: 'I did the math, show me what you have',
    },
  },

  testimonios: {
    eyebrow: 'Who already bought',
    titulo: 'What was holding them back',
    parrafo:
      'None of them came looking for fun — they took that for granted. They all arrived with the same fear of being sold junk.',
    avisoPlaceholder:
      'Sample testimonials while the real ones are collected. These are not actual customers.',
    etiquetaMiedo: 'What worried them',
  },

  permuta: {
    eyebrow: 'We take yours in trade',
    titulo: 'Bring the one you have and pay the difference',
    parrafo:
      'If you already own a personal watercraft — even if it does not run, even if the paperwork is incomplete — we appraise it and take it against the one you are buying. We rebuild it afterwards; that is the business.',
    puntos: [
      'Appraised from photos over WhatsApp, same day',
      'We take units that do not start',
      'If paperwork is missing, we handle the filing',
      'The appraisal comes straight off your price',
    ],
    cta: 'Appraise mine',
  },

  faq: {
    eyebrow: 'Frequently asked',
    titulo: 'What everyone asks before handing over the money',
    preguntas: [
      {
        p: 'What if it turns out to be a bad one?',
        r: 'You get six months of written warranty on the engine and jet drive, and the shop is right here in Ensenada. If something fails, you bring it in; if it is covered, you pay neither labor nor parts. What the warranty does not cover — an impact, sand in the pump, skipped maintenance — we tell you plainly before you sign.',
      },
      {
        p: 'Why does it cost more than Marketplace?',
        r: 'Because on Marketplace you are buying a promise and here you are buying work already done. The price gap usually runs US$1,500 to $3,000, which is roughly a supercharger service plus a fuel pump plus the registration filing. If the Marketplace unit needs any one of those three, it already cost you more.',
      },
      {
        p: 'Is the paperwork valid in San Felipe, or crossing into the United States?',
        r: 'SEMAR registration is federal: it is valid throughout Mexico, on the Pacific and in the Sea of Cortez. To cross into the United States with the unit on a trailer you also need the corresponding customs filing; we tell you exactly what it takes, though that filing is yours to do.',
      },
      {
        p: 'How many engine hours are too many?',
        r: 'On a four-stroke with maintenance kept up, past 300 hours it starts to matter. Under 150 is a young unit. But hours alone tell you nothing: how it was stored and whether it was flushed with fresh water matter more. That is why we also publish the compression of every cylinder.',
      },
      {
        p: 'Can I bring my own mechanic to inspect it?',
        r: 'Yes, and we think you should. Bring whoever you want, whenever you want, before you pay. We only ask for an appointment so the unit is dry and ready.',
      },
      {
        p: 'Can I put a deposit down or pay in installments?',
        r: 'A deposit holds it and the unit comes off the listing under your name. We do not offer in-house financing, but several buyers have closed with bank credit or in two payments. Tell us what works and we will look at it.',
      },
      {
        p: 'Do you deliver outside Ensenada?',
        r: 'Yes. We deliver to Rosarito, Tijuana, Mexicali and San Felipe for a transport fee based on distance. Delivery always includes an on-water test, here or there.',
      },
      {
        p: 'Does it include a trailer?',
        r: 'It depends on the unit and it is stated on every listing. When it does not, we find you a good used one or tell you where to buy one without being taken for a ride.',
      },
    ],
  },

  ctaFinal: {
    eyebrow: 'Next step',
    titulo: 'Tell us what you are after and we will tell you what we have',
    parrafo:
      'No long forms, no salesperson calling you. You message on WhatsApp, we answer with photos, engine hours and price. If we do not have what you want, we say so.',
    cta: 'Message on WhatsApp',
    secundario: 'See inventory',
    horario: 'Monday to Friday 9:00 – 18:00 · Saturday 9:00 – 15:00',
  },

  inventario: {
    eyebrow: 'Inventory',
    titulo: 'Available units',
    parrafo:
      'Everything here has already left the shop with its paperwork ready. Units on deposit stay listed until they are handed over, and so do sold ones: we do not erase the record.',
    filtros: {
      titulo: 'Filter',
      marca: 'Make',
      anio: 'Year',
      precio: 'Price',
      todas: 'All',
      todos: 'All',
      limpiar: 'Clear filters',
      resultados: (n: number) => (n === 1 ? '1 unit found' : `${n} units found`),
      vacio: 'No unit matches that filter.',
      vacioAyuda:
        'Drop a filter or message us: we often have units in the shop that are not listed yet.',
      vacioCta: 'Ask about a specific unit',
      rangos: [
        { id: 'todos', etiqueta: 'All' },
        { id: 'bajo', etiqueta: 'Under US$10,000' },
        { id: 'medio', etiqueta: 'US$10,000 – $13,000' },
        { id: 'alto', etiqueta: 'Over US$13,000' },
      ],
    },
  },

  unidad: {
    volver: 'Back to inventory',
    horas: 'Engine hours',
    anio: 'Year',
    plazas: 'Seats',
    motor: 'Engine',
    potencia: 'Power',
    admision: 'Induction',
    tanque: 'Fuel tank',
    peso: 'Dry weight',
    remolque: 'Trailer',
    sinRemolque: 'Trailer not included',
    garantia: 'Warranty',
    meses: (n: number) => `${n} months, in writing`,
    especificaciones: 'Specifications',
    reconstruccionTitulo: 'What was replaced',
    reconstruccionTexto:
      'This list comes from this unit’s own shop order, not from a template. The same sheet goes in the folder you take home.',
    papelesTitulo: 'Paperwork status',
    papelesMatricula: 'Current SEMAR registration',
    papelesFactura: 'Original invoice',
    papelesVerificacion: 'Title transfer included',
    entregaTitulo: 'Delivery',
    cta: 'Ask about this unit',
    ctaSticky: 'Ask on WhatsApp',
    ctaPago: 'See payment options',
    ctaPar: 'Quote the pair',
    parTitulo: 'This unit has a twin',
    parTexto:
      'They came in together and left the same shop. Take both and the price improves.',
    verGemela: 'See the twin',
    fotosPlaceholder:
      'Reference photo. The real shots of this unit go up as soon as they come back from the shoot.',
    galeriaAnterior: 'Previous photo',
    galeriaSiguiente: 'Next photo',
    otrasUnidades: 'Other available units',
    precioNota: 'Price in US dollars. Payable in pesos at the day’s exchange rate.',
    aproxMXN: (mxn: string) => `≈ ${mxn}`,
  },

  estados: {
    disponible: 'Available',
    apartada: 'On deposit',
    vendida: 'Sold',
    apartadaNota: 'A deposit is down. If you want one like it, let us know.',
    vendidaNota: 'Already delivered. We leave it up as a record.',
  },

  taller: {
    eyebrow: 'The shop',
    titulo: 'Whoever sells it to you is the one who fixes it',
    intro:
      'This page exists for one reason: you are about to spend eight to fifteen thousand dollars with people you barely know. The least you deserve is to know who will have his hands inside your ski.',
    mecanicoTitulo: 'The man who rebuilds them',
    mecanicoTexto:
      'He has spent {anos} years repairing marine engines in Ensenada. He started fixing whatever broke in the rental fleet — the hardest school there is, because a rental unit works harder in one weekend than a private one does in a year — and from there specialized in {especialidad}.',
    mecanicoCita:
      '"I don’t sell skis. I hand over skis I already fixed. That’s different: if I sell you a bad one, you bring it back to me."',
    numeros: [
      { valor: '{anosEnEnsenada} years', etiqueta: 'repairing marine engines in Ensenada' },
      { valor: '{unidadesEntregadas}+', etiqueta: 'units delivered' },
      { valor: '{unidadesEnTallerAlMes}', etiqueta: 'units rebuilt per month, maximum' },
    ],
    capacidadTitulo: 'Why there are only a few units at a time',
    capacidadTexto:
      'Because a properly rebuilt ski takes weeks, not days. We would rather have four units done right than twenty listed and none tested. If you do not see what you want, it is usually a matter of waiting for the next one out.',
    garantiaTitulo: 'What the warranty covers, and what it does not',
    garantiaCubre: [
      'Engine and cooling system',
      'Jet pump, driveshaft and coupler',
      'Electrical and charging system',
      'Parts we installed ourselves',
    ],
    garantiaNoCubre: [
      'Impacts, groundings and sand in the pump',
      'Skipping the fresh-water flush',
      'Modifications made after handover',
      'Consumables: plugs, oil, anodes',
    ],
    cta: 'Ask about the shop and the warranty',
  },

  contacto: {
    eyebrow: 'Contact',
    titulo: 'We are in Ensenada, and we are still here after the sale',
    parrafo:
      'The fastest way through is WhatsApp: we answer in under 15 minutes during business hours, with photos and prices. If you would rather come by, book a time and we will have the unit dry and ready.',
    whatsappTitulo: 'WhatsApp',
    whatsappTexto: 'The direct line. Tell us what you are after and what city you are writing from.',
    ubicacionTitulo: 'Where we are',
    horarioTitulo: 'Hours',
    coberturaTitulo: 'Where we deliver',
    coberturaTexto:
      'Ensenada at no charge. Rosarito, Tijuana, Mexicali and San Felipe for a transport fee based on distance. Delivery always includes an on-water test.',
    mapaTitulo: 'Open the location on the map',
    mapaAlt: 'Map showing the Baja Jetskis location in Ensenada, Baja California',
    cta: 'Open WhatsApp',
  },

  footer: {
    descripcion:
      'Rebuilt personal watercraft for sale in Ensenada, Baja California. Clean paperwork, a written warranty and our own shop.',
    navTitulo: 'Site',
    contactoTitulo: 'Contact',
    zonaTitulo: 'Coverage',
    zonas: 'Ensenada · Rosarito · Tijuana · Mexicali · San Felipe',
    derechos: 'All rights reserved.',
    marcas:
      'Jet Ski® is a registered trademark of Kawasaki Heavy Industries. Yamaha® and Sea-Doo® belong to their respective owners. Baja Jetskis is not affiliated with any of these manufacturers: it independently sells used and rebuilt units.',
    creditos: 'Baja Jetskis website',
  },

  whatsapp: {
    flotante: 'Message on WhatsApp',
    aria: 'Open a WhatsApp conversation with Baja Jetskis',
  },

  general: {
    usd: 'USD',
    desde: 'From',
    hrs: 'hrs',
    error404Titulo: 'That page does not exist',
    error404Texto:
      'The unit you were looking for may have sold and moved address. Here is what we have today.',
    error404Cta: 'See available inventory',
  },
}
