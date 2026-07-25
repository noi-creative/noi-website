/**
 * Source of truth for every visual asset in the site.
 *
 * Every entry exposes its public path plus metadata needed by `next/image`
 * (width/height for raster assets) and accessibility hooks (`alt`).
 *
 * `alt: null` is a deliberate TODO marker. The build-time test in
 * `tests/assets.test.ts` logs how many TODOs remain but does not fail;
 * the goal is to drive the count to zero before launch.
 *
 * A whole slot can also be `null` (e.g. a missing team portrait) to
 * signal "no asset yet — implementation must guard against this".
 *
 * Conventions:
 *   - Slugs are kebab-case, ASCII, no diacritics.
 *   - Each project in `proyectos/[slug]/` is self-contained:
 *       -large.jpg  → card on /portafolio (index)
 *       -med.png    → card on / (home carousel)
 *       -cover.jpg  → hero of /portafolio/[slug]
 *       portafolio/detail-N.jpg → gallery of /portafolio/[slug]
 */

export type RasterAsset = {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string | null;
};

export type SvgAsset = {
  readonly src: string;
  readonly alt: string | null;
};

const tbd: null = null;

export const assets = {
  shared: {
    logo: {
      noiAzul: { src: '/images/shared/logo/noi-azul.svg', alt: 'NOI' },
      noiBlanco: { src: '/images/shared/logo/noi-blanco.svg', alt: 'NOI' },
      creativeAmarillo: {
        src: '/images/shared/logo/creative-amarillo.svg',
        alt: 'creative',
      },
      creativeRojo: {
        src: '/images/shared/logo/creative-rojo.svg',
        alt: 'creative',
      },
    },
    iconos: {
      email: { src: '/images/shared/iconos/icon-email.svg', alt: 'Email' },
      emailSoft: {
        src: '/images/shared/iconos/icon-email-soft.svg',
        alt: 'Email',
      },
      location: {
        src: '/images/shared/iconos/icon-location.svg',
        alt: 'Ubicación',
      },
      instagram: {
        src: '/images/shared/iconos/icon-instagram.svg',
        alt: 'Instagram',
      },
      linkedin: {
        src: '/images/shared/iconos/icon-linkedin.svg',
        alt: 'LinkedIn',
      },
      tiktok: { src: '/images/shared/iconos/icon-tiktok.svg', alt: 'TikTok' },
      whatsapp: {
        src: '/images/shared/iconos/icon-whatsapp.svg',
        alt: 'WhatsApp',
      },
    },
    figuras: {
      figura1: { src: '/images/shared/figuras/figura-1.svg', alt: tbd },
      figura2: { src: '/images/shared/figuras/figura-2.svg', alt: tbd },
      semiCirculoAzul: {
        src: '/images/shared/figuras/semi-circulo-azul.svg',
        alt: tbd,
      },
      semiCirculoNaranja: {
        src: '/images/shared/figuras/semi-circulo-naranja.svg',
        alt: tbd,
      },
    },
    stickers: {
      blobCeleste: {
        src: '/images/shared/stickers/sticker-blob-celeste.svg',
        alt: tbd,
      },
      blobAmarillo: {
        src: '/images/shared/stickers/sticker-blob-amarillo.svg',
        alt: tbd,
      },
      bombillaAmarilla: {
        src: '/images/shared/stickers/sticker-bombilla-amarilla.svg',
        alt: tbd,
      },
      doodleMarino: {
        src: '/images/shared/stickers/sticker-doodle-marino.svg',
        alt: tbd,
      },
      ilustracion03: {
        src: '/images/shared/stickers/sticker-ilustracion-03.svg',
        alt: tbd,
      },
      ilustracion04: {
        src: '/images/shared/stickers/sticker-ilustracion-04.svg',
        alt: tbd,
      },
      ilustracion08: {
        src: '/images/shared/stickers/sticker-ilustracion-08.svg',
        alt: tbd,
      },
      laptopCeleste: {
        src: '/images/shared/stickers/sticker-laptop-celeste.svg',
        alt: tbd,
      },
      manosAzul: {
        src: '/images/shared/stickers/sticker-manos-azul.svg',
        alt: tbd,
      },
      manosNaranja: {
        src: '/images/shared/stickers/sticker-manos-naranja.svg',
        alt: tbd,
      },
      manosRojo: {
        src: '/images/shared/stickers/sticker-manos-rojo.svg',
        alt: tbd,
      },
      megafonoRojo: {
        src: '/images/shared/stickers/sticker-megafono-rojo.svg',
        alt: tbd,
      },
      telefonoAmarillo: {
        src: '/images/shared/stickers/sticker-telefono-amarillo.svg',
        alt: tbd,
      },
    },
  },
  home: {
    heroCollage: [
      {
        src: '/images/pages/home/hero-collage-1.png',
        width: 348,
        height: 422,
        alt: 'Persona trabajando en su laptop',
      },
      {
        src: '/images/pages/home/hero-collage-2.png',
        width: 646,
        height: 766,
        alt: 'Persona trabajando con material de marca',
      },
      {
        src: '/images/pages/home/hero-collage-3.png',
        width: 573,
        height: 652,
        alt: 'Persona revisando su teléfono y un cuaderno',
      },
    ],
    headerWheel: [
      {
        src: '/images/pages/home/header-wheel-1.png',
        width: 348,
        height: 282,
        alt: 'Muestra de proyecto 1',
      },
      {
        src: '/images/pages/home/header-wheel-2.png',
        width: 348,
        height: 282,
        alt: 'Muestra de proyecto 2',
      },
      {
        src: '/images/pages/home/header-wheel-3.png',
        width: 348,
        height: 282,
        alt: 'Muestra de proyecto 3',
      },
      {
        src: '/images/pages/home/header-wheel-4.png',
        width: 348,
        height: 278,
        alt: 'Muestra de proyecto 4',
      },
      {
        src: '/images/pages/home/header-wheel-5.png',
        width: 347,
        height: 282,
        alt: 'Muestra de proyecto 5',
      },
      {
        src: '/images/pages/home/header-wheel-6.png',
        width: 347,
        height: 282,
        alt: 'Muestra de proyecto 6',
      },
      {
        src: '/images/pages/home/header-wheel-7.png',
        width: 347,
        height: 282,
        alt: 'Muestra de proyecto 7',
      },
      {
        src: '/images/pages/home/header-wheel-8.png',
        width: 348,
        height: 278,
        alt: 'Muestra de proyecto 8',
      },
      {
        src: '/images/pages/home/header-wheel-9.png',
        width: 348,
        height: 278,
        alt: 'Muestra de proyecto 9',
      },
    ],
    sectionBrandingPortrait: {
      src: '/images/pages/home/section-branding-portrait.png',
      width: 850,
      height: 1018,
      alt: 'Mujer leyendo un libro con concentración',
    },
    ctaCollage: [
      {
        src: '/images/pages/home/hero-collage-1.png',
        width: 348,
        height: 422,
        alt: 'Persona trabajando en su laptop',
      },
      {
        src: '/images/pages/home/hero-collage-2.png',
        width: 646,
        height: 766,
        alt: 'Persona trabajando con material de marca',
      },
      {
        src: '/images/pages/home/hero-collage-3.png',
        width: 573,
        height: 652,
        alt: 'Persona revisando su teléfono y un cuaderno',
      },
    ],
  },
  nosotras: {
    teamIllustration: {
      src: '/images/pages/nosotras/section-devolver.png',
      width: 894,
      height: 778,
      alt: 'Ilustración lineal de tres mujeres del equipo de NOI',
    },
    sectionDevolver: [
      {
        src: '/images/pages/nosotras/team-illustration.png',
        width: 982,
        height: 1052,
        alt: 'Las tres integrantes de NOI trabajando juntas en una mesa',
      },
    ],
    teamPortraits: [
      {
        src: '/images/pages/nosotras/team-portrait-1.jpg',
        width: 658,
        height: 840,
        alt: 'Daniela — Founder & Brand Strategist',
      },
      {
        // María Patricia. The file used to live at `section-devolver-1.jpg`;
        // C05 moved it into the team folder as a self-documenting slot.
        src: '/images/pages/nosotras/team-portrait-2.jpg',
        width: 658,
        height: 840,
        alt: 'María Patricia — Creative Director',
      },
      {
        src: '/images/pages/nosotras/team-portrait-3.jpg',
        width: 657,
        height: 840,
        alt: 'Carla — Brand & Project Coordinator',
      },
    ],
  },
  contacto: {
    hero: [
      {
        src: '/images/pages/contacto/contact-hero-1.jpg',
        width: 552,
        height: 653,
        alt: 'Integrante de NOI hablando por teléfono con un cliente',
      },
      {
        src: '/images/pages/contacto/contact-hero-2.jpg',
        width: 489,
        height: 556,
        alt: 'Integrante de NOI revisando un proyecto en su laptop',
      },
    ],
  },
  proyectos: {
    'content-lab': {
      large: {
        src: '/images/proyectos/content-lab/content-lab-large.jpg',
        width: 1184,
        height: 1356,
        alt: tbd,
      },
      med: {
        src: '/images/proyectos/content-lab/content-lab-med.png',
        width: 530,
        height: 552,
        alt: tbd,
      },
      cover: {
        src: '/images/proyectos/content-lab/content-lab-cover.jpg',
        width: 1440,
        height: 990,
        alt: tbd,
      },
      detail: [
        {
          src: '/images/proyectos/content-lab/portafolio/detail-1.jpg',
          width: 1440,
          height: 831,
          alt: tbd,
        },
        {
          src: '/images/proyectos/content-lab/portafolio/detail-2.jpg',
          width: 720,
          height: 730,
          alt: tbd,
        },
        {
          src: '/images/proyectos/content-lab/portafolio/detail-3.jpg',
          width: 720,
          height: 730,
          alt: tbd,
        },
      ],
    },
    jaze: {
      large: {
        src: '/images/proyectos/jaze/jaze-large.jpg',
        width: 1184,
        height: 1348,
        alt: tbd,
      },
      med: {
        src: '/images/proyectos/jaze/jaze-med.png',
        width: 530,
        height: 552,
        alt: tbd,
      },
      cover: {
        src: '/images/proyectos/jaze/jaze-cover.jpg',
        width: 1440,
        height: 999,
        alt: tbd,
      },
      detail: [
        {
          src: '/images/proyectos/jaze/portafolio/detail-1.jpg',
          width: 1440,
          height: 827,
          alt: tbd,
        },
        {
          src: '/images/proyectos/jaze/portafolio/detail-2.jpg',
          width: 1440,
          height: 1450,
          alt: tbd,
        },
        {
          src: '/images/proyectos/jaze/portafolio/detail-3.jpg',
          width: 719,
          height: 723,
          alt: tbd,
        },
        {
          src: '/images/proyectos/jaze/portafolio/detail-4.jpg',
          width: 720,
          height: 724,
          alt: tbd,
        },
        {
          src: '/images/proyectos/jaze/portafolio/detail-5.jpg',
          width: 721,
          height: 726,
          alt: tbd,
        },
        {
          src: '/images/proyectos/jaze/portafolio/detail-6.jpg',
          width: 721,
          height: 726,
          alt: tbd,
        },
      ],
    },
    nayeenails: {
      large: {
        src: '/images/proyectos/nayeenails/nayeenails-large.jpg',
        width: 1184,
        height: 1356,
        alt: tbd,
      },
      med: {
        src: '/images/proyectos/nayeenails/nayeenails-med.png',
        width: 530,
        height: 552,
        alt: tbd,
      },
      cover: {
        src: '/images/proyectos/nayeenails/nayeenails-cover.jpg',
        width: 1440,
        height: 999,
        alt: tbd,
      },
      detail: [
        {
          src: '/images/proyectos/nayeenails/portafolio/detail-1.jpg',
          width: 1440,
          height: 822,
          alt: tbd,
        },
        {
          src: '/images/proyectos/nayeenails/portafolio/detail-2.jpg',
          width: 728,
          height: 735,
          alt: tbd,
        },
        {
          src: '/images/proyectos/nayeenails/portafolio/detail-3.jpg',
          width: 718,
          height: 703,
          alt: tbd,
        },
        {
          src: '/images/proyectos/nayeenails/portafolio/detail-4.jpg',
          width: 722,
          height: 721,
          alt: tbd,
        },
        {
          src: '/images/proyectos/nayeenails/portafolio/detail-5.jpg',
          width: 728,
          height: 735,
          alt: tbd,
        },
      ],
    },
    'simbi-cakes': {
      large: {
        src: '/images/proyectos/simbi-cakes/simbi-cakes-large.jpg',
        width: 1184,
        height: 1348,
        alt: tbd,
      },
      med: {
        src: '/images/proyectos/simbi-cakes/simbi-cakes-med.png',
        width: 530,
        height: 552,
        alt: tbd,
      },
      cover: {
        src: '/images/proyectos/simbi-cakes/simbi-cakes-cover.jpg',
        width: 2880,
        height: 2042,
        alt: tbd,
      },
      detail: [
        {
          src: '/images/proyectos/simbi-cakes/portafolio/detail-1.jpg',
          width: 2880,
          height: 1652,
          alt: tbd,
        },
        {
          src: '/images/proyectos/simbi-cakes/portafolio/detail-2.jpg',
          width: 2880,
          height: 1640,
          alt: tbd,
        },
        {
          src: '/images/proyectos/simbi-cakes/portafolio/detail-3.jpg',
          width: 2880,
          height: 1676,
          alt: tbd,
        },
        {
          src: '/images/proyectos/simbi-cakes/portafolio/detail-4.jpg',
          width: 1460,
          height: 1470,
          alt: tbd,
        },
        {
          src: '/images/proyectos/simbi-cakes/portafolio/detail-5.jpg',
          width: 1428,
          height: 1450,
          alt: tbd,
        },
        {
          src: '/images/proyectos/simbi-cakes/portafolio/detail-6.jpg',
          width: 1454,
          height: 1476,
          alt: tbd,
        },
        {
          src: '/images/proyectos/simbi-cakes/portafolio/detail-7.jpg',
          width: 1460,
          height: 1470,
          alt: tbd,
        },
      ],
    },
    veritomom: {
      large: {
        src: '/images/proyectos/veritomom/veritomom-large.jpg',
        width: 1184,
        height: 1356,
        alt: tbd,
      },
      med: {
        src: '/images/proyectos/veritomom/veritomom-med.png',
        width: 530,
        height: 552,
        alt: tbd,
      },
      cover: {
        src: '/images/proyectos/veritomom/veritomom-cover.jpg',
        width: 1440,
        height: 995,
        alt: tbd,
      },
      detail: [
        {
          src: '/images/proyectos/veritomom/portafolio/detail-1.jpg',
          width: 1440,
          height: 821,
          alt: tbd,
        },
        {
          src: '/images/proyectos/veritomom/portafolio/detail-2.jpg',
          width: 1440,
          height: 823,
          alt: tbd,
        },
        {
          src: '/images/proyectos/veritomom/portafolio/detail-3.jpg',
          width: 721,
          height: 810,
          alt: tbd,
        },
        {
          src: '/images/proyectos/veritomom/portafolio/detail-4.jpg',
          width: 805,
          height: 810,
          alt: tbd,
        },
        {
          src: '/images/proyectos/veritomom/portafolio/detail-5.jpg',
          width: 721,
          height: 726,
          alt: tbd,
        },
        {
          src: '/images/proyectos/veritomom/portafolio/detail-6.jpg',
          width: 730,
          height: 732,
          alt: tbd,
        },
      ],
    },
    'crea-desde-cero': {
      large: {
        src: '/images/proyectos/crea-desde-cero/crea-desde-cero-large.jpg',
        width: 1184,
        height: 1356,
        alt: tbd,
      },
      med: {
        src: '/images/proyectos/crea-desde-cero/crea-desde-cero-med.jpg',
        width: 530,
        height: 552,
        alt: tbd,
      },
      cover: {
        src: '/images/proyectos/crea-desde-cero/crea-desde-cero-cover.jpg',
        width: 1440,
        height: 1002,
        alt: tbd,
      },
      detail: [
        {
          src: '/images/proyectos/crea-desde-cero/portafolio/detail-1.jpg',
          width: 1436,
          height: 648,
          alt: tbd,
        },
        {
          src: '/images/proyectos/crea-desde-cero/portafolio/detail-2.jpg',
          width: 716,
          height: 720,
          alt: tbd,
        },
        {
          src: '/images/proyectos/crea-desde-cero/portafolio/detail-3.jpg',
          width: 722,
          height: 720,
          alt: tbd,
        },
        {
          src: '/images/proyectos/crea-desde-cero/portafolio/detail-4.jpg',
          width: 720,
          height: 720,
          alt: tbd,
        },
        {
          src: '/images/proyectos/crea-desde-cero/portafolio/detail-5.jpg',
          width: 716,
          height: 720,
          alt: tbd,
        },
      ],
    },
  },
} as const;

export type AssetsManifest = typeof assets;
export type ProyectoSlug = keyof typeof assets.proyectos;
