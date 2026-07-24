# ADR-003 — Content architecture (JSON / TypeScript / Markdown)

- **Status:** Accepted
- **Date:** 2026-07-24
- **Deciders:** Project lead, coding agent
- **Cycle:** C00 — Governance

## Context

The site is Spanish-only at MVP but must remain compatible with a future English locale. There is no external CMS. Content must be:

- Easy to update by a non-developer with a clear convention.
- Type-safe where structure matters (slugs, asset paths, ordering, focal points).
- Indexable for SEO without manual wiring.
- Localisable later by adding `src/content/locales/en/` without changing component code.

`PRD.md` §8 already sketches the three formats: JSON for copy, TypeScript for structure, Markdown for legal content. This ADR makes the split operational.

## Decision

Use **three file formats with strict responsibilities**:

- **JSON (`src/content/locales/<locale>/*.json`)** holds everything that is localisable text: headings, paragraphs, labels, buttons, links, quotes, navigation labels, validation messages, success and error messages. JSON is the only place where translatable copy is allowed.
- **TypeScript (`src/content/data/*.ts` and `src/lib/assets.ts`)** holds structured records: project slugs, asset paths, ordering, focal points, component variants, service identifiers, project metadata, and the asset manifest itself. These records are typed via `as const` and consumed by Server Components and tests.
- **Markdown (`src/content/legal/*.md`)** holds legal content (privacy policy, terms and conditions) and is rendered with a small server-compatible Markdown renderer at build time. Raw HTML rendering is disabled unless explicitly required by the supplied text.

The MVP ships with `src/content/locales/es/` only. Adding `src/content/locales/en/` later is the migration path to i18next and is **not** scheduled for the MVP.

Cookie policy content (currently in `mds/cookie-policy.md`) is **not** part of the MVP because the PRD explicitly defers the cookie-consent banner. The file will remain in `mds/` until Q01 (Final SEO and content completion) decides whether to keep it, delete it or wire it up.

## Consequences

Positive:

- Translators and copy editors can edit JSON without touching TypeScript or SCSS.
- TypeScript records give us compile-time safety on slugs, asset paths and ordering.
- Legal content can be reviewed in plain Markdown and rendered at build time with no client JS.
- The structure is identical to what an i18next migration would expect; only the read site changes.

Trade-offs accepted:

- Adding a new project means editing both the JSON copy file and the TypeScript record. This is intentional — copy and structure are different concerns and conflating them has historically caused bugs.
- Markdown rendering is build-time only; legal pages cannot be edited through the deployed app. The MVP has no editing surface by design.

## Reversibility

Low. The decision is independent of the framework. A future Astro migration keeps the same JSON / TS / MD split and the same paths.

## References

- `PRD.md` §8 — Content architecture.
- `PRD.md` §6.1 — Core stack.
- `DESIGN.md` §25 — Pending page designs.
- `IMPLEMENTATION_WORKFLOW.md` §C05.
