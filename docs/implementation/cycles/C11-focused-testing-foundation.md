# C11 — Focused testing foundation

## Status

Complete (awaiting user commit)

## Objective

Install Vitest and add the focused tests required by `IMPLEMENTATION_WORKFLOW.md` §C11: invalid payloads rejected, honeypot handled, valid submission requests both emails, provider failure returns a controlled result, input is normalised, newsletter invalid email rejected, Google Sheets failure returns a controlled result. No component snapshots, no Playwright/Cypress, no broad test suite. Tests stay close to the service/schema code they cover.

## Inputs

- `PRD.md` §16, §17, §21, §25, §27.
- `AGENTS.md` §21 (testing rules), §22 (quality gates), §4 (fixed stack), §14 (state), §26 (components).
- `IMPLEMENTATION_WORKFLOW.md` §C11.
- `src/lib/schemas/contact.ts` (C10) — Zod schema.
- `src/lib/schemas/newsletter.ts` (C10) — Zod schema.
- `src/lib/services/email-templates.ts` (C10) — pure functions, html + text builders, `escapeHtml`.
- `src/lib/services/rate-limit.ts` (C10) — stub `checkRateLimit`.
- `src/lib/services/resend.ts` (C10) — Resend wrapper.
- `src/lib/services/google-sheets.ts` (C10) — googleapis wrapper.
- `src/lib/env.ts` (C10) — lazy Zod-validated env.
- `src/app/api/contact/route.ts` (C10) — full handler.
- `src/app/api/newsletter/route.ts` (C10) — full handler.
- `tests/assets.test.ts` (C02) — pre-existing test that imports from `vitest` but the test runner was a placeholder. C11 makes it runnable.
- `package.json` — currently has the C02 placeholder `test` script (`echo 'No tests yet' && exit 0`).
- `tsconfig.json` — currently excludes `tests/` so `npm run typecheck` skips them. C11 removes the exclude.

## Scope

**Dependencies:**

- `npm install --save-dev vitest@^2` (latest stable; the pre-existing `tests/assets.test.ts` already imports from `vitest`).

**Configuration:**

- `vitest.config.ts` — minimal config: `environment: 'node'`, explicit imports (no globals), test pattern `tests/**/*.test.ts`, path alias `@/*` mirroring the tsconfig.
- `tsconfig.json` — remove the `tests` entry from `exclude` so `tsc --noEmit` covers the tests too. The C02 exclusion was a placeholder; C11 reverses it.
- `package.json` — replace the placeholder `test` script with `vitest run` so `npm run verify` exercises a real suite.

**Tests (eight new test files):**

- `tests/schemas/contact.test.ts` — Zod schema tests. Required fields, enum enforcement, normalisation (trim + lowercase email), privacy=true, honeypot max length, comments max length.
- `tests/schemas/newsletter.test.ts` — Zod schema tests. Email required, email format, normalisation.
- `tests/services/email-templates.test.ts` — `escapeHtml` correctness, internal + confirmation email subject, presence of the brand name, presence of the user's name and email, escaping of user-supplied HTML.
- `tests/services/rate-limit.test.ts` — stub returns `{ allowed: true }`; null IP doesn't throw.
- `tests/services/resend.test.ts` — Resend SDK is mocked. Verifies that the right args are sent (from, to, replyTo, subject, html, text) and that provider failure maps to `{ ok: false, reason: 'provider_error' }`.
- `tests/services/google-sheets.test.ts` — googleapis is mocked. Verifies the append call args, the `\n` replacement in the private key, and the provider-failure mapping.
- `tests/api/contact.test.ts` — services barrel is mocked. Covers: 400 on invalid JSON, 400 with `fieldErrors` on schema violation, silent 200 on honeypot fill (services NOT called), 429 on rate limit, 200 with both services called on success, 200 when confirmation fails after internal succeeds, 500 when internal fails.
- `tests/api/newsletter.test.ts` — services barrel is mocked. Covers: 400 on invalid JSON, 400 with `fieldErrors` on invalid email, 429 on rate limit, 200 on success, 500 on sheet failure.

**Cycle record + docs:**

- `docs/implementation/cycles/C11-focused-testing-foundation.md` (this file).
- `docs/implementation/STATUS.md` — C11 row added.
- `docs/implementation/ROADMAP.md` — C11 row → `Complete`.

## Out of scope

- **Component snapshot tests.** Forbidden by `AGENTS.md` §21. No `*.snap` files.
- **Component / DOM / interaction tests.** No `@testing-library/react`, no `@testing-library/dom`, no jsdom. The form components are exercised manually in P01 / P03 with the real provider keys; the test suite is for the service and schema layer.
- **Playwright, Cypress, any browser automation.** Forbidden by `AGENTS.md` §4 and §21.
- **Resend SDK internals.** We mock the boundary and verify our call; we do not retest the SDK.
- **googleapis SDK internals.** Same: mock the boundary, verify our call.
- **Visual regression.** Out of scope for the MVP (per `AGENTS.md` §21).
- **Coverage thresholds.** The cycle covers the critical paths called out by `IMPLEMENTATION_WORKFLOW.md` §C11. A coverage gate is not configured; the suite is small and intentional.
- **Concurrent test execution / sharding.** The suite runs in a single process; CI can parallelise later if it matters.
- **Mock library upgrade** (e.g. `vi.mocked` helper tuning). We use the standard `vi.mock()` + `vi.fn()` patterns.

## Decisions

- **Vitest 2.x over Vitest 3.x or Jest.** Vitest is the standard for Vite/Next.js projects. Jest would force Babel configuration for TypeScript. The pre-existing `tests/assets.test.ts` already imports from `vitest`; staying on vitest is the lowest-friction path. Vitest 2.x is the current stable line and the one the rest of the ecosystem has stabilised on.
- **No globals.** Tests import `describe / it / expect / vi / beforeEach` explicitly. The default `globals: true` is convenient but easy to forget; explicit imports are searchable in the code review.
- **No `jsdom` environment.** The tests are pure service/schema code. `environment: 'node'` matches the runtime the services actually run in (the API routes use `runtime = 'nodejs'`).
- **Mock via the services barrel, not the individual modules.** The route tests mock `@/lib/services` (the barrel) and the services' tests mock the underlying SDKs (`resend`, `googleapis`). The barrel is the public contract the routes use; mocking at that level is honest about what is being tested.
- **Mock `process.env` per test, not via a setup file.** Each test that needs env values sets them in a `beforeEach` and clears them in an `afterEach`. A global setup file would couple every test to a single env shape.
- **The existing `tests/assets.test.ts` is preserved as-is.** It already covers the asset manifest. C11 does not extend it; C11 makes it run. The pre-existing ESLint warning (unused var from the polymorphic Button in C07) is in the same file, unchanged.
- **No separate `tsconfig.test.json`.** A single `tsconfig.json` with `tests/` in `include` (via `**/*.ts`) and out of `exclude` is the simplest configuration. The cost is that `next build` also typechecks the tests, but the tests are small and the build is faster than the dev server anyway.
- **No `coverage` script.** The test count is small and the focus is on the critical paths called out in the workflow. Coverage thresholds add maintenance for no real signal at this size.
- **Test files mirror the source layout** (`tests/schemas/`, `tests/services/`, `tests/api/`) so the location of a test is predictable from the file it tests.
- **No test for `src/lib/env.ts`.** The env module is a thin wrapper around a Zod schema. The schema is implicitly tested by the route tests (which fail loudly if the env throws). A dedicated test would require extensive `process.env` plumbing for marginal value.
- **No test for the email templates' exact HTML output.** We test that the brand name is present, the user's name and email are present, and the user's text is escaped. We do not test exact pixel-perfect HTML; the templates can evolve without breaking the suite. (Brittle HTML tests are a maintenance trap.)
- **No test for the `Controller` pattern in `ContactForm`.** RHF + Zod are upstream libraries; the boilerplate is exercised manually in P03. The workflow explicitly forbids testing UI components at this stage.

## Expected files

Created:

- `vitest.config.ts`
- `tests/schemas/contact.test.ts`
- `tests/schemas/newsletter.test.ts`
- `tests/services/email-templates.test.ts`
- `tests/services/rate-limit.test.ts`
- `tests/services/resend.test.ts`
- `tests/services/google-sheets.test.ts`
- `tests/api/contact.test.ts`
- `tests/api/newsletter.test.ts`
- `docs/implementation/cycles/C11-focused-testing-foundation.md` (this file)

Modified:

- `package.json` + `package-lock.json` — `vitest` added to `devDependencies`; the `test` script changed from the C02 placeholder to `vitest run`.
- `tsconfig.json` — `tests` removed from `exclude` so `tsc --noEmit` covers the tests.
- `docs/implementation/STATUS.md` — C11 row added.
- `docs/implementation/ROADMAP.md` — C11 row → `Complete`.

Untouched:

- Every source file under `src/`. The tests are written against the existing public API.
- `tests/assets.test.ts` (C02) — kept as-is; the placeholder test script was the only thing preventing it from running.

## Acceptance criteria

- [x] `vitest` is installed and listed under `devDependencies`.
- [x] `npm run test` invokes `vitest run`, runs once and exits.
- [x] The pre-existing `tests/assets.test.ts` runs and passes.
- [x] `tests/schemas/contact.test.ts` covers: required fields, enum enforcement, normalisation, privacy, honeypot, comments length.
- [x] `tests/schemas/newsletter.test.ts` covers: email required, email format, normalisation.
- [x] `tests/services/email-templates.test.ts` covers: `escapeHtml`, subject, brand, escaping.
- [x] `tests/services/rate-limit.test.ts` covers: stub returns allowed, null IP doesn't throw.
- [x] `tests/services/resend.test.ts` covers: send args, replyTo for internal, success/failure mapping.
- [x] `tests/services/google-sheets.test.ts` covers: append args, private-key replacement, success/failure mapping.
- [x] `tests/api/contact.test.ts` covers: invalid JSON, validation error with field errors, honeypot silent 200, rate limit, success, confirmation failure after internal success, internal failure.
- [x] `tests/api/newsletter.test.ts` covers: invalid JSON, invalid email, rate limit, success, sheet failure.
- [x] No `*.snap` files. No `playwright.config` or `cypress.config`. No `jsdom` in the vitest config.
- [x] `tsconfig.json` no longer excludes `tests/`.
- [x] `npm run typecheck` passes (including the new test files).
- [x] `npm run lint` passes (0 errors, 1 pre-existing warning in `tests/assets.test.ts`).
- [x] `npm run format:check` passes.
- [x] `npm run test` passes.
- [x] `npm run build` succeeds; every public route remains `○ (Static)`, the 6 SSG paths remain `● (SSG)`, and the two API routes remain `ƒ (Dynamic)`.
- [x] `npm run verify` end-to-end passes (this is the gate that proves the test step is real now, not a placeholder).

## Verification commands

```bash
ls -1 tests/schemas tests/services tests/api
cat vitest.config.ts
npm ls vitest
npm run typecheck
npm run lint
npm run format:check
npm run test
npm run build
npm run verify
```

## Verification evidence

- `npm install --save-dev vitest@^2` → resolved; added to `devDependencies`. The test count is 8 new files plus the pre-existing `assets.test.ts`.
- `npm run test` runs once and exits 0.
- `npm run typecheck` → passes; the new test files typecheck cleanly (no implicit any, no unused vars in the production code touched by the tests).
- `npm run lint` → 0 errors, 1 pre-existing warning in `tests/assets.test.ts:127` (unchanged from C01).
- `npm run format:check` → passes.
- `npm run build` → 9 public routes static, 6 SSG, 2 dynamic API routes. No regressions.
- `npm run verify` → end-to-end OK; the `test` step now runs the real suite.

## Deviations and TODOs

- **Vitest 2.x is the installed line.** Vitest 3.x exists at the time of writing but is newer; the `vitest` import in the pre-existing `tests/assets.test.ts` works on both. The cycle pins to `^2` for stability. A future cycle can upgrade if the ecosystem consolidates on 3.x.
- **No tests for the form components.** The workflow explicitly forbids UI-component tests in the MVP (`AGENTS.md` §21). The form components are exercised manually in P03 with the real provider keys.
- **The pre-existing ESLint warning in `tests/assets.test.ts:127` remains.** It is unrelated to C11 and was there in C01.
- **No `tsconfig.test.json`.** A single `tsconfig.json` is simpler and the build cost of typechecking ~9 small test files is negligible. If the test suite grows materially, a split tsconfig is the standard fix.
- **No coverage gate.** Adding one now would create noise (the suite is intentionally small). A future cycle can add a threshold if the test surface grows.
- **The `vitest` `vi.mock` API is used at the file level.** Per-test re-mocking is supported by Vitest but is not needed for the current suite; the file-level mocks are reset between tests by the `vi.clearAllMocks()` call in the route tests.
- **The `resend` and `googleapis` mocks are not type-checked against the real SDKs.** They use `vi.fn()` with `as unknown as` casts. The alternative is a generated mock from `msw` or the SDK's own test helpers; the cost is not justified for the MVP.

## Completion

- Commit: pending — user commits manually per project rule.
- Completed on: 2026-07-24.
