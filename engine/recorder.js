// Voiceover recorder. runtime.js loads it when "npm run record <CODE>" opens the deck (?record=1).
// R  record this click, R again to stop and save
// →  next click; while recording it saves this click and keeps recording the next one
// ←  back; while recording it saves this click and stops
// D  redo this click: throws away what you just said and starts it again
// P  play this click's saved take     X (or Esc)  stop without saving     H  show / hide the keys
// The local server (engine/record.js) saves each take as recordings/<CODE>/sNN_MM.wav (slide NN, click MM).
// Nothing here is ever on a slide: "npm run video" takes its own clean pictures.
(function () {
  const H = window.HML;
  const CODE = location.pathname.split('/').filter(Boolean).slice(-2)[0];
  const TOTAL = Array.from({ length: H.count() }, (_, i) => H.steps(i) + 1).reduce((a, b) => a + b, 0);
  const id = ([i, s]) => `s${String(i + 1).padStart(2, '0')}_${String(s).padStart(2, '0')}`;
  const label = (name) => { const m = name.match(/^s(\d+)_(\d+)$/); return `slide ${+m[1]} click ${+m[2]}`; };
  const fmt = (sec) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
  const takes = new Set();
  let ctx = null, mic = false, micError = '';
  let recording = false, recAt = null, chunks = [], clipped = 0, t0 = 0;
  let peak = 0, shown = 0, saving = 0, flash = '', flashTimer = null, audio = null;

  // ---------- on-screen bar, red frame while recording, key help ----------
  const css = document.createElement('style');
  css.textContent = `
#rec-frame{position:fixed;inset:0;border:10px solid #D33A3A;pointer-events:none;z-index:50;display:none}
body.rec-on #rec-frame{display:block}
#rec-bar{position:fixed;left:18px;bottom:18px;z-index:51;display:flex;align-items:center;gap:16px;padding:12px 22px;border-radius:999px;
  background:rgba(14,31,58,.94);color:#fff;font:500 18px/1.2 Rubik,system-ui,sans-serif;box-shadow:0 6px 24px rgba(0,0,0,.28)}
body.rec-on #rec-bar{background:#D33A3A}
#rec-bar .dot{width:16px;height:16px;border-radius:50%;background:#9AA6B8;flex:none}
body.rec-on #rec-bar .dot{background:#fff;animation:rec-pulse 1s infinite}
@keyframes rec-pulse{50%{opacity:.2}}
#rec-bar .state{font-weight:700;letter-spacing:.05em;min-width:96px}
#rec-bar .meter{width:120px;height:10px;border-radius:5px;background:rgba(255,255,255,.2);overflow:hidden;flex:none}
#rec-bar .meter i{display:block;height:100%;width:0;background:#4ADE80}
#rec-bar .meter i.hot{background:#FBBF24}
#rec-bar .ok{color:#4ADE80} body.rec-on #rec-bar .ok{color:#fff}
#rec-bar .dim{opacity:.7}
#rec-bar .msg{font-weight:600;color:#FFD08A} body.rec-on #rec-bar .msg{color:#fff}
#rec-bar .msg.bad{color:#fff;background:#D33A3A;padding:2px 10px;border-radius:8px}
#rec-help{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:52;width:min(780px,92vw);padding:32px 40px;border-radius:28px;
  background:#0E1F3A;border:2px solid #2A3C5E;color:#E8EEF8;font:400 21px/1.45 Rubik,system-ui,sans-serif;box-shadow:0 24px 80px rgba(0,0,0,.55)}
#rec-help h2{margin:0 0 16px;font:700 28px Rubik,system-ui,sans-serif;color:#fff}
#rec-help .k{display:grid;grid-template-columns:64px 1fr;margin:7px 0}
#rec-help b{color:#FFB35C;font-weight:700}
#rec-help .dim{opacity:.7;margin-top:18px;font-size:18px}
#rec-help.hide{display:none}`;
  document.head.appendChild(css);
  const frame = Object.assign(document.createElement('div'), { id: 'rec-frame' });
  const bar = Object.assign(document.createElement('div'), { id: 'rec-bar' });
  bar.innerHTML = '<span class="dot"></span><span class="state"></span><span class="where"></span><span class="have"></span>' +
    '<span class="meter"><i></i></span><span class="count dim"></span><span class="msg"></span>';
  const help = Object.assign(document.createElement('div'), { id: 'rec-help' });
  const keys = [['R', 'record this click. R again stops and saves it.'],
    ['→', 'next click. While recording it saves this click and keeps recording the next one.'],
    ['←', 'back'], ['D', 'redo this click: throws away what you just said and starts again'], ['P', 'play this click'],
    ['X', 'stop without saving'], ['N', 'notes window with what to say'], ['F', 'full screen'], ['H', 'show or hide this help']];
  help.innerHTML = `<h2>Recording ${CODE}</h2>${keys.map(([k, t]) => `<div class="k"><b>${k}</b><span>${t}</span></div>`).join('')}
<div class="dim">A red frame means it is recording. Only the slide goes into the video, never this bar or this box.</div>`;
  document.body.append(frame, bar, help);
  const $ = (c) => bar.querySelector(c);

  function say(text, bad = false) {
    flash = text;
    $('.msg').className = bad ? 'msg bad' : 'msg';
    clearTimeout(flashTimer);
    if (!bad) flashTimer = setTimeout(() => { flash = ''; tick(); }, 4000);
    tick();
  }

  // the parts that change every moment while recording
  function tick() {
    const secs = recording ? Math.floor((performance.now() - t0) / 1000) : 0;
    $('.state').textContent = !mic ? (micError ? 'NO MIC' : 'MIC…') : recording ? `REC ${fmt(secs)}` : saving ? 'SAVING' : 'READY';
    $('.msg').textContent = flash;
  }

  // everything, after any change of click or state
  function paint() {
    const [i, s] = H.pos(), name = id([i, s]);
    document.body.classList.toggle('rec-on', recording);
    $('.where').textContent = `Slide ${i + 1}/${H.count()} · click ${s}/${H.steps(i)}`;
    $('.have').innerHTML = takes.has(name) ? '<span class="ok">✓ recorded</span>' : '<span class="dim">not recorded</span>';
    let done = 0;
    for (let a = 0; a < H.count(); a++) for (let b = 0; b <= H.steps(a); b++) if (takes.has(id([a, b]))) done++;
    $('.count').textContent = `${done} of ${TOTAL} clicks done`;
    tick();
    H.refreshNotes();
  }
  setInterval(() => { if (recording) tick(); }, 250);

  H.onRender = paint;
  H.notesExtra = () => {
    const name = id(H.pos());
    const head = recording
      ? `<div style="background:#D33A3A;color:#fff;font-weight:700;padding:10px 16px;border-radius:10px;margin-bottom:14px">● RECORDING ${label(id(recAt))}</div>`
      : `<div style="background:#1F2A44;padding:10px 16px;border-radius:10px;margin-bottom:14px">${takes.has(name) ? '<span style="color:#4ADE80">✓ Recorded</span>' : 'Not recorded yet'} · R to record</div>`;
    return head + '<div style="font-size:15px;color:#9CA3AF;margin-bottom:14px">R record / stop · → next (keeps recording) · ← back · D redo · P play · X stop without saving</div>';
  };

  // ---------- microphone ----------
  async function initMic() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { channelCount: 1, sampleRate: 48000, echoCancellation: false, autoGainControl: false, noiseSuppression: true },
      });
      let src;
      try { ctx = new AudioContext({ sampleRate: 48000 }); src = ctx.createMediaStreamSource(stream); }
      catch (e) { ctx = new AudioContext(); src = ctx.createMediaStreamSource(stream); }
      await ctx.audioWorklet.addModule('../../engine/recorder-worklet.js');
      const node = new AudioWorkletNode(ctx, 'hml-capture');
      const mute = ctx.createGain();
      mute.gain.value = 0;
      src.connect(node);
      node.connect(mute).connect(ctx.destination);
      node.port.onmessage = (e) => {
        const b = e.data;
        let p = 0;
        for (let k = 0; k < b.length; k++) { const v = Math.abs(b[k]); if (v > p) p = v; }
        if (p > peak) peak = p;
        if (recording) { chunks.push(b); if (p >= 0.99) clipped++; }
      };
      mic = true;
      meter();
    } catch (err) {
      micError = err.message || String(err);
      say('No microphone: allow it for this page (icon at the left of the address bar), then reload', true);
    }
    paint();
  }

  // level meter: green is fine, yellow is loud, peaks should stay out of yellow most of the time
  function meter() {
    shown = Math.max(peak, shown * 0.9);
    peak = 0;
    const db = shown > 0 ? 20 * Math.log10(shown) : -100;
    const el = $('.meter i');
    el.style.width = `${Math.max(0, Math.min(100, ((db + 60) / 60) * 100))}%`;
    el.className = db > -3 ? 'hot' : '';
    requestAnimationFrame(meter);
  }

  // ---------- recording ----------
  function start() {
    if (!mic) { say(micError ? 'No microphone (see the message above)' : 'Waiting for the microphone', true); return; }
    if (ctx.state === 'suspended') ctx.resume();
    help.classList.add('hide');
    recAt = H.pos(); chunks = []; clipped = 0; t0 = performance.now(); recording = true;
    paint();
  }

  // end the take in progress and save it under the click it was recorded on
  function take() {
    const at = recAt, data = chunks, loud = clipped;
    recording = false; chunks = []; recAt = null;
    const n = data.reduce((a, b) => a + b.length, 0);
    if (n < ctx.sampleRate * 0.3) { say('Too short, not saved'); return; }
    save(id(at), wav(data, n, ctx.sampleRate), loud);
  }

  function stop() { if (recording) take(); paint(); }
  function cancel() { recording = false; chunks = []; recAt = null; say('Stopped, not saved'); paint(); }
  function redo() {
    if (!recording) { start(); return; }
    chunks = []; clipped = 0; t0 = performance.now();
    say('Again: start this click from the beginning');
    paint();
  }
  function nextWhileRecording() {
    const before = H.pos().join();
    take();
    H.next();
    if (H.pos().join() === before) { say('That was the last click'); paint(); return; }
    start();
  }

  async function save(name, blob, loud) {
    saving++; tick();
    try {
      const r = await fetch(`/rec/${CODE}/${name}`, { method: 'PUT', headers: { 'X-HML-Recorder': '1', 'Content-Type': 'audio/wav' }, body: blob });
      if (!r.ok) throw new Error(await r.text());
      takes.add(name);
      if (loud) say(`Saved ${label(name)}, but it was too loud in places: move back a little and redo it`, true);
      else say(`Saved ${label(name)}`);
    } catch (err) {
      say(`NOT SAVED: ${label(name)}. Is "npm run record" still running? (${err.message})`, true);
    }
    saving--;
    paint();
  }

  // 16-bit mono WAV from the captured blocks
  function wav(blocks, n, rate) {
    const buf = new ArrayBuffer(44 + n * 2), v = new DataView(buf);
    const w = (o, s) => { for (let k = 0; k < s.length; k++) v.setUint8(o + k, s.charCodeAt(k)); };
    w(0, 'RIFF'); v.setUint32(4, 36 + n * 2, true); w(8, 'WAVE'); w(12, 'fmt ');
    v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
    v.setUint32(24, rate, true); v.setUint32(28, rate * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true);
    w(36, 'data'); v.setUint32(40, n * 2, true);
    let o = 44;
    for (const b of blocks) for (let k = 0; k < b.length; k++, o += 2) {
      const x = Math.max(-1, Math.min(1, b[k]));
      v.setInt16(o, x < 0 ? x * 0x8000 : x * 0x7fff, true);
    }
    return new Blob([buf], { type: 'audio/wav' });
  }

  function play() {
    if (recording) return;
    const name = id(H.pos());
    if (!takes.has(name)) { say('Nothing recorded for this click yet'); return; }
    if (audio) audio.pause();
    audio = new Audio(`/recordings/${CODE}/${name}.wav?${Date.now()}`);
    audio.play();
    say(`Playing ${label(name)}`);
  }

  // ---------- keys (runtime.js asks here first) ----------
  H.keyHook = (e) => {
    const k = e.key;
    if (ctx && ctx.state === 'suspended') ctx.resume(); // Chrome keeps audio paused until the first key press
    if (e.metaKey || e.ctrlKey || e.altKey) return false;
    const mine = ['r', 'R', 'd', 'D', 'p', 'P', 'x', 'X', 'h', 'H'].includes(k);
    if (e.repeat && (mine || recording)) { e.preventDefault(); return true; }
    if (k === 'r' || k === 'R') { e.preventDefault(); if (recording) stop(); else start(); return true; }
    if (k === 'd' || k === 'D') { e.preventDefault(); redo(); return true; }
    if (k === 'p' || k === 'P') { e.preventDefault(); play(); return true; }
    if (k === 'h' || k === 'H') { help.classList.toggle('hide'); return true; }
    if (k === 'x' || k === 'X' || k === 'Escape') { if (recording) { cancel(); return true; } return k !== 'Escape'; }
    if (!recording) return false;
    if (['ArrowRight', ' ', 'PageDown', 'Enter'].includes(k)) { e.preventDefault(); nextWhileRecording(); return true; }
    if (['ArrowLeft', 'PageUp', 'Backspace'].includes(k)) { e.preventDefault(); stop(); H.prev(); return true; }
    if (k === 'Home' || k === 'End') return true; // not while recording
    return false;
  };

  addEventListener('beforeunload', (e) => { if (recording || saving) { e.preventDefault(); e.returnValue = ''; } });

  fetch(`/rec/${CODE}`)
    .then((r) => r.json())
    .then((j) => { j.takes.forEach((t) => takes.add(t)); paint(); })
    .catch(() => say(`Cannot reach the recorder. Start it with: npm run record ${CODE}`, true));
  paint();
  initMic();
})();
