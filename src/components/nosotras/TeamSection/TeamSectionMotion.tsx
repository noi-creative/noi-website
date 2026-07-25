'use client';

import type { ReactNode } from 'react';
import { RevealItem, RevealStagger } from '@/lib/motion';

type HeaderProps = {
  readonly children: ReactNode;
};

/**
 * Stagger-reveals the TeamSection header (eyebrow → heading →
 * intro). All defaults from `<RevealStagger>` apply.
 */
export function TeamHeaderMotion({ children }: HeaderProps) {
  return <RevealStagger>{children}</RevealStagger>;
}

type CardItemProps = {
  readonly children: ReactNode;
  readonly index: number;
};

/**
 * Per-item reveal wrapper for each team-member card. The server
 * component renders one of these inside each `<li>` of the card
 * row. The `<li>` stays a direct child of the `<ol>` (the grid
 * container) so the document semantics are preserved; the
 * `motion.div` is a flow child of the `<li>`.
 *
 * Stagger is achieved by passing the array index as the `index`
 * prop to `<RevealItem>`. All other defaults apply (y: 16,
 * stepDelay: 0.08, baseDelay: 0, amount: 0.2 — note the 0.2
 * for tiles, not 0.25 like text blocks; the cards are smaller
 * so a tighter threshold feels right).
 */
export function TeamCardItemMotion({ children, index }: CardItemProps) {
  return (
    <RevealItem index={index} amount={0.2}>
      {children}
    </RevealItem>
  );
}
