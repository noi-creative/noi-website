'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { DURATION, EASING, useReducedMotion } from '@/lib/motion';

type BrandingMotionProps = {
  readonly children: ReactNode;
  readonly className: string;
};

export function BrandingTextMotion({ children, className }: BrandingMotionProps) {
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

export function BrandingPortraitMotion({ children, className }: BrandingMotionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        x: reducedMotion ? 0 : 20,
        scale: reducedMotion ? 1 : 0.96,
      }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reducedMotion ? 0 : DURATION.slow,
        ease: EASING.out,
        delay: reducedMotion ? 0 : 0.05,
      }}
    >
      {children}
    </motion.div>
  );
}

export function BrandingStickerMotion({ children, className }: BrandingMotionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      aria-hidden="true"
      initial={{
        opacity: 0,
        scale: reducedMotion ? 1 : 0.75,
        rotate: reducedMotion ? -12 : -20,
      }}
      whileInView={{ opacity: 1, scale: 1, rotate: -12 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reducedMotion ? 0 : DURATION.slow,
        ease: EASING.out,
        delay: reducedMotion ? 0 : 0.12,
      }}
    >
      {children}
    </motion.div>
  );
}
