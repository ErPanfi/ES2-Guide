// ES2 Guide — shared functions
// Per-page globals required before this script runs:
//   const VOLUME  — e.g. 'vol0', 'vol1' ... used as cookie namespace
//   const TOTAL   — number of topics in this volume
//   const doneTopics = new Set()
//   let qIdx = 0, answered = false
//   const quizzes = [...]
// Call initProgress() at the end of each page's inline script block.

// ─── Mobile drawer ────────────────────────────────────────────────────────────

function toggleDrawer() {
  const drawer   = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (!drawer) return;
  const opening = !drawer.classList.contains('open');
  drawer.classList.toggle('open', opening);
  backdrop.classList.toggle('open', opening);
  document.body.style.overflow = opening ? 'hidden' : '';
}

function closeDrawer() {
  const drawer   = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (!drawer) return;
  drawer.classList.remove('open');
  backdrop.classList.remove('open');
  document.body.style.overflow = '';
}

// Build the mobile bar + drawer from the existing sidebar nav,
// then inject both just before </body>. Call once at DOMContentLoaded.
function initMobileNav() {
  // Only active below 700px (CSS hides on desktop anyway, but skip work)
  // Collect vol-link nav buttons from sidebar
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  // ── Vol links for the bottom bar ──────────────────────────────────────────
  const volDivs = Array.from(sidebar.querySelectorAll('.vol-link'));
  // Determine prev/next by label text (← = prev)
  let prevHref = null, prevLabel = null, nextHref = null, nextLabel = null;
  volDivs.forEach(div => {
    const text = div.textContent.trim();
    const href = div.getAttribute('onclick')
      ? div.getAttribute('onclick').match(/'([^']+)'/)?.[1]
      : null;
    if (!href) return;
    if (text.startsWith('←')) { prevHref = href; prevLabel = text.replace('←','').trim(); }
    else                       { nextHref = href; nextLabel = text.replace('→','').trim(); }
  });

  // ── Bottom bar ────────────────────────────────────────────────────────────
  const bar = document.createElement('div');
  bar.className = 'mobile-bar';
  bar.id = 'mobile-bar';

  const prevBtn = document.createElement('div');
  prevBtn.className = 'mobile-bar-vol' + (prevHref ? '' : ' hidden');
  prevBtn.textContent = prevHref ? ('← ' + prevLabel) : '';
  if (prevHref) prevBtn.onclick = () => location.href = prevHref;

  const menuBtn = document.createElement('div');
  menuBtn.className = 'mobile-bar-menu';
  menuBtn.innerHTML = '☰';
  menuBtn.setAttribute('aria-label', 'Open navigation');
  menuBtn.onclick = toggleDrawer;

  const nextBtn = document.createElement('div');
  nextBtn.className = 'mobile-bar-vol' + (nextHref ? '' : ' hidden');
  nextBtn.textContent = nextHref ? (nextLabel + ' →') : '';
  if (nextHref) nextBtn.onclick = () => location.href = nextHref;

  bar.appendChild(prevBtn);
  bar.appendChild(menuBtn);
  bar.appendChild(nextBtn);

  // ── Backdrop ──────────────────────────────────────────────────────────────
  const backdrop = document.createElement('div');
  backdrop.className = 'drawer-backdrop';
  backdrop.id = 'drawer-backdrop';
  backdrop.onclick = closeDrawer;

  // ── Drawer ────────────────────────────────────────────────────────────────
  const drawer = document.createElement('div');
  drawer.className = 'mobile-drawer';
  drawer.id = 'mobile-drawer';

  const handle = document.createElement('div');
  handle.className = 'drawer-handle';
  drawer.appendChild(handle);

  // Clone sidebar nav content (section labels + nav items), skip vol-links and progress-mini
  Array.from(sidebar.children).forEach(child => {
    if (child.classList.contains('sidebar-logo'))    return;
    if (child.classList.contains('progress-mini'))   return;
    if (child.classList.contains('vol-link'))        return;
    // Clone nav items and section labels
    const clone = child.cloneNode(true);
    // Strip IDs from all cloned elements to avoid duplicates (nav-check spans etc.)
    clone.removeAttribute('id');
    clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
    // Make nav items close the drawer on tap
    if (clone.classList.contains('nav-item')) {
      clone.addEventListener('click', closeDrawer);
    }
    drawer.appendChild(clone);
  });

  document.body.appendChild(backdrop);
  document.body.appendChild(drawer);
  document.body.appendChild(bar);
}

// ─── Cookie helpers ───────────────────────────────────────────────────────────

function cookieKey() {
  return 'es2_' + VOLUME;
}

function saveCookie() {
  const value = Array.from(doneTopics).join(',');
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = cookieKey() + '=' + encodeURIComponent(value)
    + '; expires=' + expires + '; path=/; SameSite=Lax';
}

function loadCookie() {
  const prefix = cookieKey() + '=';
  const found = document.cookie.split(';').map(c => c.trim()).find(c => c.startsWith(prefix));
  if (!found) return [];
  const raw = decodeURIComponent(found.slice(prefix.length));
  return raw ? raw.split(',') : [];
}

// ─── UI helpers ───────────────────────────────────────────────────────────────

function updateProgress() {
  const pct = Math.round((doneTopics.size / TOTAL) * 100);
  document.getElementById('pct-mini').textContent = pct + '%';
  document.getElementById('bar-mini').style.width = pct + '%';
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

function toggle(id) {
  document.getElementById(id).classList.toggle('open');
}

// scrollByID: triggers smooth scroll only.
// Active state is managed exclusively by initScrollSpy — no manual class writes here.
function scrollByID(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── Scroll spy ───────────────────────────────────────────────────────────────

// Maps each observed section ID to its corresponding sidebar nav-item element.
// Both topic sections (t1, t2 … tN) and the quiz section are tracked.
// The Observer is the single source of truth for the `active` class.
//
// Logic: "last scrolled past" — a section becomes active when its top edge
// crosses above the viewport top (rootMargin pushes the trigger line to 0px
// from the top). On page load t1 is active by default. At page bottom the
// last nav-item is forced active via a scroll listener.

function initScrollSpy() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar){
	  console.error("Can't find sidebar. Won't init ScrollSpy.");
	 return;  
  }

  // Collect all nav-items that have an onclick targeting a section id.
  // We derive the target id from the onclick attribute: scrollByID('tN') or scrollByID('quiz').
  const navItems = Array.from(sidebar.querySelectorAll('.nav-item'));

  // Build a map: sectionId → navItem
  const idToNav = new Map();
  navItems.forEach(function(item) {
    const onclick = item.getAttribute('onclick') || '';
    const match = onclick.match(/scrollByID\(['"]([^'"]+)['"]\)/);
    if (match) {
      idToNav.set(match[1], item);
    }
  });

  if (idToNav.size === 0)
  {	
	console.warning("No items to watch. Won't init ScrollSpy.");
	return;
  }

  // Ordered list of section IDs as they appear in the DOM
  // (guaranteed by querySelectorAll document order).
  const sectionIds = Array.from(idToNav.keys());

  // Helper: set active on a nav-item, remove from all others.
  function setActive(targetId) {
    idToNav.forEach(function(navItem, id) {
      navItem.classList.toggle('active', id === targetId);
    });
  }

  // Default state: first section active on load.
  setActive(sectionIds[0]);

  // Track which sections have crossed above the top of the viewport.
  // A section is "past" when its top edge is above the viewport top.
  // We use a Set for O(1) membership tracking.
  const passedSections = new Set();

  // rootMargin: "-1px 0px 0px 0px" means the observer fires as soon as
  // the top edge of a section crosses the very top of the viewport.
  // threshold: 0 fires on any intersection change.
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      const id = entry.target.id;

      if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
        // Section has scrolled fully above the viewport top — mark as passed.
        passedSections.add(id);
      } else {
        // Section is visible or below the fold — not passed.
        passedSections.delete(id);
      }
    });

    // Active section = last section in DOM order that has been passed.
    // If nothing has been passed yet (top of page), default to first section.
    let activeId = sectionIds[0];
    for (let i = 0; i < sectionIds.length; i++) {
      if (passedSections.has(sectionIds[i])) {
        // The next section in sequence is now the active one.
        activeId = sectionIds[Math.min(i + 1, sectionIds.length - 1)];
      }
    }

    setActive(activeId);
  }, {
    root: null,          // viewport
    rootMargin: '-1px 0px 0px 0px',
    threshold: 0
  });

  // Observe every section that has a nav-item.
  sectionIds.forEach(function(id) {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  // ── Page-bottom guard ────────────────────────────────────────────────────
  // When the user has scrolled to the very bottom, force the last nav-item
  // active regardless of IntersectionObserver state (handles tall final
  // sections that never fully scroll past the top edge).
  const lastId = sectionIds[sectionIds.length - 1];

  window.addEventListener('scroll', function() {
    const scrollBottom = window.scrollY + window.innerHeight;
    const pageHeight   = document.documentElement.scrollHeight;
    // 4px tolerance for sub-pixel rounding across browsers.
    if (scrollBottom >= pageHeight - 4) {
      setActive(lastId);
    }
  }, { passive: true });

}

// ─── Core actions ─────────────────────────────────────────────────────────────

function markDone(topicId, blockId, btn) {
  if (doneTopics.has(topicId)) return;
  doneTopics.add(topicId);
  applyDoneUI(topicId);
  saveCookie();
  updateProgress();
  showToast('\u2713 Topic mastered \u2014 progress saved');
  if (doneTopics.size === TOTAL) {
    setTimeout(() => showToast('\uD83C\uDFC6 Volume complete. On to the next.'), 3200);
  }
}

// Apply the visual "done" state to a topic without triggering toasts or saves.
// Used both by markDone() and by the restore path in initProgress().
function applyDoneUI(topicId) {
  const topic = document.getElementById(topicId);
  if (topic) {
    const btn = topic.querySelector('.done-btn');
    if (btn) {
      btn.classList.add('marked');
      btn.textContent = '\u2713 DONE';
    }
  }
  const navCheck = document.getElementById('nc' + topicId.replace('t', ''));
  if (navCheck) {
    navCheck.textContent = '\u2713';
    navCheck.closest('.nav-item').classList.add('done-nav');
  }
}

// Restore saved progress from cookie, then initialise scroll spy.
function initProgress() {
  loadCookie().forEach(function(topicId) {
    if (topicId) {
      doneTopics.add(topicId);
      applyDoneUI(topicId);
    }
  });
  updateProgress();
  initScrollSpy();
}

// ─── Quiz ─────────────────────────────────────────────────────────────────────

function renderQuiz() {
  const q = quizzes[qIdx];
  document.getElementById('q-counter').textContent = (qIdx + 1) + ' / ' + quizzes.length;
  document.getElementById('quiz-container').innerHTML =
    '<div class="quiz-scenario">"' + q.scenario + '"</div>' +
    '<div class="quiz-q">' + q.q + '</div>' +
    '<div class="quiz-opts">' +
      q.opts.map(function(o, i) {
        return '<button class="quiz-opt" onclick="answer(' + i + ')">' +
          String.fromCharCode(65 + i) + '. ' + o + '</button>';
      }).join('') +
    '</div>' +
    '<div class="quiz-explain" id="qexp"></div>' +
    '<button class="btn-next-q" id="btn-nq" onclick="nextQ()">' +
      (qIdx < quizzes.length - 1 ? 'Next Question →' : 'Restart Quiz ↺') +
    '</button>';
}

function answer(i) {
  if (answered) return;
  answered = true;
  const q = quizzes[qIdx];
  const opts = document.querySelectorAll('.quiz-opt');
  opts.forEach(function(btn, idx) {
    btn.disabled = true;
    if (idx === q.correct) btn.classList.add('correct');
    else if (idx === i)    btn.classList.add('wrong');
  });
  document.getElementById('qexp').textContent = q.explain;
}

function nextQ() {
  qIdx = (qIdx + 1) % quizzes.length;
  answered = false;
  renderQuiz();
}
