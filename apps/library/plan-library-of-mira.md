# plan: library of mira

**version:** v0.2
**created:** 2026-01-22, 6:14pm ist
**last updated:** 2026-01-22

**tags:** #mira-library #ui-design #web-app #book-tracking
**related:** [journal](../../journal.md), [notes-about-mira](../../profile/notes-about-mira.md)

---

## table of contents
<!-- toc:start -->
- [overview](#overview)
- [design philosophy](#design-philosophy)
- [visual system](#visual-system)
- [layout](#layout)
- [notes system](#notes-system)
- [branch strategy](#branch-strategy)
- [implementation tasks](#implementation-tasks)
- [future ideas](#future-ideas)
- [changelog](#changelog)
<!-- toc:end -->

---

## overview

a personal digital library tracking mira's books — what she's reading, what she loves, what didn't land, and recommendations to try. designed to be warm, playful, and visually cohesive.

**live urls:**
- `mimimirarara.com` → production (read-only notes)
- `wip.mimimirarara.com` → work-in-progress (editable notes)

---

## design philosophy

1. **color is the design** — each book gets a pastel color block extracted from its cover. the cover feels like it belongs to the block, not floating on top of it.

2. **playful but calm** — soft pastels, serif typography, generous whitespace. feels like a children's book itself.

3. **personal** — mira's nicknames, reading counts, observations. this is her library, not a generic bookshelf.

4. **long scroll** — no tabs, no filters (for now). just a gentle journey through categories with clear breaks.

---

## visual system

### colors

**card backgrounds:**
- one pastel per card, extracted from book cover
- ~15-20% saturation, high lightness
- the cover image should feel integrated, not separate

**text colors:**
- dynamic, complementary to the pastel background
- examples:
  - mustard/cream background → brown/rust text
  - sage/mint background → forest green text
  - lavender background → plum/purple text
  - peach background → terracotta/brown text
  - sky/powder blue → navy/slate text

**approach:** predefined palette pairings to start (safer, consistent). evolve to dynamic calculation later if needed.

### typography

**font family:** serif (libre baskerville, lora, or source serif pro)

| element | weight | size | notes |
|---------|--------|------|-------|
| book title | medium (500) | 1.25rem desktop, 1.1rem mobile | primary focus |
| author | light (300) | 0.9rem | smaller, slightly muted |
| meta (reads, category) | light (300) | 0.8rem | subtle, informational |
| category headers | regular (400) | 1rem, small-caps or spaced | with emojis |

### category headers

playful, with emojis on either side:

```
📚 current favorites 📚

📖 currently reading 📖

⭐ all-time classics ⭐

🔁 read 50+ times 🔁

🤷 not been a fan 🤷

💡 recommendations 💡
```

---

## layout

### desktop — landscape cards, vertical stack

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                         📚 current favorites 📚                          │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ██████████████████████████████████████████████████████████████████    │
│   ██                                                                ██  │
│   ██  ┌──────────┐                                                  ██  │
│   ██  │          │    the lion inside                               ██  │
│   ██  │  cover   │    rachel bright                                 ██  │
│   ██  │  image   │                                                  ██  │
│   ██  │          │    50+ reads · all-time classic                  ██  │
│   ██  └──────────┘                                                  ██  │
│   ██                                                                ██  │
│   ██████████████████████████████████████████████████████████████████    │
│                                                                         │
│   ██████████████████████████████████████████████████████████████████    │
│   ██                                                                ██  │
│   ██  ┌──────────┐                                                  ██  │
│   ██  │          │    coco chanel                                   ██  │
│   ██  │  cover   │    maria isabel sánchez vegara                   ██  │
│   ██  │  image   │                                                  ██  │
│   ██  │          │    50+ reads · lpbd series                       ██  │
│   ██  └──────────┘                                                  ██  │
│   ██                                                                ██  │
│   ██████████████████████████████████████████████████████████████████    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

cards: ~700-800px wide, centered
cover: left side, ~120-150px
text: right side, vertically centered
generous padding inside card (~24-32px)
space between cards: ~24px
space between categories: ~64-80px
```

### mobile — portrait cards, vertical stack

```
┌─────────────────────────┐
│                         │
│  📚 current favorites 📚 │
│                         │
├─────────────────────────┤
│                         │
│  █████████████████████  │
│  ██                 ██  │
│  ██  ┌───────────┐  ██  │
│  ██  │           │  ██  │
│  ██  │   cover   │  ██  │
│  ██  │   image   │  ██  │
│  ██  │           │  ██  │
│  ██  └───────────┘  ██  │
│  ██                 ██  │
│  ██  the lion       ██  │
│  ██  inside         ██  │
│  ██                 ██  │
│  ██  rachel bright  ██  │
│  ██                 ██  │
│  ██  50+ reads      ██  │
│  ██                 ██  │
│  █████████████████████  │
│                         │
└─────────────────────────┘

cards: full width with margin (~16px sides)
cover: centered, ~60% width
text: centered below cover
```

---

## notes system

### data structure

```js
// current: single notes string
notes: "memorized the whole book, pre-says words..."

// new: array of note objects
notes: [
  {
    id: "n1",
    text: "mira calls it 'lion'",
    timestamp: "2026-01-15T10:30:00",
    type: "nickname"  // optional: nickname, observation, milestone
  },
  {
    id: "n2",
    text: "memorized the whole book, pre-says words before i read them",
    timestamp: "2026-01-10T14:00:00",
    type: "observation"
  }
]
```

### side panel (desktop)

```
┌──────────────────────────────────┬───────────────────────────┐
│                                  │  ╳                        │
│                                  │                           │
│  [main content]                  │  the lion inside          │
│                                  │  rachel bright            │
│                                  │                           │
│                                  │  ┌─────────────────────┐  │
│                                  │  │ mira calls it       │  │
│                                  │  │ "lion"              │  │
│                                  │  │          jan 15 '26 │  │
│                                  │  └─────────────────────┘  │
│                                  │                           │
│                                  │  ┌─────────────────────┐  │
│                                  │  │ memorized the whole │  │
│                                  │  │ book, pre-says...   │  │
│                                  │  │          jan 10 '26 │  │
│                                  │  └─────────────────────┘  │
│                                  │                           │
│                                  │  ┌─────────────────────┐  │
│                                  │  │ + add a note...     │  │  ← wip.* only
│                                  │  └─────────────────────┘  │
│                                  │                           │
└──────────────────────────────────┴───────────────────────────┘

panel width: ~320-360px
slides in from right
note blocks: colorful pastels (varied tints)
timestamps: small, bottom-right of each block
```

### overlay (mobile)

```
┌─────────────────────────┐
│  ░░░░░░░░░░░░░░░░░░░░░  │  ← tap to close
│  ░░░░░░░░░░░░░░░░░░░░░  │
├─────────────────────────┤
│  ══════════════════════ │  ← drag handle
│                         │
│  the lion inside        │
│  rachel bright          │
│                         │
│  ┌───────────────────┐  │
│  │ "lion"    jan 15  │  │
│  └───────────────────┘  │
│                         │
│  ┌───────────────────┐  │
│  │ memorized...      │  │
│  │           jan 10  │  │
│  └───────────────────┘  │
│                         │
│  ┌───────────────────┐  │
│  │ + add note...     │  │  ← wip.* only
│  └───────────────────┘  │
│                         │
└─────────────────────────┘

slides up from bottom
~70% viewport height max
swipe down to close
```

---

## branch strategy

| branch | domain | behavior |
|--------|--------|----------|
| `main` | mimimirarara.com | read-only notes display |
| `early-days` | wip.mimimirarara.com | full editing capability |

**edit mode detection:**
```js
const isEditMode = window.location.hostname.startsWith('wip.');
```

---

## implementation tasks

### phase 1: covers ✦ foundation ✅
- [x] create `apps/library/covers/` folder
- [x] download all 52 covers (open library + google books + manual)
- [x] add cover_url directly to each book entry
- [x] test cover loading in browser
- [x] commit: "fix: download covers locally for reliable loading"

### phase 2: color system ✅
- [x] add color extraction (color-thief via CDN)
- [x] create pastel conversion function (88% lightness, 15-30% saturation)
- [x] build text color pairing system (hue-based predefined pairs)
- [x] apply colors to cards on image load
- [ ] commit: "feat: extract colors from covers for card backgrounds"

### phase 3: layout overhaul ✅
- [x] restructure html for new card layout (book-info, book-meta)
- [x] implement desktop layout (landscape, vertical stack)
- [x] implement mobile layout (portrait, vertical stack)
- [x] add serif typography (Lora font)
- [x] style category headers with emojis
- [x] add generous whitespace between categories
- [ ] commit: "feat: new card layout with serif typography"

### phase 4: notes system
- [ ] refactor notes data structure (string → array)
- [ ] build side panel component (desktop)
- [ ] build overlay component (mobile)
- [ ] style note blocks as colorful cards
- [ ] implement edit mode detection
- [ ] add note input (wip.* only)
- [ ] migrate existing notes to new format
- [ ] commit: "feat: notes side panel with colorful message blocks"

### phase 5: polish (partial)
- [x] css reorganized and cleaned up
- [ ] review all colors/pairings (needs visual testing)
- [ ] fine-tune spacing and typography
- [ ] test on real devices
- [x] lazy loading covers (loading="lazy")
- [ ] commit: "polish: final ui tweaks and optimizations"

---

## future ideas

(to be built later, captured here for reference)

- [ ] search/filter books
- [ ] sort by read count, date added, alphabetical
- [ ] book recommendations engine (based on what she liked)
- [ ] reading stats dashboard
- [ ] timeline view (when books were read)
- [ ] share individual book cards as images
- [ ] dark mode
- [ ] print-friendly version

---

## changelog

### v0.2 — 2026-01-22
- **phase 1 complete:** 52 covers downloaded locally, cover_url added to each book
- **phase 2 complete:** color extraction with ColorThief, pastel conversion, text color pairing
- **phase 3 complete:** new vertical stack layout, Lora serif font, emoji headers
- split lpbd collection into 5 individual books (freddie, ali, hockney, dickens, armstrong)
- removed 3 recommendation books
- books-grid → books-stack, card structure updated (book-info, book-meta)

### v0.1 — 2026-01-22
- initial plan created
- defined visual system: pastel colors extracted from covers, complementary text colors
- defined layout: landscape cards on desktop, portrait on mobile, vertical stacking
- defined notes system: side panel (desktop), overlay (mobile), colorful message blocks
- defined branch strategy: main (read-only) vs early-days (editable)
- outlined implementation phases and tasks

---

## sources / references

- [johannes klingebiel bookshelf](https://johannesklingebiel.de/wiki/Bookshelf/) — color block inspiration
- [sawyer hollenshead highlights](https://highlights.sawyerh.com/) — cover display reference
- [petar gyurov bookshelf](https://petargyurov.com/bookshelf/) — category organization reference
