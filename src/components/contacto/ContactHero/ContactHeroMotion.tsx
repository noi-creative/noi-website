'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { DURATION, EASING, RevealStagger, useReducedMotion } from '@/lib/motion';

type TextTopProps = {
  readonly children: ReactNode;
};

/**
 * Reveals the eyebrow above the ContactHero H1. The eyebrow
 * sits above the LCP; revealing it with a small fade-up does
 * not delay the H1 (which is rendered as a sibling, outside
 * this wrapper, and paints on the first frame).
 */
export function ContactHeroTextTopMotion({ children }: TextTopProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: reducedMotion ? 0 : DURATION.base,
        ease: EASING.out,
      }}
    >
      {children}
    </motion.div>
  );
}

type TextBottomProps = {
  readonly children: ReactNode;
};

/**
 * Stagger-reveals the lede paragraph and the CTA row that sit
 * below the ContactHero H1. Per-section tuning: 12 px translate
 * (matches the eyebrow above the H1 — symmetric feel), 0.1 s
 * step delay (slightly slower than the 0.08 s default — the
 * lede is a longer paragraph and the CTA is the page's primary
 * action; a slower stagger lets each one register), 0.12 s base
 * delay (the H1 has just started its static render).
 *
 * The H1 itself is a sibling rendered outside this wrapper so
 * the LCP paints on the first frame.
 */
export function ContactHeroTextBottomMotion({ children }: TextBottomProps) {
  return (
    <RevealStagger y={12} stepDelay={0.1} baseDelay={0.12}>
      {children}
    </RevealStagger>
  );
}

type PhotoProps = {
  readonly className: string;
  readonly rotation: number;
  readonly delay?: number;
  readonly children: ReactNode;
};

/**
 * Per-photo reveal wrapper. The server component passes the
 * SCSS Module class string (including the existing positioning,
 * sizing, `transform: rotate(...)`, `border-radius`, and
 * `box-shadow` rules) and the rotation value. The rotation is
 * baked into Motion's transform so it is preserved during the
 * entrance AND at rest; the SCSS rotation stays as the no-JS
 * fallback (and as the documentation of the intended rotation).
 *
 * Scale 0.96 → 1 matches the editorial tone established by
 * A02's DevolverSection photo; a stronger scale would feel
 * cartoonish against the burgundy background. The nested
 * `HoverZoom` scales only the image, preserving this outer rotation.
 */
export function ContactPhotoMotion({ className, rotation, delay = 0, children }: PhotoProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        scale: reducedMotion ? 1 : 0.96,
        rotate: rotation,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        rotate: rotation,
      }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: reducedMotion ? 0 : DURATION.slow,
        ease: EASING.out,
        delay: reducedMotion ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}

type StickerProps = {
  readonly className: string;
  readonly rotation: number;
  readonly children: ReactNode;
};

/**
 * Per-sticker reveal wrapper. Same shape as `ContactPhotoMotion`
 * but with a stronger scale (0.8 → 1) appropriate to a small
 * decorative element. Same rotation-preservation pattern.
 */
export function ContactStickerMotion({ className, rotation, children }: StickerProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        scale: reducedMotion ? 1 : 0.8,
        rotate: rotation,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        rotate: rotation,
      }}
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
