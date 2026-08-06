'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { DURATION, EASING, useReducedMotion } from '@/lib/motion';

type ArtworkVariant = 'figure' | 'megaphone' | 'clip' | 'ovals';

type ServiciosHeroArtworkMotionProps = {
  readonly children: ReactNode;
  readonly className: string;
  readonly variant: ArtworkVariant;
};

const artworkMotion = {
  figure: { x: -40, y: 0, scale: 0.96, rotate: -2, delay: 0 },
  megaphone: { x: 0, y: 0, scale: 0.78, rotate: -8, delay: 0.08 },
  clip: { x: 0, y: -32, scale: 0.85, rotate: 10, delay: 0.14 },
  ovals: { x: 0, y: 36, scale: 0.96, rotate: 0, delay: 0.06 },
} as const;

export function ServiciosHeroArtworkMotion({
  children,
  className,
  variant,
}: ServiciosHeroArtworkMotionProps) {
  const reducedMotion = useReducedMotion();
  const initial = artworkMotion[variant];

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        x: reducedMotion ? 0 : initial.x,
        y: reducedMotion ? 0 : initial.y,
        scale: reducedMotion ? 1 : initial.scale,
        rotate: reducedMotion ? 0 : initial.rotate,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reducedMotion ? 0 : DURATION.slow,
        ease: EASING.out,
        delay: reducedMotion ? 0 : initial.delay,
      }}
    >
      {children}
    </motion.div>
  );
}
