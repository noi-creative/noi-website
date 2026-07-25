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
 * mixed-typeface heading (navy primary + orange italic accent),
 * supporting copy with bold and orange-accent words, two CTAs
 * stacked vertically (primary-burgundy + outline-on-light), and a
 * photo collage on the right with a megaphone sticker. Server
 * Component.
 *
 * The collage reuses the three hero collage images per the C03
 * audit's documented fallback (P01 plan). Q01 may swap to a
 * designer-supplied collage.
 */
export function FinalCta() {
  const collage = assets.home.ctaCollage ?? [];
  const megafonoSticker = assets.shared.stickers.megafonoRojo;
  const { accentWords = [], boldPhrases = [], lede } = home.finalCta;

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
            style={
              {
                '--heading-accent-color': 'var(--color-brand-orange)',
                '--heading-primary-transform': 'none',
              } as React.CSSProperties
            }
          />
          <p className={styles.lede}>{renderLede(lede, boldPhrases, accentWords)}</p>
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
              src={megafonoSticker.src}
              alt=""
              width={140}
              height={140}
              className={styles.stickerImage}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}

/**
 * Splits the lede into segments, wrapping the configured bold
 * phrases in a styled span and the configured accent words in an
 * orange-tinted span. Words are matched case-insensitively but
 * the original casing in the lede is preserved.
 */
function renderLede(
  lede: string,
  boldPhrases: readonly string[],
  accentWords: readonly string[],
): React.ReactNode {
  const segments: { text: string; tone: 'bold' | 'orange' | 'plain' }[] = [];
  const pattern = buildPattern(boldPhrases, accentWords);
  if (!pattern) return lede;
  const parts = lede.split(pattern);
  for (const part of parts) {
    if (!part) continue;
    if (boldPhrases.some((w) => w.toLowerCase() === part.toLowerCase())) {
      segments.push({ text: part, tone: 'bold' });
    } else if (accentWords.some((w) => w.toLowerCase() === part.toLowerCase())) {
      segments.push({ text: part, tone: 'bold' });
    } else {
      segments.push({ text: part, tone: 'plain' });
    }
  }
  return segments.map((segment, i) => {
    if (segment.tone === 'bold') {
      return (
        <span key={i} className={styles.boldWord}>
          {segment.text}
        </span>
      );
    }
    if (segment.tone === 'orange') {
      return (
        <span key={i} className={styles.accentWord}>
          {segment.text}
        </span>
      );
    }
    return <span key={i}>{segment.text}</span>;
  });
}

function buildPattern(
  boldPhrases: readonly string[],
  accentWords: readonly string[],
): RegExp | null {
  const all = [...boldPhrases, ...accentWords].map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (all.length === 0) return null;
  return new RegExp(`(${all.join('|')})`, 'gi');
}
