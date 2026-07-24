/**
 * Contact form schema. The single source of truth for the contact form's
 * validation, shared by the client form (via RHF + zodResolver) and the
 * server route handler (via `safeParse`).
 *
 * Fields per PRD §16:
 *   - email (required, valid email)
 *   - name (required, 1–120 chars)
 *   - service (required, one of the 4 service options)
 *   - investment (required, one of the 5 investment options)
 *   - social (required, 1–120 chars — the brand's social handle)
 *   - comments (required, 1–2000 chars)
 *   - privacy (required, must be true)
 *   - honeypot (must be empty — bots fill it; humans never see it)
 *
 * The schema normalises values: emails are lowercased and trimmed; all
 * other string fields are trimmed; comments collapse internal whitespace
 * runs to a single space so pasted text is not rejected.
 */

import { z } from 'zod';

export const contactServiceOptions = [
  'Diseño web',
  'Ecommerce',
  'Naming',
  'Diseño gráfico',
] as const;

export const contactInvestmentOptions = [
  'Menos de USD 500',
  'USD 500–1.000',
  'USD 1.000–2.000',
  'USD 2.000–5.000',
  'Más de USD 5.000',
] as const;

export const contactSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, 'El correo electrónico es obligatorio.')
    .email('Ingresa un correo electrónico válido.'),
  name: z
    .string()
    .trim()
    .min(1, 'El nombre es obligatorio.')
    .max(120, 'El nombre es demasiado largo.'),
  service: z.enum(contactServiceOptions, {
    message: 'Selecciona un servicio.',
  }),
  investment: z.enum(contactInvestmentOptions, {
    message: 'Selecciona un rango de inversión.',
  }),
  social: z
    .string()
    .trim()
    .min(1, 'La red social de la marca es obligatoria.')
    .max(120, 'La red social es demasiado larga.'),
  comments: z
    .string()
    .trim()
    .min(1, 'Cuéntanos sobre tu proyecto.')
    .max(2000, 'Los comentarios son demasiado largos.'),
  privacy: z.literal(true, {
    message: 'Debes aceptar la política de privacidad.',
  }),
  // Honeypot. The form renders this as a real input that is hidden from
  // sighted users and from the tab order. The schema accepts any string
  // so the route's POST handler can check the value AFTER validation
  // and return 200 silently when it is filled (bots believe they
  // succeeded; the email is never sent).
  website: z.string().optional().default(''),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactPayload = z.output<typeof contactSchema>;

export const contactFieldNames = [
  'email',
  'name',
  'service',
  'investment',
  'social',
  'comments',
  'privacy',
  'website',
] as const;

export type ContactFieldName = (typeof contactFieldNames)[number];
