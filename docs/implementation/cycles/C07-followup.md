# C07-followup — Foundation visual corrections

## Status

Complete (awaiting user commit)

## Objective

Fix the two foundation deviations surfaced by the C08 post-close visual verification: the footer layout (did not match the Figma reference) and the header shadow (too subtle). No page-body work; no asset changes; no new dependencies.

## Inputs

- `docs/implementation/cycles/C07-shared-site-shell.md` (C07) — the cycle that shipped the foundation.
- `docs/implementation/cycles/C08-seo-metadata.md` (C08) — surfaced the post-close visual check.
- `references/home/home.png`, `references/nosotras/nosotras.png`, `references/contact/contacto.png` — Figma-approved footer reference.
- `src/components/layout/Footer/Footer.tsx` + `.module.scss` — current (4-column) layout.
- `src/styles/_tokens.scss` — `--shadow-nav` token (current: `0 0.65rem 1.6rem rgb(0 28 54 / 0.18)`).
- Post-close screenshots captured at 1440px and 375px (in `/tmp/screenshots/`).

## Scope

- **Fix A — Footer layout.** Re-arrange the JSX into three groups that match the Figma reference: top row (brand + newsletter), middle row (contact + studio), bottom row (copyright + legal). Add a top-border separator between the top and middle rows so the layout reads as two distinct rows. The brand logo's `max-width` is bumped from `9rem` to `12rem` to match the reference's brand-mark size.
- **Fix B — Header shadow.** Adjust the `--shadow-nav` token from `0 0.65rem 1.6rem rgb(0 28 54 / 0.18)` to `0 0.5rem 2rem rgb(0 28 54 / 0.25)`. Same `box-shadow` shape (single soft drop), slightly wider blur and slightly darker fill so the pill is visibly separated from any background.
- No new dependencies. No asset moves. No test changes.

## Out of scope

- Implementing Home, Nosotras, Contacto, Servicios, Portafolio (P01–P08).
- Replacing the placeholder OG image and favicon (Q01).
- Final social URLs (Q01).
- Animation (C09).
- Form backends (C10).
- Committing the cycle (per project rule).

## Decisions

- **Cycle approach.** A new C07-followup record rather than re-opening C07. C07 was closed on the basis of token-driven code that compiled; the visual verification happened after. Treating the visual check as a separate cycle keeps the original cycle's intent honest and preserves the audit trail.
- **Footer row order on mobile.** Single column, in the order brand → newsletter → contact → studio → bottom. This matches the visual reading order of the desktop layout and the natural source order of the JSX.
- **Top border between the two rows.** The reference shows a clear visual separation. A thin border at `color-mix(in srgb, var(--color-text-on-dark) 20%, transparent)` matches the bottom-row border style and keeps the CSS token-based.
- **Brand logo `max-width: 12rem`.** Within the `DESIGN.md` range; consistent with the reference proportions at 1440px. Smaller on mobile because the column is full-width and the brand mark scales naturally.
- **Header shadow stays a single `box-shadow`.** No layered shadow (option B2 in the plan). One line of CSS, same visual outcome.
- **`--shadow-nav` change is within the `DESIGN.md` §12 provisional range.** No Figma confirmation needed; the change is small and the visual result matches the reference.

## Expected files

Modified:

- `src/components/layout/Footer/Footer.tsx` — restructured JSX into three groups.
- `src/components/layout/Footer/Footer.module.scss` — `.topRow` + `.middleRow` + `.bottom`; brand logo `max-width: 12rem`; top border between rows.
- `src/styles/_tokens.scss` — `--shadow-nav` value updated.
- `docs/implementation/STATUS.md` — C07-followup entry added.
- `docs/implementation/ROADMAP.md` — C07-followup row added.

Created:

- `docs/implementation/cycles/C07-followup.md` (this file)

Untouched:

- All other components, all other tokens, all other cycles' work, all canonical docs, all assets, all tests.

## Acceptance criteria

- [x] The footer renders as three groups: brand+newsletter, contact+studio, copyright+legal.
- [x] The top row contains a larger brand mark (`max-width: 12rem`) and the newsletter form on the right.
- [x] The middle row contains INFORMACIÓN DE CONTACTO (email + social) and ESTUDIO (3 nav links) separated by a top border.
- [x] The bottom row contains the copyright and the legal links, separated from the middle row by a top border.
- [x] The header shadow is visibly more present than before (wider blur, darker fill).
- [x] All public routes remain static.
- [x] Mobile (375px) view stacks correctly: brand → newsletter → contact → studio → bottom; no horizontal overflow.
- [x] `npm run typecheck` passes.
- [x] `npm run lint` passes (0 errors, 1 pre-existing warning remains).
- [x] `npm run format:check` passes.
- [x] `npm run test` passes (placeholder).
- [x] `npm run build` succeeds.
- [x] `npm run verify` end-to-end passes.

## Verification commands

```bash
npm run typecheck
npm run lint
npm run format:check
npm run test
npm run build
npm run verify
```

## Verification evidence

- `npm run verify` end-to-end OK.
- `npm run build` → 9 public routes static + 6 SSG paths + 2 dynamic API routes + 4 C08 static routes.
- Visual at 1440px: footer rebuilt as 2-row grid matching the Figma reference; header shadow visibly more present.
- Visual at 375px: footer stacks to single column; header collapses to logo + hamburger; no horizontal overflow.

## Deviations and TODOs

- The C08 cycle record's "Build route output" entry did not change (the public routes are still the same set). Only the build's _visual_ output changed (footer structure, header shadow).
- One pre-existing ESLint warning remains in `tests/assets.test.ts:127` (unchanged).

## Completion

- Commit: pending — user commits manually per project rule.
- Completed on: 2026-07-24.
