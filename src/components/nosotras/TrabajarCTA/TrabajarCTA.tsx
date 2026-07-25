import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Scallop } from '@/components/home/Scallop';
import { site } from '@/config/site';
import common from '@/content/locales/es/common.json';
import nosotras from '@/content/locales/es/nosotras.json';
import { TrabajarIconMotion, TrabajarTextColumnMotion } from './TrabajarCTAMotion';
import styles from './TrabajarCTA.module.scss';

/**
 * "¿Trabajamos juntos?" final CTA section. Soft-blue background
 * with a cream scallop at the top (dripping from the team section
 * above), circular fist-bump illustration on the left, mixed-
 * typeface heading + lede + single orange CTA. Centered layout.
 *
 * The circular illustration is rendered as an inline SVG (no new
 * asset); the actual line-art icon is a Q01 TODO.
 */
export function TrabajarCTA() {
  return (
    <Section
      background="soft"
      ariaLabelledby="nosotras-trabajar-heading"
      className={styles.trabajarSection}
    >
      <Scallop tone="cream" className={styles.topScallop} />

      <Container className={styles.trabajarContainer}>
        <TrabajarIconMotion>
          <div className={styles.iconColumn} aria-hidden="true">
            <div className={styles.iconCircle}>
              <svg
                className={styles.fistBump}
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="30"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <path
                  d="M22 36 C 22 32, 26 30, 30 32 L 32 28 C 34 26, 38 26, 40 28 L 44 32 C 46 34, 46 38, 44 40 L 36 44 C 34 46, 30 46, 28 44 L 22 36 Z"
                  fill="currentColor"
                  opacity="0.85"
                />
              </svg>
            </div>
          </div>
        </TrabajarIconMotion>

        <div className={styles.textColumn}>
          <TrabajarTextColumnMotion>
            <h2 id="nosotras-trabajar-heading" className={styles.heading}>
              <span className={styles.headingPrimary}>{nosotras.trabajar.headline.primary}</span>{' '}
              <span className={styles.headingAccent}>{nosotras.trabajar.headline.accent}</span>
            </h2>
            <p className={styles.lede}>{nosotras.trabajar.lede}</p>
            <div className={styles.cta}>
              <Button href={site.routes.contacto} variant="primary-orange" withArrow size="lg">
                {common.cta.agendarLlamadaOrientacion}
              </Button>
            </div>
          </TrabajarTextColumnMotion>
        </div>
      </Container>
    </Section>
  );
}
