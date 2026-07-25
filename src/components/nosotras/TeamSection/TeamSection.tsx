import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Scallop } from '@/components/home/Scallop';
import { TeamCard } from '@/components/nosotras/TeamCard';
import { team } from '@/content/data/team';
import nosotras from '@/content/locales/es/nosotras.json';
import { TeamHeaderMotion, TeamCardItemMotion } from './TeamSectionMotion';
import styles from './TeamSection.module.scss';

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
      <Scallop tone="navy" className={styles.topScallop} />

      <Container className={styles.teamContainer}>
        <div className={styles.header}>
          <TeamHeaderMotion>
            <div className={styles.title}>
              <Eyebrow tone="accent">{nosotras.equipo.eyebrow}</Eyebrow>

              <Heading
                as="h2"
                id="nosotras-team-heading"
                primary={nosotras.equipo.headline.primary}
                accent={nosotras.equipo.headline.accent}
                weight="bold"
              />
            </div>

            <p className={styles.intro}>{nosotras.equipo.intro}</p>
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
