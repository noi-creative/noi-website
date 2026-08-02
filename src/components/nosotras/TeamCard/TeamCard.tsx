import type { TeamMember } from '@/content/data/team';
import { renderBold } from '@/lib/renderBold';
import { TeamCardPortraitMotion } from './TeamCardPortraitMotion';
import styles from './TeamCard.module.scss';

type TeamCardProps = {
  readonly member: TeamMember;
};

/**
 * Single team-member card in the home page Nosotras section. The
 * card renders an interactive portrait quote, name, role label,
 * short biography, and a coloured bottom-accent strip matching
 * the team member.
 *
 * Accent colours are owned by the data file (`TeamAccent`) and
 * map to the existing brand tokens:
 *
 *   - `navy`     → Daniela     (`--color-brand-navy`)
 *   - `burgundy` → María       (`--color-brand-burgundy`)
 *   - `yellow`   → Carla       (`--color-brand-yellow`)
 */
export function TeamCard({ member }: TeamCardProps) {
  return (
    <article className={[styles.card, styles[`accent-${member.accent}`]].join(' ')}>
      <TeamCardPortraitMotion member={member} />

      <div className={styles.body}>
        <h3 className={styles.name}>{member.name}</h3>
        <p className={styles.role}>{member.role}</p>
        <hr className={styles.hr} />
        <p className={styles.bio}>{renderBold(member.bio)}</p>
      </div>
    </article>
  );
}
