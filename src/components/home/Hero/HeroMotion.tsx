'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { DURATION, EASING, useReducedMotion } from '@/lib/motion';

type HeroMotionProps = {
  readonly children: ReactNode;
  readonly className: string;
};

type HeroHeadingMotionProps = {
  readonly children: ReactNode;
};

export function HeroHeadingMotion({ children }: HeroHeadingMotionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ y: reducedMotion ? 0 : 12 }}
      animate={{ y: 0 }}
      transition={{ duration: reducedMotion ? 0 : DURATION.slow, ease: EASING.out }}
    >
      {children}
    </motion.div>
  );
}

export function HeroFigureMotion({ children, className }: HeroMotionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{
        opacity: reducedMotion ? 1 : 0,
        x: reducedMotion ? 0 : -40,
      }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: reducedMotion ? 0 : DURATION.slow,
        ease: EASING.out,
        delay: reducedMotion ? 0 : 0.08,
      }}
    >
      {children}
    </motion.div>
  );
}

export function HeroLedeMotion({ children, className }: HeroMotionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reducedMotion ? 0 : DURATION.base, ease: EASING.out }}
    >
      {children}
    </motion.p>
  );
}

export function HeroActionsMotion({ children, className }: HeroMotionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
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
