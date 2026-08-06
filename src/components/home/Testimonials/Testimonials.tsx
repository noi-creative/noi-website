import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { testimonials } from '@/content/data/testimonials';
import home from '@/content/locales/es/home.json';
import { TestimonialsCarousel } from './TestimonialsCarousel';
import { TestimonialsHeaderMotion } from './TestimonialsMotion';
import styles from './Testimonials.module.scss';

/**
 * "LO QUE DICEN NUESTROS CLIENTES" section. Soft-blue background,
 * eyebrow, mixed-typeface heading, and an interactive carousel of
 * testimonial cards. The carousel renders the full list in a stack
 * with the active card in front and the previous/next cards peeking
 * from the sides. Arrows and pagination dots rotate the active card;
 * the reduced-motion fallback collapses the transition to an
 * instant swap.
 *
 * Server Component. The carousel behaviour lives in
 * `TestimonialsCarousel.tsx` (a small client island).
 */
export function Testimonials() {
  const ordered = [...testimonials].sort((a, b) => a.order - b.order);

  return (
    <Section
      background="soft"
      ariaLabelledby="home-testimonials-heading"
      className={styles.testimonialsSection}
    >
      <Container className={styles.testimonialsContainer}>
        <TestimonialsHeaderMotion className={styles.header}>
          <Eyebrow tone="ink">{home.testimonials.eyebrow}</Eyebrow>
          <Heading
            as="h2"
            id="home-testimonials-heading"
            primary={home.testimonials.headline.primary}
            accent={home.testimonials.headline.accent}
            weight="black"
            align="center"
            style={
              { '--heading-accent-color': 'var(--color-brand-burgundy)' } as React.CSSProperties
            }
          />
        </TestimonialsHeaderMotion>

        <TestimonialsCarousel items={ordered} />
      </Container>
    </Section>
  );
}
