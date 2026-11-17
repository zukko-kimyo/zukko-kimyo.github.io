/* Zukko Akademiyasi — fanlar ro'yxati va darsliklar mundarijasi (ochiq ma'lumot).
 * Darslik sahifalari va yangi so'zlar BU YERDA EMAS: ular Firebase'da, faqat ruxsati bor foydalanuvchiga (ADR-0008).
 *
 * Fan:   { id, name{uz,en}, color, icon, grades: [..], books: [...] }
 * Kitob: { grade, part, lang (darslik tili), title, file (asl PDF nomi), offset (PDF sahifa = bosma sahifa - offset),
 *          units: [{ t{orig,uz}, from }], topics: [{ t (asl tilda), uz (o'zbekcha), p: [bosma sahifalar] }] }
 * Kimyo (id 'chem') — mavjud bo'lim (app.js, data-g6/7/8.js); bu yerda faqat fanlar ro'yxati uchun.
 */
(function () {
  const two = (from, n) => Array.from({ length: n }, (_, i) => [from + 2 * i, from + 2 * i + 1]);
  const mk = (titles, uz, firstPage) => { const p = two(firstPage, titles.length); return titles.map((t, i) => ({ t, uz: uz[i], p: p[i] })); };

  // ---------- Ingliz tili: Zukko English Pathway 1, 1-sinf, 1-qism ----------
  const EN1 = mk([
    'This Is Me', 'My Name', 'My Family', 'My Mother', 'My Father', 'My Brother', 'My Sister', 'My Baby Brother', 'My Baby Sister', 'My Grandmother',
    'My Grandfather', 'My Aunt', 'My Uncle', 'My Cousin', 'We Love Our Family', 'We Help at Home', 'I Hug My Mom', 'I Listen to Dad', 'Grandma Tells a Story', 'Grandpa Gives Advice',
    'We Eat Together', 'We Say Thank You', 'We Say Sorry', 'My Family Photo', 'My Happy Family',
    'My Home', 'My Room', 'The Living Room', 'The Kitchen', 'The Bathroom', 'The Bedroom', 'The Door', 'The Window', 'My Bed', 'My Chair',
    'My Table', 'My Toys', 'My Bag', 'My Clothes', 'My Shoes', 'Clean Home', 'Dirty and Clean', 'Put Things Away', 'I Make My Bed', 'I Help in the Kitchen',
    'I Wash My Cup', 'I Keep My Room Clean', 'My Favorite Place at Home', 'Safe at Home', 'I Love My Home',
  ], [
    'Bu men', 'Mening ismim', 'Mening oilam', 'Mening onam', 'Mening otam', 'Mening akam', 'Mening opam', 'Mening ukam', 'Mening singlim', 'Mening buvim',
    'Mening bobom', 'Mening xolam', 'Mening amakim', 'Mening amakivachcham', 'Biz oilamizni sevamiz', 'Biz uyda yordam beramiz', 'Men onamni quchoqlayman', 'Men dadamni tinglayman', 'Buvim ertak aytadi', 'Bobom nasihat qiladi',
    'Biz birga ovqatlanamiz', 'Biz rahmat aytamiz', 'Biz kechirim so‘raymiz', 'Oilaviy suratimiz', 'Baxtli oilam',
    'Mening uyim', 'Mening xonam', 'Mehmonxona', 'Oshxona', 'Hammom', 'Yotoqxona', 'Eshik', 'Deraza', 'Mening karavotim', 'Mening stulim',
    'Mening stolim', 'Mening o‘yinchoqlarim', 'Mening sumkam', 'Mening kiyimlarim', 'Mening poyabzalim', 'Toza uy', 'Iflos va toza', 'Narsalarni joyiga qo‘yamiz', 'Men karavotimni yig‘aman', 'Men oshxonada yordam beraman',
    'Men piyolamni yuvaman', 'Men xonamni toza saqlayman', 'Uydagi sevimli joyim', 'Uyda xavfsizlik', 'Men uyimni sevaman',
  ], 5);

  // ---------- Rus tili: Zukko Russian Pathway 1, 1-sinf, 1-qism ----------
  const RU1 = mk([
    'Это я', 'Моё имя', 'Моя семья', 'Моя мама', 'Мой папа', 'Мой маленький брат', 'Моя маленькая сестра', 'Мой двоюродный брат', 'Мы помогаем дома', 'Я обнимаю маму',
    'Мы говорим «прости»', 'Убираем вещи на место', 'Я застилаю свою кровать', 'Я мою свою чашку', 'Я держу свою комнату чистой', 'Безопасность дома', 'Моя парта', 'Моя тетрадь', 'Моя линейка', 'Мой школьный портфель',
    'Я слушаю на уроке', 'Я сижу красиво', 'Я помогаю другу', 'Мы читаем вместе', 'Мы рисуем вместе',
    'Веселье на игровой площадке', 'Мои ступни', 'Здоровая еда', 'Фрукты полезны', 'Я рано просыпаюсь', 'Я делаю зарядку', 'Я бегаю и прыгаю', 'Моя кошка', 'Ослик', 'Курица',
    'Будь добр к животным', 'Жёлтая осень', 'Апельсин', 'Сладкий и кислый', 'Горячий и холодный', 'Люди помогают нам', 'Водитель', 'Уборщик', 'Полицейский', 'Продавец',
    'Я хочу стать…', 'Моя улица', 'Игровая площадка', 'Мы содержим улицы в чистоте', 'Мы уважаем наших соседей',
  ], [
    'Bu men', 'Mening ismim', 'Mening oilam', 'Mening onam', 'Mening dadam', 'Mening ukam', 'Mening singlim', 'Mening amakivachcham', 'Biz uyda yordam beramiz', 'Men onamni quchoqlayman',
    'Biz «kechirasiz» deymiz', 'Narsalarni joyiga qo‘yamiz', 'Men karavotimni yig‘aman', 'Men piyolamni yuvaman', 'Men xonamni toza saqlayman', 'Uyda xavfsizlik', 'Mening partam', 'Mening daftarim', 'Mening chizg‘ichim', 'Mening maktab portfelim',
    'Men darsda tinglayman', 'Men chiroyli o‘tiraman', 'Men do‘stimga yordam beraman', 'Biz birga o‘qiymiz', 'Biz birga rasm chizamiz',
    'O‘yin maydonchasida quvonch', 'Mening oyoqlarim', 'Foydali ovqat', 'Mevalar foydali', 'Men erta turaman', 'Men badantarbiya qilaman', 'Men yuguraman va sakrayman', 'Mening mushugim', 'Eshakcha', 'Tovuq',
    'Hayvonlarga mehribon bo‘l', 'Sariq kuz', 'Apelsin', 'Shirin va nordon', 'Issiq va sovuq', 'Odamlar bizga yordam beradi', 'Haydovchi', 'Farrosh', 'Politsiyachi', 'Sotuvchi',
    'Men … bo‘lmoqchiman', 'Mening ko‘cham', 'O‘yin maydonchasi', 'Biz ko‘chalarni toza saqlaymiz', 'Biz qo‘shnilarimizni hurmat qilamiz',
  ], 5);

  // ---------- Matematika: Mathematics Grade 1, 1-qism (inglizcha) ----------
  const MA1 = mk([
    'Journey into the World of Mathematics', 'Objects Around Us', 'Colours of Objects', 'Shapes of Objects', 'Sizes of Objects', 'Big and Small Objects', 'Long and Short Objects', 'Tall and Short Objects', 'Heavy and Light Objects', 'Thick and Thin Objects',
    'Wide and Narrow Objects', 'Find the Same Objects', 'Find the Different Object', 'Group Objects by Colour', 'Group Objects by Shape', 'Group Objects by Size', 'Group by Two Features', 'Find the Odd One Out', 'Left and Right', 'Above and Below',
    'In Front of and Behind', 'Inside and Outside', 'Near and Far', 'All, Some and None', 'Logic Tasks About Objects',
    'One Object — Number 1', 'Meet Digit 1', 'Write Digit 1', 'Two Objects — Number 2', 'Meet Digit 2', 'Write Digit 2', 'Compare Numbers 1 and 2', 'Three Objects — Number 3', 'Meet Digit 3', 'Write Digit 3',
    'Order of Numbers 1, 2, 3', 'Four Objects — Number 4', 'Meet Digit 4', 'Write Digit 4', 'Parts of Number 4', 'Five Objects — Number 5', 'Meet Digit 5', 'Write Digit 5', 'Parts of Number 5', 'Count Forward from 1 to 5',
    'Count Backward from 5 to 1', 'Match Numbers and Quantities', 'Previous and Next Numbers', 'Compare Numbers from 1 to 5', 'Logic Tasks with Numbers 1 to 5',
  ], [
    'Matematika olamiga sayohat', 'Atrofimizdagi narsalar', 'Narsalarning rangi', 'Narsalarning shakli', 'Narsalarning o‘lchami', 'Katta va kichik narsalar', 'Uzun va qisqa narsalar', 'Baland va past narsalar', 'Og‘ir va yengil narsalar', 'Qalin va yupqa narsalar',
    'Keng va tor narsalar', 'Bir xil narsalarni top', 'Boshqacha narsani top', 'Narsalarni rangi bo‘yicha guruhla', 'Narsalarni shakli bo‘yicha guruhla', 'Narsalarni o‘lchami bo‘yicha guruhla', 'Ikki belgi bo‘yicha guruhla', 'Ortiqchasini top', 'Chap va o‘ng', 'Tepada va pastda',
    'Oldida va orqasida', 'Ichida va tashqarisida', 'Yaqin va uzoq', 'Hammasi, ba’zisi va hech biri', 'Narsalar haqida mantiqiy masalalar',
    'Bitta narsa — 1 soni', '1 raqami bilan tanishamiz', '1 raqamini yozamiz', 'Ikkita narsa — 2 soni', '2 raqami bilan tanishamiz', '2 raqamini yozamiz', '1 va 2 sonlarini taqqoslaymiz', 'Uchta narsa — 3 soni', '3 raqami bilan tanishamiz', '3 raqamini yozamiz',
    '1, 2, 3 sonlarining tartibi', 'To‘rtta narsa — 4 soni', '4 raqami bilan tanishamiz', '4 raqamini yozamiz', '4 sonining tarkibi', 'Beshta narsa — 5 soni', '5 raqami bilan tanishamiz', '5 raqamini yozamiz', '5 sonining tarkibi', '1 dan 5 gacha sanaymiz',
    '5 dan 1 gacha teskari sanaymiz', 'Son va miqdorni moslaymiz', 'Oldingi va keyingi son', '1 dan 5 gacha sonlarni taqqoslaymiz', '1–5 sonlari bilan mantiqiy masalalar',
  ], 3);

  const G = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
  const LIST = [
    { id: 'chem', name: { uz: 'Kimyo', en: 'Chemistry' }, color: '#00555a', icon: '⚗️', grades: [6, 7, 8], native: true, home: '#home' },
    { id: 'math', name: { uz: 'Matematika', en: 'Mathematics' }, color: '#2563eb', icon: '➗', grades: G(1, 11), books: [
      { grade: 1, part: 1, lang: 'en', title: 'Mathematics Grade 1 · Part 1', file: '1-qism_ingliz.pdf', offset: 0,
        units: [{ t: { orig: 'Chapter 1. Objects, Features and Logical Grouping', uz: '1-bob. Narsalar, belgilar va mantiqiy guruhlash' }, from: 1 },
                { t: { orig: 'Chapter 2. Numbers from 1 to 5', uz: '2-bob. 1 dan 5 gacha sonlar' }, from: 26 }], topics: MA1 },
    ] },
    { id: 'eng', name: { uz: 'Ingliz tili', en: 'English' }, color: '#dc2626', icon: '🔤', grades: G(1, 11), speech: 'en-GB', books: [
      { grade: 1, part: 1, lang: 'en', title: 'Zukko English Pathway 1 · Part 1', file: 'Part_1.pdf', offset: 2,
        units: [{ t: { orig: 'Unit 1 — My Family', uz: '1-bo‘lim — Mening oilam' }, from: 1 }, { t: { orig: 'Unit 2 — My Home', uz: '2-bo‘lim — Mening uyim' }, from: 26 }], topics: EN1 },
    ] },
    { id: 'rus', name: { uz: 'Rus tili', en: 'Russian' }, color: '#7c3aed', icon: '🅰️', grades: G(1, 11), speech: 'ru-RU', books: [
      { grade: 1, part: 1, lang: 'ru', title: 'Zukko Russian Pathway 1 · Часть 1', file: '1-qism.pdf', offset: 2,
        units: [{ t: { orig: 'Раздел 1. Моя семья', uz: '1-bo‘lim. Mening oilam' }, from: 1 }, { t: { orig: 'Раздел 2. Мой дом', uz: '2-bo‘lim. Mening uyim' }, from: 26 }], topics: RU1 },
    ] },
  ];
  const byId = {}; LIST.forEach((s) => { byId[s.id] = s; });
  const api = {
    list: LIST,
    get: (id) => byId[id] || null,
    // sinfdagi kitoblar (qismlar tartibida)
    books: (id, grade) => ((byId[id] && byId[id].books) || []).filter((b) => b.grade === grade).sort((a, b) => a.part - b.part),
    book: (id, grade, part) => ((byId[id] && byId[id].books) || []).find((b) => b.grade === grade && b.part === part) || null,
    ids: LIST.map((s) => s.id),
  };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else window.ZKSubjects = api;
})();
