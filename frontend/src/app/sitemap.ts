import type { MetadataRoute } from 'next';
import { CONTENT_SERVICES } from '@/lib/content';
import { TRADES } from '@/lib/data';
import { ESTIMATION_HUBS, TRADE_ESTIMATION_PAGES } from '@/lib/estimation';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://csianddesign.com';

function url(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    '/',
    '/services',
    '/estimation',
    '/estimation/trades',
    '/trades',
    '/markets',
    '/how-it-works',
    '/who-we-serve',
    '/about',
    '/contact',
    '/quote',
    '/privacy',
    '/terms',
  ];

  const servicePaths = CONTENT_SERVICES.map((service) => `/services/${service.slug}`);
  const tradePaths = TRADES.map((trade) => `/trades/${trade.slug}`);
  const estimationHubPaths = ESTIMATION_HUBS.filter((hub) => hub.slug !== 'trades').map(
    (hub) => `/estimation/${hub.slug}`,
  );
  const estimationTradePaths = TRADE_ESTIMATION_PAGES.map((trade) => `/estimation/trades/${trade.slug}`);

  const paths = [...staticPaths, ...servicePaths, ...tradePaths, ...estimationHubPaths, ...estimationTradePaths];

  return paths.map((path) => ({
    url: url(path),
    lastModified: new Date(),
    changeFrequency: path === '/' || path === '/quote' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path === '/quote' || path === '/services' || path === '/estimation' ? 0.9 : 0.7,
  }));
}
