'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { DURATION, EASING, useReducedMotion } from '@/lib/motion';

type ServiciosFinalDecorationMotionProps = {
  readonly children: ReactNode;
  readonly className: string;
  readonly side: 'left' | 'right';
};

export function ServiciosFinalDecorationMotion({
  children,
  className,
  side,
}: ServiciosFinalDecorationMotionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        x: reducedMotion ? 0 : side === 'left' ? -48 : 48,
        scale: reducedMotion ? 1 : 0.9,
      }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reducedMotion ? 0 : DURATION.slow,
        ease: EASING.out,
        delay: reducedMotion ? 0 : side === 'left' ? 0 : 0.08,
      }}
    >
      {children}
    </motion.div>
  );
}
