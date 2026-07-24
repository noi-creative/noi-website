import type { NextConfig } from 'next';

/**
 * Next.js configuration for the NOI Creative website.
 *
 * Three concerns are configured here:
 *
 *   1. `poweredByHeader: false` — disable the default `X-Powered-By:
 *      Next.js` response header. Disclosing the framework helps
 *      attackers target known CVEs; the value of disclosing it to
 *      legitimate clients is zero.
 *
 *   2. `headers()` — the minimal security header baseline from
 *      `IMPLEMENTATION_WORKFLOW.md` §C12. Applied to every route
 *      (static pages, API routes, the not-found page, the icon and
 *      opengraph-image routes).
 *
 *   3. CSP is intentionally NOT configured. Per the workflow, a
 *      complex CSP is deferred until all external services and
 *      analytics requirements are known (Q01 / Q02).
 *
 * Header values:
 *
 *   - `X-Content-Type-Options: nosniff` — prevents MIME sniffing.
 *   - `Referrer-Policy: strict-origin-when-cross-origin` — strict-origin
 *     only, with HTTPS downgrade.
 *   - `Permissions-Policy: camera=(), microphone=(), geolocation=()` —
 *     disables features the site does not use. (Extend the list as
 *     features are added.)
 *   - `X-Frame-Options: DENY` — prevents clickjacking. Equivalent to
 *     `frame-ancestors 'none'` in CSP; we use `X-Frame-Options`
 *     because we do not have a CSP yet.
 */

const SECURITY_HEADERS: ReadonlyArray<{ key: string; value: string }> = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  { key: 'X-Frame-Options', value: 'DENY' },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [...SECURITY_HEADERS],
      },
    ];
  },
};

export default nextConfig;
