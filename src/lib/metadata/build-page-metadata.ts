import type { Metadata } from 'next';
import { site } from '@/config/site';

type PageType = 'website' | 'article';

type BuildPageMetadataInput = {
  readonly title: string;
  readonly description?: string;
  readonly path: string;
  /**
   * When `true`, the title is emitted verbatim (`title: { absolute }`)
   * and the root layout template does not append the brand suffix.
   * Use for pages with a full SEO title defined in the copy strategy.
   */
  readonly absoluteTitle?: boolean;
  readonly image?: {
    readonly url: string;
    readonly width: number;
    readonly height: number;
    readonly alt: string;
  };
  readonly noIndex?: boolean;
  readonly type?: PageType;
  readonly publishedTime?: string;
  readonly modifiedTime?: string;
};

const FALLBACK_OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'NOI Creative',
};

function normalisePath(path: string): string {
  if (path === '/' || path === '') return '/';
  return path.startsWith('/') ? path : `/${path}`;
}

function buildCanonical(path: string): string {
  const normalised = normalisePath(path);
  const base = site.siteUrl.replace(/\/+$/, '');
  return `${base}${normalised}`;
}

/**
 * Build a per-page `Metadata` object. Centralises the SEO surface
 * (title handling, canonical, Open Graph, Twitter, robots) so copy
 * changes happen in a single file.
 *
 * `site.defaultDescription` is the fallback description. Pages pass
 * their own description, title and optional per-page social image.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  image,
  noIndex = false,
  type = 'website',
  publishedTime,
  modifiedTime,
}: BuildPageMetadataInput): Metadata {
  const finalDescription = description ?? site.defaultDescription;
  const finalImage = image ?? FALLBACK_OG_IMAGE;
  const canonical = buildCanonical(path);
  const imageUrl = finalImage.url.startsWith('http')
    ? finalImage.url
    : `${site.siteUrl.replace(/\/+$/, '')}${finalImage.url.startsWith('/') ? '' : '/'}${finalImage.url}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: finalDescription,
    alternates: {
      canonical,
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type,
      locale: 'es_ES',
      url: canonical,
      siteName: site.brand,
      title,
      description: finalDescription,
      images: [
        {
          url: imageUrl,
          width: finalImage.width,
          height: finalImage.height,
          alt: finalImage.alt,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: finalDescription,
      images: [
        {
          url: imageUrl,
          alt: finalImage.alt,
        },
      ],
    },
  };
}
