import type { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Markdown } from '@/components/legal/Markdown';

export const metadata: Metadata = {
  title: 'Términos y Condiciones — NOI: creative',
  description: 'Términos y Condiciones de NOI Creative LLC.',
};

const TERMINOS_PATH = join(process.cwd(), 'src', 'content', 'legal', 'terminos-y-condiciones.md');

export default async function TerminosPage() {
  const source = await readFile(TERMINOS_PATH, 'utf8');
  return <Markdown>{source}</Markdown>;
}
