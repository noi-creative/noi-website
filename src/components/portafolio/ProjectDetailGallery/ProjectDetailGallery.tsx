import Image from 'next/image';
import type { RasterAsset } from '@/lib/assets';
import styles from './ProjectDetailGallery.module.scss';

type ProjectDetailGalleryProps = {
  readonly images: readonly RasterAsset[];
  readonly priorityFirst?: boolean;
};

/**
 * 2-column gallery of the project's `detail-N.jpg` images. The
 * grid wraps naturally; an odd number of images leaves the last
 * image alone in its row. The first image is `priority` when
 * `priorityFirst` is `true` (the LCP candidate after the H1).
 *
 * Each image is rendered with `next/image` and explicit
 * `width` / `height` (sourced from the manifest) and a
 * `sizes` attribute for the 1-col / 2-col responsive layout.
 */
export function ProjectDetailGallery({ images, priorityFirst = true }: ProjectDetailGalleryProps) {
  return (
    <div className={styles.gallery}>
      <ul className={styles.grid} aria-label="Galería del proyecto">
        {images.map((image, index) => (
          <li key={image.src} className={styles.cell}>
            <Image
              src={image.src}
              alt={image.alt ?? `Imagen ${index + 1} del proyecto`}
              width={image.width}
              height={image.height}
              sizes="(max-width: 767px) 100vw, 50vw"
              className={styles.image}
              priority={priorityFirst && index === 0}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
