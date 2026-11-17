// Qulaylik (klaviatura va ekran o'quvchi) — 2026-11-16 design/a11y-polish.
import { test, expect, waitReady } from './fixtures.mjs';

test('skip-link ko\'rinadi va fokusni sahifa sarlavhasiga o\'tkazadi', async ({ page }) => {
  await page.goto('/index.html#home'); await waitReady(page);
  await page.locator('#zkSkip').focus();
  await expect(page.locator('#zkSkip')).toBeInViewport();
  await page.keyboard.press('Enter');
  expect(await page.evaluate(() => document.activeElement && document.activeElement.tagName)).toBe('H1');
});

test('sahifa almashganda title yangilanadi va nav linkida aria-current bor', async ({ page }) => {
  await page.goto('/index.html#tests'); await waitReady(page);
  await expect(page).toHaveTitle(/·\s*Zukko Akademiyasi/);
  await expect(page.locator('nav#nav a[aria-current="page"]').first()).toBeAttached();
});

test('dars tablari: role=tab, strelka bilan almashadi', async ({ page }) => {
  await page.goto('/index.html#g6-5'); await waitReady(page);
  const first = page.locator('[role=tablist] [role=tab]').first();
  await expect(first).toHaveAttribute('aria-selected', 'true');
  const firstId = await first.getAttribute('id');
  await first.focus();
  await page.keyboard.press('ArrowRight');
  // strelka faqat fokusni siljitadi (dars qayta chizilmaydi), Enter tanlaydi
  const second = page.locator('[role=tablist] [role=tab]').nth(1);
  await expect(second).toBeFocused();
  await expect(first).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('Enter');
  const sel = page.locator('[role=tablist] [role=tab][aria-selected="true"]');
  await expect(sel).not.toHaveId(firstId);
  await expect(sel).toBeFocused();
  await expect(page.locator('#lpanel[role=tabpanel]')).toBeAttached();
});

test('test: variantlar radiogroup, javobdan keyin natija e\'lon qilinadi', async ({ page }) => {
  await page.goto('/index.html#tests'); await waitReady(page);
  await page.locator('#tgo').click();
  const grp = page.locator('.tr-opts[role=radiogroup]');
  await expect(grp).toHaveAttribute('aria-labelledby', 'trq');
  const opts = grp.locator('[role=radio]');
  await opts.first().focus();
  await page.keyboard.press('ArrowDown');
  await expect(opts.nth(1)).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(grp.locator('[role=radio]').nth(1)).toHaveAttribute('aria-checked', 'true');
  await expect(page.locator('#zkAnnounce')).not.toHaveText('');
  await expect(page.locator('.tr-pal button[aria-current="step"]')).toHaveCount(1);
  await expect(page.locator('.tr-pal button').first()).toHaveAttribute('aria-label', /(Savol|Question) 1, /);
});

test('test sozlamalari: segment tugmalarida aria-pressed', async ({ page }) => {
  await page.goto('/index.html#tests'); await waitReady(page);
  await expect(page.locator('.seg[data-seg] > button').first()).toHaveAttribute('aria-pressed', /true|false/);
  await expect(page.locator('.seg[data-seg] > button[aria-pressed="true"]').first()).toBeAttached();
});

test('qidiruv: combobox, strelka bilan natija tanlanadi, Escape yopadi', async ({ page }) => {
  await page.goto('/index.html#home'); await waitReady(page);
  const q = page.locator('#q');
  test.skip(!(await q.isVisible()), 'qidiruv bu kenglikda yashirin');
  await expect(q).toHaveAttribute('role', 'combobox');
  await q.fill('kislota');
  await expect(q).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('ArrowDown');
  await expect(q).toHaveAttribute('aria-activedescendant', /^sr\d+$/);
  await page.keyboard.press('Escape');
  await expect(q).toHaveAttribute('aria-expanded', 'false');
});

test('darslik sahifasi kattalashtirish: klaviatura bilan ochiladi, Escape fokusni qaytaradi', async ({ page }) => {
  await page.goto('/index.html#g6-5'); await waitReady(page);
  await page.locator('#ltab-pages').click();
  const img = page.locator('.pages img[role=button]').first();
  await expect(img).toBeVisible();
  await img.focus(); await page.keyboard.press('Enter');
  await expect(page.locator('#zoom[role=dialog]')).toBeVisible();
  await expect(page.locator('#zoomX')).toBeFocused();
  await expect(page.locator('#app')).toHaveAttribute('inert', '');
  await page.keyboard.press('Tab');
  await expect(page.locator('#zoomX')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.locator('#app')).not.toHaveAttribute('inert', '');
  await expect(img).toBeFocused();
});

test('kirish oynasi modal: orqadagi sayt inert, kirgandan keyin qaytadi', async ({ page }) => {
  await page.goto('/index.html?mock#home'); await waitReady(page);
  await expect(page.locator('.zk-gate[role=dialog][aria-modal=true]')).toBeVisible();
  await expect(page.locator('header.top')).toHaveAttribute('inert', '');
  await page.fill('#zkL', 'admin'); await page.fill('#zkP', 'admin123'); await page.click('.zk-gate .go');
  await page.locator('.zk-gate .alt').click();
  await expect(page.locator('.zk-gate')).toHaveCount(0);
  await expect(page.locator('header.top')).not.toHaveAttribute('inert', '');
});

test('mobil menyu: ochilganda fokus menyuga, Escape yopadi', async ({ page }) => {
  await page.goto('/index.html#home'); await waitReady(page);
  const bg = page.locator('#burger');
  test.skip(!(await bg.isVisible()), 'burger faqat mobil kenglikda');
  await bg.click();
  await expect(page.locator('#nav')).toHaveClass(/open/);
  await expect.poll(() => page.evaluate(() => !!document.activeElement.closest('#nav'))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(page.locator('#nav')).not.toHaveClass(/open/);
  await expect(bg).toBeFocused();
});

test('dars sarlavhasi: title raqam bilan yopishib qolmaydi', async ({ page }) => {
  await page.goto('/index.html#g6-5'); await waitReady(page);
  await expect(page).toHaveTitle(/^5-dars: \S/);
});
