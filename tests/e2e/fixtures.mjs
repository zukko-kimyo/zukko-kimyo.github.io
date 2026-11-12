// Umumiy test sozlamalari:
//  - firebase-config.js o'rniga bo'sh sozlama beriladi -> sayt "?mock" bilan sinov rejimida ishlaydi;
//  - THREE_DIR berilsa (internetsiz muhit), three.js CDN o'rniga lokal nusxadan olinadi;
//  - OFFLINE=1 bo'lsa, Google Fonts so'rovlari to'xtatiladi.
import { test as base, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const test = base.extend({
  context: async ({ context }, use) => {
    await context.route(/firebase-config\.js/, (r) => r.fulfill({ contentType: 'application/javascript', body: "window.ZK_CONFIG={firebase:{},loginDomain:'zukko-kimyo.uz'};" }));
    if (process.env.THREE_DIR) {
      await context.route(/three@0\.160\.0\//, async (r) => {
        const rel = r.request().url().split('three@0.160.0/')[1];
        try { r.fulfill({ contentType: 'application/javascript', body: await readFile(join(process.env.THREE_DIR, rel)) }); } catch { r.abort(); }
      });
    }
    if (process.env.OFFLINE) await context.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
    await use(context);
  },
  page: async ({ page }, use, testInfo) => {
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    page.dialogs = [];
    page.on('dialog', (d) => { page.dialogs.push(d.message()); d.accept(); });
    await use(page);
    expect(errors, `JavaScript xatolari (${testInfo.title})`).toEqual([]);
  },
});
export { expect };

export const MOCK = '/index.html?mock';
// Sayt skriptlari yuklanib, sahifa chizilguncha kutish (login oynasi bo'lsa, u chiqguncha).
export async function waitReady(page) {
  await page.waitForFunction(() => document.querySelector('.zk-gate form') || (window.XP && window.ZKT !== undefined && document.querySelector('#app')?.children.length), null, { timeout: 30_000 });
}
export async function gotoMock(page, hash = 'home') { await page.goto(`${MOCK}#${hash}`); await waitReady(page); }
export async function login(page, l, pw) {
  await page.fill('#zkL', l); await page.fill('#zkP', pw); await page.click('.zk-gate .go');
}
export async function bootstrapAdmin(page, pw = 'admin123') {
  await gotoMock(page);
  await login(page, 'admin', pw);
  await page.locator('.zk-gate .alt').click();
  await expect(page.locator('.zk-gate')).toHaveCount(0);
  await waitReady(page);
}
export async function logout(page) {
  await page.locator('#uchip > button').click();
  await page.locator('[data-out]').click();
  await expect(page.locator('.zk-gate form')).toBeVisible({ timeout: 30_000 });
}
