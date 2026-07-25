import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import type { Project } from '@/content/data/projects';
import styles from './ProjectDetailBody.module.scss';

/**
 * Single-paragraph body section for the project detail page.
 * The section's background is one of the 5 existing `Section`
 * tones; the text colour is the project's accent colour. The
 * paragraph is left-aligned with a narrow column (the Figma
 * detail bodies are single-column, narrow).
 */
export function ProjectDetailBody({
  project,
  body,
}: {
  readonly project: Project;
  readonly body: string;
}) {
  return (
    <Section
      background={project.bodyBackground}
      ariaLabelledby={`${project.slug}-body`}
      className={styles.body}
    >
      <Container className={styles.bodyContainer}>
        <p
          id={`${project.slug}-body`}
          className={[styles.text, styles[`text-${project.bodyTextColor}`]].join(' ')}
        >
          {body}
        </p>
      </Container>
    </Section>
  );
}
