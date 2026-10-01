import Image from 'next/image';
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
  type EstimationCategory,
} from '@/lib/estimation';
import { SITE_COPY } from '@/lib/content';
import type { Metadata } from 'next';
import { MotionItem, MotionStagger } from '../../motion';

const HUB_SLUGS = [
  'general-construction',
  'commercial',
  'residential',
  'industrial',
  'public-projects',
] as const;

export function generateStaticParams() {
  return HUB_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const hub = getEstimationHub(slug);
  return createMetadata({
    title: hub ? hub.name : 'Estimation',
    description: hub ? hub.lede : 'Explore QuantSult estimation services.',
    path: `/estimation/${slug}`,
  });
}

function CategoryCard({
  cat,
  href,
}: {
  cat: EstimationCategory;
  href?: string;
}) {
  const body = (
    <>
      {cat.imageSrc && (
        <div className="hub-media">
          <Image
            src={cat.imageSrc}
            alt={cat.imageAlt ?? cat.name}
            fill
            sizes="(max-width: 1000px) 100vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
          {cat.watermark && (
            <span className="hub-watermark">
              <span className="hub-watermark-brand">QuantSult</span>
              {cat.watermark}
            </span>
          )}
        </div>
      )}
      <div className="hub-card-body">
        <h3>{cat.name}</h3>
        <p>{cat.description}</p>
        {href && <span className="card-action">{SITE_COPY.cta.viewDetails}</span>}
      </div>
    </>
  );

  if (href) {
    return (
      <Link className={`card card-link hub-card${cat.imageSrc ? ' has-media' : ''}`} href={href} id={categoryAnchorId(cat.name)}>
        {body}
      </Link>
    );
  }

  return (
    <div className={`card hub-card${cat.imageSrc ? ' has-media' : ''}`} id={categoryAnchorId(cat.name)}>
      {body}
    </div>
  );
}

export default async function EstimationHubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!HUB_SLUGS.includes(slug as (typeof HUB_SLUGS)[number])) notFound();
  const hub = getEstimationHub(slug);
  if (!hub) notFound();

  const isPublic = slug === 'public-projects';
  const civilCategories = isPublic ? hub.categories?.filter((c) => c.group === 'civil') ?? [] : [];
  const facilityCategories = isPublic ? hub.categories?.filter((c) => c.group === 'facilities') ?? [] : [];
  const plainCategories = !isPublic ? hub.categories ?? [] : [];

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
      />
      <section className="band">
        <div className="wrap stack-lg">
          {hub.imageSrc && (
            <div className="hub-hero-media media">
              <Image
                src={hub.imageSrc}
                alt={hub.imageAlt ?? hub.name}
                fill
                sizes="(max-width: 1000px) 100vw, 1100px"
                style={{ objectFit: 'cover' }}
                priority
              />
              {hub.watermark && (
                <span className="hub-watermark hub-watermark-lg">
                  <span className="hub-watermark-brand">QuantSult</span>
                  {hub.watermark}
                </span>
              )}
            </div>
          )}

          <div className="stack">
            {hub.intro.map((p) => (
              <p className="prose" key={p.slice(0, 48)}>
                {p}
              </p>
            ))}
          </div>

          {slug === 'general-construction' && (
            <div className="stack-lg">
              <div className="stack">
                <div className="eyebrow">What falls under General Construction</div>
                <h2>Commercial, residential, and industrial GC packages</h2>
                <p className="prose">
                  General Construction estimating covers complete GC bid packages across the three primary building
                  markets below. Each opens to a dedicated hub with CSI Format takeoffs, market-driven pricing, and
                  trade coordination.
                </p>
              </div>
            </div>
          )}

          {plainCategories.length > 0 && (
            <>
              {slug !== 'general-construction' && (
                <div className="stack">
                  <div className="eyebrow">Categories</div>
                  <h2>What this section covers</h2>
                </div>
              )}
              <MotionStagger className={slug === 'general-construction' ? 'grid-3' : 'grid-2'}>
                {plainCategories.map((cat) => {
                  const href = slug === 'general-construction' ? categoryHubHref(cat.name) : undefined;
                  return (
                    <MotionItem className="motion-fill" key={cat.name}>
                      <CategoryCard cat={cat} href={href} />
                    </MotionItem>
                  );
                })}
              </MotionStagger>
            </>
          )}

          {isPublic && civilCategories.length > 0 && (
            <div className="stack-lg" id="infrastructure-civil">
              <div className="stack">
                <div className="eyebrow">Infrastructure &amp; Civil</div>
                <h2>Roads, bridges, and civil infrastructure</h2>
                <p className="prose">
                  Civil is roads, bridges, aviation, marine, rail, utilities, water and wastewater, dams, tunnels, and
                  related public infrastructure. Public project estimating opens here first.
                </p>
              </div>
              <div className="grid-2">
                {civilCategories.map((cat) => (
                  <CategoryCard cat={cat} key={cat.name} />
                ))}
              </div>
            </div>
          )}

          {isPublic && facilityCategories.length > 0 && (
            <div className="stack-lg" id="public-facilities">
              <div className="stack">
                <div className="eyebrow">Government &amp; Public Facilities</div>
                <h2>Municipal, institutional, and public buildings</h2>
              </div>
              <div className="grid-2">
                {facilityCategories.map((cat) => (
                  <CategoryCard cat={cat} key={cat.name} />
                ))}
              </div>
            </div>
          )}

          {slug === 'general-construction' && (
            <div className="stack-lg">
              <div className="stack">
                <div className="eyebrow">Related trade pages</div>
                <h2>Trade estimation under general construction</h2>
                <p className="prose">
                  Open dedicated estimation pages for remodeling, restoration, and the building trades that support a
                  complete GC bid package.
                </p>
              </div>
              <MotionStagger className="grid-2">
                {GC_FEATURED_TRADES.map((trade) => (
                  <MotionItem className="motion-fill" key={trade.slug}>
                    <Link className="card card-link" href={`/estimation/trades/${trade.slug}`}>
                      <h3>{trade.name}</h3>
                      <p>{trade.blurb}</p>
                      <span className="card-action">{SITE_COPY.cta.openTrade}</span>
                    </Link>
                  </MotionItem>
                ))}
              </MotionStagger>
            </div>
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
