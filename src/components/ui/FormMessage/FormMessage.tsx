import type { ReactNode } from 'react';
import styles from './FormMessage.module.scss';

export type FormMessageProps = {
  readonly tone: 'success' | 'error' | 'info';
  readonly children: ReactNode;
  readonly id?: string;
};

/**
 * Inline form feedback. The `tone` selects the colour and icon. The
 * contact form uses `success` after a successful submission and `error`
 * after a server failure.
 */
export function FormMessage({ tone, children, id }: FormMessageProps) {
  return (
    <p id={id} className={[styles.message, styles[tone]].join(' ')} role="status">
      {children}
    </p>
  );
}
