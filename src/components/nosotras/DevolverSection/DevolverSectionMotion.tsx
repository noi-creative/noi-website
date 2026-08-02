'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { DURATION, EASING, RevealStagger, useReducedMotion } from '@/lib/motion';

type PhotoProps = {
  readonly children: ReactNode;
};

/**
 * Reveals the DevolverSection team photo on viewport entry with a
 * subtle scale + opacity. Scale 0.96 → 1, not 0.8 → 1, because
 * the editorial tone is restrained; a 20% scale would feel
 * cartoonish against the navy background. The nested `HoverZoom`
 * owns the independent pointer scale after this entrance completes.
 */
export function DevolverPhotoMotion({ children }: PhotoProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: reducedMotion ? 0 : DURATION.slow,
        ease: EASING.out,
      }}
    >
      {children}
    </motion.div>
  );
}

type TextColumnProps = {
  readonly children: ReactNode;
};

/**
 * Stagger-reveals the three text-column blocks of the Devolver
 * section (eyebrow → heading → body). All defaults from
 * `<RevealStagger>` apply (y: 16, stepDelay: 0.08, baseDelay: 0,
 * amount: 0.25, duration: DURATION.base).
 */
export function DevolverTextColumnMotion({ children }: TextColumnProps) {
  return <RevealStagger>{children}</RevealStagger>;
}
