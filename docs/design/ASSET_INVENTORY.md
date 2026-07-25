# Asset inventory — NOI Creative

**Status:** Complete for the three approved pages (Home, Nosotras, Contacto). Portfolio project images are present on disk and in the manifest but the corresponding pages are blocked on design approval; they are listed here for completeness.

**Sources:**

- `src/lib/assets.ts` — the pre-existing content-adjacent manifest.
- `tests/assets.test.ts` — vitest test that walks the manifest, confirms each `src` exists on disk, and checks raster dimensions match.
- `public/images/{pages,proyectos,shared}/` — the on-disk tree.
- `public/fonts/{Satoshi,PanelSans}/` — staged in C01, six `.otf` files.
- The Figma audit in [`FIGMA_AUDIT.md`](./FIGMA_AUDIT.md).

---

## 1. Asset-tree layout

### Current (pre-existing, kept by C03)

```text
public/
├── fonts/
│   ├── Satoshi/
│   │   ├── Satoshi-Black.otf
│   │   ├── Satoshi-Bold.otf
│   │   ├── Satoshi-Medium.otf
│   │   └── Satoshi-Regular.otf
│   └── PanelSans/
│       ├── PanelSans-Bold.otf
│       └── PanelSans-Regular.otf
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

### Workflow's ideal target

`IMPLEMENTATION_WORKFLOW.md` §C03 proposes:

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

**C03 decision: keep the current layout.** Reasons:

- The pre-existing `pages/{home,nosotras,contacto}/` subfolders are already aligned with the manifest and the C03 file-count baselines. Renaming would require touching every page implementation that comes later.
- The `shared/{logo,iconos,figuras,stickers}/` subfolders are semantically clearer than a flat `icons/` and `logos/` at the root. SVGs by role are easier to find.
- The `proyectos/<slug>/` subfolders under `images/` are an MVP-friendly extension of the workflow's `portfolio/`; both terms are valid and the implementation cost of moving is non-zero.
- C03 explicitly does **not** move any single file. Future cycles may consolidate if a concrete benefit appears (none does today).

---

## 2. Naming rules

- **Kebab-case for filenames**, no spaces, no diacritics.
- **Per-page subfolder** under `public/images/pages/<page>/` for any image that belongs to exactly one page.
- **Per-project subfolder** under `public/images/proyectos/<slug>/` for portfolio imagery.
- **Per-family subfolder** under `public/fonts/<Family>/` for licensed font files.
- **Role-based subfolders** under `public/images/shared/{logo,iconos,figuras,stickers}/` for shared assets.
- **Version suffix** is allowed (`-med`, `-large`, `-cover`) for project images that ship at multiple sizes.
- **No Figma-generated names** like `image-134.png` or `Frame 2097.png` are allowed. If a new asset arrives from a Figma export, rename it before adding to the manifest.
- **Stable slugs** for projects: `content-lab`, `crea-desde-cero`, `jaze`, `nayeenails`, `simbi-cakes`, `veritomom`. No renaming.

---

## 3. Per-asset inventory

### 3.1 Fonts (`public/fonts/`)

| Path                                    | Format | Family     | Weight | Manifest                | On disk | Alt/TODO | Notes                                                                                                    |
| --------------------------------------- | ------ | ---------- | ------ | ----------------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `fonts/Satoshi/Satoshi-Regular.otf`     | OTF    | Satoshi    | 400    | n/a (registered in C04) | ✓       | n/a      | Staged in C01.                                                                                           |
| `fonts/Satoshi/Satoshi-Medium.otf`      | OTF    | Satoshi    | 500    | n/a                     | ✓       | n/a      | Staged in C01.                                                                                           |
| `fonts/Satoshi/Satoshi-Bold.otf`        | OTF    | Satoshi    | 700    | n/a                     | ✓       | n/a      | Staged in C01.                                                                                           |
| `fonts/Satoshi/Satoshi-Black.otf`       | OTF    | Satoshi    | 900    | n/a                     | ✓       | n/a      | Staged in C01.                                                                                           |
| `fonts/PanelSans/PanelSans-Regular.otf` | OTF    | Panel Sans | 400    | n/a                     | ✓       | n/a      | Staged in C01. **Not used in any approved frame** — see `FIGMA_AUDIT.md` §4.1. License not yet verified. |
| `fonts/PanelSans/PanelSans-Bold.otf`    | OTF    | Panel Sans | 700    | n/a                     | ✓       | n/a      | Staged in C01. Same caveat.                                                                              |

Playfair Display: not a local file. Loaded at build time via `next/font/google` in C04. No on-disk copy.

### 3.2 Shared — logo (`public/images/shared/logo/`)

| Path                         | Manifest key                   | On disk | Alt        | Focal point | Notes                                                                                               |
| ---------------------------- | ------------------------------ | ------- | ---------- | ----------- | --------------------------------------------------------------------------------------------------- |
| `logo/noi-azul.svg`          | `shared.logo.noiAzul`          | ✓       | "NOI"      | n/a         | Header.                                                                                             |
| `logo/noi-blanco.svg`        | `shared.logo.noiBlanco`        | ✓       | "NOI"      | n/a         | Footer.                                                                                             |
| `logo/creative-amarillo.svg` | `shared.logo.creativeAmarillo` | ✓       | "creative" | n/a         | Nosotras intro hero (yellow "creative" inside the speech-bubble).                                   |
| `logo/creative-rojo.svg`     | `shared.logo.creativeRojo`     | ✓       | "creative" | n/a         | Nosotras intro hero (red "creative" word, used as a backdrop element of the line-art illustration). |

### 3.3 Shared — iconos (`public/images/shared/iconos/`)

| Path                         | Manifest key              | On disk | Alt         | Notes                                   |
| ---------------------------- | ------------------------- | ------- | ----------- | --------------------------------------- |
| `iconos/icon-email.svg`      | `shared.iconos.email`     | ✓       | "Email"     | Contact details (navy tile background). |
| `iconos/icon-email-soft.svg` | `shared.iconos.emailSoft` | ✓       | "Email"     | Footer (cream tile background).         |
| `iconos/icon-location.svg`   | `shared.iconos.location`  | ✓       | "Ubicación" | Contact details.                        |
| `iconos/icon-instagram.svg`  | `shared.iconos.instagram` | ✓       | "Instagram" | Footer + Contact details (orange tile). |
| `iconos/icon-linkedin.svg`   | `shared.iconos.linkedin`  | ✓       | "LinkedIn"  | Footer.                                 |
| `iconos/icon-tiktok.svg`     | `shared.iconos.tiktok`    | ✓       | "TikTok"    | Footer.                                 |
| `iconos/icon-whatsapp.svg`   | `shared.iconos.whatsapp`  | ✓       | "WhatsApp"  | Contact details (burgundy tile).        |

### 3.4 Shared — figuras (`public/images/shared/figuras/`)

| Path                               | Manifest key                        | On disk | Alt      | Notes                                                                                                                                                      |
| ---------------------------------- | ----------------------------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `figuras/figura-1.svg`             | `shared.figuras.figura1`            | ✓       | TODO ALT | Possibly the large orange "2" decorative number (Home). Needs Figma confirmation.                                                                          |
| `figuras/figura-2.svg`             | `shared.figuras.figura2`            | ✓       | TODO ALT | Same — possibly the second "2" on the Home branding section.                                                                                               |
| `figuras/semi-circulo-azul.svg`    | `shared.figuras.semiCirculoAzul`    | ✓       | TODO ALT | P05: wide flat navy organic shape (214×132). Used in the Portafolio index CTA as one of the two speech-bubble doodles on the left of the burgundy section. |
| `figuras/semi-circulo-naranja.svg` | `shared.figuras.semiCirculoNaranja` | ✓       | TODO ALT | P05: tall narrow orange organic shape (104×188). Used in the Portafolio index CTA as the accent that overlaps the navy speech-bubble doodle on the left.   |

### 3.5 Shared — stickers (`public/images/shared/stickers/`)

| Path                                     | Manifest key                       | On disk | Alt      | Best-effort frame use                                               |
| ---------------------------------------- | ---------------------------------- | ------- | -------- | ------------------------------------------------------------------- |
| `stickers/sticker-blob-celeste.svg`      | `shared.stickers.blobCeleste`      | ✓       | TODO ALT | Not clearly matched.                                                |
| `stickers/sticker-blob-amarillo.svg`     | `shared.stickers.blobAmarillo`     | ✓       | TODO ALT | Possibly the contact "NOI existe para acompañarte" scallop.         |
| `stickers/sticker-bombilla-amarilla.svg` | `shared.stickers.bombillaAmarilla` | ✓       | TODO ALT | "Devolver lo humano" section (Nosotras), the small lightbulb.       |
| `stickers/sticker-doodle-marino.svg`     | `shared.stickers.doodleMarino`     | ✓       | TODO ALT | Not clearly matched.                                                |
| `stickers/sticker-ilustracion-03.svg`    | `shared.stickers.ilustracion03`    | ✓       | TODO ALT | One of the numbered Servicios icons.                                |
| `stickers/sticker-ilustracion-04.svg`    | `shared.stickers.ilustracion04`    | ✓       | TODO ALT | One of the numbered Servicios icons.                                |
| `stickers/sticker-ilustracion-08.svg`    | `shared.stickers.ilustracion08`    | ✓       | TODO ALT | One of the numbered Servicios icons.                                |
| `stickers/sticker-laptop-celeste.svg`    | `shared.stickers.laptopCeleste`    | ✓       | TODO ALT | Possibly a Servicios icon.                                          |
| `stickers/sticker-manos-azul.svg`        | `shared.stickers.manosAzul`        | ✓       | TODO ALT | Not clearly matched.                                                |
| `stickers/sticker-manos-naranja.svg`     | `shared.stickers.manosNaranja`     | ✓       | TODO ALT | Home final CTA collage (the hand/phone illustration, bottom-right). |
| `stickers/sticker-manos-rojo.svg`        | `shared.stickers.manosRojo`        | ✓       | TODO ALT | Not clearly matched.                                                |
| `stickers/sticker-megafono-rojo.svg`     | `shared.stickers.megafonoRojo`     | ✓       | TODO ALT | "El branding" section (Home), top-left of the portrait card.        |
| `stickers/sticker-telefono-amarillo.svg` | `shared.stickers.telefonoAmarillo` | ✓       | TODO ALT | Contact hero (Contacto), the retro telephone illustration.          |

### 3.6 Home — page assets (`public/images/pages/home/`)

| Path                                                  | Manifest key                   | On disk | Alt                                           | Use in approved frame                                                                                                |
| ----------------------------------------------------- | ------------------------------ | ------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `pages/home/hero-collage-1.png` (348×422)             | `home.heroCollage[0]`          | ✓       | "Persona trabajando en su laptop"             | Home hero collage (left).                                                                                            |
| `pages/home/hero-collage-2.png` (646×766)             | `home.heroCollage[1]`          | ✓       | "Persona trabajando con material de marca"    | Home hero collage (centre, largest).                                                                                 |
| `pages/home/hero-collage-3.png` (573×652)             | `home.heroCollage[2]`          | ✓       | "Persona revisando su teléfono y un cuaderno" | Home hero collage (right).                                                                                           |
| `pages/home/header-wheel-1.png` (348×282)             | `home.headerWheel` (collapsed) | ✓       | n/a (slot is `null` in manifest)              | **Not visibly used in the approved Home frame.** P01 collapsed the manifest slot to `null`; the 9 PNGs stay on disk. |
| `pages/home/header-wheel-2.png` (348×282)             | `home.headerWheel` (collapsed) | ✓       | n/a                                           | Same.                                                                                                                |
| `pages/home/header-wheel-3.png` (348×282)             | `home.headerWheel` (collapsed) | ✓       | n/a                                           | Same.                                                                                                                |
| `pages/home/header-wheel-4.png` (348×278)             | `home.headerWheel` (collapsed) | ✓       | n/a                                           | Same.                                                                                                                |
| `pages/home/header-wheel-5.png` (347×282)             | `home.headerWheel` (collapsed) | ✓       | n/a                                           | Same.                                                                                                                |
| `pages/home/header-wheel-6.png` (347×282)             | `home.headerWheel` (collapsed) | ✓       | n/a                                           | Same.                                                                                                                |
| `pages/home/header-wheel-7.png` (347×282)             | `home.headerWheel` (collapsed) | ✓       | n/a                                           | Same.                                                                                                                |
| `pages/home/header-wheel-8.png` (348×278)             | `home.headerWheel` (collapsed) | ✓       | n/a                                           | Same.                                                                                                                |
| `pages/home/header-wheel-9.png` (348×278)             | `home.headerWheel` (collapsed) | ✓       | n/a                                           | Same.                                                                                                                |
| `pages/home/section-branding-portrait.png` (850×1018) | `home.sectionBrandingPortrait` | ✓       | "Mujer leyendo un libro con concentración"    | "El branding no es un momento" section, the large portrait of the woman reading.                                     |
| `pages/home/hero-collage-1.png` (reused)              | `home.ctaCollage[0]`           | ✓       | "Persona trabajando en su laptop"             | Final CTA collage (reused from hero collage per P01 plan).                                                           |
| `pages/home/hero-collage-2.png` (reused)              | `home.ctaCollage[1]`           | ✓       | "Persona trabajando con material de marca"    | Final CTA collage (reused).                                                                                          |
| `pages/home/hero-collage-3.png` (reused)              | `home.ctaCollage[2]`           | ✓       | "Persona revisando su teléfono y un cuaderno" | Final CTA collage (reused).                                                                                          |

### 3.7 Nosotras — page assets (`public/images/pages/nosotras/`)

| Path                                              | Manifest key                  | On disk | Alt                                                         | Use                                                                                                                                                                                                             |
| ------------------------------------------------- | ----------------------------- | ------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pages/nosotras/team-illustration.png` (982×1052) | `nosotras.sectionDevolver[0]` | ✓       | "Las tres integrantes de NOI trabajando juntas en una mesa" | "Devolver lo humano" section, the wider team-photo composition (paper-clip illustration and "Creation Connection" sticker are baked into the PNG). The file was renamed into this slot in the P02 manifest fix. |
| `pages/nosotras/team-portrait-1.jpg` (658×840)    | `nosotras.teamPortraits[0]`   | ✓       | "Daniela — Founder & Brand Strategist"                      | Daniela card.                                                                                                                                                                                                   |
| `pages/nosotras/team-portrait-2.jpg` (658×840)    | `nosotras.teamPortraits[1]`   | ✓       | "María Patricia — Creative Director"                        | María Patricia card. The file used to live at `section-devolver-1.jpg`; C05 moved it into the team folder so the file name matches the team slot.                                                               |
| `pages/nosotras/team-portrait-3.jpg` (657×840)    | `nosotras.teamPortraits[2]`   | ✓       | "Carla — Brand & Project Coordinator"                       | Carla card.                                                                                                                                                                                                     |
| `pages/nosotras/section-devolver.png` (894×778)   | `nosotras.teamIllustration`   | ✓       | "Ilustración lineal de tres mujeres del equipo de NOI"      | Nosotras intro hero, the line-art illustration of three women. **TODO pending Figma**: confirm whether the source is a true raster or a rasterised vector; consider promoting to `.svg` in Q01.                 |

**C05 rename summary (copy + delete pattern, rule-compliant):**

- `team-portrait-1.jpg` is now Daniela (was Carla).
- `team-portrait-2.jpg` is now María Patricia (was Daniela; the file used to be `section-devolver-1.jpg`).
- `team-portrait-3.jpg` is now Carla (was the duplicate of `section-devolver-1.jpg`; replaced with Carla's original bytes).
- `section-devolver-1.jpg` and `section-devolver-2.png` are deleted.
- `section-devolver.png` is the only devolver image now.

**Earlier C05 correction notes still apply:** the original audit had the team-portrait slots labelled in the opposite order and the third slot as `null`. C05 fixed both, then reorganised the file names to match the display order (Daniela-1, MP-2, Carla-3).

**P02 file-swap correction:** during the P02 cycle, the user discovered that the two raster files were swapped between the Intro hero and the Devolver section in the manifest. The files themselves have always been on disk under the swapped names:

- `team-illustration.png` (982×1052) is the team photo used in the Devolver section (paper-clip illustration and "Creation Connection" sticker are baked in). It is now exposed via `nosotras.sectionDevolver[0]`.
- `section-devolver.png` (894×778) is the navy line-art illustration of three women used in the Intro hero. It is now exposed via `nosotras.teamIllustration`.

The P02 cycle record logs the swap as a one-line manifest fix; no file on disk was moved, renamed, or re-rendered. Both slots now have real alts (the C03 `tbd` placeholders are gone).

### 3.8 Contacto — page assets (`public/images/pages/contacto/`)

| Path                                          | Manifest key       | On disk | Alt                                                      | Use                                                            |
| --------------------------------------------- | ------------------ | ------- | -------------------------------------------------------- | -------------------------------------------------------------- |
| `pages/contacto/contact-hero-1.jpg` (552×653) | `contacto.hero[0]` | ✓       | "Integrante de NOI hablando por teléfono con un cliente" | Contact hero, the larger top portrait (woman on the phone).    |
| `pages/contacto/contact-hero-2.jpg` (489×556) | `contacto.hero[1]` | ✓       | "Integrante de NOI revisando un proyecto en su laptop"   | Contact hero, the smaller bottom portrait (woman with laptop). |

**P03 alt-text update:** the two C03 `TODO ALT` placeholders are filled in during the P03 cycle. The hero collage is `aria-hidden="true"` in the implementation (the semantic heading + lede carry the page intent), so the per-image `alt=""` is acceptable; the manifest keeps the descriptive alts for any future use of the same images (e.g. JSON-LD image, OG image sourcing).

### 3.9 Proyectos — portfolio project images (`public/images/proyectos/`)

> **Status:** Projects are present on disk and in the manifest. The corresponding pages (`/portafolio`, `/portafolio/[slug]`) are **blocked on design approval** (P04, P05, P06). The inventory is recorded here so the C10, P05 and P06 cycles have a complete baseline.

Per-project summary (every project has the same structure: `<slug>-large`, `<slug>-med`, `<slug>-cover`, `<slug>/portafolio/detail-N.jpg`):

| Slug              | large         | med               | cover         | detail count | Notes                                                                                                                                                        |
| ----------------- | ------------- | ----------------- | ------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `content-lab`     | ✓ (1184×1356) | ✓ (530×552, .png) | ✓ (1440×990)  | 3            | All on disk.                                                                                                                                                 |
| `crea-desde-cero` | ✓ (1184×1356) | ✓ (530×552, .jpg) | ✓ (1440×1002) | 5            | All on disk.                                                                                                                                                 |
| `jaze`            | ✓ (1184×1348) | ✓ (530×552, .png) | ✓ (1440×999)  | 6            | All on disk.                                                                                                                                                 |
| `nayeenails`      | ✓ (1184×1356) | ✓ (530×552, .png) | ✓ (1440×999)  | 5            | All on disk.                                                                                                                                                 |
| `simbi-cakes`     | ✓ (1184×1348) | ✓ (530×552, .png) | ✓ (2880×2042) | 7            | All on disk. The manifest key was renamed `simbi` → `simbi-cakes` in P05 to match the folder on disk and produce the friendly URL `/portafolio/simbi-cakes`. |
| `veritomom`       | ✓ (1184×1356) | ✓ (530×552, .png) | ✓ (1440×995)  | 6            | All on disk.                                                                                                                                                 |

Total proyecto files on disk: **~60**. Every file is referenced by the manifest and is verified by the `tests/assets.test.ts` dimensions check.

---

## 4. Manifest drift (deferred to C04/P01..P06)

The following drift exists between the manifest and the Figma-confirmed reality. C03 documents it; C04 (tokens) and P01..P06 (page implementation) will resolve it.

| Issue                                                                                                                                      | Source                                                                                                                                                         | Status                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `home.ctaCollage` was `null`                                                                                                               | No Figma-visible images for the home final CTA collage                                                                                                         | **Resolved in P01.** The slot is now an array of three `RasterAsset` entries pointing at the hero collage images (1, 2, 3), reused per the C03 audit's documented fallback. Q01 may swap to a designer-supplied collage.                                           |
| `nosotras.teamPortraits[2]` is `null`                                                                                                      | ~~Carla portrait missing~~ **Superseded by C05 correction.** All three team members have portraits on disk.                                                    | —                                                                                                                                                                                                                                                                  |
| (was) `nosotras.sectionDevolver` had two slots and the second was a `.png`                                                                 | ~~Asset format inconsistency~~ **Superseded by C05 rename.** `section-devolver-2.png` is now `section-devolver.png`; the devolver section uses a single image. | —                                                                                                                                                                                                                                                                  |
| `home.headerWheel[0..8]` exists on disk but is not visibly used in the approved frame                                                      | Figma reference does not show a 9-image wheel                                                                                                                  | **Resolved in P01.** The manifest slot is now `null`. The 9 `header-wheel-N.png` files stay on disk per the C03 rule (no moving single images). If a future cycle needs a wheel, the files are still on disk.                                                      |
| P01 TODO alts (`home.heroCollage[*]`, `home.sectionBrandingPortrait`, `home.ctaCollage[*]`)                                                | Content not yet supplied                                                                                                                                       | **Resolved in P01.** Alts are now: "Persona trabajando en su laptop", "Persona trabajando con material de marca", "Persona revisando su teléfono y un cuaderno", "Mujer leyendo un libro con concentración".                                                       |
| `nosotras.teamIllustration` is declared as `.png` but the visual is line art                                                               | The asset is likely a rasterised SVG                                                                                                                           | **Q01**. P02 surfaced this as a residual TODO; the Intro hero renders the raster as-is. The Devolver section's "team photo" slot now points at the actual team photo (`team-illustration.png`), so the `teamIllustration` label is the one that needs vectorising. |
| `shared.figuras.figura1`, `figura2` are NOT the orange "2" decorations                                                                     | The audit was wrong; the actual SVGs are cream scallop dividers, not numerals.                                                                                 | **Resolved in P01.** P01 introduced a new `DecorativeShape` component (inline SVG, best-effort path) for the orange abstract curve. The `shared.figuras` entries remain unused; P01 did not consume them.                                                          |
| Several stickers have no clear frame use (`manosAzul`, `manosRojo`, `doodleMarino`, `ilustracion03/04/08`, `laptopCeleste`, `blobCeleste`) | Best-effort matching without Figma                                                                                                                             | **C04 / P02..P06**. If a frame does not use a sticker, mark the slot as `null` in the manifest instead of leaving it dangling. P01 uses `megafonoRojo` (Branding + Services), `laptopCeleste` (Services), and `manosNaranja` (Final CTA). The rest stay untouched. |
| `nosotras.sectionDevolver[1]` is `.png` while `[0]` is `.jpg`; the visual is a single photo composition                                    | Asset format inconsistency                                                                                                                                     | **C04 / P02**. Investigate whether the second asset is a sticker overlay rather than a raster photo.                                                                                                                                                               |
| Final SEO/social/contact metadata (OG image, favicon, social URLs, phone, address)                                                         | Not in the manifest                                                                                                                                            | **C08**.                                                                                                                                                                                                                                                           |
| P01: exact path data of the orange `DecorativeShape`                                                                                       | P01 ships a best-effort approximation from the PNG; the audit was wrong about the shape being a "2".                                                           | **Q01**. Confirm via Figma MCP.                                                                                                                                                                                                                                    |
| P01: third testimonial is a documented placeholder                                                                                         | Figma shows three testimonials but only two names are legible.                                                                                                 | **Q01**. Real copy from the studio.                                                                                                                                                                                                                                |

---

## 5. Asset actions deferred to later cycles

- C04 will not rename or move any file under `public/`. C04 only consumes the manifest.
- C06 will create primitives for the patterns that are confirmed across the three approved frames (header, footer, mixed-font heading, scalloped section, contact icon tile, section eyebrow). It will **not** create a primitive for the orange "2" decorations unless they appear in more than one approved frame (they do not).
- C08 will add favicon, OG image, robots and sitemap metadata; it will add the missing SEO/social/contact metadata.
- C10 will not touch the asset manifest.
- P01 will resolve the `home.ctaCollage` gap and confirm or remove the `home.headerWheel` array.
- ~~P02 will resolve the `nosotras.teamPortraits[2]` gap and confirm or promote the team illustration.~~ **Completed in P02**: all three team members have portraits on disk and the file names match the display order; the `teamIllustration` ↔ `sectionDevolver[0]` file-swap was fixed and the vectorisation TODO was carried into Q01.
- P04, P05, P06 are blocked on design approval; they will not start before then.

---

## 6. Cross-references

- [`FIGMA_AUDIT.md`](./FIGMA_AUDIT.md) — full visual audit, including the sticker matching, the cross-frame inconsistencies, and the provisional `DESIGN.md` values.
- [`../implementation/cycles/C03-figma-audit.md`](../implementation/cycles/C03-figma-audit.md) — the C03 cycle record.
- [`../../public/assets/README.md`](../../public/assets/README.md) — the asset naming and usage rules that this inventory follows.
