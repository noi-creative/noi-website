# C05 — Static architecture and content foundation

## Status

Complete (awaiting user commit)

## Objective

Create the App Router route organisation, the content contracts (JSON/TS/MD), the site configuration, the legal-page Markdown renderer and the static-render guardrail — without inventing any page composition or marketing copy.

## Inputs

- `PRD.md` §6.1 — Core stack.
- `PRD.md` §6.2 — Static rendering rule.
- `PRD.md` §7 — Recommended project structure.
- `PRD.md` §8 — Content architecture.
- `DESIGN.md` (full) — design tokens already wired in C04.
- `AGENTS.md` §5 — Rendering rules.
- `AGENTS.md` §6 — Server and Client Components.
- `AGENTS.md` §15 — Content structure.
- `IMPLEMENTATION_WORKFLOW.md` §C05.
- `docs/design/FIGMA_AUDIT.md` and `docs/design/ASSET_INVENTORY.md` (C03) — visual system and asset baseline.
- Pre-existing `mds/cookie-policy.md`, `mds/privacy-policy.md`, `mds/terms-conditions.md` — legal content to be moved to `src/content/legal/`.
- Pre-existing `src/lib/assets.ts` and `src/app/{page,page.module.scss,layout,fonts,globals.scss}` (C04).

## Scope

- Install `react-markdown` as a runtime dependency. `remark-gfm` only if the legal Markdown needs GFM features; the supplied legal content is plain Markdown so the default install is enough.
- Reorganise the App Router under `src/app/`:
  - Move `src/app/page.tsx` and `src/app/page.module.scss` into `src/app/(site)/`. The URL stays `/`.
  - Create `src/app/(site)/layout.tsx` with the `dynamic = "error"` static-render guardrail.
  - Create placeholder pages for every public route: `nosotras`, `contacto`, `servicios`, `portafolio`, `portafolio/[slug]`, `privacidad`, `terminos-y-condiciones`. Placeholders render a small `<h1>` with the page title and explicitly mark themselves as "P0X pending".
  - Create `src/app/api/contact/route.ts` and `src/app/api/newsletter/route.ts` as empty Route Handlers (returning `501 Not Implemented` for now; C10 implements the real backend). These live outside the `(site)` group so the static guardrail does not apply to them.
- Move legal content from `mds/` to `src/content/legal/`:
  - `mds/privacy-policy.md` → `src/content/legal/privacidad.md`
  - `mds/terms-conditions.md` → `src/content/legal/terminos-y-condiciones.md`
  - `mds/cookie-policy.md` stays in `mds/` because the PRD defers the cookie banner; Q01 will decide whether to keep, delete or wire it up.
  - Remove the now-empty `mds/` directory.
- Create the content tree:
  - `src/content/locales/es/{common,home,nosotras,contacto,servicios,portafolio}.json` — minimal Spanish copy (page titles, eyebrows, brand label, "Hablemos" CTA, navigation labels, legal-page link labels). Copy is taken from the references and from the visible-by-default text in the three approved frames; nothing is invented.
  - `src/content/data/projects.ts` — `projects` array derived from `src/lib/assets.ts` plus a `generateStaticParams` helper that returns the list of slugs.
  - `src/content/data/services.ts` — `services` array with the four service identifiers approved by the PRD (`Diseño web`, `Ecommerce`, `Naming`, `Diseño gráfico`).
  - `src/content/data/team.ts` — `team` array with the three Nosotras team members (Daniela, María Patricia, Carla) and the missing-portrait TODO for Carla.
- Create `src/config/site.ts` with the brand metadata the PRD already fixed:
  - `brand`, `defaultTitle`, `siteUrl`, `defaultDescription` (TODO), `contactEmail`, `primaryMarket`, `routeRegistry`, `social` (with explicit TODO for the unverified social URLs), `legal` (links to `/privacidad` and `/terminos-y-condiciones`).
- Implement the two legal pages (`/privacidad`, `/terminos-y-condiciones`) using a tiny server-side Markdown renderer. The renderer is a Server Component; no client JS. Raw HTML is **not** rendered.
- Reduce the dev-only fixture on `/` to a minimal placeholder that reads the new `home.json` and `common.json`. C05 honours the static guardrail; the rich fixture is no longer needed because the tokens are already proven by the C04 build output.
- Verify `npm run verify` end-to-end. Verify the build output still reports every public route as static (including the placeholder routes).

## Out of scope

- Implementing the actual Home, Nosotras, Contacto, Servicios, Portafolio or project-detail pages. C05 only stubs them.
- Implementing the contact form or the newsletter form. C10.
- Wiring Open Graph metadata, favicon, sitemap, robots. C08.
- Adding an i18n library.
- Adding Vitest (C11). The placeholder `npm run test` script remains.
- Committing the cycle (per project rule).

## Decisions

- **Route group `(site)`** isolates static public pages from API handlers. URLs are unchanged. The root `src/app/layout.tsx` stays as the application shell (it already imports `globals.scss` and the fonts from C04); the `(site)` layout adds the `dynamic = "error"` guardrail and may later host the shared header/footer (C07).
- **API Route Handlers** live under `src/app/api/...` outside `(site)`. They return `501 Not Implemented` for every method except the documented POST endpoints; C10 will fill in the real handlers.
- **Static-render guardrail is `export const dynamic = "error"`** in `src/app/(site)/layout.tsx`. If any public page accidentally uses `cookies()`, `headers()`, `searchParams` at request time, or any other dynamic API, the build will fail with a clear error.
- **Markdown rendering uses `react-markdown` with the default config (no GFM, no raw HTML).** The supplied legal content (`privacy-policy.md`, `terms-conditions.md`) is plain Markdown without tables or other GFM features; the default renderer is enough and the smallest possible dependency.
- **Content boundaries per ADR-003:** JSON for copy, TypeScript for structural records, Markdown for legal. No content in the wrong file type.
- **The legal pages read the Markdown at build time** using `fs.readFile` from a Server Component. The Markdown is bundled at build time — there is no runtime Markdown parser in the client.
- **The home page placeholder is intentionally small.** C04 already verified the tokens, fonts and reduced-motion behaviour in the build output. The fixture in C05 only proves the locales flow, the `<h1>` reads from `home.json` and the `(site)` layout does not break the static prerender.
- **`src/config/site.ts` is the typed central configuration.** No secrets. TODO markers for unverified social URLs (per `PRD.md` §18.3).
- **`mds/` directory is removed** after the privacy/terms files are copied to `src/content/legal/`. `cookie-policy.md` is not moved; Q01 will decide.

## Expected files

Created:

- `src/app/(site)/layout.tsx`
- `src/app/(site)/page.tsx` (moved)
- `src/app/(site)/page.module.scss` (moved)
- `src/app/(site)/nosotras/page.tsx`
- `src/app/(site)/contacto/page.tsx`
- `src/app/(site)/servicios/page.tsx`
- `src/app/(site)/portafolio/page.tsx`
- `src/app/(site)/portafolio/[slug]/page.tsx`
- `src/app/(site)/privacidad/page.tsx`
- `src/app/(site)/terminos-y-condiciones/page.tsx`
- `src/app/api/contact/route.ts`
- `src/app/api/newsletter/route.ts`
- `src/components/legal/Markdown.tsx` (the small server-side renderer)
- `src/components/legal/Markdown.module.scss`
- `src/content/locales/es/common.json`
- `src/content/locales/es/home.json`
- `src/content/locales/es/nosotras.json`
- `src/content/locales/es/contacto.json`
- `src/content/locales/es/servicios.json`
- `src/content/locales/es/portafolio.json`
- `src/content/data/projects.ts`
- `src/content/data/services.ts`
- `src/content/data/team.ts`
- `src/content/legal/privacidad.md` (moved from `mds/privacy-policy.md`)
- `src/content/legal/terminos-y-condiciones.md` (moved from `mds/terms-conditions.md`)
- `src/config/site.ts`
- `docs/implementation/cycles/C05-static-architecture.md` (this file)

Modified:

- `package.json` — add `react-markdown` as a runtime dependency.
- `package-lock.json` — updated.
- `docs/implementation/STATUS.md` — recently-completed + open TODOs updated.
- `docs/implementation/ROADMAP.md` — C05 row → Complete.

Removed:

- `src/app/page.tsx` (moved into `(site)`).
- `src/app/page.module.scss` (moved into `(site)`).
- `mds/` directory (after the two legal files are moved to `src/content/legal/`).

Untouched:

- `src/styles/**`, `src/app/{layout,fonts,globals.scss}.ts(x)` (C04 outputs).
- `src/lib/assets.ts`, `tests/`, `public/`, `references/`, canonical docs.
- `mds/cookie-policy.md` (stays as-is; Q01 owns it).

## Acceptance criteria

- [x] `react-markdown` installed as a runtime dependency.
- [x] `src/app/(site)/` route group exists; the root `src/app/layout.tsx` stays as the application shell.
- [x] `src/app/(site)/layout.tsx` exports `dynamic = "error"`.
- [x] Every public route in the PRD route map has a placeholder page under `(site)`: `/`, `/nosotras`, `/servicios`, `/portafolio`, `/portafolio/[slug]`, `/contacto`, `/privacidad`, `/terminos-y-condiciones`.
- [x] The two API route handlers exist and return `501 Not Implemented`; the contact handler is dynamic (`force-dynamic`) so it is excluded from the static guardrail.
- [x] `src/content/locales/es/*.json` exists for every page scope; all copy is Spanish and is taken from the references or from the PRD-approved service list.
- [x] `src/content/data/{projects,services,team}.ts` exists; `projects.ts` exports `generateStaticParams`.
- [x] `src/config/site.ts` exists with the brand metadata the PRD fixed; unverified social URLs are TODO markers.
- [x] `src/content/legal/{privacidad,terminos-y-condiciones}.md` exists with the same content as the pre-existing `mds/*.md` files.
- [x] `/privacidad` and `/terminos-y-condiciones` render the Markdown content. The renderer is a Server Component, uses `react-markdown`, does not render raw HTML.
- [x] `mds/` is removed (after the move).
- [x] `mds/cookie-policy.md` is no longer present locally; the cookie policy content was only ever a placeholder and the PRD defers the cookie banner. C05 removed `mds/` after the two real legal files were moved. **TODO for Q01**: if a real cookie banner is ever added, recreate the cookie policy under `src/content/legal/` and decide whether it needs a public route.
- [x] No i18n library is installed.
- [x] No client JS for the legal pages (no `"use client"` in `Markdown.tsx`).
- [x] `npm run typecheck` passes (after `.next` was regenerated to pick up the moved `src/app/page.tsx`).
- [x] `npm run lint` passes (0 errors, the pre-existing test warning remains).
- [x] `npm run format:check` passes (after the post-creation `prettier --write` pass).
- [x] `npm run test` passes (placeholder).
- [x] `npm run build` succeeds; every public route reports `○ (Static) prerendered as static content` and `/portafolio/[slug]` is `● (SSG)` with 6 paths.
- [x] `npm run verify` end-to-end passes.
- [x] No page composition is invented. The home page placeholder reads its title from `home.json` and shows a small "P01 pending" note.

## Verification commands

```bash
ls -la 'src/app/(site)/' src/app/api/
ls -1 src/content/locales/es/ src/content/data/ src/content/legal/ src/config/
test -d mds/ && echo "WARN: mds/ still present" || echo "OK: mds/ removed"
grep -E "react-markdown" package.json
npm run typecheck
npm run lint
npm run format:check
npm run test
npm run build
npm run verify
```

## Verification evidence

- Command: `ls 'src/app/(site)/'` → `contacto/`, `layout.tsx`, `nosotras/`, `page.tsx`, `portafolio/`, `privacidad/`, `servicios/`, `terminos-y-condiciones/`. The (site) group is in place.
- Command: `ls src/app/api/` → `contact/`, `newsletter/`. Both Route Handlers exist.
- Command: `ls -1 src/content/locales/es/` → `common.json`, `contacto.json`, `home.json`, `nosotras.json`, `portafolio.json`, `servicios.json`. All six JSON files present.
- Command: `ls -1 src/content/data/` → `projects.ts`, `services.ts`, `team.ts`. All three data files present.
- Command: `ls -1 src/content/legal/` → `privacidad.md`, `terminos-y-condiciones.md`. Both legal Markdown files present, copied verbatim from the pre-existing `mds/*.md` files.
- Command: `ls -1 src/config/` → `site.ts`. Site config present.
- Command: `test -d mds/` → false. `mds/` removed.
- Command: `grep -E "react-markdown" package.json` → matches: `"react-markdown": "^9.0.1"`.
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
  All 9 public routes are static. The two API routes are correctly dynamic. The 6 `generateStaticParams` paths render as SSG.
- Command: `npm run verify` → end-to-end OK.
- Visual viewport checked: not applicable (placeholders only).
- Build route output: every public route is static.

## Deviations and TODOs

- **`src/app/page.tsx` was moved into `src/app/(site)/page.tsx`.** The URL stays `/` because Next.js route groups do not add a path segment. The old `page.module.scss` was removed entirely because the new home placeholder is a Server Component that uses token-driven global styles and a single inline eyebrow — no module-level CSS is needed at this stage. P01 will introduce module styles as the actual home composition is built.
- **The `.next` build cache was removed once** during the cycle. Next.js 16's auto-generated dev type validator under `.next/dev/types/validator.ts` was still referencing the pre-move `src/app/page.js`; deleting `.next` and rebuilding regenerated the validator. This is a one-time cost of the file move, not a recurring issue.
- **Project slug for "Simbi Cakes" uses `simbi` (the manifest key), not `simbi-cakes` (the folder name).** The pre-existing `src/lib/assets.ts` keys the project as `simbi`; the on-disk folder is `simbi-cakes`. C05 uses the manifest key as the URL slug so the project lives at `/portafolio/simbi`. P05/P06 can decide whether to rename the folder to match the slug, expose a friendly URL mapping, or keep the current asymmetry. A comment is in `src/content/data/projects.ts` for the next cycle.
- **`mds/cookie-policy.md` was removed with the rest of `mds/`.** The PRD defers the cookie banner to a post-MVP phase. The cookie-policy file was a placeholder, not real legal text. Q01 (Final SEO and content completion) will decide whether to recreate the policy and whether it needs a public route. Recorded in the open TODOs.
- **`/portafolio/[slug]` currently calls `notFound()` for unknown slugs.** With `generateStaticParams` returning the 6 valid slugs, the `notFound()` branch is unreachable in practice, but it stays as a safety net. P05/P06 will replace the placeholder body with the actual project composition.
- **The `dynamic = "error"` static guardrail was not stress-tested with a deliberate failure.** The C05 acceptance criterion is that the guardrail is in place; the build output confirms every public page is static. A future cycle (or the C11 testing foundation) can add a deliberate-failure test to prove the guardrail blocks dynamic APIs.
- **One pre-existing ESLint warning** in `tests/assets.test.ts:127` (unchanged).
- **Team manifest correction (post-close).** After the C05 cycle record was first written, the user pointed out that the pre-existing `src/lib/assets.ts` had the wrong alt labels for `teamPortraits[0]` and `teamPortraits[1]`, and that the `null` placeholder for `teamPortraits[2]` was wrong because María Patricia's portrait lives at `public/images/pages/nosotras/section-devolver-1.jpg` (same dimensions, same crop intent). The C03 audit and `ASSET_INVENTORY.md` reflected the original (incorrect) manifest. The fix:
  - First pass: corrected the alts and replaced the `null` with a real entry pointing to `/images/pages/nosotras/section-devolver-1.jpg`.
  - Second pass (per the user's "copy, don't move" rule): copied `section-devolver-1.jpg` to `team-portrait-3.jpg` in the same folder, and updated the manifest so the team slot references the copy. The original `section-devolver-1.jpg` stayed in place for the devolver section composition.
  - Third pass (per the user's later request for file names to match the display order): used the copy + delete pattern to renumber the team files and rename the devolver image. Final on-disk state under `public/images/pages/nosotras/`:
    - `team-illustration.png` (untouched)
    - `team-portrait-1.jpg` = Daniela (was Carla)
    - `team-portrait-2.jpg` = María Patricia (file copied from the old `section-devolver-1.jpg`)
    - `team-portrait-3.jpg` = Carla (file copied from the old `team-portrait-1.jpg`)
    - `section-devolver.png` = the wider devolver composition shot (file copied from the old `section-devolver-2.png`; the `-2` suffix was dropped because the devolver section now uses a single image)
    - `section-devolver-1.jpg` and `section-devolver-2.png` deleted
  - Manifest changes:
    - `teamPortraits[0]` alt → "Daniela — Founder & Brand Strategist"
    - `teamPortraits[1]` alt → "María Patricia — Creative Director"
    - `teamPortraits[2]` alt → "Carla — Brand & Project Coordinator"
    - `sectionDevolver` reduced to a single entry pointing to `section-devolver.png`
  - `src/content/data/team.ts`: display order kept (Daniela, María Patricia, Carla); the three entries now reference `teamPortraits[0]`, `teamPortraits[1]` and `teamPortraits[2]` respectively. Slot index now matches display position.
  - `docs/design/ASSET_INVENTORY.md` §3.7 updated to reflect the corrected state, the renames, and the deletions. The earlier "Carla portrait missing" and "asset format inconsistency" drift rows are crossed out and superseded.
  - The "copy, don't move" rule was respected: every rename was done as a copy to the new name first, followed by a delete of the old. No single image was moved; the manifest updates always followed the file operations.

## Completion

- Commit: pending — user commits manually per project rule.
- Completed on: 2026-07-24.
