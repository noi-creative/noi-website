'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { DURATION, EASING, useReducedMotion } from '@/lib/motion';

type PortafolioMotionProps = {
  readonly children: ReactNode;
  readonly className: string;
};

export function PortafolioCopyMotion({ children, className }: PortafolioMotionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: reducedMotion ? 0 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reducedMotion ? 0 : DURATION.base, ease: EASING.out }}
    >
      {children}
    </motion.div>
  );
}

export function PortafolioCtaMotion({ children, className }: PortafolioMotionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: reducedMotion ? 0 : DURATION.base,
        ease: EASING.out,
        delay: reducedMotion ? 0 : 0.08,
      }}
    >
      {children}
    </motion.div>
  );
}
