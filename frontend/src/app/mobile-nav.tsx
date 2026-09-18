'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { NAV_ITEMS } from '@/lib/data';
import { BRAND, SITE_COPY } from '@/lib/content';

const STORAGE_KEY = 'csi-mobile-menu-position';
const DEFAULT_CORNER = 'bottom-right' as const;
const EDGE_INSET = 18;
const DRAG_THRESHOLD = 6;
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
    const origin = position ?? cornerPosition(corner, 58, 58);
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
                {SITE_COPY.cta.primary} →
              </Link>
              <a className="nav-tel" href={`tel:${BRAND.phoneRaw}`} onClick={() => setOpen(false)} style={{ padding: '12px 14px' }}>
                Call {BRAND.phoneDisplay}
              </a>
              <a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                style={{ padding: '12px 14px', color: 'var(--cherry)', fontWeight: 600 }}
              >
                WhatsApp us
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
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
