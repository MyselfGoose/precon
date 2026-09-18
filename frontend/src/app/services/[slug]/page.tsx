import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CONTENT_SERVICES, ACQUISITION_CONTENT } from '@/lib/content';
import { SERVICES } from '@/lib/data';
import { ICO } from '@/lib/illustrations';
import { CTA, PageHead, ServiceCard } from '../../components';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import PropertyForm from '../acquisitions-form';

export function generateStaticParams() {
  return [...SERVICES.map((s) => ({ slug: s.slug })), ...CONTENT_SERVICES.map((s) => ({ slug: s.slug }))];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const content = CONTENT_SERVICES.find((s) => s.slug === slug);
  const legacy = SERVICES.find((s) => s.slug === slug);
  const item = content ? { name: content.name, summary: content.summary } : legacy ? { name: legacy.name, summary: legacy.short } : null;
  return createMetadata({
    title: item ? item.name : 'Service not found',
    description: item ? item.summary : 'Explore PreCon Ext project support services.',
    path: `/services/${slug}`,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = CONTENT_SERVICES.find((s) => s.slug === slug);
  const legacy = SERVICES.find((s) => s.slug === slug);
  if (!content && !legacy) notFound();

  if (content?.slug === 'acquisitions-investments') {
    return (
      <>
        <PageHead
          eyebrow={`${content.code} · Service`}
          title={ACQUISITION_CONTENT.title}
          lede={ACQUISITION_CONTENT.lede}
          crumb={
            <>
              <Link href="/services">Services</Link> / {content.name}
            </>
          }
        />
        <section className="band">
          <div className="wrap stack-lg">
            <div className="stack">
              {ACQUISITION_CONTENT.intro.map((p) => (
                <p className="prose" key={p.slice(0, 48)}>
                  {p}
                </p>
              ))}
            </div>
            <div className="grid-2">
              <div className="stack">
                <h2 style={{ fontSize: 'var(--s2)' }}>{ACQUISITION_CONTENT.offerTitle}</h2>
                {ACQUISITION_CONTENT.offerBody.map((p) => (
                  <p className="prose" key={p.slice(0, 48)}>
                    {p}
                  </p>
                ))}
              </div>
              <div className="stack">
                <h2 style={{ fontSize: 'var(--s2)' }}>{ACQUISITION_CONTENT.advantageTitle}</h2>
                <p className="prose">{ACQUISITION_CONTENT.advantageIntro}</p>
                <p className="prose">We can evaluate:</p>
                <ul className="prose" style={{ paddingLeft: 18, lineHeight: 1.7 }}>
                  {ACQUISITION_CONTENT.advantageItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="prose">{ACQUISITION_CONTENT.advantageClose}</p>
              </div>
            </div>
            <div className="stack">
              <div className="eyebrow">Process</div>
              <h2>{ACQUISITION_CONTENT.stepsTitle}</h2>
              <div className="stat-strip" style={{ marginTop: 8, gridTemplateColumns: 'repeat(5, 1fr)' }}>
                {ACQUISITION_CONTENT.steps.map((step, i) => (
                  <div className="stat" key={step}>
                    <b>{String(i + 1).padStart(2, '0')}</b>
                    <small>{step}</small>
                  </div>
                ))}
              </div>
              <p className="prose">{ACQUISITION_CONTENT.stepsBody}</p>
            </div>
          </div>
        </section>
        <section className="band band-ground" id="discuss-property">
          <div className="wrap stack-lg">
            <div className="stack">
              <div className="eyebrow">Property submission</div>
              <h2>{ACQUISITION_CONTENT.ctaTitle}</h2>
              <p className="prose">{ACQUISITION_CONTENT.ctaText}</p>
            </div>
            <div className="grid-2" style={{ gap: 44, alignItems: 'start' }}>
              <PropertyForm />
              <div className="note">
                <b>What happens next.</b> Our team evaluates the property, its condition, the investment required to improve it, and its potential — then determines whether an acquisition structure makes sense.
              </div>
            </div>
          </div>
        </section>
        <CTA title={ACQUISITION_CONTENT.ctaTitle} text={ACQUISITION_CONTENT.ctaText} />
      </>
    );
  }

  if (content) {
    return (
      <>
        <PageHead
          eyebrow={`${content.code} · Service`}
          title={content.name}
          lede={content.summary}
          crumb={
            <>
              <Link href="/services">Services</Link> / {content.name}
            </>
          }
        />
        <section className="band">
          <div className="wrap stack-lg">
            <div className="split" style={{ alignItems: 'start' }}>
              <div className="stack">
                <div className="ico" style={{ width: 64, height: 64 }} dangerouslySetInnerHTML={{ __html: ICO[content.ico as keyof typeof ICO] }} />
                <div className="code">{content.code}</div>
                <h2 style={{ fontSize: 'var(--s2)' }}>What this supports</h2>
                <p className="prose">{content.details}</p>
              </div>
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
            </div>

            {content.sections && content.sections.length > 0 && (
              <div className="stack-lg">
                <div className="stack">
                  <div className="eyebrow">Deliverables</div>
                  <h2>What we produce</h2>
                </div>
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
                <div className="grid-2">
                  {content.calculations.map((calc) => (
                    <div className="card" key={calc.title}>
                      <h3>{calc.title}</h3>
                      <p>{calc.description}</p>
                    </div>
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
                <div className="grid-3">
                  {content.systems.map((system) => (
                    <div className="card" key={system}>
                      <h3 style={{ fontSize: '1.05rem' }}>{system}</h3>
                    </div>
                  ))}
                </div>
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

            {content.slug === 'estimating' && (
              <div className="note">
                <b>Explore estimation by project type and trade.</b> Review{' '}
                <Link href="/estimation">general construction, industrial, public projects</Link>, and{' '}
                <Link href="/estimation/trades">individual trade estimation pages</Link>.
              </div>
            )}

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
                      <span className="card-action">Review this service →</span>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </section>
        <CTA title={content.ctaTitle ?? `Discuss ${content.name.toLowerCase()}`} text={content.ctaText ?? 'Send the project information you have and we will define the useful scope, open questions, and next step.'} />
      </>
    );
  }

  return (
    <>
      <PageHead
        eyebrow={`${legacy!.code} · Service`}
        title={legacy!.name}
        lede={legacy!.short}
        crumb={
          <>
            <Link href="/services">Services</Link> / {legacy!.name}
          </>
        }
      />
      <section className="band">
        <div className="wrap stack-lg">
          <div className="split" style={{ alignItems: 'start' }}>
            <div className="stack">
              <h2 style={{ fontSize: 'var(--s2)' }}>What this supports</h2>
              <p className="prose">{legacy!.desc}</p>
              <h3>Best fit when</h3>
              <p className="prose">{legacy!.who}</p>
            </div>
            <div className="spec">
              <div className="spec-h">
                <h4>Included work</h4>
                <span className="u">SCOPE</span>
              </div>
              <ul>
                {legacy!.points.map((p) => (
                  <li key={p}>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid-2">
            {SERVICES.filter((x) => x.slug !== legacy!.slug).map((o) => (
              <ServiceCard service={o} key={o.slug} />
            ))}
          </div>
        </div>
      </section>
      <CTA title={`Need ${legacy!.name.toLowerCase()}?`} text="Send the project information and we will come back with a clear scope and next step." />
    </>
  );
}
