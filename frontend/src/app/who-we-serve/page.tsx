import Link from 'next/link';
import { CTA, PageHead, Button } from '../components';
import { createMetadata } from '@/lib/metadata';
import { AUDIENCE_SECTIONS, BRAND, MARKET_SECTORS, MARKETS_CONTENT, SITE_COPY } from '@/lib/content';
import { ICO } from '@/lib/illustrations';
import { MotionItem, MotionReveal, MotionStagger } from '../motion';

export const metadata = createMetadata({
  title: 'Who We Serve',
  description:
    'QuantSult supports general contractors, subcontractors, developers, and architects with trade-specific preconstruction estimating and design coordination.',
  path: '/who-we-serve',
});

const SECTOR_LINKS: Record<string, { href: string; label: string }> = {
  residential: { href: '/estimation/residential', label: 'Residential estimating' },
  commercial: { href: '/estimation/commercial', label: 'Commercial estimating' },
  industrial: { href: '/estimation/industrial', label: 'Industrial estimating' },
  public: {
    href: '/estimation/public-projects',
    label: 'Public project estimating',
  },
};

export default function Who() {
  return (
    <>
      <PageHead
        eyebrow="Who we serve"
        title={
          <>
            Support built around your role in the <span className="accent-word">bid.</span>
          </>
        }
        lede="Estimating, takeoffs, and design coordination for the teams who need a defensible number before the deadline."
        image="/images/hero/who-we-serve.jpg"
        imageAlt="Construction professionals reviewing plans on a job site"
        priority
      />
      <section className="band">
        <div className="wrap stack-lg">
          {AUDIENCE_SECTIONS.map((audience) => (
            <MotionReveal className="stack audience-section" y={18} key={audience.id} id={audience.id}>
              <div
                className="ico"
                style={{ width: 48, height: 48, color: 'var(--cherry)' }}
                dangerouslySetInnerHTML={{ __html: ICO[audience.icon as keyof typeof ICO] }}
              />
              <div className="code">{audience.code}</div>
              <h2 style={{ fontSize: 'var(--s2)' }}>{audience.name}</h2>
              <p className="prose" style={{ fontSize: '1.15rem' }}>
                {audience.problem}
              </p>
              <div className="audience-grid">
                <div className="stack">
                  <h3>Services</h3>
                  <ul className="audience-block-list">
                    {audience.services.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="stack">
                  <h3>Deliverables</h3>
                  <ul className="audience-block-list">
                    {audience.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="btn-row">
                <Button href="/quote">{SITE_COPY.cta.primary} →</Button>
              </div>
            </MotionReveal>
          ))}
          <div className="note">
            <b>Need a trade-specific estimation page?</b> Browse{' '}
            <Link href="/estimation/trades">CSI Trades</Link> or review our{' '}
            <Link href="/trades">CSI trade expertise</Link>.
          </div>
        </div>
      </section>

      <section className="band band-ground" id="markets">
        <div className="wrap stack-lg">
          <MotionReveal className="stack" y={16}>
            <div className="eyebrow">Markets we support</div>
            <h2>{MARKETS_CONTENT.title}</h2>
            <p className="prose">{MARKETS_CONTENT.lede}</p>
          </MotionReveal>
          <MotionStagger className="grid-4 markets-grid">
            {MARKET_SECTORS.map((sector) => {
              const link = SECTOR_LINKS[sector.slug];
              return (
                <MotionItem className="motion-fill" key={sector.slug}>
                  {link ? (
                    <Link className="card card-link" href={link.href}>
                      <div className="code">{sector.name.slice(0, 3).toUpperCase()}</div>
                      <h3>{sector.name}</h3>
                      <p>{sector.summary}</p>
                      <span className="card-action">{link.label} →</span>
                    </Link>
                  ) : (
                    <div className="card">
                      <div className="code">{sector.name.slice(0, 3).toUpperCase()}</div>
                      <h3>{sector.name}</h3>
                      <p>{sector.summary}</p>
                    </div>
                  )}
                </MotionItem>
              );
            })}
          </MotionStagger>
          <p className="prose">{MARKETS_CONTENT.specialtyNote}</p>
          <div className="note">
            <b>One accountable team.</b> {MARKETS_CONTENT.closing} Looking for trade-specific
            estimating? Explore <Link href="/services/estimating">estimating services</Link> or{' '}
            <Link href="/services">all services</Link>.
          </div>
        </div>
      </section>

      <CTA
        title={`Tell ${BRAND.name} what your team needs to decide`}
        text="Share your role, project stage, scope, and timing so the first conversation starts in the right place."
        uploadSecondary
      />
    </>
  );
}
