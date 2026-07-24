import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildPageMetadata } from '@/lib/metadata';
import { site } from '@/config/site';
import { generateStaticParams, getProject } from '@/content/data/projects';

type Params = { slug: string };

export function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const project = getProject(slug);
    if (!project) {
      return buildPageMetadata({
        title: 'Proyecto',
        path: `${site.routes.portafolio}/${slug}`,
        noIndex: true,
      });
    }
    return buildPageMetadata({
      title: project.name,
      description: project.summary,
      path: `${site.routes.portafolio}/${slug}`,
      type: 'article',
    });
  });
}

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
