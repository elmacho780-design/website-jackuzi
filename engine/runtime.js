// Presenter runtime: scales the 1920x1080 stage, steps through clicks, draws arrows.
// Keys: Right / Space / click = next   Left = back   F = fullscreen   N = presenter notes window   Home / End
(function () {
  const stage = document.getElementById('stage');
  const slides = [...document.querySelectorAll('.slide')];
  const EXPORT = /[?&]export=1/.test(location.search);
  if (EXPORT) document.body.classList.add('export');
  let si = 0, st = 0, scale = 1;

  function fit() {
    scale = Math.min(innerWidth / 1920, innerHeight / 1080);
    stage.style.transform = `translate(-50%,-50%) scale(${scale})`;
    stage.style.transformOrigin = '50% 50%';
  }
  const maxStep = (s) => Math.max(0, ...[...s.querySelectorAll('[data-step]')].map((e) => +e.dataset.step));

  function render() {
    // every slide gets a state: slides before the current one show everything,
    // slides after it show nothing yet, so nothing flickers when you move between them
    slides.forEach((sl, i) => {
      sl.classList.toggle('active', i === si);
      const k = i === si ? st : (i < si ? 1e9 : 0);
      sl.querySelectorAll('[data-step]').forEach((e) => e.classList.toggle('pending', +e.dataset.step > k));
      sl.querySelectorAll('[data-only]').forEach((e) => e.classList.toggle('pending', +e.dataset.only !== k));
    });
    if (!EXPORT) history.replaceState(null, '', `#${si + 1}.${st}`);
    updateNotes();
  }

  // ---------- presenter notes (press N): opens a second window with what to say ----------
  let notesWin = null;
  function openNotes() {
    notesWin = window.open('', 'hml-notes', 'width=720,height=900');
    if (!notesWin) return;
    notesWin.document.title = 'Notes';
    notesWin.document.body.style.cssText = 'margin:0;padding:28px;font:22px/1.5 system-ui,sans-serif;background:#111827;color:#E5E7EB';
    updateNotes();
  }
  function updateNotes() {
    if (!notesWin || notesWin.closed) return;
    const s = slides[si];
    const max = maxStep(s);
    const parts = (s.dataset.say || '').split('[click]');
    const esc = (x) => x.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    notesWin.document.body.innerHTML =
      `<div style="font-size:16px;letter-spacing:.06em;text-transform:uppercase;color:#9CA3AF">Slide ${si + 1} of ${slides.length} · click ${st} of ${max}${s.dataset.time ? ' · ' + s.dataset.time : ''}</div>` +
      parts.map((p, i) => `<p style="margin:18px 0">${i ? '<span style="color:#F59E0B;font-weight:700">[click]</span> ' : ''}${esc(p.trim())}</p>`).join('');
  }
  function next() { if (st < maxStep(slides[si])) st++; else if (si < slides.length - 1) { si++; st = 0; } render(); }
  function prev() { if (st > 0) st--; else if (si > 0) { si--; st = maxStep(slides[si]); } render(); }

  // ---------- connectors ----------
  const NS = 'http://www.w3.org/2000/svg';
  const COLORS = { navy: '#174875', sun: '#E35D0B', grey: '#9AA6B8', green: '#14905A', red: '#D33A3A' };
  function box(slide, id) {
    const el = slide.querySelector(`[data-anchor="${id}"]`);
    if (!el) return null;
    const r = el.getBoundingClientRect(), o = slide.getBoundingClientRect();
    const k = o.width / 1920;
    return { x: (r.left - o.left) / k, y: (r.top - o.top) / k, w: r.width / k, h: r.height / k };
  }
  function side(b, s) {
    switch (s) {
      case 'left': return [b.x, b.y + b.h / 2];
      case 'right': return [b.x + b.w, b.y + b.h / 2];
      case 'top': return [b.x + b.w / 2, b.y];
      case 'bottom': return [b.x + b.w / 2, b.y + b.h];
      default: return [b.x + b.w / 2, b.y + b.h / 2];
    }
  }
  function drawWires(slide) {
    const spec = slide.dataset.wires ? JSON.parse(slide.dataset.wires) : [];
    slide.querySelectorAll('svg.wires').forEach((n) => n.remove());
    if (!spec.length) return;
    const wasActive = slide.classList.contains('active');
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'wires');
    svg.setAttribute('viewBox', '0 0 1920 1080');
    const defs = document.createElementNS(NS, 'defs');
    svg.appendChild(defs);
    const markers = {};
    const marker = (col) => {
      if (markers[col]) return markers[col];
      const id = `m${Object.keys(markers).length}${Math.random().toString(36).slice(2, 6)}`;
      const m = document.createElementNS(NS, 'marker');
      m.setAttribute('id', id); m.setAttribute('viewBox', '0 0 12 12'); m.setAttribute('refX', '7'); m.setAttribute('refY', '6');
      m.setAttribute('markerWidth', '5'); m.setAttribute('markerHeight', '5'); m.setAttribute('orient', 'auto-start-reverse');
      const p = document.createElementNS(NS, 'path'); p.setAttribute('d', 'M1 1.5L10 6 1 10.5z'); p.setAttribute('fill', col);
      m.appendChild(p); defs.appendChild(m); markers[col] = id; return id;
    };
    for (const w of spec) {
      const a = box(slide, w.from), b = box(slide, w.to);
      if (!a || !b) continue;
      const col = COLORS[w.color || (w.kind === 'arc' ? 'navy' : 'navy')];
      let d;
      if (w.kind === 'arc') {
        const sameLine = Math.abs((a.y + a.h / 2) - (b.y + b.h / 2)) < a.h * 0.5;
        if (sameLine) {
          // pronoun and its word on one line: arc over the top
          const [x1, y1] = [a.x + a.w / 2, a.y + 4];
          const [x2, y2] = [b.x + b.w / 2, b.y + 4];
          const h = Math.min(70, 26 + Math.abs(x1 - x2) * 0.12);
          const top = Math.min(y1, y2) - h;
          d = `M${x1} ${y1 - 6} C ${x1} ${top}, ${x2} ${top}, ${x2} ${y2 - 10}`;
        } else if (Math.abs(a.x - b.x) < 24) {
          // both start the line: a bracket in the left margin
          const ya = a.y + a.h / 2, yb = b.y + b.h / 2, x = Math.min(a.x, b.x);
          d = `M${a.x - 12} ${ya} C ${x - 58} ${ya}, ${x - 58} ${yb}, ${b.x - 18} ${yb}`;
        } else {
          // pronoun on a lower line: S-curve up to the word it replaces
          const x1 = a.x + a.w / 2, y1 = a.y + 2, x2 = b.x + b.w / 2, y2 = b.y + b.h + 8;
          const my = (y1 + y2) / 2;
          d = `M${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`;
        }
      } else {
        const fs = w.fromSide || 'right', ts = w.toSide || 'left';
        let [x1, y1] = side(a, fs), [x2, y2] = side(b, ts);
        const g1 = w.gap == null ? 14 : w.gap, g2 = w.gapEnd == null ? 22 : w.gapEnd;
        const off = { left: [-1, 0], right: [1, 0], top: [0, -1], bottom: [0, 1] };
        x1 += off[fs][0] * g1; y1 += off[fs][1] * g1; x2 += off[ts][0] * g2; y2 += off[ts][1] * g2;
        if (w.kind === 'line') d = `M${x1} ${y1} L ${x2} ${y2}`;
        else if (fs === 'bottom' || fs === 'top') {
          const my = (y1 + y2) / 2; d = `M${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`;
        } else {
          const mx = (x1 + x2) / 2; d = `M${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
        }
      }
      const p = document.createElementNS(NS, 'path');
      p.setAttribute('d', d); p.setAttribute('stroke', col); p.setAttribute('stroke-width', w.width || 5);
      if (w.dash) p.setAttribute('stroke-dasharray', w.dash);
      p.setAttribute('marker-end', `url(#${marker(col)})`);
      if (w.step != null) p.setAttribute('data-step', w.step);
      svg.appendChild(p);
    }
    slide.appendChild(svg);
    if (!wasActive) slide.classList.remove('active');
  }
  function drawAll() {
    // measure each slide while it is laid out (visibility hidden still has layout)
    slides.forEach(drawWires);
    render();
  }

  // ---------- input ----------
  addEventListener('keydown', (e) => {
    if (['ArrowRight', ' ', 'PageDown', 'Enter'].includes(e.key)) { e.preventDefault(); next(); }
    else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(e.key)) { e.preventDefault(); prev(); }
    else if (e.key === 'Home') { si = 0; st = 0; render(); }
    else if (e.key === 'End') { si = slides.length - 1; st = maxStep(slides[si]); render(); }
    else if (e.key === 'n' || e.key === 'N') { openNotes(); }
    else if (e.key === 'f' || e.key === 'F') { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen(); }
  });
  addEventListener('click', (e) => { if (e.clientX < innerWidth * 0.2) prev(); else next(); });
  let idle; addEventListener('mousemove', () => { document.body.classList.remove('idle'); clearTimeout(idle); idle = setTimeout(() => document.body.classList.add('idle'), 1500); });
  addEventListener('resize', fit);

  // ---------- start ----------
  fit();
  const h = location.hash.match(/^#(\d+)(?:\.(\d+))?/);
  if (h) { si = Math.min(slides.length - 1, +h[1] - 1); st = +(h[2] || 0); }
  render();
  const ready = document.fonts.ready.then(() => Promise.all([...document.images].map((im) => im.complete ? 1 : new Promise((r) => { im.onload = im.onerror = r; })))).then(() => { drawAll(); });

  // API used by the exporter and the checker
  window.HML = {
    ready,
    count: () => slides.length,
    steps: (i) => maxStep(slides[i]),
    go: (i, s) => { si = i; st = s; render(); },
  };
})();
