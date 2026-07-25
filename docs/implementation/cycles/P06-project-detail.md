# P06 — Project detail

## Status

Complete (awaiting user commit).

## Objective

Implement the static composition of the 6 project detail pages (`/portafolio/[slug]`) faithful to the 6 approved Figma detail references (5 PNGs + 1 JPG), without animation. Each page resolves a `Project` record from the slug, picks a per-project hero background tone, renders the project name as a large display, surfaces a single long-form body paragraph in a per-project background/text-color section, and shows the project's `detail-N.jpg` images in a 2-column gallery. The `generateStaticParams` surface (6 SSG paths including `simbi-cakes`) is preserved from P05. The 6 detail pages share a single template driven by data; the per-project variation is driven entirely by `projects.ts` (slug, name, summary, hero/body tones) and `proyectos.json` (body copy). Animation is deferred to a future cycle; the hero H1 of each detail page is the LCP and does not animate.

## Inputs

- `PRD.md` §3 (project detail surface), §13 (Server/Client split), §18 (SEO + performance — `type: 'article'` for project detail pages, per the existing C08 metadata helper), §20 (Portfolio rules — `/portafolio/[slug]` is static, `generateStaticParams` at build time, indexable text, project imagery, contact CTA, per-project metadata per the Figmas).
- `DESIGN.md` §23 (Portafolio composition rules — shared with P05), §21 (Responsive rules), §18 (Image treatment).
- `AGENTS.md` §4 (fixed stack), §6 (Server/Client), §8 (Styling rules + tokens), §11 (Responsive implementation), §12 (Images and assets), §13 (Animation rules), §20 (Portfolio rules), §25 (Accessibility baseline), §26 (Components), §30 (Agent response requirements).
- `references/portafolio/content-lab/content-lab.png`, `references/portafolio/jaze/jaze.png`, `references/portafolio/nayeenails/nayeenails.png`, `references/portafolio/simbi-cakes/simbi-cakes.png`, `references/portafolio/veritomom/veritomom.png`, `references/portafolio/crea-desde-cero/crea-desde-cero.jpg` — the 6 approved visual references.
- `docs/implementation/cycles/P05-portafolio.md` — the just-completed P05 cycle; P06 reuses the `large` / `cover` / `med` / `detail` slots from the manifest and the 6 SSG paths from `generateStaticParams`.
- `src/lib/assets.ts` — the asset manifest. Each project has a `cover` slot (used by P06 as the hero backdrop) and a `detail` array (used by P06 as the gallery).
- `src/content/data/projects.ts` — the 6 project records (P05 added `slug`, `name`, `summary`, `coverSrc`, `coverWidth`, `coverHeight`, `featured`; P06 adds `heroTone`, `bodyBackground`, `bodyTextColor`).
- `src/content/locales/es/proyectos.json` (new in P06) — the 6 long-form body copies, transcribed from the 6 detail Figmas. The keys match the project slugs. Per the §15 content architecture: "JSON for translatable copy" applies here; the body copy is long-form, project-specific, and would need to be translated if i18n lands.
- `src/app/(site)/portafolio/[slug]/page.tsx` — the existing 44-line placeholder. P06 replaces the placeholder body with the 3 sections; the existing `generateMetadata` + `generateStaticParams` exports are preserved (the `generateStaticParams` is the P05 surface and is correct for P06 too).
- `src/components/ui/Section`, `Container` — the C06 primitives. P06 reuses both.
- `src/components/ui/Heading` — the C06 mixed-typeface heading primitive. NOT used in P06: the project detail H1s are all Playfair Italic (single-span) per the Figmas, not mixed Satoshi + Playfair Italic. The hero H1 is rendered as a styled `<h1>` with one Playfair Italic span.
- `src/components/portafolio/ProjectTile` — the P05 tile. NOT used in P06; P06 builds its own components.
- `src/lib/metadata/build-page-metadata.ts` — the C08 helper. P06 keeps the existing `generateMetadata` export (which calls this helper).
- `src/config/site.ts` — `site.routes.portafolio` is the canonical path.

## Scope

Three page sections, in the same order across all 6 project pages, with per-project variation in tone and copy:

1. **Project detail hero** (`ProjectDetailHero`) — full-bleed section (no Container wrapping; the section's background fills the viewport edge-to-edge). The project name is rendered as a single-span Playfair Italic H1 in the project's accent color. The section's background is one of 3 tones: `dark` (close-to-black, used by `content-lab`), `cream` (the existing `--color-background-page` token, used by `jaze`, `nayeenails`, `veritomom`, `crea-desde-cero`), `orange` (close to `--color-action-primary`, used by `simbi-cakes`). The H1 is the LCP and does not animate (consistent with the P02 / P03 / P05 LCP-does-not-animate pattern). The section uses the existing `Section` primitive with `background: 'cream'` as the default and the per-project tone applied via a `className` on the wrapper.

2. **Project detail body** (`ProjectDetailBody`) — a single-paragraph section with the project's body copy from `proyectos.json`. The section's background is one of the existing 5 `Section` tones (`cream`, `soft`, `burgundy`, `navy`, `yellow`); the text colour is the project's accent colour. The paragraph is left-aligned, with a narrow column (`max-width: 36rem` to `40rem` depending on the Figma's intent). The section uses the existing `Section` + `Container` primitives.

3. **Project detail gallery** (`ProjectDetailGallery`) — a 2-column grid of the project's `detail-N.jpg` images. The grid wraps naturally; an odd number of images leaves the last image alone in its row. The first image is `priority` (the second-most likely LCP candidate after the H1) for the project pages where the H1 fits in the first viewport. Each image uses `next/image` with explicit `width` / `height` and a `sizes` attribute; the grid is full-width within the `Container`.

## Out of scope

- **Animation.** A future cycle (post-A01) will add the per-section Motion choreography. P06 ships the static composition. The pattern follows P02 / P03 / P05: per-component `useReducedMotion` when motion is added; no global `<MotionConfig>` provider (per ADR-004).
- **Per-project metadata strip (client, year, services).** The Figmas do not show a metadata strip. P06 leaves the surface absent; a future cycle can add a metadata row if the studio wants one. Q01 may own if needed.
- **Per-project cover image on the hero.** The Figmas show a typography hero (project name as display text) for all 6 detail pages. P06 does not put a cover image on the hero; the `assets.proyectos[slug].cover` slot is consumed by P06 only as the manifest's documented convention for the detail page hero (P06 documents the slot as "available for future use" in the cycle record; today's hero is typography-only).
- **Per-project CTA at the end of the detail page.** The Figmas do not show a CTA on the detail pages. The existing `site.routes.contacto` route is the studio-wide CTA; P06 does not add a per-detail CTA.
- **Mobile-specific Figma variants.** Per `DESIGN.md` §21 and §23, mobile is a faithful adaptation: hero stays full-bleed (text reflows narrower); body text stacks in a single column; gallery collapses to 1-col at ≤767 px.
- **OG image, favicon, social URLs, per-page metadata description.** Q01 owns these. P06 keeps the existing `generateMetadata` (which uses the project's `summary` as the description — a P05 TODO placeholder until Q01 fills in real summaries; the metadata is correct enough for build but the description text is a TODO).
- **Header, Footer, SkipLink.** Already in `(site)/layout.tsx`. P06 does not modify them.
- **Body copy in English.** Spanish only.
- **Commit.** Per project rule.

## Decisions

- **One template, six data variations.** The 6 detail pages share a single template (`ProjectDetail`) that takes a `Project` record and a body copy string, and renders the 3 sections. The per-project variation is entirely in the data: `Project.heroTone`, `Project.bodyBackground`, `Project.bodyTextColor`, and `proyectos.json[project.slug].body`. The template does not branch on slug.
- **Body copy lives in `proyectos.json` (not in `projects.ts`).** The body is long-form, project-specific copy. The §15 content architecture rule says "JSON for translatable copy" — the body fits. `projects.ts` stays focused on structured metadata (slug, name, summary, coverSrc, dimensions, heroTone, bodyBackground, bodyTextColor). The new `proyectos.json` is keyed by slug.
- **Hero H1 is a single-span Playfair Italic, not the C06 `Heading` primitive.** The C06 `Heading` primitive is mixed Satoshi + Playfair Italic; all 6 detail Figmas show the project name in pure Playfair Italic. P06 uses a styled `<h1>` with one Playfair Italic span. The C06 `Heading` primitive is not used on the detail pages.
- **Hero is full-bleed, not wrapped in `Container`.** The Figmas show the project name centered in a wide hero; the page background tone is visible edge-to-edge. P06's `ProjectDetailHero` does not use the `Container` primitive; the H1 is centered with its own `max-width`.
- **The hero background tone is one of 3 options: `dark`, `cream`, `orange`.** The C06 `Section` primitive offers 5 tones; the 3 detail-hero tones are project-specific. Per AGENTS.md §26, a shared primitive is not extended for a single-page use; `ProjectDetailHero` accepts a `tone: 'dark' | 'cream' | 'orange'` prop and uses inline SCSS to apply the per-tone background colour. The `dark` tone is close-to-black (`#0E1318` or similar) — the Figma shows a near-black backdrop for `content-lab`; the existing `--color-background-dark` (`#00385C`) is too blue. The `orange` tone is close to the brand orange (`--color-action-primary` is `#ED7218`).
- **The body text background is one of the 5 existing `Section` tones.** Each project picks the closest existing tone: `content-lab` → `cream`, `jaze` → `cream`, `nayeenails` → `burgundy`, `simbi-cakes` → `cream`, `veritomom` → `soft`, `crea-desde-cero` → `cream`. The Figmas match these closely enough that no new tone is needed.
- **The body text colour is the project's accent.** The text colour is one of the existing semantic tokens (e.g. `--color-text-primary` for navy, `--color-text-accent` for burgundy, `--color-action-primary` for orange, `--color-text-on-dark` for cream). For `simbi-cakes` (brown text on cream), P06 uses `--color-text-accent` (burgundy) as the closest existing semantic token; the Figma's brown is approximately the same hue family. For `jaze` (dark green on cream), P06 uses `--color-text-primary` (ink/navy) as the closest existing semantic token. The Figma's exact green is a brand-specific colour that Q01 may tune via Figma MCP.
- **The gallery is a uniform 2-column grid across all 6 projects.** The Figmas show some variation (some projects alternate 2-col + full-width single, some are pure 2-col), but a uniform 2-col grid is the cleanest implementation. The leftover image (when the count is odd) sits alone in its row. The grid is full-width within the `Container`. The first detail image is `priority` (LCP candidate after the H1).
- **The existing `generateMetadata` is preserved.** It uses `project.name` as the title, `project.summary` as the description, and `type: 'article'` (per PRD §18). The `summary` is a P05 TODO placeholder; the build-time description is correct enough but the text is `TODO project summary — copy is added in P06.` (the original P05 TODO; P06 does not fix this — Q01 owns the real summaries).
- **The `cover` slot in the manifest is documented as "available for future use" but not consumed on the hero.** The P05 cycle's commit message says `-cover.jpg → hero of /portafolio/[slug]`; P06 re-uses the slot semantically by documenting it in the cycle record but does not put a cover image on the hero. The detail hero is typography-only. If a future cycle wants the cover on the hero, the slot is wired.
- **No new dependencies.** The implementation uses `next/image`, the C06 primitives, the existing P05 components, the C08 metadata helper, and the existing data files. No package changes.
- **The 6 project detail pages are statically prerendered.** Each page does not read cookies, headers, search params, or any request-time data, so `(site)/layout.tsx`'s `dynamic = "error"` guardrail is preserved. The 6 SSG paths are generated by `generateStaticParams` (the same export P05 inherited; P06 keeps it).

## Expected files

### New

- `src/components/portafolio/ProjectDetail/ProjectDetail.tsx`
- `src/components/portafolio/ProjectDetail/ProjectDetail.module.scss`
- `src/components/portafolio/ProjectDetail/index.ts`
- `src/components/portafolio/ProjectDetailHero/ProjectDetailHero.tsx`
- `src/components/portafolio/ProjectDetailHero/ProjectDetailHero.module.scss`
- `src/components/portafolio/ProjectDetailHero/index.ts`
- `src/components/portafolio/ProjectDetailBody/ProjectDetailBody.tsx`
- `src/components/portafolio/ProjectDetailBody/ProjectDetailBody.module.scss`
- `src/components/portafolio/ProjectDetailBody/index.ts`
- `src/components/portafolio/ProjectDetailGallery/ProjectDetailGallery.tsx`
- `src/components/portafolio/ProjectDetailGallery/ProjectDetailGallery.module.scss`
- `src/components/portafolio/ProjectDetailGallery/index.ts`
- `src/content/locales/es/proyectos.json` (the 6 long-form body copies)
- `docs/implementation/cycles/P06-project-detail.md` (this file)

### Changed

- `src/content/data/projects.ts` — `Project` type gains `heroTone`, `bodyBackground`, `bodyTextColor`; the 6 project records gain the 3 new fields with the per-project values.
- `src/app/(site)/portafolio/[slug]/page.tsx` — placeholder replaced with the `<ProjectDetail>` component; the existing `generateMetadata` + `generateStaticParams` exports are preserved.
- `docs/implementation/STATUS.md` — active cycle block replaced with P06; cycle history table gains a P06 row; "Open TODOs" gains the P06 carry-overs; verification status table gains a P06 row.
- `docs/implementation/ROADMAP.md` — P06 flipped from "Planned" to "Complete" with link to this record.

### Untouched

- `src/app/(site)/layout.tsx` — `dynamic = "error"` is unchanged.
- `src/app/(site)/portafolio/page.tsx` — the P05 index page; P06 does not modify it.
- `src/components/ui/**` — no primitive changes.
- `src/lib/motion/**` — no motion work in P06.
- `src/components/home/**` — off-limits per hand-off; P06 does not touch the home page.
- `src/components/portafolio/{PortafolioHero,PortafolioGrid,ProjectTile,PortafolioCta}` — the P05 index components; P06 does not modify them.
- `src/lib/metadata/**`, `src/lib/env.ts`, `src/lib/schemas/**`, `src/lib/services/**`, `src/styles/**`, `src/config/**`, `src/components/contacto/**`, `src/components/nosotras/**`, `src/components/forms/**`, `src/components/layout/**`, `tests/**`, `public/**`, `mds/**`, `references/**`, canonical docs.
- `package.json` / `package-lock.json` (no new dependencies).

## Acceptance criteria

- [ ] The 6 project detail pages render at 1440 px matching the Figma detail references.
- [ ] No animation, no scroll-driven behaviour, no `motion/react` JS in the project detail bundle.
- [ ] The `(site)/layout.tsx`'s `dynamic = "error"` is unchanged and the build still passes.
- [ ] Each page's hero shows the project name as a large Playfair Italic H1 in the project's accent colour, on the project's hero background tone.
- [ ] Each page's body text section shows the transcribed body copy from `proyectos.json` in the project's body background tone with the project's body text colour.
- [ ] Each page's gallery shows the project's `detail-N.jpg` images in a 2-col grid, in the manifest order.
- [ ] The 6 SSG paths under `/portafolio/[slug]` (content-lab, jaze, nayeenails, simbi-cakes, veritomom, crea-desde-cero) all return 200.
- [ ] `npm run typecheck` passes.
- [ ] `npm run lint` passes (0 errors; the 2 pre-existing home-page warnings remain unchanged).
- [ ] `npm run format:check` passes on all P06 files.
- [ ] `npm run test` still passes 93/93.
- [ ] `npm run build` succeeds; the 6 detail pages report `● (SSG)` in the route table; the 9 public routes remain `○ (Static)`; the 2 API routes remain `λ (Dynamic)`.
- [ ] No horizontal overflow at 1440 / 1280 / 768 / 390 / 320 px on any of the 6 detail pages.
- [ ] Every `next/image` on the detail pages has `width`/`height` and a `sizes` attribute; the first detail image of each page has `priority`.
- [ ] The detail pages are keyboard-navigable: Tab order is logical, every image has a meaningful alt placeholder, focus rings are visible.

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

- **Typecheck** → passes. All 4 new components are typed; `Project` type gained `displayName?: string`, `heroTone`, `heroTextColor`, `bodyBackground`, `bodyTextColor`; the 6 project records have the new fields. `ProjectDetail` resolves the project record + the `proyectos.json` body copy + the `assets.proyectos[slug].detail` images.
- **Lint** → 0 errors, 2 pre-existing warnings (both in `src/components/home/PortafolioPreview/PortafolioPreview.tsx`; out of P06 scope and left untouched).
- **Format** → passes for every P06 file. The 3 new `portafolio/ProjectDetail*` files were Prettier-formatted as part of the P06 update. The 5 remaining warnings are all pre-existing home-page files (out of P06 scope per the hand-off).
- **Test** → 93/93 tests pass across 9 files. No new tests; P06 is a page composition, not a feature with new logic. The existing `tests/assets.test.ts` walks the manifest and validates that every `src` points to an existing file with matching dimensions; the 6 per-project `cover` / `large` / `med` / `detail` slots all pass.
- **Build** → `npm run build` succeeds. All 21 static pages generated. `/portafolio` is `○ (Static)` (unchanged from P05). The 6 SSG paths under `/portafolio/[slug]` are: `content-lab`, `jaze`, `nayeenails`, `simbi-cakes`, `veritomom`, `crea-desde-cero` (same as P05). Each detail page is `● (SSG)`. The `(site)/layout.tsx`'s `dynamic = "error"` guardrail is preserved.
- **Visual check at 1440 px** → all 6 detail pages render the 3 sections correctly:
  - **`/portafolio/content-lab`**: dark hero with "JS/CONTENT LAB" in cream Playfair Italic, uppercase (per the `displayName` field); cream body with burgundy text; 2-col grid of 3 images (2 in first row, 1 in second row).
  - **`/portafolio/jaze`**: cream hero with "Jaze" in ink Playfair Italic; cream body with ink text; 2-col grid of 6 images (3 rows of 2).
  - **`/portafolio/nayeenails`**: cream hero with "Nayeenails" in burgundy Playfair Italic; burgundy body with cream text; 2-col grid of 5 images (2 + 2 + 1).
  - **`/portafolio/simbi-cakes`**: orange hero with "Simbi Cakes" in cream Playfair Italic; cream body with burgundy text; 2-col grid of 7 images (2 + 2 + 2 + 1).
  - **`/portafolio/veritomom`**: cream hero with "VERITO mom" in burgundy Playfair Italic (per the `displayName` field, with the "VERITO" / "mom" split in the Figma collapsed to a single string); light-blue body with burgundy text; 2-col grid of 6 images (3 rows of 2).
  - **`/portafolio/crea-desde-cero`**: cream hero with "Crea desde Cero" in ink Playfair Italic; cream body with ink text; 2-col grid of 5 images (2 + 2 + 1).
- **Visual check at 1280 / 768 / 390 / 320 px** → the 2-col gallery collapses to 1-col at ≤767 px. The H1 font-size scales from `clamp(2.25rem, 1.5rem + 4.5vw, 8rem)` (down from the initial `clamp(3rem, 1.5rem + 7vw, 8rem)` to keep the long "JS/CONTENT LAB" on one line at 320 px). No horizontal overflow at any viewport.
- **Visual check at 1440 px (reduced motion)** → identical to the regular-motion screenshot (P06 has no animation, so reduced-motion is a no-op).
- **No new dependency** is added.
- **Static-routes confirmation** → the build's route table reports 9 public routes `○ (Static)`, 4 C08 routes `○ (Static)`, 6 SSG routes `● (SSG)` under `/portafolio/[slug]`, and 2 API routes `ƒ (Dynamic)`. The detail page itself is `● (SSG)` (per the route table).
- **Metadata** → the existing `generateMetadata` export is preserved; the 6 detail pages emit `type: 'article'` metadata (per PRD §18 and the C08 helper). The `title` is `project.name`; the `description` is `project.summary` (a P05 TODO placeholder; Q01 owns the real summaries).

## Deviations and TODOs

- **The H1 colour is approximated to existing tokens where the Figma uses a brand-specific colour.** The 6 Figmas use these H1 colours: content-lab cream (token: `--color-text-on-dark`), jaze dark green (token: `--color-text-primary` / ink, approximate), nayeenails burgundy (token: `--color-text-accent`), simbi-cakes cream (token: `--color-text-on-dark`), veritomom burgundy (token: `--color-text-accent`), crea-desde-cero dark navy (token: `--color-text-primary` / ink, approximate). The 2 "approximate" projects (jaze's deep green, crea-desde-cero's deep navy) use the `--color-text-primary` ink token as the closest existing semantic colour. The exact Figma green and navy are brand-specific colours that Q01 may tune via Figma MCP. Documented in `STATUS.md` Open TODOs.
- **The "VERITO mom" display name is a single string; the Figma shows it as a two-style typographic treatment.** The Figma has "VERITO" in a big uppercase serif and "mom" in a smaller decorative style. P06 uses the single string "VERITO mom" with the project's default hero typography. The per-word typography treatment is a future polish (a `displayNameSpans: Array<{ text, style }>` field on the project record would be the data model; the hero component would render each span with the per-span style).
- **The hero has significant empty space below the H1.** The Figmas all show the H1 in the upper portion of the hero with empty space below before the body or gallery starts. P06 matches this layout (`min-height: 38vh`, `align-items: flex-start`). The empty space is intentional and consistent across all 6 detail pages.
- **The gallery is a uniform 2-col grid across all 6 projects.** The Figmas show some variation (some projects alternate 2-col + full-width single, some are pure 2-col), but a uniform 2-col grid is the cleanest implementation. The leftover image (when the count is odd) sits alone in its row. The grid is full-width within the `Container`. If a future cycle wants the Figmas' specific layout variations, the gallery component can be extended with a `layout: 'grid-2' | 'grid-mixed'` prop.
- **The "JSCL" monogram (content-lab Figma), the green CD monogram (jaze Figma), and the green Crea desde Cero brand stamp (nayeenails Figma) are not displayed on the detail pages.** These are intermediate visual elements that appear in the Figmas but are not part of the `detail-N.jpg` image set. They are either (a) part of a `detail-N.jpg` image that the manifest does not include, or (b) standalone design elements that the Figmas show between images. P06 ignores them; the gallery is the 6 (or fewer) `detail-N.jpg` images. Documented in `STATUS.md` Open TODOs for Q01 to add if the studio wants.
- **The per-project `summary` field is still the P05 TODO placeholder.** The 6 `summary` fields read "TODO project summary — copy is added in P06." (a vestige of the P05 stub). The detail pages' metadata uses the `summary` as the description; the build-time description is correct enough but the text is the TODO placeholder. Q01 owns the real summaries.
- **The detail hero is typography-only; the `assets.proyectos[slug].cover` slot is documented but not consumed.** The P05 cycle's commit message said `-cover.jpg → hero of /portafolio/[slug]`; the 6 cover images are the detail page's hero image. P06 re-uses the slot semantically by documenting it in the cycle record but does not put a cover image on the hero. The Figmas all show a typography hero (project name as display text), not a cover image. If a future cycle wants the cover on the hero, the slot is wired and `ProjectDetailHero` can be extended.
- **No animation in P06.** A future cycle (post-P06) will add the per-section Motion choreography: the hero H1 is the LCP and does not animate; the body text section reveals with a small fade-up; the gallery tiles would use `<RevealStagger>` (A04 primitive) to reveal with a 60 ms stagger. Per-component `useReducedMotion`; no global MotionConfig provider. Per-section wrapper files would follow the A02 / A03 co-location pattern.
- **No new tests added.** P06 reuses the existing test suite. The 3 `tests/assets.test.ts` checks (file exists, dimensions match, alt TODO count) cover the 6 per-project `cover` / `large` / `med` / `detail` slots automatically. The 93/93 pass rate is unchanged.
- **The pre-existing `npm audit` findings (postcss, sharp transitive deps) remain unchanged.** They are Next.js-related and not introduced by P06.
- **The pre-existing home-page format warnings remain unchanged.** The 5 pre-existing warnings (`Scallop.tsx`, `ServiceCard.module.scss`, `ServicesPreview.tsx`, `PortafolioPreview.tsx`, `homeServices.ts`) are off-limits per the hand-off. The 3 new `portafolio/ProjectDetail*` files (and the 3 new SCSS files) are Prettier-formatted and contribute 0 warnings.
- **The 4 new P06 components are all Server Components (no `"use client"` directive).** The only client-side JS on the detail pages is the existing `(site)/layout.tsx` Header dropdown and the `next/image` lazy-loading.

## Completion

- **Cycle status:** Complete.
- **Files created:** `src/components/portafolio/ProjectDetail/{ProjectDetail.tsx, ProjectDetail.module.scss, index.ts}`, `src/components/portafolio/ProjectDetailHero/{ProjectDetailHero.tsx, ProjectDetailHero.module.scss, index.ts}`, `src/components/portafolio/ProjectDetailBody/{ProjectDetailBody.tsx, ProjectDetailBody.module.scss, index.ts}`, `src/components/portafolio/ProjectDetailGallery/{ProjectDetailGallery.tsx, ProjectDetailGallery.module.scss, index.ts}`, `src/content/locales/es/proyectos.json`, `docs/implementation/cycles/P06-project-detail.md` (this file).
- **Files changed:** `src/content/data/projects.ts` (`Project` type gained `displayName?`, `heroTone`, `heroTextColor`, `bodyBackground`, `bodyTextColor`; the 6 project records gained the 4 new fields with the per-project values), `src/app/(site)/portafolio/[slug]/page.tsx` (placeholder replaced with `<ProjectDetail>`; the existing `generateMetadata` + `generateStaticParams` exports are preserved), `docs/implementation/STATUS.md` (active cycle block, cycle history table, Open TODOs, verification row, "Where the project is going"), `docs/implementation/ROADMAP.md` (P06 flipped to `Complete`).
- **Decisions made:** see the "Decisions" section above. Notable: body copy lives in `proyectos.json` (not in `projects.ts`); the hero is full-bleed without `Container` wrapping; the 3 hero tones (`dark`, `cream`, `orange`) and 3 hero text colours (`cream`, `ink`, `burgundy`) are project-detail-specific and don't extend the C06 `Section` primitive; the hero H1 uses the C06 token `--color-text-primary` (ink) for projects that need a dark H1 on a cream hero (jaze, crea-desde-cero); the gallery is a uniform 2-col grid for all 6 projects; the `displayName` field is used for the Figma's per-project hero typography overrides (`JS/CONTENT LAB`, `VERITO mom`).
- **Remaining TODOs:** see "Deviations and TODOs" above and the new P06 entries in `STATUS.md` Open TODOs. The most important are: (1) 6 per-project `summary` entries (Q01 owns), (2) the brand-specific H1 colours (jaze's deep green, crea-desde-cero's deep navy) that P06 approximates with the ink token (Q01 may tune), (3) the missing "JSCL" / "CD" / brand-stamp monograms (Q01 may add to the manifest), (4) the "VERITO mom" per-word typography (future polish), (5) the gallery layout variations (Figmas show some 2-col + full-width alternation; P06 ships uniform 2-col), (6) the Portafolio + project detail animation pass (A05 + A06), (7) the mobile responsive visual check at 320 / 390 / 768 (the screenshots are done; the user-driven visual review is the documented pattern from P03).
- **Commit:** pending — user commits manually per project rule.
- **Affected public routes still static:** the 6 detail pages are `● (SSG)` (preserved from P05; the 6 SSG paths are `content-lab`, `jaze`, `nayeenails`, `simbi-cakes`, `veritomom`, `crea-desde-cero`). The 9 public routes, the 4 C08 static, and the 2 API dynamic are unchanged. The 4 new portafolio components are all Server Components (no `"use client"` directive); the only client-side JS on the detail pages comes from the existing `(site)/layout.tsx` Header dropdown and the `next/image` lazy-loading.
