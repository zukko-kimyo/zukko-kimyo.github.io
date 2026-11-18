// Fan tanlash: fan tanlanmagan foydalanuvchi bosh sahifada tanlash oynasini ko'radi, tasdiqlagach sayt shu fanga moslashadi.
import { test, expect, waitReady } from './fixtures.mjs';
const go = (page, h) => page.evaluate((h) => { location.hash = '#' + h; }, h);

test('fan tanlanmagan: tanlash oynasi → Matematika → Davom etish → bosh sahifa va menyu matematikaga moslashadi', async ({ page }) => {
  await page.goto('/index.html#home'); await waitReady(page);
  await page.evaluate(() => localStorage.setItem('zk_subj', '-'));
  await page.reload(); await waitReady(page);
  await expect(page.locator('.zk-pick h1')).toBeVisible();
  await expect(page.locator('.zk-pcard')).toHaveCount(4);
  await expect(page.locator('header.top .zk-subject')).toBeHidden();
  await expect(page.locator('#pickGo')).toBeDisabled();
  await expect(page.locator('nav.main a[href="#lab"]')).toBeHidden();

  await page.locator('.zk-pcard', { hasText: 'Matematika' }).click();
  await expect(page.locator('#pickSel')).toContainText('Matematika');
  await page.locator('#pickGo').click();
  await expect(page.locator('.zk-sjhead h1')).toContainText('Matematika');
  await expect(page.locator('header.top .zk-subject')).toHaveText('MATEMATIKA');
  expect(await page.evaluate(() => localStorage.getItem('zk_subj'))).toBe('math');
  // kimyo bo'limlari menyuda yashirin, «Fanlar» qoladi
  await expect(page.locator('nav.main a[href="#tests"]')).toBeHidden();
  if (await page.evaluate(() => matchMedia('(max-width: 900px)').matches)) {
    await expect(page.locator('#bnav a[href="#fanlar"]')).toBeVisible();
    await expect(page.locator('#bnav a[href="#lab"]')).toBeHidden();
  } else await expect(page.locator('#navSubj')).toBeVisible();

  // qayta yuklash — tanlov saqlanadi; logotip tanlangan fanga olib boradi
  await page.reload(); await waitReady(page);
  await expect(page.locator('.zk-sjhead h1')).toContainText('Matematika');

  // fanni almashtirish → Kimyo
  await page.locator('.zk-sjhead .zk-chg').click();
  await expect(page.locator('.zk-pcard.on')).toContainText('Matematika');
  await page.locator('.zk-pcard', { hasText: 'Kimyo' }).click();
  await page.locator('#pickGo').click();
  await expect(page.locator('#app .zk-hero-v3')).toBeVisible();
  await expect(page.locator('header.top .zk-subject')).toHaveText('KIMYO');
  if (!(await page.evaluate(() => matchMedia('(max-width: 900px)').matches))) await expect(page.locator('nav.main a[href="#lab"]')).toBeVisible();

  // boshqa fanni ko'rib chiqish tanlovni o'zgartirmaydi
  await go(page, 's/eng');
  await expect(page.locator('header.top .zk-subject')).toHaveText('INGLIZ TILI');
  await go(page, 'home');
  await expect(page.locator('#app .zk-hero-v3')).toBeVisible();
});

test('kirish oynasi: fan nomi umumiy, faqat kimyo emas', async ({ page }) => {
  await page.goto('/index.html?mock#home'); await waitReady(page);
  await expect(page.locator('.zk-gate')).toContainText('matematika');
  await expect(page.locator('.zk-gate')).not.toContainText('6–8-sinf');
});
