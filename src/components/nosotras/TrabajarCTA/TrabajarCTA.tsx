import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
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
  const figure1 = assets.shared.figuras.figura1;
  const figure2 = assets.shared.figuras.figura2;

  return (
    <Section
      background="soft"
      ariaLabelledby="nosotras-trabajar-heading"
      className={styles.trabajarSection}
    >
      <Container className={styles.trabajarContainer}>
        <Image
          src={figure1.src}
          alt=""
          width={315}
          height={200}
          className={`${styles.figure} ${styles.figure1}`}
        />
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
            <Heading
              as="h2"
              id="nosotras-trabajar-heading"
              primary={nosotras.trabajar.headline.primary}
              accent={nosotras.trabajar.headline.accent}
              weight="black"
              align="center"
              accentFamily="display"
              accentWeight="bold"
              accentColor="var(--color-brand-orange)"
              accentItalic
              className={styles.heading}
            />
            <p className={styles.lede}>{nosotras.trabajar.lede}</p>
            <div className={styles.cta}>
              <Button href={site.routes.contacto} variant="primary-orange" withArrow size="lg">
                {common.cta.agendarLlamadaOrientacion}
              </Button>
            </div>
          </TrabajarTextColumnMotion>
        </div>
        <Image
          src={figure2.src}
          alt=""
          width={315}
          height={200}
          className={`${styles.figure} ${styles.figure2}`}
          priority
        />
      </Container>
    </Section>
  );
}
