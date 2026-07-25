import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Scallop } from '@/components/home/Scallop';
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
      <Scallop tone="navy" className={styles.topScallop} />

      <Container className={styles.brandingContainer}>
        <div className={styles.textColumn}>
          <Eyebrow tone="ink">{home.branding.eyebrow}</Eyebrow>

          <h2 id="home-branding-heading" className={styles.heading}>
            <span className={styles.headingRegular}>{home.branding.headlineRegular}</span>
            <span className={styles.headingBold}>{home.branding.headlineBold}</span>
          </h2>

          <div className={styles.body}>
            <p>{home.branding.body1}</p>
            <p>{home.branding.body2}</p>
          </div>
        </div>

        <div className={styles.portraitColumn}>
          <div className={styles.portrait}>
            <Image
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
    </Section>
  );
}
