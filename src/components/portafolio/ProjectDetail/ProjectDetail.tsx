import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  getProject,
  type GalleryItem,
  type GalleryItemImage,
  type GalleryItemText,
} from '@/content/data/projects';
import styles from './ProjectDetail.module.scss';

/**
 * Page-level composition for `/portafolio/[slug]`. Renders the
 * project's `gallery` array in order: full-width images span
 * edge-to-edge, half-width images pair in rows of 2 (no gap),
 * text items render as a simple text block. The first image has
 * `priority` (LCP candidate).
 *
 * The composition is a simple image grid + small text section,
 * per the studio direction. There are no separate hero / body /
 * gallery sections — the cover image IS the hero, the text
 * items are inserted at the studio-specified positions, and the
 * detail images fill the rest.
 */
export function ProjectDetail({ slug }: { readonly slug: string }) {
  const project = getProject(slug);
  if (!project) {
    notFound();
  }

  const rows = groupIntoRows(project.gallery);

  return (
    <article className={styles.detail}>
      {rows.map((row, rowIndex) => {
        if (row.length === 1 && row[0].type === 'image' && row[0].width === 'full') {
          return <ProjectDetailImage key={rowIndex} item={row[0]} />;
        }
        if (row.length === 1 && row[0].type === 'text') {
          return <ProjectDetailText key={rowIndex} item={row[0]} />;
        }
        if (
          row.length === 2 &&
          row.every((item) => item.type === 'image' && item.width === 'half')
        ) {
          return (
            <div key={rowIndex} className={styles.row}>
              {row.map((item, itemIndex) => (
                <ProjectDetailImage key={itemIndex} item={item as GalleryItemImage} />
              ))}
            </div>
          );
        }
        return null;
      })}
    </article>
  );
}

/**
 * Groups consecutive `image` items with `width: 'half'` into rows
 * of 2. Full-width images and text items are returned as
 * single-item rows. This is the simplest grouping that matches
 * the studio's layout patterns (consecutive half-width images
 * always pair in a single row).
 */
function groupIntoRows(items: readonly GalleryItem[]): GalleryItem[][] {
  const rows: GalleryItem[][] = [];
  let buffer: GalleryItemImage[] = [];

  for (const item of items) {
    if (item.type === 'image' && item.width === 'half') {
      buffer.push(item);
      if (buffer.length === 2) {
        rows.push(buffer);
        buffer = [];
      }
    } else {
      if (buffer.length > 0) {
        rows.push(buffer);
        buffer = [];
      }
      rows.push([item]);
    }
  }
  if (buffer.length > 0) {
    rows.push(buffer);
  }
  return rows;
}

function ProjectDetailImage({ item }: { readonly item: GalleryItemImage }) {
  return (
    <div className={item.width === 'full' ? styles.imageFull : styles.imageHalf}>
      <Image
        src={item.src}
        alt={item.alt}
        width={item.width_px}
        height={item.height_px}
        sizes={item.width === 'full' ? '100vw' : '(max-width: 767px) 100vw, 50vw'}
        className={styles.image}
        priority={item.priority ?? false}
      />
    </div>
  );
}

function ProjectDetailText({ item }: { readonly item: GalleryItemText }) {
  return (
    <section className={styles.text} style={{ background: item.background, color: item.textColor }}>
      <div className={styles.textInner}>
        <p className={styles.textBody}>{item.body}</p>
      </div>
    </section>
  );
}
