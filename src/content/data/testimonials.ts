/**
 * Home-page testimonials. The Figma shows three cards in a stacked
 * arrangement (one front navy card overlapping two burgundy cards behind).
 * The PNG reference only has two names legible (Nayely Urdenata,
 * Verónica Domínguez); the third is a documented TODO placeholder
 * pending real copy from the studio (Q01).
 *
 * The front card has a small Playfair-italic editorial mark
 * (e.g. "Lo que más me gustó…") above the body quote; only the cards
 * with that treatment set `mark`. The other cards omit it.
 *
 * Each entry is a stable record:
 *   - `id` — machine key.
 *   - `mark` — small Playfair-italic editorial mark (optional).
 *   - `quote` — the testimonial body copy.
 *   - `author` — full name.
 *   - `role` — short role or brand handle.
 *   - `cardColor` — the card's background tone.
 *   - `order` — display order in the stack (0 = front).
 */

export type TestimonialCardColor = 'navy' | 'burgundy' | 'orange' | 'yellow';

export type Testimonial = {
  readonly id: string;
  readonly mark?: string;
  readonly quote: string;
  readonly author: string;
  readonly role: string;
  readonly cardColor: TestimonialCardColor;
  readonly order: number;
};

export const testimonials: readonly Testimonial[] = [
  {
    id: 'nayely-urdenata',
    quote:
      '¡Me encantó la experiencia con ustedes! Son un grupo organizado y que saben escuchar las peticiones de sus clientes, por lo menos contigo me sentí muy cómoda y segura al tomar la decisión de cambiar mi marca por completo',
    author: 'Nayely Urdenata',
    role: 'Identidad visual · Nayeenails',
    cardColor: 'orange',
    order: 0,
  },
  {
    id: 'veronica-dominguez',
    quote:
      'Lo que más me gustó fue que no solo entendieron lo que quería transmitir, sino que lograron ver cosas que yo misma todavía no veía… Cada detalle tuvo una intención y el resultado superó por completo mis expectativas.',
    author: 'Verónica Domínguez',
    role: 'Identidad visual · Veritomom',
    cardColor: 'navy',
    order: 1,
  },
  {
    id: 'oriana-dalessio',
    quote:
      ' Noi de verdad entendió perfectamente lo que quería recrear para mi marca. Diseño el pendón para mi evento de maquillaje y los stickers que sublimamos en las tote bags, y honestamente no sé cuál de los dos diseños me dejó más enamorada.',
    author: "Oriana D'alessio",
    role: 'Diseño gráfico · Evolve You',
    cardColor: 'burgundy',
    order: 2,
  },
  {
    id: 'dayana-rodriguez',
    quote:
      'Graciassss chicassss, ame demasiado cada detalle, ahora la  academia no solo me representa sino que habla por sí sola. Felicidades por tu equipo de trabajo, AMEEE demasiado',
    author: 'Dayana Rodriguez',
    role: 'Diseño gráfico · Crea Desde Cero Academy',
    cardColor: 'yellow',
    order: 3,
  },
] as const;
