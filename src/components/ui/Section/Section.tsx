import type { ElementType, ReactNode } from 'react';
import styles from './Section.module.scss';

export type SectionBackground = 'cream' | 'navy' | 'yellow' | 'burgundy' | 'soft';

export type SectionProps = {
  readonly children: ReactNode;
  readonly as?: ElementType;
  readonly background?: SectionBackground;
  readonly id?: string;
  readonly ariaLabelledby?: string;
  readonly className?: string;
  readonly contained?: boolean;
};

/**
 * Page-section wrapper. Five background variants match the C03 audit's
 * observed surface palette. `contained` adds the standard `Container` to
 * the section's content.
 *
 * Note: the scalloped section edges visible in the approved Home and
 * Nosotras frames are organic SVG shapes that will live with the
 * page-level components (P01/P02/P03), not in this generic primitive.
 * The Section primitive provides only the background and the padding.
 */
export function Section({
  children,
  as: Tag = 'section',
  background = 'cream',
  id,
  ariaLabelledby,
  className,
  contained = false,
}: SectionProps) {
  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledby}
      className={[styles.section, styles[`bg-${background}`], className].filter(Boolean).join(' ')}
    >
      {contained ? <div className={styles.inner}>{children}</div> : children}
    </Tag>
  );
}
