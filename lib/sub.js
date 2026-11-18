/* Zukko Kimyo — o'quvchi obunasi (sof funksiyalar, DOM'siz).
 * Brauzerda: window.ZKSub; Node testlarida: require (module.exports).
 *
 * Ma'lumot: users/{uid}.subs = { <fan>: { plan: 'month'|'quarter'|'year', until: ms, at: ms, by: adminUid } } — har fanga alohida.
 *   Eski yozuv users/{uid}.sub — kimyo obunasi sifatida o'qiladi (2026-11-17 gacha berilganlar).
 *   O'qituvchi: users/{uid}.subjects = ['math', …] — biriktirilgan fanlar; maydon yo'q bo'lsa — ['chem'] (eski o'qituvchilar).
 *   - Faqat administrator yozadi (firestore.rules: o'quvchi o'ziga, o'qituvchi o'quvchiga obuna bera olmaydi).
 *   - 1-bosqich: qulflar sayt interfeysida. 2-bosqich: pullik kontent Firebase'da, qoidalar `until > request.time` ni tekshiradi.
 *
 * Qoida (foydalanuvchi, 2026-11-17): har bir sinfda dastlabki bir nechta mavzu (standart 3 ta, admin o'zgartiradi —
 * settings/site.freeN) bepul: dars, uning 3D tajribalari, testi va darslik sahifalari. Qolganlari — obuna bilan.
 * O'qituvchi va admin uchun hammasi ochiq. Davriy jadval, bosh sahifa (3D namuna), profil — bepul.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.ZKSub = api;
})(typeof self !== 'undefined' ? self : this, function () {
  const DAY = 86400000;
  const PLANS = ['month', 'quarter', 'year'];
  const NAMES = {
    uz: { month: 'Oylik', quarter: 'Choraklik', year: "O'quv yili" },
    en: { month: 'Monthly', quarter: 'Quarterly', year: 'School year' },
    ru: { month: 'На месяц', quarter: 'На четверть', year: 'На учебный год' },
  };
  const DAYS = { month: 30, quarter: 91 };
  const FREE_DEFAULT = 3;

  // O'quv yili 30-iyun kuni tugaydi (mahalliy vaqt, kun oxiri). Iyuldan boshlab — keyingi yilning 30-iyuni.
  function schoolYearEnd(now) {
    const d = new Date(now);
    const y = d.getMonth() >= 6 ? d.getFullYear() + 1 : d.getFullYear();
    return new Date(y, 5, 30, 23, 59, 59, 999).getTime();
  }

  // Yangi obuna yoki uzaytirish: amaldagi obuna hali tugamagan bo'lsa, muddat uning oxiridan qo'shiladi
  function grant(cur, plan, now, by) {
    if (!PLANS.includes(plan)) throw new Error('plan');
    const curUntil = cur && Number.isFinite(+cur.until) ? +cur.until : 0;
    const from = Math.max(now, curUntil);
    let until = plan === 'year' ? schoolYearEnd(now) : from + DAYS[plan] * DAY;
    if (until < curUntil) until = curUntil; // "O'quv yili" mavjud uzunroq obunani qisqartirmaydi
    const out = { plan, until, at: now };
    if (by) out.by = by;
    return out;
  }

  function status(sub, now) {
    const until = sub && Number.isFinite(+sub.until) ? +sub.until : 0;
    const active = until > now;
    return {
      active,
      expired: !!until && !active,
      plan: sub && PLANS.includes(sub.plan) ? sub.plan : null,
      until,
      daysLeft: active ? Math.ceil((until - now) / DAY) : 0,
    };
  }

  // Fan bo'yicha obuna yozuvi (eski `sub` — kimyo)
  function subOf(user, subject) {
    const sj = subject || 'chem';
    const m = user && user.subs && typeof user.subs === 'object' ? user.subs[sj] : null;
    return m || (sj === 'chem' && user ? user.sub || null : null);
  }
  // O'qituvchiga biriktirilgan fanlar
  function teacherSubjects(user) {
    if (!user || user.role !== 'teacher') return [];
    return Array.isArray(user.subjects) ? user.subjects.filter((x) => typeof x === 'string') : ['chem'];
  }
  // Kim fan bo'yicha pullik qismlarni ko'ra oladi: admin; shu fanga biriktirilgan o'qituvchi; shu fan obunasi faol o'quvchi.
  // Kirishsiz (Firebase sozlanmagan, ochiq) rejimda — hamma narsa ochiq.
  function canPaid(user, now, enabled, subject) {
    if (!enabled || !user) return true;
    if (user.role === 'admin') return true;
    if (user.role === 'teacher') return teacherSubjects(user).includes(subject || 'chem');
    return status(subOf(user, subject), now).active;
  }

  // Har bir sinfda nechta mavzu bepul (admin sozlamasi; noto'g'ri qiymat — standart)
  function freeCount(site) {
    const v = site && site.freeN;
    return Number.isInteger(v) && v >= 0 && v <= 50 ? v : FREE_DEFAULT;
  }
  // Dars ochiqmi: to'liq kirish (obuna/xodim) yoki sinfdagi dastlabki freeN mavzudan biri
  function lessonOpen(full, n, freeN) { return !!full || (Number(n) >= 1 && Number(n) <= freeN); }
  // 3D tajriba ochiqmi: bepul darslardan biriga bog'langan bo'lsa (lessons: [[sinf, dars], ...])
  function labOpen(full, exp, freeN) {
    if (full) return true;
    return !!(exp && Array.isArray(exp.lessons) && exp.lessons.some((x) => Array.isArray(x) && lessonOpen(false, x[1], freeN)));
  }

  function fmtDate(ms) {
    if (!ms) return '';
    const d = new Date(ms), p = (n) => String(n).padStart(2, '0');
    return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}`;
  }

  return { DAY, PLANS, NAMES, FREE_DEFAULT, schoolYearEnd, grant, status, subOf, teacherSubjects, canPaid, freeCount, lessonOpen, labOpen, fmtDate };
});
