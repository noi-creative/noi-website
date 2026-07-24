# NOI Creative — Implementation status

Single source of truth for "where is the project right now".

## Current active cycle

**None.** The foundation is bootstrapped. The next cycle to start is **C02 — Quality tooling and CI** (see [ROADMAP.md](./ROADMAP.md)).

When a cycle is in progress, replace this section with:

```text
**Active cycle:** CXX — <name>
**Record:** [./cycles/CXX-…md](./cycles/CXX-…md)
**Status:** <state from the cycle record>
```

## Recently completed cycles

- **C01 — Next.js bootstrap** (Complete — awaiting user commit)
  - Record: [./cycles/C01-bootstrap.md](./cycles/C01-bootstrap.md)
  - Outcome: Next.js 16.2.11, React 19.2.4, App Router, strict TS, ESLint v9. `npm run build` succeeds; `/` is statically prerendered. Demo content removed. Pre-existing `src/lib/`, `tests/`, `public/`, `mds/`, `references/`, `docs/`, canonical docs and `.env` preserved. One-line fix applied to pre-existing `src/lib/assets.ts` so strict TS passes the build.
- **C00 — Governance and repository contract** (Complete)
  - Record: [./cycles/C00-governance.md](./cycles/C00-governance.md)
  - Outcome: traceability structure created, ADRs drafted, source-of-truth order confirmed.

## Pre-cycle work (between C01 and C02)

- **Font files staged for C04** (not a formal cycle). Six `.otf` files now live under `public/fonts/` in the agreed canonical names: `Satoshi/{Regular,Medium,Bold,Black}.otf` and `PanelSans/{Regular,Bold}.otf`. Extra weights that were temporarily added (Light, italics, Panel Sans Medium/Black) were removed in line with `DESIGN.md` §5.5 ("load only the weights visible in Figma"). Panel Sans filenames were normalised (the upstream `fonnts.com-` prefix and underscores were replaced with `PanelSans-` and hyphens). C04 will wire them up via `next/font/local` and Playfair Display via `next/font/google`.

## Open TODOs carried across cycles

- Move legal content from `/mds/` to `/src/content/legal/` in C05.
- Validate every `src` declared in `/src/lib/assets.ts` against the Figma inventory during C03 and update `alt` text from `null` to real copy.
- Pin the Node version in C01 and mirror it in Vercel during C12.
- Re-validate the assets manifest's `width`/`height` against the on-disk files (vitest test already in `tests/assets.test.ts`) once `npm install` is run.
- **Confirm a legitimate Panel Sans license** before production. Files currently in `public/fonts/PanelSans/` were sourced from a third-party redistribution site (`fonnts.com-` filename prefix) and their license is not verified. The original foundry is Pangram Pangram. If a valid license is not in place by Q01 (Final SEO and content completion), the files must be replaced before the production release in Q03. C04 will wire the files as-is; this TODO is intentionally not blocking.

## Decisions pending or unresolved

- Final SEO metadata (descriptions, Open Graph image, favicon) — recorded as TODO in `DESIGN.md` §25 and `PRD.md` §18.
- Final social URLs — TODO in `PRD.md` §18.
- Final LocalBusiness/ProfessionalService structured data — TODO in `PRD.md` §18.
- Final portfolio project metadata for the pending `/portafolio` and `/portafolio/[slug]` designs — blocked until design approval (P04, P05, P06).

## Verification status

| Cycle | typecheck | lint | format | test | build | static-routes | notes |
| ----- | --------- | ---- | ------ | ---- | ----- | ------------- | ----- |
| C00   | n/a       | n/a  | n/a    | n/a  | n/a   | n/a           | Documentation-only cycle. |
| C01   | OK (build) | OK (0 errors, 1 pre-existing warning) | n/a (C02) | n/a (C11) | OK | `/` and `/_not-found` static | One-line fix in pre-existing `src/lib/assets.ts` to satisfy strict TS. |

Verification rows will be filled as each cycle runs its own `Verification commands` block.
