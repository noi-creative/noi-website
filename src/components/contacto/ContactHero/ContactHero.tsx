import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { assets } from '@/lib/assets';
import { HoverZoom } from '@/lib/motion';
import { renderBold } from '@/lib/renderBold';
import contacto from '@/content/locales/es/contacto.json';
import {
  ContactHeroTextTopMotion,
  ContactHeroTextBottomMotion,
  ContactPhotoMotion,
  ContactStickerMotion,
} from './ContactHeroMotion';
import styles from './ContactHero.module.scss';

/**
 * Contact hero. Burgundy background with a two-column layout:
 * the headline + lede + yellow CTA on the left, and a collage of
 * two rotated portrait photos with the retro telephone sticker
 * (and a smaller secondary phone illustration) on the right.
 *
 * The shared heading renders the mixed-case Satoshi primary and
 * Panel Sans accent treatment from the approved design.
 */
export function ContactHero() {
  const [photoA, photoB] = assets.contacto.hero;

  return (
    <Section background="burgundy" ariaLabelledby="contacto-hero-heading" className={styles.hero}>
      <Container className={styles.heroContainer}>
        <div className={styles.textColumn}>
          <ContactHeroTextTopMotion>
            <Eyebrow tone="cream">{contacto.hero.eyebrow}</Eyebrow>
          </ContactHeroTextTopMotion>
          <Heading
            as="h1"
            id="contacto-hero-heading"
            primary={contacto.hero.headline.primary}
            accent={contacto.hero.headline.accent}
            weight="black"
            accentFamily="display"
            accentWeight="bold"
            accentItalic
            accentColor="var(--color-brand-yellow)"
            className={styles.heading}
          />
          <ContactHeroTextBottomMotion>
            <p className={styles.lede}>{renderBold(contacto.hero.lede)}</p>

            <div className={styles.ctaRow}>
              <Button href="#contacto-detalles" variant="primary-yellow" withArrow size="lg">
                {contacto.hero.cta}
              </Button>
            </div>
          </ContactHeroTextBottomMotion>
        </div>

        <div className={styles.collageColumn} aria-hidden="true">
          <div className={styles.collage}>
            <ContactPhotoMotion className={`${styles.photo} ${styles.photoA}`} rotation={-6}>
              <HoverZoom className={styles.imageZoom}>
                <Image
                  src={photoA.src}
                  alt=""
                  width={photoA.width}
                  height={photoA.height}
                  className={styles.image}
                  priority
                />
              </HoverZoom>
            </ContactPhotoMotion>

            <ContactPhotoMotion
              className={`${styles.photo} ${styles.photoB}`}
              rotation={6}
              delay={0.1}
            >
              <HoverZoom className={styles.imageZoom}>
                <Image
                  src={photoB.src}
                  alt=""
                  width={photoB.width}
                  height={photoB.height}
                  className={styles.image}
                />
              </HoverZoom>
            </ContactPhotoMotion>

            <ContactStickerMotion
              className={`${styles.sticker} ${styles.stickerPhone}`}
              rotation={0}
            >
              <Image
                src={assets.shared.stickers.telefonoAzul.src}
                alt=""
                width={200}
                height={200}
                className={styles.stickerImage}
                sizes="(max-width: 767px) 24vw, 10vw"
              />
            </ContactStickerMotion>

            <ContactStickerMotion
              className={`${styles.sticker} ${styles.stickerPhone2}`}
              rotation={8}
            >
              <Image
                src={assets.shared.stickers.telefonoCrema.src}
                alt=""
                width={210}
                height={187}
                className={styles.stickerImage}
                sizes="(max-width: 767px) 24vw, 10vw"
              />
            </ContactStickerMotion>
          </div>
        </div>
      </Container>
    </Section>
  );
}
