# Deployment playbook

How to deploy the NOI Creative website to Vercel. The repository is production-ready after C12: the build is static where it can be, the API routes are isolated, the security headers are in `next.config.ts`, and the environment contract is documented. This playbook is the manual step the user runs to put the site on the internet.

The cycle record for the in-repo preparation is [`./cycles/C12-baseline-deployment.md`](./cycles/C12-baseline-deployment.md). The "Completion" section at the bottom of that record reserves a placeholder for the build log captured after the first successful deployment.

---

## 1. Pre-deployment requirements

Before connecting Vercel, three things need to be in place. None of them are Vercel concerns; they are external service concerns.

### 1.1 Node version

The build runs on Node 22. Vercel auto-detects the version from `.nvmrc`; the project's `.nvmrc` already pins `22`. No action required beyond verifying the local environment matches.

```bash
node --version
# Expect: v22.x.x
```

### 1.2 Resend account and domain verification

The contact form sends two emails through Resend. The senders are:

- **Internal notification:** from `formularios@creativenoi.com`, to `hola@creativenoi.com`, with `Reply-To: <submitted email>`.
- **Confirmation:** from `hola@creativenoi.com`, to the submitter.

To send from `creativenoi.com`, the domain must be verified in Resend. Procedure:

1. Create a Resend account at <https://resend.com>.
2. Go to **Domains** → **Add Domain** → enter `creativenoi.com`.
3. Resend shows the DNS records to add. They are typically:
   - One **TXT** record for SPF (`@` → `v=spf1 include:_spf.resend.com ~all`).
   - One or more **CNAME** records for DKIM (`resend._domainkey`, etc.).
4. Add the records at the DNS provider (Cloudflare, Route 53, Namecheap, etc.).
5. Wait for verification. Resend polls every few minutes; full propagation can take up to an hour.
6. Generate an API key: **API Keys** → **Create API Key** → name it `noi-creative-production` → copy the value.

The API key is the value of `RESEND_API_KEY`. The two sender addresses are the values of `CONTACT_FROM_EMAIL` and `CONTACT_RECIPIENT_EMAIL`. None of these go into the repository; they go into the Vercel dashboard in §3.

### 1.3 Google Sheets setup for the newsletter

The newsletter signup appends a row to a Google Sheet. Procedure:

1. Create a Google Cloud project (or use an existing one).
2. Enable the **Google Sheets API**.
3. Create a **Service Account**. Download the JSON key file. The key file contains:
   - `client_email` — this is the value of `GOOGLE_SERVICE_ACCOUNT_EMAIL`.
   - `private_key` — this is the value of `GOOGLE_PRIVATE_KEY`. **Keep the literal `\n` escape sequences; the application replaces them with real newlines at runtime (see `src/lib/services/google-sheets.ts`).**
4. Create the Google Sheet. Name it whatever; the default tab is `Sheet1`. The columns must be:
   - **A:** `email`
   - **B:** `createdAt` (ISO 8601 timestamp)
   - **C:** `source` (e.g. `footer-form`)
   - **D:** `locale` (e.g. `es`)
5. Share the sheet with the service account email as **Editor**. The sheet's URL contains the spreadsheet ID — the value between `/d/` and `/edit`. That is the value of `GOOGLE_SHEETS_SPREADSHEET_ID`.

### 1.4 Vercel account

If you do not already have one, create a Vercel account at <https://vercel.com>. The Vercel **Pro** plan is recommended because the WAF rate-limit rule (§5) requires it. The Hobby plan does not include custom WAF rules; it does include DDoS protection at the edge, which is a reasonable baseline until the WAF rule is added.

---

## 2. Connect the repository

1. In the Vercel dashboard, click **Add New** → **Project**.
2. Import the `noi-website` repository from GitHub. Vercel will request the necessary permissions the first time.
3. On the **Configure Project** screen, Vercel auto-detects the framework as **Next.js**. Leave the defaults:
   - **Build Command:** `npm run build` (Vercel's default, which matches our `package.json`).
   - **Output Directory:** leave blank (Next.js default).
   - **Install Command:** `npm install` (Vercel's default).
4. **Node.js Version:** set to **22.x** in **Settings** → **General** → **Node.js Version**. The `.nvmrc` should drive this, but pinning it in the dashboard makes the intent explicit.
5. **Root Directory:** leave blank (the project is at the repo root).
6. Click **Deploy** to create the first preview deployment. The first build is the one to watch for compile errors and the build log to capture in the C12 cycle record.

Vercel will assign a preview URL of the form `https://noi-website-<hash>-<team>.vercel.app`. Open it; the home page placeholder should render with the header, footer, and skip link from C07.

---

## 3. Environment variables

Vercel has three environments by default: **Development** (local), **Preview** (every PR), and **Production**. The six required variables must be set in **Preview** and **Production** at minimum. The **Development** environment is for `vercel dev` and is optional.

The variables are documented in `.env.example` and validated by `src/lib/env.ts`. The values are never committed.

| Variable                       | Value                                                                                  | Source           |
| ------------------------------ | -------------------------------------------------------------------------------------- | ---------------- |
| `RESEND_API_KEY`               | The API key generated in §1.2                                                          | Resend dashboard |
| `CONTACT_FROM_EMAIL`           | `formularios@creativenoi.com`                                                          | The PRD          |
| `CONTACT_RECIPIENT_EMAIL`      | `hola@creativenoi.com`                                                                 | The PRD          |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | The ID extracted in §1.3                                                               | Google Sheet URL |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | The `client_email` from the service account JSON                                       | Google Cloud     |
| `GOOGLE_PRIVATE_KEY`           | The `private_key` from the service account JSON, with literal `\n` sequences preserved | Google Cloud     |

To add them in Vercel: **Project Settings** → **Environment Variables**. For each variable, type the name, paste the value, and select the environments (**Preview** + **Production**). Click **Save** after each.

**Important:** the `GOOGLE_PRIVATE_KEY` value is multi-line. Vercel's environment-variable input is a single line; paste the entire value with the literal `\n` sequences intact. The application replaces them with real newlines at runtime (`src/lib/services/google-sheets.ts`).

After saving, **redeploy** the project so the new variables take effect: **Deployments** → click the latest deployment → **⋯** → **Redeploy**.

---

## 4. Build verification

After the first successful deployment, verify the build output. The Vercel build log is the place to look; the expected output is the same as `npm run build` produces locally:

```text
Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /api/contact
├ ƒ /api/newsletter
├ ○ /contacto
├ ○ /icon
├ ○ /nosotras
├ ○ /opengraph-image
├ ○ /portafolio
├ ● /portafolio/[slug]
│ ├ /portafolio/content-lab
│ ├ /portafolio/jaze
│ ├ /portafolio/nayeenails
│ └ [+3 more paths]
├ ○ /privacidad
├ ○ /robots.txt
├ ○ /servicios
├ ○ /sitemap.xml
└ ○ /terminos-y-condiciones


○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```

The 9 public routes must be `○ (Static)`. The 6 portfolio paths must be `● (SSG)`. The 2 API routes must be `ƒ (Dynamic)`. If any public route is dynamic, the static-render guardrail in `src/app/(site)/layout.tsx` has been broken — that is a build failure to fix before proceeding.

Copy the build log into the **Completion** section of [`./cycles/C12-baseline-deployment.md`](./cycles/C12-baseline-deployment.md).

---

## 5. Vercel WAF rate-limit rule

The C10 cycle ships a `checkRateLimit` stub in the application code that always returns `{ allowed: true }`. The real rate limit is enforced at the Vercel WAF layer, before the function is even invoked. This is the right layer because:

- The WAF protects the route before the cold-start cost of a serverless function.
- The WAF rule is configured once, in the Vercel dashboard, and applies to every deployment automatically.
- Application code cannot accidentally bypass the WAF.

Procedure:

1. In the Vercel dashboard, go to the project → **Settings** → **Firewall** → **Rate Limiting**.
2. Click **Add Rule**.
3. Configure the rule:
   - **Name:** `noi-api-rate-limit`
   - **Apply to:** select `/api/contact` and `/api/newsletter` (Vercel supports path globs; use `^/api/(contact|newsletter)$` if the UI requires a regex, or pick both paths individually).
   - **Algorithm:** Fixed window.
   - **Requests:** `60`.
   - **Window:** `1 minute`.
   - **Key:** `ip`.
   - **Action:** `429 Too Many Requests`.
4. Click **Save**.

The C10 cycle record (`./cycles/C10-contact-newsletter-backends.md`, §Decisions) is the source of truth for this rule. If a future cycle needs to change the limit, update both the cycle record and the WAF rule.

**Hobby-plan workaround:** if you are on the Vercel Hobby plan and do not have access to the WAF rate-limit feature, the application-level `checkRateLimit` is the only protection. The stub returns `{ allowed: true }`; to make it real, the C10 function would need to call an external service (Upstash Redis, Vercel KV, etc.). That is a separate cycle.

---

## 6. Custom domain

Until the custom domain is connected, the site lives on the Vercel-issued preview URL. The `siteUrl` constant in `src/config/site.ts` already points to `https://creativenoi.com` per the PRD; the actual deployment URL is different until the domain is connected.

Procedure:

1. **Domains** → **Add** → enter `creativenoi.com` (and `www.creativenoi.com` if you want both).
2. Vercel shows the DNS records to add at the domain registrar. They are typically:
   - An **A** record for `@` pointing to Vercel's IP (`76.76.21.21`).
   - A **CNAME** record for `www` pointing to `cname.vercel-dns.com`.
3. Add the records at the registrar. Propagation can take up to 48 hours, but typically completes in minutes.
4. Vercel auto-provisions a Let's Encrypt TLS certificate once the DNS resolves.
5. The site is live at `https://creativenoi.com`.

After the domain is connected, the canonical URL in `src/config/site.ts` matches the live URL. The `Metadata` API (C08) uses this constant for `metadataBase`, `alternates.canonical`, Open Graph URLs, and the JSON-LD `url` field. No further code change is required.

---

## 7. Post-deployment verification

The playbook's last step is to verify the live deployment. Run these from a terminal:

```bash
# 1. The site responds.
curl -I https://creativenoi.com/
# Expect: HTTP/2 200 (or 308 redirecting to the canonical hostname)

# 2. The four security headers are present.
curl -I https://creativenoi.com/ | grep -iE 'x-content-type-options|referrer-policy|permissions-policy|x-frame-options'
# Expect: one match per header.

# 3. The X-Powered-By header is absent.
curl -I https://creativenoi.com/ | grep -i 'x-powered-by'
# Expect: no output (the header is disabled).

# 4. The contact API rejects an empty body (validation error).
curl -X POST https://creativenoi.com/api/contact \
  -H 'content-type: application/json' \
  -d '{}'
# Expect: HTTP 400 with a JSON body containing `status: "error"`, `code: "validation_error"`, and `fieldErrors` for the missing required fields.

# 5. The newsletter API rejects an invalid email.
curl -X POST https://creativenoi.com/api/newsletter \
  -H 'content-type: application/json' \
  -d '{"email": "not-an-email"}'
# Expect: HTTP 400 with `fieldErrors.email` set.

# 6. A real contact submission works end-to-end.
# Fill in the contact form at https://creativenoi.com/contacto and verify:
#   - hola@creativenoi.com receives the internal email with the right `Reply-To`.
#   - The submitter receives the confirmation email.

# 7. A real newsletter signup works end-to-end.
# Fill in the newsletter form in the footer and verify:
#   - A new row appears in the configured Google Sheet with the right email, timestamp, source, locale.
```

If any check fails, see §8 for troubleshooting.

---

## 8. Troubleshooting

### 8.1 "Invalid environment variables" on first request

A request to `/api/contact` or `/api/newsletter` fails with a 500 and the server log shows `Invalid environment variables: …`. The cause is a missing or malformed env var.

Fix:

1. **Vercel Dashboard** → **Project** → **Settings** → **Environment Variables**.
2. Verify each of the six variables is set for the relevant environment.
3. Re-deploy from the **Deployments** tab.

The `src/lib/env.ts` Zod schema's error message lists the missing or malformed keys; cross-reference with `.env.example`.

### 8.2 Emails are not being sent

`/api/contact` returns 200 but no email arrives. Possible causes:

- **Resend domain not verified.** Check the Resend dashboard → **Domains** → status of `creativenoi.com`. If the status is not "Verified", the DNS records are not in place.
- **`CONTACT_FROM_EMAIL` does not match a verified sender.** The `from` address must be `formularios@creativenoi.com` (or another address under a verified domain). The C10 cycle hardcodes this constant; see `src/lib/services/resend.ts`.
- **Resend API key is wrong or revoked.** Generate a new key in the Resend dashboard and update `RESEND_API_KEY` in Vercel.

### 8.3 Newsletter rows are not appearing in the Google Sheet

`/api/newsletter` returns 200 but no row appears. Possible causes:

- **The service account does not have edit access.** Re-share the sheet with the service account email as **Editor**.
- **The sheet name is not `Sheet1`.** The C10 code hardcodes `Sheet1!A:D`. Rename the sheet, or update the constant in `src/lib/services/google-sheets.ts`.
- **The `private_key` is malformed.** The `\n` escape sequences must be preserved. If the Vercel env var shows literal backslash-n, the application will replace them at runtime. If the env var was edited and the escapes were lost, regenerate the env var from the original JSON.
- **The spreadsheet ID is wrong.** Extract the ID from the sheet URL: it is the value between `/d/` and `/edit`.

### 8.4 Static routes are dynamic in the build

A public route that should be static shows `ƒ (Dynamic)` in the build log. The static-render guardrail in `src/app/(site)/layout.tsx` (`export const dynamic = 'error'`) is the safety net; if the build succeeded, the route is static. If the build failed because a page uses a dynamic API (`cookies()`, `headers()`, etc.), the error message names the offending page. Fix the page; the guardrail is intentional.

### 8.5 Rate limit rule is not triggering

The WAF rule is configured but `/api/contact` still responds 200 after 60+ requests in a minute. Possible causes:

- **The rule is scoped to the wrong paths.** Double-check the path glob or regex matches `/api/contact` and `/api/newsletter` exactly.
- **The rule is in Preview but the request is hitting Production** (or vice versa). The WAF rule applies to the deployment's environment, not globally.
- **The WAF rule requires the Pro plan.** Verify the Vercel plan includes WAF rate limiting.

### 8.6 First build is slow or fails

The first build is cold; subsequent builds are cached. If the first build fails:

- Read the build log carefully. Most failures are TypeScript or ESLint errors that `npm run verify` would have caught locally. Run `npm run verify` locally before deploying.
- If the build hangs on `Collecting page data`, the env validation in `src/lib/env.ts` is running during page-data collection. The C10 cycle made the validation lazy (`getEnv()` is called per-request, not at module load); if a future cycle re-introduces top-level validation, the build will fail again.

---

## 9. Going forward

After the first successful deployment, the workflow continues with the page implementation phase (P01–P08). P01 (Home) is the next big visual win; P02 (Nosotras), P03 (Contacto) complete the approved Figma pages. P04 (Servicios), P05 (Portafolio index), and P06 (Project detail) are blocked on Figma approval. P07 (Privacidad) and P08 (Términos y condiciones) are legal-content-only and unblocked.

The Q-cycles that follow the page phase:

- **A01–A04** — animation passes per section, per `IMPLEMENTATION_WORKFLOW.md` §A.
- **Q01** — final SEO and content completion (Panel Sans license, social URLs, OG image, favicon, per-page descriptions, cookie policy).
- **Q02** — performance and accessibility pass (Lighthouse ≥ 90/95/95, LCP < 2.5 s, no CLS).
- **Q03** — production release checklist (the Vercel WAF rule is already configured in C12; Q03 confirms it is active in production).
