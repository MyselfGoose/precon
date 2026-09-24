import Link from 'next/link';
import { CTA, PageHead } from '../components';
import { createMetadata } from '@/lib/metadata';
import { MARKETS_CONTENT, MARKET_SECTORS } from '@/lib/content';
import { MotionItem, MotionStagger } from '../motion';

export const metadata = createMetadata({
  title: 'Markets We Serve',
  description:
    'CSI & Design delivers coordinated architectural, structural, MEP, and estimating solutions across residential, commercial, industrial, government, infrastructure, and hospitality markets.',
  path: '/markets',
});

const SECTOR_LINKS: Record<string, { href: string; label: string }> = {
  residential: { href: '/estimation/residential', label: 'Residential estimating' },
  commercial: { href: '/estimation/commercial', label: 'Commercial estimating' },
  industrial: { href: '/estimation/industrial', label: 'Industrial estimating' },
  'government-public': { href: '/estimation/public-projects', label: 'Public project estimating' },
  'infrastructure-civil': { href: '/estimation/public-projects', label: 'Public project estimating' },
  'hospitality-recreation': { href: '/services', label: 'Design & estimating services' },
};

export default function MarketsPage() {
  return (
    <>
      <PageHead
        eyebrow="Markets We Serve"
        title={
          <>
            One accountable team across every market we <span className="accent-word">serve.</span>
          </>
        }
        lede="Coordinated architectural, structural, MEP, and estimating support across the markets we work in every week."
        image="/images/projects/public-institutional.jpg"
        imageAlt="US public and institutional construction"
        priority
      />
      <section className="band">
        <div className="wrap stack-lg">
          <MotionStagger className="grid-3">
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
        </div>
      </section>
      <section className="band band-ground">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">Integrated delivery</div>
            <h2>{MARKETS_CONTENT.coordinationTitle}</h2>
            <p className="prose">{MARKETS_CONTENT.coordinationBody[0]}</p>
            <p className="prose">{MARKETS_CONTENT.coordinationBody[1]}</p>
            <p className="prose">{MARKETS_CONTENT.coordinationBody[2]}</p>
            <div className="note">
              <b>One accountable team.</b> {MARKETS_CONTENT.closing}
            </div>
            <p className="prose">
              Looking for trade-specific estimating? Explore our <Link href="/estimation">estimation services</Link>{' '}
              or review <Link href="/services">construction drawings and engineering</Link>.
            </p>
          </div>
        </div>
      </section>
      <CTA
        title="Tell us about your market and project"
        text="Share the sector, project type, and decision in front of you. We will define the right coordinated package."
      />
    </>
  );
}
