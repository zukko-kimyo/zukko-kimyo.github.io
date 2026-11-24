// Fan darsliklari: admin PDF yuklaydi (pdf.js) → sahifalar Firebase'da; o'quvchi bepul mavzuni ko'radi, qolganiga obuna kerak.
import { test, expect, bootstrapAdmin, login, logout, waitReady } from './fixtures.mjs';
import { fileURLToPath } from 'node:url';
const fx = (n) => fileURLToPath(new URL('./fixtures/' + n, import.meta.url));
const go = (page, h) => page.evaluate((h) => { location.hash = '#' + h; }, h);

test('admin darslik PDF\'ini yuklaydi; o\'quvchi bepul mavzu sahifalarini ko\'radi, 4-mavzuga obuna kerak', async ({ page }) => {
  test.slow();
  await bootstrapAdmin(page);
  await go(page, 'admin');
  const row = page.locator('tr[data-bk="eng-1-1"]');
  await expect(row).toContainText('Yuklanmagan', { timeout: 20_000 });
  // mos kelmaydigan fayl rad etiladi
  await row.locator('input[data-i]').setInputFiles(fx('book-short.pdf'));
  await expect(row.locator('.bk-st')).toContainText('mos kelmaydi', { timeout: 30_000 });
  // to'liq darslik
  await row.locator('input[data-i]').setInputFiles(fx('book-104.pdf'));
  await expect(row.locator('.bk-st')).toContainText('Yuklandi: 100 sahifa', { timeout: 90_000 });
  const doc = await page.evaluate(() => { const c = JSON.parse(localStorage.getItem('zk_mock_db')).col; return [Object.keys(c.content || {}).length, c.content['eng-1-1-5'], c.contentIndex['eng-1-1']]; });
  expect(doc[0]).toBe(100);
  expect(doc[1]).toMatchObject({ s: 'eng', g: 1, part: 1, p: 5, n: 1 });
  expect(doc[1].img).toMatch(/^data:image\/(webp|jpeg);base64,/);
  expect(doc[1].w).toBe(1500); // tiniq sahifa: 1500 px enlik
  expect(doc[1].img.length).toBeLessThan(950001);
  expect(doc[2].pages).toBe(100);

  // admin: mavzu sahifalari ko'rinadi
  await go(page, 's/eng/1/1/1');
  await page.locator('.tabs button[data-tab=pages]').click();
  await expect(page.locator('#sjPages img')).toHaveCount(2);

  // obunasiz o'quvchi: 1-mavzu ochiq, 4-mavzu yopiq
  await page.evaluate(() => {
    const db = JSON.parse(localStorage.getItem('zk_mock_db'));
    db.auth.stu1 = { email: 'laylo.s@zukko-kimyo.uz', pw: 'secret1' };
    db.col.users.stu1 = { login: 'laylo.s', name: 'Laylo', role: 'student', cls: '1A', status: 'active' };
    localStorage.setItem('zk_mock_db', JSON.stringify(db));
  });
  await logout(page);
  await login(page, 'laylo.s', 'secret1');
  await waitReady(page);
  await go(page, 's/eng/1/1/2');
  await page.locator('.tabs button[data-tab=pages]').click();
  await expect(page.locator('#sjPages img')).toHaveCount(2);
  await go(page, 's/eng/1');
  await expect(page.locator('a.zk-sjtopic[href="#s/eng/1/1/4"].locked')).toHaveCount(1);
  await go(page, 's/eng/1/1/4');
  await expect(page.locator('#sjBody .zk-pay h2')).toContainText(/ingliz tili obunasi/i);
  await expect(page.locator('#sjPages img')).toHaveCount(0);
});

test('darslik yuklanmagan bo\'lsa — tushunarli xabar', async ({ page }) => {
  await bootstrapAdmin(page);
  await go(page, 's/math/1/1/1');
  await expect(page.locator('#sjBody')).toContainText('hali yuklanmagan');
  await page.locator('.tabs button[data-tab=pages]').click();
  await expect(page.locator('#sjPages')).toContainText('hali yuklanmagan');
});
