import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import type { ServiceSectionConfig, StickerParent } from '@/content/data/servicios';
import { ServiceDetailsPanel } from '../ServiceDetailsPanel/ServiceDetailsPanel';
import styles from './ServiceSection.module.scss';
import { renderBold } from '@/lib/renderBold';

type ServiceContent = {
  readonly eyebrow: string;
  readonly headline: { readonly primary: string; readonly accent: string };
  readonly paragraphs: readonly string[];
  readonly note?: string;
  readonly detailsTitle: string;
  readonly details: readonly { readonly title: string; readonly description?: string }[];
  readonly cta: string;
};

type ServiceSectionProps = {
  readonly config: ServiceSectionConfig;
  readonly content: ServiceContent;
};

export function ServiceSection({ config, content }: ServiceSectionProps) {
  const headingId = `servicio-${config.id}-heading`;
  const stickerFor = (parent: StickerParent) =>
    config.stickerPlacement.parent === parent ? <ServiceSticker config={config} /> : null;

  return (
    <section
      id={config.id}
      aria-labelledby={headingId}
      className={[
        styles.section,
        styles[`tone-${config.tone}`],
        styles[`layout-${config.layout}`],
      ].join(' ')}
    >
      {stickerFor('section')}
      <div className={styles.copy}>
        {stickerFor('copy')}
        <Eyebrow tone={config.eyebrowTone} className={styles.eyebrow}>
          {content.eyebrow}
        </Eyebrow>
        <Heading
          as="h2"
          id={headingId}
          primary={content.headline.primary}
          accent={content.headline.accent}
          weight="bold"
          accentFamily="serif"
          accentItalic
          accentWeight="medium"
          className={styles.heading}
        />
        <div className={styles.body}>
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph}>{renderBold(paragraph)}</p>
          ))}
          {content.note ? <p className={styles.note}>{content.note}</p> : null}
        </div>
        <Button href="/contacto" className={styles.button} variant={config.buttonVariant} withArrow>
          {content.cta}
        </Button>
      </div>

      <div className={styles.details}>
        <ServiceDetailsPanel
          title={content.detailsTitle}
          items={content.details}
          variant={config.detailsVariant}
          tone={config.tone}
          stickerPlacement={config.stickerPlacement}
        />
        {stickerFor('details')}
      </div>
    </section>
  );
}

function ServiceSticker({ config }: { readonly config: ServiceSectionConfig }) {
  const { horizontal, vertical } = config.stickerPlacement;

  return (
    <Image
      src={config.sticker.src}
      alt=""
      width={config.stickerWidth}
      height={config.stickerHeight}
      className={[
        styles.sticker,
        styles[`sticker-horizontal-${horizontal}`],
        styles[`sticker-vertical-${vertical}`],
      ].join(' ')}
      aria-hidden="true"
    />
  );
}
