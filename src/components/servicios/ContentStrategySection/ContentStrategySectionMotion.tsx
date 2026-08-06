'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { DURATION, EASING, useReducedMotion } from '@/lib/motion';

type ContentStrategyHeaderMotionProps = {
  readonly children: ReactNode;
  readonly className: string;
};

export function ContentStrategyHeaderMotion({
  children,
  className,
}: ContentStrategyHeaderMotionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: reducedMotion ? 0 : 24,
        scale: reducedMotion ? 1 : 0.98,
      }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reducedMotion ? 0 : DURATION.slow, ease: EASING.out }}
    >
      {children}
    </motion.div>
  );
}

type ContentStrategyPlanMotionProps = {
  readonly children: ReactNode;
  readonly className: string;
  readonly featured: boolean;
  readonly index: number;
};

const planRotations = [-1.2, 0, 1.2] as const;

export function ContentStrategyPlanMotion({
  children,
  className,
  featured,
  index,
}: ContentStrategyPlanMotionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.li
      className={className}
      data-featured={featured || undefined}
      initial={{
        opacity: 0,
        y: reducedMotion ? 0 : 32,
        scale: reducedMotion ? 1 : 0.94,
        rotate: reducedMotion ? 0 : (planRotations[index] ?? 0),
      }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reducedMotion ? 0 : DURATION.slow,
        ease: EASING.out,
        delay: reducedMotion ? 0 : 0.08 + index * 0.08,
      }}
    >
      {children}
    </motion.li>
  );
}
