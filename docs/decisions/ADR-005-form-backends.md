# ADR-005 — Form backends (Resend for contact, Google Sheets for newsletter)

- **Status:** Accepted
- **Date:** 2026-07-24
- **Deciders:** Project lead, coding agent
- **Cycle:** C00 — Governance

## Context

The site has two user-facing forms:

1. **Contact form** — must deliver an internal notification to the studio and a confirmation email to the user. Must support Spanish copy, be protected by a honeypot and a rate limit, and use server-side validation that does not trust the client.
2. **Newsletter form** — must only capture emails during the MVP; it does **not** send newsletters, does not integrate with a marketing platform, and does not require a transactional email provider.

`PRD.md` §14 and §15 already specify Resend for the contact flow and the Google Sheets API for newsletter storage. The PRD also fixes the verified domain (`creativenoi.com`), the internal recipient (`hola@creativenoi.com`) and the suggested technical sender (`formularios@creativenoi.com`).

We need a rule that:

- Locks the providers in.
- Keeps secrets server-only.
- Defines the minimum spam protection (honeypot, rate limit, payload size, server validation, normalised text, no raw user HTML in email).
- Defers rate-limit implementation to either deployment-level (Vercel) or a small in-process primitive that does not rely on memory counters in serverless.

## Decision

- **Contact form** uses **Resend**:
  - Two emails per successful submission: an internal notification to `hola@creativenoi.com` and a confirmation to the user.
  - The internal email's `reply-to` is set to the submitted email.
  - The technical sender is `formularios@creativenoi.com`; the confirmation sender is `hola@creativenoi.com`. Both are under the verified domain.
  - All copy is plain text or sanitised HTML; raw user HTML is never rendered in the outgoing email.
  - Server-side Zod validation is authoritative. Client-side validation is convenience only.
- **Newsletter form** uses the **Google Sheets API** with a service account:
  - One row per successful submission with at minimum: `email`, `createdAt`, `source`, `locale`.
  - No email is sent from the website.
- **Secrets** (`RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_RECIPIENT_EMAIL`, `GOOGLE_SHEETS_SPREADSHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`) live in server-only environment variables and are never exposed to Client Components.
- **Rate limiting** is configured at the Vercel deployment level for the two API routes rather than relying on in-memory counters. The exact route rule is recorded in the C12 cycle record when the deployment is validated.
- The Google Sheets integration chooses the smallest maintained library that supports server-side service-account authentication. The package decision is recorded in the C10 cycle record before installation.

## Consequences

Positive:

- The two forms use the smallest viable providers, matching the MVP's non-goals (no marketing platform, no newsletter sender).
- Server-only secrets keep the Client Component bundle small.
- Honeypot + rate limit + payload limit + Zod validation give us defence in depth without a CAPTCHA.

Trade-offs accepted:

- A spam attack that exceeds the deployment-level rate limit will see 429 responses. Acceptable; the limit can be tuned in Vercel without a code change.
- The newsletter spreadsheet must be exported manually to integrate with any future marketing platform. The MVP does not automate this.

## Reversibility

Low to medium.

- The contact form can move from Resend to another transactional provider (Postmark, SendGrid, AWS SES) by replacing the email service adapter. The route handler signature and the Zod schema do not change.
- The newsletter storage can move from Google Sheets to any other storage (Supabase, Airtable, a real newsletter platform) by replacing the storage adapter.

The contract between the form components and the route handlers is the Zod schema, not the provider.

## References

- `PRD.md` §14 — Contact form.
- `PRD.md` §15 — Newsletter form.
- `IMPLEMENTATION_WORKFLOW.md` §C10, §C11, §C12.
