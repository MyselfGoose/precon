import Image from 'next/image';
import Link from 'next/link';
import { TRADES } from '@/lib/data';
import { ICO } from '@/lib/illustrations';
import { Button, CTA, DarkProcess, FAQ, Photo, TrustReasons, Workbook } from './components';
import {
  BRAND,
  HOME_CASE_STUDIES,
  HOME_COMPAT_TOOLS,
  HOME_FAQ,
  HOME_INVESTMENT_ACQUISITION,
  HOME_STATS,
  HOME_TRADE_CHIPS,
  HOME_TRUST_BAR,
  HOME_WHAT_WE_DO,
  HOME_WHO_WE_SERVE,
  SAMPLE_ESTIMATE_SUMMARY,
  SITE_COPY,
} from '@/lib/content';
import { createMetadata } from '@/lib/metadata';
import { faqPageJsonLd } from '@/lib/json-ld';
import { CountUp, MotionHeroItem, MotionItem, MotionReveal, MotionStagger } from './motion';

export const metadata = createMetadata({
  title: 'Construction Estimating Services',
  description:
    'Preconstruction and construction estimation services for U.S. contractors and developers — CSI Format takeoffs, bid support, and design coordination with documented assumptions.',
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
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="stack">
            <MotionHeroItem delay={0}>
              <div className="eyebrow">{BRAND.descriptor}</div>
            </MotionHeroItem>
            <MotionHeroItem delay={0.08}>
              <p className="brand-hero-name">{BRAND.shortName}</p>
            </MotionHeroItem>
            <MotionHeroItem delay={0.15}>
              <h1>
                Preconstruction and Construction Estimation Services that help you bid with{' '}
                <span className="accent-word">confidence.</span>
              </h1>
            </MotionHeroItem>
            <MotionHeroItem delay={0.22}>
              <p className="lede">
                Construction estimating and preconstruction built for contractors, subcontractors, and developers who
                need clear numbers before the deadline.
              </p>
            </MotionHeroItem>
            <MotionHeroItem delay={0.3}>
              <div className="btn-row">
                <Button href="/quote">{SITE_COPY.cta.primary} →</Button>
                <Link className="btn btn-ghost" href="/services">
                  Explore Services
                </Link>
              </div>
            </MotionHeroItem>
          </div>
          <MotionHeroItem className="hero-art media hero-photo" delay={0.18} y={18} x={24} scale={0.97}>
            <Photo
              src="/images/hero/home-hero.jpg"
              alt="Commercial construction jobsite with steel framing for contractor estimating"
              fill
              priority
              quality={75}
              sizes="(max-width: 1000px) 100vw, 55vw"
            />
          </MotionHeroItem>
        </div>
      </section>

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
            <h2>Preconstruction support that helps you bid</h2>
          </div>
          <MotionStagger className="grid-3">
            {HOME_WHAT_WE_DO.map((item) => (
              <MotionItem className="motion-fill" key={item.title}>
                <Link className="card card-link card-lg" href={item.href}>
                  <div
                    className="ico"
                    dangerouslySetInnerHTML={{ __html: ICO[item.icon as keyof typeof ICO] }}
                  />
                  <div className="code">{item.code}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </Link>
              </MotionItem>
            ))}
          </MotionStagger>
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
                <Link className="card card-link" href={item.href}>
                  <div
                    className="ico"
                    dangerouslySetInnerHTML={{ __html: ICO[item.icon as keyof typeof ICO] }}
                  />
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </Link>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      </section>

      <section className="band">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">See What You Receive</div>
            <h2>Your estimate isn&apos;t just a number. It&apos;s a working bid document.</h2>
            <p className="prose">
              A line-item workbook you can open, edit, and hand to a project manager — not a locked PDF.
            </p>
          </div>
          <div className="deliverable-layout">
            <Workbook
              sample={TRADES[0].sample}
              tabs={['Summary', 'Div 03', 'Div 04', 'Div 05', 'Div 09', 'Exclusions']}
            />
            <div className="estimate-summary">
              <div className="estimate-summary-head">
                <div className="code">Estimate Summary</div>
                <span className="sample-badge">{SAMPLE_ESTIMATE_SUMMARY.label}</span>
              </div>
              <p className="estimate-summary-meta">
                {SAMPLE_ESTIMATE_SUMMARY.project} · {SAMPLE_ESTIMATE_SUMMARY.filename}
              </p>
              <div className="table-scroll">
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

      <section className="band band-ground">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">Trust</div>
            <h2>Why Contractors Trust {BRAND.name}</h2>
            <p className="prose">
              The standards that make an estimate reviewable under bid pressure.
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
            <p className="prose">Trade-level takeoffs across the scopes contractors bid most often.</p>
          </div>
          <MotionStagger className="trade-chip-grid">
            {HOME_TRADE_CHIPS.map((chip) => (
              <MotionItem key={chip.label}>
                <Link className="trade-chip trade-chip-link" href={chip.href}>
                  {chip.label}
                </Link>
              </MotionItem>
            ))}
          </MotionStagger>
          <p>
            <Link className="process-link" href="/trades">
              View All Trades →
            </Link>
          </p>
        </div>
      </section>

      {showProofStats ? (
        <section className="band band-ground">
          <div className="wrap stack-lg">
            <MotionReveal className="stack" y={16}>
              <div className="eyebrow">Proof</div>
              <h2>Built on experience.</h2>
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
              <h2>Project outcomes worth reviewing.</h2>
            </MotionReveal>
            <MotionStagger className="case-study-grid">
              {HOME_CASE_STUDIES.map((study) => (
                <MotionItem className="case-study" key={study.projectType}>
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
        text="Upload your plans. Tell us the bid date. We'll take it from there."
        uploadSecondary
      />
    </>
  );
}
