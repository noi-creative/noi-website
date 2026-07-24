# ADR-002 — SCSS Modules + design tokens

- **Status:** Accepted
- **Date:** 2026-07-24
- **Deciders:** Project lead, coding agent
- **Cycle:** C00 — Governance

## Context

The site is a high-fidelity editorial marketing website with strict design-token requirements defined in `DESIGN.md`. We need a styling system that:

- Supports CSS Modules with a clear, predictable file pairing (`Component.tsx` + `Component.module.scss`).
- Treats design tokens (color, type, spacing, radii, shadows, containers, z-index, motion) as the single source of truth.
- Allows global styles only for reset, font registration, tokens and minimal shared utilities.
- Forbids Tailwind, CSS-in-JS, utility-class systems and arbitrary magic numbers scattered through component code.
- Survives a future Astro pivot without rewrites.

## Decision

Use **SCSS Modules** with a **two-layer token system**:

- **CSS custom properties** are the runtime source of truth for design tokens. They live in `src/styles/_tokens.scss` and are exposed on `:root`.
- **Sass variables** are reserved for compile-time concerns only: breakpoints and private mixin configuration. They live in `src/styles/_breakpoints.scss` and are consumed via `@use` / `@forward`.
- All component and section styles are authored in SCSS Modules and consume tokens by name. No raw color, font, spacing, radius or shadow value may appear in a module file unless it is wrapped in a named local custom property because the Figma measurement is unique.
- Global SCSS is limited to: reset, font registration, tokens, base elements, and minimal shared utilities. Page-specific styles never live in a global stylesheet.
- Sass syntax is modern: `@use` and `@forward` only. `@import` is forbidden.

## Consequences

Positive:

- Token changes are a single edit in `_tokens.scss` and propagate everywhere.
- A future Astro migration keeps the same SCSS Modules and the same tokens — no rewrite needed.
- SCSS Modules produce locally-scoped class names, eliminating the risk of cross-component collisions.

Trade-offs accepted:

- We do not get the developer ergonomics of utility-first systems. The workflow explicitly forbids Tailwind, so this is by design.
- A small amount of ceremony is required when a one-off Figma value appears: a named local custom property must be declared inside the module. This is intentional — it documents the deviation at the point of use.

## Reversibility

Low. The decision is independent of the framework. A move from Next.js to Astro would keep the same SCSS Modules and the same token files.

## References

- `PRD.md` §9 — Styling architecture.
- `PRD.md` §6.1 — Core stack.
- `DESIGN.md` §4 — Color system, §5 Typography, §6 Fluid type scale, §7 Line-height and tracking, §8 Spacing system, §9 Layout tokens, §10 Breakpoints, §11 Radius system, §12 Shadows, §13 Z-index.
- `IMPLEMENTATION_WORKFLOW.md` §C04, §C06.
