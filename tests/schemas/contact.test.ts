import { describe, it, expect } from 'vitest';
import {
  contactSchema,
  contactServiceOptions,
  contactInvestmentOptions,
} from '@/lib/schemas/contact';

const baseValid = {
  email: 'alice@example.com',
  name: 'Alice',
  service: 'Diseño web' as const,
  investment: 'USD 1.000–2.000' as const,
  social: '@alicebrand',
  comments: 'Quiero una web nueva para mi marca.',
  privacy: true as const,
  website: '',
};

describe('contactSchema', () => {
  describe('valid payloads', () => {
    it('accepts a fully valid payload', () => {
      const result = contactSchema.safeParse(baseValid);
      expect(result.success).toBe(true);
    });

    it('accepts a payload with honeypot defaulting to ""', () => {
      const { website, ...rest } = baseValid;
      void website;
      const result = contactSchema.safeParse(rest);
      expect(result.success).toBe(true);
    });

    it('exports the four PRD service options', () => {
      expect(contactServiceOptions).toEqual([
        'Diseño web',
        'Ecommerce',
        'Naming',
        'Diseño gráfico',
      ]);
    });

    it('exports the five PRD investment options', () => {
      expect(contactInvestmentOptions).toEqual([
        'Menos de USD 500',
        'USD 500–1.000',
        'USD 1.000–2.000',
        'USD 2.000–5.000',
        'Más de USD 5.000',
      ]);
    });
  });

  describe('normalisation', () => {
    it('trims and lowercases the email', () => {
      const result = contactSchema.safeParse({ ...baseValid, email: '  ALICE@Example.COM  ' });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe('alice@example.com');
      }
    });

    it('trims the name', () => {
      const result = contactSchema.safeParse({ ...baseValid, name: '  Alice  ' });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe('Alice');
      }
    });

    it('trims the social handle', () => {
      const result = contactSchema.safeParse({ ...baseValid, social: '  @alice  ' });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.social).toBe('@alice');
      }
    });

    it('trims the comments', () => {
      const result = contactSchema.safeParse({
        ...baseValid,
        comments: '   Quiero una web nueva.   ',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.comments).toBe('Quiero una web nueva.');
      }
    });
  });

  describe('required fields', () => {
    it('rejects an empty email', () => {
      const result = contactSchema.safeParse({ ...baseValid, email: '' });
      expect(result.success).toBe(false);
    });

    it('rejects a missing email', () => {
      const { email, ...rest } = baseValid;
      void email;
      const result = contactSchema.safeParse(rest);
      expect(result.success).toBe(false);
    });

    it('rejects an invalid email', () => {
      const result = contactSchema.safeParse({ ...baseValid, email: 'not-an-email' });
      expect(result.success).toBe(false);
    });

    it('rejects an empty name', () => {
      const result = contactSchema.safeParse({ ...baseValid, name: '   ' });
      expect(result.success).toBe(false);
    });

    it('rejects a name longer than 120 chars', () => {
      const result = contactSchema.safeParse({ ...baseValid, name: 'a'.repeat(121) });
      expect(result.success).toBe(false);
    });

    it('rejects an empty social handle', () => {
      const result = contactSchema.safeParse({ ...baseValid, social: '' });
      expect(result.success).toBe(false);
    });

    it('rejects empty comments', () => {
      const result = contactSchema.safeParse({ ...baseValid, comments: '   ' });
      expect(result.success).toBe(false);
    });

    it('rejects comments longer than 2000 chars', () => {
      const result = contactSchema.safeParse({ ...baseValid, comments: 'a'.repeat(2001) });
      expect(result.success).toBe(false);
    });
  });

  describe('enum enforcement', () => {
    it('rejects a service not in the PRD list', () => {
      const result = contactSchema.safeParse({ ...baseValid, service: 'Magic' as never });
      expect(result.success).toBe(false);
    });

    it('rejects an investment not in the PRD list', () => {
      const result = contactSchema.safeParse({ ...baseValid, investment: 'Free' as never });
      expect(result.success).toBe(false);
    });
  });

  describe('privacy acceptance', () => {
    it('rejects privacy = false', () => {
      const result = contactSchema.safeParse({ ...baseValid, privacy: false });
      expect(result.success).toBe(false);
    });

    it('rejects privacy = undefined', () => {
      const { privacy, ...rest } = baseValid;
      void privacy;
      const result = contactSchema.safeParse(rest);
      expect(result.success).toBe(false);
    });
  });

  describe('honeypot', () => {
    // The honeypot is intentionally accepted by the schema. The route's
    // POST handler checks the value AFTER validation and returns 200
    // silently when it is filled (see `tests/api/contact.test.ts`).
    it('accepts a filled honeypot (the route handles it, not the schema)', () => {
      const result = contactSchema.safeParse({ ...baseValid, website: 'spam' });
      expect(result.success).toBe(true);
    });

    it('accepts an empty honeypot', () => {
      const result = contactSchema.safeParse({ ...baseValid, website: '' });
      expect(result.success).toBe(true);
    });
  });
});
