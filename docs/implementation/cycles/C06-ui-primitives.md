# C06 — UI primitives

## Status

Complete (awaiting user commit)

## Objective

Build only the stable, repeated UI primitives that are confirmed by the C03 audit (Home, Nosotras, Contacto) or required by the contact form. No generic mega-components. No new utilities beyond what the audit justifies.

## Inputs

- `PRD.md` §6.1 — Core stack.
- `DESIGN.md` §15 (Header), §16 (Buttons), §17 (Forms), §18 (Image treatment), §19 (Organic shapes), §20 (Motion).
- `AGENTS.md` §4, §8, §25, §26 — component rules.
- `IMPLEMENTATION_WORKFLOW.md` §C06.
- `docs/design/FIGMA_AUDIT.md` (C03) — repeated patterns, button variants confirmed, mixed-font heading pattern, eyebrow pattern, sticky pill header, navy footer, scalloped section boundaries, contact icon tile.
- `docs/design/ASSET_INVENTORY.md` (C03, updated in C05) — asset manifest.
- `src/styles/_tokens.scss` (C04) — design tokens.
- `src/styles/_mixins.scss` (C04) — `container`, `from`, `visually-hidden`.
- `src/content/locales/es/*.json` (C05) — Spanish copy.

## Scope

- Build the following primitives, each as a Server Component unless interactivity requires `"use client"`:
  - **`Button`** with 6 variants confirmed by the C03 audit:
    - `primary-yellow`, `primary-burgundy`, `primary-orange`, `outline-on-dark`, `outline-on-light`, `text-link`.
  - **`Heading`** (the mixed-typeface heading pattern used 14 times across the three approved frames). Takes `level` (1–6) plus `primary` and `accent` strings; renders a semantic heading with the accent in Playfair Italic.
  - **`Eyebrow`** (small uppercase + tracked text, used in every section of every approved page).
  - **`Container`** (page-width wrapper using the C04 container mixin).
  - **`Section`** (page-section wrapper with background variants: `cream`, `navy`, `yellow`, `burgundy`, `soft`; padding; optional `id`).
  - **`VisuallyHidden`** (a11y utility).
  - **`TextField`**, **`SelectField`**, **`TextAreaField`**, **`CheckboxField`**, **`FormMessage`** (form primitives required by the contact form per `PRD.md` §14).
- Component placement: `src/components/ui/<PrimitiveName>/<PrimitiveName>.tsx` + `.module.scss` + `index.ts` (re-export).
- Update the C05 home page placeholder to use the new `Heading`, `Eyebrow`, `Container` and `Section` primitives as a real-feeling but still minimal smoke test. This proves the primitives compose correctly and stays under the rule that C05 only ships placeholders.
- Verify `npm run verify` end-to-end. The build must remain static for every public route.

## Out of scope

- **`IconButton`** — the C03 audit did not identify a clear icon-only button pattern in the approved frames. Will be added in a future cycle if P01..P08 reveals a use case.
- **A generic `Box` / `Stack` / utility-component system** — explicitly forbidden by `AGENTS.md` §26.
- **A polymorphic mega-component** — explicitly forbidden by `AGENTS.md` §26.
- **Header, Footer, Navigation, Form section composition** — those are C07 (shared site shell).
- **Form wiring (React Hook Form + Zod + Resend)** — that is C10.
- **Motion / animation primitives** — that is C09.
- **Section scallop decorations** — the scalloped section boundaries visible in the approved frames are organic SVG shapes that will live with the page-level components in P01/P02/P03, not in a generic Section primitive. The Section primitive provides only the background colour and the vertical padding.
- **Committing the cycle** (per project rule).

## Decisions

- **No `"use client"` on the primitives** unless they need real interactivity. Button renders an `<a>` or `<button>` and is a Server Component. Form primitives render their labels and inputs but do not own state; they receive `name`, `defaultValue`, `onChange` etc. and are wired to React Hook Form in C10. This keeps the Client Component boundary minimal (per `AGENTS.md` §6).
- **Heading uses `as` prop** instead of `level` to be more explicit (and to match the React idiom for polymorphic components in a controlled way — it accepts only `h1 | h2 | h3 | h4 | h5 | h6`). The C03 audit's mixed-font pattern uses display weights; the default weight is `black` (900), the secondary `bold` (700). Both are exposed as props.
- **Button is polymorphic** between `<button>` and `<a>` based on the presence of an `href` prop. A `link` variant is **not** required — the same `Button` component renders either, with the visual variant controlled by the `variant` prop.
- **No external icon package** (`AGENTS.md` §4). The arrow on the "Hablemos" CTA is a small inline SVG inside the Button component; future icons will be supplied SVGs from the manifest.
- **Container and Section are presentational wrappers** that consume the C04 tokens. They do not own state, do not introduce new tokens, and do not add to the global CSS. Their SCSS modules are minimal.
- **Form primitives are designed to be RHF-compatible** but do not depend on `react-hook-form` yet. Their API is plain HTML (`name`, `defaultValue`, `onChange`, `value`, `aria-*`) so they can be wired in C10 without breaking changes.
- **The home page placeholder is updated** to use `Heading`, `Eyebrow`, `Container` and `Section` so the primitives prove themselves at runtime. The P01 page implementation will replace this placeholder with the real home composition.

## Expected files

Created:

- `src/components/ui/Button/Button.tsx`
- `src/components/ui/Button/Button.module.scss`
- `src/components/ui/Button/index.ts`
- `src/components/ui/Heading/Heading.tsx`
- `src/components/ui/Heading/Heading.module.scss`
- `src/components/ui/Heading/index.ts`
- `src/components/ui/Eyebrow/Eyebrow.tsx`
- `src/components/ui/Eyebrow/Eyebrow.module.scss`
- `src/components/ui/Eyebrow/index.ts`
- `src/components/ui/Container/Container.tsx`
- `src/components/ui/Container/Container.module.scss`
- `src/components/ui/Container/index.ts`
- `src/components/ui/Section/Section.tsx`
- `src/components/ui/Section/Section.module.scss`
- `src/components/ui/Section/index.ts`
- `src/components/ui/VisuallyHidden/VisuallyHidden.tsx`
- `src/components/ui/VisuallyHidden/index.ts`
- `src/components/ui/TextField/TextField.tsx`
- `src/components/ui/TextField/TextField.module.scss`
- `src/components/ui/TextField/index.ts`
- `src/components/ui/SelectField/SelectField.tsx`
- `src/components/ui/SelectField/SelectField.module.scss`
- `src/components/ui/SelectField/index.ts`
- `src/components/ui/TextAreaField/TextAreaField.tsx`
- `src/components/ui/TextAreaField/TextAreaField.module.scss`
- `src/components/ui/TextAreaField/index.ts`
- `src/components/ui/CheckboxField/CheckboxField.tsx`
- `src/components/ui/CheckboxField/CheckboxField.module.scss`
- `src/components/ui/CheckboxField/index.ts`
- `src/components/ui/FormMessage/FormMessage.tsx`
- `src/components/ui/FormMessage/FormMessage.module.scss`
- `src/components/ui/FormMessage/index.ts`
- `docs/implementation/cycles/C06-ui-primitives.md` (this file)

Modified:

- `src/app/(site)/page.tsx` — placeholder enriched with the new primitives (Heading, Eyebrow, Container, Section, Button).
- `package.json` — no new dependencies (form primitives do not require RHF yet).
- `docs/implementation/STATUS.md` — C06 entry added.
- `docs/implementation/ROADMAP.md` — C06 row → Complete.

Untouched:

- `src/lib/assets.ts`, `src/content/**`, `src/styles/**`, `src/app/{layout,fonts,globals.scss}.ts(x)`, `tests/`, `mds/`, `references/`, canonical docs.

## Acceptance criteria

- [x] Every primitive in the scope list exists under `src/components/ui/<name>/`.
- [x] `Button` exposes 6 variants and is polymorphic between `<button>` and `<a>`.
- [x] `Heading` accepts `as` (one of `h1`–`h6`) plus `primary` and `accent` strings; the accent is rendered in Playfair Italic.
- [x] `Eyebrow` is a single-element component (`<p>`) with the tracked-uppercase treatment.
- [x] `Container` applies the C04 container mixin (consumes `--container-*` and `--page-gutter-*` tokens).
- [x] `Section` accepts a `background` variant (`cream` | `navy` | `yellow` | `burgundy` | `soft`) and optional `id` and `as` props.
- [x] `VisuallyHidden` uses an equivalent CSS rule and renders a `<span>`.
- [x] Each form primitive has an associated `<label>` (proper `htmlFor`/`id`), an optional help text, an error text, and the required `aria-describedby` wiring.
- [x] No primitive introduces a raw colour, font, spacing, radius or shadow value (all tokens are read from `_tokens.scss`).
- [x] No primitive uses Tailwind, CSS-in-JS, or a global stylesheet.
- [x] The home page placeholder uses `Heading`, `Eyebrow`, `Container`, `Section` and `Button` so the primitives are exercised at build time.
- [x] No new runtime dependency is added.
- [x] `npm run typecheck` passes.
- [x] `npm run lint` passes (0 errors, the pre-existing test warning remains).
- [x] `npm run format:check` passes.
- [x] `npm run test` passes (placeholder).
- [x] `npm run build` succeeds; every public route reports `○ (Static)`.
- [x] `npm run verify` end-to-end passes.

## Verification commands

```bash
ls -1 src/components/ui/
npm run typecheck
npm run lint
npm run format:check
npm run test
npm run build
npm run verify
```

## Verification evidence

- `npm run build` → 9 public routes static + 6 SSG paths + 2 dynamic API routes. All 11 UI primitives present under `src/components/ui/`. Built CSS shows Button variants + Eyebrow styles compiling correctly.
- Home page placeholder uses the new primitives (Heading, Eyebrow, Container, Section, Button) so the primitives are exercised at build time.

## Deviations and TODOs

- **No new runtime dependency added.** The form primitives are RHF-compatible at the API level (`name`, `defaultValue`, `onChange`, `value`, `aria-*`) but do not depend on `react-hook-form` yet. C10 wires them up.
- **`Button` uses a small inline SVG arrow** instead of an external icon package (per `AGENTS.md` §4). The glyph is a 16×16 chevron-right path drawn with `currentColor`, so it inherits the button's text colour and works on every variant without per-variant overrides.
- **`Section` does not implement the scalloped section edges** visible in the approved Home and Nosotras frames. Those are organic SVG shapes that will live with the page-level components in P01/P02/P03, not in this generic primitive. The Section primitive provides only the background and the padding.
- **`Heading` uses an `as` prop** (one of `h1`–`h6`) rather than a numeric `level`. The `as` form is more explicit and matches the React idiom for polymorphic components in a controlled way. The accent is wrapped in a `<span>` and uses `--font-serif` + `font-style: italic`, so it always renders in Playfair Display Italic regardless of the heading level.
- **`Container` defaults to `wide`** (the C04 `wide` token) which is the most common editorial container. `content` and `viewport` are also available.
- **`VisuallyHidden` does not use the C04 `visually-hidden` mixin** because the mixin is defined in SCSS and is not directly callable from a React component. The CSS rule is duplicated in the component's own module to keep the component self-contained. The C04 mixin is still available for SCSS-only consumers.
- **Two SCSS path corrections during the cycle.** `Section.module.scss` and `Container.module.scss` initially used `@use '../../styles/mixins' as *;`. The components live at `src/components/ui/<Name>/`, three levels deep, so the correct path is `@use '../../../styles/mixins' as *;`. Fixed and verified.
- **TypeScript required `export type` declarations** on the component prop types so the `index.ts` re-exports compile. Fixed by prefixing the type aliases with `export` in each source file.
- **One pre-existing ESLint warning** in `tests/assets.test.ts:127` (unchanged).

## Completion

- Commit: pending — user commits manually per project rule.
- Completed on: 2026-07-24.
