/* Zukko Kimyo 2.0: critical regression tests, no external dependencies. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { createRequire } from 'node:module';

const dir = fileURLToPath(new URL('.', import.meta.url));
const root = join(dir, '../..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const require = createRequire(import.meta.url);
const stats = require('../../lib/stats.js');
const today = new Date();
today.setHours(12, 0, 0, 0);
const DAY = 86_400_000;
const date = (i) => stats.ymd(new Date(today.getTime() - i * DAY));

test('seven-day activity counts only the last seven days and ignores pending accounts', () => {
  const users = [
    { id: 'a', name: 'A', cls: '6A', role: 'student' },
    { id: 'b', name: 'B', cls: '6A', role: 'student' },
    { id: 'c', name: 'C', cls: '7A', role: 'student' },
    { id: 'p', name: 'Pending', cls: '7A', role: 'student', status: 'pending' }
  ];
  const progress = {
    a: { data: JSON.stringify({ days: { [date(0)]: { xp: 20 }, [date(6)]: { xp: 15 }, [date(7)]: { xp: 999 } } }) },
    b: { data: JSON.stringify({ days: { [date(1)]: { xp: 5 } } }) },
    c: { data: JSON.stringify({ days: { [date(2)]: { xp: 40 } } }) },
    p: { data: JSON.stringify({ days: { [date(0)]: { xp: 9000 } } }) }
  };
  assert.equal(stats.weeklyXp(progress.a, today), 35);
  assert.deepEqual(stats.weeklyTopStudents(users, progress, 3, today.getTime()).map(x => [x.id, x.xp]), [['c', 40], ['a', 35], ['b', 5]]);
  assert.deepEqual(stats.weeklyClassBattle(users, progress, today.getTime()).map(x => [x.cls, x.total, x.average]), [['7A', 40, 40], ['6A', 40, 20]]);
});

function mockProgress() {
  const old = Date.now() - 2 * DAY;
  const state = {
    xp: 80,
    L: { 'g6-1': { v: 1, best: 10, done: old, lab: 1 } },
    labs: { 'soda-vinegar': old },
    days: {},
    goal: 10,
    ach: {},
    goalDone: {}
  };
  const storage = new Map([['zk_prog', JSON.stringify(state)]]);
  const context = {
    document: {
      documentElement: { lang: 'uz' },
      getElementById: () => null
    },
    localStorage: {
      getItem: (k) => storage.get(k) ?? null,
      setItem: (k, v) => storage.set(k, v)
    },
    Lab: { exps: { 'soda-vinegar': { lessons: [[6, 1]] } } },
    location: { hash: '#g6-1' },
    matchMedia: () => ({ matches: true }),
    Event: class { constructor(type) { this.type = type; } },
    setTimeout: () => 0,
    addEventListener() {},
    dispatchEvent() {}
  };
  context.window = context;
  vm.runInNewContext(read('progress.js'), context, { filename: 'progress.js' });
  return context;
}

test("repeat quiz and repeat 3D experiment count for today's goals without farming XP", () => {
  const win = mockProgress();
  const before = win.XP.s.xp;
  win.XP.lab('soda-vinegar');
  win.XP.quiz('g6', 1, 8, 10);
  const dayEntry = win.XP.s.days[date(0)];
  assert.deepEqual(Array.from(dayEntry.labAttempts), ['soda-vinegar']);
  assert.deepEqual(Array.from(dayEntry.quizAttempts), ['g6-1']);
  assert.equal(win.XP.s.xp, before);

  vm.runInNewContext(read('student-dashboard.js'), win, { filename: 'student-dashboard.js' });
  const books = {
    g6: { lessons: [{ t: { uz: 'Kimyo' } }] },
    g7: { lessons: [{ t: { uz: 'Atom' } }] },
    g8: { lessons: [{ t: { uz: 'Element' } }] }
  };
  const html = win.ZKDashboard.render({ lang: 'uz', B: books, tr: (text) => text.uz });
  assert.match(html, /Bugungi vazifalar/);
  assert.match(html, /2\/3/);
  assert.equal((html.match(/class="zk-quest done"/g) || []).length, 2);
});

test('invalid lesson quiz score cannot change local XP', () => {
  const win = mockProgress();
  const prev = JSON.stringify(win.XP.s);
  assert.equal(win.XP.quiz('g6', 1, 9, 0), 0);
  assert.equal(win.XP.quiz('g6', 1, -2, 10), 0);
  assert.equal(win.XP.quiz('g6', 1, 11, 10), 0);
  assert.equal(JSON.stringify(win.XP.s), prev);
});

test('certificate is locked until 10 mastered lessons and marked UNOFFICIAL', () => {
  const ctx = {
    XP: { s: { xp: 250, L: {}, labs: {} }, level: () => ({ L: 3 }) }
  };
  ctx.window = ctx;
  vm.runInNewContext(read('certificate.js'), ctx, { filename: 'certificate.js' });
  const page = { innerHTML: '', querySelector: () => null };
  ctx.ZKCertificate.render(page, { lang: 'en' });
  assert.match(page.innerHTML, /zk-cert-locked/);
  assert.doesNotMatch(page.innerHTML, /zk-cert-print/);
  for (let i = 1; i <= 10; i++) ctx.XP.s.L['g6-' + i] = { done: Date.now() };
  ctx.ZKCertificate.render(page, { lang: 'en' });
  assert.match(page.innerHTML, /zk-cert-print/);
  assert.match(page.innerHTML, /UNOFFICIAL/);
});

test('attendance security rules limit collection access to admin and validate date', () => {
  const src = read('firestore.rules');
  const start = src.indexOf('match /attendance/{id}');
  const end = src.indexOf('match /{document=**}', start);
  assert.ok(start >= 0 && end > start);
  const rule = src.slice(start, end);
  assert.match(rule, /allow read: if isAdmin\(\);/);
  assert.match(rule, /allow create, update: if isAdmin\(\)/);
  assert.match(rule, /data\.date\.matches/);
  assert.match(rule, /data\.entries\.size\(\) <= 120/);
});

test('new application scripts remain parseable and are loaded by index.html', () => {
  const index = read('index.html');
  const scripts = ['student-dashboard.js', 'attendance.js', 'lab-guide.js', 'admin-weekly.js', 'certificate.js'];
  for (const path of scripts) {
    assert.ok(index.includes("'" + path + "'"), path + ' must be loaded');
    assert.doesNotThrow(() => new Function(read(path)), path + ' must parse');
  }
  assert.ok(index.includes("'ptable-3d.js'"), 'existing 3D periodic table integration is preserved');
});


test('3D experiment page includes exactly one guide mount point', () => {
  const src = read('app.js');
  const begin = src.indexOf('function labPage(id)');
  const end = src.indexOf('function openModal(id)', begin);
  assert.ok(begin >= 0 && end > begin, '3D experiment router should exist');
  const page = src.slice(begin, end);
  assert.match(page, /id="zkLabGuide"/);
  assert.match(page, /ZKLabGuide\.mount/);
  assert.equal((src.match(/id="zkLabGuide"/g) || []).length, 1, 'guide host must not be accidentally placed in lesson viewer');
});
