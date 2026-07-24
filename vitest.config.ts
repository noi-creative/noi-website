import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));

/**
 * Vitest config. Minimal by design:
 *   - `environment: 'node'` — the service and route tests run on Node
 *     because the API routes are Node-only (`runtime = 'nodejs'`).
 *   - `globals: false` — tests import `describe / it / expect / vi`
 *     explicitly. Search-friendly, hard to forget.
 *   - `include` — picks up every `*.test.ts` file under `tests/`.
 *
 * Path aliases mirror the tsconfig so tests can import from `@/...`
 * the same way the source does.
 */
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(root, 'src'),
    },
  },
  test: {
    environment: 'node',
    globals: false,
    include: ['tests/**/*.test.ts'],
    clearMocks: true,
    restoreMocks: true,
  },
});
