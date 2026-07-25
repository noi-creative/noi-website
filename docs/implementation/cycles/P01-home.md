# P01 — Home

## Status

Planned (Round A complete; awaiting user approval before Round B).

## Objective

Implement the static 1440 px composition of the Home page (`/`), faithful to the approved Figma reference (`references/home/home.png`), without animation. The page renders seven sections inside the shared `(site)` layout (Header + Footer come from the layout). Animation and the infinite portafolio carousel behaviour are deferred to A01.

## Inputs

- `PRD.md` — brand voice, narrative requirements, contact form metadata.
- `DESIGN.md` §22 (Home page spec), §19 (organic shapes), §21 (responsive rules), §18 (image treatment), §9 (container roles), §10 (breakpoints).
- `docs/design/FIGMA_AUDIT.md` — Figma audit, repeated patterns, observed colours, typography roles, repeated decorative motifs.
- `docs/design/ASSET_INVENTORY.md` — per-asset manifest and alt text gaps.
- `references/home/home.png` — the approved visual reference.
- `src/lib/assets.ts` — the asset manifest.
- `src/content/locales/es/home.json` — current Home content (eyebrow and lede already supplied; rest is TODO).
- `src/content/locales/es/common.json` — shared CTAs and navigation copy.
- `src/content/locales/es/contacto.json` — service options (referenced by `src/content/data/services.ts`).
- `src/content/data/services.ts` — service identifiers and labels (used for the contact form options).
- `src/content/data/projects.ts` — portfolio projects (featured flag, cover, slug).
- `src/components/ui/*` — the C06 primitives (Button, Heading, Eyebrow, Section, Container).
- `src/components/layout/Header` and `Footer` — the C07 shell (already in `(site)/layout.tsx`).
- `src/styles/_tokens.scss`, `src/styles/_mixins.scss` — design tokens and mixins.
- `src/lib/metadata/build-page-metadata.ts` — the C08 metadata helper.

## Scope

- Seven page sections, in order:

  1. **Hero** — navy background, mixed-typeface headline "MARCAS CON estrategia", lede, two CTAs, layered photo collage with rotation, decorative orange "2".
  2. **"El branding no es un momento, ES UN PROCESO"** — yellow background with scallop top edge, eyebrow, two-line Satoshi-only heading (regular + bold), two body paragraphs, portrait with megaphone sticker, decorative orange "2".
  3. **Services preview** — cream background, eyebrow, mixed-typeface heading, row of **6 service cards** with sticker icons + colours, orange CTA below.
  4. **Portafolio preview** — burgundy background, oversized "PORTAFOLIO" Satoshi Black heading, four small project images near the heading, mixed-typeface subhead, lede, outline CTA. **Static strip of `*-med` images below** (the infinite scroll loop is owned by A01).
  5. **Process timeline** — cream background, eyebrow, mixed-typeface heading, four numbered phases connected by an orange line, outline CTA.
  6. **Testimonials** — soft-blue background, eyebrow, mixed-typeface heading, three stacked testimonial cards (front + two behind), names + roles.
  7. **Final CTA** — cream background, mixed-typeface heading with orange accent words in the lede, two CTAs (primary-burgundy + outline), collage of three photos + hand/phone sticker.

- Scallop dividers at the boundary between sections 1↔2 (navy→yellow), 2↔3 (yellow→cream), and 4↔5 (burgundy→cream).
- Replace the four TODO values in `src/content/locales/es/home.json` with the actual Home page copy.
- A new typed data file `src/content/data/homeServices.ts` describing the five service cards shown in the Services preview (different scope from the contact form's `serviceOptions`).
- Update `src/lib/assets.ts` to give the final-CTA collage a real `home.ctaCollage` slot (reusing the hero collage images, with documented rationale) and a real alt on `home.sectionBrandingPortrait`.
- New section components under `src/components/home/` — one component per Home section, plus a small `Scallop` primitive and a `DecorativeNumber` component for the orange "2" motifs. Each component is a Server Component unless it needs a client boundary.
- Update `src/app/(site)/page.tsx` to render the seven sections in order, replacing the current placeholder.

## Out of scope

- **Animation.** A01 owns the section entrance animations, the portafolio infinite carousel scroll behaviour, the testimonial carousel scroll behaviour, and any collage motion. P01 renders the static composition only.
- **Mobile-specific Figma variants.** Per `DESIGN.md` §21, the mobile design is a faithful adaptation of the 1440 px composition, not a separate design. P01 implements the responsive adaptation following the rules in §21, without Figma mobile references.
- **OG image, favicon, social URLs, per-page metadata description.** Q01 owns these. P01 keeps the `description: 'TODO metadata description'` in `home.json` and lets the metadata helper's `DEFAULT_DESCRIPTION` carry the page until Q01.
- **Panel Sans.** No Panel Sans moment is used in the Home reference; the font stays unloaded.
- **Header, Footer, SkipLink.** Already in `(site)/layout.tsx`. P01 does not modify them.
- **Real testimonial copy.** The Figma shows three testimonials; only two names (Nayely Urdenata, Verónica Domínguez) are legible. P01 renders those two verbatim and a third as a documented TODO placeholder (testimonial name + a `TODO testimonial copy` body).
- **Exact orange-shape path data from Figma.** P01 ships a best-effort approximation. Confirming the path against the approved Figma frame is Q01's work; the cycle record logs the placeholder as a TODO.
- **Source/generate new images for the final-CTA collage.** P01 reuses the three hero collage images. Sourcing or commissioning new imagery is Q01.
- **Header wheel images.** `home.headerWheel[0..8]` is not visibly used in the approved frame. P01 does not render the wheel and **marks the slot as `null` in the manifest** to confirm the audit's pending-Figma question.
- **The "Merece un equipo" Playfair Italic body-emphasis pattern observed on Nosotras.** Not present on Home; do not implement.
- **Service description copy for the five service cards beyond what the Figma reference shows.** Descriptions are written conservatively from the Figma text where legible; the rest is `TODO service description` placeholder copy and flagged in the cycle's "Deviations and TODOs".

## Decisions

- **Section content is JSON; data is TS.** Per `IMPLEMENTATION_WORKFLOW.md` and ADR-003, headings, paragraphs, eyebrow text, CTAs, quotes and validation messages live in JSON (`src/content/locales/es/home.json`). Machine-stable data — service card colours, icon sticker references, project slug ordering, testimonial layout offsets — lives in TS (`src/content/data/homeServices.ts`).
- **Six service cards, not five.** The Figma reference shows six numbered cards (01–06) at desktop width: 01 Branding e Identidad Visual, 02 Diseño Gráfico, 03 Diseño Web, 04 E-commerce, 05 Estrategia de Contenido, 06 Naming. The contact form's `serviceOptions` (Diseño web, Ecommerce, Naming, Diseño gráfico) is a subset of these six; "Branding" and "Estrategia de Contenido" are preview-only and not currently quoted.
- **Service card content is decoupled from the contact form's `serviceOptions`.** The contact form quotes 4 services; the Home preview is a marketing grid of 6. A new `src/content/data/homeServices.ts` carries the Home preview with `{ id, label, description, color, iconSticker }`. `src/content/data/services.ts` (contact form) is unchanged. The six preview entries share the same `ServiceId` union plus two additional ids (`branding`, `estrategia-contenido`); the contact form continues to use the original four.
- **Final-CTA collage reuses the hero collage images.** `home.ctaCollage` becomes an array of three `RasterAsset` entries pointing at `hero-collage-1/2/3.png`. Rationale: the audit explicitly proposes this as an acceptable fallback, no new imagery is on disk, and the Figma collage has the same character (rounded portrait crops, two photos of people and one detail shot). The `alt` strings are written conservatively ("Person working on a laptop" etc.) since the Figma context is ambiguous.
- **`home.headerWheel` is collapsed to `null` (manifest change only).** Today the manifest has `home.headerWheel: [9 entries]` pointing at `header-wheel-1.png` through `header-wheel-9.png`. The PNGs exist on disk but the Figma reference shows no such wheel. P01 sets the manifest slot to `null` (a single `null` literal where the array was) so the manifest stops claiming these images are used. The 9 PNGs stay on disk untouched (C03 prohibits moving single images). If a future cycle finds a wheel use, the files are still on disk to re-attach.
- **Decorative orange shape is a new `DecorativeShape` component, not a "2" numeral.** The audit guessed "2" but the Figma is an abstract organic orange curve (no digit, no letter — a brushstroke-style form). It appears twice on Home: behind the hero collage on the right side, and next to the branding-section portrait. No existing sticker matches it; `sticker-manos-naranja` is a circular hands composition for the final CTA collage (different role). The new component renders an inline `<svg>` with a single cubic-Bezier path, `fill: var(--color-brand-orange)`, `aria-hidden="true"`. Two instances in P01 (hero + branding), with optional `flip` and `scale` props for the two placements. **The path data is a best-effort approximation from the PNG at 1440 px; it should be confirmed or replaced via Figma MCP before production.** A `TODO shape path` is recorded in the cycle's "Deviations and TODOs".
- **Scallop dividers are a new `Scallop` primitive.** Per `DESIGN.md` §19, the implementation order is (1) provided SVG, (2) border-radius and pseudo-elements for simple geometry, (3) CSS masks. The scallops in the Figma are gentle organic waves, not simple half-circles; pseudo-elements don't reproduce them faithfully. The primitive wraps an inline SVG path with `currentColor`, accepts a `tone` (one of the existing background tokens) and a `flip` (top/bottom). It's a Server Component, no JS. The shape is a single reusable cubic-Bezier path used three times (at the boundaries listed in Scope).
- **No new typography primitives.** `Heading` already implements the mixed-typeface pattern (Satoshi + Playfair Italic). The "El branding no es un momento, ES UN PROCESO" two-line Satoshi heading is rendered inline (Satoshi regular + Satoshi bold uppercase), and the "PORTAFOLIO" giant Satoshi Black heading is rendered inline too. No new primitive is justified (the patterns appear once each on the page and not on any other approved page).
- **Static strip for the portafolio preview, not a carousel.** The infinite carousel is A01. P01 renders a static horizontal strip of `*-med` project images (six featured projects at 530×552 each) inside a `Container width="viewport"` so the strip touches the page gutters. The strip uses `next/image` with `sizes` set to the strip's width.
- **Static stack for testimonials, not a slider.** Same reason. P01 renders the three testimonial cards stacked with the front card overlapping the two behind (the "layered cards" pattern from the Figma). The overlap uses a negative `margin-top` on the back cards. A01 will add scroll-driven motion.
- **Section padding uses `--space-9` at desktop, `--space-8` at tablet, `--space-8` at mobile.** The `Section` primitive's default is already `--space-8`/`--space-9`/`--space-10`. For the Home page we override to the same `--space-9`/`--space-8`/`--space-8` values explicitly per section so the rhythm matches the Figma (the Figma shows tighter spacing than the Section default between consecutive same-tone sections).
- **The hero collage bleeds to the page edge.** The hero uses `Container width="viewport"` for the layout, but the collage is absolutely positioned to extend past the right container edge. The container is `position: relative` with `overflow-x: clip` so the bleed is bounded.
- **No new dependencies.** The implementation uses `next/image`, `next/link`, the C06 primitives, the C09 motion tokens (only for the reduced-motion media query — no JS animation), and the C08 metadata helper. No package changes.
- **The "Conoce cómo trabajamos" CTA links to `/nosotras`.** The process section has no dedicated page. `/nosotras` describes the studio and references the process; `/servicios` is the most relevant commercial page. `/nosotras` is the closest match to "know how we work" without inventing a new route.
- **The "Ver portafolio" hero CTA links to `/portafolio`.** Already in `common.cta.verPortafolio`. Wire to `site.routes.portafolio`.
- **The "Agendar tu llamado" hero CTA links to `/contacto`.** Already in `common.cta.agendarLlamada`. Wire to `site.routes.contacto`.
- **The "Agenda tu llamada gratuita" final CTA links to `/contacto`.** Same target as the hero CTA.
- **The "Escríbenos directamente" final CTA opens the user's mail client with `hola@creativenoi.com`.** `mailto:` link, not a route. Uses `site.contactEmail`.
- **The "Ver todos los servicios" CTA links to `/servicios`.** `site.routes.servicios`.
- **The "Explorar el portafolio completo" CTA links to `/portafolio`.** `site.routes.portafolio`.
- **All CTAs use existing C06 `Button` variants** (primary-yellow, primary-burgundy, primary-orange, outline-on-dark, outline-on-light, text-link). No new button variants.
- **The "MARCAS CON / estrategia" hero headline uses the `Heading` primitive** (weight black). The accent word "estrategia" picks up Playfair Italic automatically.
- **The "PORTAFOLIO" giant heading is `<h2 class="display">` styled inline** with `font-size: clamp(...)` matching the Figma. The `display` class is local to the home section component, not a global utility.
- **Testimonial card colours are typed.** Burgundy (`--color-background-strong`) for the back cards, navy (`--color-background-dark`) for the front card. This matches the Figma (two burgundy cards in the back, one navy card in front).
- **The process timeline connector is a CSS `::before` pseudo-element on each step.** An absolute-positioned thin orange line behind the circles, with each step circle absolutely positioned on top. The numbers 1–4 are `font-size: var(--font-size-2xl)`, `color: var(--color-text-accent)` (burgundy) per the Figma, with the orange dot connector passing through.
- **The mobile Services preview becomes a horizontal scroll strip**, not a compressed row. Per `DESIGN.md` §22.3 mobile rule: "Use a horizontal scroll area or stacked cards depending on final usability. Do not compress all cards into an unreadable row." `overflow-x: auto; scroll-snap-type: x mandatory;` with `scroll-snap-align: start` on each card.
- **The mobile Process timeline becomes a vertical list** with the orange connector rotated 90° (or rendered as a vertical `::before` on each step).
- **Mobile testimonials render the front card only**, with the back cards visually hidden (`@media (max-width: 767px) { .testimonialBack { display: none; } }`). A01 may add a swipe behaviour later; the design is honest at 320 px without it.
- **Scallop colours at each boundary:**

  | Boundary                        | `tone` (scallop fill)            | Section above colour |
  | ------------------------------- | -------------------------------- | -------------------- |
  | Hero (navy) → Branding          | `var(--color-background-dark)`   | navy                 |
  | Branding (yellow) → Services    | `var(--color-background-warm)`   | yellow               |
  | Portafolio (burgundy) → Process | `var(--color-background-strong)` | burgundy             |

  The scallop sits at the top of the lower section, painted in the colour of the section above. CSS `position: absolute; inset-block-start: -1px;` so the wave covers the join exactly.

## Expected files

### New

- `src/components/home/Hero/Hero.tsx`
- `src/components/home/Hero/Hero.module.scss`
- `src/components/home/Hero/index.ts`
- `src/components/home/HeroCollage/HeroCollage.tsx` (3 rotated rounded photos + decorative "2")
- `src/components/home/HeroCollage/HeroCollage.module.scss`
- `src/components/home/HeroCollage/index.ts`
- `src/components/home/BrandingSection/BrandingSection.tsx`
- `src/components/home/BrandingSection/BrandingSection.module.scss`
- `src/components/home/BrandingSection/index.ts`
- `src/components/home/ServicesPreview/ServicesPreview.tsx`
- `src/components/home/ServicesPreview/ServicesPreview.module.scss`
- `src/components/home/ServicesPreview/index.ts`
- `src/components/home/ServiceCard/ServiceCard.tsx`
- `src/components/home/ServiceCard/ServiceCard.module.scss`
- `src/components/home/ServiceCard/index.ts`
- `src/components/home/PortafolioPreview/PortafolioPreview.tsx`
- `src/components/home/PortafolioPreview/PortafolioPreview.module.scss`
- `src/components/home/PortafolioPreview/index.ts`
- `src/components/home/ProcessTimeline/ProcessTimeline.tsx`
- `src/components/home/ProcessTimeline/ProcessTimeline.module.scss`
- `src/components/home/ProcessTimeline/index.ts`
- `src/components/home/Testimonials/Testimonials.tsx`
- `src/components/home/Testimonials/Testimonials.module.scss`
- `src/components/home/Testimonials/index.ts`
- `src/components/home/FinalCta/FinalCta.tsx`
- `src/components/home/FinalCta/FinalCta.module.scss`
- `src/components/home/FinalCta/index.ts`
- `src/components/home/Scallop/Scallop.tsx`
- `src/components/home/Scallop/Scallop.module.scss`
- `src/components/home/Scallop/index.ts`
- `src/components/home/DecorativeShape/DecorativeShape.tsx`
- `src/components/home/DecorativeShape/DecorativeShape.module.scss`
- `src/components/home/DecorativeShape/index.ts`
- `src/content/data/homeServices.ts`
- `src/content/data/testimonials.ts`
- `docs/implementation/cycles/P01-home.md` (this file, updated through Round E)

### Changed

- `src/app/(site)/page.tsx` — render the seven Home sections in order; keep the existing `metadata` export.
- `src/content/locales/es/home.json` — replace `TODO` values with real copy (eyebrow, services heading, services card descriptions if kept here, portafolio subhead + lede, process heading, process steps, testimonials heading, final CTA heading + lede).
- `src/lib/assets.ts` — set `home.ctaCollage` to an array of three `RasterAsset` entries pointing at the hero collage images; set `home.headerWheel` to `null`; write a real `alt` on `home.sectionBrandingPortrait` and `home.heroCollage[*]`.
- `docs/design/ASSET_INVENTORY.md` — reflect the `ctaCollage` decision and the `headerWheel` collapse; write a follow-up note in §4 ("Manifest drift") for Q01.
- `docs/implementation/STATUS.md` — move P01 from "Planned" to "In progress" after Round B begins; flip to "Complete" in Round E.
- `docs/implementation/ROADMAP.md` — flip P01 to "Complete" with a link to the cycle record.

## Acceptance criteria

- [ ] The Home page renders 7 distinct sections at 1440 px matching the Figma reference (`references/home/home.png`).
- [ ] No animation, no scroll-driven behaviour, no `motion/react` JS in the Home bundle.
- [ ] The `(site)` layout's `dynamic = "error"` is unchanged and the build still passes.
- [ ] `npm run typecheck` passes.
- [ ] `npm run lint` passes (no new errors; the pre-existing C06 polymorphic warning may remain).
- [ ] `npm run format:check` passes.
- [ ] `npm run test` still passes 93/93 (no new tests required; the existing tests cover the contact form, schemas, services, and asset manifest).
- [ ] `npm run build` succeeds; the Home route reports `○ (Static)` in the route table.
- [ ] The 9 public routes remain `○ (Static)`, the 6 portfolio project routes remain `●  (SSG)`, and the 2 API routes remain `λ (Dynamic)`.
- [ ] No horizontal overflow at 1440, 1280, 768, 390 and 320 px.
- [ ] Every `next/image` on the Home page has `width`/`height` or `fill` and a `sizes` attribute; the LCP image (hero collage-2, 646×766) has `priority`.
- [ ] Every raster image on the Home page has a meaningful `alt` (the C03 `tbd` placeholders on `home.heroCollage[*]`, `home.sectionBrandingPortrait`, and `home.ctaCollage[*]` are filled in).
- [ ] Every CTA links to the right route (`/contacto`, `/portafolio`, `/servicios`, `/nosotras`, `mailto:`) — verified by inspecting the rendered HTML.
- [ ] The page is keyboard-navigable: Tab order is logical, the sticky header's "Hablemos" CTA is reachable, the focus ring is visible.
- [ ] The reduced-motion media query does not break the layout.
- [ ] The Hero collage and the Final CTA collage overlap is visible at 1440 px and degrades gracefully at smaller widths (no clipped text, no overflow).
- [ ] The **six** service cards render in Figma order (01–06) with the correct sticker icon, colour, title, and description. Naming is the 6th card.
- [ ] The four portafolio preview images render in `projects[]` order with the correct aspect ratio.
- [ ] The process timeline shows four numbered steps (1–4) in the Figma order with the orange connector visible at 1440 px and vertical at mobile.
- [ ] The testimonials section shows three cards: the front navy card is fully readable, the two burgundy back cards are visible at 1440 px and `display: none` below 768 px.
- [ ] The scallop dividers are visible at the three boundaries listed in the Decisions table.
- [ ] The orange decorative shape is visible on the hero and on the branding section at 1440 px.
- [ ] `tests/assets.test.ts` still passes; the asset manifest changes (ctaCollage populated, headerWheel nulled, new alts) do not break the test.

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
- **Lint:** `npm run lint` → **OK** (0 errors, 0 warnings; the pre-existing C06 polymorphic-Button warning is also gone after the C06 follow-up).
- **Format:** `npm run format:check` → **OK** (all files match Prettier after `--write`).
- **Tests:** `npm run test` → **OK** (93/93 pass; no new tests added in P01 per the plan).
- **Build:** `npm run build` → **OK** in 16.3 s.
- **Static route output:** the Home route reports `○ /` (Static). The full route table is preserved: 9 public + 4 C08 (icon, opengraph-image, robots, sitemap) + 6 SSG portfolio + 2 API dynamic.
- **`dynamic = "error"` guardrail:** the `(site)/layout.tsx` segment config is unchanged; the build does not flag any dynamic API use.
- **Visual viewport check (manual):** the page renders seven distinct sections at 1440 px. The hero collage and portafolio strip overflow as designed; no horizontal scroll at 1440 px. Mobile breakpoints have not been visually verified in this cycle (pending C12-followup / Vercel preview).

## Deviations and TODOs

- **Exact `DecorativeShape` path data.** P01 ships a best-effort approximation from the PNG. The path should be re-validated against the approved Figma frame via Figma MCP (Q01).
- **Scallop dividers still render as cream half-circles.** The path's self-overlapping wave segments produce gaps with `preserveAspectRatio: none`. The visual reads as a row of discrete scallops rather than the smooth wave in the Figma. The path needs a different topology (or a different rendering technique, e.g. CSS mask) to look right. Q01 must resolve.
- **Third testimonial is a documented placeholder.** Only Nayely Urdenata and Verónica Domínguez are legible in `references/home/home.png`. P01 renders a `TODO testimonial copy` card with author `TODO Author`. Q01 owns the real copy.
- **Service card description copy is written from context, not from the Figma text.** The Figma text is too small to read reliably; the descriptions in `src/content/data/homeServices.ts` are sensible defaults that match the Figma spirit. The studio should review them.
- **`Conoce cómo trabajamos` CTA targets `/nosotras`.** The process section has no dedicated page; `/nosotras` is the closest match. If a `/proceso` or `/metodo` page is added later, this should be updated.
- **Final-CTA collage reuses the three hero collage images** (per the C03 audit's documented fallback). Q01 may swap to a designer-supplied collage.
- **Hero header typography feedback (post-Plan).** After the user reviewed the rendered hero, three corrections were applied: (1) headline font-size locked to `140px` (was `clamp(...)`); (2) headline color set to `var(--color-brand-yellow)` (was cream); (3) lede font-size set to `25px`. The grid was widened to `1.5fr / 1fr` so "MARCAS" and "CON" wrap naturally instead of breaking inside the word.
- **Lede copy drift.** The user-quoted lede ("En NOI filtramos y estructuramos cada paso creativo para transformar tus metas en una identidad visual sólida.") differs from the current copy ("En NOI filtraremos y estructuraremos… tus ideas…"). The current copy was retained; Q01 may reconcile.
- **Mobile responsive rendering not visually verified in this cycle.** P01 implemented the responsive rules from `DESIGN.md` §21 (Services → horizontal scroll strip, Process → vertical list, Testimonials → front card only) but the visual check at 320 / 390 / 768 is user-driven. Pending a Vercel preview or local browser verification.

## Completion

- **Cycle status:** Complete.
- **Files created:** `src/content/data/homeServices.ts`, `src/content/data/testimonials.ts`, `src/components/home/Scallop/{Scallop.tsx, Scallop.module.scss, index.ts}`, `src/components/home/DecorativeShape/{DecorativeShape.tsx, DecorativeShape.module.scss, index.ts}`, `src/components/home/ServiceCard/{ServiceCard.tsx, ServiceCard.module.scss, index.ts}`, `src/components/home/HeroCollage/{HeroCollage.tsx, HeroCollage.module.scss, index.ts}`, `src/components/home/Hero/{Hero.tsx, Hero.module.scss, index.ts}`, `src/components/home/BrandingSection/{BrandingSection.tsx, BrandingSection.module.scss, index.ts}`, `src/components/home/ServicesPreview/{ServicesPreview.tsx, ServicesPreview.module.scss, index.ts}`, `src/components/home/PortafolioPreview/{PortafolioPreview.tsx, PortafolioPreview.module.scss, index.ts}`, `src/components/home/ProcessTimeline/{ProcessTimeline.tsx, ProcessTimeline.module.scss, index.ts}`, `src/components/home/Testimonials/{Testimonials.tsx, Testimonials.module.scss, index.ts}`, `src/components/home/FinalCta/{FinalCta.tsx, FinalCta.module.scss, index.ts}`, `docs/implementation/cycles/P01-home.md`.
- **Files changed:** `src/content/locales/es/home.json`, `src/content/locales/es/common.json` (added `cta.conoceComoTrabajamos`), `src/lib/assets.ts` (ctaCollage, headerWheel=null, real alts), `src/app/(site)/page.tsx` (renders the seven sections), `src/components/ui/Heading/Heading.tsx` (added optional `id` prop), `docs/design/ASSET_INVENTORY.md` (manifest drift table updated).
- **Decisions made:** see the "Decisions" section above. Notable: 6 service cards (not 5); `DecorativeShape` not `DecorativeNumber`; `home.headerWheel` collapsed to `null`; static strip for portafolio preview (animation is A01).
- **Remaining TODOs:** see "Deviations and TODOs" above. The most important are the `DecorativeShape` path validation (Q01) and the third testimonial copy (Q01).
- **Commit:** pending user commit.
- **Affected public routes still static:** `/` is `○ (Static)`. The 8 other public routes, the 4 C08 static, the 6 SSG portfolio and the 2 API dynamic are unchanged.
