# Auditoría final — Joseph Chechelnitzky Arquitecto

## Resumen ejecutivo

Se corrigió la versión del sitio estático para dejarla lista para subir a GitHub Pages en `https://chechelnitzky.github.io/webarq/`.

La intervención priorizó:

- Corrección del botón flotante de WhatsApp.
- Limpieza de precios cerrados y textos prohibidos.
- Reexportación de héroes en WebP responsive con `srcset`.
- Centralización de configuración base.
- Refuerzo comercial de oficinas y locales.
- Revisión de rutas internas y archivos obligatorios.

## Cambios principales realizados

### 1. Marca y naming

Marca usada en el sitio:

**Joseph Chechelnitzky Arquitecto**

Se verificó que no queden apariciones de:

- Joseph Chechelnitzky
- Joseph Chechelnitzki
- Arquicheche como marca principal
- Estudio de Cabida como marca de esta web

### 2. Configuración centralizada

Archivos relevantes:

- `site.config.json`
- `assets/js/config.js`

Variables centralizadas:

- brandName
- baseUrl
- whatsappNumber
- whatsappDisplay
- city
- email/useEmail
- openingHours
- gtmEnabled
- analyticsEnabled
- clarityEnabled

No se muestra email vacío ni placeholder en el front.

### 3. Héroes responsive

Se generaron exports WebP responsive para todos los héroes obligatorios:

- Desktop 1920
- Desktop 3200
- Mobile 1200
- Mobile 1800

Todas las páginas con hero principal usan ahora:

- `<picture>`
- `srcset`
- `sizes="100vw"`
- `fetchpriority="high"`
- `decoding="async"`
- `width` y `height`

Los héroes fueron reexportados desde los mejores assets disponibles en el ZIP original, con compresión menos agresiva y ligero sharpening. Nota honesta: no se crearon imágenes nuevas con generación nativa externa dentro de esta intervención; por lo tanto, la calidad final depende del material base incluido en el ZIP. Se evitó extraer héroes desde screenshots nuevos y se dejaron variantes 3200/1800 para evitar pixelación por falta de `srcset` y compresión excesiva.

### 4. Assets reemplazados / completados

Se generaron y/o completaron nombres requeridos para:

- Héroes obligatorios.
- Cards de servicios.
- Casos.
- Guías.

El detalle está en:

- `assets-manifest.json`

### 5. Botón flotante de WhatsApp

Se eliminó el botón anterior que mezclaba texto real, span visible y pseudo-elementos CSS.

Problema corregido:

- El botón anterior podía mostrar duplicación tipo “WhatsAppWhatsApp”.

Nuevo comportamiento:

- Botón circular fijo.
- Fondo `#25D366`.
- Ícono blanco SVG centrado.
- Sin texto visible.
- `aria-label="Hablar por WhatsApp"`.
- `title="Hablar por WhatsApp"`.
- Tamaño 58 x 58 px.
- Hover con leve elevación y sombra.
- Sin barra mobile duplicada.

### 6. CTAs de WhatsApp

Los CTAs internos mantienen mensajes contextuales por servicio/página cuando estaban disponibles, por ejemplo:

- permisos municipales
- obra menor
- regularización
- recepción final
- ampliación
- remodelaciones
- oficinas
- local comercial
- diseño de casas
- precios/contacto

El botón flotante general usa mensaje base de evaluación de proyecto.

### 7. Precios y contenido económico

Se eliminaron precios cerrados visibles y referencias prohibidas.

Búsqueda final sin coincidencias para:

- `$90.000`
- `$150.000`
- `$450.000`
- `$700.000`
- `$900.000`
- `$1.200.000`
- `$1.500.000`
- `$1.800.000`
- `$2.500.000`
- `IVA incluido`
- `desde $`

La única referencia económica explícita que queda es la permitida para diseño arquitectónico:

**1 a 2,5 UF/m²**

### 8. Oficinas y locales comerciales

Se reforzó el nicho en:

- Home.
- Menú / mega menú.
- Servicios.
- Cards.
- Footer.
- Casos relacionados.
- CTA interno.

En Home se agregó/reforzó una sección específica:

**“Oficinas y locales: proyectos que necesitan abrir, operar o regularizar”**

Con cards para:

- Habilitación de oficinas.
- Local comercial.
- Consulta dental / oficina profesional.
- Recepción final / regularización.

### 9. SEO técnico

Se revisó:

- 1 H1 por página.
- Titles y metas existentes.
- Canonicals con `https://chechelnitzky.github.io/webarq/`.
- Open Graph actualizado a nuevos héroes.
- Sitemap y robots presentes.
- Manifest presente.
- Favicon presente.
- HTML semántico base.
- Imágenes WebP.
- Lazy loading para imágenes no hero.
- `decoding="async"` en imágenes.

### 10. Tracking y scripts externos

No se instaló:

- GTM.
- GA.
- Clarity.

Búsqueda final sin coincidencias para:

- `Google Tag Manager`
- `GTM-`
- `gtag`

### 11. QA técnico realizado

Se verificó por scripts locales:

- No hay rutas internas rotas en HTML/link/script/img/source.
- Todas las páginas HTML tienen exactamente 1 H1.
- No quedan textos prohibidos del comando de control final.
- Existen páginas obligatorias principales, legales, sitemap, robots, manifest y favicon.

Intento de QA visual automatizado:

- Se intentó levantar servidor local y capturar QA con Chromium/Playwright.
- La primera ejecución falló por navegador Playwright no instalado.
- La segunda encontró bloqueo administrativo para `127.0.0.1` en este entorno.
- Por eso no se adjuntan screenshots de QA visual automatizado. La estructura, rutas, assets y reglas CSS fueron revisadas por inspección de código y validaciones programáticas.

## Checklist final

- [x] Home corregida.
- [x] Servicios corregido.
- [x] Permisos municipales corregido.
- [x] Permiso de obra menor corregido.
- [x] Regularización de vivienda corregido.
- [x] Recepción final corregido.
- [x] Ampliación de casa corregido.
- [x] Remodelaciones corregido.
- [x] Remodelación de oficinas corregido.
- [x] Habilitación local comercial corregido.
- [x] Diseño de casas corregido.
- [x] Precios corregido sin precios cerrados.
- [x] Casos corregido.
- [x] Guías corregido.
- [x] Contacto corregido.
- [x] Comunas corregidas.
- [x] 404 presente.
- [x] Política de privacidad presente.
- [x] Términos y condiciones presentes.
- [x] sitemap.xml presente.
- [x] robots.txt presente.
- [x] manifest presente.
- [x] favicon presente.
- [x] WhatsApp circular corregido.
- [x] Sin `WhatsAppWhatsApp`.
- [x] Sin GTM/GA/Clarity.
- [x] Sin precios cerrados prohibidos.

## Nota final de producción

El ZIP queda listo para subir a GitHub Pages. Para cambiar dominio definitivo, WhatsApp, email u horarios, actualizar:

- `site.config.json`
- `assets/js/config.js`
- canonicals/sitemap/robots si cambia `baseUrl`
