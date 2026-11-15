import { test, expect, waitReady } from './fixtures.mjs';

/* Shisha 2.0 dizayni va tungi rejim (2026-11-15). */

const bg = (page) => page.evaluate(() => getComputedStyle(document.body).backgroundColor);

test('dark mode: toggle switches theme, remembers the choice and survives reload', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/index.html#home'); await waitReady(page);
  const html = page.locator('html');
  await expect(html).toHaveAttribute('data-theme', 'light');
  const btn = page.locator('#themeBtn');
  await expect(btn).toBeVisible();
  await expect(btn).toHaveAttribute('aria-label', 'Tungi rejimga o‘tish');
  await expect(btn).toHaveAttribute('aria-pressed', 'false');
  await btn.click();
  await expect(html).toHaveAttribute('data-theme', 'dark');
  await expect(btn).toHaveAttribute('aria-pressed', 'true');
  await expect(btn).toHaveAttribute('aria-label', 'Kunduzgi rejimga o‘tish');
  expect(await page.evaluate(() => localStorage.getItem('zk_theme'))).toBe('dark');
  await expect.poll(() => bg(page)).toBe('rgb(6, 19, 21)');
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#061315');
  // qayta yuklanganda ham tungi — mavzu sahifa chizilishidan oldin qo'yiladi
  await page.reload();
  expect(await page.evaluate(() => document.documentElement.dataset.theme)).toBe('dark');
  await waitReady(page);
  await btn.click();
  await expect(html).toHaveAttribute('data-theme', 'light');
  expect(await page.evaluate(() => localStorage.getItem('zk_theme'))).toBe('light');
});

test('dark mode follows the device setting when nothing is saved', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/index.html#home'); await waitReady(page);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  // matn o'qiladi: sarlavha och, fon to'q
  const c = await page.evaluate(() => getComputedStyle(document.querySelector('.zk-hero-v3 h1')).color);
  expect(c).toBe('rgb(230, 242, 241)');
});

test('dark mode leaves no white cards on the lesson page', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/index.html#g6-5'); await waitReady(page);
  await expect(page.locator('.lesson-top .tabs')).toBeVisible();
  const light = await page.evaluate(() => {
    const parse = (c) => (c.match(/[\d.]+/g) || []).map(Number);
    return [...document.querySelectorAll('#app *')].filter((e) => {
      const r = e.getBoundingClientRect(); if (r.width * r.height < 2000) return false;
      const [R, G, B, A = 1] = parse(getComputedStyle(e).backgroundColor);
      return A > 0.5 && R > 200 && G > 200 && B > 200 && !e.closest('.ptcell,.ptbig,canvas');
    }).map((e) => e.className);
  });
  expect(light).toEqual([]);
});

test('lesson tabs: sliding indicator, aria-selected and unit colour text that stays readable', async ({ page }) => {
  await page.goto('/index.html#g6-1'); await waitReady(page);
  const tabs = page.locator('.lesson-top .tabs');
  await expect(tabs.locator('.tthumb')).toHaveCount(1);
  await expect(tabs.locator('button[data-tab="content"]')).toHaveAttribute('aria-selected', 'true');
  await tabs.locator('button[data-tab="quiz"]').click();
  await expect(page.locator('.lesson-top .tabs button[data-tab="quiz"]')).toHaveAttribute('aria-selected', 'true');
  expect(await page.evaluate(() => getComputedStyle(document.querySelector('.tthumb')).getPropertyValue('--ti').trim())).toBe('3');
  // 1-bo'lim to'q sariq (#ff7a1a): oq matn o'qilmaydi -> raqam to'q rangda
  await page.goto('/index.html#g6'); await waitReady(page);
  await expect(page.locator('.lcard .lnum').first()).toBeVisible();
  const num = await page.evaluate(() => getComputedStyle(document.querySelector('.lcard .lnum')).color);
  expect(num).toBe('rgb(15, 42, 44)');
});

test('home shows a continue card in the hero', async ({ page }) => {
  await page.goto('/index.html#home'); await waitReady(page);
  const card = page.locator('#app .zk-hero-cont');
  await expect(card).toBeVisible();
  await expect(card).toHaveAttribute('href', /#g[678]-\d+/);
  await card.click();
  await expect(page.locator('.lesson-top h1')).toBeVisible();
});

test('header fits on the screen with the theme button (desktop and phone)', async ({ page }) => {
  await page.goto('/index.html#home'); await waitReady(page);
  const r = await page.evaluate(() => {
    const b = document.getElementById('themeBtn').getBoundingClientRect();
    return { right: b.right, w: b.width, h: b.height, vw: innerWidth, over: document.documentElement.scrollWidth - innerWidth };
  });
  expect(r.right).toBeLessThanOrEqual(r.vw);
  expect(r.w).toBeGreaterThanOrEqual(38);
  expect(r.over).toBeLessThanOrEqual(1);
});

test('reduced motion: theme still switches without animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'light' });
  await page.goto('/index.html#home'); await waitReady(page);
  await page.locator('#themeBtn').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('html')).not.toHaveClass(/zk-theming/);
});

test('login screen has the dark mode toggle too', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/index.html?mock#home'); await waitReady(page);
  const b = page.locator('.zk-gate .zk-gate-theme');
  await expect(b).toBeVisible();
  await b.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(b).toHaveAttribute('aria-label', 'Kunduzgi rejimga o‘tish');
});
