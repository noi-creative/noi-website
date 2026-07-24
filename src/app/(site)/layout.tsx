/**
 * Layout for the `(site)` route group. Public pages only.
 *
 * The `dynamic = "error"` segment config makes the build fail if any page
 * inside this group accidentally uses a dynamic API (cookies(), headers(),
 * searchParams, request-time data, etc.). This is the static-render
 * guardrail required by `IMPLEMENTATION_WORKFLOW.md` §C05 and by ADR-001.
 *
 * The `dynamic = "error"` is set on the layout because Next.js applies
 * route segment config from the closest layout to each page.
 */
export const dynamic = 'error';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
