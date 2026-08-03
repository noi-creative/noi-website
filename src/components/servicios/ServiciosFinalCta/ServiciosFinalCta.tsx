import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import { site } from '@/config/site';
import servicios from '@/content/locales/es/servicios.json';
import { assets } from '@/lib/assets';
import styles from './ServiciosFinalCta.module.scss';

export function ServiciosFinalCta() {
  const { finalCta } = servicios;
  const decoration = assets.shared.figuras.semiOvalosBlancos;

  return (
    <Section
      id="servicios-final-cta"
      background="soft"
      ariaLabelledby="servicios-final-cta-heading"
      className={styles.section}
    >
      <div className={styles.decorations} aria-hidden="true">
        <Image src={decoration.src} alt="" width={200} height={250} className={styles.left} />
        <Image src={decoration.src} alt="" width={200} height={250} className={styles.right} />
      </div>
      <Container className={styles.container}>
        <Heading
          as="h2"
          id="servicios-final-cta-heading"
          primary={finalCta.headline.primary}
          accent={finalCta.headline.accent}
          weight="black"
          align="center"
          accentFamily="sans"
          accentWeight="black"
          accentColor="var(--color-action-primary)"
          className={styles.heading}
        />
        <p className={styles.lede}>{finalCta.lede}</p>
        <Button href={site.routes.contacto} variant="primary-orange" withArrow size="lg">
          {finalCta.cta}
        </Button>
      </Container>
    </Section>
  );
}
