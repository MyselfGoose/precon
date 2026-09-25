import type { Metadata } from 'next';
import { BRAND } from './content';
import { IMAGE_REGISTRY } from './image-registry';

export type RouteMetadata = {
  title: string;
  description: string;
  path: string;
  /** Absolute or site-relative path for social share image. */
  image?: string;
};

const DEFAULT_OG_IMAGE =
  IMAGE_REGISTRY.find((entry) => entry.route === '/' && entry.role === 'hero')?.path ??
  IMAGE_REGISTRY[0]?.path ??
  '';

export function createMetadata({ title, description, path, image = DEFAULT_OG_IMAGE }: RouteMetadata): Metadata {
  const fullTitle = title === BRAND.name ? title : `${title} | ${BRAND.name}`;
  const images = image ? [{ url: image, alt: `${BRAND.name} — ${title}` }] : undefined;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: BRAND.name,
      title: fullTitle,
      description,
      url: path,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: images ? 'summary_large_image' : 'summary',
      title: fullTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
