import Image from 'next/image';
import Link from 'next/link';
import { TRADES } from '@/lib/data';
import { ICO } from '@/lib/illustrations';
import { Button, CTA, DarkProcess, FAQ, Photo, TradeTile, Workbook } from './components';
import {
  ABOUT_CONTENT,
  BRAND,
  CONTENT_SERVICES,
  FEATURED_PROJECTS,
  HOME_DIVISIONS,
  HOME_PILLARS,
  HOME_STATS,
} from '@/lib/content';
import { createMetadata } from '@/lib/metadata';
import { MotionItem, MotionReveal, MotionStagger } from './motion';

export const metadata = createMetadata({
  title: 'Preconstruction Solutions for a Stronger Tomorrow',
  description:
    'From detailed estimates and architectural design to strategic property acquisition — CSI & Design provides the expertise, data, and relationships to move your project from vision to value.',
  path: '/',
});

const homeFaq: [string, string][] = [
  [
    'How do you make an estimate defensible?',
    'Every quantity is tied to a drawing, scale, or stated assumption. Exclusions and open questions are visible in the deliverable, so your team can explain the number instead of guessing when a bid is reviewed.',
  ],
  [
    'What do I need to send you?',
    'Start with the PDF plan set and specifications you have. Include the trades, project location, and important date. If the set is incomplete, say so — we will identify what needs to be confirmed.',
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

export default function Home() {
  return (
    <>
      <section className="hero">
        <MotionReveal className="wrap hero-grid" y={28}>
          <div className="stack">
            <div className="eyebrow">{BRAND.descriptor}</div>
            <p className="brand-hero-name">{BRAND.shortName}</p>
            <h1>
              Preconstruction Solutions for a Stronger <span className="accent-word">Tomorrow.</span>
            </h1>
            <p className="lede">
              From detailed estimates and architectural design to strategic property acquisition — we provide the
              expertise, data, and relationships to move your project from vision to value.
            </p>
            <div className="btn-row">
              <Button href="/quote">Request an Estimate →</Button>
              <Link className="btn btn-ghost" href="/services">
                Explore Our Services
              </Link>
            </div>
          </div>
          <MotionReveal className="hero-art media hero-photo" delay={0.12} y={18}>
            <Photo
              src="/images/hero/home-hero.jpg"
              alt="Modern American commercial architecture at sunset"
              fill
              priority
              sizes="(max-width: 1000px) 100vw, 55vw"
            />
          </MotionReveal>
        </MotionReveal>
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

      <section className="band band-dark on-dark">
        <div className="wrap stack-lg">
          <MotionReveal className="stack" y={18}>
            <div className="eyebrow">Our Divisions</div>
            <h2>Two Paths. One Strategic Advantage.</h2>
            <p className="prose">
              Estimation and design give you buildable clarity. Property acquisition turns the right assets into
              long-term value. Together, they create a single partner for decisions that matter.
            </p>
          </MotionReveal>
          <MotionStagger className="division-grid">
            {HOME_DIVISIONS.map((division, index) => (
              <MotionItem key={division.title}>
                <Link className={`division-card ${index === 0 ? 'cherry' : 'rose'}`} href={division.href}>
                  <Image
                    src={division.image}
                    alt={division.title}
                    fill
                    sizes="(max-width: 1000px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <span className="overlay" aria-hidden="true" />
                  <span className="body">
                    <h3>{division.title}</h3>
                    <p>{division.description}</p>
                    <span className="card-action" style={{ color: '#fff' }}>
                      {division.cta} →
                    </span>
                  </span>
                </Link>
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
            {HOME_STATS.map((stat) => (
              <div className="stat" key={stat.label}>
                <b>{stat.value}</b>
                <small>{stat.label}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">Services</div>
            <h2>What we bring together</h2>
            <p className="prose">
              From estimating and quantity takeoffs to drawings, engineering, visualization, and property acquisition —
              every essential preconstruction service under one roof.
            </p>
          </div>
          <MotionStagger className="grid-3">
            {CONTENT_SERVICES.map((s) => (
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

      <DarkProcess teaser />

      <section className="band band-ground">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">Markets we support</div>
            <h2>Built across the projects that shape communities</h2>
            <p className="prose">
              Industrial, residential and commercial, and public work — photographed American job sites that match the
              scopes we estimate and design for.
            </p>
          </div>
          <MotionStagger className="grid-3">
            {FEATURED_PROJECTS.map((project) => (
              <MotionItem className="motion-fill" key={project.title}>
                <div className="project-card">
                  <div className="media project-photo">
                    <Photo
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1000px) 100vw, 33vw"
                    />
                  </div>
                  <h3>{project.title}</h3>
                </div>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      </section>

      <section className="band">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">What you receive</div>
            <h2>A deliverable your team can use immediately.</h2>
            <p className="prose">
              Not a summary number. A line-item workbook you can open, edit, review, and hand to a project manager —
              organized around the way your team makes decisions.
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
                with formulas intact — ready for your review, not locked away.
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
            <Link href="/estimation">estimation by project type and trade</Link>, or review our{' '}
            <Link href="/markets">markets &amp; sectors</Link>.
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
        text={`Share your plans or property details with ${BRAND.name}. We will help identify the right next step — estimate, design package, or acquisition conversation.`}
      />
    </>
  );
}
