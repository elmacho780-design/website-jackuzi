# HML video platform: content architecture

Content direction by Battumur.D, HML Academy. To be read alongside `HML_Lesson_Library.xlsx`.

---

## 1. The one decision everything else hangs off

The reference chart has four columns, and each column contains its own grammar, its own vocabulary and its own reading. Conditionals appear in Level Increase B1–B2, again in Olympiad grammar anomalies, and again inside IELTS Writing. Articles appear in three columns. Built exactly as drawn, we film the same lesson three or four times, and every time we spot an error we fix it in three or four places.

So the site is built in **two layers**.

**Layer 1, the lesson library.** One video per concept. Filmed once, ever. Each video is tagged with a strand (grammar, reading, listening and so on), a CEFR level, and the quiz components it uses. Nobody browses this layer. It is the warehouse.

**Layer 2, programmes.** What a student actually buys: ЭЕШ preparation, IELTS, Kids English. A programme is an ordered list of lesson IDs pulled out of the library. One lesson can sit in nine programmes at once, in a different position in each.

The concrete payoff is in sheet 06 of the workbook. Once ЭЕШ, General English A1–A2 and IELTS are filmed, a fourth product, General English B1 to C1 plus school support, costs **one new video**. Everything else already exists and just gets reassembled into a new order. Built the way the chart is drawn, that same product would have cost roughly 190 new recordings.

### What that means for the database

Four tables carry the whole site:

```
lessons            id, strand, level, title_mn, title_en, focus, video_url,
                   duration, priority
programmes         id, code, name_mn, name_en, description, price
programme_lessons  programme_id, lesson_id, position, module_name   <- the join
quiz_items         id, lesson_id, component_type, payload_json
```

`programme_lessons` is where the money is. Reordering a programme, launching a new one, or running a promotion is a row change, not a filming session.

---

## 2. What is missing from the reference chart

**ЭЕШ.** Not in the chart at all, and almost certainly the biggest domestic market. Every Grade 11 and 12 student in the country sits it, it has a hard annual deadline, and parents pay for it without hesitation. 142 videos, and it should be filmed first. It also has a seasonal shape the site must respect: demand climbs from September, peaks January to June, then falls to almost nothing. Launch before January or wait a year.

**Academic and argumentative writing.** The chart has no room for it, and it is the second flagship. This is not IELTS Task 2 writing. It is argument analysis, the ten named logical fallacies, thesis patterns for defending, attacking and qualifying a position, counterclaim and concession and rebuttal as three separate moves, MLA narrative and parenthetical citation, and seven distinct ways of integrating a quotation. Different content, different buyer, different price. 60 videos in its own strand, sold as its own programme to students applying abroad and to IB and AP candidates.

**Olympiad depth.** 185 lessons touch the olympiad programme, 63 of them olympiad-specific. That includes routes per HIPPO category (S1 to S6 and Continental), open and banked cloze technique, collocation drills at two levels, four themed competition vocabulary sets, essay craft under competition time, six full timed mock walkthroughs across HIPPO, SOF and USA English Olympiad, answer sheet transfer technique, and both the seven-day and four-week preparation plans HML already runs.

**Kids, grades 1 to 4.** Parent-purchased, and a completely different presenting style. It does not belong inside the A1 track, because a video that works for a 22-year-old beginner does not work for a 7-year-old. 45 videos, phonics included even though it was excluded from Essential English.

**School support, grades 5 to 12.** Homework and test help, following the Mongolian school year. Almost entirely reassembled from lessons filmed for other programmes.

**Speaking and pronunciation as their own products.** In the chart both exist only inside IELTS and ESP. Speaking is the single thing Mongolian learners most often say they cannot do, and it sells alone. Pronunciation needs its own strand, including one lesson specifically on the errors Mongolian speakers make, which will be shared more widely than anything else on the site.

Two smaller notes. TOEFL is bundled with IELTS in the chart, but they are different tests with different candidates and much smaller demand here, so it ships last and reuses heavily rather than being filmed in parallel. And "Casual & ESP" mixes travel English for tourists with medical English for clinicians, which are unrelated audiences at unrelated price points; in the library these are separate modules bought one at a time.

## 3. The twelve strands

| Code | Strand | Монгол | Videos |
|---|---|---|---|
| GR | Grammar | Дүрэм | 119 |
| VO | Vocabulary | Үгийн сан | 72 |
| RD | Reading | Унших | 35 |
| WR | Writing | Бичих | 55 |
| AW | Academic and argumentative writing | Академик бичиг | 60 |
| LS | Listening | Сонсох | 28 |
| SP | Speaking | Ярих | 35 |
| PR | Pronunciation | Дуудлага | 18 |
| EX | Exam technique | Шалгалтын арга барил | 163 |
| ES | English for specific purposes | Мэргэжлийн англи хэл | 45 |
| YL | Young learners | Бага насны сурагчид | 45 |
| SK | Study skills | Суралцах арга барил | 15 |
| | | **Total** | **690** |

Strands are a filter, not the navigation. A student never lands on "Grammar, 119 videos" as their front door. They land on "ЭЕШ бэлтгэл" and the grammar arrives in the order that programme needs it.

Exam technique being the largest strand after grammar is not an accident. It is the part students cannot get from a textbook, it is where HML's actual advantage sits, and it is the reason someone pays rather than watching free YouTube grammar.

---

## 4. The ten programmes

| Code | Programme | Монгол | Tracks |
|---|---|---|---|
| GE | General English | Ерөнхий англи хэл | A1.1 / A1.2 / A2.1 / A2.2 / B1.1 / B1.2 / B2 / C1 |
| EYESH | ЭЕШ preparation | ЭЕШ-ийн бэлтгэл | Grade 11 / Grade 12 / 30-day sprint |
| IELTS | IELTS preparation | IELTS бэлтгэл | Foundation 4.0–5.5 / Target 6.0–7.0 / Advanced 7.5+ |
| TOEFL | TOEFL iBT | TOEFL бэлтгэл | Single track |
| OLY | Olympiad | Олимпиадын бэлтгэл | HIPPO / SOF IEO / USA English Olympiad |
| KIDS | Kids English | Хүүхдийн англи хэл | Grades 1–2 / Grades 3–4 |
| SCHOOL | School support | Сургуулийн хичээлийн дэмжлэг | Grades 5–8 / Grades 9–12 |
| ESP | English for work | Ажлын англи хэл | Business / Travel / Medical / Academic / IT / Service |
| ACAD | Academic and argumentative writing | Академик эссэ ба судалгаа | Argument analysis / Thesis and counterargument / Research and MLA |
| SPEAK | Speaking and fluency | Ярианы чадвар | Foundation / Fluency / Public speaking |

The Mongolian names above are a first pass and need your check before they go anywhere near the navigation.

---

## 5. Twelve quiz components, not six hundred

This is the largest scope decision on the build, so it is worth being blunt about it. The reference chart writes a bespoke "Quiz Type" under every module. Read literally, that is a request for a few hundred custom interactions and it would sink the project.

There are only twelve interactions on the whole site:

| ID | Component | Behaviour |
|---|---|---|
| Q01 | Multiple choice | One stem, 3–4 options, one correct |
| Q02 | Gap fill, typed | Needs an accepted-answers array per gap, not one string |
| Q03 | Match / drag to slot | Two columns, or items dragged onto categories |
| Q04 | Reorder | Words into a sentence, or sentences into a paragraph |
| Q05 | Sentence transformation | Rewrite using a given keyword, fuzzy matched |
| Q06 | Spot and fix the error | Click the wrong word, then type the fix |
| Q07 | Audio question | Clip plus MCQ or gap, with a replay limit in exam mode |
| Q08 | True / False / Not Given | Three-way, distinct from Q01 because scoring differs |
| Q09 | Word completion | `b _ _ _ t _ f u l`. The olympiad staple |
| Q10 | Free writing | Submitted for AI band feedback or teacher marking |
| Q11 | Speaking recording | Submitted for AI or teacher feedback |
| Q12 | Timed drill | A visible countdown wrapped around any of the above. A mode, not a type |

Every lesson in the library declares which of the twelve it uses. Build twelve components properly and the content team fills them forever without another line of code.

Three of them carry real engineering risk and should be scoped early rather than discovered late:

- **Q02** fails badly if it accepts one correct string. "doesn't" and "does not" are both right; so is a capitalised first word.
- **Q10 and Q11** are the ones that justify the price, and they need a decision now on whether marking is AI, teacher, or AI first with teacher escalation for paying tiers. That decision changes the pricing model, not just the code.
- **Q12** needs server-side timing. If the countdown lives only in the browser, exam mode is decorative.

---

## 6. Release order

Ship finished programmes, not scattered lessons. A half-built programme sells nothing, and a student who buys ЭЕШ and finds four of the twelve grammar videos missing does not come back.

| Release | Ships | New videos | Reused | Running total |
|---|---|---|---|---|
| 1 | ЭЕШ, complete | 142 | 0 | 142 |
| 2 | General English A1–A2, plus Kids | 160 | 38 | 302 |
| 3 | Olympiad, complete | 152 | 33 | 454 |
| 4 | IELTS, complete | 132 | 129 | 586 |
| 5 | Academic writing, plus Speaking | 45 | 90 | 631 |
| 6 | General English B1–C1, plus School | 1 | 237 | 632 |
| 7 | English for work, and TOEFL | 58 | 128 | 690 |

Olympiad sits third because it is the differentiator and the one programme HML can prove results for. Swapping it with IELTS costs the same total work either way, 586 videos after four releases in both orders, so the only thing the order decides is which product exists first.

Release 1 alone is a real product. If 141 videos is more than the filming schedule allows before January, cut it to the Grade 12 sprint track rather than launching four programmes at 30 per cent each.

---

## 7. Levels inside a programme

A student wants IELTS but tests at A2. He must not be left staring at lessons he cannot follow, and he must not be moved into a product he did not buy. Both are avoidable, because a programme here is a route to a destination, not a shelf of videos. He is buying IELTS 6.5, not "the IELTS section".

**One route, several entry points.** IELTS is 261 lessons in a fixed order. The A2 student boards at position 1. The B1 student boards at position 26. The B2 student boards at position 76. They follow the same list to the same end. The stronger student's route is a suffix of the weaker one's, not a separate curriculum. Sheet 08 lists every entry point.

**Diagnose before payment.** A free placement test on the landing page, twenty minutes. Its only job is to return a band, which becomes a start position. The output the student sees is not "you are A2", it is "you are about nine months from IELTS 6.5, this is your route, this is the price". Nobody resents a long route they agreed to before paying.

**Recommend, never lock.** Show the route with a progress bar to the destination and let the student open any lesson, including one far above his level, with a line at the top naming the prerequisites. Locking manufactures the resentment we are trying to avoid.

**Exam-specific lessons stay on one route.** A HIPPO word-puzzle lesson is on the olympiad route and nowhere else, so an IELTS student cannot reach it. The test for authoring is simple: a lesson that teaches English can appear on many routes, a lesson that teaches how to beat one exam appears on one. The library already reflects this. Of the 163 exam-technique lessons, 160 sit in exactly one programme. The IELTS and olympiad routes share only 75 lessons out of 261 and 185, and those 75 are plain English that both students need.

**Price the destination and the duration, not the category.** IELTS 6.5 in six months and in twelve months are the same content at different pace.

## 8. Open decisions

These change the shape of the library, so they are worth settling before the developer starts.

**Video length.** The library assumes 8 to 15 minutes, one concept per video. If we record 30 to 45 minute classes instead, the count drops to roughly a third and the library needs regrouping. Micro-lessons index better for search, are cheaper to reshoot, and fit a bus ride. Long recordings are faster to produce because they are close to what we already teach. I would take micro-lessons, but it is a production capacity question as much as a pedagogical one.

**Instruction language by level.** Mongolian throughout is right up to B1. Above that, a C1 olympiad student explained to in Mongolian is being taught below his level. Essential English fades Mongolian out as the level climbs and the site should do the same, but the fade point needs fixing.

**Mongolian lesson titles.** Column F in sheet 04 is deliberately empty. That pass is yours, it is brand voice and it is what students actually read.

**Free tier.** Something must be free or the funnel has no entry. The placement test, the study skills strand and the ЭЕШ format lessons are the natural candidates: high search value, and they demonstrate quality without giving away technique.

---

**Route ordering.** Sheet 07 is a first pass generated from stage rules, not a final teaching sequence. The stages are sound; the order within each stage needs a teacher's eye. That review is the highest-value thing left to do on this document.

---

*Curated by Battumur.D*
