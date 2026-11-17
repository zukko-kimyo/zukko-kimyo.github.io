// lab-meta.js — 3D tajribalar ro'yxati (three.js yuklanmasdan oldin bosh sahifa, darslar va qidiruv uchun).
// lab-exps*.js o'zgarsa, `node tools/build-lab-meta.mjs` qayta ishga tushirilishi kerak — aks holda bu test yiqiladi.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { buildMeta } from '../../tools/build-lab-meta.mjs';

const cur = fs.readFileSync(new URL('../../lab-meta.js', import.meta.url), 'utf8');

test('lab-meta.js lab-exps*.js bilan mos (eskirmagan)', () => {
  assert.equal(cur, buildMeta(), 'lab-meta.js eskirgan: node tools/build-lab-meta.mjs');
});

test('har bir tajribada nom, ikonka va darslar bor', () => {
  const list = JSON.parse(cur.match(/const list = (\[.*\]);/)[1]);
  assert.ok(list.length >= 50);
  for (const e of list) {
    assert.ok(e.id && e.icon && e.title && e.title.uz && e.title.en, e.id);
    assert.ok(Array.isArray(e.lessons), e.id);
  }
  assert.equal(new Set(list.map((e) => e.id)).size, list.length, 'id takrorlanmasin');
});
