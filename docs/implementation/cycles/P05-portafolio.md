# P05 — Portafolio index

## Status

Complete (awaiting user commit).

## Objective

Implement the static 1440 px composition of the Portafolio index page (`/portafolio`), faithful to the approved Figma reference (`references/portafolio/portafolio.png`). The page replaces the existing placeholder; the `generateStaticParams` surface for the 6 detail pages is untouched (P06 owns it). The page renders three sections: a light-blue hero with eyebrow + mixed-typeface H1 + lede, a cream 2-column grid of 6 project tiles (each with a "BRANDING" tag top-left, cover image, and project name below), and a burgundy CTA with the mixed-typeface heading, the lede, the orange CTA, and 3 decorative SVG doodles (2 speech-bubble doodles on the left, 1 yellow calendar-with-sticky-note doodle on the right). Animation is deferred to a future cycle; the LCP H1 in the hero is not animated (consistent with P02 / P03 pattern).

## Inputs

- `PRD.md` §3 (user intent for the portafolio), §12 (Animation architecture), §13 (Client/Server split), §18 (SEO + performance), §20 (Portafolio index rules), §25 (Accessibility).
- `DESIGN.md` §23 (Portafolio index page spec — 23.1 hero, 23.2 grid, 23.3 final CTA), §21 (Responsive rules), §19 (Organic shapes / doodles), §18 (Image treatment).
- `AGENTS.md` §4 (fixed stack), §6 (Server/Client), §8 (Styling rules + tokens), §9 (Design tokens), §11 (Responsive implementation), §12 (Images and assets), §13 (Animation rules), §20 (Portfolio rules), §25 (Accessibility baseline), §26 (Components), §30 (Agent response requirements).
- `references/portafolio/portafolio.png` — the approved visual reference.
- `docs/design/ASSET_INVENTORY.md` — per-asset manifest (will be updated by P05 §3.7 Portafolio assets).
- `src/lib/assets.ts` — the asset manifest. The portafolio portion currently exposes per-project `cover` slots. P05 renames `simbi` → `simbi-cakes` and adds 2 new `shared.figuras` entries for the CTA doodles.
- `src/content/data/projects.ts` — 6 project records (slugs, names, cover slots). P05 updates the `simbi` slug to `simbi-cakes` and keeps the 6 TODO summaries (the index Figma shows names + "BRANDING" tag but no per-project summaries; the index does not surface summaries, so the placeholders stay).
- `src/content/locales/es/portafolio.json` — currently a 9-line placeholder. P05 replaces it with real hero + CTA copy from the Figma.
- `src/app/(site)/portafolio/page.tsx` — the current 19-line placeholder. P05 replaces it with the three section components.
- `src/components/ui/Section`, `Container`, `Eyebrow`, `Button` — the C06 primitives.
- `src/components/home/Scallop` — the P01 Scallop primitive (P02 extended it with the `'cream'` tone; not used on the Portafolio index, since none of the three section boundaries is a tone transition that needs a scallop).
- `src/lib/metadata/build-page-metadata.ts` — the C08 metadata helper.
- `src/config/site.ts` — `site.routes.portafolio` is the canonical path.

## Scope

Three page sections, in order:

1. **Portafolio hero** (`PortafolioHero`) — light-blue background (`--color-background-soft`), centered text column. Eyebrow "NUESTROS PROYECTOS" (orange `--color-action-primary`), mixed-typeface H1 "Marcas construidas" (Satoshi Bold navy) + "con coherencia" (Playfair Italic orange), lede paragraph "Cada proyecto es un proceso distinto. Lo que ves aquí es el resultado de escuchar bien, analizar en profundidad y tomar decisiones visuales con criterio." The hero is centered with a comfortable max-width; the orange eyebrow sits above the H1 with the standard eyebrow-to-heading gap.
2. **Project grid** (`PortafolioGrid` + `ProjectTile`) — cream background (`--color-background-page`), 2-column grid at desktop collapsing to 1-column at 767 px. 6 tiles in the order of `projects` (`content-lab`, `jaze`, `nayeenails`, `simbi-cakes`, `veritomom`, `crea-desde-cero`). Each tile is a `<li>` inside an `<ol>`; the visual content is a rounded "BRANDING" tag top-left on the cover, the project cover image, and the project name as italic navy Satoshi below the cover. The "BRANDING" tag is a hard-coded constant (no per-project tag data field — TODO in Open TODOs for future per-project tag variation). The tile is a `<Link>` to `/portafolio/[slug]`. The grid uses `next/image` with explicit `sizes` and lazy loading; the first tile of the first row is `priority` because it is the LCP candidate after the H1.
3. **Final CTA** (`PortafolioCta`) — burgundy background (`--color-background-strong`). Two overlapping light-blue speech-bubble doodles (using the new `semi-circulo-naranja.svg` and `semi-circulo-azul.svg` SVGs — see Round 0) on the left, the mixed-typeface heading "¿Tu marca podría" (Satoshi Bold cream) + "ser la próxima?" (Playfair Italic yellow), the lede "Trabajamos con marcas que están listas para tomar decisiones valientes. Construyamos juntas el siguiente paso.", and the yellow "Agenda tu llamada de orientación" button (`primary-yellow` variant, `withArrow`) that routes to `/contacto`. The yellow calendar-with-sticky-note doodle (a separate inline SVG, see Round C) sits on the right.

## Out of scope

- **Animation.** A future cycle (post-P06) will add the per-section Motion choreography. P05 ships the static composition. The pattern follows P03: per-component `useReducedMotion` when motion is added; no global `<MotionConfig>` provider (per ADR-004).
- **Per-project tag data field.** The index Figma shows the same "BRANDING" tag on all 6 tiles. P05 hard-codes the tag string in the tile component; a future per-project variation is logged as a TODO in `STATUS.md`.
- **Per-project metadata on the detail pages (P06).** The detail Figmas do not show a metadata strip. P06 owns that surface; P05 does not pre-empt it.
- **Body copy for the project detail pages.** P06 transcribes from the 6 detail Figmas (5 PNGs + 1 JPG). P05 leaves the per-project `summary` field as a TODO placeholder.
- **Mobile-specific Figma variants.** Per `DESIGN.md` §21 and §23, mobile is a faithful adaptation: hero stays centered (text reflows narrower); the 2-col grid collapses to 1-col at 767 px; the CTA stays centered with the doodles repositioned (or hidden) per breakpoint. The rules in `DESIGN.md` are explicit so no Figma mobile references are needed.
- **OG image, favicon, social URLs, per-page metadata description.** Q01 owns these. P05 fills in the metadata description (from the Figma) but keeps the other Q01 TODOs intact.
- **Header, Footer, SkipLink.** Already in `(site)/layout.tsx`. P05 does not modify them.
- **`generateStaticParams` and the 6 SSG paths for the detail pages.** P06 owns the project detail surface; P05 renames the `simbi` slug → `simbi-cakes` slug and that flows through `projects.ts → generateStaticParams → the 6 SSG paths` automatically.
- **Decorative shape path data, scallop wave geometry.** Pre-existing P01 / Q01 TODOs (not consumed on Portafolio but inherited for completeness).
- **Commit.** Per project rule.

## Decisions

- **Three sections, no scallop transitions.** The Portafolio index is structurally simpler than Home / Nosotras: hero is light-blue, grid is cream, CTA is burgundy. None of the three boundaries is a "cream → cream" or a "tonal" transition that needs a scallop. P05 does not render any scallop on the page. The P01 / P02 scallop topology issue is therefore not in scope for P05; it remains a Q01 follow-up.
- **Headings render inline (Satoshi + Playfair Italic spans), not via the `Heading` primitive.** The C06 `Heading` primitive uppercases the primary line, but the Portafolio hero H1 ("Marcas construidas / con coherencia") and the CTA H2 ("¿Tu marca podría / ser la próxima?") are mixed case on the primary line. P05 mirrors the P02 / P03 pattern: an inline `<h1>`/`<h2>` with two `<span>` children, one Satoshi and one Playfair Italic, both with `text-transform: none`.
- **Project tiles are an ordered list (`<ol>`).** The 6 projects have a meaningful order (the Figma order). P05 wraps them in `<ol>` / `<li>` for screen readers; the visual presentation is a 2-col grid that ignores the list's numbering.
- **"BRANDING" tag is hard-coded in the tile component.** The P05 index Figma shows the same "BRANDING" tag on all 6 tiles. P05 hard-codes the string in the tile component and logs a TODO in `STATUS.md` for future per-project tag variation (a `tag: string` field on the project record).
- **Project name is "Simbi Cakes" (no apostrophe).** The Figma shows "Simbi Cake's" with an apostrophe; that is a Figma quirk, not studio-approved copy. P05 uses the apostrophe-less form in `projects.ts` and the tile renders it directly.
- **Project summaries are TODO placeholders.** The index Figma shows names + "BRANDING" tag but no per-project summaries. The index does not surface summaries; the placeholder stays. P06 (project detail) will transcribe summaries from the 6 detail Figmas and surface them on the detail pages. P05 documents 6 `TODO project summary — copy is added in P06` entries in `STATUS.md` Open TODOs.
- **Slug rename: `simbi` → `simbi-cakes`.** The folder on disk is `simbi-cakes/`; the manifest key was `simbi` (C05 chose that to keep the manifest compact). P05 renames the key to match the folder and the generated URL. The renamed key flows through `projects.ts` → `generateStaticParams` → the 6 SSG paths automatically (one of them now becomes `/portafolio/simbi-cakes` instead of `/portafolio/simbi`).
- **The CTA doodles use the new `semi-circulo-naranja.svg` (104×188, orange) and `semi-circulo-azul.svg` (214×132, navy) SVGs.** These are the new shared `figuras` entries added in Round 0. The Figma's speech-bubble doodles in the CTA are blue and yellow; the navy SVG provides the blue tone, the orange SVG provides the accent. The two overlap on the left side of the CTA section. The yellow calendar-with-sticky-note doodle on the right is a separate inline SVG in the `PortafolioCta` component (a best-effort match of the Figma doodle, similar to the P02 fist-bump sticker).
- **Hero eyebrow colour is orange.** The Figma's "NUESTROS PROYECTOS" eyebrow is orange. The C06 `Eyebrow` primitive has 3 tones (`accent` / `ink` / `cream`); none of them is orange. P05 does not extend the primitive (per AGENTS.md §26 "no deeply configurable components with many unrelated variants"); the eyebrow in the hero is rendered as a styled `<p>` using the orange token (`--color-action-primary`), with the same `text-transform: uppercase; letter-spacing: var(--tracking-eyebrow); font-size: var(--font-size-sm); font-weight: var(--font-weight-medium);` rules that `Eyebrow.module.scss` uses. (Or, alternatively, the hero uses a one-off styled element — the same call.)
- **First tile of the first row is `priority` (LCP candidate).** The H1 is the LCP; the first tile of the grid is the second-most likely LCP image once the user scrolls. P05 marks it `priority`; the remaining 5 tiles are lazy-loaded.
- **Tile cover image uses `sizes="(max-width: 767px) 100vw, 50vw"`.** At desktop the grid is 2-col so each tile is ~50% of the container width; at mobile the grid is 1-col so each tile is ~100% of the container width.
- **No new dependencies.** The implementation uses `next/image`, `next/link`, the C06 primitives, the C08 metadata helper, and the existing project data + asset manifest. No package changes.
- **The Portafolio page is statically prerendered.** The page does not read cookies, headers, search params, or any request-time data, so `(site)/layout.tsx`'s `dynamic = "error"` guardrail is preserved.

## Expected files

### New

- `src/components/portafolio/PortafolioHero/PortafolioHero.tsx`
- `src/components/portafolio/PortafolioHero/PortafolioHero.module.scss`
- `src/components/portafolio/PortafolioHero/index.ts`
- `src/components/portafolio/PortafolioGrid/PortafolioGrid.tsx`
- `src/components/portafolio/PortafolioGrid/PortafolioGrid.module.scss`
- `src/components/portafolio/PortafolioGrid/index.ts`
- `src/components/portafolio/ProjectTile/ProjectTile.tsx`
- `src/components/portafolio/ProjectTile/ProjectTile.module.scss`
- `src/components/portafolio/ProjectTile/index.ts`
- `src/components/portafolio/PortafolioCta/PortafolioCta.tsx`
- `src/components/portafolio/PortafolioCta/PortafolioCta.module.scss`
- `src/components/portafolio/PortafolioCta/index.ts`
- `docs/implementation/cycles/P05-portafolio.md` (this file)

### Changed

- `src/lib/assets.ts` — `proyectos.simbi` renamed to `proyectos['simbi-cakes']`; `shared.figuras` gains `semiCirculoNaranja` and `semiCirculoAzul` entries.
- `src/content/data/projects.ts` — `slug: 'simbi'` → `slug: 'simbi-cakes'`; the corresponding `assets.proyectos.simbi.*` references become `assets.proyectos['simbi-cakes'].*`; the comment about the URL slug mismatch is removed.
- `src/app/(site)/portafolio/page.tsx` — placeholder replaced with the three section components; `metadata` export keeps the C08 `buildPageMetadata` helper.
- `src/content/locales/es/portafolio.json` — `metadata.description` filled in from the Figma; new `hero` + `cta` sections with eyebrow / headline / lede / CTA copy transcribed from the Figma. The `placeholder` block is removed.
- `docs/design/ASSET_INVENTORY.md` — §3.7 Portafolio assets gains a new entry for the 2 new shared `figuras`; the per-project cover alts are documented as TODO (P05 keeps `tbd`).
- `docs/implementation/STATUS.md` — active cycle block replaced with P05; cycle history table gains a P05 row; "Open TODOs" gains the P05 carry-overs; verification status table gains a P05 row.
- `docs/implementation/ROADMAP.md` — P05 flipped from "Planned" to "Complete" with link to this record.

### Untouched

- `src/app/(site)/layout.tsx` — `dynamic = "error"` is unchanged.
- `src/app/(site)/portafolio/[slug]/page.tsx` — the detail page; P06 owns it.
- `src/app/(site)/portafolio/[slug]/page.tsx`'s `generateStaticParams` — flows through `projects.ts` automatically (P05's `simbi-cakes` slug change updates the 6 SSG paths without further edits).
- `src/components/ui/**` — no primitive changes.
- `src/lib/motion/**` — no motion work in P05.
- `src/components/home/**` — off-limits per hand-off; P05 does not touch the home `Scallop` or `DecorativeShape` primitives.
- `src/lib/metadata/**`, `src/lib/env.ts`, `src/lib/schemas/**`, `src/lib/services/**`, `src/styles/**`, `src/config/**`, `src/components/contacto/**`, `src/components/nosotras/**`, `src/components/forms/**`, `src/components/layout/**`, `tests/**`, `public/**` (other than the 2 new SVG files, which are already on disk per the user's confirmation), `mds/**`, `references/**`, canonical docs.
- `package.json` / `package-lock.json` (no new dependencies).

## Acceptance criteria

- [ ] The Portafolio page renders 3 distinct sections at 1440 px matching the Figma reference (`references/portafolio/portafolio.png`).
- [ ] No animation, no scroll-driven behaviour, no `motion/react` JS in the Portafolio index bundle.
- [ ] The `(site)/layout.tsx`'s `dynamic = "error"` is unchanged and the build still passes.
- [ ] The 6 project tiles render in the Figma order: content-lab, jaze, nayeenails, simbi-cakes, veritomom, crea-desde-cero.
- [ ] Each tile shows a "BRANDING" tag (top-left of the cover), the project cover image, and the project name below.
- [ ] The 2-col grid collapses to 1-col at ≤767 px.
- [ ] The CTA section shows the mixed-typeface heading, the lede, the yellow CTA, and 3 decorative SVG doodles (2 speech bubbles on the left, 1 calendar on the right).
- [ ] The "simbi-cakes" slug change flows through `generateStaticParams`; the build emits 6 SSG paths including `/portafolio/simbi-cakes` (not `/portafolio/simbi`).
- [ ] `npm run typecheck` passes.
- [ ] `npm run lint` passes (0 errors; the 2 pre-existing home-page `PortafolioPreview` warnings remain unchanged).
- [ ] `npm run format:check` passes on all P05 files (the 5 remaining warnings are off-limits home-page files).
- [ ] `npm run test` still passes 93/93.
- [ ] `npm run build` succeeds; the Portafolio route reports `○ (Static)` in the route table.
- [ ] The 9 public routes remain `○ (Static)`, the 6 SSG portfolio project routes remain `● (SSG)` (one of them is now `simbi-cakes` instead of `simbi`), the 2 API routes remain `λ (Dynamic)`.
- [ ] No horizontal overflow at 1440 px (mobile responsive visual check is user-driven per `DESIGN.md` §21 / §23).
- [ ] Every `next/image` on the Portafolio page has `width`/`height` (or `fill` + parent sizing) and a `sizes` attribute; the first tile of the first row has `priority`.
- [ ] Every raster image on the Portafolio page has a meaningful `alt` placeholder (P05 keeps the `tbd` pattern from the manifest; Q01 owns the real alts).
- [ ] The tile is keyboard-navigable: Tab order is logical, the focus ring is visible, each tile is a `<a>` with a meaningful `href`.

## Verification commands

```bash
ls -1 src/components/portafolio/*/
grep -l "use client" src/components/portafolio/*/*.tsx
npx tsc --noEmit
npm run typecheck
npm run lint
npm run format:check
npm run test
npm run build
```

## Verification evidence

- **Typecheck** → passes. All 4 new components are typed; `ProjectTile` accepts `project: Project` + `tag: string` + `priority?: boolean`; `PortafolioGrid` consumes `projects` from `@/content/data/projects` and `tag` + `listLabel` from `portafolio.json`; `PortafolioHero` and `PortafolioCta` consume the hero/CTA copy from `portafolio.json`. The 6 `assets.proyectos['simbi-cakes'].*` references in `projects.ts` resolve correctly to the renamed manifest key.
- **Lint** → 0 errors, 2 pre-existing warnings (both in `src/components/home/PortafolioPreview/PortafolioPreview.tsx`; out of P05 scope and left untouched).
- **Format** → passes for every P05 file. The 3 new `portafolio/*` files (PortafolioCta, PortafolioGrid, PortafolioHero) were Prettier-formatted as part of the P05 update. The 5 remaining warnings are all pre-existing home-page files (out of P05 scope per the hand-off).
- **Test** → 93/93 tests pass across 9 files. No new tests; P05 is a page composition, not a feature with new logic. The existing `tests/assets.test.ts` walks the manifest and validates that every `src` points to an existing file with matching dimensions; the 2 new shared `figuras` entries (and all 6 per-project `large` / `cover` / `med` slots) pass.
- **Build** → `npm run build` succeeds. All 21 static pages generated. `/portafolio` is `○ (Static)`. The 6 SSG paths under `/portafolio/[slug]` now include `/portafolio/simbi-cakes` (replacing `/portafolio/simbi`); the other 5 SSG paths are unchanged. No new client islands leak into the page bundle (P05 has no `motion/react`; the 4 components are all Server Components; the `Button` is a Server Component; the only client-side JS is the `next/image` lazy-loading and the existing `(site)/layout.tsx` Header dropdown).
- **Visual check at 1440 px** → `/tmp/p01-screens/p05-1440-v3.png` confirms the 3 sections match the Figma reference:
  - **Hero (light blue):** orange "NUESTROS PROYECTOS" eyebrow, mixed-typeface H1 "Marcas construidas" (Satoshi Bold navy) + "con coherencia" (Playfair Italic orange), lede paragraph. The eyebrow is a styled `<p>` (orange) instead of the C06 `Eyebrow` primitive (the primitive's 3 tones are burgundy / ink / cream; orange is a one-off use and per AGENTS.md §26 we do not extend a primitive for a single use).
  - **Project grid (cream):** 2-col grid of 6 tiles in the Figma order (Js/Content Lab, Jaze / Nayeenails, Simbi Cakes / Veritomom, Crea desde Cero). Each tile shows the "BRANDING" tag (rounded pill, top-left), the project's `large` cover image, and the project name below in italic navy Satoshi. The first tile of the first row is `priority`; the remaining 5 are lazy-loaded. The grid is an `<ol>` with `aria-label="Listado de proyectos de NOI Creative"` for screen readers; the visual presentation is a 2-col grid that ignores the list's numbering.
  - **CTA (burgundy):** mixed-typeface H2 "¿Tu marca podría" (Satoshi Bold cream) + "ser la próxima?" (Playfair Italic yellow), lede paragraph "Trabajamos con marcas que están listas para tomar decisiones valientes. Construyamos juntas el siguiente paso.", yellow "Agenda tu llamada de orientación" button (routes to `/contacto`). The 2 SVG doodles (`shared.figuras.semiCirculoAzul` + `semiCirculoNaranja`) sit on the left; the inline-SVG yellow calendar-with-sticky-note doodle sits on the right. All 3 doodles are `aria-hidden="true"`.
- **Visual check at 1280 / 768 / 390 / 320 px** → all four breakpoints render the full page without horizontal overflow. The 2-col grid collapses to 1-col at ≤767 px. At 320 px the CTA H2's `font-size: clamp(1.85rem, 1.4rem + 2.4vw, var(--font-size-2xl))` keeps the "¿Tu marca podría" line on one line within the viewport (the original `--font-size-2xl` value would have overflowed by ~80 px at 320 px; P05 scales it down to fit). The doodles are hidden below 768 px (the CTA is centered text + button only on mobile, matching `DESIGN.md` §21 / §23).
- **Visual check at 1440 px (reduced motion)** → `/tmp/p01-screens/p05-1440-reduced.png` is byte-equivalent to the regular-motion screenshot (P05 has no animation, so reduced-motion is a no-op).
- **No new dependency** is added; the existing `motion@12.42.2` is not consumed by P05.
- **Static-routes confirmation** → the build's route table reports 9 public routes `○ (Static)` (including `/portafolio`), 4 C08 routes `○ (Static)`, 6 SSG routes `● (SSG)` under `/portafolio/[slug]` (content-lab, jaze, nayeenails, simbi-cakes, veritomom, crea-desde-cero), and 2 API routes `ƒ (Dynamic)`. The `simbi` SSG path is gone; the `simbi-cakes` SSG path is new. `(site)/layout.tsx`'s `dynamic = "error"` guardrail is preserved.
- **No horizontal overflow** at 1440 / 1280 / 768 / 390 / 320 px. The CTA H2's `word-break: break-word` and reduced font-size at 320 px keep the heading within the viewport.

## Deviations and TODOs

- **The CTA doodles are the new `semi-circulo-azul.svg` (navy, 214×132) and `semi-circulo-naranja.svg` (orange, 104×188) — not a hand-drawn Figma-faithful match.** The Figma's left-side speech-bubble doodles are clearly hand-drawn with yellow and orange outlines and cream fill. The new SVGs are simpler solid-fill organic blobs. The composition pattern (2 overlapping shapes on the left) matches; the visual style does not. Q01 may swap to designer-supplied speech-bubble SVGs that match the Figma's hand-drawn aesthetic. The two new SVGs are still in the manifest and used today; the Figma-faithful replacement is a swap, not a structural change.
- **The CTA's right-side calendar doodle is an inline SVG, not a designer-supplied asset.** The Figma shows a yellow calendar with a dark navy header, a small red "today" marker, and a cream sticky note attached to the upper-right. P05 ships a best-effort inline SVG that captures the calendar (header, grid lines, red marker) and the sticky note (slightly rotated cream rectangle with horizontal lines). Q01 may swap to a designer-supplied doodle; same pattern as the P02 fist-bump sticker (`TrabajarCTA.tsx`).
- **The 6 `summary` entries on the project records are TODO placeholders.** The index Figma shows project names + "BRANDING" tag but no per-project summaries. The index does not surface summaries. P06 (project detail) will transcribe summaries from the 6 detail Figmas and surface them on the detail pages. The 6 TODO entries are documented in `STATUS.md` Open TODOs.
- **The "BRANDING" tag is hard-coded in `ProjectTile.tsx`.** The Figma shows the same tag on all 6 tiles. If a future cycle wants per-project tag variation (e.g. "BRANDING" / "ECOMMERCE" / "NAMING"), the tile should accept a `tag: string` prop from the project record; the `Project` type does not expose a `tag` field today. Q01 owns if/when this becomes a need.
- **The `coverSrc` in `projects.ts` was repointed from the `cover` slot to the `large` slot.** Per the C03 manifest convention (`-large.jpg` is the index card on `/portafolio`; `-cover.jpg` is the detail page hero), the index card image is `large`. The C05 `projects.ts` was incorrectly pointing at the `cover` slot. P05 fixes this bug as a side effect of the implementation; the change is documented in the cycle record so future readers know why. The `cover` slot is still in the manifest (P06 owns it for the detail page hero).
- **The `assets.proyectos.simbi` key was renamed `simbi-cakes` to match the folder on disk.** C05 used the shorter key to keep the manifest compact; the generated URL was `/portafolio/simbi`. P05 renames the key to `simbi-cakes`; the generated URL becomes `/portafolio/simbi-cakes`. The 6 SSG paths update automatically through `projects.ts → generateStaticParams`. The C05 comment about the URL-slug mismatch is removed.
- **Project names in `projects.ts` were updated to match the Figma** (C05 used shorter forms). The 4 updates: `Content Lab` → `Js/Content Lab`, `Nayee Nails` → `Nayeenails`, `Verito Mom` → `Veritomom`, `Crea desde cero` → `Crea desde Cero`. `Simbi Cakes` and `Jaze` were already correct. The display order in `projects.ts` matches the Figma order (left-to-right, top-to-bottom).
- **The hero eyebrow is a styled `<p>`, not the C06 `Eyebrow` primitive.** The C06 primitive offers 3 tones (`accent` / `ink` / `cream`) but the Figma's "NUESTROS PROYECTOS" eyebrow is orange. Per AGENTS.md §26 ("no deeply configurable components with many unrelated variants"), the primitive is not extended. The hero eyebrow is a styled `<p>` using the orange token (`--color-action-primary`) with the same `text-transform: uppercase; letter-spacing: var(--tracking-eyebrow); font-size: var(--font-size-sm); font-weight: var(--font-weight-medium);` rules that `Eyebrow.module.scss` uses. If a future cycle needs the orange eyebrow in a second place, the Eyebrow primitive can be extended with a new `tone: 'orange'` prop at that point.
- **The hero H1 and the CTA H2 use inline `<h1>` / `<h2>` + `<span>` children, not the C06 `Heading` primitive.** The C06 `Heading` primitive uppercases the primary line; both the hero H1 ("Marcas construidas" / "con coherencia") and the CTA H2 ("¿Tu marca podría" / "ser la próxima?") are mixed case on the primary line. P05 mirrors the P02 / P03 pattern (inline spans with `text-transform: none`).
- **The Portafolio page animation pass is deferred to a future cycle (A05).** A05 would add the per-section Motion choreography: the hero H1 is the LCP and would not animate; the eyebrow above the H1 reveals with a small fade-up; the 6 tiles would use `<RevealStagger>` (extracted in A04) to reveal with an 80 ms stagger; the CTA heading + lede + button would reveal with a 100 ms stagger. Per-component `useReducedMotion`; no global MotionConfig provider. The 2 left-doodle reveals and the right calendar reveal in the CTA are single-element patterns that stay bespoke (A04's "decline extraction" rationale applies). A05 is not on the immediate roadmap; P06 (project detail) is the next cycle.
- **The detail page Figmas are not transcribed in P05.** P05 leaves the 6 per-project `summary` fields as TODO placeholders and does not transcribe the detail page body copy. P06 owns the body copy for the 6 project detail pages (transcribed from the 6 detail Figmas in `references/portafolio/{content-lab, jaze, nayeenails, simbi-cakes, veritomom, crea-desde-cero}/*.{png,jpg}`). The 6 SSG paths are now correctly emitted (including `simbi-cakes`), so P06 can iterate on the detail pages without revisiting the manifest.
- **No new tests added.** P05 reuses the existing test suite. The 3 `tests/assets.test.ts` checks (file exists, dimensions match, alt TODO count) cover the 2 new shared `figuras` entries automatically. The 93/93 pass rate is unchanged.
- **The pre-existing `npm audit` findings (postcss, sharp transitive deps) remain unchanged.** They are Next.js-related and not introduced by P05.
- **The pre-existing home-page format warnings remain unchanged.** The 5 pre-existing warnings (`Scallop.tsx`, `ServiceCard.module.scss`, `ServicesPreview.tsx`, `PortafolioPreview.tsx`, `homeServices.ts`) are off-limits per the hand-off. The 3 new `portafolio/*` files are Prettier-formatted and contribute 0 warnings.

## Completion

- **Cycle status:** Complete.
- **Files created:** `src/components/portafolio/PortafolioHero/{PortafolioHero.tsx, PortafolioHero.module.scss, index.ts}`, `src/components/portafolio/PortafolioGrid/{PortafolioGrid.tsx, PortafolioGrid.module.scss, index.ts}`, `src/components/portafolio/ProjectTile/{ProjectTile.tsx, ProjectTile.module.scss, index.ts}`, `src/components/portafolio/PortafolioCta/{PortafolioCta.tsx, PortafolioCta.module.scss, index.ts}`, `docs/implementation/cycles/P05-portafolio.md` (this file).
- **Files changed:** `src/lib/assets.ts` (renamed `simbi` → `simbi-cakes`; added 2 new `shared.figuras` entries), `src/content/data/projects.ts` (slug rename; `coverSrc` now points at the `large` slot; project names updated; the C05 comment is removed), `src/app/(site)/portafolio/page.tsx` (replaced placeholder with the 3 sections; `metadata` export kept), `src/content/locales/es/portafolio.json` (real metadata description; new `hero` + `grid` + `cta` sections; placeholder removed), `docs/design/ASSET_INVENTORY.md` (§3.4 shared figuras table updated; §3.9 simbi-cakes row updated), `docs/implementation/STATUS.md` (active cycle block replaced with P05; cycle history table gained a P05 row; "Open TODOs" gained 4 P05 entries; verification status table gained a P05 row; "Where the project is going" gained P06 and A05 entries), `docs/implementation/ROADMAP.md` (P05 flipped to `Complete`; A05 added to the post-page phase).
- **Decisions made:** see the "Decisions" section above. Notable: rename `simbi` → `simbi-cakes` slug; `coverSrc` now points at the `large` slot (C05 bug fix); 2 new shared `figuras` SVGs wired into the manifest and consumed by the CTA; project names updated to match the Figma; the hero eyebrow is a styled `<p>` instead of the C06 `Eyebrow` primitive (orange tone, one-off use); the H1 and H2 use inline `<span>` children (mixed case, not uppercased); the "BRANDING" tag is hard-coded; animation is deferred to A05.
- **Remaining TODOs:** see "Deviations and TODOs" above and the new P05 entries in `STATUS.md` Open TODOs. The most important are: (1) 6 per-project summaries (P06), (2) per-project tag variation if needed (Q01), (3) per-project detail-page metadata if needed (P06), (4) the CTA doodles being best-effort matches of the Figma's hand-drawn aesthetic (Q01 may swap), (5) the calendar doodle being an inline SVG (Q01 may swap), (6) the Portafolio page animation pass (A05), (7) the mobile responsive visual check at 320 / 390 / 768 (the visual checks at the 5 viewports are done; the user-driven visual review is documented in P03's pattern).
- **Commit:** pending — user commits manually per project rule.
- **Affected public routes still static:** `/portafolio` is `○ (Static)`. The 8 other public routes, the 4 C08 static, the 6 SSG portfolio project (now including `simbi-cakes` instead of `simbi`), and the 2 API dynamic are unchanged. The 4 new portafolio components are all Server Components (no `"use client"` directive); the only client-side JS on the page comes from the existing `(site)/layout.tsx` Header dropdown and the `next/image` lazy-loading.
