// Box-and-ball pictures for prepositions of place. Same box and same ball everywhere.
// Use in content as  "icon": "diagram:in"
// kinds: in on under next-to between behind in-front-of near table
let N = 0;
function diagram(kind, size = 200) {
  const id = `g${++N}`;
  const BOX = (x, y, w, h, fill = true) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${fill ? `url(#${id}b)` : 'none'}" stroke="#174875" stroke-width="5"/>`;
  const BALL = (cx, cy, r = 26) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${id})"/><circle cx="${cx - r * 0.34}" cy="${cy - r * 0.36}" r="${r * 0.26}" fill="#fff" opacity=".6"/>`;
  const GROUND = '<line x1="4" y1="152" x2="196" y2="152" stroke="#DDD3C4" stroke-width="4" stroke-linecap="round"/>';
  let g = '';
  switch (kind) {
    case 'in': g = GROUND + BOX(40, 50, 120, 100) + BALL(100, 112) + BOX(40, 50, 120, 100, false); break;
    case 'on': g = GROUND + BOX(40, 84, 120, 66) + BALL(100, 56); break;
    case 'under': g = GROUND + BOX(40, 8, 120, 74) + BALL(100, 124); break;
    case 'next-to': g = GROUND + BOX(20, 60, 106, 90) + BALL(152, 124); break;
    case 'between': g = GROUND + BOX(4, 76, 66, 74) + BOX(130, 76, 66, 74) + BALL(100, 124); break;
    case 'behind': g = GROUND + BALL(116, 58) + BOX(40, 52, 120, 98); break;
    case 'in-front-of': g = GROUND + BOX(40, 22, 120, 128) + BALL(100, 124); break;
    case 'near': g = GROUND + BOX(8, 60, 100, 90) + BALL(166, 124); break;
    case 'table': g = GROUND + '<rect x="16" y="96" width="168" height="12" rx="6" fill="#C98B4E"/><rect x="34" y="106" width="11" height="46" rx="4" fill="#B97A40"/><rect x="155" y="106" width="11" height="46" rx="4" fill="#B97A40"/>' + BALL(100, 70); break;
    default: g = GROUND + BOX(40, 50, 120, 100);
  }
  const defs = `<defs><radialGradient id="${id}" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#FFB547"/><stop offset="1" stop-color="#E8590C"/></radialGradient><linearGradient id="${id}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F3F8FF"/><stop offset="1" stop-color="#DCE8F8"/></linearGradient></defs>`;
  return `<svg class="diagram" viewBox="0 0 200 160" width="${size}" height="${Math.round(size * 0.8)}">${defs}${g}</svg>`;
}
module.exports = { diagram };
