> **Status (handoff, October 2026).** Exported from the same Claude doc, tab *Kimi prompt*.
> **Part 2 (the lessons) is the source** of every English and Mongolian word on the slides of lessons 1 to 10. `content/*.json` was built from it and checked against it word for word. If the two ever disagree, ask Battumur which is right.
> **Part 1 (design system) is superseded** by `CLAUDE.md` and `engine/*.css` (Arial, navy/highlight blue, white slides were the Kimi rules; the slides now use Rubik, warm paper, orange targets).

# HML Video Lessons: Kimi Slide Prompt

## How to use this prompt

1. Open a **new Kimi chat for every lesson**, so one deck never leaks into the next.
2. Attach the **HML Academy logo** as a PNG with a transparent background.
3. Paste all of **Part 1**, then **only the one lesson** you want from Part 2.
4. Start the message with: *Build this lesson as a 16:9 PowerPoint deck. Follow Part 1 exactly for every design decision and use the lesson text word for word.*
5. Before recording, read the Mongolian on every slide once.

---

# Part 1 · Design system

These rules apply to every slide of every lesson. Where a lesson and Part 1 seem to disagree, the lesson decides the words and Part 1 decides the design.

## 1. What you are making

You are designing the slides for a narrated video lesson from **HML Academy**, an English school in Ulaanbaatar, Mongolia. A teacher records a voiceover over the slides; no person ever appears on screen. For 6 to 7 minutes these slides are the only thing the student sees, so they must look like a premium, modern online course: calm, clean, perfectly aligned, generous white space, and identical in style from the first slide to the last.

The students are **Mongolian beginners (CEFR A1)**, mostly teenagers, watching on a phone. Assume they cannot yet read an English sentence and understand it on their own. That is why every English sentence carries a Mongolian translation and every explanation is given in both languages. Keep it light: short lines, few words, plenty of space.

- Format: **16:9, 1920 × 1080 px**. All sizes below are in px at that resolution.
- Build **exactly** the slides listed in the lesson, in the same order, with the text given. Do not add, merge, split or skip slides. Do not invent examples, tips, translations or decorations that are not described.

## 2. Colours

Use only these colours.

| Name | Hex | Use |
| --- | --- | --- |
| Navy | #1F3864 | Slide titles, rule chips, number badges, background of title and summary slides |
| Soft blue | #D9E2F3 | Subject chips, panels, tags, Mongolian text on navy slides |
| Highlight blue | #2E75B6 | The target word inside an English example. Nothing else. |
| Light grey | #F2F2F2 | Cards and example panels |
| Translation grey | #5E6573 | Every Mongolian line on a white slide, small labels |
| Text black | #1A1A1A | Main English text |
| Maroon | #7B2233 | Mistakes. Watch out slides only. |
| Green | #1E7B4F | Corrections. Watch out slides only. |
| White | #FFFFFF | Background of every content slide |

Balance on every content slide: about 70% white and light grey, 20% navy and soft blue, 10% highlight blue, maroon or green. No other colours, no gradients, no textures, no patterns.

## 3. Logo and footer

- Use the **attached HML Academy logo file**. Never redraw, recolour, stretch, crop, outline, rotate or add a shadow to it.
- **Title and summary slides (navy):** logo top-left, 96 px tall, 80 px from the top and left edges. If the logo is dark, place it on a white rounded tile (radius 20 px, 20 px padding) so it stays readable.
- **Content slides (white):** logo top-right, 56 px tall, 56 px from the top and right edges.
- **Footer on every slide:** *Curated by Battumur.D*, bottom-right, 18 px, translation grey (soft blue on navy slides), 48 px from the bottom and right edges.
- Nothing else in the corners or margins: no slide numbers, no lesson code (title slide only), no dates, no course names, no website, no notes.

## 4. Typography

One font only: **Arial**. It contains every Mongolian letter, including ө and ү. Bold for titles, chips and target words; regular for everything else. No italics, no underlines, no all-caps sentences.

| Element | Size | Weight | Colour |
| --- | --- | --- | --- |
| Title slide: English title | 88 px | Bold | White |
| Title slide: Mongolian title | 44 px | Regular | Soft blue |
| Slide title, English | 56 px | Bold | Navy |
| Slide title, Mongolian (directly under) | 30 px | Regular | Translation grey |
| Example sentence, English | 42 px | Regular; target word bold highlight blue | Text black |
| Translation under an example | 28 px | Regular | Translation grey |
| Explanation, English | 32 px | Regular | Text black |
| Explanation, Mongolian (directly under) | 28 px | Regular | Translation grey |
| Chip text | 34 px | Bold | White on navy, navy on soft blue, black on light grey |
| Column headers and small labels | 24 px | Bold | Translation grey or navy |
| Footer | 18 px | Regular | Translation grey |

- Nothing smaller than **24 px** except the footer.
- Line height 1.25. Left-align all text. Centre text only inside chips and diagram labels.
- Keep each line short enough to fit on one line where possible; never let one word sit alone on a second line.

## 5. The bilingual pattern

This is the most important rule in the prompt.

**English first. Mongolian directly underneath, smaller and grey.** Always as a stacked pair, so the eye reads English, then drops straight to its meaning.

- Never put English and Mongolian on one line joined by a dot or a slash.
- Never split them into an English column and a separate Mongolian column.
- The gap between an English line and its own Mongolian line is small (8 px). The gap between one pair and the next pair is large (28 px or more), so pairs never blur together.

**What gets a Mongolian line:**

- every slide title
- every explanation
- every English sentence: examples, dialogue lines, model text lines, and the corrected sentence on Watch out slides
- word chips, only where the lesson gives a small gloss

**What does not:**

- the wrong sentence on a Watch out slide
- grammar words and formulas inside chips (am, is, he, + s) unless the lesson gives a gloss
- text that is already Mongolian

Copy every Mongolian line **exactly** as written in the lesson. Never translate anything yourself. Never add a Mongolian line the lesson does not give.

**Do not overdo it.** At most two explanation pairs on a slide. At most four example cards. No paragraphs. If a slide feels full, add space and reduce nothing; if it still feels full, the layout is wrong, not the text.

## 6. Grid and spacing

- Safe area: **120 px** left and right, **96 px** top, **140 px** bottom. The bottom band stays empty for video captions; only the footer may sit there.
- Title block at the same position on every content slide: English title starts at y = 96 px, Mongolian title directly under it. Content starts at y = 300 px.
- 12-column grid with 32 px gutters. Every element snaps to it. Repeated items share the same size and the same spacing.
- Cards: radius 24 px, fill light grey, no border, a very soft shadow (0 8 px 24 px, black at 6%).
- Chips: radius 16 px, height 72 px, horizontal padding 28 px.
- White space is part of the design. When in doubt, remove, never add.

## 7. Layouts

Every slide in Part 2 names one of these layouts. Use it exactly.

**L1 · Title.** Navy background. Logo top-left on its tile. Below it, two chips side by side: lesson code (soft blue fill, navy text) and level A1 (highlight blue fill, white text). English title (88 px white bold), Mongolian title directly under (44 px soft blue). Bottom-left: the promise line in English (30 px white) with its Mongolian under (26 px soft blue). One decoration only: a large soft-blue circle, 10% opacity, 900 px wide, half off the right edge. Nothing else.

**L2 · Story.** Left 40%: one simple flat illustration of the scene, built from rounded shapes in navy and soft blue. Right 60%: the text lines as stacked pairs, one pair per line. Optional thin leader lines from captions to objects in the picture.

**L3 · Dialogue.** Speech bubbles with rounded corners and a small tail. Speaker A on the left in soft blue, speaker B on the right in light grey; speaker name as a 24 px bold label above each bubble. Inside each bubble: English line (36 px) with its Mongolian under (26 px). Up to 4 bubbles: one column. 5 to 8 bubbles: two columns, read down the left column first.

**L4 · Cards.** Equal light-grey cards: 4 cards in a 2 × 2 grid, 3 cards in one row, 5 cards in one row. Each card: a small navy number badge or label at the top-left, the English sentence with the target in bold highlight blue, the Mongolian under it. Short word items use chips in rows instead of cards.

**L5 · Rule rows.** Rows of chips read left to right: soft-blue chip (who or what), a thin navy arrow, navy chip (the form), and where given a light-grey chip (the Mongolian). Rows left-aligned, evenly spaced; for 7 rows, group them with extra space between groups. Optional column headers above (24 px bold labels, English with Mongolian under). The explanation sits underneath in a full-width soft-blue panel (radius 24 px, 32 px padding).

**L6 · Grid.** 2 or 3 rows by 2 columns of large soft-blue cards. In each card: the English word big (64 px navy bold) and the Mongolian under it (30 px). Axis labels across the top and down the left as 24 px bold labels, English with Mongolian under.

**L7 · Compare.** Two or three equal columns. Each column starts with a navy header chip (English bold white, Mongolian under in soft blue), then its items stacked as pairs. A thin vertical divider in soft blue between columns.

**L8 · Watch out.** White slide. One large card with a 3 px maroon border and a very pale maroon fill (#FBF3F4) covering the content area. At its top: a maroon warning-triangle icon and the context explanation as a pair. Then each mistake as two rows:

- **Wrong row:** a maroon chip with a ✗ icon and the word *Буруу*; the wrong sentence in text black with the wrong part in maroon and struck through. No translation.
- **Right row:** a green chip with a ✓ icon and the word *Зөв*; the corrected sentence with the corrected part bold green, and its Mongolian translation under it.

**L9 · Model text.** Left 35%: one simple flat illustration of the scene. Right 65%: the lines as stacked pairs, target words bold highlight blue. With more than 5 lines, remove the illustration and set the lines in two columns.

**L10 · Summary.** Navy background, logo top-left on its tile, title *Remember* in white with *Санаж ав* under in soft blue. Three stacked cards (white at 10% opacity, radius 24 px), each with a soft-blue number circle, the English line (36 px white, key words bold soft blue) and the Mongolian under it (28 px soft blue).

## 8. Markup used in Part 2

- **Bold** words in an English line are the target: show them bold in highlight blue (green on a Watch out right row).
- ~~Struck-through~~ words are the mistake: show them maroon and struck through.
- *EN* lines are English, *MN* lines are the Mongolian that goes directly under them.
- *Build* lists what appears on each click, in order. Everything not listed is visible from the start.
- *Visual* describes a picture or diagram. Draw it; never write the description on the slide.

## 9. Animation

- Each item in a *Build* list appears on click with a simple fade, 0.3 s.
- Every slide enters with a fade transition, 0.4 s.
- Nothing flies, bounces, spins, zooms, wipes or types on.

## 10. Illustrations and icons

- One style for the whole deck: simple flat shapes and clean line icons, 3 px strokes, navy with soft-blue fills.
- People are simple neutral figures: a circle head and a rounded body, no faces, no hair detail unless the lesson asks for it.
- No photos, no stock images, no emoji, no clip-art, no 3D, no cartoon characters, no AI-generated people.
- Diagrams (boxes, balls, rooms) are drawn from rounded rectangles and circles: navy outline, soft-blue fill, highlight-blue for the object being described.

## 11. Never do this

- Never write English and Mongolian on one line joined by a dot or a slash.
- Never show slide numbers, timings, click instructions, notes to the teacher, the words *Build* or *Visual*, or anything about practice, quizzes, the course or the website.
- Never use em dashes. Use a colon, a comma or a full stop.
- Never use text below 24 px except the footer, and never shrink text to fit.
- Never place anything except the footer in the bottom 140 px.
- Never fill a slide edge to edge, and never leave a slide looking empty on one side.
- Never invent content, translations, tips, icons or extra slides.
- Never use a second font, a colour outside the palette, gradients, emoji or photos.
- Never translate a wrong sentence.

## 12. Final check

Before you finish, check every slide against this list and fix anything that fails.

- [ ] Exactly the slides in the lesson, in order, each in its named layout.
- [ ] Every title, explanation, English sentence and corrected sentence has its Mongolian line directly underneath.
- [ ] Mongolian copied word for word from the lesson.
- [ ] Logo on every slide, untouched, in the same place; footer on every slide; nothing else in the margins.
- [ ] Titles, logo and footer sit in exactly the same position on every content slide.
- [ ] Nothing under 24 px except the footer; nothing in the bottom 140 px except the footer.
- [ ] Only palette colours; maroon and green only on the Watch out slide.
- [ ] No em dashes, no emoji, no photos, no stray notes.

---

# Part 2 · The lessons

## Lesson 1 · GR-003 · Personal pronouns

Deck name: *GR-003 Personal pronouns*. 10 slides.

### Slide 1 · L1 Title

- Code: GR-003. Level: A1.
- EN: Personal pronouns
- MN: Хувийн төлөөний үг
- Promise EN: By the end, you will never mix up he and she.
- Promise MN: Энэ хичээлийн төгсгөлд he, she хоёрыг хэзээ ч андуурахгүй.

### Slide 2 · L2 Story

- Title EN: Why we need pronouns
- Title MN: Төлөөний үг яагаад хэрэгтэй вэ?
- Visual: one simple boy figure with a name tag *Bat*.

**Panel 1** (light-grey card)

- Label EN: Without pronouns
- Label MN: Төлөөний үггүй
- EN: **Bat** is my friend. **Bat** is 12. **Bat** is very tall. **Bat** is in my class.
- MN: Бат миний найз. Бат 12 настай. Бат их өндөр. Бат манай ангийнх.

**Panel 2** (light-grey card)

- Label EN: With a pronoun
- Label MN: Төлөөний үгтэй
- EN: Bat is my friend. **He** is 12. **He** is very tall. **He** is in my class.
- MN: Бат миний найз. Тэр 12 настай. Тэр их өндөр. Тэр манай ангийнх.

**Explanation**

- EN: Say the name once. After that, a pronoun does the job.
- MN: Нэрийг нэг удаа хэлнэ. Дараа нь төлөөний үг орлоно.
- Build: panel 1, panel 2, explanation.

### Slide 3 · L4 Cards (2 × 2)

- Title EN: Examples
- Title MN: Жишээ
- Card 1 EN: Bat is a student. **He** is 12.
- Card 1 MN: Бат сурагч. Тэр 12 настай.
- Card 2 EN: Saraa is my sister. **She** is a doctor.
- Card 2 MN: Сараа миний эгч. Тэр эмч.
- Card 3 EN: This is my phone. **It** is new.
- Card 3 MN: Энэ миний утас. Тэр шинэ.
- Card 4 EN: Bat and I are friends. **We** are in the same class.
- Card 4 MN: Бат бид хоёр найзууд. Бид нэг ангийнх.
- Visual: on each card, a thin curved navy arrow from the highlighted pronoun back to the name it replaces (He to Bat, She to Saraa, It to my phone, We to Bat and I).
- Explanation EN: A pronoun replaces a word you already said.
- Explanation MN: Төлөөний үг өмнө хэлсэн үгийг орлодог.
- Build: card 1, card 2, card 3, card 4, explanation.

### Slide 4 · L6 Grid (3 rows × 2 columns)

- Title EN: The seven pronouns
- Title MN: Долоон төлөөний үг
- Column labels: EN *One*, MN *Нэг* · EN *More than one*, MN *Олон*
- Row 1 label: EN *The speaker*, MN *Ярьж буй хүн*. Cells: **I** with *би* · **we** with *бид*
- Row 2 label: EN *The listener*, MN *Сонсож буй хүн*. Cells: **you** with *чи, та* · **you** with *та нар*
- Row 3 label: EN *Everyone else*, MN *Бусад*. Cells: **he, she, it** with *тэр* · **they** with *тэд*
- Explanation EN: Seven words, one simple system.
- Explanation MN: Долоон үг, нэг энгийн систем.
- Build: row 1, row 2, row 3, explanation.

### Slide 5 · L5 Rule rows

- Title EN: One you for three Mongolian words
- Title MN: Монгол хэлний гурван үгэнд ганц you
- Row 1: grey chip *чи* → navy chip **you**. Small label under: EN *your little brother*, MN *дүү*
- Row 2: grey chip *та* → navy chip **you**. Small label under: EN *your teacher*, MN *багш*
- Row 3: grey chip *та нар* → navy chip **you**. Small label under: EN *a whole class*, MN *бүх анги*
- Visual: the three arrows meet at one large navy *you* chip on the right instead of three separate chips.
- Explanation EN: Politeness comes from words like please, not from a different you.
- Explanation MN: Эелдэг байдлыг өөр you-гээр биш, please гэх мэт үгээр илэрхийлнэ.
- Build: all three rows together, then the explanation.

### Slide 6 · L7 Compare (3 columns)

- Title EN: One тэр, three English words
- Title MN: Нэг "тэр", англиар гурван үг
- Visual: a grey chip *тэр* centred above the columns, with three thin arrows down into the three column headers. A simple icon at the top of each column: a man figure, a woman figure, a box.
- Column 1 header EN: **he** · a man or a boy. MN: эрэгтэй хүн, хүү
- Column 1 items EN: Bat · my father · my brother. MN: Бат · аав · ах
- Column 2 header EN: **she** · a woman or a girl. MN: эмэгтэй хүн, охин
- Column 2 items EN: Saraa · my mother · my sister. MN: Сараа · ээж · эгч
- Column 3 header EN: **it** · a thing, a place, an animal. MN: юм, газар, амьтан
- Column 3 items EN: my phone · the school · my cat. MN: утас · сургууль · муур
- Explanation EN: Ask first: a man, a woman or a thing?
- Explanation MN: Эхлээд асуу: эрэгтэй юү, эмэгтэй юү, эсвэл юм уу?
- Build: column 1, column 2, column 3, explanation.

### Slide 7 · L7 Compare (2 columns)

- Title EN: Two rules English never breaks
- Title MN: Англи хэлэнд хэзээ ч зөрчигддөггүй хоёр дүрэм
- Column 1 header EN: I is always a capital letter. MN: I үргэлж том үсгээр бичигдэнэ.
- Column 1 pairs: EN *I am a student.* MN *Би сурагч.* · EN *Today **I** am tired.* MN *Өнөөдөр би ядарч байна.* · EN *Bat and **I** are friends.* MN *Бат бид хоёр найзууд.*
- Column 2 header EN: Every sentence needs a subject. MN: Өгүүлбэр бүрт өгүүлэгдэхүүн хэрэгтэй.
- Column 2 pairs, shown Mongolian first on purpose, with a navy arrow down to the English: *Хүйтэн байна.* → ***It** is cold.* · *12 настай.* → ***He** is 12.*
- Build: column 1, column 2.

### Slide 8 · L8 Watch out

- Title EN: Watch out!
- Title MN: Анхаар!
- Context EN: In Mongolian, тэр is the same for a man and a woman.
- Context MN: Монголоор "тэр" эрэгтэй, эмэгтэйг ялгадаггүй.
- Mistake 1 wrong: My mother is a teacher. ~~He~~ is kind.
- Mistake 1 right EN: My mother is a teacher. **She** is kind.
- Mistake 1 right MN: Ээж маань багш. Тэр сайхан сэтгэлтэй.
- Mistake 2 wrong: Bat is my friend. ~~Is~~ very tall.
- Mistake 2 right EN: Bat is my friend. **He is** very tall.
- Mistake 2 right MN: Бат миний найз. Тэр их өндөр.
- Mistake 3 wrong: ~~i~~ am a student.
- Mistake 3 right EN: **I** am a student.
- Mistake 3 right MN: Би сурагч.
- Build: wrong 1, right 1, wrong 2, right 2, wrong 3, right 3.

### Slide 9 · L9 Model text (two columns, no illustration)

- Title EN: Model text: my family
- Title MN: Загвар эх: миний гэр бүл
- Line 1 EN: This is my family. MN: Энэ миний гэр бүл.
- Line 2 EN: My father is Bold. **He** is a driver. MN: Аав маань Болд. Тэр жолооч.
- Line 3 EN: My mother is Saraa. **She** is a doctor. MN: Ээж маань Сараа. Тэр эмч.
- Line 4 EN: My sister and I are students. **We** are in the same school. MN: Эгч бид хоёр сурагчид. Бид нэг сургуульд сурдаг.
- Line 5 EN: This is our cat. **It** is black and white. MN: Энэ манай муур. Тэр хар цагаан өнгөтэй.
- Line 6 EN: My grandparents are in Khovd. **They** are very kind. MN: Өвөө эмээ маань Ховдод байдаг. Тэд их сайхан сэтгэлтэй.
- Build: one line per click.

### Slide 10 · L10 Summary

- Card 1 EN: **I / we** · **you** · **he, she, it / they**
- Card 1 MN: Ярьж буй хүн, сонсож буй хүн, бусад.
- Card 2 EN: тэр → **he** (a man) · **she** (a woman) · **it** (a thing)
- Card 2 MN: тэр → he (эрэгтэй) · she (эмэгтэй) · it (юм)
- Card 3 EN: **I** is always a capital. Every sentence needs a subject.
- Card 3 MN: I үргэлж том үсгээр. Өгүүлбэр бүрт өгүүлэгдэхүүн хэрэгтэй.
- Build: one card per click.

---

## Lesson 2 · GR-004 · to be: positive

Deck name: *GR-004 to be positive*. 10 slides.

### Slide 1 · L1 Title

- Code: GR-004. Level: A1.
- EN: to be: positive
- MN: To be үйл үг: эерэг хэлбэр
- Promise EN: By the end, you can introduce yourself and describe anyone.
- Promise MN: Энэ хичээлийн төгсгөлд өөрийгөө танилцуулж, бусдыг дүрсэлж чадна.

### Slide 2 · L2 Story

- Title EN: A self-introduction
- Title MN: Өөрийгөө танилцуулах
- Visual: a simple profile card with a girl figure and a name tag *Anu*.
- Line 1 EN: I **am** Anu. MN: Би Ану.
- Line 2 EN: I **am** 14. MN: Би 14 настай.
- Line 3 EN: I **am** from Erdenet. MN: Би Эрдэнэтээс ирсэн.
- Line 4 EN: My brother **is** 10. MN: Дүү маань 10 настай.
- Line 5 EN: My parents **are** teachers. MN: Аав ээж маань багш нар.
- Explanation EN: am, is, are: three forms of one verb.
- Explanation MN: am, is, are: нэг үйл үгийн гурван хэлбэр.
- Build: one line per click, then the explanation.

### Slide 3 · L4 Cards (2 × 2)

- Title EN: Examples
- Title MN: Жишээ
- Card 1 EN: I **am** a student. MN: Би сурагч.
- Card 2 EN: She **is** my teacher. MN: Тэр миний багш.
- Card 3 EN: They **are** from Ulaanbaatar. MN: Тэд Улаанбаатараас ирсэн.
- Card 4 EN: It **is** cold today. MN: Өнөөдөр хүйтэн байна.
- Explanation EN: Which words go with is?
- Explanation MN: Аль үгс is-тэй хамт ордог вэ?
- Build: card 1, card 2, card 3, card 4, explanation.

### Slide 4 · L5 Rule rows

- Title EN: am, is, are
- Title MN: Be үйл үгийн гурван хэлбэр
- Row 1: soft-blue chip **I** → navy chip **am**
- Row 2: soft-blue chip **he / she / it** → navy chip **is**
- Row 3: soft-blue chip **you / we / they** → navy chip **are**
- Explanation EN: One verb, three forms. The subject decides.
- Explanation MN: Нэг үйл үг, гурван хэлбэр. Өгүүлэгдэхүүн шийднэ.
- Build: row 1, row 2, row 3, explanation.

### Slide 5 · L7 Compare (2 columns)

- Title EN: Names and nouns
- Title MN: Хүний нэр ба нэр үг
- Column 1 header EN: **is** · one person or thing. MN: нэг хүн эсвэл юм
- Column 1 items: Bat is · my father is · the book is · Ulaanbaatar is
- Column 1 hint chip: Bat = he → is
- Column 2 header EN: **are** · more than one. MN: нэгээс олон
- Column 2 items: Bat and Saraa are · my parents are · the books are · the students are
- Column 2 hint chip: my parents = they → are
- Explanation EN: Swap it for a pronoun in your head, then choose.
- Explanation MN: Толгойдоо төлөөний үгээр орлуулж бодоод, дараа нь сонго.
- Build: column 1, column 2, explanation.

### Slide 6 · L4 Cards (2 × 2, each card with a label on top)

- Title EN: What be is used for
- Title MN: Be юунд хэрэглэгддэг вэ?
- Card 1 label EN: Who or what someone is. MN: Хэн, юу болох
- Card 1 EN: She **is** a doctor. MN: Тэр эмч.
- Card 2 label EN: What someone is like. MN: Ямар байх
- Card 2 EN: He **is** tall. MN: Тэр өндөр.
- Card 3 label EN: Where someone is from. MN: Хаанаас ирсэн
- Card 3 EN: We **are** from Mongolia. MN: Бид Монголоос ирсэн.
- Card 4 label EN: Age. MN: Нас
- Card 4 EN: I **am** 14. MN: Би 14 настай.
- Build: one card per click.

### Slide 7 · L5 Rule rows (7 rows in two groups)

- Title EN: Short forms
- Title MN: Товчилсон хэлбэр
- Column headers EN: Full · Short. MN: Бүтэн · Товч
- Rows (soft-blue chip → navy chip): I am → **I'm** · you are → **you're** · he is → **he's** · she is → **she's** · it is → **it's** · we are → **we're** · they are → **they're**
- Explanation 1 EN: The apostrophe ( ' ) shows a missing letter.
- Explanation 1 MN: Апостроф ( ' ) хасагдсан үсгийг заана.
- Explanation 2 EN: Short forms for speaking, full forms for formal writing.
- Explanation 2 MN: Ярихдаа товч хэлбэр, албан бичигт бүтэн хэлбэр.
- Build: all rows together, explanation 1, explanation 2.

### Slide 8 · L8 Watch out

- Title EN: Watch out!
- Title MN: Анхаар!
- Context EN: Mongolian needs no verb here. English always does.
- Context MN: Монголоор: Би сурагч. Англиар: I am a student.
- Mistake 1 wrong: She very happy.
- Mistake 1 right EN: She **is** very happy. MN: Тэр их баяртай байна.
- Mistake 2 wrong: My brother 12 years old.
- Mistake 2 right EN: My brother **is** 12 years old. MN: Дүү маань 12 настай.
- Mistake 3 wrong: My parents ~~is~~ teachers.
- Mistake 3 right EN: My parents **are** teachers. MN: Аав ээж маань багш нар.
- Visual: in mistakes 1 and 2, show a small maroon gap marker ( ^ ) where the missing word belongs.
- Build: wrong 1, right 1, wrong 2, right 2, wrong 3, right 3.

### Slide 9 · L9 Model text (two columns, no illustration)

- Title EN: Model text: about me
- Title MN: Загвар эх: миний тухай
- Line 1 EN: Hi! **I'm** Temuulen. MN: Сайн уу! Би Тэмүүлэн.
- Line 2 EN: **I'm** 15, and **I'm** from Darkhan. MN: Би 15 настай, Дарханаас ирсэн.
- Line 3 EN: My father **is** an engineer, and my mother **is** a nurse. MN: Аав маань инженер, ээж маань сувилагч.
- Line 4 EN: My brothers **are** 8 and 11. MN: Дүү нар маань 8, 11 настай.
- Line 5 EN: Our flat **is** small, but **it's** warm. MN: Манай байр жижиг ч дулаахан.
- Line 6 EN: **I'm** happy here. MN: Би энд аз жаргалтай байна.
- Build: one line per click.

### Slide 10 · L10 Summary

- Card 1 EN: I **am** · he / she / it **is** · you / we / they **are**
- Card 1 MN: am, is, are: өгүүлэгдэхүүнээс хамаарна.
- Card 2 EN: One thing → **is** · more than one → **are**
- Card 2 MN: Нэг зүйл → is · олон → are
- Card 3 EN: Every English sentence needs a verb.
- Card 3 MN: Англи өгүүлбэрт үйл үг заавал байна.
- Build: one card per click.

---

## Lesson 3 · GR-005 · to be: negative and questions

Deck name: *GR-005 to be negative and questions*. 10 slides.

### Slide 1 · L1 Title

- Code: GR-005. Level: A1.
- EN: to be: negative and questions
- MN: To be: үгүйсгэх ба асуух хэлбэр
- Promise EN: By the end, you can say no, ask questions and meet someone new.
- Promise MN: Энэ хичээлийн төгсгөлд үгүйсгэж, асууж, шинэ хүнтэй танилцаж чадна.

### Slide 2 · L3 Dialogue (6 bubbles, two columns)

- Title EN: A first conversation
- Title MN: Анхны танилцах яриа
- Saraa EN: **Are** you a new student? MN: Чи шинэ сурагч уу?
- Tuvshin EN: Yes, I am. MN: Тийм ээ.
- Saraa EN: **Are** you from Ulaanbaatar? MN: Чи Улаанбаатарынх уу?
- Tuvshin EN: No, I'm **not**. I'm from Khovd. MN: Үгүй. Би Ховдынх.
- Saraa EN: **Is** your sister at this school too? MN: Эгч чинь бас энэ сургуульд сурдаг уу?
- Tuvshin EN: No, she **isn't**. She's at university. MN: Үгүй. Тэр их сургуульд сурдаг.
- Explanation EN: Questions start with are or is. To say no, use not.
- Explanation MN: Асуулт are, is-ээр эхэлнэ. Үгүйсгэхдээ not хэрэглэнэ.
- Build: one bubble per click, then the explanation.

### Slide 3 · L4 Cards (2 × 2)

- Title EN: Saying no
- Title MN: Үгүйсгэх
- Card 1 EN: I am **not** tired. MN: Би ядраагүй байна.
- Card 2 EN: He **isn't** at home. MN: Тэр гэртээ байхгүй.
- Card 3 EN: We **aren't** late. MN: Бид хоцроогүй.
- Card 4 EN: It is **not** cold today. MN: Өнөөдөр хүйтэн биш байна.
- Explanation EN: not comes straight after am, is or are.
- Explanation MN: not нь am, is, are-ийн яг ард орно.
- Build: card 1, card 2, card 3, card 4, explanation.

### Slide 4 · L5 Rule rows (with column headers)

- Title EN: The negative
- Title MN: Үгүйсгэх хэлбэр
- Column headers EN: Subject · Full form · Short form. MN: Өгүүлэгдэхүүн · Бүтэн хэлбэр · Товч хэлбэр
- Row 1: **I** → **am not** → I'm not
- Row 2: **he / she / it** → **is not** → isn't · he's not
- Row 3: **you / we / they** → **are not** → aren't · you're not
- Visual: under the rows, a small maroon struck-through chip ~~I amn't~~.
- Explanation EN: There is no amn't.
- Explanation MN: Amn't гэж байдаггүй.
- Build: row 1, row 2, row 3, then the struck chip with the explanation.

### Slide 5 · L5 Rule rows

- Title EN: Making a question
- Title MN: Асуулт үүсгэх
- Row 1: chips \[You\] \[are\] \[a student.\] with MN under: Чи сурагч.
- Row 2: chips \[Are\] \[you\] \[a student?\] with MN under: Чи сурагч уу?
- Visual: two thin navy arrows crossing between row 1 and row 2 to show *You* and *are* swapping places. A small rising arrow ↗ after the question mark.
- Example 1 EN: She is at home. → **Is she** at home? MN: Тэр гэртээ байна уу?
- Example 2 EN: Bat is 12. → **Is Bat** 12? MN: Бат 12 настай юу?
- Explanation EN: The verb jumps to the front. Your voice goes up.
- Explanation MN: Үйл үг урд гарна. Дуу дээшилнэ.
- Build: row 1, row 2 with arrows, example 1, example 2, explanation.

### Slide 6 · L5 Rule rows (table of 3 columns)

- Title EN: Short answers
- Title MN: Богино хариулт
- Column headers EN: Question · Yes · No. MN: Асуулт · Тийм · Үгүй
- Row 1: Are you ready? (MN under: Чи бэлэн үү?) · Yes, I am. · No, I'm not.
- Row 2: Is she your sister? (MN under: Тэр чиний эгч үү?) · Yes, she is. · No, she isn't.
- Row 3: Are they at school? (MN under: Тэд сургууль дээрээ байна уу?) · Yes, they are. · No, they aren't.
- Row 4: Is Bat 12? (MN under: Бат 12 настай юу?) · Yes, he is. · No, he isn't.
- Visual: the Yes column in soft-blue chips, the No column in light-grey chips.
- Explanation EN: Yes keeps the full form. No can be short.
- Explanation MN: Yes бол бүтэн хэлбэр, No бол товч хэлбэр болж болно.
- Build: one row per click, then the explanation.

### Slide 7 · L5 Rule rows

- Title EN: Question words
- Title MN: Асуух үг
- Formula row: \[Question word\] + \[am / is / are\] + \[subject\]. Small MN labels under the chips: асуух үг · үйл үг · өгүүлэгдэхүүн
- Row 1 EN: **What is** your name? → I'm Anu. MN: Чамайг хэн гэдэг вэ? → Намайг Ану гэдэг.
- Row 2 EN: **Where are** you from? → I'm from Khovd. MN: Чи хаанаас ирсэн бэ? → Би Ховдоос ирсэн.
- Row 3 EN: **How old is** your sister? → She's 8. MN: Дүү чинь хэдэн настай вэ? → 8 настай.
- Row 4 EN: **Who is** that? → That's my teacher. MN: Тэр хэн бэ? → Тэр миний багш.
- Visual: a small falling arrow ↘ after each question.
- Explanation EN: With a question word, your voice goes down.
- Explanation MN: Асуух үгтэй асуултад дуу доошилно.
- Build: formula, row 1, row 2, row 3, row 4, explanation.

### Slide 8 · L8 Watch out

- Title EN: Watch out!
- Title MN: Анхаар!
- Context EN: In Mongolian, the word order stays the same in a question.
- Context MN: Монголоор асуултад үгийн дараалал өөрчлөгддөггүй.
- Mistake 1 wrong: ~~You are~~ a student?
- Mistake 1 right EN: **Are you** a student? MN: Чи сурагч уу?
- Mistake 2 wrong: Where ~~you are~~ from?
- Mistake 2 right EN: Where **are you** from? MN: Чи хаанаас ирсэн бэ?
- Mistake 3 wrong: Yes, ~~I'm~~.
- Mistake 3 right EN: Yes, **I am**. MN: Тийм ээ.
- Build: wrong 1, right 1, wrong 2, right 2, wrong 3, right 3.

### Slide 9 · L3 Dialogue (8 bubbles, two columns)

- Title EN: Model text: meeting someone
- Title MN: Загвар эх: шинэ хүнтэй танилцах
- A EN: Hi! **What's** your name? MN: Сайн уу! Чамайг хэн гэдэг вэ?
- B EN: I'm Tuvshin. MN: Намайг Түвшин гэдэг.
- A EN: **Where are you** from, Tuvshin? MN: Түвшин, чи хаанаас ирсэн бэ?
- B EN: I'm from Khovd. MN: Би Ховдоос ирсэн.
- A EN: **Are you** a student here? MN: Чи энд сурдаг уу?
- B EN: **Yes, I am.** I'm 15. MN: Тийм ээ. Би 15 настай.
- A EN: **Is** your sister here too? MN: Дүү чинь бас энд байна уу?
- B EN: **No, she isn't.** She's only 6! MN: Үгүй. Тэр ердөө 6 настай!
- Build: one bubble per click.

### Slide 10 · L10 Summary

- Card 1 EN: Negative: **am not** · **isn't** · **aren't**
- Card 1 MN: Үгүйсгэл: not-ийг үйл үгийн ард.
- Card 2 EN: Question: swap. **Are you** ...? **Where is** ...?
- Card 2 MN: Асуулт: байрыг соль.
- Card 3 EN: Yes, **I am**. · No, **I'm not**.
- Card 3 MN: Тийм бол бүтэн хэлбэр, үгүй бол товч хэлбэр.
- Build: one card per click.

---

## Lesson 4 · GR-001 · Nouns: singular and plural

Deck name: *GR-001 Nouns singular and plural*. 10 slides.

### Slide 1 · L1 Title

- Code: GR-001. Level: A1.
- EN: Nouns: singular and plural
- MN: Нэр үг: ганц ба олон тоо
- Promise EN: By the end, you can turn one thing into many and say the ending right.
- Promise MN: Энэ хичээлийн төгсгөлд нэг зүйлийг олон болгож, төгсгөлийг зөв дуудаж чадна.

### Slide 2 · L7 Compare (2 columns, 4 rows)

- Title EN: One and many
- Title MN: Нэг ба олон
- Column headers EN: One · Many. MN: Нэг · Олон
- Visual: in each row, a simple icon of the object: one copy on the left, several copies on the right.
- Row 1 EN: one book → two book**s**. MN: нэг ном → хоёр ном
- Row 2 EN: one box → three box**es**. MN: нэг хайрцаг → гурван хайрцаг
- Row 3 EN: one bab**y** → two bab**ies**. MN: нэг нялх хүүхэд → хоёр нялх хүүхэд
- Row 4 EN: one **child** → four **children**. MN: нэг хүүхэд → дөрвөн хүүхэд
- Explanation EN: Look at the end of each word.
- Explanation MN: Үг бүрийн төгсгөлийг ажигла.
- Build: one row per click, then the explanation.

### Slide 3 · L5 Rule rows

- Title EN: Rule 1: most nouns add -s
- Title MN: Дүрэм 1: ихэнх нэр үг -s авна
- Explanation 1 EN: Singular means one. Plural means more than one.
- Explanation 1 MN: Singular гэдэг нь ганц тоо. Plural гэдэг нь олон тоо.
- Rule chip: navy chip **+ s**
- Pairs as chips, each with a small gloss under: book → book**s** (ном) · cat → cat**s** (муур) · pen → pen**s** (үзэг) · girl → girl**s** (охин) · apple → apple**s** (алим)
- Build: explanation 1, then the rule chip and all pairs together.

### Slide 4 · L5 Rule rows

- Title EN: Rule 2: -s, -ss, -sh, -ch, -x add -es
- Title MN: Дүрэм 2: -s, -ss, -sh, -ch, -x-ээр төгссөн үг -es авна
- Ending chips (soft blue): -s · -ss · -sh · -ch · -x
- Pairs, each with a small gloss under: bus → bus**es** (автобус) · class → class**es** (анги) · dish → dish**es** (таваг) · watch → watch**es** (бугуйн цаг) · box → box**es** (хайрцаг)
- Explanation EN: The word gets one syllable longer: bus, bus-es.
- Explanation MN: Үг нэг үеэр уртасна: bus, bus-es.
- Build: ending chips, pairs, explanation.

### Slide 5 · L5 Rule rows (table of 3 rows)

- Title EN: Rule 3: words ending in -y and -f
- Title MN: Дүрэм 3: -y, -f-ээр төгссөн үг
- Row 1: soft-blue chip *consonant + y* (MN under: гийгүүлэгч + y) → navy chip **y → ies** → baby → bab**ies** · city → cit**ies** · family → famil**ies**
- Row 2: soft-blue chip *vowel + y* (MN under: эгшиг + y) → navy chip **+ s** → boy → boy**s** · day → day**s** · key → key**s**
- Row 3: soft-blue chip *-f, -fe* → navy chip **→ ves** → knife → kni**ves** · leaf → lea**ves** · wife → wi**ves**. Small grey note at the end of the row: EN *usually* MN *ихэвчлэн*
- Explanation EN: For -y, look at the letter just before it.
- Explanation MN: -y-ийн яг өмнөх үсгийг хар.
- Build: row 1, row 2, row 3, explanation.

### Slide 6 · L7 Compare (3 columns)

- Title EN: How the ending sounds
- Title MN: Төгсгөл хэрхэн дуудагдах вэ?
- Column 1 header EN: /s/ · a sharp s. MN: хатуу s. Items: cats · books · maps · desks
- Column 2 header EN: /z/ · a buzzing z. MN: зөөлөн z. Items: dogs · pens · days · boys
- Column 3 header EN: /ɪz/ · a new syllable. MN: шинэ үе. Items: buses · boxes · watches · pages
- Visual: a small sound-wave icon in each header chip.
- Explanation EN: One letter, three sounds.
- Explanation MN: Нэг үсэг, гурван дуудлага.
- Build: column 1, column 2, column 3, explanation.

### Slide 7 · L5 Rule rows (3 rows, two pairs per row)

- Title EN: Irregular plurals
- Title MN: Дүрмийн бус олон тоо
- Row 1: man → **men** (эрэгтэй хүн) · woman → **women** (эмэгтэй хүн)
- Row 2: child → **children** (хүүхэд) · person → **people** (хүн)
- Row 3: tooth → **teeth** (шүд) · foot → **feet** (хөл)
- Explanation 1 EN: No rule here. Learn them as pairs.
- Explanation 1 MN: Энд дүрэм байхгүй. Хосоор нь цээжил.
- Explanation 2 EN: women is said wi-min.
- Explanation 2 MN: women-ийг "уимин" гэж дуудна.
- Build: row 1, row 2, row 3, explanation 1, explanation 2.

### Slide 8 · L8 Watch out

- Title EN: Watch out!
- Title MN: Анхаар!
- Context EN: After a number, Mongolian keeps the word the same. English changes it.
- Context MN: Монголоор тооны дараа үг өөрчлөгддөггүй. Англиар өөрчлөгдөнө.
- Mistake 1 wrong: three ~~book~~
- Mistake 1 right EN: three **books**. MN: гурван ном
- Mistake 2 wrong: two ~~childs~~
- Mistake 2 right EN: two **children**. MN: хоёр хүүхэд
- Mistake 3 wrong: many ~~peoples~~
- Mistake 3 right EN: many **people**. MN: олон хүн
- Build: wrong 1, right 1, wrong 2, right 2, wrong 3, right 3.

### Slide 9 · L9 Model text (illustration + 5 lines)

- Title EN: Model text: my school bag
- Title MN: Загвар эх: миний сургуулийн цүнх
- Visual: a simple open school bag with books, pens and a lunch box.
- Line 1 EN: This is my school bag. MN: Энэ миний сургуулийн цүнх.
- Line 2 EN: I have two book**s** and one notebook. MN: Надад хоёр ном, нэг дэвтэр бий.
- Line 3 EN: I have three pen**s**, five pencil**s** and two box**es** of crayon**s**. MN: Надад гурван үзэг, таван харандаа, хоёр хайрцаг өнгийн харандаа бий.
- Line 4 EN: My key**s** are in the small pocket. MN: Түлхүүрүүд маань жижиг халаасанд байгаа.
- Line 5 EN: My lunch is two sandwich**es** and an apple. MN: Өдрийн хоол маань хоёр сэндвич, нэг алим.
- Build: one line per click.

### Slide 10 · L10 Summary

- Card 1 EN: Most nouns **+ s** · -s, -sh, -ch, -x **+ es** · consonant + y → **ies**
- Card 1 MN: Ихэнх үг + s · -s, -sh, -ch, -x + es · гийгүүлэгч + y → ies
- Card 2 EN: man → **men** · child → **children** · person → **people**
- Card 2 MN: Дүрмийн бус үгсийг хосоор нь цээжил.
- Card 3 EN: After a number, use the plural: three book**s**
- Card 3 MN: Тооны дараа олон тоо: three books
- Build: one card per click.

---

## Lesson 5 · GR-002 · a and an

Deck name: *GR-002 a and an*. 11 slides.

### Slide 1 · L1 Title

- Code: GR-002. Level: A1.
- EN: a and an
- MN: A ба an
- Promise EN: By the end, you will never forget the small word Mongolian doesn't have.
- Promise MN: Энэ хичээлийн төгсгөлд монгол хэлэнд байхгүй жижиг үгийг хэзээ ч мартахгүй.

### Slide 2 · L4 Cards (3 in a row)

- Title EN: The missing word
- Title MN: Монгол хэлэнд байдаггүй үг
- Visual: a small icon at the top of each card: a boy, a doctor's bag, an apple.
- Card 1 EN: I have **a** brother. MN: Надад ах бий.
- Card 2 EN: She is **a** doctor. MN: Тэр эмч.
- Card 3 EN: This is **an** apple. MN: Энэ алим.
- Explanation EN: Look at the Mongolian: nothing stands where a and an are.
- Explanation MN: Монгол өгүүлбэрт a, an-ий оронд юу ч байхгүй.
- Build: card 1, card 2, card 3, explanation.

### Slide 3 · L4 Cards (word chips, 2 rows of 4)

- Title EN: Examples
- Title MN: Жишээ
- Row 1 chips, each with a small gloss under: **a** cat (муур) · **a** dog (нохой) · **a** book (ном) · **a** house (байшин)
- Row 2 chips, each with a small gloss under: **an** apple (алим) · **an** egg (өндөг) · **an** orange (жүрж) · **an** umbrella (шүхэр)
- Explanation EN: What is different about the second row?
- Explanation MN: Хоёр дахь мөрийн үгс юугаараа өөр вэ?
- Build: row 1, row 2, explanation.

### Slide 4 · L5 Rule rows

- Title EN: a or an?
- Title MN: a уу, an уу?
- Row 1: navy chip **a** → soft-blue chip *+ consonant sound* (MN under: гийгүүлэгч авиа) → grey chip: a cat, a book, a teacher
- Row 2: navy chip **an** → soft-blue chip *+ vowel sound* (MN under: эгшиг авиа) → grey chip: an apple, an egg, an orange
- Row 3: five small soft-blue chips **a e i o u** with the label EN *vowels*, MN *эгшиг*
- Visual: under the rows, *an‿apple* in large type with a small navy linking arc between the n and the a.
- Explanation EN: The n joins the next word: an apple.
- Explanation MN: n дараагийн үгтэйгээ холбогдоно: an apple.
- Build: row 1, row 2, row 3, linking visual with explanation.

### Slide 5 · L7 Compare (2 columns)

- Title EN: Sound, not letter
- Title MN: Үсэг биш, авиа
- Column 1 header EN: **a** · starts with a "you" sound. MN: "ю" авиагаар эхэлнэ
- Column 1 items: **a** university (их сургууль) · **a** uniform (дүрэмт хувцас)
- Column 2 header EN: **an** · the h is silent. MN: h дуудагдахгүй
- Column 2 items: **an** hour (цаг) · **an** honest man (шударга хүн)
- Visual: in each item, the first letter in a small grey circle with a tiny ear icon beside the column header.
- Explanation EN: Your ears decide, not your eyes.
- Explanation MN: Нүд биш, чих шийднэ.
- Build: column 1, column 2, explanation.

### Slide 6 · L7 Compare (2 columns)

- Title EN: The next word decides
- Title MN: Дараагийн үг шийднэ
- Column 1 header EN: Noun alone. MN: Нэр үг дангаараа
- Column 1 items: **an** apple · **a** car · **an** egg
- Column 2 header EN: With an adjective. MN: Тэмдэг нэртэй
- Column 2 items: **a** red apple (улаан алим) · **an** old car (хуучин машин) · **a** big egg (том өндөг)
- Visual: a thin navy arrow from each item in column 1 to its partner in column 2.
- Explanation EN: a and an look only at the next word.
- Explanation MN: a, an зөвхөн дараагийн үгээ хардаг.
- Build: one pair per click, then the explanation.

### Slide 7 · L4 Cards (3 in a row, each with a label)

- Title EN: When we use a and an
- Title MN: A, an-г хэзээ хэрэглэх вэ?
- Card 1 label EN: One of something. MN: Нэг зүйл
- Card 1 EN: I have **a** brother. MN: Надад ах бий.
- Card 2 label EN: Jobs. MN: Ажил мэргэжил
- Card 2 EN: He is **a** driver. MN: Тэр жолооч.
- Card 3 label EN: Never with plurals. MN: Олон тоотой хэзээ ч хэрэглэхгүй
- Card 3 content: green chip *a book* · green chip *books* · maroon struck chip ~~a books~~
- Explanation EN: a and an mean one.
- Explanation MN: a, an нь "нэг" гэсэн утгатай.
- Build: card 1, card 2, card 3, explanation.

### Slide 8 · L5 Rule rows

- Title EN: How a sounds
- Title MN: A хэрхэн дуудагдах вэ?
- Large navy chip: **a = /ə/**
- Chips in a row, the stressed part in bold: a **CAT** · a **BOOK** · an **AP**ple
- Explanation 1 EN: In speech, a is a quick, soft "uh".
- Explanation 1 MN: Ярианд a нь богино, сул "э" авиа.
- Explanation 2 EN: The stress goes on the noun.
- Explanation 2 MN: Өргөлт нэр үг дээр бууна.
- Build: big chip with explanation 1, the row of chips with explanation 2.

### Slide 9 · L8 Watch out

- Title EN: Watch out!
- Title MN: Анхаар!
- Context EN: Mongolian has no a or an, so it is easy to forget.
- Context MN: Монгол хэлэнд a, an байдаггүй тул амархан мартагддаг.
- Mistake 1 wrong: She is teacher.
- Mistake 1 right EN: She is **a** teacher. MN: Тэр багш.
- Mistake 2 wrong: I have ~~a books~~.
- Mistake 2 right EN: I have **a book**. MN: Надад ном бий.
- Mistake 3 wrong: ~~an~~ university
- Mistake 3 right EN: **a** university. MN: их сургууль
- Visual: in mistake 1, a small maroon gap marker ( ^ ) where *a* is missing.
- Build: wrong 1, right 1, wrong 2, right 2, wrong 3, right 3.

### Slide 10 · L9 Model text (illustration + 5 lines)

- Title EN: Model text: my family
- Title MN: Загвар эх: миний гэр бүл
- Visual: a simple family group of five figures with a dog and a cat.
- Line 1 EN: My father is **an** engineer. MN: Аав маань инженер.
- Line 2 EN: My mother is **a** teacher. MN: Ээж маань багш.
- Line 3 EN: I have **a** brother and **an** older sister. MN: Надад нэг дүү, нэг эгч бий.
- Line 4 EN: My sister is **a** university student. MN: Эгч маань их сургуулийн оюутан.
- Line 5 EN: We have **a** dog and **an** old cat. MN: Манайд нохой, бас хөгшин муур бий.
- Build: one line per click.

### Slide 11 · L10 Summary

- Card 1 EN: **a** + consonant sound · **an** + vowel sound
- Card 1 MN: a + гийгүүлэгч авиа · an + эгшиг авиа
- Card 2 EN: The sound decides: **an** hour · **a** university
- Card 2 MN: Авиа шийднэ: an hour · a university
- Card 3 EN: Jobs need a or an: He is **a** driver.
- Card 3 MN: Ажил мэргэжилд a, an заавал хэрэгтэй.
- Build: one card per click.

---

## Lesson 6 · GR-006 · this, that, these, those

Deck name: *GR-006 this that these those*. 10 slides.

### Slide 1 · L1 Title

- Code: GR-006. Level: A1.
- EN: this, that, these, those
- MN: Заах төлөөний үг
- Promise EN: By the end, you can point to anything, near or far, one or many.
- Promise MN: Энэ хичээлийн төгсгөлд ойр, хол, нэг, олон юуг ч зааж хэлж чадна.

### Slide 2 · L2 Story

- Title EN: Near and far
- Title MN: Ойр ба хол
- Visual: a person figure on the left. Close to them, drawn large: a bag and a pair of shoes. Far away on the right, drawn small with a faint dotted line back to the person: a house and two friends.
- Line 1 EN: **This** is my bag. MN: Энэ миний цүнх.
- Line 2 EN: **That** is my house. MN: Тэр миний байшин.
- Line 3 EN: **These** are my shoes. MN: Эдгээр миний гутал.
- Line 4 EN: **Those** are my friends. MN: Тэдгээр миний найзууд.
- Explanation EN: Mongolian has энэ and тэр. Why does English need four words?
- Explanation MN: Монголоор энэ, тэр гэдэг. Англиар яагаад дөрвөн үг хэрэгтэй вэ?
- Build: one line per click, each with its object highlighted in the picture, then the explanation.

### Slide 3 · L6 Grid (2 × 2)

- Title EN: Two questions
- Title MN: Хоёр асуулт
- Column labels: EN *One*, MN *Нэг* · EN *Many*, MN *Олон*
- Row labels: EN *Near*, MN *Ойр* · EN *Far*, MN *Хол*
- Cells: **this** with *энэ* · **these** with *эдгээр* · **that** with *тэр* · **those** with *тэдгээр*
- Explanation EN: Near or far? One or many?
- Explanation MN: Ойр уу, хол уу? Нэг үү, олон уу?
- Build: this, these, that, those, explanation.

### Slide 4 · L7 Compare (2 columns)

- Title EN: With a noun, everything agrees
- Title MN: Нэр үгтэй бол бүгд зохицно
- Column 1 header EN: One. MN: Нэг
- Column 1 items: this book (энэ ном) · that car (тэр машин) · EN *This **is** my pen.* MN *Энэ миний үзэг.*
- Column 2 header EN: Many. MN: Олон
- Column 2 items: these book**s** (эдгээр ном) · those car**s** (тэдгээр машин) · EN *These **are** my pen**s**.* MN *Эдгээр миний үзэгнүүд.*
- Visual: under the columns, three chips joined by plus signs: **these** + **books** + **are**, with the label EN *all plural*, MN *бүгд олон тоо*.
- Explanation EN: Three words change together.
- Explanation MN: Гурван үг хамт өөрчлөгдөнө.
- Build: column 1, column 2, the three chips with the explanation.

### Slide 5 · L5 Rule rows

- Title EN: What is this?
- Title MN: Энэ юу вэ?
- Column headers EN: Question · Answer. MN: Асуулт · Хариулт
- Row 1 EN: What is **this**? → **It's** a pen. MN: Энэ юу вэ? → Үзэг.
- Row 2 EN: What are **those**? → **They're** my shoes. MN: Тэдгээр юу вэ? → Миний гутал.
- Row 3 EN: Who is **that**? → **That's** my brother. MN: Тэр хэн бэ? → Миний ах.
- Explanation EN: In the answer, this becomes it, and these becomes they.
- Explanation MN: Хариултад this нь it, these нь they болдог.
- Build: row 1, row 2, row 3, explanation.

### Slide 6 · L7 Compare (2 columns)

- Title EN: Two everyday uses
- Title MN: Өдөр тутмын хоёр хэрэглээ
- Column 1 header EN: Introducing someone. MN: Хүн танилцуулах. Icon: two people.
- Column 1 EN: **This is** my friend, Anu. MN: Энэ миний найз Ану.
- Column 2 header EN: On the phone. MN: Утсаар ярихад. Icon: phone.
- Column 2 EN: Hello, **this is** Tuvshin. MN: Сайн байна уу, би Түвшин байна.
- Build: column 1, column 2.

### Slide 7 · L7 Compare (2 columns)

- Title EN: How they sound
- Title MN: Хэрхэн дуудагдах вэ?
- Column 1: big chip **this** with the label EN *short i, sharp s*, MN *богино i, хатуу s* · big chip **that** with the label EN *open a*, MN *нээлттэй a*
- Column 2: big chip **these** with the label EN *long ee, buzzing z*, MN *урт ee, зөөлөн z* · big chip **those** with the label EN *o, buzzing z*, MN *o, зөөлөн z*
- Visual: a simple side-view mouth icon with the tongue between the teeth.
- Explanation EN: th: put your tongue between your teeth.
- Explanation MN: th: хэлээ шүдний завсарт хавчуул.
- Build: this and these, that and those, mouth icon with the explanation.

### Slide 8 · L8 Watch out

- Title EN: Watch out!
- Title MN: Анхаар!
- Context EN: These and those need a plural noun and are.
- Context MN: These, those-той бол нэр үг олон тоо, үйл үг are байна.
- Mistake 1 wrong: ~~This~~ books are new.
- Mistake 1 right EN: **These** books are new. MN: Эдгээр ном шинэ.
- Mistake 2 wrong: These ~~is~~ my friends.
- Mistake 2 right EN: These **are** my friends. MN: Эдгээр миний найзууд.
- Mistake 3 wrong: These are my ~~pen~~.
- Mistake 3 right EN: These are my **pens**. MN: Эдгээр миний үзэгнүүд.
- Build: wrong 1, right 1, wrong 2, right 2, wrong 3, right 3.

### Slide 9 · L3 Dialogue (5 bubbles, two columns)

- Title EN: Model text: in a shop
- Title MN: Загвар эх: дэлгүүрт
- Visual: a small strip above the bubbles: a counter, a customer on the left with a bag beside them, a seller on the right with shoes beside them.
- Customer EN: Excuse me, how much is **this** bag? MN: Уучлаарай, энэ цүнх ямар үнэтэй вэ?
- Seller EN: **That** one? It's 40,000 tugriks. MN: Тэр үү? 40,000 төгрөг.
- Customer EN: And **those** shoes? MN: Тэгвэл тэдгээр гутал?
- Seller EN: **These**? They're 85,000. MN: Эдгээр үү? 85,000.
- Customer EN: OK. I'll take **this** bag, please. MN: За, энэ цүнхийг авъя.
- Explanation EN: Near and far depend on who is speaking.
- Explanation MN: Ойр, хол нь хэн ярьж байгаагаас хамаарна.
- Build: one bubble per click, then the explanation.

### Slide 10 · L10 Summary

- Card 1 EN: **this** / **these**: near · **that** / **those**: far
- Card 1 MN: this / these: ойр · that / those: хол
- Card 2 EN: **these** + book**s** + **are**: all plural
- Card 2 MN: these + books + are: бүгд олон тоо
- Card 3 EN: What is this? **It's** a pen.
- Card 3 MN: Хариултад it эсвэл they хэрэглэнэ.
- Build: one card per click.

---

## Lesson 7 · GR-008 · Possessive adjectives

Deck name: *GR-008 Possessive adjectives*. 10 slides.

### Slide 1 · L1 Title

- Code: GR-008. Level: A1.
- EN: Possessive adjectives
- MN: Хамаатуулах төлөөний үг
- Promise EN: By the end, you can say who everything belongs to.
- Promise MN: Энэ хичээлийн төгсгөлд юм хэнийх болохыг хэлж чадна.

### Slide 2 · L4 Cards (3 in a row)

- Title EN: Whose is it?
- Title MN: Хэнийх вэ?
- Visual: in each card, an owner figure on the left with a thin navy arrow to an object icon on the right.
- Card 1: owner *Bat* (a boy) → bag. EN: **his** bag. MN: Батын цүнх
- Card 2: owner *Saraa* (a girl) → phone. EN: **her** phone. MN: Сараагийн утас
- Card 3: owner *me* → book. EN: **my** book. MN: миний ном
- Explanation EN: One small word for each owner.
- Explanation MN: Эзэн бүрт нэг жижиг үг.
- Build: card 1, card 2, card 3, explanation.

### Slide 3 · L4 Cards (2 × 2)

- Title EN: Examples
- Title MN: Жишээ
- Card 1 EN: I have a dog. **My** dog is small. MN: Надад нохой бий. Миний нохой жижиг.
- Card 2 EN: She has a brother. **Her** brother is 10. MN: Түүнд дүү бий. Түүний дүү 10 настай.
- Card 3 EN: They have a car. **Their** car is red. MN: Тэдэнд машин бий. Тэдний машин улаан.
- Card 4 EN: We have a teacher. **Our** teacher is kind. MN: Бидэнд багш бий. Манай багш сайхан сэтгэлтэй.
- Explanation EN: Whose dog? Mine: my dog.
- Explanation MN: Хэний нохой вэ? Минийх: my dog.
- Build: card 1, card 2, card 3, card 4, explanation.

### Slide 4 · L5 Rule rows (7 rows in three groups)

- Title EN: The seven owner words
- Title MN: Эзэмшлийн долоон үг
- Column headers EN: Person · Owner word · Mongolian. MN: Хүн · Эзэмшлийн үг · Монгол
- Group 1: I → **my** → миний · you → **your** → чиний / таны
- Group 2: he → **his** → түүний · she → **her** → түүний · it → **its** → түүний
- Group 3: we → **our** → бидний / манай · they → **their** → тэдний
- Explanation EN: his, her and its are all түүний in Mongolian.
- Explanation MN: his, her, its: монголоор бүгд "түүний".
- Build: group 1, group 2, group 3, explanation.

### Slide 5 · L5 Rule rows

- Title EN: Where it goes
- Title MN: Хаана байрлах вэ?
- Row 1: chips \[**my**\] + \[book\] = my book. MN: миний ном
- Row 2: chips \[**my**\] + \[new\] + \[phone\] = my new phone. MN: миний шинэ утас
- Row 3: a maroon struck chip ~~the my book~~ → a green chip **my book**
- Explanation EN: Always right before a noun. Never with a or the.
- Explanation MN: Үргэлж нэр үгийн яг өмнө. a, the-тэй хамт хэрэглэхгүй.
- Build: row 1, row 2, row 3, explanation.

### Slide 6 · L7 Compare (3 columns)

- Title EN: The owner decides
- Title MN: Эзэн нь шийднэ
- Visual: at the top of each column, an owner figure with a navy arrow pointing to the highlighted word.
- Column 1 header EN: Bat, a boy. MN: Бат, хүү. Item EN: Bat and **his** mother. MN: Бат ээжтэйгээ.
- Column 2 header EN: Saraa, a girl. MN: Сараа, охин. Item EN: Saraa and **her** father. MN: Сараа аавтайгаа.
- Column 3 header EN: the dog. MN: нохой. Item EN: the dog and **its** bowl. MN: нохой тавагтайгаа.
- Explanation EN: his or her? Start from the owner, not the thing.
- Explanation MN: his үү, her үү? Юмнаас биш, эзнээс эхэлж бод.
- Build: column 1, column 2, column 3, explanation.

### Slide 7 · L5 Rule rows

- Title EN: Same sound, different word
- Title MN: Ижил дуудлага, өөр үг
- Row 1: navy chip **its** (MN under: түүний) = grey chip *it's* (it is)
- Row 2: navy chip **your** (MN under: чиний) = grey chip *you're* (you are)
- Row 3: navy chip **their** (MN under: тэдний) = grey chip *they're* (they are) = grey chip *there* (тэнд)
- Visual: a small speaker icon between each pair, to show they sound the same.
- Explanation EN: Can you say "it is"? Write it's. If not, write its.
- Explanation MN: "It is" гэж хэлж болох уу? Тэгвэл it's. Болохгүй бол its.
- Build: row 1, row 2, row 3, explanation.

### Slide 8 · L8 Watch out

- Title EN: Watch out!
- Title MN: Анхаар!
- Context EN: In Mongolian, түүний is the same for everyone.
- Context MN: Монголоор "түүний" бүгдэд нэг.
- Mistake 1 wrong: Bat loves ~~her~~ mother.
- Mistake 1 right EN: Bat loves **his** mother. MN: Бат ээждээ хайртай.
- Mistake 2 wrong: The cat is hungry. ~~It's~~ bowl is empty.
- Mistake 2 right EN: The cat is hungry. **Its** bowl is empty. MN: Муур өлссөн. Түүний таваг хоосон.
- Mistake 3 wrong: This is ~~the my~~ book.
- Mistake 3 right EN: This is **my** book. MN: Энэ миний ном.
- Build: wrong 1, right 1, wrong 2, right 2, wrong 3, right 3.

### Slide 9 · L9 Model text (two columns, no illustration)

- Title EN: Model text: meet my family
- Title MN: Загвар эх: миний гэр бүлтэй танилц
- Line 1 EN: Meet **my** family. MN: Миний гэр бүлтэй танилц.
- Line 2 EN: **My** father is Bold. **His** car is old, but he loves it. MN: Аав маань Болд. Түүний машин хуучин ч тэр түүндээ хайртай.
- Line 3 EN: **My** mother is Saraa. **Her** favourite food is buuz. MN: Ээж маань Сараа. Түүний дуртай хоол бол бууз.
- Line 4 EN: **My** brother and I share a room. **Our** room is small. MN: Дүү бид хоёр нэг өрөөнд байдаг. Манай өрөө жижиг.
- Line 5 EN: **My** grandparents are in the countryside. **Their** house is next to a river. MN: Өвөө эмээ маань хөдөө байдаг. Тэдний байшин голын хажууд.
- Line 6 EN: We have a dog. **Its** name is Khasar. MN: Манайд нохой бий. Түүний нэр Хасар.
- Build: one line per click.

### Slide 10 · L10 Summary

- Card 1 EN: **my** · **your** · **his** · **her** · **its** · **our** · **their**
- Card 1 MN: Эзэмшлийн долоон үг.
- Card 2 EN: The owner decides: Bat → **his** mother
- Card 2 MN: Эзэн нь шийднэ: Bat → his mother
- Card 3 EN: **its** = belonging to it · **it's** = it is
- Card 3 MN: its = түүний · it's = it is
- Build: one card per click.

---

## Lesson 8 · GR-007 · have got

Deck name: *GR-007 have got*. 10 slides.

### Slide 1 · L1 Title

- Code: GR-007. Level: A1.
- EN: have got
- MN: Have got бүтэц
- Promise EN: By the end, you can talk about your family, your things and how people look.
- Promise MN: Энэ хичээлийн төгсгөлд гэр бүл, эд зүйл, хүмүүсийн гадаад төрхийн тухай ярьж чадна.

### Slide 2 · L2 Story

- Title EN: Describing someone
- Title MN: Хүнийг дүрслэх
- Visual: a simple girl figure with long dark hair and brown eyes (the one figure in the deck that has hair and eye detail). Around her, small icons: two boy figures, a bike, and a car with a maroon cross through it.
- Line 1 EN: This is Nomin. MN: Энэ Номин.
- Line 2 EN: She\*\*'s got\*\* long black hair and brown eyes. MN: Тэр урт хар үстэй, бор нүдтэй.
- Line 3 EN: She\*\*'s got\*\* two brothers. MN: Тэр хоёр ахтай.
- Line 4 EN: She\*\*'s got\*\* a bike, but she **hasn't got** a car. MN: Тэр дугуйтай ч машингүй.
- Explanation EN: Hair, eyes, family, things: all with have got.
- Explanation MN: Үс, нүд, гэр бүл, эд зүйл: бүгд have got-оор.
- Build: one line per click, then the explanation.

### Slide 3 · L4 Cards (2 × 2, each with a label and an icon)

- Title EN: What have got is for
- Title MN: Have got юунд хэрэглэгддэг вэ?
- Card 1 label EN: Family. MN: Гэр бүл. EN: I\*\*'ve got\*\* a sister. MN: Надад эгч бий.
- Card 2 label EN: Things you own. MN: Эзэмшдэг зүйл. EN: He\*\*'s got\*\* a new phone. MN: Түүнд шинэ утас бий.
- Card 3 label EN: Looks. MN: Гадаад төрх. EN: She\*\*'s got\*\* blue eyes. MN: Тэр цэнхэр нүдтэй.
- Card 4 label EN: Illness. MN: Өвчин. EN: I\*\*'ve got\*\* a cold. MN: Би ханиад хүрсэн.
- Build: one card per click.

### Slide 4 · L5 Rule rows (with column headers)

- Title EN: have got, has got
- Title MN: Have got-ийн хэлбэрүүд
- Column headers EN: Subject · Full · Short. MN: Өгүүлэгдэхүүн · Бүтэн · Товч
- Row 1: **I / you / we / they** → **have got** → 've got
- Row 2: **he / she / it** → **has got** → 's got
- Explanation 1 EN: The same split as is and are.
- Explanation 1 MN: is, are-тэй адил хуваагдана.
- Explanation 2 EN: If the next word is got, 's means has.
- Explanation 2 MN: Дараагийн үг нь got бол 's нь has гэсэн үг.
- Build: row 1, row 2, explanation 1, explanation 2.

### Slide 5 · L4 Cards (3 in a row)

- Title EN: The negative
- Title MN: Үгүйсгэх хэлбэр
- Card 1 EN: I **haven't got** a car. MN: Надад машин байхгүй.
- Card 2 EN: She **hasn't got** a phone. MN: Түүнд утас байхгүй.
- Card 3 EN: We **haven't got** any pets. MN: Манайд гэрийн тэжээвэр амьтан байхгүй.
- Explanation EN: With a plural, add any.
- Explanation MN: Олон тоотой бол any нэмнэ.
- Build: card 1, card 2, card 3, explanation.

### Slide 6 · L5 Rule rows (table of 3 columns)

- Title EN: Questions and short answers
- Title MN: Асуулт ба богино хариулт
- Column headers EN: Question · Yes · No. MN: Асуулт · Тийм · Үгүй
- Row 1: **Have** you got a pen? (MN under: Чамд үзэг байна уу?) · Yes, I have. · No, I haven't.
- Row 2: **Has** she got a sister? (MN under: Түүнд эгч байдаг уу?) · Yes, she has. · No, she hasn't.
- Row 3: **Have** they got a car? (MN under: Тэдэнд машин байдаг уу?) · Yes, they have. · No, they haven't.
- Visual: the Yes column in soft-blue chips, the No column in light-grey chips.
- Explanation EN: In short answers, got disappears.
- Explanation MN: Богино хариултад got байхгүй.
- Build: one row per click, then the explanation.

### Slide 7 · L7 Compare (2 columns)

- Title EN: have or have got?
- Title MN: have уу, have got уу?
- Column 1 header EN: Owning: both are correct. MN: Эзэмших: хоёулаа зөв
- Column 1 EN: I have a car. = I\*\*'ve got\*\* a car. MN: Надад машин бий.
- Column 2 header EN: Actions: only have. MN: Үйлдэл: зөвхөн have
- Column 2 items: EN *I **have** breakfast at 8.* MN *Би 8 цагт өглөөний цай уудаг.* · EN *We **have** lunch at school.* MN *Бид сургууль дээрээ өдрийн хоол иддэг.*
- Explanation EN: have got is more common in everyday speech.
- Explanation MN: have got өдөр тутмын ярианд илүү түгээмэл.
- Build: column 1, column 2, explanation.

### Slide 8 · L8 Watch out

- Title EN: Watch out!
- Title MN: Анхаар!
- Context EN: Mongolian says "to me there is". English says I've got.
- Context MN: Монголоор: Надад ах бий. Англиар: I've got a brother.
- Mistake 1 wrong: He ~~have~~ got a dog.
- Mistake 1 right EN: He **has** got a dog. MN: Түүнд нохой бий.
- Mistake 2 wrong: Have you got a pen? Yes, I ~~have got~~.
- Mistake 2 right EN: Have you got a pen? Yes, I **have**. MN: Чамд үзэг байна уу? Тийм ээ.
- Mistake 3 wrong: ~~I've got~~ breakfast at 8.
- Mistake 3 right EN: I **have** breakfast at 8. MN: Би 8 цагт өглөөний цай уудаг.
- Build: wrong 1, right 1, wrong 2, right 2, wrong 3, right 3.

### Slide 9 · L9 Model text (illustration + 5 lines)

- Title EN: Model text: my best friend
- Title MN: Загвар эх: миний хамгийн дотны найз
- Visual: two simple figures side by side, one with a bike, one with a skateboard.
- Line 1 EN: This is my best friend, Ganaa. MN: Энэ миний хамгийн дотны найз Ганаа.
- Line 2 EN: She\*\*'s got\*\* short hair and big brown eyes. MN: Тэр богино үстэй, том бор нүдтэй.
- Line 3 EN: She\*\*'s got\*\* two sisters, but she **hasn't got** a brother. MN: Тэр хоёр эгч дүүтэй ч ах дүүгүй.
- Line 4 EN: She\*\*'s got\*\* a new bike. It's red. MN: Тэр шинэ дугуйтай. Дугуй нь улаан.
- Line 5 EN: **Have** I **got** a bike? No, I **haven't**. But I\*\*'ve got\*\* a skateboard! MN: Надад дугуй бий юу? Үгүй. Харин скейтборд бий!
- Build: one line per click.

### Slide 10 · L10 Summary

- Card 1 EN: he / she / it → **has got** · everyone else → **have got**
- Card 1 MN: he / she / it → has got · бусад → have got
- Card 2 EN: **'s got** = has got
- Card 2 MN: 's got нь has got гэсэн үг.
- Card 3 EN: Yes, I **have**. · No, I **haven't**.
- Card 3 MN: Богино хариултад got байхгүй.
- Build: one card per click.

---

## Lesson 9 · GR-015 · there is and there are

Deck name: *GR-015 there is and there are*. 10 slides.

### Slide 1 · L1 Title

- Code: GR-015. Level: A1.
- EN: there is and there are
- MN: There is / there are бүтэц
- Promise EN: By the end, you can describe your room, your school or your town.
- Promise MN: Энэ хичээлийн төгсгөлд өрөө, сургууль, хотоо дүрсэлж чадна.

### Slide 2 · L2 Story

- Title EN: My room
- Title MN: Миний өрөө
- Visual: a simple bedroom: a bed, a desk, two windows, two chairs and a shelf of books. Each caption has a thin leader line to its object.
- Line 1 EN: **There is** a bed. MN: Ор байна.
- Line 2 EN: **There is** a desk. MN: Ширээ байна.
- Line 3 EN: **There are** two windows. MN: Хоёр цонх байна.
- Line 4 EN: **There are** lots of books. MN: Олон ном байна.
- Explanation EN: To say what is in a place, English starts with there.
- Explanation MN: Хаана юу байгааг хэлэхдээ англиар there-ээр эхэлнэ.
- Build: one line per click, each object highlighted as it is named, then the explanation.

### Slide 3 · L5 Rule rows (table of 3 rows)

- Title EN: is or are?
- Title MN: is үү, are уу?
- Row 1: navy chip **There is** → soft-blue chip *one thing* (MN under: нэг зүйл) → EN *There's a bed in my room.* MN *Миний өрөөнд ор байна.*
- Row 2: navy chip **There are** → soft-blue chip *more than one* (MN under: олон зүйл) → EN *There are two windows.* MN *Хоёр цонх байна.*
- Row 3: navy chip **There is** → soft-blue chip *something you can't count* (MN under: тоолж болохгүй зүйл) → EN *There is milk in the fridge.* MN *Хөргөгчинд сүү байна.*
- Explanation EN: In a list, the first thing decides: There is a bed and two chairs.
- Explanation MN: Жагсаахад эхний зүйл шийднэ: There is a bed and two chairs.
- Build: row 1, row 2, row 3, explanation.

### Slide 4 · L5 Rule rows

- Title EN: Word order
- Title MN: Үгийн дараалал
- Row 1, label *Монгол*: chips \[Миний өрөөнд\] \[ор\] \[байна.\]
- Row 2, label *English*: chips \[There is\] \[a bed\] \[in my room.\]
- Visual: a curved navy arrow from *Миний өрөөнд* at the start of row 1 to *in my room* at the end of row 2.
- Explanation EN: The place comes first in Mongolian and last in English.
- Explanation MN: Байршил монголоор эхэнд, англиар төгсгөлд ордог.
- Build: row 1, row 2, arrow, explanation.

### Slide 5 · L4 Cards (3 in a row)

- Title EN: The negative
- Title MN: Үгүйсгэх хэлбэр
- Card 1 EN: There **isn't** a TV in my room. MN: Миний өрөөнд зурагт байхгүй.
- Card 2 EN: There **aren't** any chairs in the kitchen. MN: Гал тогоонд сандал байхгүй.
- Card 3 EN: There's **no** TV in my room. MN: Миний өрөөнд зурагт байхгүй.
- Explanation EN: There's no means the same as there isn't a.
- Explanation MN: There's no, there isn't a хоёр утга нэг.
- Build: card 1, card 2, card 3, explanation.

### Slide 6 · L5 Rule rows (3 rows)

- Title EN: Questions and How many
- Title MN: Асуулт ба How many
- Row 1 EN: **Is there** a park near here? → Yes, there is. / No, there isn't. MN: Энд ойрхон цэцэрлэгт хүрээлэн байна уу?
- Row 2 EN: **Are there** any shops? → Yes, there are. / No, there aren't. MN: Дэлгүүр байна уу?
- Row 3 EN: **How many** students **are there** in your class? → There are 28. MN: Танай ангид хэдэн сурагч байдаг вэ? → 28.
- Visual: a small rising arrow ↗ after the first two questions and a falling arrow ↘ after the third.
- Explanation EN: Your voice goes up for yes or no questions, and down for How many.
- Explanation MN: Тийм, үгүй асуултад дуу дээшилнэ, How many-д доошилно.
- Build: row 1, row 2, row 3, explanation.

### Slide 7 · L7 Compare (2 rows of linked pairs)

- Title EN: there is or it is?
- Title MN: there is үү, it is үү?
- Pair 1 EN: **There is** a park near my house. → **It** is very big. MN: Манай байрны ойролцоо цэцэрлэгт хүрээлэн бий. Тэр их том.
- Pair 2 EN: **There are** two cats in our flat. → **They** are both black. MN: Манай байранд хоёр муур бий. Хоёулаа хар.
- Explanation 1 EN: there is says something new is there.
- Explanation 1 MN: there is: шинэ зүйл байгааг хэлнэ.
- Explanation 2 EN: it is describes that thing.
- Explanation 2 MN: it is: тухайн зүйлийг тайлбарлана.
- Build: pair 1, pair 2, explanation 1, explanation 2.

### Slide 8 · L8 Watch out

- Title EN: Watch out!
- Title MN: Анхаар!
- Context EN: Mongolian puts the place first. English starts with There is.
- Context MN: Монголоор: Миний өрөөнд ор байна. Англиар: There is a bed in my room.
- Mistake 1 wrong: There ~~is~~ two windows.
- Mistake 1 right EN: There **are** two windows. MN: Хоёр цонх байна.
- Mistake 2 wrong: ~~In my room is~~ a bed.
- Mistake 2 right EN: **There is** a bed in my room. MN: Миний өрөөнд ор байна.
- Mistake 3 wrong: ~~It is~~ a park near my house.
- Mistake 3 right EN: **There is** a park near my house. MN: Манай байрны ойролцоо цэцэрлэгт хүрээлэн бий.
- Build: wrong 1, right 1, wrong 2, right 2, wrong 3, right 3.

### Slide 9 · L9 Model text (illustration + 5 lines)

- Title EN: Model text: our school
- Title MN: Загвар эх: манай сургууль
- Visual: a simple school building with a library, a gym and two sports fields drawn as flat shapes.
- Line 1 EN: Our school is in the centre of the city. MN: Манай сургууль хотын төвд байдаг.
- Line 2 EN: **There are** 30 classrooms and a big library. MN: 30 анги, бас том номын сан бий.
- Line 3 EN: **There's** a gym next to the library. It's new. MN: Номын сангийн хажууд биеийн тамирын заал бий. Шинэ заал.
- Line 4 EN: **There isn't** a swimming pool, but **there are** two sports fields. MN: Усан сан байхгүй ч хоёр спорт талбай бий.
- Line 5 EN: How many students **are there**? **There are** about 900. MN: Хэдэн сурагч байдаг вэ? 900 орчим.
- Build: one line per click.

### Slide 10 · L10 Summary

- Card 1 EN: **There is** + one · **There are** + many
- Card 1 MN: There is + нэг · There are + олон
- Card 2 EN: There is a bed **in my room**: the place goes at the end.
- Card 2 MN: Байршил өгүүлбэрийн төгсгөлд ордог.
- Card 3 EN: **there is** (new) → **it is** (describing)
- Card 3 MN: there is (шинэ зүйл) → it is (тайлбар)
- Build: one card per click.

---

## Lesson 10 · GR-016 · Prepositions of place

Deck name: *GR-016 Prepositions of place*. 10 slides.

Every diagram in this lesson uses the same two objects: a box (rounded rectangle, navy outline, soft-blue fill) and a ball (circle, highlight blue). Keep their sizes identical on every slide.

### Slide 1 · L1 Title

- Code: GR-016. Level: A1.
- EN: Prepositions of place
- MN: Байршлын угтвар үг
- Promise EN: By the end, you can say exactly where anything is.
- Promise MN: Энэ хичээлийн төгсгөлд юм хаана байгааг яг таг хэлж чадна.

### Slide 2 · L4 Cards (5 in a row)

- Title EN: One ball, five places
- Title MN: Нэг бөмбөг, таван байршил
- Sentence frame above the cards EN: The ball is ... the box. MN: Бөмбөг хайрцагны ... байна.
- Card 1: diagram, ball inside the box. Word **in**, gloss *дотор*
- Card 2: diagram, ball on top of the box. Word **on**, gloss *дээр*
- Card 3: diagram, ball below the box. Word **under**, gloss *доор*
- Card 4: diagram, ball beside the box, touching it. Word **next to**, gloss *хажууд*
- Card 5: diagram, ball between two boxes. Word **between**, gloss *хооронд*
- Explanation EN: Only one word changes.
- Explanation MN: Зөвхөн нэг үг өөрчлөгдөнө.
- Build: one card per click, then the explanation.

### Slide 3 · L5 Rule rows (5 rows)

- Title EN: The core five
- Title MN: Үндсэн таван үг
- Each row: a small version of the diagram → navy chip with the word → grey chip with the Mongolian
- Rows: **in** · дотор / **on** · дээр / **under** · доор / **next to** · хажууд / **between** · хооронд
- Explanation EN: next to is two words. between needs two things.
- Explanation MN: next to хоёр үгтэй. between-д хоёр зүйл хэрэгтэй.
- Build: one row per click, then the explanation.

### Slide 4 · L7 Compare (2 columns)

- Title EN: Two more: behind and in front of
- Title MN: Дахиад хоёр: behind ба in front of
- Column 1 header EN: **behind**. MN: ард. Diagram: the box covers most of the ball; only its top shows. EN: The ball is behind the box. MN: Бөмбөг хайрцагны ард байна.
- Column 2 header EN: **in front of**. MN: өмнө. Diagram: the ball covers the lower front of the box. EN: The ball is in front of the box. MN: Бөмбөг хайрцагны өмнө байна.
- Explanation EN: in front of is three words.
- Explanation MN: in front of гурван үгтэй.
- Build: column 1, column 2, explanation.

### Slide 5 · L7 Compare (2 columns)

- Title EN: in or on?
- Title MN: in үү, on уу?
- Column 1 header EN: **in** · inside a space. MN: орон зайн дотор. Diagram: a box seen from the side with the ball inside.
- Column 1 items: in the box (хайрцган дотор) · in the bag (цүнхэн дотор) · in the room (өрөөнд) · in the car (машинд)
- Column 2 header EN: **on** · touching a surface. MN: гадаргуу дээр. Diagram: a table top with the ball resting on it.
- Column 2 items: on the table (ширээн дээр) · on the wall (хананд) · on the floor (шалан дээр) · on the bed (орон дээр)
- Explanation EN: A picture is on the wall because it touches the wall.
- Explanation MN: Зураг хананд хүрч байгаа учраас on the wall гэнэ.
- Build: column 1, column 2, explanation.

### Slide 6 · L7 Compare (2 columns)

- Title EN: next to or near?
- Title MN: next to уу, near уу?
- Column 1 header EN: **next to** · right beside. MN: яг хажууд. Diagram: the ball touching the side of the box. EN: My bag is next to my desk. MN: Цүнх маань ширээний яг хажууд байна.
- Column 2 header EN: **near** · close, but not touching. MN: ойрхон, гэхдээ хүрэлцэхгүй. Diagram: the ball a short gap away from the box. EN: The school is near my house. MN: Сургууль манай байрны ойролцоо байдаг.
- Build: column 1, column 2.

### Slide 7 · L5 Rule rows

- Title EN: Word order
- Title MN: Үгийн дараалал
- Row 1, label *Монгол*: chips \[хайрцган\] \[**дотор**\]. Row 2, label *English*: chips \[**in**\] \[the box\]
- Row 3, label *Монгол*: chips \[ширээн\] \[**дээр**\]. Row 4, label *English*: chips \[**on**\] \[the table\]
- Visual: a curved navy arrow from each Mongolian place word to its English partner, showing it moving from after the noun to before it. Below, the full sentence as chips: \[The ball\] \[is\] \[**in**\] \[**the**\] \[box\]. MN under: Бөмбөг хайрцган дотор байна.
- Explanation EN: In English, the place word comes first, and it needs the.
- Explanation MN: Англиар угтвар үг урд ордог бөгөөд the хэрэгтэй.
- Build: rows 1 and 2, rows 3 and 4, the full sentence, explanation.

### Slide 8 · L8 Watch out

- Title EN: Watch out!
- Title MN: Анхаар!
- Context EN: Mongolian puts the place word after the noun. English puts it before.
- Context MN: Монголоор: хайрцган дотор. Англиар: in the box.
- Mistake 1 wrong: The cat is ~~next~~ the sofa.
- Mistake 1 right EN: The cat is **next to** the sofa. MN: Муур буйдангийн хажууд байна.
- Mistake 2 wrong: The car is ~~in front the~~ house.
- Mistake 2 right EN: The car is **in front of** the house. MN: Машин байшингийн өмнө байна.
- Mistake 3 wrong: The picture is ~~in~~ the wall.
- Mistake 3 right EN: The picture is **on** the wall. MN: Зураг хананд өлгөөтэй байна.
- Build: wrong 1, right 1, wrong 2, right 2, wrong 3, right 3.

### Slide 9 · L9 Model text (illustration + 7 lines in two columns)

- Title EN: Model text: my bedroom
- Title MN: Загвар эх: миний унтлагын өрөө
- Visual: a simple bedroom across the top third of the slide: window, bed, rug, desk, door, shelf, wardrobe, curtain and a cat. Each object fades in with its line.
- Line 1 EN: This is my bedroom. MN: Энэ миний унтлагын өрөө.
- Line 2 EN: My bed is **next to** the window. MN: Ор маань цонхны хажууд.
- Line 3 EN: There's a small rug **in front of** my bed. MN: Орны өмнө жижиг хивс бий.
- Line 4 EN: My desk is **between** the bed and the door. MN: Ширээ маань ор, хаалганы хооронд.
- Line 5 EN: My books are **on** the shelf, and my bag is **under** the desk. MN: Ном маань тавиур дээр, цүнх маань ширээн доор.
- Line 6 EN: My clothes are **in** the wardrobe. MN: Хувцас маань шүүгээнд.
- Line 7 EN: And my cat? It's usually **on** my bed, or **behind** the curtain! MN: Харин муур маань? Ихэвчлэн орон дээр, эсвэл хөшигний ард!
- Build: one line per click, with its object.

### Slide 10 · L10 Summary

- Card 1 EN: **in** · **on** · **under** · **next to** · **between** · **behind** · **in front of**
- Card 1 MN: Байршлын долоон үг.
- Card 2 EN: **in** = inside · **on** = touching a surface
- Card 2 MN: in = дотор · on = гадаргуу дээр
- Card 3 EN: The place word comes before the noun: **in the** box
- Card 3 MN: Угтвар үг нэр үгийн өмнө ордог: in the box
- Build: one card per click.
