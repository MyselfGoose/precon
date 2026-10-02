'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { NAV_ITEMS } from '@/lib/data';
import {
  BRAND,
  getServicesForCategory,
  SERVICE_CATEGORIES,
  SITE_COPY,
} from '@/lib/content';

const STORAGE_KEY = 'csi-mobile-menu-position';
const DEFAULT_CORNER = 'bottom-right' as const;
const EDGE_INSET = 18;
const DRAG_THRESHOLD = 6;
const WHATSAPP_ICON = (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 6.045L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);
type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
type Position = { left: number; top: number };

function readCorner(): Corner {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'top-left' || saved === 'top-right' || saved === 'bottom-left' || saved === 'bottom-right') {
      return saved;
    }
    const parsed = saved ? JSON.parse(saved) : null;
    if (parsed?.corner && ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(parsed.corner)) {
      return parsed.corner;
    }
    return DEFAULT_CORNER;
  } catch {
    return DEFAULT_CORNER;
  }
}

function nearestCorner(x: number, y: number): Corner {
  const horizontal = x < window.innerWidth / 2 ? 'left' : 'right';
  const vertical = y < window.innerHeight / 2 ? 'top' : 'bottom';
  return `${vertical}-${horizontal}` as Corner;
}

function cornerPosition(corner: Corner, width: number, height: number): Position {
  const maxLeft = Math.max(EDGE_INSET, window.innerWidth - width - EDGE_INSET);
  const maxTop = Math.max(EDGE_INSET, window.innerHeight - height - EDGE_INSET);
  return {
    left: corner.endsWith('left') ? EDGE_INSET : maxLeft,
    top: corner.startsWith('top') ? EDGE_INSET : maxTop,
  };
}

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [corner, setCorner] = useState<Corner>(DEFAULT_CORNER);
  const [position, setPosition] = useState<Position | null>(null);
  const [dragging, setDragging] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ pointerId: -1, startX: 0, startY: 0, origin: { left: 0, top: 0 }, moved: false, active: false });
  const suppressClickRef = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const savedCorner = readCorner();
      const shell = shellRef.current;
      if (shell) {
        setPosition(cornerPosition(savedCorner, shell.offsetWidth, shell.offsetHeight));
      }
      setCorner(savedCorner);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const reposition = () => {
      const shell = shellRef.current;
      if (!shell) return;
      const next = cornerPosition(corner, shell.offsetWidth, shell.offsetHeight);
      setPosition(next);
    };
    window.addEventListener('resize', reposition);
    window.visualViewport?.addEventListener('resize', reposition);
    return () => {
      window.removeEventListener('resize', reposition);
      window.visualViewport?.removeEventListener('resize', reposition);
    };
  }, [corner]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
      if (event.key === 'Tab') {
        const focusable = Array.from(
          document.querySelectorAll<HTMLElement>('#mobile-links a, #mobile-links button'),
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.classList.add('menu-open');
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('menu-open');
    };
  }, [open]);

  useEffect(() => {
    document.body.classList.toggle('menu-dragging', dragging);
    return () => document.body.classList.remove('menu-dragging');
  }, [dragging]);

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag.active || drag.pointerId !== event.pointerId) return;
      const deltaX = event.clientX - drag.startX;
      const deltaY = event.clientY - drag.startY;
      if (!drag.moved && Math.hypot(deltaX, deltaY) < DRAG_THRESHOLD) return;
      drag.moved = true;
      setDragging(true);
      event.preventDefault();
      const shell = shellRef.current;
      if (!shell) return;
      const maxLeft = Math.max(EDGE_INSET, window.innerWidth - shell.offsetWidth - EDGE_INSET);
      const maxTop = Math.max(EDGE_INSET, window.innerHeight - shell.offsetHeight - EDGE_INSET);
      setPosition({
        left: Math.min(maxLeft, Math.max(EDGE_INSET, drag.origin.left + deltaX)),
        top: Math.min(maxTop, Math.max(EDGE_INSET, drag.origin.top + deltaY)),
      });
    };
    const handleEnd = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag.active || drag.pointerId !== event.pointerId) return;
      if (drag.moved) {
        suppressClickRef.current = true;
        saveCorner(nearestCorner(event.clientX, event.clientY));
      }
      drag.active = false;
      drag.pointerId = -1;
      setDragging(false);
    };
    window.addEventListener('pointermove', handleMove, { passive: false });
    window.addEventListener('pointerup', handleEnd);
    window.addEventListener('pointercancel', handleEnd);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleEnd);
      window.removeEventListener('pointercancel', handleEnd);
    };
  }, []);

  function closeMenu() {
    setOpen(false);
    setServicesExpanded(false);
    requestAnimationFrame(() => toggleRef.current?.focus());
  }

  function saveCorner(nextCorner: Corner) {
    setCorner(nextCorner);
    const shell = shellRef.current;
    if (shell) setPosition(cornerPosition(nextCorner, shell.offsetWidth, shell.offsetHeight));
    try {
      window.localStorage.setItem(STORAGE_KEY, nextCorner);
    } catch {
      // Storage is optional; the control remains usable for this visit.
    }
  }

  function handlePointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    const shell = shellRef.current;
    const fallbackWidth = shell?.offsetWidth ?? 220;
    const fallbackHeight = shell?.offsetHeight ?? 58;
    const origin = position ?? cornerPosition(corner, fallbackWidth, fallbackHeight);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origin,
      moved: false,
      active: true,
    };
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.button
            className="floating-nav-backdrop"
            aria-label="Close navigation"
            onClick={closeMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
      <motion.div
        ref={shellRef}
        className={`floating-nav-shell floating-nav-${corner}`}
        style={position ? { left: position.left, top: position.top, right: 'auto', bottom: 'auto' } : undefined}
        animate={position ? { left: position.left, top: position.top } : undefined}
        transition={dragging || reduced ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 32 }}
      >
        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-links"
              className={`floating-nav-panel ${corner.startsWith('top-') ? 'panel-below' : 'panel-above'}`}
              aria-label="Mobile navigation"
              role="dialog"
              aria-modal="true"
              initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: 20 }}
              transition={{ duration: reduced ? 0.1 : 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              <button ref={closeRef} className="floating-nav-close" type="button" onClick={closeMenu}>
                Close menu
              </button>
              <motion.div
                initial={reduced ? false : { opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: reduced ? 0 : 0.06 }}
                className="mobile-nav-services"
              >
                <div className="mobile-nav-services-row">
                  <Link href="/services" onClick={closeMenu}>
                    Services
                  </Link>
                  <button
                    type="button"
                    className="mobile-nav-services-toggle"
                    aria-expanded={servicesExpanded}
                    aria-controls="mobile-services-groups"
                    onClick={() => setServicesExpanded((value) => !value)}
                  >
                    {servicesExpanded ? 'Hide' : 'Show'} categories
                  </button>
                </div>
                {servicesExpanded && (
                  <div id="mobile-services-groups" className="mobile-nav-service-groups">
                    {SERVICE_CATEGORIES.map((category) => {
                      const services = getServicesForCategory(category);
                      return (
                        <div key={category.id} className="mobile-nav-service-group">
                          <p className="mobile-nav-service-heading">{category.label}</p>
                          {category.href && services.length <= 1 ? (
                            <Link href={category.href} onClick={closeMenu}>
                              {services[0]?.name ?? category.label}
                            </Link>
                          ) : (
                            services.map((service) => (
                              <Link
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                onClick={closeMenu}
                              >
                                {service.name}
                              </Link>
                            ))
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={reduced ? false : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduced ? 0 : 0.1 + index * 0.045 }}
                >
                  <Link href={item.href} onClick={closeMenu}>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <a className="nav-tel" href={`tel:${BRAND.phoneRaw}`} onClick={() => setOpen(false)}>
                Call {BRAND.phoneDisplay}
              </a>
              <a
                className="nav-wa"
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                WhatsApp us
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
        <a
          className="floating-nav-wa"
          href={`https://wa.me/${BRAND.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat on WhatsApp at ${BRAND.phoneDisplay}`}
          onClick={() => setOpen(false)}
        >
          {WHATSAPP_ICON}
        </a>
        <Link
          className="floating-nav-quote"
          href="/quote"
          onClick={() => setOpen(false)}
          aria-label={SITE_COPY.cta.primary}
        >
          {SITE_COPY.cta.primary}
        </Link>
      <motion.button
        ref={toggleRef}
        className="floating-nav-toggle"
        aria-expanded={open}
        aria-controls="mobile-links"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        onPointerDown={handlePointerDown}
        onClick={() => {
          if (suppressClickRef.current) {
            suppressClickRef.current = false;
            return;
          }
          setOpen((value) => !value);
        }}
        whileTap={reduced ? undefined : { scale: 0.9 }}
      >
        <motion.span animate={reduced ? undefined : { rotate: open ? 45 : 0, y: open ? 6 : 0 }} />
        <motion.span animate={reduced ? undefined : { opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }} />
        <motion.span animate={reduced ? undefined : { rotate: open ? -45 : 0, y: open ? -6 : 0 }} />
      </motion.button>
      </motion.div>
    </>
  );
}
