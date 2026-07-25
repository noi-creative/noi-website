import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { Scallop } from '@/components/home/Scallop';
import { ServiceCard } from '@/components/home/ServiceCard';
import { homeServices } from '@/content/data/homeServices';
import { site } from '@/config/site';
import common from '@/content/locales/es/common.json';
import home from '@/content/locales/es/home.json';
import styles from './ServicesPreview.module.scss';

export function ServicesPreview() {
  return (
    <Section
      background="cream"
      ariaLabelledby="home-services-heading"
      className={styles.servicesSection}
    >
      <Scallop tone="yellow" className={styles.topScallop} />

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
          />
        </div>

        <ol className={styles.cardRow} aria-label="Servicios">
          {homeServices.map((service) => (
            <li key={service.id} className={styles.cardItem}>
              <ServiceCard service={service} />
            </li>
          ))}
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
