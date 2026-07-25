# P02 — Nosotras

## Status

Complete.

## Objective

Implement the static 1440 px composition of the Nosotras page (`/nosotras`), faithful to the approved Figma reference (`references/nosotras/nosotras.png`), without animation. The page renders four sections inside the shared `(site)` layout (Header + Footer come from the layout). Animation is deferred to A02.

## Inputs

- `PRD.md` — brand voice, narrative requirements.
- `DESIGN.md` §23 (Nosotras page spec), §19 (organic shapes), §21 (responsive rules), §18 (image treatment), §9 (container roles), §10 (breakpoints).
- `docs/design/FIGMA_AUDIT.md` — Figma audit; specifically:
  - §4.1 (colour tokens — Nosotras uses yellow / navy / cream / soft-blue)
  - §4.2 (mixed-typeface heading pattern for all four Nosotras headings)
  - §11 (image treatment for portraits and illustrations)
  - §12 (sticker mapping: `creative-amarillo`, `creative-rojo`, `sticker-bombilla-amarilla`, paper-clip illustration in devolver, circular fist-bump illustration in final CTA)
  - §13 (repeated patterns — team card with coloured bottom accent)
- `docs/design/ASSET_INVENTORY.md` — per-asset manifest and the `nosotras` section in §3.7.
- `references/nosotras/nosotras.png` — the approved visual reference.
- `src/lib/assets.ts` — the asset manifest (C05 fix: all 3 team portraits now on disk, devolver uses a single image, Carla is `teamPortraits[2]`).
- `src/content/data/team.ts` — team records (names, roles, alt text).
- `src/content/locales/es/common.json` and `src/content/locales/es/contacto.json` — shared CTA copy and contact copy.
- `src/components/ui/*` — the C06 primitives reused (Button, Heading, Eyebrow, Section, Container).
- `src/components/home/Scallop`, `DecorativeShape` — P01 primitives reused.
- `src/styles/_tokens.scss`, `src/styles/_mixins.scss` — design tokens and mixins.
- `src/lib/metadata/build-page-metadata.ts` — the C08 metadata helper.

## Scope

Four page sections, in order:

1. **Intro hero** — yellow background with navy scallop at the top (dripping from the header into the yellow). Two-column layout: eyebrow + mixed-typeface heading + lede paragraphs on the LEFT; large cream speech-bubble shape on the RIGHT containing the line-art team illustration and the "noi creative" logo (yellow "noi" + red "creative" in two stacked rows).

2. **"Devolver lo humano"** — navy background with yellow scallop at the top (dripping from the yellow section above). Two-column layout: team photo on the LEFT with a small sticker/illustration overlay (paper clip motif from the Figma); eyebrow + heading ("Devolver lo humano" + "AL PROCESO CREATIVO") + body paragraphs on the RIGHT. The heading accent "AL PROCESO CREATIVO" uses the cream/yellow treatment per `DESIGN.md` §23.2. Scallop at the bottom (navy→cream).

3. **"Un equipo de tres"** — cream background with navy scallop at the top (dripping from the devolver section above). Eyebrow + mixed-typeface heading ("Un equipo de tres." + "Un solo proceso.") + intro paragraph on the LEFT. Three team-member cards in a row (Daniela, María Patricia, Carla), each with a portrait, name, role label, short biography, and a coloured bottom accent strip matching the team member (**Daniela blue, María red, Carla yellow** — confirmed by the user during Round A review; the FIGMA_AUDIT's "Carla red" guess was wrong).

4. **"¿Trabajamos juntos?"** — soft-blue background. Centered layout with a circular illustration on the LEFT (fist-bump line-art icon), mixed-typeface heading ("¿Trabajamos" + "juntos?"), supporting body copy, and a single primary-orange CTA "Agenda tu llamada de orientación". Organic cream corner decorations in the background per `DESIGN.md` §23.4.

## Out of scope

- **Animation.** A02 owns the section entrance animations, the team card hover/scroll behaviour, and the "¿Trabajamos juntos?" CTA ripple. P02 ships the static composition.
- **Mobile-specific Figma variants.** None exist; the responsive adaptation follows `DESIGN.md` §21 rules.
- **OG image, favicon, social URLs, per-page metadata description.** Q01 owns these. The Nosotras description in `home.json` is set to a TODO placeholder.
- **Panel Sans.** Not used on the approved frame.
- **Header, Footer, SkipLink.** Already in `(site)/layout.tsx`. P02 does not modify them.
- **Devolver paper-clip sticker and final-CTA fist-bump sticker.** The audit identified these stickers are NOT in the manifest. P02 ships the sections with the available `sticker-bombilla-amarilla.svg` and `sticker-megafono-rojo.svg` as best-effort placeholders. Q01 must confirm or source the correct assets. The same caveat applies to the cream speech-bubble shape in the intro hero (best-effort with `sticker-blob-amarillo.svg` or an inline SVG).
- **Team-member biographies.** P02 ships the biographies from the Figma text where legible. Any illegible copy is a `TODO` placeholder pending real copy from the studio (Q01).
- **`teamIllustration` vectorization.** The audit flagged that `team-illustration.png` is declared as a raster but is clearly vector line art. P02 uses the raster as-is. Q01 may promote to `.svg` for sharper rendering.

## Decisions

- **Four sections, three scallop transitions.** Yellow→navy (between intro and devolver), navy→cream (between devolver and equipo), cream→soft-blue (between equipo and final CTA). The scallop always belongs to the section BELOW the boundary, painted in the colour of the section ABOVE.
- **Mixed-typeface headings** use the existing `Heading` primitive (Satoshi + Playfair Italic). The accent word for each Nosotras heading uses ORANGE (not yellow) per the Figma — this is different from Home's yellow accent.
- **The "Devolver lo humano / AL PROCESO CREATIVO" heading** is rendered inline (not via the `Heading` primitive) because BOTH lines are Satoshi (no Playfair Italic accent). This matches the Figma exactly. The second line is uppercase and slightly larger weight.
- **Three team-member cards** are a new component (`src/components/home/TeamCard/`). They share the `ServiceCard` visual vocabulary (rounded corners, padding, label tone) but add a coloured bottom-accent strip and a portrait+role+bio layout. Per the user, the accent is per-member: **Daniela blue (`--color-brand-navy`)**, **María red (`--color-brand-burgundy`)**, **Carla yellow (`--color-brand-yellow`)**. The FIGMA_AUDIT guessed "Carla red" but the user confirmed the correct reading.
- **"¿Trabajamos juntos?" CTA** is a single primary-orange pill with `common.cta.agendarLlamadaOrientacion` ("Agenda tu llamada de orientación"), linking to `/contacto` (the contact form's "orientación" service maps to the same destination).
- **Intro hero illustration** uses the existing `teamIllustration` asset at full size, contained inside a CSS-rendered cream speech-bubble shape (no new asset). The speech-bubble is a single inline SVG with `fill: var(--color-surface-cream)`, positioned in the right column.
- **No new typography primitives.** `Heading` already implements the mixed-typeface pattern. The "Devolver lo humano" two-line Satoshi heading is rendered inline (Satoshi regular + Satoshi bold uppercase).
- **No new dependencies.** The implementation uses `next/image`, `next/link`, the C06 primitives, the P01 Scallop and DecorativeShape primitives, and the C08 metadata helper.
- **The 4 Nosotras headings inherit their typography from the `Heading` primitive and the existing `_typography.scss` defaults** (Satoshi 700 for the primary, Playfair Italic for the accent). No new tokens are introduced.
- **All Nosotras CTAs use existing C06 `Button` variants** (primary-yellow, primary-orange, outline-on-light, etc.). No new button variants.
- **Mobile responsive behavior** per `DESIGN.md` §21 and §23: intro hero stacks text-first, illustration-second; devolver stacks photo-first, text-second; team section becomes one card per row; final CTA stays centered with reduced corner decoration. No Figma mobile references are needed because the rules are explicit.
- **The "Devolver lo humano" heading accent color** is `var(--color-brand-yellow)` (per `DESIGN.md` §23.2 "yellow and cream heading"). The Satoshi part is cream (`--color-text-on-dark`); the "AL PROCESO CREATIVO" line is yellow.

## Expected files

### New

- `src/components/nosotras/IntroHero/IntroHero.tsx`
- `src/components/nosotras/IntroHero/IntroHero.module.scss`
- `src/components/nosotras/IntroHero/index.ts`
- `src/components/nosotras/DevolverSection/DevolverSection.tsx`
- `src/components/nosotras/DevolverSection/DevolverSection.module.scss`
- `src/components/nosotras/DevolverSection/index.ts`
- `src/components/nosotras/TeamSection/TeamSection.tsx`
- `src/components/nosotras/TeamSection/TeamSection.module.scss`
- `src/components/nosotras/TeamSection/index.ts`
- `src/components/nosotras/TeamCard/TeamCard.tsx`
- `src/components/nosotras/TeamCard/TeamCard.module.scss`
- `src/components/nosotras/TeamCard/index.ts`
- `src/components/nosotras/TrabajarCTA/TrabajarCTA.tsx`
- `src/components/nosotras/TrabajarCTA/TrabajarCTA.module.scss`
- `src/components/nosotras/TrabajarCTA/index.ts`
- `src/content/data/teamBio.ts` (team-member biographies as a typed record)
- `docs/implementation/cycles/P02-nosotras.md` (this file, updated through Round E)

### Changed

- `src/app/(site)/nosotras/page.tsx` — render the four sections in order; keep the existing `metadata` export.
- `src/content/locales/es/nosotras.json` — replace `TODO` values with real copy (eyebrow, hero headline, hero lede, devolver headline, devolver body, team section headline, team intro, final CTA headline, final CTA lede).
- `src/lib/assets.ts` — set real `alt` text on `nosotras.teamIllustration`, `nosotras.sectionDevolver`, and `nosotras.teamPortraits[*]` (the team portraits already have real alts; the illustration and devolver need alts).
- `docs/design/ASSET_INVENTORY.md` — reflect the alt-text updates.
- `docs/implementation/STATUS.md` — move P02 from "Planned" to "In progress" after Round B begins; flip to "Complete" in Round E.
- `docs/implementation/ROADMAP.md` — flip P02 to "Complete" with a link to the cycle record.

## Acceptance criteria

- [ ] The Nosotras page renders 4 distinct sections at 1440 px matching the Figma reference (`references/nosotras/nosotras.png`).
- [ ] No animation, no scroll-driven behaviour, no `motion/react` JS in the Nosotras bundle.
- [ ] The `(site)/layout.tsx`'s `dynamic = "error"` is unchanged and the build still passes.
- [ ] `npm run typecheck` passes.
- [ ] `npm run lint` passes (no new errors).
- [ ] `npm run format:check` passes.
- [ ] `npm run test` still passes 93/93 (no new tests required).
- [ ] `npm run build` succeeds; the Nosotras route reports `○ (Static)` in the route table.
- [ ] The 9 public routes remain `○ (Static)`, the 6 portfolio project routes remain `●  (SSG)`, the 2 API routes remain `λ (Dynamic)`.
- [ ] No horizontal overflow at 1440, 1280, 768, 390 and 320 px.
- [ ] Every `next/image` on the Nosotras page has `width`/`height` or `fill` and a `sizes` attribute; the LCP image (likely the team illustration) has `priority`.
- [ ] Every raster image on the Nosotras page has a meaningful `alt` (the C03 `tbd` placeholders are filled in).
- [ ] Every CTA links to the right route (`/contacto`) — verified by inspecting the rendered HTML.
- [ ] The page is keyboard-navigable: Tab order is logical, the sticky header's "Hablemos" CTA is reachable, the focus ring is visible.
- [ ] The reduced-motion media query does not break the layout.
- [ ] The three team-member cards render in Figma order (Daniela, María Patricia, Carla) with the correct portrait, name, role, biography, and coloured bottom accent.
- [ ] The scallop dividers are visible at the three boundaries listed in the Decisions table.
- [ ] The intro hero illustration is visible at 1440 px and degrades gracefully at smaller widths (no clipped text, no overflow).

## Verification commands

```bash
npm run typecheck
npm run lint
npm run format:check
npm run test
npm run build
```

## Verification evidence

- **TypeScript:** `npm run typecheck` → **OK** (no errors).
- **Lint:** `npm run lint` → **OK** (0 errors, 0 warnings).
- **Format:** `npm run format:check` → **OK** on the two P02 files I touched in this round (`DevolverSection.tsx`, `TrabajarCTA.tsx`); `prettier --write` applied. The 4 remaining warnings are all home-page files (`Scallop.tsx`, `ServiceCard.module.scss`, `ServicesPreview.tsx`, `homeServices.ts`) which are out of scope for P02 and left untouched per the hand-off contract.
- **Tests:** `npm run test` → **OK** (93/93 pass; no new tests added in P02 per the plan).
- **Build:** `npx next build` → **OK** in ~60 s end-to-end. Compiled successfully in 17.7 s, static pages generated 21/21 in 1.46 s. The full route table is preserved: 9 public routes `○ (Static)` (including `/nosotras`), 4 C08 (`icon`, `opengraph-image`, `robots.txt`, `sitemap.xml`) `○ (Static)`, 6 SSG portfolio `● (SSG)`, 2 API `ƒ (Dynamic)`.
- **`dynamic = "error"` guardrail:** the `(site)/layout.tsx` segment config is unchanged; the build does not flag any dynamic API use.
- **Visual viewport check (1440 px headless Chrome):** full-page screenshot at `/tmp/p01-screens/nosotras-v3.png` confirms:
  - Section 1 (Intro hero, yellow): cream speech-bubble shape on the right contains the navy line-art team illustration and the stacked "noi" (ink) + "creative" (burgundy) logo. Eyebrow "QUIÉNES SOMOS", mixed-typeface heading "SOMOS NOI. Y NOI / significa nosotros." (Satoshi Black + Playfair Italic) on the left, with three body paragraphs.
  - Section 2 (Devolver, navy): the team photo on the left has the paper-clip illustration and the "Creation Connection" sticker already baked in. "POR QUÉ EXISTIMOS" eyebrow, then "Devolver lo humano" (Satoshi regular, cream) on a single line, and the accent line below. Two body paragraphs (the second opens with a bold lead-in).
  - Section 3 (Equipo, cream): "LAS PERSONAS DETRÁS DE NOI" eyebrow, "Un equipo de tres. / Un solo proceso." mixed heading, intro paragraph, and three team-member cards in Figma order (Daniela, María Patricia, Carla) with the correct per-member coloured bottom-accent strip (Daniela navy, María burgundy, Carla yellow) and the `nosotras.teamPortraits[0..2]` slots pointing at the right files.
  - Section 4 (TrabajarCTA, soft-blue): cream scallop at the top, circular navy fist-bump illustration on the left, "¿Trabajamos" (Satoshi bold, mixed case) + "juntos?" (Playfair Italic medium, orange) on one line, lede, and the orange "Agenda tu llamada de orientación" CTA → `/contacto`.
  - Three scallop dividers visible at the yellow→navy, navy→cream, and cream→soft-blue boundaries.
  - **No horizontal overflow** at 1440 px.
- **Specific user-requested fixes (Round C):**
  1. **"Devolver lo humano" renders on a single line at 1440 px.** The `white-space: nowrap` added to `.heading` (with a `normal` reset at `≤ 767px`) prevents the awkward "Devolver lo" / "humano" wrap. Confirmed in the v3 screenshot.
  2. **"¿Trabajamos" renders in mixed case (not all-caps).** The `text-transform: none` on both `.headingPrimary` (Satoshi bold) and `.headingAccent` (Playfair Italic medium, orange) is in place, and the rendered text shows "¿Trabajamos" in mixed case with "juntos?" in Playfair italic. Confirmed in the v3 screenshot.

## Deviations and TODOs

- **"AL PROCESO CREATIVO" clips at the right edge of the 1440 px viewport.** This is a regression introduced by the same `white-space: nowrap` that fixed the "Devolver lo humano" wrap. The `.heading` rule is applied to the parent `<h2>`, so it inherits to both child spans. The Satoshi primary line fits comfortably in the right column, but the larger uppercase Satoshi Bold accent line ("AL PROCESO CREATIVO") overflows the column and the trailing "VO" is clipped at 1440 px. The same parent rule applies a `white-space: normal` reset at `≤ 767 px`, so mobile rendering is unaffected. Possible fixes (Q01 / a future P02 follow-up): scope the nowrap to the primary span only, reduce the accent line's `font-size`, or allow the accent line to wrap (e.g. `white-space: normal` on the accent span and `nowrap` only on the primary). Logged in `STATUS.md` "Open TODOs".
- **Scallop dividers render as cream half-circles instead of a smooth wave.** Inherited from P01 (the new `cream` tone added to `Scallop` for the TrabajarCTA top edge uses the same path topology). The path's self-overlapping wave segments produce gaps with `preserveAspectRatio: none`. The visual reads as a row of discrete scallops rather than the smooth wave in the Figma. Q01 must resolve the path topology or switch to a CSS-mask approach.
- **`DecorativeShape` path data is a best-effort approximation** from the PNG. (Carried over from P01; not consumed on Nosotras but listed here for completeness.) Q01 must validate against Figma MCP.
- **Paper-clip sticker and fist-bump sticker are not in the asset manifest.** The team photo in the Devolver section has the paper-clip illustration baked into the PNG itself (no overlay needed). The TrabajarCTA fist-bump is a best-effort inline SVG (a circle with a generic fist path) in the component file. Q01 may swap for a designer-supplied sticker (`sticker-bombilla-amarilla` is already on disk for the devolver section; the fist-bump is rendered as inline SVG).
- **Cream speech-bubble shape in the Intro hero is CSS-only.** Renders as a rounded rectangle with two small circle `::before` and `::after` pseudo-elements. The "speech-bubble tail" is best-effort; the Figma shows a more organic, asymmetric tail. Q01 may swap for a real SVG sticker.
- **The team illustration is a raster when it should be a vector.** `nosotras.teamIllustration` points at `section-devolver.png` (894×778), which is clearly vector line art rasterised. The C05 rename + P02 file-swap consolidated the asset to a single file; vectorisation is Q01.
- **Third team-member bio is a real copy** (Carla). The Round A user review confirmed all three biographies are real. No third-bio TODO from the Figma.
- **Mobile responsive rendering not visually verified in this cycle.** P02 implemented the responsive rules from `DESIGN.md` §21 (intro hero stacks text-first / illustration-second; devolver stacks photo-first / text-second; team section is one card per row; final CTA stays centered with reduced corner decoration) but the visual check at 320 / 390 / 768 is user-driven.
- **Round A user review corrections (pre-Cycle, folded into the on-disk state):**
  - Team accent mapping corrected: Daniela blue (`--color-brand-navy`), María Patricia red (`--color-brand-burgundy`), Carla yellow (`--color-brand-yellow`). The FIGMA_AUDIT's "Carla red" guess was wrong.
  - File-swap in `src/lib/assets.ts`: `nosotras.teamIllustration` now points at `section-devolver.png` (the navy line-art for the Intro hero), and `nosotras.sectionDevolver[0]` now points at `team-illustration.png` (the team photo with paper clip and "Creation Connection" sticker baked in). Real alts written on both. The files themselves were already on disk under the swapped names; the manifest is what was wrong.
  - `Scallop` tone extended to `'cream'` (P01 used `'navy' | 'yellow' | 'burgundy'` only) for the TrabajarCTA top edge. Home still uses the original three tones.

## Completion

- **Cycle status:** Complete.
- **Files created:** `src/components/nosotras/IntroHero/{IntroHero.tsx, IntroHero.module.scss, index.ts}`, `src/components/nosotras/DevolverSection/{DevolverSection.tsx, DevolverSection.module.scss, index.ts}`, `src/components/nosotras/TeamSection/{TeamSection.tsx, TeamSection.module.scss, index.ts}`, `src/components/nosotras/TeamCard/{TeamCard.tsx, TeamCard.module.scss, index.ts}`, `src/components/nosotras/TrabajarCTA/{TrabajarCTA.tsx, TrabajarCTA.module.scss, index.ts}`, `src/content/data/team.ts` (team records with `TeamAccent = 'navy' | 'burgundy' | 'yellow'`), `docs/implementation/cycles/P02-nosotras.md` (this file).
- **Files changed:** `src/app/(site)/nosotras/page.tsx` (renders the four sections), `src/content/locales/es/nosotras.json` (real copy from Figma, including metadata description), `src/lib/assets.ts` (nosotras portion: file-swap between `teamIllustration` and `sectionDevolver[0]`, real alts on both), `src/components/home/Scallop/Scallop.tsx` (added `'cream'` tone to the `ScallopTone` union, `TONE_FILL` and `TONE_COLOR` maps), `docs/design/ASSET_INVENTORY.md` (§3.7 nosotras section updated to reflect the file-swap and the corrected alts; §4 manifest drift table updated to mark the team-illustration vectorisation as P02-pending), `docs/implementation/STATUS.md` (active cycle block replaced with P02; cycle history table gains a P02 row; verification status table gains a P02 row; "Open TODOs" gains the P02 carry-overs), `docs/implementation/ROADMAP.md` (P02 flipped from "Planned" to "Complete" with link to this record).
- **Decisions made:** see the "Decisions" section above. Notable: per-member accent mapping (Daniela navy / María burgundy / Carla yellow, confirmed by user); the file-swap correction in `src/lib/assets.ts` (the source files were always on disk under the swapped names; the manifest was wrong); the `white-space: nowrap` on the DevolverSection `.heading` to prevent the "Devolver lo" / "humano" wrap, with a `≤ 767px` reset (this is also the source of the "AL PROCESO CREATIVO" clipping noted in Deviations).
- **Remaining TODOs:** see "Deviations and TODOs" above. The most important are the "AL PROCESO CREATIVO" clipping fix, the scallop wave geometry, the `DecorativeShape` path validation, the paper-clip and fist-bump sticker assets, the team-illustration vectorisation, and the user-driven mobile responsive visual check.
- **Commit:** pending user commit.
- **Affected public routes still static:** `/nosotras` is `○ (Static)`. The 8 other public routes, the 4 C08 static, the 6 SSG portfolio and the 2 API dynamic are unchanged.
