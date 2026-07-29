import Image from 'next/image';
import { motion } from 'motion/react';
import { getStickerForService, type HomeService } from '@/content/data/homeServices';
import styles from './ServiceCard.module.scss';

type ServiceCardProps = {
  readonly service: HomeService;
  readonly isActive?: boolean;
  readonly reduceMotion?: boolean;
  /** Optional resting rotation in degrees. */
  readonly rotation?: number;
  /** Optional resting vertical offset in pixels. */
  readonly translateY?: number;
};

const ACTIVE_LIFT = 16;

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

/** Single card in the home-page services preview. */
export function ServiceCard({
  service,
  isActive = false,
  reduceMotion = false,
  rotation,
  translateY,
}: ServiceCardProps) {
  const sticker = getStickerForService(service.iconSticker);
  const tilt = rotation ?? ROTATION_DEFAULT[service.id];
  const shift = translateY ?? TRANSLATE_Y_DEFAULT[service.id];

  return (
    <motion.article
      className={[styles.card, styles[`color-${service.color}`]].join(' ')}
      initial={false}
      animate={{
        rotate: isActive ? 0 : tilt,
        y: isActive ? shift - ACTIVE_LIFT : shift,
      }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              type: 'spring',
              stiffness: 360,
              damping: 28,
              mass: 0.75,
            }
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
    </motion.article>
  );
}
