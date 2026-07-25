import { describe, it, expect, vi, beforeEach } from 'vitest';

const fakeNewsletterEnv = {
  GOOGLE_SHEETS_SPREADSHEET_ID: 'test-sheet-id',
  GOOGLE_SERVICE_ACCOUNT_EMAIL: 'test@test.iam.gserviceaccount.com',
  // The real private key in the env has escaped "\n" sequences; the
  // service is expected to replace them with real newlines.
  GOOGLE_PRIVATE_KEY: '-----BEGIN PRIVATE KEY-----\\nfake\\n-----END PRIVATE KEY-----',
};

vi.mock('@/lib/env', () => ({ getNewsletterEnv: () => fakeNewsletterEnv }));

// Mock the googleapis SDK. We test the call shape; we do not retest the SDK.
const appendMock = vi.fn();
vi.mock('googleapis', () => ({
  google: {
    auth: { JWT: vi.fn(() => ({/* token client */})) },
    sheets: vi.fn(() => ({ spreadsheets: { values: { append: appendMock } } })),
  },
}));

import { google } from 'googleapis';
import { appendNewsletterRow } from '@/lib/services/google-sheets';

// Cast helpers — `vi.mock` replaces the module with `vi.fn()` factories
// but the TypeScript types still reference the real classes. These casts
// are local to the test file and only widen the surface we already mock.
const mockedJwt = google.auth.JWT as unknown as ReturnType<typeof vi.fn>;
const mockedSheets = google.sheets as unknown as ReturnType<typeof vi.fn>;

describe('google-sheets service', () => {
  beforeEach(() => {
    appendMock.mockReset();
    appendMock.mockResolvedValue({ data: {} });
    mockedJwt.mockClear();
    mockedSheets.mockClear();
  });

  it('returns ok on a successful append', async () => {
    const result = await appendNewsletterRow({
      email: 'alice@example.com',
      source: 'footer-form',
      locale: 'es',
    });
    expect(result).toEqual({ ok: true });
  });

  it('returns provider_error when the SDK throws', async () => {
    appendMock.mockRejectedValue(new Error('sheet not found'));
    const result = await appendNewsletterRow({
      email: 'alice@example.com',
      source: 'footer-form',
      locale: 'es',
    });
    expect(result).toEqual({ ok: false, reason: 'provider_error' });
  });

  it('uses the configured spreadsheet id', async () => {
    await appendNewsletterRow({
      email: 'alice@example.com',
      source: 'footer-form',
      locale: 'es',
    });
    const call = appendMock.mock.calls[0]?.[0] as { spreadsheetId: string };
    expect(call.spreadsheetId).toBe(fakeNewsletterEnv.GOOGLE_SHEETS_SPREADSHEET_ID);
  });

  it('appends to the expected range', async () => {
    await appendNewsletterRow({
      email: 'alice@example.com',
      source: 'footer-form',
      locale: 'es',
    });
    const call = appendMock.mock.calls[0]?.[0] as { range: string };
    expect(call.range).toBe('Sheet1!A:D');
  });

  it('uses USER_ENTERED so Sheets parses the date as a date', async () => {
    await appendNewsletterRow({
      email: 'alice@example.com',
      source: 'footer-form',
      locale: 'es',
    });
    const call = appendMock.mock.calls[0]?.[0] as { valueInputOption: string };
    expect(call.valueInputOption).toBe('USER_ENTERED');
  });

  it('sends [email, createdAt ISO, source, locale]', async () => {
    await appendNewsletterRow({
      email: 'alice@example.com',
      source: 'footer-form',
      locale: 'es',
    });
    const call = appendMock.mock.calls[0]?.[0] as {
      requestBody: { values: string[][] };
    };
    const row = call.requestBody.values[0];
    expect(row?.[0]).toBe('alice@example.com');
    expect(typeof row?.[1]).toBe('string');
    expect(new Date(row![1] as string).toString()).not.toBe('Invalid Date');
    expect(row?.[2]).toBe('footer-form');
    expect(row?.[3]).toBe('es');
  });

  it('replaces \\n with real newlines in the private key', async () => {
    await appendNewsletterRow({
      email: 'alice@example.com',
      source: 'footer-form',
      locale: 'es',
    });
    const jwtCall = mockedJwt.mock.calls[0]?.[0] as { key: string };
    expect(jwtCall.key).toBe('-----BEGIN PRIVATE KEY-----\nfake\n-----END PRIVATE KEY-----');
  });

  it('uses the service account email in the JWT client', async () => {
    await appendNewsletterRow({
      email: 'alice@example.com',
      source: 'footer-form',
      locale: 'es',
    });
    const jwtCall = mockedJwt.mock.calls[0]?.[0] as { email: string };
    expect(jwtCall.email).toBe(fakeNewsletterEnv.GOOGLE_SERVICE_ACCOUNT_EMAIL);
  });

  it('requests the spreadsheets scope only', async () => {
    await appendNewsletterRow({
      email: 'alice@example.com',
      source: 'footer-form',
      locale: 'es',
    });
    const jwtCall = mockedJwt.mock.calls[0]?.[0] as { scopes: string[] };
    expect(jwtCall.scopes).toEqual(['https://www.googleapis.com/auth/spreadsheets']);
  });
});
