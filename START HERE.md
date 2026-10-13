# HML lesson slides: start here

Every slide for lessons 1 to 10 is built from text files and a shared design, then checked by a script
for anything cut off, overlapping or mistyped. The Mongolian is copied exactly from the teaching guide.

## Record a lesson today (no setup needed)

**Option A: PowerPoint (easiest)**
Open `export/<lesson>/<lesson>.pptx` (or the PowerPoint zip you were sent).
Every click is already its own slide, so just press the arrow key. The speaker notes under each slide
show the voiceover guide for that slide (`[click]` marks roughly where the guide expects a click).
Record with PowerPoint (Record > From current slide) or any screen recorder.
The slides are pictures: to change a word, use Claude Code (below), not PowerPoint.

**Option B: the browser**
Open `build/GR-003/index.html` in Chrome.
`F` full screen · `→` or `Space` next click · `←` back · `N` opens the voiceover notes in a second window
(drag it to your other screen) · the mouse hides itself after a second.
Record the screen with OBS, Loom or QuickTime. Slides fade in exactly as designed.

**Video settings:** 1920 x 1080, 16:9. The PDF in each lesson folder is for checking and sharing, not recording.

## Change anything: use Claude Code

1. Install the Claude desktop app, open the **Code** tab and choose this `hml-slides` folder.
2. Paste the prompts from `PROMPTS.md`: prompt 0 once, then the one you need.
3. Claude Code edits the text file, rebuilds, looks at every slide, fixes problems and exports.

The rules Claude Code follows are in `CLAUDE.md` (design, colours, sizes, Mongolian rules, every layout).
The whole project (decisions, status, open questions, history) is in `HANDOFF.md`, so Claude Code can pick up
where we left off. Shortcuts: `/check-lesson`, `/draft-lesson`, `/build-lesson`, `/below-video` (see `PROMPTS.md`).

## What is where

| Folder | What it holds |
|---|---|
| `HANDOFF.md` | The whole project brief for Claude Code |
| `content/` | One file per lesson with every word on every slide, plus the voiceover guide |
| `drafts/` | New lessons as text, waiting for your approval |
| `engine/` | The design and the tools that build, check and export |
| `assets/` | Logo, fonts (Rubik, has ө and ү), 390+ 3D icons |
| `build/` | The live decks (`index.html`) and screenshots |
| `export/` | PowerPoint, PDF and PNG files, made by `npm run export` |
| `reference/` | Lesson library, content architecture, below-video content and its rules, the teaching guide, your original files |

## Licences

Icons: Microsoft Fluent Emoji (MIT). Fonts: Rubik and Noto Sans (SIL Open Font Licence).
Both allow commercial use. Licence files are in `assets/icons` and `assets/fonts`.
