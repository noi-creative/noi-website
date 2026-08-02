'use client';

import { useCallback, useState, type KeyboardEvent } from 'react';
import { motion } from 'motion/react';
import { DURATION, EASING, useReducedMotion } from '@/lib/motion';
import type { Testimonial } from '@/content/data/testimonials';
import styles from './Testimonials.module.scss';

type TestimonialsCarouselProps = {
  readonly items: readonly Testimonial[];
};

/**
 * Relative position of a card with respect to the active card.
 * - 0: active (center, fully visible)
 * - positive: to the right (next)
 * - negative: to the left (previous, wraps around)
 */
function relativePosition(index: number, active: number, total: number): number {
  const raw = index - active;
  if (raw > total / 2) return raw - total;
  if (raw < -total / 2) return raw + total;
  return raw;
}

/**
 * Interactive carousel for the Home testimonials. Renders the full
 * list of cards in a stack with the active card in front and the
 * previous/next cards peeking from the sides. Clicking the arrows
 * or the pagination dots rotates the active card. Arrow keys
 * (`←` / `→`) on a focused control also rotate the carousel.
 *
 * Per `MOTION.md` §6 the transition is compositor-only (transform
 * + opacity); no layout properties animate. With
 * `prefers-reduced-motion: reduce` the transition collapses to
 * an instant swap.
 */
export function TestimonialsCarousel({ items }: TestimonialsCarouselProps) {
  const total = items.length;
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();

  const goTo = useCallback(
    (next: number) => {
      setActive(((next % total) + total) % total);
    },
    [total],
  );
  const previous = useCallback(() => goTo(active - 1), [active, goTo]);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        previous();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        next();
      }
    },
    [previous, next],
  );

  return (
    <div
      className={styles.stack}
      role="group"
      aria-roledescription="carousel"
      aria-label="Testimonios de clientes"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className={styles.stage} aria-live="polite" aria-atomic="true">
        {items.map((t, index) => {
          const rel = relativePosition(index, active, total);
          const isActive = rel === 0;
          const isAdjacent = Math.abs(rel) === 1;
          const xOffset = isAdjacent ? `${rel * 78}%` : `${rel * 156}%`;
          return (
            <motion.article
              key={t.id}
              className={[
                styles.card,
                styles[`card-${t.cardColor}`],
                isActive ? styles.cardFront : styles.cardBack,
              ].join(' ')}
              initial={false}
              animate={{
                x: xOffset,
                opacity: isActive ? 1 : isAdjacent ? 0.85 : 0,
                scale: isActive ? 1 : isAdjacent ? 0.96 : 0.94,
              }}
              transition={
                reducedMotion ? { duration: 0 } : { duration: DURATION.slow, ease: EASING.out }
              }
              aria-hidden={!isActive}
              aria-roledescription="slide"
              aria-label={`${index + 1} de ${total}: ${t.author}`}
              style={{ pointerEvents: isActive ? 'auto' : 'none' }}
            >
              <span className={styles.quoteMark} aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className={styles.quote}>
                <p>{t.quote}</p>
              </blockquote>
              <footer className={styles.attribution}>
                <span className={styles.author}>{t.author}</span>
                <span className={styles.role}>{t.role}</span>
              </footer>
            </motion.article>
          );
        })}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.arrow}
          onClick={previous}
          aria-label="Testimonio anterior"
        >
          <ArrowGlyph direction="left" />
        </button>

        <div className={styles.dots} role="tablist" aria-label="Seleccionar testimonio">
          {items.map((t, index) => {
            const selected = index === active;
            return (
              <button
                key={t.id}
                type="button"
                className={[styles.dot, selected ? styles.dotActive : ''].join(' ')}
                onClick={() => goTo(index)}
                role="tab"
                aria-selected={selected}
                aria-label={`Ir al testimonio ${index + 1} de ${total}`}
              />
            );
          })}
        </div>

        <button
          type="button"
          className={styles.arrow}
          onClick={next}
          aria-label="Siguiente testimonio"
        >
          <ArrowGlyph direction="right" />
        </button>
      </div>
    </div>
  );
}

function ArrowGlyph({ direction }: { readonly direction: 'left' | 'right' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      className={direction === 'left' ? styles.arrowGlyphLeft : styles.arrowGlyphRight}
    >
      <path
        d="M3 8h9.5M9 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
