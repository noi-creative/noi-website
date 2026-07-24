import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

// Mock the services barrel. The route imports everything from
// `@/lib/services`; replacing the barrel at the module boundary is the
// honest way to test the route without touching the real providers.
// `vi.hoisted` is required because `vi.mock` is hoisted above the imports
// but the `vi.fn()` references are not.
import type { Mock } from 'vitest';
import type { RateLimitDecision } from '@/lib/services';
const { sendInternalMock, sendConfirmationMock, checkRateLimitMock } = vi.hoisted(() => {
  const sendInternal = vi.fn();
  const sendConfirmation = vi.fn();
  const checkRateLimit = vi.fn(() => ({ allowed: true }) as RateLimitDecision) as Mock<
    (ip: string | null, route: '/api/contact' | '/api/newsletter') => RateLimitDecision
  >;
  return {
    sendInternalMock: sendInternal,
    sendConfirmationMock: sendConfirmation,
    checkRateLimitMock: checkRateLimit,
  };
});

vi.mock('@/lib/services', () => ({
  sendContactInternal: sendInternalMock,
  sendContactConfirmation: sendConfirmationMock,
  appendNewsletterRow: vi.fn(),
  checkRateLimit: checkRateLimitMock,
  buildContactInternalEmail: () => ({ subject: 's', html: 'h', text: 't' }),
  buildContactConfirmationEmail: () => ({ subject: 's', html: 'h', text: 't' }),
}));

import { POST } from '@/app/api/contact/route';
import { site } from '@/config/site';

const validPayload = {
  email: 'alice@example.com',
  name: 'Alice',
  service: 'Diseño web',
  investment: 'USD 1.000–2.000',
  social: '@alicebrand',
  comments: 'Quiero una web nueva.',
  privacy: true,
  website: '',
};

function buildRequest(body: unknown, ip?: string): NextRequest {
  const headers: Record<string, string> = { 'content-type': 'application/json' };
  if (ip) headers['x-forwarded-for'] = ip;
  return new NextRequest(`${site.siteUrl}/api/contact`, {
    method: 'POST',
    body: typeof body === 'string' ? body : JSON.stringify(body),
    headers,
  });
}

async function readJson<T>(response: Response): Promise<T> {
  return (await response.json()) as T;
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    sendInternalMock.mockReset();
    sendConfirmationMock.mockReset();
    checkRateLimitMock.mockReset();
    checkRateLimitMock.mockReturnValue({ allowed: true });
    sendInternalMock.mockResolvedValue({ ok: true, id: 'email_int' });
    sendConfirmationMock.mockResolvedValue({ ok: true, id: 'email_conf' });
  });

  it('returns 400 when the body is not valid JSON', async () => {
    const response = await POST(buildRequest('not json', '203.0.113.1'));
    expect(response.status).toBe(400);
    const body = await readJson<{ status: string; code: string }>(response);
    expect(body.status).toBe('error');
    expect(body.code).toBe('validation_error');
  });

  it('returns 400 with field errors on schema violation', async () => {
    const response = await POST(
      buildRequest({ ...validPayload, email: 'not-an-email' }, '203.0.113.1'),
    );
    expect(response.status).toBe(400);
    const body = await readJson<{
      status: string;
      code: string;
      fieldErrors?: Record<string, string>;
    }>(response);
    expect(body.code).toBe('validation_error');
    expect(body.fieldErrors?.email).toBeTruthy();
    expect(sendInternalMock).not.toHaveBeenCalled();
    expect(sendConfirmationMock).not.toHaveBeenCalled();
  });

  it('returns 400 when privacy is false', async () => {
    const response = await POST(buildRequest({ ...validPayload, privacy: false }, '203.0.113.1'));
    expect(response.status).toBe(400);
    const body = await readJson<{ fieldErrors?: Record<string, string> }>(response);
    expect(body.fieldErrors?.privacy).toBeTruthy();
  });

  it('returns 200 silently when the honeypot is filled (no services called)', async () => {
    const response = await POST(
      buildRequest({ ...validPayload, website: 'spam-bot' }, '203.0.113.1'),
    );
    expect(response.status).toBe(200);
    const body = await readJson<{ status: string }>(response);
    expect(body.status).toBe('ok');
    expect(sendInternalMock).not.toHaveBeenCalled();
    expect(sendConfirmationMock).not.toHaveBeenCalled();
  });

  it('returns 429 when the rate limiter denies the request', async () => {
    checkRateLimitMock.mockReturnValue({ allowed: false, reason: 'rate_limited' });
    const response = await POST(buildRequest(validPayload, '203.0.113.1'));
    expect(response.status).toBe(429);
    const body = await readJson<{ code: string }>(response);
    expect(body.code).toBe('rate_limited');
    expect(sendInternalMock).not.toHaveBeenCalled();
  });

  it('returns 200 and calls both services on success', async () => {
    const response = await POST(buildRequest(validPayload, '203.0.113.1'));
    expect(response.status).toBe(200);
    const body = await readJson<{ status: string }>(response);
    expect(body.status).toBe('ok');
    expect(sendInternalMock).toHaveBeenCalledTimes(1);
    expect(sendConfirmationMock).toHaveBeenCalledTimes(1);
  });

  it('returns 200 when internal succeeds but confirmation fails', async () => {
    sendConfirmationMock.mockResolvedValue({ ok: false, reason: 'provider_error' });
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const response = await POST(buildRequest(validPayload, '203.0.113.1'));
    expect(response.status).toBe(200);
    const body = await readJson<{ status: string }>(response);
    expect(body.status).toBe('ok');
    expect(sendInternalMock).toHaveBeenCalledTimes(1);
    expect(sendConfirmationMock).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it('returns 500 when the internal email fails', async () => {
    sendInternalMock.mockResolvedValue({ ok: false, reason: 'provider_error' });
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const response = await POST(buildRequest(validPayload, '203.0.113.1'));
    expect(response.status).toBe(500);
    const body = await readJson<{ code: string; message: string }>(response);
    expect(body.code).toBe('server_error');
    expect(body.message).toContain('hola@creativenoi.com');
    expect(sendConfirmationMock).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it('passes the normalised payload to the services', async () => {
    await POST(
      buildRequest(
        { ...validPayload, email: '  ALICE@Example.COM  ', name: '  Alice  ' },
        '203.0.113.1',
      ),
    );
    const call = sendInternalMock.mock.calls[0]?.[0] as { email: string; name: string };
    expect(call.email).toBe('alice@example.com');
    expect(call.name).toBe('Alice');
  });

  it('reads the IP from x-forwarded-for', async () => {
    await POST(buildRequest(validPayload, '198.51.100.7, 10.0.0.1'));
    expect(checkRateLimitMock).toHaveBeenCalledWith('198.51.100.7', '/api/contact');
  });

  it('falls back to x-real-ip when x-forwarded-for is missing', async () => {
    const req = new NextRequest(`${site.siteUrl}/api/contact`, {
      method: 'POST',
      body: JSON.stringify(validPayload),
      headers: { 'content-type': 'application/json', 'x-real-ip': '203.0.113.99' },
    });
    await POST(req);
    expect(checkRateLimitMock).toHaveBeenCalledWith('203.0.113.99', '/api/contact');
  });
});
