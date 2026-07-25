import styles from './PortafolioDecor.module.scss';

/**
 * Decorative stack of two organic arc shapes used on the P05
 * Portafolio index hero. Renders the blue `semi-circulo-azul`
 * on top of the orange `semi-circulo-naranja` as a vertical
 * composition that sits behind the eyebrow and headline.
 *
 * The component is a Server Component (no JS) and the paths
 * scale uniformly with each SVG `viewBox`. `aria-hidden`
 * because it is pure decoration.
 *
 * The exact placement is a best-effort composition derived
 * from the reference render; it should be re-validated
 * against the approved Figma frame via Figma MCP once the
 * Portafolio designs are signed off (see AGENTS.md §7).
 */
export function PortafolioDecor({
  className,
  colorHEX,
}: {
  readonly className?: string;
  colorHEX?: string;
}) {
  return (
    <div className={[styles.wrap, className].filter(Boolean).join(' ')} aria-hidden="true">
      <svg
        className={styles.shapeBlue}
        width="214"
        height="132"
        viewBox="0 0 214 132"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M213.527 -11C216.69 103.344 86.3765 153.059 -18.1655 122.774C-90.6826 101.763 -124.675 45.3729 -123.99 -11"
          fill={colorHEX ?? '#00385C'}
        />
      </svg>
      <svg
        className={styles.shapeBlue}
        width="214"
        height="132"
        viewBox="0 0 214 132"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M213.527 -11C216.69 103.344 86.3765 153.059 -18.1655 122.774C-90.6826 101.763 -124.675 45.3729 -123.99 -11"
          fill={colorHEX ?? '#00385C'}
        />
      </svg>
      <svg
        className={styles.shapeBlue}
        width="214"
        height="132"
        viewBox="0 0 214 132"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M213.527 -11C216.69 103.344 86.3765 153.059 -18.1655 122.774C-90.6826 101.763 -124.675 45.3729 -123.99 -11"
          fill={colorHEX ?? '#00385C'}
        />
      </svg>
    </div>
  );
}
