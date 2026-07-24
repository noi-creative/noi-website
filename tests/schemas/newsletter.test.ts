import { describe, it, expect } from 'vitest';
import { newsletterSchema } from '@/lib/schemas/newsletter';

describe('newsletterSchema', () => {
  it('accepts a valid email', () => {
    const result = newsletterSchema.safeParse({ email: 'alice@example.com' });
    expect(result.success).toBe(true);
  });

  it('trims and lowercases the email', () => {
    const result = newsletterSchema.safeParse({ email: '  ALICE@Example.COM  ' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe('alice@example.com');
    }
  });

  it('rejects an empty email', () => {
    const result = newsletterSchema.safeParse({ email: '' });
    expect(result.success).toBe(false);
  });

  it('rejects a whitespace-only email', () => {
    const result = newsletterSchema.safeParse({ email: '   ' });
    expect(result.success).toBe(false);
  });

  it('rejects a missing email', () => {
    const result = newsletterSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it('rejects an invalid email', () => {
    const result = newsletterSchema.safeParse({ email: 'not-an-email' });
    expect(result.success).toBe(false);
  });
});
