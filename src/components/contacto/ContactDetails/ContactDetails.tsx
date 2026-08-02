import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { ContactTile } from '@/components/contacto/ContactTile';
import { ContactForm } from '@/components/forms/ContactForm';
import { assets } from '@/lib/assets';
import { renderBold } from '@/lib/renderBold';
import contacto from '@/content/locales/es/contacto.json';
import {
  ContactDetailsHeadingMotion,
  ContactTileItemMotion,
  ContactFormCardMotion,
} from './ContactDetailsMotion';
import styles from './ContactDetails.module.scss';

/**
 * "También puedes encontrarnos aquí" section. Cream background,
 * two-column layout at desktop: the contact details (mixed heading
 * + lede + four contact tiles) on the left, and the navy rounded
 * ContactForm card on the right. Mobile stacks details-first,
 * form-second per `DESIGN.md` §24.2.
 *
 * The ContactForm primitive renders the navy form card with the
 * yellow heading inside. This section just places it on the right
 * and supplies the page-level heading + contact tiles.
 */
export function ContactDetails() {
  const channels = contacto.encontrarnos.channels;

  return (
    <Section
      background="cream"
      id="contacto-detalles"
      ariaLabelledby="contacto-encontrarnos-heading"
      className={styles.details}
    >
      <Container className={styles.detailsContainer}>
        <div className={styles.textColumn}>
          <ContactDetailsHeadingMotion>
            <Heading
              as="h2"
              id="contacto-encontrarnos-heading"
              primary={contacto.encontrarnos.headline.primary}
              accent={contacto.encontrarnos.headline.accent}
              weight="black"
              accentFamily="serif"
              accentWeight="medium"
              accentItalic
              accentColor="var(--color-text-accent)"
              className={styles.heading}
            />

            <p className={styles.lede}>{renderBold(contacto.encontrarnos.lede)}</p>
          </ContactDetailsHeadingMotion>

          <ul className={styles.tileList} aria-label="Canales de contacto">
            <li>
              <ContactTileItemMotion index={0}>
                <ContactTile
                  tone="navy"
                  icon={assets.shared.iconos.email}
                  label={channels.email.label}
                  value={channels.email.value}
                  href={`mailto:${channels.email.value}`}
                />
              </ContactTileItemMotion>
            </li>
            <li>
              <ContactTileItemMotion index={1}>
                <ContactTile
                  tone="burgundy"
                  icon={assets.shared.iconos.whatsapp}
                  label={channels.whatsapp.label}
                  value={channels.whatsapp.value}
                  href={`https://wa.me/${channels.whatsapp.value.replace(/[^\d]/g, '')}`}
                />
              </ContactTileItemMotion>
            </li>
            <li>
              <ContactTileItemMotion index={2}>
                <ContactTile
                  tone="orange"
                  icon={assets.shared.iconos.instagram}
                  label={channels.instagram.label}
                  value={channels.instagram.value}
                  href={`https://instagram.com/${channels.instagram.value.replace(/^@/, '')}`}
                />
              </ContactTileItemMotion>
            </li>
            <li>
              <ContactTileItemMotion index={3}>
                <ContactTile
                  tone="ink"
                  icon={assets.shared.iconos.location}
                  label={channels.location.label}
                  value={channels.location.value}
                />
              </ContactTileItemMotion>
            </li>
          </ul>
        </div>

        <div className={styles.formColumn}>
          <ContactFormCardMotion>
            <div className={styles.formCard}>
              <h3 className={styles.formHeading}>{contacto.encontrarnos.formHeading}</h3>
              <ContactForm />
            </div>
          </ContactFormCardMotion>
        </div>
      </Container>
    </Section>
  );
}
