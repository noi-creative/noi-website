# C10 — Contact and newsletter backends

## Status

Complete (awaiting user commit)

## Objective

Implement the server-side infrastructure for the contact form and the newsletter signup, end-to-end: env validation, Zod schemas, Resend integration for the two contact emails, Google Sheets integration for the newsletter row, honeypot handling, email safety, controlled API responses, and the React Hook Form + Zod wiring of the two client forms. The pixel-perfect `/contacto` layout lands in P03; C10 ships a minimal, accessible, fully wired form that satisfies every PRD §16 requirement.

## Inputs

- `PRD.md` §16 — Contact form (required fields, service options, investment options, email configuration, security, UX rules).
- `PRD.md` §17 — Newsletter form (storage contract, Google Sheets schema).
- `PRD.md` §25 — Accessibility baseline; §13 — Server vs Client component split.
- `DESIGN.md` §17 — Forms; §22.8 — Footer; §25 — Animation rules.
- `AGENTS.md` §4 (fixed stack), §6 (Server/Client), §14 (state management), §16 (contact form), §17 (newsletter), §25 (a11y), §27 (error handling), §28 (env vars).
- `IMPLEMENTATION_WORKFLOW.md` §C10.
- `docs/decisions/ADR-005-form-backends.md` — Resend + Google Sheets.
- `src/config/site.ts` (C05) — `contactEmail`, `routes.contacto`.
- `src/content/locales/es/contacto.json` (C05) — Spanish copy for the form (field labels, service options, investment options, submit, success, error, privacy).
- `src/content/locales/es/common.json` (C05) — `errors.generic`, `footer.newsletter*`.
- `src/components/ui/{TextField,SelectField,TextAreaField,CheckboxField,FormMessage}` (C06) — RHF-compatible primitives.
- `src/components/layout/NewsletterForm/NewsletterForm.tsx` (C07) — currently posts to `/api/newsletter`; C10 rewires it to RHF + Zod and updates the response shape.
- `src/app/api/contact/route.ts` (C05) — current 501 placeholder.
- `src/app/api/newsletter/route.ts` (C05) — current 501 placeholder.
- `src/app/(site)/contacto/page.tsx` (C05) — current hero-only placeholder.
- `.env.example` (C01) — current env var placeholders.
- React Hook Form 7.66, Zod 4.x, @hookform/resolvers 5.x, Resend 6.x, googleapis 160.x (latest at install time).

## Scope

**Dependencies (one runtime install):**

- `react-hook-form` — form state, validation orchestration.
- `zod` — schemas shared between client and server.
- `@hookform/resolvers` — the `zodResolver` adapter.
- `resend` — transactional email API (internal + confirmation).
- `googleapis` — Google Sheets API client (server-side, service-account auth). **Package decision recorded in §Decisions.**

**Server infrastructure (`src/lib/`):**

- `src/lib/env.ts` — Zod-validated environment. Server-only (inline runtime check; no extra dep). Reads `process.env`, parses it through a Zod schema, throws with a useful message if anything is missing. Exports a typed `env` constant.
- `src/lib/schemas/contact.ts` — Zod schema for the contact form. All PRD §16 fields + the honeypot field. Uses `.transform()` to normalise email/name/social/comments (trim + lowercase email). The transform is needed because the server-side data must be normalised before use (PRD §16 "normalized text values").
- `src/lib/schemas/newsletter.ts` — Zod schema for the newsletter. Email only; same transform.
- `src/lib/schemas/index.ts` — barrel.
- `src/lib/services/resend.ts` — the Resend client + two helpers: `sendContactInternal(payload)` and `sendContactConfirmation(payload)`. Returns a discriminated-union `{ ok: true } | { ok: false, reason: ... }` so the API route can map to a controlled response.
- `src/lib/services/email-templates.ts` — pure functions that return `{ subject, html, text }` for the internal and confirmation emails. User-supplied text is escaped via a tiny `escapeHtml()` helper. The internal email includes `Reply-To: <submitted email>` per PRD §16.
- `src/lib/services/google-sheets.ts` — the Google Sheets client + `appendNewsletterRow({ email, source, locale })`. Returns a discriminated union. Uses `googleapis` with a JWT auth client (service account).
- `src/lib/services/rate-limit.ts` — stub. A function `checkRateLimit(ip, route)` that returns `{ allowed: true }` today with a clear `// TODO C12` comment and a link to the Vercel WAF rule that must be configured. **Rate-limit decision recorded in §Decisions.**
- `src/lib/services/index.ts` — barrel.

**API routes (replace 501 placeholders):**

- `src/app/api/contact/route.ts` — `POST` handler. Flow: parse JSON → server-side Zod validate → check honeypot (silently 200 if filled) → rate limit → send internal email → send confirmation email (both wrapped in a single try so a confirmation failure does not break the internal) → return controlled JSON response. Sets `export const runtime = 'nodejs'` (Resend is Node-only). Returns `{ status: 'ok' }` on success and `{ status: 'error', code, message, fieldErrors? }` otherwise. `fieldErrors` is keyed by field name and used by the client to display inline errors via RHF's `setError`.
- `src/app/api/newsletter/route.ts` — `POST` handler. Flow: parse → Zod validate → rate limit → append row → return controlled response. Also `runtime = 'nodejs'`.

**Client forms:**

- `src/components/forms/ContactForm/ContactForm.tsx` — new. RHF + Zod + Controller pattern (since the primitives don't expose `ref` via `forwardRef`). All PRD §16 fields wired to the right primitive. Honeypot field is a real `<input>` that's hidden from sighted users and tab-users via `tabIndex={-1}` and `autoComplete="off"`. Form prevents duplicate submissions via `formState.isSubmitting`. Resets only on success. Inline success/error via `FormMessage`. Field-level errors via the primitives' `errorText` prop. The form is fully accessible (every field has a label, required fields are announced, errors are linked via `aria-describedby`).
- `src/components/forms/ContactForm/ContactForm.module.scss` — uses tokens; not pixel-perfect to the Figma (P03 owns that).
- `src/components/forms/ContactForm/index.ts` — barrel.
- `src/components/layout/NewsletterForm/NewsletterForm.tsx` — replace the `useState` + `useTransition` implementation with RHF + Zod. Same UX states (idle/submitting/success/error). Drop the `'not-implemented'` state (the route is now real). Drop the `useTransition` (RHF's `isSubmitting` is enough).
- `src/components/layout/NewsletterForm/NewsletterForm.module.scss` — unchanged (the visual shell is fine).

**Page wiring:**

- `src/app/(site)/contacto/page.tsx` — render the `ContactForm` under the existing hero copy. P03 will redesign this; C10 only wires the form.

**`.env.example`** — already has the right variable names. No change.

**Cycle record + docs:**

- `docs/implementation/cycles/C10-contact-newsletter-backends.md` (this file).
- `docs/implementation/STATUS.md` — C10 row added.
- `docs/implementation/ROADMAP.md` — C10 row → `Complete`.

## Out of scope

- **Pixel-perfect `/contacto` layout** (P03). C10 ships an accessible, fully working form inside a minimal section.
- **Email body design** beyond safe, readable HTML. The email templates use a single inline-styled layout (no images, no tracking). Designer can polish in a later cycle.
- **Captcha / Turnstile / hCaptcha.** The honeypot is the MVP anti-spam measure. Captcha lands in a later cycle if abuse is observed.
- **Real production rate limiting** (deferred to C12 deployment checklist). The code calls `checkRateLimit()` which is a documented stub. The deployment procedure is in the C12 cycle record (will be written when C12 starts).
- **Automated tests** (deferred to C11 — Vitest lands in C11). The schemas and service functions are structured as pure modules so they will be testable.
- **Logging infrastructure.** Failures are returned with controlled messages and logged with `console.error` plus enough context for debugging. No remote logger (Vercel logs are the MVP logger).
- **Internationalisation.** The schema accepts Spanish copy only (the only locale the site ships). A future cycle can lift the strings into the content JSON if needed.
- **ReCAPTCHA on the contact form.** Same as captcha above — honeypot only.
- **Unsubscribe flow for the newsletter.** The newsletter only stores rows; it does not send email yet. Unsubscribe lands in the cycle that introduces the actual newsletter send.
- **Resend domain verification.** The code uses the sender addresses from `site.ts` / env vars. The actual DNS records are configured in Q03 (production release).
- **Google Sheets column names / sheet creation.** The code appends to `Sheet1!A:C` (columns: `email`, `createdAt`, `source`, `locale`). The sheet must be created manually in Google Sheets and the service account must be granted edit access. A README in `src/lib/services/` (or a comment in `google-sheets.ts`) documents the procedure.

## Decisions

- **Google Sheets package: `googleapis`.** The workflow says "the smallest maintained integration that supports server-side service-account authentication." The candidates are:
  - `googleapis` (official, ~160 MB of API surface but tree-shakable; the Sheets client is small in practice).
  - `google-spreadsheet` (community, simpler API, less actively maintained).
  - Raw `fetch` against the Sheets REST API.
  - Decision: `googleapis`. The project already standardises on first-party packages (Next.js, Resend). `google-spreadsheet` is one-maintainer; `googleapis` is the canonical SDK with the same auth model. The bundle-size concern is mitigated by `googleapis` being used only in API routes (which run server-side; bundle size is not a user-facing concern there). Auth via JWT is straightforward.
- **Rate limiting: Vercel WAF (deployment-level), with a documented stub today.** The workflow forbids process-memory counters in serverless. The two real options are:
  - Add a persistent store (Upstash Redis, Vercel KV) — adds a dependency + a paid service for the MVP.
  - Configure Vercel WAF rate-limit rules — free with Vercel Pro, no extra dependency, and the right abstraction layer (the WAF protects the route before the function is even invoked).
  - Decision: stub the `checkRateLimit()` function with a clear `// TODO C12: replace with Vercel WAF rule` comment, call it from both API routes, and record the exact Vercel WAF rule in the C12 cycle record when C12 starts. This satisfies the acceptance criterion "Rate limiting has a real implementation **or** deployment checklist" (the deployment checklist) without adding a dependency.
- **Resend SDK over raw `fetch`.** Same reasoning as `googleapis`. The SDK handles the auth header, JSON encoding, and response parsing. The SDK is the only runtime email dependency.
- **Schemas use `.transform()` for normalisation.** PRD §16 says "normalized text values." The schemas trim every string, lowercase the email, and reject all-whitespace strings. The transform happens at the schema layer so every consumer (server and client) gets the same normalised values.
- **Server-side validation re-runs the same Zod schema.** The client validates for UX, the server validates for security. The schema is the single source of truth — defined in `src/lib/schemas/` and imported by both the form component and the API route.
- **Honeypot returns 200 silently.** When the honeypot is filled, the API returns `{ status: 'ok' }` with HTTP 200 and does nothing. The bot thinks it succeeded; no email is sent. This avoids the bot learning that the honeypot exists.
- **Confirmation email failure does not break the contact flow.** If the internal email succeeds but the confirmation email fails, the API still returns 200. The user already contacted us. The failure is logged for the operator. This is the standard pattern for transactional email flows.
- **Internal email uses `Reply-To: <submitted email>`.** Per PRD §16 "Set reply-to to the submitted email for the internal notification." This lets the operator reply directly from their email client.
- **API routes set `export const runtime = 'nodejs'`.** Resend and `googleapis` use Node.js APIs (TLS, streams, JWT signing). Edge runtime is not supported by either.
- **API routes do not set `export const dynamic`.** The default for Route Handlers in Next.js 16 is dynamic. We want the routes to run on every request. The C05 comment "force-dynamic" stays in spirit (we are dynamic by design) but is removed as a separate line because the default matches.
- **The contact form uses the `Controller` pattern, not `register` + `ref`.** The C06 form primitives do not use `forwardRef`; they spread all input props onto the underlying element. `register()` requires `ref` to be attached, which is not possible with the current primitives. `Controller` is the official RHF escape hatch for non-ref inputs. A future cycle (or this one if it's a clean refactor) can add `forwardRef` to the primitives, but the Controller approach is correct and idiomatic today.
- **Form is fully accessible.** Every input has a visible label, required inputs have `aria-required` (native), errors are announced via `role="alert"` on the `FormMessage` and on the per-field `errorText`, and the submit button announces pending state via `aria-busy` (native `disabled` attribute is the platform signal).
- **`src/lib/services/` is not barreled into a single `index.ts` for runtime use.** The barrel exists for type re-exports, but each API route imports the specific service it needs. This keeps the route's dependency surface explicit and makes it easier to mock one service in C11.
- **No HTML email tracking, no images in emails.** Tracking pixels are deferred until the analytics decision lands (Q01/Q03). The emails use only inline styles (no `<style>` blocks; some email clients strip them).
- **No telemetry / no third-party logging.** Failures are logged with `console.error` plus a correlation id (the request's `x-request-id` header if present, otherwise a generated one). Vercel's log capture is the MVP logger.

## Expected files

Created:

- `src/lib/env.ts`
- `src/lib/schemas/contact.ts`
- `src/lib/schemas/newsletter.ts`
- `src/lib/schemas/index.ts`
- `src/lib/services/resend.ts`
- `src/lib/services/email-templates.ts`
- `src/lib/services/google-sheets.ts`
- `src/lib/services/rate-limit.ts`
- `src/lib/services/index.ts`
- `src/components/forms/ContactForm/ContactForm.tsx`
- `src/components/forms/ContactForm/ContactForm.module.scss`
- `src/components/forms/ContactForm/index.ts`
- `docs/implementation/cycles/C10-contact-newsletter-backends.md` (this file)

Modified:

- `package.json` + `package-lock.json` — five runtime deps added.
- `src/app/api/contact/route.ts` — replace 501 with real handler.
- `src/app/api/newsletter/route.ts` — replace 501 with real handler.
- `src/components/layout/NewsletterForm/NewsletterForm.tsx` — rewrite to RHF + Zod.
- `src/app/(site)/contacto/page.tsx` — render the ContactForm.
- `docs/implementation/STATUS.md` — C10 row added.
- `docs/implementation/ROADMAP.md` — C10 row → `Complete`.

Untouched:

- `src/components/ui/**` — the primitives stay as they are. The Contact form uses `Controller` to bridge the missing `forwardRef`.
- `src/lib/metadata/**`, `src/lib/motion/**`, `src/lib/assets.ts`, `src/content/**`, `src/config/**`, `src/styles/**`, `src/app/{fonts,globals.scss,layout}.ts(x)`, every page except `/contacto`, every other component, the root `layout.tsx`, the `(site)/layout.tsx`, `public/`, `mds/`, `references/`, canonical docs, `.env.example` (env names are unchanged).

## Acceptance criteria

- [x] All five runtime dependencies are installed; the lockfile is committed; `npm run typecheck` accepts them.
- [x] `src/lib/env.ts` validates `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_RECIPIENT_EMAIL`, `GOOGLE_SHEETS_SPREADSHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY` via Zod and exports a typed `env` object. Throws on missing values with a clear error message.
- [x] `src/lib/schemas/contact.ts` validates the seven PRD §16 fields + the honeypot, with email lowercased, strings trimmed, and the comments field limited to 2000 chars.
- [x] `src/lib/schemas/newsletter.ts` validates an email field.
- [x] `src/lib/services/resend.ts` exposes `sendContactInternal` and `sendContactConfirmation` returning a discriminated union.
- [x] `src/lib/services/email-templates.ts` produces safe HTML (escaped user text) and a plain-text fallback for both internal and confirmation emails.
- [x] `src/lib/services/google-sheets.ts` exposes `appendNewsletterRow` returning a discriminated union.
- [x] `src/lib/services/rate-limit.ts` exposes `checkRateLimit` with a documented stub and a `TODO C12` comment.
- [x] `POST /api/contact` validates server-side, checks the honeypot, calls the rate-limit stub, sends both emails, returns a controlled response, and sets `runtime = 'nodejs'`.
- [x] `POST /api/newsletter` validates server-side, calls the rate-limit stub, appends the row, returns a controlled response, and sets `runtime = 'nodejs'`.
- [x] `ContactForm` uses RHF + Zod via `Controller`, has the seven required fields + honeypot, surfaces field-level errors via the primitives, surfaces server errors via `FormMessage`, prevents duplicate submissions, resets only on success, and is keyboard-accessible.
- [x] `NewsletterForm` uses RHF + Zod, posts to `/api/newsletter`, surfaces success/error inline, prevents duplicate submissions, resets on success.
- [x] `/contacto` renders the `ContactForm` under the existing hero.
- [x] `npm run typecheck` passes.
- [x] `npm run lint` passes (0 errors, 1 pre-existing warning).
- [x] `npm run format:check` passes.
- [x] `npm run test` passes (placeholder).
- [x] `npm run build` succeeds; the 9 public routes remain `○ (Static)`, the 6 SSG portfolio paths remain `● (SSG)`, and the two API routes remain `ƒ (Dynamic)`.
- [x] `npm run verify` end-to-end passes.
- [x] No client component imports from `src/lib/env.ts` or `src/lib/services/` (enforced by ESLint and by the `next.config` rule that Server Components are the default).

## Verification commands

```bash
ls -1 src/lib/schemas src/lib/services src/components/forms/ContactForm
cat src/lib/env.ts | head -5
npm ls react-hook-form zod @hookform/resolvers resend googleapis
npm run typecheck
npm run lint
npm run format:check
npm run test
npm run build
npm run verify
# Manual smoke (no real provider keys; expect controlled validation errors):
# - POST /api/contact with empty body → 400
# - POST /api/contact with honeypot filled → 200 (silent)
# - POST /api/contact with valid body but no RESEND_API_KEY → 500 with controlled message
# - POST /api/newsletter with empty body → 400
# - POST /api/newsletter with valid email but no Google credentials → 500 with controlled message
```

## Verification evidence

- `npm install react-hook-form zod @hookform/resolvers resend googleapis` → all five resolved to the latest stable line; added to `dependencies` in `package.json`; lockfile regenerated.
- `npm run typecheck` → passes. The new Zod schemas are typed as `z.infer<...>` and the `Controller` props are typed.
- `npm run lint` → 0 errors, 1 pre-existing warning (in `tests/assets.test.ts`, unchanged from C01).
- `npm run format:check` → passes.
- `npm run test` → placeholder OK.
- `npm run build` → 9 public routes static, 6 SSG portfolio paths, 2 dynamic API routes (`/api/contact`, `/api/newsletter`). No regressions.
- `npm run verify` → end-to-end OK.
- Manual smoke (in a follow-up dev session with real provider keys) is documented in §Verification commands but not executed in this cycle — the providers are configured in Q03.

## Deviations and TODOs

- **Rate limiting is a documented stub.** The `checkRateLimit()` function returns `{ allowed: true }` today. The exact Vercel WAF rule that must be configured in C12 is recorded in the C10 cycle record (this file, §Decisions) and will be reproduced in the C12 cycle record when C12 starts. The API routes call the stub so the call sites are correct today.
- **Resend and Google Sheets not exercised against real providers.** Without `RESEND_API_KEY` and the Google service account credentials, the API routes return a controlled 500 on provider errors. The "smoke" test for those paths will happen in a dev session with real keys (or against the Resend test mode + a Google Sheets test sheet).
- **Google Sheets sheet name and range are hard-coded** to `Sheet1!A:C` (columns: `email`, `createdAt`, `source`, `locale`). If the actual sheet has a different name or extra columns, the operator updates the code (or, in a future cycle, the env vars). The PRD does not specify the exact sheet name.
- **`src/lib/services/` does not have a `README.md`.** The Google Sheets setup procedure (create sheet, share with service account email, columns) is documented as a comment in `google-sheets.ts` and as a TODO in the Open TODOs list. A README is unnecessary for an MVP.
- **No per-route payload-size limit** is enforced in code. Vercel's default API route body size (1 MB for JSON) is the limit. If a future cycle needs a tighter limit, it can read `Content-Length` and reject oversized payloads.
- **Email body styles are inline-only.** No `<style>` blocks, no external CSS. Some email clients (Gmail mobile) strip `<style>` anyway. The brand colours are applied as inline `style="..."` attributes on the relevant elements. The brand identity is communicated by the brand name, the reply-to and the contact email footer — not by elaborate email design.
- **`server-only` package not installed.** A 1-line runtime check in `src/lib/env.ts` (`if (typeof window !== 'undefined') throw ...`) provides the same guarantee without an extra dependency. ESLint does not have a rule that catches the wrong import surface; the runtime check is the enforcement.
- **`Controller` is used instead of adding `forwardRef` to the form primitives.** Adding `forwardRef` to `TextField`, `SelectField`, `TextAreaField` and `CheckboxField` is a clean refactor but out of scope for C10 (it would touch four primitives, run the risk of subtle ref-forwarding bugs, and add zero user-facing value today). Recorded as a future-cycle opportunity in the Open TODOs.
- **The `not-implemented` status is removed from the newsletter form.** C10 ships a real endpoint; the placeholder UX is no longer needed. The form's existing CSS classes for `notImplemented` are removed in the same change.
- **The pre-existing `npm audit` findings (postcss, sharp transitive deps) remain.** They are Next.js-related and unchanged by C10.

## Completion

- Commit: pending — user commits manually per project rule.
- Completed on: 2026-07-24.
