'use client';

import type { ReactNode } from 'react';
import styles from './SkipLink.module.scss';

type SkipLinkProps = {
  readonly href: string;
  readonly children: ReactNode;
};

/**
 * Skip link. The first focusable element on the page. Renders as a pill
 * above the page when it receives keyboard focus; otherwise visually
 * hidden. Links to the main content target (`#main-content`).
 */
export function SkipLink({ href, children }: SkipLinkProps) {
  return (
    <a href={href} className={styles.skipLink}>
      {children}
    </a>
  );
}
