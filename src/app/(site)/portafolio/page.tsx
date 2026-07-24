import type { Metadata } from 'next';
import portafolio from '@/content/locales/es/portafolio.json';
import { buildPageMetadata } from '@/lib/metadata';
import { site } from '@/config/site';

export const metadata: Metadata = buildPageMetadata({
  title: portafolio.metadata.title,
  description: portafolio.metadata.description,
  path: site.routes.portafolio,
});

export default function PortafolioIndexPage() {
  return (
    <main>
      <h1>Portafolio</h1>
      <p>{portafolio.placeholder.pending}</p>
    </main>
  );
}
