'use client';

import { useState } from 'react';
import type { CSSProperties, FocusEvent } from 'react';
import { motion } from 'motion/react';
import { DURATION, EASING, useReducedMotion } from '@/lib/motion';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ServiceCard } from '@/components/home/ServiceCard';
import { homeServices } from '@/content/data/homeServices';
import home from '@/content/locales/es/home.json';
import styles from './ServicesPreview.module.scss';
import { Button } from '@/components/ui/Button';
import { site } from '@/config/site';
import common from '@/content/locales/es/common.json';

type OverlapState = 'none' | 'normal' | 'strong';

export function ServicesPreview() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleRowBlur = (event: FocusEvent<HTMLOListElement>) => {
    const nextFocusedElement = event.relatedTarget as Node | null;

    if (!event.currentTarget.contains(nextFocusedElement)) {
      setActiveIndex(null);
    }
  };

  return (
    <Section
      background="cream"
      ariaLabelledby="home-services-heading"
      className={styles.servicesSection}
    >
      <Container className={styles.servicesContainer}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: shouldReduceMotion ? 0 : DURATION.base,
            ease: EASING.out,
          }}
        >
          <Eyebrow tone="accent">
            <b>{home.services.eyebrow}</b>
          </Eyebrow>
          <Heading
            as="h2"
            id="home-services-heading"
            primary={home.services.headline.primary}
            accent={home.services.headline.accent}
            weight="bold"
            align="center"
            accentFamily="serif"
            accentItalic
            accentWeight="medium"
            style={
              {
                '--heading-primary-transform': 'none',
              } as CSSProperties
            }
          />
        </motion.div>

        <ol
          className={styles.cardRow}
          aria-label="Servicios"
          onMouseLeave={() => setActiveIndex(null)}
          onBlurCapture={handleRowBlur}
        >
          {homeServices.map((service, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.li
                key={service.id}
                layout="position"
                layoutDependency={activeIndex}
                className={styles.cardItem}
                data-overlap={getOverlapState(index, activeIndex)}
                style={{ zIndex: isActive ? homeServices.length + 1 : index + 1 }}
                transition={{
                  layout: shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        type: 'spring',
                        stiffness: 420,
                        damping: 38,
                        mass: 0.7,
                      },
                }}
                onMouseEnter={() => setActiveIndex(index)}
                onFocusCapture={() => setActiveIndex(index)}
              >
                <motion.div
                  className={styles.cardEntrance}
                  initial={{
                    opacity: 0,
                    x: shouldReduceMotion ? 0 : index % 2 === 0 ? -14 : 14,
                    y: shouldReduceMotion ? 0 : 24,
                    scale: shouldReduceMotion ? 1 : 0.95,
                  }}
                  whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : DURATION.slow,
                    ease: EASING.out,
                    delay: shouldReduceMotion ? 0 : index * 0.055,
                  }}
                >
                  <ServiceCard
                    service={service}
                    isActive={isActive}
                    reduceMotion={Boolean(shouldReduceMotion)}
                  />
                </motion.div>
              </motion.li>
            );
          })}
        </ol>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: shouldReduceMotion ? 0 : DURATION.base,
            ease: EASING.out,
            delay: shouldReduceMotion ? 0 : 0.18,
          }}
        >
          <Button href={site.routes.servicios} variant="primary-orange" withArrow>
            {common.cta.verTodosServicios}
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
}

function getOverlapState(index: number, activeIndex: number | null): OverlapState {
  if (index === 0) {
    return 'none';
  }

  if (activeIndex === null) {
    return 'normal';
  }

  // Clearing the active card's left margin opens its left side. Clearing the
  // following card's margin opens the active card's right side.
  if (index === activeIndex || index === activeIndex + 1) {
    return 'none';
  }

  return 'strong';
}
