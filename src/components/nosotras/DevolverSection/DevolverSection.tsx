import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Scallop } from '@/components/home/Scallop';
import { assets } from '@/lib/assets';
import nosotras from '@/content/locales/es/nosotras.json';
import { DevolverPhotoMotion, DevolverTextColumnMotion } from './DevolverSectionMotion';
import styles from './DevolverSection.module.scss';

/**
 * "Devolver lo humano / AL PROCESO CREATIVO" section. Navy
 * background with a yellow scallop at the top (dripping from the
 * yellow intro section above), team photo on the left, and a
 * two-line Satoshi heading with body paragraphs on the right.
 * Scallop at the bottom (navy→cream).
 *
 * The team photo file already has the paper-clip illustration
 * and the "Creation Connection" sticker baked in, so no
 * additional sticker overlay is rendered here. The second line
 * "AL PROCESO CREATIVO" is rendered as a separate `<span>` so
 * the mixed treatment (regular + bold uppercase) and the yellow
 * accent per the Figma are preserved.
 */
export function DevolverSection() {
  const photo = assets.nosotras.sectionDevolver[0];

  return (
    <Section
      background="navy"
      ariaLabelledby="nosotras-devolver-heading"
      className={styles.devolverSection}
    >
      <Scallop tone="yellow" className={styles.topScallop} />

      <Container className={styles.devolverContainer}>
        <DevolverPhotoMotion>
          <div className={styles.photo}>
            <Image
              src={photo.src}
              alt={photo.alt ?? 'Equipo de NOI trabajando junta'}
              width={photo.width}
              height={photo.height}
              className={styles.photoImage}
              sizes="(max-width: 767px) 90vw, 40vw"
            />
          </div>
        </DevolverPhotoMotion>

        <div className={styles.textColumn}>
          <DevolverTextColumnMotion>
            <Eyebrow tone="cream">{nosotras.devolver.eyebrow}</Eyebrow>

            <h2 id="nosotras-devolver-heading" className={styles.heading}>
              <span className={styles.headlinePrimary}>{nosotras.devolver.headline.primary}</span>
              <span className={styles.headlineAccent}>{nosotras.devolver.headline.accent}</span>
            </h2>

            <div className={styles.body}>
              <p>{nosotras.devolver.body1}</p>
              <p>
                <strong>{nosotras.devolver.body2.split('. ')[0]}.</strong>{' '}
                {nosotras.devolver.body2.split('. ').slice(1).join('. ')}
              </p>
            </div>
          </DevolverTextColumnMotion>
        </div>
      </Container>
    </Section>
  );
}
