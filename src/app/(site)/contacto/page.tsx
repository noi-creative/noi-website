import type { Metadata } from 'next';
import contacto from '@/content/locales/es/contacto.json';

export const metadata: Metadata = {
  title: contacto.metadata.title,
  description: contacto.metadata.description,
};

export default function ContactoPage() {
  return (
    <main>
      <h1>
        {contacto.hero.headline.primary}{' '}
        <span className="font-serif-italic">{contacto.hero.headline.accent}</span>
      </h1>
      <p>{contacto.placeholder.pending}</p>
    </main>
  );
}
