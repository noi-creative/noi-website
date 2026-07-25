import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { testimonials } from '@/content/data/testimonials';
import home from '@/content/locales/es/home.json';
import styles from './Testimonials.module.scss';

/**
 * "LO QUE DICEN NUESTROS CLIENTES" section. Soft-blue background,
 * eyebrow, mixed-typeface heading, and three stacked testimonial
 * cards (front navy + two burgundy behind). The carousel controls
 * (arrows + dots) are static placeholders in P01; A01 will add
 * scroll-driven motion and behaviour.
 *
 * Server Component.
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
        <div className={styles.header}>
          <Eyebrow tone="accent">{home.testimonials.eyebrow}</Eyebrow>
          <Heading
            as="h2"
            id="home-testimonials-heading"
            primary={home.testimonials.headline.primary}
            accent={home.testimonials.headline.accent}
            weight="bold"
            align="center"
          />
        </div>

        <div className={styles.stack} role="list" aria-label="Testimonios">
          {ordered.map((t, index) => (
            <article
              key={t.id}
              role="listitem"
              className={[
                styles.card,
                styles[`card-${t.cardColor}`],
                styles[`cardOrder${t.order}`],
                index === 0 ? styles.cardFront : styles.cardBack,
              ].join(' ')}
            >
              {t.mark ? <p className={styles.mark}>{t.mark}</p> : null}
              <blockquote className={styles.quote}>
                <p>{t.quote}</p>
              </blockquote>
              <footer className={styles.attribution}>
                <span className={styles.author}>{t.author}</span>
                <span className={styles.role}>{t.role}</span>
              </footer>
            </article>
          ))}
        </div>

        <div className={styles.controlsPlaceholder} aria-hidden="true">
          <span className={styles.arrow}>{'<'}</span>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.arrow}>{'>'}</span>
        </div>
      </Container>
    </Section>
  );
}
