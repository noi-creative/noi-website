import Image from 'next/image';
import styles from './DecorativeShape.module.scss';
import { assets } from '@/lib/assets';

type DecorativeShapeProps = {
  readonly className?: string;
};

/**
 * Abstract orange organic curve used as a decorative motif on the
 * home page. Appears twice in P01 (hero + branding section).
 */
export function DecorativeShape({ className }: DecorativeShapeProps) {
  return (
    <Image
      className={[styles.shape, className].filter(Boolean).join(' ')}
      width="540"
      height="673"
      alt="Figure"
      src={assets.shared.figuras.figura3.src}
    />
  );
}
