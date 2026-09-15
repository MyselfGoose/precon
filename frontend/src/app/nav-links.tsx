'use client';
import Link from 'next/link'; import { usePathname } from 'next/navigation'; import { NAV_ITEMS } from '@/lib/data';
export default function NavLinks(){const path=usePathname(); return <nav className="nav-links" aria-label="Main navigation">{NAV_ITEMS.map(([name,href])=><Link key={href} href={href} aria-current={path===href||path.startsWith(`${href}/`)?'page':undefined}>{name}</Link>)}<a className="nav-tel" href="tel:+18005550100">(800) 555-0100</a><Link className="btn btn-primary btn-sm" href="/quote">Get a Quote</Link></nav>}
