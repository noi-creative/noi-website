'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { DURATION, EASING, useReducedMotion } from '@/lib/motion';

type ProcessMotionProps = {
  readonly children: ReactNode;
  readonly className: string;
};

export function ProcessHeaderMotion({ children, className }: ProcessMotionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: reducedMotion ? 0 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reducedMotion ? 0 : DURATION.slow, ease: EASING.out }}
    >
      {children}
    </motion.div>
  );
}

type ProcessStepMotionProps = ProcessMotionProps & {
  readonly index: number;
};

export function ProcessStepMotion({ children, className, index }: ProcessStepMotionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.li
      className={className}
      initial={{
        opacity: 0,
        x: reducedMotion ? 0 : index % 2 === 0 ? -8 : 8,
        y: reducedMotion ? 0 : 20,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reducedMotion ? 0 : DURATION.base,
        ease: EASING.out,
        delay: reducedMotion ? 0 : index * 0.07,
      }}
    >
      {children}
    </motion.li>
  );
}

export function ProcessCtaMotion({ children, className }: ProcessMotionProps) {
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
