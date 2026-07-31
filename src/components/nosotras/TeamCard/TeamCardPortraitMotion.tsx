'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import type { TeamMember } from '@/content/data/team';
import { DURATION, EASING, useReducedMotion } from '@/lib/motion';
import styles from './TeamCard.module.scss';

type TeamCardPortraitMotionProps = {
  readonly member: TeamMember;
};

/**
 * Reveals a member quote on hover or focus and keeps it open when activated.
 * The button behavior gives touch and keyboard users the same portrait content
 * without expanding the client boundary to the rest of the team card.
 */
export function TeamCardPortraitMotion({ member }: TeamCardPortraitMotionProps) {
  const [expanded, setExpanded] = useState(false);
  const reducedMotion = useReducedMotion();
  const quoteId = `team-quote-${member.slug}`;
  const transition = {
    duration: reducedMotion ? 0 : DURATION.slow,
    ease: EASING.out,
  };

  return (
    <motion.button
      type="button"
      className={styles.portrait}
      initial="rest"
      animate={expanded ? 'visible' : 'rest'}
      whileHover="visible"
      whileFocus="visible"
      whileTap="visible"
      aria-expanded={expanded}
      aria-controls={quoteId}
      aria-label={`${expanded ? 'Ocultar' : 'Mostrar'} cita de ${member.name}`}
      onClick={() => setExpanded((current) => !current)}
    >
      <motion.span
        className={styles.portraitImageFrame}
        variants={{
          rest: { scale: 1 },
          visible: { scale: reducedMotion ? 1 : 1.02 },
        }}
        transition={transition}
      >
        <Image
          src={member.portrait.src}
          alt={member.portrait.alt ?? member.name}
          width={member.portrait.width}
          height={member.portrait.height}
          className={styles.portraitImage}
          sizes="(max-width: 767px) 90vw, 30vw"
        />
      </motion.span>

      <motion.span
        className={styles.quoteOverlay}
        aria-hidden="true"
        variants={{ rest: { opacity: 0 }, visible: { opacity: 1 } }}
        transition={transition}
      />
      <motion.blockquote
        id={quoteId}
        className={styles.quote}
        aria-hidden={!expanded}
        variants={{
          rest: { opacity: 0, y: reducedMotion ? 0 : 12 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={transition}
      >
        “{member.quote}”
      </motion.blockquote>
      <span className={styles.accent} aria-hidden="true" />
    </motion.button>
  );
}
