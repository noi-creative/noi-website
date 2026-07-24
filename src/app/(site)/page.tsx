import common from '@/content/locales/es/common.json';
import home from '@/content/locales/es/home.json';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';

/**
 * Home page placeholder. C05 only ships the static architecture; the
 * actual home page composition is implemented in P01. This placeholder
 * uses the C06 primitives (`Heading`, `Eyebrow`, `Container`, `Section`,
 * `Button`) so the primitives are exercised at build time. P01 will
 * replace this with the real home composition.
 */
export default function Home() {
  return (
    <>
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

      <Section background="cream" contained>
        <Container>
          <Eyebrow>Fixture</Eyebrow>
          <Heading as="h2" primary="Página en construcción" accent="P01 pendiente" weight="bold" />
          <p style={{ marginTop: 'var(--space-3)' }}>{home.placeholder.pending}</p>
          <div style={{ marginTop: 'var(--space-5)' }}>
            <Button variant="primary-orange" withArrow>
              {common.cta.agendarLlamada}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
