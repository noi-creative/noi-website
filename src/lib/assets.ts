/**
 * Source of truth for every visual asset in the site.
 *
 * Every entry exposes its public path plus metadata needed by `next/image`
 * (width/height for raster assets) and accessibility hooks (`alt`).
 *
 * `alt: null` is a deliberate TODO marker. The build-time test in
 * `tests/assets.test.ts` fails while any slot remains `null`; the goal
 * is to keep the count at zero. Decorative assets use `alt: ''`.
 *
 * A whole slot can also be `null` (e.g. a missing team portrait) to
 * signal "no asset yet — implementation must guard against this".
 *
 *
 * Conventions:
 *   - Slugs are kebab-case, ASCII, no diacritics.
 *   - Each project in `proyectos/[slug]/` is self-contained:
 *       -large.jpg  → card on /portafolio (index)
 *       -med.png    → card on / (home carousel)
 *       -cover.jpg  → hero of /portafolio/[slug]
 *       portafolio/detail-N.jpg → gallery of /portafolio/[slug]
 *   - Stickers are grouped as `type.variant` (for example, `bombilla.rojo`).
 *   - This nesting convention is exclusive to stickers and must not be reproduced in the other asset sections.
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
      figura1: { src: '/images/shared/figuras/figura-1.svg', alt: '' },
      figura2: { src: '/images/shared/figuras/figura-2.svg', alt: '' },
      figura3: { src: '/images/shared/figuras/figura-3.svg', alt: '' },
      figura4: { src: '/images/shared/figuras/figura-4.svg', alt: '' },
      ovaloCrema: { src: '/images/shared/figuras/ovalo-crema.svg', alt: '' },
      ovalosBackground: { src: '/images/shared/figuras/ovalos-background.svg', alt: '' },
      ovalosInk: { src: '/images/shared/figuras/ovalos-ink.svg', alt: '' },
      semiCirculoAzul: {
        src: '/images/shared/figuras/semi-circulo-azul.svg',
        alt: '',
      },
      semiCirculoNaranja: {
        src: '/images/shared/figuras/semi-circulo-naranja.svg',
        alt: '',
      },
      semiOvalosBlancos: { src: '/images/shared/figuras/semi-ovalos-blancos.svg', alt: '' },
    },
    stickers: {
      bombilla: {
        rojo: { src: '/images/shared/stickers/sticker-bombilla-roja.svg', alt: '' },
      },
      calendario: {
        azul: { src: '/images/shared/stickers/sticker-calendario-azul.svg', alt: '' },
        rojo: { src: '/images/shared/stickers/sticker-calendario-rojo.svg', alt: '' },
      },
      celular: {
        azul: { src: '/images/shared/stickers/sticker-celular-azul.svg', alt: '' },
        naranja: { src: '/images/shared/stickers/sticker-celular-naranja.svg', alt: '' },
      },
      laptop: {
        celeste: { src: '/images/shared/stickers/sticker-laptop-celeste.svg', alt: '' },
      },
      manos: {
        azul: { src: '/images/shared/stickers/sticker-manos-azul.svg', alt: '' },
        naranja: { src: '/images/shared/stickers/sticker-manos-naranja.svg', alt: '' },
        rojo: { src: '/images/shared/stickers/sticker-manos-rojo.svg', alt: '' },
      },
      megafono: {
        blanco: { src: '/images/shared/stickers/sticker-megafono-blanco.svg', alt: '' },
        rojo: { src: '/images/shared/stickers/sticker-megafono-rojo.svg', alt: '' },
      },
      telefono: {
        azul: { src: '/images/shared/stickers/sticker-telefono-azul.svg', alt: '' },
      },
      telefonoDescolgado: {
        azul: { src: '/images/shared/stickers/sticker-telefono-descolgado-azul.svg', alt: '' },
      },
      burbujaTexto: {
        naranja: { src: '/images/shared/stickers/sticker-text-booble-naranja.svg', alt: '' },
      },
      webDesign: {
        ink: { src: '/images/shared/stickers/sticker-web-design-ink.svg', alt: '' },
      },
      clip: {
        naranja: { src: '/images/shared/stickers/stickers-clip-naranja.svg', alt: '' },
      },
    },
  },
  home: {
    heroCollage: [
      {
        src: '/images/pages/home/hero-collage-1.png',
        width: 160,
        height: 20,
        alt: 'Persona trabajando en su laptop',
      },
      {
        src: '/images/pages/home/hero-collage-2.png',
        width: 290,
        height: 354,
        alt: 'Persona trabajando con material de marca',
      },
      {
        src: '/images/pages/home/hero-collage-3.png',
        width: 252,
        height: 300,
        alt: 'Persona revisando su teléfono y un cuaderno',
      },
    ],
    headerWheel: [
      {
        src: '/images/pages/home/header-wheel-1.jpg',
        width: 348,
        height: 282,
        alt: 'Muestra de proyecto 1',
      },
      {
        src: '/images/pages/home/header-wheel-2.jpg',
        width: 348,
        height: 282,
        alt: 'Muestra de proyecto 2',
      },
      {
        src: '/images/pages/home/header-wheel-3.jpg',
        width: 348,
        height: 282,
        alt: 'Muestra de proyecto 3',
      },
      {
        src: '/images/pages/home/header-wheel-4.jpg',
        width: 348,
        height: 278,
        alt: 'Muestra de proyecto 4',
      },
      {
        src: '/images/pages/home/header-wheel-5.jpg',
        width: 347,
        height: 282,
        alt: 'Muestra de proyecto 5',
      },
      {
        src: '/images/pages/home/header-wheel-6.jpg',
        width: 347,
        height: 282,
        alt: 'Muestra de proyecto 6',
      },
      {
        src: '/images/pages/home/header-wheel-7.jpg',
        width: 347,
        height: 282,
        alt: 'Muestra de proyecto 7',
      },
      {
        src: '/images/pages/home/header-wheel-8.jpg',
        width: 348,
        height: 278,
        alt: 'Muestra de proyecto 8',
      },
      {
        src: '/images/pages/home/header-wheel-9.jpg',
        width: 348,
        height: 278,
        alt: 'Muestra de proyecto 9',
      },
    ],
    sectionBrandingPortrait: {
      src: '/images/pages/home/section-branding-portrait.webp',
      width: 850,
      height: 1018,
      alt: 'Mujer leyendo un libro con concentración',
    },
    ctaCollage: [
      {
        src: '/images/pages/home/hero-collage-1.jpg',
        width: 348,
        height: 422,
        alt: 'Persona trabajando en su laptop',
      },
      {
        src: '/images/pages/home/hero-collage-2.jpg',
        width: 646,
        height: 766,
        alt: 'Persona trabajando con material de marca',
      },
      {
        src: '/images/pages/home/hero-collage-3.webp',
        width: 573,
        height: 652,
        alt: 'Persona revisando su teléfono y un cuaderno',
      },
    ],
  },
  nosotras: {
    teamIllustration: {
      src: '/images/pages/nosotras/section-devolver.webp',
      width: 894,
      height: 778,
      alt: 'Ilustración lineal de tres mujeres del equipo de NOI',
    },
    sectionDevolver: [
      {
        src: '/images/pages/nosotras/team-illustration.webp',
        width: 982,
        height: 1052,
        alt: 'Las tres integrantes de NOI trabajando juntas en una mesa',
      },
    ],
    teamPortraits: [
      {
        src: '/images/pages/nosotras/team-portrait-1.webp',
        width: 658,
        height: 840,
        alt: 'Daniela — Founder & Brand Strategist',
      },
      {
        src: '/images/pages/nosotras/team-portrait-2.webp',
        width: 658,
        height: 840,
        alt: 'María Patricia — Creative Director',
      },
      {
        src: '/images/pages/nosotras/team-portrait-3.webp',
        width: 657,
        height: 840,
        alt: 'Carla — Brand & Project Coordinator',
      },
    ],
  },
  contacto: {
    hero: [
      {
        src: '/images/pages/contacto/contact-hero-1.webp',
        width: 245,
        height: 300,
        alt: 'Integrante de NOI hablando por teléfono con un cliente',
      },
      {
        src: '/images/pages/contacto/contact-hero-2.webp',
        width: 245,
        height: 300,
        alt: 'Integrante de NOI revisando un proyecto en su laptop',
      },
    ],
  },
  proyectos: {
    'content-lab': {
      large: {
        src: '/images/proyectos/content-lab/content-lab-large.webp',
        width: 1184,
        height: 1356,
        alt: 'Papelería roja y crema de JS/Content Lab con código QR y datos de contacto',
      },
      med: {
        src: '/images/proyectos/content-lab/content-lab-med.webp',
        width: 530,
        height: 552,
        alt: 'Papelería de JS/Content Lab en rojo y crema',
      },
      cover: {
        src: '/images/proyectos/content-lab/content-lab-cover.webp',
        width: 1440,
        height: 990,
        alt: 'Logotipo de JS/Content Lab en blanco sobre fondo negro',
      },
      detail: [
        {
          src: '/images/proyectos/content-lab/portafolio/detail-1.webp',
          width: 1440,
          height: 831,
          alt: 'Aplicaciones de identidad de JS/Content Lab en papelería roja y crema',
        },
        {
          src: '/images/proyectos/content-lab/portafolio/detail-2.webp',
          width: 720,
          height: 730,
          alt: 'Propuesta de contenido de JS/Content Lab en formato impreso y móvil',
        },
        {
          src: '/images/proyectos/content-lab/portafolio/detail-3.webp',
          width: 720,
          height: 730,
          alt: 'Sudaderas negras y grises con la identidad The Real Content Lab',
        },
      ],
    },
    jaze: {
      large: {
        src: '/images/proyectos/jaze/jaze-large.webp',
        width: 1184,
        height: 1348,
        alt: 'Etiqueta textil crema de la marca de ropa Jaze',
      },
      med: {
        src: '/images/proyectos/jaze/jaze-med.webp',
        width: 530,
        height: 552,
        alt: 'Etiqueta de ropa Jaze con monograma y talla M',
      },
      cover: {
        src: '/images/proyectos/jaze/jaze-cover.webp',
        width: 1440,
        height: 999,
        alt: 'Logotipo verde de Jaze sobre una textura de lino blanco',
      },
      detail: [
        {
          src: '/images/proyectos/jaze/portafolio/detail-1.webp',
          width: 1440,
          height: 827,
          alt: 'Patrón gráfico de Jaze con símbolos florales en verde y crema',
        },
        {
          src: '/images/proyectos/jaze/portafolio/detail-2.webp',
          width: 1440,
          height: 1450,
          alt: 'Diseño de etiqueta textil Jaze con monograma, nombre y medidas',
        },
        {
          src: '/images/proyectos/jaze/portafolio/detail-3.webp',
          width: 719,
          height: 723,
          alt: 'Símbolo floral de Jaze bordado sobre una prenda verde',
        },
        {
          src: '/images/proyectos/jaze/portafolio/detail-4.webp',
          width: 720,
          height: 724,
          alt: 'Tarjeta de cuidados para prendas de Jaze en tonos tierra',
        },
        {
          src: '/images/proyectos/jaze/portafolio/detail-5.webp',
          width: 721,
          height: 726,
          alt: 'Monograma de Jaze en crema sobre fondo verde',
        },
        {
          src: '/images/proyectos/jaze/portafolio/detail-6.webp',
          width: 721,
          height: 726,
          alt: 'Sudadera crema de Jaze con etiqueta y parche floral bordado',
        },
      ],
    },
    nayeenails: {
      large: {
        src: '/images/proyectos/nayeenails/nayeenails-large.webp',
        width: 1184,
        height: 1356,
        alt: 'Mano con manicura natural sosteniendo un esmalte con el monograma de Nayeenails',
      },
      med: {
        src: '/images/proyectos/nayeenails/nayeenails-med.webp',
        width: 530,
        height: 552,
        alt: 'Esmalte de uñas con la identidad de Nayeenails',
      },
      cover: {
        src: '/images/proyectos/nayeenails/nayeenails-cover.webp',
        width: 1440,
        height: 999,
        alt: 'Logotipo borgoña de Nayeenails con su monograma ovalado',
      },
      detail: [
        {
          src: '/images/proyectos/nayeenails/portafolio/detail-1.webp',
          width: 1440,
          height: 822,
          alt: 'Aplicación del monograma de Nayeenails en un frasco de esmalte',
        },
        {
          src: '/images/proyectos/nayeenails/portafolio/detail-2.webp',
          width: 728,
          height: 735,
          alt: 'Monograma ovalado de Nayeenails en color borgoña',
        },
        {
          src: '/images/proyectos/nayeenails/portafolio/detail-3.webp',
          width: 718,
          height: 703,
          alt: 'Logotipo de Nayeenails grabado sobre una textura verde oliva',
        },
        {
          src: '/images/proyectos/nayeenails/portafolio/detail-4.webp',
          width: 722,
          height: 721,
          alt: 'Tarjetas de presentación de Nayeenails sobre una fotografía de manicura',
        },
        {
          src: '/images/proyectos/nayeenails/portafolio/detail-5.webp',
          width: 728,
          height: 735,
          alt: 'Tarjeta de presentación y tarjeta de fidelidad de Nayeenails',
        },
      ],
    },
    'simbi-cakes': {
      large: {
        src: '/images/proyectos/simbi-cakes/simbi-cakes-large.webp',
        width: 1184,
        height: 1348,
        alt: 'Galletas para perros de Simbi Cakes con formas de hueso y huella',
      },
      med: {
        src: '/images/proyectos/simbi-cakes/simbi-cakes-med.webp',
        width: 530,
        height: 552,
        alt: 'Galletas artesanales para perros de Simbi Cakes',
      },
      cover: {
        src: '/images/proyectos/simbi-cakes/simbi-cakes-cover.webp',
        width: 2880,
        height: 2042,
        alt: 'Logotipo de Simbi Cakes grabado sobre una textura de galleta',
      },
      detail: [
        {
          src: '/images/proyectos/simbi-cakes/portafolio/detail-1.webp',
          width: 2880,
          height: 1652,
          alt: 'Perro con pañuelo rosa de Simbi Cakes',
        },
        {
          src: '/images/proyectos/simbi-cakes/portafolio/detail-2.webp',
          width: 2880,
          height: 1640,
          alt: 'Placa amarilla con forma de hueso y logotipo de Simbi Cakes',
        },
        {
          src: '/images/proyectos/simbi-cakes/portafolio/detail-3.webp',
          width: 2880,
          height: 1676,
          alt: 'Sistema de ilustraciones de Simbi Cakes con perros, huesos, huellas y elementos de fiesta',
        },
        {
          src: '/images/proyectos/simbi-cakes/portafolio/detail-4.webp',
          width: 1460,
          height: 1470,
          alt: 'Perro con gorra de Simbi Cakes junto a una torta decorada para mascotas',
        },
        {
          src: '/images/proyectos/simbi-cakes/portafolio/detail-5.webp',
          width: 1428,
          height: 1450,
          alt: 'Tarjeta promocional de Simbi Cakes junto a una torta de cumpleaños para perros',
        },
        {
          src: '/images/proyectos/simbi-cakes/portafolio/detail-6.webp',
          width: 1454,
          height: 1476,
          alt: 'Galletas de Simbi Cakes con formas de hueso y huella en un tazón',
        },
        {
          src: '/images/proyectos/simbi-cakes/portafolio/detail-7.webp',
          width: 1460,
          height: 1470,
          alt: 'Etiqueta de empaque de Simbi Cakes para galletas naturales de perros',
        },
      ],
    },
    veritomom: {
      large: {
        src: '/images/proyectos/veritomom/veritomom-large.webp',
        width: 1184,
        height: 1356,
        alt: 'Bolsa borgoña de Veritomom con patrón de monogramas crema',
      },
      med: {
        src: '/images/proyectos/veritomom/veritomom-med.webp',
        width: 530,
        height: 552,
        alt: 'Bolsa de tela con la identidad visual de Veritomom',
      },
      cover: {
        src: '/images/proyectos/veritomom/veritomom-cover.webp',
        width: 1440,
        height: 995,
        alt: 'Logotipo de Veritomom en borgoña y rosa sobre fondo crema',
      },
      detail: [
        {
          src: '/images/proyectos/veritomom/portafolio/detail-1.webp',
          width: 1440,
          height: 821,
          alt: 'Monograma de Veritomom en borgoña y rosa sobre fondo naranja',
        },
        {
          src: '/images/proyectos/veritomom/portafolio/detail-2.webp',
          width: 1440,
          height: 823,
          alt: 'Mujer llevando una bolsa naranja con el patrón de Veritomom',
        },
        {
          src: '/images/proyectos/veritomom/portafolio/detail-3.webp',
          width: 721,
          height: 810,
          alt: 'Bolsa borgoña con monogramas de Veritomom junto a una silla',
        },
        {
          src: '/images/proyectos/veritomom/portafolio/detail-4.webp',
          width: 805,
          height: 810,
          alt: 'Botella borgoña de Veritomom en una bolsa de compras',
        },
        {
          src: '/images/proyectos/veritomom/portafolio/detail-5.webp',
          width: 721,
          height: 726,
          alt: 'Aplicaciones de Veritomom en gorra, bolsa de tela y mensajes de marca',
        },
        {
          src: '/images/proyectos/veritomom/portafolio/detail-6.webp',
          width: 730,
          height: 732,
          alt: 'Paleta visual de Veritomom inspirada en frutas, crema, flores, hojas y agua',
        },
      ],
    },
    'crea-desde-cero': {
      large: {
        src: '/images/proyectos/crea-desde-cero/crea-desde-cero-large.webp',
        width: 1184,
        height: 1356,
        alt: 'Tarjetas de presentación de Crea desde Cero en azul marino y blanco',
      },
      med: {
        src: '/images/proyectos/crea-desde-cero/crea-desde-cero-med.webp',
        width: 530,
        height: 552,
        alt: 'Gorra crema de Crea desde Cero con monograma bordado',
      },
      cover: {
        src: '/images/proyectos/crea-desde-cero/crea-desde-cero-cover.webp',
        width: 1440,
        height: 1002,
        alt: 'Logotipo azul marino de Crea desde Cero sobre fondo crema',
      },
      detail: [
        {
          src: '/images/proyectos/crea-desde-cero/portafolio/detail-1.webp',
          width: 1436,
          height: 648,
          alt: 'Certificado de formación de Crea desde Cero Academy',
        },
        {
          src: '/images/proyectos/crea-desde-cero/portafolio/detail-2.webp',
          width: 716,
          height: 720,
          alt: 'Gorra de Crea desde Cero con el mensaje Tú no creas solo un negocio, te creas a ti misma',
        },
        {
          src: '/images/proyectos/crea-desde-cero/portafolio/detail-3.webp',
          width: 722,
          height: 720,
          alt: 'Monograma de Crea desde Cero con su mensaje de marca sobre una escena de taller',
        },
        {
          src: '/images/proyectos/crea-desde-cero/portafolio/detail-4.webp',
          width: 720,
          height: 720,
          alt: 'Emprendedora sosteniendo un anuncio de lanzamiento de Crea desde Cero Academy',
        },
        {
          src: '/images/proyectos/crea-desde-cero/portafolio/detail-5.webp',
          width: 716,
          height: 720,
          alt: 'Identidad de Crea desde Cero aplicada en una laptop y tarjetas de presentación',
        },
      ],
    },
  },
} as const;

export type AssetsManifest = typeof assets;
export type ProyectoSlug = keyof typeof assets.proyectos;
