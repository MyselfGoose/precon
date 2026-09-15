'use client';
import { useState } from 'react';
import Link from 'next/link';
import { NAV_ITEMS } from '@/lib/data';
export default function MobileNav(){const [open,setOpen]=useState(false);return <><button className="nav-toggle" aria-expanded={open} aria-controls="mobile-links" onClick={()=>setOpen(!open)}>Menu</button>{open&&<nav id="mobile-links" className="mobile-links" aria-label="Mobile navigation">{NAV_ITEMS.map(([n,h])=><Link key={h} href={h} onClick={()=>setOpen(false)}>{n}</Link>)}<Link className="btn btn-primary btn-sm" href="/quote" onClick={()=>setOpen(false)}>Get a Quote</Link></nav>}</>}
