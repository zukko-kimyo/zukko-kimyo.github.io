/* Zukko Kimyo — o'qituvchi paneli (#teacher)
 * Natijalar, o'quvchi qo'shish (bittalab yoki ro'yxat bilan), parol almashtirish, o'chirish,
 * login varaqalarini chop etish; administrator o'qituvchilarni boshqaradi.
 */
(function () {
  const S = {
    uz: {
      h: "👩‍🏫 O'qituvchi paneli", p: "O'quvchilar natijalari, hisoblar va parollar.", tab_res: '📊 Natijalar', tab_sub: '💳 Obunalar', tab_add: "➕ O'quvchi qo'shish", tab_tch: "🧑‍🏫 O'qituvchilar", tab_req: '📥 Arizalar', tab_codes: '🔑 Sinf kodlari',
      rq_none: "Yangi ariza yo'q. O'quvchilar «Sinf kodlari» bo'limidagi kod bilan ro'yxatdan o'tganda shu yerda chiqadi.", rq_ok: '✓ Tasdiqlash', rq_no: '✕ Rad etish', rq_all: '✓ Hammasini tasdiqlash', rq_date: 'Sana', rq_no_q: '{n} arizasini rad etasizmi? Hisob o\'chiriladi.', rq_done: 'Tasdiqlandi',
      cd_h: 'Sinf kodlari', cd_p: "O'quvchilar saytdagi «Ro'yxatdan o'tish» tugmasi orqali shu kod bilan ro'yxatdan o'tadi, so'ng siz «Arizalar» bo'limida tasdiqlaysiz.", cd_new: 'Yangi kod yaratish', cd_cls: 'Sinf', cd_code: 'Kod', cd_state: 'Holati', cd_on: 'faol', cd_off: "to'xtatilgan", cd_dis: "⏸ To'xtatish", cd_en: '▶ Yoqish', cd_del: "🗑 O'chirish", cd_none: "Hali kod yo'q. Sinf nomini yozib, kod yarating.", cd_used: 'ro\'yxatdan o\'tgan', cd_copy: '📋 Nusxa', cd_copied: 'Nusxa olindi', cd_how: "O'quvchilarga ayting: saytga kiring → «Ro'yxatdan o'tish» → sinf kodi: ",
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
      e_taken: 'Bu login band.', ok_t: "O'qituvchi qo'shildi", site: 'Sayt', card_h: 'Zukko Akademiyasi — kirish maʼlumotlari',
      d_labs: 'tajriba', d_visited: 'ochilgan dars', d_best: 'eng yaxshi', d_back: '← Orqaga', d_none: "Bu sinfda hali faollik yo'q.", d_streak: 'XP',
      self: '(siz)', grade: 'sinf',
    },
    en: {
      h: '👩‍🏫 Teacher panel', p: 'Student results, accounts and passwords.', tab_res: '📊 Results', tab_sub: '💳 Subscriptions', tab_add: '➕ Add students', tab_tch: '🧑‍🏫 Teachers', tab_req: '📥 Requests', tab_codes: '🔑 Class codes',
      rq_none: 'No new requests. Students who sign up with a code from “Class codes” appear here.', rq_ok: '✓ Approve', rq_no: '✕ Reject', rq_all: '✓ Approve all', rq_date: 'Date', rq_no_q: 'Reject the request of {n}? The account will be deleted.', rq_done: 'Approved',
      cd_h: 'Class codes', cd_p: 'Students sign up on the site with “Sign up” and this code; then you approve them under “Requests”.', cd_new: 'Create new code', cd_cls: 'Class', cd_code: 'Code', cd_state: 'Status', cd_on: 'active', cd_off: 'disabled', cd_dis: '⏸ Disable', cd_en: '▶ Enable', cd_del: '🗑 Delete', cd_none: 'No codes yet. Type a class name and create a code.', cd_used: 'signed up', cd_copy: '📋 Copy', cd_copied: 'Copied', cd_how: 'Tell students: open the site → “Sign up” → class code: ',
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
      e_taken: 'This login is taken.', ok_t: 'Teacher added', site: 'Site', card_h: 'Zukko Academy — sign-in details',
      d_labs: 'labs', d_visited: 'lessons opened', d_best: 'best', d_back: '← Back', d_none: 'No activity in this class yet.', d_streak: 'XP',
      self: '(you)', grade: 'grade',
    },
    ru: {
      h: '👩‍🏫 Панель учителя', p: 'Результаты учеников, учётные записи и пароли.', tab_res: '📊 Результаты', tab_sub: '💳 Подписки', tab_add: '➕ Добавить учеников', tab_tch: '🧑‍🏫 Учителя', tab_req: '📥 Заявки', tab_codes: '🔑 Коды классов',
      rq_none: 'Новых заявок нет. Здесь появятся ученики, зарегистрировавшиеся по коду из раздела «Коды классов».', rq_ok: '✓ Одобрить', rq_no: '✕ Отклонить', rq_all: '✓ Одобрить все', rq_date: 'Дата', rq_no_q: 'Отклонить заявку {n}? Учётная запись будет удалена.', rq_done: 'Одобрено',
      cd_h: 'Коды классов', cd_p: 'Ученики регистрируются на сайте через кнопку «Регистрация» с этим кодом, затем вы одобряете их в разделе «Заявки».', cd_new: 'Создать новый код', cd_cls: 'Класс', cd_code: 'Код', cd_state: 'Статус', cd_on: 'активен', cd_off: 'приостановлен', cd_dis: '⏸ Приостановить', cd_en: '▶ Включить', cd_del: '🗑 Удалить', cd_none: 'Кодов пока нет. Введите название класса и создайте код.', cd_used: 'зарегистрировались', cd_copy: '📋 Копировать', cd_copied: 'Скопировано', cd_how: 'Скажите ученикам: откройте сайт → «Регистрация» → код класса: ',
      all: 'Все', students: 'учеников', none: 'Учеников пока нет. Начните с раздела «Добавить учеников».', loading: 'Загрузка…', reload: '↻ Обновить',
      c_n: '№', c_name: 'Имя', c_login: 'Логин', c_xp: 'XP / уровень', c_g6: '6 класс', c_g7: '7 класс', c_g8: '8 класс', c_quiz: 'Средний балл теста', c_last: 'Последняя активность', c_act: '',
      never: 'не входил', today: 'сегодня', yday: 'вчера', days: 'дн. назад', lessons: 'уроков',
      det: 'Подробнее', pw: '🔑 Новый пароль', del: '🗑 Удалить', del_q: 'Удалить учётную запись {n}? Результаты тоже будут удалены.', pw_ok: 'Новый пароль', pw_q: 'Создать новый пароль для {n}?',
      csv: '⬇ CSV (Excel)', print_cards: '🖨 Карточки с логинами',
      add_cls: 'Класс', add_cls_ph: 'например 7A', add_names: 'Имена учеников (по одному в строке)', add_names_ph: 'Aliyev Vali\nKarimova Malika\n…', add_go: 'Создать учётные записи',
      add_note: 'Логины и пароли создаются автоматически. Распечатайте карточки и раздайте их ученикам.', e_cls: 'Введите класс.', e_names: 'Введите хотя бы одно имя.',
      creating: 'Создание', done_n: 'Создано учётных записей: {n}', fail_n: 'Ошибок: {n}', created_h: 'Созданные учётные записи', keep: '⚠ Распечатайте или сохраните пароли сейчас — позже их также можно посмотреть в разделе «Результаты».',
      show_pw: '👁 Показать пароли', hide_pw: '🙈 Скрыть пароли', pw_col: 'Пароль',
      t_name: 'Имя учителя', t_login: 'Логин', t_pass: 'Пароль', t_add: 'Добавить учителя', t_list: 'Список учителей', e_login: 'Логин может содержать только латинские буквы, цифры, точку и дефис.',
      e_taken: 'Этот логин уже занят.', ok_t: 'Учитель добавлен', site: 'Сайт', card_h: 'Zukko Akademiyasi — данные для входа',
      d_labs: 'опытов', d_visited: 'открыто уроков', d_best: 'лучший', d_back: '← Назад', d_none: 'В этом классе пока нет активности.', d_streak: 'XP',
      self: '(вы)', grade: 'класс',
    },
  };
  let L = 'uz';
  // Uch tilli tanlov: ru tarjimasi bo'lmasa o'zbekchaga qaytadi.
  const L3 = (uz, ru, en) => (L === 'ru' ? ru : L === 'en' ? en : uz);
  const nm = (o) => (o ? o[L] || o.uz || '' : '');
  const t = (k, o) => { let s = (S[L] || S.uz)[k] || k; if (o) Object.keys(o).forEach((x) => (s = s.replace('{' + x + '}', o[x]))); return s; };
  const esc = (s) => window.ZKAuth.esc(s);
  // O'quvchi o'zi yozadigan natija qiymatlari ekranga chiqishdan oldin songa aylantiriladi (HTML/kod kiritilmasin).
  const num = (v, max = 1e7) => { v = Number(v); return Number.isFinite(v) && v >= 0 ? Math.min(v, max) : 0; };
  const cleanProg = (p) => Object.assign({}, p, { xp: num(p.xp), done6: num(p.done6, 500), done7: num(p.done7, 500), done8: num(p.done8, 500),
    visited: num(p.visited, 1e4), labs: num(p.labs, 1e4), quizN: num(p.quizN, 1e4), updated: num(p.updated, 1e14),
    quizAvg: p.quizAvg == null || p.quizAvg === '' || !Number.isFinite(Number(p.quizAvg)) ? null : Math.min(10, Math.max(0, Number(p.quizAvg))) });
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
  // Bir vaqtda faqat bitta yuklash: yuklanish paytida bo'lim almashtirilsa, ma'lumot qayta so'ralmaydi
  // va keyin kelgan javob foydalanuvchi yozayotgan formani qayta chizib yubormaydi.
  let loading = null;
  function ensureLoaded() { return st.users ? Promise.resolve() : (loading || (loading = loadAll().finally(() => { loading = null; }))); }
  async function loadAll() {
    const Bk = ZKAuth.backend;
    // O'qituvchi faqat kuzatadi (foydalanuvchi qarori 2026-11-17): parollar va sinf kodlari faqat administratorga
    const adm = ZKAuth.isAdmin();
    // Kimyo natijalarini faqat admin va kimyo fani biriktirilgan o'qituvchi o'qiydi (firestore.rules)
    const chemOk = adm || (ZKAuth.mySubjects ? ZKAuth.mySubjects().includes('chem') : true);
    const [users, prog, secrets, codes] = await Promise.all([Bk.list('users'), chemOk ? Bk.list('progress') : [], adm ? Bk.list('secrets').catch(() => []) : [], adm ? Bk.list('classes').catch(() => []) : []]);
    st.chemOk = chemOk;
    st.codes = codes;
    st.users = users; st.prog = {}; prog.forEach((p) => (st.prog[p.id] = cleanProg(p))); st.secrets = {}; secrets.forEach((s) => (st.secrets[s.id] = s));
  }
  const students = () => (st.users || []).filter((u) => u.role === 'student' && u.status !== 'pending');
  const pending = () => (st.users || []).filter((u) => u.role === 'student' && u.status === 'pending').sort((a, b) => (a.created || 0) - (b.created || 0));
  const classes = () => [...new Set(students().map((u) => u.cls || '—'))].sort(sortCls);

  /* ---------- CSS ---------- */
  function css() {
    if (document.getElementById('zkTchCss')) return;
    const s = document.createElement('style'); s.id = 'zkTchCss';
    s.textContent = `
.page-h.tch{background:linear-gradient(135deg,#4c1d95,#db2777)}
.tc-overview{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:16px 0 20px}.tc-metric{padding:16px;background:linear-gradient(160deg,#fff,#f5f1ff);border:1px solid #e7dcfd;border-radius:18px;box-shadow:0 4px 16px rgba(80,45,160,.06)}.tc-metric span{display:block;font-size:12px;color:#615776;font-weight:800}.tc-metric b{font-size:clamp(22px,2.6vw,30px);color:#332052;font-weight:900}@media(max-width:800px){.tc-overview{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:420px){.tc-overview{gap:8px}.tc-metric{padding:12px}}
.tc-tabs{display:flex;gap:8px;flex-wrap:wrap;margin:22px 0 16px}.tc-tabs button{border:1px solid var(--zk-hair,var(--line));background:var(--zk-surface-2,#fff);border-radius:999px;padding:10px 16px;font:700 14.5px var(--f);color:var(--zk-ink,#0f2a2c);cursor:pointer;box-shadow:var(--zk-glass-shadow,none)}
.tc-tabs button.on{background:var(--zk-teal,#00555a);border-color:var(--zk-teal,#00555a);color:#fff;box-shadow:0 8px 20px rgba(0,85,90,.22)}
.tc-chips{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px}.tc-chips button{border:2px solid var(--line);background:#fff;border-radius:99px;padding:6px 14px;font:800 13.5px var(--f);color:var(--zk-ink,#0f2a2c);cursor:pointer}.tc-chips button.on{background:#fdf2ff;border-color:#c026d3;color:#a21caf}.tc-chips small{opacity:.6;margin-left:4px}
.tc-tools{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:12px}.tc-tools .sp{flex:1}
.tc-wrap{overflow-x:auto;border:2px solid var(--line);border-radius:18px;background:#fff}
table.tc{width:100%;border-collapse:collapse;font-size:14px;min-width:860px}
table.tc th{text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:.03em;color:var(--zk-muted,#5b6b6c);padding:12px 10px;border-bottom:2px solid var(--line);background:var(--zk-teal-50,#eef7f6);white-space:nowrap}
table.tc td{padding:10px;border-bottom:1px solid var(--zk-hair,#e5ecea);vertical-align:middle}table.tc tr:last-child td{border-bottom:0}
table.tc tr:hover td{background:var(--zk-teal-50,#eef7f6)}
.tc-name{font-weight:800;color:var(--zk-ink,#0f2a2c);cursor:pointer}.tc-name:hover{color:var(--zk-teal,#00555a);text-decoration:underline}
.tc-mut{color:var(--zk-muted,#5b6b6c);font-weight:700}
.tc-bar{display:inline-block;width:64px;height:8px;border-radius:9px;background:var(--zk-track,#e6eeed);overflow:hidden;vertical-align:middle;margin-right:6px}.tc-bar i{display:block;height:100%;border-radius:9px}
.tc-q{display:inline-block;min-width:38px;text-align:center;border-radius:9px;padding:2px 8px;font-weight:900}.tc-q.g{background:#dcfce7;color:#15803d}.tc-q.m{background:#fef3c7;color:#b45309}.tc-q.b{background:#fee2e2;color:#b91c1c}
.tc-act{display:flex;gap:4px;justify-content:flex-end}.tc-act button{border:0;background:#f6efe6;border-radius:9px;padding:6px 9px;font:800 12.5px var(--f);cursor:pointer;white-space:nowrap}.tc-act button:hover{background:#efe3d3}
.tc-pw{font-family:ui-monospace,Menlo,Consolas,monospace;font-weight:700;background:#f6f1ff;border-radius:7px;padding:2px 7px;color:var(--zk-teal-700,#00474b)}
.tc-form{display:grid;grid-template-columns:200px 1fr;gap:14px;align-items:start}
.tc-form label{font-weight:800;font-size:13.5px;color:var(--zk-ink,#0f2a2c);display:block;margin-bottom:6px}
.tc-form input,.tc-form textarea{width:100%;box-sizing:border-box;border:2px solid var(--zk-hair,#d9e4e2);border-radius:12px;padding:11px 12px;font:700 15px var(--f);background:var(--zk-surface,#fff);outline:none}.tc-form textarea{min-height:220px;resize:vertical;line-height:1.5}
.tc-form input:focus,.tc-form textarea:focus{border-color:var(--zk-teal,#00555a);box-shadow:0 0 0 4px var(--zk-teal-50,#e3f2f0)}
.tc-note{font-size:13px;color:#7a6f66;font-weight:700;margin:10px 0}
.tc-err{color:#c0262d;font-weight:800;margin-top:8px}
.tc-prog{height:10px;border-radius:9px;background:var(--zk-track,#e6eeed);overflow:hidden;margin:10px 0}.tc-prog i{display:block;height:100%;background:var(--zk-teal,#00555a);transition:width .2s}
.tc-empty{text-align:center;padding:40px 16px;color:var(--zk-muted,#5b6b6c);font-weight:800}
.tc-det-h{display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin-bottom:14px}.tc-det-h .av{width:54px;height:54px;border-radius:16px;display:grid;place-items:center;color:#fff;font-weight:900;font-size:24px;background:linear-gradient(135deg,var(--zk-teal,#00555a),var(--zk-teal-600,#0f7a76))}
.tc-kpi{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin:12px 0 18px}.tc-kpi div{background:#fff;border:2px solid var(--line);border-radius:16px;padding:12px 14px}.tc-kpi b{display:block;font-size:22px;font-weight:900;color:var(--zk-ink,#0f2a2c)}.tc-kpi span{font-size:12.5px;color:var(--zk-muted,#5b6b6c);font-weight:800}
.tc-ls{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:6px}.tc-ls div{display:flex;gap:8px;align-items:center;background:#fff;border:1.5px solid var(--zk-track,#e6eeed);border-radius:11px;padding:7px 10px;font-size:13px;font-weight:700}
.tc-ls .n{width:26px;height:26px;border-radius:8px;display:grid;place-items:center;color:#fff;font-weight:900;font-size:12px;flex:none}.tc-ls .s{margin-left:auto;font-weight:900}.tc-ls div.off{opacity:.45}
.tc-badge{display:inline-block;min-width:20px;padding:0 6px;border-radius:99px;background:#ef4444;color:#fff;font-size:12px;line-height:20px;margin-left:4px}.tc-tabs button.on .tc-badge{background:#fff;color:var(--zk-teal,#00555a)}
.tc-act button.ok{background:#dcfce7;color:#15803d}
.tc-codes{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:12px}.tc-code{background:#fff;border:2px solid var(--line);border-radius:18px;padding:16px;text-align:center;box-shadow:0 3px 0 var(--line)}.tc-code.off{opacity:.55}.tc-code .cl{font-weight:900;color:var(--zk-teal,#00555a);font-size:15px}.tc-code .cd{font:900 28px ui-monospace,Menlo,Consolas,monospace;letter-spacing:.14em;color:var(--zk-ink,#0f2a2c);margin:4px 0}
.tc-ok{background:#ecfdf3;border:2px solid #bbf7d0;color:#166534;border-radius:14px;padding:12px 14px;font-weight:800;margin:10px 0}
@media (max-width:760px){.tc-wrap:has(.resp){border:0;background:none;overflow:visible}table.tc.resp{min-width:0}table.tc.resp thead{display:none}
table.tc.resp tr{display:grid;grid-template-columns:1fr 1fr;gap:8px 14px;background:#fff;border:2px solid var(--line);border-radius:16px;padding:12px 14px;margin-bottom:10px;box-shadow:0 3px 0 var(--line)}
table.tc.resp td{border:0;padding:0;background:none!important}table.tc.resp td:first-child{display:none}table.tc.resp td.nm,table.tc.resp td.act{grid-column:1/-1}table.tc.resp td.nm{font-size:16px}table.tc.resp td.lg{grid-column:1/-1;margin-top:-6px}
table.tc.resp td[data-l]:before{content:attr(data-l);display:block;font-size:10.5px;text-transform:uppercase;letter-spacing:.03em;color:var(--zk-muted,#5b6b6c);font-weight:800;margin-bottom:2px}
table.tc.resp .tc-act{justify-content:flex-start}table.tc.resp .tc-bar{width:calc(100% - 48px)}
.tc-form{grid-template-columns:1fr!important}.tc-tabs button{flex:1;padding:9px 8px;font-size:13px}}
@media print{body *{visibility:hidden}#tcPrint,#tcPrint *{visibility:visible}#tcPrint{position:absolute;left:0;top:0;width:100%}}
#tcPrint{display:none}
.tc-cards{display:grid;grid-template-columns:1fr 1fr;gap:0}.tc-card{border:1.5px dashed #999;padding:14px 16px;font-family:Arial,sans-serif;break-inside:avoid;page-break-inside:avoid}.tc-card h4{margin:0 0 4px;font-size:13px;color:#555}.tc-card b{font-size:17px}.tc-card table{margin-top:6px;font-size:15px}.tc-card td{padding:2px 10px 2px 0}.tc-card code{font-size:17px;font-weight:700}

/* Zukko Kimyo 2.0 — teacher student dashboard */
.page-h.tch{background:radial-gradient(circle at 90% 10%,rgba(255,255,255,.19),transparent 25%),linear-gradient(115deg,#23347e,#6a37bf 65%,#c45fab);padding:44px 0}
.page-h.tch h1{font-size:clamp(27px,3.5vw,40px)}
.page-h.tch p{color:#f1eaff;font-weight:700}
#tcBody .tc-overview{gap:14px;margin:20px 0 25px}
#tcBody .tc-metric{border:1px solid #e8e2fb;border-top:4px solid #7551d6;padding:19px 18px;border-radius:20px;background:linear-gradient(155deg,#fff,#f8f6ff);box-shadow:0 10px 28px rgba(49,35,104,.09)}
#tcBody .tc-metric:nth-child(2){border-top-color:#14b6a6}
#tcBody .tc-metric:nth-child(3){border-top-color:#eaa03d}
#tcBody .tc-metric:nth-child(4){border-top-color:#d85b99}
#tcBody .tc-metric b{display:block;margin-top:8px;font-size:clamp(26px,3vw,37px);color:var(--zk-ink,#0f2a2c)}
#tcBody .tc-metric span{color:var(--zk-muted,#5b6b6c)}
#tcBody .tc-chips button.on{background:var(--zk-teal,#00555a);color:white;border-color:var(--zk-teal,#00555a)}
#tcBody .tc-wrap{border-radius:18px;box-shadow:0 10px 30px rgba(0,40,42,.07)}
.tc-tabs button.on{background:var(--zk-teal,#00555a);border-color:var(--zk-teal,#00555a);box-shadow:0 8px 20px rgba(0,85,90,.22)}
@media(max-width:760px){#tcBody .tc-overview{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}#tcBody .tc-metric{padding:14px}.page-h.tch{padding:30px 0}}

`;
    document.head.appendChild(s);
  }

  /* ---------- render ---------- */
  let APP, CTX;
  function render(app, ctx) {
    APP = app; CTX = ctx; L = ctx.lang === 'en' || ctx.lang === 'ru' ? ctx.lang : 'uz'; css();
    const admin = ZKAuth.isAdmin();
    app.innerHTML = `<div class="page-h tch"><div class="wrap"><div class="crumbs"><a href="#home">${ctx.t('nav_home')}</a> / ${t('h').replace(/^\S+\s/, '')}</div><h1>${t('h')}</h1><p>${admin ? t('p') : (L3('O‘quvchilar natijalari va faolligi (faqat ko‘rish).', 'Результаты и активность учеников (только просмотр).', 'Student progress and results (view only).'))}</p></div></div>
      <div class="wrap" style="padding-bottom:40px">
        <div class="tc-tabs" id="tcTabs"></div>
        <div id="tcBody"><div class="tc-empty">${t('loading')}</div></div>
      </div><div id="tcPrint"></div>`;
    tabs();
    const token = (render.n = (render.n || 0) + 1);
    const go = () => { if (token !== render.n) return; if (!ZKAuth.isAdmin()) st.tab = 'res'; tabs(); return st.tab === 'res' ? (st.detail ? detail() : results()) : st.tab === 'add' ? addView() : st.tab === 'req' ? requests() : st.tab === 'codes' ? codesView() : st.tab === 'sub' && ZKAuth.isAdmin() ? subsView() : teachers(); };
    if (!st.users) ensureLoaded().then(go).catch((e) => { body().innerHTML = `<div class="tc-empty">⚠ ${esc(ZKAuth.errMsg(e))}</div>`; });
    else go();
  }
  const body = () => document.getElementById('tcBody');
  function tabs() {
    const el = document.getElementById('tcTabs'); if (!el) return;
    const n = st.users ? pending().length : 0;
    el.innerHTML = (ZKAuth.isAdmin() ? ['res', 'req', 'add', 'codes', 'sub', 'tch'] : ['res']).map((k) => `<button data-t="${k}" class="${st.tab === k ? 'on' : ''}">${t('tab_' + k)}${k === 'req' && n ? ` <span class="tc-badge">${n}</span>` : ''}</button>`).join('');
    el.querySelectorAll('button').forEach((b) => (b.onclick = () => { st.tab = b.dataset.t; st.detail = null; render(APP, CTX); }));
  }

  /* ---------- arizalar ---------- */
  function requests() {
    const list = pending();
    if (!list.length) { body().innerHTML = `<div class="panel tc-empty">📭 ${t('rq_none')}</div>`; return; }
    body().innerHTML = `<div class="tc-tools"><button class="btn sec sm" id="tcRe2">${t('reload')}</button><div class="sp"></div><button class="btn pri sm" id="tcAll">${t('rq_all')} (${list.length})</button></div>
      <div class="tc-wrap"><table class="tc resp" style="min-width:640px"><thead><tr><th>${t('c_n')}</th><th>${t('c_name')}</th><th>${t('c_login')}</th><th>${t('add_cls')}</th><th>${t('rq_date')}</th><th></th></tr></thead><tbody>
      ${list.map((u, i) => `<tr><td class="tc-mut">${i + 1}</td><td class="nm"><b>${esc(u.name)}</b></td><td class="lg"><code>${esc(u.login)}</code></td><td data-l="${t('add_cls')}"><b>${esc(u.cls)}</b></td><td data-l="${t('rq_date')}">${u.created ? new Date(u.created).toLocaleString(L3('uz-UZ', 'ru-RU', 'en-GB'), { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : ''}</td>
        <td class="act"><div class="tc-act"><button class="ok" data-ok="${u.id}">${t('rq_ok')}</button><button data-no="${u.id}">${t('rq_no')}</button></div></td></tr>`).join('')}
      </tbody></table></div>`;
    document.getElementById('tcRe2').onclick = async () => { body().style.opacity = 0.5; try { await loadAll(); } finally { body().style.opacity = 1; } tabs(); requests(); };
    const approve = async (id) => { await ZKAuth.backend.set('users', id, { status: 'active', approvedBy: ZKAuth.user.uid, approvedAt: Date.now() }, true); const u = st.users.find((x) => x.id === id); if (u) { u.status = 'active'; } };
    body().querySelectorAll('[data-ok]').forEach((b) => (b.onclick = async () => { b.disabled = true; try { await approve(b.dataset.ok); tabs(); requests(); } catch (e) { alert('⚠ ' + ZKAuth.errMsg(e)); b.disabled = false; } }));
    body().querySelectorAll('[data-no]').forEach((b) => (b.onclick = async () => { const u = st.users.find((x) => x.id === b.dataset.no); if (!u || !confirm(t('rq_no_q', { n: u.name || u.login }))) return; b.disabled = true; try { await removeAccount(u); tabs(); requests(); } catch (e) { alert('⚠ ' + ZKAuth.errMsg(e)); b.disabled = false; } }));
    document.getElementById('tcAll').onclick = async (ev) => { ev.target.disabled = true; for (const u of list) { try { await approve(u.id); } catch (e) { alert('⚠ ' + u.login + ': ' + ZKAuth.errMsg(e)); break; } } tabs(); requests(); };
  }
  async function removeAccount(u) {
    const Bk = ZKAuth.backend; const sec = st.secrets[u.id];
    if (sec) await Bk.deleteAccount(ZKAuth.emailOf(u.login), sec.pw);
    await Promise.all([Bk.del('progress', u.id).catch(() => {}), Bk.del('secrets', u.id).catch(() => {})]);
    await Bk.del('users', u.id);
    st.users = st.users.filter((x) => x.id !== u.id); delete st.prog[u.id]; delete st.secrets[u.id];
  }

  /* ---------- fanlar (subjects.js): o'qituvchiga biriktirish ---------- */
  const SJL = () => (window.ZKSubjects ? ZKSubjects.list : [{ id: 'chem', name: { uz: 'Kimyo', en: 'Chemistry', ru: 'Химия' } }]);
  const sjName = (id) => { const x = SJL().find((s) => s.id === id); return x ? nm(x.name) : id; };
  const tSubj = (u) => (Array.isArray(u.subjects) ? u.subjects : ['chem']);
  const sjChecks = (pref, cur) => SJL().map((x) => `<label class="tc-sj"><input type="checkbox" data-sj="${x.id}" name="${pref}" ${cur.includes(x.id) ? 'checked' : ''}> ${esc(nm(x.name))}</label>`).join('');

  /* ---------- obunalar (faqat administrator; firestore.rules o'qituvchiga ruxsat bermaydi) ---------- */
  const SB = {
    uz: { tab: '💳 Obunalar', h: 'O‘quvchilar obunasi', p: 'To‘lov qilgan o‘quvchiga tarif tanlang. Faol obuna uzaytirilsa, muddat uning oxiridan qo‘shiladi. «O‘quv yili» — 30-iyungacha. O‘quvchi sahifani yangilaganda (yoki «Tekshirish» tugmasi bilan) bo‘limlar ochiladi.',
      st: 'Holat', on: 'faol, {d} gacha', exp: 'tugagan {d}', none: 'yo‘q', give: 'Berish', stop: 'To‘xtatish', all: 'Hammasi', act: 'Faol', noact: 'Obunasiz',
      stop_q: '{n} obunasini to‘xtatasizmi?', cls_q: '{c} sinfidagi {k} o‘quvchiga «{p}» obunasini berasizmi?', cls_b: 'Butun sinfga: ', saved: 'Saqlandi', pick: 'Sinfni tanlang' },
    en: { tab: '💳 Subscriptions', h: 'Student subscriptions', p: 'Pick a plan for a student who has paid. Extending an active subscription adds time from its end. “School year” runs until 30 June. Locked sections open when the student reloads the page (or presses “Check”).',
      st: 'Status', on: 'active until {d}', exp: 'ended {d}', none: 'none', give: 'Give', stop: 'Stop', all: 'All', act: 'Active', noact: 'Without',
      stop_q: 'Stop the subscription of {n}?', cls_q: 'Give the “{p}” plan to {k} students of class {c}?', cls_b: 'Whole class: ', saved: 'Saved', pick: 'Choose a class' },
    ru: { tab: '💳 Подписки', h: 'Подписки учеников', p: 'Выберите тариф для ученика, который оплатил. При продлении активной подписки срок добавляется к её окончанию. «Учебный год» — до 30 июня. Разделы откроются, когда ученик обновит страницу (или нажмёт «Проверить»).',
      st: 'Статус', on: 'активна до {d}', exp: 'истекла {d}', none: 'нет', give: 'Выдать', stop: 'Остановить', all: 'Все', act: 'Активные', noact: 'Без подписки',
      stop_q: 'Остановить подписку {n}?', cls_q: 'Выдать подписку «{p}» {k} ученикам класса {c}?', cls_b: 'Всему классу: ', saved: 'Сохранено', pick: 'Выберите класс' },
  };
  const sbt = (k, o) => { let x = (SB[L] || SB.uz)[k]; if (o) Object.keys(o).forEach((q) => (x = x.replace('{' + q + '}', o[q]))); return x; };
  // Har fanga alohida obuna: users.subs[fan]. Eski `sub` (kimyo) kimyo yozilganda tozalanadi.
  async function setSub(u, plan, subj) {
    const Z = window.ZKSub; const sj = subj || 'chem';
    const sub = plan ? Z.grant(Z.subOf(u, sj), plan, Date.now(), ZKAuth.user.uid) : null;
    const subs = Object.assign({}, u.subs || {}, { [sj]: sub });
    const data = { subs }; if (sj === 'chem' && u.sub) data.sub = null;
    await ZKAuth.backend.set('users', u.id, data, true);
    u.subs = subs; if ('sub' in data) u.sub = null;
  }
  function subsView() {
    const Z = window.ZKSub; if (!Z) { body().innerHTML = '<div class="tc-empty">—</div>'; return; }
    const now = Date.now(), all = students(), cs = classes();
    if (st.cls && !cs.includes(st.cls)) st.cls = '';
    st.subF = st.subF || ''; st.subS = st.subS || 'chem';
    const SS = st.subS, cur = (u) => Z.status(Z.subOf(u, SS), now);
    const ofCls = all.filter((u) => !st.cls || (u.cls || '—') === st.cls);
    const list = ofCls.filter((u) => { const a = cur(u).active; return !st.subF || (st.subF === 'on' ? a : !a); })
      .sort((a, b) => sortCls(a.cls || '', b.cls || '') || String(a.name).localeCompare(String(b.name)));
    const N = Z.NAMES[L] || Z.NAMES.uz;
    const plans = Z.PLANS.map((k) => `<option value="${k}">${N[k]}</option>`).join('');
    const stat = (u) => { const s = cur(u); return s.active ? `<span class="tc-q g">${sbt('on', { d: Z.fmtDate(s.until) })}</span> <span class="tc-mut">${s.plan ? N[s.plan] : ''}</span>` : s.expired ? `<span class="tc-q b">${sbt('exp', { d: Z.fmtDate(s.until) })}</span>` : `<span class="tc-mut">${sbt('none')}</span>`; };
    const nOn = ofCls.filter((u) => cur(u).active).length;
    body().innerHTML = `<div class="panel"><h3>${sbt('h')}</h3><div class="tc-note">${sbt('p')}</div></div>
      <div class="tc-chips" role="group" aria-label="${L3('Fan', 'Предмет', 'Subject')}">${SJL().map((x) => `<button data-s="${x.id}" class="${SS === x.id ? 'on' : ''}">${esc(nm(x.name))}</button>`).join('')}</div>
      <div class="tc-chips" role="group" aria-label="${t('add_cls')}"><button data-c="" class="${!st.cls ? 'on' : ''}">${t('all')}<small>${all.length}</small></button>${cs.map((c) => `<button data-c="${esc(c)}" class="${st.cls === c ? 'on' : ''}">${esc(c)}<small>${all.filter((u) => (u.cls || '—') === c).length}</small></button>`).join('')}</div>
      <div class="tc-tools"><div class="tc-chips" role="group" aria-label="${sbt('st')}" style="margin:0">${[['', sbt('all')], ['on', sbt('act') + ` <small>${nOn}</small>`], ['off', sbt('noact') + ` <small>${ofCls.length - nOn}</small>`]].map(([v, l]) => `<button data-f="${v}" class="${st.subF === v ? 'on' : ''}">${l}</button>`).join('')}</div><div class="sp"></div>
        ${st.cls ? `<label class="tc-mut" for="tcSubCls">${sbt('cls_b')}</label><select id="tcSubCls" class="tc-sel">${plans}</select><button class="btn sec sm" id="tcSubClsGo">${sbt('give')}</button>` : `<span class="tc-mut">${sbt('cls_b')}${sbt('pick')}</span>`}</div>
      <div class="tc-msg" id="tcSubMsg" role="status"></div>
      <div class="tc-wrap"><table class="tc resp"><thead><tr><th>${t('c_n')}</th><th>${t('c_name')}</th><th>${t('add_cls')}</th><th>${sbt('st')}</th><th><span class="zk-sr">${sbt('give')}</span></th></tr></thead><tbody>
      ${list.map((u, i) => `<tr data-id="${u.id}"><td class="tc-mut">${i + 1}</td><td class="nm">${esc(u.name || u.login)}</td><td data-l="${t('add_cls')}">${esc(u.cls || '—')}</td><td data-l="${sbt('st')}">${stat(u)}</td>
        <td class="act"><div class="tc-act"><select class="tc-sel" aria-label="${esc(sbt('give') + ' — ' + (u.name || u.login))}" data-sel="${u.id}">${plans}</select><button data-give="${u.id}" aria-label="${esc(sbt('give') + ' — ' + (u.name || u.login))}">${sbt('give')}</button>${cur(u).active ? `<button data-stop="${u.id}" aria-label="${esc(sbt('stop') + ' — ' + (u.name || u.login))}">${sbt('stop')}</button>` : ''}</div></td></tr>`).join('') || `<tr><td colspan="5" class="tc-empty">${t('none')}</td></tr>`}
      </tbody></table></div>`;
    const msg = (x, ok) => { const m = document.getElementById('tcSubMsg'); m.className = 'tc-msg ' + (ok ? 'tc-ok' : 'tc-err'); m.textContent = x; };
    body().querySelectorAll('[data-c]').forEach((b) => (b.onclick = () => { st.cls = b.dataset.c; subsView(); }));
    body().querySelectorAll('[data-f]').forEach((b) => (b.onclick = () => { st.subF = b.dataset.f; subsView(); }));
    body().querySelectorAll('[data-s]').forEach((b) => (b.onclick = () => { st.subS = b.dataset.s; subsView(); }));
    const byId = (id) => all.find((u) => u.id === id);
    body().querySelectorAll('[data-give]').forEach((b) => (b.onclick = async () => {
      const u = byId(b.dataset.give), plan = body().querySelector(`[data-sel="${b.dataset.give}"]`).value; b.disabled = true;
      try { await setSub(u, plan, SS); subsView(); msg(sbt('saved') + ': ' + (u.name || u.login), true); const nb = body().querySelector(`[data-give="${u.id}"]`); if (nb) nb.focus(); }
      catch (e) { b.disabled = false; msg('⚠ ' + ZKAuth.errMsg(e)); }
    }));
    body().querySelectorAll('[data-stop]').forEach((b) => (b.onclick = async () => {
      const u = byId(b.dataset.stop); if (!confirm(sbt('stop_q', { n: u.name || u.login }))) return; b.disabled = true;
      try { await setSub(u, null, SS); subsView(); msg(sbt('saved') + ': ' + (u.name || u.login), true); }
      catch (e) { b.disabled = false; msg('⚠ ' + ZKAuth.errMsg(e)); }
    }));
    const cg = document.getElementById('tcSubClsGo');
    if (cg) cg.onclick = async () => {
      const plan = document.getElementById('tcSubCls').value, kids = ofCls;
      if (!kids.length || !confirm(sbt('cls_q', { c: st.cls, k: kids.length, p: sjName(SS) + ' — ' + N[plan] }))) return; cg.disabled = true;
      let ok = 0; for (const u of kids) { try { await setSub(u, plan, SS); ok++; } catch (e) { msg('⚠ ' + ZKAuth.errMsg(e)); break; } }
      subsView(); if (ok === kids.length) msg(sbt('saved') + `: ${ok}`, true);
    };
  }

  /* ---------- sinf kodlari ---------- */
  function mkCode() { const a = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; const r = crypto.getRandomValues(new Uint32Array(6)); return [...r].map((x) => a[x % a.length]).join(''); }
  function codesView() {
    const list = (st.codes || []).slice().sort((a, b) => sortCls(a.cls || '', b.cls || '') || (b.created || 0) - (a.created || 0));
    const used = (code) => (st.users || []).filter((u) => u.code === code).length;
    const cs = [...new Set((st.users || []).filter((u) => u.role === 'student').map((u) => u.cls).filter(Boolean))].sort(sortCls);
    body().innerHTML = `<div class="panel"><h3>🔑 ${t('cd_h')}</h3><div class="tc-note">${t('cd_p')}</div>
        <div class="tc-tools" style="margin-top:12px"><input id="tcCdCls" list="tcCdL" placeholder="${t('add_cls_ph')}" style="border:2px solid var(--zk-hair,#d9e4e2);border-radius:12px;padding:10px 12px;font:700 15px var(--f);width:160px;background:var(--zk-surface,#fff)"><datalist id="tcCdL">${cs.map((c) => `<option value="${esc(c)}">`).join('')}</datalist><button class="btn pri sm" id="tcCdGo">${t('cd_new')}</button><span class="tc-err" id="tcCdE"></span></div></div>
      ${list.length ? `<div class="tc-codes">${list.map((c) => `<div class="tc-code ${c.active ? '' : 'off'}"><div class="cl">${esc(c.cls)}</div><div class="cd">${esc(c.id)}</div>
        <div class="tc-mut" style="font-size:12.5px">${c.active ? t('cd_on') : t('cd_off')} · ${used(c.id)} ${t('cd_used')}</div>
        <div class="tc-act" style="justify-content:center;margin-top:8px"><button data-cp="${esc(c.id)}">${t('cd_copy')}</button><button data-tg="${esc(c.id)}">${c.active ? t('cd_dis') : t('cd_en')}</button><button data-dl="${esc(c.id)}">${t('cd_del')}</button></div></div>`).join('')}</div>` : `<div class="panel tc-empty">${t('cd_none')}</div>`}`;
    const E = document.getElementById('tcCdE');
    document.getElementById('tcCdGo').onclick = async (ev) => {
      const cls = document.getElementById('tcCdCls').value.trim().toUpperCase().replace(/\s+/g, '');
      if (!cls) { E.textContent = t('e_cls'); return; }
      ev.target.disabled = true; const code = mkCode();
      try { const doc = { cls, active: true, by: ZKAuth.user.uid, created: Date.now() }; await ZKAuth.backend.set('classes', code, doc); st.codes = (st.codes || []).concat([Object.assign({ id: code }, doc)]); codesView(); }
      catch (e) { E.textContent = '⚠ ' + ZKAuth.errMsg(e); ev.target.disabled = false; }
    };
    body().querySelectorAll('[data-cp]').forEach((b) => (b.onclick = async () => { const c = (st.codes || []).find((x) => x.id === b.dataset.cp); const txt = t('cd_how') + b.dataset.cp + (c ? ` (${c.cls})` : ''); try { await navigator.clipboard.writeText(txt); b.textContent = '✓ ' + t('cd_copied'); } catch (e) { prompt('', txt); } }));
    body().querySelectorAll('[data-tg]').forEach((b) => (b.onclick = async () => { const c = st.codes.find((x) => x.id === b.dataset.tg); b.disabled = true; try { await ZKAuth.backend.set('classes', c.id, { active: !c.active }, true); c.active = !c.active; codesView(); } catch (e) { alert('⚠ ' + ZKAuth.errMsg(e)); b.disabled = false; } }));
    body().querySelectorAll('[data-dl]').forEach((b) => (b.onclick = async () => { b.disabled = true; try { await ZKAuth.backend.del('classes', b.dataset.dl); st.codes = st.codes.filter((x) => x.id !== b.dataset.dl); codesView(); } catch (e) { alert('⚠ ' + ZKAuth.errMsg(e)); b.disabled = false; } }));
  }

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
        <td class="act">${ZKAuth.isAdmin() ? `<div class="tc-act"><button data-pw="${u.id}" aria-label="${esc(t('pw') + ' — ' + (u.name || u.login))}">${t('pw')}</button><button data-del="${u.id}" aria-label="${esc(t('del') + ' — ' + (u.name || u.login))}">${t('del')}</button></div>` : ''}</td></tr>`;
    }).join('');
  }
  // Fan tanlash: o'qituvchiga biriktirilgan fanlar (admin — hammasi). Kimyo — batafsil progress jadvali,
  // boshqa fanlar — shu fan obunachilari va o'qituvchi testlari natijalari.
  const mySj = () => (ZKAuth.isAdmin() ? (window.ZKSubjects ? ZKSubjects.ids : ['chem']) : (ZKAuth.mySubjects ? ZKAuth.mySubjects() : ['chem']));
  function sjBar() {
    const l = mySj(); if (l.length < 2) return '';
    return `<div class="tc-chips tc-sj" role="group" aria-label="${L3('Fan', 'Предмет', 'Subject')}">${l.map((id) => `<button data-sj="${esc(id)}" class="${st.sj === id ? 'on' : ''}" aria-pressed="${st.sj === id}">${esc(sjName(id))}</button>`).join('')}</div>`;
  }
  function wireSj() { body().querySelectorAll('.tc-sj button').forEach((b) => (b.onclick = () => { st.sj = b.dataset.sj; st.cls = ''; results(); })); }
  async function loadExr() {
    if (st.exr) return st.exr; const B = ZKAuth.backend;
    try { st.exr = ZKAuth.isAdmin() ? await B.list('examResults') : await B.list('examResults', 'owner', ZKAuth.user.uid); } catch (e) { st.exr = []; }
    return st.exr;
  }
  function subjResults() {
    const sj = st.sj, now = Date.now(), all = students();
    const subSt = (u) => (window.ZKSub ? ZKSub.status(ZKSub.subOf(u, sj), now) : { active: false, expired: false });
    const subbed = all.filter((u) => { const x = subSt(u); return x.active || x.expired; });
    const scope = st.sjAll || !subbed.length ? all : subbed;
    const cs = [...new Set(scope.map((u) => u.cls || '—'))].sort(sortCls); if (st.cls && !cs.includes(st.cls)) st.cls = '';
    const list = scope.filter((u) => !st.cls || (u.cls || '—') === st.cls).sort((a, b) => sortCls(a.cls || '', b.cls || '') || String(a.name).localeCompare(String(b.name)));
    const ex = (st.exr || []).filter((r) => (r.subj || 'chem') === sj); const byU = {}; ex.forEach((r) => { (byU[r.uid] = byU[r.uid] || []).push(Number(r.pct) || 0); });
    const pcol = (p) => (p >= 80 ? '#16a34a' : p >= 70 ? '#d97706' : '#dc2626');
    const active = subbed.filter((u) => subSt(u).active).length;
    const allAvg = ex.length ? Math.round(ex.reduce((a, r) => a + (Number(r.pct) || 0), 0) / ex.length * 10) / 10 : null;
    const subCell = (u) => { const x = subSt(u); return x.active ? `<span class="tc-q g">✓ ${L3('Faol', 'Активна', 'Active')}</span> <span class="tc-mut">· ${x.daysLeft} ${L3('kun', 'дн.', 'days')}</span>` : x.expired ? `<span class="tc-q b">${L3('Tugagan', 'Истекла', 'Expired')}</span> <span class="tc-mut">· ${window.ZKSub ? ZKSub.fmtDate(x.until) : ''}</span>` : '<span class="tc-mut">—</span>'; };
    const exCell = (u) => { const l = byU[u.id]; if (!l) return '<span class="tc-mut">—</span>'; const a = Math.round(l.reduce((x, y) => x + y, 0) / l.length * 10) / 10; return `${l.length} · <b style="color:${pcol(a)}">${a}%</b>`; };
    body().innerHTML = sjBar() + `<section class="tc-overview" aria-label="${L3('O‘quvchilar statistikasi', 'Статистика учеников', 'Student summary')}">
       <div class="tc-metric"><span>📚 ${esc(sjName(sj))}</span><b>${subbed.length}</b><small class="tc-mut">${L3('obunachi', 'подписчиков', 'subscribers')}</small></div>
       <div class="tc-metric"><span>✅ ${L3('Faol obuna', 'Активные', 'Active')}</span><b>${active}</b></div>
       <div class="tc-metric"><span>📝 ${L3('Test natijalari', 'Результатов тестов', 'Test results')}</span><b>${ex.length}</b></div>
       <div class="tc-metric"><span>📈 ${L3('O‘rtacha natija', 'Средний результат', 'Average')}</span><b>${allAvg == null ? '—' : allAvg + '%'}</b></div></section>
      <div class="tc-chips"><button data-sa="0" class="${!st.sjAll && subbed.length ? 'on' : ''}" ${subbed.length ? '' : 'disabled'}>⭐ ${L3('Fan obunachilari', 'Подписчики предмета', 'Subject subscribers')}<small>${subbed.length}</small></button><button data-sa="1" class="${st.sjAll || !subbed.length ? 'on' : ''}">👥 ${L3('Barcha o‘quvchilar', 'Все ученики', 'All students')}<small>${all.length}</small></button></div>
      ${!subbed.length ? `<p class="tc-mut">${L3(`${esc(sjName(sj))} fanidan obunasi bor o‘quvchi hali yo‘q — barcha o‘quvchilar ko‘rsatilmoqda (bepul mavzular hammaga ochiq).`, `Подписчиков по предмету «${esc(sjName(sj))}» пока нет — показаны все ученики.`, `No ${esc(sjName(sj))} subscribers yet — showing all students.`)}</p>` : ''}
      <div class="tc-chips"><button data-c="" class="${!st.cls ? 'on' : ''}">${t('all')}<small>${scope.length}</small></button>${cs.map((c) => `<button data-c="${esc(c)}" class="${st.cls === c ? 'on' : ''}">${esc(c)}<small>${scope.filter((u) => (u.cls || '—') === c).length}</small></button>`).join('')}</div>
      <div class="tc-tools"><button class="btn sec sm" id="tcRe">${t('reload')}</button><div class="sp"></div><a class="btn sm" href="#exams">📝 ${L3('Test yuborish', 'Отправить тест', 'Send a test')}</a></div>
      ${list.length ? `<div class="tc-wrap"><table class="tc resp"><thead><tr><th>${t('c_n')}</th><th>${t('c_name')}</th><th>${L3('Sinf', 'Класс', 'Class')}</th><th>${L3('Obuna', 'Подписка', 'Subscription')}</th><th>${L3('Testlar · o‘rtacha', 'Тесты · средний', 'Tests · average')}</th></tr></thead><tbody>${list.map((u, i) => `<tr><td data-l="${t('c_n')}">${i + 1}</td><td data-l="${t('c_name')}"><b>${esc(u.name || u.login)}</b></td><td data-l="${L3('Sinf', 'Класс', 'Class')}">${esc(u.cls || '—')}</td><td data-l="${L3('Obuna', 'Подписка', 'Subscription')}">${subCell(u)}</td><td data-l="${L3('Testlar', 'Тесты', 'Tests')}">${exCell(u)}</td></tr>`).join('')}</tbody></table></div>` : `<div class="panel tc-empty">${t('none')}</div>`}`;
    wireSj();
    body().querySelectorAll('[data-sa]').forEach((b) => (b.onclick = () => { st.sjAll = b.dataset.sa === '1'; st.cls = ''; results(); }));
    body().querySelectorAll('.tc-chips button[data-c]').forEach((b) => (b.onclick = () => { st.cls = b.dataset.c; results(); }));
    document.getElementById('tcRe').onclick = async () => { body().style.opacity = 0.5; try { st.exr = null; await loadAll(); await loadExr(); } finally { body().style.opacity = 1; } results(); };
  }
  function results() {
    const sjs = mySj(); if (!st.sj || !sjs.includes(st.sj)) st.sj = st.chemOk !== false && sjs.includes('chem') ? 'chem' : sjs[0] || 'chem';
    if (st.sj !== 'chem' || st.chemOk === false) {
      if (st.chemOk === false && st.sj === 'chem') st.sj = sjs.find((x) => x !== 'chem') || 'chem';
      if (!st.exr) { body().innerHTML = sjBar() + `<div class="zk-lazy" role="status"><span class="zk-lazy-spin"></span></div>`; loadExr().then(() => { if (st.tab === 'res') results(); }); return; }
      return subjResults();
    }
    const cs = classes(); if (st.cls && !cs.includes(st.cls)) st.cls = '';
    const all = students();
    const list = all.filter((u) => !st.cls || (u.cls || '—') === st.cls).sort((a, b) => sortCls(a.cls || '', b.cls || '') || String(a.name).localeCompare(String(b.name)));
    if (!all.length) { body().innerHTML = `<div class="panel tc-empty">${t('none')}</div>`; return; }
    const summaries = list.map(u => st.prog[u.id] || {});
    const avgQuizList = summaries.map(p => Number(p.quizAvg)).filter((n,i) => summaries[i].quizAvg != null && Number.isFinite(n));
    const avgQuiz = avgQuizList.length ? (avgQuizList.reduce((a,b)=>a+b,0)/avgQuizList.length).toFixed(1) : '—';
    const active7 = summaries.filter(p => p.updated && Date.now()-Number(p.updated) < 7*86400000).length;
    const totalXp = summaries.reduce((n,p)=>n+(Number(p.xp)||0),0);
    const summaryHtml = `<section class="tc-overview" aria-label="${L3('O‘quvchilar statistikasi', 'Статистика учеников', 'Student summary')}">
       <div class="tc-metric"><span>👥 ${L3('O‘quvchilar', 'Ученики', 'Students')}</span><b>${list.length}</b></div>
       <div class="tc-metric"><span>📈 ${L3('O‘rtacha test', 'Средний балл теста', 'Average quiz')}</span><b>${avgQuiz}${avgQuiz === '—' ? '' : '/10'}</b></div>
       <div class="tc-metric"><span>✅ ${L3('7 kunda faol', 'Активны за 7 дней', 'Active in 7 days')}</span><b>${active7}</b></div>
       <div class="tc-metric"><span>⭐ ${L3('Jami XP', 'Всего XP', 'Total XP')}</span><b>${totalXp}</b></div>
    </section>`;
    body().innerHTML = sjBar() + summaryHtml + `<div class="tc-chips"><button data-c="" class="${!st.cls ? 'on' : ''}">${t('all')}<small>${all.length}</small></button>${cs.map((c) => `<button data-c="${esc(c)}" class="${st.cls === c ? 'on' : ''}">${esc(c)}<small>${all.filter((u) => (u.cls || '—') === c).length}</small></button>`).join('')}</div>
      <div class="tc-tools"><button class="btn sec sm" id="tcRe">${t('reload')}</button>${ZKAuth.isAdmin() ? `<button class="btn sec sm" id="tcPw">${st.showPw ? t('hide_pw') : t('show_pw')}</button>` : ''}<div class="sp"></div><button class="btn sec sm" id="tcCsv">${t('csv')}</button>${ZKAuth.isAdmin() ? `<button class="btn sec sm" id="tcCards">${t('print_cards')}</button>` : ''}</div>
      <div class="tc-wrap"><table class="tc resp"><thead><tr><th>${t('c_n')}</th><th>${t('c_name')}</th><th>${t('c_login')}</th><th>${t('c_xp')}</th><th>${t('c_quiz')}</th><th>${t('c_g6')}</th><th>${t('c_g7')}</th><th>${t('c_g8')}</th><th>${t('c_last')}</th><th></th></tr></thead><tbody>${rows(list)}</tbody></table></div>`;
    body().querySelectorAll('.tc-chips button[data-c]').forEach((b) => (b.onclick = () => { st.cls = b.dataset.c; results(); }));
    wireSj();
    document.getElementById('tcRe').onclick = async () => { body().style.opacity = 0.5; try { await loadAll(); } finally { body().style.opacity = 1; } results(); };
    const pwb = document.getElementById('tcPw'); if (pwb) pwb.onclick = () => { st.showPw = !st.showPw; results(); };
    document.getElementById('tcCsv').onclick = () => csv(list);
    const cdb = document.getElementById('tcCards'); if (cdb) cdb.onclick = () => cards(list.map((u) => ({ name: u.name, login: u.login, cls: u.cls, pw: (st.secrets[u.id] || {}).pw || '—' })));
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
    if (!sec) { alert('⚠ ' + (L3("Saqlangan parol topilmadi — bu hisobni saytdan o'zgartirib bo'lmaydi.", 'Сохранённый пароль не найден — эту учётную запись нельзя изменить с сайта.', 'Stored password not found; the account cannot be changed from the site.'))); return; }
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
    if (!s || typeof s !== 'object' || Array.isArray(s)) s = {};
    const Ls = (s.L && typeof s.L === 'object') ? s.L : {}; const xp = p.xp || 0;
    const grades = ['g6', 'g7', 'g8'].filter((g) => window.BOOKS && BOOKS[g]);
    const sec = st.secrets[u.id];
    body().innerHTML = `<button class="btn sec sm" id="tcBack">${t('d_back')}</button>
      <div class="panel" style="margin-top:12px"><div class="tc-det-h"><div class="av">${esc((u.name || u.login)[0] || '?').toUpperCase()}</div><div><h2 style="margin:0;font-size:22px">${esc(u.name || u.login)}</h2><div class="tc-mut"><code>${esc(u.login)}</code> · ${esc(u.cls || '')} ${sec ? `· <span class="tc-pw">${esc(sec.pw)}</span>` : ''}</div></div><div style="flex:1"></div>${ZKAuth.isAdmin() ? `<div class="tc-act"><button data-pw="${u.id}">${t('pw')}</button><button data-del="${u.id}">${t('del')}</button></div>` : ''}</div>
      <div class="tc-kpi"><div><b>${xp}</b><span>XP · L${lv(xp)}</span></div><div><b>${(p.done6 || 0) + (p.done7 || 0) + (p.done8 || 0)}</b><span>⭐ ${L3("o'zlashtirilgan dars", 'уроков освоено', 'lessons mastered')}</span></div><div><b>${p.visited || 0}</b><span>${t('d_visited')}</span></div><div><b>${p.quizAvg != null ? p.quizAvg : '—'}</b><span>${t('c_quiz')} (${p.quizN || 0})</span></div><div><b>${p.labs || 0}</b><span>🧪 ${t('d_labs')}</span></div><div><b style="font-size:16px">${ago(p.updated)}</b><span>${t('c_last')}</span></div></div>
      ${grades.map((g) => { const bk = BOOKS[g]; const items = bk.lessons.map((Lz, i) => ({ n: i + 1, r: Ls[g + '-' + (i + 1)], t: CTX.tr(Lz.t) })).filter((x) => x.r); return `<h3 style="margin:16px 0 8px">${g.slice(1)}-${t('grade')} <small class="tc-mut">${items.filter((x) => x.r.done).length}/${bk.lessons.length}</small></h3>${items.length ? `<div class="tc-ls">${items.map((x) => `<div class="${x.r.done ? '' : 'off'}"><span class="n" style="background:${CTX.GC[g]}">${x.n}</span><span>${esc(x.t)}</span><span class="s">${num(x.r.best, 10) ? `<span class="tc-q ${qcls(num(x.r.best, 10))}">${num(x.r.best, 10)}/10</span>` : '👁'}</span></div>`).join('')}</div>` : `<div class="tc-mut">—</div>`}`; }).join('')}
      </div>`;
    document.getElementById('tcBack').onclick = () => { st.detail = null; results(); };
    wireActions(body());
  }

  function csv(list) {
    const head = [t('c_name'), t('c_login'), t('add_cls'), 'XP', 'Level', t('c_g6'), t('c_g7'), t('c_g8'), t('c_quiz'), t('d_labs'), t('c_last')];
    const lines = [head].concat(list.map((u) => { const p = st.prog[u.id] || {}; return [u.name, u.login, u.cls, p.xp || 0, lv(p.xp || 0), p.done6 || 0, p.done7 || 0, p.done8 || 0, p.quizAvg != null ? p.quizAvg : '', p.labs || 0, p.updated ? new Date(p.updated).toLocaleDateString('sv') : '']; }));
    // Excel formulasi bo'lib ishlab ketmasin: = + - @ bilan boshlangan matn oldiga ' qo'yiladi
    const cell = (x) => { let v = String(x == null ? '' : x); if (typeof x === 'string' && /^[\s]*[=+\-@]/.test(v)) v = "'" + v; return `"${v.replace(/"/g, '""')}"`; };
    const txt = '﻿' + lines.map((r) => r.map(cell).join(';')).join('\r\n');
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
    const v = document.getElementById('tcCrCsv'); if (v) v.onclick = () => { const txt = '﻿' + [[t('c_name'), t('c_login'), t('pw_col'), t('add_cls')]].concat(ok.map((x) => [x.name, x.login, x.pw, c.cls])).map((r) => r.map((y) => { let v = String(y); if (/^[=+\-@\t\r]/.test(v)) v = "'" + v; return `"${v.replace(/"/g, '""')}"`; }).join(';')).join('\r\n'); const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([txt], { type: 'text/csv;charset=utf-8' })); a.download = `loginlar-${c.cls}.csv`; document.body.appendChild(a); a.click(); a.remove(); };
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
        <div class="tc-sjrow" role="group" aria-label="${L3('Fanlari', 'Предметы', 'Subjects')}"><span class="tc-mut">${L3('Fanlari:', 'Предметы:', 'Subjects:')}</span> ${sjChecks('tcTS', ['chem'])}</div>
        <button class="btn pri" id="tcTGo" style="margin-top:14px">${t('t_add')}</button><div id="tcTOut"></div></div>
      <div class="panel"><h3>${t('t_list')}</h3><div class="tc-wrap"><table class="tc" style="min-width:0"><thead><tr><th>${t('c_name')}</th><th>${L3('Fanlari', 'Предметы', 'Subjects')}</th><th>${t('c_login')}</th><th>${t('pw_col')}</th><th></th></tr></thead><tbody>
      ${list.map((u) => `<tr data-tid="${u.id}"><td><b>${esc(u.name || u.login)}</b> ${u.id === ZKAuth.user.uid ? `<span class="tc-mut">${t('self')}</span>` : ''}${u.role === 'admin' ? ' <span class="tc-mut">· admin</span>' : ''}</td><td>${u.role === 'teacher' ? `<div class="tc-sjrow" role="group" aria-label="${esc((L3('Fanlari — ', 'Предметы — ', 'Subjects — ')) + (u.name || u.login))}">${sjChecks('tcS_' + u.id, tSubj(u))}</div>` : `<span class="tc-mut">${L3('hammasi', 'все', 'all')}</span>`}</td><td><code>${esc(u.login)}</code></td><td>${st.secrets[u.id] ? `<span class="tc-pw">${esc(st.secrets[u.id].pw)}</span>` : '<span class="tc-mut">—</span>'}</td><td>${u.role === 'teacher' ? `<div class="tc-act"><button data-pw="${u.id}">${t('pw')}</button><button data-del="${u.id}">${t('del')}</button></div>` : ''}</td></tr>`).join('')}
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
        const subjects = [...document.querySelectorAll('input[name="tcTS"]:checked')].map((c) => c.dataset.sj);
        const doc = { login, name: name || login, role: 'teacher', cls: '', subjects, created: Date.now(), by: ZKAuth.user.uid };
        await ZKAuth.backend.set('users', uid, doc); await ZKAuth.backend.set('secrets', uid, { pw, role: 'teacher', login });
        st.users.push(Object.assign({ id: uid }, doc)); st.secrets[uid] = { pw, role: 'teacher', login };
        teachers(); document.getElementById('tcTOut').innerHTML = `<div class="tc-ok">✅ ${t('ok_t')}: <code>${esc(login)}</code> / <span class="tc-pw">${esc(pw)}</span></div>`;
      } catch (e) { b.disabled = false; out.innerHTML = `<div class="tc-err">⚠ ${esc(/email-already/.test(e.code || '') ? t('e_taken') : ZKAuth.errMsg(e))}</div>`; }
    };
    // Fan biriktirish: belgi o'zgarishi bilan saqlanadi (faqat admin; firestore.rules)
    body().querySelectorAll('tr[data-tid] input[data-sj]').forEach((c) => (c.onchange = async () => {
      const tr = c.closest('tr'), u = st.users.find((x) => x.id === tr.dataset.tid);
      const subjects = [...tr.querySelectorAll('input[data-sj]:checked')].map((x) => x.dataset.sj);
      tr.querySelectorAll('input[data-sj]').forEach((x) => (x.disabled = true));
      try { await ZKAuth.backend.set('users', u.id, { subjects }, true); u.subjects = subjects; }
      catch (e) { c.checked = !c.checked; alert('⚠ ' + ZKAuth.errMsg(e)); }
      tr.querySelectorAll('input[data-sj]').forEach((x) => (x.disabled = false));
    }));
    wireActions(body());
  }

  window.ZKT = { render };
})();
