# C08 — SEO and metadata foundation

## Status

Complete (awaiting user commit)

## Objective

Create the SEO infrastructure (metadata helper, robots, sitemap, JSON-LD, favicon and OG placeholders) without inventing missing marketing copy or business data. The C03 audit confirmed several real gaps (favicon, OG image, per-page descriptions, final social URLs); C08 surfaces them as explicit TODOs and creates honest placeholders.

## Inputs

- `PRD.md` §18 — SEO.
- `DESIGN.md` (token baseline, no direct SEO rules).
- `AGENTS.md` §4, §18, §20, §22, §25, §28.
- `IMPLEMENTATION_WORKFLOW.md` §C08.
- `docs/design/FIGMA_AUDIT.md` (C03) — missing assets and metadata TODOs.
- `docs/design/ASSET_INVENTORY.md` (C03, updated C05).
- `src/config/site.ts` (C05) — `site` config with brand, routes, social TODOs, legal paths.
- `src/content/locales/es/*.json` (C05) — per-page `metadata.title` and `metadata.description`.
- `src/content/data/projects.ts` (C05) — `generateStaticParams` for the project slugs.
- `src/app/(site)/layout.tsx` (C07) — `(site)` group with the `dynamic = "error"` guardrail.
- Next.js 16 Metadata API, `MetadataRoute`, `ImageResponse`.

## Scope

- Create a typed **`buildPageMetadata`** helper in `src/lib/metadata/build-page-metadata.ts`:
  - Accepts `title`, `description`, `path`, optional `image`, optional `noIndex`, optional `type` (`website` | `article`).
  - Returns a Next.js `Metadata` object with:
    - `title` (with the project title template `"%s — NOI: creative"`).
    - `description` (or a TODO fallback).
    - `alternates.canonical` (built from `site.siteUrl` + `path`).
    - `openGraph` with `type`, `locale`, `url`, `siteName`, `title`, `description`, `images` (or a TODO fallback if `image` is missing).
    - `twitter` card with `card: 'summary_large_image'`, `title`, `description`, `images` (or TODO fallback).
  - Consumed by the per-page `metadata` exports.
- Update the root **`src/app/layout.tsx`** with `metadata` (default title, default description, metadataBase, title template, Open Graph defaults, Twitter defaults, robots defaults). The existing `viewport` (and other Next 16-specific exports) stay alongside.
- Create **`src/app/robots.ts`** (`MetadataRoute.Robots`):
  - Allow all user agents.
  - Reference the sitemap at `https://creativenoi.com/sitemap.xml`.
  - Disallow `/api/`.
- Create **`src/app/sitemap.ts`** (`MetadataRoute.Sitemap`):
  - Include all static routes from `site.routes`.
  - Include all 6 project slugs from `generateStaticParams` at `/portafolio/<slug>`.
  - Use `https://creativenoi.com` as the `baseUrl` and the current date as `lastModified`.
- Create **`src/app/opengraph-image.tsx`** as a `ImageResponse` generator:
  - Navy background (`#00385C`), 1200×630.
  - Brand text "NOI Creative" + the NOI Creative mark in cream/yellow.
  - Marked as a TODO placeholder; the real OG image lands in Q01.
- Create **`src/app/icon.tsx`** as a small `ImageResponse` favicon (32×32):
  - Navy background, "noi" wordmark in cream.
  - Marked as a TODO placeholder.
- Create **`src/app/not-found.tsx`** (custom 404) inside the `(site)` group so it uses the shared header/footer:
  - Renders a Heading, Eyebrow, and a Button back to `/`.
  - Sets its own `metadata` with `robots: { index: false }`.
- Add **`Organization` JSON-LD** to the root layout:
  - `name`, `url`, `logo` (path to the existing white logo), `email`, `description`, `sameAs` (TODO social URLs).
  - Uses Next.js's `script` strategy to inline the JSON-LD.
- Update the per-page `metadata` exports to consume the new helper:
  - `(site)/page.tsx` — Home.
  - `(site)/nosotras/page.tsx` — Nosotras.
  - `(site)/contacto/page.tsx` — Contacto.
  - `(site)/servicios/page.tsx` — Servicios.
  - `(site)/portafolio/page.tsx` — Portafolio index.
  - `(site)/portafolio/[slug]/page.tsx` — Project detail (with `generateStaticParams` from C05).
  - `(site)/privacidad/page.tsx` — Privacidad.
  - `(site)/terminos-y-condiciones/page.tsx` — Términos.
- Verify `npm run verify` end-to-end. The build must remain static for every public route.

## Out of scope

- A real OG image asset (Q01 will replace the placeholder with a designer-supplied image).
- A real favicon (Q01 will replace the placeholder with a designer-supplied icon).
- Final social URLs (the C05 site config has TODO placeholders; C08 does not invent URLs).
- A SEO library (`next-seo`, `next-sitemap`, etc.) — `AGENTS.md` §4 forbids it.
- A cookie consent banner (PRD §3 explicitly defers it).
- Google Analytics or any tracking (PRD §3 explicitly defers it).
- Per-page structured data (Article, BreadcrumbList, etc.) — only the root Organization JSON-LD is in scope.
- Committing the cycle (per project rule).

## Decisions

- **`buildPageMetadata` is the only place that knows about `site.siteUrl`, the title template, and the OG/Twitter defaults.** Per-page `metadata` exports call the helper and pass the per-page title/description/path. This keeps the SEO surface centralised and makes the next Q01 pass (replacing placeholders) a single-file change.
- **OG image and favicon are dynamic `ImageResponse` placeholders** with the brand colors and the "noi" mark. They are honest placeholders (a TODO marker in the visible image and a code comment in the source). Q01 will replace them with designer-supplied assets. Storing them as static files would freeze the design in place; the dynamic generator is one line away from being swapped for a real asset.
- **`Organization` JSON-LD, not `ProfessionalService` or `LocalBusiness`.** The C03 audit and `PRD.md` §18.3 explicitly say we must not invent local-business details (address, phone, hours). `Organization` is the most honest schema; `ProfessionalService` and `LocalBusiness` are deferred until the business data is confirmed.
- **`/portafolio/[slug]` project pages ARE indexable** (per C03 audit). They appear in the sitemap and have unique canonical URLs.
- **The not-found page lives inside the `(site)` group** so it uses the shared header/footer.
- **No new runtime dependencies** are added. `ImageResponse` is from `next/og`, which ships with Next.js.

## Expected files

Created:

- `src/lib/metadata/build-page-metadata.ts`
- `src/lib/metadata/index.ts`
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/app/opengraph-image.tsx`
- `src/app/icon.tsx`
- `src/app/(site)/not-found.tsx`
- `docs/implementation/cycles/C08-seo-metadata.md` (this file)

Modified:

- `src/app/layout.tsx` — add `metadata`, JSON-LD `<script>`, metadataBase.
- `src/app/(site)/page.tsx` — use `buildPageMetadata`.
- `src/app/(site)/nosotras/page.tsx` — same.
- `src/app/(site)/contacto/page.tsx` — same.
- `src/app/(site)/servicios/page.tsx` — same.
- `src/app/(site)/portafolio/page.tsx` — same.
- `src/app/(site)/portafolio/[slug]/page.tsx` — same (with `generateMetadata` for project detail).
- `src/app/(site)/privacidad/page.tsx` — same.
- `src/app/(site)/terminos-y-condiciones/page.tsx` — same.
- `docs/implementation/STATUS.md` — C08 entry added; open TODOs updated.
- `docs/implementation/ROADMAP.md` — C08 row → Complete.

Untouched:

- `src/components/**` (C06 + C07).
- `src/lib/assets.ts`, `src/content/**`, `src/styles/**`, `src/app/{fonts,globals.scss}.ts(x)`, `tests/`, `mds/`, `references/`, canonical docs.

## Acceptance criteria

- [x] `src/lib/metadata/build-page-metadata.ts` exists and produces a `Metadata` object.
- [x] The root `src/app/layout.tsx` exports a `metadata` object with title template, description, metadataBase, Open Graph defaults and Twitter defaults.
- [x] The root `src/app/layout.tsx` includes an `Organization` JSON-LD `<script>` with confirmed fields only.
- [x] `src/app/robots.ts` exports a `MetadataRoute.Robots` object that disallows `/api/` and references the sitemap.
- [x] `src/app/sitemap.ts` exports a `MetadataRoute.Sitemap` with all 9 static routes + 6 project slugs.
- [x] `src/app/opengraph-image.tsx` exists and renders a 1200×630 placeholder.
- [x] `src/app/icon.tsx` exists and renders a 32×32 favicon placeholder.
- [x] `src/app/(site)/not-found.tsx` exists, uses the shared header/footer, has `metadata.robots = { index: false }`.
- [x] Every per-page `metadata` export (Home, Nosotras, Contacto, Servicios, Portafolio index, project detail, Privacidad, Términos) uses `buildPageMetadata`.
- [x] No page invents missing data: descriptions, OG image, social URLs are explicit TODO markers.
- [x] No SEO library is installed.
- [x] `npm run typecheck` passes.
- [x] `npm run lint` passes (0 errors, the pre-existing test warning remains).
- [x] `npm run format:check` passes.
- [x] `npm run test` passes (placeholder).
- [x] `npm run build` succeeds; every public route reports `○ (Static)`; the sitemap, robots, icon, and opengraph-image routes are generated.
- [x] `npm run verify` end-to-end passes.

## Verification commands

```bash
ls -1 src/lib/metadata/
ls -1 src/app/robots.ts src/app/sitemap.ts src/app/opengraph-image.tsx src/app/icon.tsx
test -f src/app/(site)/not-found.tsx && echo "OK: not-found exists" || echo "WARN: not-found missing"
npm run typecheck
npm run lint
npm run format:check
npm run test
npm run build
npm run verify
```

## Verification evidence

- `npm run build` → 9 public routes static + 4 new C08 routes (`/icon`, `/opengraph-image`, `/robots.txt`, `/sitemap.xml`) all static + 6 project slugs SSG + 2 dynamic API routes.
- `Organization` JSON-LD with confirmed fields only (TODO social URLs filtered out).
- `not-found.tsx` uses the shared header/footer and is `noIndex`.
- No SEO library installed.

## Deviations and TODOs

- **OG image and favicon are dynamic `ImageResponse` placeholders** (not static files). The visible image is honest about being a placeholder: a small "PLACEHOLDER · TODO Q01" label sits at the top of the OG image. Q01 will replace these with designer-supplied assets; the dynamic generators are one line away from being swapped for a real asset.
- **`Organization` JSON-LD, not `ProfessionalService` or `LocalBusiness`.** The C03 audit and `PRD.md` §18.3 explicitly say we must not invent local-business details (address, phone, hours). `Organization` is the most honest schema. `sameAs` filters out TODO placeholder URLs (the value `site.social.*.url` starts with `TODO` for unverified social handles), so the JSON-LD only emits confirmed social URLs.
- **`/portafolio/[slug]` project pages ARE indexable** (per C03 audit). They appear in the sitemap at `/portafolio/<slug>` with `priority: 0.6`. The `generateMetadata` function reads the project record from `getProject(slug)` and falls back to a `noIndex` page if the slug is not in the manifest.
- **`not-found.tsx` lives inside the `(site)` group** so it uses the shared header/footer (C07 shell). It has its own `metadata` with `noIndex: true` so 404s never appear in search results.
- **Title template is `"%s — NOI: creative"`.** Every per-page title flows through the template via the root `metadata.title.template`. The fallback for the home page is the bare `"NOI: creative"`.
- **JSON-LD `<script>` uses `dangerouslySetInnerHTML`** because there is no other safe way to ship structured data. The values are centralised in `site` and validated by the type system. An initial `eslint-disable` comment was removed once it became clear the rule was not enabled.
- **One pre-existing ESLint warning** in `tests/assets.test.ts:127` (unchanged).
- **Open TODOs recorded in `STATUS.md`**: per-page descriptions (`TODO metadata description`), OG image replacement (Q01), favicon replacement (Q01), final social URLs (Q01).

## Completion

- Commit: pending — user commits manually per project rule.
- Completed on: 2026-07-24.
