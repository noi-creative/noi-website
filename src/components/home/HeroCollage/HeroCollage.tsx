import Image from 'next/image';
import { assets } from '@/lib/assets';
import styles from './HeroCollage.module.scss';

/**
 * Server Component. Uses `next/image` with the dimensions declared
 * in the asset manifest. The LCP image is the centre photo
 * (`hero-collage-2.png`), so it carries `priority` so Next can
 * preload it.
 */
export function HeroCollage() {
  const [left, center, right] = assets.home.heroCollage;

  return (
    <div className={styles.collage} aria-hidden="true">
      <div className={`${styles.photo} ${styles.photoLeft}`}>
        <Image
          src={left.src}
          alt=""
          width={left.width}
          height={left.height}
          className={styles.image}
          sizes="(max-width: 767px) 60vw, 22vw"
        />
      </div>

      <div className={`${styles.photo} ${styles.photoCenter}`}>
        <Image
          src={center.src}
          alt=""
          width={center.width}
          height={center.height}
          className={styles.image}
          sizes="(max-width: 767px) 80vw, 38vw"
          priority
        />
      </div>

      <div className={`${styles.photo} ${styles.photoRight}`}>
        <Image
          src={right.src}
          alt=""
          width={right.width}
          height={right.height}
          className={styles.image}
          sizes="(max-width: 767px) 70vw, 30vw"
        />
      </div>
    </div>
  );
}
