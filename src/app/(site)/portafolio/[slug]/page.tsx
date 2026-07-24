import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateStaticParams, getProject } from '@/content/data/projects';

export const metadata: Metadata = {
  title: 'Proyecto — NOI: creative',
  description: 'TODO metadata description',
};

type Params = { slug: string };

export default async function ProjectDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    notFound();
  }

  // Placeholder. P05/P06 implement the actual project-detail composition.
  return (
    <main>
      <h1>{project.name}</h1>
      <p>TODO project detail — pending P05/P06.</p>
    </main>
  );
}

export { generateStaticParams };
