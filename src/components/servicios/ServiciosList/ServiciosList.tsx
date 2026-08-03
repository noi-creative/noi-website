import { Container } from '@/components/ui/Container';
import { serviceSections } from '@/content/data/servicios';
import servicios from '@/content/locales/es/servicios.json';
import { ContentStrategySection } from '../ContentStrategySection/ContentStrategySection';
import { ServiceSection } from '../ServiceSection/ServiceSection';
import styles from './ServiciosList.module.scss';

export function ServiciosList() {
  const standardServices = serviceSections.slice(0, 4);
  const namingService = serviceSections[4];

  return (
    <div className={styles.wrapper}>
      <Container className={styles.list}>
        {standardServices.map((config) => (
          <div key={config.id} className={styles.item}>
            <ServiceSection config={config} content={servicios.services[config.contentKey]} />
          </div>
        ))}
        <ContentStrategySection />
        <ServiceSection
          config={namingService}
          content={servicios.services[namingService.contentKey]}
        />
      </Container>
    </div>
  );
}
