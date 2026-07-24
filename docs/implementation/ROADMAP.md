# NOI Creative — Implementation roadmap

This roadmap is the live execution plan for the project. It mirrors the cycle sequence defined in `IMPLEMENTATION_WORKFLOW.md` and is updated as cycles move between statuses.

## Foundation phase

| ID  | Cycle                                      | Status   | Cycle record                                              |
| --- | ------------------------------------------ | -------- | --------------------------------------------------------- |
| C00 | Governance and repository contract         | Complete | [C00-governance.md](./cycles/C00-governance.md)           |
| C01 | Next.js bootstrap                          | Complete | [C01-bootstrap.md](./cycles/C01-bootstrap.md)             |
| C02 | Quality tooling and CI                     | Complete | [C02-quality-tooling.md](./cycles/C02-quality-tooling.md) |
| C03 | Figma audit and asset inventory            | Planned  | —                                                         |
| C04 | SCSS architecture, tokens and fonts        | Planned  | —                                                         |
| C05 | Static architecture and content foundation | Planned  | —                                                         |
| C06 | UI primitives                              | Planned  | —                                                         |
| C07 | Shared site shell (header, nav, footer)    | Planned  | —                                                         |
| C08 | SEO and metadata foundation                | Planned  | —                                                         |
| C09 | Motion foundation                          | Planned  | —                                                         |
| C10 | Contact and newsletter backends            | Planned  | —                                                         |
| C11 | Focused testing foundation                 | Planned  | —                                                         |
| C12 | Vercel baseline deployment                 | Planned  | —                                                         |

## Page implementation phase

Implement only pages whose design is approved.

| ID  | Page                                               | Design status      | Status  | Cycle record |
| --- | -------------------------------------------------- | ------------------ | ------- | ------------ |
| P01 | Home (`/`)                                         | Approved           | Planned | —            |
| P02 | Nosotras (`/nosotras`)                             | Approved           | Planned | —            |
| P03 | Contacto (`/contacto`)                             | Approved           | Planned | —            |
| P04 | Servicios (`/servicios`)                           | Pending            | Blocked | —            |
| P05 | Portafolio index (`/portafolio`)                   | Pending            | Blocked | —            |
| P06 | Project detail (`/portafolio/[slug]`)              | Pending            | Blocked | —            |
| P07 | Privacidad (`/privacidad`)                         | Legal content only | Planned | —            |
| P08 | Términos y condiciones (`/terminos-y-condiciones`) | Legal content only | Planned | —            |

## Post-page phase

| ID  | Cycle                              | Status  | Cycle record |
| --- | ---------------------------------- | ------- | ------------ |
| A01 | Home animation                     | Planned | —            |
| A02 | Nosotras animation                 | Planned | —            |
| A03 | Contacto animation                 | Planned | —            |
| A04 | Shared motion review               | Planned | —            |
| Q01 | Final SEO and content completion   | Planned | —            |
| Q02 | Performance and accessibility pass | Planned | —            |
| Q03 | Production release                 | Planned | —            |

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
