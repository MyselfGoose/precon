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
  mode?: 'stage' | 'collage' | 'walkthrough';
};

export function BimVisualShowcase({ frames, mode = 'stage' }: BimVisualShowcaseProps) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || frames.length < 2 || mode === 'collage' || paused) return;
    const intervalMs = mode === 'walkthrough' ? 5200 : 3800;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % frames.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [frames.length, mode, paused, reduced]);

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
  const isWalkthrough = mode === 'walkthrough';

  return (
    <div
      className={`bim-visual-stage media project-photo${isWalkthrough ? ' bim-walkthrough' : ''}`}
      aria-live="polite"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active.src}
          className="bim-visual-slide"
          initial={reduced ? false : { opacity: 0, scale: isWalkthrough ? 1.08 : 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduced ? undefined : { opacity: 0, scale: isWalkthrough ? 1.02 : 1.02 }}
          transition={{ duration: reduced ? 0 : isWalkthrough ? 1.15 : 0.85, ease: [0.22, 1, 0.36, 1] }}
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

      {isWalkthrough && (
        <div className="bim-walkthrough-chrome">
          <div className="bim-walkthrough-badge">BIM Walkthrough</div>
          <div className="bim-walkthrough-progress" aria-hidden="true">
            <span style={{ width: `${((index + 1) / frames.length) * 100}%` }} />
          </div>
        </div>
      )}

      <div className="bim-visual-caption">
        <span className="code">{String(index + 1).padStart(2, '0')}</span>
        <span>
          {isWalkthrough ? `Walkthrough · ${active.label}` : active.label}
        </span>
      </div>
      {!reduced && (
        <div className="bim-visual-dots" role="tablist" aria-label={isWalkthrough ? 'Walkthrough frames' : 'Visualization frames'}>
          {frames.map((frame, i) => (
            <button
              key={frame.src}
              type="button"
              className={i === index ? 'is-active' : undefined}
              aria-label={frame.label}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
