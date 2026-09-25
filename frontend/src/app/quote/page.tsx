import { PageHead, PhoneLink, WhatsAppLink } from '../components';
import QuoteForm from './quote-form';
import { BRAND } from '@/lib/content';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Send Your Plans',
  description:
    'Share the project type, location, scope, timing, and files needed for a focused CSI & Design conversation.',
  path: '/quote',
});

export default function Quote() {
  return (
    <>
      <PageHead
        eyebrow="Project Brief"
        title={
          <>
            Send a project <span className="accent-word">brief.</span>
          </>
        }
        lede="Tell us what decision this needs to support — we’ll organize the next conversation."
        image="/images/hero/quote.jpg"
        imageAlt="Project plans ready for a quote request"
        priority
      />
      <section className="band band-ground">
        <div className="wrap brief-layout">
          <div className="brief-main">
            <QuoteForm />
          </div>
          <aside className="brief-help" aria-label="Other ways to reach us">
            <div className="brief-help-card">
              <div className="eyebrow">What happens next</div>
              <p>
                Scope first. Commitment second. We use your brief to organize the conversation — formal work starts only
                with a written agreement.
              </p>
            </div>
            <div className="brief-help-card">
              <div className="eyebrow">Prefer to talk?</div>
              <div className="brief-help-actions">
                <PhoneLink className="btn btn-ghost btn-sm">Call {BRAND.phoneDisplay}</PhoneLink>
                <WhatsAppLink className="btn btn-ghost btn-sm">WhatsApp →</WhatsAppLink>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
