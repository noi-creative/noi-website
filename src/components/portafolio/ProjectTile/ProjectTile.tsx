import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/content/data/projects';
import styles from './ProjectTile.module.scss';

type ProjectTileProps = {
  readonly project: Project;
  readonly tag: string;
  readonly priority?: boolean;
};

/**
 * Single tile in the Portafolio index grid. Renders the project's
 * cover image with a "BRANDING" tag pinned to the top-left of the
 * cover, and the project name below in italic navy Satoshi.
 *
 * The whole tile is a `<Link>` to `/portafolio/[slug]` so the
 * keyboard-activation surface is the entire card. The image is
 * `next/image`; the first tile of the first row is `priority`
 * (the second-most likely LCP candidate after the hero H1).
 */
export function ProjectTile({ project, tag, priority = false }: ProjectTileProps) {
  return (
    <Link
      href={`/portafolio/${project.slug}`}
      className={styles.tile}
      aria-label={`Ver proyecto ${project.name}`}
    >
      <div className={styles.cover}>
        <span className={styles.tag}>{tag}</span>
        <Image
          src={project.coverSrc}
          alt={project.coverAlt}
          width={project.coverWidth}
          height={project.coverHeight}
          sizes="(max-width: 767px) 100vw, 50vw"
          className={styles.coverImage}
          priority={priority}
        />
      </div>
      <h3 className={styles.name}>{project.name}</h3>
    </Link>
  );
}
