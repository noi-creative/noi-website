import { Section } from '@/components/ui/Section';
import contacto from '@/content/locales/es/contacto.json';
import { BrandStatementHeadingMotion } from './BrandStatementMotion';
import styles from './BrandStatement.module.scss';

/**
 * "NOI existe para acompañarte" brand statement. Yellow scallop
 * backdrop (inheriting the `cream` background below), with a
 * centered mixed-typeface statement in navy + orange. The scallop
 * sits at the top of the section, painted in the section's own
 * yellow (inverted relative to Nosotras — the section's own
 * colour is the scallop tone here, not the previous section's).
 *
 * Headings render inline (Satoshi + Playfair Italic) so both
 * lines stay in mixed case, per `DESIGN.md` §24.3.
 */
export function BrandStatement() {
  return (
    <Section
      background="cream"
      ariaLabelledby="contacto-brand-heading"
      className={styles.statement}
    >
      <div className={styles.statementInner}>
        <BrandStatementHeadingMotion>
          <h2 id="contacto-brand-heading" className={styles.heading}>
            <span className={styles.headingPrimary}>{contacto.brand.headline.primary}</span>
            <span className={styles.headingAccent}>{contacto.brand.headline.accent}</span>
          </h2>
        </BrandStatementHeadingMotion>
      </div>
    </Section>
  );
}
