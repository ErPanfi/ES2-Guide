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

function scrollByID(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  event.currentTarget.classList.add('active');
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

// Restore saved progress from cookie — call once after the DOM is ready.
function initProgress() {
  loadCookie().forEach(function(topicId) {
    if (topicId) {
      doneTopics.add(topicId);
      applyDoneUI(topicId);
    }
  });
  updateProgress();
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
      (qIdx < quizzes.length - 1 ? 'NEXT SCENARIO \u2192' : 'RESTART \u21BA') +
    '</button>';
  answered = false;
}

function answer(i) {
  if (answered) return;
  answered = true;
  const q = quizzes[qIdx];
  const opts = document.querySelectorAll('.quiz-opt');
  const isOk = i === q.correct;
  opts[i].classList.add(isOk ? 'correct' : 'wrong');
  if (!isOk) opts[q.correct].classList.add('correct');
  opts.forEach(function(o) { o.style.pointerEvents = 'none'; });
  const exp = document.getElementById('qexp');
  exp.textContent = q.explain;
  exp.className = 'quiz-explain show ' + (isOk ? 'ok' : 'bad');
  document.getElementById('btn-nq').classList.add('show');
  showToast(isOk ? '\u2713 Correct analysis' : '\u2717 Review the explanation above');
}

function nextQ() {
  qIdx = (qIdx + 1) % quizzes.length;
  renderQuiz();
}
