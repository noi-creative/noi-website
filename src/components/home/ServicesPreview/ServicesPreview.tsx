'use client';

import { useState } from 'react';
import type { CSSProperties, FocusEvent } from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '@/lib/motion';
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
        <div className={styles.header}>
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
        </div>

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
                <div className={styles.cardEntrance}>
                  <ServiceCard
                    service={service}
                    isActive={isActive}
                    reduceMotion={Boolean(shouldReduceMotion)}
                  />
                </div>
              </motion.li>
            );
          })}
        </ol>

        <div className={styles.cta}>
          <Button href={site.routes.servicios} variant="primary-orange" withArrow>
            {common.cta.verTodosServicios}
          </Button>
        </div>
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
