import { test, expect, waitReady } from './fixtures.mjs';

/* Visual v3 release gates: real browser/mobile, not just stylesheet text checks. */
test('new premium home renders dark science hero and redesigned grade sections', async ({ page }) => {
  await page.goto('/index.html#home');
  await waitReady(page);
  await expect(page.locator('body')).toHaveClass(/zk-v3/);
  await expect(page.locator('.top .zk-school-name')).toContainText('ZUKKO XALQARO');
  await expect(page.locator('.top .zk-subject')).toHaveText('KIMYO');
  await expect(page.locator('#app .zk-hero-v3')).toBeVisible();
  await expect(page.locator('#app .zk-hero-v3 h1')).toContainText('Kimyoni ko‘r.');
  await expect(page.locator('#app .zk-quick-item')).toHaveCount(3);
  await expect(page.locator('#app .grades .gcard')).toHaveCount(3);
  await expect(page.locator('#app .grades .zk-grade-number')).toHaveText(['06','07','08']);

  // Confirms the last stylesheet was fetched and the original orange hero replaced.
  const design = await page.evaluate(async () => {
    const response = await fetch('visual-v3.css?v=20261112-premium-01');
    const hero = document.querySelector('.zk-hero-v3');
    return { status: response.status, color: getComputedStyle(hero).backgroundColor };
  });
  expect(design.status).toBe(200);
  expect(design.color).toBe('rgb(2, 43, 46)'); // brand.css: Zukko teal (2026-11-13)
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  expect(overflow, 'premium theme must not create sideways scroll').toBeLessThanOrEqual(1);
});

test('new grade cards navigate to real lessons without breaking routes', async ({ page }) => {
  await page.goto('/index.html#home');
  await waitReady(page);
  await page.locator('.grades .gcard.g7').click();
  await expect(page).toHaveURL(/#g7$/);
  await expect(page.locator('#app .page-h.g7')).toBeVisible();
  await expect(page.locator('#app .lcard').first()).toBeVisible();
});

test('mobile masthead keeps subject label and has an accessible search control', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile-only layout assertion');
  await page.goto('/index.html#home');
  await waitReady(page);
  await expect(page.locator('.top .zk-subject')).toBeVisible();
  await expect(page.locator('header .search input')).toBeVisible();
  await expect(page.locator('header .burger')).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
