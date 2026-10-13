// Every slide layout. Each returns { html, wires, cls }.
// wires = connectors the runtime draws once fonts are loaded:
//   { from, to, fromSide, toSide, step, color, kind }  kind: 'arc' (pronoun arrow) | 'curve' | 'line'
//
// Steps (clicks): every layout reveals things in the order the lesson's "Build" line asks for.
// Any item can override with  "step": 3  (a click number)  or  "step": 0  (visible from the start)
// or  "with": "prev"  (appears together with the item before it).

const { md, pair, pairA, icon, step, callout, counter } = require('./lib');
const { diagram } = require('./diagrams');

const L = {};

// step helper: honours "step" / "with" overrides on an item
function take(c, item) {
  if (item && typeof item === 'object') {
    if (typeof item.step === 'number') { if (item.step > c.cur()) c.set(item.step); return item.step; }
    if (item.with === 'prev') return Math.max(c.cur(), 1);
  }
  return c.next();
}

// ---------- shared pieces ----------
const svgArrow = (dir = 'right', size = 54, color = 'var(--brand)') => {
  const paths = {
    right: 'M4 20h40M32 8l12 12-12 12',
    left: 'M44 20H4M16 8L4 20l12 12',
    down: 'M24 2v36M12 26l12 12 12-12',
    up: 'M24 38V2M12 14L24 2l12 12',
  };
  const vb = dir === 'down' || dir === 'up' ? '0 0 48 40' : '0 0 48 40';
  return `<svg class="arr" viewBox="${vb}" width="${size}" height="${Math.round(size * 0.84)}"><path d="${paths[dir]}" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
};
const intonation = (dir) => `<svg class="inton" viewBox="0 0 48 48" width="56" height="56"><path d="${dir === 'up' ? 'M8 38L38 10M20 10h18v18' : 'M8 10l30 28M38 20v18H20'}" fill="none" stroke="var(--hl)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const xIcon = () => '<svg viewBox="0 0 24 24" width="26" height="26"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="3.6" stroke-linecap="round"/></svg>';
const tickIcon = () => '<svg viewBox="0 0 24 24" width="26" height="26"><path d="M4.5 12.5l5 5L19.5 7" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

// A picture made of icons: "boy", "boy+girl", "girl@speech-balloon", "boy>backpack" (owner -> thing),
// "diagram:in" (box and ball), or "no:automobile" (crossed out)
function pic(spec, size) {
  if (!spec) return '';
  if (spec.startsWith('diagram:')) return diagram(spec.slice(8), size);
  if (spec.includes('>')) {
    const [a, b] = spec.split('>');
    return `<span class="owner">${pic(a, Math.round(size * 0.8))}${svgArrow('right', 46)}${pic(b, Math.round(size * 0.8))}</span>`;
  }
  if (spec.startsWith('no:')) return `<span class="crossed">${icon(spec.slice(3), size)}<span class="xmark">${xIcon()}</span></span>`;
  return icon(spec, size);
}

// Chips and small pieces used inside rows: see CLAUDE.md "Tokens"
function token(t, wires) {
  if (typeof t === 'string') return `<span class="chip soft"><span>${md(t)}</span></span>`;
  const id = t.id ? ` data-anchor="${t.id}"` : '';
  let h;
  if (t.chip != null) {
    const tone = t.tone || 'soft';
    const strike = tone === 'strike';
    h = `<span class="chip ${strike ? 'strike' : tone} ${t.size || ''}"${t.sub ? '' : id}><span>${strike ? `<s>${md(t.chip)}</s>` : md(t.chip)}</span></span>`;
    if (t.sub) h = `<span class="tok-sub"${id}>${h}<span class="sub">${typeof t.sub === 'string' ? md(t.sub) : pair(t.sub, 'xs')}</span></span>`;
    return h;
  }
  if (t.arrow) return `<span class="tok-arrow"${id}>${svgArrow(t.arrow === true ? 'right' : t.arrow, t.size || 54)}</span>`;
  if (t.plus) return '<span class="tok-sign">+</span>';
  if (t.eq) return '<span class="tok-sign">=</span>';
  if (t.text != null) return `<span class="tok-text ${t.size || ''}"${id}>${md(t.text)}</span>`;
  if (t.pair) return `<span class="tok-pair"${id}>${pair(t.pair, t.size || 'sm')}</span>`;
  if (t.icon) return `<span class="tok-icon"${id}>${pic(t.icon, t.size || 96)}</span>`;
  if (t.intonation) return `<span class="tok-inton">${intonation(t.intonation)}</span>`;
  if (t.label) return `<span class="tok-label">${pair(t.label, 'xs')}</span>`;
  if (t.link) return `<span class="tok-link"${id}><span>${md(t.link[0])}</span><svg viewBox="0 0 60 30" width="60" height="30"><path d="M4 6 Q30 34 56 6" fill="none" stroke="var(--brand)" stroke-width="5" stroke-linecap="round"/></svg><span>${md(t.link[1])}</span></span>`;
  return '';
}
const row = (tokens) => tokens.map((t) => token(t)).join('');

// A picture panel built from positioned icons.
// scene: { w, h, items: [{ icon, x, y, size, step, ring, tag }], dots: [[x1,y1,x2,y2]] }
function scene(sc, c) {
  const items = (sc.items || []).map((it) => {
    const st = it.step != null ? step(it.step) : '';
    const ring = it.ring != null ? `<span class="ring" data-only="${it.ring}" style="left:${it.x - 14}px;top:${it.y - 14}px;width:${it.size + 28}px;height:${it.size + 28}px"></span>` : '';
    const tag = it.tag ? `<span class="tag" style="left:${it.x + it.size / 2}px;top:${it.y + it.size - 6}px">${md(it.tag)}</span>` : '';
    return `${ring}<span class="sc-item" ${st} style="left:${it.x}px;top:${it.y}px">${pic(it.icon, it.size)}</span>${tag}`;
  }).join('');
  const dots = (sc.dots || []).map(([x1, y1, x2, y2]) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#9AA6B8" stroke-width="4" stroke-dasharray="2 12" stroke-linecap="round"/>`).join('');
  return `<div class="scene" style="width:${sc.w || 600}px;height:${sc.h || 560}px">
    ${dots ? `<svg class="sc-dots" width="${sc.w || 600}" height="${sc.h || 560}">${dots}</svg>` : ''}${items}</div>`;
}

// ---------- 1. Title ----------
L.title = (s, lesson) => {
  const hero = (s.hero || []).slice(0, 3);
  const pos = {
    1: [[140, 140, 420]],
    2: [[60, 190, 320], [330, 190, 320]],
    3: [[175, 85, 350], [45, 400, 230], [425, 400, 230]],
  }[hero.length] || [];
  const imgs = hero.map((h, i) => `<span class="hero-item" style="left:${pos[i][0]}px;top:${pos[i][1]}px">${pic(h, pos[i][2])}</span>`).join('');
  return {
    cls: 'dark s-title',
    html: `
      <div class="glow"></div>
      <div class="ring"></div>
      <div class="hero">${imgs}</div>
      <div class="tblock">
        <div class="meta"><span class="chip code">${lesson.code}</span><span class="chip lvl">${lesson.level}</span></div>
        <h1>${md(lesson.title.en)}</h1>
        <div class="tmn">${md(lesson.title.mn)}</div>
      </div>
      <div class="promise"><span class="dot"></span>${pair(s.promise)}</div>`,
  };
};

// ---------- 2. Two panels side by side (before / after) ----------
L.panels = (s) => {
  const c = counter();
  const panels = s.panels.map((p) => `
    <div class="card panel ${p.tone || ''}" ${step(take(c, p))}>
      <div class="phead">
        <div class="avatar">${icon(p.icon, 96)}${p.tag ? `<span class="tag">${md(p.tag)}</span>` : ''}</div>
        ${pair(p.label, 'xs')}
      </div>
      <div class="plines">${p.lines.map((l) => pair(l, 'sm')).join('')}</div>
    </div>`).join('');
  return { html: `<div class="body"><div class="panels">${panels}</div>${callout(s.explain, c.next())}</div>` };
};

// ---------- 3. Story: a picture on the left, lines on the right ----------
L.story = (s) => {
  const c = counter();
  const lines = s.lines.map((l) => `<div class="st-line" ${step(take(c, l))}>${pair(l, s.size || 'sm')}</div>`).join('');
  const picture = s.scene ? scene(s.scene, c) : `<div class="st-pic">${pic(s.icon, s.iconSize || 300)}${s.tag ? `<span class="tag big">${md(s.tag)}</span>` : ''}</div>`;
  const ex = Array.isArray(s.explain) ? s.explain : (s.explain ? [s.explain] : []);
  return { html: `<div class="body"><div class="story"><div class="st-left">${picture}</div><div class="st-lines">${lines}</div></div>${ex.map((e) => callout(e, take(c, e))).join('')}</div>` };
};

// ---------- 4. Cards (2x2, 3 in a row, 4 in a row, 5 in a row) ----------
// card: { icon, label:{en,mn}, en, mn, chips:[token], word, gloss }
L.cards = (s, lesson, shared) => {
  const c = shared || counter();
  const wires = [];
  const cols = s.cols || 2;
  const tall = cols >= 3 || !!s.iconTop;
  const cards = s.cards.map((k) => {
    const n = take(c, k);
    let body = '';
    let arc = false;
    if (k.en != null) {
      const a = pairA(k, tall ? 'sm' : '');
      body = a.html;
      if (a.targets.length && a.refs.length) { wires.push({ from: a.targets[0], to: a.refs[0], kind: 'arc', step: n }); arc = true; }
    }
    if (k.word != null) body = `<div class="kword">${md(k.word)}</div>${k.gloss ? (typeof k.gloss === 'object' ? `<div class="kgloss2">${pair(k.gloss, 'xs')}</div>` : `<div class="kgloss">${md(k.gloss)}</div>`) : ''}` + body;
    const lab = k.label ? `<div class="klabel">${pair(k.label, 'xs')}</div>` : '';
    const extra = k.chips ? `<div class="kchips">${row(k.chips)}</div>` : '';
    const picture = k.icon ? pic(k.icon, k.iconSize || (tall ? 140 : 104)) : '';
    return `<div class="card kcard ${arc ? 'has-arc' : ''} ${k.word != null ? 'is-word' : ''}" ${step(n)}>
      ${lab}<div class="krow">${tall ? picture : ''}<div class="ktext">${body}${extra}</div>${!tall ? picture : ''}</div></div>`;
  }).join('');
  const lead = s.lead ? `<div class="lead">${pair(s.lead, 'sm')}</div>` : '';
  const plain = (t) => String(t || '').replace(/\*\*|~~|__|\[\^\]/g, '');
  const maxLen = Math.max(0, ...s.cards.map((k) => (k.en && !k.en.includes('\n') ? plain(k.en).length : 99)));
  const big = s.size === 'lg' || (s.size == null && ((cols === 2 && maxLen <= 24) || (cols === 3 && maxLen <= 20)));
  const ex = Array.isArray(s.explain) ? s.explain : (s.explain ? [s.explain] : []);
  return { html: `<div class="body">${lead}<div class="cards c${cols} ${s.compact ? 'compact' : ''} ${big ? 'big' : ''} ${s.size === 'sm' ? 'small' : ''} ${s.iconTop ? 'icon-top' : ''}">${cards}</div>${ex.map((e) => callout(e, take(c, e))).join('')}</div>`, wires };
};

// ---------- 5. Grid with row and column labels ----------
L.grid = (s) => {
  const c = counter();
  const head = `<div class="g-corner"></div>` + s.cols.map((h) => `<div class="g-col">${pair(h, 'xs')}</div>`).join('');
  const cellSteps = s.cellSteps; // optional [[1,2],[3,4]]
  const rows = s.rows.map((r, ri) => {
    const n = cellSteps ? 0 : take(c, r);
    return `<div class="g-row" ${step(cellSteps ? null : n)}>${r.icon ? pic(r.icon, 84) : ''}${pair(r.label, 'xs')}</div>` +
      r.cells.map((x, ci) => `<div class="g-cell" ${step(cellSteps ? cellSteps[ri][ci] : n)}><div class="w">${md(x.word)}</div><div class="m">${md(x.mn)}</div></div>`).join('');
  }).join('');
  if (cellSteps) c.set(Math.max(...cellSteps.flat()));
  return { html: `<div class="body"><div class="grid" style="grid-template-columns:${s.labelWidth || 420}px repeat(${s.cols.length},1fr)">${head}${rows}</div>${callout(s.explain, c.next())}</div>` };
};

// ---------- 6. Converge: several words -> one word ----------
L.converge = (s) => {
  const c = counter();
  const together = s.build === 'together';
  const first = c.next();
  const wires = [];
  const items = s.items.map((it, i) => {
    const n = together ? first : (i === 0 ? first : c.next());
    const id = `cv${i}`;
    wires.push({ from: id, to: 'cvT', fromSide: 'right', toSide: 'left', kind: 'curve', step: n });
    return `<div class="cv-item" ${step(n)}>
      <div class="cv-pic">${pic(it.icon, 104)}</div>
      <div class="cv-word" data-anchor="${id}"><span class="chip grey lg">${md(it.chip)}</span>${pair(it.label, 'xs')}</div>
    </div>`;
  }).join('');
  return {
    html: `<div class="body"><div class="converge"><div class="cv-list">${items}</div>
      <div class="cv-target" ${step(first)}><span class="chip navy xl" data-anchor="cvT">${md(s.target)}</span></div></div>
      ${callout(s.explain, c.next())}</div>`,
    wires,
  };
};

// ---------- 7. Split: one word on the left -> several rows on the right ----------
L.split = (s) => {
  const c = counter();
  const wires = [];
  const rows = s.rows.map((r, i) => {
    const n = take(c, r);
    wires.push({ from: 'spSrc', to: `spR${i}`, fromSide: 'right', toSide: 'left', kind: 'curve', step: n });
    const items = (r.items || []).map((it) => `<div class="sp-item">${pair(it, 'xs')}</div>`).join('');
    return `<div class="card sp-row" ${step(n)}>
      <span class="chip navy sp-chip" data-anchor="spR${i}">${md(r.word)}</span>
      ${pic(r.icon, 88)}
      <div class="sp-gloss">${pair(r.head, 'xs')}</div>
      <div class="sp-items">${items}</div>
    </div>`;
  }).join('');
  return {
    html: `<div class="body"><div class="split"><div class="sp-src"><span class="chip grey xl" data-anchor="spSrc">${md(s.source)}</span>${s.sourceLabel ? pair(s.sourceLabel, 'xs') : ''}</div>
      <div class="sp-rows">${rows}</div></div>${callout(s.explain, c.next())}</div>`,
    wires,
  };
};

// ---------- 8. Columns: 2 or 3 side by side, each with a header ----------
// column: { icon, word, head:{en,mn}, items:[ "chip" | {en,mn} | {chip,tone} ], hint, note }
L.columns = (s) => {
  const c = counter();
  const wires = [];
  const cols = s.columns.map((col, i) => {
    const n = take(c, col);
    if (s.top) wires.push({ from: 'colTop', to: `colH${i}`, fromSide: 'bottom', toSide: 'top', kind: 'curve', step: n });
    const items = (col.items || []).map((it) => {
      if (typeof it === 'string' || it.chip != null) return token(it);
      return `<div class="citem ${col.plain || it.plain ? 'plain' : ''} ${it.wide ? 'wide' : ''}">${pair(it, it.size || col.size || 'xs')}</div>`;
    }).join('');
    const headWord = col.word != null ? `<span class="chip navy">${md(col.word)}</span>` : '';
    return `<div class="card col ${col.tone || ''} ${col.big ? 'big' : ''}" ${step(n)}>
      <div class="chead" data-anchor="colH${i}">${col.icon ? pic(col.icon, col.iconSize || 92) : ''}${headWord}${col.head && !headWord ? pair(col.head, 'sm') : ''}</div>
      ${col.head && headWord ? `<div class="cgloss">${pair(col.head, 'xs')}</div>` : ''}
      <div class="citems ${col.stack ? 'stack' : ''}">${items}</div>
      ${col.hint ? `<div class="chint">${token(col.hint)}</div>` : ''}
    </div>`;
  }).join('');
  const top = s.top ? `<div class="ctop"><span class="chip grey lg" data-anchor="colTop">${md(s.top)}</span></div>` : '';
  const ex = Array.isArray(s.explain) ? s.explain : (s.explain ? [s.explain] : []);
  const below = s.below ? `<div class="cbelow" ${step(take(c, s.below))}>${row(s.below.row)}${s.below.label ? `<span class="tok-label">${pair(s.below.label, 'xs')}</span>` : ''}</div>` : '';
  return { html: `<div class="body ${s.top ? 'has-top' : ''}">${top}<div class="cols c${s.columns.length}">${cols}</div>${below}${ex.map((e) => callout(e, take(c, e))).join('')}</div>`, wires };
};

// ---------- 9. Two numbered rules ----------
L.rules2 = (s) => {
  const c = counter();
  const cards = s.rules.map((r) => {
    const n = take(c, r);
    let inner = '';
    if (r.items) inner = r.items.map((it) => pair(it, 'sm')).join('');
    if (r.flips) inner = r.flips.map((f) => `<div class="flip"><div class="fmn">${md(f.mn)}</div><div class="fdown">${svgArrow('down', 40)}</div><div class="fen">${md(f.en)}</div></div>`).join('');
    return `<div class="card rule" ${step(n)}>
      <div class="rhead"><span class="num">${r.num}</span>${pair(r.head, 'sm')}</div>
      <div class="rbody ${r.flips ? 'flips' : ''}">${inner}</div></div>`;
  }).join('');
  return { html: `<div class="body"><div class="rules2">${cards}</div>${callout(s.explain, c.next())}</div>` };
};

// ---------- 10. Dialogue: speech bubbles ----------
// speakers: { Name: { icon, side: 'a'|'b' } }, lines: [{ who, en, mn }]
L.dialogue = (s) => {
  const c = counter();
  const sp = s.speakers || {};
  const bubbles = s.lines.map((l) => {
    const who = sp[l.who] || {};
    return `<div class="bub-row ${who.side || 'a'}" ${step(take(c, l))}>
      <div class="bub-who">${pic(who.icon, 76)}<span class="bub-name">${md(l.who)}</span></div>
      <div class="bubble ${who.side || 'a'}">${pair(l, 'xs')}</div></div>`;
  });
  const cols = s.cols || (s.lines.length > 4 ? 2 : 1);
  let inner;
  if (cols === 2) {
    const half = Math.ceil(bubbles.length / 2);
    inner = `<div class="dcol">${bubbles.slice(0, half).join('')}</div><div class="dcol">${bubbles.slice(half).join('')}</div>`;
  } else inner = `<div class="dcol">${bubbles.join('')}</div>`;
  const ex = Array.isArray(s.explain) ? s.explain : (s.explain ? [s.explain] : []);
  return { html: `<div class="body"><div class="dialogue c${cols}">${inner}</div>${ex.map((e) => callout(e, take(c, e))).join('')}</div>` };
};

// ---------- 11. Stack: any mix of rows, tables, pairs and callouts, top to bottom ----------
// blocks: [{ row:[tokens], mn, label, center }, { table:{ head, rows, cols } }, { pair, size },
//          { callout }, { cards:[...], cols }, { side:[block, block] }, { space: 20 }]
L.stack = (s) => {
  const c = counter();
  const wires = (s.wires || []).slice();
  const render = (b) => {
    if (b.space) return `<div style="height:${b.space}px;flex:none"></div>`;
    if (b.side) return `<div class="b-side" style="${b.gap ? `gap:${b.gap}px;` : ''}${b.cols ? `grid-template-columns:${b.cols};grid-auto-flow:row;justify-content:center;` : ''}">${b.side.map(render).join('')}</div>`;
    if (b.callout) return callout(b.callout, take(c, b));
    if (b.group) return `<div class="b-group ${b.card ? 'card' : ''}">${b.group.map(render).join('')}</div>`;
    if (b.table) {
      const t = b.table;
      const perRow = !!t.perRow; // true: each row appears on its own click
      const n = perRow || b.step === 0 ? null : take(c, b);
      const cols = t.cols || `repeat(${(t.head || t.rows[0].cells || t.rows[0]).length}, auto)`;
      const head = t.head ? t.head.map((h) => `<div class="t-head">${h ? pair(h, 'xs') : ''}</div>`).join('') : '';
      const rows = t.rows.map((r) => {
        const cells = r.cells || r;
        const rn = perRow ? (r.step === 0 ? null : take(c, r)) : null;
        return cells.map((x, i) => `<div class="t-cell ${t.boxed === false ? '' : 'boxed'} ${(t.tones && t.tones[i]) || ''}" ${step(rn)}>${cell(x)}</div>`).join('');
      }).join('');
      return `<div class="b-table ${t.cls || ''} ${t.card ? 'card' : ''}" style="grid-template-columns:${cols}" ${step(n)}>${head}${rows}</div>`;
    }
    const n = b.step === 0 ? null : take(c, b);
    if (b.row) {
      const lab = b.label ? `<span class="tok-label rowlab">${pair(b.label, 'xs')}</span>` : '';
      const under = b.mn ? `<div class="row-mn">${md(b.mn)}</div>` : (b.under ? `<div class="row-under">${pair(b.under, 'xs')}</div>` : '');
      return `<div class="b-row ${b.center ? 'center' : ''} ${b.card ? 'card' : ''} ${b.size || ''} ${b.cls || ''}" ${step(n)}>${lab}<div class="row-main"><div class="toks">${row(b.row)}</div>${under}</div></div>`;
    }
    if (b.pair) return `<div class="b-pair ${b.card ? 'card' : ''} ${b.cls || ''}" ${step(n)}>${pair(b.pair, b.size || '')}</div>`;
    if (b.cards) {
      const k = L.cards({ cards: b.cards, cols: b.cols || b.cards.length, compact: true, size: b.size }, null, c);
      wires.push(...(k.wires || []));
      return k.html.replace(/^<div class="body">/, '').replace(/<\/div>$/, '');
    }
    return '';
  };
  const html = s.blocks.map(render).join('');
  return { html: `<div class="body ${s.center ? 'center' : ''} ${s.flow ? 'flow' : ''}">${html}</div>`, wires, cls: s.cls };
};

function cell(x) {
  if (x == null || x === '') return '';
  if (typeof x === 'string') return `<span class="t-text">${md(x)}</span>`;
  if (Array.isArray(x)) return `<span class="toks">${row(x)}</span>`;
  if (x.en != null || x.mn != null) return pair(x, x.size || 'xs');
  return token(x);
}

// ---------- 12. Watch out ----------
L.watchout = (s) => {
  const c = counter();
  const plain = (t) => String(t || '').replace(/\*\*|~~|__|\[\^\]/g, '');
  const longest = Math.max(...s.mistakes.flatMap((m) => [m.wrong, m.right.en]).map((t) => Math.max(...plain(t).split('\n').map((x) => x.length))));
  const multi = s.mistakes.some((m) => (m.wrong + m.right.en).includes('\n'));
  const big = s.size === 'lg' || (s.size == null && longest <= 22 && !multi);
  const ms = s.mistakes.map((m) => {
    const w = c.next(), r = c.next();
    return `<div class="mcard">
      <div class="mwrong" ${step(w)}><span class="verdict bad">${xIcon()}Буруу</span><div class="sent">${md(m.wrong)}</div></div>
      <div class="mright" ${step(r)}><span class="verdict good">${tickIcon()}Зөв</span>${pair(m.right, 'xs')}</div>
    </div>`;
  }).join('');
  return {
    cls: 's-watch',
    html: `<div class="body"><div class="wcontext">${icon('warning', 84)}${pair(s.context, 'sm')}</div><div class="mistakes c${s.mistakes.length} ${big ? 'big' : ''}">${ms}</div></div>`,
  };
};

// ---------- 13. Model text ----------
L.model = (s) => {
  const c = counter();
  const cols = s.cols || 1;
  const lines = s.lines.map((l) => `<div class="mline" ${step(take(c, l))}><span class="mdot"></span>${pair(l, s.size || 'sm')}</div>`);
  let inner;
  if (cols === 2) {
    const half = s.split || Math.ceil(lines.length / 2);
    inner = `<div class="mcol">${lines.slice(0, half).join('')}</div><div class="mcol">${lines.slice(half).join('')}</div>`;
  } else inner = `<div class="mcol">${lines.join('')}</div>`;
  let picture = '';
  if (s.scene) picture = `<div class="mpic">${scene(s.scene, c)}</div>`;
  else if (s.icon) picture = `<div class="mpic">${pic(s.icon, s.iconSize || 320)}</div>`;
  const band = s.band ? `<div class="mband">${s.band.map((b) => `<span class="sc-item" ${b.step != null ? step(b.step) : ''}>${pic(b.icon || b, b.size || 110)}</span>`).join('')}</div>` : '';
  return { html: `<div class="body">${band}<div class="model ${picture ? 'with-pic' : ''}">${picture}<div class="card mpaper c${cols}">${inner}</div></div></div>` };
};

// ---------- 14. Summary ----------
L.summary = (s) => {
  const c = counter();
  const items = s.cards.map((k, i) => `<div class="item" ${step(take(c, k))}><span class="num">${i + 1}</span>${pair(k)}</div>`).join('');
  return {
    cls: 'dark s-summary',
    html: `<div class="glow"></div>
      <div class="shead"><div class="en">Remember</div><div class="mn">Санаж ав</div>${pic(s.icon || 'light-bulb', 190)}</div>
      <div class="list">${items}</div>`,
  };
};

module.exports = L;
