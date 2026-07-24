import type { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Markdown } from '@/components/legal/Markdown';
import { buildPageMetadata } from '@/lib/metadata';
import { site } from '@/config/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Política de Privacidad',
  description: 'Política de Privacidad de NOI Creative LLC.',
  path: site.routes.privacidad,
});

const PRIVACIDAD_PATH = join(process.cwd(), 'src', 'content', 'legal', 'privacidad.md');

export default async function PrivacidadPage() {
  const source = await readFile(PRIVACIDAD_PATH, 'utf8');
  return <Markdown>{source}</Markdown>;
}
