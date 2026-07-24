/**
 * POST /api/newsletter
 *
 * Server-side handler for the newsletter signup. Flow:
 *
 *   1. Parse the JSON body.
 *   2. Validate it with the shared Zod schema (`src/lib/schemas/newsletter`).
 *   3. Apply the rate limit (currently a documented stub; see
 *      `src/lib/services/rate-limit.ts`).
 *   4. Append a row to the configured Google Sheet
 *      (`GOOGLE_SHEETS_SPREADSHEET_ID`).
 *   5. Return a controlled JSON response.
 *
 * The newsletter form is "store only" in the MVP — it does not send any
 * email. Sending the actual newsletter is a post-Q01 task.
 *
 * The handler runs on the Node.js runtime (`googleapis` uses Node-only
 * APIs for JWT signing).
 *
 * PRD §17 (newsletter form) · PRD §27 (error handling).
 */

import { NextResponse, type NextRequest } from 'next/server';
import { newsletterSchema } from '@/lib/schemas/newsletter';
import { appendNewsletterRow, checkRateLimit } from '@/lib/services';

export const runtime = 'nodejs';

type ApiResponse =
  | { status: 'ok' }
  | {
      status: 'error';
      code: 'validation_error' | 'rate_limited' | 'server_error';
      message: string;
      fieldErrors?: { email?: string };
    };

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json<ApiResponse>(
      {
        status: 'error',
        code: 'validation_error',
        message: 'El cuerpo de la solicitud no es JSON válido.',
      },
      { status: 400 },
    );
  }

  const parsed = newsletterSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: { email?: string } = {};
    for (const issue of parsed.error.issues) {
      if (issue.path[0] === 'email' && !fieldErrors.email) {
        fieldErrors.email = issue.message;
      }
    }
    return NextResponse.json<ApiResponse>(
      {
        status: 'error',
        code: 'validation_error',
        message: 'Revisa el correo electrónico.',
        fieldErrors,
      },
      { status: 400 },
    );
  }
  const { email } = parsed.data;

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    null;
  const limit = checkRateLimit(ip, '/api/newsletter');
  if (!limit.allowed) {
    return NextResponse.json<ApiResponse>(
      {
        status: 'error',
        code: 'rate_limited',
        message: 'Te has suscrito demasiadas veces. Inténtalo de nuevo en un minuto.',
      },
      { status: 429 },
    );
  }

  const appended = await appendNewsletterRow({
    email,
    source: 'footer-form',
    locale: 'es',
  });
  if (!appended.ok) {
    console.error('[newsletter] sheet append failed', { reason: appended.reason });
    return NextResponse.json<ApiResponse>(
      {
        status: 'error',
        code: 'server_error',
        message: 'No pudimos completar tu suscripción. Inténtalo de nuevo.',
      },
      { status: 500 },
    );
  }

  return NextResponse.json<ApiResponse>({ status: 'ok' }, { status: 200 });
}
