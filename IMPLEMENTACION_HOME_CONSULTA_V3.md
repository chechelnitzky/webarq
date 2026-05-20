# Implementación home consulta inicial — V3

## Qué se ejecutó

Se rediseñó la home como landing premium de consulta inicial, con foco en claridad comercial, autoridad visual y captura de leads mediante formulario, no WhatsApp como acción principal.

## Cambios principales

- Home reescrita completa (`index.html`).
- Nuevo sistema visual específico para home (`assets/css/home-consulta.css`).
- Nuevo JavaScript para menú móvil, selección de tipo de caso, tracking y placeholder de formulario (`assets/js/home-consulta.js`).
- Nuevos assets HD WebP en `assets/img/landing/`:
  - `hero-consulta-desktop-3200.webp`
  - `hero-consulta-desktop-1920.webp`
  - `hero-consulta-mobile-1800.webp`
  - `hero-consulta-mobile-1200.webp`
  - `situacion-residencial.webp`
  - `situacion-comercial.webp`
  - `situacion-factibilidad.webp`
  - `situacion-orientacion.webp`
  - `form-intake.webp`
  - `authority-technical.webp`
  - `case-alef-editorial.webp`
  - `case-oficina-editorial.webp`
  - `case-sanpablo-editorial.webp`

## Dirección comercial aplicada

La home deja de vender una lista de servicios y ahora empuja una consulta inicial guiada:

Usuario con problema caro → entiende que Joseph ordena el caso → elige situación → ve proceso → confía por autoridad/casos → completa formulario.

## Estructura nueva de home

1. Header premium + CTA a `#consulta`.
2. Hero limpio con promesa clara: “Aclaremos si tu proyecto se puede hacer antes de gastar de más”.
3. Franja de confianza con áreas de trabajo.
4. Selector “¿Qué necesitas resolver?”.
5. Proceso tipo Muse/Mata en 4 pasos.
6. Bloque de autoridad técnico/normativo/comercial.
7. Casos reales como prueba comercial.
8. Rutas posibles agrupadas estratégicamente.
9. Formulario de consulta inicial como ficha profesional.
10. Guías útiles.
11. FAQ.
12. CTA final.
13. Footer institucional.

## Backend del formulario

Se dejó placeholder frontend. Al enviar:

- valida campos requeridos;
- guarda un borrador en `localStorage`;
- muestra mensaje de éxito;
- dispara evento `form_consulta_submit` a `dataLayer`.

TODO backend recomendado:

1. Google Sheets vía Apps Script.
2. Formspree / Tally / Getform.
3. TidyCal/Calendly posterior al envío.

## Tracking incluido

- `cta_consulta_inicial_click`
- `cta_proceso_click`
- `form_consulta_submit`
- `whatsapp_click`

Todos los CTA principales de la home apuntan a `#consulta` y no a WhatsApp.

## Ajustes globales menores

En páginas internas se actualizó el anchor global antiguo `/#agenda` a `/#consulta` y se reemplazaron textos de “Agendar llamada” por “Agendar consulta” o “Enviar consulta inicial”.

## QA realizado

- ZIP validado con `unzip -t` sin errores.
- Imágenes usadas en home existen en disco.
- Home tiene un solo H1.
- Hero usa `picture`, `srcset`, WebP y `fetchpriority="high"`.
- WhatsApp queda secundario.
- Formulario no envía aún a backend real por decisión estratégica de dejarlo en pausa.
