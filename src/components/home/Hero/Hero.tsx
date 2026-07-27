import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { HeaderWheel } from '@/components/home/HeaderWheel';
import { DecorativeShape } from '@/components/home/DecorativeShape';
import { site } from '@/config/site';
import home from '@/content/locales/es/home.json';
import styles from './Hero.module.scss';

export function Hero() {
  return (
    <Section
      as="header"
      background="navy"
      ariaLabelledby="home-hero-heading"
      className={styles.heroSection}
    >
      <HeaderWheel />
      <DecorativeShape />
      <Container className={styles.heroContainer} width="viewport">
        <div className={styles.leftColumn}>
          <Heading
            as="h1"
            id="home-hero-heading"
            primary={home.hero.headline.primary}
            accent={home.hero.headline.accent}
            weight="black"
            accentFamily="serif"
            accentItalic
            accentWeight="medium"
            className={styles.heading}
            style={{ color: 'var(--color-brand-yellow)' }}
          />
          <p className={styles.lede}>{home.hero.lede}</p>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.ctas}>
            <Button href={site.routes.contacto} variant="primary-yellow" withArrow>
              {home.hero.primaryCta}
            </Button>
            <Button href={site.routes.portafolio} variant="outline-on-dark" withArrow>
              {home.hero.secondaryCta}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
