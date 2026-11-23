// 1-sinf fanlari: kimyo darsi kabi "Dars mazmuni / Darslik / Test". Admin dars mazmuni JSON'ini yuklaydi (Firebase),
// o'quvchi bepul mavzuni o'qiydi va test yechadi, pullik mavzuga obuna kerak. Haqiqiy dars matni testda ishlatilmaydi.
import { test, expect, bootstrapAdmin, login, logout, waitReady } from './fixtures.mjs';
const go = (page, h) => page.evaluate((h) => { location.hash = '#' + h; }, h);

const T3 = (s) => ({ uz: s + ' (uz)', ru: s + ' (ru)', en: s + ' (en)' });
const lessonsFile = (book, count) => ({
  book, v: 1,
  lessons: Array.from({ length: count }, (_, i) => ({
    n: i + 1,
    title: { orig: 'Topic ' + (i + 1), ...T3('Mavzu ' + (i + 1)) },
    goal: T3('Maqsad ' + (i + 1)),
    summary: { uz: ['Birinchi fikr', 'Ikkinchi fikr'], ru: ['Первая мысль', 'Вторая мысль'], en: ['First idea', 'Second idea'] },
    words: [{ w: 'mother', uz: 'ona', ru: 'мама', en: 'mother', emoji: '👩' }, { w: 'father', uz: 'ota', ru: 'папа', en: 'father', emoji: '👨' }, { w: 'family', uz: 'oila', ru: 'семья', en: 'family', emoji: '' },
      { w: 'sister', uz: 'opa', ru: 'сестра', en: 'sister', emoji: '👧' }, { w: 'brother', uz: 'aka', ru: 'брат', en: 'brother', emoji: '👦' }],
    phrases: [{ t: 'This is my mother.', uz: 'Bu mening onam.', ru: 'Это моя мама.', en: 'This is my mother.' }, { t: 'I love my family.', uz: 'Men oilamni sevaman.', ru: 'Я люблю свою семью.', en: 'I love my family.' },
      { t: 'My brother is tall.', uz: 'Akam baland.', ru: 'Мой брат высокий.', en: 'My brother is tall.' }, { t: 'Her sister reads books.', uz: 'Uning opasi kitob o‘qiydi.', ru: 'Её сестра читает книги.', en: 'Her sister reads books.' }],
    tasks: [T3('Rasmga qarab ayt'), T3('Bo‘ya')],
    quiz: Array.from({ length: 5 }, (_, k) => ({ q: T3('Savol ' + (k + 1)), o: [T3('To‘g‘ri'), T3('Xato A'), T3('Xato B')], a: 0 })),
  })),
});
const asFile = (obj, name) => ({ name, mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(obj)) });

test('admin dars mazmunini yuklaydi; o\'quvchi bepul mavzuni o\'qiydi va test yechadi; pullik mavzuga obuna kerak', async ({ page }) => {
  test.slow();
  await bootstrapAdmin(page);
  await go(page, 'admin');
  const row = page.locator('tr[data-bk="eng-1-1"]');
  await expect(row.locator('.bk-ls')).toContainText('Yuklanmagan', { timeout: 20_000 });
  // boshqa darslik fayli yoki buzuq fayl rad etiladi
  await row.locator('input[data-l]').setInputFiles(asFile(lessonsFile('rus-1-1', 50), 'rus.json'));
  await expect(row.locator('.bk-ls')).toContainText('mos kelmaydi');
  await row.locator('input[data-l]').setInputFiles({ name: 'x.json', mimeType: 'application/json', buffer: Buffer.from('{not json') });
  await expect(row.locator('.bk-ls')).toContainText('JSON emas');
  await row.locator('input[data-l]').setInputFiles(asFile(lessonsFile('eng-1-1', 50), 'eng.json'));
  await expect(row.locator('.bk-ls')).toContainText('Yuklandi: 50 ta dars', { timeout: 30_000 });
  const saved = await page.evaluate(() => { const c = JSON.parse(localStorage.getItem('zk_mock_db')).col; return [Object.keys(c.lessons || {}).length, c.lessons['eng-1-1-3'], c.lessonIndex['eng-1-1']]; });
  expect(saved[0]).toBe(50);
  expect(saved[1]).toMatchObject({ s: 'eng', g: 1, part: 1, n: 3 });
  expect(JSON.parse(saved[1].j).n).toBe(3);
  expect(saved[2].count).toBe(50);

  // obunasiz o'quvchi
  await page.evaluate(() => {
    const db = JSON.parse(localStorage.getItem('zk_mock_db'));
    db.auth.stu1 = { email: 'laylo.s@zukko-kimyo.uz', pw: 'secret1' };
    db.col.users.stu1 = { login: 'laylo.s', name: 'Laylo', role: 'student', cls: '1A', status: 'active' };
    localStorage.setItem('zk_mock_db', JSON.stringify(db));
  });
  await go(page, 's/eng/1');
  await expect(page.locator('.zk-sjtopic').first()).toBeVisible();
  await logout(page);
  await login(page, 'laylo.s', 'secret1');
  await waitReady(page);

  await go(page, 's/eng/1/1/2');
  await expect(page.locator('.tabs button')).toHaveCount(3);
  await expect(page.locator('.tabs button[data-tab=content]')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#sjBody .keyq')).toContainText('Maqsad 2 (uz)');
  await expect(page.locator('#sjBody .zk-word')).toHaveCount(5);
  await expect(page.locator('#sjBody .zk-word').first()).toContainText('mother');
  await expect(page.locator('#sjBody .zk-word').first()).toContainText('ona');
  await expect(page.locator('#sjBody .zk-phr li')).toHaveCount(4);
  await expect(page.locator('#sjBody .zk-tasks li')).toHaveCount(2);

  // dars testi: kimyodagi kabi 10 savol — 3 oson, 4 o'rtacha, 3 qiyin
  await page.locator('#sjGoQuiz').click();
  await expect(page.locator('.tabs button[data-tab=quiz]')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('.tabs button[data-tab=quiz] .cnt')).toHaveText('10');
  const chips = [];
  for (let k = 0; k < 10; k++) {
    await expect(page.locator('.tr-top span').first()).toContainText(`${k + 1} / 10`);
    chips.push(await page.locator('.tr-meta .dchip').getAttribute('class'));
    expect(await page.locator('.tr-opts button').count()).toBeGreaterThanOrEqual(3);
    await page.locator('.tr-opts button').first().click();
    await expect(page.locator('.tr-fb')).toBeVisible();
    await page.locator(k < 9 ? '#qn' : '#qf').click();
  }
  const lv = (d) => chips.filter((c) => c.includes(d)).length;
  expect([lv('easy'), lv('medium'), lv('hard')]).toEqual([3, 4, 3]);
  await expect(page.locator('.tr-res h3')).toContainText('/ 10');
  await expect(page.locator('.tr-res')).not.toContainText('undefined');
  // 70% va undan yuqori — mavzular ro'yxatida ⭐ (eski 5 balli natija ham foizga aylanadi)
  await page.evaluate(() => localStorage.setItem('zk_sjp', JSON.stringify({ 'eng-1-1-2': 90, 'eng-1-1-3': 4, 'eng-1-1-1': 30 })));
  await go(page, 's/eng/1');
  await expect(page.locator('a.zk-sjtopic[href="#s/eng/1/1/2"] .zk-sjstar')).toHaveCount(1);
  await expect(page.locator('a.zk-sjtopic[href="#s/eng/1/1/3"] .zk-sjstar')).toHaveCount(1);
  await expect(page.locator('a.zk-sjtopic[href="#s/eng/1/1/1"] .zk-sjstar')).toHaveCount(0);

  // fan testlar markazi: mavzular, soni va qiyinligi tanlanadi; yopiq mavzular tanlanmaydi
  await page.locator('.zk-sjact a').click();
  await expect(page.locator('.page-h h1')).toContainText('testlar markazi');
  await expect(page.locator('.tlist input:not(:disabled)')).toHaveCount(3);
  await expect(page.locator('.tlist input:disabled').first()).toBeVisible();
  await page.locator('[data-seg=count] button[data-v="20"]').click();
  await page.locator('[data-seg=diff] button[data-v="hard"]').click();
  await page.locator('#tgo').click();
  await expect(page.locator('.tr-top span').first()).toContainText('1 / 20');
  for (let k = 0; k < 3; k++) { await expect(page.locator('.tr-meta .dchip')).toHaveClass(/hard/); await page.locator('.tr-pal button').nth(k + 1).click(); }
  await go(page, 's/eng/1'); await expect(page.locator('.zk-sjact a')).toBeVisible();
  await go(page, 's/eng/1/test');
  await page.locator('#sn').click();
  await page.locator('#tgo').click();
  await expect(page.locator('#terr')).not.toBeEmpty();

  // rus tilida mazmun ruscha
  await page.locator('header .lang button[data-lang=ru]').click();
  await go(page, 's/eng/1/1/1');
  await expect(page.locator('#sjBody .keyq')).toContainText('Maqsad 1 (ru)');
  await expect(page.locator('#sjBody .zk-word').first()).toContainText('мама');
  await page.locator('header .lang button[data-lang=uz]').click();

  // pullik mavzu
  await go(page, 's/eng/1/1/4');
  await expect(page.locator('#sjBody .zk-pay h2')).toContainText(/ingliz tili obunasi/i);
  await page.locator('.tabs button[data-tab=quiz]').click();
  await expect(page.locator('#sjBody .zk-pay')).toBeVisible();
  await expect(page.locator('#quiz')).toHaveCount(0);
  // rus tili 2-qism: mavzu raqami kitobdagidek (51), 1-mavzu bo'lsa ham bepul emas
  await go(page, 's/rus/1/2/1');
  await expect(page.locator('.lesson-top .lnum')).toHaveText('51');
  await expect(page.locator('#sjBody .zk-pay')).toBeVisible();
});
