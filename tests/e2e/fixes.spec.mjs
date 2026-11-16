// Ko'rinadigan xatolar tuzatishlari (2026-11-16): planshet header, imtihon taymeri, telefonda sakrash, 3D tozalash.
import { test, expect, waitReady } from './fixtures.mjs';

test('planshet kengligida (761–960px) header ekrandan chiqmaydi', async ({ page }) => {
  for (const w of [761, 768, 834, 960]) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.goto('/index.html#home'); await waitReady(page);
    const r = await page.evaluate(() => ({ over: document.documentElement.scrollWidth - innerWidth, burger: document.getElementById('burger').getBoundingClientRect().right }));
    expect(r.over, `${w}px`).toBeLessThanOrEqual(1);
    expect(r.burger, `${w}px`).toBeLessThanOrEqual(w);
  }
});

test('imtihonda javob berilganda taymer "--:--" ko\'rsatmaydi', async ({ page }) => {
  await page.goto('/index.html#tests'); await waitReady(page);
  await page.locator('input[name=md][value="exam"]').check();
  await page.locator('#tgo').click();
  await expect(page.locator('.tm')).not.toHaveText('--:--');
  await page.locator('.tr-opts button').first().click();
  await expect(page.locator('.tm')).toHaveText(/^\d+:\d\d$/);
});

test('dars sahifasida til almashganda sahifa pastga sakramaydi', async ({ page }) => {
  await page.goto('/index.html#g6-30'); await waitReady(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.locator('header .lang button[data-lang="en"]').click();
  await page.waitForTimeout(400);
  expect(await page.evaluate(() => scrollY)).toBeLessThan(50);
});

test('dars tabi almashganda 3D sahna to\'xtatiladi', async ({ page }) => {
  await page.goto('/index.html#g6-5'); await waitReady(page);
  await page.locator('.lesson-top .tabs button[data-tab="lab"]').click();
  await page.waitForTimeout(800);
  await page.locator('.lesson-top .tabs button[data-tab="content"]').click();
  await page.waitForTimeout(300);
  // yashirin animatsiya sikli qolmagan: 1 soniyada requestAnimationFrame deyarli chaqirilmaydi
  const calls = await page.evaluate(() => new Promise((res) => {
    let n = 0; const raf = window.requestAnimationFrame;
    window.requestAnimationFrame = (f) => { n++; return raf.call(window, f); };
    setTimeout(() => { window.requestAnimationFrame = raf; res(n); }, 1000);
  }));
  expect(calls).toBeLessThan(10);
});
