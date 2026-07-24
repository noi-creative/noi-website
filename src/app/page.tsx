import styles from './page.module.scss';

/**
 * Development-only fixture. C04 wired the design tokens, fonts and reduced
 * motion. C05 will replace this placeholder with the actual home page. The
 * fixture is intentionally a single file that proves every C04 acceptance
 * criterion at a glance:
 *
 *   - the seven brand colours render at the correct hex
 *   - the font families (Satoshi and Playfair Display) are loaded
 *   - the fluid type scale responds to the viewport
 *   - the radius, shadow and spacing tokens are present
 *   - reduced-motion users see the same content
 */
export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <p className="eyebrow">NOI Creative · design system fixture</p>
        <h1 className={styles.title}>
          <span className={styles.satoshi}>El branding no es un momento,</span>{' '}
          <span className="font-serif-italic">es un proceso.</span>
        </h1>
        <p className={styles.lede}>
          This page is a development fixture used to verify that the SCSS architecture, the design
          tokens and the fonts are wired correctly. C05 will replace it with the actual home page.
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.h2}>Brand colours</h2>
        <ul className={styles.swatchGrid} aria-label="Brand colour swatches">
          <li className={styles.swatch} data-token="navy" />
          <li className={styles.swatch} data-token="yellow" />
          <li className={styles.swatch} data-token="burgundy" />
          <li className={styles.swatch} data-token="cream" />
          <li className={styles.swatch} data-token="orange" />
          <li className={styles.swatch} data-token="blue" />
          <li className={styles.swatch} data-token="ink" />
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Type scale</h2>
        <p className={styles.xs}>xs — xs label / minor caption</p>
        <p className={styles.sm}>sm — eyebrow / metadata</p>
        <p className={styles.base}>base — body copy</p>
        <p className={styles.md}>md — lead paragraph</p>
        <p className={styles.lg}>lg — small section title</p>
        <p className={styles.xl}>xl — standard section heading</p>
        <p className={styles.xxl}>2xl — major section heading</p>
        <p className={styles.hero}>hero — oversized editorial headline</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Mixed-font phrase</h2>
        <p className={styles.serifBody}>
          The body of an editorial quote or a long sentence that mixes Satoshi with{' '}
          <span className="font-serif-italic">a Playfair italic accent</span> inside the same
          paragraph, without losing the editorial tone.
        </p>
      </section>
    </main>
  );
}
