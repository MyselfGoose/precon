import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DIVISION_IMAGES, TRADES } from '@/lib/data';
import { CTA, FAQ, PhoneLink, Photo, Svg, Workbook } from '../../components';
import { D } from '@/lib/illustrations';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return TRADES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const trade = TRADES.find((t) => t.slug === slug);
  return createMetadata({
    title: trade ? `${trade.name} Estimating` : 'Trade not found',
    description: trade ? trade.lede : 'Explore CSI & Design trade estimating and takeoff support.',
    path: `/trades/${slug}`,
  });
}

export default async function TradePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tr = TRADES.find((x) => x.slug === slug);
  if (!tr) notFound();

  const idx = TRADES.indexOf(tr);
  const prev = TRADES[(idx + TRADES.length - 1) % TRADES.length];
  const next = TRADES[(idx + 1) % TRADES.length];
  const units = [...new Set(tr.measure.flatMap((m) => m.unit.split(' · ')))].join(' · ');
  const photo = DIVISION_IMAGES[tr.slug];

  return (
    <>
      <section className="trade-hero on-dark">
        <div className="wrap trade-hero-grid">
          <div className="stack">
            <div className="crumb">
              <Link href="/trades">Trades</Link> / Division {tr.div}
            </div>
            <div className="eyebrow">
              Division {tr.div} · {tr.name}
            </div>
            <h1>
              {tr.name} estimating &amp; takeoff services
            </h1>
            <p className="lede">{tr.lede}</p>
            <div className="btn-row">
              <Link className="btn btn-primary" href="/quote">
                Send your {tr.noun} scope
              </Link>
              <PhoneLink className="btn btn-on-dark">Talk through your scope</PhoneLink>
            </div>
          </div>
          <div className="trade-hero-visual">
            {photo ? (
              <>
                <div className="media trade-hero-photo">
                  <Photo src={photo.src} alt={photo.alt} fill priority sizes="(max-width: 1000px) 100vw, 55vw" />
                </div>
                <div className="trade-hero-diagram">
                  <div className="draw">
                    <Svg markup={D[tr.slug]()} />
                    <div className="draw-cap">
                      <b>Division {tr.div}</b>
                      <span>Typical detail, drawn for illustration</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="draw">
                <Svg markup={D[tr.slug]()} />
                <div className="draw-cap">
                  <b>Division {tr.div}</b>
                  <span>Typical detail, drawn for illustration</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="band trade-overlap">
        <div className="wrap stack-lg">
          <div className="split" style={{ alignItems: 'start' }}>
            <div className="stack">
              <div className="eyebrow">Approach</div>
              <h2 style={{ fontSize: 'var(--s2)' }}>How we estimate {tr.noun}</h2>
              <p className="prose">{tr.intro[0]}</p>
              <p className="prose">{tr.intro[1]}</p>
            </div>
            {photo ? (
              <div className="media project-photo">
                <Photo src={photo.src} alt={photo.alt} fill sizes="(max-width: 1000px) 100vw, 48vw" />
              </div>
            ) : (
              <div className="stack">
                <dl className="kv">
                  <dt>Drawings used</dt>
                  <dd>{tr.sheets}</dd>
                  <dt>Reported in</dt>
                  <dd>{units}</dd>
                  <dt>Format</dt>
                  <dd>
                    Editable Excel workbook, division tab with sheet references; PDF summary; written exclusions and
                    assumptions.
                  </dd>
                  <dt>Turnaround</dt>
                  <dd>Confirmed after we review the set and the project date.</dd>
                </dl>
                <div className="excl">
                  <h4>Excluded by default</h4>
                  <ul>
                    {tr.exclusions.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {photo && (
            <div className="split" style={{ alignItems: 'start' }}>
              <dl className="kv">
                <dt>Drawings used</dt>
                <dd>{tr.sheets}</dd>
                <dt>Reported in</dt>
                <dd>{units}</dd>
                <dt>Format</dt>
                <dd>
                  Editable Excel workbook, division tab with sheet references; PDF summary; written exclusions and
                  assumptions.
                </dd>
                <dt>Turnaround</dt>
                <dd>Confirmed after we review the set and the project date.</dd>
              </dl>
              <div className="excl">
                <h4>Excluded by default</h4>
                <ul>
                  {tr.exclusions.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="band band-ground">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">What we measure</div>
            <h2>
              Line items in {tr.art} {tr.noun} takeoff
            </h2>
            <p className="prose">
              Every group below is a separate section of the workbook. Units shown are the units the estimate reports in.
            </p>
          </div>
          <div className="tp-grid">
            {tr.measure.map((m) => (
              <div className="spec" key={m.group}>
                <div className="spec-h">
                  <h4>{m.group}</h4>
                  <span className="u">{m.unit}</span>
                </div>
                <ul>
                  {m.items.map(([n, u]) => (
                    <li key={n}>
                      <span>{n}</span>
                      <span>{u}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">Sample output</div>
            <h2>A {tr.noun} takeoff, as delivered</h2>
          </div>
          <Workbook
            sample={tr.sample}
            tabs={['Summary', `Div ${tr.div}`, 'Exclusions', 'Assumptions']}
            active={`Div ${tr.div}`}
          />
        </div>
      </section>

      <section className="band band-ground">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">{tr.name} questions</div>
            <h2>Specific to this trade</h2>
          </div>
          <FAQ items={tr.faq} />
        </div>
      </section>

      <section className="band trade-nav-band">
        <div className="wrap stack">
          <div className="eyebrow">All trades</div>
          <div className="trade-nav">
            {TRADES.map((x) => (
              <Link href={`/trades/${x.slug}`} aria-current={x.slug === slug ? 'page' : undefined} key={x.slug}>
                DIV {x.div} {x.name}
              </Link>
            ))}
          </div>
          <div className="btn-row">
            <Link className="btn btn-ghost btn-sm" href={`/trades/${prev.slug}`}>
              ← Div {prev.div} {prev.name}
            </Link>
            <Link className="btn btn-ghost btn-sm" href={`/trades/${next.slug}`}>
              Div {next.div} {next.name} →
            </Link>
          </div>
        </div>
      </section>

      <CTA
        title={`${tr.name} bid due soon?`}
        text={`Send the relevant sheets and we’ll come back with a price and a date.`}
      />
    </>
  );
}
