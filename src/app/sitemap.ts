import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { projectSlugs } from '@/content/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.siteUrl.replace(/\/+$/, '');
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    site.routes.home,
    site.routes.nosotras,
    site.routes.servicios,
    site.routes.portafolio,
    site.routes.contacto,
    site.routes.privacidad,
    site.routes.terminos,
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === site.routes.home ? 'weekly' : 'monthly',
    priority: path === site.routes.home ? 1 : 0.7,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${base}${site.routes.portafolio}/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
