import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BRAND, CONTENT_SERVICES, ACQUISITION_CONTENT, SITE_COPY } from '@/lib/content';
import { ESTIMATION_HUBS, TRADE_BUBBLE_SUMMARIES } from '@/lib/estimation';
import { ICO } from '@/lib/illustrations';
import { Button, CTA, PageHead, PhoneLink, Photo, WhatsAppLink } from '../../components';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import PropertyForm from '../acquisitions-form';
import { BimVisualShowcase } from '../bim-visual-showcase';
import { MotionItem, MotionReveal, MotionStagger } from '../../motion';

const BIM_VISUAL_FRAMES = [
  {
    src: '/images/services/bim/gym-render.jpg',
    alt: 'Photorealistic gym interior visualization',
    label: 'Gym interior render',
  },
  {
    src: '/images/services/bim/interior-render.jpg',
    alt: 'Photorealistic residential interior rendering',
    label: 'Interior space render',
  },
  {
    src: '/images/services/bim/bim-model.jpg',
    alt: 'Two-dimensional BIM and architectural plan set',
    label: 'BIM model on 2D plans',
  },
] as const;

type EstimationProjectTypeCard = {
  href: string;
  code: string;
  name: string;
  lede: string;
};

const ESTIMATION_PROJECT_TYPE_CARDS: EstimationProjectTypeCard[] = [
  ...ESTIMATION_HUBS.filter((hub) => hub.slug !== 'trades').map((hub) => ({
    href: `/estimation/${hub.slug}`,
    code: hub.code,
    name: hub.name,
    lede: hub.lede,
  })),
  {
    href: '/estimation/trades/remodeling',
    code: 'REN',
    name: 'Renovation & Remodeling',
    lede:
      'Tenant improvements, residential remodels, commercial renovations, adaptive reuse, and new construction additions. Estimated with existing conditions and market-driven pricing.',
  },
];

export function generateStaticParams() {
  return CONTENT_SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const content = CONTENT_SERVICES.find((s) => s.slug === slug);
  return createMetadata({
    title: content ? content.name : 'Service not found',
    description: content ? content.summary : 'Explore CSI & Design project support services.',
    path: `/services/${slug}`,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = CONTENT_SERVICES.find((s) => s.slug === slug);
  if (!content) notFound();

  if (content.slug === 'acquisitions-investments') {
    return (
      <>
        <PageHead
          eyebrow={ACQUISITION_CONTENT.eyebrow}
          title={ACQUISITION_CONTENT.title}
          lede={ACQUISITION_CONTENT.lede}
          crumb={
            <>
              <Link href="/services">Services</Link> / {content.name}
            </>
          }
          image="/images/hero/acquisition-hero.jpg"
          imageAlt="Malibu California beachfront homes representing US property acquisition"
          priority
          variant="dark"
          actions={
            <>
              <Button href="#discuss-property">Get in Touch →</Button>
              <a className="btn btn-on-dark" href="#approach">
                See our approach →
              </a>
            </>
          }
        />

        <section className="band">
          <div className="wrap stack-lg">
            {ACQUISITION_CONTENT.intro.map((paragraph) => (
              <p className="prose" key={paragraph.slice(0, 48)}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="band band-ground">
          <div className="wrap">
            <MotionStagger className="feature-bar">
              {ACQUISITION_CONTENT.features.map((feature) => (
                <MotionItem className="item" key={feature.title}>
                  <div className="ico" dangerouslySetInnerHTML={{ __html: ICO.bid }} />
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </MotionItem>
              ))}
            </MotionStagger>
          </div>
        </section>

        <section className="band band-ground">
          <div className="wrap stack-lg">
            <MotionReveal className="stack" y={16}>
              <div className="eyebrow">Key Property Types</div>
              <h2>Assets we evaluate and acquire.</h2>
            </MotionReveal>
            <div className="property-types">
              {ACQUISITION_CONTENT.propertyTypes.map((type) => (
                <article className="property-type" key={type.title}>
                  {'image' in type && type.image ? (
                    <div className="media">
                      <Image
                        src={type.image}
                        alt={type.title}
                        fill
                        sizes="(max-width: 1000px) 50vw, 25vw"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  ) : null}
                  <h4>{type.title}</h4>
                  <p>{type.subtitle}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="band" id="approach">
          <div className="wrap stack-lg">
            <div className="stack">
              <div className="eyebrow">Our Acquisition Approach</div>
              <h2>{ACQUISITION_CONTENT.offerTitle}</h2>
              {ACQUISITION_CONTENT.offerBody.map((paragraph) => (
                <p className="prose" key={paragraph.slice(0, 48)}>
                  {paragraph}
                </p>
              ))}
              <ul className="check-list">
                {ACQUISITION_CONTENT.approachItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="band band-ground">
          <div className="wrap stack-lg">
            <div className="stack">
              <div className="eyebrow">Construction advantage</div>
              <h2>{ACQUISITION_CONTENT.advantageTitle}</h2>
              <p className="prose">{ACQUISITION_CONTENT.advantageIntro}</p>
              <ul className="check-list">
                {ACQUISITION_CONTENT.advantageItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="prose">{ACQUISITION_CONTENT.advantageClose}</p>
            </div>
          </div>
        </section>

        <section className="band band-dark on-dark">
          <div className="wrap stack-lg">
            <MotionReveal className="stack" y={16}>
              <div className="eyebrow">Process</div>
              <h2>{ACQUISITION_CONTENT.stepsTitle}</h2>
              <p className="lede" style={{ color: '#C9BBB3' }}>
                {ACQUISITION_CONTENT.stepsBody}
              </p>
            </MotionReveal>
            <div className="stat-strip acquisition-steps">
              {ACQUISITION_CONTENT.steps.map((step, i) => (
                <div className="stat" key={step}>
                  <b>{String(i + 1).padStart(2, '0')}</b>
                  <small>{step}</small>
                </div>
              ))}
            </div>
            <MotionStagger className="value-grid">
              {ACQUISITION_CONTENT.values.map((value) => (
                <MotionItem className="value-card" key={value.title}>
                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </MotionItem>
              ))}
            </MotionStagger>
          </div>
        </section>

        <section className="band band-ground" id="discuss-property">
          <div className="wrap stack-lg">
            <div className="stack">
              <div className="eyebrow">Property submission</div>
              <h2>{ACQUISITION_CONTENT.ctaTitle}</h2>
              <p className="prose">{ACQUISITION_CONTENT.ctaText}</p>
              <div className="contact-actions">
                <PhoneLink className="btn btn-primary">Call {BRAND.phoneDisplay}</PhoneLink>
                <WhatsAppLink className="btn btn-ghost">WhatsApp Us →</WhatsAppLink>
              </div>
            </div>
            <div className="grid-2" style={{ gap: 44, alignItems: 'start' }}>
              <PropertyForm />
              <div className="note">
                <b>What happens next.</b> Our team evaluates the property, its condition, the investment required to
                improve it, and its potential, then determines whether an acquisition approach makes sense.
              </div>
            </div>
          </div>
        </section>
        <CTA
          title={ACQUISITION_CONTENT.ctaTitle}
          text={ACQUISITION_CONTENT.ctaText}
        />
      </>
    );
  }

  const relatedMode = content.relatedMode ?? 'services';
  const photoSrc = content.photoSrc;
  const photoAlt = content.photoAlt ?? `${content.name}: CSI & Design`;
  const isBim = content.slug === 'bim-visualization';
  const heroTitle = content.catchphrase ?? content.supportsTitle ?? content.name;
  const heroLede = content.summary;

  return (
      <>
        <PageHead
          eyebrow={`${content.code} · Service`}
          title={heroTitle}
          lede={heroLede}
          crumb={
            <>
              <Link href="/services">Services</Link> / {content.name}
            </>
          }
          image={photoSrc}
          imageAlt={photoAlt}
          priority={Boolean(photoSrc)}
          variant="dark"
        />
        <section className="band">
          <div className="wrap stack-lg">
            <div className="stack service-intro">
              <div
                className="ico"
                style={{ width: 56, height: 56 }}
                dangerouslySetInnerHTML={{ __html: ICO[content.ico as keyof typeof ICO] }}
              />
              <div className="code">{content.code}</div>
              <h2 style={{ fontSize: 'var(--s2)' }}>{content.name}</h2>
              <p className="prose">{content.details}</p>
            </div>
            {isBim && (
              <div className="stack">
                <div className="eyebrow">Render gallery</div>
                <h2>From gym interiors to BIM on 2D</h2>
                <BimVisualShowcase frames={[...BIM_VISUAL_FRAMES]} mode="collage" />
              </div>
            )}
            <div className="spec">
              <div className="spec-h">
                <h4>Included work</h4>
                <span className="u">SCOPE</span>
              </div>
              <ul>
                {content.points.map((p) => (
                  <li key={p}>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {content.sections && content.sections.length > 0 && (
              <div className="stack-lg">
                {content.sectionsPhotoSrc ? (
                  <div className="split">
                    <div className="stack">
                      <div className="eyebrow">{content.sectionsEyebrow ?? 'Deliverables'}</div>
                      <h2>{content.sectionsTitle ?? 'What we produce'}</h2>
                    </div>
                    <div className="media project-photo" style={{ minHeight: 240 }}>
                      <Photo
                        src={content.sectionsPhotoSrc}
                        alt={content.sectionsPhotoAlt ?? `${content.name} deliverables`}
                        fill
                        sizes="(max-width: 1000px) 100vw, 48vw"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="stack">
                    <div className="eyebrow">{content.sectionsEyebrow ?? 'Deliverables'}</div>
                    <h2>{content.sectionsTitle ?? 'What we produce'}</h2>
                  </div>
                )}
                <div className="tp-grid">
                  {content.sections.map((section) => (
                    <div className="spec" key={section.title}>
                      <div className="spec-h">
                        <h4>{section.title}</h4>
                        <span className="u">ITEMS</span>
                      </div>
                      <ul>
                        {section.items.map((item) => (
                          <li key={item}>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {content.calculations && content.calculations.length > 0 && (
              <div className="stack-lg">
                <div className="stack">
                  <div className="eyebrow">Engineering calculations</div>
                  <h2>Our Engineering Calculation Services</h2>
                </div>
                <div className="calc-list">
                  {content.calculations.map((calc) => (
                    <article key={calc.title}>
                      <h4>{calc.title}</h4>
                      <p>{calc.description}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {content.systems && content.systems.length > 0 && (
              <div className="stack-lg">
                <div className="stack">
                  <div className="eyebrow">Structural systems</div>
                  <h2>Structural Systems We Design</h2>
                </div>
                <ul className="check-list">
                  {content.systems.map((system) => (
                    <li key={system}>{system}</li>
                  ))}
                </ul>
              </div>
            )}

            {content.codes && content.codes.length > 0 && (
              <div className="spec">
                <div className="spec-h">
                  <h4>Codes & standards we work with</h4>
                  <span className="u">COMPLIANCE</span>
                </div>
                <ul>
                  {content.codes.map((code) => (
                    <li key={code}>
                      <span>{code}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {content.whyUs && content.whyUs.length > 0 && (
              <div className="stack">
                <div className="eyebrow">Why us</div>
                <h2>What makes us effective</h2>
                {content.whyUs.map((p) => (
                  <p className="prose" key={p.slice(0, 48)}>
                    {p}
                  </p>
                ))}
              </div>
            )}

            {content.showEstimationProjectTypes && (
              <div className="stack-lg">
                <div className="stack">
                  <div className="eyebrow">By project type</div>
                  <h2>General contractor, commercial, residential, industrial &amp; public work</h2>
                  <p className="prose">
                    Start with the work you bid: commercial and residential for general contractors, renovation and
                    remodeling, industrial facilities, and public projects. Then open the full estimation pages for
                    every subtype we cover.
                  </p>
                </div>
                <MotionStagger className="grid-2">
                  {ESTIMATION_PROJECT_TYPE_CARDS.map((card) => (
                    <MotionItem className="motion-fill" key={card.href}>
                      <Link className="card card-link" href={card.href}>
                        <div className="code">{card.code}</div>
                        <h3>{card.name}</h3>
                        <p>{card.lede}</p>
                        <span className="card-action">{SITE_COPY.cta.viewEstimation}</span>
                      </Link>
                    </MotionItem>
                  ))}
                </MotionStagger>
              </div>
            )}

            {relatedMode === 'trades' && (
              <div className="stack-lg">
                <div className="stack">
                  <div className="eyebrow">Our trades</div>
                  <h2>Singular estimation pages per trade</h2>
                  <p className="prose">
                    Detailed quantity takeoffs, trade-specific estimates, and market-driven pricing that help
                    subcontractors bid faster, protect their margins, and secure more profitable work.
                  </p>
                </div>
                <MotionStagger className="grid-2">
                  {TRADE_BUBBLE_SUMMARIES.map((trade) => (
                    <MotionItem className="motion-fill" key={trade.slug}>
                      <Link className="card card-link" href={`/estimation/trades/${trade.slug}`}>
                        <h3>{trade.name}</h3>
                        <p>{trade.summary}</p>
                        <span className="card-action">{SITE_COPY.cta.openTrade}</span>
                      </Link>
                    </MotionItem>
                  ))}
                </MotionStagger>
                <div className="note">
                  <b>Why us?</b> Estimating starts with quantities. Intelligence wins the bid. We help you
                  win the right work at the right price.{' '}
                  <Link href="/estimation/trades">View all trade estimation services →</Link>
                </div>
              </div>
            )}

            {relatedMode === 'services' && (
              <div className="stack">
                <div className="eyebrow">Related services</div>
                <div className="grid-2">
                  {CONTENT_SERVICES.filter((s) => s.slug !== content.slug)
                    .slice(0, 4)
                    .map((s) => (
                      <Link className="card card-link" href={`/services/${s.slug}`} key={s.slug}>
                        <div className="ico" dangerouslySetInnerHTML={{ __html: ICO[s.ico as keyof typeof ICO] }} />
                        <div className="code">{s.code}</div>
                        <h3>{s.name}</h3>
                        <p>{s.summary}</p>
                        <span className="card-action">{SITE_COPY.cta.reviewService}</span>
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>
        </section>
        <CTA
          title={content.ctaTitle ?? `Discuss ${content.name.toLowerCase()}`}
          text={
            content.ctaText ??
            'Send the project information you have and we will define the useful scope, open questions, and next step.'
          }
        />
      </>
  );
}
