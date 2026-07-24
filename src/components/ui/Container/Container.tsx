import type { ElementType, ReactNode } from 'react';
import styles from './Container.module.scss';

type ContainerProps = {
  readonly children: ReactNode;
  readonly as?: ElementType;
  readonly width?: 'content' | 'wide' | 'viewport';
  readonly className?: string;
};

/**
 * Page-width container. Defaults to `wide` (the standard editorial
 * container) and a `<div>`. The width is mapped to the C04
 * `--container-*` token, and the responsive gutter is consumed through
 * the C04 `container` mixin.
 */
export function Container({
  children,
  as: Tag = 'div',
  width = 'wide',
  className,
}: ContainerProps) {
  return (
    <Tag className={[styles.container, styles[width], className].filter(Boolean).join(' ')}>
      {children}
    </Tag>
  );
}
