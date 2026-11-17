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
    ru: {
      h: '🛡 Панель администратора', p: 'Статистика по всей школе, настройки сайта и безопасность.', loading: 'Загрузка…', reload: '↻ Обновить',
      k_students: 'Ученики', k_teachers: 'Учителя', k_classes: 'Классы', k_pending: 'Заявки', k_today: 'Активны сегодня', k_week: 'Активны за 7 дней', k_never: 'Ещё не входили', k_mastered: 'Освоено уроков', k_quiz: 'Средний балл теста', k_xp: 'Всего XP',
      act_h: 'Активность за последние 14 дней', act_p: 'Сколько учеников получали XP каждый день (открыли урок, прошли тест, посмотрели опыт).', act_none: 'Активности пока нет.', students_n: 'учеников',
      cls_h: 'Сравнение классов', c_cls: 'Класс', c_n: 'Ученики', c_xp: 'Средний XP', c_done: 'В среднем освоено уроков', c_quiz: 'Средний тест', c_act: 'Активны за 7 дней',
      top_h: 'Самые активные ученики', t_name: 'Имя', t_cls: 'Класс', t_xp: 'XP', t_done: 'Уроки',
      hard_h: 'Самые сложные уроки', hard_p: 'Тесты, которые прошли не менее 3 учеников, с самым низким средним баллом — эти темы стоит объяснить ещё раз.', h_lesson: 'Урок', h_avg: 'Средний (из 10)', h_n: 'Прошли', hard_none: 'Пока недостаточно данных (каждый урок должны пройти не менее 3 учеников).',
      set_h: 'Настройки сайта', ann_l: 'Объявление (видно всем пользователям вверху страницы и в окне входа)', ann_ph: 'Например: завтра в 7A классе будет тест по 12-му уроку.', ann_on: 'Показывать объявление', reg_on: 'Ученики могут сами регистрироваться по коду класса', save: 'Сохранить', saved: '✓ Сохранено',
      exp_h: 'Экспорт', exp_p: 'Без паролей. CSV открывается в Excel; JSON — полная резервная копия.', exp_csv: '⬇ Все ученики (CSV)', exp_json: '⬇ Резервная копия (JSON)',
      sec_h: 'Безопасность: смена пароля', sec_p: 'Никому не отправляйте пароль администратора и не пишите его в чатах. Если пароль мог стать известен другим, немедленно смените его здесь.', old_pw: 'Текущий пароль', new_pw: 'Новый пароль', new_pw2: 'Повторите новый пароль', change: 'Сменить пароль',
      e_short: 'Новый пароль должен содержать не менее 8 символов.', e_match: 'Новые пароли не совпадают.', e_same: 'Новый пароль должен отличаться от старого.', pw_ok: '✓ Пароль изменён. В следующий раз входите с новым паролем.',
      teacher_link: '👩‍🏫 Перейти в панель учителя', grade: 'класс',
    },
  };
  let L = 'uz', APP, CTX;
  // Uch tilli tanlov: ru tarjimasi bo'lmasa o'zbekchaga qaytadi.
  const L3 = (uz, ru, en) => (L === 'ru' ? ru : L === 'en' ? en : uz);
  const t = (k) => (S[L] || S.uz)[k] || k;
  const esc = (s) => window.ZKAuth.esc(s);
  // O'quvchi o'zi yozadigan natija qiymatlari ekranga chiqishdan oldin songa aylantiriladi (HTML/kod kiritilmasin).
  const num = (v, max = 1e7) => { v = Number(v); return Number.isFinite(v) && v >= 0 ? Math.min(v, max) : 0; };
  const cleanProg = (p) => Object.assign({}, p, { xp: num(p.xp), done6: num(p.done6, 500), done7: num(p.done7, 500), done8: num(p.done8, 500),
    visited: num(p.visited, 1e4), labs: num(p.labs, 1e4), quizN: num(p.quizN, 1e4), updated: num(p.updated, 1e14),
    quizAvg: p.quizAvg == null || p.quizAvg === '' || !Number.isFinite(Number(p.quizAvg)) ? null : Math.min(10, Math.max(0, Number(p.quizAvg))) });
  const st = { users: null, prog: {}, settings: {} };

  function css() {
    if (document.getElementById('zkAdmCss')) return;
    const s = document.createElement('style'); s.id = 'zkAdmCss';
    s.textContent = `
.page-h.adm{background:linear-gradient(135deg,#0f172a,var(--zk-teal,#00555a) 60%,#ff7a1a)}
.ad-top{display:flex;gap:10px;flex-wrap:wrap;margin:22px 0 14px}.ad-top .sp{flex:1}
.ad-kpi{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px;margin-bottom:18px}
.ad-kpi div{background:#fff;border:2px solid var(--line);border-radius:18px;padding:14px 16px;box-shadow:0 3px 0 var(--line)}
.ad-kpi b{display:block;font-size:26px;font-weight:900;color:#1f1a2e;line-height:1.1}.ad-kpi span{font-size:12.5px;color:var(--zk-muted,#5b6b6c);font-weight:800}
.ad-kpi div.warn b{color:#dc2626}
.ad-directory{margin:18px 0}.ad-directory .panel{max-height:410px;overflow:auto}.ad-muted-login{display:block;font-size:11px;color:var(--muted);font-weight:600}.ad-insights{margin:18px 0}.ad-bars{display:grid;gap:12px;margin-top:16px}.ad-bar-row{display:grid;grid-template-columns:minmax(48px,90px) minmax(0,1fr) 55px;align-items:center;gap:10px;font-size:13px;font-weight:800}.ad-bar-track{height:12px;border-radius:99px;background:#f1ecfb;overflow:hidden}.ad-bar-track i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#8b5cf6,#20bfc7)}
.ad-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:18px}.ad-grid>.panel{margin:0;min-width:0}
.ad-tw{overflow-x:auto;-webkit-overflow-scrolling:touch}
@media (min-width:900px){.ad-kpi{grid-template-columns:repeat(5,1fr)}}
.ad-sub{font-size:13px;color:#7a6f66;font-weight:700;margin:-6px 0 12px}
.ad-chart{width:100%;height:auto;display:block}.ad-chart text{font:700 10px var(--f);fill:var(--zk-muted,#5b6b6c)}.ad-chart .v{font:900 10.5px var(--f);fill:var(--zk-ink,#0f2a2c)}
@media (max-width:560px){.ad-chart text{font-size:11px}.ad-chart .v{font-size:11.5px}}
table.ad{width:100%;border-collapse:collapse;font-size:14px}table.ad th{text-align:left;font-size:11.5px;text-transform:uppercase;letter-spacing:.03em;color:var(--zk-muted,#5b6b6c);padding:8px;border-bottom:2px solid var(--line)}
table.ad td{padding:8px;border-bottom:1px solid var(--zk-hair,#e5ecea)}table.ad tr:last-child td{border-bottom:0}
.ad-q{display:inline-block;min-width:36px;text-align:center;border-radius:9px;padding:2px 8px;font-weight:900}.ad-q.g{background:#dcfce7;color:#15803d}.ad-q.m{background:#fef3c7;color:#b45309}.ad-q.b{background:#fee2e2;color:#b91c1c}
.ad-form label{display:block;font-weight:800;font-size:13.5px;color:var(--zk-ink,#0f2a2c);margin:12px 0 6px}
.ad-form input[type=text],.ad-form input[type=password],.ad-form textarea{width:100%;box-sizing:border-box;border:1px solid var(--zk-hair,#d9e4e2);border-radius:14px;padding:10px 12px;font:600 15px var(--f);background:var(--zk-surface,#fff);color:var(--zk-ink,#0f2a2c);outline:none}
.ad-form textarea{min-height:70px;resize:vertical}.ad-form input:focus,.ad-form textarea:focus{border-color:var(--zk-teal,#00555a);box-shadow:0 0 0 4px var(--zk-teal-50,#e3f2f0)}
.ad-chk{display:flex;gap:10px;align-items:center;font-weight:800;font-size:14px;margin-top:12px;cursor:pointer}.ad-chk input{width:20px;height:20px;accent-color:var(--zk-teal,#00555a)}
.ad-msg{margin-top:10px;font-weight:800;font-size:13.5px}.ad-msg.ok{color:#15803d}.ad-msg.er{color:#c0262d}
.ad-mut{color:var(--zk-muted,#55696b);font-weight:700}
@media (max-width:860px){.ad-grid{grid-template-columns:minmax(0,1fr)}}
@media (max-width:600px){.ad-kpi{grid-template-columns:1fr 1fr}.ad-kpi b{font-size:22px}table.ad{font-size:13px}table.ad th,table.ad td{padding:6px 4px}}

/* Zukko Kimyo 2.0 — distinctly redesigned dashboard */
.page-h.adm{background:radial-gradient(circle at 85% 15%,rgba(88,211,239,.24),transparent 28%),linear-gradient(115deg,#21105d,#5124a6 60%,#8056e9);padding:46px 0 42px}
.page-h.adm h1{font-size:clamp(27px,3.5vw,41px);letter-spacing:-.025em}
.page-h.adm p{color:#e9e0ff;max-width:700px;font-weight:700}
#adBody{--admin-accent:var(--zk-teal,#00555a)}
#adBody .ad-kpi{grid-template-columns:repeat(5,minmax(0,1fr));gap:14px;margin:18px 0 26px}
#adBody .ad-kpi>div{min-width:0;padding:19px 18px;border:1px solid var(--zk-hair,#e5ecea)!important;border-radius:24px;background:var(--zk-surface-2,#fff);box-shadow:var(--zk-glass-shadow,0 10px 30px rgba(0,40,42,.07))}
#adBody .ad-kpi b{font-size:clamp(25px,2.7vw,36px);color:var(--zk-ink,#0f2a2c);letter-spacing:-.03em}
#adBody .ad-kpi span{font-size:12px;color:var(--zk-muted,#5b6b6c)}
#adBody .panel{border:1px solid var(--zk-hair,#e5ecea);border-radius:28px;background:var(--zk-surface-2,#fff);box-shadow:var(--zk-glass-shadow,0 8px 32px rgba(0,40,42,.07));padding:22px}
#adBody .panel h3{font-size:19px;color:var(--zk-ink,#0f2a2c);margin-bottom:12px}
#adBody .ad-directory{gap:18px}
#adBody .ad-directory .panel{max-height:460px}
#adBody .ad-directory table.ad tbody tr:hover{background:var(--zk-teal-50,#eef7f6)}
#adBody table.ad th{background:var(--zk-teal-50,#eef7f6);color:var(--zk-muted,#5b6b6c);position:sticky;top:0}
#adBody table.ad td{border-bottom-color:var(--zk-hair,#e5ecea)}
#adBody .ad-bar-track{height:15px;background:var(--zk-track,#e6eeed)}
#adBody .ad-bar-track i{background:linear-gradient(90deg,var(--zk-teal,#00555a),var(--zk-mint,#3cc9a6))}
.ad-top .btn{border-radius:13px}
@media(max-width:1100px){#adBody .ad-kpi{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media(max-width:760px){#adBody .ad-kpi{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}#adBody .panel{padding:15px;border-radius:18px}.page-h.adm{padding:30px 0}#adBody .ad-directory{grid-template-columns:minmax(0,1fr)}}
@media(max-width:360px){#adBody .ad-kpi>div{padding:12px}}

`;
    document.head.appendChild(s);
  }

  /* ---------- Darsliklar (fanlar): PDF → sahifalar → Firebase (content/…), ADR-0008 ----------
     Administrator darslik PDF faylini tanlaydi; brauzer har bir sahifani rasmga aylantirib (pdf.js) yuklaydi.
     Sahifalarni o'qish huquqi firestore.rules'da: bepul mavzular, fan obunasi, xodim. */
  const PDFJS = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/';
  let pdfjsP = null;
  const loadPdfjs = () => pdfjsP || (pdfjsP = import(PDFJS + 'pdf.min.mjs').then((m) => { m.GlobalWorkerOptions.workerSrc = PDFJS + 'pdf.worker.min.mjs'; return m; }).catch((e) => { pdfjsP = null; throw e; }));
  const BK = {
    uz: { h: '📚 Darsliklar (fanlar)', p: 'Darslik PDF faylini tanlang — sahifalar rasmga aylantirilib Firebase’ga yuklanadi. O‘quvchilar dastlabki bepul mavzularni va obunasi bor fanni ko‘radi. Yuklash bir necha daqiqa oladi, sahifani yopmang.',
      book: 'Darslik', st: 'Holat', none: 'Yuklanmagan', done: '{n} sahifa · {d}', pick: 'PDF tanlash', bad: 'Bu fayl tanlangan darslikka mos kelmaydi: {n} sahifa bor, kamida {m} kerak.', go: '{i} / {n} sahifa…', ok: 'Yuklandi: {n} sahifa', again: 'Bu darslik avval yuklangan. Qayta yuklab, eskisini almashtirasizmi?', cdn: 'PDF o‘quvchi (pdf.js) yuklanmadi — internetni tekshiring.' },
    en: { h: '📚 Textbooks (subjects)', p: 'Choose the textbook PDF — pages are turned into images and uploaded to Firebase. Students see the free first topics and the subjects they subscribe to. Uploading takes a few minutes; keep this page open.',
      book: 'Textbook', st: 'Status', none: 'Not uploaded', done: '{n} pages · {d}', pick: 'Choose PDF', bad: 'This file does not match the chosen textbook: it has {n} pages, at least {m} needed.', go: '{i} / {n} pages…', ok: 'Uploaded: {n} pages', again: 'This textbook was uploaded before. Upload again and replace it?', cdn: 'The PDF reader (pdf.js) did not load — check the internet.' },
    ru: { h: '📚 Учебники (предметы)', p: 'Выберите PDF-файл учебника — страницы будут преобразованы в изображения и загружены в Firebase. Ученики видят первые бесплатные темы и предметы, на которые оформлена подписка. Загрузка занимает несколько минут, не закрывайте страницу.',
      book: 'Учебник', st: 'Статус', none: 'Не загружен', done: '{n} стр. · {d}', pick: 'Выбрать PDF', bad: 'Этот файл не подходит к выбранному учебнику: в нём {n} стр., нужно не менее {m}.', go: '{i} / {n} стр.…', ok: 'Загружено: {n} стр.', again: 'Этот учебник уже загружен. Загрузить заново и заменить старый?', cdn: 'Не удалось загрузить программу просмотра PDF (pdf.js) — проверьте подключение к интернету.' },
  };
  const bk = (k, o) => { let x = (BK[L] || BK.uz)[k]; if (o) Object.keys(o).forEach((q) => (x = x.replace('{' + q + '}', o[q]))); return x; };
  async function booksPanel() {
    const host = APP.querySelector('#adBooks'); if (!host || !window.ZKSubjects) { if (host) host.remove(); return; }
    const rows = []; ZKSubjects.list.forEach((sj) => (sj.books || []).forEach((b) => rows.push({ sj, b, id: `${sj.id}-${b.grade}-${b.part}` })));
    const idx = await Promise.all(rows.map((r) => ZKAuth.backend.get('contentIndex', r.id).catch(() => null)));
    if (!host.isConnected) return;
    const fmt = (ms) => (window.ZKSub ? ZKSub.fmtDate(ms) : new Date(ms).toLocaleDateString());
    host.innerHTML = `<h3>${bk('h')}</h3><div class="ad-sub">${bk('p')}</div><div class="ad-tw"><table class="ad ad-books"><thead><tr><th>${bk('book')}</th><th>${bk('st')}</th><th><span class="zk-sr">${bk('pick')}</span></th></tr></thead><tbody>
      ${rows.map((r, i) => `<tr data-bk="${r.id}"><td><b>${esc(r.sj.name[L] || r.sj.name.uz)} · ${r.b.grade}-${t('grade')}</b><div class="ad-mut">${esc(r.b.title)}</div></td>
        <td class="bk-st" role="status">${idx[i] ? `<span class="ad-ok">✓ ${bk('done', { n: Number(idx[i].pages) || 0, d: fmt(idx[i].at) })}</span>` : `<span class="ad-mut">${bk('none')}</span>`}</td>
        <td><label class="btn sec sm bk-pick">${bk('pick')}<input type="file" accept="application/pdf,.pdf" data-i="${i}" class="zk-sr"></label></td></tr>`).join('')}</tbody></table></div>`;
    host.querySelectorAll('input[type=file]').forEach((inp) => (inp.onchange = () => { const f = inp.files && inp.files[0]; const i = +inp.dataset.i; inp.value = ''; if (f) uploadBook(rows[i], f, !!idx[i], host.querySelector(`tr[data-bk="${rows[i].id}"] .bk-st`), inp); }));
  }
  async function uploadBook(row, file, had, out, inp) {
    if (had && !confirm(bk('again'))) return;
    const B = ZKAuth.backend, { sj, b } = row, pageTopic = {};
    b.topics.forEach((tp, i) => tp.p.forEach((p) => { pageTopic[p] = i + 1; }));
    const printed = Object.keys(pageTopic).map(Number).sort((x, y) => x - y);
    const lbl = inp.closest('label'); lbl.classList.add('busy'); inp.disabled = true;
    const say = (h) => { out.innerHTML = h; };
    try {
      let pdfjs; try { pdfjs = await loadPdfjs(); } catch (e) { throw new Error(bk('cdn')); }
      const pdf = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
      const need = printed[printed.length - 1] - b.offset;
      if (pdf.numPages < need) throw new Error(bk('bad', { n: pdf.numPages, m: need }));
      const cv = document.createElement('canvas'), cx = cv.getContext('2d');
      for (let k = 0; k < printed.length; k++) {
        const p = printed[k], page = await pdf.getPage(p - b.offset), v1 = page.getViewport({ scale: 1 });
        const vp = page.getViewport({ scale: 900 / v1.width });
        cv.width = Math.round(vp.width); cv.height = Math.round(vp.height);
        cx.fillStyle = '#fff'; cx.fillRect(0, 0, cv.width, cv.height);
        await page.render({ canvasContext: cx, viewport: vp }).promise;
        let q = 0.72, img = cv.toDataURL('image/webp', q);
        if (!img.startsWith('data:image/webp')) img = cv.toDataURL('image/jpeg', 0.78); // Safari webp yoza olmaydi
        while (img.length > 950000 && q > 0.35) { q -= 0.1; img = img.startsWith('data:image/webp') ? cv.toDataURL('image/webp', q) : cv.toDataURL('image/jpeg', q); }
        await B.set('content', `${row.id}-${p}`, { s: sj.id, g: b.grade, part: b.part, p, n: pageTopic[p], img, w: cv.width, h: cv.height, at: Date.now(), by: ZKAuth.user.uid });
        say(`<span class="ad-mut">${bk('go', { i: k + 1, n: printed.length })}</span><progress max="${printed.length}" value="${k + 1}"></progress>`);
      }
      await B.set('contentIndex', row.id, { pages: printed.length, from: printed[0], to: printed[printed.length - 1], at: Date.now(), by: ZKAuth.user.uid, file: String(file.name || '').slice(0, 120) });
      say(`<span class="ad-ok">✓ ${bk('ok', { n: printed.length })}</span>`);
    } catch (e) {
      say(`<span class="ad-err">⚠ ${esc((e && e.message) || ZKAuth.errMsg(e))}</span>`);
    } finally { lbl.classList.remove('busy'); inp.disabled = false; }
  }

  async function load() {
    const B = ZKAuth.backend;
    const [users, prog, settings] = await Promise.all([B.list('users'), B.list('progress'), B.get('settings', 'site').catch(() => null)]);
    st.users = users; st.prog = {}; prog.forEach((p) => (st.prog[p.id] = cleanProg(p))); st.settings = settings || {};
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
      return `<g><title>${esc(d.date)}: ${Number(d.active) || 0} ${t('students_n')}, ${Number(d.xp) || 0} XP</title><rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${Math.max(h, d.active ? 2 : 0).toFixed(1)}" rx="5" fill="${i === n - 1 ? '#ff7a1a' : '#a78bfa'}"/>${d.active && (!narrow || bw > 22) ? `<text class="v" x="${(x + w / 2).toFixed(1)}" y="${(y - 4).toFixed(1)}" text-anchor="middle">${d.active}</text>` : ''}${!narrow || i % 2 === (n - 1) % 2 ? `<text x="${(x + w / 2).toFixed(1)}" y="${H - 8}" text-anchor="middle">${dd}</text>` : ''}</g>`;
    }).join('');
    return `<svg class="ad-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(t('act_h'))}"><line x1="${pl}" x2="${W - pr}" y1="${H - pb}" y2="${H - pb}" stroke="var(--zk-hair,#d9e4e2)" stroke-width="2"/>${bars}</svg>`;
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
      <div class="ad-grid ad-directory">
        <section class="panel"><h3>👩‍🏫 ${L3("O‘qituvchilar ma’lumotlari", "Сведения об учителях", "Teachers directory")}</h3>
          <div class="ad-sub">${L3("Ro‘yxatdan o‘tgan o‘qituvchilar (parollarsiz)", "Зарегистрированные учителя (без паролей)", "Registered teacher accounts (no passwords)")}</div>
          ${st.users.filter(u => u.role === "teacher").length ? `<div class="ad-tw"><table class="ad"><thead><tr><th>${L3("O‘qituvchi", "Учитель", "Teacher")}</th><th>Login</th><th>${L3("Holat", "Статус", "Status")}</th></tr></thead><tbody>${st.users.filter(u => u.role === "teacher").sort((a,b) => String(a.name||a.login).localeCompare(String(b.name||b.login))).map(u => `<tr><td><b>${esc(u.name || u.login)}</b></td><td>${esc(u.login)}</td><td>${u.disabled ? (L3("O‘chirilgan", "Отключён", "Disabled")) : (L3("Faol", "Активен", "Active"))}</td></tr>`).join("")}</tbody></table></div>` : `<div class="ad-mut ad-empty">${L3("Hali o‘qituvchi qo‘shilmagan. “O‘qituvchilar” bo‘limidan qo‘shing.", "Учителей пока нет. Добавьте их в разделе „Учителя“.", "No teachers yet. Add them in the Teachers section.")}</div>`}
        </section>
        <section class="panel"><h3>🎓 ${L3("O‘quvchilar ma’lumotlari", "Сведения об учениках", "Students directory")}</h3>
          <div class="ad-sub">${L3("Ro‘yxatdagi o‘quvchilar va o‘zlashtirish ko‘rsatkichlari", "Зарегистрированные ученики и их успеваемость", "Registered students and learning progress")}</div>
          ${st.users.filter(u => u.role === "student").length ? `<div class="ad-tw"><table class="ad"><thead><tr><th>${L3("O‘quvchi", "Ученик", "Student")}</th><th>${t("c_cls")}</th><th>XP</th><th>${t("c_quiz")}</th></tr></thead><tbody>${st.users.filter(u => u.role === "student").sort((a,b) => String(a.cls||"").localeCompare(String(b.cls||""),undefined,{numeric:true}) || String(a.name||a.login).localeCompare(String(b.name||b.login))).map(u => { const p=st.prog[u.id]||{};return `<tr><td><b>${esc(u.name || u.login)}</b><small class="ad-muted-login">${esc(u.login)}</small></td><td>${esc(u.cls||"—")}</td><td>${Number(p.xp)||0}</td><td>${p.quizAvg == null ? "—" : esc(p.quizAvg)}</td></tr>`; }).join("")}</tbody></table></div>` : `<div class="ad-mut ad-empty">${L3("Hali o‘quvchi yo‘q. O‘qituvchilar sinf kodi orqali o‘quvchi qo‘shadi.", "Учеников пока нет. Учителя добавляют учеников по коду класса.", "No students yet. Teachers add students with a class code.")}</div>`}
        </section>
      </div>
      <section class="panel ad-insights"><h3>📊 ${L3("Sinflar natijalari", "Результаты классов", "Class performance")}</h3>
        <div class="ad-bars">${cls.map(c => `<div class="ad-bar-row"><span>${esc(c.cls)}</span><div class="ad-bar-track" role="img" aria-label="${esc(c.cls)}: ${c.avgQuiz == null ? "—" : c.avgQuiz + "/10"}"><i style="width:${Math.max(0,Math.min(100,(c.avgQuiz||0)*10))}%"></i></div><b>${c.avgQuiz == null ? "—" : c.avgQuiz + "/10"}</b></div>`).join("") || `<div class="ad-mut ad-empty">${L3("Sinflar bo‘yicha natija o‘quvchilar test yechgach ko‘rinadi.", "Результаты классов появятся, когда ученики пройдут тесты.", "Class results appear once students take tests.")}</div>`}</div>
      </section>
      <div class="panel"><h3>📈 ${t('act_h')}</h3><div class="ad-sub">${t('act_p')}</div>${act.some((d) => d.active) ? chart(act) : `<div class="ad-mut">${t('act_none')}</div>`}</div>
      <div class="ad-grid">
        <div class="panel"><h3>🏫 ${t('cls_h')}</h3>${cls.length ? `<div class="ad-tw"><table class="ad" id="adCls"><thead><tr><th>${t('c_cls')}</th><th>${t('c_n')}</th><th>${t('c_xp')}</th><th>${t('c_done')}</th><th>${t('c_quiz')}</th><th>${t('c_act')}</th></tr></thead><tbody>
          ${cls.map((c) => `<tr><td><b>${esc(c.cls)}</b></td><td>${c.n}</td><td>${c.avgXp}</td><td>${c.avgDone}</td><td>${c.avgQuiz == null ? '—' : `<span class="ad-q ${qcls(c.avgQuiz)}">${c.avgQuiz}</span>`}</td><td>${c.active7}/${c.n}</td></tr>`).join('')}</tbody></table></div>` : `<div class="ad-mut ad-empty">${L3("Sinflar bo‘yicha natija o‘quvchilar test yechgach ko‘rinadi.", "Результаты классов появятся, когда ученики пройдут тесты.", "Class results appear once students take tests.")}</div>`}</div>
        <div class="panel"><h3>🏆 ${t('top_h')}</h3>${top.length ? `<div class="ad-tw"><table class="ad" id="adTop"><thead><tr><th>#</th><th>${t('t_name')}</th><th>${t('t_cls')}</th><th>${t('t_xp')}</th><th>${t('t_done')}</th></tr></thead><tbody>
          ${top.map((r, i) => `<tr><td class="ad-mut">${i + 1}</td><td><b>${esc(r.name)}</b></td><td>${esc(r.cls)}</td><td><b>${r.xp}</b></td><td>${r.done}</td></tr>`).join('')}</tbody></table></div>` : `<div class="ad-mut ad-empty">${L3("Reyting o‘quvchilar XP to‘plaganda paydo bo‘ladi.", "Рейтинг появится, когда ученики наберут XP.", "The ranking appears once students earn XP.")}</div>`}</div>
      </div>
      <div class="panel" style="margin-top:18px"><h3>🧩 ${t('hard_h')}</h3><div class="ad-sub">${t('hard_p')}</div>${hard.length ? `<div class="ad-tw"><table class="ad" id="adHard"><thead><tr><th>${t('h_lesson')}</th><th>${t('h_avg')}</th><th>${t('h_n')}</th></tr></thead><tbody>
        ${hard.map((h) => `<tr><td><a href="#${esc(h.g)}-${Number(h.n) || 0}"><b>${esc(String(h.g).slice(1))}-${t('grade')}, ${Number(h.n) || 0}</b> — ${esc(lessonTitle(h.g, h.n))}</a></td><td><span class="ad-q ${qcls(h.avg)}">${Number(h.avg) || 0}</span></td><td>${Number(h.attempts) || 0}</td></tr>`).join('')}</tbody></table></div>` : `<div class="ad-mut">${t('hard_none')}</div>`}</div>
      <div class="panel" id="adBooks" style="margin-top:18px"></div>
      <div class="ad-grid" style="margin-top:18px">
        <div class="panel ad-form"><h3>⚙️ ${t('set_h')}</h3>
          <label for="adAnn">${t('ann_l')}</label><textarea id="adAnn" maxlength="300" placeholder="${esc(t('ann_ph'))}">${esc(set.announce || '')}</textarea>
          <label class="ad-chk"><input type="checkbox" id="adAnnOn" ${set.announceOn ? 'checked' : ''}> ${t('ann_on')}</label>
          <label class="ad-chk"><input type="checkbox" id="adReg" ${set.regOpen === false ? '' : 'checked'}> ${t('reg_on')}</label>
          <fieldset class="ad-prices"><legend>💳 ${L3('Obuna tariflari (yopiq sahifalarda o‘quvchilarga ko‘rinadi)', 'Тарифы подписки (показываются ученикам на закрытых страницах)', 'Subscription plans (shown to students on locked pages)')}</legend>
            <label for="adFreeN">${L3('Har bir sinfda bepul mavzular soni (dars, 3D, test va darslik sahifalari)', 'Количество бесплатных тем в каждом классе (урок, 3D, тест и страницы учебника)', 'Free topics in each grade (lesson, 3D, test and textbook pages)')}</label><input type="number" id="adFreeN" min="0" max="50" step="1" value="${window.ZKSub ? ZKSub.freeCount(set) : 3}" style="max-width:120px">
            ${['month', 'quarter', 'year'].map((k) => `<label for="adPr_${k}">${window.ZKSub ? (ZKSub.NAMES[L] || ZKSub.NAMES.uz)[k] : k}</label><input type="text" id="adPr_${k}" maxlength="40" placeholder="${L3('masalan: 50 000 so‘m', 'например: 50 000 сум', 'e.g. 50,000 sum')}" value="${esc(((set.prices || {})[k]) || '')}">`).join('')}
            <label for="adPay">${L3('Qanday to‘lanadi (aloqa, hisob raqam)', 'Как оплатить (контакты, номер счёта)', 'How to pay (contacts, account)')}</label><textarea id="adPay" maxlength="400" placeholder="${L3('masalan: Maktab kassasiga to‘lang, tel: +998 …', 'например: оплатите в кассе школы, тел.: +998 …', 'e.g. Pay at the school office, phone +998 …')}">${esc(set.payInfo || '')}</textarea>
          </fieldset>
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
    if (window.ZKAdminMobile) ZKAdminMobile.mount(APP, st.users, st.prog, L);
  }

  function download(name, text, type) {
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name; document.body.appendChild(a); a.click(); a.remove();
  }

  function wire() {
    const $ = (id) => APP.querySelector('#' + id);
    booksPanel();
    $('adSave').onclick = async () => {
      const msg = $('adSetMsg'); msg.className = 'ad-msg'; msg.textContent = '';
      const fv = Math.round(Number($('adFreeN').value)); const freeN = Number.isFinite(fv) ? Math.max(0, Math.min(50, fv)) : 3;
      const prices = {}; ['month', 'quarter', 'year'].forEach((k) => { const v = $('adPr_' + k).value.trim().slice(0, 40); if (v) prices[k] = v; });
      const doc = { announce: $('adAnn').value.trim().slice(0, 300), announceOn: $('adAnnOn').checked, regOpen: $('adReg').checked, prices, payInfo: $('adPay').value.trim().slice(0, 400), freeN, updated: Date.now(), by: ZKAuth.user.uid };
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
    APP = app; CTX = ctx; L = ctx.lang === 'en' || ctx.lang === 'ru' ? ctx.lang : 'uz'; css();
    app.innerHTML = `<div class="page-h adm"><div class="wrap"><div class="crumbs"><a href="#home">${ctx.t('nav_home')}</a> / ${t('h').replace(/^\S+\s/, '')}</div><h1>${t('h')}</h1><p>${t('p')}</p></div></div>
      <div class="wrap" style="padding-bottom:40px"><div class="ad-top"><button class="btn sec sm" id="adRe">${t('reload')}</button><div class="sp"></div><a class="btn sec sm" href="#teacher">${t('teacher_link')}</a></div>
      <div id="adBody"><div class="panel tc-empty" style="text-align:center">${t('loading')}</div></div></div>`;
    const go = () => load().then(view).catch((e) => { const b = app.querySelector('#adBody'); if (b) b.innerHTML = `<div class="panel">⚠ ${esc(ZKAuth.errMsg(e))}</div>`; });
    app.querySelector('#adRe').onclick = go;
    go();
  }

  window.ZKA = { render };
})();
