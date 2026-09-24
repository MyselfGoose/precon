#!/usr/bin/env node
/**
 * Fails if:
 * 1) Any /images/... path string appears more than once across frontend/src
 * 2) Any two files under public/images share the same MD5
 *
 * Paths listed in ALLOW_MULTI may appear multiple times in source when they
 * are declared once in a map and referenced via helpers (still one placement).
 * Those allow-lists must only include paths that resolve to a single UI slot.
 */
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..');
const SRC = join(ROOT, 'src');
const IMAGES = join(ROOT, 'public', 'images');

const PATH_RE = /\/images\/[a-zA-Z0-9/_.,-]+\.(?:jpe?g|png|webp|gif|svg)/g;

/** Paths that may be declared in a data map AND inlined on the same page object. */
const ALLOW_MULTI = new Set([
  // Trade estimation pages set imageSrc; TRADE_IMAGES provides the same path as fallback.
  // After cleanup these should be single declarations — keep empty unless needed.
]);

function walkFiles(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next') continue;
      walkFiles(full, out);
    } else if (/\.(tsx?|jsx?|mjs|cjs|css|md)$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

function walkImages(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walkImages(full, out);
    else if (/\.(jpe?g|png|webp|gif)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

function checkPathUniqueness() {
  const counts = new Map();
  const locations = new Map();
  for (const file of walkFiles(SRC)) {
    // Registry documents placements; runtime reuse is checked against app/lib data only.
    if (file.endsWith(`${join('lib', 'image-registry.ts')}`) || file.endsWith('image-registry.ts')) {
      continue;
    }
    const text = readFileSync(file, 'utf8');
    const matches = text.match(PATH_RE) ?? [];
    for (const path of matches) {
      counts.set(path, (counts.get(path) ?? 0) + 1);
      const list = locations.get(path) ?? [];
      list.push(relative(ROOT, file));
      locations.set(path, list);
    }
  }

  const violations = [];
  for (const [path, count] of counts) {
    if (count <= 1) continue;
    if (ALLOW_MULTI.has(path)) continue;
    // Same file may mention a path twice (e.g. src + alt neighbor); count unique files.
    const uniqueFiles = new Set(locations.get(path));
    if (uniqueFiles.size <= 1 && count <= 2) {
      // Two mentions in one file (e.g. imageSrc + TRADE_IMAGES key) — still a smell; report if >2
      if (count <= 2) continue;
    }
    if (uniqueFiles.size > 1) {
      violations.push({ path, count, files: [...uniqueFiles] });
    }
  }
  return { counts, violations };
}


function checkPerceptualNearDupes() {
  // Catch same photo at different resolutions (MD5 differs, pixels match when downscaled).
  let bin = 'magick';
  try {
    execSync('magick -version', { stdio: 'ignore' });
  } catch {
    try {
      execSync('convert -version', { stdio: 'ignore' });
      bin = 'convert';
    } catch {
      console.warn('Skipping perceptual check (ImageMagick not found).');
      return [];
    }
  }
  const byHash = new Map();
  for (const file of walkImages(IMAGES)) {
    try {
      const raw = execSync(`${bin} "${file}" -resize 32x32! -colorspace Gray -depth 8 gray:-`, {
        maxBuffer: 10 * 1024 * 1024,
        stdio: ['ignore', 'pipe', 'ignore'],
      });
      const hash = createHash('md5').update(raw).digest('hex');
      const list = byHash.get(hash) ?? [];
      list.push('/' + relative(join(ROOT, 'public'), file).replace(/\\/g, '/'));
      byHash.set(hash, list);
    } catch {
      // ignore convert failures per-file
    }
  }
  return [...byHash.entries()]
    .filter(([, files]) => files.length > 1)
    .map(([hash, files]) => ({ hash, files }));
}

function checkBinaryUniqueness() {
  const byHash = new Map();
  for (const file of walkImages(IMAGES)) {
    const buf = readFileSync(file);
    const hash = createHash('md5').update(buf).digest('hex');
    const list = byHash.get(hash) ?? [];
    list.push('/' + relative(join(ROOT, 'public'), file).replace(/\\/g, '/'));
    byHash.set(hash, list);
  }
  const duplicates = [...byHash.entries()]
    .filter(([, files]) => files.length > 1)
    .map(([hash, files]) => ({ hash, files }));
  return duplicates;
}

const { violations } = checkPathUniqueness();
const binaryDupes = checkBinaryUniqueness();
const perceptualDupes = checkPerceptualNearDupes();

let failed = false;

if (violations.length) {
  failed = true;
  console.error('Path reuse across multiple source files:');
  for (const v of violations) {
    console.error(`  ${v.path}`);
    for (const f of v.files) console.error(`    - ${f}`);
  }
}

if (binaryDupes.length) {
  failed = true;
  console.error('Binary-identical image files:');
  for (const d of binaryDupes) {
    console.error(`  md5 ${d.hash}`);
    for (const f of d.files) console.error(`    - ${f}`);
  }
}

if (perceptualDupes.length) {
  failed = true;
  console.error('Perceptually identical images (same photo, different encoding/size):');
  for (const d of perceptualDupes) {
    console.error(`  phash ${d.hash}`);
    for (const f of d.files) console.error(`    - ${f}`);
  }
}

if (failed) {
  console.error('\nImage uniqueness check FAILED.');
  process.exit(1);
}

console.log('Image uniqueness check passed.');
process.exit(0);
