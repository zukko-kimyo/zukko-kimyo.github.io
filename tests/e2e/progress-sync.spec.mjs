// O'quvchi natijalari yo'qolmasligi (2026-11-16): server o'qish xatosi, internetsiz chiqish, ikki nusxani birlashtirish.
import { test, expect, bootstrapAdmin, logout, login, waitReady } from './fixtures.mjs';

const remote = (page) => page.evaluate(() => {
  const db = JSON.parse(localStorage.getItem('zk_mock_db') || '{}');
  const uid = Object.keys(db.auth || {}).find((u) => db.auth[u].email.startsWith('admin@'));
  const p = ((db.col || {}).progress || {})[uid];
  return p ? { xp: p.xp, L: Object.keys(JSON.parse(p.data).L || {}) } : null;
});
// Tez almashganda oraliq sahifa o'tkazib yuborilishi mumkin (View Transition), shuning uchun aynan shu dars ochilganini kutamiz
const visit = async (page, h) => {
  await page.evaluate((h) => { location.hash = '#' + h; }, h);
  await expect(page.locator('.lesson-top h1')).toBeVisible();
  await expect.poll(() => page.evaluate((h) => !!(window.XP && XP.s && (XP.s.L || {})[h]), h), { timeout: 8_000 }).toBe(true);
};
const flush = (page) => page.evaluate(() => window.dispatchEvent(new Event('online')));

test('server natijasini o\'qib bo\'lmasa, bo\'sh natija serverdagi XP ustidan yozilmaydi; aloqa tiklanganda birlashtiriladi', async ({ page }) => {
  await bootstrapAdmin(page);
  for (const h of ['g6-1', 'g6-2', 'g6-3']) await visit(page, h);
  await flush(page);
  await expect.poll(async () => (await remote(page))?.xp || 0, { timeout: 10_000 }).toBeGreaterThanOrEqual(15);
  const before = await remote(page);

  // "Yangi qurilma": mahalliy natija yo'q, server natijasini o'qish esa xato beradi
  await page.evaluate(() => { localStorage.removeItem('zk_prog'); localStorage.removeItem('zk_prog_owner'); localStorage.setItem('zk_mock_fail', JSON.stringify({ 'progress:get': true })); });
  await page.reload(); await waitReady(page);
  await visit(page, 'g7-1');
  await flush(page); await page.waitForTimeout(3500);
  expect(await remote(page)).toEqual(before); // yo'qolmadi, ustidan yozilmadi

  // Aloqa tiklandi: ikkala nusxa birlashadi
  await page.evaluate(() => localStorage.removeItem('zk_mock_fail'));
  await visit(page, 'g7-2');
  await flush(page);
  await expect.poll(async () => (await remote(page))?.L || [], { timeout: 10_000 }).toEqual(expect.arrayContaining(['g6-1', 'g6-2', 'g6-3', 'g7-1', 'g7-2']));
  expect((await remote(page)).xp).toBeGreaterThanOrEqual(before.xp);
  // xotiradagi holat ham yangilandi: eski darslar "boshlangan" ko'rinadi
  expect(await page.evaluate(() => XP.state('g6', 1))).not.toBe('');
});

test('internetsiz chiqishda ogohlantiriladi, natija zaxiralanadi va keyingi kirishda yuboriladi', async ({ page }) => {
  await bootstrapAdmin(page);
  await page.evaluate(() => localStorage.setItem('zk_mock_fail', JSON.stringify({ 'progress:set': true })));
  await visit(page, 'g8-1');
  await logout(page);
  expect(page.dialogs.some((m) => /saqlanmadi|not saved/.test(m))).toBe(true);
  expect(await page.evaluate(() => Object.keys(localStorage).some((k) => k.startsWith('zk_prog_bak_')))).toBe(true);
  expect(await page.evaluate(() => localStorage.getItem('zk_prog'))).toBeNull(); // keyingi foydalanuvchiga ko'rinmaydi

  await page.evaluate(() => localStorage.removeItem('zk_mock_fail'));
  await login(page, 'admin', 'admin123');
  await expect(page.locator('.zk-gate')).toHaveCount(0); await waitReady(page);
  await expect.poll(async () => (await remote(page))?.L || [], { timeout: 12_000 }).toContain('g8-1');
  expect(await page.evaluate(() => Object.keys(localStorage).some((k) => k.startsWith('zk_prog_bak_')))).toBe(false);
});

test('o\'qituvchi jadvalida natija qiymatlari son sifatida chiqadi (kod emas)', async ({ page }) => {
  await bootstrapAdmin(page);
  // o'quvchi soxta natija yozgan holat (qoidalar endi buni rad etadi, lekin eski ma'lumot bo'lishi mumkin)
  await page.evaluate(() => {
    const db = JSON.parse(localStorage.getItem('zk_mock_db'));
    db.col.users = db.col.users || {}; db.col.progress = db.col.progress || {};
    db.col.users.evil1 = { login: 'evil.s', name: 'Evil Student', role: 'student', cls: '7A' };
    db.col.progress.evil1 = { data: JSON.stringify({ L: { 'g6-1': { v: 1, best: '<img src=x id=pwn2>' } } }), xp: '<img src=x id=pwn1 onerror="window.__pwned=1">', quizAvg: '<b id=pwn3>9</b>', role: 'student' };
    localStorage.setItem('zk_mock_db', JSON.stringify(db));
  });
  await page.reload(); await waitReady(page);
  await page.evaluate(() => { location.hash = '#teacher'; });
  await expect(page.locator('.tc-name').first()).toBeVisible({ timeout: 15_000 });
  await page.waitForTimeout(500);
  expect(await page.evaluate(() => [!!document.getElementById('pwn1'), !!document.getElementById('pwn3'), !!window.__pwned])).toEqual([false, false, false]);
  await page.locator('.tc-name', { hasText: 'Evil Student' }).click();
  await page.waitForTimeout(400);
  expect(await page.evaluate(() => !!document.getElementById('pwn2'))).toBe(false);
});
