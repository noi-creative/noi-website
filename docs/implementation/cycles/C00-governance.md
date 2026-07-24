# C00 — Governance and repository contract

## Status

Complete

## Objective

Install the canonical documentation and traceability structure before creating any application code, so that every subsequent cycle operates against an agreed source-of-truth order, a documented roadmap and a stable record format.

## Inputs

- `PRD.md`
- `DESIGN.md`
- `AGENTS.md`
- `IMPLEMENTATION_WORKFLOW.md`
- `references/` (Home, Nosotras, Contacto, Portafolio screenshots)
- `src/lib/assets.ts` (pre-existing content-adjacent manifest)
- `tests/assets.test.ts` (pre-existing vitest)
- `public/images/{pages,proyectos,shared}/` (pre-existing assets aligned with the manifest)
- `mds/` (pre-existing legal markdown files at the repository root)
- `README.md` (1-line placeholder)

## Scope

- Audit the four canonical documents for contradictions or duplicate filenames.
- Confirm the authority order recorded in `IMPLEMENTATION_WORKFLOW.md` §1.
- Create the traceability structure:
  - `docs/implementation/ROADMAP.md`
  - `docs/implementation/STATUS.md`
  - `docs/implementation/cycles/`
  - `docs/decisions/`
- Create the C00 cycle record.
- Author the strictly necessary ADRs reserved for decisions likely to be revisited during a future Astro pivot or architectural change.
- Acknowledge pre-existing content-adjacent files without modifying them.

## Out of scope

- Running `create-next-app` or any Next.js bootstrap (C01).
- Modifying `PRD.md`, `DESIGN.md`, `AGENTS.md` or `IMPLEMENTATION_WORKFLOW.md`.
- Touching `mds/` legal content (moves to `src/content/legal/` in C05).
- Reorganising the `public/images/` tree (existing layout is already aligned with the asset manifest and the C03 Figma audit will validate it).
- Implementing, linting, building or testing application code.
- Creating branches or commits beyond what this cycle needs to record its own state.

## Decisions

- **Authority order is fixed by the workflow** and will not be redefined here: PRD > DESIGN > Approved Figma > AGENTS > existing code patterns > screenshots.
- **ADRs are limited to five** (Next.js+Vercel, SCSS+tokens, content architecture, animation strategy, form backends). Anything smaller is captured in cycle records, not in dedicated ADRs.
- **C00 does not touch the pre-existing `src/lib/assets.ts` or `tests/assets.test.ts`.** They are content contracts, not application code, and C00's only application-code rule is "no implementation has begun". They will be re-validated in C03 and the Figma audit will confirm the paths they reference.
- **The `mds/` folder at the root is acknowledged but not moved now.** Moving it without a build in place would orphan the legal content; the proper location is `src/content/legal/` and that move belongs to C05 (Static architecture and content).
- **`README.md` is intentionally a one-line placeholder** and will be expanded in a later cycle once the project has a meaningful entry point.
- **Cycle record format** follows section 4 of `IMPLEMENTATION_WORKFLOW.md` exactly. Future cycles will mirror this template.

## Expected files

Created:

- `docs/implementation/cycles/C00-governance.md`
- `docs/implementation/ROADMAP.md`
- `docs/implementation/STATUS.md`
- `docs/decisions/ADR-001-next-vercel-static.md`
- `docs/decisions/ADR-002-scss-design-tokens.md`
- `docs/decisions/ADR-003-content-architecture.md`
- `docs/decisions/ADR-004-animation-strategy.md`
- `docs/decisions/ADR-005-form-backends.md`

Touched:

- None.

## Acceptance criteria

- [x] Canonical documents exist at the repository root with no contradictory duplicates.
- [x] `ROADMAP.md` lists every foundation and page cycle defined in `IMPLEMENTATION_WORKFLOW.md`.
- [x] `STATUS.md` identifies the current active cycle and points to its record.
- [x] The cycle record template is in use and a C00 record exists.
- [x] Five ADRs exist for the decisions named in the workflow and they cross-reference PRD/DESIGN sections.
- [x] No application implementation has begun in this cycle.

## Verification commands

```bash
ls -1 AGENTS.md PRD.md DESIGN.md IMPLEMENTATION_WORKFLOW.md
ls -1 docs/implementation/ROADMAP.md docs/implementation/STATUS.md
ls -1 docs/implementation/cycles/
ls -1 docs/decisions/
```

## Verification evidence

- N/A — documentation-only cycle. No code changed.
- Files created: `docs/implementation/ROADMAP.md`, `docs/implementation/STATUS.md`, `docs/implementation/cycles/C00-governance.md`, `docs/decisions/ADR-001…005.md`. Canonical docs already on disk; no duplicates.

## Deviations and TODOs

- No deviations.
- TODOs:
  - C01 must verify that `create-next-app` is compatible with the existing `src/lib/` folder and that the assets manifest path still resolves.
  - C03 must validate every `src` in `src/lib/assets.ts` against the Figma inventory and update dimensions if any have drifted.
  - C05 must move the legal files from `mds/` to `src/content/legal/privacidad.md` and `src/content/legal/terminos-y-condiciones.md` (and rewire the privacy/terms routes accordingly).

## Completion

- Commit: not yet committed in this session — pending user instruction to commit C00 before opening C01.
- Completed on: 2026-07-24.
