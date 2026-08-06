import type { Metadata } from 'next';
import nosotras from '@/content/locales/es/nosotras.json';
import { buildPageMetadata } from '@/lib/metadata';
import { site } from '@/config/site';
import { IntroHero } from '@/components/nosotras/IntroHero';
import { DevolverSection } from '@/components/nosotras/DevolverSection';
import { TeamSection } from '@/components/nosotras/TeamSection';
import { TrabajarCTA } from '@/components/nosotras/TrabajarCTA';

export const metadata: Metadata = buildPageMetadata({
  title: nosotras.metadata.title,
  description: nosotras.metadata.description,
  path: site.routes.nosotras,
  absoluteTitle: true,
});

/**
 * Nosotras page composition (P02). Four sections in order, each
 * its own Server Component. Header and Footer are inherited from
 * the `(site)/layout.tsx`. Animation is deferred to A02.
 *
 * The `dynamic = "error"` guardrail from `(site)/layout.tsx` is
 * preserved: this page does not read cookies, headers, search
 * params, or any request-time data.
 */
export default function Nosotras() {
  return (
    <>
      <IntroHero />
      <DevolverSection />
      <TeamSection />
      <TrabajarCTA />
    </>
  );
}
