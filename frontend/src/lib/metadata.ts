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

const isStaging = process.env.NEXT_PUBLIC_SITE_ENV === 'staging';

export function createMetadata({ title, description, path, image = DEFAULT_OG_IMAGE }: RouteMetadata): Metadata {
  const fullTitle = title === BRAND.name ? title : `${title} | ${BRAND.name}`;
  const imageAlt =
    title === BRAND.name ? `${BRAND.name} — ${BRAND.descriptor}` : `${BRAND.name} — ${title}`;
  const images = image ? [{ url: image, alt: imageAlt }] : undefined;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    ...(isStaging ? { robots: { index: false, follow: false } } : {}),
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
