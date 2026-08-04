import type { ButtonVariant } from '@/components/ui/Button';
import type { EyebrowTone } from '@/components/ui/Eyebrow';
import { assets } from '@/lib/assets';

export type ServiceContentKey = 'branding' | 'graphicDesign' | 'webDesign' | 'ecommerce' | 'naming';

export type ServiceTone = 'soft' | 'burgundy' | 'yellow' | 'navy' | 'ink';
export type ServiceLayout = 'copy-first' | 'details-first';
export type ServiceDetailsVariant = 'list' | 'grid' | 'checklist' | 'steps';
export type StickerParent = 'section' | 'copy' | 'details';
export type StickerHorizontal = 'left' | 'center' | 'right';
export type StickerVertical = 'top' | 'center' | 'bottom';

export type StickerPlacement = {
  readonly parent: StickerParent;
  readonly horizontal: StickerHorizontal;
  readonly vertical: StickerVertical;
};

export type ServiceSectionConfig = {
  readonly id: string;
  readonly contentKey: ServiceContentKey;
  readonly tone: ServiceTone;
  readonly layout: ServiceLayout;
  readonly eyebrowTone: EyebrowTone;
  readonly detailsVariant: ServiceDetailsVariant;
  readonly sticker: { readonly src: string; readonly alt: string | null };
  readonly stickerWidth: number;
  readonly stickerHeight: number;
  readonly stickerPlacement: StickerPlacement;
  readonly buttonVariant: ButtonVariant;
};

export const serviceSections: readonly ServiceSectionConfig[] = [
  {
    id: 'branding',
    contentKey: 'branding',
    tone: 'soft',
    layout: 'copy-first',
    eyebrowTone: 'orange',
    detailsVariant: 'list',
    sticker: assets.shared.stickers.manos.naranja,
    stickerWidth: 126,
    stickerHeight: 126,
    stickerPlacement: { parent: 'details', horizontal: 'right', vertical: 'top' },
    buttonVariant: 'primary-orange',
  },
  {
    id: 'diseno-grafico',
    contentKey: 'graphicDesign',
    tone: 'burgundy',
    layout: 'details-first',
    eyebrowTone: 'cream',
    detailsVariant: 'grid',
    sticker: assets.shared.stickers.bombilla.rojo,
    stickerWidth: 64,
    stickerHeight: 68,
    stickerPlacement: { parent: 'details', horizontal: 'left', vertical: 'bottom' },
    buttonVariant: 'primary-yellow',
  },
  {
    id: 'diseno-web',
    contentKey: 'webDesign',
    tone: 'yellow',
    layout: 'copy-first',
    eyebrowTone: 'ink',
    detailsVariant: 'checklist',
    sticker: assets.shared.stickers.webDesign.ink,
    stickerWidth: 117,
    stickerHeight: 117,
    stickerPlacement: { parent: 'details', horizontal: 'right', vertical: 'top' },
    buttonVariant: 'primary-ink',
  },
  {
    id: 'ecommerce',
    contentKey: 'ecommerce',
    tone: 'navy',
    layout: 'details-first',
    eyebrowTone: 'cream',
    detailsVariant: 'grid',
    sticker: assets.shared.stickers.laptop.celeste,
    stickerWidth: 60,
    stickerHeight: 57,
    stickerPlacement: { parent: 'details', horizontal: 'center', vertical: 'bottom' },
    buttonVariant: 'secondary-navy',
  },
  {
    id: 'naming',
    contentKey: 'naming',
    tone: 'ink',
    layout: 'copy-first',
    eyebrowTone: 'cream',
    detailsVariant: 'steps',
    sticker: assets.shared.stickers.calendario.rojo,
    stickerWidth: 150,
    stickerHeight: 172,
    stickerPlacement: { parent: 'details', horizontal: 'right', vertical: 'top' },
    buttonVariant: 'primary-yellow',
  },
] as const;
