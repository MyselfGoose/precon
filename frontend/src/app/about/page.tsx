import { CTA, PageHead } from '../components';
import { createMetadata } from '@/lib/metadata';
import { ABOUT_CONTENT } from '@/lib/content';
import { MotionItem, MotionStagger } from '../motion';

export const metadata = createMetadata({
  title: 'About',
  description:
    'Learn how CSI & Design brings every essential preconstruction service under one roof — estimating, design coordination, and construction documentation.',
  path: '/about',
});

export default function About() {
  return (
    <>
      <PageHead eyebrow="About CSI & Design" title="One roof for the work before construction" lede={ABOUT_CONTENT.lede} />
      <section className="band">
        <div className="wrap stack-lg">
          <div className="grid-2">
            {ABOUT_CONTENT.paragraphs.slice(0, 2).map((p) => (
              <p className="prose" key={p.slice(0, 48)}>
                {p}
              </p>
            ))}
          </div>
          <div className="stack">
            <div className="eyebrow">Why contractors choose us</div>
            <h2>Built around accuracy, speed, and accountability</h2>
          </div>
          <MotionStagger className="grid-3">
            {ABOUT_CONTENT.benefits.map(([code, title, text]) => (
              <MotionItem className="card motion-fill" key={code}>
                <div className="code">{code}</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </MotionItem>
            ))}
          </MotionStagger>
          <div className="grid-2">
            <div className="stack">
              <h3>How we work</h3>
              <p className="prose">{ABOUT_CONTENT.paragraphs[2]}</p>
            </div>
            <div className="note">
              <b>Built around your project.</b> Whether you are bidding, planning a development, evaluating a property, or coordinating a technical package, we shape the support around the decisions in front of you.
            </div>
          </div>
        </div>
      </section>
      <CTA title="Bring the next project into focus" text="Share the information you have and we will help identify the right starting point." />
    </>
  );
}
