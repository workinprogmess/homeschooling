# journal.md

project development log - newest entries on top

**tags:** #project-journal #work-log #decision-history
**related:** [wiki index](./wiki/index.md), [agents](./agents.md), [claude](./CLAUDE.md)

## table of contents
<!-- toc:start -->
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
