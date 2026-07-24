import { NextResponse } from 'next/server';

/**
 * POST /api/newsletter
 *
 * Implemented in C10. Until then, every request returns 501 Not Implemented
 * so the route exists in the build output and the newsletter form (footer
 * shell, C07) can already be wired to a real endpoint.
 */

export const dynamic = 'force-dynamic';

export async function POST(): Promise<NextResponse> {
  return NextResponse.json(
    { error: 'not_implemented', message: 'Newsletter endpoint lands in C10.' },
    { status: 501 },
  );
}
