# ES2 Guide — Content Specification
*Content reference document for any Claude session continuing this project.*

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

## Workflow for New Sessions

1. User specify the file being worked on (faction guide, new volume, etc.)
2. User uploads source material (Reddit threads, video transcripts, wiki exports, etc.) that Claude cannot access directly.
3. User links source material that Claude can access directly in order to integrate or substitute what Claude can find on the internet on its own

---

## Content Standards

- **Audience:** Players past the tutorial, comfortable with basic FIDSI and combat, seeking depth
- **Tone:** Direct, technical, no hand-holding. Assume the reader has played 10+ hours
- **Claims must be sourced.** If a mechanic is uncertain or version-dependent, say so explicitly rather than stating it as fact
- **Quiz scenarios** must be concrete in-game situations with specific numbers (turn, Dust amount, approval %) — not abstract. All four options must be plausible; wrong answers should represent common mistakes

--- 

## Planned Enhancements

### Vol.1 & Vol.2 — Empire Diagnostic Routines (planned)

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
