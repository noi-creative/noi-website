import type { Metadata } from 'next';
import home from '@/content/locales/es/home.json';
import { buildPageMetadata } from '@/lib/metadata';
import { site } from '@/config/site';
import { Hero } from '@/components/home/Hero';
import { BrandingSection } from '@/components/home/BrandingSection';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { PortafolioPreview } from '@/components/home/PortafolioPreview';
import { ProcessTimeline } from '@/components/home/ProcessTimeline';
import { Testimonials } from '@/components/home/Testimonials';
import { FinalCta } from '@/components/home/FinalCta';

export const metadata: Metadata = buildPageMetadata({
  title: home.metadata.title,
  description: home.metadata.description,
  path: site.routes.home,
});

/**
 * Home page composition (P01). Seven sections in order, each its
 * own Server Component. Header and Footer are inherited from the
 * `(site)/layout.tsx`. Animation stays isolated in section-level
 * client components so this page remains server-rendered.
 *
 * The `dynamic = "error"` guardrail from `(site)/layout.tsx` is
 * preserved: this page does not read cookies, headers, search
 * params, or any request-time data.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <BrandingSection />
      <ServicesPreview />
      <PortafolioPreview />
      <ProcessTimeline />
      <Testimonials />
      <FinalCta />
    </>
  );
}
