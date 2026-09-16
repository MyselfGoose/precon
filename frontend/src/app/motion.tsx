'use client';

import { motion, type HTMLMotionProps, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

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
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
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
        hidden: reduced ? { opacity: 1 } : { opacity: 0, y: 18 },
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

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
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
