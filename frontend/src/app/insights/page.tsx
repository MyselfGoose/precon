import Link from 'next/link';
import { CTA, PageHead } from '../components';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Insights',
  description: 'Construction estimating, design coordination, and property acquisition insights from CSI & Design.',
  path: '/insights',
});

export default function InsightsPage() {
  return (
    <>
      <PageHead
        eyebrow="Insights"
        title="Perspectives on estimation, design, and acquisition"
        lede="Practical notes on preconstruction decisions, market conditions, and property opportunities — coming soon."
      />
      <section className="band">
        <div className="wrap stack-lg">
          <div className="card" style={{ maxWidth: '64ch' }}>
            <div className="code">COMING SOON</div>
            <h3>Insights library in progress</h3>
            <p>
              We are preparing articles on CSI MasterFormat estimating, coordinated design packages, and strategic
              property acquisition. In the meantime, explore our services or start a conversation.
            </p>
            <div className="btn-row" style={{ marginTop: 8 }}>
              <Link className="btn btn-primary" href="/services">
                Explore Services →
              </Link>
              <Link className="btn btn-ghost" href="/contact">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
      <CTA
        title="Have a question worth discussing?"
        text="Share your project or property details and we will help identify the useful next step."
      />
    </>
  );
}
