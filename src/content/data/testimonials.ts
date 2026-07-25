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

export type TestimonialCardColor = 'navy' | 'burgundy';

export type Testimonial = {
  readonly id: string;
  readonly mark?: string;
  readonly quote: string;
  readonly author: string;
  readonly role: string;
  readonly cardColor: TestimonialCardColor;
  readonly order: 0 | 1 | 2;
};

export const testimonials: readonly Testimonial[] = [
  {
    id: 'nayely-urdenata',
    quote:
      'Me encantó la experiencia de trabajar con ellas. Lograron captar las ideas que tenía en mi cabeza, escuchando lo que quería y haciendo mucho más de lo que imaginé. Las recomiendo sin dudarlo, son un equipo de primera.',
    author: 'Nayely Urdenata',
    role: '@nayelyurdenata · Nutricionista',
    cardColor: 'burgundy',
    order: 2,
  },
  {
    id: 'veronica-dominguez',
    mark: 'Lo que más me gustó…',
    quote:
      'Lo que más me gustó fue que no solo entendieron lo que quería transmitir, sino que hicieron suyo ese proceso para darme todo lo que mi marca necesitaba. Cada detalle tuvo una intención y el resultado superó por completo mis expectativas.',
    author: 'Verónica Domínguez',
    role: '@veritomom · Verito Mom',
    cardColor: 'navy',
    order: 0,
  },
  {
    id: 'TODO-testimonial-3',
    quote: 'TODO testimonial copy',
    author: 'TODO Author',
    role: 'TODO Role',
    cardColor: 'burgundy',
    order: 1,
  },
] as const;
