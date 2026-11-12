// Administrator paneli: kirish huquqi, statistika, sozlamalar (e'lon, ro'yxatdan o'tish), eksport, parolni o'zgartirish.
import { test, expect, gotoMock, login, bootstrapAdmin, logout, waitReady } from './fixtures.mjs';

async function createStudents(page, cls, names) {
  await gotoMock(page, 'teacher');
  await page.locator('.tc-tabs button[data-t=add]').click();
  await page.fill('#tcCls', cls); await page.fill('#tcNames', names.join('\n'));
  await page.locator('#tcGo').click();
  await expect(page.locator('.tc-ok')).toBeVisible();
  return page.locator('.panel table.tc tbody tr').evaluateAll((rs) => rs.map((r) => [...r.cells].map((c) => c.innerText.trim())));
}
const kpi = (page, k) => page.locator(`.ad-kpi [data-k=${k}] b`);

test('administrator paneli: statistika o\'quvchi faolligini ko\'rsatadi', async ({ page }) => {
  await bootstrapAdmin(page);
  const rows = await createStudents(page, '7A', ['Aliyev Vali', 'Karimova Malika']);
  await createStudents(page, '8B', ['Rahimov Aziz']);
  const [, , l, p] = rows[0];
  await logout(page);
  await login(page, l, p); await expect(page.locator('.zk-gate')).toHaveCount(0);
  await gotoMock(page, 'g7-5');
  await page.evaluate(() => { XP.quiz('g7', 5, 9, 10); window.dispatchEvent(new Event('zk:save')); return ZKAuth.push(); });
  await logout(page);

  await login(page, 'admin', 'admin123'); await expect(page.locator('.zk-gate')).toHaveCount(0);
  await gotoMock(page, 'admin');
  await expect(kpi(page, 'k_students')).toHaveText('3');
  await expect(kpi(page, 'k_classes')).toHaveText('2');
  await expect(kpi(page, 'k_today')).toHaveText('1');
  await expect(kpi(page, 'k_never')).toHaveText('2');
  await expect(kpi(page, 'k_mastered')).toHaveText('1');
  await expect(kpi(page, 'k_quiz')).toHaveText('9');
  await expect(page.locator('.ad-chart rect')).toHaveCount(14);
  await expect(page.locator('#adCls tbody tr')).toHaveCount(2);
  await expect(page.locator('#adTop tbody tr').first()).toContainText('Aliyev Vali');
});

test('administrator paneliga faqat administrator kira oladi', async ({ page }) => {
  await bootstrapAdmin(page);
  await gotoMock(page, 'teacher');
  await page.locator('.tc-tabs button[data-t=tch]').click();
  await page.fill('#tcTN', 'Karimova Dilnoza');
  const pw = await page.inputValue('#tcTP');
  await page.locator('#tcTGo').click();
  await expect(page.locator('#tcTOut .tc-ok')).toBeVisible();
  await logout(page);
  await login(page, 'dilnoza.k', pw); await expect(page.locator('.zk-gate')).toHaveCount(0);
  await gotoMock(page, 'admin');
  await expect(page.locator('.ad-kpi')).toHaveCount(0);
  await page.locator('#uchip > button').click();
  await expect(page.locator('#uchip .mn a[href="#admin"]')).toHaveCount(0);
  await expect(page.locator('#uchip .mn a[href="#teacher"]')).toHaveCount(1);
});

test('e\'lon kirish oynasida va sahifa tepasida ko\'rinadi; ro\'yxatdan o\'tishni yopish mumkin', async ({ page }) => {
  await bootstrapAdmin(page);
  await gotoMock(page, 'admin');
  await page.fill('#adAnn', 'Ertaga 7A sinfida test bo\'ladi');
  await page.locator('#adAnnOn').check();
  await page.locator('#adReg').uncheck();
  await page.locator('#adSave').click();
  await expect(page.locator('#adSetMsg')).toContainText('Saqlandi');
  await expect(page.locator('#zkAnn')).toContainText('Ertaga 7A');
  await logout(page);
  await expect(page.locator('.zk-gate .ann')).toContainText('Ertaga 7A');
  await expect(page.locator('[data-reg]')).toHaveCount(0);

  await login(page, 'admin', 'admin123'); await expect(page.locator('.zk-gate')).toHaveCount(0); await waitReady(page);
  await page.locator('#zkAnn button').click();
  await expect(page.locator('#zkAnn')).toHaveCount(0);
  await gotoMock(page, 'admin');
  await page.locator('#adReg').check(); await page.locator('#adAnnOn').uncheck();
  await page.locator('#adSave').click();
  await expect(page.locator('#adSetMsg')).toContainText('Saqlandi');
  await logout(page);
  await expect(page.locator('.zk-gate .ann')).toHaveCount(0);
  await expect(page.locator('[data-reg]')).toHaveCount(1);
});

test('eksport: CSV va JSON zaxirada parollar yo\'q', async ({ page }) => {
  await bootstrapAdmin(page);
  await createStudents(page, '6A', ['Olimova Zarina']);
  await gotoMock(page, 'admin');
  const [csv] = await Promise.all([page.waitForEvent('download'), page.locator('#adCsv').click()]);
  expect(csv.suggestedFilename()).toMatch(/^zukko-kimyo-oquvchilar-\d{4}-\d{2}-\d{2}\.csv$/);
  const csvText = (await (await csv.createReadStream()).toArray()).join('');
  expect(csvText).toContain('Olimova Zarina');
  const [js] = await Promise.all([page.waitForEvent('download'), page.locator('#adJson').click()]);
  const json = JSON.parse((await (await js.createReadStream()).toArray()).join(''));
  expect(json.users.some((u) => u.name === 'Olimova Zarina')).toBe(true);
  expect(JSON.stringify(json)).not.toMatch(/"pw"|secrets/);
});

test('administrator o\'z parolini o\'zgartiradi', async ({ page }) => {
  await bootstrapAdmin(page);
  await gotoMock(page, 'admin');
  await page.fill('#adOld', 'admin123'); await page.fill('#adNew', 'qisqa'); await page.fill('#adNew2', 'qisqa');
  await page.locator('#adPwGo').click();
  await expect(page.locator('#adPwMsg')).toContainText('8 belgi');
  await page.fill('#adOld', 'xato-parol'); await page.fill('#adNew', 'YangiParol2026'); await page.fill('#adNew2', 'YangiParol2026');
  await page.locator('#adPwGo').click();
  await expect(page.locator('#adPwMsg')).toContainText("noto'g'ri");
  await page.fill('#adOld', 'admin123'); await page.fill('#adNew', 'YangiParol2026'); await page.fill('#adNew2', 'YangiParol2026');
  await page.locator('#adPwGo').click();
  await expect(page.locator('#adPwMsg')).toContainText("o'zgartirildi");
  await logout(page);
  await login(page, 'admin', 'admin123');
  await expect(page.locator('#zkE')).toContainText("noto'g'ri");
  await login(page, 'admin', 'YangiParol2026');
  await expect(page.locator('.zk-gate')).toHaveCount(0);
});
