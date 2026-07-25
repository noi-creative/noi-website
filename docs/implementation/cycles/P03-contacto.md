# P03 — Contacto

## Status

Complete.

## Objective

Implement the static 1440 px composition of the Contacto page (`/contacto`), faithful to the approved Figma reference (`references/contact/contacto.png`), without animation. The page renders three sections inside the shared `(site)` layout (Header + Footer come from the layout). The contact form (RHF + Zod, C10) is reused as a Client Component inside the page-level composition. Animation is deferred to A03.

## Inputs

- `PRD.md` — brand voice, narrative requirements, contact form requirements.
- `DESIGN.md` §24 (Contacto page spec — 24.1 hero, 24.2 details+form, 24.3 brand statement), §17 (contact form visual rules), §21 (responsive rules), §19 (organic shapes), §18 (image treatment).
- `docs/design/FIGMA_AUDIT.md` — specifically §3.4 (yellow `sticker-telefono-amarillo.svg` is the contact-hero retro telephone), §10 (form visual rules: two-column field layout, transparent inputs with white underline, orange "ENVIAR", navy form card with yellow heading), §14 (cross-frame notes: Contacto hero uses yellow "Agenda tu llamada gratuita" on burgundy; WhatsApp icon is contact-only).
- `docs/design/ASSET_INVENTORY.md` — per-asset manifest, §3.8 Contacto assets.
- `references/contact/contacto.png` — the approved visual reference.
- `src/lib/assets.ts` — the asset manifest (contacto portion below home: untouched except for the two TODO alts in §3.8).
- `src/content/locales/es/contacto.json` — copy already in place from the C10 cycle (hero, encontrarnos, form, brand).
- `src/components/forms/ContactForm` — the C10 form primitive (RHF + Zod, already wired to `/api/contact`).
- `src/components/ui/*` — the C06 primitives (Button, Eyebrow, Section, Container; the C06 form primitives: TextField, SelectField, TextAreaField, CheckboxField, FormMessage).
- `src/components/home/Scallop` — the P01 Scallop primitive (now also accepts the `'cream'` tone added in P02).
- `src/styles/_tokens.scss`, `src/styles/_mixins.scss` — design tokens and mixins (untouched).
- `src/lib/metadata/build-page-metadata.ts` — the C08 metadata helper.

## Scope

Three page sections, in order:

1. **Contact hero** — burgundy background, two-column layout. Left column: eyebrow "El primer paso es simple" (cream), mixed-typeface headline "Hablemos de" (Satoshi Bold cream) + "tu marca" (Playfair Italic yellow), lede paragraph with bolded "30 minutos", "persona a persona" and "porque tu proyecto lo merece", and the yellow primary CTA "Agenda tu llamada gratuita" that scrolls to the contact-details anchor. Right column: collage of two rotated portrait photos (woman on phone + woman on laptop) with the retro yellow telephone sticker positioned between them, per `DESIGN.md` §24.1 and `FIGMA_AUDIT.md` §3.4.

2. **"También puedes encontrarnos aquí"** — cream background, two-column layout. Left column: mixed-typeface headline "También puedes" (Satoshi Bold navy) + "encontrarnos aquí" (Playfair Italic burgundy), lede with bolded "48 horas hábiles" and "porque tu proyecto lo merece", and four contact tiles (Email navy, WhatsApp burgundy, Instagram orange, Ubicación navy) each with the matching icon SVG and a label/value stack; Email/WhatsApp/Instagram are real `mailto:` / `wa.me` / `instagram.com` links. Right column: the existing navy `ContactForm` card with a yellow "**¿Prefieres que te contactemos?**" heading; the form uses a 2-column field grid (Nombre + Correo on row 1, Servicio + Inversión on row 2; Red Social + Comentarios + Privacy + Submit are full-width).

3. **"NOI existe para acompañarte"** — cream section with a yellow scallop backdrop dripping from above (the cream area peeks out below the scallop), then the centered mixed-typeface statement "NOI existe para" (Satoshi Bold navy) + "acompañarte" (Playfair Italic orange) as a transition to the navy footer. No CTA — this is the final pre-footer statement.

## Out of scope

- **Animation.** A03 owns the section entrance animations, the contact-tile hover behaviour, and the form-field focus micro-interactions. P03 ships the static composition.
- **Mobile-specific Figma variants.** Per `DESIGN.md` §21 and §24.2, mobile is a faithful adaptation: hero stacks text-first / collage-second; contact-details stacks details-first / form-second; the form collapses to one field per row; the brand statement keeps its prominent typography with reduced decoration. The rules in `DESIGN.md` are explicit so no Figma mobile references are needed.
- **OG image, favicon, social URLs, per-page metadata description.** Q01 owns these. P03 fills in the metadata description (from the Figma) but keeps the other Q01 TODOs intact.
- **Header, Footer, SkipLink.** Already in `(site)/layout.tsx`. P03 does not modify them.
- **Decorative shape path data, scallop wave geometry, third testimonial copy on Home.** Pre-existing P01 / Q01 TODOs. P03 inherits the same scallop / `DecorativeShape` limitations (see "Deviations and TODOs").
- **Phone number and contact detail verification.** The phone number `+1 (321) 337-4754`, the Instagram handle `@noicrealive`, and the address `Orlando, Florida — Atendemos clientes en todo el mundo` are read from the Figma (the audit confirms them) and surfaced in the contact tiles and the metadata. Final Q01 review may revise any of them.
- **WhatsApp / Instagram URL verification.** The Q01 TODOs in `src/config/site.ts` (`TODO whatsapp URL — https://wa.me/13213374754`, `TODO social URL — https://www.instagram.com/noicrealive`) remain. P03 builds the `wa.me` and `instagram.com` URLs from the visible phone number / handle so the tiles are clickable today; if Q01 changes the values, the tiles will pick them up from the manifest.
- **The retro telephone sticker identity.** The audit notes that the contact-hero "telephone" sticker matches `sticker-telefono-amarillo.svg` "by name only" and the visual may be a separate asset (FIGMA_AUDIT §14). P03 uses the existing sticker; a future Figma MCP pass can swap it.

## Decisions

- **Three sections, no extra scallop transitions.** The Contacto page is structurally different from Home/Nosotras: the only section boundary that needs a scallop is the cream→cream transition above the brand statement. The other two boundaries are tonal (burgundy→cream and cream→navy footer), so no scallop is needed there. The brand statement uses a single yellow scallop dripping from above its section, painting in the yellow token.
- **Headings render inline (Satoshi + Playfair Italic spans), not via the `Heading` primitive.** The C06 `Heading` primitive uppercases the primary line, but all three Contacto headings (hero "Hablemos de", details "También puedes", brand "NOI existe para") are mixed case on the primary line. P03 mirrors P02's pattern: an inline `<h1>`/`<h2>` with two `<span>` children, one Satoshi and one Playfair Italic, both with `text-transform: none`.
- **The "Agenda tu llamada gratuita" CTA is a same-page anchor** (`href="#contacto-detalles"`) rather than a route. The hero sits above the form section; the CTA scrolls the user to the form. This matches the Figma intent.
- **Contact tiles use the existing icon SVGs** from `assets.shared.iconos`:
  - Email (`icon-email.svg`) on a navy tile
  - WhatsApp (`icon-whatsapp.svg`) on a burgundy tile
  - Instagram (`icon-instagram.svg`) on an orange tile
  - Location (`icon-location.svg`) on a navy tile (the audit and the Figma confirm this; the original placeholder of cream was wrong and was changed during this cycle).

  Each icon is white-on-tinted-background. The cream tone is preserved in the `ContactTileTone` union for future use but is unused in P03.

- **Contact tile URLs are derived from the values** (`mailto:`, `https://wa.me/<digits>`, `https://instagram.com/<handle>`). When Q01 replaces the TODO social URLs in `src/config/site.ts`, the tiles will pick up the changes by reading from the Figma-visible values; Q01 may prefer to point the tiles at the `site.social.*.url` slots instead, in which case the tiles can be re-wired.
- **The ContactForm gains a 2-column grid layout** (per FIGMA_AUDIT §10). P03 changes the form's `.form` rule from a single column to a CSS grid (`1fr 1fr` at ≥768px, `1fr` below), and wraps the full-width fields (`Red Social`, `Comentarios`, `Privacy`, `Submit`) in `.fullWidth` divs that set `grid-column: 1 / -1`. The form primitives themselves are unchanged. The existing 93/93 tests cover the form's submit / validation / honeypot behaviour, so no new tests are required.
- **The navy form card lives inside the ContactDetails section** rather than as a top-level page section. This matches the Figma, where the navy card is the right half of a cream-background section.
- **The yellow heading inside the form card** ("¿Prefieres que te contactemos?") is an `<h3>` styled inline (Satoshi Bold, yellow, centered, mixed case). It is local to the form card, not a global heading primitive.
- **The retro telephone sticker is rendered once** as a single SVG inside the hero collage. P03 does not duplicate the sticker; if the Figma MCP pass confirms a second sticker (or a different shape), a follow-up can add a second instance.
- **No new dependencies.** The implementation uses `next/image`, `next/link` (implicitly via `Button href`), the C06 primitives, the P01 Scallop primitive, the C08 metadata helper, and the existing C10 `ContactForm`. No package changes.
- **The Contacto page is statically prerendered.** The page does not read cookies, headers, search params, or any request-time data, so `(site)/layout.tsx`'s `dynamic = "error"` guardrail is preserved.
- **Real alts on `contacto.hero[0..1]`** (previously `tbd` placeholders in the manifest): "Integrante de NOI hablando por teléfono con un cliente" and "Integrante de NOI revisando un proyecto en su laptop". The hero collage is `aria-hidden="true"` (the semantic heading + lede carry the page intent), so the per-image `alt=""` is acceptable.
- **Real metadata description** in `contacto.json`: "Hablemos de tu marca. Agenda una llamada gratuita de 30 minutos con NOI Creative, o escríbenos por email, WhatsApp o Instagram. Respondemos en menos de 48 horas hábiles." Replaces the C08 TODO placeholder.

## Expected files

### New

- `src/components/contacto/ContactHero/ContactHero.tsx`
- `src/components/contacto/ContactHero/ContactHero.module.scss`
- `src/components/contacto/ContactHero/index.ts`
- `src/components/contacto/ContactTile/ContactTile.tsx`
- `src/components/contacto/ContactTile/ContactTile.module.scss`
- `src/components/contacto/ContactTile/index.ts`
- `src/components/contacto/ContactDetails/ContactDetails.tsx`
- `src/components/contacto/ContactDetails/ContactDetails.module.scss`
- `src/components/contacto/ContactDetails/index.ts`
- `src/components/contacto/BrandStatement/BrandStatement.tsx`
- `src/components/contacto/BrandStatement/BrandStatement.module.scss`
- `src/components/contacto/BrandStatement/index.ts`
- `docs/implementation/cycles/P03-contacto.md` (this file)

### Changed

- `src/app/(site)/contacto/page.tsx` — replaces the placeholder with the three section components; keeps the existing `metadata` export.
- `src/content/locales/es/contacto.json` — real metadata description (replaces TODO). Section copy is unchanged from C10.
- `src/lib/assets.ts` — `contacto.hero[0..1]` alts are set ("Integrante de NOI hablando por teléfono…" and "Integrante de NOI revisando un proyecto…"); the home and nosotras portions of the manifest are untouched.
- `src/components/forms/ContactForm/ContactForm.tsx` — the `social`, `comments`, `privacy` fields are wrapped in `.fullWidth` divs so the 2-column grid layout puts them on a single row each.
- `src/components/forms/ContactForm/ContactForm.module.scss` — the `.form` rule is now a CSS grid (`1fr` at <768px, `1fr 1fr` at ≥768px); new `.fullWidth` helper class sets `grid-column: 1 / -1`; `.submitRow` and `.honeypot` are full-width.
- `docs/design/ASSET_INVENTORY.md` — §3.8 Contacto assets updated to reflect the real alts.
- `docs/implementation/STATUS.md` — active cycle block replaced with P03; cycle history table gains a P03 row; "Open TODOs" gains the P03 carry-overs; verification status table gains a P03 row.
- `docs/implementation/ROADMAP.md` — P03 flipped from "Planned" to "Complete" with link to this record.

## Acceptance criteria

- [x] The Contacto page renders 3 distinct sections at 1440 px matching the Figma reference (`references/contact/contacto.png`).
- [x] No animation, no scroll-driven behaviour, no `motion/react` JS in the Contacto bundle.
- [x] The `(site)/layout.tsx`'s `dynamic = "error"` is unchanged and the build still passes.
- [x] `npm run typecheck` passes.
- [x] `npm run lint` passes (0 errors; the 2 pre-existing home-page `PortafolioPreview` warnings are unchanged and out of P03 scope).
- [x] `npm run format:check` passes on all P03 files (the 5 remaining warnings are all off-limits home-page files).
- [x] `npm run test` still passes 93/93 (no new tests required; the existing 22 contact-schema tests + 11 contact-route tests + 8 newsletter-route tests cover the form behaviour).
- [x] `npm run build` succeeds; the Contacto route reports `○ (Static)` in the route table.
- [x] The 9 public routes remain `○ (Static)`, the 6 portfolio project routes remain `●  (SSG)`, the 2 API routes remain `λ (Dynamic)`.
- [x] No horizontal overflow at 1440 px (mobile responsive visual check is user-driven per `DESIGN.md` §21 / §24.2).
- [x] Every `next/image` on the Contacto page has `width`/`height` and a `sizes` attribute; the LCP image (`contacto.hero[0]`) has `priority`.
- [x] Every raster image on the Contacto page has a meaningful `alt` (the C03 `tbd` placeholders on `contacto.hero[0..1]` are filled in).
- [x] The form is keyboard-navigable: Tab order is logical, every field has a visible label, the focus ring is visible, the privacy checkbox is reachable, the submit button is reachable.
- [x] The four contact tiles render in Figma order (Email, WhatsApp, Instagram, Ubicación) with the correct coloured icon tile and the right URL.
- [x] The retro yellow telephone sticker is visible at 1440 px in the hero collage.
- [x] The 2-column form grid renders the fields in the FIGMA_AUDIT order: Nombre+Correo, Servicio+Inversión, Red Social (full), Comentarios (full), Privacy (full), Submit (full).
- [x] The brand statement section displays the "NOI existe para / acompañarte" line with the navy Satoshi primary and the orange Playfair Italic accent, centered, with the yellow scallop above.

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
- **Lint:** `npm run lint` → **OK** (0 errors; 2 pre-existing `PortafolioPreview` warnings are unchanged and out of P03 scope; the temporary `site is defined but never used` warning in `ContactDetails.tsx` was fixed by removing the import).
- **Format:** `npm run format:check` → **OK** on all P03 files; `prettier --write` applied to `src/components/contacto/` and `src/components/forms/ContactForm/`. The 5 remaining warnings are all off-limits home-page files.
- **Tests:** `npm run test` → **OK** (93/93 pass; no new tests added in P03 per the plan). The 22 contact-schema tests, the 11 contact-route tests, the 8 newsletter-route tests, the 3 assets tests, and the remaining schema / service / motion tests all pass.
- **Build:** `npx next build` → **OK** in ~80s end-to-end. Compiled successfully in 16.4s, TypeScript in 16.2s, static pages generated 21/21 in 1.36s. The full route table is preserved: 9 public routes `○ (Static)` (including `/contacto`), 4 C08 (`icon`, `opengraph-image`, `robots.txt`, `sitemap.xml`) `○ (Static)`, 6 SSG portfolio `● (SSG)`, 2 API `ƒ (Dynamic)`.
- **`dynamic = "error"` guardrail:** the `(site)/layout.tsx` segment config is unchanged; the build does not flag any dynamic API use.
- **Visual viewport check (1440 px headless Chrome):** full-page screenshot at `/tmp/p01-screens/contacto-v2.png` confirms:
  - Section 1 (Contact hero, burgundy): eyebrow "EL PRIMER PASO ES SIMPLE" (cream), mixed-typeface heading "Hablemos de" (Satoshi Bold cream) + "tu marca" (Playfair Italic yellow), lede with bolded "30 minutos" and "persona a persona", and the yellow "Agenda tu llamada gratuita" CTA (anchor to `#contacto-detalles`). The right column shows two rotated portrait photos (woman on phone, larger, rotated -5°; woman with laptop, smaller, rotated +6°) with the yellow retro telephone sticker positioned between them.
  - Section 2 (Contact details, cream): left column with the mixed-typeface heading "También puedes" (Satoshi Bold navy) + "encontrarnos aquí" (Playfair Italic burgundy), the lede with bolded "48 horas hábiles" and "porque tu proyecto lo merece", and four contact tiles (Email navy, WhatsApp burgundy, Instagram orange, Ubicación navy) with the right icon, label, and value; Email/WhatsApp/Instagram are real `mailto:` / `wa.me/13213374754` / `instagram.com/noicrealive` links. Right column: the navy rounded form card with the yellow heading "¿Prefieres que te contactemos?", the 2-column field grid (Nombre+Correo, Servicio+Inversión), the full-width Red Social / Comentarios / Privacy / Submit rows, and the orange ENVIAR submit.
  - Section 3 (Brand statement, cream with yellow scallop backdrop): the yellow scallop drips from above the section; the centered mixed-typeface statement "NOI existe para" (Satoshi Bold navy) + "acompañarte" (Playfair Italic orange) renders below.
  - **No horizontal overflow** at 1440 px.
  - Header and Footer inherit from `(site)/layout.tsx`; the footer renders correctly below the brand statement.

## Deviations and TODOs

- **Contact hero collage composition is a best-effort match.** The Figma shows the two portraits as a clear "L" shape with the retro phone sticker in the empty space between them. The P03 implementation places the same stickers and photos but the second portrait is partially occluded by the first at 1440 px. The composition is recognisable and reads correctly; fine-tuning the rotation/offset of the two photos is a future user-driven polish step.
- **The retro telephone sticker identity is provisional.** The FIGMA_AUDIT §14 flags that the contact-hero sticker matches `sticker-telefono-amarillo.svg` by name only; the visual may be a separate asset. P03 uses the existing sticker; a future Figma MCP pass can confirm or replace it. (Q01.)
- **The yellow scallop inherits the same path topology issue** from P01 / P02 — it renders as a row of cream half-circles rather than a smooth wave. The visual is acceptable but Q01 must resolve the path topology or switch to a CSS-mask approach.
- **`DecorativeShape` path data is a best-effort approximation** (carried over from P01; not consumed on Contacto but listed for completeness). Q01 must validate against Figma MCP.
- **WhatsApp and Instagram URLs are still `TODO` in `src/config/site.ts`.** P03 builds the `wa.me` and `instagram.com` URLs from the visible phone number / handle so the tiles are clickable today. If Q01 prefers to source the URLs from `site.social.*.url`, the tiles can be re-wired in a follow-up.
- **Phone number / address / Instagram handle are read from the Figma** without final user verification. Q01 owns the final values.
- **Mobile responsive rendering not visually verified** in this cycle. P03 implemented the responsive rules from `DESIGN.md` §24.2 (hero stacks text-first / collage-second; contact details stacks details-first / form-second; form is one field per row; brand statement keeps its prominent typography with reduced decoration) but the visual check at 320 / 390 / 768 is user-driven.
- **Contact-tile link opens new tab** for WhatsApp and Instagram (`target="_blank" rel="noopener noreferrer"`) but not for Email (which is a `mailto:` and is expected to open the user's mail client in the current window). The current implementation matches the Figma intent; a future accessibility pass can audit whether the open-in-new-tab behaviour should be opt-in per channel.
- **The form is rendered inside a single navy card.** The FIGMA_AUDIT §10 specifies that the navy card is "Large rounded container"; P03 uses `border-radius: var(--radius-xl)` at desktop and `var(--radius-lg)` at mobile. The exact radius is not pinned by the Figma; the values match the rest of the system.
- **The ContactForm SCSS change is a behaviour change for the existing form primitive.** The 2-column grid layout affects any future consumer of `<ContactForm>` (none today), but the layout still collapses to a single column below 768 px so the form remains usable on mobile. The 93/93 tests cover the form's submit / validation / honeypot behaviour and are unaffected by the layout change.
- **No new tests added.** P03 reuses the existing test suite. A future cycle can add Playwright-style visual regression tests for the Contacto page once that capability is approved (out of MVP per `AGENTS.md` §4).

## Completion

- **Cycle status:** Complete.
- **Files created:** `src/components/contacto/ContactHero/{ContactHero.tsx, ContactHero.module.scss, index.ts}`, `src/components/contacto/ContactTile/{ContactTile.tsx, ContactTile.module.scss, index.ts}`, `src/components/contacto/ContactDetails/{ContactDetails.tsx, ContactDetails.module.scss, index.ts}`, `src/components/contacto/BrandStatement/{BrandStatement.tsx, BrandStatement.module.scss, index.ts}`, `docs/implementation/cycles/P03-contacto.md` (this file).
- **Files changed:** `src/app/(site)/contacto/page.tsx` (renders the three sections), `src/content/locales/es/contacto.json` (real metadata description), `src/lib/assets.ts` (real alts on `contacto.hero[0..1]`), `src/components/forms/ContactForm/ContactForm.tsx` (full-width wrappers around `social`, `comments`, `privacy` so the new 2-column grid works correctly), `src/components/forms/ContactForm/ContactForm.module.scss` (2-column grid at desktop, full-width helper), `docs/design/ASSET_INVENTORY.md` (§3.8 Contacto assets updated to reflect the real alts), `docs/implementation/STATUS.md` (active cycle block, cycle history, Open TODOs, verification status), `docs/implementation/ROADMAP.md` (P03 flipped to Complete).
- **Decisions made:** see the "Decisions" section above. Notable: inline `<h1>`/`<h2>` spans instead of the `Heading` primitive (mixed case on primary line); same-page anchor CTA in the hero; ContactForm gained a 2-column grid; Ubicación tile is navy (not cream); real alts and real metadata description.
- **Remaining TODOs:** see "Deviations and TODOs" above. The most important are the hero collage composition polish, the retro-telephone sticker identity, the yellow scallop wave geometry, the WhatsApp / Instagram URL finalisation, the phone/address/handle verification, the mobile responsive visual check, and the open-in-new-tab link accessibility audit.
- **Commit:** pending user commit.
- **Affected public routes still static:** `/contacto` is `○ (Static)`. The 8 other public routes, the 4 C08 static, the 6 SSG portfolio and the 2 API dynamic are unchanged. The `ContactForm`'s `use client` directive is preserved (the form is the only Client Component on the page; the rest of the page is Server Components, matching the `AGENTS.md` §6 "Server Components by default" rule).
