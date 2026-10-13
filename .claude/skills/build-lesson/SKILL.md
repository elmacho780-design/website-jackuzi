---
name: build-lesson
description: Turn an approved lesson draft (drafts/<CODE>.md) into slides - content/<CODE>.json, quality loop, export. Use only after Battumur has approved the draft.
argument-hint: [lesson code, e.g. GR-009]
---

Build the slides for $ARGUMENTS from `drafts/$ARGUMENTS.md`.

1. Confirm the draft is approved (its Status line, or Battumur said so in this conversation). If not, stop and ask.
2. Create `content/$ARGUMENTS.json` using the closest finished lesson in `content/` as the model. Copy every English and Mongolian line from the draft exactly. Set `"mn_review": "approved"` only if Battumur approved the Mongolian, otherwise `"draft"`.
3. Pick layouts and icons from CLAUDE.md (`npm run icons` shows every icon). Put each slide's Say lines, teaching note and timing in `say`, `teach` and `time`.
4. Run /check-lesson $ARGUMENTS until clean, then export.
5. Show Battumur `build/$ARGUMENTS/sheet.png` and say where the PowerPoint is.
