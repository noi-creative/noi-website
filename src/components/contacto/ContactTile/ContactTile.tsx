import Image from 'next/image';
import type { ReactNode } from 'react';
import styles from './ContactTile.module.scss';

export type ContactTileTone = 'navy' | 'orange' | 'burgundy' | 'ink';

type ContactTileProps = {
  readonly tone: ContactTileTone;
  readonly icon: { src: string; alt: string };
  readonly label: string;
  readonly value: ReactNode;
  readonly href?: string;
};

/**
 * One contact row in the "También puedes encontrarnos aquí" section.
 * Composed of a coloured square icon tile on the left and a label +
 * value stack on the right. The icon tile uses the design-system
 * palette (navy / orange / burgundy / ink) per the Figma.
 *
 * When `href` is provided, the whole row becomes a link.
 */
export function ContactTile({ tone, icon, label, value, href }: ContactTileProps) {
  const body = (
    <>
      <span className={`${styles.icon} ${styles[`tone-${tone}`]}`} aria-hidden="true">
        <Image
          src={icon.src}
          alt=""
          width={32}
          height={32}
          className={styles.iconImage}
          sizes="32px"
        />
      </span>
      <span className={styles.text}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <a
        className={styles.tile}
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {body}
      </a>
    );
  }

  return <div className={styles.tile}>{body}</div>;
}
