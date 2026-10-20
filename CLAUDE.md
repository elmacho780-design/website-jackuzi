# HML Academy lesson slides

You are working on the slides for HML Academy's video lessons (Higher Mind Learning, Ulaanbaatar).
A teacher records a voiceover over these slides; no face is ever on screen. Students are Mongolian
beginners (CEFR A1), mostly teenagers, watching on a phone. The slides must look like a premium,
modern online course and be identical in style from the first lesson to the last.

Slides are built as code. Every word lives in a content file. The engine turns content into slides,
checks them, and exports them. You never draw a slide by hand and never retype text from a picture.

**New here? Read `HANDOFF.md` first.** It has the whole project: who Battumur is, the website, every
decision made so far, what is done, what is open, and what was tried and dropped. `reference/` holds the
lesson library, the architecture, the below-video content and the teaching guide.

## The one rule that matters most

**The content files are the truth.** `content/<CODE>.json` holds every word on every slide.
The Mongolian in lessons 1 to 10 comes from Battumur's teaching guide (`"mn_review": "teaching-guide"`).
Copy Mongolian exactly. Never retype, "fix", re-spell or translate it yourself. Watch for ө and ү: AI tools often replace them with
о, у, е. If a Mongolian line is missing or looks wrong, ask Battumur, do not invent one.

## Folders

```
HANDOFF.md      the whole project: read first
drafts/         new lessons as text for Battumur to approve before they become slides (_TEMPLATE.md)
.claude/skills/ /check-lesson, /draft-lesson, /build-lesson, /below-video
content/        one JSON file per lesson (GR-003.json ...). Edit these to change words.
engine/         the slide engine: layouts.js, style.css, layouts.css, runtime.js, check.js ...
assets/         logo.png, logo-light.png, fonts/ (Rubik + Noto Sans IPA), icons/ (Fluent 3D, MIT)
build/<CODE>/   index.html = the live deck. shots/ = one PNG per slide. sheet.png = all slides.
recordings/<CODE>/   the voiceover, one WAV per click (s03_02.wav = slide 3, click 2). Not in git.
export/<CODE> <Title>/   .pptx (one slide per click, speaker notes = what to say), .pdf, PNGs,
                <CODE>.mp4 and <CODE> timestamps.txt/.json (made by npm run video)
reference/      HML_Lesson_Library.xlsx (all 690 lessons, codes, strands, programme routes),
                HML_Content_Architecture.md (how lessons and programmes fit together),
                HML_Below_Video_Content_L1-10.xlsx (notes, practice and quizzes under each video)
```

Use `reference/` to look up a lesson's code, title, level and place in the programmes before
making it. Do not edit those files unless Battumur asks.

## Commands

```
npm run setup              first time only: installs Playwright and Chromium
npm run check GR-003       build + automatic checks (overflow, overlaps, margins, Mongolian typos)
npm run shots GR-003       PNG of every slide in build/GR-003/shots/ + build/GR-003/sheet.png
npm run export GR-003      PowerPoint + PDF + PNGs into export/
npm run check all          every lesson (same for shots/export)
npm run icons              build/icons.png: every icon you can use, with its name
npm run record GR-003      record the voiceover inside the deck, one take per click (keeps running: start it in the background)
npm run video GR-003       MP4 from the takes + timestamp log into export/ (lists any click not recorded yet)
```

The recorder (engine/record.js server, engine/recorder.js in the deck) and the video maker (engine/video.js)
never put anything on the slides. A take that no longer matches the deck's clicks (because a slide's clicks
changed) is reported by `npm run video`; that slide must be recorded again.

## How to do any job (always this loop)

1. Edit `content/<CODE>.json` (words, icons, layout) or `engine/*.css` (design, applies to every lesson).
2. `npm run check <CODE>`. Every line marked **FIX** must be fixed. **LOOK** lines need a look.
3. `npm run shots <CODE>`, then **open and look at every PNG** in `build/<CODE>/shots/`
   with your image viewer (Read tool). The checker cannot see ugliness. You can.
4. Fix, repeat 2 and 3 until the checker says OK and every slide passes the visual checklist below.
5. `npm run export <CODE>` and tell Battumur in one or two sentences what changed.

Never say a slide is done without looking at its screenshot.

### Visual checklist (look at each screenshot)

- Nothing cut off, overlapping, touching the logo or footer, or crammed against an edge.
- The slide is balanced: no big empty half, no squashed corner. Content sits in the middle of the space.
- Text is big enough for a phone. Never shrink text below the sizes in style.css to make it fit;
  change the layout, split a line with `\n`, or use a smaller size option instead.
- Every English sentence has its Mongolian directly under it (except the wrong sentence on Watch out).
- The target word is orange; mistakes are red and crossed out; corrections are green.
- No word left alone on the last line of a sentence.
- Pictures match the words (a girl for Saraa, a boy for Bat, the right object).
- The same element is the same size and position on every slide (titles, logo, footer, cards).

## Design system (do not drift from it)

Defined once in `engine/style.css` (tokens) and `engine/layouts.css` (layouts).
Change it there and every lesson changes with it. Never style a single slide inline.

- **Font:** Rubik for everything (has ө ү), Noto Sans only for IPA symbols. No other fonts.
- **Colours:** warm paper background `#FBF7F0`, white cards, ink `#13233F`, brand blue `#174875`,
  Mongolian lines blue `#2E62A6`, target word orange `#E35D0B` with a soft marker,
  wrong red `#D33A3A`, right green `#14905A`, title and summary slides deep navy `#0E1F3A`.
  The orange-to-yellow of the logo brain is the accent (number badges, title bar, level chip).
- **Sizes (1920 x 1080):** slide title 76, Mongolian title 40, example sentence 46 (Mongolian 32),
  explanation 38 (Mongolian 30). Minimum 28 except the footer and small name tags.
- **Every slide:** logo top right (light logo top left on dark slides), footer
  `Curated by Battumur.D` bottom right, orange bar above the title. Nothing else in the margins:
  no slide numbers, no lesson code except on the title slide, no dates, no website.
- **Bilingual pattern:** English line, Mongolian directly underneath, smaller and blue.
  Never English and Mongolian on one line joined by a dot or slash. Never translate a wrong sentence.
- **Pictures:** Fluent 3D icons only (assets/icons). People use the "Light" skin variant
  (black hair) so they look like Mongolian students. Prepositions use the box-and-ball diagrams.
- **Never:** em dashes, emoji typed as text, photos, a second font, gradients outside the
  title/summary slides, anything about quizzes, practice, courses, exams, "last lesson" or "next lesson".

## Content file format

```json
{
  "code": "GR-003", "lesson": 1, "level": "A1",
  "title": { "en": "Personal pronouns", "mn": "Хувийн төлөөний үг" },
  "slides": [ { "layout": "title", ... }, { "layout": "cards", "title": {"en": "...", "mn": "..."}, ... } ]
}
```

Every slide may also have `"say"` (the voiceover guide, shown in speaker notes, `[click]` marks each click),
`"teach"` (teaching note) and `"time"`. These never appear on the slide.
`"mn_review"` at the top says where the Mongolian stands: `"teaching-guide"` (lessons 1 to 10), `"approved"`
(Battumur approved a new lesson) or `"draft"` (written by you, not yet checked; the checker warns).

### Text markup (inside any en / mn string)

| Write | You get |
|---|---|
| `**word**` | the target word: bold orange with a marker |
| `~~word~~` | the mistake: red, crossed out |
| `!!words!!` | wrong word order: red wavy underline |
| `__word__` | the word a pronoun points back to (an arrow is drawn from the **target** to it) |
| `[^]` | a missing word (red caret) |
| `->` | an arrow |
| `[up]` `[down]` | voice goes up / down |
| `((u))` | a letter in a circle |
| `[ipa:ə]` | IPA symbol |
| `\n` | new line inside one sentence block |

### Clicks (what appears when)

Each layout reveals things in the order teachers expect (one card per click, explanation last).
Override on any item: `"step": 3` (that click), `"step": 0` (visible from the start), `"with": "prev"`
(appears with the item before it).

### Pictures (`"icon"` fields)

`"girl"` one icon · `"boy+girl"` a group · `"girl@speech-balloon"` with a badge ·
`"boy>backpack"` owner and thing · `"no:automobile"` crossed out · `"diagram:in"` box and ball
(in, on, under, next-to, between, behind, in-front-of, near, table). Run `npm run icons` to see all names.
To add an icon, take it from github.com/microsoft/fluentui-emoji (3D folder, "Light" skin for people),
save it as `assets/icons/<kebab-name>.png`.

### Layouts

| layout | use for | main fields |
|---|---|---|
| `title` | slide 1 | `hero` (1 to 3 icons), `promise` {en,mn} |
| `panels` | before / after | `panels`: [{label, icon, tag, tone: plain/good, lines:[{en,mn}]}], `explain` |
| `story` | hook with a picture | `icon` + `tag`, or `scene`; `lines`; `explain` |
| `cards` | examples | `cols` 2-5, `cards`: [{icon, label, en, mn, word, gloss, chips}], `lead`, `explain`, `size` sm/lg, `iconTop` |
| `grid` | a table of words with row and column labels | `cols`, `rows`: [{icon, label, cells:[{word, mn}]}], `cellSteps`, `explain` |
| `converge` | several words -> one | `items`: [{chip, icon, label}], `target`, `explain` |
| `split` | one word -> several | `source`, `rows`: [{word, icon, head, items}], `explain` |
| `columns` | compare 2 or 3 things | `columns`: [{icon, word, head, items, hint, big}], `below`, `explain` |
| `rules2` | two numbered rules | `rules`: [{num, head, items}] or [{num, head, flips}] |
| `dialogue` | conversations | `speakers` {Name: {icon, side a/b}}, `lines`: [{who, en, mn}], `explain` |
| `stack` | anything else, built from blocks | `blocks` (below), `wires`, `flow` |
| `watchout` | the Mongolian speaker's mistake | `context`, `mistakes`: [{wrong, right:{en,mn}}] |
| `model` | model text | `lines`, `cols` 1/2, `split`, `scene` or `icon` or `band`, `size` |
| `summary` | last slide (Remember / Санаж ав) | `cards`: 3 x {en, mn} |

**Stack blocks:** `{ "row": [tokens], "mn": "...", "label": {...}, "center": true, "size": "lg" }`,
`{ "table": { "head": [...], "rows": [[cells]], "cols": "css grid columns", "perRow": true, "tones": [...], "cls": "..." } }`,
`{ "pair": {en, mn}, "card": true }`, `{ "callout": {en, mn, icon} }`, `{ "cards": [...], "cols": 5 }`,
`{ "side": [block, block], "cols": "auto auto" }`, `{ "group": [blocks], "card": true }`, `{ "space": 40 }`.

**Row tokens:** `"text"` (a soft chip), `{ "chip": "am", "tone": "navy|soft|grey|paper|green|red|strike", "size": "sm|lg|xl", "sub": "gloss", "id": "a1" }`,
`{ "arrow": true }` (or "down"), `{ "plus": true }`, `{ "eq": true }`, `{ "text": "my book" }`, `{ "icon": "boy", "size": 80 }`,
`{ "intonation": "up" }`, `{ "label": {en, mn} }`, `{ "link": ["an", "apple"] }`.
Arrows between tokens: give them `"id"`s and add `"wires": [{ "from": "a1", "to": "b1", "fromSide": "bottom", "toSide": "top", "step": 2 }]` to the slide.

When a new slide needs something no layout does, add a layout or token to `engine/layouts.js`
with its CSS in `engine/layouts.css`, keep it in the same style, then re-check **every** lesson.

## Making a new lesson

1. `/draft-lesson <CODE>`: write the teaching content and voiceover in `drafts/<CODE>.md`. Stop for Battumur's approval.
2. `/build-lesson <CODE>`: turn the approved draft into `content/<CODE>.json` (copy `content/GR-003.json`'s shape),
   pick layouts and icons, run the loop, export.
3. `/below-video <codes>`: notes, practice, check bank and unit tests in the format of `reference/below-video-spec.md`.
If Battumur gives you finished text instead, skip step 1 and use his words exactly.
