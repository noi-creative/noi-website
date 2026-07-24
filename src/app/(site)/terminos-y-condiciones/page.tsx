import type { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Markdown } from '@/components/legal/Markdown';
import { buildPageMetadata } from '@/lib/metadata';
import { site } from '@/config/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Términos y Condiciones',
  description: 'Términos y Condiciones de NOI Creative LLC.',
  path: site.routes.terminos,
});

const TERMINOS_PATH = join(process.cwd(), 'src', 'content', 'legal', 'terminos-y-condiciones.md');

export default async function TerminosPage() {
  const source = await readFile(TERMINOS_PATH, 'utf8');
  return <Markdown>{source}</Markdown>;
}
