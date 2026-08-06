import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/metadata';
import { site } from '@/config/site';
import portafolio from '@/content/locales/es/portafolio.json';
import { PortafolioHero } from '@/components/portafolio/PortafolioHero';
import { PortafolioGrid } from '@/components/portafolio/PortafolioGrid';
import { PortafolioCta } from '@/components/portafolio/PortafolioCta';

export const metadata: Metadata = buildPageMetadata({
  title: portafolio.metadata.title,
  description: portafolio.metadata.description,
  path: site.routes.portafolio,
  absoluteTitle: true,
});

export default function PortafolioIndexPage() {
  return (
    <>
      <PortafolioHero />
      <PortafolioGrid />
      <PortafolioCta />
    </>
  );
}
