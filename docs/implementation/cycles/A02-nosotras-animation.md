# A02 — Nosotras animation

## Status

Complete (awaiting user commit)

## Objective

Add the page-specific Motion choreography to every section of the `/nosotras` route so the editorial composition reveals on scroll without delaying the LCP, respects `prefers-reduced-motion: reduce`, and keeps the page statically prerendered. Folds in the residual P02 "AL PROCESO CREATIVO" clipping fix.

## Inputs

- `PRD.md` §12 — Animation architecture. §13 — Client/Server split. §18 — SEO + performance. §25 — Accessibility.
- `DESIGN.md` §20 — Motion direction. §21 — Responsive. §25 — Animation rules table.
- `AGENTS.md` §4 (fixed stack), §6 (Server/Client), §13 (animation rules), §25 (a11y baseline), §26 (components).
- `docs/implementation/MOTION.md` — SCSS vs Motion split, token consumption, reduced-motion patterns, client-boundary pattern, "no animation presets" rule, performance rules, worked fade-up snippet.
- `docs/decisions/ADR-004-animation-strategy.md` — Motion only, no GSAP, SCSS owns microinteractions, Motion owns meaningful React animation.
- `docs/implementation/cycles/C09-motion-foundation.md` — `motion@12.42.2` is installed; `src/lib/motion/{tokens,useReducedMotion,index}.ts` is the project's motion utility surface; `DURATION` and `EASING` are the typed token mirror of the SCSS motion tokens.
- `docs/implementation/cycles/P02-nosotras.md` — "AL PROCESO CREATIVO" clipping regression. Round A of A02 folds the fix in.
- `references/nosotras/nosotras.png` — approved Figma composition. Editorial, static, no prototype motion data; the choreography is derived from the composition's hierarchy (heading → body → collage) and from `DESIGN.md` §20.
- Current state: P02 complete, P03 complete, no animation on `/nosotras`. The four Server Components (`IntroHero`, `DevolverSection`, `TeamSection`, `TrabajarCTA`) are all that the page renders.

## Scope

- **Fold in the P02 "AL PROCESO CREATIVO" clipping fix** by scoping `white-space: nowrap` from the parent `.heading` onto `.headlinePrimary` only. The accent line then wraps as the Figma intended at 1440 px without changing the desktop composition.
- **`src/components/nosotras/IntroHero/IntroHeroMotion.tsx`** — small client island that wraps the illustration column and the body lede. The H1 (LCP) does NOT animate; per `MOTION.md` §6 the LCP must paint first. The illustration column reveals with `y: 24 → 0` + `opacity: 0 → 1`. The three body paragraphs reveal with a 60 ms stagger.
- **`src/components/nosotras/DevolverSection/DevolverSectionMotion.tsx`** — client island wrapping the photo column (scale `0.96 → 1` + opacity) and the text column (eyebrow → heading → body, 80 ms stagger). The two-line heading is one `<h2>` (per P02); the motion wrapper animates the heading as a whole.
- **`src/components/nosotras/TeamSection/TeamSectionMotion.tsx`** — client island wrapping the header (eyebrow + heading + intro, 80 ms stagger) and the three cards (80 ms stagger, `y: 16 → 0` + opacity). The card stagger is the strongest case for a coordinated reveal on the page.
- **`src/components/nosotras/TrabajarCTA/TrabajarCTAMotion.tsx`** — client island wrapping the icon (scale `0.8 → 1` + opacity) and the text column (heading → lede → button, 80 ms stagger). The button's hover/active/focus states stay in SCSS.
- **Wrap each Server Component in its `*Motion` client island.** Naming pattern follows `MOTION.md` §5: the server file stays `*.tsx` and imports the matching `*Motion.tsx` client wrapper. The page itself is not changed.
- **Cycle record + docs** — this file (A02 status flipped at the end), `STATUS.md` (A02 row + verification row), `ROADMAP.md` (A02 → Complete).

## Out of scope

- **No global `<MotionConfig>` provider.** Each section's client island handles its own reduced motion. MOTION.md §4.2 explicitly forbids wrapping the whole `(site)` layout; none of the four sections has 3+ child `motion.*` components that all share the same fallback.
- **No new `<Reveal>` / `<FadeUp>` / `<SectionMotion>` component.** The "no animation presets" rule from `MOTION.md` §8 says a reusable component is created only when the same pattern appears in at least two sections. A01 (Home) is the natural first cycle to need a shared preset; A02 ships bespoke per-section choreography and A04 (Shared motion review) decides whether anything should be extracted.
- **No Hero H1 reveal.** The H1 is the LCP. MOTION.md §6: "No animation before the LCP content is visible." Only the illustration column and the body lede reveal; the H1 paints immediately.
- **No portfolio / infinite carousel animation.** That belongs to P01 (Home portfolio preview) which is out of scope per the hand-off.
- **No animation in the Header / Footer / shared layout.** The mobile menu / newsletter form / skip-link are SCSS-only per the existing cycles.
- **No new dependencies.** Motion is already installed; `src/lib/motion/` is already there.
- **No tests for the motion wrappers.** C11's test coverage is for schemas and services (the 93 tests cover that). Animation choreography is verified by `npm run typecheck`, by manual screenshot at the five canonical viewports, and by reduced-motion emulation. Per `MOTION.md` §10, this is intentional.
- **No SCSS changes beyond the Round A `DevolverSection.module.scss` edit.** All other animations are achieved by wrapping existing elements in `motion.*` components; the existing styles do the layout.
- **No responsive-specific animation.** The motion is the same on every breakpoint; the responsive layout is owned by SCSS. Per `MOTION.md` §6: "Do not run continuous animation across many large raster images." Card stagger is not "continuous" — it plays once on viewport entry.
- **No commit (per project rule).**

## Decisions

- **Per-component hook (pattern 4.1 from MOTION.md) is the default for all four sections.** No section has 3+ child `motion.*` components that all need the same reduced-motion fallback; the `useReducedMotion()` hook inside each `*Motion.tsx` is the smallest correct surface.
- **No section-level `<MotionConfig>` provider** (per `MOTION.md` §4.2 and ADR-004). Rationale recorded in `MOTION.md` §10 and re-confirmed: the layout stays a Server Component and the provider is not introduced speculatively.
- **Hero H1 does not animate.** The H1 is the LCP; it paints on first frame. Only the illustration column and the body lede reveal. The eyebrow also does not animate (it sits at the top of the LCP block). This is the only place on the page where "the headline does not reveal" is the right call.
- **Hero lede paragraphs use a 60 ms stagger.** Three paragraphs, one stagger step, total stagger 0.12 s. Below the 40–80 ms per-step budget; the total duration stays short so it does not delay the LCP image (which is the illustration, not the text).
- **Devolver section heading animates as a whole, not word-by-word.** The two-line heading is one `<h2>`; a per-word reveal would split the heading into many `motion.span` children, violate the "stagger 6–8 children max" rule, and add JS to a section whose editorial tone is restrained.
- **Team section card stagger is 80 ms per card, three cards total.** Total stagger 0.16 s, well within the budget. Each card animates with `y: 16 → 0` + `opacity: 0 → 1` and `DURATION.base`. The team photo image is raster; per `MOTION.md` §6 ("Do not run continuous animation across many large raster images"), the animation is once-on-entry, not continuous, so the budget is fine.
- **TrabajarCTA icon scales from 0.8 to 1.** The icon is an inline SVG, not a raster image, so the scale is compositor-only. The icon is decorative (`aria-hidden="true"`) per the existing component.
- **Reduced-motion handling: `y` initial value is 0, `duration` is 0, `scale` is 1** when `useReducedMotion()` returns `true`. The final visual state is identical to the non-reduced case; only the entrance movement is removed. The stagger delays collapse to 0 as well (Motion's `staggerChildren` respects reduced motion when the children individually set `duration: 0`).
- **The P02 `nowrap` fix is folded into A02 rather than a separate "P02.1" cycle.** The fix is a 3-line SCSS change and the user explicitly approved folding it in. It rides in the same commit boundary (which the user will make) and ships in the same build.
- **Naming convention: `*Motion.tsx` is the client wrapper, `*.tsx` stays the Server Component.** The page renders `<IntroHero />` etc. as before; the server component internally renders `<IntroHeroMotion>...</IntroHeroMotion>`. The page itself does not learn about the client islands.
- **Per-section wrappers are in the same folder as the server component** (`src/components/nosotras/IntroHero/IntroHeroMotion.tsx`). Not in `src/components/sections/` or `src/components/motion/`. The pattern in `MOTION.md` §5 uses `src/components/sections/` as an example; the actual rule is "co-located with the server component."
- **The page is not modified.** `src/app/(site)/nosotras/page.tsx` stays exactly as P02 left it. All A02 changes are inside the four section folders.

## Expected files

Created:

- `src/components/nosotras/IntroHero/IntroHeroMotion.tsx`
- `src/components/nosotras/DevolverSection/DevolverSectionMotion.tsx`
- `src/components/nosotras/TeamSection/TeamSectionMotion.tsx`
- `src/components/nosotras/TrabajarCTA/TrabajarCTAMotion.tsx`
- `docs/implementation/cycles/A02-nosotras-animation.md` (this file)

Modified:

- `src/components/nosotras/IntroHero/IntroHero.tsx` — render `<IntroHeroMotion>` for the illustration column and the body.
- `src/components/nosotras/DevolverSection/DevolverSection.tsx` — render `<DevolverSectionMotion>` for the photo column and the text column.
- `src/components/nosotras/TeamSection/TeamSection.tsx` — render `<TeamSectionMotion>` for the header and the card row.
- `src/components/nosotras/TrabajarCTA/TrabajarCTA.tsx` — render `<TrabajarCTAMotion>` for the icon and the text column.
- `src/components/nosotras/DevolverSection/DevolverSection.module.scss` — `white-space: nowrap` moved from `.heading` to `.headlinePrimary` (Round A).
- `docs/implementation/STATUS.md` — A02 row added; verification table row; "Current active cycle" updated.
- `docs/implementation/ROADMAP.md` — A02 row → `Complete`.

Untouched:

- `src/app/(site)/nosotras/page.tsx`, `(site)/layout.tsx`, every other page, the root `layout.tsx`.
- `src/components/ui/**`, `src/lib/motion/**` (no new utilities needed), `src/lib/metadata/**`, `src/lib/env.ts`, `src/lib/schemas/**`, `src/lib/services/**`, `src/lib/assets.ts` (only the nosotras portion was already modified in P02; not touched again in A02), `src/styles/**`, `src/content/**`, `src/config/**`, `src/components/home/**` (off-limits per hand-off), `tests/**`, `public/**`, `mds/**`, `references/**`, canonical docs.
- `package.json` / `package-lock.json` (no new dependencies).

## Acceptance criteria

- [x] Each of the four section folders contains a new `*Motion.tsx` client wrapper that uses `motion` from `motion/react` and consumes `DURATION` / `EASING` / `useReducedMotion` from `@/lib/motion`.
- [x] No Motion wrapper hard-codes a duration or easing.
- [x] The IntroHero H1 does not animate; the LCP paints on the first frame.
- [x] The four Server Components still render their original markup; only the wrapping in `motion.*` components is new.
- [x] The page is not modified; `(site)/layout.tsx` is not modified; the `dynamic = "error"` guardrail is preserved.
- [x] `prefers-reduced-motion: reduce` removes the movement of every Motion component while preserving the final state. Verified by Chrome DevTools emulation and by the `useReducedMotion` hook being called in every `*Motion.tsx` wrapper.
- [x] The P02 "AL PROCESO CREATIVO" clipping is fixed: the accent line wraps at 1440 px (or stays on one line) without clipping the right edge of the viewport.
- [x] `npm run typecheck` passes.
- [x] `npm run lint` passes (0 errors, the pre-existing home-page warnings remain).
- [x] `npm run format:check` passes for every A02-touched file (the 5 remaining warnings are pre-existing home-page files, out of scope per the hand-off).
- [x] `npm run test` passes (93 tests).
- [x] `npm run build` succeeds; `/nosotras` remains `○ (Static)`; no new client islands leak into the page bundle beyond the four `*Motion.tsx` files.
- [x] `npm run verify` end-to-end passes.
- [x] No new dependency is added; the existing `motion@12.42.2` is the only animation runtime.

## Verification commands

```bash
ls -1 src/components/nosotras/*/*Motion.tsx
grep -l "use client" src/components/nosotras/*/*Motion.tsx
grep -l "motion/react" src/components/nosotras/*/*Motion.tsx
grep -L "DURATION" src/components/nosotras/*/*Motion.tsx
grep -L "useReducedMotion" src/components/nosotras/*/*Motion.tsx
npm run typecheck
npm run lint
npm run format:check
npm run test
npm run build
```

## Verification evidence

- **Typecheck** → passes. All four `*Motion.tsx` files import correctly; `DURATION` and `EASING` are typed; `useReducedMotion()` returns `boolean` per the project wrapper.
- **Lint** → 0 errors, 2 pre-existing warnings (both in `src/components/home/PortafolioPreview/PortafolioPreview.tsx`; out of A02 scope and left untouched).
- **Format** → passes for every A02-touched file. 5 remaining format warnings are all in the home-page or pre-existing data files (`PortafolioPreview.tsx`, `Scallop.tsx`, `ServiceCard.module.scss`, `ServicesPreview.tsx`, `homeServices.ts`); all are off-limits per the hand-off.
- **Test** → 93/93 tests pass across 9 files. No new tests; per `MOTION.md` §10 and C11's testing policy, animation choreography is verified by `npm run typecheck` and by manual screenshot, not by automated tests.
- **Build** → `npm run build` succeeds. All 21 static pages generated. `/nosotras` is `○ (Static)`. The four `*Motion.tsx` files render their initial state into the prerendered HTML (verified by `grep -c 'opacity:0' .next/server/app/nosotras.html` returning 4, one per section).
- **Visual check at 1440 px** → `/tmp/p01-screens/nosotras-a02-1440-t10.png` (with `--virtual-time-budget=10000` so the `whileInView` triggers). All four sections are visible after their respective delays. The "AL PROCESO CREATIVO" accent line now wraps to two lines ("AL PROCESO" / "CREATIVO") as the Figma intends, with no clipping at the right edge of the viewport. The H1 paints on the first frame (LCP preserved).
- **Visual check at 1280 px** → `/tmp/p01-screens/nosotras-a02-1280.png`. Same composition, the accent still wraps. No layout shift between 1280 and 1440.
- **Visual check at 768 px** → `/tmp/p01-screens/nosotras-a02-768.png`. The two-column layout collapses as expected. The accent still wraps to two lines. The "Devolver lo humano" primary line stays on one line and slightly overflows the right edge of the text column at this width (see "Deviations and TODOs" below).
- **Visual check at 390 px and 320 px** → `/tmp/p01-screens/nosotras-a02-390.png` and `nosotras-a02-320.png`. The mobile single-column layout works. Both the primary and the accent wrap; no clipping. The mobile dropdown header is preserved.
- **Reduced-motion check** → `/tmp/p01-screens/nosotras-a02-1440-reduced.png` (taken with `--force-prefers-reduced-motion`). Every section is visible from the first frame, no movement. The visual is identical to the final state of the non-reduced screenshot. The `useReducedMotion()` hook in every wrapper collapses `y: 24` → `0`, `scale: 0.96/0.8` → `1`, and `duration` → `0`; the entrance animation is removed but the content is preserved.

## Deviations and TODOs

- **The `Devolver lo humano` primary line slightly overflows the right edge of the text column at 768 px.** The `white-space: nowrap` is now scoped to `.headlinePrimary` only (per the Round A fix) and applies down to the `(max-width: 767px)` breakpoint. At 768 px the column is 50% of the container, the text "Devolver lo humano" is wider than the column at the current `font-size: var(--font-size-2xl)`, and the text overflows. At 1440 / 1280 px the column is wide enough to contain it. This is a pre-existing P02 issue (P02's wider `white-space: nowrap` had the same behaviour at 768 px, just covered by the parent rule). A future cycle can either reduce the primary's font-size at the 768–1279 range, allow the primary to wrap at this width, or accept the editorial overflow. Not blocking A02.
- **The yellow scallop divider at the top of the Devolver section and the cream scallop divider at the top of the TrabajarCTA continue to render as discrete half-circles instead of a smooth wave** (inherited from P01, documented in the P02 cycle). A02 does not touch the scallop topology. Q01 owns the resolution.
- **The paper-clip sticker and the fist-bump sticker remain the best-effort approximations** from P02 (paper-clip is baked into the team photo, fist-bump is an inline SVG in `TrabajarCTA.tsx`). A02 does not change them. Q01 owns the sticker assets.
- **The team illustration is still a raster** (`nosotras.teamIllustration` points at `section-devolver.png`). A02 does not vectorise it. Q01 owns the vectorisation.
- **No animation on the H1 (LCP) is by design, not a TODO.** The hero H1 ("Somos NOI. Y NOI significa nosotros.") is the largest above-the-fold text element; painting it on the first frame is the right trade-off. Any future hero animation that wants to "reveal" the H1 must respect `MOTION.md` §6 ("No animation before the LCP content is visible") and either (a) animate only after a `requestIdleCallback`, or (b) accept that the H1 is part of the LCP and not animate it. The current choice is (b).
- **The four `*Motion.tsx` client wrappers are not extracted into a shared `<Reveal>` / `<FadeUp>` component** (per `MOTION.md` §8 and the cycle's "no animation presets" decision). If A01 (Home) and A03 (Contacto) end up needing the same children-stagger pattern, A04 (Shared motion review) will decide whether to extract a shared primitive. Until then, A02's per-section wrappers stay bespoke and per-section approved.
- **No automated tests for the motion wrappers.** Per `MOTION.md` §10, this is intentional until a clear value case appears. C11's 93 tests cover schemas, services, and API routes — the surfaces that have user-visible failure modes. Motion is verified by `typecheck` + manual screenshot at five viewports + reduced-motion emulation.
- **The pre-existing `npm audit` findings (postcss, sharp transitive deps) remain unchanged.** They are Next.js-related and not introduced by A02.
- **A04 refactor note:** A04 refactored 4 of the 8 A02 motion wrappers to use the shared `<RevealStagger>` and `<RevealItem>` primitives in `src/lib/motion/`. The refactored wrappers are: `IntroHeroBodyMotion`, `DevolverTextColumnMotion`, `TeamHeaderMotion`, `TrabajarTextColumnMotion` (all 4 use `<RevealStagger>`), and `TeamCardItemMotion` (uses `<RevealItem>`). The 3 wrappers that stay bespoke are `IntroHeroIllustrationMotion`, `DevolverPhotoMotion`, and `TrabajarIconMotion` (the "single-element fade-up or scale-in" pattern that A04 declined to extract). The per-section choreography is unchanged; only the implementation is consolidated. See [`./A04-shared-motion-review.md`](./A04-shared-motion-review.md) for the full decision record.

## Completion

- Commit: pending — user commits manually per project rule.
- Completed on: 2026-07-24.
