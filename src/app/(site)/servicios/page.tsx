import type { Metadata } from 'next';
import servicios from '@/content/locales/es/servicios.json';
import { buildPageMetadata } from '@/lib/metadata';
import { site } from '@/config/site';
import { ServiciosFinalCta, ServiciosHero, ServiciosList } from '@/components/servicios';

export const metadata: Metadata = buildPageMetadata({
  title: servicios.metadata.title,
  description: servicios.metadata.description,
  path: site.routes.servicios,
});

export default function ServiciosPage() {
  return (
    <>
      <ServiciosHero />
      <ServiciosList />
      <ServiciosFinalCta />
    </>
  );
}
