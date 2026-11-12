/* Zukko Kimyo — administrator paneli uchun statistika (sof funksiyalar, DOM'siz).
 * Brauzerda: window.ZKStats; Node testlarida: require/import (module.exports).
 * Kirish ma'lumotlari:
 *   users    — [{ id, login, name, role, cls, status? }]
 *   progress — { [uid]: { data: JSON-string (progress.js holati), xp, done6, done7, done8, quizAvg, updated } }
 * progress.js holati: { xp, L: { 'g7-5': { v, best, done } }, labs: {}, days: { 'YYYY-MM-DD': { xp, ls: [] } } }
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.ZKStats = api;
})(typeof self !== 'undefined' ? self : this, function () {
  const DAY = 864e5;
  const ymd = (d) => { const x = new Date(d); return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`; };
  const round1 = (x) => Math.round(x * 10) / 10;
  const avg = (a) => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : null);

  function parse(p) {
    if (!p) return {};
    if (p._parsed) return p._parsed;
    let s = {};
    try { s = typeof p.data === 'string' ? JSON.parse(p.data || '{}') : p.data || {}; } catch (e) { s = {}; }
    Object.defineProperty(p, '_parsed', { value: s, enumerable: false });
    return s;
  }
  const isStudent = (u) => u && u.role === 'student' && u.status !== 'pending';
  const doneOf = (p) => (p ? (p.done6 || 0) + (p.done7 || 0) + (p.done8 || 0) : 0);

  /** Oxirgi `days` kun: har kuni nechta o'quvchi faol bo'lgan (XP olgan) va jami XP. */
  function dailyActivity(users, progress, days = 14, today = Date.now()) {
    const out = [];
    for (let i = days - 1; i >= 0; i--) out.push({ date: ymd(today - i * DAY), active: 0, xp: 0 });
    const idx = Object.fromEntries(out.map((d, i) => [d.date, i]));
    for (const u of users.filter(isStudent)) {
      const d = parse(progress[u.id]).days || {};
      for (const [k, v] of Object.entries(d)) {
        if (idx[k] === undefined || !v || !v.xp) continue;
        out[idx[k]].active += 1; out[idx[k]].xp += v.xp;
      }
    }
    return out;
  }

  /** O'quvchi oxirgi `n` kun ichida faol bo'lganmi (progress.updated bo'yicha). */
  const activeWithin = (p, n, today) => !!(p && p.updated && today - p.updated < n * DAY);

  /** Umumiy ko'rsatkichlar. */
  function kpis(users, progress, today = Date.now()) {
    const st = users.filter(isStudent);
    const ps = st.map((u) => progress[u.id]).filter(Boolean);
    const quiz = ps.map((p) => p.quizAvg).filter((x) => typeof x === 'number');
    const todayKey = ymd(today);
    return {
      students: st.length,
      teachers: users.filter((u) => u.role === 'teacher').length,
      pending: users.filter((u) => u.role === 'student' && u.status === 'pending').length,
      classes: new Set(st.map((u) => u.cls || '—')).size,
      activeToday: st.filter((u) => ((parse(progress[u.id]).days || {})[todayKey] || {}).xp > 0).length,
      active7: st.filter((u) => activeWithin(progress[u.id], 7, today)).length,
      neverLoggedIn: st.filter((u) => !progress[u.id]).length,
      mastered: ps.reduce((s, p) => s + doneOf(p), 0),
      totalXp: ps.reduce((s, p) => s + (p.xp || 0), 0),
      avgQuiz: quiz.length ? round1(avg(quiz)) : null,
    };
  }

  /** Sinflar bo'yicha taqqoslash, sinf nomi bo'yicha tartiblangan. */
  function classSummary(users, progress, today = Date.now()) {
    const by = {};
    for (const u of users.filter(isStudent)) (by[u.cls || '—'] = by[u.cls || '—'] || []).push(u);
    return Object.entries(by).map(([cls, us]) => {
      const ps = us.map((u) => progress[u.id]);
      const quiz = ps.map((p) => p && p.quizAvg).filter((x) => typeof x === 'number');
      return {
        cls, n: us.length,
        avgXp: Math.round(avg(ps.map((p) => (p && p.xp) || 0))),
        avgDone: round1(avg(ps.map(doneOf))),
        avgQuiz: quiz.length ? round1(avg(quiz)) : null,
        active7: ps.filter((p) => activeWithin(p, 7, today)).length,
      };
    }).sort((a, b) => a.cls.localeCompare(b.cls, undefined, { numeric: true }));
  }

  /** Eng ko'p XP to'plagan o'quvchilar. */
  function topStudents(users, progress, k = 10) {
    return users.filter(isStudent).map((u) => ({ id: u.id, name: u.name || u.login, login: u.login, cls: u.cls || '', xp: (progress[u.id] && progress[u.id].xp) || 0, done: doneOf(progress[u.id]) }))
      .filter((r) => r.xp > 0).sort((a, b) => b.xp - a.xp || b.done - a.done || a.name.localeCompare(b.name)).slice(0, k);
  }

  /** O'rtacha test bahosi eng past darslar (kamida `minAttempts` o'quvchi yechgan). best: 0–10. */
  function hardestLessons(users, progress, minAttempts = 3, k = 10) {
    const acc = {};
    for (const u of users.filter(isStudent)) {
      for (const [key, r] of Object.entries(parse(progress[u.id]).L || {})) {
        if (!r || !r.best) continue;
        (acc[key] = acc[key] || []).push(r.best);
      }
    }
    return Object.entries(acc).filter(([, a]) => a.length >= minAttempts)
      .map(([key, a]) => { const [g, n] = key.split('-'); return { key, g, n: Number(n), avg: round1(avg(a)), attempts: a.length }; })
      .sort((a, b) => a.avg - b.avg || b.attempts - a.attempts).slice(0, k);
  }

  /** CSV (Excel uchun ; ajratgich va BOM bilan). */
  function toCSV(rows) {
    const cell = (x) => `"${String(x == null ? '' : x).replace(/"/g, '""')}"`;
    return '﻿' + rows.map((r) => r.map(cell).join(';')).join('\r\n');
  }

  return { ymd, parse, isStudent, dailyActivity, kpis, classSummary, topStudents, hardestLessons, toCSV };
});
