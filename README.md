# Consultoría Fran Morishita — Landing Page

Landing page de alta conversión para los servicios de consultoría de crecimiento de Fran Morishita: páginas web, Meta Ads, escalamiento de negocios, marketing digital, inteligencia artificial, CRM y sistemas de ventas, con especialidad en Real Estate, E-commerce y Gastronomía.

## Estructura

| Archivo | Descripción |
|---|---|
| `index.html` | Estructura y copy de todas las secciones |
| `styles.css` | Sistema de diseño (dark premium + dorado), animaciones y responsive |
| `script.js` | Animaciones de scroll, contadores, menú móvil y formulario de leads |

## Secciones

1. **Hero** — titular de impacto, prueba social (+$100 MDP, +10 años) y doble CTA
2. **Marquesina** — nichos y servicios en movimiento
3. **El problema** — puntos de dolor del dueño de negocio
4. **Servicios** — 6 tarjetas con efecto de luz que sigue el cursor
5. **Método** — 4 pasos: diagnóstico, estrategia, ejecución conjunta, escalamiento
6. **Nichos** — Real Estate, E-commerce y Gastronomía
7. **Sobre Fran** — credenciales y colaboraciones (Gus Marcos de MTY)
8. **Comparativa** — agencia tradicional vs. Consultoría Morishita
9. **FAQ** — objeciones frecuentes en acordeón
10. **Contacto** — formulario de captura de leads + urgencia
11. **Footer** + botón flotante de WhatsApp

## Antes de publicar

- [ ] **WhatsApp**: reemplaza `521XXXXXXXXXX` por el número real en `script.js` (constante `WHATSAPP_NUMBER`) y en el enlace del botón flotante en `index.html`.
- [ ] **Foto de Fran**: en la sección "Sobre Fran" de `index.html` hay un placeholder `FM`; sustitúyelo por `<img src="assets/fran.jpg" alt="Fran Morishita" />`.
- [ ] **Formulario**: por defecto el formulario abre WhatsApp con los datos del lead. Para enviarlo a un CRM, Formspree o Make/Zapier, reemplaza la lógica de envío en `script.js`.
- [ ] **Dominio y analítica**: agrega tu píxel de Meta y Google Analytics antes de correr pauta.

## Cómo verlo en local

No requiere build ni dependencias:

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

## Despliegue

Es un sitio 100% estático: puede publicarse directo en **GitHub Pages**, **Netlify**, **Vercel** o cualquier hosting.
