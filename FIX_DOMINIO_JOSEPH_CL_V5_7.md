# FIX DOMINIO PROPIO JOSEPH.CL — V5.7

## Objetivo
Corregir rutas de assets, links internos y señales SEO para publicar la web desde la raíz del dominio `https://joseph.cl/`, sin depender de `/webarq/` ni del dominio de GitHub Pages.

## Estructura real auditada

- CSS: `/assets/css/styles.css`
- JS: `/assets/js/config.js`, `/assets/js/main.js`
- Imágenes: `/assets/img/...`
- Favicons: `/favicon.svg` y carpeta `/assets/favicons/`
- Manifest: `/site.webmanifest`
- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`
- HTML: páginas estáticas en carpetas con `index.html`

## Rutas antiguas encontradas

- `<base href="https://chechelnitzky.github.io/webarq/">`
- `https://chechelnitzky.github.io/webarq/` en canonical, og:url, og:image y JSON-LD
- `baseUrl: 'https://chechelnitzky.github.io/webarq/'` en configuración JS
- enlaces internos dependientes del `<base>` como `assets/...`, `servicios/...`, `guias/...`, etc.

## Correcciones aplicadas

- Eliminado el `<base href="https://chechelnitzky.github.io/webarq/">` de todos los HTML.
- Assets convertidos a rutas root-relative:
  - `/assets/css/styles.css`
  - `/assets/js/config.js`
  - `/assets/js/main.js`
  - `/assets/img/...`
  - `/favicon.svg`
  - `/site.webmanifest`
- Links internos convertidos a rutas root-relative:
  - `/servicios/.../`
  - `/guias/.../`
  - `/casos/`
  - `/contacto/`
  - `/permisos/`
  - `/remodelaciones/`
  - `/casas/`
- Canonical, og:url, og:image y JSON-LD actualizados a `https://joseph.cl/`.
- `sitemap.xml` actualizado para usar solo URLs `https://joseph.cl/...`.
- `robots.txt` actualizado con `Sitemap: https://joseph.cl/sitemap.xml`.
- `assets/js/config.js` y `site.config.json` actualizados con `baseUrl: https://joseph.cl/`.
- `site.webmanifest` revisado y actualizado.
- Creadas rutas raíz solicitadas para que carguen con diseño completo:
  - `/permisos/`
  - `/remodelaciones/`
  - `/casas/`

## Verificación técnica

- HTML revisados: 59
- Referencias de assets verificadas: 748
- Assets faltantes detectados: 0
- Links internos verificados: 4617
- Links internos rotos detectados: 0
- Referencias restantes a `/webarq/`: 0 en archivos publicados
- Referencias restantes a `chechelnitzky.github.io`: 0 en archivos publicados

## URLs verificadas localmente

Todas responden 200 en servidor estático local:

- `/`
- `/servicios/remodelacion-de-oficinas/`
- `/servicios/`
- `/permisos/`
- `/remodelaciones/`
- `/casas/`
- `/guias/`
- `/casos/`
- `/contacto/`
- `/sitemap.xml`
- `/robots.txt`
- `/assets/css/styles.css`
- `/assets/js/main.js`
- `/assets/js/config.js`
- `/favicon.svg`
- `/site.webmanifest`

## Resultado

La web queda preparada para publicarse en la raíz del dominio `https://joseph.cl/`, sin HTML pelado por rutas relativas mal resueltas y sin señales SEO apuntando a GitHub Pages.
