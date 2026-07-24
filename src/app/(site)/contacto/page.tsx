import type { Metadata } from 'next';
import contacto from '@/content/locales/es/contacto.json';
import { buildPageMetadata } from '@/lib/metadata';
import { site } from '@/config/site';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = buildPageMetadata({
  title: contacto.metadata.title,
  description: contacto.metadata.description,
  path: site.routes.contacto,
});

export default function ContactoPage() {
  return (
    <main>
      <h1>
        {contacto.hero.headline.primary}{' '}
        <span className="font-serif-italic">{contacto.hero.headline.accent}</span>
      </h1>
      <p>{contacto.hero.lede}</p>
      <ContactForm />
    </main>
  );
}
