# ES2 Guide — Project Specification
*Reference document for any Claude session continuing this project.*

---

## Project Identity

A multi-volume HTML guide for **Endless Space 2** (including all DLCs), targeting players who already understand the basics and want deep mechanical and strategic understanding. No hand-holding. Technical, precise, traceable. Content claims must be sourced or flagged as uncertain.

---

## File Structure

```
es2-guide.css              ← shared design system. Can be updated if needed, but this should be done rarely
es2-guide.js               ← shared JS: progress tracking, quiz, mobile nav. Can be updated if needed, but this should be done rarely
es2-vol0-exploration.html  ← Vol.0: Exploration & Early Game
es2-vol1-empire.html       ← Vol.1: Empire & Economy
es2-vol2-combat.html       ← Vol.2: Combat & Victory
es2-vol3-heroes.html       ← Vol.3: Heroes
es2-vol4-diplomacy.html    ← Vol.4: Diplomacy
es2-vol5-factions.html     ← Vol.5: Standard Factions
es2-vol6-factions-special.html  ← Vol.6: Special Factions
es2-Fac01-lumeris.html  ← Faction deep-dive: The Lumeris (in-progress)
index.html                 ← Main page (in progress: at this moment is just a redirect to Vol0)
```

The files must follow this subdirectory structure:
```
./CSSnJS/                 ← shared CSS and JS files live in here
./GeneralGuide/           ← All the HTML files that make the volumes of the general guide  live in here
./FactionsDeepGuide/      ← All the HTML files that make the faction deep dives volumes live in here
```
Faction deep-dives follow the naming pattern `es2-Fac{NN}-{faction}.html`.

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

Faction deep-dives use **Vol.6** accent as their base, then may define additional vars (e.g. `--lumeris-teal`) in `:root` pseudoclass of `es2-guide.css` file — but those vars must themselves use RGB triplets rather than raw hex values.

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
  --accent:             var(--vol6-accent);
  --accent-rgb:         var(--vol6-accent-rgb);
  --accent-dim:         rgba(var(--vol6-accent-rgb), 0.11);
  --accent-bright-rgb:  245,200,66;
  --accent-bright:      rgb(var(--accent-bright-rgb));
  --lumeris-teal-rgb:   0,180,204;
  --lumeris-teal:       rgb(var(--lumeris-teal-rgb));
  --lumeris-teal-dim:   rgba(var(--lumeris-teal-rgb), 0.10);
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
      <div class="breadcrumb">ES2 // <span>Vol.N</span> // Title</div>
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
    <div class="game-name">VOLUME N</div>
    <div class="guide-name">Title<br>Subtitle</div>
  </div>
  <div class="nav-section-label">// Section Name</div>
  <div class="nav-item active" onclick="scrollByID('t1')">
    🔧 Topic Name <span class="nav-check" id="nc1"></span>
  </div>
  <!-- vol navigation links -->
  <div class="vol-link vol-prev" onclick="location.href='es2-volN-prev.html'">← Vol.N-1: Name</div>
  <div class="vol-link vol-next" onclick="location.href='es2-volN-next.html'">Vol.N+1: Name →</div>
  <!-- progress bar -->
  <div class="progress-mini">
    <div class="progress-mini-label"><span>MASTERY</span><span id="pct-mini">0%</span></div>
    <div class="progress-mini-bar"><div class="progress-mini-fill" id="bar-mini" style="width:0%"></div></div>
  </div>
</nav>
```

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
- **`.trait-block`** — faction-specific trait/mechanic blocks (`.teal`, `.warn` modifiers)
- **`.trait-label`** — label inside trait blocks
- **`.source-row` / `.src-pill`** — source attribution inline with claims
- **`.timeline` / `.tl-row`** — turn-order playbook (T1, T5, T10, etc.)
- **`.ship-grid` / `.ship-card`** — ship hull comparison cards
- **`.takt-box` / `.takt-title`** — TAKT concept callout (Lumeris-specific but reusable)

COOKIE KEY for faction files: use a unique string like `'fac01'`, `'fac02'`, etc. (not `'vol6'` which is already taken by the special factions overview).

---

## Completed Volumes — Status

| File | Status | Topics | Notes |
|------|--------|--------|-------|
| es2-vol0-exploration.html | Complete, content awaiting user revision | 7 | |
| es2-vol1-empire.html | Complete, content awaiting user revision | 8 | |
| es2-vol2-combat.html | Complete, content awaiting user revision | — | |
| es2-vol3-heroes.html | Complete, content awaiting user revision | — | |
| es2-vol4-diplomacy.html | Complete, content awaiting user revision | — | |
| es2-vol5-factions.html | Complete, content awaiting user revision | — | |
| es2-vol6-factions-special.html | Complete, content awaiting user revision | — | |
| es2-Fac01-lumeris.html | In progress | 13 | Compliance-fixed Feb 2026 |

---

## Workflow for New Sessions

1. Claude reads `es2-guide.css` and `es2-guide.js` from project files to confirm the design system
2. User uploads the specific file being worked on (faction guide, new volume, etc.)
3. User uploads source material (Reddit threads, video transcripts, wiki exports, etc.) in order to integrate or substitute what Claude can find on the internet on its own
4. Claude works on the file, outputs the result to `/mnt/user-data/outputs/`
5. User downloads and replaces their local copy
