import type { Metadata } from 'next';
import servicios from '@/content/locales/es/servicios.json';

export const metadata: Metadata = {
  title: servicios.metadata.title,
  description: servicios.metadata.description,
};

export default function ServiciosPage() {
  return (
    <main>
      <h1>Servicios</h1>
      <p>{servicios.placeholder.pending}</p>
    </main>
  );
}
