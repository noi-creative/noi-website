import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { Scallop } from '@/components/home/Scallop';
import { site } from '@/config/site';
import common from '@/content/locales/es/common.json';
import home from '@/content/locales/es/home.json';
import styles from './ProcessTimeline.module.scss';

/**
 * "NUESTRO MÉTODO" section. Cream background with a burgundy scallop
 * at the top. Two-column desktop layout: header (eyebrow, heading, CTA)
 * on the left, four-step process timeline on the right. The timeline
 * renders a smooth orange sine-wave SVG with four small dot-in-circle
 * markers and four large faded background numerals (1–4). Step text
 * alternates above and below the curve. On mobile the timeline collapses
 * to a vertical list with a straight vertical connector (P01 spec §90).
 * Server Component.
 */
export function ProcessTimeline() {
  return (
    <Section
      background="cream"
      ariaLabelledby="home-process-heading"
      className={styles.processSection}
    >
      <Container className={styles.processContainer}>
        <div className={styles.header}>
          <Eyebrow tone="orange">{home.process.eyebrow}</Eyebrow>
          <Heading
            as="h2"
            id="home-process-heading"
            primary={home.process.headline.primary}
            accent={home.process.headline.accent}
            weight="bold"
            style={{ '--heading-accent-color': 'var(--color-brand-orange)' } as React.CSSProperties}
          />
        </div>

        <ol className={styles.timeline} aria-label="Fases del método">
          <span className={styles.connectorMobile} aria-hidden="true" />
          <span className={styles.curve} aria-hidden="true" />

          {home.process.steps.map((step, index) => {
            return (
              <li
                key={step.title}
                className={[styles.step, styles[`stepAlt${index % 2}`]].join(' ')}
              >
                <span className={styles.bigNumber} aria-hidden="true">
                  {index + 1}
                </span>
                <span className={styles.marker} aria-hidden="true">
                  <span className={styles.markerDot} />
                </span>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className={styles.cta}>
          <Button href={site.routes.nosotras} variant="primary-ink" withArrow>
            {common.cta.conoceComoTrabajamos}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
