import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import { assets } from '@/lib/assets';
import { site } from '@/config/site';
import servicios from '@/content/locales/es/servicios.json';
import { ServiciosHeroArtworkMotion } from './ServiciosHeroMotion';
import styles from './ServiciosHero.module.scss';

export function ServiciosHero() {
  const { hero } = servicios;

  return (
    <Section background="yellow" ariaLabelledby="servicios-hero-heading" className={styles.hero}>
      <div className={styles.artwork} aria-hidden="true">
        <ServiciosHeroArtworkMotion className={styles.figure} variant="figure">
          <Image
            src={assets.shared.figuras.figura4.src}
            alt=""
            width={300}
            height={205}
            className={styles.artworkImage}
            priority
          />
        </ServiciosHeroArtworkMotion>
        <ServiciosHeroArtworkMotion className={styles.megaphone} variant="megaphone">
          <Image
            src={assets.shared.stickers.megafono.blanco.src}
            alt=""
            width={180}
            height={142}
            className={styles.artworkImage}
            priority
          />
        </ServiciosHeroArtworkMotion>
        <ServiciosHeroArtworkMotion className={styles.clip} variant="clip">
          <Image
            src={assets.shared.stickers.clip.naranja.src}
            alt=""
            width={125}
            height={114}
            className={styles.artworkImage}
            priority
          />
        </ServiciosHeroArtworkMotion>
        <ServiciosHeroArtworkMotion className={styles.ovals} variant="ovals">
          <Image
            src={assets.shared.figuras.ovalosInk.src}
            alt=""
            width={214}
            height={288}
            className={styles.artworkImage}
            priority
          />
        </ServiciosHeroArtworkMotion>
      </div>

      <Container className={styles.container}>
        <Eyebrow tone="ink">{hero.eyebrow}</Eyebrow>
        <Heading
          as="h1"
          id="servicios-hero-heading"
          primary={hero.headline.primary}
          accent={hero.headline.accent}
          weight="black"
          align="center"
          accentFamily="display"
          accentWeight="bold"
          accentColor="var(--color-brand-burgundy)"
          className={styles.heading}
        />
        <p className={styles.lede}>{hero.lede}</p>
        <div className={styles.actions}>
          <Button href={site.routes.contacto} variant="primary-burgundy" withArrow>
            {hero.primaryCta}
          </Button>
          <Button href={site.routes.portafolio} variant="outline-on-light">
            {hero.secondaryCta}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
