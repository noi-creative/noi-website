'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { DURATION, EASING, useReducedMotion } from '@/lib/motion';

type HeadingProps = {
  readonly children: ReactNode;
};

/**
 * Reveals the BrandStatement H2 (two-span mixed-typeface
 * statement) as a single unit. The H2 is the most restrained
 * element on the page; a per-span stagger would split the
 * headline into too many motion children and would feel
 * overwrought against the static Figma. A single fade-up
 * matches the editorial tone.
 */
export function BrandStatementHeadingMotion({ children }: HeadingProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: reducedMotion ? 0 : DURATION.slow,
        ease: EASING.out,
      }}
    >
      {children}
    </motion.div>
  );
}
