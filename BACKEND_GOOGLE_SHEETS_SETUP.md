# Backend formulario → Google Sheets

Esta versión deja el formulario del home preparado para registrar leads en Google Sheets y luego redirigir a `/gracias/`.

## 1. Crear el Google Sheet

1. Crea una planilla nueva en Google Sheets.
2. Ponle un nombre, por ejemplo: `Leads joseph.cl`.
3. Abre `Extensiones > Apps Script`.
4. Borra el código inicial y pega el contenido de:

```txt
/backend/google-apps-script-leads.js
```

## 2. Publicar como Web App

En Apps Script:

1. Click en `Implementar > Nueva implementación`.
2. Tipo: `Aplicación web`.
3. Ejecutar como: `Yo`.
4. Quién tiene acceso: `Cualquier persona`.
5. Click en `Implementar`.
6. Autoriza los permisos.
7. Copia la URL que termina en `/exec`.

## 3. Pegar URL en la web

Abre:

```txt
/assets/js/config.js
```

Y reemplaza:

```js
googleSheetsWebAppUrl: 'https://script.google.com/macros/s/AKfycbz8NiWscEtpwa1-z3OU00tmqNlL5yle5jYjHnn4njZKFofCIQ8kSrvNqnT_Bkcz03kJAQ/exec'
```

por:

```js
googleSheetsWebAppUrl: 'https://script.google.com/macros/s/TU_ID/exec'
```

## 4. Qué pasa al enviar

1. El usuario completa el formulario.
2. El sitio envía los datos al Web App de Google Apps Script.
3. El lead se guarda en la hoja `Leads web`.
4. El usuario es redirigido a:

```txt
/gracias/
```

La página de gracias dice: `Ya diste el primer paso`, explica los próximos pasos y ofrece WhatsApp directo para enviar documentos.

## 5. Modo prueba

Si `googleSheetsWebAppUrl` está vacío, el formulario igual redirige a `/gracias/` para poder probar el flujo completo en local o GitHub Pages. En ese modo no guarda en Google Sheets.

## 6. Eventos GTM incluidos

El formulario empuja estos eventos a `dataLayer`:

```txt
form_consulta_submit
lead_thank_you_view
whatsapp_click
```


## Endpoint configurado en esta versión

Esta versión del ZIP ya trae configurada la URL del Web App en `/assets/js/config.js`:

```text
https://script.google.com/macros/s/AKfycbz8NiWscEtpwa1-z3OU00tmqNlL5yle5jYjHnn4njZKFofCIQ8kSrvNqnT_Bkcz03kJAQ/exec
```

Siguiente paso: subir estos archivos a GitHub Pages y probar el formulario desde `joseph.cl` en incógnito.
