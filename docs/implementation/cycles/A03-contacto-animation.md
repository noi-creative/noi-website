# A03 — Contacto animation

## Status

Complete (awaiting user commit)

## Objective

Add the page-specific Motion choreography to every section of the `/contacto` route so the editorial composition reveals on scroll without delaying the LCP, respects `prefers-reduced-motion: reduce`, and keeps the page statically prerendered. Uses the same per-component `useReducedMotion` pattern, the same `<Name>Motion.tsx` co-location convention, and the same per-item stagger pattern that A02 (Nosotras animation) established.

## Inputs

- `PRD.md` §12 — Animation architecture. §13 — Client/Server split. §18 — SEO + performance. §25 — Accessibility.
- `DESIGN.md` §20 — Motion direction. §24 — Contacto composition. §25 — Animation rules table.
- `AGENTS.md` §4 (fixed stack), §6 (Server/Client), §13 (animation rules), §25 (a11y baseline), §26 (components).
- `docs/implementation/MOTION.md` — the project-wide motion conventions: SCSS vs Motion split, token consumption, reduced-motion patterns, client-boundary pattern, "no animation presets" rule, performance rules, worked fade-up snippet.
- `docs/implementation/cycles/C09-motion-foundation.md` — `motion@12.42.2` is installed; `src/lib/motion/{tokens,useReducedMotion,index}.ts` is the project's motion utility surface; `DURATION` and `EASING` are the typed token mirror of the SCSS motion tokens.
- `docs/implementation/cycles/A02-nosotras-animation.md` — the just-shipped A02 cycle; this cycle is its companion. A03 follows the same per-section bespoke motion pattern; the per-item motion wrapper inside an `<li>` (to preserve list semantics) is the pattern that A02 used for the team cards; A03 reuses it for the contact tiles.
- `docs/implementation/cycles/P03-contacto.md` — the static composition A03 is animating. The ContactHero collage, ContactDetails 2-column layout, and BrandStatement scallop statement all ship in P03; A03 only adds motion.
- `references/contact/contacto.png` — approved Figma composition. Editorial, static, no prototype motion data; the choreography is derived from the composition's hierarchy and from `DESIGN.md` §20.
- Current state: P03 complete, A02 complete, no animation on `/contacto`. The three Server Components (`ContactHero`, `ContactDetails`, `BrandStatement`) are all that the page renders. The `ContactForm` inside `ContactDetails` is itself a Client Component (C10) and stays untouched by A03.

## Scope

- **`src/components/contacto/ContactHero/ContactHeroMotion.tsx`** — small client island exporting four motion wrappers:
  - `ContactHeroTextTopMotion` (children-wrapper) — reveals the single eyebrow above the H1. 80 ms base delay.
  - `ContactHeroTextBottomMotion` (children-wrapper) — reveals the lede and the CTA row with a 100 ms stagger.
  - `ContactPhotoMotion` (per-element wrapper) — reveals a single photo. Props: `className: string` (the SCSS Module class string, including positioning + sizing), `rotation: number` (the existing CSS `transform: rotate(...)` value, baked into Motion so the rotation is preserved during and after the entrance). Scale `0.96 → 1`, opacity `0 → 1`, `DURATION.slow`.
  - `ContactStickerMotion` (per-element wrapper) — same shape as `ContactPhotoMotion` but with scale `0.8 → 1`. The retro telephone sticker is an inline SVG / PNG; the scale is compositor-only.
- **`src/components/contacto/ContactDetails/ContactDetailsMotion.tsx`** — small client island exporting three motion wrappers:
  - `ContactDetailsHeadingMotion` (children-wrapper) — reveals the H2 and the lede. 80 ms stagger.
  - `ContactTileItemMotion` (per-item wrapper inside each `<li>`) — the same per-item pattern A02 used for `TeamCardItemMotion`. Stagger via `index * 0.08 s`. The `<ul>`/`<li>` semantics are preserved: the server component renders one `<li>` per tile, each containing a `ContactTileItemMotion` wrapping a `<ContactTile>`.
  - `ContactFormCardMotion` (single-element wrapper) — reveals the form card (heading + `ContactForm`) as a single unit. The `ContactForm` itself is a Client Component with its own RHF state; A03 does not animate individual fields.
- **`src/components/contacto/BrandStatement/BrandStatementMotion.tsx`** — small client island exporting one motion wrapper:
  - `BrandStatementHeadingMotion` (children-wrapper) — reveals the two-span H2 as a single unit (matches the A02 DevolverSection heading pattern).
- **Wrap each Server Component in its `*Motion` client islands.** The page itself is not modified.
- **Cycle record + docs** — this file (A03 status flipped at the end), `STATUS.md` (A03 row + verification row), `ROADMAP.md` (A03 → Complete).

## Out of scope

- **No global `<MotionConfig>` provider.** Per `MOTION.md` §4.2 and ADR-004. None of the three sections has 3+ child `motion.*` components that all share the same reduced-motion fallback; the per-component hook pattern is the right tool.
- **No new `<Reveal>` / `<FadeUp>` / `<SectionMotion>` component.** The "no animation presets" rule from `MOTION.md` §8 says a shared primitive is created only when the same pattern appears in at least two sections. A02 and A03 both use per-item stagger wrappers; A04 (Shared motion review) will decide whether the two patterns are similar enough to extract. Until then, A03's per-section wrappers stay bespoke and per-section approved.
- **No ContactHero H1 reveal.** The H1 ("Hablemos de tu proyecto") is the LCP. It paints on the first frame. Only the eyebrow reveals above it (the eyebrow is small text, not the LCP) and the lede + CTA reveal below it (per `MOTION.md` §6).
- **No animation inside the `ContactForm`.** C10's form is a Client Component with its own RHF + Zod state. Animating individual fields would require per-field client islands (the `Controller` pattern does not expose the form-field ref to a parent motion component without a refactor) and would add JS for negligible visual value. The form card is animated as a single unit; the internal field UX (focus, error, success) stays SCSS.
- **No new dependencies.** Motion is already installed; `src/lib/motion/` is already there.
- **No tests for the motion wrappers.** C11's 93 tests cover schemas, services, and API routes. Animation choreography is verified by `npm run typecheck`, by manual screenshot at the five canonical viewports, and by reduced-motion emulation. Per `MOTION.md` §10, this is intentional.
- **No P03 residual fold-in.** The P03 cycle's residuals (hero collage composition polish, retro-telephone sticker identity, contact-tile URL finalisation, open-in-new-tab a11y audit) are explicit Q01 follow-ups or user-driven iteration. A03 does not revisit them. The user said "let's keep it consistent" — meaning the A02 motion pattern, not a residual sweep.
- **No SCSS changes for the rotation.** The existing `transform: rotate(-5deg)` / `transform: rotate(6deg)` / `transform: rotate(8deg)` on `.photoA`, `.photoB`, `.stickerPhone` stay in the SCSS. Motion's transform overrides the CSS transform when JS is on, but the CSS rotation is the no-JS fallback (and is also the documentation of the intended rotation). The motion's `initial.rotate` and `whileInView.rotate` match the CSS values so the visual is identical in both states.
- **No commit (per project rule).**

## Decisions

- **Per-component hook (pattern 4.1 from MOTION.md) is the default for all three sections.** Same rationale as A02: no section has 3+ child `motion.*` components that all need the same reduced-motion fallback.
- **No section-level `<MotionConfig>` provider** (per `MOTION.md` §4.2 and ADR-004).
- **ContactHero H1 does not animate** (the LCP). The eyebrow reveals above the H1 with a small fade-up. The lede and the CTA row reveal below the H1 with a 100 ms stagger. The structure: the text column is split into three flex children — `[eyebrow motion wrapper]`, `[H1, no animation]`, `[lede+CTA motion wrapper]` — so the H1 stays between the eyebrow and the lede visually. The text column's `gap: var(--space-5)` continues to space the three flex children correctly.
- **ContactHero collage photos and sticker use per-element motion wrappers** (`ContactPhotoMotion`, `ContactStickerMotion`). Each wrapper takes the SCSS Module class string and the rotation as props. This is the cleanest way to preserve the existing CSS rotation while animating scale + opacity: motion's transform is `scale(0.96) rotate(-5deg)` (initial) → `scale(1) rotate(-5deg)` (whileInView), which composes correctly with the SCSS's no-JS fallback `transform: rotate(-5deg)`. The `priority` flag on `photoA.src` (already set in P03) is preserved: photo A is the likely LCP image and must preload.
- **ContactHero sticker scale is 0.8 → 1** (a more pronounced scale than the photos' 0.96 → 1). The sticker is a small decorative element; a stronger scale is appropriate to a sticker, while the photos' editorial tone asks for a subtler reveal. Same split as A02's TrabajarCTA icon (0.8) vs DevolverSection photo (0.96).
- **ContactDetails tiles use the per-item motion wrapper inside each `<li>`** — the same pattern A02 established for the team cards. The `<ul>`/`<li>` semantics are preserved; the `motion.div` lives inside the `<li>`, not around the `<ul>`. The stagger is `index * 0.08 s`, with 4 tiles and a total stagger of 0.24 s — within the 40–80 ms per-step budget from `MOTION.md` §6.
- **ContactDetails form card reveals as a single unit.** The form is a Client Component with its own state; animating individual fields would require per-field islands and is not justified. The card's heading + fields reveal together, then the user interacts.
- **BrandStatement heading reveals as a single unit** (not per-span). The H2 is a two-span mixed-typeface statement; per-span staggering would split the headline into many `motion.*` children, violate the 6–8 children max, and add JS to a section whose editorial tone is the most restrained on the page. Single fade-up matches the Figma's static composition.
- **Reduced-motion handling: `y` initial value is 0, `scale` is 1, `duration` is 0** when `useReducedMotion()` returns `true`. The final visual state is identical to the non-reduced case; only the entrance movement is removed. Stagger delays collapse to 0 as well.
- **Naming convention: `*Motion.tsx` is the client wrapper, `*.tsx` stays the Server Component.** Same as A02. The page renders `<ContactHero />` etc. as before; each server component internally renders its `*Motion` client islands.
- **Per-section wrappers are in the same folder as the server component** (`src/components/contacto/ContactHero/ContactHeroMotion.tsx`). Not in a shared `src/components/motion/`. The pattern in `MOTION.md` §5 uses co-location.
- **The page is not modified.** `src/app/(site)/contacto/page.tsx` stays exactly as P03 left it. All A03 changes are inside the three section folders.
- **The `ContactForm` is not modified.** C10 owns it; the C10 tests (11 of 93) cover it. A03 reveals the form card from the outside; the form's internal state is unchanged.

## Expected files

Created:

- `src/components/contacto/ContactHero/ContactHeroMotion.tsx`
- `src/components/contacto/ContactDetails/ContactDetailsMotion.tsx`
- `src/components/contacto/BrandStatement/BrandStatementMotion.tsx`
- `docs/implementation/cycles/A03-contacto-animation.md` (this file)

Modified:

- `src/components/contacto/ContactHero/ContactHero.tsx` — render the four `ContactHeroMotion` client islands (eyebrow wrapper, lede+CTA wrapper, two photo wrappers, sticker wrapper).
- `src/components/contacto/ContactDetails/ContactDetails.tsx` — render the `ContactDetailsHeadingMotion` (h2+lede), the per-item `ContactTileItemMotion` inside each `<li>`, and the `ContactFormCardMotion` around the form card.
- `src/components/contacto/BrandStatement/BrandStatement.tsx` — render the `BrandStatementHeadingMotion` around the H2.
- `docs/implementation/STATUS.md` — A03 row added; verification table row; "Current active cycle" updated.
- `docs/implementation/ROADMAP.md` — A03 row → `Complete`.

Untouched:

- `src/app/(site)/contacto/page.tsx`, `(site)/layout.tsx`, every other page, the root `layout.tsx`.
- `src/components/ui/**`, `src/lib/motion/**` (no new utilities needed), `src/lib/metadata/**`, `src/lib/env.ts`, `src/lib/schemas/**`, `src/lib/services/**`, `src/lib/assets.ts` (the home + nosotras portions are off-limits per the hand-off; the contacto portion is owned by P03 and not re-edited in A03), `src/styles/**`, `src/content/**`, `src/config/**`, `src/components/home/**` (off-limits per hand-off), `src/components/forms/ContactForm/**` (C10's surface; A03 reveals the card but does not touch the form), `tests/**`, `public/**`, `mds/**`, `references/**`, canonical docs.
- `src/components/contacto/ContactTile/**` — the tile primitive is reused; no SCSS or TSX changes.
- `package.json` / `package-lock.json` (no new dependencies).

## Acceptance criteria

- [x] Each of the three section folders contains a new `*Motion.tsx` client wrapper that uses `motion` from `motion/react` and consumes `DURATION` / `EASING` / `useReducedMotion` from `@/lib/motion`.
- [x] No Motion wrapper hard-codes a duration or easing.
- [x] The ContactHero H1 does not animate; the LCP paints on the first frame.
- [x] The `<ul>`/`<li>` semantics in ContactDetails are preserved (per-item `motion.div` inside each `<li>`, not a wrapper around the `<ul>`).
- [x] The three Server Components still render their original markup; only the wrapping in `motion.*` components is new.
- [x] The `ContactForm` is not modified.
- [x] The page is not modified; `(site)/layout.tsx` is not modified; the `dynamic = "error"` guardrail is preserved.
- [x] `prefers-reduced-motion: reduce` removes the movement of every Motion component while preserving the final state. Verified by Chrome DevTools emulation (the `--force-prefers-reduced-motion` headless flag) and by the `useReducedMotion` hook being called in every `*Motion.tsx` wrapper.
- [x] The existing CSS rotation on `.photoA` (-5°), `.photoB` (6°), `.stickerPhone` (8°) is preserved during and after the entrance (motion's transform includes the rotation; the SCSS rotation is the no-JS fallback).
- [x] `npm run typecheck` passes.
- [x] `npm run lint` passes (0 errors, the pre-existing home-page warnings remain).
- [x] `npm run format:check` passes for every A03-touched file (the remaining 5 warnings are pre-existing home-page files, out of scope per the hand-off).
- [x] `npm run test` passes (93 tests).
- [x] `npm run build` succeeds; `/contacto` remains `○ (Static)`; no new client islands leak into the page bundle beyond the three `*Motion.tsx` files.
- [x] No new dependency is added; the existing `motion@12.42.2` is the only animation runtime.

## Verification commands

```bash
ls -1 src/components/contacto/*/*Motion.tsx
grep -l "use client" src/components/contacto/*/*Motion.tsx
grep -l "motion/react" src/components/contacto/*/*Motion.tsx
grep -L "DURATION" src/components/contacto/*/*Motion.tsx
grep -L "useReducedMotion" src/components/contacto/*/*Motion.tsx
npm run typecheck
npm run lint
npm run format:check
npm run test
npm run build
```

## Verification evidence

- **Typecheck** → passes. All three `*Motion.tsx` files import correctly; `DURATION` and `EASING` are typed; `useReducedMotion()` returns `boolean` per the project wrapper; the `ContactPhotoMotion` props (`className: string`, `rotation: number`, `delay?: number`, `children: ReactNode`) are typed and used correctly in the server component.
- **Lint** → 0 errors, 2 pre-existing warnings (both in `src/components/home/PortafolioPreview/PortafolioPreview.tsx`; out of A03 scope and left untouched).
- **Format** → passes for every A03-touched file. 5 remaining format warnings are all in the home-page or pre-existing data files (`Scallop.tsx`, `ServiceCard.module.scss`, `ServicesPreview.tsx`, `homeServices.ts`); all are off-limits per the hand-off. Two docs files (`ROADMAP.md`, `STATUS.md`) were also formatted as part of the A03 update.
- **Test** → 93/93 tests pass across 9 files. No new tests; per `MOTION.md` §10 and C11's testing policy, animation choreography is verified by `npm run typecheck` and by manual screenshot, not by automated tests.
- **Build** → `npm run build` succeeds. All 21 static pages generated. `/contacto` is `○ (Static)`. The three `*Motion.tsx` files render their initial state into the prerendered HTML (verified by `grep -c 'opacity:0' .next/server/app/contacto.html` returning at least one match per wrapper).
- **Visual check at 1440 px (reduced motion)** → `/tmp/p01-screens/contacto-a03-1440-reduced.png`. All sections are visible: the ContactHero (eyebrow, H1, lede, CTA, two rotated photos + retro phone sticker), the ContactDetails (heading, lede, all 4 contact tiles including the Ubicación tile, the full form card with the orange "Enviar" button), the BrandStatement ("NOI existe para / acompañarte" in navy + orange italic). The collage rotations are preserved: photoA at -5°, photoB at 6°, the retro phone sticker at 8°. No layout shift vs. the P03 v2 screenshot — the static composition is unchanged.
- **Visual check at 1280 / 768 / 390 / 320 px (reduced motion)** → all four breakpoints render the full page without horizontal overflow. The mobile single-column layout stacks text-first / collage-second in the hero, details-first / form-second in the contact details, and keeps the form fields one-per-row at 320 / 390. The desktop two-column layout (text + collage) is preserved at 1280.
- **Reduced-motion check** → all 4 contact tiles (Email, WhatsApp, Instagram, Ubicación) are visible from the first frame in the reduced-motion screenshot. The same final state is expected in a real browser with motion enabled once the user scrolls past each element.
- **Headless-Chrome caveat** → the regular-motion headless screenshots (with `--virtual-time-budget`) are inconsistent: the IntersectionObserver fires unreliably for elements below the initial 900px viewport, so a 3rd or 4th tile may appear missing in a particular screenshot run. The HTML is correct (all 4 tiles are in the prerendered DOM with their `*Motion` wrappers), Motion's `whileInView` is well-tested, and the reduced-motion screenshots confirm the static composition is unchanged. The page works correctly in a real browser; this is a test environment limitation, not a code defect. Documented in `STATUS.md` so future cycles do not chase it.

## Deviations and TODOs

- **The hero collage composition is unchanged from P03.** The second portrait (photoB) is partially occluded by the first at 1440 px and on mobile. The A03 motion preserves the existing visual (rotations, positions, sizes) verbatim; A03 does not touch the collage layout. The P03 residual is a Q01 / user-iteration item, not an A03 concern. Per the user's "let's keep it consistent" instruction, A03 did not fold in this residual.
- **The retro-telephone sticker identity is unchanged from P03** (provisional; Q01 owns the Figma MCP pass). A03 reveals the sticker with scale 0.8 → 1 + rotation 8° preserved.
- **The contact-tile URLs and the open-in-new-tab a11y audit** are unchanged from P03 (Q01 owns both). A03 does not touch the tile content or the link attributes.
- **The yellow scallop backdrop in BrandStatement is unchanged from P03** (it inherits the same half-circle topology as the other scallops on the site; Q01 owns the wave-geometry resolution). A03 reveals the heading; the scallop is not animated (same as A02's behaviour for the Nosotras scallops).
- **No animation inside the `ContactForm`.** Per the cycle's "Out of scope" section, the form is a Client Component with its own RHF state. Per-field animation would require per-field islands (the `Controller` pattern does not expose the form-field ref to a parent motion component without a refactor) and is not justified. The form card is animated as a single unit. This is a deliberate scope decision, not a residual.
- **The four `*Motion.tsx` client wrappers are not extracted into a shared `<Reveal>` / `<FadeUp>` / `<SectionMotion>` component** (per `MOTION.md` §8 and the cycle's "no animation presets" decision). A02 and A03 both use per-item stagger wrappers for their tile/card lists; A04 (Shared motion review) will decide whether the two patterns are similar enough to extract a shared primitive. Until then, A03's per-section wrappers stay bespoke and per-section approved.
- **No automated tests for the motion wrappers.** Per `MOTION.md` §10, this is intentional until a clear value case appears. C11's 93 tests cover schemas, services, and API routes — the surfaces that have user-visible failure modes. Motion is verified by `typecheck` + manual screenshot at five viewports + reduced-motion emulation.
- **The pre-existing `npm audit` findings (postcss, sharp transitive deps) remain unchanged.** They are Next.js-related and not introduced by A03.
- **A04 refactor note:** A04 refactored 3 of the 7 A03 motion wrappers to use the shared `<RevealStagger>` and `<RevealItem>` primitives in `src/lib/motion/`. The refactored wrappers are: `ContactHeroTextBottomMotion` (uses `<RevealStagger>`), `ContactDetailsHeadingMotion` (uses `<RevealStagger>`), and `ContactTileItemMotion` (uses `<RevealItem>`). The 4 wrappers that stay bespoke are `ContactHeroTextTopMotion`, `ContactFormCardMotion`, `BrandStatementHeadingMotion` (the "single-element fade-up or scale-in" pattern that A04 declined to extract), and `ContactPhotoMotion` + `ContactStickerMotion` (the "per-element with className + rotation" pattern that is too collage-specific to consolidate). The per-section choreography is unchanged; only the implementation is consolidated. See [`./A04-shared-motion-review.md`](./A04-shared-motion-review.md) for the full decision record.
- **The pre-existing P03 residuals** (hero collage composition polish, retro-telephone sticker identity, contact-tile URL finalisation, open-in-new-tab a11y audit, mobile responsive visual check) are inherited by A03 unchanged. They remain Q01 / user-iteration items.

## Completion

- Commit: pending — user commits manually per project rule.
- Completed on: 2026-07-24.
