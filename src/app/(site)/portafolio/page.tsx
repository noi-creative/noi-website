import type { Metadata } from 'next';
import portafolio from '@/content/locales/es/portafolio.json';

export const metadata: Metadata = {
  title: portafolio.metadata.title,
  description: portafolio.metadata.description,
};

export default function PortafolioIndexPage() {
  return (
    <main>
      <h1>Portafolio</h1>
      <p>{portafolio.placeholder.pending}</p>
    </main>
  );
}
