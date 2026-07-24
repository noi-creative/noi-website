import type { ReactNode } from 'react';
import styles from './VisuallyHidden.module.scss';

type VisuallyHiddenProps = {
  readonly children: ReactNode;
  readonly as?: 'span' | 'p';
};

/**
 * Renders content that is hidden visually but remains available to assistive
 * technology. Used for skip links, screen-reader-only labels, and any case
 * where a visible label is replaced by an icon or a surrounding cue.
 */
export function VisuallyHidden({ children, as = 'span' }: VisuallyHiddenProps) {
  const Tag = as;
  return <Tag className={styles.visuallyHidden}>{children}</Tag>;
}
