/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from 'next';
import './globals.css';
import { Header, Footer } from './components';
export const metadata: Metadata = { title:'Meridian Estimating | Construction takeoffs and estimates', description:'Bid-ready material takeoffs, cost estimates and preconstruction support for contractors nationwide.' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><head><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap"/></head><body><Header/><main id="app">{children}</main><Footer/></body></html>}
