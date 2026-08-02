import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import portafolio from '@/content/locales/es/portafolio.json';
import styles from './PortafolioHero.module.scss';
import { PortafolioHeroArtworkMotion, PortafolioHeroTextMotion } from './PortafolioHeroMotion';
import { PortafolioDecor } from '../PortafolioDecor/PortafolioDecor';

/**
 * First section of the Portafolio index page. Light-blue
 * background (`--color-background-soft`), centered text column
 * with the eyebrow, the mixed-typeface H1 (Satoshi + Playfair
 * Italic), and the lede paragraph.
 *
 * Shared Eyebrow and Heading primitives provide the orange label
 * and mixed-typeface heading while section styles preserve the
 * approved two-line composition.
 */
export function PortafolioHero() {
  return (
    <Section background="soft" ariaLabelledby="portafolio-hero-heading" className={styles.hero}>
      <PortafolioHeroArtworkMotion className={styles.artwork}>
        <PortafolioDecor className={styles.decor} />
        <PortafolioDecor className={styles.decorYellow} colorHEX="#ED7218" />
      </PortafolioHeroArtworkMotion>

      <Container className={styles.heroContainer}>
        <PortafolioHeroTextMotion>
          <Eyebrow tone="orange">{portafolio.hero.eyebrow}</Eyebrow>
        </PortafolioHeroTextMotion>

        <Heading
          as="h1"
          id="portafolio-hero-heading"
          primary={portafolio.hero.headline.primary}
          accent={portafolio.hero.headline.accent}
          weight="black"
          align="center"
          accentFamily="display"
          accentWeight="bold"
          accentItalic
          accentColor="var(--color-action-primary)"
          className={styles.heading}
        />

        <PortafolioHeroTextMotion delay={0.12}>
          <p className={styles.lede}>{portafolio.hero.lede}</p>
        </PortafolioHeroTextMotion>
      </Container>
    </Section>
  );
}
