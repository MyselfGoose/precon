import type { Metadata } from 'next';
import { Barlow_Condensed, IBM_Plex_Mono, Inter } from 'next/font/google';
import './globals.css';
import { Header, Footer, WhatsAppFab } from './components';
import { SiteAnalytics } from './site-analytics';
import { createMetadata } from '@/lib/metadata';
import { organizationJsonLd, servicesJsonLd, websiteJsonLd } from '@/lib/json-ld';

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-barlow-condensed',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  ...createMetadata({
    title: 'Construction Estimating Services',
    description:
      'Preconstruction estimating, takeoffs, and design coordination for contractors and developers across the United States. Bid with confidence.',
    path: '/',
  }),
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quantsult.com'),
};

const structuredData = [organizationJsonLd(), websiteJsonLd(), ...servicesJsonLd()];

const fontVariables = `${barlowCondensed.variable} ${inter.variable} ${ibmPlexMono.variable}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <head>
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
