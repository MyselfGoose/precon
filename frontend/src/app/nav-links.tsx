'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/data';
import { BRAND, SITE_COPY } from '@/lib/content';

export default function NavLinks() {
  const path = usePathname();
  return (
    <nav className="nav-links" aria-label="Main navigation">
      <div className="nav-primary">
        {NAV_ITEMS.map(([name, href]) => (
          <Link
            key={href}
            href={href}
            className="nav-link"
            aria-current={path === href || path.startsWith(`${href}/`) ? 'page' : undefined}
          >
            {name}
          </Link>
        ))}
      </div>
      <div className="nav-actions" aria-label="Contact actions">
        <a className="nav-tel" href={`tel:${BRAND.phoneRaw}`}>
          {BRAND.phoneDisplay}
        </a>
        <Link className="btn btn-primary btn-sm" href="/quote">
          {SITE_COPY.cta.primary}
        </Link>
      </div>
    </nav>
  );
}
