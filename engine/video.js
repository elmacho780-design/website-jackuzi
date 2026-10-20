#!/usr/bin/env node
// Make the lesson video from the recorded voiceover (npm run record first).
// Usage: npm run video GR-003      (or GR-003,GR-004, or all = every lesson that has recordings)
// Makes, in export/<CODE> <Title>/ (the same folder as npm run export):
//   <CODE>.mp4              1920 x 1080, 30 fps. Each click's picture is held for exactly its audio,
//                           every slide starts with a short pause, the last slide is held 3 seconds at the end.
//   <CODE> timestamps.txt   when each slide starts, for the "watch again" links: [01:05] Slide 3 · Examples
//   <CODE> timestamps.json  the same, plus every click, for the developer
// Each take is cleaned at both ends (silence and key clicks trimmed) and the whole voiceover is brought
// to one even loudness. The recordings themselves are never changed.

const path = require('path');
const fs = require('fs');
const os = require('os');
const { execFileSync, spawnSync } = require('child_process');
const { chromium } = require('playwright');
const ffmpeg = require('ffmpeg-static');
const { buildLesson } = require('./build');

const ROOT = path.join(__dirname, '..');
const REC = path.join(ROOT, 'recordings');
const RATE = 48000;
const FPS = 30;
const SPF = RATE / FPS; // audio samples per video frame
const LEAD = 0.6; // seconds of quiet when a slide appears, before the voice starts
const END_HOLD = 3; // seconds the last slide stays after the closing line
const LOUD = 'loudnorm=I=-16:TP=-1.5:LRA=11';
const TRIM = (keep) => `silenceremove=start_periods=1:start_duration=0.1:start_threshold=-45dB:start_silence=${keep}:detection=rms`;
const CLEAN = `${TRIM(0.15)},areverse,${TRIM(0.35)},areverse`; // keep 0.15 s before the voice, 0.35 s after

const ff = (args, opts = {}) => execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', ...args], { maxBuffer: 1 << 30, ...opts });
const take = (i, s) => `s${String(i + 1).padStart(2, '0')}_${String(s).padStart(2, '0')}`;
const mmss = (sec) => `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(Math.floor(sec % 60)).padStart(2, '0')}`;

// a take as raw 48 kHz mono samples, cleaned at both ends
function audioOf(file) {
  let a = ff(['-i', file, '-af', CLEAN, '-f', 's16le', '-ac', '1', '-ar', String(RATE), '-']);
  // a take with no voice in it at all: keep its full length as a pause
  if (a.length < RATE * 2 * 0.25) a = ff(['-i', file, '-f', 's16le', '-ac', '1', '-ar', String(RATE), '-']);
  return a;
}

function slideTitle(s, lesson) {
  if (s.title) return s.title;
  if (s.layout === 'title') return lesson.title;
  if (s.layout === 'summary') return { en: 'Remember', mn: 'Санаж ав' };
  if (s.layout === 'closing') return { en: 'Now try the exercises', mn: '' };
  return { en: s.layout, mn: '' };
}

async function makeVideo(page, code) {
  const lesson = JSON.parse(fs.readFileSync(path.join(ROOT, 'content', `${code}.json`), 'utf8'));
  const name = `${code} ${lesson.title.en.replace(/[\\/:*?"<>|]/g, '')}`; // same folder as export.js
  const outDir = path.join(ROOT, 'export', name);
  const recDir = path.join(REC, code);
  const { file } = buildLesson(code);
  await page.goto('file://' + file + '?export=1');
  await page.evaluate(() => window.HML.ready);
  const n = await page.evaluate(() => window.HML.count());
  const steps = [];
  for (let i = 0; i < n; i++) steps.push(await page.evaluate((i) => window.HML.steps(i), i));

  // every click needs a take; takes for clicks the deck no longer has mean the slide changed
  const have = fs.existsSync(recDir) ? fs.readdirSync(recDir).filter((f) => /^s\d{2}_\d{2}\.wav$/.test(f)).map((f) => f.slice(0, -4)) : [];
  const want = steps.flatMap((max, i) => Array.from({ length: max + 1 }, (_, s) => take(i, s)));
  const missing = want.filter((t) => !have.includes(t));
  const extra = have.filter((t) => !want.includes(t));
  for (const t of extra) console.log(`  note: ${code} has a take for slide ${+t.slice(1, 3)} click ${+t.slice(4)}, which the deck no longer has. Re-record slide ${+t.slice(1, 3)} if its clicks changed.`);
  if (missing.length) {
    const bySlide = {};
    for (const t of missing) (bySlide[+t.slice(1, 3)] ||= []).push(+t.slice(4));
    console.error(`${code}: not recorded yet: ${Object.entries(bySlide).map(([sl, cl]) => (steps[sl - 1] ? `slide ${sl} click ${cl.join(', ')}` : `slide ${sl}`)).join(', ')}`);
    console.error(`Record them with: npm run record ${code}`);
    return false;
  }

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), `hml-video-${code}-`));
  try {
    // pictures and audio, click by click, cut to whole video frames so sound and picture stay in step
    const segs = [], audio = [], slides = [];
    let frame = 0;
    for (let i = 0; i < n; i++) {
      slides.push({ slide: i + 1, frame, clicks: [] });
      for (let s = 0; s <= steps[i]; s++) {
        await page.evaluate(([i, s]) => window.HML.go(i, s), [i, s]);
        await page.waitForTimeout(40);
        const png = `${take(i, s)}.png`;
        await page.screenshot({ path: path.join(tmp, png) });
        let a;
        try { a = audioOf(path.join(recDir, `${take(i, s)}.wav`)); }
        catch (e) { console.error(`${code}: the recording for slide ${i + 1} click ${s} cannot be read. Record that click again.`); return false; }
        if (s === 0) a = Buffer.concat([Buffer.alloc(Math.round(LEAD * FPS) * SPF * 2), a]);
        if (i === n - 1 && s === steps[i]) a = Buffer.concat([a, Buffer.alloc(END_HOLD * RATE * 2)]);
        const frames = Math.max(1, Math.ceil(a.length / 2 / SPF));
        audio.push(a, Buffer.alloc(frames * SPF * 2 - a.length));
        slides[i].clicks.push(frame);
        segs.push({ png, start: frame, end: frame + frames });
        frame += frames;
      }
    }
    const total = frame / FPS;
    fs.writeFileSync(path.join(tmp, 'voice.pcm'), Buffer.concat(audio));
    const list = ['ffconcat version 1.0'];
    // read every picture on the video's own 1/30 s grid, so each one starts on exactly its frame
    for (const g of segs) list.push(`file '${g.png}'`, `option framerate ${FPS}`, `duration ${((g.end - g.start) / FPS).toFixed(6)}`);
    list.push(`file '${segs[segs.length - 1].png}'`, `option framerate ${FPS}`);
    fs.writeFileSync(path.join(tmp, 'list.txt'), list.join('\n') + '\n');

    // one even loudness for the whole voiceover (measure first, then apply)
    const pcmIn = ['-f', 's16le', '-ar', String(RATE), '-ac', '1', '-i', 'voice.pcm'];
    const probe = spawnSync(ffmpeg, ['-hide_banner', ...pcmIn, '-af', `${LOUD}:print_format=json`, '-f', 'null', '-'], { cwd: tmp, encoding: 'utf8', maxBuffer: 1 << 26 });
    const m = JSON.parse((probe.stderr.match(/\{[^{}]*"input_i"[^{}]*\}/) || ['{}'])[0]);
    const loud = m.input_i && +m.input_i > -70
      ? `${LOUD}:measured_I=${m.input_i}:measured_TP=${m.input_tp}:measured_LRA=${m.input_lra}:measured_thresh=${m.input_thresh}:offset=${m.target_offset}:linear=true,aresample=${RATE}`
      : 'anull';

    fs.mkdirSync(outDir, { recursive: true });
    const mp4 = path.join(outDir, `${code}.mp4`);
    ff(['-y', '-f', 'concat', '-safe', '0', '-i', 'list.txt', ...pcmIn,
      '-map', '0:v', '-map', '1:a', '-vf', `fps=${FPS},format=yuv420p`,
      '-c:v', 'libx264', '-preset', 'medium', '-tune', 'stillimage', '-crf', '20', '-g', String(FPS * 2),
      '-af', loud, '-c:a', 'aac', '-b:a', '160k', '-ar', String(RATE),
      '-t', total.toFixed(6), '-movflags', '+faststart', mp4], { cwd: tmp });

    // timestamps for the website
    const rows = slides.map((sl) => {
      const t = slideTitle(lesson.slides[sl.slide - 1], lesson);
      return { slide: sl.slide, start: mmss(sl.frame / FPS), start_sec: +(sl.frame / FPS).toFixed(2), title_en: t.en, title_mn: t.mn, clicks_sec: sl.clicks.map((f) => +(f / FPS).toFixed(2)) };
    });
    fs.writeFileSync(path.join(outDir, `${code} timestamps.txt`), rows.map((r) => `[${r.start}] Slide ${r.slide} · ${r.title_en}`).join('\n') + '\n');
    fs.writeFileSync(path.join(outDir, `${code} timestamps.json`), JSON.stringify({ code, title: lesson.title, video: `${code}.mp4`, duration_sec: +total.toFixed(2), slides: rows }, null, 2) + '\n');
    console.log(`video ${code}: ${mmss(total)} long, ${n} slides${want.length > n ? `, ${want.length} clicks` : ''} -> export/${name}/${code}.mp4 (+ timestamps)`);
    if (total > 7 * 60) console.log(`  note: longer than 7 minutes; the teaching guide says to shorten the hook.`);
    return true;
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

(async () => {
  if (!ffmpeg) { console.error('ffmpeg is not available for this computer. Run "npm install" again.'); process.exit(1); }
  const arg = process.argv[2];
  if (!arg) { console.error('Usage: npm run video GR-003'); process.exit(1); }
  const codes = arg === 'all'
    ? (fs.existsSync(REC) ? fs.readdirSync(REC).filter((c) => fs.existsSync(path.join(ROOT, 'content', `${c}.json`))) : [])
    : arg.split(',');
  if (!codes.length) { console.error('Nothing recorded yet. Start with: npm run record GR-003'); process.exit(1); }
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  let ok = true;
  for (const c of codes) ok = (await makeVideo(page, c)) && ok;
  await browser.close();
  process.exit(ok ? 0 : 1);
})();
