#!/usr/bin/env node
// Record the voiceover inside the deck, one audio file per click.
// Usage: npm run record GR-003        (add --no-open to only start the server)
// Starts a small server on this computer only and opens the deck in Chrome with the recorder on.
// Each take is saved as recordings/GR-003/s03_02.wav (slide 3, click 2). A take you redo replaces the
// old one, which is kept in recordings/GR-003/replaced/ just in case. Then: npm run video GR-003

const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn, spawnSync } = require('child_process');
const { buildLesson } = require('./build');

const ROOT = path.join(__dirname, '..');
const REC = path.join(ROOT, 'recordings');
const PORT = 5178;
const HOST = '127.0.0.1';
const SERVED = ['build', 'engine', 'assets', 'recordings'];
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.wav': 'audio/wav', '.json': 'application/json',
};
const CODE_RE = /^[A-Z]+-\d+$/;
const TAKE_RE = /^s\d{2}_\d{2}$/;

const code = process.argv[2];
const noOpen = process.argv.includes('--no-open');
if (!code || !CODE_RE.test(code)) {
  console.error('Usage: npm run record GR-003');
  process.exit(1);
}
if (!fs.existsSync(path.join(ROOT, 'content', `${code}.json`))) {
  console.error(`There is no lesson ${code} (no content/${code}.json).`);
  process.exit(1);
}
const lesson = buildLesson(code);
const url = `http://${HOST}:${PORT}/build/${code}/index.html?record=1`;

function takesOf(c) {
  const dir = path.join(REC, c);
  return fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => /^s\d{2}_\d{2}\.wav$/.test(f)).map((f) => f.slice(0, -4)).sort() : [];
}

function send(res, status, body, type = 'text/plain; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  res.end(body);
}

function saveTake(req, res, c, name) {
  // only the recorder page sends this header; other web pages cannot send it to this server
  if (req.headers['x-hml-recorder'] !== '1') return send(res, 403, 'forbidden');
  const parts = [];
  let size = 0;
  req.on('data', (d) => {
    size += d.length;
    if (size > 200 * 1024 * 1024) { send(res, 413, 'take too long'); req.destroy(); return; }
    parts.push(d);
  });
  req.on('end', () => {
    const body = Buffer.concat(parts);
    if (body.length < 44 || body.toString('ascii', 0, 4) !== 'RIFF') return send(res, 400, 'not a WAV file');
    const dir = path.join(REC, c);
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `${name}.wav`);
    if (fs.existsSync(file)) {
      const old = path.join(dir, 'replaced');
      fs.mkdirSync(old, { recursive: true });
      fs.renameSync(file, path.join(old, `${name} ${new Date().toISOString().replace(/[:.]/g, '-')}.wav`));
    }
    fs.writeFileSync(file, body);
    const secs = (body.length - 44) / 2 / body.readUInt32LE(24);
    console.log(`saved ${c} slide ${+name.slice(1, 3)} click ${+name.slice(4)} (${secs.toFixed(1)} s)`);
    send(res, 200, 'ok');
  });
}

const server = http.createServer((req, res) => {
  let parts;
  try { parts = new URL(req.url, `http://${HOST}:${PORT}`).pathname.split('/').filter(Boolean).map(decodeURIComponent); }
  catch (e) { return send(res, 400, 'bad request'); }

  if (parts[0] === 'rec' && CODE_RE.test(parts[1] || '')) {
    if (req.method === 'GET' && parts.length === 2) return send(res, 200, JSON.stringify({ takes: takesOf(parts[1]) }), 'application/json');
    if (req.method === 'PUT' && parts.length === 3 && TAKE_RE.test(parts[2])) return saveTake(req, res, parts[1], parts[2]);
    return send(res, 400, 'bad request');
  }
  if (req.method !== 'GET') return send(res, 405, 'method not allowed');
  if (!parts.length) { res.writeHead(302, { Location: `/build/${code}/index.html?record=1` }); return res.end(); }

  const file = path.join(ROOT, ...parts);
  const rel = path.relative(ROOT, file);
  if (!SERVED.includes(rel.split(path.sep)[0]) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    return send(res, 404, 'not found');
  }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(file).pipe(res);
});

function findChrome() {
  const env = process.env;
  const list = process.platform === 'win32'
    ? [env.PROGRAMFILES, env['PROGRAMFILES(X86)'], env.LOCALAPPDATA].filter(Boolean).map((d) => path.join(d, 'Google', 'Chrome', 'Application', 'chrome.exe'))
    : process.platform === 'darwin' ? ['/Applications/Google Chrome.app']
      : ['/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser'];
  return list.find((f) => fs.existsSync(f));
}

function openBrowser() {
  if (noOpen) return;
  const chrome = findChrome();
  const detached = (cmd, args) => spawn(cmd, args, { detached: true, stdio: 'ignore' }).on('error', () => {}).unref();
  if (process.platform === 'darwin') spawnSync('open', chrome ? ['-a', 'Google Chrome', url] : [url]);
  else if (chrome) detached(chrome, [url]);
  else if (process.platform === 'win32') detached('explorer.exe', [url]);
  else detached('xdg-open', [url]);
}

server.on('error', (err) => {
  if (err.code !== 'EADDRINUSE') throw err;
  // a recorder is probably already running (any lesson); use it
  http.get(`http://${HOST}:${PORT}/rec/${code}`, (r) => {
    if (r.statusCode !== 200) { console.error(`Port ${PORT} is used by another program. Close it and try again.`); process.exit(1); }
    console.log(`The recorder is already running. Opening ${lesson.code}:\n  ${url}`);
    openBrowser();
  }).on('error', () => { console.error(`Port ${PORT} is busy. Close the other program and try again.`); process.exit(1); });
});

server.listen(PORT, HOST, () => {
  const done = takesOf(code).length;
  console.log(`Recorder for ${code} is running${done ? ` (${done} clicks already recorded)` : ''}.
Open in Chrome (it opens by itself): ${url}
Keys: R record / stop · → next click (while recording: saves it and keeps recording) · ← back
      D redo this click · P play it · X stop without saving · N notes · F full screen
Takes are saved in recordings/${code}/. When you are done, press Ctrl+C here, then: npm run video ${code}`);
  openBrowser();
});
