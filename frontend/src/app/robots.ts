import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://csianddesign.com';
/** Set NEXT_PUBLIC_SITE_ENV=staging on preview/staging hosts so crawlers are blocked until launch. */
const isStaging = process.env.NEXT_PUBLIC_SITE_ENV === 'staging';

export default function robots(): MetadataRoute.Robots {
  if (isStaging) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
      host: SITE_URL,
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
