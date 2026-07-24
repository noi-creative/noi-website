# C03 — Figma audit and asset inventory

## Status

Complete (awaiting user commit)

## Objective

Inspect the currently approved desktop frames (Home, Nosotras, Contacto) and the supplied screenshot references before defining reusable visual primitives. Produce three documents:

- `docs/design/FIGMA_AUDIT.md` — the visual-system audit (typography, colour, spacing, radii, container widths, header, button variants, form patterns, image ratios, organic shapes, repeated patterns, provisional vs confirmed `DESIGN.md` values, missing assets, missing font files, inconsistencies across frames).
- `docs/design/ASSET_INVENTORY.md` — every asset needed by the approved pages, with the canonical path under `public/`, the present state, the missing pieces, and the focal-point data.
- `public/assets/README.md` — the asset-naming and usage rules that future cycles will follow.

## Inputs

- `PRD.md` §11 — Image and asset handling.
- `DESIGN.md` (full) — current visual rules, with provisional values flagged.
- `AGENTS.md` §12 — Images and assets.
- `AGENTS.md` §9 — Design tokens.
- `IMPLEMENTATION_WORKFLOW.md` §C03.
- Approved Figma screenshots in `references/`:
  - `references/home/home.png`
  - `references/nosotras/nosotras.png`
  - `references/contact/contacto.png`
  - `references/portafolio/portafolio.png` (index) and the six project folders under `references/portafolio/*/` (project detail references — out of scope for C03 because their pages are not approved).
- `src/lib/assets.ts` — the pre-existing content-adjacent manifest.
- `tests/assets.test.ts` — pre-existing vitest test that walks the manifest and verifies on-disk dimensions.
- `public/images/{pages,proyectos,shared}/` — pre-existing on-disk assets.
- `public/fonts/{Satoshi,PanelSans}/` — six `.otf` files staged in C01/earlier.

## Scope

- Read the three approved desktop screenshots. Do **not** use them to invent exact pixel values for tokens; use them to confirm composition, section order, repeated patterns, and which `DESIGN.md` tokens are still provisional.
- Cross-reference `src/lib/assets.ts` against the actual files under `public/images/`. Flag any drift (mismatched filenames, missing files, wrong dimensions, TODO alts).
- Cross-reference the `references/portafolio/` folders. Even though `/portafolio` and `/portafolio/[slug]` are blocked until design approval, listing the references here is useful for the C10 and P05/P06 cycles.
- Produce the three documents, with the asset-naming rule from the workflow:
  ```text
  public/
  ├── fonts/
  ├── icons/
  ├── images/
  │   ├── home/
  │   ├── nosotras/
  │   ├── contacto/
  │   └── portfolio/
  ├── illustrations/
  └── logos/
  ```
  Reuse the pre-existing `public/images/{pages,proyectos,shared}/` tree where it already aligns with the manifest; do not move a single file unless it is a deliberate rename or a clear consolidation of an existing folder. The user has explicitly asked to keep the existing image format and naming.
- Do **not** create final SCSS tokens, components, or design primitives in this cycle. C04 and C06 do that.
- Do **not** invent copy, alt text, or business information. Use TODO markers.
- Do **not** touch `src/lib/assets.ts` content beyond a note in the inventory; C04 will consume the audit.

## Out of scope

- Running `next build` or any `verify` step. C03 is documentation-only.
- Building the Figma MCP workflow (no Figma MCP server is configured in this session). Screenshots are the visual source for C03; the actual Figma frame is referenced indirectly through `references/*.png` and the `DESIGN.md` text.
- Implementing any page, section, component, primitive, or animation.
- Moving legal files (`mds/` → `src/content/legal/`). C05.
- Installing any package.
- Committing (per project rule).

## Decisions

- **No Figma MCP available in this session.** The visual source of truth for C03 is the supplied PNG screenshots under `references/`. The C03 record makes the dependency on those PNGs explicit, and any value that would otherwise require the Figma frame is recorded as a `TODO pending Figma MCP` rather than estimated from the screenshot.
- **Asset-tree alignment is conservative.** The pre-existing `public/images/{pages,proyectos,shared}/` layout is already aligned with `src/lib/assets.ts`. C03 does **not** move a single file; it only documents the target layout that C04+ should use when new assets arrive, and lists any drift between the manifest and the disk.
- **Per-page and per-project subfolders under `public/images/`.** The workflow proposes `home/`, `nosotras/`, `contacto/`, `portfolio/`. The pre-existing tree uses `pages/{home,nosotras,contacto}/` and `proyectos/<slug>/`. C03 will document both layouts and recommend the existing one be kept (less churn) while recording the workflow's ideal target as the future pattern.
- **The pre-existing `tests/assets.test.ts` is the single source of truth for "asset exists + dimensions match".** C03 does not re-implement that check; it only notes the gaps surfaced by the manifest.
- **Missing portfolio project designs stay out of scope.** P04, P05, P06 remain blocked. The portafolio references in `references/portafolio/` are listed in the inventory as `pending design approval` and are not promoted to the manifest yet.

## Expected files

Created:

- `docs/implementation/cycles/C03-figma-audit.md` (this file)
- `docs/design/FIGMA_AUDIT.md`
- `docs/design/ASSET_INVENTORY.md`
- `public/assets/README.md`

Touched:

- `docs/implementation/STATUS.md` (verification row + recently-completed entry once C03 closes).
- `docs/implementation/ROADMAP.md` (C03 row → Complete).

Untouched:

- `src/lib/assets.ts` (manifest stays as-is; C03 only documents drift).
- `public/images/**` (no file moves in C03).
- `public/fonts/**` (already staged; no changes).
- `tests/assets.test.ts` (no code changes).
- `mds/`, `references/`, `docs/implementation/cycles/C00…C02*.md`, canonical docs.

## Acceptance criteria

- [x] `docs/design/FIGMA_AUDIT.md` exists, covers every heading listed in the workflow §C03 (1–13), and marks each `DESIGN.md` value as Confirmed, Provisional, or `TODO pending Figma MCP`.
- [x] `docs/design/ASSET_INVENTORY.md` exists and lists every approved-page asset with: source path, manifest entry (or `not in manifest`), present on disk (yes/no), alt status, focal point (if any), and a TODO list for missing pieces.
- [x] `public/assets/README.md` exists and documents the naming rule + the pre-existing-vs-ideal layout, with an explicit "do not move individual files" note.
- [x] `src/lib/assets.ts` is not modified.
- [x] No file under `public/images/` is moved or renamed.
- [x] No `next build` is required (C03 is documentation-only) and no package is installed.
- [x] The cycle record has its Status set to `Complete` only after the three documents exist and the drift list is filled.

## Verification commands

```bash
ls -1 docs/design/
ls -1 public/assets/
test -f src/lib/assets.ts && echo "OK: manifest untouched"
find public/images -type f | wc -l   # baseline count, recorded for later
```

## Verification evidence

- Documentation-only. 96 image files + 6 font files catalogued.
- 5 placeholder Open TODOs recorded (Panel Sans license, social URLs, OG image, favicon, per-page metadata).
- `src/lib/assets.ts` untouched. No file moved under `public/images/`.
- Command: `find public/fonts -type f | wc -l` → 6. Baseline recorded.
- Visual viewport checked: not applicable (documentation-only cycle).
- Build route output: not applicable.

## Deviations and TODOs

- **No Figma MCP server is configured in this session.** The visual source of truth for C03 is the supplied PNG references under `references/`. Where exact Figma values were needed (container widths, font weight assignments, shadow values, spacing values), C03 records them as **provisional** or **`TODO pending Figma MCP`** rather than estimating from the screenshot. The workflow explicitly forbids estimating exact values from screenshots.
- **Real asset gaps surfaced, not invented:**
  - `home.ctaCollage` is `null` in the manifest and not on disk — P01 will source.
  - `nosotras.teamPortraits[2]` (Carla) is `null` in the manifest and not on disk — P02 will source.
  - `home.headerWheel[0..8]` is present on disk and in the manifest but not visibly used in the approved Home frame — P01/C04 will confirm.
  - `nosotras.teamIllustration` is declared as a `.png` but the visual is line art; C04/P02 may promote to `.svg` after Figma confirmation.
  - Several shared stickers (`manosAzul`, `manosRojo`, `doodleMarino`, `ilustracion03/04/08`, `laptopCeleste`, `blobCeleste`) have no clear frame use in the references; C04 will mark unused slots as `null`.
- **Panel Sans is staged but not used in any approved frame.** C03 confirms there is no Panel Sans moment in Home, Nosotras or Contacto. C04 will register Panel Sans in `next/font/local` only if a future cycle introduces a Panel Sans moment; otherwise the files stay unused. This avoids shipping a font that no approved page references, which would impact LCP.
- **All `alt: tbd` placeholders are inherited from the pre-existing manifest.** C03 does not change them; P01/P02/P03 are responsible for resolving the alts of the assets they consume.
- **Sticker-to-frame matching is best-effort.** Without Figma MCP, the exact sticker used in each frame is a reasoned guess. C03 documents the best guess and marks every sticker as `TODO pending Figma MCP` for confirmation.

## Completion

- Commit: pending — user commits manually per project rule.
- Completed on: 2026-07-24.
