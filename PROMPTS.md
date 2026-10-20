# Prompts to paste into Claude Code

Open this folder in Claude Code (Claude desktop app, Code tab, choose the `hml-slides` folder).
Paste one prompt, let it finish, look at what it shows you, then paste the next.
Claude Code reads `CLAUDE.md` by itself, so the rules come with every prompt.

---

## 0. First time only: set up

```
Read HANDOFF.md and CLAUDE.md. Then set up this project: run "npm run setup" to install the
dependencies and the Chromium browser (if Node.js is missing, install it or tell me exactly what to click).
Set up git in this folder and make a first commit, so any change can be undone later.
Run "npm run check all" and "npm run shots GR-003", and open build/GR-003/sheet.png.
Then tell me in five short lines: what this project is, what is finished, what is open, and whether everything works.
```

## Next job: the recorder (after prompt 0)

```
Read section 10 of HANDOFF.md, then build the in-deck recorder and automatic video assembly it describes.
- "npm run record GR-003" starts a small local server, opens the deck in Chrome and shows the voiceover
  for the current click in the notes window (N). I press R to record that click, R again to stop,
  arrow right for the next click, and a key to redo just the current click. Each click's audio is saved
  in recordings/GR-003/. Show clearly on screen when it is recording.
- "npm run video GR-003" makes export/GR-003 .../GR-003.mp4 (1920 x 1080): each click's screenshot held
  for exactly its audio, a short pause between slides, the summary slide held 3 seconds at the end.
  It also writes the timestamp log (slide number and start time) the website needs.
- Use an ffmpeg that installs with npm so I do not have to install anything by hand.
  Keep recordings and videos out of git.
Test it yourself with a short generated test sound before handing it to me, then tell me in a few lines how to use it.
```

## Shortcuts (type these in Claude Code)

| Type | It does |
|---|---|
| `/check-lesson GR-003` | The full quality loop on one lesson (or `all`), then exports |
| `/draft-lesson GR-009` | Writes a new lesson's slide text and voiceover as a draft for you to approve |
| `/build-lesson GR-009` | Turns your approved draft into slides, checks them, exports |
| `/below-video GR-009 GR-010` | Notes, practice, check bank and unit tests for new lessons, in the developer's format |

---

## Lessons 1 to 10

All ten lessons are already built and checked. Use these prompts to rebuild, polish or re-export a
lesson, for example after you change words in its content file. Each one runs the full quality loop.

### Lesson 1 · GR-003 · Personal pronouns
```
Lesson 1: GR-003 Personal pronouns. Work only on content/GR-003.json.
1. Run "npm run check GR-003" and fix everything marked FIX.
2. Run "npm run shots GR-003" and look at every screenshot, one by one, against the visual checklist in CLAUDE.md.
3. Also check: on the Examples slide each arrow starts at the orange pronoun and points back to the
   dotted word it replaces (He to Bat, She to Saraa, It to my phone, We to Bat and I);
   on "One тэр" the three arrows leave тэр and reach he, she and it; on "One you" all three Mongolian words meet at "you".
4. Fix anything that fails. Do not change any Mongolian text.
5. Run "npm run export GR-003" and tell me what you changed in a short list.
```

### Lesson 2 · GR-004 · to be: positive
```
Lesson 2: GR-004 to be: positive. Work only on content/GR-004.json.
1. Run "npm run check GR-004" and fix everything marked FIX.
2. Run "npm run shots GR-004" and look at every screenshot against the visual checklist in CLAUDE.md.
3. Also check: am, is, are are the only orange words in the self-introduction; the three rule rows line up
   (subject chips end at the arrows); the seven short forms all fit with both explanations visible;
   on Watch out the red caret sits exactly where the missing word belongs.
4. Fix anything that fails. Do not change any Mongolian text.
5. Run "npm run export GR-004" and tell me what you changed in a short list.
```

### Lesson 3 · GR-005 · to be: negative and questions
```
Lesson 3: GR-005 to be: negative and questions. Work only on content/GR-005.json.
1. Run "npm run check GR-005" and fix everything marked FIX.
2. Run "npm run shots GR-005" and look at every screenshot against the visual checklist in CLAUDE.md.
3. Also check: both dialogues read down the left column first, Saraa and A always on the left side;
   on "Making a question" the two arrows cross between "You are" and "Are you" without touching the Mongolian line;
   the voice arrows point up after yes/no questions and down after question-word questions;
   "I amn't" is red and crossed out.
4. Fix anything that fails. Do not change any Mongolian text.
5. Run "npm run export GR-005" and tell me what you changed in a short list.
```

### Lesson 4 · GR-001 · Nouns: singular and plural
```
Lesson 4: GR-001 Nouns: singular and plural. Work only on content/GR-001.json.
1. Run "npm run check GR-001" and fix everything marked FIX.
2. Run "npm run shots GR-001" and look at every screenshot against the visual checklist in CLAUDE.md.
3. Also check: on "One and many" the number of pictures matches the words (two books = 2, three boxes = 3,
   four children = 4); only the ending is orange (book-s, box-es, bab-ies); the /ɪz/ symbol shows correctly;
   the five word cards on Rule 1 and Rule 2 are the same size.
4. Fix anything that fails. Do not change any Mongolian text.
5. Run "npm run export GR-001" and tell me what you changed in a short list.
```

### Lesson 5 · GR-002 · a and an
```
Lesson 5: GR-002 a and an (11 slides). Work only on content/GR-002.json.
1. Run "npm run check GR-002" and fix everything marked FIX.
2. Run "npm run shots GR-002" and look at every screenshot against the visual checklist in CLAUDE.md.
3. Also check: the first row of example cards are all "a", the second row all "an";
   the first letters u and h sit in small circles on "Sound, not letter"; the an‿apple link arc sits between
   n and a; on "How a sounds" the stressed part is orange and in capitals.
4. Fix anything that fails. Do not change any Mongolian text.
5. Run "npm run export GR-002" and tell me what you changed in a short list.
```

### Lesson 6 · GR-006 · this, that, these, those
```
Lesson 6: GR-006 this, that, these, those. Work only on content/GR-006.json.
1. Run "npm run check GR-006" and fix everything marked FIX.
2. Run "npm run shots GR-006" and look at every screenshot against the visual checklist in CLAUDE.md.
3. Also check: on "Near and far" the bag and shoes sit next to the boy and the house and friends are far away;
   the grid reads this, these (near) and that, those (far).
4. Fix anything that fails. Do not change any Mongolian text.
5. Export again if you changed anything and tell me what you changed in a short list.
```

### Lesson 7 · GR-008 · Possessive adjectives
```
Lesson 7: GR-008 Possessive adjectives. Work only on content/GR-008.json.
1. Run "npm run check GR-008" and fix everything marked FIX.
2. Run "npm run shots GR-008" and look at every screenshot against the visual checklist in CLAUDE.md.
3. Also check: every owner picture shows the owner, then an arrow, then the thing (Bat to bag, Saraa to phone,
   the dog to its bowl); the seven owner words sit in three groups that all fit inside the margins;
   its / it's and their / they're / there line up with their glosses underneath.
4. Fix anything that fails. Do not change any Mongolian text.
5. Run "npm run export GR-008" and tell me what you changed in a short list.
```

### Lesson 8 · GR-007 · have got
```
Lesson 8: GR-007 have got. Work only on content/GR-007.json.
1. Run "npm run check GR-007" and fix everything marked FIX.
2. Run "npm run shots GR-007" and look at every screenshot against the visual checklist in CLAUDE.md.
3. Also check: in every sentence only 's got / 've got / has / have / haven't got is orange;
   on "Describing someone" Nomin is in the middle with her two brothers, the bike and the crossed-out car around her;
   short answers never contain "got".
4. Fix anything that fails. Do not change any Mongolian text.
5. Run "npm run export GR-007" and tell me what you changed in a short list.
```

### Lesson 9 · GR-015 · there is and there are
```
Lesson 9: GR-015 there is and there are. Work only on content/GR-015.json.
1. Run "npm run check GR-015" and fix everything marked FIX.
2. Run "npm run shots GR-015" and look at every screenshot against the visual checklist in CLAUDE.md.
3. Also check: the bedroom picture shows a bed, a desk, two windows, two chairs and books; on "Word order" the arrow goes from "Миний өрөөнд" to "in my room."; the voice arrows go up for
   yes/no questions and down for How many.
4. Fix anything that fails. Do not change any Mongolian text.
5. Run "npm run export GR-015" and tell me what you changed in a short list.
```

### Lesson 10 · GR-016 · Prepositions of place
```
Lesson 10: GR-016 Prepositions of place. Work only on content/GR-016.json.
1. Run "npm run check GR-016" and fix everything marked FIX.
2. Run "npm run shots GR-016" and look at every screenshot against the visual checklist in CLAUDE.md.
3. Also check: the box and the ball look the same in every diagram, and every diagram shows exactly its word
   (behind: only the top of the ball shows; near: a clear gap; next to: touching; between: two boxes);
   on "Word order" the arrows go from дотор to in and from дээр to on; the bedroom icons appear with their lines.
4. Fix anything that fails. Do not change any Mongolian text.
5. Run "npm run export GR-016" and tell me what you changed in a short list.
```

### All ten in one go
```
Run the full quality loop from CLAUDE.md for every lesson in content/, one lesson at a time:
check, fix, shots, look at every screenshot, fix, export. Do not change any Mongolian text.
At the end give me a table: lesson, number of slides, what you changed.
```

---

## Everyday changes (fill in the brackets)

**Change words on a slide**
```
In [GR-004] slide [5], change the English "[old text]" to "[new text]". The Mongolian under it is "[exact Mongolian]".
Run the quality loop for that lesson and show me the screenshot of that slide.
```

**A slide looks crowded or empty**
```
[GR-005] slide [7] looks [too crowded / too empty / unbalanced]. Fix the layout, not by making text smaller
than the minimum. Show me the before and after screenshots, then export.
```

**Change a picture**
```
In [GR-003] slide [3], the picture for "[sentence]" should be [a girl with a backpack].
Run "npm run icons", pick the best icon, run the quality loop and show me the slide.
```

**Fix a Mongolian line (only when you give the exact text)**
```
In [GR-008] slide [9], replace the Mongolian "[wrong]" with exactly "[right]". Change nothing else.
Run the quality loop and export.
```

**Change the look of every lesson**
```
I want [describe the change, e.g. bigger example sentences / a different card style].
Change only engine/style.css and engine/layouts.css. Rebuild and check all lessons, show me
build/GR-003/sheet.png and build/GR-016/sheet.png, and wait for my OK before exporting.
```

**Export everything for recording**
```
Run "npm run check all". If everything is OK, run "npm run export all" and list the files in export/.
```

---

## New lessons (11 onwards)

Lessons 11 to 20 are proposed in HANDOFF.md (section 5) but not confirmed. Each new lesson goes:
draft, your approval, slides, below-video content.

**1. Draft it**
```
/draft-lesson GR-009
```
or, without the shortcut:
```
Write the draft for lesson 11, GR-009 Possessive 's, following .claude/skills/draft-lesson/SKILL.md.
Stop when the draft is ready and show it to me.
```

**2. Approve or correct it** (you)
```
Approved, with these changes: [your corrections, especially any Mongolian].
```

**3. Build the slides**
```
/build-lesson GR-009
```

**4. Below-video content** (after a block of lessons, e.g. 11 to 15)
```
/below-video 11-15
```

**If you already have the finished text** (for example written in the teaching guide):
```
Make a new lesson: [GR-009 Possessive 's]. Here is the slide-by-slide content, with every English line,
its Mongolian, what each slide shows and the Build order:

[paste]

Use my words exactly, never translate anything yourself. Mark the Mongolian as approved.
Then follow .claude/skills/build-lesson/SKILL.md.
```
