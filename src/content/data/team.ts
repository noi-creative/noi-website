import { assets } from '@/lib/assets';

/**
 * Team records for `/nosotras`. Each entry exposes the data the page needs:
 * the team-portrait slot from the asset manifest, the display name, the role
 * label and the accent colour. The actual biography copy is added in P02.
 *
 * The display order below (Daniela, María Patricia, Carla) matches the
 * approved Nosotras page. The manifest slot mapping is:
 *   - `teamPortraits[0]` is Daniela (`team-portrait-1.jpg`)
 *   - `teamPortraits[1]` is María Patricia (`team-portrait-2.jpg`)
 *   - `teamPortraits[2]` is Carla (`team-portrait-3.jpg`)
 *
 * The file names and the manifest slots now match the display order. C05
 * resolved two earlier inconsistencies:
 *   - the original manifest's alt labels for slots 0 and 1 were swapped,
 *   - the third slot was `null` because the file originally lived at
 *     `section-devolver-1.jpg`. It was renamed to `team-portrait-2.jpg`
 *     (via copy + delete, per the project's "no single-image moves" rule)
 *     and the devolver section was reduced to a single wider shot at
 *     `section-devolver.png`.
 */

export type TeamAccent = 'navy' | 'burgundy' | 'red';

export type TeamMember = {
  readonly slug: string;
  readonly name: string;
  readonly role: string;
  readonly accent: TeamAccent;
  readonly portrait: (typeof assets.nosotras.teamPortraits)[number];
};

export const team: readonly TeamMember[] = [
  {
    slug: 'daniela',
    name: 'Daniela',
    role: 'Founder & Brand Strategist',
    accent: 'navy',
    portrait: assets.nosotras.teamPortraits[0],
  },
  {
    slug: 'maria-patricia',
    name: 'María Patricia',
    role: 'Creative Director',
    accent: 'burgundy',
    portrait: assets.nosotras.teamPortraits[1],
  },
  {
    slug: 'carla',
    name: 'Carla',
    role: 'Brand & Project Coordinator',
    accent: 'red',
    portrait: assets.nosotras.teamPortraits[2],
  },
] as const;
