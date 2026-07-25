import { notFound } from 'next/navigation';
import { assets } from '@/lib/assets';
import { getProject } from '@/content/data/projects';
import proyectos from '@/content/locales/es/proyectos.json';
import { ProjectDetailHero } from '@/components/portafolio/ProjectDetailHero';
import { ProjectDetailBody } from '@/components/portafolio/ProjectDetailBody';
import { ProjectDetailGallery } from '@/components/portafolio/ProjectDetailGallery';
import styles from './ProjectDetail.module.scss';

/**
 * Page-level composition for `/portafolio/[slug]`. Renders the
 * 3 sections (hero, body, gallery) in order. Resolves the
 * project record, the body copy, and the detail images from the
 * manifest + JSON.
 *
 * The hero is full-bleed (no `Container` wrapping); the body and
 * gallery use the existing `Section` + `Container` primitives.
 */
export function ProjectDetail({ slug }: { readonly slug: string }) {
  const project = getProject(slug);
  if (!project) {
    notFound();
  }

  const detailImages = assets.proyectos[project.slug].detail;
  const bodyCopy = proyectos.projects[project.slug as keyof typeof proyectos.projects] ?? '';

  return (
    <article className={styles.detail}>
      <ProjectDetailHero
        displayName={project.displayName ?? project.name}
        name={project.name}
        tone={project.heroTone}
        textColor={project.heroTextColor}
      />
      <ProjectDetailBody project={project} body={bodyCopy} />
      <ProjectDetailGallery images={detailImages} priorityFirst={true} />
    </article>
  );
}
