'use client';

import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { DURATION, EASING, useReducedMotion } from '@/lib/motion';

type GridItemMotionProps = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly index: number;
};

/** Staggers project tiles without hiding their server-rendered content. */
export function PortafolioGridItemMotion({ children, className, index }: GridItemMotionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ y: reducedMotion ? 0 : 16 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reducedMotion ? 0 : DURATION.base,
        ease: EASING.out,
        delay: reducedMotion ? 0 : index * 0.08,
      }}
    >
      {children}
    </motion.div>
  );
}
