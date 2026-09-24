/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from 'next';
import './globals.css';
import { Header, Footer, WhatsAppFab } from './components';
import { createMetadata } from '@/lib/metadata';
import { BRAND } from '@/lib/content';

export const metadata: Metadata = {
  ...createMetadata({
    title: BRAND.name,
    description:
      'CSI & Design delivers estimation, architectural design, engineering coordination, and strategic property acquisition. From vision to value.',
    path: '/',
  }),
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://csianddesign.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Montserrat:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
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
      </body>
    </html>
  );
}
