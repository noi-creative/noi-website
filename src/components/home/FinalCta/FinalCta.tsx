import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { assets } from '@/lib/assets';
import { site } from '@/config/site';
import common from '@/content/locales/es/common.json';
import home from '@/content/locales/es/home.json';
import styles from './FinalCta.module.scss';

/**
 * "Construyamos juntos" final call to action. Cream background,
 * mixed-typeface heading, supporting copy with orange-accent
 * words, two CTAs (primary-burgundy + outline-on-light), and a
 * photo collage on the right with a hand/phone sticker. Server
 * Component.
 *
 * The collage reuses the three hero collage images per the C03
 * audit's documented fallback (P01 plan). Q01 may swap to a
 * designer-supplied collage.
 */
export function FinalCta() {
  const collage = assets.home.ctaCollage ?? [];
  const handsSticker = assets.shared.stickers.manosNaranja;
  const { accentWords = [], lede } = home.finalCta;

  return (
    <Section
      background="cream"
      ariaLabelledby="home-finalcta-heading"
      className={styles.finalCtaSection}
    >
      <Container className={styles.finalCtaContainer}>
        <div className={styles.textColumn}>
          <Heading
            as="h2"
            id="home-finalcta-heading"
            primary={home.finalCta.headline.primary}
            accent={home.finalCta.headline.accent}
            weight="black"
          />
          <p className={styles.lede}>{renderLede(lede, accentWords)}</p>
          <div className={styles.ctas}>
            <Button href={site.routes.contacto} variant="primary-burgundy" withArrow>
              {common.cta.agendarLlamadaGratuita}
            </Button>
            <Button href={`mailto:${site.contactEmail}`} variant="outline-on-light">
              {common.cta.escribenosDirectamente}
            </Button>
          </div>
        </div>

        <div className={styles.collageColumn} aria-hidden="true">
          {collage.map((image, index) => (
            <div
              key={image.src}
              className={[styles.collagePhoto, styles[`collagePhoto${index}`]].join(' ')}
            >
              <Image
                src={image.src}
                alt=""
                width={image.width}
                height={image.height}
                className={styles.collageImage}
                sizes="(max-width: 767px) 70vw, 30vw"
              />
            </div>
          ))}
          <div className={styles.sticker}>
            <Image
              src={handsSticker.src}
              alt=""
              width={120}
              height={120}
              className={styles.stickerImage}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}

/**
 * Splits the lede into segments, wrapping the configured accent
 * words in a styled span. Words are matched case-insensitively
 * but the original casing in the lede is preserved.
 */
function renderLede(lede: string, accentWords: readonly string[]): React.ReactNode {
  if (accentWords.length === 0) return lede;
  const escaped = accentWords.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = lede.split(pattern);
  return parts.map((part, i) =>
    accentWords.some((w) => w.toLowerCase() === part.toLowerCase()) ? (
      <span key={i} className={styles.accentWord}>
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}
