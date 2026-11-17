/* Zukko Kimyo — o'quvchi obunasi (sof funksiyalar, DOM'siz).
 * Brauzerda: window.ZKSub; Node testlarida: require (module.exports).
 *
 * Ma'lumot: users/{uid}.sub = { plan: 'month'|'quarter'|'year', until: ms, at: ms, by: adminUid }
 *   - Faqat administrator yozadi (firestore.rules: o'quvchi o'ziga, o'qituvchi o'quvchiga obuna bera olmaydi).
 *   - 1-bosqich: qulflar sayt interfeysida. 2-bosqich: pullik kontent Firebase'da, qoidalar `until > request.time` ni tekshiradi.
 *
 * Pullik qismlar (foydalanuvchi tanlovi, 2026-11-17): 3D laboratoriya, testlar va imtihon, 7–8-sinf darslari, darslik sahifalari.
 * Bepul: 6-sinf darslari matni, davriy jadval, bosh sahifa (3D namuna bilan), profil.
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
  };
  const DAYS = { month: 30, quarter: 91 };
  const FEATURES = ['lab', 'tests', 'g7', 'g8', 'pages'];

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

  // Kim pullik qismlarni ko'ra oladi: obunasi faol o'quvchi, o'qituvchi va admin.
  // Kirishsiz (Firebase sozlanmagan, ochiq) rejimda — hamma narsa ochiq.
  function canPaid(user, now, enabled) {
    if (!enabled || !user) return true;
    if (user.role === 'teacher' || user.role === 'admin') return true;
    return status(user.sub, now).active;
  }

  // Qaysi sahifa/tab pullik: route — location.hash (#siz), tab — dars tabi
  function featureOf(route, tab) {
    const r = String(route || '');
    if (/^tests(\/|$)|^exam/.test(r)) return 'tests';
    if (/^lab-/.test(r)) return 'lab';
    if (/^book-/.test(r)) return 'pages';
    const m = r.match(/^(g[678])-\d+$/);
    if (m) {
      if (m[1] !== 'g6') return m[1];
      if (tab === 'lab') return 'lab';
      if (tab === 'quiz') return 'tests';
      if (tab === 'pages') return 'pages';
    }
    return null;
  }

  function fmtDate(ms) {
    if (!ms) return '';
    const d = new Date(ms), p = (n) => String(n).padStart(2, '0');
    return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}`;
  }

  return { DAY, PLANS, NAMES, FEATURES, schoolYearEnd, grant, status, canPaid, featureOf, fmtDate };
});
