# ES2 Guide — Project Specification
*Reference document for any Claude session continuing this project.*

---

## Project Identity

A multi-volume HTML guide for **Endless Space 2** (including all DLCs), targeting players who already understand the basics and want deep mechanical and strategic understanding. No hand-holding. Technical, precise, traceable. Content claims must be sourced or flagged as uncertain.

---

## Source Integrity Rules

**This project's core promise is that all claims are traceable to a source. The following rules
are non-negotiable and apply to every session.**

### What counts as a valid source
A source is valid only if Claude actually retrieved and read it during the current session:
- User-uploaded files (transcripts, Reddit threads, documents) — always valid
- Wiki or web pages successfully fetched via web_fetch or web_search in the current session,
  where the actual content (not just navigation) was returned and read — valid
- Project knowledge files read via the view tool in the current session — valid

### Source Quality Hierarchy

All claims in this guide must be traceable to a source retrieved and read in the current session
(see Source Integrity Rules). When two sources conflict, resolve the conflict using this hierarchy
— higher tier always wins. Document the conflict and resolution in the planning discussion before
writing content.

#### Tier 1 — User-uploaded files (highest trust)
Files directly uploaded by the user in the current session. These represent curated,
session-specific primary material and take precedence over everything else. If a Tier 1 source
conflicts with any lower tier, always trust the uploaded file and flag the discrepancy explicitly.

#### Tier 2 — Authoritative ES2 community sources
Any page successfully fetched from the following domains, treated as equally reliable among
themselves:
- `wiki.endless-space.com/`
- `endless-space-2.fandom.com/wiki/Endless_Space_2_Wiki`
- `community.amplitude-studios.com/amplitude-studios/endless-space-2/`
- `www.reddit.com/r/EndlessSpace/`

When two Tier 2 sources conflict with each other, flag the conflict explicitly in the content
rather than silently picking one — the reader should know the mechanic is disputed.

#### Tier 3 — Other web sources
Any page successfully fetched from the web that does not belong to a Tier 2 domain (e.g. Steam
guides, YouTube transcripts obtained via fetch, personal blogs, other wikis). Useful for
corroboration but should not be the sole source for a mechanical claim. If a Tier 3 source
conflicts with a Tier 2 source, trust Tier 2 and note the discrepancy if it is meaningful.

#### Tier 4 — Claude's training data (lowest trust)
General knowledge from training, not retrieved from any source in the current session. Must never
be presented as a sourced fact. Permissible uses:
- Filling genuine gaps where no higher-tier source is available, provided it is explicitly flagged
  inline as unverified (e.g. "unconfirmed — not sourced in this session")
- Generating plausible hypotheses to test against higher-tier sources
- Never cite training data with a src-pill or any other source attribution marker

#### Conflict resolution protocol
When sources at different tiers contradict each other:
1. Higher tier always wins on the factual claim
2. The conflict must be reported to the user but NOT included in the generated file content. The only exception to this rule is if 
two Tier 2 sources do conflict: if that's the case present both positions INTO the generated file and flag the mechanic as disputed.
4. If uncertainty cannot be resolved within the available sources, say so rather than picking
   one arbitrarily.

### What does NOT count as a valid source
- Any URL or source type Claude mentions from general training knowledge without having fetched
  it in the current session — NOT valid, even if the source plausibly exists
- Steam guides, Reddit threads, wiki pages, or any other web resource that Claude searched for
  but could not successfully retrieve (e.g. returned navigation chrome, empty content, or a
  render wall) — NOT valid
- "Community knowledge" or "generally accepted" claims that Claude cannot trace to a specific
  document read in the current session — NOT valid

### How to handle uncertain or unverified claims
- If a claim is drawn from general training knowledge rather than a retrieved source, either
  omit it or flag it explicitly inline with a callout or note: "Source not verified — treat as
  plausible community knowledge pending confirmation"
- Never create a src-pill, source attribution, or citation for a source that was not actually
  read in the current session
- If a web fetch fails or returns unusable content, note the failure and do not cite that source

### What to do when sources are thin
If the user-provided sources do not cover a topic adequately and web retrieval fails, the correct
response is to say so explicitly — either in the planning discussion or via an inline uncertainty
flag in the built content — rather than filling the gap with unattributed training knowledge
presented as sourced fact.

---

## File Structure & Status

Files are organized into three subdirectories:

```
./CSSnJS/              ← shared CSS and JS (edit rarely)
./GeneralGuide/        ← general guide volumes
./FactionsDeepGuide/   ← faction deep-dive volumes
./index.html           ← guide landing page
```

Naming conventions:
- General volumes: `es2-vol{N}-{topic}.html`
- Faction deep-dives: `es2-Fac{NN}-{faction}.html`

**Shared infrastructure** (no status tracking):

| File | Role |
|------|------|
| `CSSnJS/es2-guide.css` | Shared design system — edit rarely |
| `CSSnJS/es2-guide.js` | Shared JS: progress, quiz, mobile nav — edit rarely |
| `index.html` | Guide landing page with links to all volumes |

**General Guide volumes:**

| File | Status | Topics | Notes |
|------|--------|--------|-------|
| `GeneralGuide/es2-vol0-exploration.html` | Complete, awaiting review | 7 | |
| `GeneralGuide/es2-vol1-empire.html` | Complete, awaiting review | 8 | Planned Enhancement |
| `GeneralGuide/es2-vol2-combat.html` | Complete, awaiting review | 8 | |
| `GeneralGuide/es2-vol3-heroes.html` | Complete, awaiting review | 8 | |
| `GeneralGuide/es2-vol4-diplomacy.html` | Complete, awaiting review | 7 | |
| `GeneralGuide/es2-vol5-factions.html` | Complete, awaiting review | 6 | Contains United Empire, Sophons, Unfallen, Nakalim, Hissho, Vaulters |
| `GeneralGuide/es2-vol6-factions-special.html` | Complete, awaiting review | 6 | Contains Lumeris, Horatio, Vodyani, Cravers, Riftborns, Umbral Choir |

**Faction Deep-Dive volumes:**

| File | Status | Topics | Notes |
|------|--------|--------|-------|
| `FactionsDeepGuide/es2-Fac01-lumeris.html` | Complete, content awaiting user revision | 13 | |
| `es2-Fac02-horatio.html` | Complete, content awaiting user revision | 10 | |
| `es2-Fac03-sophons.html` | Complete, content awaiting user revision | 9 | |

---

## Shared Dependencies

Every HTML file must link these two externals in `<head>` and at the bottom of `<body>`:

```html
<!-- in <head> -->
<link rel="stylesheet" href="../CSSnJS/es2-guide.css">

<!-- at bottom of <body>, after inline <script> -->
<script src="../CSSnJS/es2-guide.js"></script>
<script>renderQuiz(); initProgress(); initMobileNav();</script>
```

Google Fonts link (also required in `<head>`):
```html
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&family=Rajdhani:wght@300;400;500;600&display=swap" rel="stylesheet">
```

---

## Color System

### Global palette (defined in `es2-guide.css` `:root`)

**Semantic fixed colors** — use these by name, never by hex:
| Var | Color | Use |
|-----|-------|-----|
| `--green` / `--green-rgb` | #1db96a | Positive, buffs |
| `--red` / `--red-rgb` | #e84040 | Negative, warnings, danger |
| `--gold` / `--gold-rgb` | #e8a020 | Economy, resources |
| `--purple` / `--purple-rgb` | #8b5cf6 | Heroes, abilities |
| `--cyan` / `--cyan-rgb` | #00d4ff | Tech, science |

**Per-volume accent colors:**
| Volume | Accent var | RGB var | Color |
|--------|-----------|---------|-------|
| Vol.0 | `--vol0-accent` | `--vol0-accent-rgb` | Teal-green #00c9a7 |
| Vol.1 | `--vol1-accent` | `--vol1-accent-rgb` | Gold #e8a020 |
| Vol.2 | `--vol2-accent` | `--vol2-accent-rgb` | Red #e84040 |
| Vol.3 | `--vol3-accent` | `--vol3-accent-rgb` | Purple #8b5cf6 |
| Vol.4 | `--vol4-accent` | `--vol4-accent-rgb` | Blue #2d8fff |
| Vol.5 | `--vol5-accent` | `--vol5-accent-rgb` | Mint #00d4a0 |
| Vol.6 | `--vol6-accent` | `--vol6-accent-rgb` | Violet #c084fc |

**Faction identity colors:**
| Faction | Color var | RGB var | Color |
|---------|-----------|---------|-------|
| Lumeris | `--lumeris-color` | `--lumeris-color-rgb` | Gold #e8a020 |
| United Empire | `--ue-color` | `--ue-color-rgb` | Imperial red #c0392b |
| Vodyani | `--vodyani-color` | `--vodyani-color-rgb` | Predatory orange #ff6b1a |
| Riftborn | `--riftborn-color` | `--riftborn-color-rgb` | Cold cyan #00e5ff |
| Sophon | `--sophon-color` | `--sophon-color-rgb` | Blue #2d8fff |
| Cravers | `--cravers-color` | `--cravers-color-rgb` | Dark green #1a6b2a |
| Hissho | `--hissho-color` | `--hissho-color-rgb` | Red #e84040 |
| Horatio | `--horatio-color` | `--horatio-color-rgb` | Narcissist pink #f0a8d0 |
| Unfallen | `--unfallen-color` | `--unfallen-color-rgb` | Green #1db96a |
| Umbral Choir | `--umbral-color` | `--umbral-color-rgb` | Purple #8b5cf6 |
| Vaulters | `--vaulters-color` | `--vaulters-color-rgb` | Teal #00c9a7 |
| Nakalim | `--nakalim-color` | `--nakalim-color-rgb` | Pale sacred gold #e8d48b |


Faction deep-dives use the corresponding faction identity color as their base, and the badges defined in the shared CSS file. 

### Per-page `:root` override (required in every file's `<style>`)

Minimal volumes (vol0–vol6):
```css
:root {
  --accent:     var(--volN-accent);
  --accent-rgb: var(--volN-accent-rgb);
  --accent-dim: rgba(var(--volN-accent-rgb), 0.11);
}
```

Faction deep-dives (example — Lumeris):
```css
:root {
  --accent:             var(--lumeris-color);
  --accent-rgb:         var(--lumeris-color-rgb);
  --accent-dim:         rgba(var(--lumeris-color-rgb), 0.11);
  --accent-bright-rgb:  245,200,66;
  --accent-bright:      rgb(var(--accent-bright-rgb));
}
```

### Hard rules on colors
- **No hardcoded hex values** anywhere in `<style>` or inline `style=""` attributes
- **No raw `rgba(R,G,B, ...)` calls** — always `rgba(var(--some-rgb), alpha)`
- Use `var(--red)` not `#e84040`, `var(--gold)` not `#e8a020`, etc.
- Inline approval/status bars: use `var(--red)`, `var(--gold)`, `var(--green)`, `var(--vol4-accent)` for segment backgrounds

---

## Typography System

All font sizes must use tokens from `es2-guide.css` `:root`. **No raw `px` values** in `<style>` or `style=""`.
If the need to define a new font size variable arise this should be not written as a fixed value but as a proportion of `--tsMainText` variable (example: `--ts_sectionLabel:calc(var(--ts_mainText) * 0.9); ` instead of `--ts_sectionLabel:16px`; ); limit the precision of this proportion to one decimal cipher.

| Token | Approx size | Typical use |
|-------|-------------|-------------|
| `--ts_mainText` | 18px (base) | Body prose |
| `--ts_pageTitle` | ~32px | `<h1>` page titles |
| `--ts_topicTitle` | ~20px | `<h2>` topic titles, `.takt-title` |
| `--ts_sectionTitle` | ~11px | Labels, small caps, `.tl-turn`, `.trait-label`, `.ship-role` |
| `--ts_sectionLabel` | ~16px | Nav labels, `.tl-body`, `.trait-block` text, `.tag-source` |
| `--ts_blockTitle` | = topicTitle | Content block headers |
| `--ts_callout` | = mainText | Callout body text |
| `--ts_table` | = sectionLabel | Table content |
| `--ts_quizTitle` | = sectionLabel | Quiz text, `.ship-name`, `.ship-body`, `.vol-link` |
| `--ts_quizQuestion` | = sectionLabel | Quiz question text |
| `--ts_quizSmall` | = sectionTitle | Quiz sub-labels, approval bar sub-text |
| `--ts_breadcrumb` | = sectionLabel | Breadcrumb nav |
| `--ts_logoText` | = sectionLabel | Sidebar logo text |
| `--ts_progressMini` | = sectionTitle | Progress bar label |



---

## Progress Tracking (JS globals — required in every file)

The inline `<script>` block before `es2-guide.js` must declare these globals:

```js
const doneTopics = new Set();
const VOLUME = 'volN';   // e.g. 'vol0', 'vol1', 'fac01' — used as cookie namespace
const TOTAL = N;         // integer matching the exact number of tracked topics
let qIdx = 0;
let answered = false;
const quizzes = [ /* array of quiz objects */ ];
```

`TOTAL` must exactly match the number of `id="tN"` topic elements in the page. The Lumeris file has topics `t0`–`t12`, so `TOTAL = 13`.

### Quiz object shape
```js
{
  scenario: "Situation description...",
  q: "Question text?",
  opts: ["Option A", "Option B", "Option C", "Option D"],
  correct: 1,      // 0-indexed
  explain: "Explanation of why the correct answer is correct, and why wrong answers are wrong."
}
```

Quiz scenarios must be specific, plausible in-game situations. Explanations must teach the mechanic, not just confirm the answer.

### Nav check IDs
Sidebar nav items that correspond to tracked topics must have `<span class="nav-check" id="ncN"></span>` where N matches the topic number.

---

## HTML Page Structure

### Required layout skeleton
```html
<div class="layout">
  <nav class="sidebar"> ... </nav>
  <main class="main">
    <div class="page-header">
      <div class="breadcrumb"><a href="../index.html" class="linkToIndex">ES2</a> // <span>Vol.N</span> // Title</div>
      <h1 class="page-title">Title</h1>
      <p class="page-subtitle">...</p>
    </div>
    <!-- topics -->
    <div class="topic" id="tN"> ... </div>
    <hr class="topic-divider">
    <!-- quiz section -->
    <div class="topic" id="quiz"> ... </div>
  </main>
</div>
<div class="toast" id="toast"></div>
```

### Topic structure
```html
<div class="topic" id="tN">
  <div class="topic-header">
    <div class="topic-num">0N</div>
    <div>
      <h2 class="topic-title">Title</h2>
      <div class="topic-subtitle">Subtitle</div>
    </div>
  </div>

  <div class="content-block open" id="cbNa">
    <div class="block-header" onclick="toggle('cbNa')">
      <span class="block-icon">🔧</span>
      <span class="block-title">Block Title</span>
      <span class="block-tag tag-mech">MECHANIC</span>
      <span class="block-chevron">▾</span>
    </div>
    <div class="block-body">
      <!-- content -->
      <div class="done-row">
        <span class="done-label">UNDERSTOOD & APPLIED</span>
        <button class="done-btn" onclick="markDone('tN','cbNa',this)">✓ MARK DONE</button>
      </div>
    </div>
  </div>
</div>
```

The first `content-block` of a topic typically has class `open`. Subsequent blocks are closed by default.

### Sidebar structure
```html
<nav class="sidebar">
  <div class="sidebar-logo">
    <a href="../index.html" class="vol-card right linkToIndex" style="--card-accent: var(--text-bright); --card-accent-rgb: var(--text-bright);">ES2</a>
    <div class="game-name">VOLUME N</div>
    <div class="guide-name">Title<br>Subtitle</div>
  </div>
  <div class="nav-section-label">// Section Name</div>
  <div class="nav-item active" onclick="scrollByID('t1')">
    🔧 Topic Name <span class="nav-check" id="nc1"></span>
  </div>
  <!-- vol navigation links -->
  <div class="nav-section-label">// Next Volumes</div>
  <div class="vol-card right vol-prev" onclick="location.href='es2-volN-prev.html'"><div class="vol-card-arrow">←</div> Vol.N-1: Name</div>
  <div class="vol-card left vol-next" onclick="location.href='es2-volN-next.html'">Vol.N+1: Name <div class="vol-card-arrow">→</div></div>
  <!-- progress bar -->
  <div class="progress-mini">
    <div class="progress-mini-label"><span>MASTERY</span><span id="pct-mini">0%</span></div>
    <div class="progress-mini-bar"><div class="progress-mini-fill" id="bar-mini" style="width:0%"></div></div>
  </div>
</nav>
```

Factions deep dive should not have the two `vol-link` elements in the sidebar, because deep dives are meant to be standalone volumes, and do not have a logical order

### Common content components

**Callout boxes:**
```html
<div class="callout callout-tip">
  <div class="callout-label">LABEL TEXT</div>
  Body text.
</div>
<div class="callout callout-warn"> ... </div>
```

**Reference table:**
```html
<table class="ref-table">
  <tr><th>Col</th><th>Col</th></tr>
  <tr><td class="cell-key">Label</td><td class="cell-good">Positive</td></tr>
  <tr><td class="cell-key">Label</td><td class="cell-bad">Negative</td></tr>
</table>
```

**Step list:**
```html
<ul class="step-list">
  <li><span class="step-n">STEP 1</span><span>Description</span></li>
</ul>
```

**Block tags** (after `.block-title` in `.block-header`):
- `<span class="block-tag tag-mech">MECHANIC</span>` — game mechanics
- `<span class="block-tag tag-strat">STRATEGY</span>` — strategic advice
- Other tags can be added as needed

---

## Content Standards

- **Audience:** Players past the tutorial, comfortable with basic FIDSI and combat, seeking depth
- **Tone:** Direct, technical, no hand-holding. Assume the reader has played 10+ hours
- **Claims must be sourced.** If a mechanic is uncertain or version-dependent, say so explicitly rather than stating it as fact
- **Sources used so far:** Reddit threads (r/EndlessSpace), YouTube video transcripts (ship design guides, faction playthroughs). Cite source type in `<span class="tag-source">` pills where used in faction deep-dives
- **Quiz scenarios** must be concrete in-game situations with specific numbers (turn, Dust amount, approval %) — not abstract. All four options must be plausible; wrong answers should represent common mistakes

---

## Faction Deep-Dive Format (additional conventions)

Faction files are more elaborate than the main volumes and introduce additional components:

- **`.faction-badge`** — identity label at the top of the page
- **`.trait-block`** — faction-specific trait/mechanic blocks (`.warn` modifiers when signalling a negative trait (for example: a weakness explanation))
- **`.trait-label`** — label inside trait blocks
- **`.source-row` / `.src-pill`** — source attribution inline with claims
- **`.timeline` / `.tl-row`** — turn-order playbook (T1, T5, T10, etc.)
- **`.ship-grid` / `.ship-card`** — ship hull comparison cards
- **`.takt-box` / `.takt-title`** — TAKT concept callout (Lumeris-specific but reusable)

COOKIE KEY for faction files: use a unique string like `'fac01'`, `'fac02'`, etc. (not `'vol6'` which is already taken by the special factions overview).

---



## Planned Enhancements

### Vol.1 — Empire Diagnostic Routines (planned)

**Concept origin:** Emerged during the Sophons deep-dive (Fac03) session. The Sophons quiz
introduced a "diagnostic" question format distinct from scenario questions: instead of presenting
a decision point, a diagnostic question presents a complete empire snapshot at a specific turn
and asks the player to identify what went wrong and in what order of impact.

**On the format's effectiveness:** The diagnostic format is a deliberate experiment. The hypothesis
is that it trains a qualitatively different skill — reading your own game state rather than
memorising correct responses to known situations. Whether it actually achieves this more
effectively than scenario questions is unproven. Treat it as a promising format to test during
content review, not as an established success. Gather player feedback before expanding it further.

**Why Vol.1:** The diagnostic skill depends on faction-agnostic mechanics that live in Vol.1:
FIDSI ratios, the relationship between Science output and Industry capacity, population growth
gates, and Approval thresholds and their multiplier effects. Vol.1 is the correct home for a
general-purpose bottleneck-identification framework that players can then apply through the
faction-specific lens of each deep-dive.

**What to add:** One new topic (or expansion of an existing topic) covering:
- How to identify the primary bottleneck in an empire each turn — the constraint that, if removed,
  unlocks the most value; not always the lowest number on the screen
- The relationship between Science unlocks and Industry capacity: researching what you cannot
  build is not progress
- Population growth and Approval as a coupled gate: population growth requires new systems (which
  reduce Approval on annexation), but Approval thresholds act as empire-wide FIDSI multipliers,
  meaning new population added under degraded Approval is less productive than existing population
  under good Approval. Expansion is therefore not unconditionally good — the net value of a new
  system depends on whether the Approval cost is paid back by that system's FIDSI contribution
  within a reasonable timeframe. This coupling is one of the most commonly misunderstood
  mechanics by intermediate players and deserves explicit treatment
- A worked example: a faction-agnostic "stuck at turn 35" snapshot with a compound failure state,
  showing how to sequence the diagnosis (identify primary constraint first, then secondary, then
  corrective order)

**Quiz format:** Include 2–3 diagnostic questions in the same format trialled in Fac03 — full
empire snapshot as scenario, "identify the error and corrective sequence" as the question.
Faction-agnostic or using a generic unnamed empire. Assess their effectiveness during content
review before committing to the format more broadly.

**Tone note:** The diagnostic content should feel like teaching the player to be their own
analyst, not like a checklist. The framing "what is your primary bottleneck this turn" is more
useful than "check these five things in order."
---

## Workflow for New Sessions

1. Claude reads `es2-guide.css` and `es2-guide.js` from project files to confirm the design system
2. User uploads the specific file being worked on (faction guide, new volume, etc.)
3. User uploads source material (Reddit threads, video transcripts, wiki exports, etc.) in order to integrate or substitute what Claude can find on the internet on its own
4. Claude works on the file, outputs the result to `/mnt/user-data/outputs/`
5. User downloads and replaces their local copy
