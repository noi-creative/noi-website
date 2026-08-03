import type { ButtonVariant } from '@/components/ui/Button';
import { assets } from '@/lib/assets';

export type ServiceContentKey = 'branding' | 'graphicDesign' | 'webDesign' | 'ecommerce' | 'naming';

export type ServiceTone = 'soft' | 'burgundy' | 'yellow' | 'navy' | 'ink';
export type ServiceLayout = 'copy-first' | 'details-first';
export type ServiceDetailsVariant = 'list' | 'grid' | 'checklist' | 'steps';

export type ServiceSectionConfig = {
  readonly id: string;
  readonly contentKey: ServiceContentKey;
  readonly tone: ServiceTone;
  readonly layout: ServiceLayout;
  readonly detailsVariant: ServiceDetailsVariant;
  readonly sticker: { readonly src: string; readonly alt: string | null };
  readonly stickerWidth: number;
  readonly stickerHeight: number;
  readonly buttonVariant: ButtonVariant;
};

export const serviceSections: readonly ServiceSectionConfig[] = [
  {
    id: 'branding',
    contentKey: 'branding',
    tone: 'soft',
    layout: 'copy-first',
    detailsVariant: 'list',
    sticker: assets.shared.stickers.manos.naranja,
    stickerWidth: 126,
    stickerHeight: 126,
    buttonVariant: 'primary-orange',
  },
  {
    id: 'diseno-grafico',
    contentKey: 'graphicDesign',
    tone: 'burgundy',
    layout: 'details-first',
    detailsVariant: 'grid',
    sticker: assets.shared.stickers.bombilla.rojo,
    stickerWidth: 64,
    stickerHeight: 68,
    buttonVariant: 'primary-yellow',
  },
  {
    id: 'diseno-web',
    contentKey: 'webDesign',
    tone: 'yellow',
    layout: 'copy-first',
    detailsVariant: 'checklist',
    sticker: assets.shared.stickers.webDesign.ink,
    stickerWidth: 117,
    stickerHeight: 117,
    buttonVariant: 'primary-ink',
  },
  {
    id: 'ecommerce',
    contentKey: 'ecommerce',
    tone: 'navy',
    layout: 'details-first',
    detailsVariant: 'grid',
    sticker: assets.shared.stickers.laptop.celeste,
    stickerWidth: 60,
    stickerHeight: 57,
    buttonVariant: 'secondary-navy',
  },
  {
    id: 'naming',
    contentKey: 'naming',
    tone: 'ink',
    layout: 'copy-first',
    detailsVariant: 'steps',
    sticker: assets.shared.stickers.calendario.rojo,
    stickerWidth: 150,
    stickerHeight: 172,
    buttonVariant: 'primary-yellow',
  },
] as const;
