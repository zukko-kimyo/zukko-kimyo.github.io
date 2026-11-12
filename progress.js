/* Zukko Kimyo — XP, levels, daily goal, streak, achievements (localStorage) */
(function () {
  const KEY = 'zk_prog';
  const S = {
    uz: {
      xp: 'XP', lvl: 'Daraja', streak: 'kun ketma-ket', today: 'Bugungi maqsad', lessons_w: 'dars', goal_done: '🎯 Kunlik maqsad bajarildi!', lvl_up: 'Yangi daraja!',
      visit: 'Darsni ochding', lab: 'Tajribani ko‘rib chiqding', quiz: 'Test natijasi', passed: 'Dars o‘zlashtirildi! ⭐', test: 'Test markazi',
      me: 'Mening yutuqlarim', me_p: 'XP to‘pla, darajangni oshir va nishonlarni qo‘lga kirit!', cont: 'Davom ettirish', start: 'Boshlash', your_path: 'Sening yo‘ling',
      next_lvl: 'keyingi darajagacha', done_l: 'o‘zlashtirilgan dars', labs_w: 'ko‘rilgan tajriba', best_streak: 'eng uzun seriya', total_xp: 'jami XP',
      goal_set: 'Kunlik maqsad', per_day: 'ta dars kuniga', ach: 'Nishonlar', how: 'XP qanday olinadi?', reset: 'Natijalarni o‘chirish', reset_q: 'Barcha XP va natijalar o‘chirilsinmi?',
      r_visit: 'Darsni birinchi marta ochish', r_lab: 'Tajribani oxirigacha ko‘rish', r_quiz: 'Dars testida har bir to‘g‘ri javob (eng yaxshi natija)', r_pass: 'Dars testidan 7/10 va undan yuqori — dars o‘zlashtiriladi', r_goal: 'Kunlik maqsadni bajarish', r_test: 'Test markazida har bir to‘g‘ri javob',
      grade_prog: 'Sinf bo‘yicha natija', st_done: 'O‘zlashtirildi', st_start: 'Boshlangan', st_new: 'Yangi', hint_goal: 'Dars hisoblanishi uchun testni yech yoki tajribani ko‘r',
      ranks: ['Yangi kimyogar', 'Laborant', 'Tadqiqotchi', 'Kimyogar', 'Olim', 'Professor', 'Akademik'], unlocked: 'Yangi nishon!', locked: 'Hali ochilmagan', prog_w: 'Natija',
    },
    en: {
      xp: 'XP', lvl: 'Level', streak: 'day streak', today: 'Daily goal', lessons_w: 'lessons', goal_done: '🎯 Daily goal reached!', lvl_up: 'Level up!',
      visit: 'Lesson opened', lab: 'Experiment watched', quiz: 'Quiz result', passed: 'Lesson mastered! ⭐', test: 'Test centre',
      me: 'My progress', me_p: 'Earn XP, level up and collect badges!', cont: 'Continue', start: 'Start', your_path: 'Your journey',
      next_lvl: 'to next level', done_l: 'lessons mastered', labs_w: 'experiments watched', best_streak: 'best streak', total_xp: 'total XP',
      goal_set: 'Daily goal', per_day: 'lessons per day', ach: 'Badges', how: 'How to earn XP', reset: 'Reset progress', reset_q: 'Delete all XP and progress?',
      r_visit: 'Open a lesson for the first time', r_lab: 'Watch an experiment to the end', r_quiz: 'Each correct answer in a lesson quiz (best score)', r_pass: 'Score 7/10 or more in a lesson quiz — lesson mastered', r_goal: 'Reach your daily goal', r_test: 'Each correct answer in the test centre',
      grade_prog: 'Progress by grade', st_done: 'Mastered', st_start: 'Started', st_new: 'New', hint_goal: 'A lesson counts when you take its quiz or watch its experiment',
      ranks: ['Rookie chemist', 'Lab assistant', 'Researcher', 'Chemist', 'Scientist', 'Professor', 'Academician'], unlocked: 'New badge!', locked: 'Locked', prog_w: 'Progress',
    },
  };
  const ACH = [
    { id: 'first', ic: '👣', uz: ['Birinchi qadam', 'Birinchi darsni och'], en: ['First step', 'Open your first lesson'], ok: (s) => Object.keys(s.L).length >= 1 },
    { id: 'lab1', ic: '🧪', uz: ['Yosh tadqiqotchi', '1 ta tajribani ko‘r'], en: ['Young explorer', 'Watch 1 experiment'], ok: (s) => Object.keys(s.labs).length >= 1 },
    { id: 'done1', ic: '⭐', uz: ['Birinchi yulduz', '1 ta darsni o‘zlashtir'], en: ['First star', 'Master 1 lesson'], ok: (s) => nDone(s) >= 1 },
    { id: 'perfect', ic: '💯', uz: ['A’lochi', 'Dars testida 10/10'], en: ['Top marks', '10/10 in a lesson quiz'], ok: (s) => Object.values(s.L).some((x) => x.best >= 10) },
    { id: 'goal', ic: '🎯', uz: ['Maqsadga erishdim', 'Kunlik maqsadni bajar'], en: ['On target', 'Reach a daily goal'], ok: (s) => Object.keys(s.goalDone).length >= 1 },
    { id: 'streak3', ic: '🔥', uz: ['Olovli seriya', '3 kun ketma-ket o‘qi'], en: ['On fire', '3-day streak'], ok: (s) => best(s) >= 3 },
    { id: 'lab10', ic: '🔬', uz: ['Laborant', '10 ta tajribani ko‘r'], en: ['Lab assistant', 'Watch 10 experiments'], ok: (s) => Object.keys(s.labs).length >= 10 },
    { id: 'done10', ic: '🏅', uz: ['O‘nlik', '10 ta darsni o‘zlashtir'], en: ['Perfect ten', 'Master 10 lessons'], ok: (s) => nDone(s) >= 10 },
    { id: 'streak7', ic: '🚀', uz: ['Haftalik raketa', '7 kun ketma-ket o‘qi'], en: ['Weekly rocket', '7-day streak'], ok: (s) => best(s) >= 7 },
    { id: 'g6half', ic: '📗', uz: ['6-sinf yarmi', '6-sinfning yarmini o‘zlashtir'], en: ['Half of Grade 6', 'Master half of Grade 6'], ok: (s) => nDone(s, 'g6') >= 18 },
    { id: 'g7half', ic: '📘', uz: ['7-sinf yarmi', '7-sinfning yarmini o‘zlashtir'], en: ['Half of Grade 7', 'Master half of Grade 7'], ok: (s) => nDone(s, 'g7') >= 36 },
    { id: 'g8half', ic: '📙', uz: ['8-sinf yarmi', '8-sinfning yarmini o‘zlashtir'], en: ['Half of Grade 8', 'Master half of Grade 8'], ok: (s) => nDone(s, 'g8') >= 34 },
    { id: 'lvl5', ic: '👑', uz: ['5-daraja', '5-darajaga chiq'], en: ['Level 5', 'Reach level 5'], ok: (s) => level(s.xp).L >= 5 },
  ];
  const lang = () => (document.documentElement.lang === 'en' ? 'en' : 'uz');
  const t = (k) => S[lang()][k];
  const day = (d) => (d || new Date()).toLocaleDateString('sv');
  function nDone(s, g) { return Object.entries(s.L).filter(([k, v]) => v.done && (!g || k.startsWith(g + '-'))).length; }
  function load() {
    let s; try { s = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { }
    s = s || {}; s.xp = s.xp || 0; s.L = s.L || {}; s.labs = s.labs || {}; s.days = s.days || {}; s.goal = s.goal || 2; s.ach = s.ach || {}; s.goalDone = s.goalDone || {};
    return s;
  }
  let st = load();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { } try { window.dispatchEvent(new Event('zk:save')); } catch (e) { } };
  function level(xp) { let L = 1; while (xp >= 25 * L * (L + 1)) L++; const a = 25 * (L - 1) * L, b = 25 * L * (L + 1); return { L, a, b, p: (xp - a) / (b - a) }; }
  function rank(L) { const r = t('ranks'); return r[Math.min(r.length - 1, [1, 3, 5, 8, 11, 14, 18].filter((x) => L >= x).length - 1)]; }
  function streak(s) { s = s || st; let n = 0; const d = new Date(); if (!(s.days[day(d)] || {}).xp) d.setDate(d.getDate() - 1); while ((s.days[day(d)] || {}).xp) { n++; d.setDate(d.getDate() - 1); } return n; }
  function best(s) { const ks = Object.keys(s.days).filter((k) => s.days[k].xp).sort(); let b = 0, c = 0, prev = null; ks.forEach((k) => { const d = new Date(k + 'T12:00'); if (prev && (d - prev) / 864e5 < 1.5) c++; else c = 1; prev = d; b = Math.max(b, c); }); return b; }
  function today() { const d = st.days[day()] || { xp: 0, ls: [] }; return { n: (d.ls || []).length, goal: st.goal, xp: d.xp }; }

  /* ---- UI helpers ---- */
  function toastBox() { let b = document.getElementById('xpToasts'); if (!b) { b = document.createElement('div'); b.id = 'xpToasts'; document.body.appendChild(b); } return b; }
  function toast(html, cls) { const el = document.createElement('div'); el.className = 'xpt ' + (cls || ''); el.innerHTML = html; toastBox().appendChild(el); setTimeout(() => el.classList.add('out'), 2600); setTimeout(() => el.remove(), 3100); }
  function confetti(n) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const c = document.createElement('canvas'); c.className = 'confetti'; document.body.appendChild(c);
    const W = (c.width = innerWidth), H = (c.height = innerHeight), g = c.getContext('2d');
    const cols = ['#ff7a1a', '#ffc21a', '#22c55e', '#8b5cf6', '#ec4899', '#38bdf8'];
    const P = Array.from({ length: n || 120 }, () => ({ x: W / 2 + (Math.random() - 0.5) * W * 0.3, y: H * 0.35, vx: (Math.random() - 0.5) * 14, vy: -Math.random() * 13 - 4, s: 5 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, c: cols[(Math.random() * cols.length) | 0] }));
    let f = 0; (function tick() { g.clearRect(0, 0, W, H); P.forEach((p) => { p.vy += 0.35; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr; g.save(); g.translate(p.x, p.y); g.rotate(p.r); g.fillStyle = p.c; g.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * 0.66); g.restore(); }); if (++f < 150) requestAnimationFrame(tick); else c.remove(); })();
  }
  function refresh() {
    const w = document.getElementById('xpw'); if (!w) return;
    const lv = level(st.xp), sk = streak(), td = today();
    w.innerHTML = `<span class="xs ${sk ? 'on' : ''}" title="${sk} ${t('streak')}">🔥<b>${sk}</b></span><span class="xx" title="${t('total_xp')}">⚡<b>${st.xp}</b></span><span class="xl" style="--p:${Math.round(lv.p * 100)}" title="${t('lvl')} ${lv.L} — ${rank(lv.L)}"><b>${lv.L}</b></span>`;
    w.title = `${t('today')}: ${Math.min(td.n, td.goal)}/${td.goal}`;
    const bn = document.querySelector('.bnav [data-nav="me"] i'); if (bn) bn.textContent = sk ? '🔥' : '🏆';
  }
  function checkAch() {
    ACH.forEach((a) => { if (!st.ach[a.id] && a.ok(st)) { st.ach[a.id] = Date.now(); setTimeout(() => toast(`<span class="big">${a.ic}</span><div><small>${t('unlocked')}</small><b>${a[lang()][0]}</b></div>`, 'ach'), 900); } });
  }

  /* ---- earning ---- */
  function add(n, why, opt = {}) {
    if (n <= 0) return;
    const before = level(st.xp).L; st.xp += n;
    const d = (st.days[day()] = st.days[day()] || { xp: 0, ls: [] }); d.xp += n;
    if (!opt.silent) toast(`<span class="big">⚡</span><div><small>${why}</small><b>+${n} XP</b></div>`);
    const after = level(st.xp).L;
    if (after > before) { setTimeout(() => { toast(`<span class="big">🏆</span><div><small>${t('lvl_up')}</small><b>${t('lvl')} ${after} — ${rank(after)}</b></div>`, 'lvl'); confetti(160); }, 700); }
    save(); checkAch(); save(); refresh();
  }
  function studied(key) {
    const d = (st.days[day()] = st.days[day()] || { xp: 0, ls: [] });
    if (d.ls.includes(key)) return; d.ls.push(key); save();
    if (d.ls.length >= st.goal && !st.goalDone[day()]) { st.goalDone[day()] = 1; save(); setTimeout(() => { add(10, t('goal_done')); confetti(140); }, 1200); }
  }
  const lk = (g, n) => g + '-' + n;
  const rec = (g, n) => (st.L[lk(g, n)] = st.L[lk(g, n)] || { v: 0, best: 0, done: false, lab: 0 });
  function visit(g, n) { const r = rec(g, n); st.last = lk(g, n); if (!r.v) { r.v = 1; save(); add(5, t('visit')); } else save(); }
  function lab(id) {
    const e = window.Lab && Lab.exps[id]; if (!e) return;
    const ls = (e.lessons || []).map(([gr, n]) => ['g' + gr, n]);
    const h = (location.hash.match(/^#(g[678])-(\d+)/) || []); const cur = h[1] ? [h[1], +h[2]] : null;
    const tgt = cur && ls.some((x) => x[0] === cur[0] && x[1] === cur[1]) ? [cur] : ls.slice(0, 1);
    tgt.forEach(([g, n]) => { rec(g, n).lab = 1; studied(lk(g, n)); });
    // Takroriy tajriba ham bugungi vazifani bajaradi; mukofot XP takror berilmaydi.
    const labDay = (st.days[day()] = st.days[day()] || { xp: 0, ls: [] });
    labDay.labAttempts = labDay.labAttempts || [];
    if (!labDay.labAttempts.includes(id)) labDay.labAttempts.push(id);
    save();
    if (!st.labs[id]) { st.labs[id] = Date.now(); save(); add(15, t('lab') + ' 🧪'); } else { save(); refresh(); }
  }
  function quiz(g, n, score, total) {
    if (!Number.isFinite(score) || !Number.isFinite(total) || total <= 0 || score < 0 || score > total) return 0;
    const qDay = (st.days[day()] = st.days[day()] || { xp: 0, ls: [] });
    qDay.quizAttempts = qDay.quizAttempts || [];
    if (!qDay.quizAttempts.includes(lk(g, n))) qDay.quizAttempts.push(lk(g, n));
    save();
    const r = rec(g, n); const sc = Math.round((10 * score) / total);
    const gain = Math.max(0, sc - r.best) * 2; r.best = Math.max(r.best, sc); save();
    studied(lk(g, n));
    if (gain) add(gain, `${t('quiz')}: ${score}/${total}`);
    if (!r.done && score / total >= 0.7) { r.done = Date.now(); save(); setTimeout(() => { add(20, t('passed')); confetti(130); }, gain ? 900 : 0); }
    refresh();
    return gain;
  }
  function test(score) { add(score, t('test') + ` ✅`); }
  window.addEventListener('zk:labdone', (e) => lab(e.detail.id));

  function state(g, n) { const r = st.L[lk(g, n)]; return !r ? '' : r.done ? 'done' : 'started'; }
  function grade(g, total) { let done = 0, started = 0; for (let n = 1; n <= total; n++) { const s = state(g, n); if (s === 'done') done++; else if (s) started++; } return { done, started, total, p: Math.round((100 * done) / total) }; }

  /* ---- views ---- */
  function ring(p, inner, cls) { return `<div class="xring ${cls || ''}" style="--p:${Math.round(p * 100)}">${inner}</div>`; }
  function homeCard(ctx) {
    const lv = level(st.xp), td = today(), sk = streak();
    const lastK = st.last; let cont = '#g6-1', contT = `${ctx.t('nav_g6')} • 1`;
    if (lastK) { const [g, n] = lastK.split('-'); const L = ctx.B[g] && ctx.B[g].lessons[n - 1]; if (L) { cont = '#' + lastK; contT = `${g.slice(1)}-${lang() === 'uz' ? 'sinf' : 'gr.'} • ${n}. ${ctx.tr(L.t)}`; } }
    return `<div class="xpcard">
      <div class="xc-lv">${ring(lv.p, `<b>${lv.L}</b><small>${t('lvl')}</small>`, 'big')}<div><small class="xc-k">${t('your_path')}</small><h3>${rank(lv.L)}</h3><div class="xbar"><div style="width:${Math.round(lv.p * 100)}%"></div></div><small class="xc-m">⚡ ${st.xp} XP • ${lv.b - st.xp} XP ${t('next_lvl')}</small></div></div>
      <div class="xc-goal">${ring(Math.min(1, td.n / td.goal), `<b>${Math.min(td.n, td.goal)}/${td.goal}</b>`, 'goal')}<div><small class="xc-k">🎯 ${t('today')}</small><b class="xc-v">${td.goal} ${t('lessons_w')}</b><small class="xc-m">${t('hint_goal')}</small></div></div>
      <div class="xc-st"><span class="flame ${sk ? 'on' : ''}">🔥</span><div><b class="xc-v">${sk}</b><small class="xc-m">${t('streak')}</small></div></div>
      <a class="btn pri xc-go" href="${cont}"><span>▶ ${lastK ? t('cont') : t('start')}</span><small>${contT}</small></a>
    </div>`;
  }
  function page(app, ctx) {
    const lv = level(st.xp), sk = streak(), td = today();
    const g6 = grade('g6', ctx.B.g6.lessons.length), g7 = grade('g7', ctx.B.g7.lessons.length), g8 = ctx.B.g8 ? grade('g8', ctx.B.g8.lessons.length) : null;
    const gbox = (g, o) => `<a class="gprog ${g}" href="#${g}"><div class="gp-h"><b>${ctx.t('nav_' + g)}</b><span>${o.done} / ${o.total}</span></div><div class="xbar big"><div style="width:${o.p}%"></div><i style="width:${Math.round((100 * (o.done + o.started)) / o.total)}%"></i></div><small>⭐ ${o.done} ${t('st_done').toLowerCase()} • ▶ ${o.started} ${t('st_start').toLowerCase()}</small></a>`;
    app.innerHTML = `<div class="page-h me"><div class="wrap"><div class="crumbs"><a href="#home">${ctx.t('nav_home')}</a> / ${t('me')}</div><h1>🏆 ${t('me')}</h1><p>${t('me_p')}</p></div></div>
    <div class="wrap me-wrap">
      ${homeCard(ctx)}
      <div class="me-stats">
        <div class="mst"><span>⚡</span><b>${st.xp}</b><small>${t('total_xp')}</small></div>
        <div class="mst"><span>⭐</span><b>${nDone(st)}</b><small>${t('done_l')}</small></div>
        <div class="mst"><span>🧪</span><b>${Object.keys(st.labs).length}</b><small>${t('labs_w')}</small></div>
        <div class="mst"><span>🔥</span><b>${best(st)}</b><small>${t('best_streak')}</small></div>
      </div>
      <div class="me-grid">
        <div class="panel"><h3>📊 ${t('grade_prog')}</h3>${gbox('g6', g6)}${gbox('g7', g7)}${g8 ? gbox('g8', g8) : ''}
          <h3 style="margin-top:18px">🎯 ${t('goal_set')}</h3><div class="seg goalseg">${[1, 2, 3, 5].map((v) => `<button data-g="${v}" class="${st.goal === v ? 'on' : ''}">${v}</button>`).join('')}</div><small class="xc-m" style="margin-left:8px">${t('per_day')} • ${Math.min(td.n, td.goal)}/${td.goal}</small>
          <h3 style="margin-top:18px">💡 ${t('how')}</h3><ul class="xrules">
            <li><b>+5</b>${t('r_visit')}</li><li><b>+15</b>${t('r_lab')}</li><li><b>+2</b>${t('r_quiz')}</li><li><b>+20</b>${t('r_pass')}</li><li><b>+10</b>${t('r_goal')}</li><li><b>+1</b>${t('r_test')}</li></ul>
          <button class="btn sec sm" id="xpReset" style="margin-top:10px">🗑 ${t('reset')}</button></div>
        <div class="panel"><h3>🎖 ${t('ach')} <small style="color:var(--muted)">${Object.keys(st.ach).length}/${ACH.length}</small></h3><div class="achs">${ACH.map((a) => `<div class="achv ${st.ach[a.id] ? 'on' : ''}" title="${st.ach[a.id] ? '' : t('locked')}"><span>${a.ic}</span><b>${a[lang()][0]}</b><small>${a[lang()][1]}</small></div>`).join('')}</div><a href="#certificate" class="btn sec sm" style="margin-top:16px">📜 ${lang() === 'en' ? 'Personal certificate' : 'Shaxsiy sertifikat'}</a></div>
      </div>
    </div>`;
    app.querySelectorAll('.goalseg button').forEach((b) => (b.onclick = () => { st.goal = +b.dataset.g; save(); const d = st.days[day()]; if (d && d.ls.length >= st.goal && !st.goalDone[day()]) { st.goalDone[day()] = 1; save(); add(10, t('goal_done')); confetti(120); } page(app, ctx); refresh(); }));
    document.getElementById('xpReset').onclick = () => { if (confirm(t('reset_q'))) { st = { xp: 0, L: {}, labs: {}, days: {}, goal: 2, ach: {}, goalDone: {} }; save(); page(app, ctx); refresh(); } };
  }

  window.XP = { t, add, visit, lab, quiz, test, state, grade, homeCard, page, refresh, toast, confetti, level, rank, get s() { return st; } };
})();
