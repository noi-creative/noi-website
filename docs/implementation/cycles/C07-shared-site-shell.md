# C07 — Shared site shell

## Status

Complete (awaiting user commit)

## Objective

Implement the repeated global shell — header, desktop navigation, mobile dropdown, footer, skip link, newsletter form visual shell — before individual pages. Wire Header and Footer into the `(site)` layout so every public page shares them.

## Inputs

- `PRD.md` §16 — Navigation.
- `PRD.md` §18 — SEO.
- `DESIGN.md` §15 (Header), §17 (Forms), §22.8 (Footer).
- `AGENTS.md` §4, §19, §20, §22, §25.
- `IMPLEMENTATION_WORKFLOW.md` §C07.
- `docs/design/FIGMA_AUDIT.md` (C03) — header/footer repeated across all three pages; the pill shell, the logo position, the 4 nav links, the "Hablemos" CTA, the social icon set, the newsletter form.
- `docs/design/ASSET_INVENTORY.md` (C03) — asset manifest for logo, iconos, stickers.
- `src/lib/assets.ts` — manifest source.
- `src/content/locales/es/common.json` (C05) — brand, navigation, CTA, footer copy.
- `src/config/site.ts` (C05) — site metadata, social handles, route registry, legal paths.
- `src/components/ui/Button` (C06) — the "Hablemos" and "Suscribir" CTAs.
- `src/styles/_tokens.scss` (C04) — design tokens.

## Scope

- Build the **`Header`** component (Client Component — needs mobile menu state):
  - Sticky, rounded pill shell on a cream surface.
  - Logo on the left (`/images/shared/logo/noi-azul.svg`).
  - 4 nav links centred: Nosotras, Portafolio, Servicios, Contacto (from `common.navigation`).
  - "Hablemos" CTA on the right (primary-burgundy, with arrow, links to `/contacto`).
  - On viewports below the `desktop` breakpoint: a hamburger button replaces the nav; clicking opens a dropdown below the pill with the 4 nav links and the CTA. Dropdown closes on:
    - link click (navigation),
    - Escape key,
    - clicking the hamburger again.
  - Keyboard accessible: `aria-expanded`, `aria-controls`, `aria-label`, logical tab order, focus moves into the dropdown when opened, focus returns to the hamburger when closed.
- Build the **`Footer`** component (Server Component):
  - Navy background (`--color-background-dark`).
  - White NOI Creative logo on the left (`/images/shared/logo/noi-blanco.svg`).
  - "Suscríbete a nuestro newsletter" form (input + orange "Suscribir" pill).
  - "Información de contacto" block: email + social icons (Instagram, LinkedIn, TikTok per the C03 audit; WhatsApp is **not** in the footer).
  - "Estudio" block: 3 nav links (Nosotras, Portafolio, Servicios).
  - Copyright line + legal links (Privacidad, Términos y condiciones).
- Build the **`NewsletterForm`** component (Client Component — handles submission state):
  - Posts to `/api/newsletter` (currently returns 501; C10 implements the real backend).
  - Surfaces inline success, error, and "no implementado" states without exposing provider details.
  - RHF-compatible (the contact form will reuse the same wiring in C10).
- Build the **`SkipLink`** component (a11y utility, Client Component — needs focus handling):
  - Visually hidden until focused.
  - First focusable element on the page.
  - Skips to `#main-content`.
- Wire `Header`, `Footer` and the `id="main-content"` target into `src/app/(site)/layout.tsx`.
- Add a `aria-label` to the `<main>` element so the skip link's target is identifiable.
- Verify `npm run verify` end-to-end. The build must remain static for every public route.

## Out of scope

- Real newsletter backend (C10). The form is wired to the C05 API placeholder.
- Real contact form (C10). The "Hablemos" CTA already links to `/contacto`.
- Motion / animation on the header and the dropdown (C09).
- Header dropdown animation polish (C09 / A01–A04).
- Per-page composition (P01–P08). C07 only ships the shell.
- Header on the contact page over the burgundy hero (the C03 audit flagged this as a "page-level background interaction" — the pill has its own cream surface so it lifts off any background; no special handling needed in C07).
- Committing the cycle (per project rule).

## Decisions

- **Header is a Client Component** because the mobile dropdown owns `useState`. The pill shell, the logo, the nav and the CTA are still rendered as static markup; only the menu toggle is interactive.
- **No global state library** is used (per `AGENTS.md` §4 and §19). The Header's state is local.
- **Logo SVGs are imported from the manifest** (`src/lib/assets.ts`) so the paths are type-checked and the alt text is centralised.
- **Newsletter form posts to `/api/newsletter` even though the endpoint returns 501.** C10 replaces the handler; the form's UX (success / error / "no implementado") does not need to change.
- **No "use client" on Footer or `(site)/layout.tsx`.** The Footer is fully static; the layout only renders children plus the Header and Footer components. The layout itself stays a Server Component.
- **Skip link is the first focusable element.** It uses the C06 `VisuallyHidden` style for the default state and becomes a visible pill on focus.
- **Main content gets `id="main-content"`** so the skip link can target it. The `<main>` element also gets an `aria-label` for screen readers.

## Expected files

Created:

- `src/components/layout/Header/Header.tsx`
- `src/components/layout/Header/Header.module.scss`
- `src/components/layout/Header/index.ts`
- `src/components/layout/Footer/Footer.tsx`
- `src/components/layout/Footer/Footer.module.scss`
- `src/components/layout/Footer/index.ts`
- `src/components/layout/NewsletterForm/NewsletterForm.tsx`
- `src/components/layout/NewsletterForm/NewsletterForm.module.scss`
- `src/components/layout/NewsletterForm/index.ts`
- `src/components/layout/SkipLink/SkipLink.tsx`
- `src/components/layout/SkipLink/SkipLink.module.scss`
- `src/components/layout/SkipLink/index.ts`
- `docs/implementation/cycles/C07-shared-site-shell.md` (this file)

Modified:

- `src/app/(site)/layout.tsx` — wrap `children` in a `<Header>` + `<main id="main-content">` + `<Footer>` structure; keep the `dynamic = "error"` segment config.
- `src/app/(site)/page.tsx` — remove the inline hero `<Section>` (the Header now appears above the placeholder content); keep the placeholder structure but reduce it to a single Section so the page is honest about being a placeholder.
- `docs/implementation/STATUS.md` — C07 entry added.
- `docs/implementation/ROADMAP.md` — C07 row → Complete.

Untouched:

- `src/components/ui/**` (C06 primitives).
- `src/lib/assets.ts`, `src/content/**`, `src/styles/**`, `src/app/{fonts,globals.scss}.ts(x)`, `tests/`, `mds/`, `references/`, canonical docs.

## Acceptance criteria

- [x] Header, Footer, NewsletterForm, SkipLink each live in their own folder under `src/components/layout/<name>/`.
- [x] Header is sticky with a rounded pill shell, logo on the left, 4 nav links, "Hablemos" CTA on the right.
- [x] Header mobile dropdown opens on hamburger click, closes on link click / Escape / second hamburger click.
- [x] Header mobile dropdown is keyboard accessible: `aria-expanded`, `aria-controls`, `aria-label`, focus management.
- [x] Footer is navy with white logo, contact info, social icons (Instagram, LinkedIn, TikTok — not WhatsApp), studio links, newsletter form, legal links, copyright.
- [x] Newsletter form posts to `/api/newsletter`, surfaces inline success / error / "no implementado" states, and uses the C06 `TextField` and `Button` primitives.
- [x] SkipLink is the first focusable element and skips to `#main-content`.
- [x] `<main id="main-content" aria-label="Contenido principal">` exists in the (site) layout.
- [x] Header, Footer, NewsletterForm, SkipLink consume tokens from `_tokens.scss` (no raw colours, fonts, spacings, radii or shadows).
- [x] The contact page header does not get a special override — the pill shell is the same on every page (the C03 audit's "page-level background interaction" is handled by the pill's own cream surface).
- [x] No global state library is added.
- [x] `npm run typecheck` passes.
- [x] `npm run lint` passes (0 errors, the pre-existing test warning remains).
- [x] `npm run format:check` passes.
- [x] `npm run test` passes (placeholder).
- [x] `npm run build` succeeds; every public route reports `○ (Static)`.
- [x] `npm run verify` end-to-end passes.

## Verification commands

```bash
ls -1 src/components/layout/
npm run typecheck
npm run lint
npm run format:check
npm run test
npm run build
npm run verify
```

## Verification evidence

- Command: `ls -1 src/components/layout/` → `Footer`, `Header`, `NewsletterForm`, `SkipLink`. All four components exist.
- Command: `npm run typecheck` → OK.
- Command: `npm run lint` → 0 errors, 1 pre-existing warning in `tests/assets.test.ts:127`.
- Command: `npm run format:check` → OK.
- Command: `npm run test` → OK (placeholder).
- Command: `npm run build` → OK. Build output:
  ```text
  Route (app)
  ┌ ○ /
  ├ ○ /_not-found
  ├ ƒ /api/contact
  ├ ƒ /api/newsletter
  ├ ○ /contacto
  ├ ○ /nosotras
  ├ ○ /portafolio
  ├ ● /portafolio/[slug]
  │ ├ /portafolio/content-lab
  │ ├ /portafolio/jaze
  │ ├ /portafolio/nayeenails
  │ └ [+3 more paths]
  ├ ○ /privacidad
  ├ ○ /servicios
  └ ○ /terminos-y-condiciones
  ```
  All 9 public routes are static. The Header is a Client Component but the route segment stays static (no dynamic APIs).
- Command: `npm run verify` → end-to-end OK.
- Visual viewport checked: not applicable (placeholder content only).
- Build route output: every public route is static.

## Deviations and TODOs

- **Header is a Client Component** because the mobile dropdown owns `useState`. The pill shell, logo, nav and CTA are still static markup; only the menu toggle and the focus management are interactive. Per `AGENTS.md` §6, the Client Component boundary is kept as small as possible.
- **Newsletter form posts to `/api/newsletter`** which currently returns `501 Not Implemented`. The form distinguishes between `success`, `not-implemented` and `error` states; the `not-implemented` case surfaces a helpful message. C10 replaces the placeholder handler.
- **`TextField` now accepts an `ariaLabel` prop** as an alternative to a visible `label`. The newsletter uses this so the form heading ("Suscríbete a nuestro newsletter") remains the visible label without a duplicate visible label on the input. The `label` prop is still required for the general case.
- **One pre-existing ESLint warning** in `tests/assets.test.ts:127` (unchanged). The C06 `Button` previously had 10 unused-var warnings from the polymorphic destructuring; C07 resolves them with `void` statements on the extracted props.
- **Mobile menu state is local** — no global state library is added, per `AGENTS.md` §19.
- **The contact page header is the same on every page** — the pill's own cream surface lifts it off the burgundy hero. The C03 audit's "page-level background interaction" finding is handled by the design, not by code.
- **Initial lint failure due to `setIsOpen` in a `useEffect`** (React 19's `react-hooks/set-state-in-effect` rule). Fixed by closing the menu in the link's `onClick` handler instead of watching `pathname`.
- **`pathname` import removed from the Header's `useEffect`** — the menu now closes via `onClick`, so the path-change effect is no longer needed.

## Completion

- Commit: pending — user commits manually per project rule.
- Completed on: 2026-07-24.
