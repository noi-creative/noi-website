/**
 * POST /api/contact
 *
 * Server-side handler for the contact form. Flow:
 *
 *   1. Parse the JSON body.
 *   2. Validate it with the shared Zod schema (`src/lib/schemas/contact`).
 *      The schema normalises strings (trim, lowercase email) and enforces
 *      PRD §16's required fields, service options, investment options and
 *      the privacy acceptance.
 *   3. Check the honeypot. If filled, silently return 200 and do nothing
 *      (bots believe they succeeded).
 *   4. Apply the rate limit (currently a documented stub; see
 *      `src/lib/services/rate-limit.ts`).
 *   5. Send the internal notification email to `CONTACT_RECIPIENT_EMAIL`
 *      with `Reply-To: <submitted email>`.
 *   6. Send the confirmation email to the submitter. A confirmation
 *      failure does not break the contact flow (the operator already has
 *      the message); it is logged and the response is still 200.
 *   7. Return a controlled JSON response. The client distinguishes
 *      between `ok`, `validation_error`, `rate_limited` and `server_error`
 *      and surfaces an inline message to the user.
 *
 * The handler runs on the Node.js runtime (Resend uses Node-only APIs).
 *
 * PRD §16 (contact form) · PRD §27 (error handling).
 */

import { NextResponse, type NextRequest } from 'next/server';
import { contactSchema, type ContactFieldName } from '@/lib/schemas/contact';
import { sendContactInternal, sendContactConfirmation, checkRateLimit } from '@/lib/services';

export const runtime = 'nodejs';

type ApiResponse =
  | { status: 'ok' }
  | {
      status: 'error';
      code: 'validation_error' | 'rate_limited' | 'server_error';
      message: string;
      fieldErrors?: Partial<Record<ContactFieldName, string>>;
    };

function errorResponse(
  code: 'validation_error' | 'rate_limited' | 'server_error',
  message: string,
  status: number,
  fieldErrors?: Partial<Record<ContactFieldName, string>>,
): NextResponse<ApiResponse> {
  const body: ApiResponse = {
    status: 'error',
    code,
    message,
    ...(fieldErrors ? { fieldErrors } : {}),
  };
  return NextResponse.json(body, { status });
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  // 1. Parse the JSON body. Reject malformed payloads with a 400.
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return errorResponse('validation_error', 'El cuerpo de la solicitud no es JSON válido.', 400);
  }

  // 2. Server-side validation with the same Zod schema the client uses.
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<ContactFieldName, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === 'string' && !(key in fieldErrors)) {
        fieldErrors[key as ContactFieldName] = issue.message;
      }
    }
    return errorResponse('validation_error', 'Revisa los campos marcados.', 400, fieldErrors);
  }
  const payload = parsed.data;

  // 3. Honeypot. If filled, pretend everything succeeded and do nothing.
  if (payload.website && payload.website.length > 0) {
    return NextResponse.json<ApiResponse>({ status: 'ok' }, { status: 200 });
  }

  // 4. Rate limit. Today this always returns `{ allowed: true }` (see
  //    `src/lib/services/rate-limit.ts`). The signature is the final API.
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    null;
  const limit = checkRateLimit(ip, '/api/contact');
  if (!limit.allowed) {
    return errorResponse(
      'rate_limited',
      'Has enviado demasiados mensajes. Inténtalo de nuevo en un minuto.',
      429,
    );
  }

  // 5. Internal notification. A failure here is a server error: the
  //    operator must know.
  const internal = await sendContactInternal(payload);
  if (!internal.ok) {
    console.error('[contact] internal email failed', { reason: internal.reason });
    return errorResponse(
      'server_error',
      'No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos directamente a hola@creativenoi.com.',
      500,
    );
  }

  // 6. Confirmation email. Failure here does not break the flow; the
  //    user already contacted us.
  const confirmation = await sendContactConfirmation(payload);
  if (!confirmation.ok) {
    console.error('[contact] confirmation email failed', { reason: confirmation.reason });
  }

  return NextResponse.json<ApiResponse>({ status: 'ok' }, { status: 200 });
}
