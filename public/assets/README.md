# `public/assets/` — naming and usage rules

This folder does not store assets directly. It is the project root for the asset tree and the home of the rules every cycle must follow when adding, renaming or sourcing a new file. The actual files live under `public/images/`, `public/fonts/`, and (for SVGs) under their role-specific subfolders.

> **Do not move a single file unless it is part of a deliberate rename or consolidation.** C03 confirmed the existing tree is already aligned with `src/lib/assets.ts`. Renaming for cosmetics creates churn with no benefit. Only rename when the new name is required by a future cycle (e.g. C04 may normalise the file extension of the team illustration if Figma confirms it is vector).

---

## 1. Asset tree (current, kept by C03)

```text
public/
├── fonts/
│   ├── Satoshi/
│   └── PanelSans/
└── images/
    ├── pages/
    │   ├── home/
    │   ├── nosotras/
    │   └── contacto/
    ├── proyectos/
    │   ├── content-lab/
    │   ├── crea-desde-cero/
    │   ├── jaze/
    │   ├── nayeenails/
    │   ├── simbi-cakes/
    │   └── veritomom/
    └── shared/
        ├── logo/
        ├── iconos/
        ├── figuras/
        └── stickers/
```

The pre-existing layout is preserved. See `docs/design/ASSET_INVENTORY.md` §1 for why we kept it and what the workflow's ideal target looked like.

---

## 2. Naming rules

- **Kebab-case, ASCII, no diacritics.** `nayeenails`, `simbi-cakes`, `crea-desde-cero` — never `Nayee Nails` or `simbí_cakes`.
- **Stable slugs for projects:** `content-lab`, `crea-desde-cero`, `jaze`, `nayeenails`, `simbi-cakes`, `veritomom`. Do not rename a project folder without updating `src/lib/assets.ts` and `tests/assets.test.ts` in the same change.
- **Per-page subfolder** under `public/images/pages/<page>/` for any image that belongs to exactly one page.
- **Per-project subfolder** under `public/images/proyectos/<slug>/` for portfolio imagery.
- **Per-family subfolder** under `public/fonts/<Family>/` for licensed font files.
- **Role-based subfolders** under `public/images/shared/{logo,iconos,figuras,stickers}/` for shared assets.
- **Version suffix** is allowed for project images that ship at multiple sizes: `-large`, `-med`, `-cover`.
- **Gallery suffix** is mandatory for project gallery images: `portafolio/detail-N.jpg`.
- **No Figma-generated names** like `image-134.png`, `Frame 2097.png`, `Rectangle 12.png`. If a new asset arrives from a Figma export, rename it to its semantic target before adding it to the manifest.
- **Lowercase extensions.** `.png`, `.jpg`, `.svg`, `.otf` — never `.PNG` or `.SVG`.

---

## 3. Adding a new asset

1. Decide the role:
   - **Page-specific** → `public/images/pages/<page>/<asset-name>.<ext>`.
   - **Project-specific** → `public/images/proyectos/<slug>/<asset-name>.<ext>`. If it's a gallery image, `<asset-name>` must follow `<slug>-<role>` or be a `portafolio/detail-N.<ext>`.
   - **Shared (logo, icon, sticker, decoration)** → `public/images/shared/<role>/<asset-name>.svg` (shared assets are almost always SVG).
   - **Font** → `public/fonts/<Family>/<Family>-<Weight>.<ext>`.
2. Name the file with the semantic slug (see §2).
3. Add an entry to `src/lib/assets.ts`:
   - Raster: `{ src, width, height, alt }` — every raster entry must have exact width/height in pixels.
   - SVG: `{ src, alt }` — width/height not required because SVGs scale, but `alt` is required (use `null` and the TODO placeholder if copy is not ready).
4. Set `alt` to real copy whenever possible. The pattern `[TODO ALT: describe image purpose and meaningful content]` is allowed but should be resolved by the cycle that consumes the asset.
5. Run `npm run test` (from C11 onward) — the assets vitest will fail if the manifest points to a file that does not exist on disk, or if the dimensions in the manifest do not match the actual file.
6. Commit the file and the manifest change in the same commit.

---

## 4. Renaming an asset

1. Rename the file on disk first.
2. Update `src/lib/assets.ts` in the same change.
3. Re-run the assets test.
4. Commit the rename and the manifest update in the same commit.

**Never** leave a window where the manifest and the disk disagree. The `tests/assets.test.ts` will catch it, but it is cheaper not to introduce the disagreement at all.

---

## 5. Removing an asset

1. Remove the file from disk.
2. Remove the entry from `src/lib/assets.ts`. If a page still references it, fix the page first.
3. Re-run the assets test.
4. Commit both removals in the same commit.

**Do not** keep a `null` slot in the manifest unless the absence is intentional and documented. `null` is allowed for assets that are planned but not yet sourced (see `home.ctaCollage` and `nosotras.teamPortraits[2]` in the inventory). A `null` slot must be accompanied by a TODO in `docs/design/ASSET_INVENTORY.md`.

---

## 6. Sourcing a new asset from Figma

1. Export the asset from Figma at the **highest** practical resolution. Raster images used as hero or LCP images should be at least 2× their CSS size to support high-DPI displays.
2. Convert to the lightest acceptable format:
   - Photographs → `.jpg` at quality 80–85.
   - Logos, icons, illustrations, doodles → `.svg` whenever the source is vector.
   - Photos that need transparency → `.png`.
3. Rename to the semantic target **before** saving into the project tree.
4. Drop the file into the correct role subfolder.
5. Add the manifest entry with the real (measured) width/height and the best alt copy you can provide.
6. Commit the file and the manifest change in the same commit.

---

## 7. Removing or hiding an asset temporarily

- Use `null` in the manifest (with a documented TODO) instead of deleting the file, if the asset will return.
- Never use `#` or an empty string as a `src`. The `tests/assets.test.ts` will catch it.

---

## 8. Accessibility checklist for every asset

- Every raster entry has `width` and `height` in pixels (prevents CLS).
- Every entry has `alt`. The `null` placeholder is a TODO marker; the cycle that consumes the asset is responsible for replacing it.
- Decorative SVGs that carry no information (e.g. a small icon used next to a labelled button) should still expose a meaningful `alt`; the AGENTS rule is "do not use empty `alt` to hide SVGs from assistive tech" because that breaks the screen-reader announcement of the parent label. If a sticker is truly decorative and the surrounding text already conveys the meaning, mark it as `alt: null` **and** ensure the surrounding text is the screen-reader-accessible label.
- Background images set in CSS Modules must include an `aria-label` on the parent or a visually-hidden equivalent. Background images are not announced.

---

## 9. Cross-references

- `docs/design/ASSET_INVENTORY.md` — every file under `public/images/` and `public/fonts/`, with manifest key, on-disk status, alt, focal point, and a per-asset TODO list.
- `docs/design/FIGMA_AUDIT.md` — the visual audit, including the cross-frame inconsistencies and the provisional `DESIGN.md` values.
- `src/lib/assets.ts` — the single source of truth for asset paths and metadata. Do not introduce a parallel registry.
- `tests/assets.test.ts` — the vitest test that walks the manifest, confirms each `src` exists on disk and that the declared dimensions match the on-disk dimensions.
