'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useId, useState } from 'react';

export type BimVisualFrame = {
  src: string;
  alt: string;
  label: string;
  /** Short guidance shown under the step title in walkthrough mode. */
  hint?: string;
};

type BimVisualShowcaseProps = {
  frames: BimVisualFrame[];
  mode?: 'stage' | 'collage' | 'walkthrough';
};

export function BimVisualShowcase({ frames, mode = 'stage' }: BimVisualShowcaseProps) {
  const reduced = useReducedMotion();
  const labelId = useId();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(!reduced && mode === 'walkthrough');

  const goTo = useCallback(
    (next: number) => {
      if (frames.length === 0) return;
      setIndex(((next % frames.length) + frames.length) % frames.length);
    },
    [frames.length],
  );

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    if (reduced || frames.length < 2 || mode === 'collage') return;
    if (mode === 'walkthrough' && !playing) return;
    const intervalMs = mode === 'walkthrough' ? 5600 : 3800;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % frames.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [frames.length, mode, playing, reduced]);

  useEffect(() => {
    if (mode !== 'walkthrough') return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goNext();
      } else if (event.key === ' ') {
        const target = event.target as HTMLElement | null;
        if (target && (target.tagName === 'BUTTON' || target.tagName === 'A' || target.isContentEditable)) return;
        event.preventDefault();
        setPlaying((value) => !value);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev, mode]);

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
  const stepLabel = `Step ${index + 1} of ${frames.length}`;

  if (isWalkthrough) {
    return (
      <div className="bim-walkthrough-shell">
        <div className="bim-walkthrough-guide" id={labelId}>
          <p className="bim-walkthrough-howto">
            <strong>How to use:</strong> Press <span>Play</span> to watch the sequence automatically, or use{' '}
            <span>Previous</span> / <span>Next</span> (or the step buttons) to move through each view yourself.
          </p>
        </div>

        <div
          className="bim-visual-stage media project-photo bim-walkthrough"
          role="region"
          aria-labelledby={labelId}
          aria-live="polite"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.src}
              className="bim-visual-slide"
              initial={reduced ? false : { opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 1.02 }}
              transition={{ duration: reduced ? 0 : 1.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="(max-width: 1000px) 100vw, 72vw"
                style={{ objectFit: 'cover' }}
                priority
              />
            </motion.div>
          </AnimatePresence>

          <div className="bim-walkthrough-chrome">
            <div className="bim-walkthrough-badge">BIM Walkthrough</div>
            <div className="bim-walkthrough-progress" aria-hidden="true">
              <span style={{ width: `${((index + 1) / frames.length) * 100}%` }} />
            </div>
          </div>

          <div className="bim-visual-caption bim-walkthrough-caption">
            <span className="code">{stepLabel}</span>
            <span>{active.label}</span>
          </div>
        </div>

        <div className="bim-walkthrough-controls">
          <div className="bim-walkthrough-actions">
            <button type="button" className="bim-ctrl" onClick={goPrev} aria-label="Previous walkthrough step">
              ← Previous
            </button>
            <button
              type="button"
              className="bim-ctrl bim-ctrl-primary"
              onClick={() => setPlaying((value) => !value)}
              aria-pressed={playing}
            >
              {playing ? 'Pause' : 'Play'}
            </button>
            <button type="button" className="bim-ctrl" onClick={goNext} aria-label="Next walkthrough step">
              Next →
            </button>
          </div>

          <ol className="bim-walkthrough-steps" aria-label="Walkthrough steps">
            {frames.map((frame, i) => (
              <li key={frame.src}>
                <button
                  type="button"
                  className={i === index ? 'is-active' : undefined}
                  aria-current={i === index ? 'step' : undefined}
                  onClick={() => {
                    setPlaying(false);
                    setIndex(i);
                  }}
                >
                  <span className="bim-step-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="bim-step-copy">
                    <strong>{frame.label}</strong>
                    {frame.hint ? <em>{frame.hint}</em> : null}
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <p className="bim-walkthrough-status">
            {playing
              ? `Autoplaying · ${stepLabel}: ${active.label}`
              : `Paused · ${stepLabel}: ${active.label}. Press Play or Next to continue.`}
          </p>
        </div>
      </div>
    );
  }

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
              aria-current={i === index ? 'true' : undefined}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
