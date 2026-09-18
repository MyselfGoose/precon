'use client';

import { motion, type HTMLMotionProps, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Prefer animate-when-in-view without leaving SSR/hydration content stuck at
 * opacity:0. Parent overflow:clip can break whileInView IntersectionObserver;
 * a short fallback forces visibility so local preview never looks "empty".
 */
function useRevealSafe(y: number) {
  const reduced = useReducedMotion();
  const [forcedVisible, setForcedVisible] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setForcedVisible(true), 900);
    return () => window.clearTimeout(id);
  }, []);

  if (reduced || forcedVisible) {
    return {
      initial: false as const,
      whileInView: undefined,
      animate: { opacity: 1, y: 0 },
    };
  }

  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    animate: undefined,
  };
}

export function MotionReveal({
  children,
  className,
  delay = 0,
  y = 22,
  ...props
}: HTMLMotionProps<'div'> & {
  delay?: number;
  y?: number;
}) {
  const reveal = useRevealSafe(y);

  return (
    <motion.div
      className={className}
      initial={reveal.initial}
      whileInView={reveal.whileInView}
      animate={reveal.animate}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.65, delay, ease }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionItem({
  children,
  className,
  ...props
}: HTMLMotionProps<'div'>) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.55, ease }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionStagger({
  children,
  className,
  ...props
}: HTMLMotionProps<'div'> & { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [forcedShow, setForcedShow] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setForcedShow(true), 900);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      animate={forcedShow || reduced ? 'show' : undefined}
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduced ? 0 : 0.08 } },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionButton({
  children,
  className,
  ...props
}: HTMLMotionProps<'div'>) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function CountUp({
  value,
  suffix = '',
  className,
  label,
}: {
  value: number;
  suffix?: string;
  className?: string;
  label?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduced = useReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView || reduced) {
      return;
    }

    let frame = 0;
    const started = performance.now();
    const duration = 1100;
    const tick = (now: number) => {
      const progress = Math.min((now - started) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className={className} aria-label={label ?? `${value}${suffix}`}>
      {reduced ? value : current}
      {suffix}
    </span>
  );
}
