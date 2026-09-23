'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

export type BimVisualFrame = {
  src: string;
  alt: string;
  label: string;
};

type BimVisualShowcaseProps = {
  frames: BimVisualFrame[];
  mode?: 'stage' | 'collage';
};

export function BimVisualShowcase({ frames, mode = 'stage' }: BimVisualShowcaseProps) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || frames.length < 2 || mode !== 'stage') return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % frames.length);
    }, 3800);
    return () => window.clearInterval(id);
  }, [frames.length, mode, reduced]);

  if (frames.length === 0) return null;

  if (mode === 'collage') {
    return (
      <div className="bim-collage">
        {frames.map((frame, i) => (
          <motion.figure
            key={frame.src}
            className="bim-collage-item media"
            initial={reduced ? false : { opacity: 0.72, y: 12 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src={frame.src} alt={frame.alt} fill sizes="(max-width: 1000px) 50vw, 24vw" style={{ objectFit: 'cover' }} />
            <figcaption>{frame.label}</figcaption>
          </motion.figure>
        ))}
      </div>
    );
  }

  const active = frames[index] ?? frames[0];

  return (
    <div className="bim-visual-stage media project-photo" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active.src}
          className="bim-visual-slide"
          initial={reduced ? false : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduced ? undefined : { opacity: 0, scale: 1.02 }}
          transition={{ duration: reduced ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={active.src}
            alt={active.alt}
            fill
            sizes="(max-width: 1000px) 100vw, 48vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        </motion.div>
      </AnimatePresence>
      <div className="bim-visual-caption">
        <span className="code">{String(index + 1).padStart(2, '0')}</span>
        <span>{active.label}</span>
      </div>
      {!reduced && (
        <div className="bim-visual-dots" role="tablist" aria-label="Visualization frames">
          {frames.map((frame, i) => (
            <button
              key={frame.src}
              type="button"
              className={i === index ? 'is-active' : undefined}
              aria-label={frame.label}
              aria-selected={i === index}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
