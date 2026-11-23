// Fan tanlash: fan tanlanmagan foydalanuvchi bosh sahifada tanlash oynasini ko'radi, tasdiqlagach sayt shu fanga moslashadi.
import { test, expect, waitReady } from './fixtures.mjs';
const go = (page, h) => page.evaluate((h) => { location.hash = '#' + h; }, h);

test('fan tanlanmagan: tanlash oynasi → Matematika → Davom etish → bosh sahifa va menyu matematikaga moslashadi', async ({ page }) => {
  await page.goto('/index.html#home'); await waitReady(page);
  await page.evaluate(() => localStorage.setItem('zk_subj', '-'));
  await page.reload(); await waitReady(page);
  await expect(page.locator('.zk-pick h1')).toBeVisible();
  await expect(page.locator('.zk-pcard')).toHaveCount(7);
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

test('obuna oynasi xodimga chiqmaydi: biriktirilmagan fanda o\'qituvchiga izoh, tanlash oynasida faqat o\'z fani', async ({ page }) => {
  const { bootstrapAdmin, login, logout } = await import('./fixtures.mjs');
  await bootstrapAdmin(page);
  await page.evaluate(() => {
    const db = JSON.parse(localStorage.getItem('zk_mock_db'));
    db.auth.tch1 = { email: 'olim.t@zukko-kimyo.uz', pw: 'secret1' };
    db.col.users.tch1 = { login: 'olim.t', name: 'Olim Toshev', role: 'teacher', cls: '', status: 'active', subjects: ['math', 'chem'] };
    localStorage.setItem('zk_mock_db', JSON.stringify(db));
  });
  await page.evaluate(() => { location.hash = '#fanlar'; });
  await logout(page);
  await login(page, 'olim.t', 'secret1'); await waitReady(page);
  await go(page, 's/eng/1/1/10');
  await expect(page.locator('#sjBody .zk-pay-staff h2')).toContainText('biriktirilmagan');
  await expect(page.locator('#sjBody .zk-plan')).toHaveCount(0);
  await go(page, 'pick');
  await expect(page.locator('.zk-pcard')).toHaveCount(2);
  await expect(page.locator('.zk-pick-k')).toContainText('Salom, Olim!');
});
