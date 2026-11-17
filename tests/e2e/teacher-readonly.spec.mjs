// O'qituvchi faqat kuzatadi: o'quvchi qo'shish, arizalar, sinf kodlari, parollar va o'chirish — faqat administratorda.
import { test, expect, bootstrapAdmin, login, logout, waitReady } from './fixtures.mjs';

test('o\'qituvchi panelida faqat natijalar; qo\'shish, parol va o\'chirish yo\'q', async ({ page }) => {
  await bootstrapAdmin(page);
  await page.evaluate(() => {
    const db = JSON.parse(localStorage.getItem('zk_mock_db'));
    db.auth = db.auth || {}; db.col.users = db.col.users || {};
    db.auth.tch9 = { email: 'dilnoza.k@zukko-kimyo.uz', pw: 'teach99' };
    db.col.users.tch9 = { login: 'dilnoza.k', name: 'Dilnoza Karimova', role: 'teacher', cls: '' };
    db.col.users.stu9 = { login: 'ali.s', name: 'Ali Sobirov', role: 'student', cls: '7A', status: 'active' };
    localStorage.setItem('zk_mock_db', JSON.stringify(db));
  });
  // admin: barcha tablar joyida
  await page.reload(); await waitReady(page);
  await page.evaluate(() => { location.hash = '#teacher'; });
  await expect(page.locator('#tcTabs [data-t="add"]')).toHaveCount(1);
  await expect(page.locator('#tcTabs [data-t="codes"]')).toHaveCount(1);

  await logout(page);
  await login(page, 'dilnoza.k', 'teach99');
  await waitReady(page);
  await page.evaluate(() => { location.hash = '#teacher'; });
  await expect(page.locator('.tc-name', { hasText: 'Ali Sobirov' })).toBeVisible({ timeout: 15_000 });
  expect(await page.locator('#tcTabs button').evaluateAll((bs) => bs.map((b) => b.dataset.t))).toEqual(['res']);
  await expect(page.locator('[data-pw], [data-del], #tcPw, #tcCards')).toHaveCount(0);
  await expect(page.locator('#tcCsv')).toBeVisible();
  await expect(page.locator('.page-h p')).toContainText(/faqat ko/);
  // tafsilot ko'rinishida ham tahrirlash tugmalari yo'q
  await page.locator('.tc-name', { hasText: 'Ali Sobirov' }).click();
  await expect(page.locator('.tc-det-h')).toBeVisible();
  await expect(page.locator('[data-pw], [data-del], .tc-pw')).toHaveCount(0);
});
