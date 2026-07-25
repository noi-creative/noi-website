# NOI Creative — Implementation roadmap

This roadmap is the live execution plan for the project. It mirrors the cycle sequence defined in `IMPLEMENTATION_WORKFLOW.md` and is updated as cycles move between statuses.

## Foundation phase

| ID    | Cycle                                           | Status   | Cycle record                                                                      |
| ----- | ----------------------------------------------- | -------- | --------------------------------------------------------------------------------- |
| C00   | Governance and repository contract              | Complete | [C00-governance.md](./cycles/C00-governance.md)                                   |
| C01   | Next.js bootstrap                               | Complete | [C01-bootstrap.md](./cycles/C01-bootstrap.md)                                     |
| C02   | Quality tooling and CI                          | Complete | [C02-quality-tooling.md](./cycles/C02-quality-tooling.md)                         |
| C03   | Figma audit and asset inventory                 | Complete | [C03-figma-audit.md](./cycles/C03-figma-audit.md)                                 |
| C04   | SCSS architecture, tokens and fonts             | Complete | [C04-scss-tokens-fonts.md](./cycles/C04-scss-tokens-fonts.md)                     |
| C05   | Static architecture and content foundation      | Complete | [C05-static-architecture.md](./cycles/C05-static-architecture.md)                 |
| C06   | UI primitives                                   | Complete | [C06-ui-primitives.md](./cycles/C06-ui-primitives.md)                             |
| C07   | Shared site shell (header, nav, footer)         | Complete | [C07-shared-site-shell.md](./cycles/C07-shared-site-shell.md)                     |
| C07.1 | Foundation visual corrections (footer + shadow) | Complete | [C07-followup.md](./cycles/C07-followup.md)                                       |
| C08   | SEO and metadata foundation                     | Complete | [C08-seo-metadata.md](./cycles/C08-seo-metadata.md)                               |
| C09   | Motion foundation                               | Complete | [C09-motion-foundation.md](./cycles/C09-motion-foundation.md)                     |
| C10   | Contact and newsletter backends                 | Complete | [C10-contact-newsletter-backends.md](./cycles/C10-contact-newsletter-backends.md) |
| C11   | Focused testing foundation                      | Complete | [C11-focused-testing-foundation.md](./cycles/C11-focused-testing-foundation.md)   |
| C12   | Vercel baseline deployment                      | Complete | [C12-baseline-deployment.md](./cycles/C12-baseline-deployment.md)                 |

## Page implementation phase

Implement only pages whose design is approved.

| ID  | Page                                               | Design status      | Status   | Cycle record                                            |
| --- | -------------------------------------------------- | ------------------ | -------- | ------------------------------------------------------- |
| P01 | Home (`/`)                                         | Approved           | Complete | [P01-home.md](./cycles/P01-home.md)                     |
| P02 | Nosotras (`/nosotras`)                             | Approved           | Complete | [P02-nosotras.md](./cycles/P02-nosotras.md)             |
| P03 | Contacto (`/contacto`)                             | Approved           | Complete | [P03-contacto.md](./cycles/P03-contacto.md)             |
| P04 | Servicios (`/servicios`)                           | Pending            | Blocked  | —                                                       |
| P05 | Portafolio index (`/portafolio`)                   | Approved           | Complete | [P05-portafolio.md](./cycles/P05-portafolio.md)         |
| P06 | Project detail (`/portafolio/[slug]`)              | Approved           | Complete | [P06-project-detail.md](./cycles/P06-project-detail.md) |
| P07 | Privacidad (`/privacidad`)                         | Legal content only | Planned  | —                                                       |
| P08 | Términos y condiciones (`/terminos-y-condiciones`) | Legal content only | Planned  | —                                                       |

## Post-page phase

| ID  | Cycle                              | Status   | Cycle record                                                        |
| --- | ---------------------------------- | -------- | ------------------------------------------------------------------- |
| A01 | Home animation                     | Planned  | —                                                                   |
| A02 | Nosotras animation                 | Complete | [A02-nosotras-animation.md](./cycles/A02-nosotras-animation.md)     |
| A03 | Contacto animation                 | Complete | [A03-contacto-animation.md](./cycles/A03-contacto-animation.md)     |
| A04 | Shared motion review               | Complete | [A04-shared-motion-review.md](./cycles/A04-shared-motion-review.md) |
| A05 | Portafolio animation               | Planned  | —                                                                   |
| A06 | Project detail animation           | Planned  | —                                                                   |
| Q01 | Final SEO and content completion   | Planned  | —                                                                   |
| Q02 | Performance and accessibility pass | Planned  | —                                                                   |
| Q03 | Production release                 | Planned  | —                                                                   |

## Architecture decisions

Recorded under `docs/decisions/`. New ADRs are reserved for decisions likely to be revisited during a future Astro pivot or other architectural change.

| ADR     | Title                             | Status   |
| ------- | --------------------------------- | -------- |
| ADR-001 | Next.js + Vercel static prerender | Accepted |
| ADR-002 | SCSS Modules + design tokens      | Accepted |
| ADR-003 | Content architecture              | Accepted |
| ADR-004 | Animation strategy                | Accepted |
| ADR-005 | Form backends                     | Accepted |

## Conventions for this roadmap

- Status flow: `Planned` → `In progress` → `Verification` → `Complete` (or `Blocked`).
- A `Blocked` cycle remains on the roadmap and must record the blocker in its cycle record.
- A new cycle can be appended to this list without renumbering existing ones.
- Foundation cycles must finish before any page cycle.
- Page cycles cannot start before their Figma frame is approved.
