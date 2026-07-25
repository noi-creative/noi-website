'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { assets } from '@/lib/assets';
import styles from './HeaderWheel.module.scss';

const ORBIT_RADIUS = 500;
const SECONDS_PER_REVOLUTION = 60;

export function HeaderWheel() {
  const images = assets.home.headerWheel
    ? [...assets.home.headerWheel, ...assets.home.headerWheel]
    : [];
  const count = images.length;

  if (!count) return null;

  const orbitTransition = {
    duration: SECONDS_PER_REVOLUTION,
    repeat: Infinity,
    ease: 'linear' as const,
  };

  return (
    <div className={styles.wheel} aria-hidden="true">
      <motion.div className={styles.orbit} animate={{ rotate: 360 }} transition={orbitTransition}>
        {images.map((image, index) => {
          const angle = (360 / count) * index;
          return (
            <div
              key={image.src + index}
              className={styles.positioner}
              style={{
                transform: `rotate(${angle}deg) translateX(${ORBIT_RADIUS}px)`,
              }}
            >
              <motion.div
                className={styles.frame}
                style={{ transform: 'translate(-50%, -50%)' }}
                initial={{ rotate: -170 }}
              >
                <Image
                  src={image.src}
                  alt=""
                  width={image.width * 2}
                  height={image.height * 2}
                  className={styles.image}
                  sizes="200px"
                />
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
