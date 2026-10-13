#!/usr/bin/env node
// Screenshots for checking: one PNG per slide at its final step (all content visible).
// Usage: node engine/shoot.js GR-003 [slideNumber]      node engine/shoot.js all
// Output: build/<CODE>/shots/s01.png ... and build/<CODE>/sheet.png

const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');
const { allCodes } = require('./build');

async function shootLesson(page, code, only) {
  const dir = path.join(__dirname, '..', 'build', code);
  const out = path.join(dir, 'shots');
  fs.mkdirSync(out, { recursive: true });
  await page.goto('file://' + path.join(dir, 'index.html') + '?export=1');
  await page.evaluate(() => window.HML.ready);
  const n = await page.evaluate(() => window.HML.count());
  for (let i = 0; i < n; i++) {
    if (only && only !== i + 1) continue;
    const max = await page.evaluate((i) => window.HML.steps(i), i);
    await page.evaluate(([i, s]) => window.HML.go(i, s), [i, max]);
    await page.waitForTimeout(60);
    const f = path.join(out, `s${String(i + 1).padStart(2, '0')}.png`);
    await page.screenshot({ path: f });
  }
  console.log(`shots: build/${code}/shots/ (${n} slides)`);
  if (!only) require('child_process').execFileSync(process.execPath, [path.join(__dirname, 'sheet.js'), code], { stdio: 'inherit' });
}

(async () => {
  const arg = process.argv[2] || 'all';
  const only = process.argv[3] ? +process.argv[3] : null;
  const codes = arg === 'all' ? allCodes() : arg.split(',');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  for (const c of codes) await shootLesson(page, c, only);
  await browser.close();
})();
