import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TeamCard } from '@/components/nosotras/TeamCard';
import { team } from '@/content/data/team';
import nosotras from '@/content/locales/es/nosotras.json';
import { renderBold } from '@/lib/renderBold';
import { TeamHeaderMotion, TeamCardItemMotion } from './TeamSectionMotion';
import styles from './TeamSection.module.scss';
import { CSSProperties } from 'react';

/**
 * "Un equipo de tres" section. Cream background with a navy
 * scallop at the top (dripping from the devolver section above),
 * eyebrow + mixed-typeface heading + intro paragraph on the left,
 * and three team-member cards in a row.
 *
 * The cards are rendered in the same order as `team` (Daniela,
 * María Patricia, Carla) with their per-member coloured bottom
 * accent.
 */
export function TeamSection() {
  return (
    <Section
      background="cream"
      ariaLabelledby="nosotras-team-heading"
      className={styles.teamSection}
    >
      <Container className={styles.teamContainer}>
        <div className={styles.header}>
          <TeamHeaderMotion>
            <div className={styles.title}>
              <Eyebrow tone="accent">{nosotras.equipo.eyebrow}</Eyebrow>

              <Heading
                className={styles.heading}
                as="h2"
                id="nosotras-team-heading"
                primary={nosotras.equipo.headline.primary}
                accent={nosotras.equipo.headline.accent}
                accentColor="var(--color-text-accent)"
                accentFamily="serif"
                accentItalic
                accentWeight="medium"
                weight="black"
                style={
                  {
                    '--heading-primary-transform': 'none',
                  } as CSSProperties
                }
              />
            </div>

            <p className={styles.intro}>{renderBold(nosotras.equipo.intro)}</p>
          </TeamHeaderMotion>
        </div>

        <ol className={styles.cardRow} aria-label="Equipo de NOI">
          {team.map((member, index) => (
            <li key={member.slug} className={styles.cardItem}>
              <TeamCardItemMotion index={index}>
                <TeamCard member={member} />
              </TeamCardItemMotion>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
