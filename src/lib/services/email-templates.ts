/**
 * Email templates for the contact flow. Two emails:
 *
 *  - `buildContactInternalEmail` — sent to `CONTACT_RECIPIENT_EMAIL` with
 *    `Reply-To: <submitted email>`. The operator reads this; it is the
 *    notification.
 *  - `buildContactConfirmationEmail` — sent to the submitter. Confirms
 *    that the message was received and sets the response-time expectation.
 *
 * All user-supplied text is escaped through `escapeHtml()` so it can be
 * safely embedded in the HTML body. The text-only body is a separate
 * rendering of the same data, used by email clients that don't render
 * HTML. Both are produced by pure functions so they can be tested in C11.
 *
 * Styling: inline only. No `<style>` blocks, no external CSS, no images.
 * Some email clients strip embedded CSS; the brand identity is communicated
 * by the brand name, the reply-to address and the footer copy, not by
 * elaborate email design.
 */

import type { ContactPayload } from '@/lib/schemas/contact';

export type EmailContent = {
  readonly subject: string;
  readonly html: string;
  readonly text: string;
};

const BRAND_NAVY = '#00385C';
const BRAND_BURGUNDY = '#810C18';
const BRAND_CREAM = '#FFF9F4';
const BRAND_INK = '#001C36';

const escapeHtml = (raw: string): string =>
  raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const escapeAttr = (raw: string): string => escapeHtml(raw);

const fieldRow = (label: string, value: string): string => `
  <tr>
    <td style="padding: 8px 0; color: ${BRAND_INK}; font-size: 14px; font-weight: 700; width: 160px; vertical-align: top;">
      ${escapeHtml(label)}
    </td>
    <td style="padding: 8px 0; color: ${BRAND_INK}; font-size: 14px; vertical-align: top;">
      ${escapeHtml(value)}
    </td>
  </tr>
`;

const wrapper = (title: string, body: string): string => `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeAttr(title)}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: ${BRAND_CREAM}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: ${BRAND_CREAM};">
      <tr>
        <td align="center" style="padding: 32px 16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden;">
            <tr>
              <td style="background-color: ${BRAND_NAVY}; padding: 24px 32px;">
                <p style="margin: 0; color: ${BRAND_CREAM}; font-size: 20px; font-weight: 700; letter-spacing: 0.02em;">
                  NOI Creative
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 32px;">
                ${body}
              </td>
            </tr>
            <tr>
              <td style="background-color: ${BRAND_CREAM}; padding: 16px 32px; border-top: 1px solid #ECE3D6;">
                <p style="margin: 0; color: ${BRAND_INK}; font-size: 12px;">
                  NOI Creative · hola@creativenoi.com · Orlando, Florida
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

export function buildContactInternalEmail(payload: ContactPayload): EmailContent {
  const subject = `Nuevo mensaje de contacto de ${payload.name}`;
  const html = wrapper(
    subject,
    `
      <h1 style="margin: 0 0 16px 0; color: ${BRAND_INK}; font-size: 22px; line-height: 1.2;">
        Nuevo mensaje de contacto
      </h1>
      <p style="margin: 0 0 24px 0; color: ${BRAND_INK}; font-size: 15px; line-height: 1.6;">
        ${escapeHtml(payload.name)} (<a href="mailto:${escapeAttr(payload.email)}" style="color: ${BRAND_BURGUNDY};">${escapeHtml(payload.email)}</a>) quiere hablar contigo sobre ${escapeHtml(payload.service.toLowerCase())}.
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse; border-top: 1px solid #ECE3D6;">
        ${fieldRow('Servicio', payload.service)}
        ${fieldRow('Inversión', payload.investment)}
        ${fieldRow('Red social', payload.social)}
      </table>
      <h2 style="margin: 24px 0 8px 0; color: ${BRAND_INK}; font-size: 16px; font-weight: 700;">
        Comentarios
      </h2>
      <p style="margin: 0; color: ${BRAND_INK}; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">
        ${escapeHtml(payload.comments)}
      </p>
      <p style="margin: 24px 0 0 0; color: ${BRAND_INK}; font-size: 12px;">
        Responde directamente a este correo — el cliente lo recibirá en <code style="background-color: ${BRAND_CREAM}; padding: 2px 6px; border-radius: 4px;">${escapeHtml(payload.email)}</code>.
      </p>
    `,
  );
  const text = [
    `Nuevo mensaje de contacto`,
    ``,
    `Nombre: ${payload.name}`,
    `Email: ${payload.email}`,
    `Servicio: ${payload.service}`,
    `Inversión: ${payload.investment}`,
    `Red social: ${payload.social}`,
    ``,
    `Comentarios:`,
    payload.comments,
    ``,
    `— NOI Creative`,
  ].join('\n');
  return { subject, html, text };
}

export function buildContactConfirmationEmail(payload: ContactPayload): EmailContent {
  const subject = 'Recibimos tu mensaje — NOI Creative';
  const html = wrapper(
    subject,
    `
      <h1 style="margin: 0 0 16px 0; color: ${BRAND_INK}; font-size: 22px; line-height: 1.2;">
        ¡Gracias, ${escapeHtml(payload.name)}!
      </h1>
      <p style="margin: 0 0 16px 0; color: ${BRAND_INK}; font-size: 15px; line-height: 1.6;">
        Recibimos tu mensaje sobre <strong>${escapeHtml(payload.service.toLowerCase())}</strong> y lo estamos leyendo con calma. Te respondemos en menos de <strong>48 horas hábiles</strong>.
      </p>
      <p style="margin: 0 0 24px 0; color: ${BRAND_INK}; font-size: 15px; line-height: 1.6;">
        Si necesitas algo urgente, escríbenos a <a href="mailto:hola@creativenoi.com" style="color: ${BRAND_BURGUNDY};">hola@creativenoi.com</a>.
      </p>
      <h2 style="margin: 0 0 8px 0; color: ${BRAND_INK}; font-size: 14px; font-weight: 700;">
        Tu mensaje
      </h2>
      <p style="margin: 0; padding: 16px; background-color: ${BRAND_CREAM}; border-radius: 8px; color: ${BRAND_INK}; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
        ${escapeHtml(payload.comments)}
      </p>
    `,
  );
  const text = [
    `¡Gracias, ${payload.name}!`,
    ``,
    `Recibimos tu mensaje sobre ${payload.service.toLowerCase()} y lo estamos leyendo con calma.`,
    `Te respondemos en menos de 48 horas hábiles.`,
    ``,
    `Si necesitas algo urgente, escríbenos a hola@creativenoi.com.`,
    ``,
    `Tu mensaje:`,
    payload.comments,
    ``,
    `— NOI Creative`,
  ].join('\n');
  return { subject, html, text };
}
