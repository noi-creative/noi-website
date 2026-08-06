import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { projects } from '@/content/data/projects';
import { site } from '@/config/site';
import common from '@/content/locales/es/common.json';
import home from '@/content/locales/es/home.json';
import { PortafolioCarousel } from './PortafolioCarousel';
import { PortafolioCopyMotion, PortafolioCtaMotion } from './PortafolioPreviewMotion';
import styles from './PortafolioPreview.module.scss';
import { CSSProperties } from 'react';

/**
 * "PORTAFOLIO" section. Burgundy background, oversized Satoshi
 * Black heading, four small project thumbnails overlapping the
 * heading, mixed-typeface subhead, supporting copy, outline CTA,
 * and an infinite Motion-powered carousel of all six featured
 * project cover images.
 *
 * Server Component. The carousel behaviour lives in
 * PortafolioCarousel.tsx (Client Component).
 */
export function PortafolioPreview() {
  const featured = projects;

  const carouselItems = featured.map((project) => ({
    slug: project.slug,
    name: project.name,
    alt: project.coverAlt,
    src: project.coverSrc,
    width: project.coverWidth,
    height: project.coverHeight,
  }));

  return (
    <Section
      background="burgundy"
      ariaLabelledby="home-portafolio-heading"
      className={styles.portafolioSection}
    >
      <PortafolioCarousel items={carouselItems} />
      <Container className={styles.portafolioContainer}>
        <Heading
          as="h2"
          id="home-portafolio-heading"
          primary={home.portafolio.title}
          weight="black"
          className={styles.giantHeading}
        />
        <PortafolioCopyMotion className={styles.copyBlock}>
          <Heading
            as="h3"
            primary={home.portafolio.subhead.primary}
            accent={home.portafolio.subhead.accent}
            weight="bold"
            accentColor="#ffedae"
            accentFamily="display"
            style={
              {
                '--heading-primary-transform': 'none',
              } as CSSProperties
            }
          />
        </PortafolioCopyMotion>
        <PortafolioCtaMotion className={styles.cta}>
          <p className={styles.lede}>{home.portafolio.lede}</p>
          <Button href={site.routes.portafolio} variant="secondary-navy" withArrow>
            {common.cta.explorarPortafolioCompleto}
          </Button>
        </PortafolioCtaMotion>
      </Container>
    </Section>
  );
}
