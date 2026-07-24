import type { Metadata } from 'next';
import { site } from '@/config/site';

type PageType = 'website' | 'article';

type BuildPageMetadataInput = {
  readonly title: string;
  readonly description?: string;
  readonly path: string;
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

const DEFAULT_DESCRIPTION =
  'NOI Creative — estudio de branding y diseño en Orlando, Florida. Estrategia, identidad y producción visual para marcas que buscan crecer.';

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
 * (title template, canonical, Open Graph, Twitter, robots) so future
 * Q01 changes happen in a single file.
 *
 * The description, the OG image and the social URLs are all currently
 * TODO placeholders. Q01 will replace them with designer-supplied copy
 * and assets; per-page `metadata` exports only pass the per-page values.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  image,
  noIndex = false,
  type = 'website',
  publishedTime,
  modifiedTime,
}: BuildPageMetadataInput): Metadata {
  const finalDescription = description ?? DEFAULT_DESCRIPTION;
  const finalImage = image ?? FALLBACK_OG_IMAGE;
  const canonical = buildCanonical(path);
  const imageUrl = finalImage.url.startsWith('http')
    ? finalImage.url
    : `${site.siteUrl.replace(/\/+$/, '')}${finalImage.url.startsWith('/') ? '' : '/'}${finalImage.url}`;

  return {
    title,
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
      images: [imageUrl],
    },
  };
}
