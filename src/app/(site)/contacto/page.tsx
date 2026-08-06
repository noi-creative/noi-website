import type { Metadata } from 'next';
import contacto from '@/content/locales/es/contacto.json';
import { buildPageMetadata } from '@/lib/metadata';
import { site } from '@/config/site';
import { ContactHero } from '@/components/contacto/ContactHero';
import { ContactDetails } from '@/components/contacto/ContactDetails';
import { BrandStatement } from '@/components/contacto/BrandStatement';

export const metadata: Metadata = buildPageMetadata({
  title: contacto.metadata.title,
  description: contacto.metadata.description,
  path: site.routes.contacto,
  absoluteTitle: true,
});

/**
 * Contacto page composition (P03). Three sections in order:
 *  1. ContactHero      — burgundy, left-aligned headline + yellow CTA
 *                        and a 2-portrait + retro-phone collage on the right.
 *  2. ContactDetails   — cream, two-column with contact tiles on the left
 *                        and the navy ContactForm card on the right.
 *  3. BrandStatement   — cream with a yellow scallop backdrop and the
 *                        centered "NOI existe para / acompañarte" line.
 *
 * Header and Footer are inherited from the `(site)/layout.tsx`.
 * Animation is deferred to A03. The `dynamic = "error"` guardrail
 * from `(site)/layout.tsx` is preserved: this page does not read
 * cookies, headers, search params, or any request-time data.
 */
export default function ContactoPage() {
  return (
    <>
      <ContactHero />
      <ContactDetails />
      <BrandStatement />
    </>
  );
}
