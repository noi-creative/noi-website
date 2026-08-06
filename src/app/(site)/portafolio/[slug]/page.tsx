import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildPageMetadata } from '@/lib/metadata';
import { site } from '@/config/site';
import { generateStaticParams, getProject } from '@/content/data/projects';
import { ProjectDetail } from '@/components/portafolio/ProjectDetail';

type Params = { slug: string };

/**
 * Only the slugs returned by `generateStaticParams` resolve at runtime;
 * any other path returns 404 without an on-demand render.
 */
export const dynamicParams = false;

export function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const project = getProject(slug);
    if (!project) {
      notFound();
    }
    return buildPageMetadata({
      title: project.name,
      description: project.summary,
      path: `${site.routes.portafolio}/${slug}`,
      type: 'article',
      image: {
        url: project.coverSrc,
        width: project.coverWidth,
        height: project.coverHeight,
        alt: project.coverAlt,
      },
    });
  });
}

export default async function ProjectDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  return <ProjectDetail slug={slug} />;
}

export { generateStaticParams };
