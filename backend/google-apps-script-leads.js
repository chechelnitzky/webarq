/**
 * Backend Google Sheets para joseph.cl
 * 1) Crea un Google Sheet nuevo.
 * 2) Extensiones > Apps Script.
 * 3) Pega este código completo.
 * 4) Cambia SHEET_NAME si quieres.
 * 5) Implementar > Nueva implementación > Aplicación web.
 *    - Ejecutar como: Yo
 *    - Quién tiene acceso: Cualquier persona
 * 6) Copia la URL del Web App y pégala en /assets/js/config.js:
 *    googleSheetsWebAppUrl: 'https://script.google.com/macros/s/XXXX/exec'
 */

const SHEET_NAME = 'Leads web';
const NOTIFICATION_EMAIL = ''; // Opcional: escribe tu email si quieres recibir aviso por cada lead.

const HEADERS = [
  'Fecha',
  'Nombre',
  'Email',
  'WhatsApp',
  'Tipo de caso',
  'Comuna',
  'Mensaje',
  'Estado',
  'Origen',
  'URL actual',
  'URL página',
  'Referer',
  'User agent'
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const params = e && e.parameter ? e.parameter : {};
    const sheet = getOrCreateSheet_();

    sheet.appendRow([
      new Date(),
      clean_(params.nombre),
      clean_(params.email),
      clean_(params.telefono),
      clean_(params.tipo),
      clean_(params.comuna),
      clean_(params.mensaje),
      clean_(params.lead_status || 'nuevo'),
      clean_(params.source || 'web'),
      clean_(params.current_url),
      clean_(params.page_url),
      clean_(params.referrer),
      clean_(params.user_agent)
    ]);

    if (NOTIFICATION_EMAIL) {
      MailApp.sendEmail({
        to: NOTIFICATION_EMAIL,
        subject: 'Nuevo lead web - Joseph Arquitecto',
        htmlBody: buildEmail_(params)
      });
    }

    return json_({ ok: true, message: 'Lead registrado' });
  } catch (error) {
    return json_({ ok: false, message: error && error.message ? error.message : String(error) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({ ok: true, message: 'Backend de leads activo' });
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const hasHeaders = firstRow.some(String);

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.autoResizeColumns(1, HEADERS.length);
  }

  return sheet;
}

function clean_(value) {
  return String(value || '').trim();
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function buildEmail_(params) {
  const safe = (v) => String(v || '').replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));
  return `
    <h2>Nuevo lead desde joseph.cl</h2>
    <p><b>Nombre:</b> ${safe(params.nombre)}</p>
    <p><b>Email:</b> ${safe(params.email)}</p>
    <p><b>WhatsApp:</b> ${safe(params.telefono)}</p>
    <p><b>Tipo:</b> ${safe(params.tipo)}</p>
    <p><b>Comuna:</b> ${safe(params.comuna)}</p>
    <p><b>Mensaje:</b><br>${safe(params.mensaje).replace(/\n/g, '<br>')}</p>
    <hr>
    <p><small>Origen: ${safe(params.source)} · URL: ${safe(params.current_url)}</small></p>
  `;
}
