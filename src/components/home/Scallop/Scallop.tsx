'use client';

import type { CSSProperties } from 'react';
import { useScreenWidth } from '@/lib/useScreenWidth';
import styles from './Scallop.module.scss';

export type ScallopTone = 'navy' | 'yellow' | 'burgundy' | 'cream';
export type ScallopDirection = 'up' | 'down';

type ScallopProps = {
  readonly tone: ScallopTone;
  readonly direction?: ScallopDirection;
  readonly className?: string;
};

const TONE_FILL: Record<ScallopTone, string> = {
  navy: '#00385C',
  yellow: '#FFEDAE',
  burgundy: '#810C18',
  cream: '#FFF9F4',
};

const TONE_COLOR: Record<ScallopTone, string> = {
  navy: 'var(--color-background-dark)',
  yellow: 'var(--color-background-warm)',
  burgundy: 'var(--color-background-strong)',
  cream: 'var(--color-background-page)',
};

/** Cubic-bezier k for a 90° circular arc approximation. */
const K = 0.5522847498;

/**
 * Generates the SVG path `d` attribute for upward-facing scallops.
 *
 * Each scallop is a perfect semicircle formed by two 90° cubic-bezier
 * arcs. The path rises from the bottom edge to `depth` at the apex
 * of each arch. After the last scallop the path closes along the top
 * edge so the fill paints the area above the arches (the section
 * above "dripping" down into the section below).
 */
function scallopPath(width: number, depth: number, count: number): string {
  const r = width / 2;
  const cp = r * K;
  const cx = r - cp;
  const totalWidth = count * width;
  const sb: string[] = [`M0 0`, `L 0 ${depth}`];

  for (let i = 0; i < count; i++) {
    const x0 = i * width;
    const xm = x0 + r;
    const x1 = x0 + width;
    sb.push(
      `C ${x0} ${depth - cp}, ${x0 + cx} 0, ${xm} 0`,
      `C ${xm + cx} 0, ${x1} ${depth - cp}, ${x1} ${depth}`,
    );
  }

  sb.push(`L ${totalWidth} 0`, `Z`);
  return sb.join('\n           ');
}

const MAX_SCALLOP_WIDTH = 180;
const SCALLOP_DEPTH = 90;
const SSR_VIEWBOX = 1440;
const SSR_COUNT = 8;

function computeConfig(vpWidth: number) {
  const count = Math.max(1, Math.ceil(vpWidth / MAX_SCALLOP_WIDTH));
  const scallopWidth = vpWidth / count;
  return { scallopWidth, count, viewBoxWidth: vpWidth };
}

export function Scallop({ tone, direction = 'up', className }: ScallopProps) {
  const screenWidth = useScreenWidth();

  const { scallopWidth, count, viewBoxWidth } =
    screenWidth !== null
      ? computeConfig(screenWidth)
      : { scallopWidth: MAX_SCALLOP_WIDTH, count: SSR_COUNT, viewBoxWidth: SSR_VIEWBOX };

  return (
    <svg
      className={[styles.scallop, direction === 'down' ? styles.down : undefined, className]
        .filter(Boolean)
        .join(' ')}
      viewBox={`0 0 ${viewBoxWidth} ${SCALLOP_DEPTH}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      style={{ color: TONE_COLOR[tone] } as CSSProperties}
    >
      <path fill={TONE_FILL[tone]} d={scallopPath(scallopWidth, SCALLOP_DEPTH, count)} />
    </svg>
  );
}
