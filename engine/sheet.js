#!/usr/bin/env node
// One picture with every slide of a lesson, for a quick look: build/<CODE>/sheet.png
// Usage: node engine/sheet.js GR-003   (run "npm run shots GR-003" first)
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const code = process.argv[2];
const dir = path.join(__dirname, '..', 'build', code);
const shots = fs.readdirSync(path.join(dir, 'shots')).filter((f) => /^s\d+\.png$/.test(f)).sort();
const html = `<!doctype html><meta charset="utf-8"><style>body{margin:0;background:#2a2a2a;width:1930px}
.g{display:grid;grid-template-columns:960px 960px;gap:10px}.g div{position:relative}.g img{width:960px;height:540px;display:block}
.g b{position:absolute;left:8px;top:8px;background:#000c;color:#fff;font:600 18px system-ui;padding:2px 8px;border-radius:6px}</style>
<div class="g">${shots.map((s, i) => `<div><img src="shots/${s}"><b>${i + 1}</b></div>`).join('')}</div>`;
fs.writeFileSync(path.join(dir, 'sheet.html'), html);
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1930, height: 1000 } });
  await p.goto('file://' + path.join(dir, 'sheet.html'));
  await p.screenshot({ path: path.join(dir, 'sheet.png'), fullPage: true });
  await b.close();
  console.log(`sheet: build/${code}/sheet.png`);
})();
