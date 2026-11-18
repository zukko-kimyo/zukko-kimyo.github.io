// Uch tilli sayt: rus tiliga o'tish asosiy sahifalarni ruscha ko'rsatadi, tanlov saqlanadi.
import { test, expect, waitReady } from './fixtures.mjs';

const go = (page, h) => page.evaluate((h) => { location.hash = '#' + h; }, h);
const latinOnly = (s) => /[a-z]/i.test(s) && !/[а-яё]/i.test(s);

test('RU tugmasi: html lang=ru, menyu va sahifalar ruscha, qayta yuklanganda saqlanadi', async ({ page }) => {
  const errors = []; page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto('/index.html#home'); await waitReady(page);
  await page.locator('header .lang button[data-lang=ru]').click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  await expect(page.locator('header .lang button[data-lang=ru]')).toHaveClass(/on/);

  // asosiy sahifa sarlavhasida kirillcha matn
  const h = await page.locator('#app').innerText();
  expect(/[а-яё]/i.test(h), 'asosiy sahifada ruscha matn bo\'lishi kerak').toBe(true);

  // fanlar ruscha nomlar bilan
  await go(page, 'fanlar');
  await expect(page.locator('.zk-sjcard').first()).toBeVisible();
  await expect(page.locator('#app')).toContainText('Математика');
  await expect(page.locator('#app')).toContainText('Русский язык');

  // davriy jadval: element nomi ruscha
  await go(page, 'ptable-26');
  await expect(page.locator('.ptinfo h3')).toContainText('Железо');

  // "Mening natijalarim" sahifasi ruscha
  await go(page, 'me');
  await expect(page.locator('#app')).toContainText('Значки');

  // qayta yuklash — til saqlanadi
  await page.reload(); await waitReady(page);
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');

  // dars sahifasi tab nomlari lotincha qolmasligi kerak
  await go(page, 'g7-5');
  await expect(page.locator('.tabs button')).toHaveCount(4);
  const tabs = await page.locator('.tabs button').allInnerTexts();
  for (const t of tabs) expect(latinOnly(t.replace(/\d+/g, '')), `tab "${t}" ruscha bo'lishi kerak`).toBe(false);

  expect(errors, errors.join('\n')).toEqual([]);
});
