import { CTA, PageHead, PhoneLink, WhatsAppLink, Svg } from '../components';
import QuoteForm from './quote-form';
import { D } from '@/lib/illustrations';
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
        eyebrow="Request a Quote"
        title="Give the next decision a useful project brief"
        lede="Share what you are trying to estimate, design, coordinate, or decide, along with the project stage, location, timing, and information you already have."
        image="/images/hero/quote.jpg"
        imageAlt="Project plans ready for a quote request"
        priority
      />
      <section className="band">
        <div className="wrap">
          <div className="grid-2" style={{ gap: 44, alignItems: 'start' }}>
            <QuoteForm />
            <div className="stack-lg">
              <div className="stack">
                <div className="eyebrow">What happens next</div>
                <h3>Scope first. Commitment second.</h3>
                <p className="prose">
                  The brief helps organize the project conversation: what is known, what is missing, which service fits,
                  and what deadline matters. Formal services begin only through a separate written agreement.
                </p>
              </div>
              <div className="stack">
                <div className="eyebrow">Prefer to talk?</div>
                <PhoneLink className="btn btn-ghost" style={{ alignSelf: 'flex-start' }}>
                  Call {BRAND.phoneDisplay}
                </PhoneLink>
                <WhatsAppLink className="btn btn-ghost" style={{ alignSelf: 'flex-start' }}>
                  WhatsApp {BRAND.phoneDisplay} →
                </WhatsAppLink>
                <p className="prose">
                  If the scope is easier to explain out loud, call or message us and tell us what decision the project
                  needs to support.
                </p>
              </div>
              <div className="note">
                <b>Have a complex scope?</b> Include drawings, specifications, property information, or a plan-room
                link in the request.
              </div>
              <div className="draw">
                <Svg markup={D.concrete()} />
                <div className="draw-cap">
                  <b>What we do with it</b>
                  <span>Organized scope, assumptions, and next steps</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CTA
        title="Need help before you fill this out?"
        text="Talk through the scope first, then send the information that will make the follow-up useful."
      />
    </>
  );
}
