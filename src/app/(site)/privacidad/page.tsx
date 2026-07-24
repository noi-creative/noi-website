import type { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Markdown } from '@/components/legal/Markdown';

export const metadata: Metadata = {
  title: 'Política de Privacidad — NOI: creative',
  description: 'Política de Privacidad de NOI Creative LLC.',
};

const PRIVACIDAD_PATH = join(process.cwd(), 'src', 'content', 'legal', 'privacidad.md');

export default async function PrivacidadPage() {
  const source = await readFile(PRIVACIDAD_PATH, 'utf8');
  return <Markdown>{source}</Markdown>;
}
