# ADR-001 — Next.js + Vercel static prerender

- **Status:** Accepted
- **Date:** 2026-07-24
- **Deciders:** Project lead, coding agent
- **Cycle:** C00 — Governance

## Context

NOI Creative is a marketing website. Public pages are primarily static editorial content with limited client-side interactivity (contact form, newsletter form, mobile menu, Home portfolio carousel). The product must:

- Stay fast (Lighthouse Performance ≥ 90, LCP < 2.5 s).
- Stay indexable (full SEO surface, static HTML for every public route).
- Stay maintainable for a small team and extendable by a coding agent.
- Avoid the operational cost of a server, a database or a CMS during the MVP.

Two framework families are realistic:

1. **Next.js (App Router) on Vercel** with static prerendering of every public route and isolated Route Handlers for form backends.
2. **Astro on Vercel** with the same split between static pages and serverless endpoints.

A future pivot to Astro is plausible; decisions in this ADR must not foreclose that move.

## Decision

Use **Next.js (App Router) on Vercel** for the MVP:

- TypeScript strict.
- App Router under `src/app/`.
- All public routes statically prerendered.
- `output: "export"` is **not** used; API Route Handlers are deployed as serverless functions and remain isolated from public pages.
- `dynamic = "error"` (or equivalent verified guardrail) is applied to the `(site)` layout so that any accidental use of dynamic APIs in a public page fails the build.
- Deploy target is Vercel; preview environments are used for every cycle.

## Consequences

Positive:

- Next.js App Router gives us route handlers, `generateStaticParams`, the `next/image` pipeline and `next/font` — all required by `PRD.md`.
- Vercel matches the build model with zero ceremony (no Dockerfile, no infra).
- The `(site)` route group keeps public pages separated from API handlers without changing URLs.

Trade-offs accepted:

- A future move to Astro would require rewriting client islands and any Next-specific metadata helpers, but no content contracts.
- We commit to a Node runtime in Vercel; we cannot move to a fully edge-only deployment without revisiting this ADR.

## Reversibility

Medium. A pivot to Astro would touch:

- Every `src/app/**/page.tsx`.
- The `next/image` and `next/font` configuration.
- The metadata helpers in `src/lib/metadata/`.

It would not touch:

- `PRD.md`, `DESIGN.md`.
- The content JSON/TS/MD split (see ADR-003).
- The asset paths declared in `src/lib/assets.ts` (still served as static files).
- The form backend integrations (Resend, Google Sheets).

## References

- `PRD.md` §6 — Technical architecture.
- `PRD.md` §6.2 — Static rendering rule.
- `DESIGN.md` §27 — Agent implementation rules.
- `IMPLEMENTATION_WORKFLOW.md` §C01, §C05, §C12.
