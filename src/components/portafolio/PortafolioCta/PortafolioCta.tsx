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
 * 3 decorative SVG doodles: 2 overlapping speech-bubble shapes on
 * the left (using the new `shared.figuras.semiCirculoNaranja` and
 * `semiCirculoAzul` SVGs) and 1 yellow calendar-with-sticky-note
 * doodle on the right (a best-effort inline SVG, similar to the
 * P02 fist-bump sticker pattern).
 */
export function PortafolioCta() {
  const { semiCirculoNaranja, semiCirculoAzul } = assets.shared.figuras;

  return (
    <Section background="burgundy" ariaLabelledby="portafolio-cta-heading" className={styles.cta}>
      <Container className={styles.ctaContainer}>
        <div className={styles.doodlesLeft} aria-hidden="true">
          <Image
            src={semiCirculoAzul.src}
            alt=""
            width={214}
            height={132}
            className={`${styles.doodle} ${styles.doodleBlue}`}
            sizes="(max-width: 767px) 50vw, 18vw"
          />
          <Image
            src={semiCirculoNaranja.src}
            alt=""
            width={104}
            height={188}
            className={`${styles.doodle} ${styles.doodleOrange}`}
            sizes="(max-width: 767px) 30vw, 10vw"
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

        <div className={styles.doodleRight} aria-hidden="true">
          <svg
            className={styles.calendarDoodle}
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="14"
              y="30"
              width="124"
              height="108"
              rx="10"
              fill="#FFEDAE"
              stroke="#001C36"
              strokeWidth="2.5"
            />
            <rect x="14" y="30" width="124" height="24" rx="10" fill="#001C36" />
            <line x1="14" y1="54" x2="138" y2="54" stroke="#001C36" strokeWidth="2.5" />
            <line
              x1="40"
              y1="18"
              x2="40"
              y2="42"
              stroke="#001C36"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="112"
              y1="18"
              x2="112"
              y2="42"
              stroke="#001C36"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="32"
              y1="74"
              x2="50"
              y2="74"
              stroke="#001C36"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="60"
              y1="74"
              x2="78"
              y2="74"
              stroke="#001C36"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="88"
              y1="74"
              x2="106"
              y2="74"
              stroke="#001C36"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="116"
              y1="74"
              x2="134"
              y2="74"
              stroke="#001C36"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="32"
              y1="92"
              x2="50"
              y2="92"
              stroke="#001C36"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="60"
              y1="92"
              x2="78"
              y2="92"
              stroke="#001C36"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <rect
              x="84"
              y="84"
              width="22"
              height="22"
              rx="3"
              fill="#810C18"
              stroke="#001C36"
              strokeWidth="2"
            />
            <line
              x1="32"
              y1="110"
              x2="50"
              y2="110"
              stroke="#001C36"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="60"
              y1="110"
              x2="78"
              y2="110"
              stroke="#001C36"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="32"
              y1="128"
              x2="50"
              y2="128"
              stroke="#001C36"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <rect
              x="90"
              y="10"
              width="58"
              height="46"
              rx="4"
              fill="#FFF9F4"
              stroke="#001C36"
              strokeWidth="2.5"
              transform="rotate(8 119 33)"
            />
            <line
              x1="100"
              y1="22"
              x2="138"
              y2="22"
              stroke="#001C36"
              strokeWidth="1.5"
              strokeLinecap="round"
              transform="rotate(8 119 33)"
            />
            <line
              x1="100"
              y1="32"
              x2="132"
              y2="32"
              stroke="#001C36"
              strokeWidth="1.5"
              strokeLinecap="round"
              transform="rotate(8 119 33)"
            />
            <line
              x1="100"
              y1="42"
              x2="126"
              y2="42"
              stroke="#001C36"
              strokeWidth="1.5"
              strokeLinecap="round"
              transform="rotate(8 119 33)"
            />
          </svg>
        </div>
      </Container>
    </Section>
  );
}
