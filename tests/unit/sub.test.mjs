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

test('har bir sinfda dastlabki mavzular bepul (standart 3, admin o\'zgartiradi)', () => {
  assert.equal(S.freeCount({}), 3);
  assert.equal(S.freeCount({ freeN: 2 }), 2);
  assert.equal(S.freeCount({ freeN: 0 }), 0);
  for (const bad of [-1, 2.5, '5', 99, null]) assert.equal(S.freeCount({ freeN: bad }), 3, String(bad));
  assert.equal(S.lessonOpen(false, 1, 3), true);
  assert.equal(S.lessonOpen(false, 3, 3), true);
  assert.equal(S.lessonOpen(false, 4, 3), false);
  assert.equal(S.lessonOpen(false, 0, 3), false);
  assert.equal(S.lessonOpen(true, 30, 3), true, 'obuna yoki xodim — hammasi');
});

test('3D tajriba bepul darsga bog\'langan bo\'lsa ochiq', () => {
  assert.equal(S.labOpen(false, { lessons: [[6, 9], [7, 2]] }, 3), true, '7-sinf 2-mavzu bepul');
  assert.equal(S.labOpen(false, { lessons: [[6, 9], [8, 12]] }, 3), false);
  assert.equal(S.labOpen(false, { lessons: [] }, 3), false);
  assert.equal(S.labOpen(false, null, 3), false);
  assert.equal(S.labOpen(true, { lessons: [[8, 12]] }, 3), true);
});

test('sana dd.mm.yyyy', () => {
  assert.equal(S.fmtDate(new Date(2027, 5, 30).getTime()), '30.06.2027');
  assert.equal(S.fmtDate(0), '');
});

test('har fanga alohida obuna; eski `sub` — kimyo', () => {
  const u = { role: 'student', sub: { plan: 'month', until: NOW + D }, subs: { math: { plan: 'year', until: NOW + 9 * D } } };
  assert.equal(S.canPaid(u, NOW, true, 'chem'), true, 'eski yozuv kimyo uchun amal qiladi');
  assert.equal(S.canPaid(u, NOW, true), true, 'fan ko\'rsatilmasa — kimyo');
  assert.equal(S.canPaid(u, NOW, true, 'math'), true);
  assert.equal(S.canPaid(u, NOW, true, 'eng'), false);
  assert.equal(S.subOf(u, 'math').plan, 'year');
  assert.equal(S.subOf({ role: 'student', subs: { chem: { until: 5 } }, sub: { until: 9 } }, 'chem').until, 5, 'yangi yozuv ustun');
});

test('o\'qituvchi faqat biriktirilgan fani bo\'yicha to\'liq ko\'radi; admin — hammasini', () => {
  assert.deepEqual(S.teacherSubjects({ role: 'teacher' }), ['chem'], 'eski o\'qituvchi — kimyo');
  const t = { role: 'teacher', subjects: ['math'] };
  assert.equal(S.canPaid(t, NOW, true, 'math'), true);
  assert.equal(S.canPaid(t, NOW, true, 'chem'), false);
  assert.equal(S.canPaid({ role: 'admin' }, NOW, true, 'rus'), true);
  assert.deepEqual(S.teacherSubjects({ role: 'student', subjects: ['math'] }), []);
});
