/**
 * Google Sheets wrapper for the newsletter signup. Appends one row per
 * successful subscription to the configured spreadsheet.
 *
 * The sheet must be created in Google Sheets and shared with the service
 * account email (the `GOOGLE_SERVICE_ACCOUNT_EMAIL` env var). The default
 * range is `Sheet1!A:D` with the columns:
 *
 *   A — email
 *   B — createdAt (ISO 8601)
 *   C — source (e.g. 'footer-form')
 *   D — locale (e.g. 'es')
 *
 * If a different sheet name or column layout is required, change the
 * `RANGE` constant below or, in a future cycle, lift it to an env var.
 *
 * Setup procedure (Q01 / Q03 checklist):
 *   1. Create a Google Sheet.
 *   2. Share the sheet with the service account email as Editor.
 *   3. Add the env vars to Vercel.
 *
 * Returns a discriminated union so the API route can map to a controlled
 * response. Provider error details are NOT exposed to the client.
 *
 * The Sheets client is built lazily inside the function so env
 * validation runs at request time, not at module load.
 */

import { google } from 'googleapis';
import { getNewsletterEnv } from '@/lib/env';

const RANGE = 'Sheet1!A:D';

export type SheetResult = { ok: true } | { ok: false; reason: 'provider_error' };

export type NewsletterRow = {
  readonly email: string;
  readonly source: string;
  readonly locale: string;
};

export async function appendNewsletterRow(row: NewsletterRow): Promise<SheetResult> {
  const env = getNewsletterEnv();
  const auth = new google.auth.JWT({
    email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    // The private key arrives from the env with literal "\n" sequences.
    // Replace them with real newlines so Node's crypto can sign.
    key: env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: RANGE,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[row.email, new Date().toISOString(), row.source, row.locale]],
      },
    });
    return { ok: true };
  } catch {
    return { ok: false, reason: 'provider_error' };
  }
}
