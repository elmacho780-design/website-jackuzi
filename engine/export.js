#!/usr/bin/env node
// Export one lesson (or all) for recording and sharing.
// Usage: node engine/export.js GR-003      node engine/export.js all
// Makes, in export/<CODE> <Title>/ :
//   <CODE> <Title>.pptx   one PowerPoint slide per slide, everything visible, voiceover guide in the notes
//   <CODE> <Title>.pdf    one page per slide, everything visible (for checking and sharing)
//   slides/               PNG of every slide (final state), 1920x1080
//   steps/                PNG of every click, in order (for video editors)

const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');
const PptxGenJS = require('pptxgenjs');
const { PDFDocument } = require('pdf-lib');
const { buildLesson, allCodes } = require('./build');

const ROOT = path.join(__dirname, '..');

async function exportLesson(page, code) {
  const { file } = buildLesson(code);
  const lesson = JSON.parse(fs.readFileSync(path.join(ROOT, 'content', `${code}.json`), 'utf8'));
  const name = `${code} ${lesson.title.en.replace(/[\\/:*?"<>|]/g, '')}`;
  const dir = path.join(ROOT, 'export', name);
  // clear only what this script makes, so a video made by "npm run video" stays
  for (const sub of ['slides', 'steps']) fs.rmSync(path.join(dir, sub), { recursive: true, force: true });
  fs.mkdirSync(path.join(dir, 'slides'), { recursive: true });
  fs.mkdirSync(path.join(dir, 'steps'), { recursive: true });

  await page.goto('file://' + file + '?export=1');
  await page.evaluate(() => window.HML.ready);
  const n = await page.evaluate(() => window.HML.count());

  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5 in, 16:9
  pptx.title = name;
  pptx.author = 'HML Academy';
  const pdf = await PDFDocument.create();
  let stepCount = 0;

  for (let i = 0; i < n; i++) {
    const max = await page.evaluate((i) => window.HML.steps(i), i);
    for (let s = 0; s <= max; s++) {
      await page.evaluate(([i, s]) => window.HML.go(i, s), [i, s]);
      await page.waitForTimeout(40);
      const png = await page.screenshot({ type: 'png' });
      const stepName = `s${String(i + 1).padStart(2, '0')}_${String(s).padStart(2, '0')}.png`;
      fs.writeFileSync(path.join(dir, 'steps', stepName), png);
      const sl = pptx.addSlide();
      sl.addImage({ data: 'data:image/png;base64,' + png.toString('base64'), x: 0, y: 0, w: '100%', h: '100%' });
      const meta = lesson.slides[i];
      const sayText = (meta.say || '').split('[click]').map((x) => x.trim()).filter(Boolean).join('\n\n');
      sl.addNotes(`Slide ${i + 1}${max ? `, click ${s} of ${max}` : ''}${meta.time ? ` · ${meta.time}` : ''}\n\nSAY (in Mongolian, in your own words; English examples in English):\n${sayText}${meta.teach ? `\n\nTEACHING NOTE: ${meta.teach}` : ''}`);
      stepCount++;
      if (s === max) {
        fs.writeFileSync(path.join(dir, 'slides', `s${String(i + 1).padStart(2, '0')}.png`), png);
        const jpg = await page.screenshot({ type: 'jpeg', quality: 92 });
        const img = await pdf.embedJpg(jpg);
        const pg = pdf.addPage([1920 * 0.5, 1080 * 0.5]);
        pg.drawImage(img, { x: 0, y: 0, width: 960, height: 540 });
      }
    }
  }
  await pptx.writeFile({ fileName: path.join(dir, `${name}.pptx`) });
  fs.writeFileSync(path.join(dir, `${name}.pdf`), await pdf.save());
  console.log(`exported ${code}: ${n} slides, ${stepCount} clicks -> export/${name}/`);
  return dir;
}

(async () => {
  const arg = process.argv[2] || 'all';
  const codes = arg === 'all' ? allCodes() : arg.split(',');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  for (const c of codes) await exportLesson(page, c);
  await browser.close();
})();
