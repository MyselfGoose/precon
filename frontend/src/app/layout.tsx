/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from 'next';
import './globals.css';
import { Header, Footer } from './components';
import { createMetadata } from '@/lib/metadata';
export const metadata: Metadata = {
  ...createMetadata({
    title: 'PreCon Ext',
    description: 'PreCon Ext helps contractors, developers, and project teams reduce uncertainty with bid-ready estimating, coordinated documentation, and practical preconstruction support.',
    path: '/',
  }),
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://preconext.com'),
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><head><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap"/></head><body><Header/><main id="app">{children}</main><Footer/></body></html>}
