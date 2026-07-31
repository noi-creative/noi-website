'use client';

import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { DURATION, EASING, useReducedMotion } from '@/lib/motion';

type HoverZoomProps = {
  readonly children: ReactNode;
  readonly className?: string;
};

/**
 * Applies the restrained image zoom used across editorial photo treatments.
 * The wrapper owns only the nested scale so outer positioning, rotation,
 * clipping, and viewport entrance transforms remain independent.
 */
export function HoverZoom({ children, className }: HoverZoomProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      whileHover={{ scale: reducedMotion ? 1 : 1.02 }}
      transition={{
        duration: reducedMotion ? 0 : DURATION.slow,
        ease: EASING.out,
      }}
    >
      {children}
    </motion.div>
  );
}
