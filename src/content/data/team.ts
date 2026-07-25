import { assets } from '@/lib/assets';

/**
 * Team records for `/nosotras`. Each entry exposes the data the page needs:
 * the team-portrait slot from the asset manifest, the display name, the role
 * label, the bottom-accent colour, and a short biography.
 *
 * Display order matches the approved Nosotras page. Manifest slot mapping
 * (resolved by C05):
 *   - `teamPortraits[0]` is Daniela (`team-portrait-1.jpg`)
 *   - `teamPortraits[1]` is María Patricia (`team-portrait-2.jpg`)
 *   - `teamPortraits[2]` is Carla (`team-portrait-3.jpg`)
 *
 * Accent colours are confirmed by the user during P02 Round A:
 *   - Daniela → blue (`--color-brand-navy`)
 *   - María Patricia → red (`--color-brand-burgundy`)
 *   - Carla → yellow (`--color-brand-yellow`)
 * The earlier FIGMA_AUDIT guess of "Carla red" was wrong.
 */

export type TeamAccent = 'navy' | 'burgundy' | 'yellow';

export type TeamMember = {
  readonly slug: string;
  readonly name: string;
  readonly role: string;
  readonly accent: TeamAccent;
  readonly bio: string;
  readonly portrait: (typeof assets.nosotras.teamPortraits)[number];
};

export const team: readonly TeamMember[] = [
  {
    slug: 'daniela',
    name: 'Daniela',
    role: 'Founder & Brand Strategist',
    accent: 'navy',
    bio: 'La que pone orden donde otros ven caos. Daniela es la arquitecta de nuestro proceso. Es la mente que se asegura de que cada proyecto avance con una estructura impecable, tiempos reales y cero improvisaciones. Su criterio es el cable a tierra del equipo, ese que organiza el camino para que la creatividad pueda fluir con total libertad y seguridad.',
    portrait: assets.nosotras.teamPortraits[0],
  },
  {
    slug: 'maria-patricia',
    name: 'María Patricia',
    role: 'Creative Director',
    accent: 'burgundy',
    bio: 'La que hace las preguntas que nadie más se atreve a hacer. María Patricia es la que describe el "porque" de cada proyecto. Entiende que detrás de cada gran diseño debe haber un negocio sólido que lo respalde; por eso, a través de las preguntas correctas, su mirada estratégica limpia el camino, ordena las ideas y define la dirección exacta que tu proyecto necesita para crecer con fuerza.',
    portrait: assets.nosotras.teamPortraits[1],
  },
  {
    slug: 'carla',
    name: 'Carla',
    role: 'Brand & Project Coordinator',
    accent: 'yellow',
    bio: 'La mirada artística y libre del equipo. Carla es la artista que nos reta a mirar las cosas desde un lugar totalmente diferente. Su trabajo no nace de la técnica rígida, sino de una sensibilidad profunda por lo humano y lo estético. Con esa visión libre y una intuición extraordinaria, ella es la encargada de infundir el toque artístico que hace que cada marca deje de ser solo un proyecto y se convierta en una obra con personalidad propia.',
    portrait: assets.nosotras.teamPortraits[2],
  },
] as const;
