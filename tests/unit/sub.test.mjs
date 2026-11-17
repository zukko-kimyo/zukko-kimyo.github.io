// lib/sub.js — o'quvchi obunasi: muddat hisoblash, holat, kim pullik qismlarni ko'ra oladi.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const S = createRequire(import.meta.url)('../../lib/sub.js');

const NOW = new Date(2026, 10, 17, 12, 0).getTime(); // 2026-11-17
const D = S.DAY;

test('oylik va choraklik: bugundan, faol obuna bo\'lsa uning oxiridan uzaytiriladi', () => {
  assert.equal(S.grant(null, 'month', NOW).until, NOW + 30 * D);
  assert.equal(S.grant(null, 'quarter', NOW).until, NOW + 91 * D);
  const cur = { plan: 'month', until: NOW + 10 * D };
  assert.equal(S.grant(cur, 'month', NOW).until, NOW + 40 * D, 'qolgan 10 kun yo\'qolmaydi');
  const old = { plan: 'month', until: NOW - 5 * D };
  assert.equal(S.grant(old, 'month', NOW).until, NOW + 30 * D, 'tugagan obuna bugundan boshlanadi');
});

test('o\'quv yili 30-iyunda tugaydi; iyuldan keyin — keyingi yil', () => {
  const end = new Date(S.grant(null, 'year', NOW).until);
  assert.deepEqual([end.getFullYear(), end.getMonth(), end.getDate()], [2027, 5, 30]);
  const may = new Date(2027, 4, 10).getTime();
  assert.equal(new Date(S.schoolYearEnd(may)).getFullYear(), 2027);
  const aug = new Date(2027, 7, 20).getTime();
  assert.equal(new Date(S.schoolYearEnd(aug)).getFullYear(), 2028);
  const longer = { plan: 'quarter', until: new Date(2027, 8, 1).getTime() };
  assert.equal(S.grant(longer, 'year', NOW).until, longer.until, 'uzunroq obuna qisqarmaydi');
});

test('noma\'lum tarif rad etiladi; admin uid yoziladi', () => {
  assert.throws(() => S.grant(null, 'forever', NOW));
  assert.equal(S.grant(null, 'month', NOW, 'adm1').by, 'adm1');
});

test('holat: faol, tugagan, yo\'q', () => {
  assert.deepEqual(S.status({ plan: 'month', until: NOW + 2.5 * D }, NOW), { active: true, expired: false, plan: 'month', until: NOW + 2.5 * D, daysLeft: 3 });
  assert.equal(S.status({ plan: 'month', until: NOW - 1 }, NOW).expired, true);
  assert.deepEqual(S.status(null, NOW), { active: false, expired: false, plan: null, until: 0, daysLeft: 0 });
  assert.equal(S.status({ until: 'abc' }, NOW).active, false, 'buzuq qiymat obuna bermaydi');
});

test('kim ko\'ra oladi: obunali o\'quvchi, o\'qituvchi, admin; ochiq rejimda hamma', () => {
  const st = { role: 'student' };
  assert.equal(S.canPaid(st, NOW, true), false);
  assert.equal(S.canPaid({ ...st, sub: { plan: 'month', until: NOW + D } }, NOW, true), true);
  assert.equal(S.canPaid({ ...st, sub: { plan: 'month', until: NOW - D } }, NOW, true), false);
  assert.equal(S.canPaid({ role: 'teacher' }, NOW, true), true);
  assert.equal(S.canPaid({ role: 'admin' }, NOW, true), true);
  assert.equal(S.canPaid(st, NOW, false), true, 'Firebase sozlanmagan — ochiq');
});

test('qaysi sahifa pullik', () => {
  assert.equal(S.featureOf('g6-5', 'content'), null, '6-sinf dars matni bepul');
  assert.equal(S.featureOf('g6-5', 'lab'), 'lab');
  assert.equal(S.featureOf('g6-5', 'quiz'), 'tests');
  assert.equal(S.featureOf('g6-5', 'pages'), 'pages');
  assert.equal(S.featureOf('g7-3', 'content'), 'g7');
  assert.equal(S.featureOf('g8-1'), 'g8');
  assert.equal(S.featureOf('tests'), 'tests');
  assert.equal(S.featureOf('lab-soda-vinegar'), 'lab');
  assert.equal(S.featureOf('book-g6'), 'pages');
  for (const free of ['home', 'g6', 'g7', 'lab', 'ptable', 'ptable-26', 'me', 'certificate']) assert.equal(S.featureOf(free), null, free);
});

test('sana dd.mm.yyyy', () => {
  assert.equal(S.fmtDate(new Date(2027, 5, 30).getTime()), '30.06.2027');
  assert.equal(S.fmtDate(0), '');
});
