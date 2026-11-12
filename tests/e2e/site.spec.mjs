// Saytning asosiy sahifalari ochiladi, JavaScript xatosi yo'q, telefonda gorizontal siljish yo'q.
import { test, expect, waitReady } from './fixtures.mjs';

test.describe('loginsiz (ochiq) rejim', () => {
  // ?mock'siz ochilganda va config bo'sh bo'lsa login so'ralmaydi
  for (const hash of ['home', 'g6', 'g7', 'g8', 'g8-12', 'tests', 'lab', 'ptable-26', 'book-g7', 'me']) {
    test(`#${hash} sahifasi ochiladi`, async ({ page }) => {
      await page.goto(`/index.html#${hash}`); await waitReady(page);
      await expect(page.locator('#app')).not.toBeEmpty();
      await expect(page.locator('.zk-gate')).toHaveCount(0);
      const sw = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      expect(sw, 'gorizontal siljish bo\'lmasligi kerak').toBeLessThanOrEqual(1);
    });
  }

  test('dars sahifasida 4 ta bo\'lim va 10 ta test savoli bor', async ({ page }) => {
    await page.goto('/index.html#g7-5'); await waitReady(page);
    await expect(page.locator('.tabs button')).toHaveCount(4);
    await page.locator('.tabs button[data-tab=quiz]').click();
    await expect(page.locator('.tabs button[data-tab=quiz] .cnt')).toHaveText('10');
  });

  test('til almashtirish ishlaydi', async ({ page }) => {
    await page.goto('/index.html#home'); await waitReady(page);
    await page.locator('header .lang button[data-lang=en]').click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });
});
