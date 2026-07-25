import styles from './ProjectDetailHero.module.scss';

export type DetailHeroTone = 'dark' | 'cream' | 'orange';
export type DetailHeroTextColor = 'cream' | 'ink' | 'burgundy';

type ProjectDetailHeroProps = {
  readonly displayName: string;
  readonly name: string;
  readonly tone: DetailHeroTone;
  readonly textColor: DetailHeroTextColor;
};

/**
 * Full-bleed hero for the project detail page. The project display
 * name is rendered as a single-span Playfair Italic H1 in the
 * project's accent colour, on the project's hero background tone.
 * The hero is full-bleed (no `Container` wrapping) so the
 * background fills the viewport edge-to-edge.
 *
 * The C06 `Section` primitive is not used here because the 3 hero
 * tones (`dark`, `cream`, `orange`) and the per-project hero text
 * colours are project-detail-specific and don't match the 5
 * standard `Section` tones. Per AGENTS.md §26 a shared primitive
 * is not extended for a single-page use; this component owns its
 * 3 tones and 3 text colours and applies them via inline SCSS.
 *
 * The H1 is anchored to the upper portion of the hero (the Figma
 * detail heroes all have the title in the upper third, with
 * significant empty space below before the gallery starts). The
 * H1 is the LCP and does not animate (consistent with the
 * P02 / P03 / P05 LCP-does-not-animate pattern).
 */
export function ProjectDetailHero({ displayName, name, tone, textColor }: ProjectDetailHeroProps) {
  return (
    <section
      className={[styles.hero, styles[`tone-${tone}`]].join(' ')}
      aria-label={`Proyecto ${name}`}
    >
      <div className={styles.inner}>
        <h1 className={[styles.heading, styles[`text-${textColor}`]].join(' ')}>{displayName}</h1>
      </div>
    </section>
  );
}
