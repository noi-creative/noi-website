/**
 * Rate-limit stub. Today this function always returns `{ allowed: true }`
 * and logs nothing. The reason is documented in the C10 cycle record
 * (`docs/implementation/cycles/C10-contact-newsletter-backends.md`):
 *
 *   1. `IMPLEMENTATION_WORKFLOW.md` §C10 forbids process-memory counters
 *      in serverless functions.
 *   2. A persistent store (Upstash Redis, Vercel KV) is a paid dependency
 *      with concrete setup cost, which is not justified for the MVP.
 *   3. The right enforcement layer is the Vercel WAF, which protects the
 *      route before the function is even invoked.
 *
 * The exact Vercel WAF rule that must be configured is:
 *
 *   - Rule: 60 requests / minute / IP for `/api/contact` and
 *     `/api/newsletter`.
 *   - Configured in: Vercel Dashboard → Project → Settings → Firewall →
 *     Rate Limiting.
 *   - Owner: Q03 (production release) will add the rule as part of the
 *     deployment checklist.
 *
 * Until then, this function is a no-op so the call sites in the API
 * routes are correct today and the rate-limit logic is a one-line change
 * away when the persistence story is decided.
 *
 * The function deliberately accepts the IP and route name even though it
 * does not use them today — the signature is the final API, so swapping
 * the implementation later is a single-file change.
 */

export type RateLimitDecision = { allowed: true } | { allowed: false; reason: 'rate_limited' };

export function checkRateLimit(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _ip: string | null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _route: '/api/contact' | '/api/newsletter',
): RateLimitDecision {
  // TODO C12: replace with a real implementation (Vercel WAF rule, Upstash
  // Redis, or Vercel KV). The function signature is stable.
  return { allowed: true };
}
