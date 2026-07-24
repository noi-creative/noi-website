import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

// Mock the services barrel. See `tests/api/contact.test.ts` for the
// rationale. `vi.hoisted` is required because `vi.mock` is hoisted above
// the imports but the `vi.fn()` references are not.
import type { Mock } from 'vitest';
import type { RateLimitDecision } from '@/lib/services';
const { appendRowMock, checkRateLimitMock } = vi.hoisted(() => {
  const append = vi.fn();
  const checkRateLimit = vi.fn(() => ({ allowed: true }) as RateLimitDecision) as Mock<
    (ip: string | null, route: '/api/contact' | '/api/newsletter') => RateLimitDecision
  >;
  return { appendRowMock: append, checkRateLimitMock: checkRateLimit };
});

vi.mock('@/lib/services', () => ({
  sendContactInternal: vi.fn(),
  sendContactConfirmation: vi.fn(),
  appendNewsletterRow: appendRowMock,
  checkRateLimit: checkRateLimitMock,
  buildContactInternalEmail: () => ({ subject: 's', html: 'h', text: 't' }),
  buildContactConfirmationEmail: () => ({ subject: 's', html: 'h', text: 't' }),
}));

import { POST } from '@/app/api/newsletter/route';
import { site } from '@/config/site';

function buildRequest(body: unknown, ip?: string): NextRequest {
  const headers: Record<string, string> = { 'content-type': 'application/json' };
  if (ip) headers['x-forwarded-for'] = ip;
  return new NextRequest(`${site.siteUrl}/api/newsletter`, {
    method: 'POST',
    body: typeof body === 'string' ? body : JSON.stringify(body),
    headers,
  });
}

async function readJson<T>(response: Response): Promise<T> {
  return (await response.json()) as T;
}

describe('POST /api/newsletter', () => {
  beforeEach(() => {
    appendRowMock.mockReset();
    checkRateLimitMock.mockReset();
    checkRateLimitMock.mockReturnValue({ allowed: true });
    appendRowMock.mockResolvedValue({ ok: true });
  });

  it('returns 400 when the body is not valid JSON', async () => {
    const response = await POST(buildRequest('not json', '203.0.113.1'));
    expect(response.status).toBe(400);
    const body = await readJson<{ code: string }>(response);
    expect(body.code).toBe('validation_error');
    expect(appendRowMock).not.toHaveBeenCalled();
  });

  it('returns 400 with a field error when the email is invalid', async () => {
    const response = await POST(buildRequest({ email: 'not-an-email' }, '203.0.113.1'));
    expect(response.status).toBe(400);
    const body = await readJson<{ code: string; fieldErrors?: { email?: string } }>(response);
    expect(body.code).toBe('validation_error');
    expect(body.fieldErrors?.email).toBeTruthy();
    expect(appendRowMock).not.toHaveBeenCalled();
  });

  it('returns 400 when the email is missing', async () => {
    const response = await POST(buildRequest({}, '203.0.113.1'));
    expect(response.status).toBe(400);
  });

  it('returns 429 when the rate limiter denies the request', async () => {
    checkRateLimitMock.mockReturnValue({ allowed: false, reason: 'rate_limited' });
    const response = await POST(buildRequest({ email: 'a@b.com' }, '203.0.113.1'));
    expect(response.status).toBe(429);
    const body = await readJson<{ code: string }>(response);
    expect(body.code).toBe('rate_limited');
    expect(appendRowMock).not.toHaveBeenCalled();
  });

  it('returns 200 and appends the row on success', async () => {
    const response = await POST(buildRequest({ email: 'alice@example.com' }, '203.0.113.1'));
    expect(response.status).toBe(200);
    const body = await readJson<{ status: string }>(response);
    expect(body.status).toBe('ok');
    expect(appendRowMock).toHaveBeenCalledTimes(1);
    const call = appendRowMock.mock.calls[0]?.[0] as {
      email: string;
      source: string;
      locale: string;
    };
    expect(call.email).toBe('alice@example.com');
    expect(call.source).toBe('footer-form');
    expect(call.locale).toBe('es');
  });

  it('normalises the email before appending', async () => {
    await POST(buildRequest({ email: '  ALICE@Example.COM  ' }, '203.0.113.1'));
    const call = appendRowMock.mock.calls[0]?.[0] as { email: string };
    expect(call.email).toBe('alice@example.com');
  });

  it('returns 500 when the sheet append fails', async () => {
    appendRowMock.mockResolvedValue({ ok: false, reason: 'provider_error' });
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const response = await POST(buildRequest({ email: 'alice@example.com' }, '203.0.113.1'));
    expect(response.status).toBe(500);
    const body = await readJson<{ code: string }>(response);
    expect(body.code).toBe('server_error');
    errorSpy.mockRestore();
  });

  it('reads the IP from x-forwarded-for', async () => {
    await POST(buildRequest({ email: 'a@b.com' }, '198.51.100.7, 10.0.0.1'));
    expect(checkRateLimitMock).toHaveBeenCalledWith('198.51.100.7', '/api/newsletter');
  });
});
