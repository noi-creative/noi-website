/**
 * Newsletter form schema. Email only, normalised (lowercased, trimmed).
 * Shared by the client form and the server route handler.
 */

import { z } from 'zod';

export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, 'El correo electrónico es obligatorio.')
    .email('Ingresa un correo electrónico válido.'),
});

export type NewsletterInput = z.input<typeof newsletterSchema>;
export type NewsletterPayload = z.output<typeof newsletterSchema>;
