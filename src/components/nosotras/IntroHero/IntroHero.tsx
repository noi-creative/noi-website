import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { assets } from '@/lib/assets';
import nosotras from '@/content/locales/es/nosotras.json';
import { IntroHeroIllustrationMotion, IntroHeroBodyMotion } from './IntroHeroMotion';
import styles from './IntroHero.module.scss';

/**
 * First section of the Nosotras page. Yellow background with a
 * cream speech-bubble shape on the right containing the line-art
 * team illustration and the "noi creative" logo.
 *
 * The speech-bubble is a single CSS-rendered shape (no new SVG
 * asset) with a soft cream surface, positioned to contain the
 * illustration and the logo. Server Component.
 */
export function IntroHero() {
  const illustration = assets.nosotras.teamIllustration;

  return (
    <Section
      background="yellow"
      ariaLabelledby="nosotras-intro-heading"
      className={styles.introSection}
    >
      <Container className={styles.introContainer}>
        <div className={styles.textColumn}>
          <Eyebrow tone="accent">{nosotras.intro.eyebrow}</Eyebrow>

          <Heading
            as="h1"
            id="nosotras-intro-heading"
            primary={nosotras.intro.headline.primary}
            accent={nosotras.intro.headline.accent}
            weight="black"
            className={styles.heading}
          />

          <div className={styles.body}>
            <IntroHeroBodyMotion>
              <p className={styles.ledeEmphasis}>{nosotras.intro.lede1}</p>
              <p>{nosotras.intro.lede2}</p>
              <p>{nosotras.intro.lede3}</p>
            </IntroHeroBodyMotion>
          </div>
        </div>

        <IntroHeroIllustrationMotion>
          <div className={styles.illustrationColumn} aria-hidden="true">
            <div className={styles.speechBubble}>
              <Image
                src={illustration.src}
                alt=""
                width={illustration.width}
                height={illustration.height}
                className={styles.illustration}
                sizes="(max-width: 767px) 90vw, 40vw"
                priority
              />

              <div className={styles.logoMark}>
                <span className={styles.logoNoi}>noi</span>
                <span className={styles.logoCreative}>creative</span>
              </div>
            </div>
          </div>
        </IntroHeroIllustrationMotion>
      </Container>
    </Section>
  );
}
