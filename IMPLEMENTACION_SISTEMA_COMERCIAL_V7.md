# Implementación sistema comercial v7

Cambios aplicados:

1. Header unificado en páginas internas con navegación a Inicio, Servicios, Casos, Guías, Contacto y CTA principal “Consulta inicial”.
2. Mega menú de Servicios con accesos a casas, remodelaciones, permisos, regularizaciones, recepción final, oficinas/locales y asesoría antes de comprar.
3. Footer unificado con mapa completo de servicios, guías, comunas y contacto.
4. Página `/contacto/` reemplazada por formulario central conectado al mismo backend de Google Sheets.
5. CTAs principales de páginas internas convertidos desde WhatsApp hacia `/contacto/`, con parámetros contextuales cuando aplica.
6. Botón flotante de WhatsApp agregado en todas las páginas como vía secundaria rápida.
7. Formulario central con `data-lead-form="true"` y envío rápido vía `sendBeacon`/`fetch` a Google Apps Script.
8. Estilos de consistencia agregados en `/assets/css/conversion-system.css`.
9. Configuración del Web App activa en `/assets/js/config.js`.
10. Corrección global del nombre a “Joseph Chechelnitzky Arquitecto”.

Objetivo del sistema:

Home premium + páginas SEO específicas + formulario central + thank you page + Sheet/email + WhatsApp secundario.
