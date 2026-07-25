import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { assets } from '@/lib/assets';
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
 * Headings render inline (Satoshi + Playfair Italic) so both
 * lines stay in mixed case, per `DESIGN.md` §24.1. The current
 * `Heading` primitive uppercases the primary line, so it is
 * not used here.
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

          <h1 id="contacto-hero-heading" className={styles.heading}>
            <span className={styles.headingPrimary}>{contacto.hero.headline.primary}</span>
            <span className={styles.headingAccent}>{contacto.hero.headline.accent}</span>
          </h1>

          <ContactHeroTextBottomMotion>
            <p className={styles.lede}>
              Agendemos una llamada de <strong>30 minutos</strong> para hablar de tu proyecto.
              Cuéntanos dónde está tu negocio hoy y hacia dónde quieres ir. Solo una conversación de{' '}
              <strong>persona a persona</strong> para entender qué necesita tu marca y descubrir si
              somos el equipo ideal para ayudarte a llegar allí.
            </p>

            <div className={styles.ctaRow}>
              <Button href="#contacto-detalles" variant="primary-yellow" withArrow size="lg">
                {contacto.hero.cta}
              </Button>
            </div>
          </ContactHeroTextBottomMotion>
        </div>

        <div className={styles.collageColumn} aria-hidden="true">
          <div className={styles.collage}>
            <ContactPhotoMotion className={`${styles.photo} ${styles.photoA}`} rotation={-5}>
              <Image
                src={photoA.src}
                alt=""
                width={photoA.width}
                height={photoA.height}
                className={styles.image}
                sizes="(max-width: 767px) 80vw, 32vw"
                priority
              />
            </ContactPhotoMotion>

            <ContactPhotoMotion
              className={`${styles.photo} ${styles.photoB}`}
              rotation={6}
              delay={0.1}
            >
              <Image
                src={photoB.src}
                alt=""
                width={photoB.width}
                height={photoB.height}
                className={styles.image}
                sizes="(max-width: 767px) 60vw, 22vw"
              />
            </ContactPhotoMotion>

            <ContactStickerMotion
              className={`${styles.sticker} ${styles.stickerPhone}`}
              rotation={8}
            >
              <Image
                src={assets.shared.stickers.telefonoAmarillo.src}
                alt=""
                width={200}
                height={200}
                className={styles.stickerImage}
                sizes="(max-width: 767px) 24vw, 10vw"
              />
            </ContactStickerMotion>

            <ContactStickerMotion
              className={`${styles.sticker} ${styles.stickerCalendar}`}
              rotation={8}
            >
              <Image
                src={assets.shared.stickers.calendar.src}
                alt=""
                width={200}
                height={200}
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
