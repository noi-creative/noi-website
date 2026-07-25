'use client';

import { Children, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { DURATION, EASING, useReducedMotion } from '@/lib/motion';

/**
 * Configuration shared by `<RevealItem>` and `<RevealStagger>`. Each
 * field configures a different knob of the entrance animation; the
 * defaults are the values used by the most common call sites (the
 * A02 + A03 text-column staggers and the per-item tile staggers).
 */
type RevealConfig = {
  /**
   * Initial vertical translate in pixels. `0` when reduced motion is
   * on. Default `16` (the 80 ms per-step stagger centres around 16 px;
   * see `MOTION.md` §6).
   */
  readonly y?: number;
  /**
   * Per-item delay step in seconds. Default `0.08` (the upper end of
   * the 40–80 ms per-step budget from `MOTION.md` §6).
   */
  readonly stepDelay?: number;
  /**
   * Initial delay before the first item in seconds. Default `0`
   * (the first item reveals immediately on viewport entry).
   */
  readonly baseDelay?: number;
  /**
   * Viewport `amount` threshold (0–1) for `whileInView`. Default
   * `0.25` (the element is considered "in view" when 25% of it
   * intersects the viewport).
   */
  readonly amount?: number;
  /**
   * Animation duration in seconds. Default `DURATION.base` (`0.2`).
   * Use `DURATION.slow` (`0.36`) for the larger / more deliberate
   * reveals (illustrations, full-section choreography).
   */
  readonly duration?: number;
};

type RevealItemProps = RevealConfig & {
  /**
   * The item's index in the stagger. The item's delay is
   * `baseDelay + index * stepDelay`.
   */
  readonly index: number;
  readonly children: ReactNode;
};

/**
 * Single-element motion wrapper that reveals one element on viewport
 * entry with a per-item delay. Used by `<RevealStagger>` internally
 * and by consumers who need an explicit `index` (e.g. a per-`<li>`
 * stagger inside an `<ol>` or `<ul>` to preserve list semantics).
 *
 * Honours `prefers-reduced-motion: reduce` via the `useReducedMotion`
 * hook: when reduced motion is on, `y` initial is `0` and `duration`
 * is `0`, so the element is fully visible from the first frame.
 *
 * `viewport={{ once: true }}` is hard-coded — the reveal does not
 * replay when the user scrolls back to the element. This matches the
 * project rule from `MOTION.md` §6 ("Use `viewport={{ once: true }}`
 * for reveals that should not replay when the user scrolls back").
 */
export function RevealItem({
  index,
  y = 16,
  stepDelay = 0.08,
  baseDelay = 0,
  amount = 0.25,
  duration = DURATION.base,
  children,
}: RevealItemProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reducedMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: reducedMotion ? 0 : duration,
        ease: EASING.out,
        delay: reducedMotion ? 0 : baseDelay + index * stepDelay,
      }}
    >
      {children}
    </motion.div>
  );
}

type RevealStaggerProps = RevealConfig & {
  readonly children: ReactNode;
};

/**
 * Children-wrapper that maps each child to a `<RevealItem>` with its
 * array index. The total per-section stagger is
 * `baseDelay + (n - 1) * stepDelay` for `n` children.
 *
 * Implemented in terms of `<RevealItem>` so the two share a single
 * source of truth for the entrance animation, the reduced-motion
 * fallback, and the `viewport={{ once: true }}` rule.
 *
 * Typical call site (A02's `DevolverTextColumnMotion`):
 *
 * ```tsx
 * <RevealStagger>
 *   <Eyebrow>...</Eyebrow>
 *   <h2>...</h2>
 *   <p>...</p>
 * </RevealStagger>
 * ```
 *
 * Customised call site (A02's `TrabajarTextColumnMotion`):
 *
 * ```tsx
 * <RevealStagger y={12} baseDelay={0.1}>
 *   <h2>...</h2>
 *   <p>...</p>
 *   <Button>...</Button>
 * </RevealStagger>
 * ```
 */
export function RevealStagger({
  y,
  stepDelay,
  baseDelay,
  amount,
  duration,
  children,
}: RevealStaggerProps) {
  return (
    <>
      {Children.toArray(children).map((child, index) => (
        <RevealItem
          key={index}
          index={index}
          y={y}
          stepDelay={stepDelay}
          baseDelay={baseDelay}
          amount={amount}
          duration={duration}
        >
          {child}
        </RevealItem>
      ))}
    </>
  );
}
