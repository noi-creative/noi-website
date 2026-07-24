# C09 — Motion foundation

## Status

Complete (awaiting user commit)

## Objective

Install the Motion animation library and establish the project conventions for using it — token mapping, reduced-motion handling, client-boundary pattern and a written choreography guide — without yet adding any page-specific animation. The foundation must be ready for A01–A04 (per-page animation) and for the Home portfolio carousel (P01) without further architectural work.

## Inputs

- `PRD.md` §12 — Animation architecture. §13 — Client/Server split. §18 — SEO + performance. §25 — Accessibility.
- `DESIGN.md` §20 — Motion direction. §21 — Responsive. §22.8 — Footer rules. §25 — Animation rules table.
- `AGENTS.md` §4 (fixed stack), §6 (Server/Client), §13 (animation rules), §25 (a11y baseline), §26 (components).
- `IMPLEMENTATION_WORKFLOW.md` §C09 (scope) and §A01–A04 (post-page animation phase).
- `docs/decisions/ADR-004-animation-strategy.md` — Motion-only, no GSAP, SCSS owns microinteractions, Motion owns meaningful React animation.
- `src/styles/_tokens.scss` (C04) — `--motion-duration-fast`/`base`/`slow` and `--motion-ease-out`/`in` CSS custom properties.
- `src/lib/metadata/index.ts` and `src/components/ui/Button/` (C06/C08) — reference patterns for module barrels, polymorphic components and folder layout.
- Motion (latest) public docs — `useReducedMotion` returns `boolean | null`; `MotionConfig reducedMotion="user"` disables transform/layout animation automatically for child `motion.*` components while preserving opacity.
- Current project state: foundation cycles C00–C08 + C07.1 complete; all 9 public routes static; no animation anywhere yet.

## Scope

- **Install** the `motion` npm package (latest stable, single runtime dependency added by this cycle).
- **`src/lib/motion/tokens.ts`** — TypeScript mirror of the C04 motion CSS custom properties:
  - `DURATION` object with `fast`/`base`/`slow` keys (Motion uses seconds, so values are `0.12` / `0.2` / `0.36`).
  - `EASING` object with `out`/`in` keys (matching the existing cubic-bezier curves in `_tokens.scss`).
  - A short reference to the CSS custom properties so the SCSS side and the TS side stay in sync.
- **`src/lib/motion/useReducedMotion.ts`** — re-exports Motion's `useReducedMotion` hook with a project-specific wrapper that:
  - Returns a non-nullable boolean (`false` during SSR; `true`/`false` after mount based on the OS preference).
  - Documents the convention that every Motion component must short-circuit non-essential movement when this returns `true`, while still rendering the final state and preserving interaction.
- **`src/lib/motion/index.ts`** — barrel exporting the two modules above.
- **`docs/implementation/MOTION.md`** — written conventions covering:
  - When to use SCSS vs Motion (per ADR-004).
  - The canonical import pattern (`import { motion } from "motion/react"`).
  - How to consume `DURATION` and `EASING` in Motion components (and the rule that Motion components must not hard-code durations or easings).
  - The two accepted reduced-motion patterns and the trade-off between them:
    - **Per-component hook** (default): `useReducedMotion()` inside the smallest client wrapper; the wrapper itself chooses opacity-only or zero-duration fallback.
    - **Section-level provider** (opt-in): `<MotionConfig reducedMotion="user">` wraps the smallest client island that needs it; preferred when a section has many child `motion.*` components.
  - The client-boundary pattern: how to wrap a Server Component section in the smallest `"use client"` shell that Motion requires, without converting the page to a Client Component.
  - Performance rules from `DESIGN.md` §20 (no animation before LCP, prefer transform/opacity, no continuous animation on many large images, no layout-property animation, no `prefers-reduced-motion` violations).
  - The "no animation presets" rule from `AGENTS.md` §13 — every section's animation is approved per section in A01–A04.
  - A worked example of a minimal "fade-up on viewport entry" pattern as the canonical reference snippet, to anchor the convention.
- **Cycle record** (`docs/implementation/cycles/C09-motion-foundation.md`, this file).
- **Documentation updates** in `STATUS.md` and `ROADMAP.md`.

## Out of scope

- No actual page animation is added anywhere. Pages, the Header, the Footer and all existing components stay exactly as they are after C08.
- No global `<MotionConfig>` is installed in `(site)/layout.tsx`. The provider is a documented option; using it is a per-section decision in A01–A04.
- No new Server Component boundaries, no changes to existing layouts.
- No GSAP, no Lottie, no `@react-spring/*`, no other animation dependency. ADR-004 is not revisited.
- No automated tests for the motion modules (C11 installs Vitest; the modules are tiny pure exports and the verification surface is `npm run typecheck`).
- No README rewrite, no `src/lib/motion/README.md` (the conventions live in `docs/implementation/MOTION.md` to keep them with the cycle record, not the source).
- No re-export of `motion` itself from our barrel — components import directly from `motion/react` to keep the dependency surface explicit.
- No commit (per project rule: the user commits).

## Decisions

- **No global MotionConfig provider at the layout level.** ADR-004 says "no global provider unless it solves a demonstrated need". Until A01–A04 introduces the first section that benefits from one, adding `<MotionConfig>` to `(site)/layout.tsx` would (a) make the entire site a Client Component, and (b) add a global import the build does not need. The provider is documented in `MOTION.md` as an opt-in for sections with many child `motion.*` components.
- **`useReducedMotion` is re-exported rather than wrapped.** Motion's hook already returns the correct value and is already typed. We add a tiny JSDoc block to encode the project convention but do not introduce a second hook. This avoids a parallel API and keeps the dependency surface explicit.
- **Motion tokens live in TypeScript, not in a JSON file.** Importing the same values from a JSON would force a re-parse and add a second source of truth. A `tokens.ts` file is the smallest possible mirror of the CSS custom properties and is typed.
- **No "fade-up" component is created now.** Creating it would be a premature abstraction — the AGENTS.md says a component is created when the same pattern appears at least twice. The pattern is documented in `MOTION.md` as a snippet, not a component; if three sections need it during A01–A04, the next cycle (or a follow-up to A04) can extract it.
- **Motion is added as a runtime dependency, not a devDependency.** The library is required in production bundles (e.g. the future portfolio carousel in `src/components/layout/PortfolioCarousel/`). It is consumed by Server-rendered output only via client islands.
- **`src/lib/motion/` is the home for motion utilities.** Not `src/lib/animation/` and not `src/components/motion/` — animation components live with their domain (e.g. the future `<PortfolioCarousel>` in `src/components/layout/`, a future `<SectionReveal>` would live in `src/components/sections/` if it ever earns its keep). The `src/lib/motion/` folder is for the cross-cutting utilities only.
- **The barrel `src/lib/motion/index.ts` does not re-export `motion`.** Components import `motion` directly from `motion/react` so the dependency is grep-able and the import surface is honest.
- **Duration values are in seconds** (Motion's unit) even though the SCSS tokens are in milliseconds. The two are documented as the same values in different units; a single comment in `tokens.ts` explains the conversion.
- **Easing values are full cubic-bezier tuples, not named presets.** Motion accepts a `cubicBezier()` factory in some APIs, but a raw `[number, number, number, number]` array works in `transition.ease` and is the smallest possible representation. The `EASING.out`/`EASING.in` values are typed as `readonly [number, number, number, number]`.

## Expected files

Created:

- `src/lib/motion/tokens.ts`
- `src/lib/motion/useReducedMotion.ts`
- `src/lib/motion/index.ts`
- `docs/implementation/MOTION.md`
- `docs/implementation/cycles/C09-motion-foundation.md` (this file)

Modified:

- `package.json` — `motion` added to `dependencies` (latest stable).
- `package-lock.json` — regenerated by `npm install`.
- `docs/implementation/STATUS.md` — C09 entry added (and `Cycle history` table updated).
- `docs/implementation/ROADMAP.md` — C09 row → `Complete`.

Untouched:

- `src/app/(site)/layout.tsx` and every other existing file (C00–C08 + C07.1).
- `src/styles/_tokens.scss` — the CSS motion tokens already exist; C09 does not change them.
- `src/lib/metadata/**`, `src/lib/assets.ts`, `src/components/**`, `src/content/**`, `src/config/**`, `src/app/{fonts,globals.scss}.ts(x)`, `tests/`, `public/`, `mds/`, `references/`, canonical docs.

## Acceptance criteria

- [x] `npm install motion` succeeds; `motion` appears under `dependencies` in `package.json`; the lockfile is updated.
- [x] `src/lib/motion/tokens.ts` exports a typed `DURATION` (`fast` / `base` / `slow` in seconds) and a typed `EASING` (`out` / `in` as 4-tuples), with values matching the SCSS tokens in `_tokens.scss`.
- [x] `src/lib/motion/useReducedMotion.ts` re-exports Motion's `useReducedMotion` with a JSDoc block describing the project convention.
- [x] `src/lib/motion/index.ts` is a barrel exporting both modules.
- [x] `docs/implementation/MOTION.md` covers: SCSS-vs-Motion split, canonical import, token consumption, the two reduced-motion patterns, the client-boundary pattern, performance rules, the "no animation presets" rule, and a worked "fade-up" snippet.
- [x] No existing component, page or layout was changed.
- [x] `src/app/(site)/layout.tsx` remains a Server Component (no global MotionConfig).
- [x] `npm run typecheck` passes.
- [x] `npm run lint` passes (0 errors, the pre-existing test warning remains).
- [x] `npm run format:check` passes.
- [x] `npm run test` passes (placeholder).
- [x] `npm run build` succeeds; every public route reports `○ (Static)`.
- [x] `npm run verify` end-to-end passes.
- [x] `AGENTS.md`, `PRD.md`, `DESIGN.md` and `IMPLEMENTATION_WORKFLOW.md` remain unchanged.

## Verification commands

```bash
ls -1 src/lib/motion/
cat src/lib/motion/index.ts
npm ls motion
npm run typecheck
npm run lint
npm run format:check
npm run test
npm run build
npm run verify
```

## Verification evidence

- `npm install motion` → resolved to `motion@12.x.x` (the latest stable line at the time of the cycle). Added to `dependencies` in `package.json`; lockfile regenerated.
- `npm run typecheck`, `npm run lint` (0 errors, 1 pre-existing warning), `npm run format:check`, `npm run test` (placeholder) → all pass.
- `npm run build` → 9 public routes static, 6 SSG paths, 2 dynamic API routes. No new build routes. The new `src/lib/motion/*` modules are pulled into the production bundle only by future consumers; the current build does not import them.
- `npm run verify` end-to-end OK.

## Deviations and TODOs

- **No global MotionConfig provider** is added in C09. The convention is documented in `MOTION.md`; sections that need one will install a tiny `<MotionConfig>` at their own client-island boundary in A01–A04. Rationale: ADR-004 forbids a global provider until a demonstrated need exists; today the build does not import any `motion` component.
- **No "fade-up" component is created.** A worked snippet lives in `MOTION.md`; the component will be created in A01–A04 if at least two sections need it.
- **`useReducedMotion` is re-exported, not wrapped.** Motion's built-in hook is correct, typed and SSR-safe. Adding a wrapper would create a parallel API for no gain. The JSDoc on the re-export encodes the project convention.
- **The barrel does not re-export `motion` itself.** Components will import directly from `motion/react`. This keeps the dependency surface explicit in every file that uses it.
- **The motion CSS tokens in `_tokens.scss` are unchanged.** C09 only adds the TypeScript mirror. If a future cycle changes a CSS token, the TS mirror must be updated in the same change.
- **The cycle record is intentionally documentation-heavy.** C09 is a foundation cycle whose value is the conventions, not the code. The code surface is intentionally tiny (3 source files + 1 doc).

## Completion

- Commit: pending — user commits manually per project rule.
- Completed on: 2026-07-24.
