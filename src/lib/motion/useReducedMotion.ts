'use client';

import { useReducedMotion as useMotionReducedMotion } from 'motion/react';

/**
 * Project convention wrapper around Motion's `useReducedMotion` hook.
 *
 * Behavior:
 * - Returns `false` during SSR and on the first client render. This is the
 *   safe default because the same final state must render whether or not
 *   the user has reduced-motion enabled.
 * - After mount, returns the user's `prefers-reduced-motion` setting as a
 *   non-nullable boolean. `true` means the user has reduced motion enabled.
 *
 * Project rule (DESIGN.md §20, AGENTS.md §13):
 * - When this returns `true`, every Motion component in the project must
 *   short-circuit non-essential movement (typically by setting the
 *   animation `duration` to `0` or by replacing transform animations with
 *   opacity-only ones).
 * - The final visual state and all interaction must still be preserved.
 *   Reduced motion removes movement, not content.
 *
 * Usage in a client component:
 *
 * ```tsx
 * 'use client';
 * import { motion } from 'motion/react';
 * import { useReducedMotion, DURATION } from '@/lib/motion';
 *
 * export function FadeUp({ children }: { children: React.ReactNode }) {
 *   const reducedMotion = useReducedMotion();
 *   return (
 *     <motion.div
 *       initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
 *       whileInView={{ opacity: 1, y: 0 }}
 *       viewport={{ once: true, amount: 0.25 }}
 *       transition={{ duration: reducedMotion ? 0 : DURATION.base }}
 *     >
 *       {children}
 *     </motion.div>
 *   );
 * }
 * ```
 *
 * If a section has many child `motion.*` components and the same reduced-
 * motion fallback applies to all of them, prefer wrapping that section's
 * client island in `<MotionConfig reducedMotion="user">` instead of calling
 * this hook from each component. See `docs/implementation/MOTION.md`.
 */
export function useReducedMotion(): boolean {
  return useMotionReducedMotion() ?? false;
}
