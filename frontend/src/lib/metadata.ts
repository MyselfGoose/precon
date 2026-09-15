import type { Metadata } from 'next';
import { BRAND } from './content';

export type RouteMetadata = {
  title: string;
  description: string;
  path: string;
};

export function createMetadata({ title, description, path }: RouteMetadata): Metadata {
  const fullTitle = title === BRAND.name ? title : `${title} | ${BRAND.name}`;
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
    },
    twitter: {
      card: 'summary',
      title: fullTitle,
      description,
    },
  };
}
