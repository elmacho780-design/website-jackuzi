// Shared building blocks for every layout.
// Inline markup used in content files:
//   **word**   target word (the grammar point), orange highlight
//   ~~word~~   the mistake in a wrong sentence, red strike-through
//   __word__   the word a pronoun points back to (draws an arrow from the **target** to it)
//   [^]        a missing word in a wrong sentence (red caret)
//   ->         an arrow
//   [ipa:ə]    IPA symbol (uses the IPA font)
//   !!words!!  wrong word order (red wavy underline, not crossed out)
//   ((u))      a letter in a small circle (first-letter sound)
//   [up] [down]  voice goes up / down (small orange arrow)

const path = require('path');

let ANCHOR = 0;
const nextId = (p) => `${p}${++ANCHOR}`;

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const ARROW_SVG = '<span class="ar"><svg viewBox="0 0 40 26"><path d="M2 13h32M24 3l11 10-11 10" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';

// Convert inline markup to HTML. Returns {html, targets, refs} when opts.anchors is true.
function md(text, opts = {}) {
  if (text == null) return '';
  let s = esc(text);
  const targets = [], refs = [];
  s = s.replace(/\[ipa:([^\]]+)\]/g, '<span class="ipa">$1</span>');
  s = s.replace(/\*\*(.+?)\*\*/g, (_, w) => {
    const id = nextId('t'); targets.push(id);
    return `<b class="t" data-anchor="${id}">${w}</b>`;
  });
  s = s.replace(/~~(.+?)~~/g, '<s class="x">$1</s>');
  s = s.replace(/!!(.+?)!!/g, '<span class="xo">$1</span>');
  s = s.replace(/\(\((.+?)\)\)/g, '<span class="circ">$1</span>');
  s = s.replace(/\[up\]/g, '<span class="io"><svg viewBox="0 0 48 48"><path d="M8 38L38 10M20 10h18v18" fill="none" stroke="#E35D0B" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>');
  s = s.replace(/\[down\]/g, '<span class="io"><svg viewBox="0 0 48 48"><path d="M8 10l30 28M38 20v18H20" fill="none" stroke="#E35D0B" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>');
  s = s.replace(/__(.+?)__/g, (_, w) => {
    const id = nextId('r'); refs.push(id);
    return `<span class="ref" data-anchor="${id}">${w}</span>`;
  });
  s = s.replace(/\[\^\]/g, '<span class="gap"><svg viewBox="0 0 20 20"><path d="M3 15L10 4l7 11" fill="none" stroke="#D33A3A" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>');
  s = s.replace(/-&gt;/g, ARROW_SVG);
  if (s.includes('\n')) s = s.split('\n').map((x) => `<span class="ln">${x}</span>`).join('');
  if (opts.anchors) return { html: s, targets, refs };
  return s;
}

// English line with its Mongolian line directly underneath.
function pair(p, cls = '', attrs = '') {
  if (!p) return '';
  const en = p.en != null ? `<div class="en">${md(p.en)}</div>` : '';
  const mn = p.mn != null ? `<div class="mn">${md(p.mn)}</div>` : '';
  return `<div class="pair ${cls}" ${attrs}>${en}${mn}</div>`;
}

// Same as pair, but returns anchor ids for pronoun arrows.
function pairA(p, cls = '', attrs = '') {
  const a = md(p.en, { anchors: true });
  const mn = p.mn != null ? `<div class="mn">${md(p.mn)}</div>` : '';
  return { html: `<div class="pair ${cls}" ${attrs}><div class="en">${a.html}</div>${mn}</div>`, targets: a.targets, refs: a.refs };
}

const ICON_DIR = '../../assets/icons';
// icon('boy')            one picture
// icon('boy+girl+cat')   a small group, overlapping
// icon('girl@speech-balloon')  a picture with a small badge
function icon(name, size = 120, extra = '') {
  if (!name) return '';
  const one = (n, sz, cls = 'icon') => `<img class="${cls}" src="${ICON_DIR}/${n}.png" style="width:${sz}px;height:${sz}px" alt="" ${extra}>`;
  if (name.includes('+')) {
    const parts = name.split('+');
    const sz = Math.round(size * (parts.length > 2 ? 0.62 : 0.74));
    return `<span class="cluster">${parts.map((p) => one(p, sz)).join('')}</span>`;
  }
  if (name.includes('@')) {
    const [main, badge] = name.split('@');
    return `<span class="badge-wrap">${one(main, size)}${one(badge, size, 'icon badge')}</span>`;
  }
  return one(name, size);
}

const step = (n) => (n == null ? '' : `data-step="${n}"`);

function callout(p, n) {
  if (!p) return '';
  return `<div class="callout" ${step(n)}>${icon(p.icon || 'light-bulb', 84)}${pair(p)}</div>`;
}

// Simple step counter. s.next() returns 1, 2, 3 ...
function counter() {
  let n = 0;
  return { next: () => ++n, cur: () => n, set: (v) => (n = v) };
}

function resetAnchors() { ANCHOR = 0; }

module.exports = { md, esc, pair, pairA, icon, step, callout, counter, resetAnchors, ARROW_SVG, ICON_DIR };
