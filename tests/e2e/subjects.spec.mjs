// Zukko Akademiyasi: fanlar sahifalari, o'qituvchiga fan biriktirish, har fanga alohida obuna.
import { test, expect, bootstrapAdmin, login, logout, waitReady } from './fixtures.mjs';
const go = (page, h) => page.evaluate((h) => { location.hash = '#' + h; }, h);

test('fanlar menyusi: har fanning o\'z oynasi, bitta tanlangan sinf; sarlavhada fan nomi', async ({ page }) => {
  await bootstrapAdmin(page);
  await expect(page.locator('.zk-sj-sec .zk-sjcard')).toHaveCount(7);
  const desktop = await page.evaluate(() => innerWidth > 900);
  if (desktop) {
    await page.click('#navSubjBtn');
    await expect(page.locator('#navSubjMenu a[data-nav=fanlar]')).toHaveCount(7);
    await page.locator('#navSubjMenu a', { hasText: 'Rus tili' }).click();
  } else await go(page, 's/rus');
  await expect(page.locator('header.top .zk-subject')).toHaveText('RUS TILI');
  await expect(page.locator('.page-h h1')).toContainText('Rus tili · 1-sinf');
  await expect(page.locator('.zk-sjtopic')).toHaveCount(250);
  // xodim sinfni tanlaydi; darsligi yo'q sinf — "tez orada", boshqa sinf mavzulari ko'rinmaydi
  await page.locator('.zk-sjpick a', { hasText: /^5$/ }).click();
  await expect(page.locator('.page-h h1')).toContainText('5-sinf');
  await expect(page.locator('.zk-sjtopic')).toHaveCount(0);
  await expect(page.locator('.zk-sjsoon')).toBeVisible();
  await go(page, 's/rus/1/1/4');
  await expect(page.locator('.lesson-top h1')).toContainText('Моя мама');
  await expect(page.locator('.lesson-top .zk-sjsub')).toContainText('Mening onam');
  await go(page, 's/math/1/1/50');
  await expect(page.locator('.lesson-top h1')).toContainText('1 dan 5 gacha sonlar bo‘yicha mantiqiy topshiriqlar');
  await go(page, 's/math/1');
  await expect(page.locator('.zk-sjparts button')).toHaveCount(3);
  await expect(page.locator('.zk-sjtopic')).toHaveCount(150);
  await expect(page.locator('a.zk-sjtopic[href="#s/math/1/3/50"] .n')).toHaveText('150');
  await go(page, 'home');
  await expect(page.locator('header.top .zk-subject')).toHaveText('KIMYO'); // tanlangan fan
  await go(page, 'g7');
  await expect(page.locator('header.top .zk-subject')).toHaveText('KIMYO');
  await go(page, 'fanlar');
  await expect(page.locator('header.top .zk-subject')).toBeHidden();
});

test('o\'quvchi fan oynasida faqat o\'z sinfini ko\'radi', async ({ page }) => {
  await bootstrapAdmin(page);
  await page.evaluate(() => {
    const db = JSON.parse(localStorage.getItem('zk_mock_db'));
    db.auth.stu1 = { email: 'laylo.s@zukko-kimyo.uz', pw: 'secret1' };
    db.col.users.stu1 = { login: 'laylo.s', name: 'Laylo', role: 'student', cls: '1A', status: 'active' };
    localStorage.setItem('zk_mock_db', JSON.stringify(db));
  });
  await logout(page);
  await login(page, 'laylo.s', 'secret1');
  await waitReady(page);
  await go(page, 's/eng');
  await expect(page.locator('.page-h h1')).toContainText('Ingliz tili · 1-sinf');
  await expect(page.locator('.zk-sjpick')).toHaveCount(0);
  await expect(page.locator('.zk-sjtopic')).toHaveCount(250);
  await expect(page.locator('.zk-sjparts button')).toHaveCount(5);
  await expect(page.locator('a.zk-sjtopic[href="#s/eng/1/5/50"] .n')).toHaveText('250');
  await go(page, 's/eng/5');
  await expect(page.locator('.page-h h1')).toContainText('1-sinf');
});

test('admin o\'qituvchiga fan biriktiradi; matematika o\'qituvchisi kimyo natijalarini ko\'rmaydi', async ({ page }) => {
  await bootstrapAdmin(page);
  await page.evaluate(() => {
    const db = JSON.parse(localStorage.getItem('zk_mock_db'));
    db.auth.tch9 = { email: 'dilnoza.k@zukko-kimyo.uz', pw: 'teach99' };
    db.col.users.tch9 = { login: 'dilnoza.k', name: 'Dilnoza Karimova', role: 'teacher', cls: '' };
    db.col.users.stu9 = { login: 'ali.s', name: 'Ali Sobirov', role: 'student', cls: '7A', status: 'active' };
    localStorage.setItem('zk_mock_db', JSON.stringify(db));
  });
  await page.reload(); await waitReady(page);
  await go(page, 'teacher');
  await page.locator('#tcTabs [data-t="tch"]').click();
  const row = page.locator('tr[data-tid="tch9"]');
  await row.locator('input[data-sj="chem"]').uncheck();
  await row.locator('input[data-sj="math"]').check();
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('zk_mock_db')).col.users.tch9.subjects)).toEqual(['math']);

  // Obunalar: matematika obunasi alohida
  await page.locator('#tcTabs [data-t="sub"]').click();
  await page.locator('.tc-chips [data-s="math"]').click();
  const srow = page.locator('tr', { hasText: 'Ali Sobirov' });
  await srow.locator('select').selectOption('quarter');
  await srow.locator('[data-give]').click();
  await expect(page.locator('tr', { hasText: 'Ali Sobirov' })).toContainText(/faol/);
  const subs = await page.evaluate(() => JSON.parse(localStorage.getItem('zk_mock_db')).col.users.stu9.subs);
  expect(subs.math.plan).toBe('quarter');
  expect(subs.chem).toBeFalsy();
  await page.locator('.tc-chips [data-s="chem"]').click();
  await expect(page.locator('tr', { hasText: 'Ali Sobirov' })).toContainText(/yo‘q/);

  await logout(page);
  await login(page, 'dilnoza.k', 'teach99');
  await waitReady(page);
  await go(page, 'teacher');
  await expect(page.locator('.tc-overview')).toContainText('Matematika'); // fan o'quvchilari ko'rinishi
  await expect(page.locator('.tc-name')).toHaveCount(0);
});

test('rus tili 1-sinf: 5 qism, mavzu raqamlari kitobdagidek (1–250), qismlarga tez o\'tish', async ({ page }) => {
  await page.goto('/index.html#s/rus/1'); await waitReady(page);
  await expect(page.locator('.zk-sjparts button')).toHaveCount(5);
  await expect(page.locator('.zk-sjparts button').nth(3)).toContainText('151–200');
  await expect(page.locator('.zk-sjparts button').nth(4)).toContainText('201–250');
  await expect(page.locator('.zk-sjtopic')).toHaveCount(250);
  await expect(page.locator('a.zk-sjtopic[href="#s/rus/1/2/1"] .n')).toHaveText('51');
  await expect(page.locator('a.zk-sjtopic[href="#s/rus/1/4/50"] .n')).toHaveText('200');
  await expect(page.locator('a.zk-sjtopic[href="#s/rus/1/5/50"] .n')).toHaveText('250');
  await page.locator('.zk-sjparts button').nth(2).click();
  await expect(page.locator('#zkbook-3')).toBeInViewport();
  await page.evaluate(() => { location.hash = '#s/rus/1/2/8'; });
  await expect(page.locator('.lesson-top .lnum')).toHaveText('58');
  await expect(page.locator('.lesson-top .lpos')).toContainText('58 / 100');
  await expect(page.locator('.zk-sjref')).toContainText('120, 119');
  await page.evaluate(() => { location.hash = '#s/rus/1/test'; });
  await expect(page.locator('.tlist .tg-h')).toHaveCount(5);
});

test('rus tili 3-sinf: 5 qism, 250 mavzu, sahifalar kitobdagidek', async ({ page }) => {
  await page.goto('/index.html#s/rus/3'); await waitReady(page);
  await expect(page.locator('.zk-sjparts button')).toHaveCount(5);
  await expect(page.locator('.zk-sjtopic')).toHaveCount(250);
  await expect(page.locator('a.zk-sjtopic[href="#s/rus/3/3/1"] .n')).toHaveText('101');
  await expect(page.locator('a.zk-sjtopic[href="#s/rus/3/5/50"] .n')).toHaveText('250');
  await page.evaluate(() => { location.hash = '#s/rus/3/4/1'; });
  await expect(page.locator('.lesson-top .lnum')).toHaveText('151');
  await expect(page.locator('.zk-sjref')).toContainText('55, 56');
});
