# Motion conventions

How the NOI Creative codebase uses **Motion** (the React animation library) — and how it deliberately does **not** use GSAP, CSS-in-JS or any other animation dependency. Established in cycle **C09**.

Authority: [`ADR-004`](../decisions/ADR-004-animation-strategy.md) (Motion only, no GSAP) and `AGENTS.md` §13 (animation rules).

---

## 1. SCSS vs Motion — who owns what

| Surface                                                                  | Owner  |
| ------------------------------------------------------------------------ | ------ |
| Hover, focus-visible, color change, underline                            | SCSS   |
| Disabled / invalid form visual state                                     | SCSS   |
| Simple opacity on state change                                           | SCSS   |
| Simple transform on state change                                         | SCSS   |
| **Viewport entrance** reveal (a section becomes visible while scrolling) | Motion |
| **Coordinated reveal** of a list of children with a stagger              | Motion |
| **Layout animation** (FLIP-style repositioning)                          | Motion |
| **Text reveal** (a heading whose words appear in sequence)               | Motion |
| **Collage motion** (overlapping images that subtly drift / respond)      | Motion |
| **Infinite carousel** behavior                                           | Motion |
| **Page-section animation logic** (a section's internal choreography)     | Motion |

The split is intentional. CSS handles state changes that are already paid for by the browser; Motion is reserved for behaviour the browser cannot do without JavaScript.

If you are tempted to add a Motion component for a hover, **don't**. Use the SCSS pseudo-classes and the existing `transition` rules in `_mixins.scss` / `_tokens.scss`.

---

## 2. The canonical import

Always import from the **React entry point**:

```ts
import { motion } from 'motion/react';
```

Never from `'motion'` (vanilla), `'framer-motion'` (the legacy name) or any other path.

If you need `MotionConfig`, `useReducedMotion`, `useScroll`, `useInView` or any other helper, import them from the same `'motion/react'` entry.

**Do not** re-export `motion` from the project barrel `@/lib/motion`. The barrel only exposes the project's own utilities (`DURATION`, `EASING`, `useReducedMotion`). The dependency is grep-able in every file that uses it.

---

## 3. Tokens — how to specify duration and easing

Hard-coded durations and easings are not allowed. Use the TypeScript mirror of the SCSS motion tokens:

```ts
import { motion } from 'motion/react';
import { DURATION, EASING } from '@/lib/motion';

<motion.div
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: DURATION.base, ease: EASING.out }}
  viewport={{ once: true, amount: 0.25 }}
/>;
```

The mirror lives in [`src/lib/motion/tokens.ts`](../../src/lib/motion/tokens.ts). The SCSS originals live in [`src/styles/_tokens.scss`](../../src/styles/_tokens.scss) under `--motion-duration-*` and `--motion-ease-*`.

**Always update both** in the same commit when a value changes.

- `DURATION.fast` → 0.12 s (small, frequent transitions)
- `DURATION.base` → 0.20 s (default; the right choice unless you have a reason)
- `DURATION.slow` → 0.36 s (large reveals, full-section choreography)
- `EASING.out` → cubic-bezier(0.2, 0.7, 0.2, 1) — entrances and reveals
- `EASING.in` → cubic-bezier(0.5, 0, 0.8, 0.4) — exits and dismissals

If a future Figma choreography requires a value not in this set, propose it in the next cycle; do not invent a new one inline.

---

## 4. Reduced motion — two accepted patterns

Both patterns honour `prefers-reduced-motion: reduce`. The right one depends on the section.

### 4.1 Per-component hook (default)

Use the project's `useReducedMotion` (re-exported from Motion's hook, with project conventions baked into the JSDoc) inside the smallest client component that needs it:

```tsx
'use client';

import { motion } from 'motion/react';
import { useReducedMotion, DURATION } from '@/lib/motion';

export function FadeUp({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0 : DURATION.base }}
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </motion.div>
  );
}
```

The rule: **non-essential movement is removed** (typically by setting `duration: 0` or by replacing the transform animation with opacity-only). The final visual state and all interaction are preserved.

### 4.2 Section-level provider (opt-in)

When a section has many child `motion.*` components that all share the same reduced-motion behaviour, prefer a single `<MotionConfig reducedMotion="user">` at the section's client-island boundary:

```tsx
'use client';

import { MotionConfig } from 'motion/react';

export function HeroCarousel({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.36 }}>
      {children}
    </MotionConfig>
  );
}
```

`reducedMotion="user"` tells Motion to automatically disable transform and layout animation on every descendant `motion.*` component, while preserving opacity-only animation.

Use this pattern when:

- A section has 3+ child `motion.*` components.
- The fallback behaviour is uniform across the section.
- The section is a small client island anyway (it would have been a `"use client"` wrapper for some other reason — the carousel, the menu, etc.).

Do **not** wrap the entire `(site)` layout in `<MotionConfig>`. A global provider would make the whole site a Client Component and would over-apply the fallback. ADR-004 forbids this until a demonstrated need exists.

---

## 5. The client-boundary pattern

Server Components are the default. Motion requires the `"use client"` directive. The pattern is to wrap **the smallest section that needs animation** in a Client Component, while keeping the rest of the page (and especially the page itself) on the server.

```tsx
// src/components/sections/HomeHero/HomeHero.tsx  (Server Component)
import { HomeHeroMotion } from './HomeHeroMotion';

export function HomeHero() {
  return (
    <section>
      <h1>...</h1>
      <HomeHeroMotion>{/* the collage */}</HomeHeroMotion>
    </section>
  );
}
```

```tsx
// src/components/sections/HomeHero/HomeHeroMotion.tsx  ('use client')
'use client';

import { motion } from 'motion/react';
import { DURATION, EASING } from '@/lib/motion';

export function HomeHeroMotion({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.slow, ease: EASING.out }}
    >
      {children}
    </motion.div>
  );
}
```

Naming convention: a `<Name>Motion.tsx` client wrapper alongside a `<Name>.tsx` server component. When the section is small enough that the client boundary is the whole section, the file is just `HomeHero.tsx` with `"use client"` at the top.

Do **not** add `"use client"` to a whole page because one of its sections needs animation. The pattern above keeps the page on the server.

---

## 6. Performance rules

From `DESIGN.md` §20. These are not negotiable.

- **No animation before the LCP content is visible.** The hero text and the LCP image must paint first; everything else animates around them.
- **Prefer `transform` and `opacity`.** They are compositor-only and do not trigger layout or paint.
- **Do not animate layout properties** (`width`, `height`, `top`, `left`, `margin`, `padding`). Use `transform` equivalents (`scale`, `translate`).
- **Do not run continuous animation across many large raster images.** It will trigger expensive repaints and tank the LCP. The portfolio carousel must use small, transformed thumbnails — not full-bleed rasters.
- **Use `viewport={{ once: true }}`** for reveals that should not replay when the user scrolls back. Repeating reveals on every viewport entry is distracting.
- **Avoid scroll-jacking.** No animation should hijack the scrollbar; the user always controls the scroll.
- **Stagger sparingly.** A 40–80 ms stagger across at most 6–8 children. Larger lists get a single collective reveal.

---

## 7. Accessibility — non-negotiable baseline

From `AGENTS.md` §13 and §25.

- Every Motion component must handle `prefers-reduced-motion: reduce` via one of the two patterns in §4.
- The final visual state must be the same with or without motion. **Reduced motion removes movement, not content.**
- Focus states are independent of motion. A focus-visible outline must always be visible, whether or not the element is animating.
- Decorative SVGs hidden from assistive technology must remain hidden. Animation does not change a11y semantics.
- The infinite portfolio carousel must pause or simplify under reduced motion. The default design is a reduced-motion-friendly static strip; the motion-enabled view is opt-in via the OS preference (i.e. always on, but reduced-motion-aware).

---

## 8. The "no animation presets" rule

From `AGENTS.md` §13 and `IMPLEMENTATION_WORKFLOW.md` §A01–A04.

**Two shared primitives now exist** in `src/lib/motion/`:

- `<RevealStagger>` — children-wrapper that reveals each child on viewport entry with a per-index delay. Used by the A02 + A03 text-column staggers and the per-item tile staggers.
- `<RevealItem>` — single-element motion wrapper that takes an `index` and applies the same delay formula. Used by `<RevealStagger>` internally and by the A02 + A03 per-`<li>` staggers (which need an explicit `index` to preserve `<ol>`/`<ul>` semantics).

Full documentation in §11. The worked "fade-up" snippet in §9 is still a reference, not a component; the two shared primitives are the source of truth for the entrance animation pattern.

**Other patterns remain bespoke, per section.** The per-element motion with `className` + `rotation` (used by the ContactHero collage photos and sticker) and the single-element fade-up or scale-in used for hero illustrations, decorative icons, and form cards are too varied across call sites to consolidate cleanly. AGENTS.md §26 explicitly warns against "deeply configurable components with many unrelated variants"; the per-section wrapper file is the right home for the per-section tuning.

A future section that needs a pattern that is **not** one of the two shared primitives (or a close variant) should follow the same approach as A02 + A03: own a small `"use client"` wrapper in its section folder, with the choreography approved per section. If the new pattern appears 2+ more times in later sections, the next shared-motion review (or the next A04-style cycle) considers extracting it.

The "fade-up" snippet in §9 is still a worked example for the docs. It is **not** a component to import — use `<RevealItem>` or `<RevealStagger>` instead.

---

## 9. Worked example — minimal "fade-up on viewport entry"

The canonical pattern, used only as a reference. Not a component. When the same pattern appears in at least two sections, the next cycle (or A04) extracts it.

```tsx
'use client';

import { motion } from 'motion/react';
import { useReducedMotion, DURATION, EASING } from '@/lib/motion';

export function FadeUp({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reducedMotion ? 0 : DURATION.base, ease: EASING.out }}
    >
      {children}
    </motion.div>
  );
}
```

Three things to notice:

1. `viewport={{ once: true }}` — the reveal does not replay on scroll-back.
2. The `y` initial value is `0` when reduced motion is on, so the element never moves.
3. The `duration` is `0` when reduced motion is on, so the opacity change is instant.

The final visual state is identical in both branches.

---

## 10. What C09 deliberately does not ship

To make the boundary explicit:

- **No global `<MotionConfig>` provider** in `(site)/layout.tsx`. Pages and the layout stay Server Components.
- **No animation in any existing component.** Header, Footer, NewsletterForm, SkipLink, every UI primitive — unchanged.
- **No `<FadeUp>`, `<Reveal>`, `<SectionMotion>` component** in `src/components/`. The pattern is in this document, not the source. (As of A04, this is the historical record; the two shared primitives now live in `src/lib/motion/`. See §8 and §11.)
- **No automated tests** for the motion modules. C11 installs Vitest; until then the verification surface is `npm run typecheck`.
- **No README rewrite, no inline JSDoc explosion** on every component. This document is the conventions home.

When A01–A04 starts, the first cycle will add the first real animation usage and, with it, the first section that may need a section-level `<MotionConfig>`. The decision will be made there, not pre-empted here.

---

## 11. Shared motion primitives (added in A04)

A04 reviewed the 15 motion wrappers introduced by A02 (Nosotras) and A03 (Contacto) and extracted the two patterns that appeared 2+ times with stable visual rules. The per-section wrapper files stay (co-location with the section is preserved), but each wrapper now shrinks to a thin shim that configures one of the two shared primitives with its per-section props.

### 11.1 `<RevealStagger>`

Children-wrapper that reveals each child on viewport entry with a per-index delay. The delay formula is `baseDelay + index * stepDelay`.

```tsx
import { RevealStagger } from '@/lib/motion';

<RevealStagger>
  <Eyebrow>...</Eyebrow>
  <h2>...</h2>
  <p>...</p>
</RevealStagger>;
```

**Props (all optional):**

| Prop        | Default         | Purpose                                                                                                             |
| ----------- | --------------- | ------------------------------------------------------------------------------------------------------------------- |
| `y`         | `16`            | Initial vertical translate in pixels. `0` when reduced motion is on.                                                |
| `stepDelay` | `0.08`          | Per-item delay step in seconds. The 80 ms per-step budget from §6.                                                  |
| `baseDelay` | `0`             | Initial delay before the first item.                                                                                |
| `amount`    | `0.25`          | Viewport `amount` threshold for `whileInView` (0–1). Element is considered "in view" when this fraction intersects. |
| `duration`  | `DURATION.base` | Animation duration in seconds.                                                                                      |

**Used by (A02 + A03):** `IntroHeroBodyMotion`, `DevolverTextColumnMotion`, `TeamHeaderMotion`, `TrabajarTextColumnMotion`, `ContactHeroTextBottomMotion`, `ContactDetailsHeadingMotion`. Each configures the props to its own per-section tuning; most use the defaults.

**Reduced motion:** handled internally by `useReducedMotion()` (per §4.1). When `true`, `y` is `0` and `duration` is `0`, so the reveal is opacity-only and instant. The final visual state is identical to the non-reduced case.

**Source:** [`src/lib/motion/RevealItem.tsx`](../../src/lib/motion/RevealItem.tsx) (the `<RevealStagger>` export is at the bottom of the same file; it is implemented in terms of `<RevealItem>` so the two share a single source of truth for the entrance animation).

### 11.2 `<RevealItem>`

Single-element motion wrapper that takes an explicit `index` and applies the same delay formula. Used by `<RevealStagger>` internally and by consumers who need an explicit `index` (e.g. a per-`<li>` stagger inside an `<ol>` or `<ul>` to preserve list semantics).

```tsx
import { RevealItem } from '@/lib/motion';

{
  team.map((member, index) => (
    <li key={member.slug}>
      <RevealItem index={index} amount={0.2}>
        <TeamCard member={member} />
      </RevealItem>
    </li>
  ));
}
```

**Props:** all 5 config props from `<RevealStagger>` (with the same defaults) plus a required `index: number` and `children: ReactNode`.

**Used by (A02 + A03):** `TeamCardItemMotion`, `ContactTileItemMotion`. Each renders a `<RevealItem>` inside an `<li>` so the per-card / per-tile stagger preserves the list semantics.

**Reduced motion:** same as `<RevealStagger>`.

### 11.3 What remains bespoke

The two shared primitives cover 8 of the 15 motion wrappers introduced by A02 + A03. The remaining 7 stay as per-section bespoke wrappers because their patterns are too varied to consolidate:

- **Single-element fade-up or scale-in** (6 instances: `IntroHeroIllustrationMotion`, `DevolverPhotoMotion`, `ContactHeroTextTopMotion`, `ContactFormCardMotion`, `BrandStatementHeadingMotion`, `TrabajarIconMotion`). Mix of `y` (12 / 16 / 24), `scale` (0.96 / 0.8 / none), `amount` (0.2 / 0.25 / 0.4), `duration` (base / slow), some with `delay`. A shared wrapper would need 5+ props with different defaults per call site — the "deeply configurable component with many unrelated variants" anti-pattern from `AGENTS.md` §26.
- **Per-element motion with `className` + `rotation`** (2 instances: `ContactPhotoMotion`, `ContactStickerMotion`). The `className` + `rotation` API is specific to the ContactHero collage. The two instances differ in `scale` (0.96 vs 0.8) but share everything else. A shared wrapper would either be too collage-specific (and live in `src/components/contacto/`) or too generic (and not help either future collage work or non-collage work).

The A04 cycle record ([`./cycles/A04-shared-motion-review.md`](./cycles/A04-shared-motion-review.md)) documents the full inventory and the extraction / decline verdicts.

### 11.4 Adding a new section

When a new section needs a viewport-entry reveal:

1. **If the new section reveals a list of children (e.g. a text column with 2–4 blocks):** use `<RevealStagger>`. Pass children in source order; the per-index delay handles the rest.
2. **If the new section reveals a list of items inside an `<ol>` or `<ul>` (e.g. a list of cards or tiles):** render one `<RevealItem index={i}>` per `<li>`, with the index from the `.map()` call.
3. **If the new section reveals a single element with a fade-up or scale-in:** write a small per-section wrapper (the existing per-section files are the right model), or copy one of the 6 existing single-element wrappers and adjust the props.
4. **If the new section reveals a single element with a custom `transform: rotate(...)` or `transform: scale(...)` baked into the layout:** write a small per-section wrapper (the ContactHero `ContactPhotoMotion` / `ContactStickerMotion` are the right model).
5. **If the new section reveals something that does not fit any of the above:** the "no animation presets" rule from §8 still applies. Write a per-section wrapper; if the pattern appears 2+ more times, the next shared-motion review considers extraction.

`<RevealItem>` and `<RevealStagger>` are exported from `@/lib/motion`. They honour `prefers-reduced-motion: reduce` via the `useReducedMotion` hook (per §4.1). They use `viewport={{ once: true }}` (per §6). They consume `DURATION` and `EASING` from `@/lib/motion` (per §3). They do not hard-code a duration or easing (per §3). They do not introduce a global `<MotionConfig>` provider (per §4.2).
