# ADR-004 — Animation strategy (Motion only, no GSAP in MVP)

- **Status:** Accepted
- **Date:** 2026-07-24
- **Deciders:** Project lead, coding agent
- **Cycle:** C00 — Governance

## Context

NOI Creative's brand identity is editorial and expressive. The approved Figma frames include organic, playful motion in the Home portfolio carousel, in section entrances and in microinteractions. The PRD explicitly:

- Lists **Motion** as the only animation library in the MVP.
- Forbids GSAP unless a documented approved animation cannot be implemented cleanly with Motion.
- Requires that static composition is approved at 1440 px before any ornamental animation is added.
- Requires reduced-motion handling that preserves content and interaction.

We need a rule that:

- Establishes Motion as the single animation dependency.
- Distinguishes what belongs in SCSS (cheap microinteractions) from what belongs in Motion (meaningful React animation).
- Avoids the temptation to install GSAP, Lottie or any other animation library during MVP.
- Preserves LCP and respects `prefers-reduced-motion`.

## Decision

- **Motion** is the only animation library in the MVP. The import path is `motion/react` (the React-specific entry point).
- **SCSS** owns all microinteractions: hover, focus-visible, color changes, underlines, simple opacity, simple transforms, form visual states.
- **Motion** owns: viewport entrances, coordinated reveal sequences, layout animations, infinite carousel behaviour, text reveals, collage motion, page-section animation logic.
- The root layout is a Server Component. Motion runs only inside the smallest client wrapper that needs it.
- A shared reduced-motion helper (CSS-based or a tiny hook) is added in C09 and consumed wherever Motion is used. `prefers-reduced-motion: reduce` must remove non-essential movement while preserving all content and interaction.
- **GSAP is not installed** during the MVP. If a future approved animation cannot be expressed cleanly with Motion, this ADR must be revisited before adding GSAP, and the alternative must be documented in the relevant cycle record.

## Consequences

Positive:

- One animation dependency keeps the bundle small and the mental model simple.
- Performance is easier to reason about because most interactions are CSS-driven.
- Reduced-motion handling is enforced from the foundation.

Trade-offs accepted:

- Some complex choreographies (e.g. SVG path animation) may require a workaround in Motion. We accept the friction in exchange for not pulling in a second library.
- A future designer who asks for "GSAP-style" timelines will have to learn Motion. This is the documented expectation.

## Reversibility

Medium. Removing Motion in the future is straightforward (replace imports with SCSS or another library). Adding GSAP later is also low-risk because Motion is scoped to small client islands.

## References

- `PRD.md` §12 — Animation architecture.
- `PRD.md` §6.1 — Core stack.
- `DESIGN.md` §20 — Motion direction.
- `IMPLEMENTATION_WORKFLOW.md` §C09, §A01–A04.
