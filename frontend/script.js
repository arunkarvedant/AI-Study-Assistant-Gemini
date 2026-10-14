/* ==========================================================================
   StudyDesk — fully offline study assistant
   No API key, no server, no network calls required to function.
   All "smart" features (summarizing, quiz writing, spaced repetition,
   math solving) run on plain JavaScript algorithms in the browser.
   Progress is saved to this browser via localStorage.
   ========================================================================== */

/* --------------------------- tiny icon set (inline SVG, lucide-style) --------------------------- */
const ICONS = {
  home:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>`,
  book:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg>`,
  quiz:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.2a2.5 2.5 0 0 1 4.9.8c0 1.7-2.4 1.7-2.4 3.5"/><path d="M12 17h.01"/></svg>`,
  layers:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/></svg>`,
  clock: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>`,
  calc:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 11h1M12 11h1M16 11h1M8 15h1M12 15h1M16 15h1M8 19h1M12 19h1M16 19h1"/></svg>`,
  flame: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c2 3-1 4-1 7a3 3 0 0 0 6 0c0-1 0-2-1-3 2 1 4 4 4 7a8 8 0 1 1-16 0c0-4 3-6 4-9 0 2 1 3 2 3 0-2 0-4 2-5Z"/></svg>`,
  check: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m20 6-11 11L4 12"/></svg>`,
  target:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>`,
  play:  `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M6 4.5v15l13-7.5-13-7.5Z"/></svg>`,
  pause: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="5" y="4" width="5" height="16" rx="1"/><rect x="14" y="4" width="5" height="16" rx="1"/></svg>`,
  reset: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 1 3 6.7"/><path d="M3 21v-5h5"/></svg>`,
  trash: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14"/></svg>`,
  chat:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.4A8.5 8.5 0 0 1 3 11.5 8.38 8.38 0 0 1 11.5 3a8.5 8.5 0 0 1 9.5 8.5Z"/><path d="M8 11h.01M12 11h.01M16 11h.01"/></svg>`,
};

/* --------------------------------------- backend / AI status --------------------------------------- */
const API_BASE = ""; // same-origin; change if serving frontend separately from the backend
let aiStatus = { checked: false, available: false, model: null };

async function checkAiStatus(){
  try{
    const res = await fetch(`${API_BASE}/api/health`);
    const data = await res.json();
    aiStatus = { checked: true, available: Boolean(data.aiConfigured), model: data.model, modelConfirmed: Boolean(data.modelConfirmed) };
  }catch(e){
    aiStatus = { checked: true, available: false, model: null, modelConfirmed: false };
  }
  if(activeTab === 'tutor' || activeTab === 'summarize' || activeTab === 'quiz') renderAll();
}

/* --------------------------------------- storage helpers --------------------------------------- */
const STORE_KEY = "studydesk_v1";

function loadState(){
  try{
    const raw = localStorage.getItem(STORE_KEY);
    if(!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return Object.assign(defaultState(), parsed);
  }catch(e){ return defaultState(); }
}
function saveState(){
  try{ localStorage.setItem(STORE_KEY, JSON.stringify(state)); }catch(e){ console.warn("Could not save:", e); }
}
function defaultState(){
  return {
    theme: "light",
    decks: ["General"],
    activeDeck: "General",
    cards: [],          // {id, deck, front, back, ease, interval, due, reps}
    quizHistory: [],    // {date, score, total}
    dailyMinutes: {},   // { 'YYYY-MM-DD': minutes }
    activityLog: [],    // {date, text}
    lastActiveDate: null,
    streak: 0,
  };
}

let state = loadState();

/* --------------------------------------- date helpers ------------------------------------------ */
function todayKey(d = new Date()){ return d.toISOString().slice(0,10); }
function daysAgoKey(n){ const d = new Date(); d.setDate(d.getDate()-n); return todayKey(d); }
function fmtDate(dstr){ const d = new Date(dstr); return d.toLocaleDateString(undefined,{month:'short',day:'numeric'}); }

function touchStreak(){
  const today = todayKey();
  if(state.lastActiveDate === today) return;
  const yesterday = daysAgoKey(1);
  if(state.lastActiveDate === yesterday){ state.streak += 1; }
  else if(state.lastActiveDate !== today){ state.streak = 1; }
  state.lastActiveDate = today;
  saveState();
}

function logActivity(text){
  state.activityLog.unshift({date: new Date().toISOString(), text});
  state.activityLog = state.activityLog.slice(0, 8);
  touchStreak();
  saveState();
}

function addMinutes(mins){
  const k = todayKey();
  state.dailyMinutes[k] = (state.dailyMinutes[k] || 0) + mins;
  touchStreak();
  saveState();
}

/* --------------------------------------- toast -------------------------------------------------- */
function toast(msg){
  const wrap = document.getElementById('toast-wrap');
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = ICONS.check + `<span>${msg}</span>`;
  wrap.appendChild(el);
  setTimeout(()=>{ el.style.opacity='0'; el.style.transform='translateY(8px)'; el.style.transition='all .25s'; }, 2200);
  setTimeout(()=> el.remove(), 2500);
}

/* ==================================================================================================
   TEXT ALGORITHMS — summarizer & quiz generator (pure JS, no AI API involved)
   ================================================================================================== */

const STOPWORDS = new Set(("a an the and or but if while is are was were be been being to of in on for "+
  "with as by at from this that these those it its it's into over under again further then once here there "+
  "all any both each few more most other some such no nor not only own same so than too very s t can will just "+
  "don should now i you he she we they them his her their our your my me him what which who whom not have has had "+
  "do does did doing about above below between out up down off during before after because also than through").split(" "));

function splitSentences(text){
  return text
    .replace(/\s+/g, ' ')
    .trim()
    .split(/(?<=[.!?])\s+(?=[A-Z0-9])/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

function wordsOf(str){
  return (str.toLowerCase().match(/[a-z][a-z'-]*/g) || []);
}

function wordFrequencies(sentences){
  const freq = {};
  sentences.forEach(s => {
    wordsOf(s).forEach(w => {
      if(STOPWORDS.has(w) || w.length < 3) return;
      freq[w] = (freq[w] || 0) + 1;
    });
  });
  return freq;
}

function summarizeText(text, ratio){
  const sentences = splitSentences(text);
  if(sentences.length === 0) return {summary: [], keyTerms: [], originalWords: 0, summaryWords: 0};

  const freq = wordFrequencies(sentences);
  const maxFreq = Math.max(1, ...Object.values(freq));

  const scored = sentences.map((s, i) => {
    const words = wordsOf(s).filter(w => !STOPWORDS.has(w) && w.length >= 3);
    const score = words.length
      ? words.reduce((sum, w) => sum + (freq[w] || 0) / maxFreq, 0) / Math.sqrt(words.length)
      : 0;
    return {s, i, score};
  });

  const targetCount = Math.max(1, Math.round(sentences.length * ratio));
  const top = [...scored].sort((a,b)=> b.score - a.score).slice(0, targetCount);
  const inOrder = top.sort((a,b)=> a.i - b.i).map(x => x.s);

  const keyTerms = Object.entries(freq)
    .sort((a,b)=> b[1]-a[1])
    .slice(0, 8)
    .map(([w,c]) => ({word: w, count: c}));

  const originalWords = wordsOf(text).length;
  const summaryWords = wordsOf(inOrder.join(' ')).length;

  return {summary: inOrder, keyTerms, originalWords, summaryWords};
}

function generateQuizFromText(text, count){
  const sentences = splitSentences(text).filter(s => wordsOf(s).length >= 6);
  const freq = wordFrequencies(sentences);

  // candidate key terms: meaningful, not too common, length >= 4
  const candidates = Object.entries(freq)
    .filter(([w]) => w.length >= 4)
    .sort((a,b)=> b[1]-a[1])
    .map(([w]) => w);

  const pool = [...new Set(candidates)];
  const usedSentences = new Set();
  const questions = [];

  for(const sentence of sentences){
    if(questions.length >= count) break;
    if(usedSentences.has(sentence)) continue;

    const swords = wordsOf(sentence);
    const target = swords.find(w => pool.includes(w) && w.length >= 4);
    if(!target) continue;

    // build blanked question, case-insensitive whole-word replace (first occurrence)
    const re = new RegExp(`\\b${target}\\b`, 'i');
    if(!re.test(sentence)) continue;
    const blanked = sentence.replace(re, '_____');

    // distractors: other pool words, not the target, roughly similar length
    const distractorPool = pool.filter(w => w !== target);
    shuffle(distractorPool);
    const distractors = distractorPool.slice(0, 3);
    while(distractors.length < 3){
      distractors.push(genericFiller(distractors.length));
    }

    const options = shuffle([capitalizeMatch(target, sentence), ...distractors.map(d => capitalizeMatch(d, sentence))]);

    questions.push({
      question: blanked,
      options,
      answer: capitalizeMatch(target, sentence),
      explanation: sentence,
    });
    usedSentences.add(sentence);
  }

  return questions;
}

function capitalizeMatch(word, sentence){
  const m = sentence.match(new RegExp(`\\b${word}\\b`, 'i'));
  return m ? m[0] : word;
}
function genericFiller(i){
  const fillers = ['context', 'process', 'concept', 'system', 'factor', 'element'];
  return fillers[i % fillers.length];
}
function shuffle(arr){
  for(let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ==================================================================================================
   FLASHCARDS — lightweight SM-2 style spaced repetition
   ================================================================================================== */

function scheduleCard(card, quality){
  // quality: 0 again, 1 hard, 2 good, 3 easy
  let {ease = 2.5, interval = 0, reps = 0} = card;
  if(quality === 0){
    reps = 0; interval = 0; ease = Math.max(1.3, ease - 0.2);
  }else{
    reps += 1;
    if(reps === 1) interval = 1;
    else if(reps === 2) interval = 3;
    else interval = Math.round(interval * ease);

    if(quality === 1) ease = Math.max(1.3, ease - 0.15);
    if(quality === 3) ease = ease + 0.15;
  }
  const due = new Date();
  due.setDate(due.getDate() + Math.max(interval, quality===0 ? 0 : 1));
  return {...card, ease, interval, reps, due: todayKey(due)};
}

function dueCardsForDeck(deck){
  const today = todayKey();
  return state.cards.filter(c => c.deck === deck && c.due <= today);
}

/* ==================================================================================================
   NAVIGATION + RENDERING
   ================================================================================================== */

const TABS = [
  {id:'dashboard', label:'Dashboard', icon:'home'},
  {id:'tutor', label:'Ask a Tutor', icon:'chat'},
  {id:'summarize', label:'Summarize Notes', icon:'book'},
  {id:'quiz', label:'Quiz Maker', icon:'quiz'},
  {id:'flashcards', label:'Flashcards', icon:'layers'},
  {id:'focus', label:'Focus Timer', icon:'clock'},
  {id:'math', label:'Math Helper', icon:'calc'},
];

let activeTab = 'dashboard';

function renderNav(){
  const nav = document.getElementById('nav');
  nav.innerHTML = TABS.map(t => `
    <button class="nav-btn ${t.id===activeTab?'active':''}" data-tab="${t.id}">
      ${ICONS[t.icon]}<span>${t.label}</span>
    </button>
  `).join('');
  nav.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => { activeTab = btn.dataset.tab; renderAll(); });
  });
}

function renderSidebarFooter(){
  document.getElementById('streak-num').textContent = state.streak;
  document.getElementById('theme-label').textContent = state.theme === 'dark' ? 'Light mode' : 'Dark mode';
  document.getElementById('theme-icon').textContent = state.theme === 'dark' ? '☀️' : '🌙';
}

function renderAll(){
  renderNav();
  renderSidebarFooter();
  const page = document.getElementById('page');
  if(activeTab === 'dashboard') page.innerHTML = viewDashboard();
  if(activeTab === 'tutor') page.innerHTML = viewTutor();
  if(activeTab === 'summarize') page.innerHTML = viewSummarize();
  if(activeTab === 'quiz') page.innerHTML = viewQuiz();
  if(activeTab === 'flashcards') page.innerHTML = viewFlashcards();
  if(activeTab === 'focus') page.innerHTML = viewFocus();
  if(activeTab === 'math') page.innerHTML = viewMath();
  attachHandlers();
}

/* ---------------------------------------- Dashboard ---------------------------------------------- */
function viewDashboard(){
  const today = todayKey();
  const todayMin = state.dailyMinutes[today] || 0;
  const dueCount = state.cards.filter(c => c.due <= today).length;
  const avgScore = state.quizHistory.length
    ? Math.round(state.quizHistory.reduce((a,q)=> a + q.score/q.total, 0) / state.quizHistory.length * 100)
    : null;

  const days = [];
  for(let i=6;i>=0;i--){ days.push(daysAgoKey(i)); }
  const maxMin = Math.max(10, ...days.map(d => state.dailyMinutes[d] || 0));

  return `
    <div class="page-head">
      <p class="eyebrow">Overview</p>
      <h1>Welcome back</h1>
      <p>Everything below runs locally in your browser — no API key, no internet connection needed once this page is loaded.</p>
    </div>

    <div class="grid grid-4" style="margin-bottom:20px;">
      <div class="card stat-card">
        <div class="icon-wrap">${ICONS.flame}</div>
        <div class="stat-num">${state.streak}</div>
        <div class="stat-label">Day study streak</div>
      </div>
      <div class="card stat-card">
        <div class="icon-wrap">${ICONS.clock}</div>
        <div class="stat-num">${todayMin}<span style="font-size:14px;color:var(--ink-soft);">m</span></div>
        <div class="stat-label">Focused minutes today</div>
      </div>
      <div class="card stat-card">
        <div class="icon-wrap">${ICONS.layers}</div>
        <div class="stat-num">${dueCount}</div>
        <div class="stat-label">Flashcards due</div>
      </div>
      <div class="card stat-card">
        <div class="icon-wrap">${ICONS.target}</div>
        <div class="stat-num">${avgScore===null ? '—' : avgScore+'%'}</div>
        <div class="stat-label">Avg quiz accuracy</div>
      </div>
    </div>

    <div class="grid grid-2">
      <div class="card chart-card">
        <p class="section-label">This week's focus time</p>
        <div class="chart-bars">
          ${days.map(d => {
            const m = state.dailyMinutes[d] || 0;
            const h = Math.max(4, Math.round((m / maxMin) * 100));
            return `<div class="chart-col">
              <div class="chart-bar" style="height:${h}%;" title="${m} minutes"></div>
              <div class="chart-day">${fmtDate(d)}</div>
            </div>`;
          }).join('')}
        </div>
      </div>

      <div class="card">
        <p class="section-label">Recent activity</p>
        ${state.activityLog.length ? `
          <ul class="bullet-list">
            ${state.activityLog.map(a => `<li>${a.text}</li>`).join('')}
          </ul>
        ` : `<div class="empty">Nothing yet — summarize some notes, take a quiz, or start a focus session to see activity here.</div>`}
      </div>
    </div>
  `;
}

/* ---------------------------------------- Ask a Tutor (Gemini) ---------------------------------------------- */
let chatHistory = [];

function aiBadge(){
  if(!aiStatus.checked){
    return `<span class="ai-badge off"><span class="dot2"></span>Checking AI connection…</span>`;
  }
  return aiStatus.available
    ? `<span class="ai-badge on"><span class="dot2"></span>Gemini connected (${aiStatus.model || 'AI'}${aiStatus.modelConfirmed ? '' : ' — unconfirmed'})</span>`
    : `<span class="ai-badge off"><span class="dot2"></span>No AI key configured — offline tools only</span>`;
}

function viewTutor(){
  if(!aiStatus.available){
    return `
      <div class="page-head">
        <p class="eyebrow">Tool 00</p>
        <h1>Ask a Tutor</h1>
        <p>A real, open-ended AI tutor powered by Google's Gemini API (free tier).</p>
      </div>
      ${aiBadge()}
      <div class="no-key-note">
        This feature needs a backend running with a free Gemini API key. To enable it:
        <br>1. Get a free key at <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">aistudio.google.com/apikey</a>.
        <br>2. Add it to <code>backend/.env</code> as <code>GEMINI_API_KEY=your_key_here</code>.
        <br>3. Run <code>npm install &amp;&amp; npm start</code> inside <code>backend/</code>, then reload this page.
        <br><br>Meanwhile, the Summarize Notes and Quiz Maker tools below still work fully offline, no key needed.
      </div>
    `;
  }

  return `
    <div class="page-head">
      <p class="eyebrow">Tool 00</p>
      <h1>Ask a Tutor</h1>
      <p>Ask anything you're studying — powered by Gemini, running through your own backend and API key.</p>
    </div>
    ${aiBadge()}

    <div class="subject-row">
      <label for="subject-select">Subject</label>
      <select id="subject-select">
        <option>General</option>
        <option>Mathematics</option>
        <option>Science</option>
        <option>History</option>
        <option>English / Literature</option>
        <option>Computer Science</option>
        <option>Geography</option>
      </select>
    </div>

    <div class="chat-log" id="chat-log">
      ${chatHistory.length === 0 ? `
        <div class="card tutor-card"><p>Hi! Pick a subject above, then ask me anything you're studying — I'll break it down step by step.</p></div>
      ` : chatHistory.map(m => `
        <div class="card ${m.role==='user'?'student-card':'tutor-card'}"><p><strong>${m.role==='user'?'You':'Tutor'}:</strong> ${escapeHtml(m.content)}</p></div>
      `).join('')}
    </div>

    <form class="composer" id="chat-form">
      <textarea id="chat-input" rows="2" placeholder="e.g. Why does ice float on water?"></textarea>
      <button type="submit" class="btn btn-primary" id="chat-send-btn">Ask →</button>
    </form>
  `;
}

function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

async function sendChatMessage(e){
  e.preventDefault();
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  if(!message) return;

  const subject = document.getElementById('subject-select').value;
  chatHistory.push({role:'user', content: message});
  input.value = '';
  renderChatLogOnly(true);

  try{
    const res = await fetch(`${API_BASE}/api/chat`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ message, subject, history: chatHistory.slice(0,-1) }),
    });
    const data = await res.json();
    if(!res.ok) throw new Error(data.error || 'Request failed');
    chatHistory.push({role:'assistant', content: data.reply});
    logActivity(`Asked the AI tutor about ${subject}.`);
    checkAiStatus(); // pick up the confirmed model name for the badge
  }catch(err){
    chatHistory.push({role:'assistant', content: `Sorry, something went wrong: ${err.message}`});
  }
  renderChatLogOnly(false);
}

function renderChatLogOnly(thinking){
  const log = document.getElementById('chat-log');
  if(!log) return;
  log.innerHTML = chatHistory.map(m => `
    <div class="card ${m.role==='user'?'student-card':'tutor-card'}"><p><strong>${m.role==='user'?'You':'Tutor'}:</strong> ${escapeHtml(m.content)}</p></div>
  `).join('') + (thinking ? `<div class="card tutor-card"><p><em>…thinking</em></p></div>` : '');
  log.scrollTop = log.scrollHeight;
}

/* ---------------------------------------- Summarizer ---------------------------------------------- */
let lastSummaryResult = null;

function viewSummarize(){
  return `
    <div class="page-head">
      <p class="eyebrow">Tool 01</p>
      <h1>Summarize Notes</h1>
      <p>Paste any notes or a passage below. If a Gemini key is configured it writes the summary; otherwise a local scoring algorithm ranks sentences by importance and pulls out the key ones — either way, no setup required to get a result.</p>
    </div>
    ${aiBadge()}

    <div class="card" style="max-width:760px;">
      <div class="field">
        <label class="field-label">Your notes</label>
        <textarea id="notes-input" rows="9" placeholder="Paste your notes or a passage here…"></textarea>
      </div>
      <div class="field">
        <label class="field-label">Summary length (used in offline mode)</label>
        <input type="range" id="ratio-slider" min="15" max="55" value="35" />
        <div style="display:flex;justify-content:space-between;font-size:11.5px;color:var(--ink-soft);margin-top:4px;">
          <span>Short</span><span id="ratio-readout">35%</span><span>Long</span>
        </div>
      </div>
      <button class="btn btn-primary" id="summarize-btn">Summarize</button>
    </div>

    <div id="summary-output" style="max-width:760px;margin-top:20px;"></div>
  `;
}

async function runSummarize(){
  const text = document.getElementById('notes-input').value.trim();
  const ratio = Number(document.getElementById('ratio-slider').value) / 100;
  const output = document.getElementById('summary-output');
  const btn = document.getElementById('summarize-btn');

  if(!text){ output.innerHTML = `<div class="empty">Paste some notes above to get a summary.</div>`; return; }

  if(aiStatus.available){
    btn.disabled = true; btn.textContent = 'Summarizing…';
    output.innerHTML = `<div class="empty">Asking Gemini to summarize your notes…</div>`;
    try{
      const res = await fetch(`${API_BASE}/api/summarize`, {
        method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({notes: text}),
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.error || 'Request failed');

      output.innerHTML = `
        <div class="card">
          <p class="section-label">AI Summary</p>
          <p style="white-space:pre-wrap;line-height:1.65;font-size:14.5px;">${escapeHtml(data.summary)}</p>
        </div>
        <p class="mode-note">Generated by Gemini via your backend.</p>
      `;
      logActivity('Summarized notes using the Gemini AI tutor.');
      toast('AI summary ready.');
    }catch(err){
      output.innerHTML = `<div class="empty">AI summary failed (${escapeHtml(err.message)}) — falling back to the offline summarizer.</div>`;
      runSummarizeLocal(text, ratio, output);
    }finally{
      btn.disabled = false; btn.textContent = 'Summarize';
    }
    return;
  }

  runSummarizeLocal(text, ratio, output);
}

function runSummarizeLocal(text, ratio, output){
  const result = summarizeText(text, ratio);
  lastSummaryResult = result;

  if(result.summary.length === 0){
    output.innerHTML = `<div class="empty">Couldn't find enough sentence structure to summarize. Try pasting a longer passage.</div>`;
    return;
  }

  const reduction = result.originalWords ? Math.round((1 - result.summaryWords/result.originalWords) * 100) : 0;

  output.innerHTML = `
    <div class="card" style="margin-bottom:14px;">
      <div class="row" style="gap:24px;">
        <div><div class="stat-num" style="font-size:20px;">${result.originalWords}</div><div class="stat-label">Original words</div></div>
        <div><div class="stat-num" style="font-size:20px;">${result.summaryWords}</div><div class="stat-label">Summary words</div></div>
        <div><div class="stat-num" style="font-size:20px;color:var(--good);">-${reduction}%</div><div class="stat-label">Shorter</div></div>
      </div>
    </div>

    <div class="card" style="margin-bottom:14px;">
      <p class="section-label">Key terms</p>
      <div class="chips">
        ${result.keyTerms.map(t => `<span class="chip">${t.word} · ${t.count}</span>`).join('')}
      </div>
    </div>

    <div class="card">
      <p class="section-label">Summary</p>
      <ul class="bullet-list">
        ${result.summary.map(s => `<li>${s}</li>`).join('')}
      </ul>
    </div>
    <p class="mode-note">Generated locally (offline mode) — no AI key was available.</p>
  `;

  logActivity(`Summarized a ${result.originalWords}-word passage down to ${result.summaryWords} words (offline mode).`);
  toast('Summary ready and logged to your activity.');
}

/* ---------------------------------------- Quiz Maker ---------------------------------------------- */
let currentQuiz = [];
let quizScore = {correct:0, answered:0};

function viewQuiz(){
  return `
    <div class="page-head">
      <p class="eyebrow">Tool 02</p>
      <h1>Quiz Maker</h1>
      <p>Paste notes, or just type a topic. With Gemini connected it writes fresh questions on the topic; offline, it builds fill-in-the-blank questions from the key terms in text you paste.</p>
    </div>
    ${aiBadge()}

    <div class="card" style="max-width:760px;margin-bottom:20px;">
      <div class="field">
        <label class="field-label">Topic or source text</label>
        <textarea id="quiz-source" rows="7" placeholder="e.g. Photosynthesis — or paste a full passage of notes…"></textarea>
      </div>
      <div class="row">
        <div class="field">
          <label class="field-label">Number of questions</label>
          <select id="quiz-count">
            <option value="3">3 questions</option>
            <option value="5" selected>5 questions</option>
            <option value="8">8 questions</option>
          </select>
        </div>
        <button class="btn btn-primary" id="quiz-generate-btn">Generate Quiz</button>
      </div>
    </div>

    <div id="quiz-output" style="max-width:760px;"></div>
  `;
}

async function runGenerateQuiz(){
  const text = document.getElementById('quiz-source').value.trim();
  const count = Number(document.getElementById('quiz-count').value);
  const output = document.getElementById('quiz-output');
  const btn = document.getElementById('quiz-generate-btn');

  if(!text){ output.innerHTML = `<div class="empty">Type a topic or paste source text above to generate a quiz.</div>`; return; }

  if(aiStatus.available){
    btn.disabled = true; btn.textContent = 'Generating…';
    output.innerHTML = `<div class="empty">Asking Gemini to write your quiz…</div>`;
    try{
      const res = await fetch(`${API_BASE}/api/quiz`, {
        method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ topic: text, count }),
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.error || 'Request failed');
      currentQuiz = data.questions || [];
      quizScore = {correct:0, answered:0};
      if(currentQuiz.length === 0){
        output.innerHTML = `<div class="empty">Gemini didn't return any questions — try rephrasing the topic.</div>`;
        return;
      }
      renderQuizOutput(true);
      logActivity(`Generated an AI quiz on "${text.slice(0,40)}${text.length>40?'…':''}".`);
    }catch(err){
      output.innerHTML = `<div class="empty">AI quiz generation failed (${escapeHtml(err.message)}) — falling back to the offline quiz maker.</div>`;
      runGenerateQuizLocal(text, count, output);
    }finally{
      btn.disabled = false; btn.textContent = 'Generate Quiz';
    }
    return;
  }

  runGenerateQuizLocal(text, count, output);
}

function runGenerateQuizLocal(text, count, output){
  currentQuiz = generateQuizFromText(text, count);
  quizScore = {correct:0, answered:0};

  if(currentQuiz.length === 0){
    output.innerHTML = `<div class="empty">Couldn't find enough distinct key terms to build questions from that text. Try pasting a longer, more detailed passage (offline mode needs real source text, not just a topic name).</div>`;
    return;
  }

  renderQuizOutput(false);
}

function renderQuizOutput(fromAi){
  const output = document.getElementById('quiz-output');
  const pct = currentQuiz.length ? Math.round((quizScore.answered/currentQuiz.length)*100) : 0;

  output.innerHTML = `
    <div class="card" style="margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;font-size:13px;color:var(--ink-soft);">
        <span>Progress: ${quizScore.answered}/${currentQuiz.length}</span>
        <span>Score: ${quizScore.correct}/${quizScore.answered}</span>
      </div>
      <div class="progress-track"><div class="progress-fill" style="width:${pct}%;"></div></div>
    </div>
    ${currentQuiz.map((q, qi) => `
      <div class="quiz-item">
        <div class="q-title">${qi+1}. ${q.question}</div>
        <div class="q-options">
          ${q.options.map((opt, oi) => `
            <button class="q-option" data-qi="${qi}" data-opt="${escapeAttr(opt)}">
              <span class="letter">${String.fromCharCode(65+oi)}</span><span>${opt}</span>
            </button>
          `).join('')}
        </div>
        <div class="q-explain" id="explain-${qi}">${q.explanation}</div>
      </div>
    `).join('')}
    <p class="mode-note">${fromAi ? 'Generated by Gemini via your backend.' : 'Generated locally (offline mode) from your pasted text — no AI key was available.'}</p>
  `;

  output.querySelectorAll('.q-option').forEach(btn => {
    btn.addEventListener('click', () => answerQuizQuestion(btn));
  });
}

function escapeAttr(s){ return s.replace(/"/g,'&quot;'); }

function answerQuizQuestion(btn){
  const qi = Number(btn.dataset.qi);
  const group = btn.parentElement;
  if(group.dataset.locked) return;
  group.dataset.locked = "1";

  const chosen = btn.dataset.opt;
  const correct = currentQuiz[qi].answer;
  const isCorrect = chosen === correct;

  group.querySelectorAll('.q-option').forEach(b => {
    b.disabled = true;
    if(b.dataset.opt === correct) b.classList.add('correct');
    else if(b === btn) b.classList.add('incorrect');
  });
  document.getElementById(`explain-${qi}`).classList.add('show');

  quizScore.answered += 1;
  if(isCorrect) quizScore.correct += 1;

  // update progress bar / score line without a full re-render (keep disabled states)
  const card = group.closest('.quiz-item').parentElement.querySelector('.card');
  const pct = Math.round((quizScore.answered/currentQuiz.length)*100);
  card.querySelector('.progress-fill').style.width = pct + '%';
  card.querySelector('div[style*="justify-content:space-between"]').innerHTML =
    `<span>Progress: ${quizScore.answered}/${currentQuiz.length}</span><span>Score: ${quizScore.correct}/${quizScore.answered}</span>`;

  if(quizScore.answered === currentQuiz.length){
    state.quizHistory.push({date: new Date().toISOString(), score: quizScore.correct, total: currentQuiz.length});
    state.quizHistory = state.quizHistory.slice(-30);
    logActivity(`Completed a quiz: ${quizScore.correct}/${currentQuiz.length} correct.`);
    toast(`Quiz finished — ${quizScore.correct}/${currentQuiz.length} correct!`);
  }
}

/* ---------------------------------------- Flashcards ---------------------------------------------- */
let studySession = null; // {deck, queue:[cards], index, showBack}

function viewFlashcards(){
  const deck = state.activeDeck;
  const deckCards = state.cards.filter(c => c.deck === deck);
  const due = dueCardsForDeck(deck);

  return `
    <div class="page-head">
      <p class="eyebrow">Tool 03</p>
      <h1>Flashcards</h1>
      <p>Build a deck, then study due cards with spaced repetition — cards you find easy come back less often; ones you struggle with come back sooner.</p>
    </div>

    <div class="deck-row">
      ${state.decks.map(d => `<button class="deck-pill ${d===deck?'active':''}" data-deck="${escapeAttr(d)}">${d} (${state.cards.filter(c=>c.deck===d).length})</button>`).join('')}
      <button class="deck-pill" id="new-deck-btn">+ New deck</button>
    </div>

    <div class="grid grid-2">
      <div class="card">
        <p class="section-label">Add a card to "${deck}"</p>
        <div class="field">
          <label class="field-label">Front (question / term)</label>
          <input type="text" id="card-front" placeholder="e.g. Mitochondria" />
        </div>
        <div class="field">
          <label class="field-label">Back (answer / definition)</label>
          <input type="text" id="card-back" placeholder="e.g. The organelle that produces ATP energy" />
        </div>
        <button class="btn btn-primary" id="add-card-btn">Add Card</button>
      </div>

      <div class="card">
        <p class="section-label">Study session</p>
        ${due.length
          ? `<p style="font-size:13.5px;color:var(--ink-soft);margin:0 0 12px;">${due.length} card${due.length===1?'':'s'} due for review today.</p>
             <button class="btn btn-primary" id="start-study-btn">Study Due Cards</button>`
          : `<div class="empty">No cards due right now in "${deck}". Add a card, or check back tomorrow.</div>`}
      </div>
    </div>

    <div id="study-stage" style="margin-top:20px;"></div>

    <hr class="chalk" />

    <p class="section-label">All cards in "${deck}"</p>
    ${deckCards.length ? `
      <table class="card-table">
        <thead><tr><th>Front</th><th>Back</th><th>Due</th><th></th></tr></thead>
        <tbody>
          ${deckCards.map(c => `
            <tr>
              <td>${c.front}</td>
              <td>${c.back}</td>
              <td><span class="due-badge ${c.due<=todayKey()?'due-now':'due-later'}">${c.due<=todayKey() ? 'Due now' : fmtDate(c.due)}</span></td>
              <td><button class="btn btn-sm btn-danger" data-delete-card="${c.id}">${ICONS.trash}</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    ` : `<div class="empty">No cards in this deck yet.</div>`}
  `;
}

function startStudySession(){
  const due = dueCardsForDeck(state.activeDeck);
  studySession = {queue: shuffle([...due]), index: 0, showBack: false};
  renderStudyStage();
}

function renderStudyStage(){
  const stage = document.getElementById('study-stage');
  if(!studySession || studySession.index >= studySession.queue.length){
    if(studySession) toast('Study session complete — nice work!');
    studySession = null;
    stage.innerHTML = '';
    return;
  }
  const card = studySession.queue[studySession.index];
  stage.innerHTML = `
    <div class="flip-stage">
      <div class="flip-card ${studySession.showBack?'flipped':''}" id="flip-card">
        <div class="flip-face front">${card.front}</div>
        <div class="flip-face back">${card.back}</div>
      </div>
    </div>
    <p style="text-align:center;font-size:12px;color:var(--ink-soft);margin:-6px 0 14px;">
      Card ${studySession.index+1} of ${studySession.queue.length} — click the card to flip
    </p>
    ${studySession.showBack ? `
      <div class="rate-row">
        <button class="rate-btn rate-again" data-quality="0">Again</button>
        <button class="rate-btn rate-hard" data-quality="1">Hard</button>
        <button class="rate-btn rate-good" data-quality="2">Good</button>
        <button class="rate-btn rate-easy" data-quality="3">Easy</button>
      </div>
    ` : ''}
  `;

  document.getElementById('flip-card').addEventListener('click', () => {
    studySession.showBack = !studySession.showBack;
    renderStudyStage();
  });
  stage.querySelectorAll('.rate-btn').forEach(b => {
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      const quality = Number(b.dataset.quality);
      const idx = state.cards.findIndex(c => c.id === card.id);
      state.cards[idx] = scheduleCard(state.cards[idx], quality);
      saveState();
      studySession.index += 1;
      studySession.showBack = false;
      renderStudyStage();
    });
  });
}

/* ---------------------------------------- Focus Timer ---------------------------------------------- */
let timer = {running:false, mode:'work', remaining:25*60, workLen:25, breakLen:5, intervalId:null, sessionsDone:0};

function viewFocus(){
  const total = (timer.mode==='work' ? timer.workLen : timer.breakLen) * 60;
  const pct = 1 - (timer.remaining / total);
  const r = 96, circ = 2*Math.PI*r;
  const dash = circ * pct;

  return `
    <div class="page-head">
      <p class="eyebrow">Tool 04</p>
      <h1>Focus Timer</h1>
      <p>A simple Pomodoro-style timer. Completed focus sessions are logged to your dashboard's weekly activity chart automatically.</p>
    </div>

    <div class="grid grid-2">
      <div class="card">
        <div class="timer-wrap">
          <div class="timer-ring">
            <svg width="220" height="220">
              <circle cx="110" cy="110" r="${r}" stroke="var(--paper-line)" stroke-width="10" fill="none" />
              <circle cx="110" cy="110" r="${r}" stroke="var(--amber-deep)" stroke-width="10" fill="none"
                stroke-dasharray="${circ}" stroke-dashoffset="${circ-dash}" stroke-linecap="round" />
            </svg>
            <div class="timer-num">
              <div>${formatTime(timer.remaining)}</div>
              <div class="timer-mode">${timer.mode === 'work' ? 'Focus' : 'Break'}</div>
            </div>
          </div>
          <div class="timer-controls">
            <button class="btn btn-primary" id="timer-toggle">${timer.running ? ICONS.pause+' Pause' : ICONS.play+' Start'}</button>
            <button class="btn btn-ghost" id="timer-reset">${ICONS.reset} Reset</button>
          </div>
          <p style="font-size:12.5px;color:var(--ink-soft);">Sessions completed today: <b>${timer.sessionsDone}</b></p>
        </div>
      </div>

      <div class="card">
        <p class="section-label">Session length</p>
        <div class="field">
          <label class="field-label">Focus minutes</label>
          <input type="number" id="work-len" min="5" max="90" value="${timer.workLen}" ${timer.running?'disabled':''} />
        </div>
        <div class="field">
          <label class="field-label">Break minutes</label>
          <input type="number" id="break-len" min="1" max="30" value="${timer.breakLen}" ${timer.running?'disabled':''} />
        </div>
        <button class="btn btn-ghost btn-sm" id="apply-lengths" ${timer.running?'disabled':''}>Apply</button>
      </div>
    </div>
  `;
}

function formatTime(sec){
  const m = Math.floor(sec/60).toString().padStart(2,'0');
  const s = Math.floor(sec%60).toString().padStart(2,'0');
  return `${m}:${s}`;
}

function tickTimer(){
  timer.remaining -= 1;
  if(timer.remaining <= 0){
    if(timer.mode === 'work'){
      addMinutes(timer.workLen);
      timer.sessionsDone += 1;
      logActivity(`Completed a ${timer.workLen}-minute focus session.`);
      toast('Focus session complete — take a break!');
      timer.mode = 'break';
      timer.remaining = timer.breakLen*60;
    }else{
      toast('Break over — ready for another round?');
      timer.mode = 'work';
      timer.remaining = timer.workLen*60;
    }
  }
  if(activeTab === 'focus') updateFocusView();
}

function updateFocusView(){
  // light-weight partial update to avoid losing input focus every second
  const numEl = document.querySelector('.timer-num > div:first-child');
  const modeEl = document.querySelector('.timer-mode');
  const circle = document.querySelectorAll('.timer-ring circle')[1];
  if(!numEl) return;
  numEl.textContent = formatTime(timer.remaining);
  modeEl.textContent = timer.mode === 'work' ? 'Focus' : 'Break';
  const total = (timer.mode==='work' ? timer.workLen : timer.breakLen) * 60;
  const pct = 1 - (timer.remaining/total);
  const r = 96, circ = 2*Math.PI*r;
  circle.setAttribute('stroke-dasharray', circ);
  circle.setAttribute('stroke-dashoffset', circ - circ*pct);
  const sessEl = document.querySelector('.timer-wrap p b');
  if(sessEl) sessEl.textContent = timer.sessionsDone;
}

function toggleTimer(){
  timer.running = !timer.running;
  if(timer.running){
    timer.intervalId = setInterval(tickTimer, 1000);
  }else{
    clearInterval(timer.intervalId);
  }
  renderAll();
}
function resetTimer(){
  timer.running = false;
  clearInterval(timer.intervalId);
  timer.mode = 'work';
  timer.remaining = timer.workLen*60;
  renderAll();
}

/* ---------------------------------------- Math Helper ---------------------------------------------- */
function viewMath(){
  return `
    <div class="page-head">
      <p class="eyebrow">Tool 05</p>
      <h1>Math Helper</h1>
      <p>Evaluate expressions or solve a simple linear equation for x — calculated locally, right in your browser.</p>
    </div>

    <div class="card" style="max-width:600px;">
      <div class="field">
        <label class="field-label">Expression or equation</label>
        <input type="text" id="math-input" placeholder="e.g. 3*(4+5)^2   or   2x + 5 = 17" />
      </div>
      <button class="btn btn-primary" id="math-solve-btn">Solve</button>
      <div id="math-output"></div>
    </div>

    <div class="card" style="max-width:600px;margin-top:16px;">
      <p class="section-label">Try one of these</p>
      <div class="chips">
        <span class="chip" data-example="2x + 5 = 17">2x + 5 = 17</span>
        <span class="chip" data-example="sqrt(144) + 3^2">sqrt(144) + 3^2</span>
        <span class="chip" data-example="5x - 3 = 2x + 12">5x - 3 = 2x + 12</span>
        <span class="chip" data-example="(8+2)*3/5">(8+2)*3/5</span>
      </div>
    </div>
  `;
}

function solveLinear(input){
  // very small parser for a*x + b = c*x + d style equations
  const [lhs, rhs] = input.split('=');
  if(rhs === undefined) return null;

  function parseSide(side){
    // returns {a: coeff of x, b: constant}
    let expr = side.replace(/\s+/g,'');
    expr = expr.replace(/-/g,'+-');
    const terms = expr.split('+').filter(Boolean);
    let a = 0, b = 0;
    for(let t of terms){
      if(/x/i.test(t)){
        let coeff = t.replace(/x/i,'');
        if(coeff === '' || coeff === '+') coeff = '1';
        if(coeff === '-') coeff = '-1';
        a += parseFloat(coeff);
      }else{
        b += parseFloat(t);
      }
    }
    return {a, b};
  }

  try{
    const L = parseSide(lhs);
    const R = parseSide(rhs);
    const a = L.a - R.a;
    const b = R.b - L.b;
    if(a === 0) return null;
    const x = b / a;
    return {a: L.a, aConst: L.b, ra: R.a, rb: R.b, combinedA: a, combinedB: b, x};
  }catch(e){ return null; }
}

function runMathSolve(){
  const input = document.getElementById('math-input').value.trim();
  const output = document.getElementById('math-output');
  if(!input){ output.innerHTML = ''; return; }

  if(input.includes('=') && /x/i.test(input)){
    const solved = solveLinear(input);
    if(!solved){
      output.innerHTML = `<div class="math-result">Couldn't parse that as a simple linear equation. Try a form like "2x + 5 = 17".</div>`;
      return;
    }
    output.innerHTML = `
      <ul class="math-steps">
        <li>Start: ${input}</li>
        <li>Collect x terms on one side: ${solved.combinedA}x = ${solved.combinedB}</li>
        <li>Divide both sides by ${solved.combinedA}: x = ${solved.combinedB} / ${solved.combinedA}</li>
      </ul>
      <div class="math-result">x = ${roundClean(solved.x)}</div>
    `;
    logActivity(`Solved the equation: ${input}`);
  }else{
    try{
      if(typeof math === 'undefined') throw new Error('math engine unavailable offline');
      const result = math.evaluate(input);
      output.innerHTML = `<div class="math-result">${input} = ${roundClean(result)}</div>`;
      logActivity(`Evaluated the expression: ${input}`);
    }catch(e){
      output.innerHTML = `<div class="math-result">Couldn't evaluate that expression. Check the syntax and try again.</div>`;
    }
  }
}
function roundClean(n){
  if(typeof n !== 'number') return n;
  return Math.round(n*10000)/10000;
}

/* ==================================================================================================
   EVENT WIRING per view
   ================================================================================================== */
function attachHandlers(){
  if(activeTab === 'tutor' && aiStatus.available){
    const form = document.getElementById('chat-form');
    if(form) form.addEventListener('submit', sendChatMessage);
  }

  if(activeTab === 'summarize'){
    const slider = document.getElementById('ratio-slider');
    slider.addEventListener('input', () => {
      document.getElementById('ratio-readout').textContent = slider.value + '%';
    });
    document.getElementById('summarize-btn').addEventListener('click', runSummarize);
  }

  if(activeTab === 'quiz'){
    document.getElementById('quiz-generate-btn').addEventListener('click', runGenerateQuiz);
  }

  if(activeTab === 'flashcards'){
    document.querySelectorAll('.deck-pill[data-deck]').forEach(btn => {
      btn.addEventListener('click', () => { state.activeDeck = btn.dataset.deck; saveState(); renderAll(); });
    });
    document.getElementById('new-deck-btn').addEventListener('click', () => {
      const name = prompt('Name your new deck:');
      if(name && !state.decks.includes(name)){
        state.decks.push(name); state.activeDeck = name; saveState(); renderAll();
      }
    });
    document.getElementById('add-card-btn').addEventListener('click', () => {
      const front = document.getElementById('card-front').value.trim();
      const back = document.getElementById('card-back').value.trim();
      if(!front || !back){ toast('Add both a front and back before saving.'); return; }
      state.cards.push({id: 'c'+Date.now()+Math.random().toString(16).slice(2), deck: state.activeDeck, front, back, ease:2.5, interval:0, reps:0, due: todayKey()});
      saveState();
      logActivity(`Added a flashcard to "${state.activeDeck}".`);
      toast('Flashcard added.');
      renderAll();
    });
    const startBtn = document.getElementById('start-study-btn');
    if(startBtn) startBtn.addEventListener('click', startStudySession);
    document.querySelectorAll('[data-delete-card]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.cards = state.cards.filter(c => c.id !== btn.dataset.deleteCard);
        saveState(); renderAll();
      });
    });
  }

  if(activeTab === 'focus'){
    document.getElementById('timer-toggle').addEventListener('click', toggleTimer);
    document.getElementById('timer-reset').addEventListener('click', resetTimer);
    document.getElementById('apply-lengths').addEventListener('click', () => {
      timer.workLen = Number(document.getElementById('work-len').value) || 25;
      timer.breakLen = Number(document.getElementById('break-len').value) || 5;
      timer.remaining = timer.workLen*60;
      renderAll();
    });
  }

  if(activeTab === 'math'){
    document.getElementById('math-solve-btn').addEventListener('click', runMathSolve);
    document.getElementById('math-input').addEventListener('keydown', (e) => { if(e.key==='Enter') runMathSolve(); });
    document.querySelectorAll('[data-example]').forEach(chip => {
      chip.addEventListener('click', () => {
        document.getElementById('math-input').value = chip.dataset.example;
        runMathSolve();
      });
    });
  }
}

/* ==================================================================================================
   THEME
   ================================================================================================== */
function applyTheme(){
  if(state.theme === 'dark'){
    document.documentElement.style.setProperty('--paper', '#20241d');
    document.documentElement.style.setProperty('--paper-hi', '#2a2f26');
    document.documentElement.style.setProperty('--paper-line', '#3a4033');
    document.documentElement.style.setProperty('--ink', '#f0ede1');
    document.documentElement.style.setProperty('--ink-soft', '#b9c2b4');
  }else{
    document.documentElement.style.setProperty('--paper', '#f6f1e4');
    document.documentElement.style.setProperty('--paper-hi', '#fffdf7');
    document.documentElement.style.setProperty('--paper-line', '#e7e0cd');
    document.documentElement.style.setProperty('--ink', '#23281f');
    document.documentElement.style.setProperty('--ink-soft', '#5b6459');
  }
}

document.getElementById('theme-toggle').addEventListener('click', () => {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  saveState();
  applyTheme();
  renderSidebarFooter();
});

/* ==================================================================================================
   INIT
   ================================================================================================== */
applyTheme();
renderAll();
checkAiStatus();