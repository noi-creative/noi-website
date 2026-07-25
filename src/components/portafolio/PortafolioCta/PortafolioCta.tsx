import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { assets } from '@/lib/assets';
import portafolio from '@/content/locales/es/portafolio.json';
import styles from './PortafolioCta.module.scss';

/**
 * Final CTA section of the Portafolio index. Burgundy background
 * with the mixed-typeface heading, the lede, the yellow CTA, and
 * 2 decorative SVG stickers: a light-blue text-bubble sticker on
 * the left and a yellow calendar sticker on the right (both from
 * `shared.stickers`, the studio-supplied stickers that replace
 * the earlier best-effort inline + semi-circle approximations).
 */
export function PortafolioCta() {
  const { textBubble, calendar } = assets.shared.stickers;

  return (
    <Section background="burgundy" ariaLabelledby="portafolio-cta-heading" className={styles.cta}>
      <Container className={styles.ctaContainer}>
        <div className={styles.doodleLeft} aria-hidden="true">
          <Image
            src={textBubble.src}
            alt=""
            width={208}
            height={205}
            className={`${styles.sticker} ${styles.textBubbleSticker}`}
            sizes="(max-width: 767px) 50vw, 18vw"
          />
        </div>

        <div className={styles.textColumn}>
          <h2 id="portafolio-cta-heading" className={styles.heading}>
            <span className={styles.headingPrimary}>{portafolio.cta.headline.primary}</span>
            <span className={styles.headingAccent}>{portafolio.cta.headline.accent}</span>
          </h2>

          <p className={styles.lede}>{portafolio.cta.lede}</p>

          <div className={styles.ctaRow}>
            <Button href="/contacto" variant="primary-yellow" withArrow size="lg">
              {portafolio.cta.button}
            </Button>
          </div>
        </div>

        <div className={styles.stickerRight} aria-hidden="true">
          <Image
            src={calendar.src}
            alt=""
            width={209}
            height={196}
            className={`${styles.sticker} ${styles.calendarSticker}`}
            sizes="(max-width: 767px) 40vw, 12vw"
          />
        </div>
      </Container>
    </Section>
  );
}
