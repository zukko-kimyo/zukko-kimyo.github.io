/* Zukko Kimyo — student's personal dashboard.
   Uses the existing XP state. No fabricated statistics or public leaderboard. */
(function () {
  'use strict';
  const copy = {
    uz: {
      title: "Mening o‘quv markazim", sub: "Natijalaringiz, haftalik faollik va keyingi qadamingiz — bir joyda.",
      xp: "To‘plangan XP", done: "O‘zlashtirilgan dars", labs: "Ko‘rilgan tajriba", streak: "Ketma-ket kun",
      week: "Oxirgi 7 kun", weekSub: "Kun davomida ishlangan XP (shaxsiy statistika)",
      continue: "Darsni davom ettirish", start: "Birinchi darsni boshlash",
      grade: "Sinflar bo‘yicha", finished: "tugallangan",
      tasks: "Bugungi vazifalar", task1: "Bitta dars testini ishlash", task2: "Bitta 3D tajribani yakunlash",
      task3: "Kunlik dars maqsadiga yetish", ready: "Bajarildi", later: "Bajarilmagan",
      quick: "Tezkor kirish", qtest: "Test ishlash", qlab: "3D laboratoriya", qtable: "Davriy jadval",
      qbadge: "Yutuqlarim", qcert: "Sertifikat", qadmin: "Boshqaruv", qteacher: "O‘qituvchi paneli",
      caution: "Statistika shaxsiy o‘qish tarixingizdan hisoblangan."
    },
    en: {
      title: "My learning dashboard", sub: "Progress, weekly activity and your next step in one place.",
      xp: "Total XP", done: "Lessons mastered", labs: "Experiments completed", streak: "Day streak",
      week: "Last 7 days", weekSub: "XP earned per day (personal history)",
      continue: "Continue learning", start: "Start first lesson",
      grade: "By grade", finished: "completed",
      tasks: "Today's goals", task1: "Practise one lesson quiz", task2: "Complete one 3D experiment",
      task3: "Reach the daily lesson goal", ready: "Done", later: "Not yet",
      quick: "Quick actions", qtest: "Take a quiz", qlab: "3D laboratory", qtable: "Periodic table",
      qbadge: "My progress", qcert: "Certificate", qadmin: "Administration", qteacher: "Teacher panel",
      caution: "The figures come from your personal learning history."
    }
  };
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  const localDate = (d) => d.toLocaleDateString('sv');
  const safeNum = (x) => Math.max(0, Number(x) || 0);
  function render(ctx) {
    const xp = window.XP;
    if (!xp || !ctx || !ctx.B) return '';
    const L = copy[ctx.lang === 'en' ? 'en' : 'uz'], state = xp.s;
    const days = state.days || {}, now = new Date();
    const weeks = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      const key = localDate(d);
      const value = safeNum((days[key] || {}).xp);
      weeks.push({ key, value, text: d.toLocaleDateString(ctx.lang === 'en' ? 'en-US' : 'uz-UZ', { weekday: 'short' }) });
    }
    const max = Math.max(1, ...weeks.map((d) => d.value));
    const totalWeek = weeks.reduce((s, d) => s + d.value, 0);
    const today = days[localDate(now)] || {};
    const todayLessons = Array.isArray(today.ls) ? today.ls.length : 0;
    const goal = Math.max(1, Number(state.goal) || 2);
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    // Kunlik vazifalarda takror ishlangan test/tajriba ham hisobga olinadi.
    const labToday = (Array.isArray(today.labAttempts) && today.labAttempts.length > 0) || Object.values(state.labs || {}).some((ts) => typeof ts === 'number' && ts >= todayStart);
    const doneToday = (Array.isArray(today.quizAttempts) && today.quizAttempts.length > 0) || Object.values(state.L || {}).some((record) => record && record.done && Number(record.done) >= todayStart);
    const done = Object.values(state.L || {}).filter((v) => v && v.done).length;
    const labs = Object.keys(state.labs || {}).length;
    const level = xp.level(safeNum(state.xp));
    const completed = [doneToday, labToday, todayLessons >= goal];
    let cont = '#g6-1';
    let label = L.start;
    if (/^g[678]-[1-9]\d*$/.test(state.last || '')) {
      const [g, nStr] = state.last.split('-');
      const n = Number(nStr), book = ctx.B[g], lesson = book && book.lessons[n - 1];
      if (lesson) { cont = '#' + state.last; label = ctx.tr(lesson.t); }
    }
    const grades = ['g6', 'g7', 'g8'].filter((g) => ctx.B[g]);
    const quicks = [
      ['#tests', '✅', L.qtest], ['#lab', '🧪', L.qlab],
      ['#ptable', '🧩', L.qtable], ['#me', '🏆', L.qbadge], ['#certificate', '📜', L.qcert]
    ];
    if (window.ZKAuth && ZKAuth.isAdmin && ZKAuth.isAdmin()) quicks.push(['#admin', '🛡️', L.qadmin]);
    if (window.ZKAuth && ZKAuth.isStaff && ZKAuth.isStaff()) quicks.push(['#teacher', '👩‍🏫', L.qteacher]);
    const questNames = [L.task1, L.task2, L.task3];
    return `<section class="zk-dash blk" aria-label="${L.title}">
      <div class="wrap">
        <div class="zk-dash-head"><div><span class="zk-eyebrow">⚡ ${esc(L.title)}</span><h2>${esc(L.title)}</h2><p>${esc(L.sub)}</p></div>
          <a class="btn pri zk-dash-continue" href="${cont}">▶ ${esc(L.continue)} <span>${esc(label)}</span></a></div>
        <div class="zk-dash-kpis">
          ${[[ '⚡', state.xp || 0, L.xp ], [ '⭐', done, L.done ], [ '🧪', labs, L.labs ], [ '🔥', xp.s && typeof xp.s === 'object' ? (function(){ let n=0, d=new Date(now.getFullYear(), now.getMonth(), now.getDate()); if (!safeNum((days[localDate(d)]||{}).xp)) d.setDate(d.getDate()-1); while(safeNum((days[localDate(d)]||{}).xp)){n++;d.setDate(d.getDate()-1);} return n; })() : 0, L.streak ]].map(([ic,v,title]) => `<div class="zk-dash-kpi"><span class="zk-dash-icon">${ic}</span><strong>${safeNum(v)}</strong><small>${esc(title)}</small></div>`).join('')}
        </div>
        <div class="zk-dash-body">
          <section class="zk-dash-panel zk-dash-week"><div class="zk-dash-label"><div><h3>📊 ${esc(L.week)}</h3><p>${esc(L.weekSub)}</p></div><b>+${totalWeek} XP</b></div>
            <div class="zk-bars" role="img" aria-label="${esc(L.weekSub)}">
              ${weeks.map((d,i) => `<div class="zk-bar-col"><span class="zk-bar-value">${d.value || ''}</span><div class="zk-bar-track"><div class="zk-bar-fill ${i === 6 ? 'current' : ''}" style="height:${d.value ? Math.max(5, Math.round(100 * d.value / max)) : 0}%"></div></div><small>${esc(d.text)}</small></div>`).join('')}
            </div>
            <div class="zk-grade-progress"><h3>📚 ${esc(L.grade)}</h3>
              ${grades.map((g) => { const o=xp.grade(g, ctx.B[g].lessons.length); return `<a href="#${g}" class="zk-grade-line"><span>${g.slice(1)}-${ctx.lang === 'en' ? 'grade' : 'sinf'}</span><div role="progressbar" aria-valuenow="${o.p}" aria-valuemin="0" aria-valuemax="100" aria-label="${g}"><i style="width:${o.p}%"></i></div><b>${o.done}/${o.total}</b></a>`; }).join('')}
            </div>
          </section>
          <section class="zk-dash-panel zk-dash-quests"><div class="zk-dash-label"><div><h3>🎯 ${esc(L.tasks)}</h3><p>${completed.filter(Boolean).length}/3</p></div><span class="zk-level">Lv ${level.L}</span></div>
            ${questNames.map((name,i) => `<div class="zk-quest ${completed[i]?'done':''}"><span class="zk-quest-check" aria-hidden="true">${completed[i]?'✓':i+1}</span><div><b>${esc(name)}</b><small>${completed[i]?L.ready:L.later}</small></div></div>`).join('')}
            <div class="zk-goal-line"><div class="zk-goal-track"><div style="width:${Math.min(100, Math.round(todayLessons / goal * 100))}%"></div></div><small>${Math.min(todayLessons,goal)}/${goal}</small></div>
            <h3 class="zk-actions-title">🚀 ${esc(L.quick)}</h3>
            <div class="zk-quick-actions">${quicks.map(([href,ic,name])=>`<a href="${href}"><span>${ic}</span>${esc(name)}</a>`).join('')}</div>
          </section>
        </div>
        <p class="zk-dash-foot">${esc(L.caution)}</p>
      </div>
    </section>`;
  }
  window.ZKDashboard = { render };
})();
