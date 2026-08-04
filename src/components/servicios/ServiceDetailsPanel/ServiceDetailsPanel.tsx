import type {
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
  readonly stickerPlacement: StickerPlacement;
};

export function ServiceDetailsPanel({
  title,
  items,
  variant,
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
        {items.map((item, index) => (
          <li key={item.title} className={styles.item}>
            <span className={styles.marker} aria-hidden="true">
              {variant === 'steps' ? String(index + 1).padStart(2, '0') : null}
            </span>
            <span className={[styles.itemCopy, styles[`itemCopy-${variant}`]].join(' ')}>
              <strong>
                {item.title}
                {variant == 'steps' && ': '}
              </strong>
              {item.description ? <span>{item.description}</span> : null}
            </span>
          </li>
        ))}
      </List>
    </div>
  );
}
