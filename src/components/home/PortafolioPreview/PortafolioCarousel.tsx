'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { DURATION, EASING, useReducedMotion } from '@/lib/motion';
import type { Project } from '@/content/data/projects';
import styles from './PortafolioPreview.module.scss';

type CarouselItem = {
  readonly slug: Project['slug'];
  readonly name: string;
  readonly src: string;
  readonly width: number;
  readonly height: number;
};

type PortafolioCarouselProps = {
  readonly items: readonly CarouselItem[];
};

export function PortafolioCarousel({ items }: PortafolioCarouselProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={styles.strip}
      role="region"
      aria-roledescription="carousel"
      aria-label="Vista previa de proyectos"
      initial={{ opacity: 0, y: reducedMotion ? 0 : -12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reducedMotion ? 0 : DURATION.slow, ease: EASING.out }}
    >
      <motion.div
        className={styles.stripTrack}
        initial={{ x: '0%' }}
        animate={{ x: reducedMotion ? '0%' : '-50%' }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : {
                duration: 30,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'loop',
              }
        }
      >
        <ol className={styles.stripList}>
          {items.map((item) => (
            <li key={item.slug} className={styles.stripItem}>
              <Image
                src={item.src}
                alt={item.name}
                width={item.width}
                height={item.height}
                className={styles.stripImage}
                sizes="(max-width: 767px) 70vw, 30vw"
              />
            </li>
          ))}
        </ol>

        <div className={`${styles.stripList} ${styles.stripClone}`} aria-hidden="true">
          {items.map((item) => (
            <div key={item.slug} className={styles.stripItem}>
              <Image
                src={item.src}
                alt=""
                width={item.width}
                height={item.height}
                className={styles.stripImage}
                sizes="(max-width: 767px) 70vw, 30vw"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
