import { Section } from '@/components/ui/Section';
import { Heading } from '@/components/ui/Heading';
import contacto from '@/content/locales/es/contacto.json';
import { BrandStatementHeadingMotion } from './BrandStatementMotion';
import styles from './BrandStatement.module.scss';
import { Scallop } from '@/components/home/Scallop';

/**
 * "NOI existe para acompañarte" brand statement. A decorative
 * yellow three-oval SVG sits behind the centered mixed-typeface
 * statement on the cream section surface.
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
        <Scallop tone="cream" className={styles.topScallop} direction="up" />
        <BrandStatementHeadingMotion>
          <Heading
            as="h2"
            id="contacto-brand-heading"
            primary={contacto.brand.headline.primary}
            accent={contacto.brand.headline.accent}
            weight="black"
            align="center"
            accentFamily="serif"
            accentWeight="bold"
            accentItalic
            accentColor="var(--color-brand-orange)"
            className={styles.heading}
          />
        </BrandStatementHeadingMotion>
      </div>
    </Section>
  );
}
