// O'quvchi o'zi ro'yxatdan o'tishi: sinf kodi + o'qituvchi tasdig'i.
import { test, expect, gotoMock, login, bootstrapAdmin, logout } from './fixtures.mjs';

async function makeCode(page, cls) {
  await gotoMock(page, 'teacher');
  await page.locator('.tc-tabs button[data-t=codes]').click();
  await expect(page.locator('#tcCdCls')).toBeVisible();
  await page.fill('#tcCdCls', cls);
  await page.locator('#tcCdGo').click();
  await expect(page.locator('.tc-code .cd').first()).toBeVisible();
  return (await page.locator('.tc-code .cd').first().innerText()).trim();
}
async function register(page, { n, c, l, p, p2 = p }) {
  await page.fill('#zkN', n); await page.fill('#zkC', c); await page.fill('#zkL', l);
  await page.fill('#zkP', p); await page.fill('#zkP2', p2);
  await page.locator('.zk-gate .go').click();
}

test('kod bilan ro\'yxatdan o\'tish, tasdiqlashgacha kira olmaslik, tasdiqdan keyin kirish', async ({ page }) => {
  await bootstrapAdmin(page);
  const code = await makeCode(page, '7b');
  expect(code).toMatch(/^[A-Z2-9]{6}$/);
  await logout(page);

  await page.locator('[data-reg]').click();
  await register(page, { n: 'Karimov Aziz', c: 'XXXXXX', l: 'aziz.k', p: 'qwerty1' });
  await expect(page.locator('#zkE')).toContainText('Sinf kodi');
  await register(page, { n: 'Karimov Aziz', c: code, l: 'aziz.k', p: 'qwerty1', p2: 'boshqa1' });
  await expect(page.locator('#zkE')).toContainText('bir xil emas');
  await register(page, { n: 'Aziz', c: code, l: 'aziz.k', p: 'qwerty1' });
  await expect(page.locator('#zkE')).toContainText('ismingizni');
  await register(page, { n: 'Karimov Aziz', c: code.toLowerCase(), l: 'aziz.k', p: 'qwerty1' });
  await expect(page.locator('.zk-gate .sent')).toContainText('7B');

  await page.locator('[data-back]').click();
  await login(page, 'aziz.k', 'qwerty1');
  await expect(page.locator('#zkE')).toContainText('tasdiqlanmagan');

  await login(page, 'admin', 'admin123');
  await expect(page.locator('.zk-gate')).toHaveCount(0);
  await gotoMock(page, 'teacher');
  await expect(page.locator('.tc-tabs button[data-t=req] .tc-badge')).toHaveText('1');
  await expect(page.locator('table.tc tbody tr')).toHaveCount(0);
  await page.locator('.tc-tabs button[data-t=req]').click();
  await page.locator('[data-ok]').click();
  await expect(page.locator('.tc-empty')).toBeVisible();
  await logout(page);

  await login(page, 'aziz.k', 'qwerty1');
  await expect(page.locator('.zk-gate')).toHaveCount(0);
});

test('to\'xtatilgan kod bilan ro\'yxatdan o\'tib bo\'lmaydi', async ({ page }) => {
  await bootstrapAdmin(page);
  const code = await makeCode(page, '6C');
  await page.locator('[data-tg]').first().click();
  await expect(page.locator('.tc-code.off')).toHaveCount(1);
  await logout(page);
  await page.locator('[data-reg]').click();
  await register(page, { n: 'Sobirova Laylo', c: code, l: 'laylo.s', p: 'parol12' });
  await expect(page.locator('#zkE')).toContainText('Sinf kodi');
});
