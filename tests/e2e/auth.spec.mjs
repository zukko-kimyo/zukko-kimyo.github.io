// Login tizimi (sinov rejimida): administrator yaratish, kirish, chiqish, noto'g'ri parol.
import { test, expect, gotoMock, login, bootstrapAdmin, logout, waitReady } from './fixtures.mjs';

test('login oynasi chiqadi va administrator birinchi marta yaratiladi', async ({ page }) => {
  await gotoMock(page);
  await expect(page.locator('.zk-gate form')).toBeVisible();
  await login(page, 'admin', 'admin123');
  await expect(page.locator('#zkE')).toContainText("noto'g'ri");
  await page.locator('.zk-gate .alt').click();
  await expect(page.locator('.zk-gate')).toHaveCount(0);
  await waitReady(page);
  await expect(page.locator('#uchip')).toBeVisible();
});

test('chiqish va qayta kirish; noto\'g\'ri parol rad etiladi', async ({ page }) => {
  await bootstrapAdmin(page);
  await logout(page);
  await login(page, 'admin', 'xato-parol');
  await expect(page.locator('#zkE')).toContainText("noto'g'ri");
  await login(page, 'admin', 'admin123');
  await expect(page.locator('.zk-gate')).toHaveCount(0);
});

test('chiqqandan keyin boshqa foydalanuvchining natijasi qolmaydi', async ({ page }) => {
  await bootstrapAdmin(page);
  await logout(page);
  expect(await page.evaluate(() => localStorage.getItem('zk_prog'))).toBeNull();
});
