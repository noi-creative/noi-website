import type { Metadata } from 'next';
import common from '@/content/locales/es/common.json';
import home from '@/content/locales/es/home.json';
import { buildPageMetadata } from '@/lib/metadata';
import { site } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';

export const metadata: Metadata = buildPageMetadata({
  title: home.metadata.title,
  description: home.metadata.description,
  path: site.routes.home,
});

/**
 * Home page placeholder. C07 now provides the shared header and footer
 * via `(site)/layout.tsx`, so the home page only renders its own content.
 * The actual home page composition is implemented in P01.
 */
export default function Home() {
  return (
    <Section background="navy" contained>
      <Eyebrow tone="cream">{home.hero.eyebrow}</Eyebrow>
      <Heading
        as="h1"
        primary={home.hero.headline.primary}
        accent={home.hero.headline.accent}
        weight="black"
      />
      <p style={{ maxWidth: '52ch', marginTop: 'var(--space-4)' }}>{home.hero.lede}</p>
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-3)',
          flexWrap: 'wrap',
          marginTop: 'var(--space-5)',
        }}
      >
        <Button variant="primary-yellow" withArrow>
          {common.cta.agendarLlamada}
        </Button>
        <Button variant="outline-on-dark" withArrow>
          {common.cta.verPortafolio}
        </Button>
      </div>
    </Section>
  );
}
