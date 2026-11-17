// Obuna: obunasiz o'quvchiga pullik bo'limlar yopiq, admin "Obunalar" tabida obuna beradi, keyin ochiladi.
import { test, expect, bootstrapAdmin, login, logout, waitReady } from './fixtures.mjs';

async function addStudent(page, sub) {
  await page.evaluate((sub) => {
    const db = JSON.parse(localStorage.getItem('zk_mock_db'));
    db.auth = db.auth || {}; db.col.users = db.col.users || {};
    db.auth.stu9 = { email: 'ali.s@zukko-kimyo.uz', pw: 'secret9' };
    db.col.users.stu9 = Object.assign({ login: 'ali.s', name: 'Ali Sobirov', role: 'student', cls: '7A', status: 'active' }, sub ? { sub } : {});
    localStorage.setItem('zk_mock_db', JSON.stringify(db));
  }, sub || null);
}
const go = (page, h) => page.evaluate((h) => { location.hash = '#' + h; }, h);

test('obunasiz o\'quvchi: pullik bo\'limlar yopiq, bepullari ochiq', async ({ page }) => {
  await bootstrapAdmin(page);
  await addStudent(page);
  await logout(page);
  await login(page, 'ali.s', 'secret9');
  await waitReady(page);

  await go(page, 'g7-1');
  await expect(page.locator('.zk-pay h2')).toContainText(/7-sinf/);
  await go(page, 'tests');
  await expect(page.locator('.zk-pay h2')).toContainText(/Test/);
  await go(page, 'book-g6');
  await expect(page.locator('.zk-pay h2')).toContainText(/Darslik/);
  const labId = await page.evaluate(() => Lab.list[0].id);
  await go(page, 'lab-' + labId);
  await expect(page.locator('.zk-pay h2')).toContainText(/3D/);

  // 6-sinf dars matni bepul, lekin darslik sahifalari tabi yopiq
  await go(page, 'g6-5');
  await expect(page.locator('.lesson-top h1')).toBeVisible();
  await expect(page.locator('#lpanel .zk-pay')).toHaveCount(0);
  await page.click('#ltab-pages');
  await expect(page.locator('#lpanel .zk-pay h2')).toContainText(/Darslik/);
  // Davriy jadval va profil bepul; profilda obuna holati
  await go(page, 'ptable');
  await expect(page.locator('.zk-pay')).toHaveCount(0);
  await go(page, 'me');
  await expect(page.locator('.zk-subcard')).toContainText(/Obuna yo/);
});

test('admin obuna beradi — o\'quvchiga bo\'limlar ochiladi', async ({ page }) => {
  await bootstrapAdmin(page);
  await addStudent(page);
  await page.reload(); await waitReady(page);
  await page.evaluate(() => {
    const db = JSON.parse(localStorage.getItem('zk_mock_db'));
    db.col.settings = db.col.settings || {}; db.col.settings.site = Object.assign({}, db.col.settings.site, { prices: { month: '50 000 so‘m' }, payInfo: 'Maktab kassasi, 2-qavat' });
    localStorage.setItem('zk_mock_db', JSON.stringify(db));
  });
  await go(page, 'teacher');
  await page.locator('#tcTabs [data-t="sub"]').click();
  const row = page.locator('tr', { hasText: 'Ali Sobirov' });
  await expect(row).toContainText(/yo‘q/);
  await row.locator('select').selectOption('month');
  await row.locator('[data-give]').click();
  await expect(page.locator('tr', { hasText: 'Ali Sobirov' })).toContainText(/faol/);
  const sub = await page.evaluate(() => JSON.parse(localStorage.getItem('zk_mock_db')).col.users.stu9.sub);
  expect(sub.plan).toBe('month');
  expect(sub.until - Date.now()).toBeGreaterThan(29 * 86400000);

  await logout(page);
  await login(page, 'ali.s', 'secret9');
  await waitReady(page);
  await go(page, 'g7-1');
  await expect(page.locator('.lesson-top h1')).toBeVisible();
  await expect(page.locator('.zk-pay')).toHaveCount(0);
  await go(page, 'me');
  await expect(page.locator('.zk-subcard')).toContainText(/Faol/);
});

test('yopiq bo\'limda admin kiritgan narx va to\'lov ma\'lumoti ko\'rinadi', async ({ page }) => {
  await bootstrapAdmin(page);
  await addStudent(page, { plan: 'month', until: Date.now() - 86400000 });
  await page.evaluate(() => {
    const db = JSON.parse(localStorage.getItem('zk_mock_db'));
    db.col.settings = db.col.settings || {}; db.col.settings.site = Object.assign({}, db.col.settings.site, { prices: { month: '50 000 so‘m', year: '<b id=pp>1</b>' }, payInfo: 'Maktab kassasi, 2-qavat' });
    localStorage.setItem('zk_mock_db', JSON.stringify(db));
  });
  await logout(page);
  await login(page, 'ali.s', 'secret9');
  await waitReady(page);
  await go(page, 'tests');
  await expect(page.locator('.zk-pay')).toContainText('50 000 so‘m');
  await expect(page.locator('.zk-pay')).toContainText('Maktab kassasi, 2-qavat');
  await expect(page.locator('.zk-pay-exp')).toContainText(/tugagan/);
  expect(await page.locator('#pp').count(), 'narx matni HTML sifatida chiqmaydi').toBe(0);
});
