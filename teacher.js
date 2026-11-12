/* Zukko Kimyo — o'qituvchi paneli (#teacher)
 * Natijalar, o'quvchi qo'shish (bittalab yoki ro'yxat bilan), parol almashtirish, o'chirish,
 * login varaqalarini chop etish; administrator o'qituvchilarni boshqaradi.
 */
(function () {
  const S = {
    uz: {
      h: "👩‍🏫 O'qituvchi paneli", p: "O'quvchilar natijalari, hisoblar va parollar.", tab_res: '📊 Natijalar', tab_add: "➕ O'quvchi qo'shish", tab_tch: "🧑‍🏫 O'qituvchilar",
      all: 'Hammasi', students: "o'quvchi", none: "Hali o'quvchi yo'q. «O'quvchi qo'shish» bo'limidan boshlang.", loading: 'Yuklanmoqda…', reload: '↻ Yangilash',
      c_n: '№', c_name: 'Ism', c_login: 'Login', c_xp: 'XP / daraja', c_g6: '6-sinf', c_g7: '7-sinf', c_g8: '8-sinf', c_quiz: "O'rtacha test", c_last: 'Oxirgi faollik', c_act: '',
      never: 'kirmagan', today: 'bugun', yday: 'kecha', days: 'kun oldin', lessons: 'dars',
      det: 'Batafsil', pw: '🔑 Yangi parol', del: "🗑 O'chirish", del_q: "{n} hisobini o'chirasizmi? Natijalari ham o'chadi.", pw_ok: 'Yangi parol', pw_q: "{n} uchun yangi parol yaratilsinmi?",
      csv: '⬇ CSV (Excel)', print_cards: '🖨 Login varaqalari',
      add_cls: 'Sinf', add_cls_ph: 'masalan 7A', add_names: "O'quvchilar ismi (har qatorda bitta)", add_names_ph: 'Aliyev Vali\nKarimova Malika\n…', add_go: 'Hisoblarni yaratish',
      add_note: "Login va parol avtomatik yaratiladi. Tayyor bo'lgach, varaqalarni chop etib o'quvchilarga tarqating.", e_cls: 'Sinfni kiriting.', e_names: 'Kamida bitta ism kiriting.',
      creating: 'Yaratilmoqda', done_n: '{n} ta hisob yaratildi', fail_n: '{n} ta xato', created_h: 'Yaratilgan hisoblar', keep: "⚠ Parollarni hozir chop eting yoki saqlang — keyinroq ham «Natijalar» bo'limida ko'rish mumkin.",
      show_pw: "👁 Parollarni ko'rsatish", hide_pw: '🙈 Parollarni yashirish', pw_col: 'Parol',
      t_name: "O'qituvchi ismi", t_login: 'Login', t_pass: 'Parol', t_add: "O'qituvchi qo'shish", t_list: "O'qituvchilar ro'yxati", e_login: "Login faqat lotin harflari, raqam, nuqta va chiziqchadan iborat bo'lsin.",
      e_taken: 'Bu login band.', ok_t: "O'qituvchi qo'shildi", site: 'Sayt', card_h: 'Zukko Kimyo — kirish maʼlumotlari',
      d_labs: 'tajriba', d_visited: 'ochilgan dars', d_best: 'eng yaxshi', d_back: '← Orqaga', d_none: "Bu sinfda hali faollik yo'q.", d_streak: 'XP',
      self: '(siz)', grade: 'sinf',
    },
    en: {
      h: '👩‍🏫 Teacher panel', p: 'Student results, accounts and passwords.', tab_res: '📊 Results', tab_add: '➕ Add students', tab_tch: '🧑‍🏫 Teachers',
      all: 'All', students: 'students', none: 'No students yet. Start with “Add students”.', loading: 'Loading…', reload: '↻ Refresh',
      c_n: '#', c_name: 'Name', c_login: 'Login', c_xp: 'XP / level', c_g6: 'Grade 6', c_g7: 'Grade 7', c_g8: 'Grade 8', c_quiz: 'Avg quiz', c_last: 'Last active', c_act: '',
      never: 'never', today: 'today', yday: 'yesterday', days: 'days ago', lessons: 'lessons',
      det: 'Details', pw: '🔑 New password', del: '🗑 Delete', del_q: 'Delete the account of {n}? Their results will be deleted too.', pw_ok: 'New password', pw_q: 'Create a new password for {n}?',
      csv: '⬇ CSV (Excel)', print_cards: '🖨 Login cards',
      add_cls: 'Class', add_cls_ph: 'e.g. 7A', add_names: 'Student names (one per line)', add_names_ph: 'Aliyev Vali\nKarimova Malika\n…', add_go: 'Create accounts',
      add_note: 'Logins and passwords are generated automatically. Print the cards and hand them out.', e_cls: 'Enter the class.', e_names: 'Enter at least one name.',
      creating: 'Creating', done_n: '{n} accounts created', fail_n: '{n} failed', created_h: 'Created accounts', keep: '⚠ Print or save the passwords now — you can also see them later under “Results”.',
      show_pw: '👁 Show passwords', hide_pw: '🙈 Hide passwords', pw_col: 'Password',
      t_name: 'Teacher name', t_login: 'Login', t_pass: 'Password', t_add: 'Add teacher', t_list: 'Teachers', e_login: 'Login may contain only Latin letters, digits, dot and dash.',
      e_taken: 'This login is taken.', ok_t: 'Teacher added', site: 'Site', card_h: 'Zukko Chemistry — sign-in details',
      d_labs: 'labs', d_visited: 'lessons opened', d_best: 'best', d_back: '← Back', d_none: 'No activity in this class yet.', d_streak: 'XP',
      self: '(you)', grade: 'grade',
    },
  };
  let L = 'uz';
  const t = (k, o) => { let s = S[L][k] || k; if (o) Object.keys(o).forEach((x) => (s = s.replace('{' + x + '}', o[x]))); return s; };
  const esc = (s) => window.ZKAuth.esc(s);
  const st = { tab: 'res', cls: '', users: null, prog: {}, secrets: {}, showPw: false, created: null, detail: null, busy: false };

  /* ---------- yordamchilar ---------- */
  const TR = { 'ʻ': '', 'ʼ': '', "'": '', '`': '', 'ў': 'o', 'ғ': 'g', 'қ': 'q', 'ҳ': 'h', 'ш': 'sh', 'ч': 'ch', 'ж': 'j', 'ё': 'yo', 'ю': 'yu', 'я': 'ya', 'ц': 's', 'щ': 'sh', 'ы': 'i', 'э': 'e', 'ъ': '', 'ь': '', 'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'x' };
  function latin(s) { return String(s).toLowerCase().split('').map((c) => (TR[c] != null ? TR[c] : c)).join('').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/g, ''); }
  function mkLogin(name, cls, taken) {
    const parts = String(name).trim().split(/\s+/).filter(Boolean);
    // O'zbekcha tartib odatda "Familiya Ism" — ism ikkinchi so'z bo'lsa, uni olamiz
    const first = latin(parts.length > 1 ? parts[1] : parts[0]) || 'oquvchi', last = latin(parts.length > 1 ? parts[0] : '') || '';
    const c = latin(cls);
    let base = (first + (last ? '.' + last[0] : '') + (c ? '.' + c : '')).slice(0, 28), lg = base, k = 2;
    while (taken.has(lg)) lg = base + k++;
    taken.add(lg); return lg;
  }
  function mkPass() { const a = 'abcdefghjkmnpqrstuvwxyz', d = '23456789'; const r = (s) => s[(crypto.getRandomValues(new Uint32Array(1))[0]) % s.length]; return r(a) + r(a) + r(a) + r(d) + r(d) + r(d) + r(d); }
  const okLogin = (s) => /^[a-z0-9][a-z0-9._-]{1,30}$/.test(s);
  function ago(ts) {
    if (!ts) return `<span class="tc-mut">${t('never')}</span>`;
    const d0 = new Date(); d0.setHours(0, 0, 0, 0); const d = Math.floor((d0 - new Date(ts).setHours(0, 0, 0, 0)) / 864e5);
    return d <= 0 ? t('today') : d === 1 ? t('yday') : `${d} ${t('days')}`;
  }
  const lv = (xp) => { let l = 1; while (xp >= 25 * l * (l + 1)) l++; return l; };
  const nLessons = (g) => (window.BOOKS && BOOKS[g] ? BOOKS[g].lessons.length : 0);
  const bar = (n, tot, col) => `<div class="tc-bar" title="${n}/${tot}"><i style="width:${tot ? Math.round((100 * n) / tot) : 0}%;background:${col}"></i></div><small>${n}/${tot}</small>`;
  const sortCls = (a, b) => a.localeCompare(b, undefined, { numeric: true });

  /* ---------- maʼlumot ---------- */
  async function loadAll() {
    const Bk = ZKAuth.backend;
    const [users, prog, secrets] = await Promise.all([Bk.list('users'), Bk.list('progress'), (ZKAuth.isAdmin() ? Bk.list('secrets') : Bk.list('secrets', 'role', 'student')).catch(() => [])]);
    st.users = users; st.prog = {}; prog.forEach((p) => (st.prog[p.id] = p)); st.secrets = {}; secrets.forEach((s) => (st.secrets[s.id] = s));
  }
  const students = () => (st.users || []).filter((u) => u.role === 'student');
  const classes = () => [...new Set(students().map((u) => u.cls || '—'))].sort(sortCls);

  /* ---------- CSS ---------- */
  function css() {
    if (document.getElementById('zkTchCss')) return;
    const s = document.createElement('style'); s.id = 'zkTchCss';
    s.textContent = `
.page-h.tch{background:linear-gradient(135deg,#4c1d95,#db2777)}
.tc-tabs{display:flex;gap:8px;flex-wrap:wrap;margin:22px 0 16px}.tc-tabs button{border:2px solid var(--line);background:#fff;border-radius:14px;padding:10px 16px;font:800 14.5px var(--f);color:#4b4256;cursor:pointer;box-shadow:0 3px 0 var(--line)}
.tc-tabs button.on{background:#7c3aed;border-color:#7c3aed;color:#fff;box-shadow:0 3px 0 #5b21b6}
.tc-chips{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px}.tc-chips button{border:2px solid var(--line);background:#fff;border-radius:99px;padding:6px 14px;font:800 13.5px var(--f);color:#4b4256;cursor:pointer}.tc-chips button.on{background:#fdf2ff;border-color:#c026d3;color:#a21caf}.tc-chips small{opacity:.6;margin-left:4px}
.tc-tools{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:12px}.tc-tools .sp{flex:1}
.tc-wrap{overflow-x:auto;border:2px solid var(--line);border-radius:18px;background:#fff}
table.tc{width:100%;border-collapse:collapse;font-size:14px;min-width:860px}
table.tc th{text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:.03em;color:#8a7f73;padding:12px 10px;border-bottom:2px solid var(--line);background:#fffaf3;white-space:nowrap}
table.tc td{padding:10px;border-bottom:1px solid #f4ece1;vertical-align:middle}table.tc tr:last-child td{border-bottom:0}
table.tc tr:hover td{background:#fffcf7}
.tc-name{font-weight:800;color:#1f1a2e;cursor:pointer}.tc-name:hover{color:#7c3aed;text-decoration:underline}
.tc-mut{color:#a59a8e;font-weight:700}
.tc-bar{display:inline-block;width:64px;height:8px;border-radius:9px;background:#f1e8dc;overflow:hidden;vertical-align:middle;margin-right:6px}.tc-bar i{display:block;height:100%;border-radius:9px}
.tc-q{display:inline-block;min-width:38px;text-align:center;border-radius:9px;padding:2px 8px;font-weight:900}.tc-q.g{background:#dcfce7;color:#15803d}.tc-q.m{background:#fef3c7;color:#b45309}.tc-q.b{background:#fee2e2;color:#b91c1c}
.tc-act{display:flex;gap:4px;justify-content:flex-end}.tc-act button{border:0;background:#f6efe6;border-radius:9px;padding:6px 9px;font:800 12.5px var(--f);cursor:pointer;white-space:nowrap}.tc-act button:hover{background:#efe3d3}
.tc-pw{font-family:ui-monospace,Menlo,Consolas,monospace;font-weight:700;background:#f6f1ff;border-radius:7px;padding:2px 7px;color:#5b21b6}
.tc-form{display:grid;grid-template-columns:200px 1fr;gap:14px;align-items:start}
.tc-form label{font-weight:800;font-size:13.5px;color:#4b4256;display:block;margin-bottom:6px}
.tc-form input,.tc-form textarea{width:100%;box-sizing:border-box;border:2px solid #eadfce;border-radius:12px;padding:11px 12px;font:700 15px var(--f);background:#fffdf9;outline:none}.tc-form textarea{min-height:220px;resize:vertical;line-height:1.5}
.tc-form input:focus,.tc-form textarea:focus{border-color:#7c3aed;box-shadow:0 0 0 4px #ede4ff}
.tc-note{font-size:13px;color:#7a6f66;font-weight:700;margin:10px 0}
.tc-err{color:#c0262d;font-weight:800;margin-top:8px}
.tc-prog{height:10px;border-radius:9px;background:#f1e8dc;overflow:hidden;margin:10px 0}.tc-prog i{display:block;height:100%;background:#7c3aed;transition:width .2s}
.tc-empty{text-align:center;padding:40px 16px;color:#8a7f73;font-weight:800}
.tc-det-h{display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin-bottom:14px}.tc-det-h .av{width:54px;height:54px;border-radius:16px;display:grid;place-items:center;color:#fff;font-weight:900;font-size:24px;background:linear-gradient(135deg,#8b5cf6,#ec4899)}
.tc-kpi{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin:12px 0 18px}.tc-kpi div{background:#fff;border:2px solid var(--line);border-radius:16px;padding:12px 14px}.tc-kpi b{display:block;font-size:22px;font-weight:900;color:#1f1a2e}.tc-kpi span{font-size:12.5px;color:#8a7f73;font-weight:800}
.tc-ls{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:6px}.tc-ls div{display:flex;gap:8px;align-items:center;background:#fff;border:1.5px solid #f1e8dc;border-radius:11px;padding:7px 10px;font-size:13px;font-weight:700}
.tc-ls .n{width:26px;height:26px;border-radius:8px;display:grid;place-items:center;color:#fff;font-weight:900;font-size:12px;flex:none}.tc-ls .s{margin-left:auto;font-weight:900}.tc-ls div.off{opacity:.45}
.tc-ok{background:#ecfdf3;border:2px solid #bbf7d0;color:#166534;border-radius:14px;padding:12px 14px;font-weight:800;margin:10px 0}
@media (max-width:760px){.tc-wrap:has(.resp){border:0;background:none;overflow:visible}table.tc.resp{min-width:0}table.tc.resp thead{display:none}
table.tc.resp tr{display:grid;grid-template-columns:1fr 1fr;gap:8px 14px;background:#fff;border:2px solid var(--line);border-radius:16px;padding:12px 14px;margin-bottom:10px;box-shadow:0 3px 0 var(--line)}
table.tc.resp td{border:0;padding:0;background:none!important}table.tc.resp td:first-child{display:none}table.tc.resp td.nm,table.tc.resp td.act{grid-column:1/-1}table.tc.resp td.nm{font-size:16px}table.tc.resp td.lg{grid-column:1/-1;margin-top:-6px}
table.tc.resp td[data-l]:before{content:attr(data-l);display:block;font-size:10.5px;text-transform:uppercase;letter-spacing:.03em;color:#a59a8e;font-weight:800;margin-bottom:2px}
table.tc.resp .tc-act{justify-content:flex-start}table.tc.resp .tc-bar{width:calc(100% - 48px)}
.tc-form{grid-template-columns:1fr!important}.tc-tabs button{flex:1;padding:9px 8px;font-size:13px}}
@media print{body *{visibility:hidden}#tcPrint,#tcPrint *{visibility:visible}#tcPrint{position:absolute;left:0;top:0;width:100%}}
#tcPrint{display:none}
.tc-cards{display:grid;grid-template-columns:1fr 1fr;gap:0}.tc-card{border:1.5px dashed #999;padding:14px 16px;font-family:Arial,sans-serif;break-inside:avoid;page-break-inside:avoid}.tc-card h4{margin:0 0 4px;font-size:13px;color:#555}.tc-card b{font-size:17px}.tc-card table{margin-top:6px;font-size:15px}.tc-card td{padding:2px 10px 2px 0}.tc-card code{font-size:17px;font-weight:700}
`;
    document.head.appendChild(s);
  }

  /* ---------- render ---------- */
  let APP, CTX;
  function render(app, ctx) {
    APP = app; CTX = ctx; L = ctx.lang === 'en' ? 'en' : 'uz'; css();
    const admin = ZKAuth.isAdmin();
    app.innerHTML = `<div class="page-h tch"><div class="wrap"><div class="crumbs"><a href="#home">${ctx.t('nav_home')}</a> / ${t('h').replace(/^\S+\s/, '')}</div><h1>${t('h')}</h1><p>${t('p')}</p></div></div>
      <div class="wrap" style="padding-bottom:40px">
        <div class="tc-tabs">${['res', 'add'].concat(admin ? ['tch'] : []).map((k) => `<button data-t="${k}" class="${st.tab === k ? 'on' : ''}">${t('tab_' + k)}</button>`).join('')}</div>
        <div id="tcBody"><div class="tc-empty">${t('loading')}</div></div>
      </div><div id="tcPrint"></div>`;
    app.querySelectorAll('.tc-tabs button').forEach((b) => (b.onclick = () => { st.tab = b.dataset.t; st.detail = null; render(APP, CTX); }));
    const go = () => (st.tab === 'res' ? (st.detail ? detail() : results()) : st.tab === 'add' ? addView() : teachers());
    if (!st.users) loadAll().then(go).catch((e) => { body().innerHTML = `<div class="tc-empty">⚠ ${esc(ZKAuth.errMsg(e))}</div>`; });
    else go();
  }
  const body = () => document.getElementById('tcBody');

  function qcls(q) { return q == null ? '' : q >= 7 ? 'g' : q >= 5 ? 'm' : 'b'; }
  function rows(list) {
    return list.map((u, i) => {
      const p = st.prog[u.id] || {}; const xp = p.xp || 0; const sec = st.secrets[u.id];
      return `<tr data-id="${u.id}"><td class="tc-mut">${i + 1}</td>
        <td class="nm"><span class="tc-name" data-det="${u.id}">${esc(u.name || u.login)}</span></td>
        <td class="lg"><code>${esc(u.login)}</code>${st.showPw && sec ? ` <span class="tc-pw">${esc(sec.pw)}</span>` : ''}</td>
        <td data-l="${t('c_xp')}"><b>${xp}</b> <span class="tc-mut">· L${lv(xp)}</span></td>
        <td data-l="${t('c_quiz')}">${p.quizAvg != null ? `<span class="tc-q ${qcls(p.quizAvg)}">${p.quizAvg}</span>` : '<span class="tc-mut">—</span>'}</td>
        <td data-l="${t('c_g6')}">${bar(p.done6 || 0, nLessons('g6'), CTX.GC.g6)}</td><td data-l="${t('c_g7')}">${bar(p.done7 || 0, nLessons('g7'), CTX.GC.g7)}</td><td data-l="${t('c_g8')}">${bar(p.done8 || 0, nLessons('g8'), CTX.GC.g8)}</td>
        <td data-l="${t('c_last')}">${ago(p.updated)}</td>
        <td class="act"><div class="tc-act"><button data-pw="${u.id}">${t('pw')}</button><button data-del="${u.id}">${t('del')}</button></div></td></tr>`;
    }).join('');
  }
  function results() {
    const cs = classes(); if (st.cls && !cs.includes(st.cls)) st.cls = '';
    const all = students();
    const list = all.filter((u) => !st.cls || (u.cls || '—') === st.cls).sort((a, b) => sortCls(a.cls || '', b.cls || '') || String(a.name).localeCompare(String(b.name)));
    if (!all.length) { body().innerHTML = `<div class="panel tc-empty">${t('none')}</div>`; return; }
    body().innerHTML = `<div class="tc-chips"><button data-c="" class="${!st.cls ? 'on' : ''}">${t('all')}<small>${all.length}</small></button>${cs.map((c) => `<button data-c="${esc(c)}" class="${st.cls === c ? 'on' : ''}">${esc(c)}<small>${all.filter((u) => (u.cls || '—') === c).length}</small></button>`).join('')}</div>
      <div class="tc-tools"><button class="btn sec sm" id="tcRe">${t('reload')}</button><button class="btn sec sm" id="tcPw">${st.showPw ? t('hide_pw') : t('show_pw')}</button><div class="sp"></div><button class="btn sec sm" id="tcCsv">${t('csv')}</button><button class="btn sec sm" id="tcCards">${t('print_cards')}</button></div>
      <div class="tc-wrap"><table class="tc resp"><thead><tr><th>${t('c_n')}</th><th>${t('c_name')}</th><th>${t('c_login')}</th><th>${t('c_xp')}</th><th>${t('c_quiz')}</th><th>${t('c_g6')}</th><th>${t('c_g7')}</th><th>${t('c_g8')}</th><th>${t('c_last')}</th><th></th></tr></thead><tbody>${rows(list)}</tbody></table></div>`;
    body().querySelectorAll('.tc-chips button').forEach((b) => (b.onclick = () => { st.cls = b.dataset.c; results(); }));
    document.getElementById('tcRe').onclick = async () => { body().style.opacity = 0.5; try { await loadAll(); } finally { body().style.opacity = 1; } results(); };
    document.getElementById('tcPw').onclick = () => { st.showPw = !st.showPw; results(); };
    document.getElementById('tcCsv').onclick = () => csv(list);
    document.getElementById('tcCards').onclick = () => cards(list.map((u) => ({ name: u.name, login: u.login, cls: u.cls, pw: (st.secrets[u.id] || {}).pw || '—' })));
    wireActions(body());
  }
  function wireActions(root) {
    root.querySelectorAll('[data-det]').forEach((b) => (b.onclick = () => { st.detail = b.dataset.det; detail(); scrollTo({ top: 0 }); }));
    root.querySelectorAll('[data-pw]').forEach((b) => (b.onclick = () => resetPw(b.dataset.pw, b)));
    root.querySelectorAll('[data-del]').forEach((b) => (b.onclick = () => delUser(b.dataset.del, b)));
  }

  async function resetPw(id, btn) {
    const u = st.users.find((x) => x.id === id); const sec = st.secrets[id];
    if (!u || !confirm(t('pw_q', { n: u.name || u.login }))) return;
    if (!sec) { alert('⚠ ' + (L === 'en' ? 'Stored password not found; the account cannot be changed from the site.' : "Saqlangan parol topilmadi — bu hisobni saytdan o'zgartirib bo'lmaydi.")); return; }
    btn.disabled = true; const np = mkPass();
    try {
      await ZKAuth.backend.changePassword(ZKAuth.emailOf(u.login), sec.pw, np);
      await ZKAuth.backend.set('secrets', id, { pw: np, role: u.role, login: u.login }, true);
      st.secrets[id] = Object.assign({}, sec, { pw: np });
      alert(`${t('pw_ok')}: ${u.login} → ${np}`);
      if (st.tab === 'tch') teachers(); else if (st.detail) detail(); else results();
    } catch (e) { alert('⚠ ' + ZKAuth.errMsg(e)); btn.disabled = false; }
  }
  async function delUser(id, btn) {
    const u = st.users.find((x) => x.id === id); if (!u || id === ZKAuth.user.uid) return;
    if (!confirm(t('del_q', { n: u.name || u.login }))) return;
    btn.disabled = true; const sec = st.secrets[id]; const Bk = ZKAuth.backend;
    try {
      if (sec) await Bk.deleteAccount(ZKAuth.emailOf(u.login), sec.pw);
      await Promise.all([Bk.del('progress', id).catch(() => {}), Bk.del('secrets', id).catch(() => {})]);
      await Bk.del('users', id);
      st.users = st.users.filter((x) => x.id !== id); delete st.prog[id]; delete st.secrets[id]; st.detail = null;
      if (st.tab === 'tch') teachers(); else results();
    } catch (e) { alert('⚠ ' + ZKAuth.errMsg(e)); btn.disabled = false; }
  }

  function detail() {
    const u = (st.users || []).find((x) => x.id === st.detail); if (!u) { st.detail = null; return results(); }
    const p = st.prog[u.id] || {}; let s = {}; try { s = JSON.parse(p.data || '{}'); } catch (e) { }
    const Ls = s.L || {}; const xp = p.xp || 0;
    const grades = ['g6', 'g7', 'g8'].filter((g) => window.BOOKS && BOOKS[g]);
    const sec = st.secrets[u.id];
    body().innerHTML = `<button class="btn sec sm" id="tcBack">${t('d_back')}</button>
      <div class="panel" style="margin-top:12px"><div class="tc-det-h"><div class="av">${esc((u.name || u.login)[0] || '?').toUpperCase()}</div><div><h2 style="margin:0;font-size:22px">${esc(u.name || u.login)}</h2><div class="tc-mut"><code>${esc(u.login)}</code> · ${esc(u.cls || '')} ${sec ? `· <span class="tc-pw">${esc(sec.pw)}</span>` : ''}</div></div><div style="flex:1"></div><div class="tc-act"><button data-pw="${u.id}">${t('pw')}</button><button data-del="${u.id}">${t('del')}</button></div></div>
      <div class="tc-kpi"><div><b>${xp}</b><span>XP · L${lv(xp)}</span></div><div><b>${(p.done6 || 0) + (p.done7 || 0) + (p.done8 || 0)}</b><span>⭐ ${L === 'en' ? 'lessons mastered' : "o'zlashtirilgan dars"}</span></div><div><b>${p.visited || 0}</b><span>${t('d_visited')}</span></div><div><b>${p.quizAvg != null ? p.quizAvg : '—'}</b><span>${t('c_quiz')} (${p.quizN || 0})</span></div><div><b>${p.labs || 0}</b><span>🧪 ${t('d_labs')}</span></div><div><b style="font-size:16px">${ago(p.updated)}</b><span>${t('c_last')}</span></div></div>
      ${grades.map((g) => { const bk = BOOKS[g]; const items = bk.lessons.map((Lz, i) => ({ n: i + 1, r: Ls[g + '-' + (i + 1)], t: CTX.tr(Lz.t) })).filter((x) => x.r); return `<h3 style="margin:16px 0 8px">${g.slice(1)}-${t('grade')} <small class="tc-mut">${items.filter((x) => x.r.done).length}/${bk.lessons.length}</small></h3>${items.length ? `<div class="tc-ls">${items.map((x) => `<div class="${x.r.done ? '' : 'off'}"><span class="n" style="background:${CTX.GC[g]}">${x.n}</span><span>${esc(x.t)}</span><span class="s">${x.r.best ? `<span class="tc-q ${qcls(x.r.best)}">${x.r.best}/10</span>` : '👁'}</span></div>`).join('')}</div>` : `<div class="tc-mut">—</div>`}`; }).join('')}
      </div>`;
    document.getElementById('tcBack').onclick = () => { st.detail = null; results(); };
    wireActions(body());
  }

  function csv(list) {
    const head = [t('c_name'), t('c_login'), t('add_cls'), 'XP', 'Level', t('c_g6'), t('c_g7'), t('c_g8'), t('c_quiz'), t('d_labs'), t('c_last')];
    const lines = [head].concat(list.map((u) => { const p = st.prog[u.id] || {}; return [u.name, u.login, u.cls, p.xp || 0, lv(p.xp || 0), p.done6 || 0, p.done7 || 0, p.done8 || 0, p.quizAvg != null ? p.quizAvg : '', p.labs || 0, p.updated ? new Date(p.updated).toLocaleDateString('sv') : '']; }));
    const txt = '﻿' + lines.map((r) => r.map((x) => `"${String(x == null ? '' : x).replace(/"/g, '""')}"`).join(';')).join('\r\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([txt], { type: 'text/csv;charset=utf-8' })); a.download = `zukko-kimyo-${st.cls || 'all'}-${new Date().toLocaleDateString('sv')}.csv`; document.body.appendChild(a); a.click(); a.remove();
  }
  function cards(list) {
    const url = location.origin + location.pathname;
    const P = document.getElementById('tcPrint');
    P.innerHTML = `<div class="tc-cards">${list.map((x) => `<div class="tc-card"><h4>${t('card_h')}</h4><b>${esc(x.name || '')}</b> ${x.cls ? `<span style="color:#666">· ${esc(x.cls)}</span>` : ''}<table><tr><td>${t('site')}:</td><td>${esc(url)}</td></tr><tr><td>${t('c_login')}:</td><td><code>${esc(x.login)}</code></td></tr><tr><td>${t('pw_col')}:</td><td><code>${esc(x.pw)}</code></td></tr></table></div>`).join('')}</div>`;
    P.style.display = 'block'; setTimeout(() => { print(); P.style.display = 'none'; }, 60);
  }

  /* ---------- o'quvchi qo'shish ---------- */
  function addView() {
    const cs = classes();
    body().innerHTML = `<div class="panel"><div class="tc-form">
        <div><label for="tcCls">${t('add_cls')}</label><input id="tcCls" list="tcClsL" placeholder="${t('add_cls_ph')}" value="${esc(st.lastCls || '')}"><datalist id="tcClsL">${cs.map((c) => `<option value="${esc(c)}">`).join('')}</datalist></div>
        <div><label for="tcNames">${t('add_names')}</label><textarea id="tcNames" placeholder="${t('add_names_ph')}"></textarea></div>
      </div><div class="tc-note">${t('add_note')}</div><button class="btn pri" id="tcGo">${t('add_go')}</button><div id="tcAddOut"></div></div>
      ${st.created ? createdBlock(st.created) : ''}`;
    document.getElementById('tcGo').onclick = createStudents;
    wireCreated();
  }
  function createdBlock(c) {
    return `<div class="panel"><h3>✅ ${t('created_h')} — ${esc(c.cls)}</h3><div class="tc-note">${t('keep')}</div>
      <div class="tc-tools"><button class="btn pri sm" id="tcCrPrint">${t('print_cards')}</button><button class="btn sec sm" id="tcCrCsv">${t('csv')}</button></div>
      <div class="tc-wrap"><table class="tc" style="min-width:0"><thead><tr><th>${t('c_n')}</th><th>${t('c_name')}</th><th>${t('c_login')}</th><th>${t('pw_col')}</th></tr></thead><tbody>${c.list.map((x, i) => `<tr><td class="tc-mut">${i + 1}</td><td><b>${esc(x.name)}</b></td><td><code>${esc(x.login)}</code></td><td>${x.err ? `<span class="tc-err">⚠ ${esc(x.err)}</span>` : `<span class="tc-pw">${esc(x.pw)}</span>`}</td></tr>`).join('')}</tbody></table></div></div>`;
  }
  function wireCreated() {
    const c = st.created; if (!c) return;
    const ok = c.list.filter((x) => !x.err);
    const p = document.getElementById('tcCrPrint'); if (p) p.onclick = () => cards(ok.map((x) => Object.assign({ cls: c.cls }, x)));
    const v = document.getElementById('tcCrCsv'); if (v) v.onclick = () => { const txt = '﻿' + [[t('c_name'), t('c_login'), t('pw_col'), t('add_cls')]].concat(ok.map((x) => [x.name, x.login, x.pw, c.cls])).map((r) => r.map((y) => `"${String(y).replace(/"/g, '""')}"`).join(';')).join('\r\n'); const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([txt], { type: 'text/csv;charset=utf-8' })); a.download = `loginlar-${c.cls}.csv`; document.body.appendChild(a); a.click(); a.remove(); };
  }
  async function createStudents() {
    const out = document.getElementById('tcAddOut'); const cls = document.getElementById('tcCls').value.trim().toUpperCase().replace(/\s+/g, '');
    const names = document.getElementById('tcNames').value.split('\n').map((s) => s.trim().replace(/\s+/g, ' ')).filter(Boolean);
    if (!cls) { out.innerHTML = `<div class="tc-err">${t('e_cls')}</div>`; return; }
    if (!names.length) { out.innerHTML = `<div class="tc-err">${t('e_names')}</div>`; return; }
    if (st.busy) return; st.busy = true; st.lastCls = cls;
    const go = document.getElementById('tcGo'); go.disabled = true;
    const taken = new Set((st.users || []).map((u) => u.login));
    const res = []; const Bk = ZKAuth.backend;
    out.innerHTML = `<div class="tc-prog"><i style="width:0"></i></div><div class="tc-note" id="tcPN"></div>`;
    for (let i = 0; i < names.length; i++) {
      const name = names[i]; const login = mkLogin(name, cls, taken); const pw = mkPass();
      document.getElementById('tcPN').textContent = `${t('creating')}… ${i + 1}/${names.length} — ${name}`;
      try {
        const uid = await Bk.createAccount(ZKAuth.emailOf(login), pw);
        const doc = { login, name, role: 'student', cls, created: Date.now(), by: ZKAuth.user.uid };
        await Bk.set('users', uid, doc);
        await Bk.set('secrets', uid, { pw, role: 'student', login });
        st.users.push(Object.assign({ id: uid }, doc)); st.secrets[uid] = { pw, role: 'student', login };
        res.push({ name, login, pw });
      } catch (e) { res.push({ name, login, pw, err: ZKAuth.errMsg(e) }); }
      out.querySelector('.tc-prog i').style.width = `${Math.round((100 * (i + 1)) / names.length)}%`;
      if (/too-many/.test((res[res.length - 1].err || ''))) await new Promise((r) => setTimeout(r, 1500));
    }
    st.busy = false; st.created = { cls, list: res };
    const nOk = res.filter((x) => !x.err).length, nBad = res.length - nOk;
    addView();
    document.getElementById('tcAddOut').innerHTML = `<div class="tc-ok">✅ ${t('done_n', { n: nOk })}${nBad ? ` · <span class="tc-err">${t('fail_n', { n: nBad })}</span>` : ''}</div>`;
    document.getElementById('tcNames').value = '';
  }

  /* ---------- o'qituvchilar (admin) ---------- */
  function teachers() {
    if (!ZKAuth.isAdmin()) { st.tab = 'res'; return results(); }
    const list = (st.users || []).filter((u) => u.role === 'teacher' || u.role === 'admin');
    body().innerHTML = `<div class="panel"><h3>${t('t_add')}</h3><div class="tc-form" style="grid-template-columns:1fr 1fr 1fr">
        <div><label>${t('t_name')}</label><input id="tcTN" placeholder="Karimova Dilnoza"></div>
        <div><label>${t('t_login')}</label><input id="tcTL" placeholder="dilnoza.k" autocapitalize="none" spellcheck="false"></div>
        <div><label>${t('t_pass')}</label><input id="tcTP" value="${mkPass()}"></div></div>
        <button class="btn pri" id="tcTGo" style="margin-top:14px">${t('t_add')}</button><div id="tcTOut"></div></div>
      <div class="panel"><h3>${t('t_list')}</h3><div class="tc-wrap"><table class="tc" style="min-width:0"><thead><tr><th>${t('c_name')}</th><th>${t('c_login')}</th><th>${t('pw_col')}</th><th></th></tr></thead><tbody>
      ${list.map((u) => `<tr><td><b>${esc(u.name || u.login)}</b> ${u.id === ZKAuth.user.uid ? `<span class="tc-mut">${t('self')}</span>` : ''}${u.role === 'admin' ? ' <span class="tc-mut">· admin</span>' : ''}</td><td><code>${esc(u.login)}</code></td><td>${st.secrets[u.id] ? `<span class="tc-pw">${esc(st.secrets[u.id].pw)}</span>` : '<span class="tc-mut">—</span>'}</td><td>${u.role === 'teacher' ? `<div class="tc-act"><button data-pw="${u.id}">${t('pw')}</button><button data-del="${u.id}">${t('del')}</button></div>` : ''}</td></tr>`).join('')}
      </tbody></table></div></div>`;
    const tl = document.getElementById('tcTL'), tn = document.getElementById('tcTN');
    tn.oninput = () => { if (!tl.dataset.touched) { const p = tn.value.trim().split(/\s+/); tl.value = (latin(p[1] || p[0] || '') + (p[1] ? '.' + latin(p[0])[0] : '')).slice(0, 24); } };
    tl.oninput = () => (tl.dataset.touched = 1);
    document.getElementById('tcTGo').onclick = async () => {
      const out = document.getElementById('tcTOut'); const name = tn.value.trim(), login = ZKAuth.normLogin(tl.value), pw = document.getElementById('tcTP').value.trim();
      if (!okLogin(login)) { out.innerHTML = `<div class="tc-err">${t('e_login')}</div>`; return; }
      if ((st.users || []).some((u) => u.login === login)) { out.innerHTML = `<div class="tc-err">${t('e_taken')}</div>`; return; }
      if (pw.length < 6) { out.innerHTML = `<div class="tc-err">${ZKAuth.t('e_weak')}</div>`; return; }
      const b = document.getElementById('tcTGo'); b.disabled = true;
      try {
        const uid = await ZKAuth.backend.createAccount(ZKAuth.emailOf(login), pw);
        const doc = { login, name: name || login, role: 'teacher', cls: '', created: Date.now(), by: ZKAuth.user.uid };
        await ZKAuth.backend.set('users', uid, doc); await ZKAuth.backend.set('secrets', uid, { pw, role: 'teacher', login });
        st.users.push(Object.assign({ id: uid }, doc)); st.secrets[uid] = { pw, role: 'teacher', login };
        teachers(); document.getElementById('tcTOut').innerHTML = `<div class="tc-ok">✅ ${t('ok_t')}: <code>${esc(login)}</code> / <span class="tc-pw">${esc(pw)}</span></div>`;
      } catch (e) { b.disabled = false; out.innerHTML = `<div class="tc-err">⚠ ${esc(/email-already/.test(e.code || '') ? t('e_taken') : ZKAuth.errMsg(e))}</div>`; }
    };
    wireActions(body());
  }

  window.ZKT = { render };
})();
