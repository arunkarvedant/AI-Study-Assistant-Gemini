/* ==========================================================================
   StudyDesk — AI Study Assistant (Cubby UI Edition)
   Opinionated, tactile, accessible components with offline fallbacks.
   ========================================================================== */

/* --------------------------- Crisp Lucide-style SVG Icons --------------------------- */
const ICONS = {
  home: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
  chat: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
  book: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path><path d="M6 6h10"></path><path d="M6 10h10"></path></svg>`,
  quiz: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" x2="12.01" y1="17" y2="17"></line></svg>`,
  layers: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`,
  clock: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
  calc: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"></rect><line x1="8" x2="16" y1="7" y2="7"></line><line x1="8" x2="8.01" y1="12" y2="12"></line><line x1="12" x2="12.01" y1="12" y2="12"></line><line x1="16" x2="16.01" y1="12" y2="12"></line><line x1="8" x2="8.01" y1="17" y2="17"></line><line x1="12" x2="12.01" y1="17" y2="17"></line><line x1="16" x2="16.01" y1="17" y2="17"></line></svg>`,
  flame: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`,
  check: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  copy: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>`,
  sparkles: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"></path></svg>`,
  target: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
  play: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`,
  pause: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`,
  reset: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>`,
  trash: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
  plus: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"></line><line x1="5" x2="19" y1="12" y2="12"></line></svg>`,
  arrowRight: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" x2="19" y1="12" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
  send: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" x2="11" y1="2" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`,
  search: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>`,
  close: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"></line><line x1="6" x2="18" y1="6" y2="18"></line></svg>`,
};

/* --------------------------------------- Backend / AI Status --------------------------------------- */
const API_BASE = "";
let aiStatus = { checked: false, available: false, model: null, modelConfirmed: false };

async function checkAiStatus() {
  try {
    const res = await fetch(`${API_BASE}/api/health`);
    const data = await res.json();
    aiStatus = {
      checked: true,
      available: Boolean(data.aiConfigured),
      model: data.model || 'gemini-3.5-flash-lite',
      modelConfirmed: Boolean(data.modelConfirmed)
    };
  } catch(e) {
    aiStatus = { checked: true, available: false, model: null, modelConfirmed: false };
  }
  renderHeaderStatusPill();
  if (activeTab === 'tutor' || activeTab === 'summarize' || activeTab === 'quiz') {
    renderAll();
  }
}

function renderHeaderStatusPill() {
  const pill = document.getElementById('ai-status-pill');
  if (!pill) return;
  if (!aiStatus.checked) {
    pill.innerHTML = `<span class="badge badge-neutral"><span class="status-dot"></span><span>Checking AI...</span></span>`;
  } else if (aiStatus.available) {
    pill.innerHTML = `<span class="badge badge-emerald" title="Gemini API Connected (${aiStatus.model || 'active'})"><span class="status-dot"></span><span>Gemini 3.5 AI</span></span>`;
  } else {
    pill.innerHTML = `<span class="badge badge-neutral" title="Running local browser algorithms"><span class="status-dot"></span><span>Offline Mode</span></span>`;
  }
}

/* --------------------------------------- Storage & State --------------------------------------- */
const STORE_KEY = "studydesk_v2";

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY) || localStorage.getItem("studydesk_v1");
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return Object.assign(defaultState(), parsed);
  } catch(e) {
    return defaultState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  } catch(e) {
    console.warn("Could not save:", e);
  }
}

function defaultState() {
  return {
    theme: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    decks: ["General", "Biology", "History"],
    activeDeck: "General",
    cards: [
      { id: 'c1', deck: 'General', front: 'What is photosynthesis?', back: 'The biological process by which green plants and certain organisms convert sunlight into chemical energy.', ease: 2.5, interval: 1, due: todayKey(), reps: 1 },
      { id: 'c2', deck: 'General', front: 'What does ATP stand for?', back: 'Adenosine Triphosphate — the primary energy currency of the cell.', ease: 2.5, interval: 0, due: todayKey(), reps: 0 },
      { id: 'c3', deck: 'General', front: 'What is Newton\'s First Law of Motion?', back: 'An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external net force.', ease: 2.5, interval: 0, due: todayKey(), reps: 0 }
    ],
    quizHistory: [],
    dailyMinutes: {},
    activityLog: [
      { date: new Date().toISOString(), text: "StudyDesk initialized with Cubby UI components." }
    ],
    lastActiveDate: null,
    streak: 1,
  };
}

let state = loadState();

/* --------------------------------------- Date Helpers --------------------------------------- */
function todayKey(d = new Date()) { return d.toISOString().slice(0, 10); }
function daysAgoKey(n) { const d = new Date(); d.setDate(d.getDate() - n); return todayKey(d); }
function fmtDate(dstr) { const d = new Date(dstr); return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }); }

function touchStreak() {
  const today = todayKey();
  if (state.lastActiveDate === today) return;
  const yesterday = daysAgoKey(1);
  if (state.lastActiveDate === yesterday) {
    state.streak += 1;
  } else if (state.lastActiveDate !== today) {
    state.streak = 1;
  }
  state.lastActiveDate = today;
  saveState();
}

function logActivity(text) {
  state.activityLog.unshift({ date: new Date().toISOString(), text });
  state.activityLog = state.activityLog.slice(0, 8);
  touchStreak();
  saveState();
}

function addMinutes(mins) {
  const k = todayKey();
  state.dailyMinutes[k] = (state.dailyMinutes[k] || 0) + mins;
  touchStreak();
  saveState();
}

/* --------------------------------------- Cubby UI Toast Notifications --------------------------------------- */
function toast(msg, iconSvg = ICONS.check) {
  const wrap = document.getElementById('toast-wrap');
  if (!wrap) return;
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `${iconSvg}<span>${msg}</span>`;
  wrap.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px) scale(0.96)';
    el.style.transition = 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)';
  }, 2400);
  setTimeout(() => el.remove(), 2700);
}

/* --------------------------------------- Cubby UI Copy Button --------------------------------------- */
async function copyToClipboard(text, btnElement) {
  try {
    await navigator.clipboard.writeText(text);
    const originalHtml = btnElement.innerHTML;
    btnElement.classList.add('copied');
    btnElement.innerHTML = `${ICONS.check}<span>Copied</span>`;
    setTimeout(() => {
      btnElement.classList.remove('copied');
      btnElement.innerHTML = originalHtml;
    }, 2000);
  } catch(e) {
    toast("Could not copy text");
  }
}

/* ==================================================================================================
   OFFLINE ALGORITHMS (Summarizer & Quiz Generator)
   ================================================================================================== */
const STOPWORDS = new Set(("a an the and or but if while is are was were be been being to of in on for " +
  "with as by at from this that these those it its it's into over under again further then once here there " +
  "all any both each few more most other some such no nor not only own same so than too very s t can will just " +
  "don should now i you he she we they them his her their our your my me him what which who whom not have has had " +
  "do does did doing about above below between out up down off during before after because also than through").split(" "));

function splitSentences(text) {
  return text.replace(/\s+/g, ' ').trim().split(/(?<=[.!?])\s+(?=[A-Z0-9])/).map(s => s.trim()).filter(Boolean);
}

function wordsOf(str) {
  return (str.toLowerCase().match(/[a-z][a-z'-]*/g) || []);
}

function wordFrequencies(sentences) {
  const freq = {};
  sentences.forEach(s => {
    wordsOf(s).forEach(w => {
      if (STOPWORDS.has(w) || w.length < 3) return;
      freq[w] = (freq[w] || 0) + 1;
    });
  });
  return freq;
}

function summarizeText(text, ratio) {
  const sentences = splitSentences(text);
  if (sentences.length === 0) return { summary: [], keyTerms: [], originalWords: 0, summaryWords: 0 };
  const freq = wordFrequencies(sentences);
  const maxFreq = Math.max(1, ...Object.values(freq));
  const scored = sentences.map((s, i) => {
    const words = wordsOf(s).filter(w => !STOPWORDS.has(w) && w.length >= 3);
    const score = words.length ? words.reduce((sum, w) => sum + (freq[w] || 0) / maxFreq, 0) / Math.sqrt(words.length) : 0;
    return { s, i, score };
  });
  const targetCount = Math.max(1, Math.round(sentences.length * ratio));
  const top = [...scored].sort((a, b) => b.score - a.score).slice(0, targetCount);
  const inOrder = top.sort((a, b) => a.i - b.i).map(x => x.s);
  const keyTerms = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([w, c]) => ({ word: w, count: c }));
  const originalWords = wordsOf(text).length;
  const summaryWords = wordsOf(inOrder.join(' ')).length;
  return { summary: inOrder, keyTerms, originalWords, summaryWords };
}

function generateQuizFromText(text, count) {
  const sentences = splitSentences(text).filter(s => wordsOf(s).length >= 6);
  const freq = wordFrequencies(sentences);
  const candidates = Object.entries(freq).filter(([w]) => w.length >= 4).sort((a, b) => b[1] - a[1]).map(([w]) => w);
  const pool = [...new Set(candidates)];
  const usedSentences = new Set();
  const questions = [];

  for (const sentence of sentences) {
    if (questions.length >= count) break;
    if (usedSentences.has(sentence)) continue;
    const swords = wordsOf(sentence);
    const target = swords.find(w => pool.includes(w) && w.length >= 4);
    if (!target) continue;

    const re = new RegExp(`\\b${target}\\b`, 'i');
    if (!re.test(sentence)) continue;

    const blanked = sentence.replace(re, '_______');
    const distractors = pool.filter(w => w.toLowerCase() !== target.toLowerCase());
    shuffle(distractors);
    const options = [target, ...distractors.slice(0, 3)];
    if (options.length < 4) continue;
    shuffle(options);

    questions.push({
      question: blanked,
      options,
      answer: target,
      explanation: `"${target}" completes the original statement from your notes: "${sentence}"`
    });
    usedSentences.add(sentence);
  }
  return questions;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function scheduleCard(card, quality) {
  let ease = card.ease + (0.1 - (3 - quality) * (0.08 + (3 - quality) * 0.02));
  if (ease < 1.3) ease = 1.3;
  let interval, reps;
  if (quality === 0) {
    reps = 0; interval = 0;
  } else {
    reps = card.reps + 1;
    if (reps === 1) interval = 1;
    else if (reps === 2) interval = 3;
    else interval = Math.round(card.interval * ease);
  }
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval);
  return { ...card, ease, interval, reps, due: todayKey(nextDate) };
}

function dueCardsForDeck(deck) {
  const today = todayKey();
  return state.cards.filter(c => c.deck === deck && c.due <= today);
}

/* ==================================================================================================
   NAVIGATION & TABS
   ================================================================================================== */
const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'home' },
  { id: 'tutor', label: 'Ask a Tutor', icon: 'chat', badge: 'AI' },
  { id: 'summarize', label: 'Summarize Notes', icon: 'book' },
  { id: 'quiz', label: 'Quiz Maker', icon: 'quiz' },
  { id: 'flashcards', label: 'Flashcards', icon: 'layers' },
  { id: 'focus', label: 'Focus Timer', icon: 'clock' },
  { id: 'math', label: 'Math Helper', icon: 'calc' },
];

let activeTab = 'dashboard';

function renderNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const today = todayKey();
  const dueCount = state.cards.filter(c => c.due <= today).length;

  nav.innerHTML = TABS.map(t => {
    let countBadge = '';
    if (t.id === 'flashcards' && dueCount > 0) {
      countBadge = `<span class="nav-count-badge">${dueCount} due</span>`;
    } else if (t.badge) {
      countBadge = `<span class="nav-count-badge" style="color:var(--accent);">${t.badge}</span>`;
    }
    return `
      <button class="nav-item-btn ${t.id === activeTab ? 'active' : ''}" data-tab="${t.id}">
        ${ICONS[t.icon]}
        <span>${t.label}</span>
        ${countBadge}
      </button>
    `;
  }).join('');

  nav.querySelectorAll('.nav-item-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeTab = btn.dataset.tab;
      closeMobileSidebar();
      renderAll();
    });
  });
}

function renderSidebarFooter() {
  const streakEl = document.getElementById('streak-num');
  if (streakEl) streakEl.textContent = state.streak;
  const themeLabel = document.getElementById('theme-label');
  if (themeLabel) themeLabel.textContent = state.theme === 'dark' ? 'Light mode' : 'Dark mode';
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) themeIcon.textContent = state.theme === 'dark' ? '☀️' : '🌙';
  const topbarBreadcrumb = document.getElementById('topbar-breadcrumb');
  if (topbarBreadcrumb) {
    const current = TABS.find(t => t.id === activeTab);
    topbarBreadcrumb.textContent = current ? current.label : 'StudyDesk';
  }
}

function renderAll() {
  renderNav();
  renderSidebarFooter();
  renderHeaderStatusPill();
  const page = document.getElementById('page');
  if (!page) return;

  if (activeTab === 'dashboard') page.innerHTML = viewDashboard();
  if (activeTab === 'tutor') page.innerHTML = viewTutor();
  if (activeTab === 'summarize') page.innerHTML = viewSummarize();
  if (activeTab === 'quiz') page.innerHTML = viewQuiz();
  if (activeTab === 'flashcards') page.innerHTML = viewFlashcards();
  if (activeTab === 'focus') page.innerHTML = viewFocus();
  if (activeTab === 'math') page.innerHTML = viewMath();
  attachHandlers();
}

/* ==================================================================================================
   VIEW: DASHBOARD
   ================================================================================================== */
function viewDashboard() {
  const today = todayKey();
  const todayMin = state.dailyMinutes[today] || 0;
  const dueCount = state.cards.filter(c => c.due <= today).length;
  const avgScore = state.quizHistory.length
    ? Math.round(state.quizHistory.reduce((a, q) => a + q.score / q.total, 0) / state.quizHistory.length * 100)
    : null;

  const days = [];
  for (let i = 6; i >= 0; i--) { days.push(daysAgoKey(i)); }
  const maxMin = Math.max(15, ...days.map(d => state.dailyMinutes[d] || 0));

  return `
    <div class="page-header">
      <div class="page-header-row">
        <div>
          <div class="page-eyebrow">Overview & Progress</div>
          <h1 class="page-title">Welcome back</h1>
          <p class="page-subtitle">Track your focus habits, review due spaced-repetition cards, or consult your AI study tutor.</p>
        </div>
        <div class="badge badge-indigo">
          ${ICONS.sparkles}
          <span>AI-Powered Suite</span>
        </div>
      </div>
    </div>

    <!-- Bento Stat Grid -->
    <div class="grid grid-4" style="margin-bottom: 22px;">
      <div class="card stat-card card-interactive">
        <div class="stat-icon-wrap stat-icon-amber">${ICONS.flame}</div>
        <div class="stat-value">${state.streak}</div>
        <div class="stat-label">Day Study Streak</div>
      </div>
      <div class="card stat-card card-interactive">
        <div class="stat-icon-wrap stat-icon-indigo">${ICONS.clock}</div>
        <div class="stat-value">${todayMin}<span style="font-size:16px;font-weight:500;color:var(--text-muted);margin-left:2px;">m</span></div>
        <div class="stat-label">Focused Time Today</div>
      </div>
      <div class="card stat-card card-interactive">
        <div class="stat-icon-wrap stat-icon-rose">${ICONS.layers}</div>
        <div class="stat-value">${dueCount}</div>
        <div class="stat-label">Flashcards Due</div>
      </div>
      <div class="card stat-card card-interactive">
        <div class="stat-icon-wrap stat-icon-emerald">${ICONS.target}</div>
        <div class="stat-value">${avgScore === null ? '—' : avgScore + '%'}</div>
        <div class="stat-label">Average Quiz Score</div>
      </div>
    </div>

    <!-- Quick Tools Launchpad -->
    <div class="card" style="margin-bottom: 22px;">
      <div class="card-header">
        <div>
          <h3 class="card-title">${ICONS.sparkles} Quick Actions</h3>
          <p class="card-desc">Jump straight into a task or study session.</p>
        </div>
      </div>
      <div class="chips-cloud">
        <button class="chip-btn" data-jump="tutor">${ICONS.chat} Ask AI Tutor a Question</button>
        <button class="chip-btn" data-jump="focus">${ICONS.play} Start 25m Focus Session</button>
        <button class="chip-btn" data-jump="flashcards">${ICONS.layers} Review ${dueCount} Due Cards</button>
        <button class="chip-btn" data-jump="quiz">${ICONS.quiz} Practice Quiz</button>
        <button class="chip-btn" data-jump="summarize">${ICONS.book} Summarize Notes</button>
      </div>
    </div>

    <div class="grid grid-2">
      <!-- Weekly Chart Card -->
      <div class="card">
        <div class="card-header">
          <div>
            <h3 class="card-title">${ICONS.clock} Weekly Focus Minutes</h3>
            <p class="card-desc">Time spent in completed focus sessions this week.</p>
          </div>
        </div>
        <div class="chart-container">
          ${days.map(d => {
            const m = state.dailyMinutes[d] || 0;
            const h = Math.max(6, Math.round((m / maxMin) * 100));
            return `
              <div class="chart-bar-column" title="${m} focused minutes on ${fmtDate(d)}">
                <div class="chart-bar-fill" style="height: ${h}%;"></div>
                <div class="chart-day-label">${fmtDate(d).split(' ')[0]}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Recent Activity Card -->
      <div class="card">
        <div class="card-header">
          <div>
            <h3 class="card-title">Recent Activity</h3>
            <p class="card-desc">Your logged sessions and study milestones.</p>
          </div>
        </div>
        ${state.activityLog.length ? `
          <div style="display:flex;flex-direction:column;gap:10px;">
            ${state.activityLog.map(a => `
              <div style="display:flex;align-items:flex-start;gap:10px;font-size:13.5px;color:var(--text-secondary);">
                <span style="color:var(--accent);margin-top:2px;">•</span>
                <span style="flex:1;">${escapeHtml(a.text)}</span>
              </div>
            `).join('')}
          </div>
        ` : `<div class="empty-state">No activity yet. Complete a study session or ask a question to see activity here.</div>`}
      </div>
    </div>
  `;
}

/* ================================================================= predator ==================================
   VIEW: ASK A TUTOR (AI Chat)
   ================================================================================================== */
let chatHistory = [];

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function formatMarkdown(text) {
  let esc = escapeHtml(text);
  // Code blocks
  esc = esc.replace(/```([a-z]*)\n([\s\S]*?)```/g, '<pre style="background:var(--bg-surface-raised);padding:12px;border-radius:8px;overflow-x:auto;font-family:var(--font-mono);font-size:13px;border:1px solid var(--border-subtle);margin:8px 0;"><code>$2</code></pre>');
  // Inline code
  esc = esc.replace(/`([^`]+)`/g, '<code style="background:var(--bg-surface-raised);padding:2px 6px;border-radius:4px;font-family:var(--font-mono);font-size:12.5px;border:1px solid var(--border-subtle);">$1</code>');
  // Bold
  esc = esc.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Bullet lists
  esc = esc.replace(/^[•*-]\s+(.+)$/gm, '<li style="margin-left:16px;">$1</li>');
  // Paragraphs
  return esc.replace(/\n\n/g, '<br><br>');
}

function viewTutor() {
  const suggestions = [
    "Explain photosynthesis simply with an analogy",
    "How does binary search work step by step?",
    "Derive the Pythagorean theorem",
    "Tips for memorizing dates in history"
  ];

  return `
    <div class="page-header">
      <div class="page-header-row">
        <div>
          <div class="page-eyebrow">Gemini 3.5 Assistant</div>
          <h1 class="page-title">Ask a Study Tutor</h1>
          <p class="page-subtitle">Ask questions, get step-by-step explanations, and deepen your conceptual grasp.</p>
        </div>
        <div style="display:flex;gap:8px;align-items:center;">
          <select class="select-input" id="subject-select" style="width: auto; padding: 7px 12px; font-size:13px;">
            <option>General Studies</option>
            <option>Mathematics</option>
            <option>Science & Physics</option>
            <option>Computer Science</option>
            <option>History & Humanities</option>
            <option>Literature & Writing</option>
          </select>
          <button class="btn btn-secondary btn-sm" id="clear-chat-btn">Clear</button>
        </div>
      </div>
    </div>

    <div class="chat-container">
      <div class="prompt-suggestions">
        <span style="font-size:12px;font-weight:600;color:var(--text-muted);">Try asking:</span>
        ${suggestions.map(s => `<button class="prompt-chip" data-prompt="${escapeAttr(s)}">${s}</button>`).join('')}
      </div>

      <div class="chat-log" id="chat-log">
        ${chatHistory.length === 0 ? `
          <div class="message-bubble message-assistant">
            <div class="msg-avatar msg-avatar-tutor">${ICONS.sparkles}</div>
            <div class="msg-body">
              <div class="msg-content">
                Hello! I'm your AI study assistant powered by Google Gemini. Pick a subject or click one of the suggested prompts above to get started!
              </div>
            </div>
          </div>
        ` : chatHistory.map((m, idx) => `
          <div class="message-bubble ${m.role === 'user' ? 'message-user' : 'message-assistant'}">
            <div class="msg-avatar ${m.role === 'user' ? 'msg-avatar-user' : 'msg-avatar-tutor'}">
              ${m.role === 'user' ? 'You' : ICONS.sparkles}
            </div>
            <div class="msg-body">
              <div class="msg-content">${formatMarkdown(m.content)}</div>
              ${m.role === 'assistant' ? `
                <div class="msg-actions">
                  <button class="copy-btn copy-msg-btn" data-content="${escapeAttr(m.content)}">${ICONS.copy}<span>Copy</span></button>
                </div>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>

      <form class="chat-composer" id="chat-form">
        <textarea class="chat-textarea" id="chat-input" placeholder="Ask a question or explain a concept... (Press Enter to send)" rows="2"></textarea>
        <div class="composer-toolbar">
          <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text-muted);">
            <span>Press <kbd>↵</kbd> to send, <kbd>Shift+↵</kbd> for new line</span>
          </div>
          <button type="submit" class="btn btn-primary btn-sm" id="chat-send-btn">
            ${ICONS.send}
            <span>Send</span>
          </button>
        </div>
      </form>
    </div>
  `;
}

async function sendChatMessage(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  if (!message) return;

  const subject = document.getElementById('subject-select').value;
  chatHistory.push({ role: 'user', content: message });
  input.value = '';
  renderChatLogOnly(true);

  try {
    const res = await fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, subject, history: chatHistory.slice(0, -1) }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    chatHistory.push({ role: 'assistant', content: data.reply });
    logActivity(`Asked AI tutor about ${subject}: "${message.slice(0, 30)}..."`);
    checkAiStatus();
  } catch(err) {
    chatHistory.push({ role: 'assistant', content: `Unable to connect to tutor: ${err.message}. If running locally, check your GEMINI_API_KEY.` });
  }
  renderChatLogOnly(false);
}

function renderChatLogOnly(thinking) {
  const log = document.getElementById('chat-log');
  if (!log) return;
  log.innerHTML = chatHistory.map(m => `
    <div class="message-bubble ${m.role === 'user' ? 'message-user' : 'message-assistant'}">
      <div class="msg-avatar ${m.role === 'user' ? 'msg-avatar-user' : 'msg-avatar-tutor'}">
        ${m.role === 'user' ? 'You' : ICONS.sparkles}
      </div>
      <div class="msg-body">
        <div class="msg-content">${formatMarkdown(m.content)}</div>
        ${m.role === 'assistant' ? `
          <div class="msg-actions">
            <button class="copy-btn copy-msg-btn" data-content="${escapeAttr(m.content)}">${ICONS.copy}<span>Copy</span></button>
          </div>
        ` : ''}
      </div>
    </div>
  `).join('') + (thinking ? `
    <div class="message-bubble message-assistant">
      <div class="msg-avatar msg-avatar-tutor">${ICONS.sparkles}</div>
      <div class="msg-body">
        <div class="msg-content" style="color:var(--text-muted);font-style:italic;">
          Thinking with Gemini 3.5...
        </div>
      </div>
    </div>
  ` : '');

  log.querySelectorAll('.copy-msg-btn').forEach(btn => {
    btn.addEventListener('click', () => copyToClipboard(btn.dataset.content, btn));
  });
  log.scrollTop = log.scrollHeight;
}

/* ==================================================================================================
   VIEW: SUMMARIZE NOTES
   ================================================================================================== */
let lastSummaryResult = null;

function viewSummarize() {
  return `
    <div class="page-header">
      <div class="page-header-row">
        <div>
          <div class="page-eyebrow">Tool 01 · Note Distillation</div>
          <h1 class="page-title">Summarize Notes</h1>
          <p class="page-subtitle">Condense lectures, textbook passages, or articles into structured key points and term lists.</p>
        </div>
      </div>
    </div>

    <div class="card" style="max-width: 820px;">
      <div class="form-field">
        <label class="field-label">
          <span>Your Notes or Source Text</span>
          <span class="field-hint">Paste raw text or lecture transcripts</span>
        </label>
        <textarea class="textarea-input" id="notes-input" rows="8" placeholder="Paste notes here..."></textarea>
      </div>

      <div class="form-field" style="margin-bottom: 20px;">
        <label class="field-label">
          <span>Summary Detail Ratio</span>
          <span class="field-hint" id="ratio-readout">35% Length</span>
        </label>
        <input type="range" class="range-slider" id="ratio-slider" min="15" max="55" value="35" />
      </div>

      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
        <button class="btn btn-primary" id="summarize-btn">
          ${ICONS.sparkles}
          <span>Summarize Notes</span>
        </button>
        <span style="font-size:12.5px;color:var(--text-muted);">Uses Gemini when online; local text ranker when offline.</span>
      </div>
    </div>

    <div id="summary-output" style="max-width: 820px; margin-top: 20px;"></div>
  `;
}

async function runSummarize() {
  const text = document.getElementById('notes-input').value.trim();
  const ratio = Number(document.getElementById('ratio-slider').value) / 100;
  const output = document.getElementById('summary-output');
  const btn = document.getElementById('summarize-btn');

  if (!text) {
    output.innerHTML = `<div class="empty-state">Please paste some notes or study material above to generate a summary.</div>`;
    return;
  }

  btn.disabled = true;
  btn.innerHTML = `${ICONS.sparkles}<span>Distilling...</span>`;

  if (aiStatus.available) {
    output.innerHTML = `<div class="empty-state">Synthesizing comprehensive notes with Gemini 3.5...</div>`;
    try {
      const res = await fetch(`${API_BASE}/api/summarize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');

      output.innerHTML = `
        <div class="card">
          <div class="card-header">
            <div>
              <h3 class="card-title">${ICONS.sparkles} AI Summary</h3>
              <p class="card-desc">Generated with Gemini 3.5 via your backend.</p>
            </div>
            <button class="copy-btn" id="copy-summary-btn">${ICONS.copy}<span>Copy Summary</span></button>
          </div>
          <div style="font-size:14.5px;line-height:1.7;color:var(--text-primary);white-space:pre-wrap;">${escapeHtml(data.summary)}</div>
        </div>
      `;
      document.getElementById('copy-summary-btn').addEventListener('click', function() {
        copyToClipboard(data.summary, this);
      });
      logActivity('Generated an AI summary of study notes.');
      toast('Summary successfully created!');
    } catch(err) {
      runSummarizeLocal(text, ratio, output);
    } finally {
      btn.disabled = false;
      btn.innerHTML = `${ICONS.sparkles}<span>Summarize Notes</span>`;
    }
    return;
  }

  runSummarizeLocal(text, ratio, output);
  btn.disabled = false;
  btn.innerHTML = `${ICONS.sparkles}<span>Summarize Notes</span>`;
}

function runSummarizeLocal(text, ratio, output) {
  const result = summarizeText(text, ratio);
  lastSummaryResult = result;

  if (result.summary.length === 0) {
    output.innerHTML = `<div class="empty-state">Could not find enough sentence structure to summarize. Please paste a longer text.</div>`;
    return;
  }

  const reduction = result.originalWords ? Math.round((1 - result.summaryWords / result.originalWords) * 100) : 0;

  output.innerHTML = `
    <div class="summary-results-grid">
      <div class="word-count-meter">
        <div><div class="stat-value" style="font-size:22px;">${result.originalWords}</div><div class="stat-label">Original words</div></div>
        <div><div class="stat-value" style="font-size:22px;">${result.summaryWords}</div><div class="stat-label">Summary words</div></div>
        <div><div class="stat-value" style="font-size:22px;color:var(--emerald-text);">-${reduction}%</div><div class="stat-label">Reduction</div></div>
        <div style="margin-left:auto;">
          <button class="btn btn-secondary btn-sm" id="convert-to-cards-btn">
            ${ICONS.plus}
            <span>Save Key Terms as Flashcards</span>
          </button>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Key Identified Terms</h3>
        </div>
        <div class="chips-cloud">
          ${result.keyTerms.map(t => `<span class="badge badge-indigo">${t.word} (${t.count})</span>`).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Condensed Summary</h3>
          <button class="copy-btn" id="copy-summary-btn">${ICONS.copy}<span>Copy</span></button>
        </div>
        <ul style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:10px;font-size:14.5px;color:var(--text-primary);line-height:1.65;">
          ${result.summary.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;

  document.getElementById('copy-summary-btn').addEventListener('click', function() {
    copyToClipboard(result.summary.join('\n\n'), this);
  });

  const convertBtn = document.getElementById('convert-to-cards-btn');
  if (convertBtn) {
    convertBtn.addEventListener('click', () => {
      let added = 0;
      result.keyTerms.forEach(t => {
        const front = `What is "${t.word}"?`;
        const matchingSentence = result.summary.find(s => s.toLowerCase().includes(t.word)) || `Mentioned ${t.count} times in notes.`;
        state.cards.push({
          id: 'c' + Date.now() + Math.random().toString(16).slice(2),
          deck: state.activeDeck,
          front: t.word.toUpperCase(),
          back: matchingSentence,
          ease: 2.5, interval: 0, reps: 0, due: todayKey()
        });
        added++;
      });
      saveState();
      toast(`Created ${added} flashcards in "${state.activeDeck}"!`);
      logActivity(`Created ${added} flashcards from notes summary.`);
    });
  }

  logActivity(`Summarized ${result.originalWords} words down to ${result.summaryWords} words.`);
  toast('Summary ready.');
}

/* ==================================================================================================
   VIEW: QUIZ MAKER
   ================================================================================================== */
let currentQuiz = [];
let quizScore = { correct: 0, answered: 0 };

function viewQuiz() {
  const sampleTopics = ["Cell Biology & Organelles", "World War II Pivotal Battles", "Newtonian Physics", "Calculus Derivatives"];

  return `
    <div class="page-header">
      <div class="page-header-row">
        <div>
          <div class="page-eyebrow">Tool 02 · Active Recall</div>
          <h1 class="page-title">Practice Quiz Maker</h1>
          <p class="page-subtitle">Generate custom multiple-choice quizzes on any topic or from your pasted notes.</p>
        </div>
      </div>
    </div>

    <div class="card" style="max-width: 820px; margin-bottom: 22px;">
      <div class="form-field">
        <label class="field-label">
          <span>Topic or Study Material</span>
          <span class="field-hint">Enter a subject, concept, or raw notes</span>
        </label>
        <textarea class="textarea-input" id="quiz-source" rows="4" placeholder="e.g., The Krebs cycle, French Revolution, Quantum mechanics..."></textarea>
      </div>

      <div class="prompt-suggestions" style="margin-bottom: 16px;">
        <span style="font-size:12px;font-weight:600;color:var(--text-muted);">Quick Topics:</span>
        ${sampleTopics.map(t => `<button class="prompt-chip sample-topic-chip" data-topic="${escapeAttr(t)}">${t}</button>`).join('')}
      </div>

      <div class="form-row">
        <div class="form-field">
          <label class="field-label">Question Count</label>
          <select class="select-input" id="quiz-count">
            <option value="3">3 Questions (Quick check)</option>
            <option value="5" selected>5 Questions (Standard)</option>
            <option value="8">8 Questions (Comprehensive)</option>
          </select>
        </div>
        <button class="btn btn-primary" id="quiz-generate-btn">
          ${ICONS.sparkles}
          <span>Generate Quiz</span>
        </button>
      </div>
    </div>

    <div id="quiz-output" style="max-width: 820px;"></div>
  `;
}

async function runGenerateQuiz() {
  const text = document.getElementById('quiz-source').value.trim();
  const count = Number(document.getElementById('quiz-count').value);
  const output = document.getElementById('quiz-output');
  const btn = document.getElementById('quiz-generate-btn');

  if (!text) {
    output.innerHTML = `<div class="empty-state">Please enter a topic or paste notes above to generate a quiz.</div>`;
    return;
  }

  btn.disabled = true;
  btn.innerHTML = `${ICONS.sparkles}<span>Writing Questions...</span>`;
  output.innerHTML = `<div class="empty-state">Crafting practice quiz with Gemini 3.5...</div>`;

  if (aiStatus.available) {
    try {
      const res = await fetch(`${API_BASE}/api/quiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: text, count }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');
      currentQuiz = data.questions || [];
      quizScore = { correct: 0, answered: 0 };
      renderQuizOutput(true);
      logActivity(`Generated AI quiz on "${text.slice(0, 30)}..."`);
    } catch(err) {
      runGenerateQuizLocal(text, count, output);
    } finally {
      btn.disabled = false;
      btn.innerHTML = `${ICONS.sparkles}<span>Generate Quiz</span>`;
    }
    return;
  }

  runGenerateQuizLocal(text, count, output);
  btn.disabled = false;
  btn.innerHTML = `${ICONS.sparkles}<span>Generate Quiz</span>`;
}

function runGenerateQuizLocal(text, count, output) {
  currentQuiz = generateQuizFromText(text, count);
  quizScore = { correct: 0, answered: 0 };
  if (currentQuiz.length === 0) {
    output.innerHTML = `<div class="empty-state">Offline mode requires a longer passage with multiple complete sentences to build fill-in-the-blank questions. Try pasting a full study paragraph.</div>`;
    return;
  }
  renderQuizOutput(false);
}

function renderQuizOutput(fromAi) {
  const output = document.getElementById('quiz-output');
  const pct = currentQuiz.length ? Math.round((quizScore.answered / currentQuiz.length) * 100) : 0;

  output.innerHTML = `
    <div class="card" style="margin-bottom: 18px;">
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:13.5px;color:var(--text-secondary);margin-bottom:8px;">
        <span style="font-weight:600;">Question Progress: ${quizScore.answered} / ${currentQuiz.length}</span>
        <span class="badge ${quizScore.correct > 0 ? 'badge-emerald' : 'badge-neutral'}">Score: ${quizScore.correct} Correct</span>
      </div>
      <div style="height:6px;background:var(--bg-surface-raised);border-radius:var(--radius-full);overflow:hidden;border:1px solid var(--border-subtle);">
        <div style="height:100%;width:${pct}%;background:var(--accent);transition:width 0.3s ease;"></div>
      </div>
    </div>

    ${currentQuiz.map((q, qi) => `
      <div class="quiz-item-card">
        <div class="quiz-question-title">${qi + 1}. ${escapeHtml(q.question)}</div>
        <div class="quiz-options-group">
          ${q.options.map((opt, oi) => `
            <button class="quiz-option-btn" data-qi="${qi}" data-opt="${escapeAttr(opt)}">
              <span class="quiz-option-letter">${String.fromCharCode(65 + oi)}</span>
              <span>${escapeHtml(opt)}</span>
            </button>
          `).join('')}
        </div>
        <div class="quiz-explanation-box" id="explain-${qi}">
          <strong>Explanation:</strong> ${escapeHtml(q.explanation || '')}
        </div>
      </div>
    `).join('')}
  `;

  output.querySelectorAll('.quiz-option-btn').forEach(btn => {
    btn.addEventListener('click', () => answerQuizQuestion(btn));
  });
}

function escapeAttr(s) {
  return String(s).replace(/"/g, '&quot;');
}

function answerQuizQuestion(btn) {
  const qi = Number(btn.dataset.qi);
  const group = btn.parentElement;
  if (group.dataset.locked) return;
  group.dataset.locked = "1";

  const chosen = btn.dataset.opt;
  const correct = currentQuiz[qi].answer;
  const isCorrect = chosen === correct;

  group.querySelectorAll('.quiz-option-btn').forEach(b => {
    b.disabled = true;
    if (b.dataset.opt === correct) b.classList.add('correct');
    else if (b === btn) b.classList.add('incorrect');
  });

  const expEl = document.getElementById(`explain-${qi}`);
  if (expEl) expEl.classList.add('show');

  quizScore.answered += 1;
  if (isCorrect) quizScore.correct += 1;

  if (quizScore.answered === currentQuiz.length) {
    state.quizHistory.push({
      date: new Date().toISOString(),
      score: quizScore.correct,
      total: currentQuiz.length
    });
    state.quizHistory = state.quizHistory.slice(-30);
    logActivity(`Completed quiz: scored ${quizScore.correct}/${currentQuiz.length}.`);
    toast(`Quiz Complete! Scored ${quizScore.correct}/${currentQuiz.length}.`);
  }
}

/* ==================================================================================================
   VIEW: FLASHCARDS
   ================================================================================================== */
let studySession = null;

function viewFlashcards() {
  const deck = state.activeDeck;
  const deckCards = state.cards.filter(c => c.deck === deck);
  const due = dueCardsForDeck(deck);

  return `
    <div class="page-header">
      <div class="page-header-row">
        <div>
          <div class="page-eyebrow">Tool 03 · Spaced Repetition</div>
          <h1 class="page-title">Flashcard Decks</h1>
          <p class="page-subtitle">Master key facts with SM-2 spaced repetition algorithms. Difficult cards are reviewed sooner; mastered ones expand their review window.</p>
        </div>
      </div>
    </div>

    <!-- Deck Rail -->
    <div class="deck-pill-rail">
      ${state.decks.map(d => `
        <button class="btn ${d === deck ? 'btn-primary' : 'btn-secondary'} btn-sm deck-select-btn" data-deck="${escapeAttr(d)}">
          ${d} (${state.cards.filter(c => c.deck === d).length})
        </button>
      `).join('')}
      <button class="btn btn-outline btn-sm" id="new-deck-btn">
        ${ICONS.plus}
        <span>New Deck</span>
      </button>
    </div>

    <div class="grid grid-2" style="margin-bottom: 24px;">
      <!-- Add Card -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Add Card to "${deck}"</h3>
        </div>
        <div class="form-field">
          <label class="field-label">Front (Question or Term)</label>
          <input type="text" class="input-text" id="card-front" placeholder="e.g. Mitochondria" />
        </div>
        <div class="form-field">
          <label class="field-label">Back (Answer or Definition)</label>
          <input type="text" class="input-text" id="card-back" placeholder="e.g. Organelle producing ATP energy" />
        </div>
        <button class="btn btn-primary btn-sm" id="add-card-btn">
          ${ICONS.plus}
          <span>Add Card</span>
        </button>
      </div>

      <!-- Study Session Action Card -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Review Session</h3>
          <span class="badge ${due.length ? 'badge-rose' : 'badge-emerald'}">
            ${due.length ? `${due.length} Due Today` : 'Caught Up'}
          </span>
        </div>
        <p style="font-size:14px;color:var(--text-muted);margin:0 0 16px 0;">
          ${due.length ? `You have ${due.length} flashcard${due.length > 1 ? 's' : ''} scheduled for review today.` : `All caught up in "${deck}"! Add cards or study other decks.`}
        </p>
        ${due.length ? `
          <button class="btn btn-primary" id="start-study-btn">
            ${ICONS.play}
            <span>Start Review Session</span>
          </button>
        ` : ''}
      </div>
    </div>

    <!-- Active Study Stage (if active) -->
    <div id="study-stage"></div>

    <!-- Cards Table -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Deck Library (${deckCards.length} cards)</h3>
      </div>
      ${deckCards.length ? `
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Front Term</th>
                <th>Back Definition</th>
                <th>Next Review</th>
                <th style="width:50px;"></th>
              </tr>
            </thead>
            <tbody>
              ${deckCards.map(c => `
                <tr>
                  <td style="font-weight:600;">${escapeHtml(c.front)}</td>
                  <td>${escapeHtml(c.back)}</td>
                  <td>
                    <span class="badge ${c.due <= todayKey() ? 'badge-rose' : 'badge-neutral'}">
                      ${c.due <= todayKey() ? 'Due Now' : fmtDate(c.due)}
                    </span>
                  </td>
                  <td>
                    <button class="btn-icon btn-sm btn-ghost delete-card-btn" data-id="${c.id}" title="Delete card">
                      ${ICONS.trash}
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : `<div class="empty-state">No cards in this deck yet. Add one above!</div>`}
    </div>
  `;
}

function startStudySession() {
  const due = dueCardsForDeck(state.activeDeck);
  studySession = { queue: shuffle([...due]), index: 0, showBack: false };
  renderStudyStage();
}

function renderStudyStage() {
  const stage = document.getElementById('study-stage');
  if (!stage) return;
  if (!studySession || studySession.index >= studySession.queue.length) {
    if (studySession) toast("Review session completed! Great work.");
    studySession = null;
    stage.innerHTML = '';
    renderAll();
    return;
  }

  const card = studySession.queue[studySession.index];

  stage.innerHTML = `
    <div class="card" style="margin-bottom: 24px; padding: 28px;">
      <div style="display:flex;justify-content:space-between;font-size:13px;color:var(--text-muted);margin-bottom:16px;">
        <span>Card ${studySession.index + 1} of ${studySession.queue.length}</span>
        <span>Click card or press <kbd>Space</kbd> to flip</span>
      </div>

      <div class="flip-stage-container">
        <div class="flip-card-element ${studySession.showBack ? 'flipped' : ''}" id="active-flip-card">
          <div class="flip-face front">
            <div>${escapeHtml(card.front)}</div>
            <span class="flip-hint-badge">Click to reveal answer</span>
          </div>
          <div class="flip-face back">
            <div>${escapeHtml(card.back)}</div>
            <span class="flip-hint-badge">Rate difficulty below</span>
          </div>
        </div>
      </div>

      ${studySession.showBack ? `
        <div class="rate-buttons-row">
          <button class="rate-btn rate-again" data-q="0">Again <kbd>1</kbd></button>
          <button class="rate-btn rate-hard" data-q="1">Hard <kbd>2</kbd></button>
          <button class="rate-btn rate-good" data-q="2">Good <kbd>3</kbd></button>
          <button class="rate-btn rate-easy" data-q="3">Easy <kbd>4</kbd></button>
        </div>
      ` : ''}
    </div>
  `;

  document.getElementById('active-flip-card').addEventListener('click', () => {
    studySession.showBack = !studySession.showBack;
    renderStudyStage();
  });

  stage.querySelectorAll('.rate-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const q = Number(btn.dataset.q);
      const idx = state.cards.findIndex(c => c.id === card.id);
      if (idx !== -1) {
        state.cards[idx] = scheduleCard(state.cards[idx], q);
        saveState();
      }
      studySession.index += 1;
      studySession.showBack = false;
      renderStudyStage();
    });
  });
}

/* ==================================================================================================
   VIEW: FOCUS TIMER (Circular Slider inspired)
   ================================================================================================== */
let timer = {
  running: false,
  mode: 'work',
  remaining: 25 * 60,
  workLen: 25,
  breakLen: 5,
  longBreakLen: 15,
  intervalId: null,
  sessionsDone: 0
};

function viewFocus() {
  const total = (timer.mode === 'work' ? timer.workLen : timer.breakLen) * 60;
  const pct = 1 - (timer.remaining / total);
  const r = 96;
  const circ = 2 * Math.PI * r;
  const dashoffset = circ - (circ * pct);

  return `
    <div class="page-header">
      <div class="page-header-row">
        <div>
          <div class="page-eyebrow">Tool 04 · Productivity</div>
          <h1 class="page-title">Focus Timer</h1>
          <p class="page-subtitle">Pomodoro intervals to sustain deep work. Completed work blocks automatically log to your weekly dashboard chart.</p>
        </div>
      </div>
    </div>

    <div class="grid grid-2">
      <!-- Gauge Card -->
      <div class="card timer-hero-container">
        <div class="btn-group" id="timer-presets-group">
          <button class="btn-group-item ${timer.mode === 'work' && timer.workLen === 25 ? 'active' : ''}" data-set="25-5">Pomodoro (25m)</button>
          <button class="btn-group-item ${timer.mode === 'work' && timer.workLen === 50 ? 'active' : ''}" data-set="50-10">Deep Work (50m)</button>
          <button class="btn-group-item ${timer.mode === 'break' ? 'active' : ''}" data-set="break">Short Break (5m)</button>
        </div>

        <div class="timer-circular-wrap">
          <svg width="240" height="240">
            <circle class="timer-track-circle" cx="120" cy="120" r="${r}" stroke-width="10" fill="none" />
            <circle class="timer-progress-circle" cx="120" cy="120" r="${r}" stroke-width="10" fill="none"
              stroke-dasharray="${circ}" stroke-dashoffset="${dashoffset}" stroke-linecap="round" />
          </svg>
          <div class="timer-inner-content">
            <div class="timer-digits">${formatTime(timer.remaining)}</div>
            <div class="timer-current-mode">${timer.mode === 'work' ? 'Deep Focus' : 'Rest Break'}</div>
          </div>
        </div>

        <div style="display:flex;gap:12px;align-items:center;">
          <button class="btn btn-primary btn-lg" id="timer-toggle-btn">
            ${timer.running ? ICONS.pause : ICONS.play}
            <span>${timer.running ? 'Pause' : 'Start Focus'}</span>
          </button>
          <button class="btn btn-secondary btn-icon" id="timer-reset-btn" title="Reset Session">
            ${ICONS.reset}
          </button>
        </div>

        <div style="font-size:13px;color:var(--text-muted);">
          Completed blocks today: <strong style="color:var(--text-primary);font-family:var(--font-mono);">${timer.sessionsDone}</strong>
        </div>
      </div>

      <!-- Settings & Stats Card -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Interval Durations</h3>
          <p class="card-desc">Customize session minutes to match your workflow.</p>
        </div>

        <div class="form-field">
          <label class="field-label">Focus Duration (Minutes)</label>
          <input type="number" class="input-text" id="work-len-input" min="5" max="90" value="${timer.workLen}" ${timer.running ? 'disabled' : ''} />
        </div>

        <div class="form-field">
          <label class="field-label">Break Duration (Minutes)</label>
          <input type="number" class="input-text" id="break-len-input" min="1" max="30" value="${timer.breakLen}" ${timer.running ? 'disabled' : ''} />
        </div>

        <button class="btn btn-secondary btn-sm" id="apply-timer-settings" ${timer.running ? 'disabled' : ''}>
          Apply Durations
        </button>
      </div>
    </div>
  `;
}

function formatTime(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function tickTimer() {
  timer.remaining -= 1;
  if (timer.remaining <= 0) {
    if (timer.mode === 'work') {
      addMinutes(timer.workLen);
      timer.sessionsDone += 1;
      logActivity(`Completed ${timer.workLen}-minute deep focus block.`);
      toast("Focus session complete! Time to take a restful break.");
      timer.mode = 'break';
      timer.remaining = timer.breakLen * 60;
    } else {
      toast("Break over! Ready to focus again?");
      timer.mode = 'work';
      timer.remaining = timer.workLen * 60;
    }
  }
  if (activeTab === 'focus') updateFocusGauge();
}

function updateFocusGauge() {
  const digitsEl = document.querySelector('.timer-digits');
  const circle = document.querySelector('.timer-progress-circle');
  if (!digitsEl || !circle) return;

  digitsEl.textContent = formatTime(timer.remaining);
  const total = (timer.mode === 'work' ? timer.workLen : timer.breakLen) * 60;
  const pct = 1 - (timer.remaining / total);
  const r = 96;
  const circ = 2 * Math.PI * r;
  circle.setAttribute('stroke-dasharray', circ);
  circle.setAttribute('stroke-dashoffset', circ - (circ * pct));
}

function toggleTimer() {
  timer.running = !timer.running;
  if (timer.running) {
    timer.intervalId = setInterval(tickTimer, 1000);
  } else {
    clearInterval(timer.intervalId);
  }
  renderAll();
}

function resetTimer() {
  timer.running = false;
  clearInterval(timer.intervalId);
  timer.mode = 'work';
  timer.remaining = timer.workLen * 60;
  renderAll();
}

/* ==================================================================================================
   VIEW: MATH HELPER
   ================================================================================================== */
function viewMath() {
  const examples = [
    "2x + 5 = 17",
    "sqrt(144) + 3^2",
    "5x - 3 = 2x + 12",
    "(8 + 2) * 3 / 5",
    "log(100, 10) + sin(pi / 2)"
  ];

  return `
    <div class="page-header">
      <div class="page-header-row">
        <div>
          <div class="page-eyebrow">Tool 05 · Computation</div>
          <h1 class="page-title">Math & Equation Solver</h1>
          <p class="page-subtitle">Solve linear algebraic equations or evaluate complex arithmetic right in your browser.</p>
        </div>
      </div>
    </div>

    <div class="card" style="max-width: 680px; margin-bottom: 20px;">
      <div class="form-field">
        <label class="field-label">
          <span>Expression or Equation</span>
          <span class="field-hint">e.g. 2x + 5 = 17 or 3*(4+5)^2</span>
        </label>
        <div style="display:flex;gap:10px;">
          <input type="text" class="input-text" id="math-input" placeholder="Type an equation or expression..." />
          <button class="btn btn-primary" id="math-solve-btn">Solve</button>
        </div>
      </div>

      <div id="math-output"></div>
    </div>

    <div class="card" style="max-width: 680px;">
      <div class="card-header">
        <h3 class="card-title">Quick Try Formula Chips</h3>
      </div>
      <div class="chips-cloud">
        ${examples.map(ex => `<button class="chip-btn math-chip" data-ex="${escapeAttr(ex)}">${ex}</button>`).join('')}
      </div>
    </div>
  `;
}

function solveLinear(input) {
  const [lhs, rhs] = input.split('=');
  if (rhs === undefined) return null;

  function parseSide(side) {
    let expr = side.replace(/\s+/g, '').replace(/-/g, '+-');
    const terms = expr.split('+').filter(Boolean);
    let a = 0, b = 0;
    for (let t of terms) {
      if (/x/i.test(t)) {
        let coeff = t.replace(/x/i, '');
        if (coeff === '' || coeff === '+') coeff = '1';
        if (coeff === '-') coeff = '-1';
        a += parseFloat(coeff);
      } else {
        b += parseFloat(t);
      }
    }
    return { a, b };
  }

  try {
    const L = parseSide(lhs);
    const R = parseSide(rhs);
    const a = L.a - R.a;
    const b = R.b - L.b;
    if (a === 0) return null;
    return { combinedA: a, combinedB: b, x: b / a };
  } catch(e) {
    return null;
  }
}

function runMathSolve() {
  const input = document.getElementById('math-input').value.trim();
  const output = document.getElementById('math-output');
  if (!input) {
    output.innerHTML = '';
    return;
  }

  if (input.includes('=') && /x/i.test(input)) {
    const solved = solveLinear(input);
    if (!solved) {
      output.innerHTML = `<div class="math-output-card" style="color:var(--rose-text);">Could not parse as a standard linear equation. Try something like "2x + 5 = 17".</div>`;
      return;
    }
    const cleanX = Math.round(solved.x * 10000) / 10000;
    output.innerHTML = `
      <div class="math-output-card">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <strong style="font-size:17px;color:var(--accent);">Solution: x = ${cleanX}</strong>
          <button class="copy-btn" id="copy-math-btn">${ICONS.copy}<span>Copy</span></button>
        </div>
        <ul class="math-steps-list">
          <li><strong>Original:</strong> ${escapeHtml(input)}</li>
          <li><strong>Group x terms:</strong> ${solved.combinedA}x = ${solved.combinedB}</li>
          <li><strong>Isolate x:</strong> x = ${solved.combinedB} / ${solved.combinedA}</li>
        </ul>
      </div>
    `;
    document.getElementById('copy-math-btn').addEventListener('click', function() {
      copyToClipboard(`x = ${cleanX}`, this);
    });
    logActivity(`Solved math equation: ${input}`);
  } else {
    try {
      if (typeof math === 'undefined') throw new Error('Math library offline');
      const res = math.evaluate(input);
      const cleanRes = typeof res === 'number' ? Math.round(res * 10000) / 10000 : res;
      output.innerHTML = `
        <div class="math-output-card">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <strong style="font-size:17px;color:var(--emerald-text);">${escapeHtml(input)} = ${cleanRes}</strong>
            <button class="copy-btn" id="copy-math-btn">${ICONS.copy}<span>Copy</span></button>
          </div>
        </div>
      `;
      document.getElementById('copy-math-btn').addEventListener('click', function() {
        copyToClipboard(String(cleanRes), this);
      });
      logActivity(`Evaluated: ${input} = ${cleanRes}`);
    } catch(e) {
      output.innerHTML = `<div class="math-output-card" style="color:var(--rose-text);">Could not evaluate expression. Please check syntax.</div>`;
    }
  }
}

/* ==================================================================================================
   CUBBY UI COMPONENT: COMMAND PALETTE (⌘K / Ctrl+K)
   ================================================================================================== */
const COMMANDS = [
  { group: "Tools", id: "dashboard", title: "Go to Dashboard", icon: "home", action: () => { activeTab = "dashboard"; renderAll(); } },
  { group: "Tools", id: "tutor", title: "Ask a Tutor (AI)", icon: "chat", action: () => { activeTab = "tutor"; renderAll(); } },
  { group: "Tools", id: "summarize", title: "Summarize Notes", icon: "book", action: () => { activeTab = "summarize"; renderAll(); } },
  { group: "Tools", id: "quiz", title: "Practice Quiz Maker", icon: "quiz", action: () => { activeTab = "quiz"; renderAll(); } },
  { group: "Tools", id: "flashcards", title: "Flashcard Decks", icon: "layers", action: () => { activeTab = "flashcards"; renderAll(); } },
  { group: "Tools", id: "focus", title: "Focus Timer (Pomodoro)", icon: "clock", action: () => { activeTab = "focus"; renderAll(); } },
  { group: "Tools", id: "math", title: "Math & Equation Solver", icon: "calc", action: () => { activeTab = "math"; renderAll(); } },
  { group: "Actions", id: "action-theme", title: "Toggle Theme (Light / Dark)", icon: "sparkles", action: () => toggleTheme() },
  { group: "Actions", id: "action-new-card", title: "Create Flashcard", icon: "plus", action: () => { activeTab = "flashcards"; renderAll(); } },
  { group: "Actions", id: "action-start-timer", title: "Start 25m Focus Block", icon: "play", action: () => { activeTab = "focus"; renderAll(); if (!timer.running) toggleTimer(); } },
];

let selectedCommandIndex = 0;

function openCommandDialog() {
  const backdrop = document.getElementById('command-dialog-backdrop');
  const input = document.getElementById('command-input');
  if (!backdrop || !input) return;
  backdrop.classList.remove('hidden');
  input.value = '';
  selectedCommandIndex = 0;
  filterCommands('');
  input.focus();
}

function closeCommandDialog() {
  const backdrop = document.getElementById('command-dialog-backdrop');
  if (backdrop) backdrop.classList.add('hidden');
}

function filterCommands(query) {
  const resultsContainer = document.getElementById('command-results');
  if (!resultsContainer) return;

  const q = query.toLowerCase().trim();
  const filtered = COMMANDS.filter(cmd => cmd.title.toLowerCase().includes(q) || cmd.group.toLowerCase().includes(q));

  if (filtered.length === 0) {
    resultsContainer.innerHTML = `<div style="padding:16px;text-align:center;color:var(--text-muted);font-size:13.5px;">No matching commands found.</div>`;
    return;
  }

  let html = '';
  let currentGroup = '';
  filtered.forEach((cmd, idx) => {
    if (cmd.group !== currentGroup) {
      currentGroup = cmd.group;
      html += `<div class="cmd-group-label">${currentGroup}</div>`;
    }
    html += `
      <div class="cmd-item ${idx === selectedCommandIndex ? 'selected' : ''}" data-index="${idx}">
        <span class="cmd-item-icon">${ICONS[cmd.icon] || ICONS.sparkles}</span>
        <span>${escapeHtml(cmd.title)}</span>
      </div>
    `;
  });

  resultsContainer.innerHTML = html;

  resultsContainer.querySelectorAll('.cmd-item').forEach((el, i) => {
    el.addEventListener('click', () => {
      filtered[i].action();
      closeCommandDialog();
    });
  });
}

/* ==================================================================================================
   MOBILE SIDEBAR DRAWER
   ================================================================================================== */
function toggleMobileSidebar() {
  const sb = document.getElementById('sidebar');
  if (sb) sb.classList.toggle('open');
}

function closeMobileSidebar() {
  const sb = document.getElementById('sidebar');
  if (sb) sb.classList.remove('open');
}

/* ==================================================================================================
   EVENT WIRING
   ================================================================================================== */
function attachHandlers() {
  // Quick Dashboard Jump Buttons
  document.querySelectorAll('[data-jump]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeTab = btn.dataset.jump;
      renderAll();
    });
  });

  // Tool 00: Tutor
  if (activeTab === 'tutor') {
    const form = document.getElementById('chat-form');
    if (form) form.addEventListener('submit', sendChatMessage);

    const input = document.getElementById('chat-input');
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendChatMessage();
        }
      });
    }

    const clearBtn = document.getElementById('clear-chat-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        chatHistory = [];
        renderAll();
      });
    }

    document.querySelectorAll('.prompt-chip[data-prompt]').forEach(chip => {
      chip.addEventListener('click', () => {
        document.getElementById('chat-input').value = chip.dataset.prompt;
        sendChatMessage();
      });
    });
  }

  // Tool 01: Summarize
  if (activeTab === 'summarize') {
    const slider = document.getElementById('ratio-slider');
    if (slider) {
      slider.addEventListener('input', () => {
        document.getElementById('ratio-readout').textContent = slider.value + '% Length';
      });
    }
    const sumBtn = document.getElementById('summarize-btn');
    if (sumBtn) sumBtn.addEventListener('click', runSummarize);
  }

  // Tool 02: Quiz
  if (activeTab === 'quiz') {
    const qBtn = document.getElementById('quiz-generate-btn');
    if (qBtn) qBtn.addEventListener('click', runGenerateQuiz);

    document.querySelectorAll('.sample-topic-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.getElementById('quiz-source').value = chip.dataset.topic;
        runGenerateQuiz();
      });
    });
  }

  // Tool 03: Flashcards
  if (activeTab === 'flashcards') {
    document.querySelectorAll('.deck-select-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeDeck = btn.dataset.deck;
        saveState();
        renderAll();
      });
    });

    const newDeckBtn = document.getElementById('new-deck-btn');
    if (newDeckBtn) {
      newDeckBtn.addEventListener('click', () => {
        const name = prompt('Name your new deck:');
        if (name && !state.decks.includes(name.trim())) {
          state.decks.push(name.trim());
          state.activeDeck = name.trim();
          saveState();
          renderAll();
          toast(`Deck "${name.trim()}" created!`);
        }
      });
    }

    const addCardBtn = document.getElementById('add-card-btn');
    if (addCardBtn) {
      addCardBtn.addEventListener('click', () => {
        const front = document.getElementById('card-front').value.trim();
        const back = document.getElementById('card-back').value.trim();
        if (!front || !back) {
          toast('Please add both a front question and back answer.');
          return;
        }
        state.cards.push({
          id: 'c' + Date.now() + Math.random().toString(16).slice(2),
          deck: state.activeDeck,
          front,
          back,
          ease: 2.5,
          interval: 0,
          reps: 0,
          due: todayKey()
        });
        saveState();
        logActivity(`Added card to "${state.activeDeck}": "${front}"`);
        toast('Flashcard saved!');
        renderAll();
      });
    }

    const startStudyBtn = document.getElementById('start-study-btn');
    if (startStudyBtn) startStudyBtn.addEventListener('click', startStudySession);

    document.querySelectorAll('.delete-card-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.cards = state.cards.filter(c => c.id !== btn.dataset.id);
        saveState();
        renderAll();
        toast('Card deleted.');
      });
    });
  }

  // Tool 04: Focus
  if (activeTab === 'focus') {
    const toggleBtn = document.getElementById('timer-toggle-btn');
    if (toggleBtn) toggleBtn.addEventListener('click', toggleTimer);

    const resetBtn = document.getElementById('timer-reset-btn');
    if (resetBtn) resetBtn.addEventListener('click', resetTimer);

    const applySettings = document.getElementById('apply-timer-settings');
    if (applySettings) {
      applySettings.addEventListener('click', () => {
        timer.workLen = Number(document.getElementById('work-len-input').value) || 25;
        timer.breakLen = Number(document.getElementById('break-len-input').value) || 5;
        timer.remaining = timer.workLen * 60;
        renderAll();
        toast('Timer durations updated.');
      });
    }

    document.querySelectorAll('#timer-presets-group .btn-group-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const set = btn.dataset.set;
        if (set === '25-5') {
          timer.workLen = 25; timer.breakLen = 5; timer.mode = 'work';
        } else if (set === '50-10') {
          timer.workLen = 50; timer.breakLen = 10; timer.mode = 'work';
        } else if (set === 'break') {
          timer.mode = 'break';
        }
        timer.remaining = (timer.mode === 'work' ? timer.workLen : timer.breakLen) * 60;
        renderAll();
      });
    });
  }

  // Tool 05: Math
  if (activeTab === 'math') {
    const solveBtn = document.getElementById('math-solve-btn');
    if (solveBtn) solveBtn.addEventListener('click', runMathSolve);

    const mathInput = document.getElementById('math-input');
    if (mathInput) {
      mathInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') runMathSolve();
      });
    }

    document.querySelectorAll('.math-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.getElementById('math-input').value = chip.dataset.ex;
        runMathSolve();
      });
    });
  }
}

/* ==================================================================================================
   THEME TOGGLE
   ================================================================================================== */
function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  renderSidebarFooter();
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  saveState();
  applyTheme();
}

/* ==================================================================================================
   GLOBAL KEYBOARD SHORTCUTS
   ================================================================================================== */
window.addEventListener('keydown', (e) => {
  // Command Menu: ⌘K or Ctrl+K or '/' when not in input
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openCommandDialog();
  }

  // ESC to close Command Menu
  if (e.key === 'Escape') {
    closeCommandDialog();
  }

  // Spacebar to flip card when studying
  if (activeTab === 'flashcards' && studySession && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
    if (e.code === 'Space') {
      e.preventDefault();
      studySession.showBack = !studySession.showBack;
      renderStudyStage();
    }
    // Number keys 1-4 for rating
    if (studySession.showBack && ['1', '2', '3', '4'].includes(e.key)) {
      const q = Number(e.key) - 1;
      const card = studySession.queue[studySession.index];
      const idx = state.cards.findIndex(c => c.id === card.id);
      if (idx !== -1) {
        state.cards[idx] = scheduleCard(state.cards[idx], q);
        saveState();
      }
      studySession.index += 1;
      studySession.showBack = false;
      renderStudyStage();
    }
  }
});

// Command palette search filtering
const cmdInput = document.getElementById('command-input');
if (cmdInput) {
  cmdInput.addEventListener('input', (e) => filterCommands(e.target.value));
}

const openCmdBtn = document.getElementById('open-cmd-btn');
if (openCmdBtn) openCmdBtn.addEventListener('click', openCommandDialog);

const topbarCmdBtn = document.getElementById('topbar-cmd-btn');
if (topbarCmdBtn) topbarCmdBtn.addEventListener('click', openCommandDialog);

const cmdBackdrop = document.getElementById('command-dialog-backdrop');
if (cmdBackdrop) {
  cmdBackdrop.addEventListener('click', (e) => {
    if (e.target === cmdBackdrop) closeCommandDialog();
  });
}

// Mobile sidebar hamburger
const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', toggleMobileSidebar);
}

// Theme toggle
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
  themeBtn.addEventListener('click', toggleTheme);
}

/* ==================================================================================================
   INITIALIZATION
   ================================================================================================== */
applyTheme();
renderAll();
checkAiStatus();
