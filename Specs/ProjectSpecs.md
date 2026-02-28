# ES2 Guide — Project Specification
*Reference document for any Claude session continuing this project.*

---

## File Structure & Status

Files are organized into three subdirectories:

```
./CSSnJS/              ← shared CSS and JS (edit rarely)
./GeneralGuide_OLD/    ← Legacy general guide volumes: content to be discarded and rebuild from sources
./Specs/               ← Contains the various .md files with all the various reference documents for Claude
./FactionsDeepGuide/   ← faction deep-dive volumes
./index.html           ← guide landing page
```

Naming conventions:
- General volumes: `es2-vol{N}-{slug}.html`
- Faction deep-dives: `es2-Fac{NN}-{faction}.html`

**Shared infrastructure** (no status tracking):

| File | Role |
|------|------|
| `CSSnJS/es2-guide.css` | Shared design system — edit rarely |
| `CSSnJS/es2-guide.js` | Shared JS: progress, quiz, mobile nav — edit rarely |
| `Specs/VolumeTopics_General.md` | An index of the Volumes and topics which should be covered by the general guide |
| `Specs/ContentSpecs.md` | The reference document that instruct Claude on how to generate the guide content |
| `index.html` | Guide landing page with links to all volumes |

**General Guide volumes:** (To be rebuilt) 

| File | Title | Topics | Status |
|------|-------|--------|--------|
| `GeneralGuide/es2-vol0-gamestart.html` | Game Start Essentials | 8 | Pending rebuild |
| `GeneralGuide/es2-vol1-economy.html` | Inside your Empire: Material & Money | 9 | Pending rebuild |
| `GeneralGuide/es2-vol2-people.html` | Inside your Empire: People & Ideas | 7 | Pending rebuild |
| `GeneralGuide/es2-vol3-exploration.html` | Outside your Empire | 10 | Pending rebuild |
| `GeneralGuide/es2-vol4-combat.html` | Ships, Combat & Military | 10 | Pending rebuild |
| `GeneralGuide/es2-vol5-heroes.html` | Heroes & the Academy | 10 | Pending rebuild |
| `GeneralGuide/es2-vol6-diplomacy.html` | Diplomacy & Espionage | 7 | Pending rebuild |
| `GeneralGuide/es2-vol7-factions.html` | Faction Guides — Beginner | 6 | Pending rebuild |
| `GeneralGuide/es2-vol8-factions-expert.html` | Faction Guides — Intermediate & Expert | 6 | Pending rebuild |


**Legacy files (superseded by the restructure — do not use as templates):**

| File | Notes |
|------|-------|
| `GeneralGuide_OLD/es2-vol0-exploration.html` | Content to be discarded — rebuild from sources |
| `GeneralGuide_OLD/es2-vol1-empire.html` | Content to be discarded — rebuild from sources |
| `GeneralGuide_OLD/es2-vol2-combat.html` | Content to be discarded — rebuild from sources |
| `GeneralGuide_OLD/es2-vol3-heroes.html` | Content to be discarded — rebuild from sources |
| `GeneralGuide_OLD/es2-vol4-diplomacy.html` | Content to be discarded — rebuild from sources |
| `GeneralGuide_OLD/es2-vol5-factions.html` | Content to be discarded — rebuild from sources |
| `GeneralGuide_OLD/es2-vol6-factions-special.html` | Content to be discarded — rebuild from sources |

**Faction Deep-Dive volumes:**

| File | Status | Topics | Notes |
|------|--------|--------|-------|
| `FactionsDeepGuide/es2-Fac01-lumeris.html` | Complete, content awaiting user revision | 13 | |
| `FactionsDeepGuide/es2-Fac02-horatio.html` | Complete, content awaiting user revision | 10 | |
| `FactionsDeepGuide/es2-Fac03-sophons.html` | Complete, content awaiting user revision | 9 | |

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
| Var        | Value (R,G,B) | Use |
|------------|------------|-----|
| `--green`  | 29,185,106 | Positive, buffs |
| `--red`    | 232,64,64  | Negative, warnings, danger |
| `--gold`   | 232,160,32 | Economy, resources |
| `--purple` | 139,92,246 | Heroes, abilities |
| `--cyan`   | 0,212,255  | Tech, science |

**Per-volume accent colors:**
| Volume | Accent var      | Value (R,G,B) |
|--------|-----------------|-------|
| Vol.0  | `--vol0-accent` | 0,201,167 |
| Vol.1  | `--vol1-accent` | 255,160,122 |
| Vol.2  | `--vol2-accent` | 28,219,12 |
| Vol.3  | `--vol3-accent` | 45,143,255 |
| Vol.4  | `--vol4-accent` | 232,64,64 |
| Vol.5  | `--vol5-accent` | 232,160,32 |
| Vol.6  | `--vol6-accent` | 139,92,246 |
| Vol.7  | `--vol7-accent` | 0,229,255 |
| Vol.8  | `--vol8-accent` | 232,212,139 |

**Faction identity colors:**
| Faction       | Color var          | Value (R,G,B) | Notes |
|---------------|--------------------|-------------|-------|
| Lumeris       | `--lumeris-color`  | 232,160,32  | Gold |
| United Empire | `--ue-color`       | 192,57,43   | Imperial red |
| Vodyani       | `--vodyani-color`  | 255,107,26  | Predatory orange |
| Riftborn      | `--riftborn-color` | 0,229,255   | Cold cyan |
| Sophon        | `--sophon-color`   | 45,143,255  | Blue |
| Cravers       | `--cravers-color`  | 26,107,42   | Dark green |
| Hissho        | `--hissho-color`   | 232,64,64   | Red |
| Horatio       | `--horatio-color`  | 240,168,208 | Narcissist pink | 
| Unfallen      | `--unfallen-color` | 29,185,106  | Green |
| Umbral Choir  | `--umbral-color`   | 139,92,246  | Purple |
| Vaulters      | `--vaulters-color` | 0,201,167   | Teal |
| Nakalim       | `--nakalim-color`  | 232,212,139 | Pale sacred gold |

Faction deep-dives use the corresponding faction identity color as their base, and the badges defined in the shared CSS file.

### Per-page `:root` override (required in every file's `<style>`)

Minimal volumes (vol0–vol8):
```css
:root {
  --accent:     var(--volN-accent);
  --accent-dim: rgba(var(--volN-accent), 0.11);
}
```

Faction deep-dives (example — Lumeris):
```css
:root {
  --accent:             var(--lumeris-color);
  --accent-dim:         rgba(var(--accent), 0.11);
  --accent-bright:  245,200,66;
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
    <a href="../index.html" class="vol-card right linkToIndex">ES2</a>
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

## Faction Deep-Dive Format (additional conventions)

Faction files are more elaborate than the main volumes and introduce additional components:

- **`.faction-badge`** — identity label at the top of the page
- **`.trait-block`** — faction-specific trait/mechanic blocks (`.warn` modifiers when signalling a negative trait (for example: a weakness explanation))
- **`.trait-label`** — label inside trait blocks
- **`.source-row` / `.src-pill`** — source attribution inline with claims
- **`.timeline` / `.tl-row`** — turn-order playbook (T1, T5, T10, etc.)
- **`.ship-grid` / `.ship-card`** — ship hull comparison cards
- **`.takt-box` / `.takt-title`** — TAKT concept callout (Lumeris-specific but reusable)

COOKIE KEY for faction files: use a unique string like `'fac01'`, `'fac02'`, etc.

---

## Workflow for New Sessions

1. Claude reads `es2-guide.css` and `es2-guide.js` from project files to confirm the design system
2. Claude works on the file, outputs the result to `/mnt/user-data/outputs/`
3. User downloads the generated file and commit it into the git repository that is linked in the project Knowledge Base
