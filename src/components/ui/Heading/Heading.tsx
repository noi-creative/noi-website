import { createElement, type CSSProperties } from 'react';
import styles from './Heading.module.scss';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingProps = {
  readonly as?: `h${HeadingLevel}`;
  readonly id?: string;
  readonly primary: string;
  readonly accent: string;
  readonly weight?: 'bold' | 'black';
  readonly align?: 'start' | 'center';
  readonly className?: string;
  readonly style?: CSSProperties;
};

/**
 * Mixed-typeface heading primitive. The C03 audit identified this pattern
 * as the strongest repeated device in the approved system — it is used 14
 * times across Home, Nosotras and Contacto. The component renders a
 * semantic heading with the primary phrase in Satoshi and the accent
 * phrase in Playfair Display Italic.
 *
 * The default weight is `black` (the display weight used on the approved
 * hero/headline frames). `bold` is available for secondary section titles.
 */
export function Heading({
  as = 'h1',
  id,
  primary,
  accent,
  weight = 'black',
  align = 'start',
  className,
  style,
}: HeadingProps) {
  return createElement(
    as,
    {
      id,
      className: [styles.heading, styles[`weight-${weight}`], styles[`align-${align}`], className]
        .filter(Boolean)
        .join(' '),
      style,
    },
    <>
      <span className={styles.primary}>{primary}</span>{' '}
      <span className={styles.accent}>{accent}</span>
    </>,
  );
}
