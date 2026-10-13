#!/usr/bin/env node
// Quality check for one lesson (or all). Run after every build.
// Usage: node engine/check.js GR-003      node engine/check.js all
// Finds: text running off a card or the slide, things overlapping, text over the logo/footer,
// a single word alone on the last line, text smaller than the minimum, em dashes,
// mixed Latin/Cyrillic letters inside a Mongolian word, and common ү/ө typos.
// Exit code 1 if anything must be fixed.

const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');
const { buildLesson, allCodes } = require('./build');

const ROOT = path.join(__dirname, '..');

// Mongolian words AI tools often retype without ү / ө. Left: wrong, right: correct.
const MN_TYPOS = {
  'хун': 'хүн', 'бугд': 'бүгд', 'узэг': 'үзэг', 'угуй': 'үгүй', 'зев': 'зөв', 'зевхен': 'зөвхөн',
  'еглее': 'өглөө', 'едер': 'өдөр', 'едрийн': 'өдрийн', 'нуд': 'нүд', 'нудтэй': 'нүдтэй', 'устэй': 'үстэй',
  'бул': 'бүл', 'туунийн': 'түүний', 'туунд': 'түүнд', 'ерее': 'өрөө', 'шуд': 'шүд',
  'ундсэн': 'үндсэн', 'улгэр': 'үлгэр', 'усэг': 'үсэг', 'угийг': 'үгийг', 'дурэм': 'дүрэм', 'хуух': 'хүүх',
  'хуу': 'хүү', 'тегсгел': 'төгсгөл', 'бурэн': 'бүрэн',
};

function contentProblems(lesson) {
  const out = [];
  const walk = (v, where) => {
    if (typeof v === 'string') {
      if (v.includes('—')) out.push({ level: 'error', where, msg: 'em dash (—) found; use a colon, comma or full stop' });
      for (const w of v.split(/[^A-Za-zЀ-ӿ]+/)) {
        if (!w) continue;
        const cyr = /[Ѐ-ӿ]/.test(w), lat = /[A-Za-z]/.test(w);
        if (cyr && lat) out.push({ level: 'error', where, msg: `"${w}" mixes Latin and Cyrillic letters (a Latin letter inside a Mongolian word)` });
        const fix = MN_TYPOS[w.toLowerCase()];
        if (fix) out.push({ level: 'warn', where, msg: `"${w}" may be missing ү/ө: did you mean "${fix}"?` });
      }
    } else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${where}[${i}]`));
    else if (v && typeof v === 'object') for (const k of Object.keys(v)) walk(v[k], `${where}.${k}`);
  };
  if (lesson.mn_review === 'draft') out.push({ level: 'warn', where: 'lesson', msg: 'Mongolian is still a draft: Battumur must check it before recording' });
  lesson.slides.forEach((s, i) => walk(s, `slide ${i + 1}`));
  walk(lesson.title, 'lesson title');
  return out;
}

async function checkPage(page, file) {
  await page.goto('file://' + file + '?export=1');
  await page.evaluate(() => window.HML.ready);
  const n = await page.evaluate(() => window.HML.count());
  const problems = [];
  for (let i = 0; i < n; i++) {
    const max = await page.evaluate((i) => window.HML.steps(i), i);
    await page.evaluate(([i, s]) => window.HML.go(i, s), [i, max]);
    const found = await page.evaluate((i) => {
      const slide = document.querySelectorAll('.slide')[i];
      const o = slide.getBoundingClientRect();
      const k = o.width / 1920;
      const R = (el) => { const r = el.getBoundingClientRect(); return { x: (r.left - o.left) / k, y: (r.top - o.top) / k, w: r.width / k, h: r.height / k }; };
      const label = (el) => (el.innerText || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 60) || `[${el.tagName.toLowerCase()}.${String(el.className.baseVal != null ? el.className.baseVal : el.className).split(' ')[0]}]`;
      const out = [];
      const hit = (a, b, pad = 2) => a.x < b.x + b.w - pad && b.x < a.x + a.w - pad && a.y < b.y + b.h - pad && b.y < a.y + a.h - pad;

      // 1. content block must fit inside its area
      const body = slide.querySelector('.body');
      if (body) {
        const bb = R(body);
        if (body.scrollHeight > body.clientHeight + 2) out.push({ level: 'error', msg: `content is ${body.scrollHeight - body.clientHeight}px too tall for the slide; reduce text size or spacing` });
        body.querySelectorAll('*').forEach((el) => {
          const r = R(el);
          if (r.w && r.h && (r.y + r.h > bb.y + bb.h + 3)) { if (!el.closest('svg')) out.push({ level: 'error', msg: `"${label(el)}" goes below the content area` }); }
          if (r.w && r.h && (r.x < bb.x - 3 || r.x + r.w > bb.x + bb.w + 3)) { if (!el.closest('svg')) out.push({ level: 'error', msg: `"${label(el)}" goes past the left or right margin` }); }
        });
      }
      // 2. text overflowing its own box (cut off or spilling)
      slide.querySelectorAll('.en,.mn,.chip,.sent,.w,.m,.fmn,.fen,h1,.tmn').forEach((el) => {
        if (el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflow !== 'visible') out.push({ level: 'error', msg: `"${label(el)}" is cut off on the right` });
        const p = el.parentElement.closest('.card,.chip,.callout,.g-cell,.mwrong,.mright,.item,.sp-item,.citem,.flip,.wcontext');
        if (p) {
          const a = R(el), b = R(p);
          if (a.x + a.w > b.x + b.w + 2 || a.y + a.h > b.y + b.h + 2) out.push({ level: 'error', msg: `"${label(el)}" spills outside its card` });
        }
      });
      // 3. everything inside the slide, nothing over logo or footer
      const logo = slide.querySelector('.logo'), foot = slide.querySelector('.footer');
      const texts = [...slide.querySelectorAll('.en,.mn,.chip,.sent,.w,.m,h1,.tmn,.icon')].filter((e) => !e.closest('.hero'));
      for (const el of texts) {
        const r = R(el);
        if (r.x < -1 || r.y < -1 || r.x + r.w > 1921 || r.y + r.h > 1081) out.push({ level: 'error', msg: `"${label(el)}" is outside the slide` });
        if (logo && hit(r, R(logo))) out.push({ level: 'error', msg: `"${label(el)}" overlaps the logo` });
        if (foot && hit(r, R(foot))) out.push({ level: 'error', msg: `"${label(el)}" overlaps the footer` });
      }
      // 4. text blocks overlapping each other
      const blocks = [...slide.querySelectorAll('.pair,.chip,.sent,.g-cell,.icon,.verdict,.cluster,.badge-wrap')].filter((e) => !e.closest('.hero,.scene') && !(e.classList.contains('icon') && e.closest('.cluster,.badge-wrap,.owner,.crossed')));
      for (let a = 0; a < blocks.length; a++) for (let b = a + 1; b < blocks.length; b++) {
        const A = blocks[a], B = blocks[b];
        if (A.contains(B) || B.contains(A)) continue;
        if (hit(R(A), R(B), 4)) out.push({ level: 'error', msg: `"${label(A) || 'picture'}" overlaps "${label(B) || 'picture'}"` });
      }
      // 5. a single word alone on the last line
      slide.querySelectorAll('.en,.mn,.sent').forEach((el) => {
        const words = [];
        const w2 = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        let tn; while ((tn = w2.nextNode())) {
          const re = /\S+/g; let m;
          while ((m = re.exec(tn.textContent))) {
            const rg = document.createRange(); rg.setStart(tn, m.index); rg.setEnd(tn, m.index + m[0].length);
            const r = rg.getClientRects()[0]; if (r) words.push({ w: m[0], top: Math.round(r.top / k) });
          }
        }
        const tops = [...new Set(words.map((x) => x.top))].sort((a, b) => a - b);
        // merge tops that are within 6px (same line)
        const lines = []; tops.forEach((t) => { if (!lines.length || t - lines[lines.length - 1] > 6) lines.push(t); });
        if (lines.length < 2) return;
        const last = lines[lines.length - 1];
        const onLast = words.filter((x) => Math.abs(x.top - last) <= 6);
        if (onLast.length === 1 && words.length >= 3) out.push({ level: 'warn', msg: `"${label(el)}" leaves "${onLast[0].w}" alone on its last line` });
      });
      // 6. minimum text size
      const tw = document.createTreeWalker(slide, NodeFilter.SHOW_TEXT);
      let t; while ((t = tw.nextNode())) {
        if (!t.textContent.trim()) continue;
        const el = t.parentElement;
        if (el.closest('.footer,.tag,.verdict,.bub-name,svg')) continue;
        const fs = parseFloat(getComputedStyle(el).fontSize);
        if (fs < 28) out.push({ level: 'warn', msg: `"${t.textContent.trim().slice(0, 40)}" is ${fs}px (minimum 28px)` });
      }
      // 7. fonts
      const faces = [...document.fonts];
      if (faces.some((f) => f.status === 'error')) out.push({ level: 'error', msg: 'a font file failed to load (check assets/fonts)' });
      if (!faces.some((f) => f.family.replace(/"/g, '') === 'Rubik' && f.status === 'loaded')) out.push({ level: 'error', msg: 'Rubik font did not load' });
      return out;
    }, i);
    found.forEach((f) => problems.push({ ...f, where: `slide ${i + 1}` }));
  }
  return problems;
}

async function main() {
  const arg = process.argv[2] || 'all';
  const codes = arg === 'all' ? allCodes() : arg.split(',');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  let errors = 0;
  for (const code of codes) {
    const { file } = buildLesson(code);
    const lesson = JSON.parse(fs.readFileSync(path.join(ROOT, 'content', `${code}.json`), 'utf8'));
    const probs = [...contentProblems(lesson), ...(await checkPage(page, file))];
    // de-duplicate
    const seen = new Set();
    const uniq = probs.filter((p) => { const k = p.where + p.msg; if (seen.has(k)) return false; seen.add(k); return true; });
    const e = uniq.filter((p) => p.level === 'error'), w = uniq.filter((p) => p.level === 'warn');
    errors += e.length;
    console.log(`\n${code}: ${e.length ? `${e.length} to fix` : 'OK'}${w.length ? `, ${w.length} to look at` : ''}`);
    uniq.forEach((p) => console.log(`  ${p.level === 'error' ? 'FIX ' : 'LOOK'}  ${p.where}: ${p.msg}`));
    fs.writeFileSync(path.join(ROOT, 'build', code, 'check.json'), JSON.stringify(uniq, null, 2));
  }
  await browser.close();
  process.exit(errors ? 1 : 0);
}
main();
