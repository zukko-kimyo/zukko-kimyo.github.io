// O'qituvchi paneli: o'quvchi qo'shish, natija ko'rinishi, yangi parol, o'chirish.
import { test, expect, gotoMock, login, bootstrapAdmin, logout, waitReady } from './fixtures.mjs';

async function createClass(page, cls, names) {
  await gotoMock(page, 'teacher');
  await page.locator('.tc-tabs button[data-t=add]').click();
  await page.fill('#tcCls', cls);
  await page.fill('#tcNames', names.join('\n'));
  await page.locator('#tcGo').click();
  await expect(page.locator('.tc-ok')).toBeVisible();
  return page.locator('.panel table.tc tbody tr').evaluateAll((rs) => rs.map((r) => [...r.cells].map((c) => c.innerText.trim())));
}

test('o\'quvchilar yaratiladi, loginlar takrorlanmaydi', async ({ page }) => {
  await bootstrapAdmin(page);
  const rows = await createClass(page, '7a', ['Aliyev Vali', 'Karimova Malika', 'Aliyev Vali']);
  expect(rows.map((r) => r[2])).toEqual(['vali.a.7a', 'malika.k.7a', 'vali.a.7a2']);
  for (const r of rows) expect(r[3]).toMatch(/^[a-z]{3}\d{4}$/);
});

test('o\'quvchi natijasi o\'qituvchiga ko\'rinadi; yangi parol va o\'chirish ishlaydi', async ({ page }) => {
  await bootstrapAdmin(page);
  const [[, , stuLogin, stuPw]] = await createClass(page, '8B', ['Rahimov Aziz']);
  await logout(page);
  await login(page, stuLogin, stuPw);
  await expect(page.locator('.zk-gate')).toHaveCount(0);
  await gotoMock(page, 'g8-12');
  await page.evaluate(() => XP.quiz('g8', 12, 8, 10));
  await page.evaluate(() => ZKAuth.push && (window.dispatchEvent(new Event('zk:save')), ZKAuth.push()));
  await page.waitForTimeout(300);
  await logout(page);

  await login(page, 'admin', 'admin123');
  await expect(page.locator('.zk-gate')).toHaveCount(0);
  await gotoMock(page, 'teacher');
  const row = page.locator('table.tc tbody tr').first();
  await expect(row).toContainText('Rahimov Aziz');
  await expect(row.locator('.tc-q')).toHaveText('8');

  await row.locator('[data-pw]').click();
  await expect.poll(() => page.dialogs.some((m) => m.includes(stuLogin + ' →'))).toBe(true);
  const pwOf = () => page.evaluate((l) => Object.values(JSON.parse(localStorage.zk_mock_db).col.secrets).find((s) => s.login === l).pw, stuLogin);
  await expect.poll(pwOf).not.toBe(stuPw);
  const newPw = await pwOf();

  await page.locator('table.tc tbody tr').first().locator('[data-del]').click();
  await expect(page.locator('.tc-empty')).toBeVisible();
  await logout(page);
  await login(page, stuLogin, newPw);
  await expect(page.locator('#zkE')).toContainText("noto'g'ri");
});

test('o\'quvchi o\'qituvchi panelini ocha olmaydi', async ({ page }) => {
  await bootstrapAdmin(page);
  const [[, , l, p]] = await createClass(page, '6A', ['Olimova Zarina']);
  await logout(page);
  await login(page, l, p);
  await expect(page.locator('.zk-gate')).toHaveCount(0);
  await gotoMock(page, 'teacher');
  await expect(page.locator('.tc-tabs')).toHaveCount(0);
});
