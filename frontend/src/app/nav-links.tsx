'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { NAV_ITEMS, NAV_TRADES_ITEMS } from '@/lib/data';
import {
  getServicesForCategory,
  NAV_ESTIMATING_TRADES,
  SERVICE_CATEGORIES,
  SITE_COPY,
} from '@/lib/content';

function pathMatches(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

type DropdownKind = 'services' | 'trades' | null;

export default function NavLinks() {
  const path = usePathname();
  const [openDropdown, setOpenDropdown] = useState<DropdownKind>(null);
  const servicesMenuId = useId();
  const tradesMenuId = useId();
  const servicesRootRef = useRef<HTMLDivElement>(null);
  const tradesRootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const servicesActive =
    pathMatches(path, '/services') ||
    path.startsWith('/estimation');
  const tradesActive = pathMatches(path, '/trades');

  function clearCloseTimer() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function openMenu(kind: DropdownKind) {
    clearCloseTimer();
    setOpenDropdown(kind);
  }

  function scheduleClose() {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 140);
  }

  function closeMenus() {
    clearCloseTimer();
    setOpenDropdown(null);
  }

  useEffect(() => {
    if (!openDropdown) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
      }
    };
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      const insideServices = servicesRootRef.current?.contains(target);
      const insideTrades = tradesRootRef.current?.contains(target);
      if (!insideServices && !insideTrades) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [openDropdown]);

  useEffect(() => () => clearCloseTimer(), []);

  const servicesOpen = openDropdown === 'services';
  const tradesOpen = openDropdown === 'trades';

  return (
    <nav className="nav-links" aria-label="Main navigation">
      <div className="nav-primary">
        <div
          ref={servicesRootRef}
          className={`nav-dropdown${servicesOpen ? ' is-open' : ''}`}
          onMouseEnter={() => openMenu('services')}
          onMouseLeave={scheduleClose}
        >
          <Link
            href="/services"
            className="nav-link nav-dropdown-trigger"
            aria-expanded={servicesOpen}
            aria-haspopup="true"
            aria-controls={servicesMenuId}
            aria-current={servicesActive ? 'page' : undefined}
            onFocus={() => openMenu('services')}
            onClick={closeMenus}
          >
            Services
            <span className="nav-caret" aria-hidden="true">
              ▾
            </span>
          </Link>
          <div
            id={servicesMenuId}
            className="nav-dropdown-panel"
            role="menu"
            aria-label="Services categories"
            hidden={!servicesOpen}
            onMouseEnter={() => openMenu('services')}
            onMouseLeave={scheduleClose}
          >
            <div className="nav-dropdown-primary">
              {SERVICE_CATEGORIES.filter((category) => !category.secondary).map((category) => {
                const services = getServicesForCategory(category);
                const estimatingLinks =
                  category.id === 'estimating'
                    ? NAV_ESTIMATING_TRADES
                    : null;
                return (
                  <div key={category.id} className="nav-dropdown-group" role="none">
                    <p className="nav-dropdown-heading">{category.label}</p>
                    <ul>
                      {estimatingLinks
                        ? estimatingLinks.map((link) => (
                            <li key={link.href + link.label} role="none">
                              <Link
                                role="menuitem"
                                href={link.href}
                                onClick={closeMenus}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))
                        : category.href && services.length <= 1 ? (
                            <li role="none">
                              <Link
                                role="menuitem"
                                href={category.href}
                                onClick={closeMenus}
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
                                  onClick={closeMenus}
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
                        onClick={closeMenus}
                      >
                        {label}
                      </Link>
                    </li>
                  </ul>
                </div>
              );
            })}
            <div className="nav-dropdown-footer">
              <Link href="/services" onClick={closeMenus}>
                View all services →
              </Link>
            </div>
          </div>
        </div>

        {NAV_ITEMS[0] ? (
          <Link
            href={NAV_ITEMS[0].href}
            className="nav-link"
            aria-current={pathMatches(path, NAV_ITEMS[0].href) ? 'page' : undefined}
          >
            {NAV_ITEMS[0].label}
          </Link>
        ) : null}

        <div
          ref={tradesRootRef}
          className={`nav-dropdown nav-dropdown-trades${tradesOpen ? ' is-open' : ''}`}
          onMouseEnter={() => openMenu('trades')}
          onMouseLeave={scheduleClose}
        >
          <Link
            href="/trades"
            className="nav-link nav-dropdown-trigger"
            aria-expanded={tradesOpen}
            aria-haspopup="true"
            aria-controls={tradesMenuId}
            aria-current={tradesActive ? 'page' : undefined}
            onFocus={() => openMenu('trades')}
            onClick={closeMenus}
          >
            Trades
            <span className="nav-caret" aria-hidden="true">
              ▾
            </span>
          </Link>
          <div
            id={tradesMenuId}
            className="nav-dropdown-panel nav-dropdown-panel-trades"
            role="menu"
            aria-label="CSI MasterFormat trades"
            hidden={!tradesOpen}
            onMouseEnter={() => openMenu('trades')}
            onMouseLeave={scheduleClose}
          >
            <p className="nav-dropdown-heading">CSI MasterFormat</p>
            <ul className="nav-trades-list">
              {NAV_TRADES_ITEMS.map((item) => (
                <li key={item.href} role="none">
                  <Link
                    role="menuitem"
                    className="nav-trade-link"
                    href={item.href}
                    onClick={closeMenus}
                    aria-current={pathMatches(path, item.href) ? 'page' : undefined}
                    aria-label={`Division ${item.div} ${item.label}`}
                  >
                    <span className="nav-trade-div" aria-hidden="true">
                      {item.div}
                    </span>
                    <span className="nav-trade-name">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="nav-dropdown-footer">
              <Link href="/trades" onClick={closeMenus}>
                View all trades →
              </Link>
            </div>
          </div>
        </div>

        {NAV_ITEMS.slice(1).map((item) => (
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
      <div className="nav-actions" aria-label="Primary action">
        <Link className="btn btn-primary btn-sm" href="/quote">
          {SITE_COPY.cta.primary}
        </Link>
      </div>
    </nav>
  );
}
