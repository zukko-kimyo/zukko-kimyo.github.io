// Sinf → fan → darslik darajasi: admin belgilaydi, o'quvchi o'sha darslikni ko'radi
import { test, expect, MOCK, waitReady } from './fixtures.mjs';

const seed = () => {
  const M = Date.now() + 30 * 864e5;
  const auth = { a1: { email: 'admin@zukko-kimyo.uz', pw: 'x' }, s1: { email: 'uzuk.s@zukko-kimyo.uz', pw: 'x' } };
  const users = { a1: { login: 'admin', name: 'Admin', role: 'admin', cls: '' }, s1: { login: 'uzuk.s', name: 'Uzukjamol Shamsiddinova', role: 'student', cls: '5-SINF', subs: { rus: { plan: 'month', until: M } } } };
  const W = (w, uz) => ({ w, uz, ru: w, en: w });
  const lessons = { 'rus-3-1-1': { s: 'rus', g: 3, part: 1, n: 1, j: JSON.stringify({ n: 1, words: [W('семья', 'oila'), W('мама', 'ona'), W('папа', 'ota'), W('дом', 'uy')], phrases: [], quiz: [] }), at: 1, by: 'a1' } };
  localStorage.setItem('zk_mock_db', JSON.stringify({ auth, col: { users, lessons } }));
};
async function as(page, uid, hash) { await page.evaluate((u) => localStorage.setItem('zk_mock_session', u), uid); await page.goto(`${MOCK}#${hash}`); await page.reload(); await waitReady(page); }

test('admin 5-SINF uchun rus tilida 3-sinf darsligini belgilaydi — o\'quvchiga darslar ochiladi', async ({ page }) => {
  await page.goto(MOCK + '#home'); await page.evaluate(seed);
  // avval: o'z sinfi (5) — darslik yo'q
  await as(page, 's1', 's/rus');
  await expect(page.locator('.zk-sjsoon')).toBeVisible();
  // admin belgilaydi
  await as(page, 'a1', 'admin');
  const sel = page.locator('#adLevels select[data-lc="5-SINF"][data-ls="rus"]');
  await expect(sel.locator('option').first()).toContainText("darslik yo‘q");
  await sel.selectOption('3');
  await page.locator('#adLvSave').click();
  await expect(page.locator('#adLvMsg')).toHaveClass(/ok/);
  const lv = await page.evaluate(() => JSON.parse(JSON.parse(localStorage.getItem('zk_mock_db')).col.settings.site.levels));
  expect(lv).toEqual({ '5-SINF': { rus: 3 } });
  // o'quvchi: 3-sinf darsligi, mavzu ochiladi
  await as(page, 's1', 's/rus');
  await expect(page.locator('h1')).toContainText('3-sinf');
  await expect(page.locator('.zk-sjtopic').first()).toBeVisible();
  await expect(page.locator('.zk-sjtopic.locked')).toHaveCount(0);
  await page.locator('.zk-sjtopic').first().click();
  await expect(page).toHaveURL(/#s\/rus\/3\/1\/1/);
  await expect(page.locator('#app')).toContainText('семья');
  // boshqa sinf manziliga kirsa — belgilangan darslikka qaytadi
  await page.goto(MOCK + '#s/rus/1'); await waitReady(page);
  await expect(page.locator('h1')).toContainText('3-sinf');
});
