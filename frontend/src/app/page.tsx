import Image from 'next/image';
import Link from 'next/link';
import { TRADES } from '@/lib/data';
import { ICO } from '@/lib/illustrations';
import { Button, CTA, DarkProcess, FAQ, Photo, TradeTile, Workbook } from './components';
import {
  ABOUT_CONTENT,
  BRAND,
  FEATURED_PROJECTS,
  getPrimaryServices,
  HOME_INVESTMENT_ACQUISITION,
  HOME_PILLARS,
  HOME_STATS,
  MARKETS_CONTENT,
  SITE_COPY,
} from '@/lib/content';
import { createMetadata } from '@/lib/metadata';
import { MotionHeroItem, MotionItem, MotionReveal, MotionStagger, CountUp } from './motion';

export const metadata = createMetadata({
  title: BRAND.name,
  description:
    'Preconstruction and construction estimation services for contractors and developers — takeoffs, bid support, and design coordination that help you bid with confidence.',
  path: '/',
});

const homeFaq: [string, string][] = [
  [
    'How do you make an estimate defensible?',
    'Every quantity is tied to a drawing, scale, or stated assumption. Exclusions and open questions are visible in the deliverable, so your team can explain the number instead of guessing when a bid is reviewed.',
  ],
  [
    'What do I need to send you?',
    'Start with the PDF plan set and specifications you have. Include the trades, project location, and important date. If the set is incomplete, say so. We will identify what needs to be confirmed.',
  ],
  [
    'How quickly can you help?',
    'Timing depends on the size and completeness of the set. Share the bid or decision date in your request and we will confirm a practical next step after reviewing the scope.',
  ],
  [
    'How do you price the work?',
    'We scope the work from your files and explain the fee before anything starts. You get a clear engagement rather than an open-ended subscription or software commitment.',
  ],
  [
    'What if the drawings change?',
    'Addenda and revisions during the bid period can be coordinated with the original scope. A redesign or materially changed project after award is reviewed as new work.',
  ],
  [
    'How are project files handled?',
    'We use the information you share to understand and respond to your request, then coordinate the agreed work. Do not send information that is not needed for the project conversation.',
  ],
];

const primaryServices = getPrimaryServices();

export default function Home() {
  return (
    <>
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
                Accurate takeoffs, bid-ready estimates, and design coordination for contractors and
                developers who need clear numbers before the deadline.
              </p>
            </MotionHeroItem>
            <MotionHeroItem delay={0.3}>
              <div className="btn-row">
                <Button href="/quote">{SITE_COPY.cta.primary} →</Button>
                <Link className="btn btn-ghost" href="/services">
                  Our Services
                </Link>
              </div>
            </MotionHeroItem>
          </div>
          <MotionHeroItem className="hero-art media hero-photo" delay={0.18} y={18} x={24} scale={0.97}>
            <Photo
              src="/images/hero/home-hero.jpg"
              alt="American suburban home with wraparound porch and lawn"
              fill
              priority
              sizes="(max-width: 1000px) 100vw, 55vw"
            />
          </MotionHeroItem>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
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

      <section className="band band-ground">
        <div className="wrap stack-lg">
          <MotionReveal className="stack" y={16}>
            <div className="eyebrow">Experience</div>
            <h2>Built on Experience.</h2>
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

      <section className="band">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">Preconstruction services</div>
            <h2>What we bring together</h2>
            <p className="prose">
              Estimating, quantity takeoffs, drawings, engineering, and visualization — the preconstruction
              support contractors and developers need before construction starts.
            </p>
          </div>
          <MotionStagger className="grid-3">
            {primaryServices.map((s) => (
              <MotionItem className="motion-fill" key={s.slug}>
                <Link className="card card-link" href={`/services/${s.slug}`}>
                  <div className="ico" dangerouslySetInnerHTML={{ __html: ICO[s.ico as keyof typeof ICO] }} />
                  <div className="code">{s.code}</div>
                  <h3>{s.name}</h3>
                  <p>{s.summary}</p>
                </Link>
              </MotionItem>
            ))}
          </MotionStagger>
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

      <DarkProcess teaser />

      <section className="band band-ground">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">Markets we support</div>
            <h2>Built across the projects that shape communities</h2>
            <p className="prose">{MARKETS_CONTENT.lede}</p>
          </div>
          <MotionStagger className="grid-3">
            {FEATURED_PROJECTS.map((project) => (
              <MotionItem className="motion-fill" key={project.title}>
                <div className="project-card">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1000px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <span className="label">{project.title}</span>
                </div>
              </MotionItem>
            ))}
          </MotionStagger>
          <p className="prose">
            See how we support each market on{' '}
            <Link href="/who-we-serve#markets">Who We Serve</Link>.
          </p>
        </div>
      </section>

      <section className="band">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">What you receive</div>
            <h2>A deliverable your team can use immediately.</h2>
            <p className="prose">
              A line-item workbook you can open, edit, review, and hand to a project manager.
              Organized around the way your team makes decisions.
            </p>
          </div>
          <Workbook
            sample={TRADES[0].sample}
            tabs={['Summary', 'Div 03', 'Div 04', 'Div 05', 'Div 09', 'Exclusions']}
          />
          <div className="grid-2">
            <div className="stack">
              <h3>Every line traces back</h3>
              <p className="prose">
                Quantities reference the sheet they came from, so a number questioned in a bid review takes a minute to
                verify rather than an afternoon.
              </p>
            </div>
            <div className="stack">
              <h3>Fits the tools you already use</h3>
              <p className="prose">
                Takeoffs in Bluebeam Revu, Planswift and On-Screen Takeoff. Estimates arrive as editable Excel workbooks
                with formulas intact, ready for your review, not locked away.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="band band-ground">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">Trades</div>
            <h2>Estimating by division</h2>
            <p className="prose">
              Twelve CSI divisions, each with its own page covering exactly what we measure, in what units, and what we
              exclude by default.
            </p>
          </div>
          <MotionStagger className="trades">
            {TRADES.map((t) => (
              <TradeTile trade={t} key={t.slug} />
            ))}
          </MotionStagger>
        </div>
      </section>

      <section className="band">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">Why {BRAND.name}</div>
            <h2>{ABOUT_CONTENT.lede}</h2>
            <p className="prose">{ABOUT_CONTENT.paragraphs[0]}</p>
          </div>
          <div className="grid-3">
            {ABOUT_CONTENT.benefits.slice(0, 3).map(([code, title, text]) => (
              <div className="card" key={code} style={{ boxShadow: 'none' }}>
                <div className="code">{code}</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <p className="prose">
            See all five advantages on our <Link href="/about">About</Link> page, explore{' '}
            <Link href="/services/estimating">estimating by project type and trade</Link>, or review{' '}
            <Link href="/who-we-serve#markets">markets we serve</Link>.
          </p>
        </div>
      </section>

      <section className="band band-ground">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">Common questions</div>
            <h2>Before you send a set</h2>
          </div>
          <FAQ items={homeFaq} />
        </div>
      </section>

      <section className="tagline-band">
        <div className="wrap">
          <h2>Design. Build. Invest.</h2>
        </div>
      </section>

      <CTA
        title="Ready to move your project forward?"
        text={`Share your plans with ${BRAND.name}. We will help identify the right next step for your estimate or design package.`}
      />
    </>
  );
}
