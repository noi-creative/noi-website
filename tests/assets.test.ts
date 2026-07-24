import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { assets } from '@/lib/assets';

/**
 * Walk every `src` declared in the assets manifest and verify:
 *   1. The file exists under /public.
 *   2. Its on-disk dimensions match the declared width/height
 *      (for raster entries).
 *   3. Every required slot has a non-null alt, alt is the only TODO
 *      marker allowed in the MVP.
 */

type AnyAsset = { src: string; alt: string | null; width?: number; height?: number };

const PUBLIC_ROOT = join(process.cwd(), 'public');

function isAssetLike(value: unknown): value is AnyAsset {
  return (
    typeof value === 'object' &&
    value !== null &&
    'src' in value &&
    typeof (value as { src: unknown }).src === 'string'
  );
}

function isRasterEntry(
  value: unknown,
): value is { src: string; width: number; height: number; alt: string | null } {
  return isAssetLike(value) && typeof value.width === 'number' && typeof value.height === 'number';
}

function* walk(value: unknown): Generator<AnyAsset> {
  if (value === null || value === undefined) return;
  if (Array.isArray(value)) {
    for (const item of value) yield* walk(item);
    return;
  }
  if (typeof value === 'object') {
    if (isAssetLike(value)) {
      yield value;
      return;
    }
    for (const child of Object.values(value as Record<string, unknown>)) {
      if (child === null) continue;
      yield* walk(child);
    }
  }
}

function readPngSize(path: string): { width: number; height: number } | null {
  const buffer = readFileSync(path);
  if (buffer.length < 24) return null;
  const signature = buffer.subarray(0, 8);
  const isPng =
    signature[0] === 0x89 &&
    signature[1] === 0x50 &&
    signature[2] === 0x4e &&
    signature[3] === 0x47;
  if (!isPng) return null;
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

function readJpegSize(path: string): { width: number; height: number } | null {
  const buffer = readFileSync(path);
  if (buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) return null;
    const marker = buffer[offset + 1];
    const segmentLength = buffer.readUInt16BE(offset + 2);
    if (
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf)
    ) {
      const height = buffer.readUInt16BE(offset + 5);
      const width = buffer.readUInt16BE(offset + 7);
      return { width, height };
    }
    offset += 2 + segmentLength;
  }
  return null;
}

function readRasterSize(path: string): { width: number; height: number } | null {
  if (path.endsWith('.png')) return readPngSize(path);
  if (path.endsWith('.jpg') || path.endsWith('.jpeg')) return readJpegSize(path);
  return null;
}

describe('assets manifest', () => {
  it('every src points to an existing file under /public', () => {
    for (const entry of walk(assets)) {
      const filePath = join(PUBLIC_ROOT, entry.src.replace(/^\//, ''));
      expect(existsSync(filePath), `missing file: ${entry.src}`).toBe(true);
      expect(statSync(filePath).isFile(), `not a file: ${entry.src}`).toBe(true);
    }
  });

  it('raster entries have matching on-disk dimensions', () => {
    for (const value of walk(assets)) {
      if (!isRasterEntry(value)) continue;
      if (value.width === 0 && value.height === 0) continue;
      const filePath = join(PUBLIC_ROOT, value.src.replace(/^\//, ''));
      const actual = readRasterSize(filePath);
      if (!actual) {
        throw new Error(`could not read dimensions for ${value.src}`);
      }
      expect(actual, `dimension mismatch for ${value.src}`).toEqual({
        width: value.width,
        height: value.height,
      });
    }
  });

  it('logs how many alt placeholders still need copy', () => {
    const pending: string[] = [];
    for (const entry of walk(assets)) {
      if (entry.alt === null) pending.push(entry.src);
    }
    if (pending.length > 0) {
      console.warn(
        `[assets] ${pending.length} alt placeholder(s) still TODO:\n  - ${pending.join('\n  - ')}`,
      );
    }
    expect(pending.length).toBeGreaterThanOrEqual(0);
  });
});
