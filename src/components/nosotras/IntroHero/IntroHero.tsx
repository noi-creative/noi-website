import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { assets } from '@/lib/assets';
import { parseMarkers } from '@/lib/renderBold';
import nosotras from '@/content/locales/es/nosotras.json';
import { IntroHeroIllustrationMotion, IntroHeroBodyMotion } from './IntroHeroMotion';
import styles from './IntroHero.module.scss';
import { CSSProperties } from 'react';

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
  const noi = assets.shared.logo.noiAzul;
  const creative = assets.shared.logo.creativeRojo;

  return (
    <Section
      background="yellow"
      ariaLabelledby="nosotras-intro-heading"
      className={styles.introSection}
    >
      <Container className={styles.introContainer}>
        <div className={styles.textColumn}>
          <Eyebrow tone="orange">{nosotras.intro.eyebrow}</Eyebrow>

          <Heading
            as="h1"
            id="nosotras-intro-heading"
            primary={nosotras.intro.headline.primary}
            accent={nosotras.intro.headline.accent}
            weight="black"
            accentFamily="serif"
            accentColor="var(--color-action-primary)"
            accentItalic
            accentWeight="medium"
            className={styles.heading}
            style={
              {
                '--heading-primary-transform': 'none',
              } as CSSProperties
            }
          />

          <div className={styles.body}>
            <IntroHeroBodyMotion>
              <p className={styles.ledeEmphasis}>{renderLede(nosotras.intro.lede1)}</p>
              <p>{renderLede(nosotras.intro.lede2)}</p>
              <p>{renderLede(nosotras.intro.lede3)}</p>
            </IntroHeroBodyMotion>
          </div>
        </div>

        <IntroHeroIllustrationMotion>
          <div className={styles.illustrationColumn} aria-hidden="true">
            <div className={styles.logoMark}>
              <Image
                src={noi.src}
                alt=""
                width={230}
                height={100}
                className={styles.noi}
                sizes="(max-width: 767px) 90vw, 40vw"
                priority
              />
              <Image
                src={creative.src}
                alt=""
                width={160}
                height={50}
                className={styles.creative}
                sizes="(max-width: 767px) 90vw, 40vw"
                priority
              />
            </div>
            <Image
              src={illustration.src}
              alt=""
              width={illustration.width}
              height={illustration.height}
              className={styles.illustration}
              sizes="(max-width: 767px) 90vw, 40vw"
              priority
            />
          </div>
          <OvalBackground />
        </IntroHeroIllustrationMotion>
      </Container>
    </Section>
  );
}

function renderLede(text: string) {
  return parseMarkers(text).map((segment, index) =>
    segment.type === 'bold' ? (
      <strong key={index}>{segment.text}</strong>
    ) : (
      <span key={index}>{segment.text}</span>
    ),
  );
}

const OvalBackground = () => {
  const ovalo = assets.shared.figuras.ovaloCrema;

  return (
    <div className={styles.ovals}>
      {[1, 2, 3].map((key) => (
        <Image
          key={key}
          src={ovalo.src}
          alt=""
          height={300}
          width={500}
          className={styles.oval}
          sizes="(max-width: 767px) 90vw, 40vw"
          priority
        />
      ))}
    </div>
  );
};
