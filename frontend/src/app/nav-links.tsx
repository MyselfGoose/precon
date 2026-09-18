'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/data';
import { BRAND, SITE_COPY } from '@/lib/content';

export default function NavLinks() {
  const path = usePathname();
  return (
    <nav className="nav-links" aria-label="Main navigation">
      {NAV_ITEMS.map(([name, href]) => (
        <Link key={href} href={href} aria-current={path === href || path.startsWith(`${href}/`) ? 'page' : undefined}>
          {name}
        </Link>
      ))}
      <a className="nav-tel" href={`tel:${BRAND.phoneRaw}`}>
        {BRAND.phoneDisplay}
      </a>
      <Link className="btn btn-primary btn-sm" href="/quote">
        {SITE_COPY.cta.primary} →
      </Link>
    </nav>
  );
}
