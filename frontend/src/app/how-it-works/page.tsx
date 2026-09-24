import Link from 'next/link';
import { TRADES } from '@/lib/data';
import { Button, CTA, DarkProcess, PageHead, Spec, Workbook } from '../components';
import { SITE_COPY } from '@/lib/content';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'How It Works',
  description:
    'See how CSI & Design turns project information into organized, decision-ready deliverables.',
  path: '/how-it-works',
});

export default function HowItWorks() {
  return (
    <>
      <PageHead
        eyebrow={SITE_COPY.process.eyebrow}
        title={
          <>
            From working set to review-ready <span className="accent-word">package.</span>
          </>
        }
        lede="We start with what you have, define the decision the work needs to support, and produce organized technical or estimating deliverables with a visible basis."
        image="/images/services/architectural-plans.jpg"
        imageAlt="Architectural plans representing the path from working set to deliverable"
        priority
      />
      <DarkProcess />
      <section className="band">
        <div className="wrap stack-lg">
          <div className="grid-2">
            <Spec
              title="What to share"
              unit="INPUTS"
              items={[
                'Drawings, specifications, or property information',
                'Project location and relevant jurisdiction',
                'Scope, disciplines, or decisions you need supported',
                'Known deadlines, addenda, and constraints',
                'Budget, labor rates, or assumptions where available',
                'Questions or risks you want the team to examine',
              ]}
            />
            <Spec
              title="What you receive"
              unit="OUTPUTS"
              items={[
                'Organized estimate or quantity workbook',
                'Coordinated drawing or engineering documentation',
                'Assumptions, exclusions, and clarifications',
                'Trade-specific scope and decision support',
                'Review-ready visuals or model information',
                'A clear record for questions and revisions',
              ]}
            />
          </div>
          <div className="stack">
            <div className="eyebrow">The deliverable</div>
            <h3>Built for review, handoff, and the next question.</h3>
            <p className="prose">
              A useful package explains what was measured, what was assumed, what is excluded, and where the team
              should focus next.
            </p>
            <Workbook
              sample={TRADES[0].sample}
              tabs={['Summary', 'Div 03', 'Div 04', 'Div 05', 'Exclusions', 'Assumptions']}
            />
          </div>
        </div>
      </section>
      <section className="band band-ground">
        <div className="wrap stack-lg">
          <div className="stack">
            <div className="eyebrow">Choose your path</div>
            <h2>Estimation &amp; design, or property acquisition</h2>
            <p className="prose">
              The same disciplined intake supports bid packages and technical documentation, or property opportunities
              you want evaluated for acquisition.
            </p>
          </div>
          <div className="grid-2">
            <div className="card" style={{ boxShadow: 'none' }}>
              <div className="code">PATH 01</div>
              <h3>Estimation &amp; Design</h3>
              <p>
                Trade takeoffs, full-building estimates, architectural and MEP documentation, organized for bidding
                and construction decisions.
              </p>
              <div className="btn-row" style={{ marginTop: 16 }}>
                <Button href="/estimation">Explore estimation →</Button>
                <Link className="btn btn-ghost" href="/services">
                  View services
                </Link>
              </div>
            </div>
            <div className="card" style={{ boxShadow: 'none' }}>
              <div className="code">PATH 02</div>
              <h3>Property Acquisition</h3>
              <p>
                Share a property opportunity for evaluation. We identify renovation and design upside and a clear next
                step.
              </p>
              <div className="btn-row" style={{ marginTop: 16 }}>
                <Button href="/services/acquisitions-investments">Discuss a property →</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CTA
        title="Ready to share the project?"
        text="Send the information you have and we will define the useful scope and next step."
      />
    </>
  );
}
