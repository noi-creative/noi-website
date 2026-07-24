import { assets, type ProyectoSlug } from '@/lib/assets';

/**
 * Project records for the portfolio. Order is the homepage/portfolio
 * ordering. Slugs must match the keys in `src/lib/assets.ts` exactly.
 *
 * Each project record exposes only the data a route needs at build time
 * (slug, name placeholder, cover image). The full raster manifest is
 * imported from `@/lib/assets` and should be the single source of truth
 * for paths and dimensions.
 */

export type Project = {
  readonly slug: ProyectoSlug;
  readonly name: string;
  readonly summary: string;
  readonly coverSrc: string;
  readonly coverWidth: number;
  readonly coverHeight: number;
  readonly featured: boolean;
};

export const projects: readonly Project[] = [
  {
    slug: 'content-lab',
    name: 'Content Lab',
    summary: 'TODO project summary — copy is added in P05/P06.',
    coverSrc: assets.proyectos['content-lab'].cover.src,
    coverWidth: assets.proyectos['content-lab'].cover.width,
    coverHeight: assets.proyectos['content-lab'].cover.height,
    featured: true,
  },
  {
    slug: 'jaze',
    name: 'Jaze',
    summary: 'TODO project summary — copy is added in P05/P06.',
    coverSrc: assets.proyectos.jaze.cover.src,
    coverWidth: assets.proyectos.jaze.cover.width,
    coverHeight: assets.proyectos.jaze.cover.height,
    featured: true,
  },
  {
    slug: 'nayeenails',
    name: 'Nayee Nails',
    summary: 'TODO project summary — copy is added in P05/P06.',
    coverSrc: assets.proyectos.nayeenails.cover.src,
    coverWidth: assets.proyectos.nayeenails.cover.width,
    coverHeight: assets.proyectos.nayeenails.cover.height,
    featured: true,
  },
  {
    // NOTE: `src/lib/assets.ts` keys this project as `simbi` while the
    // folder on disk is `simbi-cakes`. C05 uses the manifest key as the
    // URL slug, so the project lives at `/portafolio/simbi`. P05/P06 can
    // decide whether to rename the folder or expose a friendly URL.
    slug: 'simbi',
    name: 'Simbi Cakes',
    summary: 'TODO project summary — copy is added in P05/P06.',
    coverSrc: assets.proyectos.simbi.cover.src,
    coverWidth: assets.proyectos.simbi.cover.width,
    coverHeight: assets.proyectos.simbi.cover.height,
    featured: true,
  },
  {
    slug: 'veritomom',
    name: 'Verito Mom',
    summary: 'TODO project summary — copy is added in P05/P06.',
    coverSrc: assets.proyectos.veritomom.cover.src,
    coverWidth: assets.proyectos.veritomom.cover.width,
    coverHeight: assets.proyectos.veritomom.cover.height,
    featured: true,
  },
  {
    slug: 'crea-desde-cero',
    name: 'Crea desde cero',
    summary: 'TODO project summary — copy is added in P05/P06.',
    coverSrc: assets.proyectos['crea-desde-cero'].cover.src,
    coverWidth: assets.proyectos['crea-desde-cero'].cover.width,
    coverHeight: assets.proyectos['crea-desde-cero'].cover.height,
    featured: true,
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
