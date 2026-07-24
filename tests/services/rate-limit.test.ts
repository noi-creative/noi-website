import { describe, it, expect } from 'vitest';
import { checkRateLimit } from '@/lib/services/rate-limit';

describe('checkRateLimit (stub)', () => {
  it('returns allowed for /api/contact', () => {
    expect(checkRateLimit('203.0.113.1', '/api/contact')).toEqual({ allowed: true });
  });

  it('returns allowed for /api/newsletter', () => {
    expect(checkRateLimit('203.0.113.1', '/api/newsletter')).toEqual({ allowed: true });
  });

  it('accepts a null IP without throwing', () => {
    expect(() => checkRateLimit(null, '/api/contact')).not.toThrow();
  });
});
