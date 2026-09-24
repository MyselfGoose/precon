import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CTA, PageHead } from '../../components';
import { createMetadata } from '@/lib/metadata';
import {
  categoryAnchorId,
  categoryHubHref,
  ESTIMATION_HUBS,
  GC_FEATURED_TRADES,
  getEstimationHub,
} from '@/lib/estimation';
import type { Metadata } from 'next';
import { MotionItem, MotionStagger } from '../../motion';

const HUB_SLUGS = [
  'general-construction',
  'commercial',
  'residential',
  'industrial',
  'public-projects',
] as const;

const HUB_IMAGES: Record<(typeof HUB_SLUGS)[number], string> = {
  'general-construction': '/images/projects/residential-commercial.jpg',
  commercial: '/images/projects/residential-commercial.jpg',
  residential: '/images/properties/residential.jpg',
  industrial: '/images/projects/industrial.jpg',
  'public-projects': '/images/projects/public-institutional.jpg',
};

export function generateStaticParams() {
  return HUB_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const hub = getEstimationHub(slug);
  return createMetadata({
    title: hub ? hub.name : 'Estimation',
    description: hub ? hub.lede : 'Explore CSI & Design estimation services.',
    path: `/estimation/${slug}`,
  });
}

export default async function EstimationHubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!HUB_SLUGS.includes(slug as (typeof HUB_SLUGS)[number])) notFound();
  const hub = getEstimationHub(slug);
  if (!hub) notFound();

  return (
    <>
      <PageHead
        eyebrow="Estimation"
        title={hub.name}
        lede={hub.lede}
        crumb={
          <>
            <Link href="/estimation">Estimation</Link> / {hub.name}
          </>
        }
        image={HUB_IMAGES[slug as (typeof HUB_SLUGS)[number]]}
        imageAlt={`${hub.name} estimation`}
        priority
      />
      <section className="band">
        <div className="wrap stack-lg">
          <div className="stack">
            {hub.intro.slice(0, 2).map((p) => (
              <p className="prose" key={p.slice(0, 48)}>
                {p}
              </p>
            ))}
          </div>

          {slug === 'general-construction' && (
            <div className="stack-lg">
              <div className="stack">
                <div className="eyebrow">Trades under general construction</div>
                <h2>Remodeling, new construction, demolition, ADUs &amp; more</h2>
                <p className="prose">
                  Open the trade estimation pages that sit under a GC bid: renovation and remodeling, ground-up new
                  construction, demolition, accessory dwellings, and the core building trades that complete the package.
                </p>
              </div>
              <MotionStagger className="grid-2">
                {GC_FEATURED_TRADES.map((trade) => (
                  <MotionItem className="motion-fill" key={trade.slug}>
                    <Link className="card card-link" href={`/estimation/trades/${trade.slug}`}>
                      <h3>{trade.name}</h3>
                      <p>{trade.blurb}</p>
                      <span className="card-action">Open trade page →</span>
                    </Link>
                  </MotionItem>
                ))}
              </MotionStagger>
            </div>
          )}

          {hub.categories && hub.categories.length > 0 && (
            <>
              <div className="stack">
                <div className="eyebrow">Categories</div>
                <h2>What this section covers</h2>
              </div>
              <div className="grid-2">
                {hub.categories.map((cat) => {
                  const href = slug === 'general-construction' ? categoryHubHref(cat.name) : undefined;
                  if (href) {
                    return (
                      <Link className="card card-link" href={href} key={cat.name} id={categoryAnchorId(cat.name)}>
                        <h3>{cat.name}</h3>
                        <p>{cat.description}</p>
                        <span className="card-action">Open full details →</span>
                      </Link>
                    );
                  }
                  return (
                    <div className="card" key={cat.name} id={categoryAnchorId(cat.name)}>
                      <h3>{cat.name}</h3>
                      <p>{cat.description}</p>
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {hub.whyUs && (
            <div className="note">
              <b>Why choose us for {hub.name.toLowerCase()}?</b> {hub.whyUs}
            </div>
          )}
          <div className="stack">
            <div className="eyebrow">Also explore</div>
            <div className="trade-nav">
              {ESTIMATION_HUBS.filter((h) => h.slug !== 'trades').map((h) => (
                <Link key={h.slug} href={`/estimation/${h.slug}`} aria-current={h.slug === slug ? 'page' : undefined}>
                  {h.name}
                </Link>
              ))}
              <Link href="/estimation/trades">Trade contractors</Link>
            </div>
          </div>
        </div>
      </section>
      <CTA
        title={`Request your ${hub.name.toLowerCase()} estimate`}
        text="Send the drawings, bid documents, and deadline. We will confirm a clear scope and delivery plan."
      />
    </>
  );
}
