import Link from 'next/link';
import { PageHead } from './components';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Page Not Found',
  description: 'The requested CSI & Design page could not be found.',
  path: '/',
});

export default function NotFound() {
  return (
    <>
      <PageHead eyebrow="404" title="Page not found" lede="That link doesn’t match anything on the site." />
      <section className="band">
        <div className="wrap">
          <div className="btn-row">
            <Link className="btn btn-primary" href="/">
              Back to home
            </Link>
            <Link className="btn btn-ghost" href="/services">
              Services
            </Link>
            <Link className="btn btn-ghost" href="/estimation">
              Estimation
            </Link>
            <Link className="btn btn-ghost" href="/contact">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
