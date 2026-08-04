import type { IconType } from 'react-icons';
import {
  LuBriefcase,
  LuBrush,
  LuCheck,
  LuCompass,
  LuCreditCard,
  LuMessageCircle,
  LuMonitorSmartphone,
  LuPackage,
  LuPackageOpen,
  LuPalette,
  LuShapes,
  LuShoppingCart,
  LuSparkles,
} from 'react-icons/lu';
import type {
  ServiceDetailIcon,
  ServiceDetailsVariant,
  ServiceTone,
  StickerPlacement,
} from '@/content/data/servicios';
import styles from './ServiceDetailsPanel.module.scss';

type ServiceDetail = {
  readonly title: string;
  readonly description?: string;
};

type ServiceDetailsPanelProps = {
  readonly title: string;
  readonly tone: ServiceTone;
  readonly items: readonly ServiceDetail[];
  readonly variant: ServiceDetailsVariant;
  readonly icons?: readonly ServiceDetailIcon[];
  readonly stickerPlacement: StickerPlacement;
};

const detailIcons: Record<ServiceDetailIcon, IconType> = {
  briefcase: LuBriefcase,
  brush: LuBrush,
  compass: LuCompass,
  'credit-card': LuCreditCard,
  'message-circle': LuMessageCircle,
  'monitor-smartphone': LuMonitorSmartphone,
  package: LuPackage,
  'package-open': LuPackageOpen,
  palette: LuPalette,
  shapes: LuShapes,
  'shopping-cart': LuShoppingCart,
  sparkles: LuSparkles,
};

export function ServiceDetailsPanel({
  title,
  items,
  variant,
  icons,
  stickerPlacement,
  tone,
}: ServiceDetailsPanelProps) {
  const List = variant === 'steps' ? 'ol' : 'ul';

  return (
    <div
      className={[
        styles.panel,
        styles[tone],
        styles[variant],
        styles[`panel-${stickerPlacement.vertical}`],
      ].join(' ')}
    >
      <h3 className={styles.title}>{title}</h3>
      <List className={styles.items}>
        {items.map((item, index) => {
          const icon = icons?.[index];
          const Icon = variant === 'checklist' ? LuCheck : icon ? detailIcons[icon] : null;

          return (
            <li key={item.title} className={[styles.item, styles[`item-${variant}`]].join(' ')}>
              <span className={styles.marker} aria-hidden="true">
                {variant === 'steps' ? String(index + 1).padStart(2, '0') : Icon ? <Icon /> : null}
              </span>
              <span className={[styles.itemCopy, styles[`itemCopy-${variant}`]].join(' ')}>
                <strong>
                  {item.title}
                  {variant === 'steps' && ': '}
                </strong>
                {item.description ? <span>{item.description}</span> : null}
              </span>
            </li>
          );
        })}
      </List>
    </div>
  );
}
