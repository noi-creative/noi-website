'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { DURATION, EASING, RevealStagger, useReducedMotion } from '@/lib/motion';

type IllustrationProps = {
  readonly children: ReactNode;
};

/**
 * Reveals the IntroHero illustration column (speech bubble,
 * team line-art, "noi creative" logo) on viewport entry.
 *
 * The H1 above this column is the LCP; it must paint on the first
 * frame and is NOT animated (MOTION.md §6). The illustration
 * reveals slightly delayed so it does not compete with the H1.
 */
export function IntroHeroIllustrationMotion({ children }: IllustrationProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
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

type BodyProps = {
  readonly children: ReactNode;
};

/**
 * Stagger-reveals the three lede paragraphs under the H1.
 * Per-section tuning: 12 px translate (smaller than the default
 * 16 px — the lede is short body copy and a bigger translate
 * would feel exaggerated), 0.06 s step delay (slightly faster
 * than the 0.08 s default — three short paragraphs), 0.08 s
 * base delay (the H1 has just started its static render).
 *
 * The server component passes the three `<p>` elements as
 * children; each is wrapped in a `<RevealItem>` (via
 * `<RevealStagger>`) so the stagger can apply. The `.body`
 * flex container (from IntroHero.module.scss) keeps the
 * `gap: var(--space-4)` between the motion wrappers.
 */
export function IntroHeroBodyMotion({ children }: BodyProps) {
  return (
    <RevealStagger y={12} stepDelay={0.06} baseDelay={0.08}>
      {children}
    </RevealStagger>
  );
}
