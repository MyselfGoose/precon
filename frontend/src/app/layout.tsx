/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from 'next';
import './globals.css';
import { Header, Footer, WhatsAppFab } from './components';
import { SiteAnalytics } from './site-analytics';
import { createMetadata } from '@/lib/metadata';
import { organizationJsonLd, servicesJsonLd, websiteJsonLd } from '@/lib/json-ld';

export const metadata: Metadata = {
  ...createMetadata({
    title: 'Construction Estimating Services',
    description:
      'Preconstruction estimating, takeoffs, and design coordination for contractors and developers across the United States. Bid with confidence.',
    path: '/',
  }),
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://csianddesign.com'),
};

const structuredData = [organizationJsonLd(), websiteJsonLd(), ...servicesJsonLd()];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Montserrat:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <a className="skip-link" href="#app">
          Skip to content
        </a>
        <Header />
        <main id="app">{children}</main>
        <Footer />
        <WhatsAppFab />
        <SiteAnalytics />
      </body>
    </html>
  );
}
