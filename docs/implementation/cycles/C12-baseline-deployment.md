# C12 — Baseline deployment and operational checklist

## Status

Complete for the **in-repo** work (cycle record, security headers, deployment guide). The actual Vercel connection, environment-variable configuration, WAF rate-limit rule setup, and production verification are **user-driven steps** documented in [`docs/implementation/DEPLOYMENT.md`](../DEPLOYMENT.md). The cycle is "Complete" because the repository is ready to deploy; the deployment itself is a manual action the user takes when ready.

## Objective

Make the repository production-ready to be deployed to Vercel: minimal security headers, no leaked `X-Powered-By`, a complete `.env.example`, and a deployment guide that walks through every manual step (Vercel connection, env vars per environment, WAF rate-limit rule, custom domain when ready, post-deployment verification). The agent cannot create a Vercel account or click through the Vercel dashboard, so this cycle delivers the in-repo preparation and the playbook; the user runs the playbook when they choose to deploy.

## Inputs

- `PRD.md` §27 (error handling), §28 (env vars).
- `AGENTS.md` §22 (quality gates), §28 (env vars), §27 (error handling).
- `IMPLEMENTATION_WORKFLOW.md` §C12 (objective, scope, security baseline, acceptance criteria).
- `docs/decisions/ADR-001-next-vercel-static.md` — Vercel is the chosen deployment platform.
- `.nvmrc` (C01) — Node 22.
- `.env.example` (C01 + C10) — the env var placeholders are correct.
- `src/lib/env.ts` (C10) — the env schema is the source of truth for what the deployment needs.
- `src/lib/services/rate-limit.ts` (C10) — the documented stub whose WAF counterpart lands in C12.
- `next.config.ts` (C01) — currently a stub.
- `package.json` — `engines` not pinned; build is `next build`.

## Scope

**In-repo (the cycle record):**

- `next.config.ts` — add the minimal security header baseline from `IMPLEMENTATION_WORKFLOW.md` §C12: `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`. Disable the default `X-Powered-By: Next.js` header. No CSP yet (per the workflow, deferred until analytics requirements are known).
- `docs/implementation/DEPLOYMENT.md` — the deployment playbook. Covers pre-deployment requirements (Resend domain, Google Sheets setup, Vercel account, Node version), Vercel connection steps, environment-variable configuration per environment (preview, production), the exact Vercel WAF rate-limit rule for the two API routes, custom-domain setup when ready, and the post-deployment verification checklist (build logs, static route inspection, API smoke, security header check).
- `docs/implementation/cycles/C12-baseline-deployment.md` (this file).
- `docs/implementation/STATUS.md` — C12 row added; updated Open TODOs.
- `docs/implementation/ROADMAP.md` — C12 row → `Complete`.

**Not in repo (user action via the playbook):**

- Creating a Vercel account and connecting the repository.
- Configuring the six environment variables in the Vercel dashboard per environment.
- Verifying the Resend domain `creativenoi.com` and adding the sender addresses.
- Creating the Google Sheet and sharing it with the service account email.
- Configuring the Vercel WAF rate-limit rule (60 req/min/IP for the two API routes).
- Connecting a custom domain and provisioning HTTPS.
- Capturing the build logs in the cycle record after the first successful deploy.
- Verifying the production deployment manually (header check, API smoke, static-route inspection).

## Out of scope

- **The actual Vercel deployment.** The agent has no Vercel credentials and cannot click through the dashboard. The cycle delivers the preparation and the playbook; the deployment is a user-driven step.
- **A real CSP.** `IMPLEMENTATION_WORKFLOW.md` §C12 says "Do not introduce a complex CSP until all external services and analytics requirements are known." No analytics are configured in the MVP. Q01 (Final SEO and content completion) and Q02 (Performance and accessibility pass) are the right cycles to revisit CSP.
- **Production rate limiting code.** The C10 `checkRateLimit` stub stays as-is. The real rate limit is enforced at the Vercel WAF layer, not in the application code. The cycle documents the exact WAF rule.
- **Secret scanning.** Vercel has a built-in secret scanner; the cycle documents it but does not add a third-party scanner.
- **Log drain / observability.** Vercel's built-in log capture is the MVP logger. No Datadog/Sentry/Logflare in the MVP.
- **Multi-region deployment.** Vercel handles region selection automatically. No edge runtime configuration (the API routes are Node-only, see C10).
- **Preview environment per PR.** Vercel does this automatically once the GitHub integration is connected. The cycle documents the result.
- **Vercel CLI for local testing.** `vercel dev` is documented in the playbook as an option but not installed in the project.
- **A `Dockerfile` or other container configuration.** Vercel is the deployment target; there is no alternative path.

## Decisions

- **Security headers: minimal baseline from the workflow.** The four headers are exactly what `IMPLEMENTATION_WORKFLOW.md` §C12 calls for:
  - `X-Content-Type-Options: nosniff` — prevents MIME sniffing.
  - `Referrer-Policy: strict-origin-when-cross-origin` — strict-origin only, with HTTPS downgrade.
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()` — disables features the site does not use.
  - `X-Frame-Options: DENY` — prevents clickjacking. (`frame-ancestors 'none'` in CSP is equivalent; we use `X-Frame-Options` because we do not have a CSP yet.)
- **No CSP yet.** Per the workflow, CSP is deferred until analytics are known. Adding one now would block legitimate embed use cases (the site may want to embed Figma prototypes or video later).
- **Disable `X-Powered-By`.** Next.js sets `X-Powered-By: Next.js` by default. Disclosing the framework helps attackers target known CVEs; the value of disclosing the framework to legitimate clients is zero. Disabled via `poweredByHeader: false` in `next.config.ts`.
- **The headers apply to every route.** The header config is `source: '/(.*)'`. The API routes get the same headers as the static pages; the workflow does not ask for per-route headers.
- **The deployment guide is comprehensive but not a substitute for the Vercel UI.** The user follows the Vercel UI; the guide gives them the exact values to enter and the order of operations. The guide is committed to the repo so it travels with the project.
- **No `vercel.json`.** Vercel auto-detects Next.js. A `vercel.json` is unnecessary and would just duplicate framework defaults.
- **No `package.json` `engines.pin`.** The `.nvmrc` already pins Node 22, and the Vercel build will read it. A `package.json` `engines` field adds a warning at install time without changing behavior. Documented in the playbook instead.
- **The deployment playbook lives at `docs/implementation/DEPLOYMENT.md`.** Not `DEPLOYMENT.md` at the repo root (the canonical docs at the root are the four-pillar set: `AGENTS.md`, `PRD.md`, `DESIGN.md`, `IMPLEMENTATION_WORKFLOW.md`; deployment is an implementation concern, not a canonical document).
- **The WAF rule lives in the playbook, not in code.** The C10 cycle recorded the rule spec; the playbook re-states it with the exact Vercel dashboard navigation.
- **The first deployment target is a preview deployment, not production.** A preview deployment validates the build without affecting the production URL. The playbook walks through preview first, then promotion to production.
- **No `DOMAIN` env var.** The Vercel domain is configured at the platform level, not via env. The site URL is the `siteUrl` constant in `src/config/site.ts`; it points to `https://creativenoi.com` per the PRD. The actual Vercel-issued domain is used until the custom domain is connected.
- **No build artifact uploads.** Vercel builds from source. There is no `dist/` or `out/` directory to upload.

## Expected files

Created:

- `docs/implementation/DEPLOYMENT.md` — the deployment playbook.
- `docs/implementation/cycles/C12-baseline-deployment.md` (this file).

Modified:

- `next.config.ts` — add the four security headers + disable `X-Powered-By`.
- `docs/implementation/STATUS.md` — C12 row added; updated Open TODOs.
- `docs/implementation/ROADMAP.md` — C12 row → `Complete`.

Untouched:

- Every file under `src/`. C12 ships no application code; it ships the deployment configuration and the playbook.
- `.env.example` — already complete (C01 + C10). The playbook references it; no change needed.
- `tests/` — the security header config is a `next.config.ts` change with no test surface in the MVP. Manual verification (post-deploy) is the right place.
- `vitest.config.ts`, `tsconfig.json`, `package.json` — no change.

## Acceptance criteria

- [x] `next.config.ts` declares the four security headers (verified by reading the file).
- [x] `next.config.ts` disables `X-Powered-By`.
- [x] The build still succeeds with the new config; every public route remains `○ (Static)`.
- [x] `.env.example` is complete (six variables, all six are listed).
- [x] `docs/implementation/DEPLOYMENT.md` covers: pre-deployment requirements, Vercel connection, env vars per environment, the exact WAF rule, custom domain, post-deployment verification.
- [x] The cycle record documents the boundary between in-repo and user-driven work.
- [x] `npm run typecheck` passes.
- [x] `npm run lint` passes (0 errors, 1 pre-existing warning).
- [x] `npm run format:check` passes.
- [x] `npm run test` passes (93 tests).
- [x] `npm run build` succeeds; routes are unchanged.
- [x] `npm run verify` end-to-end passes.

## Verification commands

```bash
cat next.config.ts
cat .env.example
ls -1 docs/implementation/
npm run typecheck
npm run lint
npm run format:check
npm run test
npm run build
npm run verify
# Post-deploy (user-driven):
# - curl -I https://<vercel-domain>/ → confirms the four security headers
# - curl -I https://<vercel-domain>/ | grep -i 'x-powered-by' → empty (header disabled)
# - curl -X POST https://<vercel-domain>/api/contact -H 'content-type: application/json' -d '{}' → 400 (validation error)
# - vercel logs → confirms the build log is stored
```

## Verification evidence

- `next.config.ts` → security headers + `poweredByHeader: false` confirmed in the file.
- `.env.example` → six variables confirmed (the three Resend + the three Google Sheets, all from `src/lib/env.ts`).
- `npm run build` → 9 public routes static, 6 SSG, 2 dynamic API routes, 4 C08 static routes. Unchanged.
- `npm run test` → 93/93 pass.
- `npm run verify` → end-to-end OK.
- Post-deploy evidence (user-driven, recorded in the playbook's "Post-deployment verification" section):
  - Header check via `curl -I`.
  - API smoke test against `/api/contact` with an empty body (expects 400 with the validation error).
  - Build log capture from the Vercel dashboard.

## Deviations and TODOs

- **The actual Vercel deployment is not done.** The agent has no Vercel credentials. The cycle is "Complete for the in-repo work"; the deployment itself is a user-driven step that the playbook walks through. The next-session pickup is: "When ready, follow `docs/implementation/DEPLOYMENT.md` to connect Vercel, add env vars, configure the WAF rule, and capture the build logs in this cycle record."
- **The build logs are not in this cycle record.** They will be appended after the first successful deployment. The cycle record's "Completion" section reserves a placeholder for the build log.
- **The `engines` field in `package.json` is intentionally not added.** The `.nvmrc` already pins Node 22, and the Vercel build reads it. Adding `engines` would emit a warning at install time without changing behavior. Documented in the playbook.
- **No `vercel.json`.** Vercel auto-detects Next.js. A `vercel.json` is unnecessary.
- **Production verification is user-driven.** The "Post-deployment verification" section of the playbook lists the exact commands. The cycle record does not pre-claim success.
- **CSP is deferred.** Recorded in §Decisions. Revisit in Q01 / Q02 when analytics requirements are known.
- **Pre-existing `npm audit` findings (postcss, sharp transitive deps) remain.** They are Next.js-related and unchanged by C12.

## Completion

- Commit: pending — user commits manually per project rule.
- Completed on: 2026-07-24.
- **Post-deployment log capture (placeholder, user fills in after first successful deploy):**

```text
First preview deployment URL:
First production deployment URL:
Build log (attach or paste):
Header check output:
API smoke output:
```
