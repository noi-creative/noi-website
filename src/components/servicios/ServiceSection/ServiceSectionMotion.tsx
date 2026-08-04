'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { DURATION, EASING, useReducedMotion } from '@/lib/motion';

type ServiceSectionMotionProps = {
  readonly children: ReactNode;
  readonly className: string;
  readonly id: string;
  readonly labelledBy: string;
  readonly tilt: -1 | 1;
};

export function ServiceSectionMotion({
  children,
  className,
  id,
  labelledBy,
  tilt,
}: ServiceSectionMotionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      aria-labelledby={labelledBy}
      className={className}
      initial={{
        opacity: 0,
        y: reducedMotion ? 0 : 36,
        scale: reducedMotion ? 1 : 0.98,
        rotate: reducedMotion ? 0 : tilt * 0.5,
      }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reducedMotion ? 0 : DURATION.slow,
        ease: EASING.out,
      }}
    >
      {children}
    </motion.section>
  );
}

type ServiceStickerMotionProps = {
  readonly children: ReactNode;
  readonly className: string;
  readonly rotation: number;
};

export function ServiceStickerMotion({ children, className, rotation }: ServiceStickerMotionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.span
      className={className}
      initial={{
        opacity: 0,
        scale: reducedMotion ? 1 : 0.75,
        rotate: reducedMotion ? 0 : rotation,
      }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reducedMotion ? 0 : DURATION.slow,
        ease: EASING.out,
        delay: reducedMotion ? 0 : 0.12,
      }}
    >
      {children}
    </motion.span>
  );
}
