/**
 * Motion tokens — TypeScript mirror of the motion CSS custom properties
 * defined in `src/styles/_tokens.scss` (DESIGN.md §20).
 *
 * Keep these values in sync with the SCSS tokens. If you change a duration
 * or an easing curve here, change the CSS custom property in the same
 * commit. The two are the same values in different units.
 *
 * - Durations are expressed in **seconds** because Motion's `transition`
 *   API expects seconds. The CSS tokens are in milliseconds.
 * - Easing values are full cubic-bezier tuples expressed as 4-tuples,
 *   matching the syntax accepted by Motion's `transition.ease`.
 *
 * Usage in a Motion component:
 *
 * ```tsx
 * import { motion } from 'motion/react';
 * import { DURATION, EASING } from '@/lib/motion';
 *
 * <motion.div
 *   initial={{ opacity: 0, y: 16 }}
 *   animate={{ opacity: 1, y: 0 }}
 *   transition={{ duration: DURATION.base, ease: EASING.out }}
 * />
 * ```
 */

export const DURATION = {
  /** Mirrors `--motion-duration-fast` (120 ms). */
  fast: 0.12,
  /** Mirrors `--motion-duration-base` (200 ms). The default duration. */
  base: 0.2,
  /** Mirrors `--motion-duration-slow` (360 ms). For larger reveals. */
  slow: 0.36,
} as const;

export type MotionDurationKey = keyof typeof DURATION;

/**
 * Easing curves mirroring `--motion-ease-out` and `--motion-ease-in`.
 * Format: `[x1, y1, x2, y2]` as accepted by Motion's `transition.ease`.
 */
export const EASING = {
  /** Mirrors `--motion-ease-out`. Use for entrances and reveals. */
  out: [0.2, 0.7, 0.2, 1] as const,
  /** Mirrors `--motion-ease-in`. Use for exits and dismissals. */
  in: [0.5, 0, 0.8, 0.4] as const,
} as const;

export type MotionEasingKey = keyof typeof EASING;
