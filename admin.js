/* Zukko Kimyo — administrator paneli (#admin). Faqat role === 'admin'.
 * Statistika lib/stats.js (ZKStats) da hisoblanadi; bu fayl faqat ko'rinish va amallar.
 * Bo'limlar: umumiy ko'rsatkichlar, 14 kunlik faollik, sinflar, eng faol o'quvchilar, qiyin darslar,
 * sayt sozlamalari (e'lon, ro'yxatdan o'tish), eksport, parolni o'zgartirish.
 */
(function () {
  const S = {
    uz: {
      h: '🛡 Administrator paneli', p: "Butun maktab bo'yicha statistika, sayt sozlamalari va xavfsizlik.", loading: 'Yuklanmoqda…', reload: '↻ Yangilash',
      k_students: "O'quvchilar", k_teachers: "O'qituvchilar", k_classes: 'Sinflar', k_pending: 'Arizalar', k_today: 'Bugun faol', k_week: '7 kunda faol', k_never: 'Hali kirmagan', k_mastered: "O'zlashtirilgan darslar", k_quiz: "O'rtacha test bahosi", k_xp: 'Jami XP',
      act_h: "Oxirgi 14 kunlik faollik", act_p: "Har kuni nechta o'quvchi XP olgani (dars ochgani, test yechgani, tajriba ko'rgani).", act_none: "Hali faollik yo'q.", students_n: "o'quvchi",
      cls_h: 'Sinflar taqqoslanishi', c_cls: 'Sinf', c_n: "O'quvchi", c_xp: "O'rtacha XP", c_done: "O'rtacha o'zlashtirilgan dars", c_quiz: "O'rtacha test", c_act: '7 kunda faol',
      top_h: "Eng faol o'quvchilar", t_name: 'Ism', t_cls: 'Sinf', t_xp: 'XP', t_done: 'Dars',
      hard_h: 'Eng qiyin darslar', hard_p: "Kamida 3 o'quvchi yechgan va o'rtacha bahosi eng past testlar — bu mavzularni qayta tushuntirish foydali.", h_lesson: 'Dars', h_avg: "O'rtacha (10 dan)", h_n: 'Yechganlar', hard_none: "Hali yetarli ma'lumot yo'q (har bir darsni kamida 3 o'quvchi yechishi kerak).",
      set_h: 'Sayt sozlamalari', ann_l: "E'lon (barcha foydalanuvchilarga sahifa tepasida va kirish oynasida ko'rinadi)", ann_ph: "Masalan: Ertaga 7A sinfida 12-dars bo'yicha test bo'ladi.", ann_on: "E'lonni ko'rsatish", reg_on: "O'quvchilar sinf kodi bilan o'zi ro'yxatdan o'ta oladi", save: 'Saqlash', saved: '✓ Saqlandi',
      exp_h: 'Eksport', exp_p: "Parollarsiz. CSV — Excel'da ochiladi; JSON — to'liq zaxira nusxa.", exp_csv: "⬇ Barcha o'quvchilar (CSV)", exp_json: '⬇ Zaxira nusxa (JSON)',
      sec_h: 'Xavfsizlik: parolni o\'zgartirish', sec_p: "Administrator parolini hech kimga yubormang va chatlarga yozmang. Parol boshqalarga ma'lum bo'lib qolgan bo'lsa, shu yerda darhol almashtiring.", old_pw: 'Hozirgi parol', new_pw: 'Yangi parol', new_pw2: 'Yangi parolni takrorlang', change: "Parolni o'zgartirish",
      e_short: "Yangi parol kamida 8 belgidan iborat bo'lsin.", e_match: 'Yangi parollar bir xil emas.', e_same: "Yangi parol eskisidan farq qilsin.", pw_ok: "✓ Parol o'zgartirildi. Keyingi safar yangi parol bilan kirasiz.",
      teacher_link: "👩‍🏫 O'qituvchi paneliga o'tish", grade: 'sinf',
    },
    en: {
      h: '🛡 Admin panel', p: 'School-wide statistics, site settings and security.', loading: 'Loading…', reload: '↻ Refresh',
      k_students: 'Students', k_teachers: 'Teachers', k_classes: 'Classes', k_pending: 'Requests', k_today: 'Active today', k_week: 'Active in 7 days', k_never: 'Never signed in', k_mastered: 'Lessons mastered', k_quiz: 'Average quiz', k_xp: 'Total XP',
      act_h: 'Activity in the last 14 days', act_p: 'How many students earned XP each day (opened a lesson, took a quiz, watched a lab).', act_none: 'No activity yet.', students_n: 'students',
      cls_h: 'Class comparison', c_cls: 'Class', c_n: 'Students', c_xp: 'Average XP', c_done: 'Average lessons mastered', c_quiz: 'Average quiz', c_act: 'Active in 7 days',
      top_h: 'Most active students', t_name: 'Name', t_cls: 'Class', t_xp: 'XP', t_done: 'Lessons',
      hard_h: 'Hardest lessons', hard_p: 'Quizzes taken by at least 3 students with the lowest average score — worth re-explaining.', h_lesson: 'Lesson', h_avg: 'Average (of 10)', h_n: 'Attempts', hard_none: 'Not enough data yet (each lesson needs at least 3 students).',
      set_h: 'Site settings', ann_l: 'Announcement (shown to everyone at the top of the page and on the sign-in screen)', ann_ph: 'For example: Tomorrow class 7A has a quiz on lesson 12.', ann_on: 'Show announcement', reg_on: 'Students can sign up themselves with a class code', save: 'Save', saved: '✓ Saved',
      exp_h: 'Export', exp_p: 'Without passwords. CSV opens in Excel; JSON is a full backup.', exp_csv: '⬇ All students (CSV)', exp_json: '⬇ Backup (JSON)',
      sec_h: 'Security: change password', sec_p: "Never send the admin password to anyone or paste it into chats. If someone else may know it, change it here right away.", old_pw: 'Current password', new_pw: 'New password', new_pw2: 'Repeat new password', change: 'Change password',
      e_short: 'The new password must be at least 8 characters.', e_match: 'New passwords do not match.', e_same: 'The new password must differ from the old one.', pw_ok: '✓ Password changed. Use the new password next time.',
      teacher_link: '👩‍🏫 Go to teacher panel', grade: 'grade',
    },
  };
  let L = 'uz', APP, CTX;
  const t = (k) => S[L][k] || k;
  const esc = (s) => window.ZKAuth.esc(s);
  const st = { users: null, prog: {}, settings: {} };

  function css() {
    if (document.getElementById('zkAdmCss')) return;
    const s = document.createElement('style'); s.id = 'zkAdmCss';
    s.textContent = `
.page-h.adm{background:linear-gradient(135deg,#0f172a,#7c3aed 60%,#ff7a1a)}
.ad-top{display:flex;gap:10px;flex-wrap:wrap;margin:22px 0 14px}.ad-top .sp{flex:1}
.ad-kpi{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px;margin-bottom:18px}
.ad-kpi div{background:#fff;border:2px solid var(--line);border-radius:18px;padding:14px 16px;box-shadow:0 3px 0 var(--line)}
.ad-kpi b{display:block;font-size:26px;font-weight:900;color:#1f1a2e;line-height:1.1}.ad-kpi span{font-size:12.5px;color:#8a7f73;font-weight:800}
.ad-kpi div.warn b{color:#dc2626}
.ad-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:18px}.ad-grid>.panel{margin:0;min-width:0}
.ad-tw{overflow-x:auto;-webkit-overflow-scrolling:touch}
@media (min-width:900px){.ad-kpi{grid-template-columns:repeat(5,1fr)}}
.ad-sub{font-size:13px;color:#7a6f66;font-weight:700;margin:-6px 0 12px}
.ad-chart{width:100%;height:auto;display:block}.ad-chart text{font:700 10px var(--f);fill:#8a7f73}.ad-chart .v{font:900 10.5px var(--f);fill:#4b4256}
@media (max-width:560px){.ad-chart text{font-size:11px}.ad-chart .v{font-size:11.5px}}
table.ad{width:100%;border-collapse:collapse;font-size:14px}table.ad th{text-align:left;font-size:11.5px;text-transform:uppercase;letter-spacing:.03em;color:#8a7f73;padding:8px;border-bottom:2px solid var(--line)}
table.ad td{padding:8px;border-bottom:1px solid #f4ece1}table.ad tr:last-child td{border-bottom:0}
.ad-q{display:inline-block;min-width:36px;text-align:center;border-radius:9px;padding:2px 8px;font-weight:900}.ad-q.g{background:#dcfce7;color:#15803d}.ad-q.m{background:#fef3c7;color:#b45309}.ad-q.b{background:#fee2e2;color:#b91c1c}
.ad-form label{display:block;font-weight:800;font-size:13.5px;color:#4b4256;margin:12px 0 6px}
.ad-form input[type=text],.ad-form input[type=password],.ad-form textarea{width:100%;box-sizing:border-box;border:2px solid #eadfce;border-radius:12px;padding:10px 12px;font:700 15px var(--f);background:#fffdf9;outline:none}
.ad-form textarea{min-height:70px;resize:vertical}.ad-form input:focus,.ad-form textarea:focus{border-color:#7c3aed;box-shadow:0 0 0 4px #ede4ff}
.ad-chk{display:flex;gap:10px;align-items:center;font-weight:800;font-size:14px;margin-top:12px;cursor:pointer}.ad-chk input{width:20px;height:20px;accent-color:#7c3aed}
.ad-msg{margin-top:10px;font-weight:800;font-size:13.5px}.ad-msg.ok{color:#15803d}.ad-msg.er{color:#c0262d}
.ad-mut{color:#a59a8e;font-weight:700}
@media (max-width:860px){.ad-grid{grid-template-columns:minmax(0,1fr)}}
@media (max-width:600px){.ad-kpi{grid-template-columns:1fr 1fr}.ad-kpi b{font-size:22px}table.ad{font-size:13px}table.ad th,table.ad td{padding:6px 4px}}
`;
    document.head.appendChild(s);
  }

  async function load() {
    const B = ZKAuth.backend;
    const [users, prog, settings] = await Promise.all([B.list('users'), B.list('progress'), B.get('settings', 'site').catch(() => null)]);
    st.users = users; st.prog = {}; prog.forEach((p) => (st.prog[p.id] = p)); st.settings = settings || {};
  }

  const qcls = (q) => (q == null ? '' : q >= 7 ? 'g' : q >= 5 ? 'm' : 'b');
  const fmt = (x) => (x == null ? '—' : String(x));

  function chart(data) {
    const narrow = (APP.clientWidth || innerWidth) < 560;
    const W = narrow ? 360 : 640, H = narrow ? 190 : 200, pl = 8, pr = 8, pt = 18, pb = 26, n = data.length;
    const max = Math.max(1, ...data.map((d) => d.active));
    const bw = (W - pl - pr) / n;
    const bars = data.map((d, i) => {
      const h = (d.active / max) * (H - pt - pb); const x = pl + i * bw + bw * 0.18; const y = H - pb - h; const w = bw * 0.64;
      const dd = d.date.slice(8, 10) + '.' + d.date.slice(5, 7);
      return `<g><title>${d.date}: ${d.active} ${t('students_n')}, ${d.xp} XP</title><rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${Math.max(h, d.active ? 2 : 0).toFixed(1)}" rx="5" fill="${i === n - 1 ? '#ff7a1a' : '#a78bfa'}"/>${d.active && (!narrow || bw > 22) ? `<text class="v" x="${(x + w / 2).toFixed(1)}" y="${(y - 4).toFixed(1)}" text-anchor="middle">${d.active}</text>` : ''}${!narrow || i % 2 === (n - 1) % 2 ? `<text x="${(x + w / 2).toFixed(1)}" y="${H - 8}" text-anchor="middle">${dd}</text>` : ''}</g>`;
    }).join('');
    return `<svg class="ad-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(t('act_h'))}"><line x1="${pl}" x2="${W - pr}" y1="${H - pb}" y2="${H - pb}" stroke="#eadfce" stroke-width="2"/>${bars}</svg>`;
  }

  function lessonTitle(g, n) {
    const L0 = window.BOOKS && BOOKS[g] && BOOKS[g].lessons[n - 1];
    return L0 ? CTX.tr(L0.t) : `${g}-${n}`;
  }

  function view() {
    const Z = window.ZKStats; const now = Date.now();
    const K = Z.kpis(st.users, st.prog, now);
    const act = Z.dailyActivity(st.users, st.prog, 14, now);
    const cls = Z.classSummary(st.users, st.prog, now);
    const top = Z.topStudents(st.users, st.prog, 10);
    const hard = Z.hardestLessons(st.users, st.prog, 3, 10);
    const set = st.settings;
    const kp = [['k_students', K.students], ['k_classes', K.classes], ['k_teachers', K.teachers], ['k_pending', K.pending, K.pending > 0], ['k_today', K.activeToday], ['k_week', K.active7], ['k_never', K.neverLoggedIn], ['k_mastered', K.mastered], ['k_quiz', fmt(K.avgQuiz)], ['k_xp', K.totalXp]];
    APP.querySelector('#adBody').innerHTML = `
      <div class="ad-kpi">${kp.map(([k, v, warn]) => `<div class="${warn ? 'warn' : ''}" data-k="${k}"><b>${esc(v)}</b><span>${t(k)}</span></div>`).join('')}</div>
      <div class="panel"><h3>📈 ${t('act_h')}</h3><div class="ad-sub">${t('act_p')}</div>${act.some((d) => d.active) ? chart(act) : `<div class="ad-mut">${t('act_none')}</div>`}</div>
      <div class="ad-grid">
        <div class="panel"><h3>🏫 ${t('cls_h')}</h3>${cls.length ? `<div class="ad-tw"><table class="ad" id="adCls"><thead><tr><th>${t('c_cls')}</th><th>${t('c_n')}</th><th>${t('c_xp')}</th><th>${t('c_done')}</th><th>${t('c_quiz')}</th><th>${t('c_act')}</th></tr></thead><tbody>
          ${cls.map((c) => `<tr><td><b>${esc(c.cls)}</b></td><td>${c.n}</td><td>${c.avgXp}</td><td>${c.avgDone}</td><td>${c.avgQuiz == null ? '—' : `<span class="ad-q ${qcls(c.avgQuiz)}">${c.avgQuiz}</span>`}</td><td>${c.active7}/${c.n}</td></tr>`).join('')}</tbody></table></div>` : `<div class="ad-mut">—</div>`}</div>
        <div class="panel"><h3>🏆 ${t('top_h')}</h3>${top.length ? `<div class="ad-tw"><table class="ad" id="adTop"><thead><tr><th>#</th><th>${t('t_name')}</th><th>${t('t_cls')}</th><th>${t('t_xp')}</th><th>${t('t_done')}</th></tr></thead><tbody>
          ${top.map((r, i) => `<tr><td class="ad-mut">${i + 1}</td><td><b>${esc(r.name)}</b></td><td>${esc(r.cls)}</td><td><b>${r.xp}</b></td><td>${r.done}</td></tr>`).join('')}</tbody></table></div>` : `<div class="ad-mut">—</div>`}</div>
      </div>
      <div class="panel" style="margin-top:18px"><h3>🧩 ${t('hard_h')}</h3><div class="ad-sub">${t('hard_p')}</div>${hard.length ? `<div class="ad-tw"><table class="ad" id="adHard"><thead><tr><th>${t('h_lesson')}</th><th>${t('h_avg')}</th><th>${t('h_n')}</th></tr></thead><tbody>
        ${hard.map((h) => `<tr><td><a href="#${h.g}-${h.n}"><b>${h.g.slice(1)}-${t('grade')}, ${h.n}</b> — ${esc(lessonTitle(h.g, h.n))}</a></td><td><span class="ad-q ${qcls(h.avg)}">${h.avg}</span></td><td>${h.attempts}</td></tr>`).join('')}</tbody></table></div>` : `<div class="ad-mut">${t('hard_none')}</div>`}</div>
      <div class="ad-grid" style="margin-top:18px">
        <div class="panel ad-form"><h3>⚙️ ${t('set_h')}</h3>
          <label for="adAnn">${t('ann_l')}</label><textarea id="adAnn" maxlength="300" placeholder="${esc(t('ann_ph'))}">${esc(set.announce || '')}</textarea>
          <label class="ad-chk"><input type="checkbox" id="adAnnOn" ${set.announceOn ? 'checked' : ''}> ${t('ann_on')}</label>
          <label class="ad-chk"><input type="checkbox" id="adReg" ${set.regOpen === false ? '' : 'checked'}> ${t('reg_on')}</label>
          <button class="btn pri sm" id="adSave" style="margin-top:14px">${t('save')}</button><div class="ad-msg" id="adSetMsg"></div></div>
        <div class="panel"><h3>📦 ${t('exp_h')}</h3><div class="ad-sub" style="margin-top:0">${t('exp_p')}</div>
          <div class="btns"><button class="btn sec sm" id="adCsv">${t('exp_csv')}</button><button class="btn sec sm" id="adJson">${t('exp_json')}</button></div></div>
      </div>
      <div class="panel ad-form" style="margin-top:18px;max-width:560px"><h3>🔐 ${t('sec_h')}</h3><div class="ad-sub" style="margin-top:0">${t('sec_p')}</div>
        <form id="adPw" autocomplete="on"><input type="text" name="username" autocomplete="username" value="${esc(ZKAuth.user.login)}" hidden>
        <label for="adOld">${t('old_pw')}</label><input type="password" id="adOld" autocomplete="current-password">
        <label for="adNew">${t('new_pw')}</label><input type="password" id="adNew" autocomplete="new-password">
        <label for="adNew2">${t('new_pw2')}</label><input type="password" id="adNew2" autocomplete="new-password">
        <button class="btn pri sm" id="adPwGo" style="margin-top:14px">${t('change')}</button><div class="ad-msg" id="adPwMsg"></div></form></div><div id="adWeekly" style="margin-top:18px"></div><div class="panel" id="adAttendance" style="margin-top:18px"></div>`;
    wire();
    if (window.ZKWeekly) ZKWeekly.mount(APP.querySelector('#adWeekly'), st.users, st.prog, L);
    if (window.ZKAttendance) ZKAttendance.mount(APP.querySelector('#adAttendance'), st.users, L);
  }

  function download(name, text, type) {
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name; document.body.appendChild(a); a.click(); a.remove();
  }

  function wire() {
    const $ = (id) => APP.querySelector('#' + id);
    $('adSave').onclick = async () => {
      const msg = $('adSetMsg'); msg.className = 'ad-msg'; msg.textContent = '';
      const doc = { announce: $('adAnn').value.trim().slice(0, 300), announceOn: $('adAnnOn').checked, regOpen: $('adReg').checked, updated: Date.now(), by: ZKAuth.user.uid };
      $('adSave').disabled = true;
      try { await ZKAuth.backend.set('settings', 'site', doc, true); st.settings = Object.assign({}, st.settings, doc); msg.className = 'ad-msg ok'; msg.textContent = t('saved'); ZKAuth.applySettings && ZKAuth.applySettings(st.settings); }
      catch (e) { msg.className = 'ad-msg er'; msg.textContent = '⚠ ' + ZKAuth.errMsg(e); }
      $('adSave').disabled = false;
    };
    $('adCsv').onclick = () => {
      const Z = window.ZKStats; const rows = [['Ism', 'Login', 'Sinf', 'Holat', 'XP', '6-sinf', '7-sinf', '8-sinf', "O'rtacha test", 'Tajribalar', 'Oxirgi faollik']];
      st.users.filter((u) => u.role === 'student').sort((a, b) => String(a.cls).localeCompare(String(b.cls), undefined, { numeric: true }) || String(a.name).localeCompare(String(b.name)))
        .forEach((u) => { const p = st.prog[u.id] || {}; rows.push([u.name, u.login, u.cls, u.status === 'pending' ? 'ariza' : 'faol', p.xp || 0, p.done6 || 0, p.done7 || 0, p.done8 || 0, p.quizAvg == null ? '' : p.quizAvg, p.labs || 0, p.updated ? Z.ymd(p.updated) : '']); });
      download(`zukko-kimyo-oquvchilar-${Z.ymd(Date.now())}.csv`, Z.toCSV(rows), 'text/csv;charset=utf-8');
    };
    $('adJson').onclick = () => {
      // Parollar (secrets) atayin kiritilmaydi
      const backup = { exported: new Date().toISOString(), users: st.users.map((u) => { const { id, login, name, role, cls, status, created } = u; return { id, login, name, role, cls, status: status || 'active', created }; }), progress: st.prog };
      download(`zukko-kimyo-zaxira-${window.ZKStats.ymd(Date.now())}.json`, JSON.stringify(backup, null, 1), 'application/json');
    };
    $('adPw').onsubmit = async (ev) => {
      ev.preventDefault();
      const msg = $('adPwMsg'); msg.className = 'ad-msg er'; msg.textContent = '';
      const o = $('adOld').value, n = $('adNew').value, n2 = $('adNew2').value;
      if (n.length < 8) { msg.textContent = t('e_short'); return; }
      if (n !== n2) { msg.textContent = t('e_match'); return; }
      if (n === o) { msg.textContent = t('e_same'); return; }
      $('adPwGo').disabled = true;
      try { await ZKAuth.backend.changeOwnPassword(o, n); msg.className = 'ad-msg ok'; msg.textContent = t('pw_ok'); $('adOld').value = $('adNew').value = $('adNew2').value = ''; }
      catch (e) { msg.textContent = '⚠ ' + ZKAuth.errMsg(e); }
      $('adPwGo').disabled = false;
    };
  }

  function render(app, ctx) {
    APP = app; CTX = ctx; L = ctx.lang === 'en' ? 'en' : 'uz'; css();
    app.innerHTML = `<div class="page-h adm"><div class="wrap"><div class="crumbs"><a href="#home">${ctx.t('nav_home')}</a> / ${t('h').replace(/^\S+\s/, '')}</div><h1>${t('h')}</h1><p>${t('p')}</p></div></div>
      <div class="wrap" style="padding-bottom:40px"><div class="ad-top"><button class="btn sec sm" id="adRe">${t('reload')}</button><div class="sp"></div><a class="btn sec sm" href="#teacher">${t('teacher_link')}</a></div>
      <div id="adBody"><div class="panel tc-empty" style="text-align:center">${t('loading')}</div></div></div>`;
    const go = () => load().then(view).catch((e) => { const b = app.querySelector('#adBody'); if (b) b.innerHTML = `<div class="panel">⚠ ${esc(ZKAuth.errMsg(e))}</div>`; });
    app.querySelector('#adRe').onclick = go;
    go();
  }

  window.ZKA = { render };
})();
