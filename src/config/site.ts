/**
 * Central site configuration. Non-secret data only.
 *
 * Source of truth for:
 *  - brand identity (PRD §18.1)
 *  - default SEO fields (PRD §18.2)
 *  - primary market (PRD §18.1)
 *  - public route registry
 *  - social URLs (TODO until verified; PRD §18.3)
 *
 * Secret values (Resend key, Google service account, etc.) live in
 * environment variables and are validated in C10.
 */

export const site = {
  brand: 'NOI Creative',
  shortTitle: 'NOI: creative',
  siteUrl: 'https://creativenoi.com',
  defaultDescription: 'TODO metadata description',
  contactEmail: 'hola@creativenoi.com',
  primaryMarket: 'Orlando',
  copyrightYear: 2025,
  legalEntity: 'NOI Creative LLC',

  routes: {
    home: '/',
    nosotras: '/nosotras',
    servicios: '/servicios',
    portafolio: '/portafolio',
    contacto: '/contacto',
    privacidad: '/privacidad',
    terminos: '/terminos-y-condiciones',
  },

  social: {
    instagram: {
      handle: '@noicreative.studio',
      url: 'https://www.instagram.com/noicreative.studio',
    },
    linkedin: {
      handle: 'TODO social handle',
      url: 'TODO social URL — https://www.linkedin.com/company/...',
    },
    tiktok: {
      handle: '@noicreative',
      url: 'https://www.tiktok.com/@noicreative',
    },
    whatsapp: {
      // Phone number is visible in `references/contact/contacto.png` but not
      // yet promoted to the manifest or this config. C08 will own it.
      handle: '+1 (321) 337-4754',
      url: 'https://wa.me/13213374754',
    },
  },

  legal: {
    privacyPath: '/privacidad',
    termsPath: '/terminos-y-condiciones',
  },
} as const;

export type SiteConfig = typeof site;
