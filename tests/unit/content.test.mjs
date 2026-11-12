// Dars ma'lumotlari va test banki to'liqligini tekshiradi (brauzersiz, node:vm orqali).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

function load(files) {
  const ctx = { console, Math, Date, JSON };
  ctx.window = ctx; ctx.document = { documentElement: { lang: 'uz' } };
  vm.createContext(ctx);
  for (const f of files) vm.runInContext(readFileSync(f, 'utf8'), ctx, { filename: f });
  return ctx;
}
const W = load(['data-g6.js', 'data-g7.js', 'data-g8.js', 'tests.js', 'tests-g8.js']);
const GR = { g6: 6, g7: 7, g8: 8 };
const bi = (o) => o && typeof o === 'object' && typeof o.uz === 'string' && typeof o.en === 'string' && o.uz.trim() && o.en.trim();

test('uch sinf kitobi mavjud', () => {
  for (const g of Object.keys(GR)) assert.ok(W.BOOKS[g]?.lessons?.length > 30, `${g} darslari`);
});

for (const g of Object.keys(GR)) {
  test(`${g}: har bir darsda sarlavha ikki tilda`, () => {
    const bad = [...W.BOOKS[g].lessons].map((L, i) => (bi(L.t) ? null : i + 1)).filter(Boolean);
    assert.deepEqual(bad, [], `sarlavhasi to'liq bo'lmagan darslar: ${bad.join(', ')}`);
  });

  // pool(g, n) -> { easy: [...], medium: [...], hard: [...] }; savol: { q:{uz,en}, o:[{uz,en}...], a: to'g'ri javob indeksi }
  const all = (i) => { const P = W.QB.pool(g, i); return [...P.easy, ...P.medium, ...P.hard]; };

  test(`${g}: har bir darsda kamida 10 ta test savoli`, () => {
    const n = W.BOOKS[g].lessons.length; const bad = [];
    for (let i = 1; i <= n; i++) { const k = all(i).length; if (k < 10) bad.push(`${i} (${k})`); }
    assert.deepEqual(bad, []);
  });

  test(`${g}: lessonTest() 10 ta savoldan iborat test tuzadi`, () => {
    const n = W.BOOKS[g].lessons.length; const bad = [];
    for (let i = 1; i <= n; i++) { const t = W.QB.lessonTest(g, i); if (t.length !== 10) bad.push(`${i} (${t.length})`); }
    assert.deepEqual(bad, []);
  });

  test(`${g}: har savolda matn, variantlar va to'g'ri javob bor`, () => {
    const n = W.BOOKS[g].lessons.length; const bad = [];
    for (let i = 1; i <= n; i++) {
      for (const q of all(i)) {
        const ok = q.q && (typeof q.q === 'string' || bi(q.q)) && Array.isArray(q.o) && q.o.length >= 2 && Number.isInteger(q.a) && q.a >= 0 && q.a < q.o.length;
        if (!ok) bad.push(`${i}:${q.id}`);
      }
    }
    assert.deepEqual(bad, []);
  });
}
