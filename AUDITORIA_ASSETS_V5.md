# Auditoría y reemplazo de assets V5

## Objetivo ejecutado
Se reemplazó la biblioteca visual anterior por una nueva biblioteca derivada directamente de los mockups aprobados del proyecto, con el fin de acercar la web codificada al estándar visual solicitado: editorial, sobrio, premium, técnico y coherente.

## Problema detectado en V4
- Los contenedores ya funcionaban mejor, pero las imágenes se veían genéricas y desconectadas de la dirección de arte.
- Había diferencia clara entre el nivel de los mockups y el nivel de los assets reales usados en el código.
- El problema principal era dirección de arte, no solo resolución.

## Solución aplicada
- Se usaron los mockups aprobados como fuente visual directa.
- Se reconstruyeron assets WebP para héroes, cards, casos y guías.
- Se reemplazaron los archivos que el sitio ya consumía para no romper rutas existentes.
- Se agregaron nombres semánticos adicionales para futura migración de assets.
- Se mantuvo compatibilidad con la estructura actual del sitio.

## Assets reemplazados
- `assets/img/heroes/*.jpg`
- `assets/img/cards/*.webp`
- `assets/img/cases/*.webp`
- `assets/img/guides/*.webp`

## Entregables técnicos añadidos
- `assets-manifest-v5.json`: inventario de assets, dimensiones y peso.
- `assets/img/previews/assets-v5-contact-sheet.jpg`: hoja de revisión visual rápida de héroes.

## Criterios técnicos aplicados
- WebP optimizado.
- Héroes desktop: 3000 × 1700 px.
- Héroes mobile: 1200 × 1600 px.
- Cards: 1200 × 800 px.
- Casos: 1800 × 1200 px.
- Guías: 1200 × 800 px.
- Corrección visual común: menor saturación, contraste editorial, temperatura cálida y nitidez moderada.

## Nota importante
Estos assets fueron reconstruidos a partir de los mockups disponibles en la conversación. Si más adelante se cuenta con los archivos originales de las imágenes usadas en los mockups, conviene reemplazar estas reconstrucciones por los originales exportados directamente en WebP para lograr una nitidez aún mayor.

## QA realizado
- No quedan archivos WebP con dimensiones pequeñas para cards/casos/héroes.
- No quedan assets internos faltantes.
- No se reintrodujeron precios antiguos.
- No se reinstaló GTM ni GA.
- Se mantuvo WhatsApp correcto: `+56 9 7605 2356`.
- Se mantuvo URL temporal: `https://chechelnitzky.github.io/webarq/`.
