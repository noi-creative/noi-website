import common from '@/content/locales/es/contacto.json';

/**
 * Service identifiers and contact form labels. The `id` is a stable
 * machine-readable key; the `label` is the user-facing copy taken from
 * `src/content/locales/es/contacto.json`. Future pages (P04 Servicios) can
 * extend this with description, icon and featured flags.
 */

export type ServiceId = 'diseno-web' | 'ecommerce' | 'naming' | 'diseno-grafico';

export type Service = {
  readonly id: ServiceId;
  readonly label: string;
};

export const services: readonly Service[] = [
  { id: 'diseno-web', label: common.form.serviceOptions[0] },
  { id: 'ecommerce', label: common.form.serviceOptions[1] },
  { id: 'naming', label: common.form.serviceOptions[2] },
  { id: 'diseno-grafico', label: common.form.serviceOptions[3] },
] as const;

export const investmentOptions: readonly string[] = common.form.investmentOptions;
