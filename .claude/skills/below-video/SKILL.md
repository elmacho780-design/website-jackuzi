---
name: below-video
description: Make the content that sits under lesson videos (notes, practice, check bank, unit tests) for new lessons, in the same workbook format the developer already imports.
argument-hint: [lesson codes or numbers, e.g. GR-009 GR-010 or 11-15]
---

Make below-video content for $ARGUMENTS.

1. Read `reference/below-video-spec.md` and open `reference/HML_Below_Video_Content_L1-10.xlsx` (every sheet) to see the exact format and the level of the questions.
2. Use the lesson's approved content (`content/<CODE>.json`, or `drafts/<CODE>.md`) as the source: test only what the video teaches, and point every question's "Watch again: slide" at the slide that teaches it.
3. For each lesson write: Notes (about 13 lines), 18 Practice questions (6 Recognise, 8 Build, 4 Fix it), a Check bank of 20 covering every skill tag, the skill tags themselves, and unit-test questions when a block of five lessons is complete.
4. Build a new workbook with the same sheets, columns and formulas (openpyxl), named for the lessons covered, e.g. `reference/HML_Below_Video_Content_L11-20.xlsx`. Copy sheets 05 and 06 from the L1-10 workbook.
5. Check it with a script: every ID unique, every Answer present in its Options where it must be, every GAP has as many answers as gaps, every FIX answer has the form `wrong → right` with the wrong word in the sentence, every question has a skill tag that exists, counts per lesson are right.
6. New Mongolian is a draft until Battumur checks it. Say so in the Read me sheet and in your reply.
