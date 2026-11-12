// lib/stats.js — administrator paneli statistikasi.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const S = createRequire(import.meta.url)('../../lib/stats.js');

const TODAY = new Date('2026-11-12T10:00:00').getTime();
const DAY = 864e5;
const k = (n) => S.ymd(TODAY - n * DAY);
const prog = (o) => ({ ...o, data: JSON.stringify(o.state || {}) });

const users = [
  { id: 'a', role: 'admin', login: 'admin' },
  { id: 't', role: 'teacher', login: 'dilnoza.k' },
  { id: 's1', role: 'student', login: 'vali', name: 'Vali', cls: '7A' },
  { id: 's2', role: 'student', login: 'malika', name: 'Malika', cls: '7A' },
  { id: 's3', role: 'student', login: 'aziz', name: 'Aziz', cls: '8B' },
  { id: 's4', role: 'student', login: 'yangi', name: 'Yangi', cls: '8B' },
  { id: 'p1', role: 'student', login: 'kutilmoqda', name: 'Pending', cls: '8B', status: 'pending' },
];
const progress = {
  s1: prog({ xp: 120, done7: 3, quizAvg: 8, updated: TODAY - 1 * DAY, state: { days: { [k(0)]: { xp: 20 }, [k(1)]: { xp: 30 } }, L: { 'g7-5': { best: 9 }, 'g7-6': { best: 4 } } } }),
  s2: prog({ xp: 40, done7: 1, quizAvg: 6, updated: TODAY - 3 * DAY, state: { days: { [k(1)]: { xp: 10 }, [k(20)]: { xp: 99 } }, L: { 'g7-5': { best: 7 }, 'g7-6': { best: 2 } } } }),
  s3: prog({ xp: 200, done8: 5, quizAvg: 9, updated: TODAY - 10 * DAY, state: { days: { [k(10)]: { xp: 50 } }, L: { 'g7-5': { best: 10 }, 'g7-6': { best: 3 }, 'g8-1': { best: 5 } } } }),
  p1: prog({ xp: 999, state: { days: { [k(0)]: { xp: 999 } } } }),
};

test('ymd mahalliy sanani YYYY-MM-DD qaytaradi', () => {
  assert.equal(S.ymd(new Date('2026-01-05T12:00:00')), '2026-01-05');
});

test('kpis: tasdiqlanmagan o\'quvchi hisobga olinmaydi', () => {
  const r = S.kpis(users, progress, TODAY);
  assert.equal(r.students, 4);
  assert.equal(r.teachers, 1);
  assert.equal(r.pending, 1);
  assert.equal(r.classes, 2);
  assert.equal(r.activeToday, 1);
  assert.equal(r.active7, 2);
  assert.equal(r.neverLoggedIn, 1);
  assert.equal(r.mastered, 9);
  assert.equal(r.totalXp, 360);
  assert.equal(r.avgQuiz, 7.7);
});

test('dailyActivity: 14 kun, eng eskisidan bugungacha', () => {
  const d = S.dailyActivity(users, progress, 14, TODAY);
  assert.equal(d.length, 14);
  assert.equal(d[13].date, k(0));
  assert.deepEqual(d[13], { date: k(0), active: 1, xp: 20 });
  assert.deepEqual(d[12], { date: k(1), active: 2, xp: 40 });
  assert.deepEqual(d[3], { date: k(10), active: 1, xp: 50 });
  assert.equal(d.reduce((s, x) => s + x.xp, 0), 110); // 20 kun oldingi va pending hisobga olinmaydi
});

test('classSummary: sinflar bo\'yicha o\'rtachalar', () => {
  const c = S.classSummary(users, progress, TODAY);
  assert.deepEqual(c.map((x) => x.cls), ['7A', '8B']);
  assert.deepEqual(c[0], { cls: '7A', n: 2, avgXp: 80, avgDone: 2, avgQuiz: 7, active7: 2 });
  assert.deepEqual(c[1], { cls: '8B', n: 2, avgXp: 100, avgDone: 2.5, avgQuiz: 9, active7: 0 });
});

test('topStudents: XP bo\'yicha, XP=0 lar chiqarilmaydi', () => {
  const t = S.topStudents(users, progress, 10);
  assert.deepEqual(t.map((x) => x.login), ['aziz', 'vali', 'malika']);
});

test('hardestLessons: kamida 3 urinishli darslar, eng past o\'rtacha birinchi', () => {
  const h = S.hardestLessons(users, progress, 3, 10);
  assert.deepEqual(h.map((x) => [x.key, x.avg, x.attempts]), [['g7-6', 3, 3], ['g7-5', 8.7, 3]]);
  assert.equal(h[0].g, 'g7'); assert.equal(h[0].n, 6);
});

test('parse buzilgan JSON\'da yiqilmaydi', () => {
  assert.deepEqual(S.parse({ data: '{bu json emas' }), {});
  assert.deepEqual(S.parse(null), {});
});

test('toCSV: BOM, ; ajratgich, qo\'shtirnoqni ekranlash', () => {
  assert.equal(S.toCSV([['a', 'b"c'], [1, null]]), '﻿"a";"b""c"\r\n"1";""');
});
