import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/metadata';
import { site } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';

export const metadata: Metadata = buildPageMetadata({
  title: 'Página no encontrada',
  description: 'La página que buscas no existe o se movió.',
  path: '/404',
  noIndex: true,
});

export default function NotFound() {
  return (
    <Section background="cream" contained>
      <Container>
        <Eyebrow>Error 404</Eyebrow>
        <Heading as="h1" primary="Esta página" accent="no existe" weight="black" />
        <p style={{ marginTop: 'var(--space-3)', maxWidth: '52ch' }}>
          La URL que pediste no se encontró. Vuelve al inicio o explora nuestros servicios y
          portafolio.
        </p>
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-3)',
            flexWrap: 'wrap',
            marginTop: 'var(--space-5)',
          }}
        >
          <Button href={site.routes.home} variant="primary-orange" withArrow>
            Volver al inicio
          </Button>
          <Button href={site.routes.portafolio} variant="outline-on-light">
            Ver portafolio
          </Button>
        </div>
      </Container>
    </Section>
  );
}
