'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { DURATION, EASING, useReducedMotion } from '@/lib/motion';

type FinalCtaMotionProps = {
  readonly children: ReactNode;
  readonly className: string;
};

export function FinalCtaTextMotion({ children, className }: FinalCtaMotionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: reducedMotion ? 0 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reducedMotion ? 0 : DURATION.slow, ease: EASING.out }}
    >
      {children}
    </motion.div>
  );
}

type FinalCtaPhotoMotionProps = FinalCtaMotionProps & {
  readonly index: number;
  readonly rotation: number;
};

const photoOffsets = [
  { x: 24, y: -16 },
  { x: -28, y: 12 },
  { x: 28, y: 20 },
] as const;

export function FinalCtaPhotoMotion({
  children,
  className,
  index,
  rotation,
}: FinalCtaPhotoMotionProps) {
  const reducedMotion = useReducedMotion();
  const offset = photoOffsets[index] ?? { x: 0, y: 16 };

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        x: reducedMotion ? 0 : offset.x,
        y: reducedMotion ? 0 : offset.y,
        scale: reducedMotion ? 1 : 0.94,
        rotate: reducedMotion ? rotation : rotation * 1.8,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: rotation }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reducedMotion ? 0 : DURATION.slow,
        ease: EASING.out,
        delay: reducedMotion ? 0 : index * 0.07,
      }}
    >
      {children}
    </motion.div>
  );
}

export function FinalCtaStickerMotion({ children, className }: FinalCtaMotionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        scale: reducedMotion ? 1 : 0.75,
        rotate: reducedMotion ? 0 : -10,
      }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reducedMotion ? 0 : DURATION.slow,
        ease: EASING.out,
        delay: reducedMotion ? 0 : 0.16,
      }}
    >
      {children}
    </motion.div>
  );
}
