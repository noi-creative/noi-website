import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { projects, type Project } from '@/content/data/projects';
import { site } from '@/config/site';
import common from '@/content/locales/es/common.json';
import home from '@/content/locales/es/home.json';
import styles from './PortafolioPreview.module.scss';

/**
 * "PORTAFOLIO" section. Burgundy background, oversized Satoshi
 * Black heading, four small project thumbnails overlapping the
 * heading, mixed-typeface subhead, supporting copy, outline CTA,
 * and a static strip of all six featured project `*-med` images.
 *
 * The static strip is a placeholder for the infinite carousel
 * owned by A01. P01 ships the strip as a horizontal scroll
 * (mobile) or a static row that fits the container (desktop).
 *
 * Server Component.
 */
export function PortafolioPreview() {
  const featured = projects;
  const thumbnails = featured.slice(0, 4);

  return (
    <Section
      background="burgundy"
      ariaLabelledby="home-portafolio-heading"
      className={styles.portafolioSection}
    >
      <Container className={styles.portafolioContainer}>
        {/*  <div className={styles.thumbnailRow} aria-hidden="true">
          {thumbnails.map((project) => (
            <Thumb key={project.slug} project={project} />
          ))}
        </div>  */}

        <div className={styles.strip} aria-label="Vista previa de proyectos">
          <ol className={styles.stripList}>
            {featured.map((project) => (
              <li key={project.slug} className={styles.stripItem}>
                <Image
                  src={project.coverSrc}
                  alt=""
                  width={project.coverWidth}
                  height={project.coverHeight}
                  className={styles.stripImage}
                  sizes="(max-width: 767px) 70vw, 30vw"
                />
              </li>
            ))}
          </ol>
        </div>

        <h2 id="home-portafolio-heading" className={styles.giantHeading}>
          {home.portafolio.title}
        </h2>

        <div className={styles.copyBlock}>
          <Heading
            as="h3"
            primary={home.portafolio.subhead.primary}
            accent={home.portafolio.subhead.accent}
            weight="bold"
          />
          <p className={styles.lede}>{home.portafolio.lede}</p>
        </div>

        <div className={styles.cta}>
          <Button href={site.routes.portafolio} variant="outline-on-dark" withArrow>
            {common.cta.explorarPortafolioCompleto}
          </Button>
        </div>
      </Container>
    </Section>
  );
}

function Thumb({ project }: { project: Project }) {
  return (
    <div className={styles.thumb}>
      <Image
        src={project.coverSrc}
        alt=""
        width={project.coverWidth}
        height={project.coverHeight}
        className={styles.thumbImage}
        sizes="120px"
      />
    </div>
  );
}
