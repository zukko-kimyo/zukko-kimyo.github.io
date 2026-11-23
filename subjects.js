/* Zukko Akademiyasi — fanlar ro'yxati va darsliklar mundarijasi (ochiq ma'lumot).
 * Darslik sahifalari va yangi so'zlar BU YERDA EMAS: ular Firebase'da, faqat ruxsati bor foydalanuvchiga (ADR-0008).
 *
 * Fan:   { id, name{uz,en}, color, icon, grades: [..], books: [...] }
 * Kitob: { grade, part, lang (darslik tili), title, file (asl PDF nomi), offset (PDF sahifa = bosma sahifa - offset),
 *          units: [{ t{orig,uz}, from }], topics: [{ t (asl tilda), uz, ru, en (tarjima), p: [bosma sahifalar] }] }
 * Kimyo (id 'chem') — mavjud bo'lim (app.js, data-g6/7/8.js); bu yerda faqat fanlar ro'yxati uchun.
 */
(function () {
  const two = (from, n) => Array.from({ length: n }, (_, i) => [from + 2 * i, from + 2 * i + 1]);
  const mk = (titles, uz, ru, en, firstPage, fix) => { const p = two(firstPage, titles.length); return titles.map((t, i) => ({ t, uz: uz[i], ru: ru[i], en: en[i], p: (fix && fix[i + 1]) || p[i] })); };

  // ---------- Ingliz tili: Zukko English Pathway 1, 1-sinf, 1-qism ----------
  const EN1 = mk([
    "This Is Me", "My Name", "My Family", "My Mother", "My Father", "My Brother", "My Sister", "My Baby Brother", "My Baby Sister", "My Grandmother",
    "My Grandfather", "My Aunt", "My Uncle", "My Cousin", "We Love Our Family", "We Help at Home", "I Hug My Mom", "I Listen to Dad",
    "Grandma Tells a Story", "Grandpa Gives Advice", "We Eat Together", "We Say Thank You", "We Say Sorry", "My Family Photo", "My Happy Family",
    "My Home", "My Room", "The Living Room", "The Kitchen", "The Bathroom", "The Bedroom", "The Door", "The Window", "My Bed", "My Chair",
    "My Table", "My Toys", "My Bag", "My Clothes", "My Shoes", "Clean Home", "Dirty and Clean", "Put Things Away", "I Make My Bed",
    "I Help in the Kitchen", "I Wash My Cup", "I Keep My Room Clean", "My Favorite Place at Home", "Safe at Home", "I Love My Home",
  ], [
    "Bu menman", "Mening ismim", "Mening oilam", "Mening onam", "Mening otam", "Mening akam (ukam)", "Mening opam (singlim)", "Mening ukacham",
    "Mening singlicham", "Mening buvim", "Mening bobom", "Mening xolam", "Mening amakim", "Mening amakivachcham", "Biz oilamizni sevamiz",
    "Biz uyda yordam beramiz", "Men onamni quchoqlayman", "Men dadamni tinglayman", "Buvim hikoya aytib beradi", "Bobom maslahat beradi",
    "Biz birga ovqatlanamiz", "Biz «rahmat» deymiz", "Biz «kechirasiz» deymiz", "Oilaviy suratim", "Mening baxtli oilam", "Mening uyim",
    "Mening xonam", "Mehmonxona", "Oshxona", "Hammom", "Yotoqxona", "Eshik", "Deraza", "Mening karavotim", "Mening stulim", "Mening stolim",
    "Mening o‘yinchoqlarim", "Mening sumkam", "Mening kiyimlarim", "Mening oyoq kiyimlarim", "Toza uy", "Iflos va toza",
    "Narsalarni joyiga qo‘yamiz", "Men karavotimni yig‘ishtiraman", "Men oshxonada yordam beraman", "Men finjonimni yuvaman",
    "Men xonamni toza saqlayman", "Uydagi sevimli joyim", "Uyda xavfsizlik", "Men uyimni yaxshi ko‘raman",
  ], [
    "Это я", "Моё имя", "Моя семья", "Моя мама", "Мой папа", "Мой брат", "Моя сестра", "Мой младший братик", "Моя младшая сестрёнка", "Моя бабушка",
    "Мой дедушка", "Моя тётя", "Мой дядя", "Мой двоюродный брат", "Мы любим нашу семью", "Мы помогаем дома", "Я обнимаю маму", "Я слушаю папу",
    "Бабушка рассказывает сказку", "Дедушка даёт совет", "Мы едим вместе", "Мы говорим «спасибо»", "Мы говорим «прости»", "Моя семейная фотография",
    "Моя счастливая семья", "Мой дом", "Моя комната", "Гостиная", "Кухня", "Ванная комната", "Спальня", "Дверь", "Окно", "Моя кровать", "Мой стул",
    "Мой стол", "Мои игрушки", "Мой рюкзак", "Моя одежда", "Моя обувь", "Чистый дом", "Грязный и чистый", "Убираем вещи на место",
    "Я заправляю кровать", "Я помогаю на кухне", "Я мою свою чашку", "Я держу свою комнату в чистоте", "Моё любимое место дома", "Безопасность дома",
    "Я люблю свой дом",
  ], [
    "This Is Me", "My Name", "My Family", "My Mother", "My Father", "My Brother", "My Sister", "My Baby Brother", "My Baby Sister", "My Grandmother",
    "My Grandfather", "My Aunt", "My Uncle", "My Cousin", "We Love Our Family", "We Help at Home", "I Hug My Mom", "I Listen to Dad",
    "Grandma Tells a Story", "Grandpa Gives Advice", "We Eat Together", "We Say Thank You", "We Say Sorry", "My Family Photo", "My Happy Family",
    "My Home", "My Room", "The Living Room", "The Kitchen", "The Bathroom", "The Bedroom", "The Door", "The Window", "My Bed", "My Chair",
    "My Table", "My Toys", "My Bag", "My Clothes", "My Shoes", "Clean Home", "Dirty and Clean", "Put Things Away", "I Make My Bed",
    "I Help in the Kitchen", "I Wash My Cup", "I Keep My Room Clean", "My Favorite Place at Home", "Safe at Home", "I Love My Home",
  ], 5, { 43: [89, 91], 44: [92, 90] }); // darslikda 43–44-mavzu sahifalari aralash

  // ---------- Rus tili: Zukko Russian Pathway 1, 1-sinf, 1-qism ----------
  const RU1 = mk([
    "Это я", "Моё имя", "Моя семья", "Моя мама", "Мой папа", "Мой брат", "Моя сестра", "Мой маленький брат", "Моя маленькая сестра", "Моя бабушка",
    "Мой дедушка", "Моя тётя", "Мой дядя", "Мой двоюродный брат", "Мы любим нашу семью", "Мы помогаем дома", "Я обнимаю маму", "Я слушаю папу",
    "Бабушка рассказывает историю", "Дедушка даёт совет", "Мы едим вместе", "Мы говорим «спасибо»", "Мы говорим «прости»", "Моя семейная фотография",
    "Моя счастливая семья", "Мой дом", "Моя комната", "Гостиная", "Кухня", "Ванная комната", "Спальня", "Дверь", "Окно", "Моя кровать", "Мой стул",
    "Мой стол", "Мои игрушки", "Моя сумка", "Моя одежда", "Моя обувь", "Чистый дом", "Грязный и чистый", "Убираем вещи на место",
    "Я застилаю свою кровать", "Я помогаю на кухне", "Я мою свою чашку", "Я держу свою комнату чистой", "Моё любимое место дома",
    "Безопасность дома", "Я люблю свой дом",
  ], [
    "Bu men", "Mening ismim", "Mening oilam", "Mening onam", "Mening otam", "Mening akam / ukam", "Mening opam / singlim", "Mening ukajonim",
    "Mening singiljonim", "Mening buvim", "Mening bobom", "Mening xolam", "Mening amakim", "Mening amakivachcham", "Biz oilamizni yaxshi ko‘ramiz",
    "Biz uyda yordam beramiz", "Men onamni quchoqlayman", "Men otamni tinglayman", "Buvim hikoya aytib beradi", "Bobom maslahat beradi",
    "Biz birga ovqatlanamiz", "Biz «rahmat» deymiz", "Biz «kechir» deymiz", "Oilaviy suratim", "Mening baxtli oilam", "Mening uyim", "Mening xonam",
    "Mehmonxona", "Oshxona", "Hammom", "Yotoqxona", "Eshik", "Deraza", "Mening karavotim", "Mening stulim", "Mening stolim", "Mening o‘yinchoqlarim",
    "Mening sumkam", "Mening kiyimlarim", "Mening oyoq kiyimim", "Toza uy", "Iflos va toza", "Narsalarni joyiga qo‘yamiz",
    "Men karavotimni yig‘ishtiraman", "Men oshxonada yordam beraman", "Men finjonimni yuvaman", "Men xonamni toza saqlayman", "Uydagi sevimli joyim",
    "Uyda xavfsizlik", "Men uyimni yaxshi ko‘raman",
  ], [
    "Это я", "Моё имя", "Моя семья", "Моя мама", "Мой папа", "Мой брат", "Моя сестра", "Мой маленький брат", "Моя маленькая сестра", "Моя бабушка",
    "Мой дедушка", "Моя тётя", "Мой дядя", "Мой двоюродный брат", "Мы любим нашу семью", "Мы помогаем дома", "Я обнимаю маму", "Я слушаю папу",
    "Бабушка рассказывает историю", "Дедушка даёт совет", "Мы едим вместе", "Мы говорим «спасибо»", "Мы говорим «прости»", "Моя семейная фотография",
    "Моя счастливая семья", "Мой дом", "Моя комната", "Гостиная", "Кухня", "Ванная комната", "Спальня", "Дверь", "Окно", "Моя кровать", "Мой стул",
    "Мой стол", "Мои игрушки", "Моя сумка", "Моя одежда", "Моя обувь", "Чистый дом", "Грязный и чистый", "Убираем вещи на место",
    "Я застилаю свою кровать", "Я помогаю на кухне", "Я мою свою чашку", "Я держу свою комнату чистой", "Моё любимое место дома",
    "Безопасность дома", "Я люблю свой дом",
  ], [
    "This is me", "My name", "My family", "My mum", "My dad", "My brother", "My sister", "My little brother", "My little sister", "My grandma",
    "My grandpa", "My aunt", "My uncle", "My cousin", "We love our family", "We help at home", "I hug my mum", "I listen to my dad",
    "Grandma tells a story", "Grandpa gives advice", "We eat together", "We say “thank you”", "We say “sorry”", "My family photo", "My happy family",
    "My home", "My room", "Living room", "Kitchen", "Bathroom", "Bedroom", "Door", "Window", "My bed", "My chair", "My desk", "My toys", "My bag",
    "My clothes", "My shoes", "A clean home", "Dirty and clean", "Putting things away", "I make my bed", "I help in the kitchen", "I wash my cup",
    "I keep my room clean", "My favourite place at home", "Safety at home", "I love my home",
  ], 5);

  // ---------- Matematika: Mathematics Grade 1, 1-qism (inglizcha) ----------
  const MA1 = mk([
    "A Journey Into the World of Math", "Things Around Us", "Colours of Objects", "Shapes of Objects", "Size of Objects", "Big and Small Objects",
    "Long and Short Objects", "Tall and Short Objects", "Heavy and Light Objects", "Thick and Thin Objects", "Wide and Narrow Objects",
    "Find Identical Objects", "Find the Different Object", "Group Objects by Colour", "Group Objects by Shape", "Group Objects by Size",
    "Group Objects by Two Features", "Find the Odd One Out", "Left and Right", "Above and Below", "In Front of and Behind", "Inside and Outside",
    "Near and Far", "All, Some and None", "Logic Tasks about Objects", "One Object — Number 1", "Meet the Number 1", "We Write the Number 1",
    "Two Things — Number 2", "Meet the Number 2", "Let’s Write Number 2", "Let’s Compare 1 and 2", "Three Things — Number 3", "Meet the Number 3",
    "Let’s Write Number 3", "Ordering 1, 2 and 3", "Four Things — Number 4", "Meet the Number 4", "Let’s Write Number 4", "Parts of 4",
    "Five Things — Number 5", "Meet the Number 5", "Let’s Write Number 5", "Parts of 5", "Numbers 1 to 5", "Review 1 to 5", "More, Fewer or Equal",
    "Compare Numbers", "Number Line", "My Number Test",
  ], [
    "Matematika olamiga sayohat", "Atrofimizdagi narsalar", "Narsalarning ranglari", "Narsalarning shakllari", "Narsalarning kattaligi",
    "Katta va kichik narsalar", "Uzun va qisqa narsalar", "Baland va past narsalar", "Og‘ir va yengil narsalar", "Qalin va yupqa narsalar",
    "Keng va tor narsalar", "Bir xil narsalarni top", "Boshqacha narsani top", "Narsalarni rangiga qarab guruhlash",
    "Narsalarni shakliga qarab guruhlash", "Narsalarni kattaligiga qarab guruhlash", "Narsalarni ikki belgisiga qarab guruhlash", "Ortiqchasini top",
    "Chap va o‘ng", "Yuqorida va pastda", "Oldida va orqasida", "Ichida va tashqarisida", "Yaqin va uzoq", "Hammasi, ba’zilari va hech biri",
    "Narsalar haqida mantiqiy topshiriqlar", "Bitta narsa – 1 soni", "1 soni bilan tanishamiz", "1 sonini yozamiz", "Ikkita narsa – 2 soni",
    "2 soni bilan tanishamiz", "2 sonini yozamiz", "1 va 2 ni taqqoslaymiz", "Uchta narsa – 3 soni", "3 soni bilan tanishamiz", "3 sonini yozamiz",
    "1, 2 va 3 ni tartiblaymiz", "To‘rtta narsa – 4 soni", "4 soni bilan tanishamiz", "4 sonini yozamiz", "4 ning qismlari", "Beshta narsa – 5 soni",
    "5 soni bilan tanishamiz", "5 sonini yozamiz", "5 ning qismlari", "1 dan 5 gacha sonlar", "1 dan 5 gacha takrorlash", "Ko‘p, kam yoki teng",
    "Sonlarni taqqoslaymiz", "Sonlar chizig‘i", "Mening sonlar testim",
  ], [
    "Путешествие в мир математики", "Предметы вокруг нас", "Цвета предметов", "Формы предметов", "Размер предметов", "Большие и маленькие предметы",
    "Длинные и короткие предметы", "Высокие и низкие предметы", "Тяжёлые и лёгкие предметы", "Толстые и тонкие предметы", "Широкие и узкие предметы",
    "Найди одинаковые предметы", "Найди отличающийся предмет", "Группируем предметы по цвету", "Группируем предметы по форме",
    "Группируем предметы по размеру", "Группируем предметы по двум признакам", "Найди лишний предмет", "Слева и справа", "Выше и ниже",
    "Впереди и позади", "Внутри и снаружи", "Близко и далеко", "Все, некоторые и ни один", "Логические задачи о предметах", "Один предмет – число 1",
    "Знакомимся с числом 1", "Пишем число 1", "Два предмета – число 2", "Знакомимся с числом 2", "Пишем число 2", "Сравниваем 1 и 2",
    "Три предмета – число 3", "Знакомимся с числом 3", "Пишем число 3", "Порядок чисел 1, 2 и 3", "Четыре предмета – число 4",
    "Знакомимся с числом 4", "Пишем число 4", "Состав числа 4", "Пять предметов – число 5", "Знакомимся с числом 5", "Пишем число 5",
    "Состав числа 5", "Числа от 1 до 5", "Повторение: числа от 1 до 5", "Больше, меньше или поровну", "Сравниваем числа", "Числовой ряд",
    "Моя проверка чисел",
  ], [
    "A journey into the world of math", "Things around us", "Colours of objects", "Shapes of objects", "Size of objects", "Big and small objects",
    "Long and short objects", "Tall and short objects", "Heavy and light objects", "Thick and thin objects", "Wide and narrow objects",
    "Find identical objects", "Find the different object", "Group objects by colour", "Group objects by shape", "Group objects by size",
    "Group objects by two features", "Find the odd one out", "Left and right", "Above and below", "In front of and behind", "Inside and outside",
    "Near and far", "All, some and none", "Logic tasks about objects", "One object – number 1", "Meet the number 1", "We write the number 1",
    "Two things – number 2", "Meet the number 2", "Let’s write number 2", "Let’s compare 1 and 2", "Three things – number 3", "Meet the number 3",
    "Let’s write number 3", "Ordering 1, 2 and 3", "Four things – number 4", "Meet the number 4", "Let’s write number 4", "Parts of 4",
    "Five things – number 5", "Meet the number 5", "Let’s write number 5", "Parts of 5", "Numbers 1 to 5", "Review 1 to 5", "More, fewer or equal",
    "Compare numbers", "Number line", "My number test",
  ], 3);

  // ---------- Rus tili: Zukko Russian Pathway 1, 2-qism (51–100-mavzular) ----------
  const RU2 = mk([
    "Моя школа", "Мой класс", "Мой учитель", "Мои друзья", "Моя парта", "Мой стул в школе", "Моя книга", "Моя тетрадь", "Мой карандаш", "Моя ручка",
    "Мой ластик", "Моя линейка", "Мой школьный портфель", "Я поднимаю руку", "Я слушаю на уроке", "Я сижу красиво", "Я делюсь своими вещами",
    "Я помогаю другу", "Мы читаем вместе", "Мы пишем вместе", "Мы считаем вместе", "Мы рисуем вместе", "Школьный звонок",
    "Веселье на игровой площадке", "Я люблю свою школу", "Моё Тело", "Моя Голова", "Мои Глаза", "Мои Уши", "Мой Нос", "Мой Рот", "Мои Руки",
    "Мои Пальцы", "Мои Ноги", "Мои ступни", "Я мою руки", "Я чищу зубы", "Я расчёсываю волосы", "Я принимаю ванну", "Чистая одежда", "Здоровая еда",
    "Фрукты полезны", "Овощи полезны", "Я пью воду", "Я рано ложусь спать", "Я рано просыпаюсь", "Я делаю зарядку", "Я бегаю и прыгаю",
    "Я чувствую себя счастливым", "Я здоров",
  ], [
    "Mening maktabim", "Mening sinfim", "Mening ustozim", "Mening do‘stlarim", "Mening partam", "Maktabdagi stulim", "Mening kitobim",
    "Mening daftarim", "Mening qalamim", "Mening ruchkam", "Mening o‘chirg‘ichim", "Mening chizg‘ichim", "Mening maktab sumkam",
    "Men qo‘l ko‘taraman", "Men darsda tinglayman", "Men chiroyli o‘tiraman", "Men narsalarimni baham ko‘raman", "Men do‘stimga yordam beraman",
    "Biz birga o‘qiymiz", "Biz birga yozamiz", "Biz birga sanaymiz", "Biz birga rasm chizamiz", "Maktab qo‘ng‘irog‘i",
    "O‘yin maydonchasidagi quvnoqlik", "Men maktabimni yaxshi ko‘raman", "Mening tanam", "Mening boshim", "Mening ko‘zlarim", "Mening quloqlarim",
    "Mening burnim", "Mening og‘zim", "Mening qo‘llarim", "Mening barmoqlarim", "Mening oyoqlarim", "Mening oyoq panjalarim",
    "Men qo‘llarimni yuvaman", "Men tishlarimni tozalayman", "Men sochimni tarayman", "Men vannada yuvinaman", "Toza kiyim", "Foydali ovqat",
    "Mevalar foydali", "Sabzavotlar foydali", "Men suv ichaman", "Men erta uxlashga yotaman", "Men erta uyg‘onaman", "Men badantarbiya qilaman",
    "Men yuguraman va sakrayman", "Men o‘zimni baxtli his qilaman", "Men sog‘lomman",
  ], [
    "Моя школа", "Мой класс", "Мой учитель", "Мои друзья", "Моя парта", "Мой стул в школе", "Моя книга", "Моя тетрадь", "Мой карандаш", "Моя ручка",
    "Мой ластик", "Моя линейка", "Мой школьный портфель", "Я поднимаю руку", "Я слушаю на уроке", "Я сижу красиво", "Я делюсь своими вещами",
    "Я помогаю другу", "Мы читаем вместе", "Мы пишем вместе", "Мы считаем вместе", "Мы рисуем вместе", "Школьный звонок",
    "Веселье на игровой площадке", "Я люблю свою школу", "Моё тело", "Моя голова", "Мои глаза", "Мои уши", "Мой нос", "Мой рот", "Мои руки",
    "Мои пальцы", "Мои ноги", "Мои ступни", "Я мою руки", "Я чищу зубы", "Я расчёсываю волосы", "Я принимаю ванну", "Чистая одежда", "Здоровая еда",
    "Фрукты полезны", "Овощи полезны", "Я пью воду", "Я рано ложусь спать", "Я рано просыпаюсь", "Я делаю зарядку", "Я бегаю и прыгаю",
    "Я чувствую себя счастливым", "Я здоров",
  ], [
    "My school", "My classroom", "My teacher", "My friends", "My desk", "My chair at school", "My book", "My notebook", "My pencil", "My pen",
    "My eraser", "My ruler", "My school bag", "I raise my hand", "I listen in class", "I sit nicely", "I share my things", "I help my friend",
    "We read together", "We write together", "We count together", "We draw together", "The school bell", "Fun on the playground", "I love my school",
    "My body", "My head", "My eyes", "My ears", "My nose", "My mouth", "My hands", "My fingers", "My legs", "My feet", "I wash my hands",
    "I brush my teeth", "I comb my hair", "I take a bath", "Clean clothes", "Healthy food", "Fruit is healthy", "Vegetables are healthy",
    "I drink water", "I go to bed early", "I wake up early", "I do morning exercises", "I run and jump", "I feel happy", "I am healthy",
  ], 105, { 8: [120, 119], 44: [192, 191], 45: [194, 193] }); // darslikda bu mavzular sahifalari almashib qolgan

  // ---------- Rus tili: Zukko Russian Pathway 1, 3-qism (101–150-mavzular) ----------
  const RU3 = mk([
    "Животные вокруг меня", "Моя кошка", "Моя собака", "Маленький щенок", "Маленький котёнок", "Корова", "Овца", "Коза", "Лошадь", "Ослик", "Курица",
    "Петух", "Утка", "Птица", "Рыба", "Кролик", "Пчела", "Бабочка", "Лягушка", "Черепаха", "Лев", "Слон", "Обезьяна", "Будь добр к животным",
    "Животным нужна забота", "Природа вокруг меня", "Солнце", "Луна", "Звёзды", "Небо", "Облака", "Дождь", "Снег", "Ветер", "Вода", "Дерево",
    "Цветок", "Зелёная трава", "Лист", "Сад", "Фрукты на деревьях", "Цветы весной", "Жаркое лето", "Жёлтая осень", "Холодная зима", "Я люблю дождь",
    "Я вижу радугу", "Мы сажаем дерево", "Сохраняем природу чистой", "Природа — наш друг",
  ], [
    "Atrofimdagi hayvonlar", "Mening mushugim", "Mening itim", "Kichkina kuchukcha", "Kichkina mushukcha", "Sigir", "Qo‘y", "Echki", "Ot",
    "Eshakcha", "Tovuq", "Xo‘roz", "O‘rdak", "Qush", "Baliq", "Quyon", "Asalari", "Kapalak", "Qurbaqa", "Toshbaqa", "Sher", "Fil", "Maymun",
    "Hayvonlarga mehribon bo‘l", "Hayvonlarga g‘amxo‘rlik kerak", "Atrofimdagi tabiat", "Quyosh", "Oy", "Yulduzlar", "Osmon", "Bulutlar", "Yomg‘ir",
    "Qor", "Shamol", "Suv", "Daraxt", "Gul", "Yashil o‘t", "Barg", "Bog‘", "Daraxtlardagi mevalar", "Bahorda gullar", "Issiq yoz", "Sariq kuz",
    "Sovuq qish", "Men yomg‘irni yaxshi ko‘raman", "Men kamalakni ko‘ryapman", "Biz daraxt ekamiz", "Tabiatni toza saqlaymiz",
    "Tabiat — bizning do‘stimiz",
  ], [
    "Животные вокруг меня", "Моя кошка", "Моя собака", "Маленький щенок", "Маленький котёнок", "Корова", "Овца", "Коза", "Лошадь", "Ослик", "Курица",
    "Петух", "Утка", "Птица", "Рыба", "Кролик", "Пчела", "Бабочка", "Лягушка", "Черепаха", "Лев", "Слон", "Обезьяна", "Будь добр к животным",
    "Животным нужна забота", "Природа вокруг меня", "Солнце", "Луна", "Звёзды", "Небо", "Облака", "Дождь", "Снег", "Ветер", "Вода", "Дерево",
    "Цветок", "Зелёная трава", "Лист", "Сад", "Фрукты на деревьях", "Цветы весной", "Жаркое лето", "Жёлтая осень", "Холодная зима", "Я люблю дождь",
    "Я вижу радугу", "Мы сажаем дерево", "Сохраняем природу чистой", "Природа — наш друг",
  ], [
    "Animals around me", "My cat", "My dog", "A little puppy", "A little kitten", "The cow", "The sheep", "The goat", "The horse",
    "The little donkey", "The hen", "The rooster", "The duck", "The bird", "The fish", "The rabbit", "The bee", "The butterfly", "The frog",
    "The tortoise", "The lion", "The elephant", "The monkey", "Be kind to animals", "Animals need care", "Nature around me", "The sun", "The moon",
    "Stars", "The sky", "Clouds", "Rain", "Snow", "The wind", "Water", "The tree", "The flower", "Green grass", "The leaf", "The garden",
    "Fruit on the trees", "Flowers in spring", "Hot summer", "Yellow autumn", "Cold winter", "I love rain", "I see a rainbow", "We plant a tree",
    "We keep nature clean", "Nature is our friend",
  ], 205);

  // ---------- Rus tili: Zukko Russian Pathway 1, 4-qism (151–200-mavzular) ----------
  const RU4 = mk([
    "Моя еда", "Хлеб", "Вода", "Молоко", "Чай", "Суп", "Рис", "Яблоко", "Банан", "Апельсин", "Виноград", "Морковь", "Картофель", "Помидор", "Огурец",
    "Сладкий и кислый", "Горячий и холодный", "Красный", "Синий", "Жёлтый", "Зелёный", "Белый и чёрный", "Большой и маленький", "Длинный и короткий",
    "Мой любимый цвет", "Люди помогают нам", "Мой учитель", "Доктор", "Медсестра", "Водитель", "Фермер", "Пекарь", "Повар", "Уборщик", "Строитель",
    "Полицейский", "Пожарный", "Продавец", "Портной", "Парикмахер", "Садовник", "Почтальон", "Библиотекарь", "Музыкант", "Художник", "Дантист",
    "Пилот", "Машинист поезда", "Каждая работа важна", "Я хочу стать…",
  ], [
    "Mening ovqatim", "Non", "Suv", "Sut", "Choy", "Sho‘rva", "Guruch", "Olma", "Banan", "Apelsin", "Uzum", "Sabzi", "Kartoshka", "Pomidor",
    "Bodring", "Shirin va nordon", "Issiq va sovuq", "Qizil", "Ko‘k", "Sariq", "Yashil", "Oq va qora", "Katta va kichik", "Uzun va qisqa",
    "Mening sevimli rangim", "Odamlar bizga yordam beradi", "Mening o‘qituvchim", "Shifokor", "Hamshira", "Haydovchi", "Dehqon", "Nonvoy", "Oshpaz",
    "Farrosh", "Quruvchi", "Politsiyachi", "O‘t o‘chiruvchi", "Sotuvchi", "Tikuvchi", "Sartarosh", "Bog‘bon", "Pochtachi", "Kutubxonachi",
    "Musiqachi", "Rassom", "Tish shifokori", "Uchuvchi", "Poyezd mashinisti", "Har bir ish muhim", "Men … bo‘lishni xohlayman",
  ], [
    "Моя еда", "Хлеб", "Вода", "Молоко", "Чай", "Суп", "Рис", "Яблоко", "Банан", "Апельсин", "Виноград", "Морковь", "Картофель", "Помидор", "Огурец",
    "Сладкий и кислый", "Горячий и холодный", "Красный", "Синий", "Жёлтый", "Зелёный", "Белый и чёрный", "Большой и маленький", "Длинный и короткий",
    "Мой любимый цвет", "Люди помогают нам", "Мой учитель", "Доктор", "Медсестра", "Водитель", "Фермер", "Пекарь", "Повар", "Уборщик", "Строитель",
    "Полицейский", "Пожарный", "Продавец", "Портной", "Парикмахер", "Садовник", "Почтальон", "Библиотекарь", "Музыкант", "Художник", "Дантист",
    "Пилот", "Машинист поезда", "Каждая работа важна", "Я хочу стать…",
  ], [
    "My food", "Bread", "Water", "Milk", "Tea", "Soup", "Rice", "Apple", "Banana", "Orange", "Grapes", "Carrot", "Potato", "Tomato", "Cucumber",
    "Sweet and sour", "Hot and cold", "Red", "Blue", "Yellow", "Green", "White and black", "Big and small", "Long and short", "My favourite colour",
    "People help us", "My teacher", "Doctor", "Nurse", "Driver", "Farmer", "Baker", "Cook", "Cleaner", "Builder", "Police officer", "Firefighter",
    "Shop assistant", "Tailor", "Hairdresser", "Gardener", "Postman", "Librarian", "Musician", "Artist", "Dentist", "Pilot", "Train driver",
    "Every job is important", "I want to be…",
  ], 55);

  // ---------- O'zbek tilidagi fanlar: tasviriy san'at, jismoniy tarbiya, tarbiya ----------
  // art: 1-sinf, 40 mavzu (har biri 2 sahifa)
  const ART1U = [{ t: { orig: "1-bob. Tasviriy san’at olamiga sayohat", uz: "1-bob. Tasviriy san’at olamiga sayohat" }, from: 1 }, { t: { orig: "2-bob. Tabiat ranglari va go‘zalligi", uz: "2-bob. Tabiat ranglari va go‘zalligi" }, from: 11 }, { t: { orig: "3-bob. Jonivorlar va harakatdagi buyumlar", uz: "3-bob. Jonivorlar va harakatdagi buyumlar" }, from: 21 }, { t: { orig: "4-bob. Fasllar, gullar va ijodiy tasavvur", uz: "4-bob. Fasllar, gullar va ijodiy tasavvur" }, from: 31 }];
  const ART1 = mk([
    "Tasviriy san’at olamiga ilk qadam", "Rassomning ish qurollari", "Quvnoq chiziqlar", "Shakllar mamlakati", "Asosiy ranglar bilan tanishamiz",
    "Ranglarni aralashtiramiz", "Rangli bayroqchalar", "Mening quvnoq soatim", "Shakllardan surat yaratamiz",
    "1-bobni takrorlash: Yosh rassomlar sinovi", "Kuz qanday ranglarda?", "Rang-barang kuzgi barglar", "Barglardan naqsh yaratamiz",
    "Shirin olma rasmini chizamiz", "Olma va xurmo", "Mevalar savati", "Oltin kuz manzarasi", "Yomg‘irli kun", "Barglardan ijodiy kollaj",
    "2-bobni takrorlash: Kuzgi san’at ko‘rgazmasi", "Akvariumdagi rangli baliqlar", "Suvosti olami", "Haykal yasash sirlari",
    "“Ikki echki” ertagi qahramonlari", "Quvnoq xo‘tik haykalchasi", "Katta va mehribon fil", "Mening avtomobilim", "Yelkanli qayiq",
    "Osmondagi samolyot", "3-bobni takrorlash: Jonivorlar va transport festivali", "Qish faslining ranglari", "“Kumush qish” manzarasi",
    "Qorbobo uchun bezakli qo‘lqop", "Bahor uyg‘onmoqda", "“O‘lkamizda bahor”", "Rang-barang gullar", "Kapalak qanotlaridagi naqshlar",
    "Quvnoq to‘tiqush", "Orzular osmonidagi havo shari", "4-bob va yilni takrorlash: Men yosh rassomman!",
  ], [
    "Tasviriy san’at olamiga ilk qadam", "Rassomning ish qurollari", "Quvnoq chiziqlar", "Shakllar mamlakati", "Asosiy ranglar bilan tanishamiz",
    "Ranglarni aralashtiramiz", "Rangli bayroqchalar", "Mening quvnoq soatim", "Shakllardan surat yaratamiz",
    "1-bobni takrorlash: Yosh rassomlar sinovi", "Kuz qanday ranglarda?", "Rang-barang kuzgi barglar", "Barglardan naqsh yaratamiz",
    "Shirin olma rasmini chizamiz", "Olma va xurmo", "Mevalar savati", "Oltin kuz manzarasi", "Yomg‘irli kun", "Barglardan ijodiy kollaj",
    "2-bobni takrorlash: Kuzgi san’at ko‘rgazmasi", "Akvariumdagi rangli baliqlar", "Suvosti olami", "Haykal yasash sirlari",
    "“Ikki echki” ertagi qahramonlari", "Quvnoq xo‘tik haykalchasi", "Katta va mehribon fil", "Mening avtomobilim", "Yelkanli qayiq",
    "Osmondagi samolyot", "3-bobni takrorlash: “Jonivorlar va transport festivali”", "Qish faslining ranglari", "“Kumush qish” manzarasi",
    "Qorbobo uchun bezakli qo‘lqop", "Bahor uyg‘onmoqda", "“O‘lkamizda bahor”", "Rang-barang gullar", "Kapalak qanotlaridagi naqshlar",
    "Quvnoq to‘tiqush", "Orzular osmonidagi havo shari", "4-bob va yilni takrorlash: “Men yosh rassomman!”",
  ], [
    "Первый шаг в мир изобразительного искусства", "Инструменты художника", "Весёлые линии", "Страна фигур", "Знакомимся с основными цветами",
    "Смешиваем цвета", "Цветные флажки", "Мои весёлые часы", "Создаём картины из фигур", "Повторение 1-й главы: испытание юных художников",
    "Какого цвета осень?", "Разноцветные осенние листья", "Создаём узор из листьев", "Рисуем сладкое яблоко", "Яблоко и хурма", "Корзина с фруктами",
    "Пейзаж «Золотая осень»", "Дождливый день", "Творческий коллаж из листьев", "Повторение 2-й главы: Осенняя выставка искусства",
    "Разноцветные рыбки в аквариуме", "Подводный мир", "Секреты лепки", "Герои сказки «Две козы»", "Фигурка весёлого ослика",
    "Большой и добрый слон", "Мой автомобиль", "Парусная лодка", "Самолёт в небе", "Повторение 3-й главы: «Фестиваль животных и транспорта»",
    "Цвета зимы", "Пейзаж «Серебряная зима»", "Узорная варежка для Деда Мороза", "Весна просыпается", "«Весна в нашем краю»", "Разноцветные цветы",
    "Узоры на крыльях бабочки", "Весёлый попугай", "Воздушный шар в небе мечты", "Повторение 4-й главы и года: «Я юный художник!»",
  ], [
    "First step into the world of fine art", "The artist’s tools", "Happy lines", "The land of shapes", "Meet the primary colours", "We mix colours",
    "Colourful little flags", "My happy clock", "We make pictures from shapes", "Chapter 1 review: The young artists’ test",
    "What colours is autumn?", "Colourful autumn leaves", "We make patterns from leaves", "We draw a sweet apple", "Apple and persimmon",
    "A basket of fruit", "Golden autumn landscape", "A rainy day", "A creative leaf collage", "Chapter 2 review: Autumn art exhibition",
    "Colourful fish in the aquarium", "The underwater world", "Secrets of sculpting", "Characters of the tale “Two Goats”",
    "A cheerful little donkey figure", "The big kind elephant", "My car", "The sailboat", "The aeroplane in the sky",
    "Chapter 3 review: “Animals and transport festival”", "The colours of winter", "The “Silver winter” landscape",
    "A decorated mitten for Grandfather Frost", "Spring is waking up", "“Spring in our land”", "Colourful flowers", "Patterns on butterfly wings",
    "The cheerful parrot", "A hot-air balloon in the sky of dreams", "Chapter 4 and year review: “I am a young artist!”",
  ], 1);
  // sport: 1-sinf, 40 mavzu (har biri 2 sahifa)
  const SPORT1U = [{ t: { orig: "1-bob. Yengil atletika elementlari va harakatli o‘yinlar", uz: "1-bob. Yengil atletika elementlari va harakatli o‘yinlar" }, from: 1 }, { t: { orig: "2-bob. Yengil atletika elementlari va harakatli o‘yinlar", uz: "2-bob. Yengil atletika elementlari va harakatli o‘yinlar" }, from: 9 }, { t: { orig: "3-bob. Aqliy harakat, koordinatsiya va anjomli o‘yinlar", uz: "3-bob. Aqliy harakat, koordinatsiya va anjomli o‘yinlar" }, from: 17 }, { t: { orig: "4-bob. Gimnastika, akrobatika va tirmashish elementlari", uz: "4-bob. Gimnastika, akrobatika va tirmashish elementlari" }, from: 25 }, { t: { orig: "5-bob. Sakrash, uloqtirish, mini-futbol elementlari va yakuniy takrorlash", uz: "5-bob. Sakrash, uloqtirish, mini-futbol elementlari va yakuniy takrorlash" }, from: 33 }];
  const SPORT1 = mk([
    "Jismoniy tarbiya darsiga xush kelibsiz", "Safga turamiz va tartibni saqlaymiz", "To‘g‘ri yurish va chiroyli qadam tashlash",
    "Xavfsiz yuramiz, yuguramiz va to‘xtaymiz", "Qisqa masofaga quvnoq yuguramiz", "SAKRASHGA TAYYORLANAMIZ",
    "Yumshoq sakraymiz va ehtiyotkor tushamiz", "1-bob takrorlash va quvnoq harakat sinovi", "Umumrivojlantiruvchi mashqlar majmuasi",
    "Yugurishga tayyorlovchi mashqlar", "Maxsus yugurish mashqlari", "Harakatli o‘yin: Poyezd", "Harakatli o‘yin: Bo‘sh o‘rin",
    "Harakatli o‘yin: Quvlashmachoq", "Anjomlar bilan estafetalar", "2-bob takrorlash va yugurish-harakat sinovi",
    "Shashka: doska va donalar bilan tanishamiz", "Shashka: donalarni joylashtirish va oddiy qoidalar", "Harakatli o‘yin: Kun va tun",
    "Anjomlar bilan estafetalar", "Anjomlarsiz estafetalar", "Harakatli o‘yin: O‘z raqibingni top!", "Harakatli o‘yin: Kim uzoqqa uloqtiradi?",
    "3-bob takrorlash va koordinatsiya sinovi", "Gimnastika: sport zalida xavfsizlik", "Akrobatika: g‘ujanak bo‘lib o‘tirish",
    "Akrobatika: oldinga va orqaga tebranish mashqlari", "Oldinga umbaloq oshishga tayyorgarlik", "Osilish mashqlari",
    "Tirmashish mashqlari: gimnastik narvonda osilib o‘tirish", "Tirmashib chiqishga tayyorgarlik", "4-bob takrorlash va gimnastika sinovi",
    "Turgan joydan uzunlikka sakrash", "Turli yo‘nalishlarda sakrash", "Tepaga osilgan buyumga qo‘l tekkazib sakrash",
    "Tennis to‘pini turgan joydan uloqtirish", "Quvnoq startlar: anjomli va anjomsiz mashqlar",
    "Mini-futbolga kirish: to‘pni oyoq bilan sekin surish", "Yil davomida o‘rganilgan harakatlarni takrorlash",
    "Yakuniy sinov va “Sog‘lom tana — quvnoq hayot” bayrami",
  ], [
    "Jismoniy tarbiya darsiga xush kelibsiz", "Safga turamiz va tartibni saqlaymiz", "To‘g‘ri yurish va chiroyli qadam tashlash",
    "Xavfsiz yuramiz, yuguramiz va to‘xtaymiz", "Qisqa masofaga quvnoq yuguramiz", "Sakrashga tayyorlanamiz",
    "Yumshoq sakraymiz va ehtiyotkor tushamiz", "1-bob takrorlash va quvnoq harakat sinovi", "Umumrivojlantiruvchi mashqlar majmuasi",
    "Yugurishga tayyorlovchi mashqlar", "Maxsus yugurish mashqlari", "Harakatli o‘yin: Poyezd", "Harakatli o‘yin: Bo‘sh o‘rin",
    "Harakatli o‘yin: Quvlashmachoq", "Anjomlar bilan estafetalar", "2-bob takrorlash va yugurish-harakat sinovi",
    "Shashka: doska va donalar bilan tanishamiz", "Shashka: donalarni joylashtirish va oddiy qoidalar", "Harakatli o‘yin: Kun va tun",
    "Anjomlar bilan estafetalar", "Anjomlarsiz estafetalar", "Harakatli o‘yin: O‘z raqibingni top!", "Harakatli o‘yin: Kim uzoqqa uloqtiradi?",
    "3-bob takrorlash va koordinatsiya sinovi", "Gimnastika: sport zalida xavfsizlik", "Akrobatika: g‘ujanak bo‘lib o‘tirish",
    "Akrobatika: oldinga va orqaga tebranish mashqlari", "Oldinga umbaloq oshishga tayyorgarlik", "Osilish mashqlari",
    "Tirmashish mashqlari: gimnastik narvonda osilib o‘tirish", "Tirmashib chiqishga tayyorgarlik", "4-bob takrorlash va gimnastika sinovi",
    "Turgan joydan uzunlikka sakrash", "Turli yo‘nalishlarda sakrash", "Tepaga osilgan buyumga qo‘l tekkazib sakrash",
    "Tennis to‘pini turgan joydan uloqtirish", "Quvnoq startlar: anjomli va anjomsiz mashqlar",
    "Mini-futbolga kirish: to‘pni oyoq bilan sekin surish", "Yil davomida o‘rganilgan harakatlarni takrorlash",
    "Yakuniy sinov va “Sog‘lom tana — quvnoq hayot” bayrami",
  ], [
    "Добро пожаловать на урок физкультуры", "Встаём в строй и соблюдаем порядок", "Правильная ходьба и красивый шаг",
    "Безопасно ходим, бегаем и останавливаемся", "Весело бегаем на короткую дистанцию", "Готовимся к прыжку",
    "Мягко прыгаем и осторожно приземляемся", "Повторение 1-й главы и весёлое испытание", "Комплекс общеразвивающих упражнений",
    "Упражнения для подготовки к бегу", "Специальные беговые упражнения", "Подвижная игра «Поезд»", "Подвижная игра «Свободное место»",
    "Подвижная игра «Догонялки»", "Эстафеты с инвентарём", "Повторение 2-й главы и испытание по бегу и движению",
    "Шашки: знакомимся с доской и шашками", "Шашки: расстановка шашек и простые правила", "Подвижная игра «День и ночь»", "Эстафеты с инвентарём",
    "Эстафеты без снарядов", "Подвижная игра: «Найди свою пару!»", "Подвижная игра: «Кто дальше бросит?»",
    "Повторение главы 3 и проверка координации", "Гимнастика: безопасность в спортзале", "Акробатика: сед в группировке",
    "Акробатика: перекаты вперёд и назад", "Подготовка к кувырку вперёд", "Упражнения в висе",
    "Упражнения в лазании: вис сидя на гимнастической стенке", "Подготовка к лазанию", "Повторение главы 4 и проверка по гимнастике",
    "Прыжок в длину с места", "Прыжки в разных направлениях", "Прыжок вверх с касанием подвешенного предмета", "Метание теннисного мяча с места",
    "Весёлые старты: упражнения со снарядами и без", "Введение в мини-футбол: медленное ведение мяча ногой", "Повторение движений, изученных за год",
    "Итоговая проверка и праздник «Здоровое тело — весёлая жизнь»",
  ], [
    "Welcome to the PE lesson", "We line up and keep order", "Walking correctly and stepping nicely", "We walk, run and stop safely",
    "We run a short distance happily", "We get ready to jump", "We jump softly and land carefully", "Chapter 1 review and fun movement test",
    "A set of general exercises", "Exercises to get ready for running", "Special running exercises", "Active game: Train", "Active game: Empty Spot",
    "Active game: Tag", "Relays with equipment", "Chapter 2 review and running test", "Draughts: meeting the board and pieces",
    "Draughts: setting up pieces and simple rules", "Active game: Day and Night", "Relays with equipment", "Relay races without equipment",
    "Active game: Find your partner!", "Active game: Who throws the farthest?", "Chapter 3 review and coordination test",
    "Gymnastics: safety in the gym", "Acrobatics: sitting in a tuck", "Acrobatics: rocking forward and backward", "Getting ready for a forward roll",
    "Hanging exercises", "Climbing exercises: hanging and sitting on the wall bars", "Getting ready to climb",
    "Chapter 4 review and gymnastics test", "Standing long jump", "Jumping in different directions", "Jumping up to touch a hanging object",
    "Throwing a tennis ball from a standing position", "Fun Starts: exercises with and without equipment",
    "Introduction to mini-football: gently moving the ball with your foot", "Reviewing the movements learned this year",
    "Final test and the “Healthy body — happy life” festival",
  ], 3);
  // life: 1-sinf, 40 mavzu (har biri 2 sahifa)
  const LIFE1U = [{ t: { orig: "1-bob. Oila qal’asi va xotiralar bog‘i", uz: "1-bob. Oila qal’asi va xotiralar bog‘i" }, from: 1 }, { t: { orig: "2-bob. Quvnoq maktab shaharchasi", uz: "2-bob. Quvnoq maktab shaharchasi" }, from: 11 }, { t: { orig: "3-bob. Salomatlik va xavfsizlik oroli", uz: "3-bob. Salomatlik va xavfsizlik oroli" }, from: 21 }, { t: { orig: "4-bob. Vatan va tabiat bog‘i", uz: "4-bob. Vatan va tabiat bog‘i" }, from: 31 }];
  const LIFE1 = mk([
    "Men o‘zgachaman va noyobman", "Mening ismim va uning ma’nosi", "Mening oilam — mening qal’am", "Uyimizdagi burch va mas’uliyatlarim",
    "Kattalarga hurmat, kichiklarga izzat", "Mening bobom va buvim — xazinam", "Mehmonkutish va mehmonbozlik odobi",
    "Oilaviy an’analarimiz va bayramlar", "Oilada bir-birimizni tinglaymiz", "Mening shajaram va oilam daraxti", "Maktab — mening ikkinchi uyim",
    "Vaqt — eng buyuk boylik", "Sehrli so‘zlar: Rahmat, Iltimos, Kechiring", "Do‘stlashish va chin do‘st bo‘lish",
    "Rostgo‘ylik — eng go‘zal fazilat", "Xatoyimni tan olaman va tuzataman", "Navbatga rioya qilaman", "Boshqalarning narsasiga ruxsatsiz tegmayman",
    "Bag‘rikenglik va yordamga shaylik", "Bizning sinfning 5 ta oltin qoidasi", "21-mavzu. Poklik — salomatlik garovi",
    "22-mavzu. Sog‘lom ovqatlanish qoidalari", "23-mavzu. Sport va harakat — hayot manbai", "24-mavzu. Kiyim-kechak va ozodalik",
    "25-mavzu. Yo‘l harakati xavfsizligi odoblari", "26-mavzu. Uyda va ko‘chada xavfsizlik", "27-mavzu. Telefon va televizor: me’yorni bilaman",
    "28-mavzu. Jonivorlarga ozor bermayman", "29-mavzu. Suv va nonni isrof qilmayman", "30-mavzu. Mening sog‘lom kun tartibim albomi",
    "31-mavzu. Mening O‘zbekistonim — jonajon yurtim", "32-mavzu. Davlatimiz ramzlari: Bayroq, Gerb va Madhiya",
    "33-mavzu. Mening mahallam va qishlog‘im yoki shahrim", "Bahor va tabiatning uyg‘onishi", "Bir tup ko‘chat o‘tkazaman",
    "Mehnatsevarlik — baxt kaliti", "Kitob — eng yaqin do‘stim", "Ezgu amallar va yaxshilik qilish", "Yozgi ta’tilni mazmunli o‘tkazaman",
    "Bir yil davomida erishgan yutuqlarim",
  ], [
    "Men o‘zgachaman va noyobman", "Mening ismim va uning ma’nosi", "Mening oilam — mening qal’am", "Uyimizdagi burch va mas’uliyatlarim",
    "Kattalarga hurmat, kichiklarga izzat", "Mening bobom va buvim — xazinam", "Mehmon kutish va mehmondo‘stlik odobi",
    "Oilaviy an’analarimiz va bayramlar", "Oilada bir-birimizni tinglaymiz", "Mening shajaram va oilam daraxti", "Maktab — mening ikkinchi uyim",
    "Vaqt — eng buyuk boylik", "Sehrli so‘zlar: “Rahmat”, “Iltimos”, “Kechiring”", "Do‘stlashish va chin do‘st bo‘lish",
    "Rostgo‘ylik — eng go‘zal fazilat", "Xatoyimni tan olaman va tuzataman", "Navbatga rioya qilaman", "Boshqalarning narsasiga ruxsatsiz tegmayman",
    "Bag‘rikenglik va yordamga shaylik", "Bizning sinfning 5 ta oltin qoidasi", "Poklik — salomatlik garovi", "Sog‘lom ovqatlanish qoidalari",
    "Sport va harakat — hayot manbai", "Kiyim-kechak va ozodalik", "Yo‘l harakati xavfsizligi odoblari", "Uyda va ko‘chada xavfsizlik",
    "Telefon va televizor: me’yorni bilaman", "Jonivorlarga ozor bermayman", "Suv va nonni isrof qilmayman", "Mening sog‘lom kun tartibim albomi",
    "Mening O‘zbekistonim — jonajon yurtim", "Davlatimiz ramzlari: Bayroq, Gerb va Madhiya", "Mening mahallam va qishlog‘im yoki shahrim",
    "Bahor va tabiatning uyg‘onishi", "Bir tup ko‘chat o‘tkazaman", "Mehnatsevarlik — baxt kaliti", "Kitob — eng yaqin do‘stim",
    "Ezgu amallar va yaxshilik qilish", "Yozgi ta’tilni mazmunli o‘tkazaman", "Bir yil davomida erishgan yutuqlarim",
  ], [
    "Я особенный и неповторимый", "Моё имя и его значение", "Моя семья — моя крепость", "Мои обязанности дома",
    "Уважение к старшим, забота о младших", "Мои дедушка и бабушка — моё сокровище", "Как встречать гостей: правила гостеприимства",
    "Наши семейные традиции и праздники", "В семье мы слушаем друг друга", "Моя родословная и семейное древо", "Школа — мой второй дом",
    "Время — самое большое богатство", "Волшебные слова: «Спасибо», «Пожалуйста», «Извините»", "Как подружиться и быть настоящим другом",
    "Честность — самое прекрасное качество", "Я признаю и исправляю свою ошибку", "Я соблюдаю очередь", "Я не трогаю чужие вещи без разрешения",
    "Толерантность и готовность помочь", "5 золотых правил нашего класса", "Чистота — залог здоровья", "Правила здорового питания",
    "Спорт и движение — источник жизни", "Одежда и опрятность", "Правила безопасности дорожного движения", "Безопасность дома и на улице",
    "Телефон и телевизор: я знаю меру", "Я не обижаю животных", "Я не трачу зря воду и хлеб", "Альбом моего здорового распорядка дня",
    "Мой Узбекистан — родной край", "Символы нашего государства: флаг, герб и гимн", "Моя махалля и моё село или город",
    "Весна и пробуждение природы", "Я сажаю саженец", "Трудолюбие — ключ к счастью", "Книга — мой лучший друг", "Добрые дела и помощь другим",
    "Я провожу летние каникулы с пользой", "Мои достижения за год",
  ], [
    "I am special and unique", "My name and its meaning", "My family is my castle", "My duties and responsibilities at home",
    "Respect for elders, care for the young", "My grandpa and grandma are my treasure", "Welcoming guests: rules of hospitality",
    "Our family traditions and holidays", "In the family we listen to each other", "My family tree", "School is my second home",
    "Time is the greatest treasure", "Magic words: “Thank you”, “Please”, “Sorry”", "Making friends and being a true friend",
    "Honesty is the most beautiful quality", "I admit and fix my mistake", "I wait my turn",
    "I don’t touch other people’s things without permission", "Tolerance and readiness to help", "Our class’s 5 golden rules",
    "Cleanliness is the key to health", "Rules of healthy eating", "Sport and movement are the source of life", "Clothes and tidiness",
    "Road safety manners", "Safety at home and outside", "Phone and TV: I know the limit", "I do not hurt animals", "I do not waste water and bread",
    "My healthy daily routine album", "My Uzbekistan, my dear homeland", "Our state symbols: the Flag, the Emblem and the Anthem",
    "My neighbourhood and my village or town", "Spring and nature waking up", "I plant a young tree", "Hard work is the key to happiness",
    "A book is my best friend", "Good deeds and doing kindness", "I spend my summer holiday well", "My achievements during the year",
  ], 1);
  const G = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
  const LIST = [
    { id: 'chem', name: { uz: 'Kimyo', en: 'Chemistry', ru: 'Химия' }, color: '#00555a', icon: '⚗️', grades: [6, 7, 8], native: true, home: '#kimyo' },
    { id: 'math', name: { uz: 'Matematika', en: 'Mathematics', ru: 'Математика' }, color: '#2563eb', icon: '➗', grades: G(1, 11), books: [
      { grade: 1, part: 1, lang: 'en', title: 'Mathematics Grade 1 · Part 1', file: '1-qism_ingliz.pdf', offset: 0,
        units: [{ t: { orig: 'Chapter 1. Objects, Features and Logical Grouping', uz: '1-bob. Narsalar, belgilar va mantiqiy guruhlash' }, from: 1 },
                { t: { orig: 'Chapter 2. Numbers from 1 to 5', uz: '2-bob. 1 dan 5 gacha sonlar' }, from: 26 }], topics: MA1 },
    ] },
    { id: 'eng', name: { uz: 'Ingliz tili', en: 'English', ru: 'Английский язык' }, color: '#dc2626', icon: '🔤', grades: G(1, 11), speech: 'en-GB', books: [
      { grade: 1, part: 1, lang: 'en', title: 'Zukko English Pathway 1 · Part 1', file: 'Part_1.pdf', offset: 2,
        units: [{ t: { orig: 'Unit 1 — My Family', uz: '1-bo‘lim — Mening oilam' }, from: 1 }, { t: { orig: 'Unit 2 — My Home', uz: '2-bo‘lim — Mening uyim' }, from: 26 }], topics: EN1 },
    ] },
    { id: 'rus', name: { uz: 'Rus tili', en: 'Russian', ru: 'Русский язык' }, color: '#7c3aed', icon: '🅰️', grades: G(1, 11), speech: 'ru-RU', books: [
      { grade: 1, part: 1, lang: 'ru', title: 'Zukko Russian Pathway 1 · Часть 1', file: '1-qism.pdf', offset: 2,
        units: [{ t: { orig: 'Раздел 1. Моя семья', uz: '1-bo‘lim. Mening oilam' }, from: 1 }, { t: { orig: 'Раздел 2. Мой дом', uz: '2-bo‘lim. Mening uyim' }, from: 26 }], topics: RU1 },
      { grade: 1, part: 2, lang: 'ru', title: 'Zukko Russian Pathway 1 · Часть 2', file: '1-sinf_Russian_Patway_часть-2_1.pdf', offset: 102, first: 51,
        units: [{ t: { orig: "Раздел 3. Моя школа", uz: "3-bo‘lim. Mening maktabim" }, from: 1 }, { t: { orig: "Раздел 4. Моё тело и здоровье", uz: "4-bo‘lim. Mening tanam va sog‘ligim" }, from: 26 }], topics: RU2 },
      { grade: 1, part: 3, lang: 'ru', title: 'Zukko Russian Pathway 1 · Часть 3', file: '1-sinf_Russian_Patway_часть-3_1.pdf', offset: 202, first: 101,
        units: [{ t: { orig: "Раздел 5. Животные вокруг меня", uz: "5-bo‘lim. Atrofimdagi hayvonlar" }, from: 1 }, { t: { orig: "Раздел 6. Природа вокруг меня", uz: "6-bo‘lim. Atrofimdagi tabiat" }, from: 26 }], topics: RU3 },
      { grade: 1, part: 4, lang: 'ru', title: 'Zukko Russian Pathway 1 · Часть 4', file: '1-sinf_Russian_Patway_часть-4_1.pdf', offset: 52, first: 151,
        units: [{ t: { orig: "Раздел 7. Еда, цвета и предметы", uz: "7-bo‘lim. Ovqat, ranglar va buyumlar" }, from: 1 }, { t: { orig: "Раздел 8. Люди и профессии", uz: "8-bo‘lim. Odamlar va kasblar" }, from: 26 }], topics: RU4 },
    ] },
    // O'zbek tilidagi fanlar (tongue: 'uz'): dars mazmuni o'zbekcha, test savollari darslikdan (3 oson / 4 o'rtacha / 3 qiyin)
    { id: 'art', name: { uz: 'Tasviriy san’at', en: 'Art', ru: 'Изобразительное искусство' }, color: '#db2777', icon: '🎨', grades: G(1, 11), tongue: 'uz', books: [
      { grade: 1, part: 1, lang: 'uz', title: 'Zukko San’at olami · 1-sinf', file: '1-sinf_Sanat_Olami.pdf', offset: -2, units: ART1U, topics: ART1 },
    ] },
    { id: 'sport', name: { uz: 'Jismoniy tarbiya', en: 'Physical education', ru: 'Физкультура' }, color: '#ea580c', icon: '⚽', grades: G(1, 11), tongue: 'uz', books: [
      { grade: 1, part: 1, lang: 'uz', title: 'Zukko Sport olami · 1-sinf', file: '1-sinf_Sport_Olami.pdf', offset: 0, units: SPORT1U, topics: SPORT1 },
    ] },
    { id: 'life', name: { uz: 'Tarbiya', en: 'Life skills', ru: 'Воспитание' }, color: '#16a34a', icon: '🌱', grades: G(1, 11), tongue: 'uz', books: [
      { grade: 1, part: 1, lang: 'uz', title: 'Zukko Hayot saboqlari · 1-sinf', file: '1-sinf_Hayot_Saboqlari.pdf', offset: -2, units: LIFE1U, topics: LIFE1 },
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
