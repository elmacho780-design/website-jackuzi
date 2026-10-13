# Below-video content: format and rules

How to make the content that sits under each lesson video, so new lessons match lessons 1 to 10 exactly.
The model is `HML_Below_Video_Content_L1-10.xlsx`. Read its sheets before writing anything new.
New lessons go in a new workbook with the **same sheets, columns and formulas**, named for the lessons it covers
(for example `HML_Below_Video_Content_L11-20.xlsx`), so the developer can import it the same way.

## What sits under each video

| Block | Mongolian | What | Size |
|---|---|---|---|
| Notes | Тэмдэглэл | One-screen bilingual summary of the video | About 13 lines: Title, Rule, Example, Watch out, Remember |
| Practice | Дасгал | Three rounds, in order | 18 questions: 1 Recognise (6), 2 Build (8), 3 Fix it (4) |
| Check | Шалгалт | 10 questions drawn at random from a bank | Bank of 20 per lesson, pass 8/10 |
| Unit test | Бүлгийн шалгалт | After every fifth lesson | 20 questions, pass 14/20 |
| Mistake review | Алдаагаа давт | Reuses questions the student got wrong | No new content |

**Unit test mix:** the first unit test of a block of five takes 4 questions from each of its 5 lessons. The second takes 3 from each of its own 5 lessons plus 1 from each of the previous 5. Unit test questions are never used anywhere else.

## Sheets and columns (copy exactly)

**01 Lessons:** Lesson · Code · Title (EN) · Title (MN) · Video slides · Practice · Check bank · Unit test items · Notes lines (the last four are COUNTIF formulas over sheets 02 and 03).

**02 Notes:** Lesson · Code · Order · Section · English · Монгол. Sections in order: Title (order 0), Rule, Example, Watch out, Remember. Watch out lines show "wrong → right" in English and the reason in Mongolian.

**03 Questions:** ID · Lesson · Code · Block · Round · Type · Instruction (MN) · Instruction (EN) · Question · Options · Answer · Also accept · Hint (MN) · Image needed · Translation (MN) · Skill tag · Feedback if wrong (MN) · Feedback if wrong (EN) · Watch again: slide.
- IDs: `L01-P01` to `L01-P18` (practice), `L01-C01` to `L01-C20` (check bank), `U1-01` to `U1-20`, `U2-01`... (unit tests). Lesson number = position in the course, not the GR code.
- Block: `Practice`, `Check bank`, `Unit test 1`, `Unit test 2`... Round only for Practice: `1 Recognise`, `2 Build`, `3 Fix it`.
- Lists inside a cell are separated by `|`.

**04 Skill tags:** Skill tag · Lesson · Skill · Explanation (EN) · Feedback (MN) · Teaching slide · Questions (COUNTIF). Tags look like `L1_HESHE`, `L1_IT`. Every question has one tag; every tag points at the slide that teaches it.

**05 Question types** and **06 Interface text:** copy unchanged from the L1-10 workbook unless a new type or message is needed.

## The seven question types (tap only, no typing at A1)

| Type | Student does | Question | Options | Answer |
|---|---|---|---|---|
| MCQ | Taps one of 2 to 4 buttons | Sentence with `___`, or a short Mongolian question | `He|She|It` | `He` |
| CHOOSE | Taps the one correct sentence of 3 | Usually empty | three sentences | the correct sentence |
| GAP | Taps a word into each gap from a bank | one `___` per gap | word bank (words may repeat) | one word per gap, in order, `|` separated |
| ORDER | Taps tiles to build the sentence | empty | tiles, already shuffled | the full sentence; second correct order in Also accept |
| MATCH | Pairs items | empty | `left=right|left=right` | same as Options |
| SORT | Puts words into two groups | the question, e.g. `is or are?` | the words | `is=Bat,the book|are=my parents` |
| FIX | Taps the wrong word, then its correction | sentence with exactly one wrong word | three corrections | `is → are` |

Store answers as text, never as a position; options are shuffled on screen.

## Writing rules

- Test only what the video teaches, with the video's own words and names where possible (Bat, Saraa, Anu, Nomin...).
- Round 1 Recognise: spot the form. Round 2 Build: produce it (GAP, ORDER, MATCH, SORT). Round 3 Fix it: the Mongolian speaker's mistakes from the Анхаар! slide.
- The check bank covers every skill tag of the lesson at least once.
- Translation (MN) is shown only after answering. Never let it give the answer away.
- Hint (MN) is shown before answering, only where a situation is needed (near / far, a box-and-ball picture).
- Feedback if wrong: one short Mongolian sentence naming the rule, plus the slide number for "watch again".
- British English. No em dashes. Wrong sentences in FIX and CHOOSE are never translated.
- All new Mongolian is a draft until Battumur or a native-speaking teacher has read it. Say so in the Read me sheet.

## Rules the developer builds (unchanged, for reference)

Practice: unlimited attempts; right shows "Зөв!" and the translation; wrong shows the feedback and the watch-again link, then try again.
Check: no feedback until the end; draw 10 of 20 with every skill tag represented; unlimited retakes; never blocks the next lesson.
Unit test: all 20 shuffled; result shows the score and the two lessons with the most mistakes.
Mistake review: every wrong answer returns after 1, 3 and 7 days and leaves after two correct answers in a row; sessions of up to 10; show a different question with the same skill tag first where possible.
Watch again: "Видеог {mm:ss}-аас дахин үзэх", using the timestamp log submitted after recording.
