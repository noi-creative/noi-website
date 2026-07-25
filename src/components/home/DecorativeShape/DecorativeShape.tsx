import styles from './DecorativeShape.module.scss';

export type DecorativeShapePlacement = 'hero' | 'branding';

type DecorativeShapeProps = {
  /**
   * Two placements are used on the P01 home page. They render the
   * same orange organic curve at different sizes and orientations
   * — `hero` is a thin brushstroke behind the headline on the left;
   * `branding` is a similar shape next to the portrait.
   */
  readonly placement: DecorativeShapePlacement;
  readonly className?: string;
};

/**
 * Abstract orange organic curve used as a decorative motif on the
 * home page. Appears twice in P01 (hero + branding section).
 *
 * The shape is NOT a numeral — the Figma audit called it a "2"
 * but the Figma is an organic brushstroke-style form, not a digit.
 * The exact path is a best-effort approximation from the PNG; it
 * should be re-validated against the approved Figma frame via Figma
 * MCP before production (Q01).
 *
 * The component is a Server Component (no JS) and the path scales
 * uniformly with the SVG `viewBox`. `aria-hidden` because it is
 * pure decoration.
 */
export function DecorativeShape({ placement, className }: DecorativeShapeProps) {
  return (
    <svg
      className={[styles.shape, styles[`placement-${placement}`], className]
        .filter(Boolean)
        .join(' ')}
      width="540"
      height="673"
      viewBox="0 0 540 673"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M277.831 282.834C270.144 286.543 262.47 290.244 254.783 293.952L175.017 332.609C219.084 275.329 298.109 218.579 280.06 136.338C262.025 54.0895 160.564 51.1013 98.3187 82.3948L124.914 174.924L204.419 130.436C160.438 190.836 73.4842 260.739 111.603 344.119C141.784 410.123 220.078 411.864 277.888 383.49L358.957 342.656C313.323 401.819 224.494 469.319 260.309 553.707C292.333 629.131 387.919 624.371 446.981 585.799L428.144 496.94L324.009 543.926C369.636 487.878 450.188 433.319 434.406 350.613C420.476 277.614 342.752 256.468 277.824 282.82L277.831 282.834Z"
        fill="#ED7218"
      />
    </svg>
  );
}
