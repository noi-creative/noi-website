import type { CSSProperties } from 'react';
import Image from 'next/image';
import { getStickerForService, type HomeService } from '@/content/data/homeServices';
import styles from './ServiceCard.module.scss';

type ServiceCardProps = {
  readonly service: HomeService;
  /**
   * Optional small rotation in degrees, applied via CSS transform.
   * The P01 reference shows slight per-card rotations; if omitted,
   * a small default is picked from the data file id.
   */
  readonly rotation?: number;
  /**
   * Optional vertical offset in pixels, applied via CSS transform.
   * The P01 reference shows a staggered vertical placement so the
   * overlapping row reads as a scattered collage; if omitted, a
   * small default is picked from the data file id.
   */
  readonly translateY?: number;
};

const ROTATION_DEFAULT: Record<HomeService['id'], number> = {
  branding: -5,
  'diseno-grafico': 3,
  'diseno-web': -4,
  ecommerce: 3.5,
  'estrategia-contenido': -2.5,
  naming: 5,
};

const TRANSLATE_Y_DEFAULT: Record<HomeService['id'], number> = {
  branding: 8,
  'diseno-grafico': -4,
  'diseno-web': 12,
  ecommerce: -8,
  'estrategia-contenido': 2,
  naming: 0,
};

/**
 * Single card in the home-page services preview (P01). The card
 * renders the numbered badge, the sticker icon, the service title
 * and a short description. Background colour and text tone come
 * from the data record so the row reads as a varied strip of
 * different surface tones.
 */
export function ServiceCard({ service, rotation, translateY }: ServiceCardProps) {
  const sticker = getStickerForService(service.iconSticker);
  const tilt = rotation ?? ROTATION_DEFAULT[service.id];
  const shift = translateY ?? TRANSLATE_Y_DEFAULT[service.id];

  return (
    <article
      className={[styles.card, styles[`color-${service.color}`]].join(' ')}
      style={
        {
          '--card-tilt': `${tilt}deg`,
          '--card-shift-y': `${shift}px`,
        } as CSSProperties
      }
    >
      <span className={styles.badge} aria-hidden="true">
        <span className={styles.badgeNumber}>{service.number}</span>
      </span>

      <div className={styles.icon} aria-hidden="true">
        <Image src={sticker.src} alt="" width={64} height={64} className={styles.iconImage} />
      </div>

      <h3 className={styles.title}>{service.label}</h3>
      <p className={styles.description}>{service.description}</p>
    </article>
  );
}
