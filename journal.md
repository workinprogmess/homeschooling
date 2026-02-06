# journal.md

project development log - newest entries on top

**tags:** #project-journal #work-log #decision-history
**related:** [wiki index](./wiki/index.md), [agents](./agents.md), [claude](./CLAUDE.md)

## table of contents
<!-- toc:start -->
- [2026-02-06 / evening](#2026-02-06-evening)
- [2026-02-05 / 09:27 pm](#2026-02-05-0927-pm)
- [2026-02-05 / 08:27 pm](#2026-02-05-0827-pm)
- [2026-02-03 / 01:00 am](#2026-02-03-0100-am)
- [2026-02-03 / 12:10 am](#2026-02-03-1210-am)
- [2026-01-30 / 01:31 pm](#2026-01-30-0131-pm)
- [2026-01-25 / 07:18 pm](#2026-01-25-0718-pm)
- [2026-01-22 / evening](#2026-01-22-evening)
- [2026-01-07 / evening](#2026-01-07-evening)
- [2026-01-01 / night](#2026-01-01-night)
- [2026-01-01 / evening](#2026-01-01-evening)
- [2026-01-01 / afternoon](#2026-01-01-afternoon)
- [2025-12-27 / 04:44 pm](#2025-12-27-0444-pm)
- [2025-12-27 / 04:17 pm](#2025-12-27-0417-pm)
- [2025-12-27 / 12:38 pm](#2025-12-27-1238-pm)
- [2025-12-27 / 11:57 am](#2025-12-27-1157-am)
- [2025-12-27 / 11:46 am](#2025-12-27-1146-am)
- [2025-12-26 / 10:24 pm](#2025-12-26-1024-pm)
- [2025-12-26 / 10:19 pm](#2025-12-26-1019-pm)
- [2025-12-26 / 10:15 pm](#2025-12-26-1015-pm)
- [2025-12-26 / 09:02 pm](#2025-12-26-0902-pm)
- [2025-12-26 / 05:31 pm](#2025-12-26-0531-pm)
- [2025-12-25 / 05:00 pm](#2025-12-25-0500-pm)
- [2025-12-25 / 03:27 pm](#2025-12-25-0327-pm)
- [2025-12-25 / 03:23 pm](#2025-12-25-0323-pm)
- [2025-12-25 / 12:32 pm](#2025-12-25-1232-pm)
- [2025-12-25 / 12:27 pm](#2025-12-25-1227-pm)
- [2025-12-22 / early afternoon (session 2)](#2025-12-22-early-afternoon-session-2)
- [2025-12-22 / early afternoon](#2025-12-22-early-afternoon)
- [2025-12-20 / time: current session](#2025-12-20-time-current-session)
<!-- toc:end -->
---

## 2026-02-06 / evening

### mimimirarara.com - tabs + ai recommendations

**commit:** `ed1f159` - add bottom nav with 3 tabs + ai-powered recommendations

**what we did:**
- restructured the site from a single-scroll page to a 3-tab app with bottom navigation
  - **library** (existing book collection)
  - **recommended books** (new - ai-generated)
  - **recommended activities** (new - ai-generated)
- generated first batch of ai recommendations based on mira's profile docs:
  - 7 book recommendations across 3 categories: pattern & prediction (dear zoo, we're going on a bear hunt), empathy & emotional connection (owl babies, guess how much i love you), agency & imagination (not a box, stuck, rosie's walk)
  - 7 activity recommendations across 3 categories: sensory & pattern play (color treasure hunt, kitchen pouring station), extended pretend play (doctor/vet checkup, restaurant/cafe play), nature & observation (balcony bird journal, sound detective game, leaf & nature collage)
- each recommendation has personalized reasoning tied to specific traits from who-mira-is.md
- interactive yay/nay feedback with notes (localStorage + export button)
- switched font to geist sans throughout
- removed add-book button (will re-add later if needed)
- book covers for recommendations auto-fetched from google books / openlibrary apis
- same pastel color extraction system applied to recommendation cards

**files:**
- `apps/library/index.html` - tab structure, bottom nav, unified modal
- `apps/library/app.js` - tab switching, rec rendering, feedback system, export
- `apps/library/styles.css` - geist font, bottom nav, rec cards, responsive
- `apps/library/data/book-recommendations.json` - batch 1 book recs
- `apps/library/data/activity-recommendations.json` - batch 1 activity recs

**why:** the library was becoming a static catalog. adding recommendations turns it into a living tool - parents can browse ai-curated suggestions, give feedback (yay/nay + notes), and when ready for the next batch, export the feedback for the next round of recommendations. activities extend the same concept to screen-free home play.

---

## 2026-02-05 / 09:27 pm

### problem-solving as a peer - new personality trait documented

**what we did:**
- added observation to `profile/notes-about-mira.md`: two instances of mira solving household problems as a peer, not a dependent
  1. steam for papa's cough: adopted mumma's role (tone, physical direction), stepped in when mumma's approach wasn't working
  2. phone/song problem: delegated to househelp with 5-element instruction chain before mumma could solve it
- added milestone assessment to `profile/developmental-milestones.md`:
  - role adoption: significantly advanced (3-4 year typical)
  - third-party delegation: significantly advanced (4-5 year typical)
  - solution-chain reasoning: significantly advanced (3-4 year typical)
- added 9th trait to `profile/who-mira-is.md`: "the peer" - she doesn't see adult problems as separate from her problems. she operates as a full participant in household problem-solving
- updated connected picture: the peer is where all other traits converge

**key insight:**
- this is different from "self-starter" (initiating new activities). this is about how she relates to problems.
- she doesn't have a concept of "that's not my problem." if it's happening in her world, it's her problem.
- the phone instance shows delegation to a third party with a 5-element instruction chain at 20m19d - this is the peer trait + pattern extraction + narration + empathy all working together
- she moves faster than the adults - not reactive but automatic

**files modified:**
- `profile/notes-about-mira.md` - new entry 2026-02-05 / 09:27 pm
- `profile/developmental-milestones.md` - new entry 2026-02-05 / 09:27 pm
- `profile/who-mira-is.md` - added "the peer" as 9th trait, updated connected picture
- `journal.md` - this entry

---

## 2026-02-05 / 08:27 pm

### gender & age categorization documented at 20m19d

**what we did:**
- added observation to `profile/notes-about-mira.md`: mira casually identifies bhaiya/didi/uncle/aunty with ~90% accuracy, even when children are bundled in winter clothes in books; also identifies male/female singers by voice
- added milestone assessment to `profile/developmental-milestones.md`:
  - visual gender categorization: significantly advanced (~90% in degraded-cue conditions)
  - voice-gender mapping: significantly advanced (identifies male/female singers)
  - 2x2 categorical thinking (gender × age): advanced

**key observations:**
- she's using a 2x2 system (child/adult × male/female), not just a binary sort
- the snow-clothing accuracy (~90%) means she's extracting gender from deep features (face structure, proportions, movement), not surface cues (hair, clothing color)
- voice-gender mapping connects directly to her established auditory discrimination profile
- this is casual/automatic for her - settled knowledge, not effortful guessing

**files modified:**
- `profile/notes-about-mira.md` - new entry 2026-02-05 / 08:27 pm
- `profile/developmental-milestones.md` - new entry 2026-02-05 / 08:27 pm
- `journal.md` - this entry

---

## 2026-02-03 / 01:00 am

### created "who mira is" - personality & emerging identity profile

**what we did:**
- created new document `profile/who-mira-is.md` - a synthesis of all observations into a personality portrait
- not milestones, not daily observations - the threads that run through everything

**8 core traits identified:**
1. **the always-on receiver**: high-bandwidth sensory intake, always processing background sounds/environment, since birth. temperamental, not learned.
2. **the pattern extractor**: extracts rules from observation, applies them in new contexts. one-shot learning (-ji suffix, birthday script, basketball schema). doesn't memorize - extracts principles.
3. **the self-starter**: consistently identifies and unlocks new activities herself (journal, birthday planning, bindi ritual, basketball, sharing with nature). driver, not passenger.
4. **the narrator of her own mind**: uses language to think aloud - narrates inferences, plans, and motor actions. language as a thinking tool, not just communication.
5. **the empathic antenna**: sensitivity extends outward - group tracking, comforting unseen baby, sharing with nature, including both parents. notices and responds to others' states.
6. **the boundary holder**: strong body autonomy + creative autonomy. clear self. "i decide" principle (rejected temple tikka, later created own bindi ritual on her terms).
7. **the fear approacher**: circles back to fears gradually until ready (balance bike, slide). doesn't avoid - manages exposure on her timeline. brave in the original sense.
8. **the ritual builder**: creates multi-step rituals for activities and transitions (reading routine, bedtime goodbye, journaling, bindi ceremony). ritual architect.

**the connected picture:**
- traits aren't separate: reception → extraction → action is one unified cycle
- sensitivity is the foundation - feeds pattern extraction, empathy, causal reasoning
- boundaries enable empathy (clear self allows sustainable care for others)
- fear-approach and ritual-building are both self-regulation strategies

**what this might mean for her learning/growth:**
- observational learner who needs space to watch first, then act when ready
- high-sensitivity auditory system is a superpower AND a vulnerability - design around it
- autonomy is core - educational approaches with choice and self-direction will suit her
- co-created routines > imposed routines

**files created/modified:**
- `profile/who-mira-is.md` - new document
- `wiki/index.md` - added to profile section + new tags
- `wiki/tags.md` - added #mira-personality, #emerging-identity, #mira-superpowers, #temperament
- `journal.md` - this entry

---

## 2026-02-03 / 12:10 am

### language explosion documented at 20.5 months

**what we did:**
- added observation to `profile/notes-about-mira.md` documenting major speech/language expansion at 20.5mo:
  - spatial prepositions: under/over, behind/front, up/down (upar/neeche), sit down/lie down - 8+ terms, bilingual, used with physical actions
  - action verb pairs: pick up/put it, take it/give - with correct directionality and social context
  - sentence repetition: repeats 8+ word sentences (jumbles order sometimes)
  - "new" as abstract adjective: new cycle, new book, new clothes, new shoes, new makhana packet
  - -ji suffix extraction: heard "mamaji" once → applied to baba-ji, mumma-ji, mimu-ji, nani-ji, dadi-ji, sofa-ji, fan-ji
  - narrative sequencing: fan cleaner arrived → "uncle, fan, dirty, stool, clean" → "ho gya" when done
- added milestone assessments to `profile/developmental-milestones.md`:
  - morphological extraction (-ji): significantly advanced (single-exposure rule extraction + productive overgeneralization)
  - event narration: significantly advanced (5-element predictive sequence with completion marking)
  - spatial prepositions, verb differentiation, sentence repetition, abstract adjective: all advanced

**also documented:**
- basketball observational learning: given a basketball on the court, overrode her usual kick-any-ball routine, walked to the basket end, and tried throwing it up to basket. learned entirely from watching papa/kids/adults. now a recurring activity she unlocked herself. assessed as significantly advanced - sport-specific schema from observation with inhibitory control (suppressing kick default).

**key observations:**
- the -ji suffix episode is the standout: heard it once, extracted the rule, applied it to people AND objects (sofa-ji, fan-ji). overgeneralization = proof of rule learning, not memorization. typically 24-36mo behavior.
- fan-cleaning narration was predictive, not descriptive - she narrated what was about to happen based on prior knowledge
- ambient acquisition pattern continues from sound sensitivity profile - picked up -ji from conversation she wasn't part of
- spatial words are embodied: goes under/over things while saying the words
- basketball observation fits the self-initiated activity pattern: journal, birthday planning, bindi ritual, and now basketball - she consistently identifies and unlocks new activities herself

**files modified:**
- `profile/notes-about-mira.md` - new entry 2026-02-03 / 12:10 am
- `profile/developmental-milestones.md` - new entry 2026-02-03 / 12:10 am
- `journal.md` - this entry

---

## 2026-01-30 / 01:31 pm

### sound sensitivity & auditory awareness - documented as lifelong pattern

**what we did:**
- added observation to `profile/notes-about-mira.md` documenting mira's sound sensitivity at 20m13d:
  - picks up nanu's voice from background audio on nani's phone call
  - hears nani's doorbell through phone → says "didi" (househelp)
  - hears fan through partially open door → infers aunty mopped → floor is wet (3-step chain from 1 sound)
  - hears auto/bike from first floor while coloring → says "dhyaan se" (be careful)
  - hears neighbor baby crying → comforts ("it's okay baby") + diagnoses ("milk? food?")
  - hears voices through walls upon waking → identifies mumma and aunty talking outside
  - covers ears for loud sounds like blender; startled by aggressive dog barking
- added milestone assessments to `profile/developmental-milestones.md`:
  - auditory figure-ground separation: significantly advanced (isolates voice from phone background noise)
  - sound-to-inference chain: significantly advanced (3-step causal chain from a single sound)
  - auditory empathy: advanced (verbal comfort + diagnostic questioning for unseen baby)
  - environmental sound monitoring: advanced (parallel processing while engaged in other tasks)
  - sound-startle sensitivity: on track (temperamental, consistent since birth)

**key observations:**
- this is a lifelong trait (since birth), temperamental not developmental
- the fan → aunty → pocha → geela chain is the standout: multi-step causal inference from one sound, without any visual confirmation
- she processes ambient sounds in parallel while doing other things (coloring, eating, playing)
- the combination of exceptional subtle-sound detection + startle sensitivity to loud sounds = coherent high-sensitivity auditory profile
- covers ears for loud sounds - healthy self-regulation
- parents initially thought all children are this sensitive - but her observing nature amplifies it

**files modified:**
- `profile/notes-about-mira.md` - new entry 2026-01-30 / 01:31 pm
- `profile/developmental-milestones.md` - new entry 2026-01-30 / 01:31 pm
- `journal.md` - this entry

---

## 2026-01-25 / 07:18 pm

### journaling practice - documented as active

**what we did:**
- updated `resources/mira-journal.md` status: journal started ~07-08.01, consistent from ~20.01, now active daily practice
- added journaling observations to `profile/notes-about-mira.md`:
  - self-initiated: picks color box, asks for balcony, grabs journal
  - stickers (favorite): learned to use empty spaces instead of overlapping
  - dot markers (second favorite): mastered 4-step procedure (open → shake → hold → press)
  - crayons: independent creative expression, follows her own agenda
  - date stamp: watches intently, attempting but hasn't mastered mechanism
- added milestone assessments to `profile/developmental-milestones.md`:
  - sticker spatial planning: on track to advanced
  - procedural tool use: advanced (4-step sequence with self-instruction)
  - creative autonomy: on track (healthy independence)
  - self-initiated activity: advanced (gathers materials, requests location)

**key observations:**
- journaling ritual has been internalized - she drives it now, not adults
- dot marker procedure shows procedural learning + self-regulatory speech ("hold..")
- spatial cognition developing rapidly (overlapping → using empty spaces within days)
- appropriate help-seeking: asks for heavy box help, cap rotation, but does rest independently

**files modified:**
- `resources/mira-journal.md` - status updated
- `profile/notes-about-mira.md` - new entry 2026-01-25 / 07:18 pm
- `profile/developmental-milestones.md` - new entry 2026-01-25 / 07:18 pm

---

## 2026-01-22 / evening

### mira's library - UI refresh

**what we did:**
- major visual overhaul of the library page based on inspiration from bookshelf designs
- implemented 3 of 5 planned phases:
  - **phase 1 (covers):** downloaded 52 book covers locally, fixed cover loading issues
  - **phase 2 (colors):** added color extraction from covers using ColorThief, pastel conversion, complementary text colors
  - **phase 3 (layout):** vertical stack layout (not grid), landscape cards on desktop, portrait on mobile, serif typography (Lora)

**design changes:**
- pastel card backgrounds extracted from each book cover (~88% lightness, 15-30% saturation)
- text colors dynamically paired to background hue (rust for warm tones, forest for greens, navy for blues, etc.)
- emoji category headers: 📚 current favorites, 📖 currently reading, ⭐ all-time classics, 🔁 read 50+ times, 🤷 not a fan, 💡 recommendations
- removed category subtitles - emojis speak for themselves
- removed status color strips - card colors provide visual differentiation

**data changes:**
- split lpbd collection (freddie, ali, hockney, dickens) into 4 individual books
- added neil armstrong lpbd
- removed 3 recommendation books (not owned yet)
- total books: 52

**files modified:**
- `apps/library/index.html` - added ColorThief CDN, emoji headers, books-stack structure
- `apps/library/styles.css` - complete overhaul for new layout
- `apps/library/app.js` - color extraction system, updated card structure
- `apps/library/plan-library-of-mira.md` - plan doc updated to v0.2

**remaining (phase 4):**
- notes side panel (desktop) / overlay (mobile) with colorful message blocks
- edit mode detection (wip.* domain = editable)

**inspiration sources:**
- johannesklingebiel.de/wiki/Bookshelf/ (color blocks from covers)
- highlights.sawyerh.com/ (cover display)
- petargyurov.com/bookshelf/ (categorization)

---

## 2026-01-07 / evening

### mira's library - books page project

**what we did:**
- created `resources/books-mira.md` - comprehensive catalog of mira's 44+ book collection with patterns and observations
- built `web/` folder with full books page application:
  - `index.html` - clean, playful ui for library browsing
  - `styles.css` - soft colors (pink, sage, lavender, peach), rounded corners, gentle shadows
  - `app.js` - full functionality with tabs, filters, book details, add book form
  - `config.js` - supabase configuration placeholder
  - `supabase-schema.sql` - database schema for books table

**features built:**
- "my books" tab with filters: all, current favorites, currently reading, outgrown, classics, read 50+ times
- "recommendations" tab for books we're considering
- book detail modal with notes editing
- yay/nay interaction for recommendations (to track what we want vs don't want)
- add book form with cover lookup via openlibrary api
- demo mode with sample data from mira's actual collection (works without supabase)

**patterns identified from book analysis:**
- visual density matters for engagement
- lifecycle/transformation books are strong draw (apples, caterpillar, magic tree)
- memorization = mastery = ready for new
- lpbd series works when actions are relatable (dancing, painting) + visual richness
- naming = ownership (she gives books her own names: apple go, kevin, audrey, coco, time)

**technical decisions:**
- supabase for data persistence (user already uses for other projects)
- openlibrary api for book covers (free, no auth needed)
- vanilla js - no frameworks, keep it simple
- vercel deployment ready

**files created:**
- `resources/books-mira.md`
- `web/index.html`
- `web/styles.css`
- `web/app.js`
- `web/config.js`
- `web/supabase-schema.sql`

**next steps:**
- user to share remaining 10-15 books to add
- configure supabase credentials
- deploy to vercel
- add book covers via openlibrary lookup

---

## 2026-01-01 / night

### research: indian parents on homeschooling - sentiments & questions

**what we did:**
- conducted extensive research sweep across web, forums, podcasts, social media, and communities
- captured what indian parents are actually thinking, asking, and debating about homeschooling and alternative education (2024-2025)
- created comprehensive research doc at `research/indian-parents-homeschooling-sentiments.md`

**key findings:**
- homeschooling growing but still niche (~4% of parents, ~10,000+ families) - concentrated in metros
- post-covid interest spike - 60% of parents globally held more favorable views after pandemic
- primary drivers: broken traditional system (stress, rote learning, competition), personalized learning desire, ai/future anxiety
- biggest concerns: socialization, board exam pathways (nios/igcse), family pressure, working parent feasibility
- early childhood (1-5yo): parents questioning necessity of preschool, play-based home learning gaining traction
- the ai narrative: 38% of indian students worried about job security; parents sensing school-to-job pipeline breaking

**platforms/voices captured:**
- communities: swashikshan, apni pathshala, aarohi, shikshantar
- facebook groups: homeschooling india, city-specific groups
- podcasts: the modern indian parent, big talk about tiny humans, kidsstoppress
- creators: that indian mom (aparajita), @myteenytot, nidhi
- quora threads on homeschooling questions

**themes:**
- tension between desire (personalized, stress-free) and fear (ruining future, societal judgment)
- early years feel natural for home learning; anxiety increases as board exams approach
- working parents question feasibility but strategies exist (flexible schedules, outside help)
- legal status clear (legal, not regulated) but grey area creates uncertainty

**why:**
- understand the broader landscape of what parents in india are thinking about education
- ground our approach in real conversations happening now
- identify where our work on mira's learning connects to larger trends

**files created:**
- research/indian-parents-homeschooling-sentiments.md

---

## 2026-01-01 / evening

### created mira's journal resource doc

**what we did:**
- created `resources/mira-journal.md` - a guide for mira's first journal
  - why it works for her: plays to her strengths (ritualistic, sustained attention, metacognitive, loves visuals, independence streak)
  - the ritual: tie to existing rhythm, same spot/setup, open→date stamp→create→caption→close
  - what goes in: weather, food, people, textures, feelings, moments, walks, balcony meals
  - materials list with amazon.in links: journal, crayons, stamps, stickers, washi tape, felt, textures
  - explained fabric swatches & textured paper (sensory exploration, touch vocabulary)
- refreshed wiki index and tags

**key ideas:**
- ritual over task: tie journaling to an existing rhythm (after breakfast, before nap, balcony time)
- process over product: some pages will be "empty" or "chaotic" - the habit is the point
- psychological ownership first: she chooses where it lives, opens/closes it herself
- physical carrying comes later (2.5-3+)
- textures: felt, cotton, jute, velvet, corrugated cardboard, tissue paper - so she can *feel* her journal

**git commits:**
- e8ab1d4: add mira's journal resource doc

---

## 2026-01-01 / afternoon

### added observations at 19.5 months

**what we did:**
- updated `profile/notes-about-mira.md` with new observations:
  - spatial navigation: identifies apartment blocks (d→e), understands relative position
  - vocabulary explosion: uses words for nearly everything, bilingual code-switching ("jao, please")
  - strict body autonomy: consistent boundaries enforced by her
  - 5-step reading ritual: bottle + bed + blanket + massage + book
  - building blocks: 5-6 layers with verbal guidance
  - help-seeking differentiation: seeks help for climbing, insists on independence for cognition
  - sustained attention: 30-50 min reading sessions
  - feeding patterns: dream feeds ongoing (teething/travel regression)
  - drooling: improving but continues
- updated `profile/developmental-milestones.md` with corresponding assessments:
  - spatial navigation: significantly advanced (3-4 yr level)
  - vocabulary size: advanced
  - bilingual pragmatics: advanced
  - body autonomy: advanced
  - self-regulation ritual: advanced
  - help-seeking differentiation: advanced (metacognitive)
  - sustained attention: significantly advanced (preschool level)
  - dream feeding: temporary regression (teething/travel/illness context)
  - drooling: on track, likely teething-related
- refreshed toc in both files

**why:**
- capture ongoing developmental observations and compare against typical milestones
- track temporary regressions (feeding) alongside advanced areas

**git commits:**
- 4a80e00: add observations at 19.5 months (2026-01-01)

---

## 2025-12-27 / 04:44 pm

### cleaned duplicate mira notes + pre-merge housekeeping

**what we did:**
- removed the duplicate 2025-12-27 entry from `profile/notes-about-mira.md` and `profile/developmental-milestones.md`
- refreshed toc and wiki indices after the cleanup

**why:**
- keep the profile docs non-redundant before merging to main

## 2025-12-27 / 04:17 pm

### expanded bike research + added safety + cost snapshot

**what we did:**
- updated `research/bicycles-mira.md` with woom go note, puky youke sizing note, kubikes automatix explanation + fallback links, and added new eu style-first options
- added purchase path + safety standards + packing guidance, plus a 1-page cost snapshot table and india local price baseline
- updated `profile/notes-about-mira.md` + `profile/developmental-milestones.md` with a new observation entry
- refreshed toc and wiki indices

**why:**
- clarify the import path, safety expectations, and total cost tradeoffs for eu/us options

## 2025-12-27 / 12:38 pm

### corrected eu links + expanded us options

**what we did:**
- fixed rascal and kubikes links; added rascal punk clarification
- added glerc and belsize as us belt-drive options with sources
- refreshed toc + wiki tags

**why:**
- resolve broken links and capture additional importable options

## 2025-12-27 / 11:57 am

### refreshed eu/us bike list with verified sources

**what we did:**
- replaced eu/us bike specs with data from official brand pages and known retailer listings
- added priority and guardian shipping constraints to the us section
- refreshed toc and wiki indices

**why:**
- keep import options accurate and source-backed

## 2025-12-27 / 11:46 am

### added us importable bike shortlist + shipping notes

**what we did:**
- added a us pedal-bike shortlist (prevelo, trailcraft, priority, guardian) with links and specs
- added shipping/import policy notes for prevelo and trailcraft
- refreshed toc and wiki tags

**why:**
- broaden importable options beyond europe while keeping design-first constraints

## 2025-12-26 / 10:24 pm

### refined eu bike shortlist + todds origin note

**what we did:**
- corrected eu bike sources (rascal official page, kubikes 16s page) and updated specs accordingly
- removed an unverified academy shipping note
- refreshed toc and wiki tags

**why:**
- keep the research accurate and aligned to primary sources

## 2025-12-26 / 10:19 pm

### added merge guidelines to agents + claude

**what we did:**
- added a new merging branches section to `agents.md` and `claude.md`
- refreshed toc and wiki indices

**why:**
- codify merge practice and pr documentation expectations

## 2025-12-26 / 10:15 pm

### expanded eu pedal-bike shortlist + clarified import policy notes

**what we did:**
- expanded the eu minimal-aesthetic pedal-bike shortlist with academy, beany, kubikes, kokua, and rascal (retailer specs)
- clarified brand shipping constraints and added the academy shipping note
- added a small decisions section (todds helmet + wooden wedge) to the bike research doc

**why:**
- align the research with the design-first brief and reduce dead links
- make import expectations clearer

## 2025-12-26 / 09:02 pm

### added toc generator + corrected bike research (eu + import + india leads)

**what we did:**
- added `scripts/toc-refresh.py` and updated `agents.md` / `claude.md` to reference it
- refreshed `research/bicycles-mira.md` with corrected eu models, brand shipping policies, and updated import/baggage guidance
- replaced india store-locator sweep with design-first local leads

**why:**
- keep toc updates automatic and reduce manual churn
- make the bike research more accurate and aligned with the design-first brief

## 2025-12-26 / 05:31 pm

### added wiki + documentation standards and refreshed tags/toc

**what we did:**
- updated `agents.md` and `claude.md` with wiki system + documentation structure guidelines
- added tags/related header blocks, table of contents, and sources sections across docs
- expanded wiki automation: `scripts/wiki-refresh.py` now regenerates `wiki/index.md` and `wiki/tags.md`
- refreshed `research/bicycles-mira.md` with tags and sources, plus doc formatting updates
- updated the denmark research doc to the new doc structure format

**why:**
- standardize doc navigation and make the wiki low-maintenance
- make tags more searchable and meaningful across the repo

## 2025-12-25 / 05:00 pm

### added wiki structure + expanded bicycle research (eu + india)

**what we did:**
- created `wiki/index.md` and `wiki/tags.md` and added a tags refresh script at `scripts/wiki-refresh.py`
- added `tags:` + `related:` blocks to `agents.md`, `journal.md`, `profile/notes-about-mira.md`, `profile/developmental-milestones.md`, and `research/bicycles-mira.md`
- refreshed `research/bicycles-mira.md` with:
  - eu pedal-bike shortlist + sizing specs
  - india offline store sweep (bangalore/delhi/mumbai)
  - import + baggage logistics notes

**why:**
- make the docs navigable as a continuous wiki without constant manual backfilling
- keep the bike decision doc current and practical for india + eu options

## 2025-12-25 / 03:27 pm

### refined bicycle research links and specs

**what we did:**
- updated `research/bicycles-mira.md` with inline links and specs for todds, leader, strider, and babyhug
- added india size guidance from decathlon + hero cycles
- removed the broken beetle link and softened heavy-weight claims for pedal bikes

**why:**
- keep sources accurate and avoid stale or unreliable links

## 2025-12-25 / 03:23 pm

### refined bicycle research + added new height measurement

**what we did:**
- updated `profile/notes-about-mira.md` with measured height (90/91 cm) and linked to bicycle research
- updated `profile/developmental-milestones.md` with a matching height milestone note
- rewrote `research/bicycles-mira.md`
  - added inline hyperlinks in place of a sources list
  - updated evidence section with current studies and clearer claims
  - refreshed india-available options and removed the broken beetle link
  - added a mira-specific fit estimate based on 90/91 cm

**why:**
- keep the research readable and directly actionable
- ensure the doc reflects mira's current measurements and preference for balance-bike first

## 2025-12-25 / 12:32 pm

### started bicycle research notes for mira (bangalore)

**what we did:**
- created `research/bicycles-mira.md` with early findings
  - balance bike vs training wheels evidence snapshot
  - sizing notes using inseam/height guidance
  - india-available options (balance, convertible, pedal)
  - transition plan + open questions

**why:**
- capture options and evidence before choosing a bike
- keep research centralized for updates and decisions

## 2025-12-25 / 12:27 pm

### added new observations on growth, safety awareness, and motor control

**what we did:**
- updated `profile/notes-about-mira.md` with new observations
  - tall for age; parents tall
  - good understanding of instructions and danger
  - good motor control
- updated `profile/developmental-milestones.md` with matching milestone context
  - physical growth and inseam-based sizing note
  - safety comprehension assessment
  - gross motor coordination assessment

**why:**
- capture new context from the bicycle conversation for future planning and equipment fit
- keep milestone tracking aligned with new observations

## 2025-12-22 / early afternoon (session 2)

### started building mira's profile + first developmental assessment

**what we did:**
- created `profile/notes-about-mira.md` - initial observations about mira
  - basic info: birthdate 17.05.24, age 19 months
  - letter recognition abilities
  - speech & language development (vocabulary, contextual usage, comprehension)
  - music & dance: daily ritual, copies steps quickly, sings along, uses google home
  - observational skills: intentful observer, analytical approach to learning
  - reading habits: 40-50 books, page-by-page memory, current favorites
  - environmental print awareness: points out letters/numbers everywhere
- created `profile/developmental-milestones.md` - thorough milestone tracking
  - assessed mira against typical developmental milestones
  - areas covered: language, gross motor, cognitive, musical, technology, literacy
  - key findings: significantly advanced in receptive language, letter recognition, environmental print awareness; advanced in memory, observational learning, singing
- added ongoing documentation protocol to `agents.md` and `claude.md`
  - protocol: as observations come up in conversation, add to notes-about-mira.md with timestamps
  - protocol: for each observation, add corresponding milestone assessment to developmental-milestones.md

**discussed:**
- language development approaches for mira from here
- book recommendations (narrative, lift-the-flap, phonics - modern illustrations, no chicka chicka)
- learning space and routine for homeschooling (environment > schedule, rhythm > rigid times)
- clarifications: receptive language, simon says games, songs with actions, magnet safety, art supplies

**key insight:**
- mira shows metacognitive awareness - she knows when she's learning (pauses dancing to absorb a new step, watches analytically)
- her analytical approach to observation + strong memory + early literacy = foundation for self-directed learning

**files created:**
- profile/notes-about-mira.md
- profile/developmental-milestones.md

**git commits:**
- 38816a9: add initial observations about mira
- c8ca80c: add developmental milestone assessments for mira at 19mo
- 3a82bd6: add ongoing documentation protocol to agents.md and claude.md
- e6e2c0a: remove profile/.gitkeep

---

## 2025-12-22 / early afternoon

### defined project vision and structure

**what we did:**
- renamed branch to `early-days`
- established the three pillars of this project:
  1. **research/** - broad exploration of schooling history, pedagogy, modern learning platforms (khan academy, etc.), ai-first education tools, and what's possible in the near future
  2. **resources/** - curated, personalized resources (books, toys, activities) centered around her developmental stage and needs
  3. **profile/** - free-form observation notes on her - daily patterns, routines, what she can do, what she's learning, likes/dislikes/fears/curiosities - to later draw patterns and insights from
- created folder structure: `/research`, `/resources`, `/profile`

**why:**
- the goal is to reimagine formative years learning, but grounded completely in *her* - who she is as a unique learner
- separating into folders allows each area to grow organically with its own docs
- free-form notes in profile/ lets us capture observations naturally, then pattern-match later

**files created:**
- /research/.gitkeep
- /resources/.gitkeep
- /profile/.gitkeep

---

## 2025-12-20 / time: current session

### initialized project repository

**what we did:**
- initialized git repository in homeschooling folder
- created public github repository at https://github.com/workinprogmess/homeschooling
- connected local repo to remote origin
- established project documentation structure with three core files:
  - claude.md: for research, docs, and claude conversations
  - agents.md: for ai agent notes and workflows
  - journal.md: this living log of project progress

**why:**
- needed version control for the project
- wanted public remote on github to share learnings
- establishing clear documentation patterns from the start helps maintain organization as project grows
- journal format (reverse chronological, plain english, with references) makes it easy to track decisions and progress over time

**files created:**
- /README.md
- /CLAUDE.md
- /agents.md
- /journal.md

**git commits:**
- 74c3a3a: initial commit

---

## sources / references
- none yet
