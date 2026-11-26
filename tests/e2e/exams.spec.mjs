// O'qituvchi yuboradigan testlar: yaratish → yuborish → bildirishnoma → taymer → saqlash → yakunlash → baholash → natija
import { test, expect, MOCK, waitReady } from './fixtures.mjs';

const seed = () => {
  const auth = { t1: { email: 'dilnoza.k@zukko-kimyo.uz', pw: 'tch1234' }, s1: { email: 'vali.a@zukko-kimyo.uz', pw: 'abc1234' }, s2: { email: 'malika.k@zukko-kimyo.uz', pw: 'abc1234' } };
  const users = { t1: { login: 'dilnoza.k', name: 'Dilnoza Karimova', role: 'teacher', cls: '' }, s1: { login: 'vali.a', name: 'Vali Aliyev', role: 'student', cls: '7A' }, s2: { login: 'malika.k', name: 'Malika Karimova', role: 'student', cls: '7A' } };
  localStorage.setItem('zk_mock_db', JSON.stringify({ auth, col: { users } }));
};
async function as(page, uid, hash) {
  await page.evaluate((u) => { localStorage.setItem('zk_mock_session', u); }, uid);
  await page.goto(`${MOCK}#${hash}`); await page.reload(); await waitReady(page); // faqat hash o'zgarsa sahifa qayta yuklanmaydi
}
const db = (page) => page.evaluate(() => JSON.parse(localStorage.getItem('zk_mock_db')).col);

test('test tizimi: to\'liq jarayon (o\'qituvchi → o\'quvchi → baholash → natija)', async ({ page }) => {
  test.slow();
  await page.goto(MOCK + '#home'); await page.evaluate(seed);
  // ---- O'qituvchi: test yaratadi ----
  await as(page, 't1', 'exams');
  await expect(page.locator('h1')).toContainText('Testlar');
  await page.locator('.ex-tabs [data-t=new]').click();
  const f = page.locator('.ex-form');
  await f.locator('[name=title]').fill('Atom tuzilishi');
  await f.locator('[name=topic]').fill('Atom');
  await f.locator('.ex-q').nth(0).locator('textarea').fill('Suv formulasi qaysi?');
  for (const [j, v] of ['H_2O', 'CO_2', 'O_2', 'NaCl'].entries()) await f.locator('.ex-q').nth(0).locator(`[data-f=o][data-j="${j}"]`).fill(v);
  await f.locator('[data-addq]').click();
  const q2 = f.locator('.ex-q').nth(1);
  await q2.locator('textarea').fill('Protonlar soni 6 bo\'lgan element?');
  for (const [j, v] of ['Kislorod', 'Uglerod', 'Azot', 'Natriy'].entries()) await q2.locator(`[data-f=o][data-j="${j}"]`).fill(v);
  await q2.locator('[data-f=a][value="1"]').check();
  await q2.locator('[data-f=l]').selectOption('h');
  // ko'rib chiqish: formula sub bilan chiziladi, to'g'ri javob belgilangan
  await f.locator('[data-prev]').click();
  await expect(page.locator('.ex-card .ex-qt').first()).toContainText('Suv formulasi');
  await expect(page.locator('.ex-card .ex-cb.ok sub').first()).toHaveText('2');
  await page.locator('.ex-card [data-x]').first().click();
  await f.locator('[type=submit]').click();
  await expect(page.locator('.ex-tc')).toHaveCount(1);
  await expect(page.locator('.ex-tc')).toContainText('2 ta savol');
  // ---- yuborish ----
  await page.locator('.ex-tc [data-a=send]').click();
  const m = page.locator('.ex-card');
  await m.locator('[name=cls]').selectOption('7A');
  await expect(m.locator('.ex-stl input')).toHaveCount(2);
  await m.locator('[name=dur]').fill('5');
  await m.locator('[type=submit]').click();
  await expect(page.locator('.ex-tabs [data-t=sent]')).toHaveClass(/on/);
  await expect(page.locator('a.ex-tc')).toContainText('2 o\'quvchi');
  let col = await db(page);
  const aid = Object.keys(col.examAssign)[0];
  // javob kaliti o'quvchiga boradigan nusxada yo'q
  expect(JSON.stringify(col.examAssign[aid].vars)).not.toContain('"a":');
  expect(col.examKeys[aid].keys).toEqual([{ k: [0, 1] }]);

  // ---- O'quvchi 1: bildirishnoma → ogohlantirish → boshlash ----
  await as(page, 's1', 'home');
  await expect(page.locator('#exBell .ex-badge')).toHaveText('1');
  await page.locator('#exBell').click();
  await expect(page.locator('.ex-ntf')).toContainText('Atom tuzilishi');
  await expect(page.locator('.ex-ntf')).toContainText('Dilnoza');
  await expect(page.locator('.ex-ntf .ex-warn')).toContainText('taymer boshlanadi');
  await page.locator('[data-start]').click();
  await expect(page).toHaveURL(new RegExp(`#exam/${aid}`));
  await expect(page.locator('#exTm')).toContainText(/⏱ [45]:/);
  // individual tartib: savolni topib javob beramiz
  const answer = async (want) => { await page.locator('.ex-cb', { hasText: want }).click(); };
  const qtext = async () => page.locator('.ex-qt').innerText();
  let t = await qtext();
  await answer(t.includes('Suv') ? 'H2O' : 'Kislorod'); // 1-savol to'g'ri, 2-savol noto'g'ri
  await expect(page.locator('#exSave')).toContainText('Saqlandi');
  const firstQ = t;
  // sahifa yangilansa: tartib va javob saqlanadi, vaqt qaytadan boshlanmaydi
  await page.reload(); await waitReady(page);
  await expect(page.locator('.ex-qt')).toHaveText(firstQ);
  await expect(page.locator('.ex-cb.on')).toHaveCount(1);
  await page.locator('#exNext').click();
  t = await qtext();
  await answer(t.includes('Suv') ? 'H2O' : 'Kislorod');
  await page.locator('#exFin').click();
  await page.locator('#exFinOk').click();
  await expect(page.locator('.ex-done')).toContainText('Test yakunlandi');
  col = await db(page);
  const at1 = Object.values(col.examAttempts).find((x) => x.uid === 's1');
  expect(at1.done).toBe(true);
  expect(Object.keys(at1.ans)).toHaveLength(2);

  // ---- O'quvchi 2: boshlaydi, vaqti tugaydi (startedAt orqaga suriladi) ----
  await as(page, 's2', 'exams');
  await page.locator('[data-open]').first().click();
  await page.locator('.ex-card [data-start]').click();
  await expect(page.locator('#exTm')).toBeVisible();
  t = await qtext(); await answer(t.includes('Suv') ? 'H2O' : 'Uglerod');
  await expect(page.locator('#exSave')).toContainText('Saqlandi');
  await page.evaluate(() => { const d = JSON.parse(localStorage.getItem('zk_mock_db')); const k = Object.keys(d.col.examAttempts).find((x) => x.includes('_s2_')); d.col.examAttempts[k].startedAt -= 6 * 60000; localStorage.setItem('zk_mock_db', JSON.stringify(d)); });
  await page.reload(); await waitReady(page);
  await expect(page.locator('.ex-done')).toBeVisible();

  // ---- O'qituvchi: monitoring, avtomatik baholash ----
  await as(page, 't1', `exams/a/${aid}`);
  await expect(page.locator('.ex-tbl tbody tr')).toHaveCount(2);
  await expect(page.locator('.ex-tbl')).toContainText('Yakunlagan', { timeout: 20_000 });
  await expect(page.locator('.ex-tbl tbody tr', { hasText: 'Vali' })).toContainText('50%');
  await expect(page.locator('.ex-tbl tbody tr', { hasText: 'Malika' })).toContainText('50%');
  await expect(page.locator('.ex-donut')).toBeVisible();
  await expect.poll(async () => Object.keys((await db(page)).examResults || {}).length).toBe(2);
  col = await db(page);
  const r1 = Object.values(col.examResults).find((r) => r.uid === 's1');
  expect(r1).toMatchObject({ total: 2, correct: 1, wrong: 1, blank: 0, pct: 50, reveal: false });
  expect(r1.detail[0].c).toBeUndefined(); // to'g'ri javob hali ochilmagan
  // takroriy baholash yangi natija yaratmaydi
  expect(Object.keys(col.examResults)).toHaveLength(2);

  // ---- O'quvchi: natija (qizil, 50%), to'g'ri javoblar hali yopiq ----
  await as(page, 's1', 'exams');
  await expect(page.locator('.ex-tc .ex-pct')).toHaveText('50%');
  await expect(page.locator('.ex-tc .ex-pct')).toHaveClass(/ex-r/);
  await page.locator('[data-res]').first().click();
  await expect(page.locator('.ex-card .ex-warn')).toContainText('ruxsat bergandan keyin');
  await page.locator('.ex-card [data-x]').first().click();

  // ---- O'qituvchi javoblarni ochadi → o'quvchi to'g'ri javobni ko'radi ----
  await as(page, 't1', `exams/a/${aid}`);
  await page.locator('#exRev').click();
  await expect(page.locator('#exRev')).toContainText('yopish');
  await expect.poll(async () => Object.values((await db(page)).examResults).every((r) => r.reveal && r.detail.every((d) => d.c != null))).toBe(true);
  await as(page, 's1', 'exams');
  await page.locator('[data-res]').first().click();
  await expect(page.locator('.ex-card .ex-cb.ok')).toHaveCount(2);
  await expect(page.locator('.ex-card .ex-cb.no')).toHaveCount(1);
});

test('test tizimi: muddat tashqarisida boshlab bo\'lmaydi, boshqa o\'quvchiga ko\'rinmaydi', async ({ page }) => {
  await page.goto(MOCK + '#home'); await page.evaluate(seed);
  await page.evaluate(() => {
    const d = JSON.parse(localStorage.getItem('zk_mock_db'));
    d.col.examAssign = { a1: { owner: 't1', ownerName: 'Dilnoza', title: 'Eski test', subj: 'chem', topic: '', level: 'e', nq: 1, dur: 10, start: Date.now() - 2 * 864e5, end: Date.now() - 864e5, tries: 1, cls: '7A', uids: ['s1'], vmap: { s1: 0 }, vars: [{ qs: [{ id: 'q1', t: 'Savol', img: '', o: ['a', 'b', 'c', 'd'], l: 'e' }] }], reveal: false, created: Date.now() - 2 * 864e5 } };
    localStorage.setItem('zk_mock_db', JSON.stringify(d));
  });
  await as(page, 's1', 'exams');
  await expect(page.locator('.ex-st.off')).toContainText('Muddati o\'tgan');
  await expect(page.locator('#exBell .ex-badge')).toHaveCount(0);
  await as(page, 's2', 'exams');
  await expect(page.locator('.ex-tc')).toHaveCount(0);
});

// ---------- Savol importi: saytdagi testlar va Excel/CSV ----------
const seedT = () => {
  const auth = { t1: { email: 'dilnoza.k@zukko-kimyo.uz', pw: 'tch1234' } };
  const users = { t1: { login: 'dilnoza.k', name: 'Dilnoza Karimova', role: 'teacher', cls: '', subjects: ['chem', 'eng'] } };
  const W = (w, uz) => ({ w, uz, ru: w + '-ru', en: w });
  const L = { words: [W('apple', 'olma'), W('book', 'kitob'), W('cat', 'mushuk'), W('dog', 'it'), W('egg', 'tuxum'), W('fish', 'baliq')], phrases: [], quiz: [{ q: { uz: 'Men ___ o\'qiyman', ru: 'x', en: 'I read a ___' }, o: ['book', 'cat', 'egg', 'fish'], a: 0, d: 'hard' }] };
  const lessons = { 'eng-1-1-1': { s: 'eng', g: 1, part: 1, n: 1, j: JSON.stringify(L), at: 1, by: 'admin' } };
  localStorage.setItem('zk_mock_db', JSON.stringify({ auth, col: { users, lessons } }));
};
async function newTest(page) {
  await page.goto(MOCK + '#home'); await page.evaluate(seedT);
  await as(page, 't1', 'exams');
  await page.locator('.ex-tabs [data-t=new]').click();
  await page.locator('.ex-form [name=title]').fill('Import sinovi');
}

test('test importi: saytdagi kimyo testlaridan 1 va 2-variantga alohida savollar', async ({ page }) => {
  await newTest(page);
  await page.locator('[data-bank]').click();
  const m = page.locator('.ex-card');
  await m.locator('[name=s]').selectOption('chem');
  await m.locator('[name=g]').selectOption('7');
  await expect(m.locator('.ex-part')).toBeHidden();
  await m.locator('#exTl input').nth(0).check();
  await m.locator('#exTl input').nth(1).check();
  await m.locator('[name=tv][value=both]').check();
  await m.locator('[type=submit]').click();
  await expect(page.locator('#exToast')).toContainText('20 ta savol');
  await expect(page.locator('.ex-vars [data-v]')).toHaveCount(2);
  await expect(page.locator('.ex-vars [data-v="0"]')).toContainText('(10)');
  await expect(page.locator('.ex-vars [data-v="1"]')).toContainText('(10)');
  // darajalar: 3 oson, 4 o'rtacha, 3 qiyin; har savolda 4 ta javob to'ldirilgan
  const lv = await page.locator('.ex-q [data-f=l]').evaluateAll((s) => s.map((x) => x.value));
  expect(lv.filter((x) => x === 'e')).toHaveLength(3); expect(lv.filter((x) => x === 'h')).toHaveLength(3);
  const empty = await page.locator('.ex-q [data-f=o]').evaluateAll((s) => s.filter((x) => !x.value.trim()).length);
  expect(empty).toBe(0);
  // ikki variant savollari takrorlanmaydi
  const qsig = () => page.locator('.ex-q').evaluateAll((s) => s.map((q) => q.querySelector('textarea').value + '|' + q.querySelector(`[data-f=o][data-j="${q.querySelector('[data-f=a]:checked').value}"]`).value));
  const v1 = await qsig();
  await page.locator('.ex-vars [data-v="1"]').click();
  const v2 = await qsig();
  expect(v1.filter((x) => v2.includes(x))).toEqual([]);
  await page.locator('.ex-form [type=submit]').click();
  await expect(page.locator('.ex-tc')).toContainText('10 ta savol · 2 variant');
});

test('test importi: ingliz tili darsidan savollar (dars mazmunidan)', async ({ page }) => {
  await newTest(page);
  await page.locator('[data-bank]').click();
  const m = page.locator('.ex-card');
  await m.locator('[name=s]').selectOption('eng');
  await m.locator('[name=g]').selectOption('1');
  await m.locator('#exTl input').nth(0).check();
  await m.locator('[name=ce]').fill('2'); await m.locator('[name=cm]').fill('2'); await m.locator('[name=ch]').fill('1');
  await m.locator('[type=submit]').click();
  await expect(page.locator('#exToast')).toContainText('5 ta savol');
  await expect(page.locator('.ex-q')).toHaveCount(5); // bo'sh boshlang'ich savol o'rniga
  await expect(page.locator('.ex-form [name=subj]')).toHaveValue('eng');
  // yuklanmagan mavzu: savol topilmaydi
  await page.locator('[data-bank]').click();
  await m.locator('[name=s]').selectOption('eng'); await m.locator('[name=g]').selectOption('1');
  await m.locator('#exTl input').nth(5).check();
  await m.locator('[type=submit]').click();
  await expect(m.locator('#exBk')).toContainText('hali yuklanmagan');
});

test('test importi: Excel (.xlsx) va CSV fayldan, xato qatorlar ko\'rsatiladi', async ({ page }) => {
  await newTest(page);
  await page.locator('[data-xl]').setInputFiles('tests/fixtures/exam-import.xlsx');
  await expect(page.locator('.ex-card h3')).toContainText('3 ta savol qo\'shildi');
  await expect(page.locator('.ex-card .ex-top li')).toHaveCount(2);
  await expect(page.locator('.ex-card')).toContainText("5-qator: javoblardan biri bo'sh");
  await page.locator('.ex-card [data-x]').click();
  await expect(page.locator('.ex-vars [data-v="0"]')).toContainText('(2)');
  await expect(page.locator('.ex-vars [data-v="1"]')).toContainText('(1)');
  const q2 = page.locator('.ex-q').nth(1);
  await expect(q2.locator('textarea')).toHaveValue('2 + 3 = ?');
  await expect(q2.locator('[data-f=a][value="1"]')).toBeChecked();
  await expect(q2.locator('[data-f=l]')).toHaveValue('h');
  await page.locator('.ex-vars [data-v="1"]').click();
  await expect(page.locator('.ex-q [data-f=a][value="1"]')).toBeChecked(); // «Toshkent» matni bo'yicha
  // CSV (nuqta-vergul, qo'shtirnoq ichida vergul)
  await page.locator('.ex-vars [data-v="0"]').click();
  await page.locator('[data-xl]').setInputFiles({ name: 'savollar.csv', mimeType: 'text/csv', buffer: Buffer.from('﻿Savol;A;B;C;D;To\'g\'ri javob\n"Qaysi biri metall; ""temir""mi?";Temir;Kislorod;Azot;Vodorod;1\n') });
  await expect(page.locator('#exToast')).toContainText('1 ta savol');
  await expect(page.locator('.ex-q').last().locator('textarea')).toHaveValue('Qaysi biri metall; "temir"mi?');
  // namuna yuklab olinadi
  const dl = page.waitForEvent('download'); await page.locator('[data-tpl]').click();
  expect((await dl).suggestedFilename()).toBe('test-namunasi.csv');
});

test('test importi: Word (.docx) — formula, rasm, qalin/sariq/qizil javob, kalit, jadval; matndan joylash', async ({ page }) => {
  await newTest(page);
  await page.locator('[data-xl]').setInputFiles('tests/fixtures/exam-word.docx');
  await expect(page.locator('.ex-card h3')).toContainText('5 ta savol qo\'shildi');
  await expect(page.locator('.ex-card .ex-warn')).toContainText('1 ta savolda');
  await page.locator('.ex-card [data-x]').click();
  const qs = page.locator('.ex-q');
  await expect(qs).toHaveCount(5);
  await expect(qs.nth(0).locator('[data-f=o][data-j="0"]')).toHaveValue('H_{2}O');           // pastki indeks
  await expect(qs.nth(0).locator('[data-f=a][value="0"]')).toBeChecked();                    // qalin
  await expect(qs.nth(1).locator('.ex-img img')).toBeVisible();                             // rasm
  await expect(qs.nth(1).locator('[data-f=a][value="1"]')).toBeChecked();                    // sariq
  await expect(qs.nth(2).locator('[data-f=o][data-j="3"]')).toHaveValue('7');                // bir qatorda
  await expect(qs.nth(2).locator('[data-f=a][value="1"]')).toBeChecked();                    // qizil
  await expect(qs.nth(3).locator('[data-f=a][value="0"]')).toBeChecked();                    // kalit
  await expect(qs.nth(4).locator('.ex-nk')).toBeVisible();                                  // kalitsiz
  // belgilanmagan javob bilan saqlab bo'lmaydi
  await page.locator('.ex-form [type=submit]').click();
  await expect(page.locator('#exToast')).toContainText("to'g'ri javob belgilanmagan");
  await qs.nth(4).locator('[data-f=a][value="2"]').check();
  await expect(qs.nth(4).locator('.ex-nk')).toHaveCount(0);
  // jadval ko'rinishidagi Word
  await page.locator('[data-xl]').setInputFiles('tests/fixtures/exam-word-table.docx');
  await expect(page.locator('#exToast')).toContainText('2 ta savol');
  await expect(qs).toHaveCount(7);
  await expect(qs.nth(6).locator('[data-f=a][value="1"]')).toBeChecked();
  // Word'dan nusxa olib joylash
  await page.locator('[data-paste]').click();
  await page.locator('#exPaste').fill('1. Qaysi metall?\nA) Kislorod\n*B) Temir\nC) Azot\nD) Vodorod');
  await page.locator('#exPasteOk').click();
  await expect(qs).toHaveCount(8);
  await expect(qs.nth(7).locator('[data-f=a][value="1"]')).toBeChecked();
  await page.locator('.ex-form [type=submit]').click();
  await expect(page.locator('.ex-tc')).toContainText('8 ta savol');
  const col = await db(page); const t = Object.values(col.examTests)[0];
  expect(JSON.stringify(t)).not.toContain('"nk"');
  expect(t.vars[0].qs[1].img).toMatch(/^data:image\//);
});

test('test importi: Word avtomatik raqamlangan savollar', async ({ page }) => {
  await newTest(page);
  await page.locator('[data-xl]').setInputFiles('tests/fixtures/exam-word-autonum.docx');
  await expect(page.locator('#exToast')).toContainText('2 ta savol');
  await expect(page.locator('.ex-q').nth(0).locator('textarea')).toHaveValue('Suv nimadan iborat?');
  await expect(page.locator('.ex-q').nth(0).locator('[data-f=a][value="0"]')).toBeChecked();
  await expect(page.locator('.ex-q').nth(1).locator('[data-f=a][value="1"]')).toBeChecked();
});

test('test importi: matnli PDF o\'qiladi, skanerlangan PDF haqida tushuntirish', async ({ page }) => {
  await newTest(page);
  await page.locator('[data-xl]').setInputFiles('tests/fixtures/exam-word.pdf');
  await expect(page.locator('.ex-card h3')).toContainText('5 ta savol qo\'shildi');
  await page.locator('.ex-card [data-x]').click();
  const qs = page.locator('.ex-q');
  await expect(qs.nth(0).locator('textarea')).toHaveValue('Suvning formulasi qaysi?');
  await expect(qs.nth(0).locator('[data-f=o][data-j="0"]')).toHaveValue('H_{2}O');
  await expect(qs.nth(0).locator('[data-f=a][value="0"]')).toBeChecked();   // qalin shrift
  await expect(qs.nth(2).locator('[data-f=o][data-j="3"]')).toHaveValue('7');
  await expect(qs.nth(3).locator('[data-f=a][value="0"]')).toBeChecked();   // kalit
  await page.locator('[data-xl]').setInputFiles('tests/fixtures/exam-scan.pdf');
  await expect(page.locator('.ex-card h3')).toContainText("PDF ichida matn yo'q");
});

test('test importi: ikki ustunli PDF (2 variant, yonma-yon kalit) va 3 javobli Word (izohli kalit)', async ({ page }) => {
  await newTest(page);
  await page.locator('[data-xl]').setInputFiles('tests/fixtures/exam-2col.pdf');
  await expect(page.locator('.ex-card h3')).toContainText('36 ta savol');
  await expect(page.locator('.ex-card .ex-warn')).toContainText('16 ta savolda'); // namunadagi kalit 10 tadan savolni qamraydi
  await page.locator('.ex-card [data-x]').click();
  await expect(page.locator('.ex-vars [data-v="0"]')).toContainText('(18)');
  await expect(page.locator('.ex-vars [data-v="1"]')).toContainText('(18)');
  const qs = page.locator('.ex-q');
  await expect(qs.nth(0).locator('textarea')).toHaveValue('Qaysi qurilma matn kiritadi?');
  await expect(qs.nth(0).locator('[data-f=a][value="0"]')).toBeChecked();
  await expect(qs.nth(9).locator('textarea')).toHaveValue('Qaysi biri dastur?');        // o'ng ustun chapdan keyin
  await expect(qs.nth(9).locator('[data-f=a][value="1"]')).toBeChecked();
  await page.locator('.ex-vars [data-v="1"]').click();
  await expect(qs.nth(0).locator('textarea')).toHaveValue('Qaysi qurilma ovoz chiqaradi?');
  await expect(qs.nth(0).locator('[data-f=a][value="1"]')).toBeChecked();              // 2-variant kaliti
  await expect(qs.nth(5).locator('[data-f=a][value="2"]')).toBeChecked();              // 6. C
  // 3 javobli Word, kalit «1. В — Школа»
  await page.locator('.ex-vars [data-v="0"]').click();
  await page.locator('[data-xl]').setInputFiles('tests/fixtures/exam-word-3opt.docx');
  await expect(page.locator('#exToast')).toContainText('2 ta savol');
  const last = qs.last();
  await expect(last.locator('[data-f=o]')).toHaveCount(3);
  await expect(last.locator('[data-f=a][value="1"]')).toBeChecked();
  await expect(qs.nth(18).locator('[data-f=a][value="2"]')).toBeChecked();
  // javob variantini qo'shish / olib tashlash
  await last.locator('[data-q=addo]').click();
  await expect(qs.last().locator('[data-f=o]')).toHaveCount(4);
  await qs.last().locator('[data-q=delo]').click();
  await expect(qs.last().locator('[data-f=o]')).toHaveCount(3);
});

test('3 javobli savol: o\'quvchi ishlaydi va baholanadi', async ({ page }) => {
  await page.goto(MOCK + '#home'); await page.evaluate(seed);
  await page.evaluate(() => {
    const d = JSON.parse(localStorage.getItem('zk_mock_db'));
    d.col.examAssign = { a3: { owner: 't1', ownerName: 'Dilnoza', title: 'Rus tili', subj: 'rus', topic: '', level: 'e', nq: 1, dur: 10, start: Date.now() - 6e4, end: Date.now() + 864e5, tries: 1, cls: '7A', uids: ['s1'], vmap: { s1: 0 }, vars: [{ qs: [{ id: 'q1', t: 'В каком слове два слога?', img: '', o: ['Дом', 'Машина', 'Школа'], l: 'e' }] }], reveal: true, created: Date.now() } };
    d.col.examKeys = { a3: { owner: 't1', keys: [{ k: [2] }] } };
    localStorage.setItem('zk_mock_db', JSON.stringify(d));
  });
  await as(page, 's1', 'exams');
  await page.locator('[data-open]').first().click();
  await page.locator('.ex-card [data-start]').click();
  await expect(page.locator('.ex-cb')).toHaveCount(3);
  await page.locator('.ex-cb', { hasText: 'Школа' }).click();
  await page.locator('#exFin').click(); await page.locator('#exFinOk').click();
  await as(page, 't1', 'exams/a/a3');
  await expect(page.locator('.ex-tbl tbody tr')).toContainText('100%', { timeout: 20_000 });
});
