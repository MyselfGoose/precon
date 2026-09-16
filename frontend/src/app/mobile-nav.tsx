'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { NAV_ITEMS } from '@/lib/data';
import { SITE_COPY } from '@/lib/content';

const STORAGE_KEY = 'precon-mobile-menu-position';
const DEFAULT_POSITION = { x: 0, y: 0 };

function readPosition() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_POSITION;
    const parsed = JSON.parse(saved);
    if (typeof parsed.x !== 'number' || typeof parsed.y !== 'number') return DEFAULT_POSITION;
    return parsed;
  } catch {
    return DEFAULT_POSITION;
  }
}

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(DEFAULT_POSITION);
  const closeRef = useRef<HTMLButtonElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const frame = requestAnimationFrame(() => setPosition(readPosition()));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.classList.add('menu-open');
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('menu-open');
    };
  }, [open]);

  function savePosition(_: unknown, info: { offset: { x: number; y: number } }) {
    const next = { x: position.x + info.offset.x, y: position.y + info.offset.y };
    const bounded = {
      x: Math.max(-window.innerWidth + 86, Math.min(18, next.x)),
      y: Math.max(-window.innerHeight + 170, Math.min(84, next.y)),
    };
    setPosition(bounded);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bounded));
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
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
      <motion.div
        className="floating-nav-shell"
        drag
        dragMomentum={false}
        dragElastic={0.08}
        onDragEnd={savePosition}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
      >
        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-links"
              className="floating-nav-panel"
              aria-label="Mobile navigation"
              initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.7, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: 20 }}
              transition={{ duration: reduced ? 0.1 : 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              <button ref={closeRef} className="floating-nav-close" type="button" onClick={() => setOpen(false)}>
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
        whileTap={{ scale: 0.9 }}
      >
        <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }} />
        <motion.span animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }} />
        <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }} />
      </motion.button>
      </motion.div>
    </>
  );
}
