import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CTA, PageHead, Photo } from '../../components';
import { createMetadata } from '@/lib/metadata';
import { ESTIMATION_HUBS, getEstimationHub } from '@/lib/estimation';
import type { Metadata } from 'next';

const HUB_SLUGS = ['general-construction', 'industrial', 'public-projects'] as const;

const HUB_IMAGES: Record<(typeof HUB_SLUGS)[number], string> = {
  'general-construction': '/images/projects/residential-commercial.jpg',
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
      />
      <section className="band">
        <div className="wrap stack-lg">
          <div className="split">
            <div className="stack">
              {hub.intro.slice(0, 2).map((p) => (
                <p className="prose" key={p.slice(0, 48)}>
                  {p}
                </p>
              ))}
            </div>
            <div className="media project-photo">
              <Photo
                src={HUB_IMAGES[slug as (typeof HUB_SLUGS)[number]]}
                alt={`${hub.name} estimation`}
                fill
                sizes="(max-width: 1000px) 100vw, 48vw"
              />
            </div>
          </div>
          {hub.categories && hub.categories.length > 0 && (
            <>
              <div className="stack">
                <div className="eyebrow">Categories</div>
                <h2>What this section covers</h2>
              </div>
              <div className="grid-2">
                {hub.categories.map((cat) => (
                  <div className="card" key={cat.name}>
                    <h3>{cat.name}</h3>
                    <p>{cat.description}</p>
                    {cat.name === 'Industrial Projects' && slug === 'general-construction' ? (
                      <p style={{ marginTop: 8 }}>
                        <Link href="/estimation/industrial">Open full industrial project details →</Link>
                      </p>
                    ) : null}
                  </div>
                ))}
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
