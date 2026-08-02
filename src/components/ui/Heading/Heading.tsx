import { createElement, type CSSProperties } from 'react';
import styles from './Heading.module.scss';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold' | 'black';
type AccentFamily = 'sans' | 'serif' | 'display';
type AccentSize =
  'inherit' | 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | 'hero' | 'hero-lg';

type HeadingProps = {
  readonly as?: `h${HeadingLevel}`;
  readonly id?: string;
  readonly primary: string;
  readonly accent?: string;
  readonly weight?: FontWeight;
  readonly align?: 'start' | 'center';
  readonly accentFamily?: AccentFamily;
  readonly accentWeight?: FontWeight;
  readonly accentItalic?: boolean;
  readonly accentSize?: AccentSize;
  readonly accentColor?: string;
  readonly className?: string;
  readonly style?: CSSProperties;
};

/**
 * Semantic heading primitive. The primary phrase renders in Satoshi and can
 * stand alone for editorial display headings. When supplied, the accent phrase
 * adds the configured mixed-typeface treatment.
 *
 * Accent styling can be customized via props:
 * - `accentFamily` — `'sans'` (default) or `'serif'`
 * - `accentItalic` — applies italic style when `true`
 * - `accentSize` — any token from the type scale (`'inherit'` by default)
 * - `accentColor` — sets `--heading-accent-color` on the heading element
 *
 * The default weight is `black`. Use `bold` for secondary section titles.
 */
export function Heading({
  as = 'h1',
  id,
  primary,
  accent,
  weight = 'black',
  align = 'start',
  accentFamily = 'sans',
  accentItalic = false,
  accentSize = 'inherit',
  accentWeight,
  accentColor,
  className,
  style,
}: HeadingProps) {
  const headingClass = [
    styles.heading,
    styles[`weight-${weight}`],
    styles[`align-${align}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const accentClass = [
    styles.accent,
    styles[`accent-family-${accentFamily}`],
    accentItalic ? styles['accent-italic'] : null,
    accentSize !== 'inherit' ? styles[`accent-size-${accentSize}`] : null,
    styles[`accent-weight-${accentWeight}`],
  ]
    .filter(Boolean)
    .join(' ');

  const combinedStyle = accentColor
    ? ({ ...style, '--heading-accent-color': accentColor } as CSSProperties)
    : style;

  return createElement(
    as,
    { id, className: headingClass, style: combinedStyle },
    <>
      <span className={styles.primary}>{primary}</span>
      {accent ? (
        <>
          {' '}
          <span className={accentClass}>{accent}</span>
        </>
      ) : null}
    </>,
  );
}
