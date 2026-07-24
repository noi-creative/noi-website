/**
 * Resend SDK wrapper. Two helpers exposed:
 *
 *  - `sendContactInternal` — the notification email to the operator.
 *  - `sendContactConfirmation` — the confirmation email to the submitter.
 *
 * Each helper returns a discriminated union:
 *
 *  - `{ ok: true, id }` — Resend accepted the email and returned an id.
 *  - `{ ok: false, reason: 'provider_error' }` — Resend returned an error.
 *
 * Provider error details are NOT included in the union; the API route
 * should not expose them to the client (PRD §27). They are logged on the
 * server with `console.error` (caller's responsibility).
 *
 * Both functions are server-only (they import the Resend SDK and read
 * from `src/lib/env.ts`). The Resend client is instantiated lazily inside
 * each helper so the env validation runs at request time, not at module
 * load (required so `next build` can collect page data without the real
 * secrets).
 */

import { Resend } from 'resend';
import { getEnv } from '@/lib/env';
import { buildContactInternalEmail, buildContactConfirmationEmail } from './email-templates';
import type { ContactPayload } from '@/lib/schemas/contact';

export type EmailResult = { ok: true; id: string } | { ok: false; reason: 'provider_error' };

function getClient() {
  return new Resend(getEnv().RESEND_API_KEY);
}

export async function sendContactInternal(payload: ContactPayload): Promise<EmailResult> {
  const env = getEnv();
  const { subject, html, text } = buildContactInternalEmail(payload);
  const { data, error } = await getClient().emails.send({
    from: env.CONTACT_FROM_EMAIL,
    to: env.CONTACT_RECIPIENT_EMAIL,
    replyTo: payload.email,
    subject,
    html,
    text,
  });
  if (error || !data) {
    return { ok: false, reason: 'provider_error' };
  }
  return { ok: true, id: data.id };
}

export async function sendContactConfirmation(payload: ContactPayload): Promise<EmailResult> {
  const env = getEnv();
  const { subject, html, text } = buildContactConfirmationEmail(payload);
  const { data, error } = await getClient().emails.send({
    from: env.CONTACT_FROM_EMAIL,
    to: payload.email,
    subject,
    html,
    text,
  });
  if (error || !data) {
    return { ok: false, reason: 'provider_error' };
  }
  return { ok: true, id: data.id };
}
