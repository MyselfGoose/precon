'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { NAV_ITEMS } from '@/lib/data';
import {
  BRAND,
  getServicesForCategory,
  SERVICE_CATEGORIES,
  SITE_COPY,
} from '@/lib/content';

function pathMatches(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function NavLinks() {
  const path = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const servicesActive =
    pathMatches(path, '/services') ||
    path.startsWith('/estimation');

  function clearCloseTimer() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function openServices() {
    clearCloseTimer();
    setServicesOpen(true);
  }

  function scheduleClose() {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setServicesOpen(false), 140);
  }

  useEffect(() => {
    if (!servicesOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setServicesOpen(false);
      }
    };
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [servicesOpen]);

  useEffect(() => () => clearCloseTimer(), []);

  return (
    <nav className="nav-links" aria-label="Main navigation">
      <div className="nav-primary">
        <div
          ref={rootRef}
          className={`nav-dropdown${servicesOpen ? ' is-open' : ''}`}
          onMouseEnter={openServices}
          onMouseLeave={scheduleClose}
        >
          <Link
            href="/services"
            className="nav-link nav-dropdown-trigger"
            aria-expanded={servicesOpen}
            aria-haspopup="true"
            aria-controls={menuId}
            aria-current={servicesActive ? 'page' : undefined}
            onFocus={openServices}
            onClick={() => setServicesOpen(false)}
          >
            Services
            <span className="nav-caret" aria-hidden="true">
              ▾
            </span>
          </Link>
          <div
            id={menuId}
            className="nav-dropdown-panel"
            role="menu"
            aria-label="Services categories"
            hidden={!servicesOpen}
            onMouseEnter={openServices}
            onMouseLeave={scheduleClose}
          >
            <div className="nav-dropdown-primary">
              {SERVICE_CATEGORIES.filter((category) => !category.secondary).map((category) => {
                const services = getServicesForCategory(category);
                return (
                  <div key={category.id} className="nav-dropdown-group" role="none">
                    <p className="nav-dropdown-heading">{category.label}</p>
                    <ul>
                      {category.href && services.length <= 1 ? (
                        <li role="none">
                          <Link
                            role="menuitem"
                            href={category.href}
                            onClick={() => setServicesOpen(false)}
                          >
                            {services[0]?.name ?? category.label}
                          </Link>
                        </li>
                      ) : (
                        services.map((service) => (
                          <li key={service.slug} role="none">
                            <Link
                              role="menuitem"
                              href={`/services/${service.slug}`}
                              onClick={() => setServicesOpen(false)}
                            >
                              {service.name}
                            </Link>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                );
              })}
            </div>
            {SERVICE_CATEGORIES.filter((category) => category.secondary).map((category) => {
              const services = getServicesForCategory(category);
              const href = category.href ?? `/services/${services[0]?.slug ?? ''}`;
              const label = services[0]?.name ?? category.label;
              return (
                <div key={category.id} className="nav-dropdown-group is-secondary" role="none">
                  <p className="nav-dropdown-heading">{category.label}</p>
                  <ul>
                    <li role="none">
                      <Link
                        role="menuitem"
                        href={href}
                        onClick={() => setServicesOpen(false)}
                      >
                        {label}
                      </Link>
                    </li>
                  </ul>
                </div>
              );
            })}
            <div className="nav-dropdown-footer">
              <Link href="/services" onClick={() => setServicesOpen(false)}>
                View all services →
              </Link>
            </div>
          </div>
        </div>

        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="nav-link"
            aria-current={pathMatches(path, item.href) ? 'page' : undefined}
          >
            {item.label}
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
