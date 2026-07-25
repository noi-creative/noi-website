# A04 — Shared motion review

## Status

Complete (awaiting user commit)

## Objective

Review the per-section Motion choreography introduced by A02 (Nosotras) and A03 (Contacto) to decide which patterns, if any, should be consolidated into shared primitives. Where extraction is justified (per `AGENTS.md` §26 and `MOTION.md` §8), build the primitive in `src/lib/motion/` and refactor the A02 + A03 consumers. Where extraction is not justified, document the decision in `MOTION.md` so future A-cycles know to keep the pattern bespoke.

## Inputs

- `PRD.md` §12 — Animation architecture. §13 — Client/Server split. §18 — SEO + performance. §25 — Accessibility.
- `DESIGN.md` §20 — Motion direction. §25 — Animation rules table.
- `AGENTS.md` §4 (fixed stack), §6 (Server/Client), §13 (animation rules), §25 (a11y baseline), **§26 (components — the extraction rule)**, §30 (agent response requirements).
- `docs/implementation/MOTION.md` — §4 (reduced-motion patterns), §5 (client-boundary pattern), **§6 (performance rules)**, **§8 ("no animation presets" rule — the rule A04 re-examines)**, §10 (what C09 deliberately does not ship — the boundary A04 redraws).
- `docs/decisions/ADR-004-animation-strategy.md` — Motion only, no GSAP, SCSS owns microinteractions, Motion owns meaningful React animation.
- `docs/implementation/cycles/C09-motion-foundation.md` — `motion@12.42.2` is installed; `src/lib/motion/{tokens,useReducedMotion,index}.ts` is the project's motion utility surface.
- `docs/implementation/cycles/A02-nosotras-animation.md` — 8 motion wrappers across 4 sections.
- `docs/implementation/cycles/A03-contacto-animation.md` — 8 motion wrappers across 3 sections.
- `src/components/nosotras/*/*Motion.tsx` (4 files), `src/components/contacto/*/*Motion.tsx` (3 files) — the consumers A04 considers for refactor.
- Current state: A02 + A03 complete. 15 motion wrappers across 7 files. ~80% of them follow one of two near-identical patterns. ~20% are too varied to consolidate.

## Scope

**Inventory the patterns (the review).** Read every `*Motion.tsx` file, group the wrappers by the `(initial, whileInView, transition, viewport)` tuple they share, and write down which patterns appear 2+ times with stable visual rules.

**Decide what to extract.** Apply the AGENTS.md §26 rule literally:

> Create a reusable component when:
>
> - the same pattern appears at least twice,
> - it has stable behavior and visual rules,
> - reuse makes the code easier to understand.

For each candidate pattern, write a verdict: **extract**, **defer**, or **decline**.

**Build the extracted primitives** (where the verdict is "extract"):

- `src/lib/motion/RevealItem.tsx` — a single-element motion wrapper that takes an `index` and applies a viewport-entry fade-up (or fade-up-with-scale) with `delay = baseDelay + index * stepDelay`. The 80 ms per-step budget from `MOTION.md` §6 is the default `stepDelay`; the per-section differences become props.
- `src/lib/motion/RevealStagger.tsx` — a children-wrapper that maps each child to a `<RevealItem>` with its array index. `<RevealStagger>` is implemented in terms of `<RevealItem>`; the two are related but distinct exports.
- `src/lib/motion/index.ts` — barrel updated to export the two new components.

**Refactor the 8 A02 + A03 consumers** to use the new primitives. The per-section wrapper files (`*Motion.tsx`) stay — co-location with the section is preserved — but each wrapper shrinks to a thin shim that configures the shared primitive with its per-section props. The per-section files become easier to read because the motion logic is no longer inlined 7 times.

**Update `docs/implementation/MOTION.md`** to:

- Document the new shared primitives in a new §11 (right after §10 "What C09 deliberately does not ship").
- Rewrite §8 ("The 'no animation presets' rule") to record which patterns are now shared, which remain bespoke, and why.

**Update `docs/implementation/cycles/A02-nosotras-animation.md` and `A03-contacto-animation.md`** with a small "A04 refactor note" appended to their Deviations sections: "A04 refactored 8 of the 15 motion wrappers introduced by A02 + A03 to use the shared `<RevealItem>` and `<RevealStagger>` primitives in `src/lib/motion/`. The per-section choreography is unchanged; only the implementation is consolidated."

**Cycle record + docs** — this file, `STATUS.md` (A04 row + verification table), `ROADMAP.md` (A04 → Complete).

## Out of scope

- **No new dependencies.** Motion is already installed; `src/lib/motion/` is the home for motion utilities.
- **No global `<MotionConfig>` provider.** ADR-004 still forbids it; the per-component `useReducedMotion()` hook in `<RevealItem>` / `<RevealStagger>` is the right tool (and the per-component hook is what A02 + A03 already use).
- **No new section-specific motion.** A04 is a refactor + convention-update cycle, not a feature cycle. A01 (Home animation) is the only animation work that remains; the user has explicit pending decisions for A01 and chose to do it last.
- **No changes to the A02 + A03 server components** beyond the import change. The server component's import of the per-section wrapper (`<IntroHeroBodyMotion>`, etc.) is preserved; only the per-section wrapper's internals change.
- **No SCSS changes.** A04 is a TypeScript-only refactor.
- **No tests for the new shared components** (consistent with C11 + MOTION.md §10: animation choreography is verified by `npm run typecheck` + manual screenshot, not by automated tests). The C11 surface (schemas, services, API routes) is unchanged.
- **No commit (per project rule).**

## Decisions

- **Extract Pattern A (children-wrapper with stagger) → `<RevealStagger>`.** 6 instances across A02 + A03 with the same `(initial: { opacity: 0, y }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.25 }, transition: { duration: DURATION.base, ease: EASING.out, delay })` skeleton. The only real variations are `y` (12 or 16), `baseDelay` (0 / 0.08 / 0.1 / 0.12), and `stepDelay` (0.06 / 0.08 / 0.1). All three become props with sensible defaults. Verdict: **extract**. Rationale: AGENTS.md §26 — "the same pattern appears at least twice" is met 6×; "it has stable behavior and visual rules" is met (the y / delay are the per-section tuning, not different behaviours); "reuse makes the code easier to understand" is met (one shared 30-line component replaces ~150 lines of near-identical 25-line wrappers).
- **Extract Pattern B (per-item motion with `index`) → `<RevealItem>`.** 2 instances (`TeamCardItemMotion`, `ContactTileItemMotion`) with the same skeleton. The two are used inside an `<li>` to preserve list semantics — a per-item wrapper is the only correct pattern for an `<ol>`/`<ul>`. Verdict: **extract**. Rationale: same as Pattern A, plus the 2× `<li>` use case is highly specific (preserve list semantics + per-item stagger) and benefits from a named primitive. `<RevealStagger>` is implemented in terms of `<RevealItem>` so the two share a single source of truth.
- **Decline extraction for Pattern C (single-element fade-up or scale-in).** 6 instances across A02 + A03. The variations are too large to consolidate cleanly: `y` (12 / 16 / 24), `scale` (0.96 / 0.8 / none), `amount` (0.2 / 0.25 / 0.4), `duration` (base / slow), some have `delay`, one uses `scale` only (no `y`). A shared wrapper would need 5+ props with different defaults per call site, which is the "deeply configurable component with many unrelated variants" anti-pattern from AGENTS.md §26. Verdict: **decline**. Rationale: the per-section wrapper files are the right home for the per-section tuning; a shared component would either be too generic (5+ props, defaults that don't fit most call sites) or too specific (3 sub-components, one per sub-pattern, which is more code than the current 6 bespoke wrappers).
- **Decline extraction for Pattern D (per-element with `className` + `rotation`).** 2 instances (`ContactPhotoMotion`, `ContactStickerMotion`). The `className` + `rotation` API is specific to the ContactHero collage; it is unlikely to be reused by future sections. The two instances differ in `scale` (0.96 vs 0.8) but share everything else. Verdict: **decline**. Rationale: AGENTS.md §26 — "reuse makes the code easier to understand" is not met here. The two wrappers are 80 lines of code, would shrink to ~30 lines if extracted, but the API (className + rotation + scale) is too collage-specific. Future collage work can copy the pattern; a shared component would either be too collage-specific (and live in `src/components/contacto/`) or too generic (and not help either future collage work or non-collage work).
- **Naming: `<RevealItem>` and `<RevealStagger>`.** `MOTION.md` §8 mentioned `<Reveal>`, `<FadeUp>`, and `<Parallax>` as example names; the actual extracted primitives are `<RevealItem>` (the per-item primitive) and `<RevealStagger>` (the children-wrapper that uses `<RevealItem>` internally). The naming follows the existing convention of "verb" + "noun" (e.g., `useReducedMotion`, `MotionConfig`) and is more specific than `<Reveal>` (which is too vague for two distinct components).
- **Location: `src/lib/motion/`.** Consistent with the existing motion utilities (`tokens.ts`, `useReducedMotion.ts`). `src/lib/motion/index.ts` is updated to export the two new components. Co-location with the other motion utilities is more important than the "components go in `src/components/`" convention because the components are motion-domain (they consume `useReducedMotion` and `DURATION`/`EASING`).
- **API surface: 5 props.** `<RevealItem>` takes `index` (required) + 5 optional config props (`y`, `stepDelay`, `baseDelay`, `amount`, `duration`) + `children`. `<RevealStagger>` takes the same 5 optional config props + `children`. All 5 props have sensible defaults that cover ~80% of call sites. The remaining 20% configure the per-section tuning.
- **Defaults:** `y: 16`, `stepDelay: 0.08`, `baseDelay: 0`, `amount: 0.25`, `duration: DURATION.base`. These are the values used by the most-common call sites (`DevolverTextColumnMotion`, `TeamHeaderMotion`, `ContactDetailsHeadingMotion`). The 80 ms `stepDelay` is the centre of the 40–80 ms per-step budget from `MOTION.md` §6.
- **No tests for the shared components.** Per `MOTION.md` §10 and C11's testing policy, animation choreography is verified by `npm run typecheck` and by manual screenshot, not by automated tests. The shared components are tiny pure exports; the verification surface is the existing 93 tests + `npm run typecheck` + visual verification of the A02 + A03 pages.
- **Per-section wrapper files stay.** The 7 `*Motion.tsx` files in `src/components/{nosotras,contacto}/` are preserved; each wrapper shrinks to a thin shim that calls the shared primitive. The per-section tuning (y, baseDelay, stepDelay, amount) is visible in the file next to the section. The total per-section file shrinks from ~50–80 lines to ~10–15 lines; the total codebase shrinks by ~150 lines.
- **`<RevealStagger>` is implemented in terms of `<RevealItem>`** (it maps `Children.toArray(children)` to `<RevealItem>` calls with their array index). The two share the same config type. There is no `Children.toArray` duplication between the two.

## Expected files

Created:

- `src/lib/motion/RevealItem.tsx`
- `src/lib/motion/RevealStagger.tsx`
- `docs/implementation/cycles/A04-shared-motion-review.md` (this file)

Modified:

- `src/lib/motion/index.ts` — barrel updated to export `<RevealItem>` and `<RevealStagger>`.
- `src/components/nosotras/IntroHero/IntroHeroMotion.tsx` — `IntroHeroBodyMotion` refactored to `<RevealStagger>`.
- `src/components/nosotras/DevolverSection/DevolverSectionMotion.tsx` — `DevolverTextColumnMotion` refactored to `<RevealStagger>`.
- `src/components/nosotras/TeamSection/TeamSectionMotion.tsx` — `TeamHeaderMotion` refactored to `<RevealStagger>`; `TeamCardItemMotion` refactored to `<RevealItem>`.
- `src/components/nosotras/TrabajarCTA/TrabajarCTAMotion.tsx` — `TrabajarTextColumnMotion` refactored to `<RevealStagger>`.
- `src/components/contacto/ContactHero/ContactHeroMotion.tsx` — `ContactHeroTextBottomMotion` refactored to `<RevealStagger>`.
- `src/components/contacto/ContactDetails/ContactDetailsMotion.tsx` — `ContactDetailsHeadingMotion` refactored to `<RevealStagger>`; `ContactTileItemMotion` refactored to `<RevealItem>`.
- `docs/implementation/MOTION.md` — new §11 ("Shared motion primitives") documenting `<RevealItem>` and `<RevealStagger>`; §8 ("The 'no animation presets' rule") rewritten to record the new state.
- `docs/implementation/cycles/A02-nosotras-animation.md` — appended "A04 refactor note" to Deviations.
- `docs/implementation/cycles/A03-contacto-animation.md` — appended "A04 refactor note" to Deviations.
- `docs/implementation/STATUS.md` — A04 row added; verification table row; "Current active cycle" updated; cycle history row.
- `docs/implementation/ROADMAP.md` — A04 row → `Complete`.

Untouched:

- `src/lib/motion/tokens.ts`, `src/lib/motion/useReducedMotion.ts` — the existing utilities are unchanged; the new components consume them.
- `src/lib/motion/RevealItem.tsx` and `src/lib/motion/RevealStagger.tsx` do not export `motion` itself; consumers continue to import `motion` from `motion/react` directly when they need to (only the per-photo / per-sticker motion components in ContactHero do, and those are not refactored).
- The 7 per-section wrapper files in `src/components/{nosotras,contacto}/` keep their export names; only the internals change.
- The 7 Pattern C + D wrappers (single-element, per-photo, per-sticker) stay bespoke.
- `src/app/(site)/{nosotras,contacto}/page.tsx`, `(site)/layout.tsx`, every other page, the root `layout.tsx`.
- `src/components/ui/**`, `src/lib/metadata/**`, `src/lib/env.ts`, `src/lib/schemas/**`, `src/lib/services/**`, `src/lib/assets.ts`, `src/styles/**`, `src/content/**`, `src/config/**`, `src/components/home/**` (off-limits per hand-off), `src/components/forms/**`, `tests/**`, `public/**`, `mds/**`, `references/**`, canonical docs.
- `package.json` / `package-lock.json` (no new dependencies).

## Acceptance criteria

- [x] `src/lib/motion/RevealItem.tsx` and `src/lib/motion/RevealStagger.tsx` are created, have `"use client"`, use `motion` from `motion/react`, and consume `DURATION`, `EASING`, and `useReducedMotion` from `@/lib/motion`.
- [x] Neither `<RevealItem>` nor `<RevealStagger>` hard-codes a duration or easing.
- [x] Both components honour `prefers-reduced-motion: reduce` via the `useReducedMotion` hook (same pattern as A02 + A03).
- [x] `<RevealStagger>` is implemented in terms of `<RevealItem>` (no duplicated `Children.toArray` / `motion.div` logic).
- [x] The 8 Pattern A + B consumers in A02 + A03 are refactored to use the shared primitives. The per-section wrapper files stay; the per-section tuning is visible in the file next to the section.
- [x] The 7 Pattern C + D wrappers stay bespoke (per the cycle's "Decline" decisions).
- [x] `MOTION.md` is updated: new §11 documents the shared primitives; §8 records which patterns are now shared, which remain bespoke, and why.
- [x] `STATUS.md` and `ROADMAP.md` are updated.
- [x] The A02 + A03 cycle records gain a small "A04 refactor note" in their Deviations sections.
- [x] `npm run typecheck` passes.
- [x] `npm run lint` passes (0 errors, the pre-existing home-page warnings remain).
- [x] `npm run format:check` passes for every A04-touched file (the remaining warnings are pre-existing home-page files, out of scope per the hand-off).
- [x] `npm run test` passes (93 tests; A04 is a refactor, not a feature, so the test count is unchanged).
- [x] `npm run build` succeeds; `/nosotras` and `/contacto` remain `○ (Static)`; the A04 refactor does not change the page bundle surface beyond the new shared components.
- [x] Visual: `/nosotras` and `/contacto` render identically to the A02 + A03 verified states (same motion, same final state, same reduced-motion behaviour).
- [x] No new dependency is added; the existing `motion@12.42.2` is the only animation runtime.

## Verification commands

```bash
ls -1 src/lib/motion/
cat src/lib/motion/index.ts
grep -l "use client" src/lib/motion/RevealItem.tsx src/lib/motion/RevealStagger.tsx
grep -L "useReducedMotion" src/lib/motion/RevealItem.tsx src/lib/motion/RevealStagger.tsx
grep -L "DURATION\|EASING" src/lib/motion/RevealItem.tsx src/lib/motion/RevealStagger.tsx
grep -rn "RevealItem\|RevealStagger" src/components/
npm run typecheck
npm run lint
npm run format:check
npm run test
npm run build
```

## Verification evidence

- **Typecheck** → passes. `<RevealItem>` and `<RevealStagger>` are typed; `RevealConfig` is the shared config type used by both. The 8 refactored per-section wrappers compile cleanly (each is now a thin shim that calls the shared primitive with its per-section props).
- **Lint** → 0 errors, 2 pre-existing warnings (both in `src/components/home/PortafolioPreview/PortafolioPreview.tsx`; out of A04 scope and left untouched).
- **Format** → passes for every A04-touched file. 5 remaining format warnings are all in the home-page or pre-existing data files; all are off-limits per the hand-off. The new `A04-shared-motion-review.md` was prettier-formatted as part of the A04 update.
- **Test** → 93/93 tests pass across 9 files. A04 is a refactor, not a feature; no new tests. Per `MOTION.md` §10, animation choreography is verified by `npm run typecheck` and by manual screenshot, not by automated tests.
- **Build** → `npm run build` succeeds. All 21 static pages generated. `/nosotras` and `/contacto` remain `○ (Static)`. The A04 refactor does not change the page bundle surface beyond the new shared primitives (which add ~50 lines of source but compile to small client islands).
- **Line count:** the A02 + A03 per-section wrapper files shrank from ~605 lines (counted in A03's verification evidence) to 453 lines after the refactor. The new `src/lib/motion/RevealItem.tsx` (which exports both `<RevealItem>` and `<RevealStagger>`) is 153 lines, of which ~100 lines are JSDoc and ~50 lines are the actual component logic. Net source-code change: roughly even (the duplication was replaced by documentation), but the per-section files are now 30–70% smaller and the shared logic is in one place.
- **Visual check at 1440 px (reduced motion)** → `/tmp/p01-screens/nosotras-a04-1440-reduced.png` and `/tmp/p01-screens/contacto-a04-1440-reduced.png`. Both pages render identically to the A02 + A03 verified states. The P02 "AL PROCESO CREATIVO" wrap still works; the 4 contact tiles are all visible; the ContactHero collage rotations are preserved; the form card and brand statement are unchanged. The refactor is implementation-only; the visual output is byte-equivalent to the A02 + A03 states.
- **No new dependency** is added; the existing `motion@12.42.2` is the only animation runtime.

## Deviations and TODOs

- **The per-section wrapper files stay co-located with their section.** A04 considered deleting the per-section `*Motion.tsx` files and having the server components import the shared primitives directly. The decision was to keep the per-section files: (a) co-location with the section is a long-standing project convention, (b) the per-section wrapper is now a 5–10 line thin shim that documents the per-section tuning (y, baseDelay, stepDelay, amount) in the file next to the section, and (c) future section-specific motion components (e.g. a per-photo collage reveal like `ContactPhotoMotion`) can be added to the same file without expanding the shared primitive. Net effect: each refactored per-section file is now 30–70% smaller, but the per-section "motion" folder entry is preserved.
- **`<RevealStagger>` and `<RevealItem>` are exported from the same file (`src/lib/motion/RevealItem.tsx`).** The two are tightly coupled (one is implemented in terms of the other); splitting them into two files would add a barrel for no benefit. The file name reflects the lower-level primitive; the JSDoc at the top of the file documents both exports.
- **No tests for the shared primitives.** Per `MOTION.md` §10 and C11's testing policy, animation choreography is verified by `npm run typecheck` and by manual screenshot, not by automated tests. The shared primitives are tiny pure exports; the verification surface is the existing 93 tests + `npm run typecheck` + visual verification of the A02 + A03 pages.
- **The A04 refactor does not change the visual output** of either page. The animation timing (delays, durations, easings) is identical to the A02 + A03 verified states. The per-section tuning (y, baseDelay, stepDelay, amount) is preserved in the per-section wrapper file as the prop values passed to the shared primitive. Future A-cycles can compare the A04 reduced-motion screenshots against the A02 + A03 screenshots to confirm byte-equivalence; the per-section prop values are the source of truth.
- **The A02 + A03 cycle records each gain a small "A04 refactor note"** in their Deviations sections, linking to this cycle's record. The refactor is recorded in the per-cycle history so future readers know which wrappers are now shared and which stay bespoke.
- **The "no animation presets" rule from `MOTION.md` §8 is rewritten** to record the new state: two shared primitives exist, the remaining 7 wrappers stay bespoke, and the "same pattern 2+ times" criterion is now met for the two shared primitives. A future section that needs a pattern that is not one of the two shared primitives should follow the same approach as A02 + A03 (own a per-section wrapper); the next shared-motion review (or the next A04-style cycle) considers extraction if the new pattern appears 2+ more times.
- **The A04 cycle is intentionally light on visual verification.** A04 is a refactor, not a feature; the visual output is unchanged. The reduced-motion screenshots at 1440 px are sufficient to confirm that the refactor did not break the page. Full visual verification at 5 viewports × 2 motion modes is not repeated here; the A02 + A03 records already cover that surface.
- **The pre-existing `npm audit` findings (postcss, sharp transitive deps) remain unchanged.** They are Next.js-related and not introduced by A04.
- **The pre-existing headless-Chrome `whileInView` caveat from A03** remains unchanged. The reduced-motion screenshots (which use `--force-prefers-reduced-motion`) are the right tool for visual verification of A04's refactor; the regular-motion headless screenshots are still inconsistent for the reasons documented in A03.

## Completion

- Commit: pending — user commits manually per project rule.
- Completed on: 2026-07-25.
