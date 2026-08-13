#!/usr/bin/env node
/**
 * Validate cross-document anchor links.
 *
 * Docusaurus 2.4.x validates that a linked *file* exists (onBrokenLinks) but not
 * that the `#fragment` on the end of that link resolves to a real heading. Docs
 * cross-link into specific steps (e.g. ./creating-a-loan#step6), so a renamed or
 * renumbered heading breaks silently. This catches that.
 *
 * Run: node scripts/check-anchors.js
 */
const fs = require('fs');
const path = require('path');

const DOCS = path.join(__dirname, '..', 'docs');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return e.isFile() && p.endsWith('.md') ? [p] : [];
  });
}

/** GitHub-style slug, matching how Docusaurus derives an id from heading text. */
function slugify(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

const files = walk(DOCS);

// Map every doc to the set of anchors it exposes.
const anchors = new Map();
for (const file of files) {
  const set = new Set();
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const h = line.match(/^#{1,6}\s+(.*)$/);
    if (!h) continue;
    const explicit = h[1].match(/\{#([\w-]+)\}\s*$/);
    set.add(explicit ? explicit[1] : slugify(h[1]));
  }
  anchors.set(path.resolve(file), set);
}

const problems = [];

for (const file of files) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    const linkRe = /\[[^\]]*\]\(([^)\s]+)\)/g;
    let m;
    while ((m = linkRe.exec(line)) !== null) {
      const href = m[1];
      if (/^(https?:|mailto:|#)/.test(href)) continue;
      if (!href.includes('#')) continue;

      const [target, frag] = href.split('#');
      if (!frag) continue;

      // Resolve the target doc, tolerating a missing .md extension.
      const base = path.resolve(path.dirname(file), target);
      const candidates = [base, `${base}.md`, path.join(base, 'index.md')];
      const resolved = candidates.find(
        (c) => fs.existsSync(c) && fs.statSync(c).isFile(),
      );

      if (!resolved) {
        problems.push(`${path.relative(DOCS, file)}:${i + 1}  no such doc: ${href}`);
        continue;
      }
      if (!anchors.get(resolved)?.has(frag)) {
        problems.push(
          `${path.relative(DOCS, file)}:${i + 1}  no anchor #${frag} in ${path.relative(DOCS, resolved)}`,
        );
      }
    }
  });
}

if (problems.length) {
  console.error(`Broken anchor links (${problems.length}):\n`);
  problems.forEach((p) => console.error(`  ${p}`));
  process.exit(1);
}

const total = [...anchors.values()].reduce((n, s) => n + s.size, 0);
console.log(`Anchors OK — ${total} anchors across ${files.length} docs, no broken fragments.`);
