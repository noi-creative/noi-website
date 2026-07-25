import Image from 'next/image';
import type { TeamMember } from '@/content/data/team';
import styles from './TeamCard.module.scss';

type TeamCardProps = {
  readonly member: TeamMember;
};

/**
 * Single team-member card in the home page Nosotras section. The
 * card renders the portrait, name, role label, short biography,
 * and a coloured bottom-accent strip matching the team member.
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
      <div className={styles.portrait}>
        <Image
          src={member.portrait.src}
          alt={member.portrait.alt ?? member.name}
          width={member.portrait.width}
          height={member.portrait.height}
          className={styles.portraitImage}
          sizes="(max-width: 767px) 90vw, 30vw"
        />
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{member.name}</h3>
        <p className={styles.role}>{member.role}</p>
        <p className={styles.bio}>{member.bio}</p>
      </div>

      <span className={styles.accent} aria-hidden="true" />
    </article>
  );
}
