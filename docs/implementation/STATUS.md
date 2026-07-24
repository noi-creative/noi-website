# NOI Creative — Implementation status

Single source of truth for "where is the project right now".

## Current active cycle

**None.** The foundation is in governance. The next cycle to start is **C01 — Next.js bootstrap** (see [ROADMAP.md](./ROADMAP.md)).

When a cycle is in progress, replace this section with:

```text
**Active cycle:** CXX — <name>
**Record:** [./cycles/CXX-…md](./cycles/CXX-…md)
**Status:** <state from the cycle record>
```

## Recently completed cycles

- **C00 — Governance and repository contract** (Complete)
  - Record: [./cycles/C00-governance.md](./cycles/C00-governance.md)
  - Outcome: traceability structure created, ADRs drafted, source-of-truth order confirmed.

## Open TODOs carried across cycles

- Move legal content from `/mds/` to `/src/content/legal/` in C05.
- Validate every `src` declared in `/src/lib/assets.ts` against the Figma inventory during C03 and update `alt` text from `null` to real copy.
- Pin the Node version in C01 and mirror it in Vercel during C12.
- Re-validate the assets manifest's `width`/`height` against the on-disk files (vitest test already in `tests/assets.test.ts`) once `npm install` is run.

## Decisions pending or unresolved

- Final SEO metadata (descriptions, Open Graph image, favicon) — recorded as TODO in `DESIGN.md` §25 and `PRD.md` §18.
- Final social URLs — TODO in `PRD.md` §18.
- Final LocalBusiness/ProfessionalService structured data — TODO in `PRD.md` §18.
- Final portfolio project metadata for the pending `/portafolio` and `/portafolio/[slug]` designs — blocked until design approval (P04, P05, P06).

## Verification status

| Cycle | typecheck | lint | format | test | build | static-routes | notes |
| ----- | --------- | ---- | ------ | ---- | ----- | ------------- | ----- |
| C00   | n/a       | n/a  | n/a    | n/a  | n/a   | n/a           | Documentation-only cycle. |

Verification rows will be filled as each cycle runs its own `Verification commands` block.
