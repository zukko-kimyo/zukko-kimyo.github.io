import { test, expect, waitReady } from './fixtures.mjs';

test('original Zukko school emblem loads in the masthead, without placeholder Z', async ({ page }) => {
  await page.goto('/index.html#home');
  await waitReady(page);
  const logo = page.locator('header.top .logo .mark img');
  await expect(logo).toBeVisible();
  await expect(page.locator('header.top .logo .mark')).not.toHaveText('Z');
  const img = await logo.evaluate((el) => ({
    complete:el.complete, width:el.naturalWidth, height:el.naturalHeight,
    src:new URL(el.currentSrc).pathname,
    shownWidth:el.getBoundingClientRect().width,
    shownHeight:el.getBoundingClientRect().height,
  }));
  expect(img.src).toBe('/assets/zukko-mark.svg'); // 2026-11-13: yangi rasmiy logotip belgisi
  expect(img.complete).toBe(true);
  expect(img.width).toBeGreaterThan(40); // SVG width=139
  expect(img.height).toBeGreaterThan(40);
  expect(img.shownWidth).toBeGreaterThanOrEqual(15); // yangi belgi tik (qalam): ~20×46px
  expect(img.shownHeight).toBeGreaterThanOrEqual(30);
  await expect(page.locator('header.top .zk-school-name')).toContainText('ZUKKO XALQARO');
});

test('logo remains visible at small phone widths 320, 360 and 390', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile-specific test');
  await page.goto('/index.html#home');
  await waitReady(page);
  for (const width of [320, 360, 390]) {
    await page.setViewportSize({ width, height:720 });
    const img = page.locator('header.top .logo .mark img');
    await expect(img).toBeVisible();
    expect(await img.evaluate(el => el.naturalWidth)).toBeGreaterThan(40);
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  }
});
