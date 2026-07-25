/**
 * Server-only environment validation. Imports of this module from a Client
 * Component throw at runtime. The API routes in `src/app/api/**` are the
 * only consumers; they run on the Node.js runtime (see `export const
 * runtime = 'nodejs'` in each handler).
 *
 * Validation is **lazy**: it runs on the first call to `getEnv()`, not at
 * module-load time. This is required because Next.js evaluates route
 * handler modules during `next build` (to collect page data) and the
 * environment is not populated yet. Lazy validation also means the
 * build can succeed without the real secrets, which is what we want
 * for CI and for the production deploy procedure.
 *
 * If a required variable is missing or malformed, `getEnv()` throws with
 * a list of the missing keys so the operator can fix the environment
 * quickly.
 *
 * The Zod schema is the single source of truth for the environment
 * contract documented in `AGENTS.md` §28 and `IMPLEMENTATION_WORKFLOW.md`
 * §C10.
 */

import { z } from 'zod';

if (typeof window !== 'undefined') {
  throw new Error(
    'src/lib/env.ts is server-only. Import it from a Route Handler, not a Client Component.',
  );
}

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1, 'RESEND_API_KEY is required.'),
  CONTACT_FROM_EMAIL: z.string().email('CONTACT_FROM_EMAIL must be a valid email.'),
  CONTACT_RECIPIENT_EMAIL: z.string().email('CONTACT_RECIPIENT_EMAIL must be a valid email.'),
  GOOGLE_SHEETS_SPREADSHEET_ID: z.string().optional(),
  GOOGLE_SERVICE_ACCOUNT_EMAIL: z.string().email().optional(),
  GOOGLE_PRIVATE_KEY: z.string().optional(),
});

const newsletterEnvSchema = z.object({
  GOOGLE_SHEETS_SPREADSHEET_ID: z.string().min(1, 'GOOGLE_SHEETS_SPREADSHEET_ID is required.'),
  GOOGLE_SERVICE_ACCOUNT_EMAIL: z
    .string()
    .email('GOOGLE_SERVICE_ACCOUNT_EMAIL must be a valid email.'),
  GOOGLE_PRIVATE_KEY: z.string().min(1, 'GOOGLE_PRIVATE_KEY is required.'),
});

export type Env = z.infer<typeof envSchema>;
export type NewsletterEnv = z.infer<typeof newsletterEnvSchema>;

let cached: Env | null = null;
let cachedNewsletter: NewsletterEnv | null = null;

/**
 * Read and validate the server-side environment. The result is memoised
 * after the first successful call.
 *
 * The three Google Sheets keys are validated as `.optional()` here so
 * that the contact form (which only uses Resend) can run without the
 * Sheets credentials being configured. The newsletter endpoint uses
 * `getNewsletterEnv()` to enforce those keys at request time.
 *
 * Throws with a list of every missing or malformed variable. The list
 * format is stable so the operator can fix the environment quickly.
 */
export function getEnv(): Env {
  if (cached) return cached;
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `- ${issue.path.join('.') || '(root)'}: ${issue.message}`)
      .join('\n');
    throw new Error(`Invalid environment variables:\n${issues}`);
  }
  cached = parsed.data;
  return cached;
}

/**
 * Read and validate the three Google Sheets env vars required by the
 * newsletter endpoint. The result is memoised after the first successful
 * call.
 *
 * Throws with the same `Invalid environment variables:` format as
 * `getEnv()` so the operator gets a consistent error surface. The
 * newsletter API route catches this and returns a controlled 500.
 */
export function getNewsletterEnv(): NewsletterEnv {
  if (cachedNewsletter) return cachedNewsletter;
  const parsed = newsletterEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `- ${issue.path.join('.') || '(root)'}: ${issue.message}`)
      .join('\n');
    throw new Error(`Invalid environment variables:\n${issues}`);
  }
  cachedNewsletter = parsed.data;
  return cachedNewsletter;
}
