import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the env module so we don't touch `process.env` and don't depend on
// the real `getEnv()` memoisation between tests.
const fakeEnv = {
  RESEND_API_KEY: 'test-resend-key',
  CONTACT_FROM_EMAIL: 'formularios@creativenoi.com',
  CONTACT_RECIPIENT_EMAIL: 'hola@creativenoi.com',
  GOOGLE_SHEETS_SPREADSHEET_ID: 'test-sheet-id',
  GOOGLE_SERVICE_ACCOUNT_EMAIL: 'test@test.iam.gserviceaccount.com',
  GOOGLE_PRIVATE_KEY: '-----BEGIN PRIVATE KEY-----\nfake\n-----END PRIVATE KEY-----',
};

vi.mock('@/lib/env', () => ({ getEnv: () => fakeEnv }));

// Mock the Resend SDK at the module boundary. We test that our wrapper
// calls the SDK correctly; we do not test the SDK itself.
const sendMock = vi.fn();
vi.mock('resend', () => ({
  Resend: vi.fn(() => ({ emails: { send: sendMock } })),
}));

import { Resend } from 'resend';
import { sendContactInternal, sendContactConfirmation } from '@/lib/services/resend';
import type { ContactPayload } from '@/lib/schemas/contact';

const payload: ContactPayload = {
  email: 'alice@example.com',
  name: 'Alice',
  service: 'Diseño web',
  investment: 'USD 1.000–2.000',
  social: '@alicebrand',
  comments: 'Quiero una web nueva.',
  privacy: true,
  website: '',
};

describe('resend service', () => {
  beforeEach(() => {
    sendMock.mockReset();
  });

  describe('sendContactInternal', () => {
    it('returns ok with the provider id on success', async () => {
      sendMock.mockResolvedValue({ data: { id: 'email_123' }, error: null });
      const result = await sendContactInternal(payload);
      expect(result).toEqual({ ok: true, id: 'email_123' });
    });

    it('returns provider_error when the SDK returns an error', async () => {
      sendMock.mockResolvedValue({ data: null, error: { message: 'bad' } });
      const result = await sendContactInternal(payload);
      expect(result).toEqual({ ok: false, reason: 'provider_error' });
    });

    it('returns provider_error when the SDK throws', async () => {
      sendMock.mockRejectedValue(new Error('network down'));
      const result = await sendContactInternal(payload);
      expect(result).toEqual({ ok: false, reason: 'provider_error' });
    });

    it('uses CONTACT_FROM_EMAIL as the sender', async () => {
      sendMock.mockResolvedValue({ data: { id: 'email_x' }, error: null });
      await sendContactInternal(payload);
      const call = sendMock.mock.calls[0]?.[0] as { from: string };
      expect(call.from).toBe(fakeEnv.CONTACT_FROM_EMAIL);
    });

    it('sends to CONTACT_RECIPIENT_EMAIL', async () => {
      sendMock.mockResolvedValue({ data: { id: 'email_x' }, error: null });
      await sendContactInternal(payload);
      const call = sendMock.mock.calls[0]?.[0] as { to: string };
      expect(call.to).toBe(fakeEnv.CONTACT_RECIPIENT_EMAIL);
    });

    it('sets replyTo to the submitter email', async () => {
      sendMock.mockResolvedValue({ data: { id: 'email_x' }, error: null });
      await sendContactInternal(payload);
      const call = sendMock.mock.calls[0]?.[0] as { replyTo: string };
      expect(call.replyTo).toBe('alice@example.com');
    });

    it('sends both html and text', async () => {
      sendMock.mockResolvedValue({ data: { id: 'email_x' }, error: null });
      await sendContactInternal(payload);
      const call = sendMock.mock.calls[0]?.[0] as { html: string; text: string };
      expect(typeof call.html).toBe('string');
      expect(call.html.length).toBeGreaterThan(0);
      expect(typeof call.text).toBe('string');
      expect(call.text.length).toBeGreaterThan(0);
    });

    it('passes the api key to the Resend client', async () => {
      sendMock.mockResolvedValue({ data: { id: 'email_x' }, error: null });
      await sendContactInternal(payload);
      expect(Resend).toHaveBeenCalledWith(fakeEnv.RESEND_API_KEY);
    });
  });

  describe('sendContactConfirmation', () => {
    it('returns ok with the provider id on success', async () => {
      sendMock.mockResolvedValue({ data: { id: 'email_456' }, error: null });
      const result = await sendContactConfirmation(payload);
      expect(result).toEqual({ ok: true, id: 'email_456' });
    });

    it('returns provider_error when the SDK returns an error', async () => {
      sendMock.mockResolvedValue({ data: null, error: { message: 'bad' } });
      const result = await sendContactConfirmation(payload);
      expect(result).toEqual({ ok: false, reason: 'provider_error' });
    });

    it('sends to the submitter email (not the operator)', async () => {
      sendMock.mockResolvedValue({ data: { id: 'email_x' }, error: null });
      await sendContactConfirmation(payload);
      const call = sendMock.mock.calls[0]?.[0] as { to: string; replyTo?: string };
      expect(call.to).toBe('alice@example.com');
      expect(call.replyTo).toBeUndefined();
    });

    it('uses CONTACT_FROM_EMAIL as the sender', async () => {
      sendMock.mockResolvedValue({ data: { id: 'email_x' }, error: null });
      await sendContactConfirmation(payload);
      const call = sendMock.mock.calls[0]?.[0] as { from: string };
      expect(call.from).toBe(fakeEnv.CONTACT_FROM_EMAIL);
    });
  });
});
