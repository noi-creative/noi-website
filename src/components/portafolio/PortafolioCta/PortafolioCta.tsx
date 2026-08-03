import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { assets } from '@/lib/assets';
import portafolio from '@/content/locales/es/portafolio.json';
import styles from './PortafolioCta.module.scss';
import { PortafolioCtaStickerMotion, PortafolioCtaTextMotion } from './PortafolioCtaMotion';

/**
 * Final CTA section of the Portafolio index. Burgundy background
 * with the mixed-typeface heading, the lede, the yellow CTA, and
 * 2 decorative SVG stickers: a light-blue text-bubble sticker on
 * the left and a yellow calendar sticker on the right (both from
 * `assets.shared.stickers`, the studio-supplied stickers that replace
 * the earlier best-effort inline + semi-circle approximations).
 */
export function PortafolioCta() {
  const textBubble = assets.shared.stickers.burbujaTexto.naranja;
  const calendar = assets.shared.stickers.calendario.azul;

  return (
    <Section background="burgundy" ariaLabelledby="portafolio-cta-heading" className={styles.cta}>
      <Container className={styles.ctaContainer}>
        <PortafolioCtaStickerMotion className={styles.doodleLeft}>
          <Image
            src={textBubble.src}
            alt=""
            width={208}
            height={205}
            className={`${styles.sticker} ${styles.textBubbleSticker}`}
            sizes="(max-width: 767px) 50vw, 18vw"
          />
        </PortafolioCtaStickerMotion>

        <div className={styles.textColumn}>
          <PortafolioCtaTextMotion className={styles.textMotionItem}>
            <Heading
              as="h2"
              id="portafolio-cta-heading"
              primary={portafolio.cta.headline.primary}
              accent={portafolio.cta.headline.accent}
              weight="bold"
              align="center"
              accentFamily="serif"
              accentWeight="medium"
              accentItalic
              accentColor="var(--color-brand-yellow)"
              className={styles.heading}
            />

            <p className={styles.lede}>{portafolio.cta.lede}</p>

            <div className={styles.ctaRow}>
              <Button href="/contacto" variant="primary-orange" withArrow size="lg">
                {portafolio.cta.button}
              </Button>
            </div>
          </PortafolioCtaTextMotion>
        </div>

        <PortafolioCtaStickerMotion className={styles.stickerRight} delay={0.1}>
          <Image
            src={calendar.src}
            alt=""
            width={209}
            height={196}
            className={`${styles.sticker} ${styles.calendarSticker}`}
            sizes="(max-width: 767px) 40vw, 12vw"
          />
        </PortafolioCtaStickerMotion>
      </Container>
    </Section>
  );
}
