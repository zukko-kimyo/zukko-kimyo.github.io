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

test('obunasiz o\'quvchi: har sinfda dastlabki 3 mavzu ochiq, qolganlari yopiq', async ({ page }) => {
  await bootstrapAdmin(page);
  await addStudent(page);
  await logout(page);
  await login(page, 'ali.s', 'secret9');
  await waitReady(page);

  // Bepul mavzu: barcha tablari ochiq
  await go(page, 'g6-1');
  await expect(page.locator('.lesson-top h1')).toBeVisible();
  for (const tab of ['pages', 'quiz']) { await page.click('#ltab-' + tab); await expect(page.locator('#lpanel .zk-pay')).toHaveCount(0); }
  await go(page, 'g7-3');
  await expect(page.locator('.lesson-top h1')).toBeVisible();
  await expect(page.locator('.zk-pay')).toHaveCount(0);
  // 4-mavzudan boshlab — obuna bilan
  await go(page, 'g6-4');
  await expect(page.locator('.zk-pay h2')).toContainText(/dars/i);
  await expect(page.locator('.zk-pay')).toContainText(/dastlabki 3 ta mavzu/);
  await go(page, 'g8-10');
  await expect(page.locator('.zk-pay h2')).toBeVisible();
  // Ro'yxatda qulf belgisi
  await go(page, 'g6');
  await expect(page.locator('a.lcard[href="#g6-4"].locked')).toHaveCount(1);
  await expect(page.locator('a.lcard[href="#g6-2"].locked')).toHaveCount(0);

  // 3D: bepul darsga bog'langan tajriba ochiq, boshqasi yopiq
  const ids = await page.evaluate(() => {
    const free = Lab.list.find((e) => e.lessons.some((x) => x[1] <= 3)), paid = Lab.list.find((e) => e.lessons.every((x) => x[1] > 3));
    return [free && free.id, paid && paid.id];
  });
  await go(page, 'lab-' + ids[0]);
  await expect(page.locator('#bigLab')).toBeVisible();
  await expect(page.locator('.zk-pay')).toHaveCount(0);
  await go(page, 'lab-' + ids[1]);
  await expect(page.locator('.zk-pay h2')).toContainText(/tajriba/);

  // Testlar: faqat bepul mavzular tanlanadi
  await go(page, 'tests');
  await expect(page.locator('.zk-lock-note')).toBeVisible();
  await expect(page.locator('.tl input[data-k="g6-4"]')).toBeDisabled();
  await expect(page.locator('.tl input[data-k="g6-2"]')).toBeEnabled();

  // Darslik: bepul mavzular sahifalaridan keyingisi yopiq
  await go(page, 'book-g6');
  await expect(page.locator('.spread img').first()).toBeVisible();
  await page.fill('#bi', '40'); await page.press('#bi', 'Enter');
  await expect(page.locator('.zk-pay h2')).toContainText(/Darslik/);

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
  await go(page, 'g7-9');
  await expect(page.locator('.lesson-top h1')).toBeVisible();
  await expect(page.locator('.zk-pay')).toHaveCount(0);
  await go(page, 'tests');
  await expect(page.locator('.zk-lock-note')).toHaveCount(0);
  await go(page, 'me');
  await expect(page.locator('.zk-subcard')).toContainText(/Faol/);
});

test('yopiq darsda narx va to\'lov ma\'lumoti; admin bepul mavzular sonini o\'zgartiradi', async ({ page }) => {
  await bootstrapAdmin(page);
  await addStudent(page, { plan: 'month', until: Date.now() - 86400000 });
  await page.evaluate(() => {
    const db = JSON.parse(localStorage.getItem('zk_mock_db'));
    db.col.settings = db.col.settings || {}; db.col.settings.site = Object.assign({}, db.col.settings.site, { prices: { month: '50 000 so‘m', year: '<b id=pp>1</b>' }, payInfo: 'Maktab kassasi, 2-qavat', freeN: 2 });
    localStorage.setItem('zk_mock_db', JSON.stringify(db));
  });
  await logout(page);
  await login(page, 'ali.s', 'secret9');
  await waitReady(page);
  await go(page, 'g6-3');
  await expect(page.locator('.zk-pay')).toContainText('50 000 so‘m');
  await expect(page.locator('.zk-pay')).toContainText('Maktab kassasi, 2-qavat');
  await expect(page.locator('.zk-pay')).toContainText(/dastlabki 2 ta mavzu/);
  await expect(page.locator('.zk-pay-exp')).toContainText(/tugagan/);
  expect(await page.locator('#pp').count(), 'narx matni HTML sifatida chiqmaydi').toBe(0);
  await go(page, 'g6-2');
  await expect(page.locator('.lesson-top h1')).toBeVisible();
  await expect(page.locator('.zk-pay')).toHaveCount(0);
});
