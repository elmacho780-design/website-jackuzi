#!/usr/bin/env node
// Makes a picture catalogue of every icon you can use: build/icons.html and build/icons.png
// Usage: node engine/icons.js
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const ROOT = path.join(__dirname, '..');
const dir = path.join(ROOT, 'assets', 'icons');
const names = fs.readdirSync(dir).filter((f) => f.endsWith('.png')).map((f) => f.replace('.png', '')).sort();
const cells = names.map((n) => `<div class="c"><img src="../assets/icons/${n}.png"><span>${n}</span></div>`).join('');
const html = `<!doctype html><meta charset="utf-8"><title>Icons</title><style>
body{margin:0;padding:24px;background:#FBF7F0;font:15px system-ui,sans-serif;color:#13233F;width:1872px}
h1{font-size:28px;margin:0 0 6px} p{margin:0 0 18px;color:#4A5872}
.g{display:grid;grid-template-columns:repeat(12,1fr);gap:10px}
.c{background:#fff;border-radius:14px;padding:10px 6px;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center}
.c img{width:84px;height:84px}.c span{font-size:13px;word-break:break-word}
</style><h1>${names.length} icons</h1><p>Use the name in a content file, for example "icon": "girl", or "boy+girl" for a group, "girl@speech-balloon" for a badge, "boy>backpack" for owner and thing, "no:automobile" for crossed out, "diagram:in" for the box and ball.</p><div class="g">${cells}</div>`;
fs.mkdirSync(path.join(ROOT, 'build'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'build', 'icons.html'), html);
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto('file://' + path.join(ROOT, 'build', 'icons.html'));
  await p.screenshot({ path: path.join(ROOT, 'build', 'icons.png'), fullPage: true });
  await b.close();
  console.log(`icons: build/icons.html and build/icons.png (${names.length} icons)`);
})();
