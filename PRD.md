# PRD — NOI Creative Website

**Status:** MVP specification  
**Product:** NOI Creative marketing website  
**Primary domain:** `creativenoi.com`  
**Deployment target:** Vercel  
**Visual source of truth:** Approved Figma file  
**Reference viewport:** 1440 px  
**Primary language:** Spanish  
**Future language:** English, after MVP

---

## 1. Product summary

NOI Creative needs a high-fidelity marketing website that presents the studio, its services, portfolio, team, working process and contact channels.

The site is primarily visual and editorial. It must reproduce the approved Figma designs as closely as possible at 1440 px while adapting them responsibly to tablet and mobile layouts.

The product is not a web application. It is a small static website with limited client-side interactivity, a contact form, a newsletter capture form and selected animations.

---

## 2. Product goals

1. Reproduce the approved visual designs with high fidelity.
2. Keep all public pages statically prerendered.
3. Deliver strong image performance despite the quantity of visual assets.
4. Make the content easy to maintain without introducing a CMS.
5. Prepare the content structure for future internationalization.
6. Preserve a clean implementation that a language model can extend without inventing architecture or styling conventions.
7. Provide a reliable contact flow that sends internal and confirmation emails.
8. Capture newsletter subscriptions in a spreadsheet without sending newsletters from the website.

---

## 3. Non-goals for the MVP

The following are explicitly outside the MVP:

- External CMS.
- User accounts or authentication.
- Dashboard or admin panel.
- Online payments.
- Blog.
- English localization.
- Google Analytics.
- Cookie consent banner.
- Newsletter sending.
- Full WCAG 2.2 AA compliance program.
- GSAP.
- Global state-management library.
- Visual regression test suite.
- End-to-end test suite for the full website.
- Dynamic server-rendered public pages.

---

## 4. Current route scope

The current route map is:

```text
/
├── /nosotras
├── /servicios
├── /portafolio
├── /portafolio/[slug]
├── /contacto
├── /privacidad
└── /terminos-y-condiciones
```

### Route requirements

- `/`, `/nosotras`, `/servicios`, `/portafolio`, `/contacto`, `/privacidad` and `/terminos-y-condiciones` must be statically prerendered.
- Every `/portafolio/[slug]` project page must be generated statically at build time.
- No public route may depend on cookies, request headers, sessions or request-time data.
- The current approved designs exist for Home, Nosotras and Contacto.
- Servicios, Portafolio and project-detail designs are still pending. They must not be invented before the approved designs are available.

---

## 5. Primary user journeys

### 5.1 Explore the studio

1. User arrives on Home.
2. User understands NOI Creative's positioning.
3. User explores services, portfolio, process and testimonials.
4. User navigates to Nosotras, Servicios, Portafolio or Contacto.

### 5.2 Explore portfolio

1. User views the portfolio preview or portfolio index.
2. User selects a project.
3. User opens `/portafolio/[slug]`.
4. User reads indexable project information and views project imagery.
5. User follows a CTA to Contacto.

### 5.3 Contact NOI Creative

1. User opens `/contacto`.
2. User completes the contact form.
3. Client-side validation provides immediate feedback.
4. The server validates the payload again.
5. A honeypot and rate limit protect the endpoint.
6. NOI Creative receives an internal email.
7. The user receives a confirmation email.
8. The form displays an inline success or error state.

### 5.4 Newsletter signup

1. User enters an email in the footer.
2. The email is validated.
3. The server appends the entry to a Google Sheet.
4. The form displays an inline success or error state.
5. The website does not send newsletters.

---

## 6. Technical architecture

### 6.1 Core stack

```text
Framework: Next.js with App Router
Language: TypeScript
TypeScript mode: strict
Deployment: Vercel
Rendering: static prerendering for all public pages
Styling: SCSS Modules
Global styling: reset, fonts, tokens and minimal shared utilities
Animation: Motion
Forms: React Hook Form
Validation: Zod + @hookform/resolvers
Images: next/image whenever technically possible
Fonts: next/font/local and next/font/google
Email: Resend
Newsletter storage: Google Sheets API
Testing: Vitest for critical contact logic only
Code quality: ESLint, Prettier, Husky and lint-staged
```

### 6.2 Static rendering rule

The website must use the normal Next.js deployment model on Vercel.

Do not configure:

```ts
output: "export"
```

Public pages remain statically prerendered, while isolated Route Handlers may process form submissions.

Allowed server endpoints:

```text
POST /api/contact
POST /api/newsletter
```

These endpoints do not justify making any public page dynamic.

### 6.3 Server and client component rule

- Use Server Components by default.
- Add `"use client"` only to the smallest component that requires browser state, React Hook Form or Motion.
- Do not convert an entire page into a Client Component to animate or control one section.
- Keep static content and layout in Server Components.
- Keep form state, menu state, carousel behavior and Motion wrappers isolated.

---

## 7. Recommended project structure

```text
src/
├── app/
│   ├── api/
│   │   ├── contact/route.ts
│   │   └── newsletter/route.ts
│   ├── contacto/page.tsx
│   ├── nosotras/page.tsx
│   ├── portafolio/
│   │   ├── [slug]/page.tsx
│   │   └── page.tsx
│   ├── privacidad/page.tsx
│   ├── servicios/page.tsx
│   ├── terminos-y-condiciones/page.tsx
│   ├── globals.scss
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── sections/
│   ├── ui/
│   └── motion/
├── content/
│   ├── locales/
│   │   └── es/
│   │       ├── common.json
│   │       ├── contacto.json
│   │       ├── home.json
│   │       ├── nosotras.json
│   │       ├── portafolio.json
│   │       └── servicios.json
│   ├── legal/
│   │   ├── privacidad.md
│   │   └── terminos-y-condiciones.md
│   └── data/
│       ├── contact.ts
│       ├── projects.ts
│       ├── services.ts
│       └── team.ts
├── features/
│   ├── contact/
│   │   ├── contact.schema.ts
│   │   ├── contact.service.ts
│   │   └── contact.service.test.ts
│   └── newsletter/
│       ├── newsletter.schema.ts
│       └── newsletter.service.ts
├── lib/
│   ├── email/
│   ├── google-sheets/
│   ├── metadata/
│   └── rate-limit/
├── styles/
│   ├── _breakpoints.scss
│   ├── _mixins.scss
│   ├── _reset.scss
│   ├── _tokens.scss
│   └── _typography.scss
└── types/
```

The exact folder count may be simplified, but the architectural separation must remain clear.

---

## 8. Content architecture

### 8.1 General rule

No external CMS will be used.

Content must be split into:

- Locale-ready JSON for copy.
- Typed TypeScript data for structural or visual records.
- Markdown for legal content.

### 8.2 JSON content

Use JSON for:

- Headings.
- Paragraphs.
- Labels.
- Buttons.
- Quotes.
- Form text.
- Navigation labels.
- Validation and success messages.

Example:

```json
{
  "hero": {
    "eyebrow": "Por qué NOI es diferente",
    "title": {
      "primary": "El branding no es un momento,",
      "highlight": "es un proceso"
    }
  }
}
```

### 8.3 Typed structural data

Use TypeScript for:

- Slugs.
- Asset paths.
- Project ordering.
- Featured-state flags.
- Image focal points.
- Component variants.
- Project metadata.
- Service identifiers.

Example:

```ts
export const projects = [
  {
    id: "jaze",
    slug: "jaze",
    coverImage: "/images/projects/jaze/cover.webp",
    featured: true,
  },
] as const;
```

### 8.4 Future i18n

The MVP remains Spanish-only.

The content structure must allow a later migration to i18next by adding:

```text
src/content/locales/en/
```

Do not install or configure i18next during the MVP.

---

## 9. Styling architecture

### 9.1 General styling rules

- Use SCSS Modules for component and section styles.
- Do not use Tailwind.
- Do not use styled-components, Emotion or CSS-in-JS.
- Do not write large global selectors for page-specific styling.
- Global styles are limited to reset, tokens, font declarations, base elements and minimal utilities.
- All colors, type sizes, spacing, radii, shadows, container widths and z-index values must come from tokens.
- Do not introduce arbitrary one-off values unless the Figma measurement requires one.
- If a Figma value is unique, define a semantically named local custom property rather than scattering a magic number.

### 9.2 Design token authority

The strict token system is defined in `DESIGN.md`.

Figma remains the source of truth for exact values. When an exact Figma value conflicts with an implementation default, update the token rather than adding an inline override.

---

## 10. Typography

### 10.1 Font families

- **Satoshi:** local licensed font.
- **Panel Sans:** local licensed font.
- **Playfair Display:** Google Fonts.
- **Logo:** SVG asset, not text.

### 10.2 Usage rules

#### Satoshi

Use for:

- Main titles.
- Body copy.
- Navigation.
- Buttons.
- Links.
- Forms.
- Labels.
- Supporting text.

#### Panel Sans

Use as an expressive highlight inside phrases that begin in Satoshi.

Panel Sans is not a replacement for the full title. It is an accent within a mixed-font phrase.

#### Playfair Display

Use for:

- Quote body copy.
- Editorial emphasis.
- Highlight phrases when Panel Sans is not used.
- Italic or expressive text moments approved in Figma.

### 10.3 Loading

- Load Satoshi and Panel Sans with `next/font/local`.
- Load Playfair Display with `next/font/google`.
- Use only the font weights actually required by the approved Figma styles, even if all weights are available.
- Avoid loading unnecessary styles or duplicated files.

---

## 11. Image and asset handling

### 11.1 Raster images

Use `next/image` for every meaningful raster image unless technically incompatible.

Requirements:

- Explicit dimensions or `fill`.
- Responsive `sizes`.
- Correct `priority` only for likely LCP images.
- Avoid applying `priority` to decorative or below-the-fold images.
- Use quality settings intentionally.
- Prevent layout shift.
- Preserve focal points.

### 11.2 Desktop and mobile crops

- Desktop must preserve the approved Figma crop as closely as possible.
- Mobile crops may change.
- Mobile adaptations must not crop faces, hands, products, text contained in imagery or important composition elements.
- Use configurable `object-position` values where necessary.

### 11.3 Vector assets

Use SVG for:

- Logo.
- Icons.
- Illustrations.
- Complex decorative shapes.
- Brand marks.

Use SCSS only for simple geometric decorations.

### 11.4 Repository storage

All assets are stored inside the repository.

Recommended:

```text
public/
├── fonts/
├── icons/
├── images/
│   ├── contact/
│   ├── home/
│   ├── portfolio/
│   └── team/
├── illustrations/
└── logos/
```

---

## 12. Animation architecture

### 12.1 MVP library rule

Motion is the only animation library included in the MVP.

GSAP must not be installed unless a documented future animation cannot be implemented cleanly with Motion.

### 12.2 Responsibility split

Use SCSS for:

- Hover states.
- Focus states.
- Color transitions.
- Underlines.
- Simple opacity changes.
- Simple transforms.
- Form visual states.

Use Motion for:

- Viewport entrances.
- Coordinated reveal sequences.
- Layout animations.
- Collage movement.
- Infinite carousel behavior.
- Text reveals.
- Page-section animation logic.

### 12.3 Performance rules

- Prioritize first paint and LCP before starting non-essential animation.
- Do not block rendering while waiting for animation setup.
- Avoid animating layout properties when transforms can be used.
- Do not animate every element.
- Do not use animation as a replacement for clear hierarchy.
- Respect `prefers-reduced-motion`.
- Reduced-motion mode must remove non-essential movement while preserving content and interaction.
- Animation specifications will be added after the static implementation is visually approved.

---

## 13. State management

- Do not install Zustand, Redux or another global state library.
- Use local component state when needed.
- Use React Hook Form for form state.
- Use URL parameters for future shareable portfolio filters.
- Use Context only if a real cross-tree requirement appears and local composition is insufficient.
- The mobile menu, carousel and forms must remain independent.

---

## 14. Contact form

### 14.1 Fields

The contact form includes:

```text
Correo electrónico*
Nombre*
Servicio a cotizar*
Rango de inversión previsto*
Red social de la marca
Comentarios adicionales
Aceptación de política de privacidad*
Honeypot hidden field
```

### 14.2 Service values

```text
Diseño web
Ecommerce
Naming
Diseño gráfico
```

### 14.3 Investment values

```text
Menos de USD 500
USD 500–1.000
USD 1.000–2.000
USD 2.000–5.000
Más de USD 5.000
```

### 14.4 Form implementation

- React Hook Form for client-side form state.
- Zod for client and server validation.
- The server must never trust client validation.
- Submit to `POST /api/contact`.
- Display success and failure messages inside the form.
- Prevent duplicate submissions while pending.
- Preserve user input after a recoverable server error.
- Reset the form only after successful submission.

### 14.5 Email flow

Use Resend.

Environment variables:

```text
RESEND_API_KEY
CONTACT_FROM_EMAIL
CONTACT_RECIPIENT_EMAIL
```

Configuration:

```text
Verified domain: creativenoi.com
Internal recipient: hola@creativenoi.com
Suggested technical sender: formularios@creativenoi.com
User confirmation sender: hola@creativenoi.com
```

A successful submission triggers:

1. Internal notification to `hola@creativenoi.com`.
2. Confirmation email to the submitted email address.

Set the internal email reply-to address to the user's submitted email.

### 14.6 Spam protection

Mandatory:

- Honeypot.
- Rate limiting for `/api/contact`.
- Server-side schema validation.
- Payload size limit.
- Normalized text values.
- No raw user HTML in outgoing email.

CAPTCHA is outside the MVP unless real abuse appears.

---

## 15. Newsletter form

### 15.1 MVP behavior

The newsletter form only stores subscriptions.

It does not:

- Send newsletters.
- Trigger an email sequence.
- Integrate with a marketing platform.

### 15.2 Storage

Use Google Sheets API.

Endpoint:

```text
POST /api/newsletter
```

Store at minimum:

```text
email
createdAt
source
locale
```

Use one spreadsheet configured through environment variables.

Recommended:

```text
GOOGLE_SHEETS_SPREADSHEET_ID
GOOGLE_SERVICE_ACCOUNT_EMAIL
GOOGLE_PRIVATE_KEY
```

The spreadsheet can later be exported as Excel.

---

## 16. Navigation

### Desktop

- Sticky header.
- Logo on the left.
- Main navigation centered or aligned according to Figma.
- “Hablemos” CTA links to `/contacto`.
- Active and hover states must follow design tokens.

### Mobile

- Sticky header.
- Dropdown navigation.
- The dropdown must be keyboard accessible.
- Opening the menu must not shift the page unexpectedly.
- The menu must close after navigation.
- No full-screen or side-panel behavior unless later approved.

---

## 17. Portfolio behavior

### Home preview

- The Home portfolio preview is an infinite carousel.
- It has no visible controls.
- Its final motion specification will be defined after the static version is approved.
- It must respect reduced motion.
- It must not duplicate content semantically for screen readers.

### Portfolio index

- Must contain indexable text.
- Must link to static project-detail pages.
- Structure and filters remain pending until the approved design is available.

### Project detail

- Route: `/portafolio/[slug]`.
- Generated with `generateStaticParams`.
- Every project includes metadata, indexable text, images and a contact CTA.
- Exact content schema remains pending final project-page design.

---

## 18. SEO

### 18.1 Brand metadata

```text
Brand name: NOI Creative
Default title: NOI: creative
Primary market: Orlando
Broader positioning: available beyond Orlando
Primary domain: https://creativenoi.com
```

### 18.2 Required implementation

- Next.js Metadata API.
- Unique title and description per page.
- Canonical URLs.
- Open Graph metadata.
- Twitter card metadata.
- `robots.ts`.
- `sitemap.ts`.
- Organization or ProfessionalService structured data.
- Indexable portfolio copy.
- Semantic heading hierarchy.
- Descriptive links.
- Stable, human-readable slugs.

### 18.3 Pending SEO assets and copy

Still required:

- Default meta description.
- Per-page descriptions.
- Open Graph image.
- Favicon package.
- Final social URLs.
- Final contact data.
- Final LocalBusiness/ProfessionalService details.

Use explicit TODO markers. Do not invent missing business information.

---

## 19. Legal content

- Privacy and terms content already exists.
- Store each document as local Markdown.
- Render it during build.
- Legal routes remain static.
- Preserve the original legal text.
- Do not rewrite legal copy unless explicitly requested.

---

## 20. Responsive requirements

### Canonical desktop

At 1440 px:

- Figma is the canonical visual reference.
- Preserve approved line breaks.
- Preserve major overlaps, crops, scale relationships and section proportions.
- Do not “improve” or reinterpret the composition.

### Desktop

At 1280 px and above:

- Preserve the original composition.
- Maintain exact or near-exact image crops.
- Use fluid typography and spacing without changing the 1440 px result.

### Tablet

At 768–1279 px:

- Reduce type, spacing and decoration progressively.
- Convert multi-column sections to two or one columns when necessary.
- Preserve narrative order.
- Reposition decoration before hiding it.
- Avoid overly narrow text columns.

### Mobile

At 320–767 px:

- Use one column by default.
- No horizontal scrolling.
- Simplify complex collages without inventing a different visual identity.
- Hide only non-essential decoration.
- Preserve content order and CTA hierarchy.
- Allow mobile-specific image crops.
- Keep touch targets usable.
- Do not proportionally shrink desktop layouts until they become unreadable.

---

## 21. Browser support

Support the two latest stable versions of:

- Chrome.
- Safari.
- Firefox.
- Edge.

Also test current Safari on iPhone.

Minimum layout width: 320 px.

---

## 22. Accessibility baseline

Full WCAG 2.2 AA certification is outside the MVP, but the implementation must still include:

- Semantic HTML.
- Keyboard-accessible navigation.
- Visible focus states.
- Labels and error descriptions for every form field.
- Correct button and link semantics.
- Alternative-text placeholders for manual completion.
- Decorative images marked appropriately.
- Reduced-motion support.
- Logical heading order.
- Sufficient contrast unless the approved design explicitly requires review.

Alternative text placeholder format:

```text
[TODO ALT: describe image purpose and meaningful content]
```

---

## 23. Performance requirements

Targets before production:

```text
Lighthouse Performance: >= 90
Lighthouse Accessibility: >= 95
Lighthouse SEO: >= 95
LCP target: < 2.5 s
CLS: no visible layout shifts
```

Implementation rules:

- Optimize the hero image for LCP.
- Load fonts efficiently.
- Avoid excessive font files.
- Lazy-load below-the-fold images.
- Keep Client Components small.
- Avoid unnecessary dependencies.
- Avoid rendering duplicated hidden desktop and mobile trees when CSS can adapt one semantic structure.
- Do not preload non-critical media.
- Use Motion only after first meaningful content is available.

---

## 24. Code quality

Mandatory:

- TypeScript strict mode.
- ESLint.
- Prettier.
- Husky.
- lint-staged.
- Successful `next build`.
- No type errors.
- No lint errors.
- No unused production dependencies.
- No `any` without explicit justification.
- No duplicated design constants.
- No large page component containing all sections.

### Pre-commit scope

Run formatting and linting only on staged relevant files.

Do not add heavy pre-commit test suites.

---

## 25. Testing strategy

Testing is intentionally limited.

### Required automated tests

Use Vitest for contact-domain logic:

1. Invalid payloads are rejected.
2. Honeypot submissions are rejected or silently discarded according to implementation.
3. Valid submissions request both internal and confirmation emails.
4. Provider failures return a controlled error.
5. User input is normalized before use.

The test should target service and schema logic rather than visually testing the entire Next.js route.

### Not required for MVP

- Component snapshots.
- Full-page unit tests.
- Playwright.
- Cypress.
- Visual regression testing.
- Animation tests.

### Required manual verification

- 1440 px visual comparison with Figma.
- 1280 px desktop.
- 768 px tablet.
- 390 px mobile.
- 320 px minimum width.
- Keyboard navigation.
- Contact success and failure flows.
- Newsletter success and failure flows.
- Safari iPhone check.
- Lighthouse production check.

---

## 26. Figma integration and implementation authority

The approved Figma file is the visual source of truth.

Before implementing a page or section, the coding agent must inspect the corresponding Figma frame through Figma MCP.

Authority order:

1. `PRD.md` for product and architectural decisions.
2. `DESIGN.md` for visual-system and responsive rules.
3. Approved Figma frames for exact visual measurements and composition.
4. Screenshots as secondary reference only.

The agent must not:

- Invent missing page designs.
- Copy generated Figma code literally.
- Introduce technologies that conflict with this PRD.
- Replace SCSS Modules with another styling system.
- make a page dynamic for convenience.
- bypass tokens with arbitrary values.
- alter approved 1440 px line breaks without a documented reason.

---

## 27. Definition of done

A page is complete when:

- Its approved Figma frame has been inspected.
- It matches the 1440 px design closely.
- It behaves correctly from 320 px upward.
- It uses only approved tokens and font roles.
- It is statically prerendered.
- Images use `next/image` where required.
- Client Components are isolated.
- No layout shift is visible.
- Navigation and forms are keyboard usable.
- `next build` succeeds.
- ESLint and formatting pass.
- Required metadata is present or explicitly marked TODO.
- Missing alt text is clearly marked with the agreed placeholder.
- The implementation does not introduce unapproved dependencies.

---

## 28. Post-MVP backlog

Add only after the MVP is visually and functionally approved:

- English localization with i18next.
- Google Analytics.
- Cookie-consent behavior if analytics requires it.
- Final accessibility audit.
- Complete Open Graph and favicon package.
- Newsletter platform integration.
- GSAP only if an approved animation requires it.
- Expanded automated testing if contact or portfolio logic grows.
- Additional routes only after design approval.
