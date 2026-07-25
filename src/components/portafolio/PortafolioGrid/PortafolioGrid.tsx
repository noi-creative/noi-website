import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { projects } from '@/content/data/projects';
import portafolio from '@/content/locales/es/portafolio.json';
import { ProjectTile } from '@/components/portafolio/ProjectTile';
import styles from './PortafolioGrid.module.scss';

/**
 * Cream-background 2-column grid of the 6 project tiles. Each
 * tile is an `<li>` inside the `<ol>`, the visual presentation is
 * a 2-col grid that ignores the list's numbering. The 2-col
 * layout collapses to 1-col at ≤767 px.
 *
 * The first tile of the first row is `priority` (the second-most
 * likely LCP candidate after the hero H1). The remaining 5 tiles
 * are lazy-loaded.
 */
export function PortafolioGrid() {
  return (
    <Section background="cream" className={styles.grid}>
      <Container className={styles.gridContainer}>
        <ol className={styles.list} aria-label={portafolio.grid.listLabel}>
          {projects.map((project, index) => (
            <li key={project.slug} className={styles.listItem}>
              <ProjectTile project={project} tag={portafolio.grid.tag} priority={index === 0} />
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
