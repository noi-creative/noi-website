'use client';

import { Children, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { DURATION, EASING, useReducedMotion } from '@/lib/motion';

type TextMotionProps = {
  readonly children: ReactNode;
  readonly className?: string;
};

/** Reveals heading, lede, and action in sequence while keeping SSR copy visible. */
export function PortafolioCtaTextMotion({ children, className }: TextMotionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <>
      {Children.toArray(children).map((child, index) => (
        <motion.div
          key={index}
          className={className}
          initial={{ y: reducedMotion ? 0 : 12 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: reducedMotion ? 0 : DURATION.base,
            ease: EASING.out,
            delay: reducedMotion ? 0 : 0.1 + index * 0.1,
          }}
        >
          {child}
        </motion.div>
      ))}
    </>
  );
}

type StickerMotionProps = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
};

/** Adds a compositor-only scale reveal to a decorative sticker. */
export function PortafolioCtaStickerMotion({ children, className, delay = 0 }: StickerMotionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: reducedMotion ? 1 : 0, scale: reducedMotion ? 1 : 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: reducedMotion ? 0 : DURATION.slow,
        ease: EASING.out,
        delay: reducedMotion ? 0 : delay,
      }}
      aria-hidden="true"
    >
      {children}
    </motion.div>
  );
}
