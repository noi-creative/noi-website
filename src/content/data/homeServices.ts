import { assets } from '@/lib/assets';

/**
 * Home-page services preview. The marketing grid on `/` shows six
 * services (P01 plan). The contact form's `serviceOptions` is a
 * four-item subset of this list; the two extra entries
 * (`branding`, `estrategia-contenido`) are preview-only.
 *
 * Each entry is a stable record:
 *   - `id` — machine key, unique.
 *   - `label` — title on the card.
 *   - `description` — short copy under the title.
 *   - `number` — the Figma-visible badge ("01" … "06").
 *   - `color` — the card's background tone (semantic token).
 *   - `iconSticker` — which shared sticker to use as the card icon.
 *   - `textTone` — text colour for the card (cream on dark surfaces,
 *     ink on light surfaces).
 */

export type HomeServiceId =
  'branding' | 'diseno-grafico' | 'diseno-web' | 'ecommerce' | 'estrategia-contenido' | 'naming';

export type HomeServiceColor = 'cream' | 'navy' | 'yellow' | 'burgundy' | 'blue' | 'orange' | 'ink';

export type HomeService = {
  readonly id: HomeServiceId;
  readonly label: string;
  readonly description: string;
  readonly number: string;
  readonly color: HomeServiceColor;
  readonly iconSticker: 'megafonoRojo' | 'laptopCeleste';
  readonly textTone: 'ink' | 'cream';
};

export const homeServices: readonly HomeService[] = [
  {
    id: 'branding',
    label: 'Branding e Identidad Visual',
    description:
      'De la plataforma estratégica al sistema visual completo. Construimos la base de tu marca para que cada comunicación se conecte con tu proyecto, no por repetición, sino por convicción.',
    number: '01',
    color: 'blue',
    iconSticker: 'megafonoRojo',
    textTone: 'ink',
  },
  {
    id: 'diseno-grafico',
    label: 'Diseño Gráfico',
    description:
      'Piezas visuales que se sostienen solas. Cada decisión gráfica responde a un objetivo claro: un sistema gráfico que se replica a sí mismo sin perder carácter.',
    number: '02',
    color: 'burgundy',
    iconSticker: 'megafonoRojo',
    textTone: 'ink',
  },
  {
    id: 'diseno-web',
    label: 'Diseño Web',
    description:
      'Sitios que funcionan bien, se ven bien y se entienden rápido. Estructura, jerarquía visual alineada con la marca, navegación honesta.',
    number: '03',
    color: 'cream',
    iconSticker: 'laptopCeleste',
    textTone: 'cream',
  },
  {
    id: 'ecommerce',
    label: 'E-commerce',
    description:
      'Tiendas digitales pensadas para vender, no para decorar. Diseño con foco, cada decisión ayuda a que el cliente compre con la misma facilidad con la que navega por la marca.',
    number: '04',
    color: 'navy',
    iconSticker: 'megafonoRojo',
    textTone: 'ink',
  },
  {
    id: 'estrategia-contenido',
    label: 'Estrategia de Contenido',
    description:
      'Qué decir, cuándo decirlo y por qué. Construimos una voz de marca reconocible que conecta con tu audiencia a través de cada punto de contacto, con la misma lógica en redes, web y materiales.',
    number: '05',
    color: 'orange',
    iconSticker: 'megafonoRojo',
    textTone: 'ink',
  },
  {
    id: 'naming',
    label: 'Naming',
    description:
      'El nombre correcto no se improvisa, se construye. Te ayudamos a encontrar una identidad verbal que represente la esencia de tu marca y la haga memorable.',
    number: '06',
    color: 'ink',
    iconSticker: 'megafonoRojo',
    textTone: 'cream',
  },
] as const;

/**
 * Map a `HomeServiceId` to the shared sticker entry from `src/lib/assets`.
 * Exported as a function so the consumer doesn't have to know the sticker
 * namespace structure.
 */
export function getStickerForService(sticker: HomeService['iconSticker']): {
  src: string;
  alt: string | null;
} {
  return assets.shared.stickers[sticker];
}
