'use client';

import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { DURATION, EASING, useReducedMotion } from '@/lib/motion';

type TextMotionProps = {
  readonly children: ReactNode;
  readonly delay?: number;
};

/** Keeps hero copy visible during SSR and adds a restrained viewport entrance. */
export function PortafolioHeroTextMotion({ children, delay = 0 }: TextMotionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ y: reducedMotion ? 0 : 12 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: reducedMotion ? 0 : DURATION.base,
        ease: EASING.out,
        delay: reducedMotion ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}

type ArtworkMotionProps = {
  readonly children: ReactNode;
  readonly className?: string;
};

/** Reveals the hero's decorative artwork as one non-semantic composition. */
export function PortafolioHeroArtworkMotion({ children, className }: ArtworkMotionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: reducedMotion ? 1 : 0, scale: reducedMotion ? 1 : 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: reducedMotion ? 0 : DURATION.slow,
        ease: EASING.out,
        delay: reducedMotion ? 0 : 0.08,
      }}
      aria-hidden="true"
    >
      {children}
    </motion.div>
  );
}
