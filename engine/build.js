#!/usr/bin/env node
// Build one lesson (or all) from content/*.json into build/<CODE>/index.html
// Usage: node engine/build.js GR-003      node engine/build.js all

const fs = require('fs');
const path = require('path');
const L = require('./layouts');
const { md, resetAnchors } = require('./lib');

const ROOT = path.join(__dirname, '..');
const CONTENT = path.join(ROOT, 'content');
const BUILD = path.join(ROOT, 'build');

function buildLesson(code) {
  const file = path.join(CONTENT, `${code}.json`);
  const lesson = JSON.parse(fs.readFileSync(file, 'utf8'));
  resetAnchors();
  const slides = lesson.slides.map((s, i) => {
    const fn = L[s.layout];
    if (!fn) throw new Error(`${code} slide ${i + 1}: unknown layout "${s.layout}"`);
    const out = fn(s, lesson);
    const dark = (out.cls || '').includes('dark');
    const head = s.title && !dark
      ? `<div class="head"><div class="en">${md(s.title.en)}</div><div class="mn">${md(s.title.mn)}</div></div>` : '';
    const logo = `<img class="logo" src="../../assets/${dark ? 'logo-light' : 'logo'}.png" alt="HML Academy">`;
    const wires = out.wires && out.wires.length ? ` data-wires='${JSON.stringify(out.wires)}'` : '';
    const attr = (v) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    const say = s.say ? ` data-say="${attr(s.say)}"` : '';
    const time = s.time ? ` data-time="${attr(s.time)}"` : '';
    return `<section class="slide l-${s.layout} ${out.cls || ''}" data-n="${i + 1}"${wires}${say}${time}>
  ${head}
  ${out.html}
  ${logo}
  <div class="footer">Curated by Battumur.D</div>
</section>`;
  });

  const html = `<!doctype html>
<html lang="mn"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${lesson.code} ${lesson.title.en}</title>
<link rel="stylesheet" href="../../engine/style.css">
<link rel="stylesheet" href="../../engine/layouts.css">
</head><body>
<div class="stage" id="stage">
${slides.join('\n')}
</div>
<script src="../../engine/runtime.js"></script>
</body></html>`;
  const dir = path.join(BUILD, code);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  return { code, slides: slides.length, file: path.join(dir, 'index.html') };
}

function allCodes() {
  return fs.readdirSync(CONTENT).filter((f) => /^[A-Z]+-\d+\.json$/.test(f)).map((f) => f.replace('.json', ''));
}

if (require.main === module) {
  const arg = process.argv[2] || 'all';
  const codes = arg === 'all' ? allCodes() : arg.split(',');
  for (const c of codes) {
    const r = buildLesson(c);
    console.log(`built ${r.code}: ${r.slides} slides -> build/${r.code}/index.html`);
  }
}

module.exports = { buildLesson, allCodes };
