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
 * "NUESTRO MÉTODO" section. Cream background with a burgundy
 * scallop at the top, eyebrow, mixed-typeface heading, four
 * numbered phases connected by an orange zig-zag line, and an
 * outline "Conoce cómo trabajamos" CTA. Server Component.
 */
export function ProcessTimeline() {
  return (
    <Section
      background="cream"
      ariaLabelledby="home-process-heading"
      className={styles.processSection}
    >
      <Scallop tone="burgundy" className={styles.topScallop} />

      <Container className={styles.processContainer}>
        <div className={styles.header}>
          <Eyebrow tone="accent">{home.process.eyebrow}</Eyebrow>
          <Heading
            as="h2"
            id="home-process-heading"
            primary={home.process.headline.primary}
            accent={home.process.headline.accent}
            weight="bold"
          />
        </div>

        <ol className={styles.timeline} aria-label="Fases del método">
          {home.process.steps.map((step, index) => (
            <li key={step.title} className={[styles.step, styles[`stepAlt${index % 2}`]].join(' ')}>
              <span className={styles.stepNumber} aria-hidden="true">
                {index + 1}
              </span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </li>
          ))}
          <span className={styles.connector} aria-hidden="true" />
        </ol>

        <div className={styles.cta}>
          <Button href={site.routes.nosotras} variant="outline-on-light" withArrow>
            {common.cta.conoceComoTrabajamos}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
