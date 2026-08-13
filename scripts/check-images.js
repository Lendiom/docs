#!/usr/bin/env node
/**
 * Validate image references.
 *
 * Three things go wrong over time:
 *   1. A doc points at an image that isn't in the repo.
 *   2. A doc hotlinks a remote image. Help Scout serves its images from a CDN,
 *      so content pulled down from there arrives pointing at that CDN. Those
 *      references break with no build error the moment an asset is rotated.
 *   3. An asset is left behind in static/ that nothing references.
 *
 * Run: node scripts/check-images.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DOCS = path.join(ROOT, 'docs');
const ASSETS = path.join(ROOT, 'static', 'img', 'docs');

function walk(dir, ext) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p, ext);
    return e.isFile() && (!ext || p.endsWith(ext)) ? [p] : [];
  });
}

const problems = [];
const referenced = new Set();
let count = 0;

for (const file of walk(DOCS, '.md')) {
  const rel = path.relative(DOCS, file);
  fs.readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    const re = /!\[([^\]]*)\]\(([^)\s]+)\)/g;
    let m;
    while ((m = re.exec(line)) !== null) {
      const [, alt, url] = m;
      count += 1;

      if (/^(https?:)?\/\//.test(url)) {
        problems.push(`${rel}:${i + 1}  remote image, download it into static/img/docs: ${url}`);
        continue;
      }
      if (/^\.\.\//.test(url)) {
        problems.push(`${rel}:${i + 1}  legacy relative path, use /img/docs/...: ${url}`);
        continue;
      }
      if (!alt.trim() || /^(img|image|screenshot)$/i.test(alt.trim())) {
        problems.push(`${rel}:${i + 1}  needs descriptive alt text: ${url}`);
      }

      const abs = path.join(ROOT, 'static', url);
      referenced.add(abs);
      if (!fs.existsSync(abs)) {
        problems.push(`${rel}:${i + 1}  missing asset: ${url}`);
      }
    }
  });
}

const orphans = walk(ASSETS)
  .filter((p) => !p.endsWith('.DS_Store') && !referenced.has(p))
  .map((p) => path.relative(ROOT, p));

if (problems.length || orphans.length) {
  if (problems.length) {
    console.error(`Image problems (${problems.length}):\n`);
    problems.forEach((p) => console.error(`  ${p}`));
  }
  if (orphans.length) {
    console.error(`\nOrphaned assets (${orphans.length}) — reference or delete:\n`);
    orphans.forEach((p) => console.error(`  ${p}`));
  }
  process.exit(1);
}

console.log(`Images OK — ${count} references, all local, all resolve, no orphans.`);
