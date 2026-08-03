import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { parseMarkers } from '@/lib/renderBold';
import { HoverZoom } from '@/lib/motion';
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
 * Component. Each positioned photo frame clips a nested `HoverZoom`
 * so its CSS rotation remains independent from the pointer scale.
 *
 * The collage reuses the three hero collage images per the C03
 * audit's documented fallback (P01 plan). Q01 may swap to a
 * designer-supplied collage.
 */
export function FinalCta() {
  const collage = assets.home.ctaCollage ?? [];
  const megafonoSticker = assets.shared.stickers.megafono.rojo;
  const { lede } = home.finalCta;

  return (
    <Section
      background="cream"
      ariaLabelledby="home-finalcta-heading"
      className={styles.finalCtaSection}
    >
      <Container className={styles.finalCtaContainer}>
        <div className={styles.textColumn}>
          <Heading
            className={styles.heading}
            as="h2"
            id="home-finalcta-heading"
            primary={home.finalCta.headline.primary}
            accent={home.finalCta.headline.accent}
            accentFamily="serif"
            accentWeight="medium"
            accentItalic
            weight="black"
            accentColor="#ed7218"
            style={
              {
                '--heading-primary-transform': 'none',
              } as React.CSSProperties
            }
          />
          <p className={styles.lede}>
            {parseMarkers(lede).map((s, i) => {
              switch (s.type) {
                case 'bold':
                  return (
                    <span key={i} className={styles.boldWord}>
                      {s.text}
                    </span>
                  );
                case 'italic':
                  return <em key={i}>{s.text}</em>;
                case 'bold-italic':
                  return (
                    <strong key={i}>
                      <em>{s.text}</em>
                    </strong>
                  );
                case 'accent':
                  return (
                    <span key={i} className={styles.accentWord}>
                      {s.text}
                    </span>
                  );
                default:
                  return <span key={i}>{s.text}</span>;
              }
            })}
          </p>
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
              <HoverZoom className={styles.collageImageZoom}>
                <Image
                  src={image.src}
                  alt=""
                  width={image.width}
                  height={image.height}
                  className={styles.collageImage}
                  sizes="(max-width: 767px) 70vw, 30vw"
                />
              </HoverZoom>
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
