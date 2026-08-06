import { assets, type ProyectoSlug } from '@/lib/assets';

/**
 * Resolve an asset alt slot. Every meaningful raster asset must declare
 * alt text in `src/lib/assets.ts`; a missing slot fails at build time.
 */
function manifestAlt(value: string | null): string {
  if (value === null) {
    throw new Error('Asset alt is unresolved. Fill the `alt` slot in src/lib/assets.ts.');
  }
  return value;
}

/**
 * Project records for the portfolio. Order is the homepage/portfolio
 * ordering. Slugs must match the keys in `src/lib/assets.ts` exactly.
 *
 * Each project record exposes:
 *   - slug, name, summary — the canonical metadata
 *   - coverAlt — alt text for the index/carousel cover image
 *   - gallery — the ordered list of full-bleed images and text
 *     sections that compose the `/portafolio/[slug]` page
 *
 * The `gallery` array is the single source of truth for the detail-page
 * composition. Each item is either:
 *   - `{ type: 'image', width: 'full' | 'half', src, alt, width, height, priority? }`
 *   - `{ type: 'text', background, textColor, body }`
 *
 * The renderer iterates the array in order, rendering full-width
 * images edge-to-edge, pairing half-width images in rows of 2 (no gap),
 * and rendering text items as a simple text block. There are no
 * separate hero / body / gallery sections — the cover image IS the
 * hero, the text items are inserted at the studio-specified positions,
 * and the detail images fill the rest.
 */

export type GalleryItemImage = {
  readonly type: 'image';
  readonly width: 'full' | 'half';
  readonly src: string;
  readonly alt: string;
  readonly width_px: number;
  readonly height_px: number;
  readonly priority?: boolean;
};

export type GalleryItemText = {
  readonly type: 'text';
  readonly background: string;
  readonly textColor: string;
  readonly body: string;
};

export type GalleryItem = GalleryItemImage | GalleryItemText;

export type Project = {
  readonly slug: ProyectoSlug;
  readonly name: string;
  readonly summary: string;
  /**
   * Alt text for the index card and home carousel cover image
   * (the `large` slot of the manifest).
   */
  readonly coverAlt: string;
  /**
   * Index card image (used by the Portafolio index tile and the home
   * carousel). Points at the `large` slot of the manifest per the
   * C03 manifest convention. Distinct from the detail-page `gallery`
   * first image (which is the `cover` slot).
   */
  readonly coverSrc: string;
  readonly coverWidth: number;
  readonly coverHeight: number;
  readonly gallery: readonly GalleryItem[];
};

const cl = assets.proyectos['content-lab'];
const jz = assets.proyectos.jaze;
const nn = assets.proyectos.nayeenails;
const sc = assets.proyectos['simbi-cakes'];
const vm = assets.proyectos.veritomom;
const cc = assets.proyectos['crea-desde-cero'];

export const projects: readonly Project[] = [
  {
    slug: 'content-lab',
    name: 'Js/Content Lab',
    summary:
      'Identidad visual para JS Content Lab, un laboratorio de contenido audiovisual estratégico con una estética editorial en crema, negro y rojo.',
    coverAlt: manifestAlt(cl.large.alt),
    coverSrc: cl.large.src,
    coverWidth: cl.large.width,
    coverHeight: cl.large.height,
    gallery: [
      // full + 1/2 - 1/2 + text + full
      {
        type: 'image',
        width: 'full',
        src: cl.cover.src,
        alt: manifestAlt(cl.cover.alt),
        width_px: cl.cover.width,
        height_px: cl.cover.height,
        priority: true,
      },
      {
        type: 'image',
        width: 'half',
        src: cl.detail[0].src,
        alt: manifestAlt(cl.detail[0].alt),
        width_px: cl.detail[0].width,
        height_px: cl.detail[0].height,
      },
      {
        type: 'image',
        width: 'half',
        src: cl.detail[1].src,
        alt: manifestAlt(cl.detail[1].alt),
        width_px: cl.detail[1].width,
        height_px: cl.detail[1].height,
      },
      {
        type: 'text',
        background: '#fffdf6',
        textColor: '#b60c10',
        body: 'JS Content Lab es un laboratorio de contenido audiovisual estratégico cuyo eslogan, transformar lo ordinario en extraordinario, refleja su filosofía de marca: la fusión de una creatividad audaz con un propósito analítico claro. Mantiene una identidad visual sofisticada, actual y de gran impacto, donde una paleta cromática intencional —protagonizada por el elegante contraste entre el blanco crema, el negro opaco y un rojo vibrante, equilibrada con acentos cálidos en marrón oscuro y naranja. La combinación de sus tipografías, liderada por la elegancia clásica y el carácter editorial de Cormorant junto a la modernidad, limpieza y versatilidad de Montserrat, construye una estética refinada, estructurada y única que rompe por completo con las fórmulas comunes.',
      },
      {
        type: 'image',
        width: 'full',
        src: cl.detail[2].src,
        alt: manifestAlt(cl.detail[2].alt),
        width_px: cl.detail[2].width,
        height_px: cl.detail[2].height,
      },
    ],
  },
  {
    slug: 'jaze',
    name: 'Jaze',
    summary:
      'Branding e identidad visual para Jaze, una marca de ropa cristiana con una estética sobria, contemporánea y basada en tonos tierra.',
    coverAlt: manifestAlt(jz.large.alt),
    coverSrc: jz.large.src,
    coverWidth: jz.large.width,
    coverHeight: jz.large.height,
    gallery: [
      // full + 1/2 - 1/2 + text + 1/2 - 1/2 + full + full
      // detail-1 = cream hoodie, detail-2 = CD monogram, detail-3 = green pattern,
      // detail-4 = Care Card, detail-5 = Jaze tag, detail-6 = green tee
      {
        type: 'image',
        width: 'full',
        src: jz.cover.src,
        alt: manifestAlt(jz.cover.alt),
        width_px: jz.cover.width,
        height_px: jz.cover.height,
        priority: true,
      },
      {
        type: 'image',
        width: 'half',
        src: jz.detail[0].src,
        alt: manifestAlt(jz.detail[0].alt),
        width_px: jz.detail[0].width,
        height_px: jz.detail[0].height,
      },
      {
        type: 'image',
        width: 'half',
        src: jz.detail[1].src,
        alt: manifestAlt(jz.detail[1].alt),
        width_px: jz.detail[1].width,
        height_px: jz.detail[1].height,
      },
      {
        type: 'text',
        background: '#ffeac5',
        textColor: '#0b3811',
        body: 'Jaze es una marca de ropa cristiana que prioriza la excelencia, la calidad de sus materiales y un servicio impecable por encima de cualquier otra cosa. Mantiene una identidad visual sobria, atemporal y profundamente equilibrada, donde una paleta de colores tierra —con tonos crema, amarillo suave, verde oliva y verde bosque— evoca una sofisticación orgánica y serena. La combinación de sus tipografías, encabezada por la elegancia con altura de una tipografía con serifa como Alga junto a la limpieza de Lato, construye una estética minimalista y fresca. Sus elementos ilustrados, simples y sintetizados, complementan una marca de ropa sofisticada, moderna y vanguardista creada para expresar la fe desde un diseño único y con propósito.',
      },
      {
        type: 'image',
        width: 'half',
        src: jz.detail[2].src,
        alt: manifestAlt(jz.detail[2].alt),
        width_px: jz.detail[2].width,
        height_px: jz.detail[2].height,
      },
      {
        type: 'image',
        width: 'half',
        src: jz.detail[3].src,
        alt: manifestAlt(jz.detail[3].alt),
        width_px: jz.detail[3].width,
        height_px: jz.detail[3].height,
      },
      {
        type: 'image',
        width: 'full',
        src: jz.detail[4].src,
        alt: manifestAlt(jz.detail[4].alt),
        width_px: jz.detail[4].width,
        height_px: jz.detail[4].height,
      },
      {
        type: 'image',
        width: 'full',
        src: jz.detail[5].src,
        alt: manifestAlt(jz.detail[5].alt),
        width_px: jz.detail[5].width,
        height_px: jz.detail[5].height,
      },
    ],
  },
  {
    slug: 'nayeenails',
    name: 'Nayeenails',
    summary:
      'Identidad visual para Nayeenails, un salón de uñas con una marca femenina, refinada y enfocada en una experiencia de cuidado memorable.',
    coverAlt: manifestAlt(nn.large.alt),
    coverSrc: nn.large.src,
    coverWidth: nn.large.width,
    coverHeight: nn.large.height,
    gallery: [
      // full + text + 1/2 - 1/2 + full + 1/2 - 1/2
      {
        type: 'image',
        width: 'full',
        src: nn.cover.src,
        alt: manifestAlt(nn.cover.alt),
        width_px: nn.cover.width,
        height_px: nn.cover.height,
        priority: true,
      },
      {
        type: 'text',
        background: '#72202e',
        textColor: '#f3eeea',
        body: 'Nayeenails es una marca de salón de uñas cuyo tagline refleja su filosofia de marca, la delicadeza en cada detalle y un servicio impecable por encima de cualquier otra cosa. Mantiene una identidad visual sofisticada, sutil y profundamente femenina, donde la elegancia atemporal de su concepto evoca una experiencia de belleza exclusiva y serena. La combinación de sus tipografías, encabezada por la personalidad distintiva de The Seasons junto a la limpieza y modernidad de Lato, construye una estética limpia y refinada. Su logotipo sutil y su sello icónico, diseñado a partir de la "N" de Naye, complementan una marca de cuidado personal elegante, moderna y memorable, creada para elevar la experiencia de manicura desde el diseño y la distinción.',
      },
      {
        type: 'image',
        width: 'half',
        src: nn.detail[0].src,
        alt: manifestAlt(nn.detail[0].alt),
        width_px: nn.detail[0].width,
        height_px: nn.detail[0].height,
      },
      {
        type: 'image',
        width: 'half',
        src: nn.detail[1].src,
        alt: manifestAlt(nn.detail[1].alt),
        width_px: nn.detail[1].width,
        height_px: nn.detail[1].height,
      },
      {
        type: 'image',
        width: 'full',
        src: nn.detail[2].src,
        alt: manifestAlt(nn.detail[2].alt),
        width_px: nn.detail[2].width,
        height_px: nn.detail[2].height,
      },
      {
        type: 'image',
        width: 'half',
        src: nn.detail[3].src,
        alt: manifestAlt(nn.detail[3].alt),
        width_px: nn.detail[3].width,
        height_px: nn.detail[3].height,
      },
      {
        type: 'image',
        width: 'half',
        src: nn.detail[4].src,
        alt: manifestAlt(nn.detail[4].alt),
        width_px: nn.detail[4].width,
        height_px: nn.detail[4].height,
      },
    ],
  },
  {
    slug: 'simbi-cakes',
    name: 'Simbi Cakes',
    summary:
      'Branding para Simbi Cakes, una marca de tortas y galletas artesanales para perros con una identidad alegre, cercana y festiva.',
    coverAlt: manifestAlt(sc.large.alt),
    coverSrc: sc.large.src,
    coverWidth: sc.large.width,
    coverHeight: sc.large.height,
    gallery: [
      // full + 1/2 - 1/2 + full + text + full + full + 1/2 - 1/2
      {
        type: 'image',
        width: 'full',
        src: sc.cover.src,
        alt: manifestAlt(sc.cover.alt),
        width_px: sc.cover.width,
        height_px: sc.cover.height,
        priority: true,
      },
      {
        type: 'image',
        width: 'half',
        src: sc.detail[0].src,
        alt: manifestAlt(sc.detail[0].alt),
        width_px: sc.detail[0].width,
        height_px: sc.detail[0].height,
      },
      {
        type: 'image',
        width: 'half',
        src: sc.detail[1].src,
        alt: manifestAlt(sc.detail[1].alt),
        width_px: sc.detail[1].width,
        height_px: sc.detail[1].height,
      },
      {
        type: 'image',
        width: 'full',
        src: sc.detail[2].src,
        alt: manifestAlt(sc.detail[2].alt),
        width_px: sc.detail[2].width,
        height_px: sc.detail[2].height,
      },
      {
        type: 'text',
        background: '#fffbd6',
        textColor: '#810c18',
        body: 'Simbi Cake’s es una marca de tortas y galletas artesanales para perros, creada para celebrar el amor incondicional que nuestros mejores amigos peludos nos dan día a día. Mantiene un estilo visual alegre, festivo y cercano, donde los tonos cálidos, pasteles y los detalles ilustrados —como el sombrerito de fiesta y el perfil del perrito en su isotipo— nos transmiten una esencia amigable, dulce y divertida. Su tipografía redondeada e imponente proyecta la confianza y la calidad de una marca profesional que entiende a los animales como parte fundamental de la familia.',
      },
      {
        type: 'image',
        width: 'full',
        src: sc.detail[3].src,
        alt: manifestAlt(sc.detail[3].alt),
        width_px: sc.detail[3].width,
        height_px: sc.detail[3].height,
      },
      {
        type: 'image',
        width: 'full',
        src: sc.detail[4].src,
        alt: manifestAlt(sc.detail[4].alt),
        width_px: sc.detail[4].width,
        height_px: sc.detail[4].height,
      },
      {
        type: 'image',
        width: 'half',
        src: sc.detail[5].src,
        alt: manifestAlt(sc.detail[5].alt),
        width_px: sc.detail[5].width,
        height_px: sc.detail[5].height,
      },
      {
        type: 'image',
        width: 'half',
        src: sc.detail[6].src,
        alt: manifestAlt(sc.detail[6].alt),
        width_px: sc.detail[6].width,
        height_px: sc.detail[6].height,
      },
    ],
  },
  {
    slug: 'veritomom',
    name: 'Veritomom',
    summary:
      'Identidad visual para Veritomom, una marca lifestyle para mujeres con una personalidad fresca, cercana y llena de color.',
    coverAlt: manifestAlt(vm.large.alt),
    coverSrc: vm.large.src,
    coverWidth: vm.large.width,
    coverHeight: vm.large.height,
    gallery: [
      // full + 1/2 - 1/2 + text + 1/2 - 1/2 + full + full
      {
        type: 'image',
        width: 'full',
        src: vm.cover.src,
        alt: manifestAlt(vm.cover.alt),
        width_px: vm.cover.width,
        height_px: vm.cover.height,
        priority: true,
      },
      {
        type: 'image',
        width: 'half',
        src: vm.detail[0].src,
        alt: manifestAlt(vm.detail[0].alt),
        width_px: vm.detail[0].width,
        height_px: vm.detail[0].height,
      },
      {
        type: 'image',
        width: 'half',
        src: vm.detail[1].src,
        alt: manifestAlt(vm.detail[1].alt),
        width_px: vm.detail[1].width,
        height_px: vm.detail[1].height,
      },
      {
        type: 'text',
        background: '#accfed',
        textColor: '#881b30',
        body: 'Veritomom es una marca de lifestyle fresca, amigable y joven que acompaña a las mujeres como una amiga cercana. Su identidad visual se apoya en una equilibrada paleta de verde, vino tinto, amarillo mantequilla y naranja que evoca vitalidad y cercanía. La personalidad de su tipografía display Losera, junto a la limpieza neutral de Neue Montreal y el acento femenino de Parisienne, construye una estética refinada y aesthetic. Un logotipo intervenido y un isotipo cargado de historia completan una marca auténtica y memorable, pensada para conectar en el día a día sin filtros.',
      },
      {
        type: 'image',
        width: 'half',
        src: vm.detail[2].src,
        alt: manifestAlt(vm.detail[2].alt),
        width_px: vm.detail[2].width,
        height_px: vm.detail[2].height,
      },
      {
        type: 'image',
        width: 'half',
        src: vm.detail[3].src,
        alt: manifestAlt(vm.detail[3].alt),
        width_px: vm.detail[3].width,
        height_px: vm.detail[3].height,
      },
      {
        type: 'image',
        width: 'full',
        src: vm.detail[4].src,
        alt: manifestAlt(vm.detail[4].alt),
        width_px: vm.detail[4].width,
        height_px: vm.detail[4].height,
      },
      {
        type: 'image',
        width: 'full',
        src: vm.detail[5].src,
        alt: manifestAlt(vm.detail[5].alt),
        width_px: vm.detail[5].width,
        height_px: vm.detail[5].height,
      },
    ],
  },
  {
    slug: 'crea-desde-cero',
    name: 'Crea desde Cero',
    summary:
      'Branding para Crea desde Cero Academy, una academia de emprendimiento femenino enfocada en creatividad, formación y propósito.',
    coverAlt: manifestAlt(cc.large.alt),
    coverSrc: cc.large.src,
    coverWidth: cc.large.width,
    coverHeight: cc.large.height,
    gallery: [
      // full + text + 1/2 - 1/2 + 1/2 - 1/2 + full
      {
        type: 'image',
        width: 'full',
        src: cc.cover.src,
        alt: manifestAlt(cc.cover.alt),
        width_px: cc.cover.width,
        height_px: cc.cover.height,
        priority: true,
      },
      {
        type: 'text',
        background: '#fff9f4',
        textColor: '#24344d',
        body: 'Crea desde cero academy, es una academia de emprendimiento femenino, cercana y espiritual que guía a las mujeres a descubrir su propósito a través del mundo del estampado y la creatividad. Su identidad visual se apoya en una serena paleta de azules profesionales, tonos rosados y beige que evoca calma, confianza y una profunda paz. La elegancia sofisticada de Playfair Display, junto a la limpieza y claridad neutral de Lato, construye una estética profesional, equilibrada y acogedora. Una marcada energía de mentora y cuidadora completa una marca sólida, inspiradora y memorable, pensada para impulsar a cada mujer a emprender desde la fe, el conocimiento y la pasión.',
      },
      {
        type: 'image',
        width: 'half',
        src: cc.detail[0].src,
        alt: manifestAlt(cc.detail[0].alt),
        width_px: cc.detail[0].width,
        height_px: cc.detail[0].height,
      },
      {
        type: 'image',
        width: 'half',
        src: cc.detail[1].src,
        alt: manifestAlt(cc.detail[1].alt),
        width_px: cc.detail[1].width,
        height_px: cc.detail[1].height,
      },
      {
        type: 'image',
        width: 'half',
        src: cc.detail[2].src,
        alt: manifestAlt(cc.detail[2].alt),
        width_px: cc.detail[2].width,
        height_px: cc.detail[2].height,
      },
      {
        type: 'image',
        width: 'half',
        src: cc.detail[3].src,
        alt: manifestAlt(cc.detail[3].alt),
        width_px: cc.detail[3].width,
        height_px: cc.detail[3].height,
      },
      {
        type: 'image',
        width: 'full',
        src: cc.detail[4].src,
        alt: manifestAlt(cc.detail[4].alt),
        width_px: cc.detail[4].width,
        height_px: cc.detail[4].height,
      },
    ],
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
