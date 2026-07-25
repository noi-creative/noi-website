'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { DURATION, EASING, RevealStagger, useReducedMotion } from '@/lib/motion';

type IconProps = {
  readonly children: ReactNode;
};

/**
 * Reveals the TrabajarCTA decorative fist-bump icon. Scale
 * 0.8 → 1 + opacity 0 → 1. The icon is an inline SVG (not a
 * raster), so the scale is compositor-only and free.
 */
export function TrabajarIconMotion({ children }: IconProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: reducedMotion ? 0 : DURATION.slow,
        ease: EASING.out,
      }}
    >
      {children}
    </motion.div>
  );
}

type TextColumnProps = {
  readonly children: ReactNode;
};

/**
 * Stagger-reveals the three text-column blocks of the TrabajarCTA
 * (heading → lede → CTA button). Per-section tuning: 12 px
 * translate (slightly smaller than the default 16 px — the
 * centered, single-column layout feels more delicate), 0.08 s
 * step delay (default), 0.1 s base delay (the icon reveals
 * slightly before the text).
 */
export function TrabajarTextColumnMotion({ children }: TextColumnProps) {
  return (
    <RevealStagger y={12} baseDelay={0.1}>
      {children}
    </RevealStagger>
  );
}
