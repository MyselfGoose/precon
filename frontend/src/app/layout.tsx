import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meridian Estimating | Construction takeoffs and estimates",
  description:
    "Bid-ready material takeoffs, cost estimates and preconstruction support for contractors nationwide.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="site-header">
          <div className="container site-header-inner">
            <a className="brand" href="#/">
              <span className="brand-mark">M</span>
              <span>MERIDIAN <small>ESTIMATING</small></span>
            </a>
            <nav aria-label="Main navigation">
              <a href="#/services">Services</a>
              <a href="#/trades">Trades</a>
              <a href="#/process">How it works</a>
              <a href="#/who">Who we serve</a>
              <a href="#/about">About</a>
            </nav>
            <a className="header-cta" href="#/quote">Get a quote <span>↗</span></a>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="site-footer">
          <div className="container footer-grid">
            <div>
              <a className="brand footer-brand" href="#/"><span className="brand-mark">M</span><span>MERIDIAN <small>ESTIMATING</small></span></a>
              <p>Clear quantities. Defensible numbers. More bids out the door.</p>
            </div>
            <div><strong>Explore</strong><a href="#/services">Services</a><a href="#/trades">Trades</a><a href="#/process">How it works</a></div>
            <div><strong>Start here</strong><a href="#/quote">Request a quote</a><a href="tel:+18005550100">(800) 555-0100</a><a href="mailto:hello@meridianestimates.com">Email us</a></div>
          </div>
          <div className="container footer-bottom"><span>© 2025 Meridian Estimating. Built for the people who build.</span><span><a href="#/privacy">Privacy</a> · <a href="#/terms">Terms</a></span></div>
        </footer>
      </body>
    </html>
  );
}
