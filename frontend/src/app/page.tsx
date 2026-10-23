import Image from 'next/image';
import Link from 'next/link';
import { TRADES } from '@/lib/data';
import { ICO } from '@/lib/illustrations';
import { Button, CTA, DarkProcess, FAQ, TrustReasons, Workbook } from './components';
import {
  ABOUT_CONTENT,
  BRAND,
  FEATURED_PROJECTS,
  HOME_CASE_STUDIES,
  HOME_COMPAT_TOOLS,
  HOME_ESTIMATING,
  HOME_FAQ,
  HOME_INVESTMENT_ACQUISITION,
  HOME_PILLARS,
  HOME_ROLES,
  HOME_STATS,
  HOME_STATS_NOTE,
  HOME_TRADE_CHIPS,
  HOME_TRUST_BAR,
  HOME_WHAT_WE_DO,
  HOME_WHO_WE_SERVE,
  MARKETS_CONTENT,
  SAMPLE_ESTIMATE_SUMMARY,
  SITE_COPY,
} from '@/lib/content';
import { createMetadata } from '@/lib/metadata';
import { faqPageJsonLd } from '@/lib/json-ld';
import { CountUp, MotionHeroItem, MotionItem, MotionReveal, MotionStagger } from './motion';

export const metadata = createMetadata({
  title: 'Construction Estimating Services',
  description:
    'Preconstruction and construction estimating services for U.S. contractors and developers — CSI MasterFormat takeoffs, bid support, and design coordination with documented assumptions.',
  path: '/',
});

export default function Home() {
  const showProofStats = HOME_STATS.length > 0;
  const showCaseStudies = HOME_CASE_STUDIES.length > 0;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd()) }}
      />
      <section className="hero hero-deliverable">
        <div className="wrap hero-grid">
          <div className="stack">
            <MotionHeroItem delay={0}>
              <div className="eyebrow">Preconstruction · Estimating · Design Support</div>
            </MotionHeroItem>
            <MotionHeroItem delay={0.1}>
              <h1>
                Construction estimating you can{' '}
                <span className="accent-word">defend in bid review.</span>
              </h1>
            </MotionHeroItem>
            <MotionHeroItem delay={0.18}>
              <p className="lede">
                Quantity takeoffs and cost estimates organized to CSI MasterFormat, delivered as editable Excel
                workbooks for contractors and developers across the United States.
              </p>
            </MotionHeroItem>
            <MotionHeroItem delay={0.26}>
              <div className="btn-row">
                <Button href="/quote">{SITE_COPY.cta.primary} →</Button>
                <Link className="btn btn-ghost" href="/services">
                  Our Services
                </Link>
              </div>
            </MotionHeroItem>
            <MotionHeroItem delay={0.32}>
              <p className="hero-contact-line">
                <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
                <span aria-hidden="true"> · </span>
                <a href={`tel:${BRAND.phoneRaw}`}>{BRAND.phoneDisplay}</a>
              </p>
            </MotionHeroItem>
          </div>
          <MotionHeroItem className="hero-workbook" delay={0.18} y={18} x={24} scale={0.97}>
            <Workbook
              sample={TRADES[0].sample}
              tabs={['Summary', 'Div 03', 'Div 06', 'Div 07', 'Exclusions']}
            />
          </MotionHeroItem>
        </div>
      </section>

      <div className="dimension-rule" aria-hidden="true">
        <span />
      </div>

      <section className="band band-ground trust-compat-band">
        <div className="wrap stack">
          <MotionStagger className="trust-bar">
            {HOME_TRUST_BAR.map((item) => (
              <MotionItem className="trust-bar-item" key={item}>
                {item}
              </MotionItem>
            ))}
          </MotionStagger>
          <div className="compat-strip">
            <span className="compat-label">Compatible with</span>
            <ul className="compat-list">
              {HOME_COMPAT_TOOLS.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">What we do</div>
            <h2>Preconstruction services built around the estimate</h2>
          </div>
          <MotionStagger className="grid-3">
            {HOME_WHAT_WE_DO.map((item) => (
              <MotionItem className="motion-fill" key={item.title}>
                <Link className="card card-link card-media card-accent-secondary" href={item.href}>
                  <div className="card-media-frame card-media-frame-sm">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 900px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="card-media-body">
                    <div
                      className="ico"
                      dangerouslySetInnerHTML={{ __html: ICO[item.icon as keyof typeof ICO] }}
                    />
                    <div className="code">{item.code}</div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </Link>
              </MotionItem>
            ))}
          </MotionStagger>
          <MotionStagger className="pillars">
            {HOME_PILLARS.map((pillar) => (
              <MotionItem className="pillar" key={pillar.title}>
                <div className="ico" dangerouslySetInnerHTML={{ __html: ICO[pillar.icon as keyof typeof ICO] }} />
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      </section>

      <section className="band band-ground estimating-lead">
        <div className="wrap stack-lg">
          <div className="estimating-lead-grid">
            <div className="stack">
              <div className="eyebrow">{HOME_ESTIMATING.eyebrow}</div>
              <h2>{HOME_ESTIMATING.title}</h2>
              <p className="prose">{HOME_ESTIMATING.lede}</p>
              <ul className="estimate-checklist">
                {HOME_ESTIMATING.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="btn-row">
                <Link className="btn btn-ghost" href={HOME_ESTIMATING.href}>
                  Estimating services →
                </Link>
              </div>
            </div>
            <div className="estimating-lead-media media">
              <Image
                src={HOME_ESTIMATING.image}
                alt={HOME_ESTIMATING.imageAlt}
                fill
                sizes="(max-width: 1000px) 100vw, 45vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="band band-ground">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">Who we serve</div>
            <h2>Built around your role in the bid</h2>
          </div>
          <MotionStagger className="grid-4">
            {HOME_WHO_WE_SERVE.map((item) => (
              <MotionItem className="motion-fill" key={item.title}>
                <Link className="card card-link card-media card-accent-secondary" href={item.href}>
                  <div className="card-media-frame card-media-frame-sm">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 900px) 100vw, 25vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="card-media-body">
                    <div
                      className="ico"
                      dangerouslySetInnerHTML={{ __html: ICO[item.icon as keyof typeof ICO] }}
                    />
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </Link>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      </section>

      <section className="band">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">Markets we support</div>
            <h2>Built across the projects that shape communities</h2>
            <p className="prose">{MARKETS_CONTENT.lede}</p>
          </div>
          <MotionStagger className="grid-4 markets-grid">
            {FEATURED_PROJECTS.map((project) => (
              <MotionItem className="motion-fill" key={project.title}>
                <Link className="project-card" href="/who-we-serve#markets">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <span className="label">{project.title}</span>
                </Link>
              </MotionItem>
            ))}
          </MotionStagger>
          <p className="prose">{MARKETS_CONTENT.specialtyNote}</p>
          <p className="prose">
            See how we support each market on <Link href="/who-we-serve#markets">Who We Serve</Link>.
          </p>
        </div>
      </section>

      <div className="dimension-rule" aria-hidden="true">
        <span />
      </div>

      <section className="band band-ground" id="sample-estimate">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">See What You Receive</div>
            <h2>Your estimate isn&apos;t just a number. It&apos;s a working bid document.</h2>
            <p className="prose">
              A CSI MasterFormat workbook with sheet references, material and labor columns, and formula-driven
              totals. This is the work product: editable Excel, not a locked PDF.
            </p>
          </div>
          <div className="deliverable-layout">
            <Workbook
              sample={TRADES[0].sample}
              tabs={['Summary', 'Div 03', 'Div 06', 'Div 07', 'Exclusions']}
            />
            <div className="estimate-summary">
              <div className="estimate-summary-head">
                <div className="code">Estimate Summary</div>
                <span className="sample-badge">{SAMPLE_ESTIMATE_SUMMARY.label}</span>
              </div>
              <p className="estimate-summary-meta">
                {SAMPLE_ESTIMATE_SUMMARY.project} · {SAMPLE_ESTIMATE_SUMMARY.filename}
              </p>
              <div className="table-scroll estimate-summary-scroll">
                <table>
                  <caption className="sr-only">Sample estimate summary by division</caption>
                  <thead>
                    <tr>
                      {SAMPLE_ESTIMATE_SUMMARY.columns.map((col) => (
                        <th className={col === 'Division' ? '' : 'n'} key={col} scope="col">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SAMPLE_ESTIMATE_SUMMARY.rows.map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell, i) => (
                          <td className={i === 0 ? '' : 'n'} key={`${row[0]}-${i}`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr className="total">
                      <th scope="row">{SAMPLE_ESTIMATE_SUMMARY.total[0]}</th>
                      <td className="n">{SAMPLE_ESTIMATE_SUMMARY.total[1]}</td>
                      <td className="n">{SAMPLE_ESTIMATE_SUMMARY.total[2]}</td>
                      <td className="n">{SAMPLE_ESTIMATE_SUMMARY.total[3]}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="stack">
            <h3>Included in every estimate</h3>
            <ul className="estimate-checklist">
              {SAMPLE_ESTIMATE_SUMMARY.included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="supporting">{SAMPLE_ESTIMATE_SUMMARY.tracesBack}</p>
            <p className="supporting">{SAMPLE_ESTIMATE_SUMMARY.toolCompatibility}</p>
          </div>
          <div className="btn-row">
            <a
              className="btn btn-ghost"
              href={SAMPLE_ESTIMATE_SUMMARY.downloadHref}
              download
              data-analytics="sample_download"
            >
              {SAMPLE_ESTIMATE_SUMMARY.downloadLabel} →
            </a>
            <Link className="btn btn-ghost" href="/quote#plans">
              {SITE_COPY.cta.uploadPlans} →
            </Link>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">Trust</div>
            <h2 id="why-trust">Why Contractors Trust {BRAND.name}</h2>
            <p className="prose">
              Reviewable standards under bid pressure — demonstrated in the{' '}
              <a href="#sample-estimate">sample estimate</a> above.
            </p>
          </div>
          <TrustReasons />
        </div>
      </section>

      <DarkProcess teaser />

      <section className="band">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">Trades</div>
            <h2>Estimating by division</h2>
            <p className="prose">
              CSI divisions with dedicated pages covering what we measure, in what units, and what we exclude by
              default.
            </p>
          </div>
          <div className="trade-chip-grid">
            {HOME_TRADE_CHIPS.map((chip) => (
              <Link className="trade-chip trade-chip-link" href={chip.href} key={chip.href + chip.label}>
                {chip.label}
              </Link>
            ))}
          </div>
          <p>
            <Link className="btn btn-ghost" href="/trades">
              View All Trades →
            </Link>
          </p>
        </div>
      </section>

      <section className="band band-ground">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">Why {BRAND.name}</div>
            <h2>{ABOUT_CONTENT.lede}</h2>
            <p className="prose">{ABOUT_CONTENT.paragraphs[0]}</p>
          </div>
          <div className="grid-3">
            {ABOUT_CONTENT.benefits.slice(0, 3).map(([code, title, text]) => (
              <div className="card card-accent-secondary" key={code}>
                <div className="code">{code}</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <p className="prose">
            See the full story on our <Link href="/about">About</Link> page, explore{' '}
            <Link href="/services/estimating">estimating by project type and trade</Link>, or review{' '}
            <Link href="/who-we-serve#markets">markets we serve</Link>.
          </p>
        </div>
      </section>

      <section className="band">
        <div className="wrap stack-lg">
          <MotionReveal className="stack" y={16}>
            <div className="eyebrow">The team behind the work</div>
            <h2>Roles on every estimate</h2>
            <p className="prose">
              Lead estimating, design coordination, and bid support on every package — so takeoffs, drawings, and bid-day
              delivery stay aligned.
            </p>
          </MotionReveal>
          <MotionStagger className="roles-grid">
            {HOME_ROLES.map((role) => (
              <MotionItem className="role-card" key={role.title}>
                <h3>{role.title}</h3>
                <p>{role.description}</p>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      </section>

      {showProofStats ? (
        <section className="band band-ground">
          <div className="wrap stack-lg">
            <MotionReveal className="stack" y={16}>
              <div className="eyebrow">Proof</div>
              <h2>What you can expect.</h2>
              <p className="prose supporting">{HOME_STATS_NOTE}</p>
            </MotionReveal>
            <div className="stats-light">
              {HOME_STATS.map((stat, index) => {
                const numericMatch = /^(\d+)([+%]?)$/.exec(stat.value);
                return (
                  <MotionReveal className="stat" key={stat.label} delay={index * 0.08} y={16}>
                    <b>
                      {numericMatch ? (
                        <CountUp value={Number(numericMatch[1])} suffix={numericMatch[2]} label={stat.value} />
                      ) : (
                        stat.value
                      )}
                    </b>
                    <small>{stat.label}</small>
                  </MotionReveal>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {showCaseStudies ? (
        <section className="band">
          <div className="wrap stack-lg">
            <MotionReveal className="stack" y={16}>
              <div className="eyebrow">Results</div>
              <h2>Illustrative project outcomes.</h2>
              <p className="prose">
                Anonymized examples of the kind of bid, scope, and result we deliver. Not client testimonials.
              </p>
            </MotionReveal>
            <MotionStagger className="case-study-grid">
              {HOME_CASE_STUDIES.map((study) => (
                <MotionItem className="case-study" key={study.projectType}>
                  {study.disclaimer ? <p className="case-study-disclaimer">{study.disclaimer}</p> : null}
                  <p className="case-study-type">{study.projectType}</p>
                  <p className="case-study-size mono">{study.size}</p>
                  <p className="case-study-result">{study.result}</p>
                </MotionItem>
              ))}
            </MotionStagger>
          </div>
        </section>
      ) : null}

      <section className="band band-ground">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">Common questions</div>
            <h2>Before you send a set</h2>
          </div>
          <FAQ items={[...HOME_FAQ]} />
        </div>
      </section>

      <section className="band band-dark on-dark investment-band">
        <div className="wrap investment-grid">
          <MotionReveal className="investment-copy" y={18}>
            <div className="eyebrow">{HOME_INVESTMENT_ACQUISITION.eyebrow}</div>
            <h2>{HOME_INVESTMENT_ACQUISITION.title}</h2>
            <p className="prose" style={{ color: 'rgba(255,255,255,.86)' }}>
              {HOME_INVESTMENT_ACQUISITION.body}
            </p>
            <p className="supporting" style={{ color: 'rgba(255,255,255,.78)' }}>
              {HOME_INVESTMENT_ACQUISITION.supporting}
            </p>
            <div className="btn-row">
              <Button href={HOME_INVESTMENT_ACQUISITION.href}>
                {HOME_INVESTMENT_ACQUISITION.cta} →
              </Button>
            </div>
          </MotionReveal>
          <MotionReveal className="investment-media" y={24} delay={0.08}>
            <Image
              src={HOME_INVESTMENT_ACQUISITION.image}
              alt={HOME_INVESTMENT_ACQUISITION.imageAlt}
              fill
              sizes="(max-width: 1000px) 100vw, 45vw"
              style={{ objectFit: 'cover' }}
            />
          </MotionReveal>
        </div>
      </section>

      <CTA
        title="Have a project to bid?"
        text="Upload your plans by email or the quote form. Tell us the bid date. We'll take it from there."
        uploadSecondary
      />
    </>
  );
}
