import type { CSSProperties } from 'react';
import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { Scallop } from '@/components/home/Scallop';
import { renderBold } from '@/lib/renderBold';
import { assets } from '@/lib/assets';
import home from '@/content/locales/es/home.json';
import styles from './BrandingSection.module.scss';

export function BrandingSection() {
  const portrait = assets.home.sectionBrandingPortrait;
  const stickerManos = assets.shared.stickers.manosRojo;

  return (
    <Section
      background="yellow"
      ariaLabelledby="home-branding-heading"
      className={styles.brandingSection}
    >
      <Container className={styles.brandingContainer}>
        <div className={styles.textColumn}>
          <Eyebrow tone="ink">{home.branding.eyebrow}</Eyebrow>

          <Heading
            as="h2"
            id="home-branding-heading"
            primary={home.branding.headlineRegular}
            accent={home.branding.headlineBold}
            weight="bold"
            accentWeight="black"
            accentColor="var(--color-brand-navy)"
            accentFamily="display"
            className={styles.heading}
            style={
              {
                '--heading-primary-transform': 'none',
              } as CSSProperties
            }
          />

          <div className={styles.body}>
            <p>{renderBold(home.branding.body1)}</p>
            <p>{renderBold(home.branding.body2)}</p>
          </div>
        </div>

        <div className={styles.portraitColumn}>
          <div className={styles.portrait}>
            <Image
              loading="eager"
              src={portrait.src}
              alt={portrait.alt ?? 'Daniela leyendo un libro'}
              width={portrait.width}
              height={portrait.height}
              className={styles.portraitImage}
              sizes="(max-width: 767px) 90vw, 40vw"
            />
          </div>

          <div className={styles.sticker} aria-hidden="true">
            <Image
              src={stickerManos.src}
              alt=""
              width={96}
              height={96}
              className={styles.stickerImage}
            />
          </div>
        </div>
      </Container>
      <Scallop tone="cream" direction="down" />
    </Section>
  );
}
