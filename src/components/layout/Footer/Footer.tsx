import Image from 'next/image';
import { assets } from '@/lib/assets';
import common from '@/content/locales/es/common.json';
import { site } from '@/config/site';
import { Container } from '@/components/ui/Container';
import { NewsletterForm } from '../NewsletterForm';
import styles from './Footer.module.scss';

/**
 * Site footer. Server Component. Three-row layout that matches the
 * approved Figma reference (verified visually in the C07 follow-up):
 *
 *   ┌────────────────────────────────────────────────────────────────┐
 *   │  [ big NOI brand mark         ]   [ Newsletter (form)        ] │
 *   ├────────────────────────────────────────────────────────────────┤
 *   │  [ INFORMACIÓN DE CONTACTO     ]   [ ESTUDIO                  ] │
 *   │  [ email + social icons        ]   [ 3 nav links              ] │
 *   ├────────────────────────────────────────────────────────────────┤
 *   │  [ © 2025 …    ]   [ Privacidad    ·    Términos y cond…  ]   │
 *   └────────────────────────────────────────────────────────────────┘
 */
export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.topRow}>
          <div className={styles.brand}>
            <Image
              src={assets.shared.logo.noiBlanco.src}
              alt={assets.shared.logo.noiBlanco.alt ?? 'NOI Creative'}
              width={192}
              height={96}
              className={styles.logo}
            />
            <Image
              src={assets.shared.logo.creativeAmarillo.src}
              alt={assets.shared.logo.creativeAmarillo.alt ?? 'NOI Creative'}
              width={192}
              height={96}
              className={styles.logo}
            />
          </div>
          <div className={styles.newsletter}>
            <NewsletterForm />
          </div>
        </div>

        <div className={styles.middleRow}>
          <div className={styles.contact}>
            <h2 className={styles.heading}>{common.footer.contactHeading}</h2>
            <a className={styles.email} href={`mailto:${site.contactEmail}`}>
              {site.contactEmail}
            </a>
            <ul className={styles.socialList} aria-label="Redes sociales">
              <li>
                <a
                  className={styles.socialLink}
                  href={site.social.instagram.url}
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={assets.shared.iconos.instagram.src} alt="" width={32} height={32} />
                </a>
              </li>
              {/* <li>
                <a
                  className={styles.socialLink}
                  href={site.social.linkedin.url}
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={assets.shared.iconos.linkedin.src} alt="" width={32} height={32} />
                </a>
              </li>*/}
              <li>
                <a
                  className={styles.socialLink}
                  href={site.social.tiktok.url}
                  aria-label="TikTok"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={assets.shared.iconos.tiktok.src} alt="" width={32} height={32} />
                </a>
              </li>
            </ul>
          </div>

          <nav className={styles.studio} aria-label="Estudio">
            <h2 className={styles.heading}>{common.footer.studioHeading}</h2>
            <ul className={styles.studioList}>
              <li>
                <a href={site.routes.nosotras}>{common.navigation.nosotras}</a>
              </li>
              <li>
                <a href={site.routes.portafolio}>{common.navigation.portafolio}</a>
              </li>
              <li>
                <a href={'/contacto'}>Contacto</a>
              </li>
              {/*<li>
                <a href={site.routes.servicios}>{common.navigation.servicios}</a>
              </li>*/}
            </ul>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>{common.footer.copyright}</p>
          <ul className={styles.legalList}>
            <li>
              <a href={site.legal.privacyPath}>{common.footer.privacyLink}</a>
            </li>
            <li>
              <a href={site.legal.termsPath}>{common.footer.termsLink}</a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
