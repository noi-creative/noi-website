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

**There is no shared `<Reveal>`, `<FadeUp>`, `<Parallax>` or any other reusable animation component yet.** Every section's choreography is specified per section in cycle A01 (Home), A02 (Nosotras), A03 (Contacto) and reviewed in A04 (Shared motion review).

A reusable preset will be created only when the same pattern appears in at least two sections and the shared extraction makes the code easier to read. Until then, each section owns its own `"use client"` wrapper with its own choreography — and each choreography is approved per section.

The "fade-up" snippet in §4.1 is a worked example for the docs. It is **not** a component to import.

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
- **No `<FadeUp>`, `<Reveal>`, `<SectionMotion>` component** in `src/components/`. The pattern is in this document, not the source.
- **No automated tests** for the motion modules. C11 installs Vitest; until then the verification surface is `npm run typecheck`.
- **No README rewrite, no inline JSDoc explosion** on every component. This document is the conventions home.

When A01–A04 starts, the first cycle will add the first real animation usage and, with it, the first section that may need a section-level `<MotionConfig>`. The decision will be made there, not pre-empted here.
