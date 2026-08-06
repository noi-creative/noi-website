import type { ReactNode } from 'react';
import styles from './Eyebrow.module.scss';

export type EyebrowTone = 'accent' | 'ink' | 'cream' | 'orange';

type EyebrowProps = {
  readonly children: ReactNode;
  readonly tone?: EyebrowTone;
  readonly as?: 'p' | 'span' | 'div';
  readonly className?: string;
};

/**
 * Small uppercase + tracked label used above section headings. The C03
 * audit confirmed the pattern is used on every approved page. The `tone`
 * prop selects the colour token; `accent` (burgundy) is the most common,
 * `orange` matches the "NUESTRO MÉTODO" / "LO QUE HACEMOS" eyebrows on
 * the Home page, and `cream` is used on dark surfaces.
 */
export function Eyebrow({ children, tone = 'accent', as = 'p', className }: EyebrowProps) {
  const Tag = as;
  return (
    <Tag className={[styles.eyebrow, styles[tone], className].filter(Boolean).join(' ')}>
      {children}
    </Tag>
  );
}
