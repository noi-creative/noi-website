# C01 — Next.js bootstrap

## Status

Complete (awaiting user commit)

## Objective

Create a clean Next.js project with App Router, TypeScript strict, `src/`, ESLint, alias `@/*`, no Tailwind, no React Compiler, and a minimal neutral root page — without disturbing the pre-existing `src/lib/`, `tests/`, `public/`, `mds/`, `references/`, `docs/` and canonical documents.

## Inputs

- `PRD.md` §6 — Core stack
- `PRD.md` §6.2 — Static rendering rule
- `DESIGN.md` §3 — Design authority
- `AGENTS.md` §4 — Fixed technology decisions
- `AGENTS.md` §5 — Rendering rules
- `IMPLEMENTATION_WORKFLOW.md` §C01
- `docs/decisions/ADR-001-next-vercel-static.md`
- Pre-existing: `src/lib/`, `tests/`, `public/`, `mds/`, `references/`, `docs/`, canonical docs, `.env`, `.gitignore`, `README.md`
- Local toolchain: Node 22.22.0, npm 11.13.0

## Scope

- Run `npx create-next-app@latest .` with the approved flags only.
- Pin Node version via `.nvmrc`.
- Create `.editorconfig` and `.env.example`.
- Preserve every pre-existing file outside `.git/`:
  - Restore `AGENTS.md`, `PRD.md`, `DESIGN.md`, `IMPLEMENTATION_WORKFLOW.md`, `docs/`, `README.md`, `.env`, `mds/`, `references/` untouched.
  - Merge `.gitignore` (keep the `_archive` and `.env` rules, add the Next.js defaults).
  - Preserve `src/lib/` content but let `create-next-app` create `src/app/`, `src/app/globals.css` (later replaced with SCSS in C04) and any other `src/` siblings.
  - Preserve `public/images/` and the `public/` shell.
  - Preserve `tests/assets.test.ts` and the `tests/` folder; the `assets.test.ts` is content-adjacent and will only become runnable once `vitest` is installed in C11.
- Verify `npm run build` and `npm run lint` succeed.
- Remove the demo content from `create-next-app` (replaced logos, demo `page.tsx` and `layout.tsx`) and leave a minimal neutral root page.

## Out of scope

- Installing Motion, react-hook-form, zod, @hookform/resolvers, resend, Google Sheets client, vitest or any other future-cycle dependency. (C09, C10, C11.)
- Styling tokens, SCSS architecture, or any design system. (C04.)
- Form routes, API routes, contact backends. (C10.)
- SEO metadata beyond what a bare root needs. (C08.)
- Committing the cycle (per project rule: the user commits).

## Decisions

- **Toolchain pin:** `.nvmrc` will pin Node 22 (matches local toolchain, broadly supported by Vercel and by Next 15+). The exact Vercel version will be re-confirmed in C12.
- **`.gitignore` strategy:** keep `_archive` and `.env` from the existing file, then add the Next.js defaults (`.next/`, `node_modules/`, `out/`, `build/`, `next-env.d.ts`, `*.tsbuildinfo`, `.vercel`).
- **Demo content removal:** the post-install `page.tsx` is replaced with a minimal neutral page that simply states the project is under construction. The post-install `layout.tsx` is kept structurally but with a neutral `metadata.title`. The `favicon.ico` and `next.svg`/`vercel.svg` (if any) shipped by the template are removed; we will add a proper favicon in C08.
- **Do not set `output: "export"`** — confirmed by ADR-001.
- **Do not enable React Compiler.**
- **No pre-commit / Husky** in this cycle — added in C02.
- **No tests runnable yet.** `tests/assets.test.ts` will be left in place; C11 will install vitest and run it for the first time.

## Expected files

Created (from `create-next-app` + baseline):

- `package.json`
- `package-lock.json`
- `next.config.ts` (or `.mjs`)
- `tsconfig.json`
- `next-env.d.ts`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/globals.css` (will be replaced by SCSS in C04)
- `public/next.svg`, `public/vercel.svg`, `public/file.svg`, `public/globe.svg`, `public/window.svg` (will be removed during demo-content cleanup)
- `public/favicon.ico` (will be removed; proper favicon in C08)
- `.nvmrc`
- `.editorconfig`
- `.env.example`

Merged/modified:

- `.gitignore` — keep `_archive` and `.env`, add Next.js defaults.

Preserved (untouched):

- `AGENTS.md`, `PRD.md`, `DESIGN.md`, `IMPLEMENTATION_WORKFLOW.md`
- `docs/`
- `mds/`
- `references/`
- `public/images/`
- `src/lib/assets.ts` (and any future siblings)
- `tests/assets.test.ts`
- `README.md`
- `.env`
- `.git/`

## Acceptance criteria

- [x] Development server starts (`npm run dev`).
- [x] `tsconfig.json` is in strict mode.
- [x] `src/app/` contains a minimal root layout and page.
- [x] No Tailwind dependency or configuration exists.
- [x] No React Compiler configuration exists.
- [x] `output: "export"` is not set.
- [x] `npm run build` succeeds.
- [x] `npm run lint` succeeds.
- [x] `.nvmrc` exists and matches the local Node major.
- [x] `.env.example` exists with placeholders only.
- [x] `.editorconfig` exists.
- [x] `package-lock.json` is generated.
- [x] No product design is implemented.
- [x] Pre-existing `src/lib/`, `tests/`, `public/`, `mds/`, `references/`, `docs/`, canonical docs, `.env`, `README.md` are preserved.

## Verification commands

```bash
node --version
npx tsc --noEmit
npm run lint
npm run build
ls -1 .nvmrc .editorconfig .env.example
grep -E "tailwind|react-compiler" package.json || echo "OK: no tailwind/react-compiler deps"
grep '"output"' next.config.* || echo "OK: output:export not set"
```

## Verification evidence

- Command: `node --version` → `v22.22.0`.
- Command: `grep '"strict"' tsconfig.json` → `"strict": true,`.
- Command: `grep "tailwind\|react-compiler" package.json` → no match. OK.
- Command: `ls node_modules/babel-plugin-react-compiler` → not installed. OK.
- Command: `grep '"output"' next.config.ts` → no match. OK (no `output: "export"`).
- Command: `ls -1 .nvmrc .editorconfig .env.example package-lock.json` → all present.
- Command: `npm run lint` → 0 errors, 1 warning (pre-existing unused `eslint-disable` directive in `tests/assets.test.ts`, not new code from C01).
- Command: `npm run build` → succeeds. Build output: `Route (app) ┌ ○ /  └ ○ /_not-found`, both `○ (Static) prerendered as static content`.
- Command: `npm run dev` → ready in 348ms, no startup errors.
- Visual viewport checked: not applicable (no product design yet).
- Build route output: `/` is static; `/_not-found` is static.

## Deviations and TODOs

- **One-line correction in pre-existing `src/lib/assets.ts`:** the file declared `const tbd = null as const;` which TypeScript strict (5+) rejects (`A 'const' assertions can only be applied to references to enum members, or string, number, boolean, array, or object literals`). Replaced with `const tbd: null = null;` so the build passes. This is a build-blocking pre-existing defect surfaced by the strict TS check the workflow requires; the alternative was to leave the build broken until a later cycle, which the workflow forbids. The semantic value of `tbd` is unchanged: it is `null` used as the alt-text TODO marker.
- **One pre-existing ESLint warning** (`tests/assets.test.ts:127`): an unused `eslint-disable-next-line no-console` directive. The pre-existing file has it; the new ESLint v9 config does not enable `no-console`. Warning only, not an error, and the file will only run under vitest in C11. Logged as a pre-existing TODO for C11.
- **No TODO metadata yet** in the root layout. The current `description` is `TODO metadata description` as the workflow recommends for development.
- **No tests run in C01.** The test runner is added in C11; the pre-existing `tests/assets.test.ts` is left in place and will run for the first time in C11.
- **The backup directory used to swap files in/out of the project** (`/tmp/noi-website-backup-1784912053`) was removed at the end of the cycle.

## Completion

- Commit: pending — user commits manually per project rule.
- Completed on: 2026-07-24.
