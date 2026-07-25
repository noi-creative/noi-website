import { assets, type ProyectoSlug } from '@/lib/assets';

/**
 * Project records for the portfolio. Order is the homepage/portfolio
 * ordering. Slugs must match the keys in `src/lib/assets.ts` exactly.
 *
 * Each project record exposes only the data a route needs at build time
 * (slug, name, summary, index card image, per-project tones). The full
 * raster manifest is imported from `@/lib/assets` and is the single
 * source of truth for paths and dimensions.
 *
 * The `coverSrc` points at the `large` slot of the manifest (the
 * `-large.jpg` file in each project's `proyectos/[slug]/` folder). Per
 * the C03 manifest convention, the `large` slot is the index card
 * image (used on `/portafolio`); the `cover` slot is the detail page
 * hero (used on `/portafolio/[slug]`, owned by P06 — P06 documents
 * the slot but does not consume it on the typography-only hero); the
 * `med` slot is the home carousel card.
 *
 * The per-project tones (`heroTone`, `bodyBackground`, `bodyTextColor`)
 * are P06 additions. They drive the 3 sections of the detail page:
 * the hero (full-bleed, project name as display), the body text
 * (single paragraph from `proyectos.json`), and the gallery (2-col
 * grid of `detail-N.jpg` images). The tone values map to existing
 * design tokens (see the `SectionBackground` and project-detail-hero
 * types in the components).
 */

export type DetailHeroTone = 'dark' | 'cream' | 'orange';
export type DetailBodyBackground = 'cream' | 'navy' | 'yellow' | 'burgundy' | 'soft';
export type DetailBodyTextColor = 'ink' | 'cream' | 'burgundy';
export type DetailHeroTextColor = 'cream' | 'ink' | 'burgundy';

export type Project = {
  readonly slug: ProyectoSlug;
  readonly name: string;
  /**
   * Optional display name for the detail-page hero. Defaults to `name`
   * when not provided. Used when the hero typography differs from the
   * canonical `name` (e.g. `content-lab` is rendered as the
   * Figma-faithful uppercase "JS/CONTENT LAB"; `veritomom` is rendered
   * as the brand-treated "VERITO mom" with the two words in different
   * sizes — P06 uses a single string for the latter, the per-word
   * typography treatment is a future polish).
   */
  readonly displayName?: string;
  readonly summary: string;
  readonly coverSrc: string;
  readonly coverWidth: number;
  readonly coverHeight: number;
  readonly featured: boolean;
  readonly heroTone: DetailHeroTone;
  readonly heroTextColor: DetailHeroTextColor;
  readonly bodyBackground: DetailBodyBackground;
  readonly bodyTextColor: DetailBodyTextColor;
};

export const projects: readonly Project[] = [
  {
    slug: 'content-lab',
    name: 'Js/Content Lab',
    displayName: 'JS/CONTENT LAB',
    summary: 'TODO project summary — copy is added in P06.',
    coverSrc: assets.proyectos['content-lab'].large.src,
    coverWidth: assets.proyectos['content-lab'].large.width,
    coverHeight: assets.proyectos['content-lab'].large.height,
    featured: true,
    heroTone: 'dark',
    heroTextColor: 'cream',
    bodyBackground: 'cream',
    bodyTextColor: 'burgundy',
  },
  {
    slug: 'jaze',
    name: 'Jaze',
    summary: 'TODO project summary — copy is added in P06.',
    coverSrc: assets.proyectos.jaze.large.src,
    coverWidth: assets.proyectos.jaze.large.width,
    coverHeight: assets.proyectos.jaze.large.height,
    featured: true,
    heroTone: 'cream',
    heroTextColor: 'ink',
    bodyBackground: 'cream',
    bodyTextColor: 'ink',
  },
  {
    slug: 'nayeenails',
    name: 'Nayeenails',
    summary: 'TODO project summary — copy is added in P06.',
    coverSrc: assets.proyectos.nayeenails.large.src,
    coverWidth: assets.proyectos.nayeenails.large.width,
    coverHeight: assets.proyectos.nayeenails.large.height,
    featured: true,
    heroTone: 'cream',
    heroTextColor: 'burgundy',
    bodyBackground: 'burgundy',
    bodyTextColor: 'cream',
  },
  {
    // P05: the manifest key was renamed `simbi` → `simbi-cakes` to match
    // the folder on disk (`public/images/proyectos/simbi-cakes/`) and to
    // produce the friendly URL `/portafolio/simbi-cakes`. The project
    // name is "Simbi Cakes" (no apostrophe) — the Figma's "Simbi Cake's"
    // is a Figma quirk, not studio-approved copy.
    slug: 'simbi-cakes',
    name: 'Simbi Cakes',
    summary: 'TODO project summary — copy is added in P06.',
    coverSrc: assets.proyectos['simbi-cakes'].large.src,
    coverWidth: assets.proyectos['simbi-cakes'].large.width,
    coverHeight: assets.proyectos['simbi-cakes'].large.height,
    featured: true,
    heroTone: 'orange',
    heroTextColor: 'cream',
    bodyBackground: 'cream',
    bodyTextColor: 'burgundy',
  },
  {
    slug: 'veritomom',
    name: 'Veritomom',
    displayName: 'VERITO mom',
    summary: 'TODO project summary — copy is added in P06.',
    coverSrc: assets.proyectos.veritomom.large.src,
    coverWidth: assets.proyectos.veritomom.large.width,
    coverHeight: assets.proyectos.veritomom.large.height,
    featured: true,
    heroTone: 'cream',
    heroTextColor: 'burgundy',
    bodyBackground: 'soft',
    bodyTextColor: 'burgundy',
  },
  {
    slug: 'crea-desde-cero',
    name: 'Crea desde Cero',
    summary: 'TODO project summary — copy is added in P06.',
    coverSrc: assets.proyectos['crea-desde-cero'].large.src,
    coverWidth: assets.proyectos['crea-desde-cero'].large.width,
    coverHeight: assets.proyectos['crea-desde-cero'].large.height,
    featured: true,
    heroTone: 'cream',
    heroTextColor: 'ink',
    bodyBackground: 'cream',
    bodyTextColor: 'ink',
  },
] as const;

export const projectSlugs = projects.map((p) => p.slug) as readonly ProyectoSlug[];

/**
 * `generateStaticParams` returns the slugs that Next.js will prerender at
 * build time. Each entry is `{ slug: '...' }`; the `[slug]` page component
 * receives `params.slug` and resolves the project record from `projects`.
 */
export function generateStaticParams(): Array<{ slug: string }> {
  return projectSlugs.map((slug) => ({ slug }));
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
