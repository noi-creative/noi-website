import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Scallop } from '@/components/home/Scallop';
import { assets } from '@/lib/assets';
import { site } from '@/config/site';
import common from '@/content/locales/es/common.json';
import nosotras from '@/content/locales/es/nosotras.json';
import { TrabajarIconMotion, TrabajarTextColumnMotion } from './TrabajarCTAMotion';
import styles from './TrabajarCTA.module.scss';

/**
 * "¿Trabajamos juntos?" final CTA section. Soft-blue background
 * with a cream scallop at the top (dripping from the team section
 * above), the blue hands sticker on the left, mixed-typeface
 * heading + lede + single orange CTA. Centered layout.
 */
export function TrabajarCTA() {
  const manosSticker = assets.shared.stickers.manosAzul;
  return (
    <Section
      background="soft"
      ariaLabelledby="nosotras-trabajar-heading"
      className={styles.trabajarSection}
    >
      <Scallop tone="cream" className={styles.topScallop} />

      <Container className={styles.trabajarContainer}>
        <TrabajarIconMotion>
          <div className={styles.iconColumn} aria-hidden="true">
            <Image
              src={manosSticker.src}
              alt=""
              width={183}
              height={183}
              className={styles.manosSticker}
            />
          </div>
        </TrabajarIconMotion>

        <div className={styles.textColumn}>
          <TrabajarTextColumnMotion>
            <h2 id="nosotras-trabajar-heading" className={styles.heading}>
              <span className={styles.headingPrimary}>{nosotras.trabajar.headline.primary}</span>{' '}
              <span className={styles.headingAccent}>{nosotras.trabajar.headline.accent}</span>
            </h2>
            <p className={styles.lede}>{nosotras.trabajar.lede}</p>
            <div className={styles.cta}>
              <Button href={site.routes.contacto} variant="primary-orange" withArrow size="lg">
                {common.cta.agendarLlamadaOrientacion}
              </Button>
            </div>
          </TrabajarTextColumnMotion>
        </div>
      </Container>
    </Section>
  );
}
