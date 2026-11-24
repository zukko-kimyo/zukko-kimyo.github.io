// Firestore xavfsizlik qoidalari testlari (Firebase emulyatorida ishlaydi):
//   npm run test:rules        (Java 11+ va firebase-tools kerak; CI'da avtomatik)
import { test, before, after, beforeEach } from 'node:test';
import { readFileSync } from 'node:fs';
import { initializeTestEnvironment, assertSucceeds, assertFails } from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc, deleteDoc, collection, getDocs, query, where } from 'firebase/firestore';

const D = '@zukko-kimyo.uz';
let env;

before(async () => {
  const [host, port] = (process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8085').split(':');
  env = await initializeTestEnvironment({ projectId: 'demo-zukko', firestore: { rules: readFileSync('firestore.rules', 'utf8'), host, port: Number(port) } });
});
after(async () => { await env?.cleanup(); });

beforeEach(async () => {
  await env.clearFirestore();
  await env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore();
    await setDoc(doc(db, 'users/admin1'), { login: 'admin', name: 'Admin', role: 'admin', cls: '' });
    await setDoc(doc(db, 'users/teach1'), { login: 'dilnoza.k', name: 'Dilnoza', role: 'teacher', cls: '' });
    await setDoc(doc(db, 'users/stu1'), { login: 'vali.a.7a', name: 'Vali', role: 'student', cls: '7A' });
    await setDoc(doc(db, 'users/stu2'), { login: 'malika.k.7a', name: 'Malika', role: 'student', cls: '7A' });
    await setDoc(doc(db, 'users/pend1'), { login: 'aziz.k', name: 'Aziz', role: 'student', cls: '7B', status: 'pending', code: 'ABC234', self: true });
    await setDoc(doc(db, 'progress/stu2'), { data: '{}', xp: 10, role: 'student' });
    await setDoc(doc(db, 'secrets/stu1'), { pw: 'abc1234', role: 'student', login: 'vali.a.7a' });
    await setDoc(doc(db, 'secrets/teach1'), { pw: 'tch1234', role: 'teacher', login: 'dilnoza.k' });
    await setDoc(doc(db, 'classes/ABC234'), { cls: '7B', active: true });
    await setDoc(doc(db, 'classes/OFF999'), { cls: '7C', active: false });
  });
});

const as = (uid, login) => env.authenticatedContext(uid, { email: login + D }).firestore();
const anon = () => env.unauthenticatedContext().firestore();
const admin = () => as('admin1', 'admin');
const teacher = () => as('teach1', 'dilnoza.k');
const student = () => as('stu1', 'vali.a.7a');

// ---------- users ----------
test('o\'quvchi o\'z profilini o\'qiydi, boshqanikini o\'qiy olmaydi', async () => {
  await assertSucceeds(getDoc(doc(student(), 'users/stu1')));
  await assertFails(getDoc(doc(student(), 'users/stu2')));
  await assertFails(getDocs(collection(student(), 'users')));
});
test('kirmagan foydalanuvchi profillarni o\'qiy olmaydi', async () => {
  await assertFails(getDoc(doc(anon(), 'users/stu1')));
});
test('o\'qituvchi profillarni faqat ko\'radi: o\'quvchi ham, o\'qituvchi ham yarata olmaydi; admin yaratadi', async () => {
  await assertSucceeds(getDocs(collection(teacher(), 'users')));
  await assertFails(setDoc(doc(teacher(), 'users/new1'), { login: 'new.1', name: 'Yangi', role: 'student', cls: '7A' }));
  await assertSucceeds(setDoc(doc(admin(), 'users/new1'), { login: 'new.1', name: 'Yangi', role: 'student', cls: '7A' }));
  await assertFails(setDoc(doc(teacher(), 'users/new2'), { login: 'new.2', name: 'Yangi', role: 'teacher', cls: '' }));
});
test('administrator o\'qituvchi yaratadi', async () => {
  await assertSucceeds(setDoc(doc(admin(), 'users/t2'), { login: 't.2', name: 'T', role: 'teacher', cls: '' }));
});
test('o\'quvchi o\'z rolini o\'zgartira olmaydi', async () => {
  await assertFails(setDoc(doc(student(), 'users/stu1'), { login: 'vali.a.7a', name: 'Vali', role: 'admin', cls: '7A' }));
});
test('administratorni faqat admin email egasi va faqat bir marta yaratadi', async () => {
  await env.clearFirestore();
  await assertFails(setDoc(doc(as('x1', 'hacker'), 'users/x1'), { login: 'hacker', name: 'H', role: 'admin', cls: '' }));
  await assertSucceeds(setDoc(doc(as('a9', 'admin'), 'users/a9'), { login: 'admin', name: 'Administrator', role: 'admin', cls: '' }));
});
test('arizani faqat administrator tasdiqlaydi (status: active)', async () => {
  await assertFails(setDoc(doc(teacher(), 'users/pend1'), { status: 'active' }, { merge: true }));
  await assertSucceeds(setDoc(doc(admin(), 'users/pend1'), { status: 'active' }, { merge: true }));
});

// ---------- o'zi ro'yxatdan o'tish ----------
const signup = (over = {}) => ({ login: 'laylo.s', name: 'Sobirova Laylo', role: 'student', cls: '7B', status: 'pending', code: 'ABC234', created: 1, self: true, ...over });
test('faol kod bilan ro\'yxatdan o\'tish mumkin', async () => {
  await assertSucceeds(setDoc(doc(as('n1', 'laylo.s'), 'users/n1'), signup()));
});
test('noto\'g\'ri, to\'xtatilgan yoki boshqa sinf kodi bilan ro\'yxatdan o\'tib bo\'lmaydi', async () => {
  await assertFails(setDoc(doc(as('n1', 'laylo.s'), 'users/n1'), signup({ code: 'NOPE00' })));
  await assertFails(setDoc(doc(as('n1', 'laylo.s'), 'users/n1'), signup({ code: 'OFF999', cls: '7C' })));
  await assertFails(setDoc(doc(as('n1', 'laylo.s'), 'users/n1'), signup({ cls: '8A' })));
});
test('ro\'yxatdan o\'tishda rol, holat, login yoki qo\'shimcha maydonni soxtalashtirib bo\'lmaydi', async () => {
  await assertFails(setDoc(doc(as('n1', 'laylo.s'), 'users/n1'), signup({ role: 'teacher' })));
  await assertFails(setDoc(doc(as('n1', 'laylo.s'), 'users/n1'), signup({ status: 'active' })));
  await assertFails(setDoc(doc(as('n1', 'laylo.s'), 'users/n1'), signup({ login: 'boshqa.login' })));
  await assertFails(setDoc(doc(as('n1', 'laylo.s'), 'users/n1'), signup({ xp: 9999 })));
  await assertFails(setDoc(doc(as('n1', 'laylo.s'), 'users/n2'), signup()));
});

// ---------- progress ----------
test('faol o\'quvchi o\'z natijasini yozadi, boshqanikini yoza olmaydi', async () => {
  await assertSucceeds(setDoc(doc(student(), 'progress/stu1'), { data: '{}', xp: 5, role: 'student' }));
  await assertFails(setDoc(doc(student(), 'progress/stu2'), { data: '{}', xp: 5, role: 'student' }));
  await assertFails(getDoc(doc(student(), 'progress/stu2')));
});
test('o\'quvchi natijasiga boshqa rol yozib qo\'ya olmaydi', async () => {
  await assertFails(setDoc(doc(student(), 'progress/stu1'), { data: '{}', xp: 5, role: 'admin' }));
});
test('tasdiqlanmagan o\'quvchi natija yoza olmaydi', async () => {
  await assertFails(setDoc(doc(as('pend1', 'aziz.k'), 'progress/pend1'), { data: '{}', xp: 5, role: 'student' }));
});
test('o\'qituvchi barcha natijalarni o\'qiydi', async () => {
  await assertSucceeds(getDocs(collection(teacher(), 'progress')));
});

// ---------- secrets ----------
test('o\'qituvchi hech qanday parolni ko\'ra olmaydi', async () => {
  await assertFails(getDoc(doc(teacher(), 'secrets/stu1')));
  await assertFails(getDoc(doc(teacher(), 'secrets/teach1')));
  await assertFails(getDocs(query(collection(teacher(), 'secrets'), where('role', '==', 'student'))));
  await assertFails(getDocs(collection(teacher(), 'secrets')));
});
test('o\'quvchi hech qanday parolni, hatto o\'zinikini ham o\'qiy olmaydi', async () => {
  await assertFails(getDoc(doc(student(), 'secrets/stu1')));
});
test('administrator barcha parollarni ko\'radi', async () => {
  await assertSucceeds(getDocs(collection(admin(), 'secrets')));
});
test('tasdiqlanmagan o\'quvchi faqat o\'z paroli yozuvini yaratadi', async () => {
  await assertSucceeds(setDoc(doc(as('pend1', 'aziz.k'), 'secrets/pend1'), { pw: 'qwerty1', role: 'student', login: 'aziz.k' }));
  await assertFails(setDoc(doc(as('pend1', 'aziz.k'), 'secrets/stu1'), { pw: 'x', role: 'student', login: 'vali.a.7a' }));
  await assertFails(setDoc(doc(student(), 'secrets/stu1'), { pw: 'x', role: 'student', login: 'vali.a.7a' }));
});

test('o\'qituvchi admin yoki o\'qituvchi parol yozuvini "student" deb o\'zgartirib o\'qiy olmaydi', async () => {
  await env.withSecurityRulesDisabled(async (ctx) => { await setDoc(doc(ctx.firestore(), 'secrets/admin1'), { pw: 'adm1234', role: 'admin', login: 'admin' }); });
  await assertFails(setDoc(doc(teacher(), 'secrets/admin1'), { role: 'student' }, { merge: true }));
  await assertFails(setDoc(doc(teacher(), 'secrets/teach1'), { role: 'student' }, { merge: true }));
  await assertFails(getDoc(doc(teacher(), 'secrets/admin1')));
  // yozuvi yo'q o'qituvchi/admin uid uchun ham yangi "student" yozuv ochib bo'lmaydi
  await env.withSecurityRulesDisabled(async (ctx) => { await deleteDoc(doc(ctx.firestore(), 'secrets/admin1')); });
  await assertFails(setDoc(doc(teacher(), 'secrets/admin1'), { pw: 'x', role: 'student', login: 'admin' }));
});
test('parolni faqat administrator yangilaydi va yangi o\'quvchiga yozuv ochadi', async () => {
  await assertFails(setDoc(doc(teacher(), 'secrets/stu1'), { pw: 'new1234', role: 'student', login: 'vali.a.7a' }, { merge: true }));
  await assertFails(setDoc(doc(teacher(), 'secrets/stu2'), { pw: 'mal1234', role: 'student', login: 'malika.k.7a' }));
  await assertSucceeds(setDoc(doc(admin(), 'secrets/stu1'), { pw: 'new1234', role: 'student', login: 'vali.a.7a' }, { merge: true }));
  await assertSucceeds(setDoc(doc(admin(), 'secrets/stu2'), { pw: 'mal1234', role: 'student', login: 'malika.k.7a' }));
});
test('natijaga son o\'rniga matn (kod) yoki ortiqcha maydon yozib bo\'lmaydi', async () => {
  await assertFails(setDoc(doc(student(), 'progress/stu1'), { data: '{}', xp: '<img src=x onerror=alert(1)>', role: 'student' }));
  await assertFails(setDoc(doc(student(), 'progress/stu1'), { data: '{}', xp: 5, quizAvg: '<b>9</b>', role: 'student' }));
  await assertFails(setDoc(doc(student(), 'progress/stu1'), { data: '{}', xp: -5, role: 'student' }));
  await assertFails(setDoc(doc(student(), 'progress/stu1'), { data: '{}', xp: 5, role: 'student', html: 'x' }));
  await assertSucceeds(setDoc(doc(student(), 'progress/stu1'), { data: '{}', updated: Date.now(), login: 'vali.a.7a', name: 'Vali', cls: '7A', role: 'student',
    xp: 120, done6: 3, done7: 0, done8: 0, quizAvg: null, quizN: 0, labs: 2, visited: 5, last: 'g6-5' }));
});
test('o\'chirib qo\'yilgan o\'quvchi natija yoza olmaydi', async () => {
  await env.withSecurityRulesDisabled(async (ctx) => { await setDoc(doc(ctx.firestore(), 'users/stu1'), { login: 'vali.a.7a', name: 'Vali', role: 'student', cls: '7A', disabled: true }); });
  await assertFails(setDoc(doc(student(), 'progress/stu1'), { data: '{}', xp: 5, role: 'student' }));
});

// ---------- classes ----------
test('sinf kodini bilgan odam faqat o\'shani tekshiradi, ro\'yxatni ko\'ra olmaydi', async () => {
  await assertSucceeds(getDoc(doc(anon(), 'classes/ABC234')));
  await assertFails(getDocs(collection(anon(), 'classes')));
  await assertFails(getDocs(collection(student(), 'classes')));
  await assertFails(getDocs(collection(teacher(), 'classes')));
  await assertSucceeds(getDocs(collection(admin(), 'classes')));
});
test('kodlarni faqat administrator yaratadi va o\'chiradi', async () => {
  await assertFails(setDoc(doc(student(), 'classes/HACK11'), { cls: '7A', active: true }));
  await assertFails(setDoc(doc(teacher(), 'classes/NEW222'), { cls: '7A', active: true }));
  await assertSucceeds(setDoc(doc(admin(), 'classes/NEW222'), { cls: '7A', active: true }));
  await assertSucceeds(deleteDoc(doc(admin(), 'classes/NEW222')));
});

// ---------- boshqa ----------
test('noma\'lum kolleksiyalar yopiq', async () => {
  await assertFails(getDoc(doc(admin(), 'boshqa/x')));
  await assertFails(setDoc(doc(admin(), 'boshqa/x'), { a: 1 }));
});

// ---------- settings (administrator paneli) ----------
test('sayt sozlamalarini hamma o\'qiydi, faqat administrator yozadi', async () => {
  await assertSucceeds(getDoc(doc(anon(), 'settings/site')));
  await assertFails(getDocs(collection(anon(), 'settings')));
  await assertFails(getDoc(doc(anon(), 'settings/boshqa')));
  await assertFails(setDoc(doc(teacher(), 'settings/site'), { announce: 'x', announceOn: true }));
  await assertFails(setDoc(doc(student(), 'settings/site'), { regOpen: false }));
  await assertSucceeds(setDoc(doc(admin(), 'settings/site'), { announce: 'Ertaga test', announceOn: true, regOpen: true, updated: 1, by: 'admin1' }));
});
test('sozlamalarga ortiqcha maydon yoki juda uzun e\'lon yozib bo\'lmaydi', async () => {
  await assertFails(setDoc(doc(admin(), 'settings/site'), { announce: 'x', hack: true }));
  await assertFails(setDoc(doc(admin(), 'settings/site'), { announce: 'x'.repeat(301) }));
  await assertFails(setDoc(doc(admin(), 'settings/boshqa'), { announce: 'x' }));
});
test('ro\'yxatdan o\'tish yopilganda faol kod bilan ham ro\'yxatdan o\'tib bo\'lmaydi', async () => {
  await env.withSecurityRulesDisabled(async (ctx) => { await setDoc(doc(ctx.firestore(), 'settings/site'), { regOpen: false }); });
  await assertFails(setDoc(doc(as('n1', 'laylo.s'), 'users/n1'), signup()));
  await env.withSecurityRulesDisabled(async (ctx) => { await setDoc(doc(ctx.firestore(), 'settings/site'), { regOpen: true }); });
  await assertSucceeds(setDoc(doc(as('n1', 'laylo.s'), 'users/n1'), signup()));
});


// ---------- attendance (Zukko Kimyo 2.0) ----------
const attendance = (over = {}) => ({
  date: '2026-11-12',
  cls: '7A',
  entries: { stu1: 'present', stu2: 'absent' },
  updated: Date.now(),
  by: 'admin1',
  ...over
});

test('davomatni faqat administrator o‘qiydi va yozadi', async () => {
  const key = '2026-11-12_7A';
  await assertFails(getDoc(doc(anon(), 'attendance/' + key)));
  await assertFails(getDoc(doc(student(), 'attendance/' + key)));
  await assertFails(setDoc(doc(student(), 'attendance/' + key), attendance({ by: 'stu1' })));
  await assertFails(setDoc(doc(teacher(), 'attendance/' + key), attendance({ by: 'teach1' })));
  await assertSucceeds(setDoc(doc(admin(), 'attendance/' + key), attendance()));
  await assertSucceeds(getDoc(doc(admin(), 'attendance/' + key)));
  await assertFails(getDoc(doc(teacher(), 'attendance/' + key)));
  await assertFails(deleteDoc(doc(teacher(), 'attendance/' + key)));
  await assertSucceeds(deleteDoc(doc(admin(), 'attendance/' + key)));
});

test('davomatga soxta sana, ortiqcha maydon va boshqa uid orqali yozib bo‘lmaydi', async () => {
  await assertFails(setDoc(doc(admin(), 'attendance/bad1'), attendance({ date: '12-11-2026' })));
  await assertFails(setDoc(doc(admin(), 'attendance/bad2'), attendance({ hack: true })));
  await assertFails(setDoc(doc(admin(), 'attendance/bad3'), attendance({ by: 'teach1' })));
  await assertSucceeds(setDoc(doc(admin(), 'attendance/2026-11-12_7A'), attendance()));
});

test('o‘chirilgan (disabled) o‘qituvchi xodim huquqlarini yo‘qotadi', async () => {
  await assertSucceeds(getDocs(collection(teacher(), 'progress')));
  await env.withSecurityRulesDisabled(async (ctx) => { await setDoc(doc(ctx.firestore(), 'users/teach1'), { login: 'dilnoza.k', name: 'Dilnoza', role: 'teacher', cls: '', disabled: true }); });
  await assertFails(getDoc(doc(teacher(), 'secrets/stu1')));
  await assertFails(getDocs(collection(teacher(), 'progress')));
  await assertFails(setDoc(doc(teacher(), 'users/stu1'), { login: 'vali.a.7a', name: 'X', role: 'student', cls: '7A' }));
});

// ---------- obuna (users/{uid}.sub) ----------
const SUB = { plan: 'month', until: Date.now() + 30 * 86400000, at: Date.now(), by: 'adm1' };
test('obunani faqat administrator beradi', async () => {
  await assertSucceeds(setDoc(doc(admin(), 'users/stu1'), { sub: SUB }, { merge: true }));
});
test('o\'quvchi o\'ziga obuna bera olmaydi', async () => {
  await assertFails(setDoc(doc(student(), 'users/stu1'), { sub: SUB }, { merge: true }));
});
test('o\'qituvchi obuna ham, o\'quvchi ma\'lumotini ham o\'zgartira olmaydi', async () => {
  await assertFails(setDoc(doc(teacher(), 'users/stu1'), { sub: SUB }, { merge: true }));
  await assertFails(setDoc(doc(teacher(), 'users/new3'), { login: 'new.3', name: 'Yangi', role: 'student', cls: '7A', sub: SUB }));
  await assertFails(setDoc(doc(teacher(), 'users/stu1'), { name: 'Vali Aliyev' }, { merge: true }));
});
test('noto\'g\'ri obuna yozuvi rad etiladi', async () => {
  await assertFails(setDoc(doc(admin(), 'users/stu1'), { sub: { plan: 'forever', until: 1 } }, { merge: true }));
  await assertFails(setDoc(doc(admin(), 'users/stu1'), { sub: { plan: 'month', until: 'ertaga' } }, { merge: true }));
  await assertFails(setDoc(doc(admin(), 'users/stu1'), { sub: { plan: 'month', until: 1, extra: true } }, { merge: true }));
});
test('administrator tarif narxlari va to\'lov ma\'lumotini saqlaydi; noto\'g\'risi rad etiladi', async () => {
  await assertSucceeds(setDoc(doc(admin(), 'settings/site'), { prices: { month: '50 000 so‘m', year: '400 000 so‘m' }, payInfo: 'Maktab kassasi' }, { merge: true }));
  await assertFails(setDoc(doc(admin(), 'settings/site'), { prices: { month: 5 } }, { merge: true }));
  await assertFails(setDoc(doc(admin(), 'settings/site'), { prices: { week: '1' } }, { merge: true }));
  await assertFails(setDoc(doc(teacher(), 'settings/site'), { prices: { month: '1' } }, { merge: true }));
});
test('administrator bepul mavzular sonini o\'zgartiradi; noto\'g\'ri qiymat rad etiladi', async () => {
  await assertSucceeds(setDoc(doc(admin(), 'settings/site'), { freeN: 2 }, { merge: true }));
  await assertFails(setDoc(doc(admin(), 'settings/site'), { freeN: 2.5 }, { merge: true }));
  await assertFails(setDoc(doc(admin(), 'settings/site'), { freeN: 99 }, { merge: true }));
  await assertFails(setDoc(doc(teacher(), 'settings/site'), { freeN: 50 }, { merge: true }));
});

// ---------- fanlar: o'qituvchiga biriktirish va har fanga obuna ----------
test('admin o\'qituvchiga fan biriktiradi; noto\'g\'ri fan rad etiladi', async () => {
  await assertSucceeds(setDoc(doc(admin(), 'users/teach1'), { subjects: ['math', 'eng'] }, { merge: true }));
  await assertFails(setDoc(doc(admin(), 'users/teach1'), { subjects: ['history'] }, { merge: true }));
  await assertFails(setDoc(doc(teacher(), 'users/teach1'), { subjects: ['chem', 'math', 'eng', 'rus'] }, { merge: true }));
});
test('kimyo natijalarini faqat kimyo fani biriktirilgan o\'qituvchi o\'qiydi', async () => {
  await assertSucceeds(getDocs(collection(teacher(), 'progress')), 'eski o\'qituvchi (fani ko\'rsatilmagan) — kimyo');
  await env.withSecurityRulesDisabled(async (ctx) => { await setDoc(doc(ctx.firestore(), 'users/teach1'), { login: 'dilnoza.k', name: 'Dilnoza', role: 'teacher', cls: '', subjects: ['math'] }); });
  await assertFails(getDocs(collection(teacher(), 'progress')));
  await assertFails(getDoc(doc(teacher(), 'progress/stu1')));
  await assertSucceeds(getDocs(collection(admin(), 'progress')));
});
test('har fanga alohida obuna (subs); noto\'g\'ri fan yoki yozuv rad etiladi', async () => {
  const S = { plan: 'quarter', until: Date.now() + 90 * 86400000, at: Date.now(), by: 'admin1' };
  await assertSucceeds(setDoc(doc(admin(), 'users/stu1'), { subs: { math: S, eng: null } }, { merge: true }));
  await assertFails(setDoc(doc(admin(), 'users/stu1'), { subs: { music: S } }, { merge: true }));
  await assertFails(setDoc(doc(admin(), 'users/stu1'), { subs: { math: { plan: 'week', until: 1 } } }, { merge: true }));
  await assertFails(setDoc(doc(student(), 'users/stu1'), { subs: { math: S } }, { merge: true }));
});

// ---------- darslik sahifalari (content) ----------
const PAGE = (n) => ({ s: 'eng', g: 1, part: 1, p: 5, n, img: 'data:image/webp;base64,AAAA', w: 900, h: 1273, at: 1, by: 'admin1' });
test('darslik sahifasini faqat admin yozadi; noto\'g\'ri yozuv rad etiladi', async () => {
  await assertSucceeds(setDoc(doc(admin(), 'content/eng-1-1-5'), PAGE(1)));
  await assertSucceeds(setDoc(doc(admin(), 'content/rus-1-5-200'), { ...PAGE(250), s: 'rus', part: 5, p: 200 })); // 5-qism: mavzu 201–250
  await assertFails(setDoc(doc(teacher(), 'content/eng-1-1-6'), PAGE(1)));
  await assertFails(setDoc(doc(admin(), 'content/eng-1-1-7'), { ...PAGE(1), img: 'javascript:alert(1)' }));
  await assertFails(setDoc(doc(admin(), 'content/eng-1-1-8'), { ...PAGE(1), s: 'music' }));
});
test('bepul mavzu sahifasi o\'quvchiga ochiq, pullik — faqat fan obunasi bilan', async () => {
  await env.withSecurityRulesDisabled(async (ctx) => {
    await setDoc(doc(ctx.firestore(), 'content/eng-1-1-5'), PAGE(1));
    await setDoc(doc(ctx.firestore(), 'content/eng-1-1-11'), { ...PAGE(4), p: 11 });
  });
  await assertSucceeds(getDoc(doc(student(), 'content/eng-1-1-5')));
  await assertFails(getDoc(doc(student(), 'content/eng-1-1-11')));
  await assertFails(getDocs(collection(student(), 'content')), 'ro\'yxat yopiq');
  await env.withSecurityRulesDisabled(async (ctx) => { await setDoc(doc(ctx.firestore(), 'users/stu1'), { subs: { eng: { plan: 'month', until: Date.now() + 86400000 } } }, { merge: true }); });
  await assertSucceeds(getDoc(doc(student(), 'content/eng-1-1-11')));
  await assertSucceeds(getDoc(doc(admin(), 'content/eng-1-1-11')));
});

// ---------- dars mazmuni (lessons) ----------
const LES = (n, s = 'eng') => ({ s, g: 1, part: 1, n, j: '{"n":' + n + '}', at: 1, by: 'admin1' });
test('dars mazmunini faqat admin yozadi; noto\'g\'ri yozuv rad etiladi', async () => {
  await assertSucceeds(setDoc(doc(admin(), 'lessons/eng-1-1-1'), LES(1)));
  await assertFails(setDoc(doc(teacher(), 'lessons/eng-1-1-2'), LES(2)));
  await assertFails(setDoc(doc(student(), 'lessons/eng-1-1-2'), LES(2)));
  await assertFails(setDoc(doc(admin(), 'lessons/eng-1-1-3'), { ...LES(3), s: 'music' }));
  await assertFails(setDoc(doc(admin(), 'lessons/eng-1-1-4'), { ...LES(4), extra: 1 }));
  await assertFails(setDoc(doc(admin(), 'lessons/eng-1-1-5'), { ...LES(5), j: 'x'.repeat(200001) }));
  await assertSucceeds(setDoc(doc(admin(), 'lessons/rus-1-5-50'), { ...LES(250, 'rus'), part: 5 })); // 5-qism, global raqam 250
  await assertFails(setDoc(doc(admin(), 'lessons/rus-1-11-1'), { ...LES(1, 'rus'), part: 11 }));
  await assertSucceeds(setDoc(doc(admin(), 'lessonIndex/eng-1-1'), { count: 50, at: 1, by: 'admin1', file: 'a.json' }));
  await assertFails(setDoc(doc(teacher(), 'lessonIndex/eng-1-1'), { count: 50, at: 1, by: 'x', file: 'a.json' }));
});
test('bepul mavzu darsi o\'quvchiga ochiq, pullik — fan obunasi yoki shu fan o\'qituvchisi', async () => {
  await env.withSecurityRulesDisabled(async (ctx) => {
    await setDoc(doc(ctx.firestore(), 'lessons/eng-1-1-1'), LES(1));
    await setDoc(doc(ctx.firestore(), 'lessons/eng-1-1-9'), LES(9));
    await setDoc(doc(ctx.firestore(), 'lessons/math-1-1-9'), LES(9, 'math'));
  });
  await assertSucceeds(getDoc(doc(student(), 'lessons/eng-1-1-1')));
  await assertFails(getDoc(doc(student(), 'lessons/eng-1-1-9')));
  await assertFails(getDocs(collection(student(), 'lessons')), 'ro\'yxat yopiq');
  await env.withSecurityRulesDisabled(async (ctx) => { await setDoc(doc(ctx.firestore(), 'users/stu1'), { subs: { eng: { plan: 'month', until: Date.now() + 86400000 } } }, { merge: true }); });
  await assertSucceeds(getDoc(doc(student(), 'lessons/eng-1-1-9')));
  await assertFails(getDoc(doc(student(), 'lessons/math-1-1-9')));
  await env.withSecurityRulesDisabled(async (ctx) => { await setDoc(doc(ctx.firestore(), 'users/teach1'), { login: 'dilnoza.k', name: 'Dilnoza', role: 'teacher', cls: '', status: 'active', subjects: ['math'] }); });
  await assertSucceeds(getDoc(doc(teacher(), 'lessons/math-1-1-9')));
  await assertFails(getDoc(doc(teacher(), 'lessons/eng-1-1-9')));
});

// ---------- yangi fanlar: tasviriy san'at, jismoniy tarbiya, tarbiya ----------
test('yangi fanlar: obuna, o\'qituvchiga biriktirish va dars mazmuni', async () => {
  const S = { plan: 'month', until: Date.now() + 86400000 };
  await assertSucceeds(setDoc(doc(admin(), 'users/stu1'), { subs: { art: S, sport: S, life: null } }, { merge: true }));
  await assertFails(setDoc(doc(admin(), 'users/stu1'), { subs: { music: S } }, { merge: true }));
  await assertSucceeds(setDoc(doc(admin(), 'users/teach1'), { subjects: ['chem', 'math', 'eng', 'rus', 'art', 'sport', 'life'] }, { merge: true }));
  await assertSucceeds(setDoc(doc(admin(), 'lessons/art-1-1-5'), { s: 'art', g: 1, part: 1, n: 5, j: '{}', at: 1, by: 'admin1' }));
  await assertSucceeds(setDoc(doc(admin(), 'lessons/life-1-1-5'), { s: 'life', g: 1, part: 1, n: 5, j: '{}', at: 1, by: 'admin1' }));
  await assertFails(setDoc(doc(admin(), 'lessons/music-1-1-5'), { s: 'music', g: 1, part: 1, n: 5, j: '{}', at: 1, by: 'admin1' }));
  await assertSucceeds(getDoc(doc(student(), 'lessons/art-1-1-5'))); // stu1da san'at obunasi bor
  await assertFails(getDoc(doc(student(), 'lessons/life-1-1-5')));
});
