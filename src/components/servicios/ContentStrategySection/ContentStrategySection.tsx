import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Heading } from '@/components/ui/Heading';
import { assets } from '@/lib/assets';
import servicios from '@/content/locales/es/servicios.json';
import styles from './ContentStrategySection.module.scss';

export function ContentStrategySection() {
  const content = servicios.services.contentStrategy;
  const sticker = assets.shared.stickers.celular.naranja;

  return (
    <section
      id="estrategia-contenido"
      aria-labelledby="servicio-estrategia-heading"
      className={styles.section}
    >
      <Image
        src={sticker.src}
        alt=""
        width={126}
        height={144}
        className={styles.sticker}
        aria-hidden="true"
      />
      <div className={styles.header}>
        <Eyebrow tone="cream" className={styles.eyebrow}>
          {content.eyebrow}
        </Eyebrow>
        <Heading
          as="h2"
          id="servicio-estrategia-heading"
          primary={content.headline.primary}
          accent={content.headline.accent}
          weight="bold"
          align="center"
          accentFamily="serif"
          accentItalic
          accentWeight="medium"
          className={styles.heading}
        />
        <p className={styles.lede}>{content.lede}</p>
      </div>

      <ol className={styles.plans}>
        {content.plans.map((plan, index) => (
          <li key={plan.number} className={styles.plan} data-featured={index === 1 || undefined}>
            <h3>
              {plan.number} / {plan.title}
            </h3>
            <p>{plan.description}</p>
          </li>
        ))}
      </ol>

      <Button href="/contacto" variant="primary-ink" withArrow>
        {content.cta}
      </Button>
    </section>
  );
}
