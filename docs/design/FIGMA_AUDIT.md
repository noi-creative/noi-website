# Figma audit — NOI Creative

**Status:** Audit complete, sourced from supplied PNG references.
**Sources:** `references/home/home.png`, `references/nosotras/nosotras.png`, `references/contact/contacto.png`, plus the `DESIGN.md` token system and the `src/lib/assets.ts` manifest.
**Visual source of truth:** the approved Figma file (not directly accessible in this session; the PNG references are an acceptable proxy, but exact pixel values for layout, spacing and container widths still require Figma MCP confirmation in a later cycle).

---

## 1. Header (shared across all three pages)

**Observed on all three frames** — identical, with one subtle page-level background interaction (the home and nosotras headers appear on a cream/yellow background before the hero, the contact header appears directly on a burgundy hero; the pill shell is consistent in both cases).

Visual rules:

- Sticky position, sits above every section.
- Rounded pill shell, light cream surface (`var(--color-surface-cream)`), generous internal padding.
- Logo on the left (`noi` mark, blue) — supplied as SVG (`/images/shared/logo/noi-azul.svg`).
- Navigation links centred: `Nosotras`, `Portafolio`, `Servicios`, `Contacto` (Satoshi Medium/Bold).
- "Hablemos" CTA on the right: burgundy pill, white text, trailing arrow icon.
- Soft drop shadow visible against all backgrounds.
- No full-width edge-to-edge treatment.

Conformance with `DESIGN.md` §15: **Confirmed** for desktop behaviour. The page-level background interaction is consistent with the design system: the same pill shell works on cream, yellow and burgundy because it always sits on its own cream surface.

| Pattern                                       | Status                                          |
| --------------------------------------------- | ----------------------------------------------- |
| Sticky, rounded pill shell                    | Confirmed                                       |
| Logo on the left                              | Confirmed                                       |
| 4 nav links + "Hablemos" CTA                  | Confirmed                                       |
| Mobile dropdown (not shown in desktop frames) | Pending design approval (Figma mobile variants) |

---

## 2. Footer (shared across all three pages)

**Observed on all three frames** — identical pattern, identical content (modulo the "ESTUDIO" links which currently show only `Nosotras`, `Portafolio`, `Servicios`).

Visual rules:

- Navy background (`var(--color-brand-navy)`).
- White NOI Creative logo on the left (`noi` mark in cream, `creative` in cream).
- "Suscríbete a nuestro newsletter" form: cream-coloured input with placeholder "Tu correo electrónico", orange "Suscribir" pill button.
- "INFORMACIÓN DE CONTACTO" block: email + social icons (Instagram, LinkedIn, TikTok). WhatsApp appears only on the contact page, not the footer.
- "ESTUDIO" block: `Nosotras`, `Portafolio`, `Servicios` links.
- Copyright + legal links (`Privacidad`, `Términos y condiciones`).

Conformance with `DESIGN.md` §22.8: **Confirmed** for the desktop layout. The social icon set is `instagram`, `linkedin`, `tiktok`; `whatsapp` is not used in the footer on any of the three approved pages.

| Pattern                                    | Status    |
| ------------------------------------------ | --------- |
| Navy background, cream logo                | Confirmed |
| Newsletter form (input + orange Suscribir) | Confirmed |
| Contact + social + studio columns          | Confirmed |
| Legal links at bottom                      | Confirmed |

---

## 3. Colour system

The seven brand colours from `DESIGN.md` §4.1 are all present in the frames, in the expected roles:

| Token                    | Hex       | Where observed                                                                                                                                                                                                                                                                                          | Status    |
| ------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `--color-brand-navy`     | `#00385C` | Header shell, footer, "Devolver lo humano" section background (Nosotras), navy form card (Contacto), contact icons backgrounds                                                                                                                                                                          | Confirmed |
| `--color-brand-yellow`   | `#FFEDAE` | "El branding no es un momento" section, Nosotras intro hero background, Contacto "NOI existe para acompañarte" scalloped backdrop, primary CTA ("Agenda tu llamado", "Agenda tu llamada gratuita")                                                                                                      | Confirmed |
| `--color-brand-burgundy` | `#810C18` | Portafolio section background, Contacto hero background, "Hablemos" header CTA, "Agenda tu llamada gratuita" home CTA, Navieras testimonial cards, "Merece un equipo…" inline accent                                                                                                                    | Confirmed |
| `--color-surface-cream`  | `#FFF9F4` | Main page background, card surfaces, header pill, footer social-icon background                                                                                                                                                                                                                         | Confirmed |
| `--color-brand-orange`   | `#ED7218` | Primary CTAs ("Ver todos los servicios", "ENVIAR", "Suscribir", "Agenda tu llamada de orientación"), accent words ("juntos", "tiempo", "de manera", "acompañarte", "tu marca"), process timeline connector, Instagram icon, large decorative "2" elements, phone/hand stickers, scalloped bottom curves | Confirmed |
| `--color-surface-blue`   | `#DCE4F4` | "Marcas que confiaron" testimonials section (Home), "¿Trabajamos juntos?" final CTA (Nosotras)                                                                                                                                                                                                          | Confirmed |
| `--color-brand-ink`      | `#001C36` | Body copy, headings on light surfaces, dark input fields on the navy form card, "Tu marca merece…" inline emphasis                                                                                                                                                                                      | Confirmed |

**No new colours observed.** The brand palette is sufficient for every approved frame.

**No gradients** observed except the yellow scalloped backdrop on the contact page, which is a flat colour with an organic SVG edge — not a CSS gradient. Conformance with `DESIGN.md` §4.4 (no gradients) maintained.

---

## 4. Typography

### 4.1 Font roles in use

| Role                                  | Family           | Weight                                     | Examples                                                                                                                                                                                         |
| ------------------------------------- | ---------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Oversized display headlines           | Satoshi          | Bold (700) / Black (900) — uppercase       | `MARCAS CON`, `El branding no es un momento`, `Un equipo de tres.`, `Hablemos de`, `PORTAFOLIO`                                                                                                  |
| Italic mixed-font phrases             | Playfair Display | Italic (400/500)                           | `estrategia`, `significa nosotros.`, `AL PROCESO CREATIVO.`, `para crecer con coherencia.`, `Un solo proceso.`, `juntos?`, `tu marca`, `acompañarte`, `tienes en mente?`, `de manera`, `aquí`    |
| Editorial accent (testimonial labels) | Playfair Display | Italic                                     | `"lo que más me gustó…"`, "lo que hago…" (subtle use inside quotes)                                                                                                                              |
| Section headings (mid-size)           | Satoshi          | Bold (700)                                 | `Todo lo que tu marca necesita…`, `Devolver lo humano`, `Marcas que confiaron…`, `También puedes encontrarnos aquí`, `¿Prefieres que te contactemos?`                                            |
| Body copy                             | Satoshi          | Regular (400)                              | All paragraph text                                                                                                                                                                               |
| Body emphasis (bold)                  | Satoshi          | Bold (700)                                 | `creemos en las personas.`, `sentarnos contigo, escuchar tu historia y trazar juntas el camino visual de tu marca.`, `Merece un equipo…`, `porque tu proyecto lo merece.`                        |
| Eyebrows (uppercase, tracked)         | Satoshi          | Medium/Regular (500) with wide tracking    | `POR QUÉ NOI ES DIFERENTE`, `LO QUE HACEMOS`, `NUESTRO MÉTODO`, `LO QUE DICEN NUESTROS CLIENTES`, `QUIÉNES SOMOS`, `POR QUÉ EXISTIMOS`, `LAS PERSONAS DETRÁS DE NOI`, `EL PRIMER PASO ES SIMPLE` |
| Navigation                            | Satoshi          | Medium/Bold (500/700)                      | Header links                                                                                                                                                                                     |
| CTA labels                            | Satoshi          | Bold (700), uppercase optional             | "Hablemos", "Agenda tu llamado", "Ver portafolio", "Ver todos los servicios", "ENVIAR", "Suscribir", "Agenda tu llamada de orientación"                                                          |
| Form labels                           | Satoshi          | Medium/Bold (500/700), uppercase + tracked | "CORREO ELECTRÓNICO*", "NOMBRE*", "SERVICIO A COTIZAR*", "RANGO DE INVERSIÓN PREVISTO*", "RED SOCIAL DE LA MARCA (OPCIONAL)", "COMENTARIOS ADICIONALES (OPCIONAL)"                               |
| Form inputs                           | Satoshi          | Regular (400)                              | `hola@ejemplo.com`, `Tu nombre`, `@tuusuario`                                                                                                                                                    |
| Footer legal/copyright                | Satoshi          | Regular (400)                              | `© 2025 Studio NOI. Todos los derechos reservados.`, `Privacidad`, `Términos y condiciones`                                                                                                      |

**Panel Sans**: **not used in any of the three approved frames.** The pre-staged `PanelSans-Regular.otf` and `PanelSans-Bold.otf` are an asset but no Figma-confirmed Panel Sans moment exists yet. Recommended action: keep the files staged, but **do not** wire `Panel Sans` into `next/font/local` until at least one Figma-approved moment is identified (otherwise we ship a font that no approved page uses, violating the LCP/performance budget in `PRD.md` §23). If a future cycle (P01..P08) reveals a Panel Sans moment, C04 will add it then.

### 4.2 Mixed-font phrase pattern

Every page uses the same structural pattern: a Satoshi (Bold) primary phrase, ending or interrupted by a Playfair Display Italic accent. This is the most repeated typographic device in the system and is the reason Playfair Display is non-optional.

| Page                  | Satoshi part                                      | Playfair part                             |
| --------------------- | ------------------------------------------------- | ----------------------------------------- |
| Home hero             | `MARCAS CON`                                      | `estrategia`                              |
| Home branding         | `El branding no es un momento,` / `ES UN PROCESO` | (no italic; two lines, different weights) |
| Home services         | `Todo lo que tu marca necesita`                   | `para crecer con coherencia.`             |
| Home portafolio       | `Estructura visual para marcas`                   | `que buscan crecer`                       |
| Home process          | `Hacemos las cosas`                               | `de manera diferente.`                    |
| Home testimonials     | `Marcas que confiaron`                            | `en el proceso`                           |
| Home final CTA        | `¿Lista para construir la marca que`              | `tienes en mente?`                        |
| Nosotras intro        | `Somos NOI. Y NOI`                                | `significa nosotros.`                     |
| Nosotras devolver     | `Devolver lo humano`                              | `AL PROCESO CREATIVO`                     |
| Nosotras team         | `Un equipo de tres.`                              | `Un solo proceso.`                        |
| Nosotras final CTA    | `¿Trabajamos`                                     | `juntos?`                                 |
| Contacto hero         | `Hablemos de`                                     | `tu marca`                                |
| Contacto encontrarnos | `También puedes`                                  | `encontrarnos aquí`                       |
| Contacto brand        | `NOI existe para`                                 | `acompañarte`                             |

**Figma-confirmed: Yes.** The pattern is consistent and intentional; C04 must implement it as a reusable mixed-font heading primitive.

### 4.3 Quote treatment

Only the testimonials section uses blockquotes (and very lightly — the visible "lo que más me gustó fue…" treatment is just Playfair Italic inside a navy card). There is no formal `blockquote` semantic in the current approved frames, so `DESIGN.md` §5.4 ("Playfair for quote body copy") is provisional — confirmed only inside the testimonial card body text.

---

## 5. Spacing and rhythm

**Observed at 1440 px** (approximate, not measured):

- Section vertical padding is **very generous** — typically 6–10 rem of top and bottom padding on the cream sections, tighter on dark sections.
- Section-to-section transitions: cream → navy → cream → burgundy → cream → blue → cream → navy. The rhythm is intentional, not a coincidence.
- Internal card spacing in the service row is small (cards touch or nearly touch) — the "row" reads as a continuous strip.
- Testimonial card stack uses generous gap (~2 rem) and visible overlap (the front card overlaps the two behind it).
- Form card has very large internal padding (~3 rem).

**Conformance with `DESIGN.md` §8**: the spacing scale (`--space-0` to `--space-12`) appears consistent with the observed values. **No exact measurements from screenshots** — those require Figma MCP.

---

## 6. Container and grid

**Observed at 1440 px**:

- The home hero uses a roughly 60/40 split (text left, collage right) with the collage extending past the right edge of the page (overhang into the gutter).
- The "Devolver lo humano" section uses ~45/55 (image left, text right) with the image inside the container.
- The services row appears to span the full container width with cards almost touching the edges.
- The portafolio section uses ~55/45 (heading + body + CTA left, collage right) with the collage bleeding into the right gutter.
- The contact form uses ~40/60 (contact methods left, form right) at 1440 px.

**DESIGN.md §9** proposes three containers (`content`, `wide`, `viewport`). The approved frames use what reads as a mix of `wide` for editorial sections and `viewport` for sections with collages. **Exact widths require Figma MCP.**

---

## 7. Radii

**Observed**:

- Header pill: very large (~ pill or 2 rem).
- CTAs: pill (`--radius-pill`).
- Image cards: large radius (`--radius-lg` or `--radius-xl`).
- Form card: very large radius (`--radius-xl`).
- Service cards: medium-large radius, varying rotations.
- Sticker badges: full pill or full circle.

**Conformance with `DESIGN.md` §11**: **Confirmed**. No new radii needed.

---

## 8. Shadows and elevation

**Observed**:

- Header: soft drop shadow (visible against every background).
- Sticker badges: very subtle drop shadow.
- Form card: subtle elevation.
- Service cards: no shadow — colour does the separation.
- Testimonial cards: visible elevation for the front card, none for the cards behind.

**Conformance with `DESIGN.md` §12**: **Confirmed**. Shadows are used sparingly.

---

## 9. Button variants (observed across the three pages)

| Variant                      | Example                                                                             | Where                                                      |
| ---------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Primary yellow pill          | "Agenda tu llamado", "Agenda tu llamada gratuita" (Contacto)                        | Home hero, Contacto hero                                   |
| Primary burgundy pill        | "Hablemos", "Agenda tu llamada gratuita" (Home final CTA)                           | Header, Home final CTA                                     |
| Primary orange pill          | "Ver todos los services", "ENVIAR", "Suscribir", "Agenda tu llamada de orientación" | Services section, Contact form, Footer, Nosotras final CTA |
| Outline white pill (on dark) | "Ver portafolio"                                                                    | Home hero                                                  |
| Outline navy pill (on light) | "Conoce cómo trabajamos", "Escríbenos directamente"                                 | Home process, Home final CTA                               |
| Text link (footer legal)     | "Privacidad", "Términos y condiciones"                                              | Footer                                                     |

**Recommended button variants for C06** (per `DESIGN.md` §16, narrowed to what is actually used):

```text
primary-yellow
primary-burgundy
primary-orange
outline-on-dark
outline-on-light
text-link
```

The `DESIGN.md` §16 list also included `dark-outline` (text + dark border on light background), which is the same as `outline-on-light` here. The "text-link" variant is the underline-style legal link in the footer.

**Direction confirmed: only the six above.** C06 must not create more.

---

## 10. Form patterns (Contacto only)

**Observed**:

- Navy rounded card on cream background (`--color-brand-navy`).
- Yellow heading inside the card (`--color-brand-yellow`).
- Two-column field layout at desktop: `Correo electrónico` + `Nombre` on one row, `Servicio a cotizar` + `Rango de inversión previsto` on the next, then full-width `Red social de la marca` and `Comentarios adicionales`.
- Field labels: uppercase, tracked, white on the navy card.
- Inputs: transparent (no background fill), thin white underline.
- "ENVIAR" submit: orange pill, white text.
- Privacy checkbox: white square, navy checkmark when selected, label text "Acepto el tratamiento de mis datos conforme a la Política de Privacidad.".

**Conformance with `DESIGN.md` §17**: **Confirmed** for the desktop form. **Mobile form** (single-column) is not in the approved frames and needs Figma mobile variants before P03.

---

## 11. Image treatment and ratios

**Hero collages** (rotated rounded photo cards):

- Home: 3 portraits, each rotated ~3–6° in alternating directions, with the central image larger than the side ones.
- Contacto: 2 portraits + decorative phone/hand stickers.

**Branding portrait** (Home): a single tall portrait, no rotation, large radius.

**Portafolio strip** (Home): 4 square-ish images in a row (cookies, Jaze packaging, typography print, nail polish), each cropped tightly with light treatment.

**Process timeline** (Home): 4 numbered circles connected by a thin orange line; no images, just numbers and labels.

**Testimonials** (Home): portrait photos as backgrounds inside navy/burgundy cards, with the quote overlaid.

**Final CTA collages** (Home + Nosotras): 2–3 photos with sticker overlays and a hand/phone illustration sticker on Home.

**Devolver section** (Nosotras): one large photo of three women working.

**Team** (Nosotras): 3 equal portrait cards, each with a coloured bottom accent (Daniela navy, María Patricia burgundy, Carla red). Only 2 portraits currently on disk (Daniela, María Patricia). Carla's portrait is **missing** (manifest `null`).

**Contact hero** (Contacto): 2 portraits with sticker overlays.

**Ratios observed**: portraits ~ 3:4 or ~ 4:5. Square assets are roughly 1:1. None of the photos appear cropped to unusual ratios.

**Focal-point metadata**: not required for the current approved frames; the crops are generous and centred. Will be reconsidered if P05/P06 reveals a hero image that needs a specific focal point.

---

## 12. SVGs, illustrations and organic shapes

**Stickers observed in the frames but not all in the manifest** (the manifest has a generous sticker set, but the C03 audit couldn't match every sticker to a specific frame use without Figma MCP). The matching is best-effort:

| Sticker (in manifest)              | Likely use observed                                                                                                         |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `sticker-megafono-rojo.svg`        | "El branding" section, top-left of the portrait card (Home)                                                                 |
| `sticker-laptop-celeste.svg`       | Not clearly observed; could be a Services icon                                                                              |
| `sticker-manos-naranja.svg`        | Home final CTA, bottom-right of the collage (the hand/phone illustration)                                                   |
| `sticker-manos-azul.svg`           | Not clearly observed                                                                                                        |
| `sticker-manos-rojo.svg`           | Not clearly observed                                                                                                        |
| `sticker-megafono-rojo.svg`        | Same as above                                                                                                               |
| `sticker-bombilla-amarilla.svg`    | "Devolver lo humano" section (Nosotras), the small lightbulb near the top of the image                                      |
| `sticker-telefono-amarillo.svg`    | Contact hero, the retro telephone illustration (yellow outline)                                                             |
| `sticker-blob-celeste.svg`         | Possibly the process timeline backdrop                                                                                      |
| `sticker-blob-amarillo.svg`        | Possibly the contact "NOI existe para acompañarte" scallop                                                                  |
| `sticker-doodle-marino.svg`        | Not clearly observed                                                                                                        |
| `sticker-ilustracion-03/04/08.svg` | Not clearly observed (numbered series, likely for Servicios cards)                                                          |
| `figura-1.svg`, `figura-2.svg`     | Possibly the orange "2" decorative number (Home) — needs Figma confirmation                                                 |
| `icon-email.svg`                   | Contact section, navy tile (background)                                                                                     |
| `icon-email-soft.svg`              | Footer, cream tile (background)                                                                                             |
| `icon-instagram.svg`               | Footer + Contact details, orange tile                                                                                       |
| `icon-linkedin.svg`                | Footer, cream tile                                                                                                          |
| `icon-location.svg`                | Contact section, navy tile                                                                                                  |
| `icon-tiktok.svg`                  | Footer, cream tile                                                                                                          |
| `icon-whatsapp.svg`                | Contact section, burgundy tile                                                                                              |
| `noi-azul.svg`                     | Header logo                                                                                                                 |
| `noi-blanco.svg`                   | Footer logo (cream/white)                                                                                                   |
| `creative-amarillo.svg`            | Nosotras intro hero, top-right of the cream speech-bubble (yellow "creative" word)                                          |
| `creative-rojo.svg`                | Nosotras intro hero, top-right of the cream speech-bubble (red "creative" word, used in the line-art illustration backdrop) |

**The "9 header-wheel images" in `home.headerWheel` are not visibly used in the Home reference frame.** They may be intended for a section that is not in the approved desktop screenshot (a project wheel, a hero variation), or they may be unused assets. **TODO pending Figma MCP**: confirm whether the `headerWheel` array is used in the approved Home composition. If not, the manifest slot is a placeholder for future content and should be marked `null` instead.

**The "Ilustración equipo" on Nosotras** is a line-art illustration in the cream speech-bubble. The manifest has it as `teamIllustration` (a `.png` raster, not an SVG). This is a contradiction: the visual is clearly vector line art, but the manifest declares it as a raster `.png`. **TODO**: confirm whether `team-illustration.png` is a rasterised SVG or a true raster. C04/P02 may want to convert it to `.svg` for sharper rendering at scale.

---

## 13. Repeated patterns (only those confirmed across two or more pages)

| Pattern                                          | Home                        | Nosotras                   | Contacto                  | Confirmed?                                                                       |
| ------------------------------------------------ | --------------------------- | -------------------------- | ------------------------- | -------------------------------------------------------------------------------- |
| Sticky pill header                               | ✓                           | ✓                          | ✓                         | **Yes** — implement in C07                                                       |
| Navy footer with newsletter                      | ✓                           | ✓                          | ✓                         | **Yes** — implement in C07                                                       |
| Mixed-font heading (Satoshi + Playfair Italic)   | ✓                           | ✓                          | ✓                         | **Yes** — implement in C06                                                       |
| Scalloped section boundaries                     | ✓ (yellow→cream)            | ✓ (cream→navy, navy→cream) | (only the yellow scallop) | **Yes** — implement in C04                                                       |
| Service card row with rotations                  | ✓                           | —                          | —                         | Home-only — but the pattern of "rotated colourful cards" can be reused if needed |
| Numbered timeline                                | ✓                           | —                          | —                         | Home-only — only reuse if P04 (Servicios) or a future cycle requires it          |
| Testimonial card stack                           | ✓                           | —                          | —                         | Home-only — only reuse if a future page needs testimonials                       |
| Photo collage with rotation                      | ✓                           | —                          | ✓                         | **Yes** — same construction on Home hero and Contact hero                        |
| Contact icon tile (coloured square + white icon) | —                           | —                          | ✓                         | Contact-only — but the tile pattern is reusable                                  |
| Section eyebrow (uppercase, tracked)             | ✓                           | ✓                          | ✓                         | **Yes** — implement in C04/C06                                                   |
| Large "2" decorative number (orange)             | ✓ (Hero + Branding section) | —                          | —                         | Home-only — single use observed, do not implement as a primitive                 |
| Team card with coloured bottom accent            | —                           | ✓                          | —                         | Nosotras-only — implement inline in P02 if the design survives P02's review      |

---

## 14. Cross-frame inconsistencies

| Inconsistency                                                                                                                                                                                                                                                                               | Where                          | Severity                   | Resolution                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| "Hablemos" CTA in header is `var(--color-action-secondary)` (burgundy) on all three pages. Home and Nosotras show the dark pill on a light header surface, but Contacto shows the same pill on a header that overlays a burgundy hero — the contrast is fine but the visual rhythm changes. | Header                         | Low                        | Acceptable; the pill has its own cream surface that lifts it off any background.                                                                                                                 |
| Home final CTA uses burgundy "Agenda tu llamada gratuita"; Contacto hero uses yellow "Agenda tu llamada gratuita". Same label, different colour.                                                                                                                                            | Home final CTA + Contacto hero | Note, not an error         | Intentional: the home page pairs burgundy with its own collage; the contact page uses yellow on the burgundy hero for contrast. C06 should treat them as separate variants, not the same button. |
| "Merece un equipo…" body text on Nosotras uses Playfair Italic for the word "Merece"; the same emphasis pattern is not used elsewhere.                                                                                                                                                      | Nosotras "Devolver" section    | Note                       | The Playfair inline-italic body emphasis is rare. Confirmed only here. Do not promote to a system pattern.                                                                                       |
| Contact details block on Contacto uses the WhatsApp icon; the home and nosotras footers do not.                                                                                                                                                                                             | Footer vs. Contact section     | Note                       | Intentional: WhatsApp is a contact channel surfaced only on the contact page.                                                                                                                    |
| The portafolio section in Home shows 4 small images; the `headerWheel` array in the manifest has 9 images.                                                                                                                                                                                  | Home                           | **TODO pending Figma MCP** | Confirm whether `headerWheel` is part of the approved composition or leftover from a draft.                                                                                                      |
| The Nosotras "team illustration" appears in the manifest as a `.png` but the visual is clearly vector line art.                                                                                                                                                                             | Nosotras                       | **TODO pending Figma MCP** | Confirm asset type; consider promoting to `.svg` in C04/P02.                                                                                                                                     |
| The "2" decorative numbers on Home are very large and not declared in the manifest.                                                                                                                                                                                                         | Home                           | **TODO**                   | Add a `decorative-numbers` slot to the manifest in C04 if these are reusable, or render them as inline SVG in P01.                                                                               |
| The contact hero "telephone" sticker matches `sticker-telefono-amarillo.svg` by name only; the visual is a complex line illustration that may be a separate asset.                                                                                                                          | Contacto                       | **TODO pending Figma MCP** | Confirm asset identity.                                                                                                                                                                          |

---

## 15. Provisional `DESIGN.md` values that need Figma confirmation

The following `DESIGN.md` values are _provisional defaults_; the audit could not confirm them from the screenshots and they need Figma MCP before C04 finalises tokens:

| `DESIGN.md` section                                                                                                          | Value                                        | Status                                                                                                                                                                                                                                                                                                |
| ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| §5.5 weight mapping (body 400–500, nav 500–600, buttons 600–700, section 600–800, hero 700–900, Playfair 500–700 italic)     | Provisional                                  | The observed weights are consistent with the upper end (hero 700/900, buttons 700). C04 will load the four Satoshi weights and two Panel Sans weights agreed in C01, but the actual weight assigned to each role (e.g. is the hero `Satoshi-Bold` (700) or `Satoshi-Black` (900)?) must be confirmed. |
| §6 fluid type scale (`--font-size-xs` to `--font-size-hero`)                                                                 | Provisional                                  | The `clamp()` values look reasonable but the max values for `xl`/`2xl`/`hero` are not pinned. C04 will use these defaults unless Figma contradicts.                                                                                                                                                   |
| §7 line-height tokens                                                                                                        | Provisional                                  | The display line-heights in the frames are very tight; the proposed `--line-height-tight: 0.92` is a good approximation.                                                                                                                                                                              |
| §8 spacing scale                                                                                                             | Provisional                                  | The 12-step scale is consistent with what's observed. C04 will use it.                                                                                                                                                                                                                                |
| §9 layout tokens (`--container-content: 72rem`, `--container-wide: 82rem`, `--container-viewport: 90rem`, `--page-gutter-*`) | Provisional                                  | **Need Figma confirmation.** The collages bleed into the gutter, so a single container width won't do.                                                                                                                                                                                                |
| §10 breakpoints                                                                                                              | Provisional                                  | Confirmed by observation (the frames are at 1440 px and there are no mobile variants).                                                                                                                                                                                                                |
| §11 radii                                                                                                                    | Provisional but **confirmed by use**         | The observed radii map cleanly onto the proposed scale.                                                                                                                                                                                                                                               |
| §12 shadows                                                                                                                  | Provisional                                  | The header shadow is the most visible. C04 will keep the proposed values.                                                                                                                                                                                                                             |
| §13 z-index                                                                                                                  | Provisional but **confirmed by observation** | Header is above content but below overlays. C04 will use the proposed scale.                                                                                                                                                                                                                          |

---

## 16. Missing assets, fonts and metadata

| Item                                                                           | Status                                                                              | Action                                                                                                                                                                        |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `home.ctaCollage` (3 images for the Home final CTA collage)                    | **Missing** in the manifest (`null`). Not visible on disk either.                   | C03 records this as a TODO. P01 will need to source or generate these images, or render the collage using existing images (e.g. reuse hero-collage-1..3 or sticker overlays). |
| `nosotras.teamPortraits[2]` (Carla's portrait)                                 | **Missing** in the manifest (`null`) and on disk.                                   | C03 records this as a TODO. P02 will need the asset.                                                                                                                          |
| Panel Sans in any approved frame                                               | **Not used.** The pre-staged `.otf` files are not referenced by any approved frame. | C04 will load them only if a future cycle introduces a Panel Sans moment; otherwise stay unloaded.                                                                            |
| Alt text on `tbd` placeholders                                                 | ~50 TODO alts across the manifest                                                   | C04 will not change them; P01/P02/P03 will set the alt as part of the page implementation. C03 records the count.                                                             |
| OG image, favicon                                                              | **Missing** in the manifest                                                         | C08 will add.                                                                                                                                                                 |
| Open Graph metadata, per-page descriptions                                     | **Missing**                                                                         | C08 will add.                                                                                                                                                                 |
| Final social URLs (`instagram.com/...`, `linkedin.com/...`, `tiktok.com/@...`) | **Missing** in the manifest                                                         | C08 will add as TODOs (not invented).                                                                                                                                         |
| Phone number `+1 (321) 337-4754` (visible in Contacto reference)               | **Missing** in the manifest                                                         | C08 will add as TODO (not invented by us — it's already supplied).                                                                                                            |
| Address `Orlando, Florida — Atendemos clientes en todo el mundo`               | **Missing** in the manifest                                                         | C08 will add as TODO.                                                                                                                                                         |

---

## 17. Inventory of asset files vs. manifest vs. disk

The full per-file inventory lives in [`ASSET_INVENTORY.md`](./ASSET_INVENTORY.md). The summary:

- **Shared assets (logo, iconos, figuras, stickers):** 4 + 7 + 2 + 13 = **26 files**, all present on disk and in the manifest.
- **Home page assets:** 13 + 9 + 1 + 0 (ctaCollage is null) = **23 files** on disk, manifest matches except for `ctaCollage` (null) and the `headerWheel` question.
- **Nosotras page assets:** 1 + 2 + 2 (third is null) = **5 files** on disk, manifest matches except for `teamPortraits[2]`.
- **Contacto page assets:** **2 files** on disk, manifest matches.
- **Proyectos (portfolio) assets:** 6 projects × ~10 files = **~60 files** on disk, manifest matches.

**No new asset files need to be invented in C03.** The gaps above are real missing items that the page cycles (P01..P06) will surface and resolve.

---

## 18. Audit summary

- The three approved frames are visually consistent and faithful to the brand palette in `DESIGN.md` §4.
- The mixed-font heading pattern (Satoshi + Playfair Italic) is the strongest repeated device and must be the first primitive C06 implements.
- The header pill, navy footer, scalloped section boundaries, contact-icon tile and section eyebrow are confirmed shared patterns — C07 and C06 must implement them.
- The exact container widths, font weight assignments, shadow values and spacing values still require Figma MCP to lock. The `DESIGN.md` defaults are reasonable working assumptions but should be re-validated when Figma MCP is available.
- Two real asset gaps need to be resolved before P01 and P02: the Home final-CTA collage and Carla's portrait.
- Panel Sans is staged but not used in any approved frame; do not wire it into `next/font/local` until a Panel Sans moment is confirmed.
