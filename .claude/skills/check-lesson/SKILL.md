---
name: check-lesson
description: Run the full slide quality loop on one lesson (or all) - build, automatic checks, look at every screenshot, fix, export. Use after any change to a lesson's slides or the design.
argument-hint: [lesson code, e.g. GR-003, or all]
---

Run the quality loop from CLAUDE.md on $ARGUMENTS.

1. `npm run check $ARGUMENTS`. Fix every line marked FIX. Read every LOOK line and fix it if it is a real problem.
2. `npm run shots $ARGUMENTS`. Open and look at every PNG in `build/<CODE>/shots/` (for `all`, every lesson's). Check each one against the visual checklist in CLAUDE.md.
3. If the lesson has rings or step-by-step pictures, also run `npm run export <CODE>` and look at `export/<CODE>*/steps/` for those slides.
4. Fix what fails. Change layout or spacing, never shrink text below the minimum. Never change Mongolian text.
5. Repeat until the checker says OK and every slide passes. Then `npm run export $ARGUMENTS`.
6. Report in a short list: what you changed, and anything you could not fix that Battumur should decide.
