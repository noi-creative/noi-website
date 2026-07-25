import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/metadata';
import { site } from '@/config/site';
import { generateStaticParams, getProject } from '@/content/data/projects';
import { ProjectDetail } from '@/components/portafolio/ProjectDetail';

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
  return <ProjectDetail slug={slug} />;
}

export { generateStaticParams };
