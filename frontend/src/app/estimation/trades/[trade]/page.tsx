import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CTA, PageHead, Workbook } from '../../../components';
import { createMetadata } from '@/lib/metadata';
import { getTradeEstimation, TRADE_ESTIMATION_PAGES } from '@/lib/estimation';
import { TRADES } from '@/lib/data';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return TRADE_ESTIMATION_PAGES.map((t) => ({ trade: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ trade: string }> }): Promise<Metadata> {
  const { trade } = await params;
  const page = getTradeEstimation(trade);
  return createMetadata({
    title: page ? page.name : 'Trade estimation',
    description: page ? page.lede : 'Explore CSI & Design trade estimation services.',
    path: `/estimation/trades/${trade}`,
  });
}

export default async function TradeEstimationPage({ params }: { params: Promise<{ trade: string }> }) {
  const { trade } = await params;
  const page = getTradeEstimation(trade);
  if (!page) notFound();

  const idx = TRADE_ESTIMATION_PAGES.findIndex((t) => t.slug === trade);
  const prev = TRADE_ESTIMATION_PAGES[(idx + TRADE_ESTIMATION_PAGES.length - 1) % TRADE_ESTIMATION_PAGES.length];
  const next = TRADE_ESTIMATION_PAGES[(idx + 1) % TRADE_ESTIMATION_PAGES.length];
  const sample = page.sampleDivisionSlug
    ? TRADES.find((t) => t.slug === page.sampleDivisionSlug)?.sample
    : undefined;
  const heroTitle = page.heroHeadline ?? page.name;
  const heroImage = page.imageSrc;

  return (
    <>
      <PageHead
        eyebrow="Estimation · Trade"
        title={heroTitle}
        lede={page.headline}
        crumb={
          <>
            <Link href="/estimation">Estimation</Link> / <Link href="/estimation/trades">Trades</Link> / {page.name}
          </>
        }
        image={heroImage}
        imageAlt={page.imageAlt ?? `${page.name} estimation`}
        priority={Boolean(heroImage)}
        variant={heroImage ? 'dark' : 'split'}
      />
      <section className="band">
        <div className="wrap stack-lg">
          <div className="stack">
            <p className="prose">{page.lede}</p>
            {page.intro.map((paragraph) => (
              <p className="prose" key={paragraph.slice(0, 48)}>
                {paragraph}
              </p>
            ))}
          </div>
          <div className="grid-2">
            <div className="spec">
              <div className="spec-h">
                <h4>What we estimate</h4>
                <span className="u">SCOPE</span>
              </div>
              <ul>
                {page.whatWeEstimate.map((item) => (
                  <li key={item}>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="spec">
              <div className="spec-h">
                <h4>What&apos;s included</h4>
                <span className="u">DELIVERABLE</span>
              </div>
              <ul>
                {page.whatsIncluded.map((item) => (
                  <li key={item}>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {sample ? (
            <div className="stack">
              <div className="eyebrow">Sample deliverable</div>
              <h2>Organized the way your team reviews numbers</h2>
              <Workbook sample={sample} tabs={['Summary', 'Scope', 'Exclusions']} active="Scope" />
            </div>
          ) : null}
          <div className="stack">
            <div className="eyebrow">Why contractors choose us</div>
            <h2>Built for competitive, profitable bids</h2>
            <p className="prose">{page.whyUs}</p>
          </div>
          <div className="stack">
            <div className="eyebrow">All trade estimation pages</div>
            <div className="trade-nav">
              {TRADE_ESTIMATION_PAGES.map((t) => (
                <Link
                  key={t.slug}
                  href={`/estimation/trades/${t.slug}`}
                  aria-current={t.slug === trade ? 'page' : undefined}
                >
                  {t.name.replace(' Estimation Services', '').replace(' Estimating Services', '')}
                </Link>
              ))}
            </div>
            <div className="btn-row">
              <Link className="btn btn-ghost btn-sm" href={`/estimation/trades/${prev.slug}`}>
                ← {prev.name.replace(' Estimation Services', '').replace(' Estimating Services', '')}
              </Link>
              <Link className="btn btn-ghost btn-sm" href={`/estimation/trades/${next.slug}`}>
                {next.name.replace(' Estimation Services', '').replace(' Estimating Services', '')} →
              </Link>
            </div>
          </div>
        </div>
      </section>
      <CTA title={page.ctaTitle} text={page.ctaText} />
    </>
  );
}
