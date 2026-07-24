import type { Metadata } from 'next';
import nosotras from '@/content/locales/es/nosotras.json';

export const metadata: Metadata = {
  title: nosotras.metadata.title,
  description: nosotras.metadata.description,
};

export default function NosotrasPage() {
  return (
    <main>
      <h1>
        {nosotras.intro.headline.primary}{' '}
        <span className="font-serif-italic">{nosotras.intro.headline.accent}</span>
      </h1>
      <p>{nosotras.placeholder.pending}</p>
    </main>
  );
}
