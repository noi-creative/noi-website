import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import portafolio from '@/content/locales/es/portafolio.json';
import styles from './PortafolioHero.module.scss';
import { PortafolioDecor } from '../PortafolioDecor/PortafolioDecor';

/**
 * First section of the Portafolio index page. Light-blue
 * background (`--color-background-soft`), centered text column
 * with the eyebrow, the mixed-typeface H1 (Satoshi + Playfair
 * Italic), and the lede paragraph.
 *
 * The eyebrow is rendered as a one-off `<p>` because the C06
 * `Eyebrow` primitive does not offer an orange tone (per
 * AGENTS.md §26 we do not extend a primitive for a single use).
 * The H1 is an inline `<h1>` with two `<span>` children because
 * the C06 `Heading` primitive uppercases the primary line and
 * this hero's primary line is mixed case.
 */
export function PortafolioHero() {
  return (
    <Section background="soft" ariaLabelledby="portafolio-hero-heading" className={styles.hero}>
      <PortafolioDecor className={styles.decor} />
      <PortafolioDecor className={styles.decorYellow} colorHEX="#ED7218" />
      <Container className={styles.heroContainer}>
        <p className={styles.eyebrow}>{portafolio.hero.eyebrow}</p>

        <h1 id="portafolio-hero-heading" className={styles.heading}>
          <span className={styles.headingPrimary}>{portafolio.hero.headline.primary}</span>
          <span className={styles.headingAccent}>{portafolio.hero.headline.accent}</span>
        </h1>

        <p className={styles.lede}>{portafolio.hero.lede}</p>
      </Container>
    </Section>
  );
}
