# NOI Creative — Implementation status

Single source of truth for "where is the project right now".

## Current active cycle

**None.** C12 (Baseline deployment and operational checklist) is **complete for the in-repo work**. The actual Vercel connection, env-var configuration, WAF rate-limit rule setup, and production verification are user-driven steps documented in [`DEPLOYMENT.md`](./DEPLOYMENT.md). The next step is to start **P01 — Home** (the first page implementation cycle) — see [ROADMAP.md](./ROADMAP.md).

When a cycle is in progress, replace this section with:

```text
**Active cycle:** CXX — <name>
**Record:** [./cycles/CXX-…md](./cycles/CXX-…md)
**Status:** <state from the cycle record>
```

## Status snapshot

**Where the project is right now:**

- Foundation cycles C00 → C12 are complete. The repository is production-ready: build is static where it can be, API routes are isolated, security headers are in `next.config.ts`, the test suite is 93/93, and `DEPLOYMENT.md` walks through the Vercel + WAF + env-var procedure.
- The page bodies (Home, Nosotras, Contacto) are still placeholders, by design. P01/P02/P03 will build the actual Figma compositions.
- The next cycle is **P01 — Home**. After P01, P02 (Nosotras), P03 (Contacto) complete the approved Figma pages.

**Where the project is going (next 2–3 cycles):**

- **P01** — build the actual Home page from the Figma reference (hero collage, "El branding" section, services, portafolio preview, process timeline, testimonials, final CTA). This is the first big visual win.
- **P02** — Nosotras page from the approved Figma frame.
- **P03** — Contacto page (the form is already wired in C10; P03 adds the Figma composition around it).

**Vercel deployment is pending user action.** The repo is ready; the user follows `DEPLOYMENT.md` to connect Vercel, add env vars, configure the WAF rule, and capture the build log.

**Currently active TODOs** (full list below): the per-page metadata descriptions, the OG image + favicon replacement, the Panel Sans license confirmation, the cookie policy decision, the Simbi URL slug, and the final social URLs.

## Cycle history (one-line summary)

Full per-cycle records live under `docs/implementation/cycles/`. Use this table to see the lineage at a glance; read the linked record for decisions and deviations.

| Cycle                                              | Outcome                                                                                                                                                         |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [C00](./cycles/C00-governance.md)                  | Governance + traceability structure (ROADMAP, STATUS, ADRs).                                                                                                    |
| [C01](./cycles/C01-bootstrap.md)                   | Next.js 16 + React 19 + strict TS + ESLint v9.                                                                                                                  |
| [C02](./cycles/C02-quality-tooling.md)             | Prettier + Husky + lint-staged + GitHub Actions quality workflow.                                                                                               |
| [C03](./cycles/C03-figma-audit.md)                 | Figma audit + asset inventory (96 images + 6 fonts catalogued; real gaps surfaced).                                                                             |
| [C04](./cycles/C04-scss-tokens-fonts.md)           | SCSS tokens + Satoshi + Playfair Display (Panel Sans staged but not loaded).                                                                                    |
| [C05](./cycles/C05-static-architecture.md)         | `(site)` route group + `dynamic = "error"` guardrail + legal Markdown + content split.                                                                          |
| [C06](./cycles/C06-ui-primitives.md)               | 11 UI primitives (Button 6 variants, Heading, Eyebrow, Container, Section, VisuallyHidden, 5 form primitives).                                                  |
| [C07](./cycles/C07-shared-site-shell.md)           | Header (pill, mobile dropdown) + Footer + NewsletterForm + SkipLink in `(site)/layout.tsx`.                                                                     |
| [C07.1](./cycles/C07-followup.md)                  | Foundation visual corrections (footer layout to match the Figma reference; header shadow more visible).                                                         |
| [C08](./cycles/C08-seo-metadata.md)                | Typed metadata helper + robots + sitemap + JSON-LD + OG/favicon placeholders + custom 404.                                                                      |
| [C09](./cycles/C09-motion-foundation.md)           | Motion installed; TS motion tokens + `useReducedMotion` hook + conventions document. No page animation yet.                                                     |
| [C10](./cycles/C10-contact-newsletter-backends.md) | Resend + Google Sheets backends; RHF + Zod in both client forms; env validation; honeypot; controlled responses.                                                |
| [C11](./cycles/C11-focused-testing-foundation.md)  | Vitest installed; 8 new test files (93 tests) covering schemas, services, and the two API routes with mocked providers.                                         |
| [C12](./cycles/C12-baseline-deployment.md)         | Security headers + `X-Powered-By` disabled in `next.config.ts`; `DEPLOYMENT.md` playbook written. Vercel connection + WAF rule + env-var setup are user-driven. |

## Pre-cycle work (between C01 and C02)

- **Font files staged for C04** (not a formal cycle). Six `.otf` files under `public/fonts/` in the agreed canonical names: `Satoshi/{Regular,Medium,Bold,Black}.otf` and `PanelSans/{Regular,Bold}.otf`. Extra weights removed in line with `DESIGN.md` §5.5. Filenames normalised. C04 wires them via `next/font/local`; Playfair Display is loaded from Google Fonts.

## Open TODOs

- **Cookie policy content is currently absent** (Q01 owns it; the PRD defers the cookie banner).
- **Decide the URL slug for Simbi Cakes** (P05/P06 own it; C05 uses `simbi` to match the manifest key).
- **Confirm a legitimate Panel Sans license** before production (Q01; the `public/fonts/PanelSans/` files are from a redistribution site, license not verified).
- **Final social URLs** (Q01; currently TODO placeholders in `site.ts`).
- **Replace OG image and favicon placeholders** with designer-supplied assets (Q01; C08 ships dynamic `ImageResponse` placeholders).
- **Per-page metadata descriptions** are currently `TODO metadata description` everywhere (P01–P08 will replace as pages are built).
- **Production rate limiting** is a stub today (`checkRateLimit` returns `{ allowed: true }`). The exact Vercel WAF rule (60 req/min/IP for the two API routes) is recorded in the C10 cycle record and will be configured in C12.
- **Resend domain verification** for `formularios@creativenoi.com` (Q01/Q03; both senders need DNS records before production traffic).
- **Google Sheets setup** — create the sheet, share with the service account email as Editor, ensure columns A:D match `email | createdAt | source | locale` (Q01/Q03).
- **Add `forwardRef` to the C06 form primitives** so future forms can use `register()` without the `Controller` boilerplate (logged as a follow-up opportunity; not blocking C10).
- **The contact schema's honeypot accepts any string** (the route's POST handler is responsible for the silent-200 path). The schema test for "honeypot rejects non-empty" was removed because the check is now in the route, not the schema. Verified by `tests/api/contact.test.ts`.

## Verification status (recent)

| Cycle | typecheck | lint                                  | format | test             | build | static-routes                    | notes                                                                                                                           |
| ----- | --------- | ------------------------------------- | ------ | ---------------- | ----- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| C06   | OK        | OK (0 errors, 1 pre-existing warning) | OK     | OK (placeholder) | OK    | 9 public routes + 6 SSG + 2 API  | 11 UI primitives.                                                                                                               |
| C07   | OK        | OK (0 errors, 1 pre-existing warning) | OK     | OK (placeholder) | OK    | 9 public routes + 6 SSG + 2 API  | Header (Client) + Footer + Newsletter + SkipLink.                                                                               |
| C07.1 | OK        | OK (0 errors, 1 pre-existing warning) | OK     | OK (placeholder) | OK    | 9 public routes + 6 SSG + 2 API  | Footer rebuilt as 2-row grid; shadow bumped.                                                                                    |
| C08   | OK        | OK (0 errors, 1 pre-existing warning) | OK     | OK (placeholder) | OK    | 9 public + 4 C08 + 6 SSG + 2 API | Metadata helper + robots + sitemap + JSON-LD.                                                                                   |
| C09   | OK        | OK (0 errors, 1 pre-existing warning) | OK     | OK (placeholder) | OK    | 9 public + 4 C08 + 6 SSG + 2 API | Motion 12.42.2 installed; `src/lib/motion/` + `MOTION.md` conventions. No page animation.                                       |
| C10   | OK        | OK (0 errors, 1 pre-existing warning) | OK     | OK (placeholder) | OK    | 9 public + 4 C08 + 6 SSG + 2 API | RHF+Zod+Resend+googleapis; `/api/contact` & `/api/newsletter` real; ContactForm + NewsletterForm rewired; env validated lazily. |
| C11   | OK        | OK (0 errors, 1 pre-existing warning) | OK     | OK (93 tests)    | OK    | 9 public + 4 C08 + 6 SSG + 2 API | Vitest 2.1.9; 9 test files, 93 tests; schemas + services + routes covered with mocked providers.                                |
| C12   | OK        | OK (0 errors, 1 pre-existing warning) | OK     | OK (93 tests)    | OK    | 9 public + 4 C08 + 6 SSG + 2 API | Security headers + `X-Powered-By: false` in `next.config.ts`; `DEPLOYMENT.md` written. Vercel deploy is user-driven.            |

Earlier cycles (C00 → C05) all pass the same quality gates. See their per-cycle records for cycle-specific verification evidence.
