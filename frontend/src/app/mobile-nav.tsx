'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { NAV_ITEMS } from '@/lib/data';
import { SITE_COPY } from '@/lib/content';

const STORAGE_KEY = 'precon-mobile-menu-position';
const DEFAULT_CORNER = 'bottom-right' as const;
type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

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

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [corner, setCorner] = useState<Corner>(DEFAULT_CORNER);
  const closeRef = useRef<HTMLButtonElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const frame = requestAnimationFrame(() => setCorner(readCorner()));
    return () => cancelAnimationFrame(frame);
  }, []);

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

  function closeMenu() {
    setOpen(false);
    requestAnimationFrame(() => toggleRef.current?.focus());
  }

  function savePosition(_: unknown, info: { point: { x: number; y: number } }) {
    const nextCorner = nearestCorner(info.point.x, info.point.y);
    setCorner(nextCorner);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextCorner);
    } catch {
      // Storage is optional; the control remains usable for this visit.
    }
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
        className={`floating-nav-shell floating-nav-${corner}`}
        drag
        dragMomentum={false}
        dragElastic={0}
        onDragEnd={savePosition}
        transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 32 }}
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
              {NAV_ITEMS.map(([name, href], index) => (
                <motion.div
                  key={href}
                  initial={reduced ? false : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduced ? 0 : 0.06 + index * 0.045 }}
                >
                  <Link href={href} onClick={() => setOpen(false)}>{name}</Link>
                </motion.div>
              ))}
              <Link className="btn btn-primary btn-sm" href="/quote" onClick={() => setOpen(false)}>
                {SITE_COPY.cta.primary}
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>
      <motion.button
        ref={toggleRef}
        className="floating-nav-toggle"
        aria-expanded={open}
        aria-controls="mobile-links"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        onClick={() => setOpen((value) => !value)}
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
