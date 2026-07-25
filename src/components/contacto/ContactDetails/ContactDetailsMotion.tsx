'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { DURATION, EASING, RevealItem, RevealStagger, useReducedMotion } from '@/lib/motion';

type HeadingProps = {
  readonly children: ReactNode;
};

/**
 * Stagger-reveals the ContactDetails H2 and the lede paragraph.
 * All defaults from `<RevealStagger>` apply.
 */
export function ContactDetailsHeadingMotion({ children }: HeadingProps) {
  return <RevealStagger>{children}</RevealStagger>;
}

type TileItemProps = {
  readonly children: ReactNode;
  readonly index: number;
};

/**
 * Per-item reveal wrapper for each contact tile. The server
 * component renders one of these inside each `<li>` of the
 * tile list. The `<ul>`/`<li>` semantics are preserved; the
 * `motion.div` is a flow child of the `<li>`, not a wrapper
 * around the `<ul>`.
 *
 * Per-section tuning: 0.1 s base delay (the H2 + lede reveal
 * has just started; the tiles enter slightly after), 0.08 s
 * step delay (default), 0.2 `amount` (matches the team card
 * threshold; tiles are smaller than text blocks).
 */
export function ContactTileItemMotion({ children, index }: TileItemProps) {
  return (
    <RevealItem index={index} baseDelay={0.1} amount={0.2}>
      {children}
    </RevealItem>
  );
}

type FormCardProps = {
  readonly children: ReactNode;
};

/**
 * Reveals the form card (heading + ContactForm) as a single
 * unit. The `ContactForm` is a Client Component with its own
 * RHF state; animating individual fields would require
 * per-field client islands and is not justified. The card
 * enters with a fade-up; the form's internal field UX (focus,
 * error, success) stays in SCSS.
 */
export function ContactFormCardMotion({ children }: FormCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reducedMotion ? 0 : DURATION.slow,
        ease: EASING.out,
        delay: reducedMotion ? 0 : 0.15,
      }}
    >
      {children}
    </motion.div>
  );
}
