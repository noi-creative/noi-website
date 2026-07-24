# AGENTS.md — NOI Creative Website

This file defines the operating rules for coding agents working on the NOI Creative website.

The project is a high-fidelity static marketing website built with Next.js and deployed on Vercel.

---

## 1. Source-of-truth order

When requirements appear to conflict, use this order:

1. `PRD.md`
2. `DESIGN.md`
3. Approved Figma frames inspected through Figma MCP
4. Existing approved implementation patterns
5. Screenshots supplied as secondary visual references

Do not override a higher-priority source with assumptions from a lower-priority source.

---

## 2. Required reading before implementation

Before modifying a page, component, style, animation or route:

1. Read `PRD.md`.
2. Read `DESIGN.md`.
3. Inspect the relevant Figma frame through Figma MCP.
4. Inspect existing tokens, shared components and neighboring page patterns.
5. Confirm that the requested page has an approved design.

Do not implement an undesigned page by inventing a composition.

The currently approved page designs are:

- Home
- Nosotras
- Contacto

The following designs are still pending:

- Servicios
- Portafolio
- Portfolio project detail pages
- Responsive Figma variants

Legal pages may use a restrained content layout based on the approved design system.

---

## 3. Project objective

Build a faithful, performant and maintainable implementation of the approved NOI Creative designs.

The site must:

- Match the approved 1440 px Figma layouts as closely as possible.
- Remain usable from 320 px upward.
- Keep all public pages statically prerendered.
- Use Next.js image and font optimizations.
- Use a strict design-token system.
- Keep client-side JavaScript limited.
- Avoid unapproved technologies and abstractions.

---

## 4. Fixed technology decisions

Use:

```text
Next.js App Router
TypeScript strict
SCSS Modules
Motion
React Hook Form
Zod
@hookform/resolvers
next/image
next/font/local
next/font/google
Resend
Google Sheets API
Vitest
ESLint
Prettier
Husky
lint-staged
Vercel
```

Do not use:

```text
Tailwind CSS
styled-components
Emotion
CSS-in-JS
Redux
Zustand
another global state library
GSAP in the MVP
external CMS
output: "export"
Playwright in the MVP
Cypress in the MVP
snapshot-heavy test suites
```

Do not add a new dependency unless the existing stack cannot solve the requirement cleanly.

Every new dependency must have a concrete use in the current task.

---

## 5. Rendering rules

All public pages must be statically prerendered.

Public routes:

```text
/
/nosotras
/servicios
/portafolio
/portafolio/[slug]
/contacto
/privacidad
/terminos-y-condiciones
```

Allowed server endpoints:

```text
POST /api/contact
POST /api/newsletter
```

Rules:

- Do not configure `output: "export"`.
- Do not use cookies, headers, sessions or request-time data in public pages.
- Do not make a public route dynamic for convenience.
- Generate portfolio detail routes at build time with `generateStaticParams`.
- Route Handlers may be dynamic without affecting static public pages.

---

## 6. Server and Client Components

Use Server Components by default.

Add `"use client"` only when required for:

- React Hook Form
- local interaction state
- mobile menu behavior
- Motion
- carousel behavior
- browser-only APIs

Keep Client Components as small as possible.

Do not make an entire page a Client Component because one child needs animation or state.

Preferred pattern:

```text
Server page
└── Static section
    └── Small client animation or interaction wrapper
```

---

## 7. Figma MCP workflow

Before implementing a page or section:

1. Open the approved frame in Figma.
2. Copy the link to the exact frame or selection.
3. Inspect it through Figma MCP.
4. Retrieve exact layout, spacing, typography, colors, radii and asset references.
5. Translate the design into the project architecture.

Figma is used for visual inspection, not as a source of production code.

Do not:

- Copy generated Figma code directly.
- Introduce inline styles because Figma produced them.
- Bypass SCSS Modules.
- Bypass design tokens.
- Modify the Figma file.
- Infer exact values from screenshots when MCP exposes them.

At 1440 px, preserve:

- line breaks
- composition
- major overlaps
- image crops
- section proportions
- visual hierarchy

---

## 8. Styling rules

Use SCSS Modules for all component and section styles.

Global SCSS is limited to:

- reset
- font registration
- design tokens
- base elements
- minimal shared utilities

Rules:

- Use tokens for colors, typography, spacing, radii, shadows, containers and z-index.
- Do not scatter raw color values.
- Do not add arbitrary spacing values repeatedly.
- If Figma requires a unique value, define a named local custom property.
- Do not use inline `style` for static visual styling.
- Inline styles are acceptable only for genuinely dynamic values such as a runtime transform or configured focal point.

Preferred file pairing:

```text
Component.tsx
Component.module.scss
```

Avoid very large SCSS files covering unrelated sections.

---

## 9. Design tokens

The approved palette is:

```text
#00385C
#FFEDAE
#810C18
#FFF9F4
#ED7218
#DCE4F4
#001C36
```

Use the semantic tokens defined in `DESIGN.md`.

Do not introduce new brand colors without explicit approval.

Do not replace:

- cream with pure white
- ink or navy with pure black
- burgundy with generic red

Use opacity variants only from existing tokens.

---

## 10. Typography rules

Font roles:

### Satoshi

Use for:

- headings
- body copy
- navigation
- buttons
- links
- form fields
- labels
- metadata

### Panel Sans

Use only as an expressive phrase highlight that begins in Satoshi.

Do not use Panel Sans for full body paragraphs, forms or navigation.

### Playfair Display

Use for:

- quote body text
- editorial emphasis
- approved italic highlights
- expressive text where Panel Sans is not used

Font loading:

- Satoshi: `next/font/local`
- Panel Sans: `next/font/local`
- Playfair Display: `next/font/google`
- Logo: supplied SVG

Load only the weights used by Figma.

---

## 11. Responsive implementation

The canonical design width is 1440 px.

### 1280 px and above

- Preserve desktop composition.
- Preserve exact or near-exact image crops.
- Preserve major overlaps and editorial asymmetry.
- Use fluid typography and spacing.

### 768–1279 px

- Reduce column count when needed.
- Preserve narrative order.
- Reposition decorative elements before hiding them.
- Avoid overly narrow text columns.
- Convert complex layouts to two or one columns.

### 320–767 px

- Use one semantic column by default.
- Prevent horizontal scrolling.
- Simplify complex collages.
- Hide only non-essential decoration.
- Preserve CTA hierarchy.
- Preserve content order.
- Use mobile-specific image crops where necessary.
- Do not shrink the desktop layout proportionally.

At 1440 px, approved line breaks must remain intact.

Desktop-only controlled breaks may be removed below desktop widths.

---

## 12. Images and assets

Use `next/image` for every meaningful raster image unless technically incompatible.

Every raster image must define:

- dimensions or `fill`
- responsive `sizes`
- suitable loading behavior
- correct crop
- explicit alt text or TODO placeholder

Use `priority` only for likely LCP imagery.

Do not mark all above-the-fold images as priority.

Desktop crop must match Figma.

Mobile crop may change, but must not remove:

- faces
- hands important to the composition
- products
- text inside imagery
- essential project details

Use supplied SVGs for:

- logo
- icons
- illustrations
- doodles
- complex organic shapes
- brand marks

Use SCSS only for simple geometry.

Alt placeholder format:

```text
[TODO ALT: describe image purpose and meaningful content]
```

---

## 13. Animation rules

Motion is the approved animation library.

Do not install GSAP during the MVP.

Use SCSS for:

- hover
- focus-visible
- color changes
- underlines
- simple opacity
- simple transforms
- form states

Use Motion for:

- viewport entrances
- coordinated reveals
- layout animation
- text reveals
- collage motion
- infinite carousel behavior
- page-section animation logic

Animation workflow:

1. Implement the static composition.
2. Match Figma at 1440 px.
3. Validate responsive behavior.
4. Add approved animations afterward.

Performance rules:

- Do not block first paint.
- Do not delay important content.
- Prefer transform and opacity.
- Avoid animating layout properties.
- Avoid continuous animation across many large images.
- Respect `prefers-reduced-motion`.
- Reduced-motion mode must preserve content and interaction.

---

## 14. State management

Do not install a global state library.

Use:

- local `useState` for isolated interactions
- React Hook Form for form state
- URL parameters for future shareable filters
- Context only for a demonstrated cross-tree requirement

Current isolated state examples:

- mobile navigation
- contact form
- newsletter form
- infinite portfolio carousel

Do not centralize unrelated state.

---

## 15. Content structure

Use:

- JSON for translatable copy
- typed TypeScript for structured records
- Markdown for legal documents

### JSON

Use for:

- headings
- paragraphs
- labels
- buttons
- quotes
- validation messages
- form feedback
- navigation text

### TypeScript

Use for:

- slugs
- asset paths
- project configuration
- service identifiers
- ordering
- image focal points
- featured flags
- visual variants

### Markdown

Use for:

- privacy policy
- terms and conditions

Do not install i18next during the MVP.

Keep the content structure compatible with a future `locales/en` directory.

---

## 16. Contact form

Required fields:

```text
Correo electrónico
Nombre
Servicio a cotizar
Rango de inversión previsto
Red social de la marca
Comentarios adicionales
Aceptación de privacidad
Honeypot
```

Service options:

```text
Diseño web
Ecommerce
Naming
Diseño gráfico
```

Investment options:

```text
Menos de USD 500
USD 500–1.000
USD 1.000–2.000
USD 2.000–5.000
Más de USD 5.000
```

Implementation:

- React Hook Form on the client.
- Zod validation on client and server.
- Submit to `POST /api/contact`.
- Use Resend.
- Send one internal notification.
- Send one confirmation email.
- Display inline success and error feedback.
- Preserve user input after recoverable server errors.
- Reset only after success.
- Prevent duplicate submissions while pending.

Email configuration:

```text
Verified domain: creativenoi.com
Internal recipient: hola@creativenoi.com
Suggested technical sender: formularios@creativenoi.com
Confirmation sender: hola@creativenoi.com
```

Security:

- honeypot
- rate limiting
- payload-size limit
- server-side validation
- normalized text values
- no raw user HTML in email

Do not expose secrets to the client.

---

## 17. Newsletter form

The MVP newsletter form only stores emails.

It does not send newsletters.

Submit to:

```text
POST /api/newsletter
```

Store in Google Sheets:

```text
email
createdAt
source
locale
```

Use server-only environment variables for credentials.

Display inline success and error states.

Do not write to a local `.xlsx` file.

---

## 18. SEO rules

Use the Next.js Metadata API.

Required:

- unique title and description per page
- canonical URL
- Open Graph metadata
- Twitter card metadata
- sitemap
- robots
- semantic headings
- indexable portfolio text
- structured data for Organization or ProfessionalService
- stable human-readable slugs

Known metadata:

```text
Brand: NOI Creative
Default title: NOI: creative
Domain: https://creativenoi.com
Primary market: Orlando
```

Do not invent missing:

- descriptions
- business address
- phone number
- social URLs
- Open Graph imagery
- favicon
- legal business details

Use explicit TODO markers for missing data.

---

## 19. Navigation

Desktop:

- sticky header
- rounded shell
- logo on left
- navigation links
- “Hablemos” CTA to `/contacto`

Mobile:

- sticky header
- dropdown menu
- no full-screen takeover
- close menu after navigation
- keyboard accessible
- preserve visible focus states

Do not introduce a side drawer unless explicitly approved.

---

## 20. Portfolio rules

Home portfolio preview:

- infinite carousel
- no visible controls
- accessible semantic list
- reduced-motion fallback
- final animation behavior added later

Portfolio detail:

- route `/portafolio/[slug]`
- static generation
- indexable text
- project imagery
- contact CTA
- metadata per project

Do not invent the final portfolio layout before the approved design is available.

---

## 21. Testing rules

Testing is intentionally limited.

Required automated tests:

- invalid contact payload is rejected
- honeypot submission is rejected or safely discarded
- valid submission requests internal and confirmation emails
- email-provider failure returns a controlled error
- user data is normalized before use

Use Vitest.

Test domain logic and services rather than visually testing pages.

Do not add:

- snapshots for every component
- Playwright
- Cypress
- full-page test suites
- animation tests

Manual verification remains mandatory.

---

## 22. Quality gates

Before considering a task complete, run:

```bash
npm run format:check
npm run lint
npm run test
npm run build
```

Adapt command names to the actual package scripts, but preserve the checks.

A change is not complete if:

- TypeScript fails.
- ESLint fails.
- formatting fails.
- required tests fail.
- `next build` fails.
- a public page becomes dynamic accidentally.
- horizontal overflow exists.
- unapproved dependencies were added.
- design tokens were bypassed.
- the 1440 px layout materially diverges from Figma.

---

## 23. Manual visual verification

For every completed page, verify at:

```text
1440 px
1280 px
768 px
390 px
320 px
```

Also verify:

- current Chrome
- current Safari
- current Firefox
- current Edge
- Safari on iPhone

Check:

- no horizontal scroll
- correct line breaks at 1440 px
- correct image crops
- readable mobile type
- sticky header behavior
- keyboard navigation
- focus states
- reduced motion
- contact success and error states
- newsletter success and error states

---

## 24. Performance targets

Before production:

```text
Lighthouse Performance >= 90
Lighthouse Accessibility >= 95
Lighthouse SEO >= 95
LCP < 2.5 s
No visible CLS
```

Rules:

- Keep Client Components small.
- Avoid unnecessary packages.
- Lazy-load below-the-fold images.
- Optimize likely LCP imagery.
- Avoid loading unused font weights.
- Avoid duplicated desktop and mobile markup when one semantic structure can adapt.
- Do not preload non-critical assets.
- Do not initialize non-essential animation before content is visible.

---

## 25. Accessibility baseline

Even though a full WCAG 2.2 AA audit is outside the MVP, always implement:

- semantic HTML
- logical heading hierarchy
- keyboard-accessible controls
- visible focus states
- explicit form labels
- described form errors
- reduced-motion handling
- correct button and link semantics
- decorative SVGs hidden from assistive technology
- alt placeholders for unresolved image descriptions

Do not rely on color alone to communicate a form error.

---

## 26. Component design rules

Create a reusable component when:

- the same pattern appears at least twice
- it has stable behavior and visual rules
- reuse makes the code easier to understand

Do not create abstractions speculatively.

Avoid:

- generic mega-components
- deeply configurable components with many unrelated variants
- page components containing all sections
- premature design-system packages
- wrappers that only rename a native HTML element

Prefer clear section components with explicit props.

---

## 27. Error handling

Contact and newsletter endpoints must return controlled responses.

Do not expose:

- provider error details
- stack traces
- environment variables
- internal email addresses beyond intended public contact information
- service-account details

Client feedback must be concise and actionable.

Log server failures with enough context for debugging, but do not log full sensitive form contents unnecessarily.

---

## 28. Environment variables

Expected server-side variables:

```text
RESEND_API_KEY
CONTACT_FROM_EMAIL
CONTACT_RECIPIENT_EMAIL
GOOGLE_SHEETS_SPREADSHEET_ID
GOOGLE_SERVICE_ACCOUNT_EMAIL
GOOGLE_PRIVATE_KEY
```

Additional variables may be added only when required.

Provide an `.env.example` without secrets.

Never commit real credentials.

---

## 29. Git and commit rules

Use Husky and lint-staged for lightweight checks.

Pre-commit:

- format staged files
- lint staged source files

Do not run the full production build in pre-commit.

Keep commits scoped and descriptive.

Do not mix unrelated refactoring with a visual implementation task unless necessary.

---

## 30. Agent response requirements

After implementation, report:

1. Files created or changed.
2. Main decisions made.
3. Validation commands run.
4. Any unresolved TODOs.
5. Any mismatch with Figma.
6. Any missing asset, copy or metadata.
7. Whether the affected public routes remain statically prerendered.

Do not claim visual fidelity without checking the relevant viewport.

Do not claim tests passed unless they were executed.

---

## 31. Stop conditions

Stop and request clarification when:

- the requested page has no approved design
- the relevant Figma frame is unavailable
- an asset referenced by Figma is missing
- typography files are unavailable
- a requirement conflicts with the PRD
- a new dependency appears necessary
- responsive adaptation would materially change content order
- missing business data would need to be invented
- an animation requirement appears to require GSAP
- a proposed solution would make a public page dynamic

Do not silently choose an alternative.

---

## 32. Definition of done

A task is done only when:

- the relevant Figma frame was inspected
- the implementation follows the PRD and DESIGN documents
- the 1440 px composition closely matches Figma
- responsive behavior works from 320 px upward
- public routes remain statically prerendered
- raster images use `next/image` where applicable
- SVG assets are used correctly
- tokens are respected
- client components are isolated
- accessibility baseline is present
- formatting, linting, tests and build pass
- remaining TODOs are explicitly documented
- no unapproved technology was introduced
